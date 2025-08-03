import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();
  const isAuthor = user && blog.author._id === user.id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(blog._id);
        onDelete(blog._id);
      } catch (error) {
        alert('Error deleting blog');
      }
    }
  };

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p className="blog-content">
        {blog.content.substring(0, 150)}...
      </p>
      <div className="blog-meta">
        <span>By: {blog.author.name}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="blog-actions">
        <Link to={`/blog/${blog._id}`} className="btn btn-primary">
          Read More
        </Link>
        {isAuthor && (
          <>
            <Link to={`/edit/${blog._id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;