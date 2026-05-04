import { useEffect, useState } from "react";
import {
  BEST_SCORE_STORAGE_KEY,
  BOARD_SIZE,
  GAME_SPEED_MS,
  INITIAL_DIRECTION,
} from "../constants/gameConfig";
import type { BoardCell, Direction, GameStatus } from "../types/snake";
import {
  createBoardCells,
  createFoodPosition,
  createInitialSnake,
  getNextPosition,
  isOppositeDirection,
  isOutsideBoard,
  isPositionInSnake,
  isSamePosition,
} from "../utils/snake";

export type UseSnakeGameResult = {
  boardCells: BoardCell[];
  boardSize: number;
  bestScore: number;
  changeDirection: (direction: Direction) => void;
  resetGame: () => void;
  score: number;
  startGame: () => void;
  status: GameStatus;
  togglePause: () => void;
};

/*
function notImplemented(): never {
  throw new Error("TODO: Students implement the Snake game hook.");
}
*/

export function useSnakeGame(): UseSnakeGameResult {
    // 1. State
    const [snake, setSnake] = useState(createInitialSnake);

    const [food, setFood] = useState(() =>
      createFoodPosition(createInitialSnake(), BOARD_SIZE)
    );

    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);

    const [queuedDirection, setQueuedDirection] =
      useState<Direction>(INITIAL_DIRECTION);

    const [score, setScore] = useState(0);

    const [status, setStatus] = useState<GameStatus>("idle");

    const [bestScore, setBestScore] = useState(() => {
      const savedScore = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
      return savedScore ? Number(savedScore) : 0;
    });


    // 2. Start/reset/pause/direction functions go here
    function resetGame() {
      const freshSnake = createInitialSnake();

      setSnake(freshSnake);
      setFood(createFoodPosition(freshSnake, BOARD_SIZE));
      setDirection(INITIAL_DIRECTION);
      setQueuedDirection(INITIAL_DIRECTION);
      setScore(0);
      setStatus("idle");
    }

    function startGame() {
      if (status === "lost") {
        resetGame();
      }

      setStatus("running");
    }

    function togglePause() {
      setStatus((currentStatus) => {
        if (currentStatus === "running") {
          return "paused";
        }

        if (currentStatus === "paused") {
          return "running";
        }

        return currentStatus;
      });
    }

    function changeDirection(nextDirection: Direction) {
      setQueuedDirection((currentQueuedDirection) => {
        if (isOppositeDirection(currentQueuedDirection, nextDirection)) {
          return currentQueuedDirection;
        }

        return nextDirection;
      });
    }

    // 3. Keyboard useEffect goes here
    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        const key = event.key.toLowerCase();

        if (event.key === "ArrowUp" || key === "w") {
          changeDirection("up");
        }

        if (event.key === "ArrowDown" || key === "s") {
          changeDirection("down");
        }

        if (event.key === "ArrowLeft" || key === "a") {
          changeDirection("left");
        }

        if (event.key === "ArrowRight" || key === "d") {
          changeDirection("right");
        }

        if (event.key === "Enter") {
          startGame();
        }

        if (event.key === " ") {
          togglePause();
        }

        if (key === "r") {
          resetGame();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [status]);


    // 4. Game loop useEffect goes here
    useEffect(() => {
      if (status !== "running") {
        return;
      }

      const intervalId = window.setInterval(() => {
        setSnake((currentSnake) => {
          const nextDirection = queuedDirection;
          const currentHead = currentSnake[0];
          const nextHead = getNextPosition(currentHead, nextDirection);
          const hasEatenFood = isSamePosition(nextHead, food);

          const snakeBodyToCheck = hasEatenFood
            ? currentSnake
            : currentSnake.slice(0, -1);

          if (
            isOutsideBoard(nextHead, BOARD_SIZE) ||
            isPositionInSnake(nextHead, snakeBodyToCheck)
          ) {
            setStatus("lost");
            return currentSnake;
          }

          setDirection(nextDirection);

          if (hasEatenFood) {
            const nextSnake = [nextHead, ...currentSnake];

            setScore((currentScore) => {
              const nextScore = currentScore + 1;

              setBestScore((currentBestScore) => {
                const nextBestScore = Math.max(currentBestScore, nextScore);

                window.localStorage.setItem(
                  BEST_SCORE_STORAGE_KEY,
                  String(nextBestScore)
                );

                return nextBestScore;
              });

              return nextScore;
            });

            setFood(createFoodPosition(nextSnake, BOARD_SIZE));

            return nextSnake;
          }

          return [nextHead, ...currentSnake.slice(0, -1)];
        });
      }, GAME_SPEED_MS);

      return () => {
        window.clearInterval(intervalId);
      };
    }, [status, queuedDirection, food]);


    // 5. Create boardCells
    const boardCells = createBoardCells(BOARD_SIZE, snake, food);

    return {
      boardCells,
      boardSize: BOARD_SIZE,
      bestScore,
      changeDirection,
      resetGame,
      score,
      startGame,
      status,
      togglePause,
    };
}
