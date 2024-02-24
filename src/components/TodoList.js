import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");
  const [activeTab, setActiveTab] = useState("active"); 

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renderTodo = (todo) => (
    <li key={todo.id} className="mb-2 flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="mr-2"
      />
      {editingTodoId === todo.id ? (
        <>
          <input
            type="text"
            value={editedTodoText}
            onChange={(e) => setEditedTodoText(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <button onClick={() => saveEdit(todo.id)} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
          </span>
          {activeTab === "active" && (
            <button
              onClick={() => handleEdit(todo.id, todo.text)}
              className="ml-2 p-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
          )}
          {activeTab === "active" && (
            <button
              onClick={() => handleDelete(todo.id)}
              className="ml-2 p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}
        </>
      )}
      {activeTab === "completed" && (
        <button
          onClick={() => handleDelete(todo.id)}
          className="ml-2 p-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      )}
    </li>
  );

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="p-8 border rounded-md border-transparent bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
        <h1 className="text-4xl font-semibold mb-8">Todo List</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded">
            Add Todo
          </button>
        </div>

        <div className="mb-4">
          <div className="flex space-x-4">
            <button
              className={`text-xl ${activeTab === "active" ? "font-semibold" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active Todos
            </button>
            <button
              className={`text-xl ${activeTab === "completed" ? "font-semibold" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Todos
            </button>
          </div>
          <ul className="text-left">
            {activeTab === "active" && activeTodos.map(renderTodo)}
            {activeTab === "completed" && completedTodos.map(renderTodo)}
          </ul>
        </div>
      </main>
    </div>
  );
}
