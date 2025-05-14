const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Mark = require('../models/Mark');

exports.getOverviewData = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalMarksEntries = await Mark.countDocuments();

    const marks = await Mark.find();

    const totalScored = marks.reduce((acc, m) => acc + m.scoredMarks, 0);
    const totalPossible = marks.reduce((acc, m) => acc + m.totalMarks, 0);
    const averagePercentage = totalPossible
      ? ((totalScored / totalPossible) * 100).toFixed(2)
      : 0;

    // Subject-wise average
    const subjectMarks = await Mark.aggregate([
      {
        $group: {
          _id: "$subjectId",
          avgScore: { $avg: "$scoredMarks" },
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "_id",
          as: "subject"
        }
      },
      {
        $unwind: "$subject"
      },
      {
        $project: {
          _id: 0,
          subjectName: "$subject.name",
          avgScore: 1
        }
      }
    ]);

    // Top 5 performers
    const studentMarks = await Mark.aggregate([
      {
        $group: {
          _id: "$studentId",
          scored: { $sum: "$scoredMarks" },
          total: { $sum: "$totalMarks" },
        },
      },
      {
        $project: {
          studentId: "$_id",
          percentage: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $round: [{ $multiply: [{ $divide: ["$scored", "$total"] }, 100] }, 2] },
            ],
          },
        },
      },
      { $sort: { percentage: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      {
        $project: {
          name: "$student.name",
          percentage: 1,
          avatar: "$student.avatar",
        },
      }
    ]);

    res.json({
      stats: {
        totalStudents,
        totalSubjects,
        totalMarksEntries,
        averagePercentage,
      },
      subjectAverages: subjectMarks,
      topPerformers: studentMarks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};