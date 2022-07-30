require("dotenv").config();

const { StatusCodes } = require("http-status-codes");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticate = async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, picture, given_name, family_name } = ticket.getPayload();

  res
    .status(StatusCodes.OK)
    .json({ name, picture, username: `${given_name + family_name}` });
};

module.exports = { authenticate };
