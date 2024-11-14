const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Token gerado no signUp:", token); // Adicione este log para verificar o token
    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Token gerado no login:", token); // Adicione este log para verificar o token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { signUp, login };
