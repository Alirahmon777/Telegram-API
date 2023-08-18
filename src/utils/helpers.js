import { VerifyJwt } from './auth-helper.js';

export const duplicatedMiddlewares = (req, res, next, token) => {
  const options = (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next ? next() : null;
  };

  return VerifyJwt(token, options);
};

export const cleanNameFile = (name) => {
  try {
    return name.replace(/\s+/g, '_');
  } catch (error) {
    return error.message;
  }
};
