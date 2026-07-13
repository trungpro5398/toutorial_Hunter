/*
 * Creates full 16-card deck from 8 seeds cards
 */

import type { Card } from "../types/memoryCards";

// seedCards must be array of objects like Card, but w/o id property
export function buildDeck(seedCards: Omit<Card, "id">[]): Card[] {
    const deck: Card[] = [];

    for (const seedCard of seedCards) {
        const seed1: Card = {
            id: seedCard.matchKey + "-1",
            emoji: seedCard.emoji,
            matchKey: seedCard.matchKey
        };

        const seed2: Card = {
            id: seedCard.matchKey + "-2",
            emoji: seedCard.emoji,
            matchKey: seedCard.matchKey
        };

        deck.push(seed1);
        deck.push(seed2);
    }

    return deck;
}