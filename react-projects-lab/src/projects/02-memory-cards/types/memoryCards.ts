/*
 * Creates the card types and their identifiers
 */


// Unique identifer for each symbol
export type Card = {
  id: string;
  emoji: string;
  matchKey: string;
};

export type GameStatus = "playing" | "completed";