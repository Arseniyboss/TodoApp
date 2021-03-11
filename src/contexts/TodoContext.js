import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v1 } from "uuid";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [search, setSearch] = useLocalStorage("name", "");

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase().trim());
    });
    setFilteredTodos(filteredTodos);
  }, [todos, search, setFilteredTodos]);

  const addTodo = (title) => setTodos([...todos, { title, id: v1() }]);

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const clearTodos = () => {
    setTodos([]);
  };

  const editTodo = (title, id) => {
    const editedTodo = todos.map((todo) =>
      todo.id === id ? { title, id } : todo
    );
    setTodos(editedTodo);
  };

  const value = {
    todos,
    filteredTodos,
    setFilteredTodos,
    search,
    setSearch,
    addTodo,
    deleteTodo,
    clearTodos,
    editTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export default TodoContextProvider;
