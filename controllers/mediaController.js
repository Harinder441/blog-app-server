const mediaService = require('../services/mediaService');

exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const file = req.files.media;
    const userId = req.user.id;

    const result = await mediaService.uploadMedia(file, userId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};