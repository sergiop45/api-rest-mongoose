const mongose = require("mongoose");

const Alunos = new mongose.model("Alunos", {
    nome: String,
    matricula: Number,
    bolsista: Boolean
});

module.exports = Alunos;