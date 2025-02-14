import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0); // Tracks the number of items to skip
  const limit = 40; // Number of items to fetch per request
  const [total, setTotal] = useState(1);

  // Function to fetch todos
  const fetchTodos = async () => {
    if (total > todos.length) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
        );
        const data = await response.json();

        // Filter out duplicates before appending new todos
        const newTodos = data.todos.filter(
          (newTodo) =>
            !todos.some((existingTodo) => existingTodo.id === newTodo.id)
        );

        setTodos((prevTodos) => [...prevTodos, ...newTodos]); // Append only unique todos
        setSkip((prevSkip) => prevSkip + limit); // Update the skip value for the next fetch
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Detect scroll to bottom and trigger fetch
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 5 && // Check if near bottom
        !loading // Prevent multiple simultaneous fetches
      ) {
        fetchTodos();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup event listener
  }, [loading]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Todos</h1>
      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={`${todo.id}-${index}`} // Combine id with index for uniqueness
              className="p-2 border rounded hover:bg-gray-100"
            >
              <Link to={`/todo/${todo.id}`}>{todo.todo}</Link>
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading more todos...</p>}
    </div>
  );
}

export default TodoList;
