import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// ============================================================
// Greeting App — Session 9 Demo
//
// Chức năng:
// 1. Nhập tên vào TextInput
// 2. Nhấn "Chào" → hiển thị lời chào
// 3. Nhấn "Xóa" → reset tất cả
// 4. Validation: tên không rỗng, ít nhất 2 ký tự
// ============================================================

export default function App() {
  // === STATE ===
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  // === HANDLERS ===

  function handleGreet() {
    const trimmed = name.trim();

    // Validation 1: không rỗng
    if (trimmed.length === 0) {
      setError("Vui lòng nhập tên!");
      setGreeting("");
      return;
    }

    // Validation 2: ít nhất 2 ký tự
    if (trimmed.length < 2) {
      setError("Tên phải có ít nhất 2 ký tự!");
      setGreeting("");
      return;
    }

    // Thành công → hiện lời chào, xóa lỗi
    setError("");
    setGreeting(`Xin chào, ${trimmed}!`);
  }

  function handleClear() {
    setName("");
    setGreeting("");
    setError("");
  }

  // === RENDER ===

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Tiêu đề */}
      <Text style={styles.title}>Greeting App</Text>
      <Text style={styles.subtitle}>Nhập tên để nhận lời chào</Text>

      {/* Ô nhập tên */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên của bạn:</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            // Xóa lỗi khi user bắt đầu gõ lại
            if (error) setError("");
          }}
          placeholder="Nhập tên..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleGreet}
        />
        {/* Hiện lỗi nếu có */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Nút Chào + Xóa */}
      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.greetButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleGreet}
        >
          <Text style={styles.buttonText}>Chào</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.clearButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleClear}
        >
          <Text style={[styles.buttonText, styles.clearButtonText]}>Xóa</Text>
        </Pressable>
      </View>

      {/* Hiện lời chào */}
      {greeting ? (
        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>{greeting}</Text>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  // --- Layout ---
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f8f9fa",
  },

  // --- Tiêu đề ---
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#95a5a6",
    marginTop: 4,
    marginBottom: 32,
  },

  // --- Input ---
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
    borderWidth: 2,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 13,
    marginTop: 6,
  },

  // --- Buttons ---
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  greetButton: {
    backgroundColor: "#3498db",
  },
  clearButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bdc3c7",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  clearButtonText: {
    color: "#7f8c8d",
  },

  // --- Greeting ---
  greetingBox: {
    marginTop: 24,
    backgroundColor: "#d5f4e6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27ae60",
  },
});
