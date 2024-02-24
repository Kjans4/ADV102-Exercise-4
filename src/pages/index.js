// pages/index.js
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoProvider } from '../contexts/TodoContext';

const Home = () => {
  return (
    <TodoProvider>
      <div>
        <h1>My Todo App</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default Home;
