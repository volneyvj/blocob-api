const jwt = require("jsonwebtoken");
const { Router } = require("express");
const nodemailer = require("nodemailer");

const userRepo = require("../repository/user.dao");
const authUtils = require("../utils/auth.utils");

const router = Router();

const uploader = require("../config/cloudinary-setup-config");

router.post("/signup", async (req, res) => {
  try {
    const user = await userRepo.register(req.body);
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });
    res.set("Authorization", token);
    return res
      .status(201)
      .json({
        id: user._id,
        neighborhood: user.neighborhood,
        user: user.email,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Error while creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepo.findUser({ email });

  try {
    if (!user) {
      return res.status(400).json();
    }

    if (!authUtils.compare(password, user.passwordHash)) {
      console.log("senha INCORRETA");
      return res.status(400).json();
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });
    res.set("Authorization", token);
    return res
      .status(200)
      .json({
        id: user._id,
        neighborhood: user.neighborhood,
        user: user.email,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Error while login user" });
  }
});

router.post("/edit", uploader.single("imgURL"), async (req, res) => {
  const {
    id,
    email,
    cpf,
    username,
    password,
    name,
    lastName,
    cep,
    street,
    streetNumber,
    streetComplement,
    neighborhood,
    city,
    state,
    phone,
    mobile,
    birthDate,
    profession,
  } = req.body;
  
    let imgURL = "https://res.cloudinary.com/dmljk0bkp/image/upload/v1619569863/blocob-gallery/nijtixamh9dsmsj2nxaf.png"

  try {
    if (req.file) {
     imgURL = req.file.path;
    }
    const user = await userRepo.User.findByIdAndUpdate(
      id,
      {
        email,
        cpf,
        username,
        password,
        name,
        lastName,
        cep,
        street,
        streetNumber,
        streetComplement,
        neighborhood,
        city,
        state,
        phone,
        mobile,
        birthDate,
        profession,
        imgURL,
      },
      {
        new: true,
      }
    );
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/editCEP", async (req, res) => {
  const {
    id,
    cep,
    street,
    streetNumber,
    streetComplement,
    neighborhood,
    city,
    state,
  } = req.body.data;
  const zipdate = req.body.zipdate
  try {
    const user = await userRepo.User.findByIdAndUpdate(
      id,
      {
        cep,
        street,
        streetNumber,
        streetComplement,
        neighborhood,
        city,
        state,
        lastZipCodeUpdate: zipdate,
      },
      {
        new: true,
      }
    );
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/usersn", async (req, res) => {
  const { neighborhood } = req.body;
  try {
    const users = await userRepo.findNeighboors(neighborhood);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error while getting users" });
  }
});

router.post("/userdetails", async (req, res) => {
  const id = req.body;
  try {
    const user = await userRepo.findUserID(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error while getting user" });
  }
});

router.post("/allusers", async (req, res) => {
  const neighborhood = req.body;
  try {
    const user = await userRepo.findNeighboors(neighborhood);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error while getting user" });
  }
});

router.post('/rank/', async (req, res) => {
  const {id, likes } = req.body
try {
  const rankeduser = await userRepo.rankUser({ id, likes });
  res.status(201).json(rankeduser);
} catch (error) {
  res.status(500).json({ message: 'Error While ranking user' });
}
});

router.post('/checkrank/', async (req, res) => {
const {id, likes } = req.body
try {
  const userLiked = await userRepo.checkRankUser({id, likes});
  res.status(201).json(userLiked);
} catch (error) {
  res.status(500).json({ message: 'Error while checking rank' });
}
});

router.post('/disrank/', async (req, res) => {
  const {id, likes } = req.body
try {
  const disrankeduser = await userRepo.disrankUser({ id, likes });
  res.status(201).json(disrankeduser);
} catch (error) {
  res.status(500).json({ message: 'Error While ranking user' });
}
});

router.post('/checkdisrank/', async (req, res) => {
const {id, likes } = req.body
try {
  const userdisliked = await userRepo.checkDisrank({id, likes});
  res.status(201).json(userdisliked);
} catch (error) {
  res.status(500).json({ message: 'Error while checking rank' });
}
});


router.post("/forget", async (req, res) => {
  const { email } = req.body;
  const newpassword = `jb${Math.floor(Math.random()*999,0)}y`

  try {
    await userRepo.updatePassword(email, newpassword)
    await sendEmail(email, newpassword)
    res.status(200).json({msg: "enviado senha"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Error while getting user" });
  }
});

async function sendEmail(email, newpassword) {
  try {
    let htmlEmail = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div style='width: 100%; height: 100%; background-color: #fff'>
          <h4>Sua nova senha ??: <span>${newpassword}</h4></span>
        </div>
        <div> POR QUESTO??ES DE SEGURAN??A, N??O ESQUE??A DE ALTERAR SUA SENHA NA SUA P??GINA DE PERFIL. 
        </div>
    </body>
    </html>`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "blocobapp@gmail.com", pass: `${process.env.nodemailerCode}` },
    });
    let mail  = {
      from: "Blocob app",
      to: email,
      subject: "Redifini????o de Senha - blocoB",
      html: htmlEmail,
    }
    transporter.sendMail(mail, function (error, info) {
      if (error) console.log(error)
      else {
        return info
      }
    })
  } catch (error) {
    console.log(error.message)
    throw error;
  }
}

module.exports = router;
