const express = require('express');
const router = express.Router();
const { addMark, getStudentMarks, deleteMark } = require('../controllers/markController');

router.post('/', addMark);
router.get('/', getStudentMarks);
router.delete('/:id', deleteMark);

module.exports = router;
