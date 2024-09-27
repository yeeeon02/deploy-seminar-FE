// src/pages/Detail.tsx
import React, {useState} from 'react';
import {createPost} from 'api/posts';
import {useNavigate} from 'react-router-dom';
import 'pages/CreatePost/CreatePost.css';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    try {
      await createPost({title, content, author});
      navigate('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 로딩 중일 때 보여줄 UI
  if (loading) {
    return <div className="loading">Submitting...</div>;
  }

  return (
    <div className="form-container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
