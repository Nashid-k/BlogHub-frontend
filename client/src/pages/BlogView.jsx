import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogView = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlog(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        navigate('/');
      } catch (error) {
        alert('Error deleting blog');
      }
    }
  };

  if (loading) return <div className="loading">Loading blog...</div>;
  if (!blog) return <div>Blog not found</div>;

  const isAuthor = user && blog.author._id === user.id;

  return (
    <div className="blog-view">
      <article className="blog-article">
        <header className="blog-header">
          <h1>{blog.title}</h1>
          <div className="blog-meta">
            <span>By: <strong>{blog.author.name}</strong></span>
            <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
            {blog.updatedAt !== blog.createdAt && (
              <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
        </header>
        
        <div className="blog-content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {isAuthor && (
          <div className="blog-actions">
            <Link to={`/edit/${blog._id}`} className="btn btn-secondary">
              Edit Blog
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Blog
            </button>
          </div>
        )}
      </article>
      
      <div className="blog-navigation">
        <Link to="/" className="btn btn-primary">
          ← Back to All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogView;