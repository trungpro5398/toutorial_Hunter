/*
 * Creates/stores 8 original emoji ideas through array
 */

import type { Card } from "../types/memoryCards";

// Creates array of objects shaped like generic type 'Card' w/o id
export const cardSeeds: Omit<Card, "id">[] = [
    {
      emoji: "😄",
      matchKey: "smile"
    },

    {
      emoji: "👽",
      matchKey: "alien"
    },

    {
      emoji: "🤖",
      matchKey: "robot"
    },

    {
      emoji: "🤠",
      matchKey: "cowboy"
    },

  /*
    {
      emoji: "👓",
      matchKey: "glasses"
    },

    {
      emoji: "🔥",
      matchKey: "fire"
    },

    {
      emoji: "🐱",
      matchKey: "cat"
    },

    {
      emoji: "🐧",
      matchKey: "penguin"
    }
  */
];