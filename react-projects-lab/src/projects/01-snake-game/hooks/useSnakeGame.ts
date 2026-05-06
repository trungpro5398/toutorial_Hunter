<<<<<<< Updated upstream
import { useEffect, useState } from "react";
=======
import { useCallback, useEffect, useRef, useState } from "react";
>>>>>>> Stashed changes
import {
  AI_MOVE_INTERVAL,
  BEST_SCORE_STORAGE_KEY,
  BOARD_SIZE,
  GAME_SPEED_MS,
  INITIAL_DIRECTION,
} from "../constants/gameConfig";
import type { BoardCell, Direction, GameStatus } from "../types/snake";
import {
  createBoardCells,
  createFoodPosition,
  createInitialAiSnake,
  createInitialSnake,
  findShortestPath,
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

<<<<<<< Updated upstream
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
=======


export function useSnakeGame(): UseSnakeGameResult {
  const [snake, setSnake] = useState(createInitialSnake);
  const [aiSnake, setAiSnake] = useState(createInitialAiSnake);
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

  const tickCountRef = useRef(0);

  const resetGame = useCallback(() => {
    const freshSnake = createInitialSnake();
    const freshAiSnake = createInitialAiSnake();

    setSnake(freshSnake);
    setAiSnake(freshAiSnake);
    setFood(createFoodPosition(freshSnake, BOARD_SIZE));
    setDirection(INITIAL_DIRECTION);
    setQueuedDirection(INITIAL_DIRECTION);
    setScore(0);
    setStatus("idle");
    tickCountRef.current = 0;
  }, []);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        if (event.key === "ArrowUp" || key === "w") {
          changeDirection("up");
=======
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, resetGame, startGame, togglePause]);

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
          isPositionInSnake(nextHead, snakeBodyToCheck) ||
          isPositionInSnake(nextHead, aiSnake)
        ) {
          setStatus("lost");
          return currentSnake;
>>>>>>> Stashed changes
        }

        if (event.key === "ArrowDown" || key === "s") {
          changeDirection("down");
        }

<<<<<<< Updated upstream
        if (event.key === "ArrowLeft" || key === "a") {
          changeDirection("left");
        }

        if (event.key === "ArrowRight" || key === "d") {
          changeDirection("right");
        }
=======
        const nextSnake = hasEatenFood
          ? [nextHead, ...currentSnake]
          : [nextHead, ...currentSnake.slice(0, -1)];

        tickCountRef.current += 1;

        // ONLY RENDERS AI SNAKE NEXT MOVE WHEN SET TICKS FOR AI SNAKE HAS PASSED
        if (tickCountRef.current % AI_MOVE_INTERVAL === 0) {
          setAiSnake((currentAiSnake) => {
            const aiHead = currentAiSnake[0];
            const playerHead = nextSnake[0];

            const blockedPositions = [
              ...currentAiSnake,
              ...nextSnake.slice(1),
            ];

            // Searches with BFS to find next move
            const path = findShortestPath(
              aiHead,
              playerHead,
              blockedPositions,
              BOARD_SIZE
            );

            if (path.length === 0) {
              return currentAiSnake;
            }

            const nextAiHead = path[0];

            // Freezes AI snake if hits itself or runs into wall
            if (
              isOutsideBoard(nextAiHead, BOARD_SIZE) ||
              isPositionInSnake(nextAiHead, currentAiSnake.slice(0, -1))
            ) {
              return currentAiSnake;
            }

            // Conditions for LOSE game to AI snake
            if (isPositionInSnake(nextAiHead, nextSnake)) {
              setStatus("lost");
            }

            return [nextAiHead, ...currentAiSnake.slice(0, -1)];
          });
        }

        if (hasEatenFood) {
          setScore((currentScore) => {
            const nextScore = currentScore + 1;
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
            return nextSnake;
          }

          return [nextHead, ...currentSnake.slice(0, -1)];
        });
      }, GAME_SPEED_MS);
=======
          setFood(createFoodPosition(nextSnake, BOARD_SIZE));
        }

        return nextSnake;
      });
    }, GAME_SPEED_MS);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
  }, [aiSnake, food, queuedDirection, status]);

  const boardCells = createBoardCells(BOARD_SIZE, snake, food, aiSnake);

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
>>>>>>> Stashed changes
}
