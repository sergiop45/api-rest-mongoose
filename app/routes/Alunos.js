const router = require("express").Router();
const Alunos = require("../../models/Alunos"); 

//POST

router.post("/alunos", async (req, res) => {
    let {nome, matricula, bolsista} = req.body;

    if(!nome) {
        res.status(422).json({message: "Nome do aluno obrigatorio"})
    }
    if(!matricula) {
        res.status(422).json({message: "Matricula do aluno obrigatorio"})
    }
    if(bolsista == undefined) {
        res.status(422).json({message: "Campo bolsista obrigatorio"})
    }

    const aluno = {
        nome,
        matricula,
        bolsista
    }
    
    try {
        await Alunos.create(aluno).then(() => {
            res.status(201).json(aluno);
        });
    } catch (err) {
        res.status(500).json({message: err});
    }

});


//GET ALL

router.get("/alunos", async (req, res ) => {

    try {
        const alunos = await Alunos.find();
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({message: "erro servidor " + err})
    }


});

//GET

router.get("/alunos/:id", async (req, res) => {

    let id = req.params.id;

    try {

        let aluno = await Alunos.findOne({_id: id});

        if(aluno != undefined) {

            res.status(200).json(aluno);
            
        } else {

            res.status(422).json({message: "Aluno não encontrado!"});

        }
        

    } catch (err) {

        res.status(500).json({message: "erro: " + err});

    }

});


//DELETE 

router.delete("/alunos/:id", async (req, res) => {
    
    let id = req.params.id;

    try {

        let aluno = await Alunos.findOne({_id: id});

        if(aluno != undefined) {

            await Alunos.deleteOne({_id: id})

            res.status(200).json({message: "Aluno Excluido com sucesso!"});

        } else {

            res.status(422).json({ message: "Aluno não encontrado"});

        }

    } catch (err) {

        res.status(500).json({ message: "Erro ao deletar: " + err});

    }

});

//PATCH

router.patch("/alunos/:id", async (req, res) => {

    let id = req.params.id;
    let {nome, matricula, bolsista} = req.body;

    let aluno = await Alunos.findOne({_id: id});

    if(!aluno) {
        res.status(422).json({message: "Aluno não encontrado!"});
    }

    try {

        let updateAluno = {
            nome,
            matricula,
            bolsista
        }

        await Alunos.updateOne({_id: id}, updateAluno);

        if(updateAluno.matchedCount === 0) {
            res.status(422).json({message: "Aluno nao encontrado"});
        }

        res.status(200).json(updateAluno);

    } catch (err) {

        res.status(500).json({message: "Erro ao atualizar: " + err});

    }

    


});

module.exports = router;