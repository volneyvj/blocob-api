const { Router } = require('express');

const commentRepo = require('../repository/comments.dao');

const router = Router();

router.post('/list', async (req, res) => {
    const { payload } = req.body
  try {
    const comments = await commentRepo.getComment(payload);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error while getting comments' });
  }
});


router.post('/list/answer', async (req, res) => {
    const answerOriginID = req.body
    try {
      const comment = await commentRepo.getAnsweredComment(answerOriginID);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting comment' });
    }
  });



router.post('/add', async (req, res) => {
    const {  userID, category, classifiedID, answerOriginID, comment, status } = req.body
  try {
    const newComment = await commentRepo.postComment({  userID, category, classifiedID, answerOriginID, comment, status });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error While create new comment' });
  }
});

router.post('/rank/', async (req, res) => {
    const {id, likes, dislikes } = req.body
  try {
    const rankedComment = await commentRepo.rankComment({ id, likes, dislikes });
    res.status(201).json(rankedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error While ranking comment' });
  }
});


router.post('/delete/', async (req, res) => {
    const { id } = req.body
  try {
    const deletedComment = await commentRepo.deleteComment(id);
    res.status(201).json(deletedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error While deleting comment' });
  }
});

module.exports = router;
