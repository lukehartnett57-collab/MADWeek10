// services/todoService.js
// All Firestore code for todos lives in this file.

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Reference to the "todos" collection in Firestore
const todosCollection = collection(db, "todos");

/**
 * TODO 1: Save a new todo (revision from Lab 09)
 *
 * Use addDoc(todosCollection, { ... }) to save a document with:
 *   - title:     the text passed into this function
 *   - completed: false
 *   - createdAt: serverTimestamp()
 *
 * Remember: addDoc is asynchronous, so use await.
 */

export async function addTodo(title) {
  await addDoc(todosCollection, {
    title: title,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

/**
 * TODO 2: Read all todos (NEW in this lab)
 *
 * Steps:
 *   1. Call getDocs(todosCollection) and await the result (a "snapshot").
 *   2. Convert snapshot.docs into a plain array of objects.
 *      Each object needs the document id AND its data:
 *        { id: doc.id, ...doc.data() }
 *   3. Return the array.
 *
 * Hint: use snapshot.docs.map(...)
 */
export async function fetchTodos() {
  const snapshot = await getDocs(todosCollection);

  const todos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return todos;
}