v1 = []; // Tamanho do vetor é atribuído de forma dinâmica
v1[0] = 3.4; // Valor de posição 0
v1[10] = 2; // Valor de posição 10, dinamicamente aumenta o tamanho do vetor para 11
v1[2] = "abc"; // Valor de posição 2 
console.log(v1.length); // Imprime 11, o número de posições no vetor (de 0 a 10)

// Declarando explicitamente
v2 = [2, 'abc', true];
console.log(v2);

// Iterar (percorrer) a coleção
for(let i = 0; i < v2.length; i++){
    console.log(v2[i]);
}

const nomes = ["Ana Maria", "Antônio", "Rodrigo", "Alex", "Cristina"];
const apenasComA = nomes.filter((n) => n.startsWith("A"));
console.log(apenasComA);

// Função map() e charAt()
const res = nomes.map((nome) => nome.charAt(0));
console.log(res);

// Verifica se todas as posições do vetor seguem a condição startsWith("A")
const todosComecamComA = nomes.every((n) => n.startsWith("A"));
console.log(todosComecamComA);

// Testando a função reduce(), a qual percorre cada valor de um vetor somando-o a um contador a cada iteração 
const valores = [1, 2, 3, 4];
const soma = valores.reduce((ac, v) => ac + v);
console.log(soma);