// src/pages/EditPost.tsx
import React, {useState, useEffect} from 'react';
import {getPostById, updatePost} from 'api/posts';
import {useParams, useNavigate} from 'react-router-dom';
import 'pages/EditPost/EditPost.css';

const EditPost: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true); // 로딩 시작
      try {
        if (id) {
          const response = await getPostById(Number(id));
          setTitle(response.data.title);
          setContent(response.data.content);
          setAuthor(response.data.author);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(Number(id), {title, content, author});
      navigate('/');
    } catch (error) {
      console.error('Failed to update post:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 로딩 중일 때 보여줄 UI
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
