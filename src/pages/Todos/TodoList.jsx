import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold ">Todos</h1>
      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="p-2 border rounded hover:bg-gray-100">
              <Link to={`/todo/${todo.id}`}>{todo.todo}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
