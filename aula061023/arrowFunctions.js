const hello = () => console.log("Hello");
hello();

const dobro = (valor) => valor * 2;
console.log(dobro(10));

// Se a arrow function possui mais de uma linha de instrução, é necessário utilizar
// Chaves e explicitamente escrever o comando return
const triplo = (valor) => {
    console.log("Calculando o triplo do valor recebido...");
    return valor * 3;
}

const EhPar = (n) => (n % 2 === 0);
console.log(EhPar(2), EhPar(3));