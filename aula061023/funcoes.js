/* Primeiro compila-se o código de todas as funções. Nesse momento,
Se existirem funções com o mesmo nome, a última versão escrita é a que prevalecerá.
Por essa razão, nenhuma das chamadas da função hello() produz "Oi" como output. */

function hello(){
    console.log("Oi")
}
hello(); // Inicialmente a função imprimiria "Oi", mas foi sobrescrita entre as linhas 10 e 12 de código.

function hello(nome){
    console.log("Hello, " + nome);
}
hello("Pedro");
hello();

// É possível guardar o retorno de uma função em uma constante ou variável
function soma(a, b){
    return a + b;
}
const res = soma(2, 3);
console.log(res); // Imprime 5

// É possível atribuir o retorno de uma função anônima a uma constante ou variável
const dobro = function(n){
    return n * 2;    
}
const resDobro = dobro(4);
console.log(resDobro);