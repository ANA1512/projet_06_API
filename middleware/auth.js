const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
       //get token number only
       const token = req.headers.authorization.split(' ')[1];

       // decoder token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

       //  userId and Token must be the same
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
