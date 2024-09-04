const listaPalavras = require('../data/palavras');
const readline = require('readline-sync');
const Forca = require('./forca');

const jogo = new Forca(listaPalavras);
let resultado;
do {
    console.log(resultado);
    console.log("\nPalavras acertadas: ", jogo.listaPalavrasAcertadas);
    console.log(jogo.buscarDadosDoJogo());
    
    const chute = readline.question(`Dica: ${jogo.categoria}, ${jogo.palavra.length} letras\nAguardando chute: \n`);
    jogo.chutar(chute);
    resultado = jogo.buscarEstado();
}
while (!["perdeu", "ganhou"].includes(resultado))

console.log("você " + resultado);
