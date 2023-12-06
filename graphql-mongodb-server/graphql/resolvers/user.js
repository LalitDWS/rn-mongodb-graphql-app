const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function register(_, { registerInput: { email, password } }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const newUser = new User({ email: email, password: password });
  await newUser.save();

  return "Registration successful";
}

async function login(_, { loginInput: { email, password } }) {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.id },
    "ac2c15f4afc2832c5ccdb4ffa3413ea014bdada9e1c80f7070f441afd337b112",
    {
      expiresIn: "1h",
    }
  );

  return { token, userId: user.id };
}

module.exports = {
  Mutation: {
    register,
    login,
  },
};
