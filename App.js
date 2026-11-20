// App.js
// Main screen of the Todo app. Complete TODO 3 to TODO 7.
// (TODO 1 and TODO 2 are in services/todoService.js)

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import TodoItem from "./components/TodoItem";
import { addTodo, fetchTodos } from "./services/todoService";

export default function App() {
  // ---------- State ----------
  const [text, setText] = useState("");         // what the user is typing
  const [todos, setTodos] = useState([]);       // todos read from Firestore
  const [loading, setLoading] = useState(true); // true while data is loading

  // ---------- Load data (Part 4) ----------
  // TODO 3: Read the todos when the screen opens.
  //   a) Inside loadTodos: call fetchTodos(), await the result,
  //      then save it with setTodos(...)
  //   b) Below loadTodos: use useEffect so loadTodos() runs ONCE
  //      when the screen opens. The dependency array must be empty: []
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
setTodos(data);
    } catch (error) {
      Alert.alert("Error", "Could not load todos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadTodos();
}, []);

  // ---------- Save data (Part 3) ----------
  // TODO 4: Make the Add button save a todo.
  //   a) If text is empty (after .trim()), do nothing and return.
  //   b) Call addTodo(text.trim()) and await it.
  // TODO 7: After saving, clear the input box with setText("")
  //   and reload the list by calling loadTodos().
  const handleAdd = async () => {
    if (text.trim() === "") {
  return;
}

    try {
      await addTodo(text.trim());

      setText("");
await loadTodos();
    } catch (error) {
      Alert.alert("Error", "Could not save todo: " + error.message);
    }
  };

  // ---------- Screen ----------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Todos</Text>

      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* TODO 5: Replace the placeholder below with a FlatList that shows the todos.
          - data={todos}
          - keyExtractor={(item) => item.id}
          - renderItem renders <TodoItem title={item.title} completed={item.completed} />
      */}

      {/* TODO 6: Handle loading and empty states.
          - If loading is true, show <ActivityIndicator size="large" /> instead of the list.
          - If loading is false and todos is empty, show:
            <Text style={styles.empty}>No todos yet</Text>
      */}
      <Text style={styles.empty}>List goes here</Text>
    </SafeAreaView>
  );
}

// ---------- Styles (provided) ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f8", padding: 16, paddingTop: 48 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 16, color: "#1a1a2e" },
  inputRow: { flexDirection: "row", marginBottom: 16 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#4f46e5",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  empty: { textAlign: "center", color: "#888", marginTop: 40, fontSize: 16 },
});