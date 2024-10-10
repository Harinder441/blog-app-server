const express = require("express");

const authRoute = require("./authRoutes");
const blogRoutes = require("./blogRoutes");

const router = express.Router();

router.use('/auth', authRoute);
router.use('/blogs', blogRoutes);

module.exports = router;