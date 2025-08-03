import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../services/api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog._id !== blogId));
  };

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <div className="home">
      <h1>Latest Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map(blog => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              onDelete={handleDeleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;