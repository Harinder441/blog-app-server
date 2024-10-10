const blogService = require('../services/blogService');
const { getClientIp } = require('request-ip');
const geoip = require('geoip-lite');

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id;
    const ip = getClientIp(req);
    // console.log("ip",ip);
    const geo = geoip.lookup(ip);
    const location = geo ? geo.country : 'Unknown';

    const blog = await blogService.createBlog({ title, content, tags, userId, location });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    const updatedBlog = await blogService.updateBlog(id, { title, content, tags }, userId);
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

exports.getBlogsByLocation = async (req, res, next) => {
  try {
    const ip = getClientIp(req);
    const geo = geoip.lookup(ip);
    const location = geo ? geo.country : 'Unknown';

    const { page = 1, limit = 10, tags } = req.query;
    const blogs = await blogService.getBlogsByLocation(location, { page, limit, tags });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await blogService.deleteBlog(id, userId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};