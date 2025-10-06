// Dinamicamente tipada
// Variável global
var linguagem = "Javascript"; // String

console.log("Aprendendo " + linguagem); // Aprendendo JavaScript

linguagem = "Java";

console.log("Aprendendo " + linguagem); // Aprendendo Java

var idade = 18;
const nome = "João";
console.log(`Oi, ${nome}`);

// Estrutura do condicional
if(idade >= 18){
    console.log(`Parabéns, ${nome}. Você pode dirigir!`);
}else{
    console.log(`${nome}, você não pode dirigir!`);
}