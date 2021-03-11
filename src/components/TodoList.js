import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../contexts/TodoContext";

const TodoList = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <>
      <TodoForm />
      {filteredTodos.map((todo) => {
        return (
          <TodoItem todo={todo} title={todo.title} key={todo.id} id={todo.id} />
        );
      })}
    </>
  );
};

export default TodoList;
