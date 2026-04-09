const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;



    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role
});
    res.json({ message: "User created", user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

 res.json({
  message: "Login successful",
  token,
  role: user.role
});
};
exports.testUser = (req,res)=>{
    res.send("User controller is working")
}
exports.getAllUsers =(req,res)=>{
    res.json({
        message : "All user fetched",
    })
}
