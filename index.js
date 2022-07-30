//pacotes

const express = require("express");
const app = express();
const mongose = require("mongoose");
const router = require("./app/routes/Alunos");


//banco de dados
mongose.connect("mongodb+srv://sergio:455130@cluster0.iwiil24.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log("Conectou ao Banco de Dados..."))
        .catch((err) => {
            console.log("Erro ao conectar ao Banco de dados. Erro: " + err);
        });



//utilizar json

app.use( express.urlencoded ({
    extended: true
}));
app.use(express.json());

//ROTAS

app.use("/api/", router);

//rota inicial

app.get("/", (req, res) => {
    res.status(200).json({message: "Bem Vindo A minha API!"});
});

//porta de acesso

app.listen(3000, (req, res ) => {
    console.log("Servidor rodando PORT: 3000");
});