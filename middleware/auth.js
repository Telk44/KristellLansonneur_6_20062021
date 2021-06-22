const jwt = require('jsonwebtoken');

//vérifier que token envoyé est valable et que userId correspond à celui encodé dans le token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '5E90E2511C9E629F86ACBB4762CF7A6B4C726D4AF780C8EEA040BA0A036CA233');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};