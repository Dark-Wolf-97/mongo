const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nome: String,
  sobrenome: String,
  cpf: String,
  telefone: String,
  endereco: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
