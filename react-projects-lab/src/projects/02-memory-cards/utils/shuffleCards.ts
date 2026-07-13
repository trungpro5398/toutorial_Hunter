/*
 * Randomly reorders created deck from buildDeck.ts
 */

import type { Card } from "../types/memoryCards";

export function shuffleCards(cards: Card[]): Card[] {
    const cardsCopy = [...cards];
    let index: number = cardsCopy.length - 1;

    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        // Array deconstruction to quickly swap
        [cardsCopy[index], cardsCopy[randomIndex]] = [cardsCopy[randomIndex], cardsCopy[index]];
        index -= 1;
    }

    return cardsCopy;
}