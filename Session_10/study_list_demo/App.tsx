import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type TaskItem = {
  id: string;
  title: string;
  done: boolean;
};

export default function App() {
  // `draft` teaches controlled input:
  // the text field does not own its own truth, React state does.
  const [draft, setDraft] = useState("");

  // `error` teaches conditional rendering:
  // the UI shows feedback only when there is actually a validation problem.
  const [error, setError] = useState("");

  // `tasks` teaches array state:
  // students practice add / toggle / delete without mutating the old array.
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", title: "Review React Native primitives", done: true },
    { id: "2", title: "Practice FlatList homework", done: false },
  ]);

  function handleAdd() {
    const trimmed = draft.trim();

    // Validation belongs before the state update.
    // This is a good beginner habit: reject bad input early.
    if (trimmed.length === 0) {
      setError("Please enter a valid task.");
      return;
    }

    // We return a brand new array instead of using `push`.
    // This teaches immutable updates, which is the standard React pattern.
    setTasks((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: trimmed,
        done: false,
      },
    ]);

    // Clearing the input shows why controlled inputs are useful:
    // changing state immediately changes what the user sees.
    setDraft("");
    setError("");
  }

  function handleToggle(id: string) {
    // `map` is the right tool when we want the same array length,
    // but one item should change.
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function handleDelete(id: string) {
    // `filter` is the right tool when we want to remove one item
    // and keep every other item unchanged.
    setTasks((prev) => prev.filter((task) => task.id !== id));
      
      
  }



  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* The top section stays simple on purpose.
          The lesson is about state and list rendering, not design complexity. */}
      <Text style={styles.title}>Study List</Text>
      <Text style={styles.subtitle}>
        State, input, conditional rendering, list
      </Text>
       
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Enter a study task..."
          value={draft}
          onChangeText={(text) => {
            setDraft(text);

            // Clearing the error while typing gives immediate feedback
            // and demonstrates UI reacting to state changes in real time.
            if (error) {
              setError("");
            }
          }}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
        />

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.counter}>Total tasks: {tasks.length}</Text>

      {/* This is the key conditional rendering checkpoint for the lesson:
          one branch for empty state, one branch for real data. */}
      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySubtitle}>
            Enter a task and press Add to begin.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          // Stable keys matter because React needs a reliable identity
          // for each rendered row.
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Tapping the main row toggles completion.
                  This is a good example of state driving visual changes. */}
              <Pressable
                style={styles.taskMain}
                onPress={() => handleToggle(item.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.done ? styles.checkboxDone : null,
                  ]}
                />
                <Text
                  style={[styles.taskText, item.done ? styles.taskDone : null]}
                >
                  {item.title}
                </Text>
              </Pressable>

              {/* Keeping delete separate makes the event intent obvious:
                  one action toggles, the other removes. */}
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // `flex: 1` is one of the first layout rules students should internalize:
    // this screen fills the available device space.
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingTop: 72,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2a44",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#5b6b88",
    fontSize: 14,
  },
  inputRow: {
    // Mobile layout is flexbox by default, and the main axis is column.
    // We switch to row here because the input and button should sit side by side.
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#c8d2e1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#d64545",
  },
  addButton: {
    backgroundColor: "#1d6ef2",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  errorText: {
    marginTop: 8,
    color: "#d64545",
    fontSize: 13,
  },
  counter: {
    marginTop: 18,
    marginBottom: 10,
    color: "#31415f",
    fontWeight: "600",
  },
  emptyBox: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d9e2ef",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2a44",
  },
  emptySubtitle: {
    marginTop: 6,
    color: "#60708e",
    lineHeight: 20,
  },
  listContent: {
    // Extra bottom padding helps the last item stay visible and tappable,
    // especially on smaller screens.
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d9e2ef",
  },
  taskMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#7d8da8",
  },
  checkboxDone: {
    backgroundColor: "#21a67a",
    borderColor: "#21a67a",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#24324a",
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "#8190aa",
  },
  deleteButton: {
    backgroundColor: "#fff1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  deleteButtonText: {
    color: "#c0392b",
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
