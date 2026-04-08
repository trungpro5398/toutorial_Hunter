# Project 06 - Quiz Arena

## Goal

Build a quiz app to practice step state, scoring, and the result screen.

## Requirements

- Create the question list in `constants/`.
- Manage current question index, selected answer, score, and quiz status.
- Do not allow moving to the next question until an answer is selected.
- After the final question, display the final score and number of correct answers.
- Include a Play again button to reset state.
- Split the question view, answer list, and result summary.

## Suggested Structure

```text
06-quiz-arena/
  components/     QuestionPanel, AnswerList, QuizResult
  constants/      question data
  hooks/          useQuiz
  types/          Question, Answer, QuizStatus
  utils/          calculateScore, getNextQuestion
```
