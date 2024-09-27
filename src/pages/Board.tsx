// src/pages/Board.tsx
import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost, Post } from '../api/posts';
import './Board.css';

const Board: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // posts의 타입을 Post[]로 정의

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getAllPosts();
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <div className="board-container">
            <h1 className="board-title">Bulletin Board</h1>
            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <span className="post-author">By {post.author}</span>
                        <div className="post-actions">
                            <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
