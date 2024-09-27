// src/pages/Board.tsx
import React, {useState, useEffect} from 'react';
import {getAllPosts, deletePost, Post} from 'api/posts';
import {useNavigate} from 'react-router-dom';
import './Board.css';

const Board: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 리스트 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 게시글 가져오기
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getAllPosts();
      setPosts(response.data); // 서버에서 받아온 게시글 데이터를 상태에 저장
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  // 게시글 삭제
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id)); // 삭제된 게시글을 리스트에서 제거
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 추가 버튼 클릭 시 create 페이지로 이동
  const handleAddPost = () => {
    navigate('/create');
  };

  // 게시글 수정 페이지로 이동
  const handleEditPost = (id: number) => {
    navigate(`/edit/${id}`); // 수정 페이지로 이동
  };

  const handleNavigateDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="board-container">
      <h1 className="board-title">Bulletin Board</h1>
      <button className="add-post-button" onClick={handleAddPost}>
        Add Post
      </button>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span className="post-author">By {post.author}</span>
            <div className="post-actions">
              <button
                className="edit-button"
                onClick={() => handleEditPost(post.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => handleNavigateDetail(post.id)}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
