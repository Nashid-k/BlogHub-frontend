import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await blogAPI.createBlog(formData);
      navigate('/');
    } catch (error) {
      alert('Error creating blog: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="create-blog">
      <h1>Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateBlog;