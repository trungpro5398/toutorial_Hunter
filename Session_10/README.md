# Session 10 — React Native State + Conditional Rendering + Lists

## Main Topics

- React Native: `useState`, controlled input, conditional rendering, rendering lists
- Mobile UI: `ScrollView` vs `FlatList`, immutable array updates
- Algorithm: basic Linked List

## Why Session 10 Follows Session 9

Session 9 teaches setup and primitives:

- `View`
- `Text`
- `Pressable`
- `TextInput`

That is enough to draw a screen, but not enough to build a real app.

The next useful step, especially for `tet-student-app`, is:

- storing UI state
- handling input correctly
- rendering data-driven screens
- showing empty / error states
- updating arrays without mutation

These patterns appear constantly in `tet-student-app` with `useState`, `TextInput`, `Pressable`, `ScrollView`, `FlatList`, and `FlashList`.

## What This Session Teaches

Students will learn how to:

1. build a small mobile app with real state
2. manage controlled inputs
3. render different UI based on state
4. display lists properly on mobile
5. understand when to use `ScrollView` vs `FlatList`
6. continue algorithm progress with Linked List

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the lesson
- `HOMEWORK.md`: homework spec
- `HOMEWORK_README_TEMPLATE.md`: submission template
- `LINKED_LIST_GUIDE.md`: linked list notes
- `linked_list_examples.js`: linked list example code
- `study_list_demo/App.tsx`: React Native demo for class

## How To Run The Demo

The demo is now a full Expo project in:

`/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_10/study_list_demo`

Run it with:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_10/study_list_demo"
npm install
npm start
```

Then run it on a device:

- scan the QR code with Expo Go
- or press `i` for iOS Simulator
- or press `a` for Android Emulator
- or press `w` for web
