const express = require("express");

const authRoute = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const mediaRoutes = require("./mediaRoutes");

const router = express.Router();

router.use('/auth', authRoute);
router.use('/blogs', blogRoutes);
router.use('/media', mediaRoutes);
module.exports = router;