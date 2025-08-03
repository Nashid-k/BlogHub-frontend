import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUserBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(blogId);
        setUserBlogs(userBlogs.filter(blog => blog._id !== blogId));
      } catch (error) {
        alert('Error deleting blog');
      }
    }
  };

  if (!user) {
    return <div>Please login to view your profile.</div>;
  }

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Total Blogs:</strong> {userBlogs.length}</p>
        </div>
      </div>

      <div className="user-blogs">
        <h2>My Blogs</h2>
        {userBlogs.length === 0 ? (
          <div>
            <p>You haven't written any blogs yet.</p>
            <Link to="/create" className="btn btn-primary">Create Your First Blog</Link>
          </div>
        ) : (
          <div className="blogs-list">
            {userBlogs.map(blog => (
              <div key={blog._id} className="blog-item">
                <h3>{blog.title}</h3>
                <p className="blog-preview">
                  {blog.content.substring(0, 100)}...
                </p>
                <div className="blog-meta">
                  <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                  {blog.updatedAt !== blog.createdAt && (
                    <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="blog-actions">
                  <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                  <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-secondary">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;