const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Import your Feedback model

// DELETE route for deleting feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Failed to delete feedback' });
  }
});

module.exports = router;
