var grid = document.querySelector(".grid");
var score = document.querySelector(".score");
var level = document.querySelector(".level");
var pacman = document.querySelector(".grid .pacman");
var fantasmaVermelho = document.querySelector(".grid .fantasma-vermelho");
var fantasmaCiano = document.querySelector(".grid .fantasma-ciano");
var fantasmaRosa = document.querySelector(".grid .fantasma-rosa");
var fantasmaAmarelo = document.querySelector(".grid .fantasma-amarelo");
var intervaloAtual = null;
var contadorDeIntervalos = 0;

//TODO: MOVIMENTAÇÃO DOS FANTASMAS
function movimentoDosFantasmas() {
    let quadradosParaFantasmasPoderemAvancar = [-1, 1, -28, 28]; 
    let idDivPaiDoVermelho = Number(fantasmaVermelho.parentElement.id);


    var moverFantasmaVermelho = setInterval(() => {
        let escolherQuadrado = Math.floor(Math.random() * quadradosParaFantasmasPoderemAvancar.length);    
        if (grid.children[idDivPaiDoVermelho + quadradosParaFantasmasPoderemAvancar[escolherQuadrado]].classList.contains("vazio")) {
            console.log("hello");
        }
    }, 200);
};
//movimentoDosFantasmas();

//MOVIMENTAR PACMAN.
function movimentoDoPacman(proximaDiv) {
    /*SE O PACMAN JÁ ESTIVER INDO EM UMA DIREÇÃO, ENTÃO PARE O INTERVALO E
    E INCIE UM OUTRO NOVO INTERVALO COM UMA NOVA DIREÇÃO, DE ACORDO COM A SETA CLICADA*/
    function pararIntervalo() {
        contadorDeIntervalos += 1;
        if (contadorDeIntervalos > 1) {
            contadorDeIntervalos = 1;
            clearInterval(intervaloAtual);
        };
    };
    pararIntervalo();

    /*O PACMAN IRÁ SEGUIR INFINIMANTE PARA O LADO EM QUE A SETA FOI CLICADO, 
    MAS, IRÁ PARAR QUANDO A PROXIMADIV DA DIREÇÃO DA SETA TIVER UMA PAREDE OU
    QUANDO A FUNÇÃO FOR CHAMADA OUTRA VEZ, PARA A DIREÇÃO DO PACMAN*/
    intervaloAtual = setInterval(() => {
        let idDivPaiDoPacman = Number(pacman.parentElement.id);

        if (idDivPaiDoPacman === 364) {
            grid.children[391].appendChild(pacman);
            proximaDiv = -1;
            idDivPaiDoPacman = 391;
        } else if (idDivPaiDoPacman === 391) {
            grid.children[364].appendChild(pacman);
            proximaDiv = 1;
            idDivPaiDoPacman = 364;
        }

        setTimeout(() => {
            pacman.src = "Direçoes para o pacman/pacman-normal.png";
        }, 100);

        if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("vazio")) {
            decidirLadoDoPacman(idDivPaiDoPacman);
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("pacDot")) {
            grid.children[idDivPaiDoPacman + proximaDiv].innerHTML = "";
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("pacDot");
            grid.children[idDivPaiDoPacman + proximaDiv].classList.add("vazio");
            decidirLadoDoPacman(idDivPaiDoPacman);
            score.innerHTML = Number(score.textContent) + 10;
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("powerPellet")) {
            grid.children[idDivPaiDoPacman + proximaDiv].innerHTML = "";
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("powerPellet");
            decidirLadoDoPacman(idDivPaiDoPacman);
            score.innerHTML = Number(score.textContent) + 50;
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("parede")) {
            pararIntervalo();
        }
    }, 200);

    function decidirLadoDoPacman(idDivPaiDoPacman) {

        if (proximaDiv === 1) {
            setTimeout(() => {
                pacman.src = "Direçoes para o pacman/pacman-para-direita.png";
            }, 1);   
        } else if (proximaDiv === -1) {
            setTimeout(() => {
                pacman.src = "Direçoes para o pacman/pacman-para-esquerda.png";    
            }, 1);
        } else if (proximaDiv === 28) {
            setTimeout(() => {
                pacman.src = "Direçoes para o pacman/pacman-para-baixo.png";    
            }, 1);
        } else if (proximaDiv === -28) {
            setTimeout(() => {
                pacman.src = "Direçoes para o pacman/pacman-para-cima.png";    
            }, 1);
        }

        grid.children[idDivPaiDoPacman + proximaDiv].appendChild(pacman);
    };
};


//EVENTOS PARA ESCUTAR SETAS DO TECLADO E, DEPOIS, CHAMAR A FUNÇÃO 'movimentoDoPacman' DE ACORDO COM A SETA PRESSIONADO.
document.addEventListener('keyup', function moverPacMan(event) {
    switch (event.key) {
        case "ArrowUp":
            movimentoDoPacman(-28);
            break;
        
        case "ArrowDown":
            movimentoDoPacman(28);
            break;
        
        case "ArrowRight":
            movimentoDoPacman(1);
            break;
        
        case "ArrowLeft":
            movimentoDoPacman(-1);
            break;
    };
});