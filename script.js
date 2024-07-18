import { quadradosPretos } from "./criacao.js";
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


function adicionarERemoverPowerPelletsEPacDots(qualAdicionar, fantasmaAtual) {
    if (qualAdicionar === "pacDot") {
        const novoQuadradoPonto = document.createElement("span");
            novoQuadradoPonto.classList.add("ponto");
            novoQuadradoPonto.innerHTML = "•";
            fantasmaAtual.parentElement.appendChild(novoQuadradoPonto);
    }
    else if (qualAdicionar === "powerPellet") {
        const novoQuadradoPowerPellet = document.createElement("span");
            novoQuadradoPowerPellet.classList.add("powerPelletPonto");
            novoQuadradoPowerPellet.innerHTML = "●";
            fantasmaAtual.parentElement.appendChild(novoQuadradoPowerPellet);


    }

}

//TESTE: MOVIMENTAÇÃO DOS FANTASMAS
//TODO: QUANDO O SCORE ESTIVER EM MÉDIA 1270, FAÇA COM QUE O FANTASMA VERMELHO VÁ DIRETAMENTE ATRÁS DO PACMAN
//TODO: FUNCIONALIDADE PARA QUANDO O PACMAN COMER O POWER-PELLET (efeito dura 10 segundos)
//TODO: MATAR PACMAN
//TODO: FANTASMA MORRER, RETORNAR AO COVIL E DEPOIS SAIR DO COVIL 
function movimentarFantasmaVermelho() {
    var FantasmaVermelhoEmMovimento = setInterval(() => {
        let posicaoAtualDoVermelho = Number(fantasmaVermelho.parentElement.id);
        let direcaoDoVermelho = fantasmaVermelho.getAttribute("direcao");
        let possiveisQuadradosParaVermelho = [];
        
        if (direcaoDoVermelho !== "mudar a direcao direita" && direcaoDoVermelho !== "direita" && direcaoDoVermelho !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoVermelho + 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaVermelho.push("direita");
            }
        }
        if (direcaoDoVermelho !== "mudar a direcao esquerda" && direcaoDoVermelho !== "direita" && direcaoDoVermelho !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoVermelho - 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaVermelho.push("esquerda");
            }
        }
        if (direcaoDoVermelho !== "mudar a direcao cima" && direcaoDoVermelho !== "baixo" && direcaoDoVermelho !== "cima" && direcaoDoVermelho !== "cima" && quadradosPretos.indexOf(posicaoAtualDoVermelho - 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaVermelho.push("cima");
            }
        }
        if (direcaoDoVermelho !== "mudar a direcao baixo" && direcaoDoVermelho !== "baixo" && direcaoDoVermelho !== "cima" && quadradosPretos.indexOf(posicaoAtualDoVermelho + 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaVermelho.push("baixo");
            }
        }


        if (possiveisQuadradosParaVermelho.length !== 0) {
            let direcoes = ["direita", "esquerda", "cima", "baixo"];
            if (direcoes.includes(direcaoDoVermelho)) possiveisQuadradosParaVermelho.push(direcaoDoVermelho);

            let sortearFuturoQuadrado = Math.floor(Math.random() * possiveisQuadradosParaVermelho.length);
            direcaoDoVermelho = possiveisQuadradosParaVermelho[sortearFuturoQuadrado];
        }

        if (direcaoDoVermelho === "esquerda") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.parentElement.classList.contains("pacDot")) adicionarERemoverPowerPelletsEPacDots("pacDot", fantasmaVermelho);
                if (fantasmaVermelho.parentElement.classList.contains("powerPellet")) adicionarERemoverPowerPelletsEPacDots("powerPellet", fantasmaVermelho);

                if (grid.children[posicaoAtualDoVermelho - 1].length !== 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-esquerda.png";                    
                    grid.children[posicaoAtualDoVermelho - 1].innerHTML = "";
                    grid.children[posicaoAtualDoVermelho - 1].appendChild(fantasmaVermelho);
                    fantasmaVermelho.setAttribute("direcao", "esquerda");
                }
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao esquerda");
            }
        }
        else if (direcaoDoVermelho === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.parentElement.classList.contains("pacDot")) adicionarERemoverPowerPelletsEPacDots("pacDot", fantasmaVermelho);
                if (fantasmaVermelho.parentElement.classList.contains("powerPellet")) adicionarERemoverPowerPelletsEPacDots("powerPellet", fantasmaVermelho);

                if (grid.children[posicaoAtualDoVermelho + 1].length !== 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-direita.png";
                    grid.children[posicaoAtualDoVermelho + 1].innerHTML = "";
                    grid.children[posicaoAtualDoVermelho + 1].appendChild(fantasmaVermelho);
                    fantasmaVermelho.setAttribute("direcao", "direita");
                }
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao direita");
            }
        }
        else if (direcaoDoVermelho === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.parentElement.classList.contains("pacDot")) adicionarERemoverPowerPelletsEPacDots("pacDot", fantasmaVermelho);
                if (fantasmaVermelho.parentElement.classList.contains("powerPellet")) adicionarERemoverPowerPelletsEPacDots("powerPellet", fantasmaVermelho);

                if (grid.children[posicaoAtualDoVermelho - 28].length !== 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-cima.png";
                     grid.children[posicaoAtualDoVermelho - 28].innerHTML = "";
                    grid.children[posicaoAtualDoVermelho - 28].appendChild(fantasmaVermelho);
                    fantasmaVermelho.setAttribute("direcao", "cima");
                }
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao cima");
            }
        }
        else if (direcaoDoVermelho === "baixo") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.parentElement.classList.contains("pacDot")) adicionarERemoverPowerPelletsEPacDots("pacDot", fantasmaVermelho);
                if (fantasmaVermelho.parentElement.classList.contains("powerPellet")) adicionarERemoverPowerPelletsEPacDots("powerPellet", fantasmaVermelho);

                if (grid.children[posicaoAtualDoVermelho + 28].length !== 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-baixo.png";
                    grid.children[posicaoAtualDoVermelho + 28].innerHTML = "";
                    grid.children[posicaoAtualDoVermelho + 28].appendChild(fantasmaVermelho);
                    fantasmaVermelho.setAttribute("direcao", "baixo");
                }
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao baixo");
            }
        }
    }, 600);
};
//movimentarFantasmaVermelho();


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