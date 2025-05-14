const Mark = require('../models/Mark');
const Student = require('../models/Student');
const Subject = require('../models/Subject');


exports.addMark = async (req, res) => {
  try {
    const { studentId, subjectId, scoredMarks, totalMarks } = req.body;

    const mark = await Mark.create({ studentId, subjectId, scoredMarks, totalMarks });

    res.status(201).json({ success: true, data: mark });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add mark" });
  }
};


exports.getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.query;

    const filter = studentId ? { studentId } : {};
    const marks = await Mark.find(filter).populate("subjectId", "name");

    res.json({ success: true, data: marks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch marks" });
  } 
};


exports.deleteMark = async (req, res) => {
  try {
    await Mark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mark' });
  }
};
