# Project 08 - Notes Board

## Goal

Build a notes board to practice CRUD, localStorage, and text search.

## Requirements

- Create notes with title, content, createdAt, and updatedAt.
- Allow creating, editing, and deleting notes.
- Save notes to localStorage with `useEffect`.
- Read notes from localStorage with a lazy `useState` initializer.
- Search by title or content.
- Include an empty state when there are no notes or no search results.

## Suggested Structure

```text
08-notes-board/
  components/     NoteEditor, NoteList, NoteItem, EmptyState
  constants/      storage key, default notes
  hooks/          useNotes
  types/          Note
  utils/          createNote, searchNotes
```
