// Em JavaScript, funções são cidadãs de primeira classe, ou seja

// Podem ser armazenadas em uma variável
let umaFuncao = function(){
    console.log("Fui armazenada em uma variável");
}
// E pode ser chamada assim
umaFuncao();

// Podem receber outra função como parâmetro
function f (funcao){
    funcao(); // Executando a função que veio como parâmetro
}

// Funções podem retornar outras funções
function g(){
    return function outraFuncao(){
        console.log("Fui criada por g");
    }
}

// Podemos chamar a função f() já criando outra função na passagem de parâmetro
f(function() {
    console.log("Estou sendo criada e passada como parâmetro na chamada de f()");
})

// Agora queremos executar a função que g() retorna
g() // Dessa forma a função "outraFuncao" é retornada porém não é executada
g()() // Dessa forma a função "outraFuncao" é retornada e também executada

// Podemos guardar o retorno de g() em uma constante ou variável
// E depois executar a função a partir da constante/variável em que foi armazenada

const gResult = g(); // Armazena a função "outraFuncao"
gResult(); // Executa a função "outraFuncao"

function ola() {
    let nome = "João";
    return function() {
        console.log("Olá, João");
    }
}

// Atribuímos o retorno da função como valor para a variável olaresult

olaresult = ola();
olaresult();

// O valor dos parâmetros que uma função recebem podem ser passados para suas funções internas
function saudacao(saudacao, nome) {
    return function() {
        console.log(saudacao + ", ", nome);
    }
}
let olaJoao = saudacao("Olá", "João")