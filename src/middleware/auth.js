import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');

    const { usuarioId } = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = usuarioId;

    next();
  } catch (error) {
    res.status(401).send({ auth: false, message: 'Token Invalid.' });
  }

console.log(authorization);
}

export { isAuthenticated };