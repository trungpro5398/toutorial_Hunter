/*
 * Handles most game logic using hooks
 * Does not render JSX
 */


import { useState, useEffect } from "react";
import type { Card, GameStatus } from "../types/memoryCards";
import { cardSeeds } from "../constants/cardSeeds";
import { buildDeck } from "../utils/buildDeck";
import { shuffleCards } from "../utils/shuffleCards";

export function useMemoryCards() {
    // moves - current state value
    // setMoves - function used to update state
    // useState returns [currentValue, updateFunction] w/ array deconstruction is used

    const [cards, setCards] = useState<Card[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]); // empty array of strings
    const [matchedIds, setMatchedIds] = useState<string[]>([]);
    const [moves, setMoves] = useState(0); // integer 0
    const [status, setStatus] = useState<GameStatus>("playing"); // state starts as "playing"
    const [isCheckingMatch, setIsCheckingMatch] = useState(false); // state starts as false

    // Runs when game first loads and player resets
    function resetGame() {
        const deck: Card[] = buildDeck(cardSeeds);
        const shuffledDeck: Card[] = shuffleCards(deck);

        setCards(shuffledDeck);
        setSelectedIds([]);
        setMatchedIds([]);
        setMoves(0);
        setStatus("playing");
        setIsCheckingMatch(false);
    }

    // Always first runs after React renders
    // Doesn't run again as dependency array is empty
    useEffect(() => {
        resetGame();
    }, []);

    // Runs when player clicks card (is this card allowed to be selected?)
    function handleCardClick(cardId: string) {
        if (status === "completed" ||
            isCheckingMatch ||
            selectedIds.includes(cardId) ||
            matchedIds.includes(cardId) ||
            selectedIds.length === 2) { return; }

        // ... is spread operator and receives all items instead of creating nested array
        // functional update (arrow function) used as new state depends on old state
        setSelectedIds(currentSelectedIds => [...currentSelectedIds, cardId]);
    }

    // Checks whether flipped cards match
    // Watches selectedIds
    useEffect(() => {
        if (selectedIds.length !== 2) {
            return;
        }

        setIsCheckingMatch(true);
        setMoves(currentMoves => currentMoves + 1);

        const firstCard = cards.find(card => card.id === selectedIds[0]);
        const secondCard = cards.find(card => card.id === selectedIds[1]);

        if (!firstCard || !secondCard) {
            setIsCheckingMatch(false);
            return;
        }

        if (firstCard.matchKey === secondCard.matchKey) {
            setMatchedIds(currentMatchedIds => [...currentMatchedIds, firstCard.id, secondCard.id]);
            setSelectedIds([]);
            setIsCheckingMatch(false);
            return;
        } else {

            // delay (in ms) before resetting incorrect cards
            const timeoutId = setTimeout(() => {
                setSelectedIds([]);
                setIsCheckingMatch(false);
            }, 800);

            // resets created timer
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [selectedIds, cards]); // Includes cards as useEffect uses cards

    // Detects when player has matched every card (game completion)
    useEffect(() => {
        if (cards.length > 0 && cards.length === matchedIds.length) {
            setStatus("completed");
        }
    }, [matchedIds, cards]);

    return {
        cards,
        selectedIds,
        matchedIds,
        moves,
        status,
        handleCardClick,
        resetGame
        }
}