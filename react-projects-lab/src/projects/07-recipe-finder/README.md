# Project 07 - Recipe Finder

## Goal

Build a recipe finder to practice search, filtering, and derived data.

## Requirements

- Create recipe data with title, ingredients, time, difficulty, and tags.
- Search by title or ingredient.
- Filter by difficulty.
- Display an empty state when there are no results.
- Split search controls and the recipe result list.
- Do not mutate the original data when filtering or sorting.

## Suggested Structure

```text
07-recipe-finder/
  components/     RecipeSearch, RecipeFilters, RecipeList, RecipeItem
  constants/      recipe seed data, difficulty options
  hooks/          useRecipeFilters
  types/          Recipe, Difficulty
  utils/          filterRecipes, matchIngredient
```
