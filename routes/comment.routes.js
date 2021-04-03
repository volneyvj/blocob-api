const { Router } = require('express');

const commentRepo = require('../repository/comments.dao');

const router = Router();

router.get('/list', async (req, res) => {
    const { classifiedID } = req.body
  try {
    const comments = await commentRepo.getComment(classifiedID);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error while getting comments' });
  }
});


router.get('/list/answer', async (req, res) => {
    const answerOriginID = req.body
    try {
      const comment = await commentRepo.getAnsweredComment(answerOriginID);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting comment' });
    }
  });



router.post('/add', async (req, res) => {
    const {  userId, category, classifiedID, answerOriginID, comment, status } = req.body
  try {
    const newComment = await commentRepo.postComment({  userId, category, classifiedID, answerOriginID, comment, status });
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
