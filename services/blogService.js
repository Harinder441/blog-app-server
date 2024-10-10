const Blog = require('../models/Blog');

exports.createBlog = async (blogData) => {
  const blog = new Blog(blogData);
  await blog.save();
  return blog;
};

exports.updateBlog = async (id, blogData, userId) => {
  const blog = await Blog.findOne({ _id: id, userId });
  if (!blog) {
    throw new Error('Blog not found or you are not authorized to edit this blog');
  }

  Object.assign(blog, blogData);
  await blog.save();
  return blog;
};

exports.getBlogsByLocation = async (location, { page, limit, tags }) => {
  const query = { location };
  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('userId', 'username');

  const total = await Blog.countDocuments(query);

  return {
    blogs,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
};

exports.getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate('userId', 'username');
  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
};

exports.deleteBlog = async (id, userId) => {
  const result = await Blog.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new Error('Blog not found or you are not authorized to delete this blog');
  }
};

exports.previewBlog = async ({ title, content, tags, userId, location }) => {
  // Create a temporary blog object without saving it to the database
  const previewBlog = new Blog({
    title,
    content,
    tags,
    author: userId,
    location
  });

  // You can add any additional formatting or processing here
  // For example, you might want to generate a preview of the content

  return {
    title: previewBlog.title,
    content: previewBlog.content,
    tags: previewBlog.tags,
    location: previewBlog.location,
    createdAt: new Date(), // Current date for preview purposes
    author: userId // You might want to populate this with user details in a real scenario
  };
};