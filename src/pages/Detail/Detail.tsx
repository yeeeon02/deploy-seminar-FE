// src/pages/Detail.tsx
import React, {useEffect, useState} from 'react';
import {getPostById} from 'api/posts';
import {useParams} from 'react-router-dom';
import 'pages/Detail/Detail.css';

const Detail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 로딩 중일 때 보여줄 UI
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <div className="post-detail-container">{content}</div>
      <div className="post-detail-author-container">by {author}</div>
    </div>
  );
};

export default Detail;
