const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudentFullDetails } = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentFullDetails);

module.exports = router;
