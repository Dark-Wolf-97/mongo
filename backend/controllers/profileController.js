const Profile = require("../models/Profile");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) return res.status(404).json({ message: "Perfil não encontrado" });
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const saveProfile = async (req, res) => {
  const { nome, sobrenome, cpf, telefone, endereco } = req.body;
  try {
    let profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      profile = new Profile({ userId: req.userId, nome, sobrenome, cpf, telefone, endereco });
      await profile.save();
    } else {
      profile.set({ nome, sobrenome, cpf, telefone, endereco });
      await profile.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { getProfile, saveProfile };
