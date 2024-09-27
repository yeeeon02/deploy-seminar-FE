// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Board from 'pages/Board/Board';
import CreatePost from 'pages/CreatePost/CreatePost';
import Detail from 'pages/Detail/Detail';
import EditPost from 'pages/EditPost/EditPost';
import PostDetail from 'pages/PostDetail/PostDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
