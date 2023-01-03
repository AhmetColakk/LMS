const express = require('express');
const {
  getAllAnnouncement,
  getSingelAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  createAnnouncement,
} = require('../controller/announcementController');
const router = express.Router();

router.get('/:id', getSingelAnnouncement);
router.get('', getAllAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.patch('/:id', updateAnnouncement);
router.post('', createAnnouncement);

module.exports = router;
