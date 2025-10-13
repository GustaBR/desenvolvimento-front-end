// Constante express carrega uma função que carrega as funções do pacote 'express'
const express = require('express')
// Com a chamada da função express, as funções do pacote são carregadas em app
const app = express()


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

app.listen(3000, () => console.log("up and running"))

// Dados de filmes em formato JSON
let filmes = [
    // Primeiro filme
    {titulo: "Forest Gump", sinopse: "Quarenta anos da história dos Estados Unidos..."},
    // Segundo filme
    {titulo: "Um Sonho de Liberdade", sinopse: "Em 1948, um jovem bem sucedido..."},
    // Terceiro filme
    {titulo: "Senhor dos Anéis", sinopse: "Tem que jogar o anel no vulcão..."}
]

// Requisição do tipo GET
// localhost:3000/filmes

app.get('/filmes', (req, res) => {
    res.json(filmes)
})

app.use(express.json());

// Requisição do tipo post, ou seja, o cliente também envia informações além de receber uma resposta
app.post('/filmes', (req, res) => {
    // Obtemos os dados no corpo da requisição, ou seja, os dados enviados pelo Cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    // Monta um objeto chave/valor para representar o novo filme
    const filme = {titulo: titulo, sinopse: sinopse};
    // Adiciona o novo filme à base
    filmes.push(filme);
    // Respondemos à requisição do Cliente, enviando a lista de filmes atualizada
    res.json(filmes);
})