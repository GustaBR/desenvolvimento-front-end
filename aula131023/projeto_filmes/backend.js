// Constante express carrega uma função que carrega as funções do pacote 'express'
const express = require('express')
// Carregamos também o pacote cors em uma constante
const cors = require('cors')
// Com a chamada da função express, as funções do pacote são carregadas em app
const app = express()
app.use(express.json())
app.use(cors())

require("dotenv").config()

// Carregamos as funções do mongoose para uma constante
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// Carregando as funçõesdo bcrypt
const bcrypt = require("bcrypt")

// Parâmetros do método model: (nome, estrutura) do Schema
const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema(
    {
        login: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }
)

// O plugin vai garantir que todos os atributos de usuarioSchema
// Marcados com unique: true não possam ser repetidos
usuarioSchema.plugin(uniqueValidator)

// Define o modelo do usuário dentro do projeto. ({nome: "Usuario", estrutura: usuarioSchema}) 
const Usuario = mongoose.model("Usuario", usuarioSchema)

// Função para fazer a conexão com o MongoDB
// Precisamos esperar (await) que o MongoDB retorne
// A confirmação de conexão, por isso a função é assíncrona
async function conectarAoMongoDB() {
    const usuario = process.env.MONGO_USER
    const senha = process.env.MONGO_PASSWORD
    await mongoose.connect(`mongodb+srv://${usuario}:${senha}@cluster0.ucfxhjr.mongodb.net/?appName=Cluster0`)
}

// Criamos um endpoint (padrão de acesso), ou seja, um endereço por onde nosso
// servidor consegue receber requisições HTTP
// GET = requisição que não envia nenhuma informação, só solicita uma resposta.


// req (request): se refere ao corpo da requisição: as informações que são enviadas
// res (response): se refere à resposta da requisção e res.send() configura um valor
// que podemos enviar como resposta

// localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send("hey")
})

app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("Up and running!")
    } catch (error) {
        console.log("Erro:", error)
    }
})

// Requisição do tipo GET
// localhost:3000/filmes

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

// Requisição do tipo post, ou seja, o cliente também envia informações além de receber uma resposta
app.post('/filmes', async (req, res) => {
    
    // Obtemos os dados no corpo da requisição, ou seja, os dados enviados pelo Cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    
    // Monta um objeto baseado na estrutura do Schema Filme para representar o novo filme
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    
    // Salvando o novo filme no Schema do MongoDB
    await filme.save()

    // Filme.find() retorna todos os cadastros no cluster que respeitam a estrutura do Schema Filme
    const filmes = await Filme.find()

    // Respondemos à requisição do Cliente, enviando a lista de filmes atualizada
    res.json(filmes);
})

// Programando a resposta do nosso servidor (backend) quando
// Ele recebe uma requisição HTTP do tipo post no endpoint "/signup"
app.post("/signup", async (req, res) => {
    try {
        // Passamos o login e senha recebidos no corpo da requisição
        const login = req.body.login
        const password = req.body.password

        // Guarda a senha criptografada
        // Quanto mais alto for o número passado, mais complexa é a criptografia
        // (E, portanto, mais segura), porém gasta mais memória
        const criptografada = await bcrypt.hash(password, 10)

        // Usamos as constantes para criar um novo usuário utilizando o modelo Usuario
        // Composto pelo login e senha enviados na requisição
        const usuario = new Usuario({login: login, password: criptografada})

        // Chamamos a função .save() para cadastrar esse novo usuário no MongoDB
        // Guarda a confirmação do cadastro (ou um erro) dentro da constante
        const respMongo = await usuario.save()
        console.log(respMongo)

        // Encerrando a requisição
        // 200 = OK; 201 = OK e Novo cadastro
        res.status(201).end()

    } catch (error) { // Se der erro durante o cadastro
        console.log("Erro:", error)
        res.status(409).end()
    }
})

app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios)
})