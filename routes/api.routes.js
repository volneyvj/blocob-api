const { Router } = require('express');

const jwt = require('jsonwebtoken');
const classifiedRoutes = require('./classified.routes');
const commentRoutes = require('./comment.routes');
const userRoutes = require('./user.routes');

const router = Router();

router.use('/user', userRoutes);

// middleware de jwt rotas protegidas!!

// router.use((req, res, next) => {
//   const token = req.get('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'request without token' });
//   }
//   const tokenWihoutBearer = token.split(' ')[1];

//   try {
//     const decodedToken = jwt.verify(
//       tokenWihoutBearer,
//       process.env.TOKEN_SECRET,
//     );
//     req.user = { id: decodedToken.id };
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token Expired' });
//   }
// });

router.use('/comment', commentRoutes);
router.use('/classified', classifiedRoutes);


module.exports = router;
