const Wallet = require("../models/Wallet");

const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) return res.status(404).json({ message: "Carteira não encontrada" });
    res.json({ wallet });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const addSaldo = async (req, res) => {
  const { valor } = req.body;
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      const newWallet = new Wallet({ userId: req.userId, saldo: valor });
      await newWallet.save();
      return res.json({ success: true, wallet: newWallet });
    }

    wallet.saldo += valor;
    await wallet.save();
    res.json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

module.exports = { getWallet, addSaldo };
