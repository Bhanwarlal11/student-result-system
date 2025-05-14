const Subject = require("../models/Subject");

// Create subject
exports.createSubject = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await Subject.findOne({ name });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Subject already exists." });
    }

    const subject = await Subject.create({ name });
    res.status(201).json({ success: true, data: subject });
  } catch (err) {
    next(err);
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    res.json({ success: true, data: subjects });
  } catch (err) {
    next(err);
  }
};

// Update subject by ID
exports.updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Subject.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete subject by ID
exports.deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Subject.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    res.json({ success: true, message: "Subject deleted successfully" });
  } catch (err) {
    next(err);
  }
};
