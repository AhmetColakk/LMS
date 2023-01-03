const Announcement = require('../model/announcementModel');
const { isValidObjectId } = require('mongoose');
const { isStrongPassword } = require('validator');

const getSingelAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      res.status(400).json({ err: 'The id is not valid' });

    const announcement = await Announcement.findById(id);
    if (!announcement) res.status(400).json({ err: 'announcement not found' });

    return res.status(200).json({ announcement });
  } catch (err) {
    console.error(err);
  }
};
const getAllAnnouncement = async (req, res) => {
  try {
    const allAnnouncement = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(allAnnouncement);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ err: 'The id is not valid' });
    }
    const announcement = await Announcement.findByIdAndDelete({ _id: id });
    if (!announcement) {
      return res.status(400).json({ err: 'announcement not found' });
    }
    return res
      .status(200)
      .json({ message: 'announcement has been successfully deleted.' });
  } catch (err) {
    console.error(err);
  }
};
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ err: 'The id is not valid' });
    }
    if (title.length < 3)
      return res
        .status(404)
        .json({ err: 'Please enter at least 3 characters' });
    if (!text)
      return res.status(404).json({
        err: 'Please fill the text field',
      });
    const newValues = {};
    title && Object.assign(newValues, { title });
    text && Object.assign(newValues, { text });

    console.log(newValues);
    const announcement = await Announcement.findOneAndUpdate(
      { _id: id },
      { ...newValues },
    );

    if (!announcement) {
      return res.status(400).json({ err: 'announcement not found' });
    }
    const updatedAnnouncement = await Announcement.findById({ _id: id });
    return res.status(200).json({ updatedAnnouncement });
  } catch (err) {
    console.error(err);
  }
};
const createAnnouncement = async (req, res) => {
  try {
    const { title, text } = req.body;

    const emptyField = [];

    !title ? emptyField.push('title') : null;
    !text ? emptyField.push('text') : null;
    if (emptyField.length > 0) {
      return res
        .status(400)
        .json({ error: 'Please fill in all field', emptyField });
    }

    const announcement = await Announcement.create({
      title,
      text,
    });

    res.status(200).json({ announcement });
  } catch (err) {
    res.status(404).json({ err: 'Something went wrong' });

    console.error(err);
  }
};

module.exports = {
  getSingelAnnouncement,
  getAllAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  createAnnouncement,
};
