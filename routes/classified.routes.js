const { Router } = require('express');

const classifiedRepo = require('../repository/classifieds.dao');

const router = Router();

const uploader = require('../config/cloudinary-setup-config');
 

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
  const { neighborhood, query} = req.body
    try {
      const classifieds = await classifiedRepo.getAllFromQuery({neighborhood, query});
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
    try {
      const classifieds = await classifiedRepo.getAllFromUser(req.body);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });

  router.get('/:id', async (req, res) => {
    const id  = req.params.id
    try {
      const classifieds = await classifiedRepo.getSingleClassified(id);
      res.status(200).json(classifieds);
    } catch (error) {
      res.status(500).json({ message: 'Error while get classifieds' });
    }
  });



router.post('/add', uploader.single('imgURL'), async (req, res) => {
  const { userID, category, subcategory, title, neighborhood, description, price, measure, motive, investment, filePDF, address, desiredDate, status } = req.body;
  let imgURL = "https://res.cloudinary.com/dmljk0bkp/image/upload/v1619569135/blocob-gallery/qnradxhwgrejldvtpx9e.jpg"
  try {
    if (req.file) {
       imgURL = req.file.path
    }
    const newClassified = await classifiedRepo.addClassified({
     userID, category, subcategory, title, neighborhood, description, price, measure, motive, investment, filePDF, address, desiredDate, status, imgURL
    });
    res.status(201).json(newClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While create new Classified' });
  }
});


router.post('/edit/', uploader.single('imgURL'), async (req, res) => {
    const { id, userID, subcategory, title, neighborhood, description, price, measure, delivery, motive, investment, filePDF, address, desiredDate, status} = req.body
    let imgURL = "https://res.cloudinary.com/dmljk0bkp/image/upload/v1619569135/blocob-gallery/qnradxhwgrejldvtpx9e.jpg"
    try {
      if (req.file) {
        imgURL = req.file.path
      }
    const newClassified = await classifiedRepo.updateClassified({ id, userID, subcategory, title, neighborhood, description, imgURL, price, measure, delivery, motive, investment, filePDF, address, desiredDate, status });
    res.status(201).json(newClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While editing Classified' });
  }
});

router.post('/rank/', async (req, res) => {
    const {id, likes } = req.body
  try {
    const rankedClassified = await classifiedRepo.rankClassified({ id, likes });
    res.status(201).json(rankedClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While ranking Classified' });
  }
});

router.post('/checkrank/', async (req, res) => {
  const {id, likes } = req.body
  try {
    const userLiked = await classifiedRepo.checkRankClassified({id, likes});
    res.status(201).json(userLiked);
  } catch (error) {
    res.status(500).json({ message: 'Error while checking rank' });
  }
});

router.post('/delete/', async (req, res) => {
    const { id } = req.body
  try {
    const deletedClassified = await classifiedRepo.deleteClassified(id);
    res.status(201).json(deletedClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While deleting Classified' });
  }
});

router.post('/checklike/', async (req, res) => {
  const {id, likes } = req.body
  try {
    const rankedClassified = await classifiedRepo.rankClassified({ id, likes });
    res.status(201).json(rankedClassified);
  } catch (error) {
    res.status(500).json({ message: 'Error While ranking Classified' });
  }
});


module.exports = router;
