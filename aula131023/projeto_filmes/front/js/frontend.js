// protocolo + baseURL + filmesEndpoint
// http://localhost:3000/filmes
const protocolo = "http://"
const baseURL = "localhost:3000"

// async = Função assíncrona, ou seja, ela não 
async function obterFilmes() {

    const filmesEndpoint = "/filmes"
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLCompleta)).data
    
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

    const filmesEndpoint = "/filmes"
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`

    // Pegamos o índice dos dois campos de texto da árvore DOM
    // Identificando-os por seus IDs
    let tituloInput = document.querySelector("#titulo-input")
    let sinopseInput = document.querySelector("#sinopse-input")

    // Pegamos os valores escritos em cada campo de texto
    // Utilizando a propriedade value
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value

    if (titulo && sinopse){
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

        exibirAlerta(".alert-filme", "Filme cadastrado com sucesso",
            ["show", "alert-success"], ["d-none", "alert-danger"], 2000
        )

    } else {
        exibirAlerta(".alert-filme", "Preencha todos os campos",
            ["show", "alert-danger"], ["d-none", "alert-success"], 2000
        )
    }
}

// Programando o envio da requisição do tipo POST para
// Cadastrar um usuário. A requisição é enviada do
// Cliente (front end) para o servidor (back end) da aplicação.
async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput")
    let passwordCadastroInput = document.querySelector("#passwordCadastroInput")

    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value

    if(usuarioCadastro && passwordCadastro) {
        // Envio da requisição POST para o endpoint "/signup"
        try {
            const cadastroEndpoint = "/signup"
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}` // URLCompleta === "https://localhost:3000/signup"
            
            await axios.post(URLCompleta, {login: usuarioCadastro, password: passwordCadastro})

            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""

            // Mostrando alerta de cadastrado com sucesso
            exibirAlerta(".alert-modal-cadastro", "Usuário cadastrado com sucesso!",
                ["show", "alert-success"], ["d-none", "alert-danger"], 2000
            )
            
            /*  

            // Código para fechar a modal:
            // Pegamos o índice da instância atual da modal
            let modalCadastro = bootstrap.Modal.getInstance(
                document.querySelector("#modalCadastro")
            )
            modalCadastro.hide()

            */

        } catch (err) {
            exibirAlerta(".alert-modal-cadastro", "Erro ao cadastrar usuário",
                ["show", "alert-danger"], ["d-none", "alert-success"], 2000
            )
        }
    } else {
        exibirAlerta(".alert-modal-cadastro", "Preencha todos os campos",
            ["show", "alert-danger"], ["d-none", "alert-success"], 2000
        )
    }
}

// Seletor = identificador do elemento que será utilizado para exibir o alerta na árvore DOM do HTML
// innerHTML = conteúdo adicionado dentro do elemento selecionado
function exibirAlerta(selector, innerHTML, classesToAdd, classesToRemove, timeout) {
    // Identificamos o elemento da árvore DOM que queremos alterar
    let alert = document.querySelector(selector)

    // Adicionamos o texto ao elemento selecionado
    alert.innerHTML = innerHTML

    // ... -> Operador spread: recebe uma lista ou string e e adiciona cada elemento um a um
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove("show")
        alert.classList.add("d-none")
    }, timeout)
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector("#usuarioLoginInput")
    let passwordLoginInput = document.querySelector("#passwordLoginInput")

    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value

    if(usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = "/login"
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            
            const response = await axios.post(
                URLCompleta, {login: usuarioLogin, password: passwordLogin}
            )

            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""

            exibirAlerta(".alert-modal-login", "Login efetuado com sucesso!",
                ["show", "alert-success"], ["d-none", "alert-danger"], 2000
            )

            const cadastrarFilmeButton = document.querySelector("#cadastrarFilmeButton")

            cadastrarFilmeButton.disabled = false

        } catch {
            exibirAlerta(".alert-modal-login", "Erro ao fazer login",
                ["show", "alert-danger"], ["d-none", "alert-success"], 2000
            )
        }
    } else {
        exibirAlerta(".alert-modal-login", "Preencha todos os campos",
            ["show", "alert-danger"], ["d-none", "alert-success"], 2000
        )
    }
}