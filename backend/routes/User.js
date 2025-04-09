const { Router } = require("express");
const User = require("../model/User");
const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordandgeneratetoken(email, password);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // Set secure flag in production
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});



module.exports = router;
