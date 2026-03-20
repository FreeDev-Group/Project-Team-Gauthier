const express = require('express');

const authRoutes = require('./authRoutes');
const contactRoutes = require('./contactRoutes');
const blogRoutes = require('./blogRoutes');
const caseStudyRoutes = require('./caseStudyRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/blogs', blogRoutes);
router.use('/case-studies', caseStudyRoutes);

module.exports = router;
