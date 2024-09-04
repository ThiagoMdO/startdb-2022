class Forca {
  constructor(listaPalavras) {
      this.listaPalavras = listaPalavras;
      this.categorias = Object.keys(listaPalavras);
      
      this.palavrasAcertadas = [];
      this.listaPalavrasAcertadas = {};
      this.categorias.forEach(categoria => {
          this.listaPalavrasAcertadas[categoria] = [];
      });

      this.iniciarNovaPalavra();
      
      this.letrasChutadas = [];
      this.vidas = 6;
      this.pontuacao = 0;
  }


  iniciarNovaPalavra() {
      do {
          this.categoria = this.categorias[Math.floor(Math.random() * this.categorias.length)];
          this.palavraSecreta = this.listaPalavras[this.categoria][Math.floor(Math.random() 
            * this.listaPalavras[this.categoria].length)].toLowerCase().split('');
      } while (this.palavrasAcertadas.includes(this.palavraSecreta.join('')));

      this.palavra = Array(this.palavraSecreta.length).fill('_');
      this.letrasChutadas = [];
  }

  chutar(letra) {
    
      if (letra.length !== 1 || this.letrasChutadas.includes(letra)) return;

      this.letrasChutadas.push(letra);

      if (this.palavraSecreta.includes(letra)) {
          this.palavraSecreta.forEach((l, index) => {
              if (l === letra) this.palavra[index] = l;
          });
      } else {
          this.vidas--;
      }

      this.verificarPalavra();
  }

  verificarPalavra() {
      if (this.palavra.join('') === this.palavraSecreta.join('') 
        && !this.palavrasAcertadas.includes(this.palavra.join(''))) {
          this.palavrasAcertadas.push(this.palavra.join(''));
          this.listaPalavrasAcertadas[this.categoria].push(this.palavra.join(''));
          this.pontuacao++;

          let estado = this.buscarEstado();
          if (estado === "ganhou" || estado === "perdeu") {
            return estado;
          }
        
          this.iniciarNovaPalavra();
      }
  }

  buscarEstado() {
      if (this.vidas === 0) return this.fimJogoLose();

      const totalPalavras = Object.values(this.listaPalavras)
      .reduce((acc, subArray) => acc + subArray.length, 0);

      const totalPalavrasAcertadas = Object.values(this.listaPalavrasAcertadas)
      .reduce((acc, subArray) => acc + subArray.length, 0);

      if (totalPalavras === totalPalavrasAcertadas) {
        return this.fimJogoWin();
      };

      return "aguardando chute";
  }

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas,
          vidas: this.vidas,
          palavra: this.palavra,
          palavrasAcertadas: this.palavrasAcertadas,
          pontuacao: this.pontuacao
      };
  }

  fimJogoWin(){
    console.log(
      "Parabéns você acertou todas palavras",
      {
        palavrasAcertadas: this.palavrasAcertadas,
        pontuacao: this.pontuacao
      }
    )
    return "ganhou";
  }

  fimJogoLose(){
    console.log(
      "Você não conseguiu terminar todas palavras, tente outra vez",
      {
        palavrasAcertadas: this.palavrasAcertadas,
        pontuacao: this.pontuacao
      }
    )
    return "perdeu";
  }
}

module.exports = Forca;