const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../erros');
const { createTokenUsers, createJWT } = require('../../utils');
// const { createUserRefreshToken } = require('./refreshToken');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenUsers(result) });

//   const refreshToken = createRefreshJWT({ payload: createTokenUsers(result) });
//   await createUserRefreshToken({
//     refreshToken,
//     user: result._id,
//   });

  return { token, role: result.role, email: result.email };
};

module.exports = { signin };