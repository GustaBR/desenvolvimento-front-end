// protocolo + baseURL + filmesEndpoint
// http://localhost:3000/filmes
const protocolo = "http://"
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes"

// async = Função assíncrona, ou seja, ela não 
async function obterFilmes() {
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLCompleta)).data
    console.log(filmes)
    
    // document representa a árvore DOM da página
    // querySelector pega uma das tags existentes na
    // DOM de acordo com o seletor passado por parâmetro
    // Neste caso, a tag cuja classe é filmes
    // Dessa forma, a variável tabela armazena
    // O índice da tag table da árvore DOM
    let tabela = document.querySelector(".filmes")
    // Entre as tags filhas da tabela, pegamos a tag com nome "tbody"
    let corpoTabela = tabela.getElementsByTagName("tbody")[0]
    for(let filme of filmes) {
        // insertRow(0) adiciona uma nova linha no índice 0 da tabela
        // E ao mesmo tempo retorna o índice da nova tag criada
        let linha = corpoTabela.insertRow(0)
        // Adiciona uma nova coluna (da esquerda para a direita) em linha
        // E guarda o índice da nova coluna adicionando em celulaTitulo
        let celulaTitulo = linha.insertCell(0)
        // Adiciona uma nova coluna (da esquerda para a direita) em linha
        // E guarda o índice da nova coluna adicionando em celulaSinopse
        let celulaSinopse = linha.insertCell(1)
        // Propriedade innerHTML adiciona conteúdo dentro da célula (no HTML)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

// Programando o envio da requisição do tipo POST para
// Cadastrar um novo filme. A requisição é enviada do
// Cliente (front end) para o servidor (back end) da aplicação
async function cadastrarFilme() {
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`

    // Pegamos o índice dos dois campos de texto da árvore DOM
    // Identificando-os por seus IDs
    let tituloInput = document.querySelector("#titulo-input")
    let sinopseInput = document.querySelector("#sinopse-input")

    // Pegamos os valores escritos em cada campo de texto
    // Utilizando a propriedade value
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value

    // Limpando os valores dos campos
    tituloInput.value = ""
    sinopseInput.value = ""

    // Enviamos os dados do filme para serem cadastrados no back end (servidor)
    // O back end faz o cadastro e retorna a lista de filmes
    // Atualizada que guardamos na constante "filmes"
    const filmes = (await axios.post(URLCompleta, {titulo, sinopse})).data

    // Identificamos a tag referente à tabela de filmes a partir da sua classe
    let tabela = document.querySelector(".filmes")
    
    // Percore as filhas da tabela para identificar a tag de nome "tbody"
    let corpoTabela = tabela.getElementsByTagName("tbody")[0]
    
    // Limpamos o conteúdo atual da tabela
    corpoTabela.innerHTML = ""

    // Atualizar a tabela considerando o novo filme cadastrado
    for(let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}


