/* 1º-> Ao entrar no jogo deveremos fazer um laço de repetição até que um número
válido de cartas seja digitado pelo usuário, o número de cartas válido está entre
4 e 14 e obrigatoriamente deve ser par */

let numeroDeCartas = parseInt(prompt("Insira o número de cartas para o jogo, de 4 a 14 cartas."));
let arrayDeGifs = [
'assets/1.gif', 'assets/1.gif', 'assets/2.gif', 'assets/2.gif', 'assets/3.gif', 'assets/3.gif', 'assets/4.gif',
'assets/4.gif', 'assets/5.gif', 'assets/5.gif', 'assets/6.gif', 'assets/6.gif', 'assets/7.gif', 'assets/7.gif'
];
let arrayDeCartas = [];

while(numeroDeCartas<4 || numeroDeCartas>14 || numeroDeCartas%2 !==0){
    numeroDeCartas = parseInt(prompt("Insira o número de cartas para o jogo, de 4 a 14 cartas."));
}

// Esta função pode ficar separada do código acima, onde você preferir
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
// console.log(arrayDeGifs, arrayDeCartas);

let arrayEmbaralhado = [];
/* 2º-> Inserir as o número de cartas válidas de forma dinâmica de acordo com o 
HTML e após isso, embaralhar o array de cartas */
function carregarNumeroDeCartas(arrayEmbaralhado){
    const sectionDeCartas = document.querySelector('main section');
    // console.log(sectionDeCartas, arrayDeCartas);
    sectionDeCartas.innerHTML = '';
    
    for(let indice=0; indice<numeroDeCartas; indice++){
        sectionDeCartas.innerHTML = sectionDeCartas.innerHTML + `
        <div class="cartas-jogo">
            <div class="frente-carta face">
                <img src="assets/front.png" alt="Papagaios da Memória">
            </div>
            <div class="verso-carta face">
                <img src="${arrayEmbaralhado[indice]}" alt="Gif">
            </div>
        </div>
        `
    }
}
carregarNumeroDeCartas(arrayDeCartas);
console.log(arrayDeGifs, arrayDeCartas, arrayEmbaralhado);

/* 2.1-> Habilitar a rotação no clique da carta de acordo com os efeitos do CSS, 
aplicatos na frente e atrás da carta */

/* 3º-> Ao clicar em uma carta, a mesma deve ser virada. Caso seja a primeira carta
de um dos pares do array, deve permancer virada até que o usuário escolha a segunda
carta que deseja virar */

/* 4º-> Com a segunda carta virada, existem duas situações:
    - Caso seja igual à primeira carta, o usuário acertou e ambas agora devem ficar 
    viradas pra cima até o final do jogo;
    - Caso seja uma carta diferente da primeira carta virada, o usuário errou. Nesse 
    caso, o jogo deve aguardar 1 segundo e então virar as duas cartas para baixo novamente;
*/

/* 5º-> Após o usuário formar todos os pares de cartas disponíveis, devemos retornar
o resultado: "Você ganhou em X jogadas!" sendo X a quantidade de vezes que o usuário 
virou uma carta no jogo. Precisaremos de um contador que contabilizará os cliques*/