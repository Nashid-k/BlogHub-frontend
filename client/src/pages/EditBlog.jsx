import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const EditBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlog(id);
      const blogData = response.data;
      
      
      if (!user || blogData.author._id !== user.id) {
        navigate('/');
        return;
      }
      
      setBlog(blogData);
    } catch (error) {
      alert('Error fetching blog');
      navigate('/');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await blogAPI.updateBlog(id, formData);
      navigate(`/blog/${id}`);
    } catch (error) {
      alert('Error updating blog: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Loading...</div>;
  if (!blog) return null;

  return (
    <div className="edit-blog">
      <h1>Edit Blog</h1>
      <BlogForm 
        initialData={blog} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
};

export default EditBlog;