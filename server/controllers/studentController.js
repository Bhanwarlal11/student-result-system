const Student = require("../models/Student");
const Mark = require("../models/Mark");
const Subject = require("../models/Subject");

exports.createStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, dob, fatherName, motherName } = req.body;

    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Student with this roll number already exists.",
      });
    }

    const student = await Student.create({
      name,
      rollNumber,
      dob,
      fatherName,
      motherName,
    });
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (err) {
    next(err);
  }
};


exports.getStudentFullDetails = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const allSubjects = await Subject.find(); 
    const studentMarks = await Mark.find({ studentId }).populate('subjectId', 'name');

    const marksMap = {};
    studentMarks.forEach(mark => {
      marksMap[mark.subjectId._id.toString()] = {
        _id: mark._id,
        subjectId: mark.subjectId._id,
        subjectName: mark.subjectId.name,
        scoredMarks: mark.scoredMarks,
        totalMarks: mark.totalMarks
      };
    });

    const fullMarksList = allSubjects.map(subject => {
      const subjectId = subject._id.toString();
      if (marksMap[subjectId]) {
        return marksMap[subjectId]; 
      } else {
        return {
          subjectId: subject._id,
          subjectName: subject.name,
          scoredMarks: null,    
          totalMarks: null
        };
      }
    });

    const scored = studentMarks.reduce((acc, mark) => acc + mark.scoredMarks, 0);
    const total = studentMarks.reduce((acc, mark) => acc + mark.totalMarks, 0);
    const percentage = total ? ((scored / total) * 100).toFixed(2) : 0;
    const average = studentMarks.length
      ? (scored / studentMarks.length).toFixed(2)
      : 0;

    res.json({
      student,
      marks: fullMarksList,
      totalScored: scored,
      totalPossible: total,
      percentage,
      average
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

