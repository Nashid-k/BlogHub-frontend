import React, { useState } from 'react';

const BlogForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter blog title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          placeholder="Write your blog content here..."
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Saving...' : 'Save Blog'}
      </button>
    </form>
  );
};

export default BlogForm;