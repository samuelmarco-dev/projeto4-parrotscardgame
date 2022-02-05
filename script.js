/* 1º-> Ao entrar no jogo deveremos fazer um laço de repetição até que um número
válido de cartas seja digitado pelo usuário, o número de cartas válido está entre
4 e 14 e obrigatoriamente deve ser par */

let numeroDeCartas = parseInt(prompt("Insira o número de cartas para o jogo, de 4 a 14 cartas."));
let arrayDeGifs = [
'./assets/1.gif', './assets/1.gif', './assets/2.gif', './assets/2.gif', './assets/3.gif', './assets/3.gif', './assets/4.gif',
'./assets/4.gif', './assets/5.gif', './assets/5.gif', './assets/6.gif', './assets/6.gif', './assets/7.gif', './assets/7.gif'
];
let arrayDeCartas = [];
let primeiraCarta;
let segundaCarta;

// console.log(primeiraCarta, segundaCarta);

function verificarNCartas(){
    while(numeroDeCartas<4 || numeroDeCartas>14 || numeroDeCartas%2 !==0){
        numeroDeCartas = parseInt(prompt("Insira o número de cartas para o jogo, de 4 a 14 cartas."));
    }
    console.log(numeroDeCartas)
}
verificarNCartas();

// Função para embaralhar o array de cartas do jogo
function comparador() { 
    return Math.random() - 0.5; 
}

function atribuirCartasNoArray(){
    for(let index=0; index<numeroDeCartas; index++){
        arrayDeCartas[index] = arrayDeGifs[index];
    }
    return arrayDeCartas.sort(comparador);
}
atribuirCartasNoArray();

/* 2º-> Inserir as o número de cartas válidas de forma dinâmica de acordo com o 
HTML e após isso, embaralhar o array de cartas */
function carregarNumeroDeCartas(atribuirCartasNoArray){
    const sectionDeCartas = document.querySelector('main section');
    sectionDeCartas.innerHTML = '';
    
    for(let indice=0; indice<numeroDeCartas; indice++){
        sectionDeCartas.innerHTML = sectionDeCartas.innerHTML + `
        <div class="cartas-jogo" data-identifier="card" onclick="virarCarta(this)">
            <div class="frente-carta face" data-identifier="front-face">
                <img src="./assets/front.png" alt="Papagaios da Memória">
            </div>
            <div class="verso-carta face aparecer-verso-carta" data-identifier="back-face">
                <img src="${arrayDeCartas[indice]}" alt="Gif">
            </div>    
        </div>
        `
    }
}
carregarNumeroDeCartas();
// console.log(arrayDeGifs, arrayDeCartas);


let contadorClick = 0;
/* 2.1-> Habilitar a rotação no clique da carta de acordo com os efeitos do CSS, 
aplicados na frente e atrás da carta */

/* 3º-> Ao clicar em uma carta, a mesma deve ser virada. Caso seja a primeira carta
de um dos pares do array, deve permancer virada até que o usuário escolha a segunda
carta que deseja virar */
function virarCarta(cartaSelecionada){
    const frenteCarta = cartaSelecionada.querySelector('.frente-carta');
    frenteCarta.classList.add('apagar-papagaio');
    
    const versoCarta = cartaSelecionada.querySelector('.verso-carta');
    versoCarta.classList.remove('aparecer-verso-carta');

    /* 4º-> Com a segunda carta virada, existem duas situações:
    - Caso seja igual à primeira carta, o usuário acertou e ambas agora devem ficar 
    viradas pra cima até o final do jogo;
    - Caso seja uma carta diferente da primeira carta virada, o usuário errou. Nesse 
    caso, o jogo deve aguardar 1 segundo e então virar as duas cartas para baixo novamente;
    */

    if(primeiraCarta === undefined){
        primeiraCarta = cartaSelecionada;
        return
    }
    contadorClick++;
    segundaCarta = cartaSelecionada;
        
    
        if(primeiraCarta.innerHTML === segundaCarta.innerHTML){
            primeiraCarta = undefined;
            segundaCarta = undefined;
        }
    
            setTimeout(()=>{
                segundaCarta.querySelector('.frente-carta').classList.remove('apagar-papagaio');
                segundaCarta.querySelector('.verso-carta').classList.add('aparecer-verso-carta');
                primeiraCarta.querySelector('.verso-carta').classList.add('aparecer-verso-carta');
                primeiraCarta.querySelector('.frente-carta').classList.remove('apagar-papagaio');
                primeiraCarta = undefined;
            }, 1000);
            contadorClick++;

        // console.log(primeiraCarta, segundaCarta);
        // console.log(contadorClick);

        finalizarParrotGame();
}

/* 5º-> Após o usuário formar todos os pares de cartas disponíveis, devemos retornar
o resultado: "Você ganhou em X jogadas!" sendo X a quantidade de vezes que o usuário 
virou uma carta no jogo. Precisaremos de um contador que contabilizará os cliques*/
function finalizarParrotGame(){
    const todasCartasSelecionadas = document.querySelectorAll('.apagar-papagaio');
    console.log(todasCartasSelecionadas);
    setTimeout(()=>{
        if(todasCartasSelecionadas.length === numeroDeCartas){
            alert(`Parabéns! Você ganhou em ${contadorClick} jogadas.`);
            desejoJogar = prompt('Fim de jogo. Gostaria de jogar novamente?').toUpperCase();
            jogarNovamente(desejoJogar);
        }
        }, 250);

}
    
function jogarNovamente(resposta){
    console.log(resposta);
    if(resposta === 'S' || resposta === 'SIM'){
        location.reload(true);
    }else{
        escrevaTela();
    }
}

function escrevaTela(){
    return alert("Jogo finalizado. Recarregue a página do navegador para iniciar novamente");
}
