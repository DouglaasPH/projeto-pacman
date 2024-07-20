import { quadradosPretos } from "./criacao.js";
var grid = document.querySelector(".grid");
var score = document.querySelector(".score");
var quantidadeDeVidas = document.querySelector(".quantidade-de-vidas");
var pacman = document.querySelector(".grid .pacman");
var fantasmaVermelho = document.querySelector(".grid .fantasma-vermelho");
var fantasmaCiano = document.querySelector(".grid .fantasma-ciano");
var fantasmaRosa = document.querySelector(".grid .fantasma-rosa");
var fantasmaAmarelo = document.querySelector(".grid .fantasma-amarelo");
var intervaloAtual = null;
var contadorDeIntervalos = 0;
var pararMovimentacaoEComecarDeNovo = false;
var fantasmaVermelhoMorto = false;
var fantasmaRosaMorto = false;
var fantasmaCianoMorto = false;
var fantasmaAmareloMorto = false;


// FIM DE JOGO: VITÓRIA OU DERROTA
function derrotaOuVitoria(condicao) {
    if (condicao === "derrota") {
        let resposta = confirm("Você perdeu!\n Deseja jogar novamente?");

        if (resposta) {
            location.reload();
        } else {
            window.close();
            // Mensagem de backup caso a aba não seja fechada
            alert("Se a aba não fechar automaticamente, por favor, feche-a manualmente.");            
        }
    }
    else if (condicao === "vitoria") {
        let resposta = confirm("Você ganhou!\n Deseja jogar novamente?");

        if (resposta) {
            location.reload();
        } else {
            window.close();
            // Mensagem de backup caso a aba não seja fechada
            alert("Se a aba não fechar automaticamente, por favor, feche-a manualmente.");            
        }        
    }
}


//AVERIGUAR SE ALGUM FANTASMA ESTÁ NO MESMO QUADRADO QUE O PACMAN
/*
  OBS.: COMO O PACMAN NÃO FICA EM UM INTERVALO ETERNO, COMPARADO AOS FANTASMAS, É NECESSÁRIO COLOCAR
  O QUE IRÁ ACONTECER COM O PACMAN AQUI, POIS, O FANTASMA PODE ALCANÇAR O PACMAN SEM ESTAR EM MOVIMENTO, 
  QUANDO O INTERVALO DE MOVIMENTO DO PACMAN ESTAR ATIVO.
*/

function chamarFuncaoMatarPacman() {
    matarPacman();
}

function matarPacman() {
    var arrayParaOsFantasmas = [fantasmaVermelho, fantasmaRosa, fantasmaCiano, fantasmaAmarelo];
    var averiguar = setInterval(() => {
        /*SE O PACMAN ESTIVER NO MESMO QUADRADO E OS FANTASMAS NÃO ESTIVEREM COM O EFEITO DO POWER-PELLET,
          ENTÃO RECOMECE NOVAMENTE*/
        arrayParaOsFantasmas.forEach(fantasmaAtual => {
            if (pacman.parentElement.contains(fantasmaAtual) && fantasmaAtual.getAttribute("efeito-do-power-pellet") === "false") {
                pararMovimentacaoEComecarDeNovo = true;
                voltarAoInicioPacman();
            }
        });

        /*MAS SE O PACMAN ESTIVER NO MESMO QUADRADO QUE ALGUM FANTASMA E ELES ESTIVEREM COM O EFEITO POWER-PELLET,
          FAÇA COM QUE O FANTASMA RETORNE AO COVIL DE FANTASMAS*/
        if (pacman.parentElement.contains(fantasmaVermelho) && fantasmaVermelho.getAttribute("efeito-do-power-pellet") === "true") {
                fantasmaVermelhoMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaRosa) && fantasmaRosa.getAttribute("efeito-do-power-pellet") === "true") {
                fantasmaRosaMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaCiano) && fantasmaCiano.getAttribute("efeito-do-power-pellet") === "true") {
                fantasmaCianoMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaAmarelo) && fantasmaAmarelo.getAttribute("efeito-do-power-pellet") === "true") {
                fantasmaAmareloMorto = true;
            };
    }, 100);

    function voltarAoInicioPacman() {
        clearInterval(averiguar);

        setTimeout(() => {
            pacman.src = "Direçoes para o pacman/pacman-normal.png";        
            grid.children[489].appendChild(pacman);
            if (quantidadeDeVidas.children.length > 0) {
                quantidadeDeVidas.removeChild(quantidadeDeVidas.children[0]);
                pararMovimentacaoEComecarDeNovo = false;
                movimentarFantasmaVermelho();
                sairDoCovilEmInicioDoJogo();
            }    
            else {
                derrotaOuVitoria("derrota");
            }

            chamarFuncaoMatarPacman();
        }, 1000);
    }    
}
matarPacman();

//ADICIONAR EFEITO POWER-PELLET NOS FANTASMAS
function mudarAparenciaDosFantasmas() {
    let voltarAparenciaNormal = false;
    let mudarAparenciaDeQuaisFantasmas = [];

    //SE O FANTASMA ESTIVER NO COVIL, O EFEITO POWER-PELLET NÃO O ATINGE
    if (!fantasmaVermelho.parentElement.classList.contains("covilDosFantasmas")) {
        fantasmaVermelho.setAttribute("efeito-do-power-pellet", true);
        fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
        mudarAparenciaDeQuaisFantasmas.push(fantasmaVermelho);
    };
    if (!fantasmaRosa.parentElement.classList.contains("covilDosFantasmas")) {
        fantasmaRosa.setAttribute("efeito-do-power-pellet", true);
        fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
        mudarAparenciaDeQuaisFantasmas.push(fantasmaRosa);
    };
    if (!fantasmaCiano.parentElement.classList.contains("covilDosFantasmas")) {
        fantasmaCiano.setAttribute("efeito-do-power-pellet", true);
        fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
        mudarAparenciaDeQuaisFantasmas.push(fantasmaCiano);
    };
    if (!fantasmaAmarelo.parentElement.classList.contains("covilDosFantasmas")) {
        fantasmaAmarelo.setAttribute("efeito-do-power-pellet", true);
        fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
        mudarAparenciaDeQuaisFantasmas.push(fantasmaAmarelo);
    };

    //ALTERNAR COR ENTRE AZUL E BRANCO
    function alternarCorDoFantasma() {
        function pararIntervalo() {
            clearInterval(alternanciaDeCor);
        };

        let contador = 1;
        let alternanciaDeCor = setInterval(() => {
            if (!voltarAparenciaNormal) {
                if (contador % 2 !== 0) {
                    mudarAparenciaDeQuaisFantasmas.forEach(fantasmaAtual => {
                        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-amedrontado-branco.png";
                    });
                }
                else if (contador % 2 === 0) {
                    mudarAparenciaDeQuaisFantasmas.forEach(fantasmaAtual => {
                        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
                    });
                }
            } else pararIntervalo();
            contador++;
            }, 200);
    }

    //DURAÇÃO DA APARÊNCIA AZUL + TRANSIÇÃO DO BRANCO AO NORMAL
    let duracaoDoEfeito = setTimeout(() => {
        mudarAparenciaDeQuaisFantasmas.forEach(fantasmaAtual => {
            fantasmaAtual.setAttribute("efeito-do-power-pellet", false);
        });
        voltarAparenciaNormal = true;
    }, 6000);

    let depoisDeUmTempoAtiveAAlternancia = setTimeout(() => {
        //VEJA SE ALGUM FANTASMA DA ARRAY FOI MORTO
        mudarAparenciaDeQuaisFantasmas = mudarAparenciaDeQuaisFantasmas.filter(fantasmaAtual => fantasmaAtual.getAttribute("efeito-do-power-pellet") === "true");
        alternarCorDoFantasma();
    }, 4000);
}


// MOVIMENTAÇÃO DO FANTASMA VERMELHO
function movimentarFantasmaVermelho() {
    var velocidadeDoFantasma = 200;

    function pararMovimentacao() {
        clearInterval(fantasmaVermelhoEmMovimento);
        clearInterval(pararLoop);

        if (pararMovimentacaoEComecarDeNovo) {
            setTimeout(() => {
                grid.children[294].appendChild(fantasmaVermelho);
                fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-esquerda.png";
                fantasmaVermelho.setAttribute("direcao", "direita");
            }, 1000);
        }
        else if (fantasmaVermelhoMorto) {
            voltarFantasmaAoCovilESairDoCovil(fantasmaVermelho);
        } else return;
    };

    var fantasmaVermelhoEmMovimento = setInterval(() => {
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
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-esquerda.png";
                }
                grid.children[posicaoAtualDoVermelho - 1].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "esquerda");
            }
            if (posicaoAtualDoVermelho !== 365 && (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas"))) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao esquerda");
            }
            if (posicaoAtualDoVermelho === 365) {
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-esquerda.png";
                }    
                grid.children[391].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "esquerda");                
            }
        }
        else if (direcaoDoVermelho === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-direita.png";
                }
                grid.children[posicaoAtualDoVermelho + 1].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "direita");

            }
            if (posicaoAtualDoVermelho !== 390 && (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas"))) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao direita");
            }
            if (posicaoAtualDoVermelho === 390) {
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-direita.png";
                }    
                grid.children[364].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "direita");                
            }
        }
        else if (direcaoDoVermelho === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-cima.png";
                }
                grid.children[posicaoAtualDoVermelho - 28].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "cima");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao cima");
            }
        }
        else if (direcaoDoVermelho === "baixo") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-baixo.png";
                }
                grid.children[posicaoAtualDoVermelho + 28].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao baixo");
            }
        }

        //DEIXAR O FANTASMA COM LENTIDÃO, POR CONTA DO EFEITO POWER-PELLET
        if (fantasmaVermelho.getAttribute("efeito-do-power-pellet") === "true") {
            velocidadeDoFantasma = 500;
        } else {
            velocidadeDoFantasma = 200;;
        }
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaVermelhoMorto) {
            pararMovimentacao();
        }
    }, velocidadeDoFantasma);
};
movimentarFantasmaVermelho();





//MOVIMENTAÇÃO DO FANTASMA ROSA APÓS SAIR DO COVIL
function movimentarFantasmaRosa() {
    var velocidadeDoFantasma = 200;

    function pararMovimentacao() {
        clearInterval(fantasmaRosaEmMovimento);
        clearInterval(pararLoop);
        if (pararMovimentacaoEComecarDeNovo) {
            setTimeout(() => {
                grid.children[349].appendChild(fantasmaRosa);
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-baixo.png";
                fantasmaRosa.setAttribute("direcao", "esquerda");
            }, 1000);
        }
        else if (fantasmaRosaMorto) {
            voltarFantasmaAoCovilESairDoCovil(fantasmaRosa);
        } else return;
    };

    var fantasmaRosaEmMovimento = setInterval(() => {
        let posicaoAtualDoRosa = Number(fantasmaRosa.parentElement.id);
        let direcaoDoRosa = fantasmaRosa.getAttribute("direcao");
        let possiveisQuadradosParaRosa = [];

        if (direcaoDoRosa !== "mudar a direcao direita" && direcaoDoRosa !== "direita" && direcaoDoRosa !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoRosa + 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaRosa.push("direita");
            }
        }
        if (direcaoDoRosa !== "mudar a direcao esquerda" && direcaoDoRosa !== "direita" && direcaoDoRosa !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoRosa - 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaRosa.push("esquerda");
            }
        }
        if (direcaoDoRosa !== "mudar a direcao cima" && direcaoDoRosa !== "baixo" && direcaoDoRosa !== "cima" && direcaoDoRosa !== "cima" && quadradosPretos.indexOf(posicaoAtualDoRosa - 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaRosa.push("cima");
            }
        }
        if (direcaoDoRosa !== "mudar a direcao baixo" && direcaoDoRosa !== "baixo" && direcaoDoRosa !== "cima" && quadradosPretos.indexOf(posicaoAtualDoRosa + 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaRosa.push("baixo");
            }
        }


        if (possiveisQuadradosParaRosa.length !== 0) {
            let direcoes = ["direita", "esquerda", "cima", "baixo"];
            if (direcoes.includes(direcaoDoRosa)) possiveisQuadradosParaRosa.push(direcaoDoRosa);

            let sortearFuturoQuadrado = Math.floor(Math.random() * possiveisQuadradosParaRosa.length);
            direcaoDoRosa = possiveisQuadradosParaRosa[sortearFuturoQuadrado];
        }

        if (direcaoDoRosa === "esquerda") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-esquerda.png";
                }
                                    
                grid.children[posicaoAtualDoRosa - 1].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "esquerda");
            }
            if (posicaoAtualDoRosa !== 365 && (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas"))) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao esquerda");
            }
            if (posicaoAtualDoRosa === 365) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-esquerda.png";
                }
                                                
                grid.children[391].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "esquerda");                
            }            
        }
        else if (direcaoDoRosa === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-direita.png";
                }
                
                grid.children[posicaoAtualDoRosa + 1].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "direita");
            }
            if (posicaoAtualDoRosa !== 390 && (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas"))) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao direita");
            }
            if (posicaoAtualDoRosa === 390) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-direita.png";
                }
                                                
                grid.children[364].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "direita");                
            }            
        }
        else if (direcaoDoRosa === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-cima.png";
                }
                
                grid.children[posicaoAtualDoRosa - 28].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "cima");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao cima");
            }
        }
        else if (direcaoDoRosa === "baixo") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaRosa.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-baixo.png";
                }
                
                grid.children[posicaoAtualDoRosa + 28].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao baixo");
            }
        }

        //DEIXAR O FANTASMA COM LENTIDÃO, POR CONTA DO EFEITO POWER-PELLET
        if (fantasmaRosa.getAttribute("efeito-do-power-pellet") === "true") {
            velocidadeDoFantasma = 500;
        } else {
            velocidadeDoFantasma = 200;
        }
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaRosaMorto) {
            pararMovimentacao();
        }
    }, velocidadeDoFantasma);
};



//MOVIMENTAÇÃO DO FANTASMA ROSA APÓS SAIR DO COVIL
function movimentarFantasmaCiano() {
    var velocidadeDoFantasma = 200;

    function pararMovimentacao() {
        clearInterval(fantasmaCianoEmMovimento);
        clearInterval(pararLoop);
        if (pararMovimentacaoEComecarDeNovo) {
            setTimeout(() => {
                grid.children[349].appendChild(fantasmaCiano);
                fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-baixo.png";
                fantasmaCiano.setAttribute("direcao", "esquerda");
            }, 1000);
        }
        else if (fantasmaCianoMorto) {
            voltarFantasmaAoCovilESairDoCovil(fantasmaCiano);
        } else return;
    };

    var fantasmaCianoEmMovimento = setInterval(() => {
        let posicaoAtualDoCiano = Number(fantasmaCiano.parentElement.id);
        let direcaoDoCiano = fantasmaCiano.getAttribute("direcao");
        let possiveisQuadradosParaCiano = [];

        if (direcaoDoCiano !== "mudar a direcao direita" && direcaoDoCiano !== "direita" && direcaoDoCiano !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoCiano + 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaCiano.push("direita");
            }
        }
        if (direcaoDoCiano !== "mudar a direcao esquerda" && direcaoDoCiano !== "direita" && direcaoDoCiano !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoCiano - 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaCiano.push("esquerda");
            }
        }
        if (direcaoDoCiano !== "mudar a direcao cima" && direcaoDoCiano !== "baixo" && direcaoDoCiano !== "cima" && direcaoDoCiano !== "cima" && quadradosPretos.indexOf(posicaoAtualDoCiano - 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaCiano.push("cima");
            }
        }
        if (direcaoDoCiano !== "mudar a direcao baixo" && direcaoDoCiano !== "baixo" && direcaoDoCiano !== "cima" && quadradosPretos.indexOf(posicaoAtualDoCiano + 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaCiano.push("baixo");
            }
        }


        if (possiveisQuadradosParaCiano.length !== 0) {
            let direcoes = ["direita", "esquerda", "cima", "baixo"];
            if (direcoes.includes(direcaoDoCiano)) possiveisQuadradosParaCiano.push(direcaoDoCiano);

            let sortearFuturoQuadrado = Math.floor(Math.random() * possiveisQuadradosParaCiano.length);
            direcaoDoCiano = possiveisQuadradosParaCiano[sortearFuturoQuadrado];
        }

        if (direcaoDoCiano === "esquerda") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-esquerda.png";
                }
                                    
                grid.children[posicaoAtualDoCiano - 1].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "esquerda");
            }
            if (posicaoAtualDoCiano !== 365 && (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas"))) {
                fantasmaCiano.setAttribute("direcao", "mudar a direçao esquerda");
            }
            if (posicaoAtualDoCiano === 365) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-esquerda.png";
                }
                                                
                grid.children[391].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "esquerda");                
            }            
        }
        else if (direcaoDoCiano === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-direita.png";
                }
                
                grid.children[posicaoAtualDoCiano + 1].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "direita");
            }
            if (posicaoAtualDoCiano !== 390 && (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas"))) {
                fantasmaCiano.setAttribute("direcao", "mudar a direçao direita");
            }
            if (posicaoAtualDoCiano === 390) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-direita.png";
                }
                                                
                grid.children[364].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "direita");                
            }            
        }
        else if (direcaoDoCiano === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-cima.png";
                }
                
                grid.children[posicaoAtualDoCiano - 28].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "cima");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("covilDosFantasmas")) {
                fantasmaCiano.setAttribute("direcao", "mudar a direçao cima");
            }
        }
        else if (direcaoDoCiano === "baixo") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoCiano + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaCiano.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-ciano-baixo.png";
                }
                
                grid.children[posicaoAtualDoCiano + 28].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaCiano.setAttribute("direcao", "mudar a direçao baixo");
            }
        }

        //DEIXAR O FANTASMA COM LENTIDÃO, POR CONTA DO EFEITO POWER-PELLET
        if (fantasmaCiano.getAttribute("efeito-do-power-pellet") === "true") {
            velocidadeDoFantasma = 500;
        } else {
            velocidadeDoFantasma = 200;;
        }
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaCianoMorto) {
            pararMovimentacao();
        }
    }, velocidadeDoFantasma);
};



//MOVIMENTAÇÃO DO FANTASMA AMARELO APÓS SAIR DO COVIL
function movimentarFantasmaAmarelo() {
    var velocidadeDoFantasma = 200;

    function pararMovimentacao() {
        clearInterval(fantasmaAmareloEmMovimento);
        clearInterval(pararLoop);
        if (pararMovimentacaoEComecarDeNovo) {
            setTimeout(() => {
                grid.children[349].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-Amarelo-baixo.png";
                fantasmaAmarelo.setAttribute("direcao", "esquerda");
            }, 1000);
        }
        else if (fantasmaAmareloMorto) {
            voltarFantasmaAoCovilESairDoCovil(fantasmaAmarelo);
        } else return;
    };

    var fantasmaAmareloEmMovimento = setInterval(() => {
        let posicaoAtualDoAmarelo = Number(fantasmaAmarelo.parentElement.id);
        let direcaoDoAmarelo = fantasmaAmarelo.getAttribute("direcao");
        let possiveisQuadradosParaAmarelo = [];

        if (direcaoDoAmarelo !== "mudar a direcao direita" && direcaoDoAmarelo !== "direita" && direcaoDoAmarelo !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoAmarelo + 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaAmarelo.push("direita");
            }
        }
        if (direcaoDoAmarelo !== "mudar a direcao esquerda" && direcaoDoAmarelo !== "direita" && direcaoDoAmarelo !== "esquerda" && quadradosPretos.indexOf(posicaoAtualDoAmarelo - 1) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaAmarelo.push("esquerda");
            }
        }
        if (direcaoDoAmarelo !== "mudar a direcao cima" && direcaoDoAmarelo !== "baixo" && direcaoDoAmarelo !== "cima" && direcaoDoAmarelo !== "cima" && quadradosPretos.indexOf(posicaoAtualDoAmarelo - 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaAmarelo.push("cima");
            }
        }
        if (direcaoDoAmarelo !== "mudar a direcao baixo" && direcaoDoAmarelo !== "baixo" && direcaoDoAmarelo !== "cima" && quadradosPretos.indexOf(posicaoAtualDoAmarelo + 28) !== -1) {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                possiveisQuadradosParaAmarelo.push("baixo");
            }
        }


        if (possiveisQuadradosParaAmarelo.length !== 0) {
            let direcoes = ["direita", "esquerda", "cima", "baixo"];
            if (direcoes.includes(direcaoDoAmarelo)) possiveisQuadradosParaAmarelo.push(direcaoDoAmarelo);

            let sortearFuturoQuadrado = Math.floor(Math.random() * possiveisQuadradosParaAmarelo.length);
            direcaoDoAmarelo = possiveisQuadradosParaAmarelo[sortearFuturoQuadrado];
        }

        if (direcaoDoAmarelo === "esquerda") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo - 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-esquerda.png";
                }
                                    
                grid.children[posicaoAtualDoAmarelo - 1].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "esquerda");
            }
            if (posicaoAtualDoAmarelo !== 365 && (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas"))) {
                fantasmaAmarelo.setAttribute("direcao", "mudar a direçao esquerda");
            }
            if (posicaoAtualDoAmarelo === 365) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-esquerda.png";
                }
                                                
                grid.children[391].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "esquerda");                
            }            
        }
        else if (direcaoDoAmarelo === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-direita.png";
                }
                
                grid.children[posicaoAtualDoAmarelo + 1].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "direita");
            }
            if (posicaoAtualDoAmarelo !== 390 && (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas"))) {
                fantasmaAmarelo.setAttribute("direcao", "mudar a direçao direita");
            }
            if (posicaoAtualDoAmarelo === 390) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-direita.png";
                }
                                                
                grid.children[364].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "direita");                
            }            
        }
        else if (direcaoDoAmarelo === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-cima.png";
                }
                
                grid.children[posicaoAtualDoAmarelo - 28].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "cima");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 28].classList.contains("covilDosFantasmas")) {
                fantasmaAmarelo.setAttribute("direcao", "mudar a direçao cima");
            }
        }
        else if (direcaoDoAmarelo === "baixo") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoAmarelo + 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") !== "true") {
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amarelo-baixo.png";
                }
                
                grid.children[posicaoAtualDoAmarelo + 28].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaAmarelo.setAttribute("direcao", "mudar a direçao baixo");
            }
        }

        //DEIXAR O FANTASMA COM LENTIDÃO, POR CONTA DO EFEITO POWER-PELLET
        if (fantasmaAmarelo.getAttribute("efeito-do-power-pellet") === "true") {
            velocidadeDoFantasma = 500;
        } else {
            velocidadeDoFantasma = 200;;
        }
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaAmareloMorto) {
            pararMovimentacao();
        }
    }, velocidadeDoFantasma);
};




//GERENCIE A SAÍDA DOS FANTASMAS DO COVIL SE ELE FOR MORTO PELO PACMAN
function voltarFantasmaAoCovilESairDoCovil(fantasmaAtual) {
    fantasmaAtual.setAttribute("efeito-do-power-pellet", false);
    let contadorDeIntervalos = 1;

    if (fantasmaAtual === fantasmaVermelho) {
        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-vermelho-baixo.png";

        grid.children[348].appendChild(fantasmaAtual);
        let volteAoCovil = setInterval(() => {
            if (contadorDeIntervalos === 1) {
                grid.children[376].appendChild(fantasmaAtual)
            } else if (contadorDeIntervalos === 2) {
                grid.children[348].appendChild(fantasmaAtual);
            } else if (contadorDeIntervalos === 3) {
                grid.children[349].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 4) {
                grid.children[321].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 5) {
                grid.children[293].appendChild(fantasmaAtual);
                pararIntervalo();
            };
            contadorDeIntervalos++;
        }, 250);

        function pararIntervalo() {
            fantasmaVermelhoMorto = false;
            clearInterval(volteAoCovil);
            movimentarFantasmaVermelho();
        };            
    };

    if (fantasmaAtual === fantasmaRosa) {
        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-rosa-baixo.png";        
        grid.children[349].appendChild(fantasmaAtual);
        let volteAoCovil = setInterval(() => {
            if (contadorDeIntervalos === 1) {
                grid.children[377].appendChild(fantasmaAtual)
            } else if (contadorDeIntervalos === 2) {
                grid.children[349].appendChild(fantasmaAtual);
            } else if (contadorDeIntervalos === 3) {
                grid.children[321].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 4) {
                grid.children[293].appendChild(fantasmaAtual);
                pararIntervalo();
            };
            contadorDeIntervalos++;
        }, 250);

        function pararIntervalo() {
            fantasmaRosaMorto = false;
            clearInterval(volteAoCovil);
            movimentarFantasmaRosa();
        };            
    };    

    if (fantasmaAtual === fantasmaCiano) {
        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-ciano-baixo.png";        
        grid.children[350].appendChild(fantasmaAtual);
        let volteAoCovil = setInterval(() => {
            if (contadorDeIntervalos === 1) {
                grid.children[378].appendChild(fantasmaAtual)
            } else if (contadorDeIntervalos === 2) {
                grid.children[350].appendChild(fantasmaAtual);
            } else if (contadorDeIntervalos === 3) {
                grid.children[322].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 4) {
                grid.children[294].appendChild(fantasmaAtual);
                pararIntervalo();
            };
            contadorDeIntervalos++;
        }, 250);

        function pararIntervalo() {
            fantasmaCianoMorto = false;
            clearInterval(volteAoCovil);
            movimentarFantasmaCiano();
        };            
    };
    
    if (fantasmaAtual === fantasmaAmarelo) {
        fantasmaAtual.src = "Direçoes para os fantasmas/fantasma-amarelo-baixo.png";        
        grid.children[351].appendChild(fantasmaAtual);
        let volteAoCovil = setInterval(() => {
            if (contadorDeIntervalos === 1) {
                grid.children[379].appendChild(fantasmaAtual)
            } else if (contadorDeIntervalos === 2) {
                grid.children[351].appendChild(fantasmaAtual);
            } else if (contadorDeIntervalos === 3) {
                grid.children[350].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 4) {
                grid.children[322].appendChild(fantasmaAtual);
            }  else if (contadorDeIntervalos === 5) {
                grid.children[294].appendChild(fantasmaAtual);
                pararIntervalo();
            };
            contadorDeIntervalos++;
        }, 250);

        function pararIntervalo() {
            fantasmaAmareloMorto = false;
            clearInterval(volteAoCovil);
            movimentarFantasmaAmarelo();
        };            
    };    
}


//GERENCIE A SAÍDA DOS FANTASMA DO COVIL EM INÍCIO DE JOGO
function sairDoCovilEmInicioDoJogo() {
    let ordemDosQuadrados = [28, 1, -28, -1];
    let autorizarSaidaDoFantasmaRosa = false;
    let autorizarSaidaDoFantasmaCiano = false;
    let autorizarSaidaDoFantasmaAmarelo = false;
    let proximaCasa = 0;
    let chamarFuncaoDeAutorizacao = true;

    function autorizarSaidaDosFantasmas() {
        //autorizar a saida do fantasma rosa
        let saidaDoFantasmaRosa = setTimeout(() => {
            autorizarSaidaDoFantasmaRosa = true;
        }, 1000);

        //autorizar a saida do fantasma ciano
        let saidaDoFantasmaCiano = setTimeout(() => {
            autorizarSaidaDoFantasmaCiano = true;
        }, 6500);

        //autorizar a saida do fantasma amarelo
        let saidaDoFantasmaAmarelo = setTimeout(() => {
            autorizarSaidaDoFantasmaAmarelo = true;
        }, 15750);
    };

    let movimentaçaoDosFantasmasNoCovil = setInterval(() => {
        if (chamarFuncaoDeAutorizacao) {
            chamarFuncaoDeAutorizacao = false;
            autorizarSaidaDosFantasmas();
        }
        if (proximaCasa > 3) {
            proximaCasa = 0;
        }


        if (pararMovimentacaoEComecarDeNovo) {
            pararIntervalo();
        }

        //movimentação apenas do fantasma rosa
        let idDivPaiRosa = Number(fantasmaRosa.parentElement.id);

        //DEPOIS DE SAIR DO COVIL, NÃO IRÁ PEGAR MAIS NENHUMA DESSAS CONDICIONAIS DO ROSA, MESMO COM A CONTINUIDADE DO INTERVALO
        if (autorizarSaidaDoFantasmaRosa !== undefined) {
            if (!autorizarSaidaDoFantasmaRosa) {
                grid.children[idDivPaiRosa + ordemDosQuadrados[proximaCasa]].appendChild(fantasmaRosa);
            } else {
                if (!grid.children[idDivPaiRosa - 28].classList.contains("parede")) {
                    grid.children[idDivPaiRosa - 28].appendChild(fantasmaRosa);
                } else {
                    autorizarSaidaDoFantasmaRosa = undefined;
                    chamarFuncaoDeMovimentacao("fantasmaRosa");
                };
            };
        };

        //movimentação apenas do fantasma ciano
        let idDivPaiCiano = Number(fantasmaCiano.parentElement.id);

    
        //DEPOIS DE SAIR DO COVIL, NÃO IRÁ PEGAR MAIS NENHUMA DESSAS CONDICIONAIS DO CIANO, MESMO COM A CONTINUIDADE DO INTERVALO
        if (autorizarSaidaDoFantasmaCiano !== undefined) {
            if (!autorizarSaidaDoFantasmaCiano) {
                grid.children[idDivPaiCiano + ordemDosQuadrados[proximaCasa]].appendChild(fantasmaCiano);
            } else {
                if (grid.children[idDivPaiCiano].id == 348) {
                    grid.children[idDivPaiCiano + 1].appendChild(fantasmaCiano);
                }
                else if (!grid.children[idDivPaiCiano - 28].classList.contains("parede")) {
                    grid.children[idDivPaiCiano - 28].appendChild(fantasmaCiano);
                } else {
                    autorizarSaidaDoFantasmaCiano = undefined;
                    chamarFuncaoDeMovimentacao("fantasmaCiano");
                };
            };
        };

        //movimentação apenas do fantasma amarelo
        let idDivPaiAmarelo = Number(fantasmaAmarelo.parentElement.id);

        //DEPOIS DE SAIR DO COVIL, NÃO IRÁ PEGAR MAIS NENHUMA DESSAS CONDICIONAIS DO AMARELO, MESMO COM A CONTINUIDADE DO INTERVALO
        if (autorizarSaidaDoFantasmaAmarelo !== undefined) {
            if (!autorizarSaidaDoFantasmaAmarelo) {
                grid.children[idDivPaiAmarelo + ordemDosQuadrados[proximaCasa]].appendChild(fantasmaAmarelo)
            } else {
                if (grid.children[idDivPaiAmarelo].id == 351) {
                    grid.children[idDivPaiAmarelo - 1].appendChild(fantasmaAmarelo);
                }
                else if (!grid.children[idDivPaiAmarelo - 28].classList.contains("parede")) {
                    grid.children[idDivPaiAmarelo - 28].appendChild(fantasmaAmarelo);
                } else {
                    autorizarSaidaDoFantasmaAmarelo = undefined;
                    chamarFuncaoDeMovimentacao("fantasmaAmarelo");
                };
            };
        };

        proximaCasa++;

        //PARAR INTERVALO
        if (autorizarSaidaDoFantasmaRosa && autorizarSaidaDoFantasmaCiano && autorizarSaidaDoFantasmaAmarelo) {
            pararIntervalo();
        }
    }, 250);

    //INICIO DE MOVIMENTACÇÃO DE CADA FANTASMA
    function chamarFuncaoDeMovimentacao(fantasmaAtual) {
        if (fantasmaAtual === "fantasmaRosa") {
            movimentarFantasmaRosa();
        }
        else if (fantasmaAtual === "fantasmaCiano") {
            movimentarFantasmaCiano();
        }
        else if (fantasmaAtual === "fantasmaAmarelo") {
            movimentarFantasmaAmarelo();
        } else return;
    };

    //PARADA DO INTERVALO
    function pararIntervalo() {
        if (!pararMovimentacaoEComecarDeNovo) {
        clearInterval(movimentaçaoDosFantasmasNoCovil);            
        }
        else if (pararMovimentacaoEComecarDeNovo) {
            clearInterval(movimentaçaoDosFantasmasNoCovil);

            setTimeout(() => {
            if (!autorizarSaidaDoFantasmaRosa && !grid.children[349].contains(fantasmaRosa)) {
                grid.children[349].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "esquerda");
            }
            if (!autorizarSaidaDoFantasmaCiano && !grid.children[347].contains(fantasmaCiano)) {
                grid.children[347].appendChild(fantasmaCiano);
                fantasmaCiano.setAttribute("direcao", "esquerda");
            }            
            if (!autorizarSaidaDoFantasmaAmarelo && !grid.children[351].contains(fantasmaAmarelo)) {
                grid.children[351].appendChild(fantasmaAmarelo);
                fantasmaAmarelo.setAttribute("direcao", "esquerda");
            }
                
            }, 1000);
        }
    };
};
sairDoCovilEmInicioDoJogo();








//MOVIMENTAR PACMAN.
function movimentoDoPacman(proximaDiv) {
    /*SE O PACMAN JÁ ESTIVER INDO EM UMA DIREÇÃO, ENTÃO PARE O INTERVALO E
    E INCIE UM OUTRO NOVO INTERVALO COM UMA NOVA DIREÇÃO, DE ACORDO COM A SETA CLICADA*/
    function pararIntervalo() {
        contadorDeIntervalos += 1;
        if (contadorDeIntervalos > 1) {
            contadorDeIntervalos = 1;
            clearInterval(intervaloAtual);
        }
        else if (pararMovimentacaoEComecarDeNovo) {
            clearInterval(intervaloAtual);
        }

    };
    pararIntervalo();

    /*O PACMAN IRÁ SEGUIR INFINIMANTE PARA O LADO EM QUE A SETA FOI CLICADO, 
    MAS, IRÁ PARAR QUANDO A PROXIMA DIV DA DIREÇÃO DA SETA TIVER UMA PAREDE OU
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
            grid.children[idDivPaiDoPacman + proximaDiv].removeChild(grid.children[idDivPaiDoPacman + proximaDiv].firstChild);
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("pacDot");
            grid.children[idDivPaiDoPacman + proximaDiv].classList.add("vazio");
            decidirLadoDoPacman(idDivPaiDoPacman);
            score.innerHTML = Number(score.textContent) + 10;
            //SE TIVER COMIDO TODOS OS PAC-DOTS E POWER-PELLET, VOCê GANHA O JOGO
            if (score.textContent == 2540) {
                derrotaOuVitoria("vitoria");
            }
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("powerPellet")) {
            grid.children[idDivPaiDoPacman + proximaDiv].removeChild(grid.children[idDivPaiDoPacman + proximaDiv].firstChild);
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("powerPellet");
            grid.children[idDivPaiDoPacman + proximaDiv].classList.add("vazio");
            decidirLadoDoPacman(idDivPaiDoPacman);
            score.innerHTML = Number(score.textContent) + 50;
            //SE TIVER COMIDO TODOS OS PAC-DOTS E POWER-PELLET, VOCê GANHA O JOGO
            if (score.textContent == 2540) {
                derrotaOuVitoria("vitoria");
            }
            mudarAparenciaDosFantasmas();
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("parede")) {
            pararIntervalo();
        }
    }, 250);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo) {
            pararIntervalo();
        }
    }, 100);

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
            if (!pararMovimentacaoEComecarDeNovo) {
                movimentoDoPacman(-28);
            } else return;
            break;
        
        case "ArrowDown":
            if (!pararMovimentacaoEComecarDeNovo) {
                movimentoDoPacman(28);
            } else return;
            break;
        
        case "ArrowRight":
            if (!pararMovimentacaoEComecarDeNovo) {
                movimentoDoPacman(1);
            } else return;
            break;
        
        case "ArrowLeft":
            if (!pararMovimentacaoEComecarDeNovo) {
            movimentoDoPacman(-1);
            } else return;
            break;
    };
});