const jwt = require("jsonwebtoken");
const { Router } = require("express");

const userRepo = require("../repository/user.dao");
const authUtils = require("../utils/auth.utils");

const router = Router();

router.post("/signup", async (req, res) => {

  try {
    const user = await userRepo.register(req.body);
    // console.log(`esse eh o usuario ${user}`)
    //  res.set("Authorization", token);
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '12h',
    });
    res.set("Authorization", token);
    return res.status(201).json({ id: user._id, user: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Error while creating user' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepo.findUser({email});
  
try {
  if (!user) {
    return res.status(400).json();
  }

  if (!authUtils.compare(password, user.passwordHash)) {
    console.log('senha INCORRETA')
    return res.status(400).json();
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '12h',
  });
  res.set("Authorization", token);
  return res.status(200).json({ id: user._id, user: user.email, token });
} catch (error) {
  res.status(500).json({ message: 'Error while login user' });
}
});


router.post("/edit", async (req, res) => {
    const { id, email, cpf, username, password, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
        mobile, birthDate, profession, imgURL, score, lastZipCodeUpdate, status } = req.body;
   try {
        const user = await userRepo.User.findByIdAndUpdate(
        id, {
            email, cpf, username, password, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
            mobile, birthDate, profession, imgURL, score, lastZipCodeUpdate, status
        }, {
          new: true
        }
      );
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error while editing user' });
  }
  });

  router.post('/usersn', async (req, res) => {
    const { neighborhood } = req.body
    try {
      const users = await userRepo.findNeighboors(neighborhood);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting users' });
    }
  });

  router.post('/userdetails', async (req, res) => {
    const id = req.body
    try {
      const user = await userRepo.findUserID(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting user' });
    }
  });

  router.get('/allusers', async (req, res) => {
    const email = req.body
    try {
      const user = await userRepo.findAllUsers();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting user' });
    }
  });

  
  
module.exports = router;
