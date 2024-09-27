// src/pages/PostDetail.tsx
import React, {useState, useEffect} from 'react';
import {getPostById} from 'api/posts';
import {useParams} from 'react-router-dom';
import 'pages/PostDetail/PostDetail.css';

const PostDetail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<{
    title: string;
    content: string;
    author: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await getPostById(Number(id));
          setPost(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <span>By {post.author}</span>
      <span>{new Date(post.createdAt).toLocaleString()}</span>
    </div>
  );
};

export default PostDetail;
