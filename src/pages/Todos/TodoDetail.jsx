import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => setTodo(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Todo Detail</h1>
      <p className="mb-2">
        <strong>Task:</strong> {todo.todo}
      </p>
      <p className="mb-2">
        <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>User ID:</strong> {todo.userId}
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Todos
      </Link>
    </div>
  );
}

export default TodoDetail;
