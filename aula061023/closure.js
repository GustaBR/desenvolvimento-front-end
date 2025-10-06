// Funções como parâmetros de outras funções
// Teste para mostrar que funções são, de fato, cidadãs de primeira classe

// Podemos utilizar o retorno de uma função aninhada em outra função dentro dela
function g(){
    function outraFuncao(){
        console.log("Fui criado por outra função");
    }
    return outraFuncao();
}

// Chamamos a função f() que recebe outra função 