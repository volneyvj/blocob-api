const { Router } = require('express');

const classifiedRepo = require('../repository/classifieds.dao');

const router = Router();

router.post('/list', async (req, res) => {
    const { neighborhood } = req.body
  try {
    const classifieds = await classifiedRepo.getAllFromNeighborhood(neighborhood);
    res.status(200).json(classifieds);
  } catch (error) {
    res.status(500).json({ message: 'Error while get classifieds' });
  }
});


router.post('/list/search', async (req, res) => {
    const { search } = req.body
    try {
      const classifieds = await classifiedRepo.getAllFromQuery(search);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });

  
  router.post('/list/sort', async (req, res) => {
    const { neighborhood } = req.body
    try {
      const classifieds = await classifiedRepo.getTopEight(neighborhood);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });
  
  router.post('/list/user', async (req, res) => {
    const { userID } = req.body
    try {
      const classifieds = await classifiedRepo.getAllFromUser(userID);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const classifieds = await classifiedRepo.getSingleClassified(id);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });


router.post('/add', async (req, res) => {
  try {
    const newClassified = await classifiedRepo.addClassified(req.body);
    res.status(201).json(newClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While create new Classified' });
  }
});

router.post('/edit/', async (req, res) => {
    const { id, userID, subcategory, title, neighborhood, description, imgURL, price, measure, delivery, motive, investiment, filePDF, address, desiredDate, status} = req.body
  try {
    const newClassified = await classifiedRepo.updateClassified({ id, userID, subcategory, title, neighborhood, description, imgURL, price, measure, delivery, motive, investiment, filePDF, address, desiredDate, status });
    res.status(201).json(newClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While editing Classified' });
  }
});

router.post('/rank/', async (req, res) => {
    const {id, likes, dislikes } = req.body
  try {
    const rankedClassified = await classifiedRepo.updateClassified({ id, likes, dislikes });
    res.status(201).json(rankedClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While ranking Classified' });
  }
});


router.post('/delete/', async (req, res) => {
    const { id } = req.body
  try {
    const deletedClassified = await classifiedRepo.deletedClassified(id);
    res.status(201).json(deletedClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While deleting Classified' });
  }
});

module.exports = router;
