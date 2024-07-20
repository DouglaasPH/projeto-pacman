import { quadradosPretos } from "./criacao.js";
var grid = document.querySelector(".grid");
var score = document.querySelector(".score");
var level = document.querySelector(".level");
var quantidadeDeVidas = document.querySelector(".quantidade-de-vidas");
var pacman = document.querySelector(".grid .pacman");
var fantasmaVermelho = document.querySelector(".grid .fantasma-vermelho");
var fantasmaCiano = document.querySelector(".grid .fantasma-ciano");
var fantasmaRosa = document.querySelector(".grid .fantasma-rosa");
var fantasmaAmarelo = document.querySelector(".grid .fantasma-amarelo");
var intervaloAtual = null;
var contadorDeIntervalos = 0;
var pararMovimentacaoEComecarDeNovo = false;
var matouPacman = false;
var fantasmaVermelhoMorto = false;
var fantasmaRosaMorto = false;
var fantasmaCianoMorto = false;
var fantasmaAmareloMorto = false;

// FIM DE JOGO: VITÓRIA OU DERROTA
function gameOver(condicao) {
    console.log(condicao)
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
}

//SE O PACMAN TIVER MATADO ALGUM FANTASMA, ENTÃO REALIZE A ANIMAÇÃO PARA O FANTASMA VOLTAR AO COVIL
function matarFantasma(fantasma) {
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
    var averiguar = setInterval(() => {
        /*SE O PACMAN ESTIVER NO MESMO QUADRADO E OS FANTASMAS NÃO ESTIVEREM COM O EFEITO DO POWER-PELLET,
          ENTÃO RECOMECE NOVAMENTE*/
        if ((pacman.parentElement.contains(fantasmaVermelho) || pacman.parentElement.contains(fantasmaRosa) ||
            pacman.parentElement.contains(fantasmaCiano) || pacman.parentElement.contains(fantasmaAmarelo)) &&
            (fantasmaVermelho.getAttribute("efeito-do-power-pellet") === "false" ||
            fantasmaRosa.getAttribute("efeito-do-power-pellet") === "false" ||
            fantasmaCiano.getAttribute("efeito-do-power-pellet") === "false" ||
            fantasmaAmarelo.getAttribute("efeito-do-power-pellet") === "false")) {   
            console.log(true)
            pararMovimentacaoEComecarDeNovo = true;
            voltarAoInicioPacman();
        }
        /*MAS SE O PACMAN ESTIVER NO MESMO QUADRADO QUE ALGUM FANTASMA E ELES ESTIVEREM COM O EFEITO POWER-PELLET,
          FAÇA COM QUE O FANTASMA RETORNE AO COVIL DE FANTASMAS*/
        else if ((pacman.parentElement.contains(fantasmaVermelho) || pacman.parentElement.contains(fantasmaRosa) ||
            pacman.parentElement.contains(fantasmaCiano) || pacman.parentElement.contains(fantasmaAmarelo)) &&
            (fantasmaVermelho.getAttribute("efeito-do-power-pellet") === "true" ||
            fantasmaRosa.getAttribute("efeito-do-power-pellet") === "true" ||
            fantasmaCiano.getAttribute("efeito-do-power-pellet") === "true" ||
                fantasmaAmarelo.getAttribute("efeito-do-power-pellet") === "true")) {
            if (pacman.parentElement.contains(fantasmaVermelho)) {
                fantasmaVermelhoMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaRosa)) {
                fantasmaRosaMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaCiano)) {
                fantasmaCianoMorto = true;
            }
            else if (pacman.parentElement.contains(fantasmaAmarelo)) {
                fantasmaAmareloMorto = true;
            };
        }
    }, 100);

    function voltarAoInicioPacman() {
        clearInterval(averiguar);

        setTimeout(() => {
            pacman.src = "Direçoes para o pacman/pacman-normal.png";        
            grid.children[489].appendChild(pacman);
            console.log(quantidadeDeVidas.children.length);
            console.log("dsfakjk")
            if (quantidadeDeVidas.children.length > 0) {
                quantidadeDeVidas.removeChild(quantidadeDeVidas.children[0]);
                pararMovimentacaoEComecarDeNovo = false;
                console.log("comecar de novo")
                movimentarFantasmaVermelho();
                sairDoCovilEmInicioDoJogo();
            }    
            else {
                console.log("derrota 2")
                gameOver("derrota");
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
        alternarCorDoFantasma();
    }, 4000);
}

//EM ANDAMENTO: MOVIMENTAÇÃO DOS FANTASMAS (FALTA O CIANO E AMARELO)
//FEITO: FUNCIONALIDADE PARA QUANDO O PACMAN COMER O POWER-PELLET (efeito dura 7 segundos)
//FEITO / FASE PARA TESTE: MATAR PACMAN
//FEITO: FANTASMAS CONSEGUIR IR DO 391 AO 364, E VICE-VERSA
//TODO: FANTASMA MORRER, RETORNAR AO COVIL E DEPOIS SAIR DO COVIL 
//TODO: QUANDO O PACMAN TIVER COMIDO 60 PAC-DOTS, FAÇA COM QUE TODOS OS FANTASMAS VÁ DIRETAMENTE ATRÁS DO PACMAN
function movimentarFantasmaVermelho() {
    var velocidadeDoFantasma = 250;
    console.log("movimentarFantasmaVermelho");

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
            //TODO
        }
    };

    var fantasmaVermelhoEmMovimento = setInterval(() => {
        let posicaoAtualDoVermelho = Number(fantasmaVermelho.parentElement.id);
        let direcaoDoVermelho = fantasmaVermelho.getAttribute("direcao");
        let possiveisQuadradosParaVermelho = [];

        //SE O FANTASMA TIVER MATADO O FANTASMA, ENTÃO COMECE DE NOVO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararMovimentacao();
        }*/

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
            velocidadeDoFantasma = 250;;
        }

        //SE O FANTASMA TIVER MATADO O FANTASMA, ENTÃO COMECE DE NOVO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararMovimentacao();
        }*/
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaVermelhoMorto) {
            pararMovimentacao();
        }
    }, 200);
};
movimentarFantasmaVermelho();





//TODO: RESOLVER BUG DO FANTASMA ROSA DA LINHA 189
function movimentarFantasmaRosa() {
    var velocidadeDoFantasma = 250;

    function pararMovimentacao() {
        clearInterval(fantasmaRosaEmMovimento);
        clearInterval(pararLoop);        
        console.log("parar")
        if (pararMovimentacaoEComecarDeNovo) {
            setTimeout(() => {
                grid.children[349].appendChild(fantasmaRosa);
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-baixo.png";
                fantasmaRosa.setAttribute("direcao", "esquerda");
                console.log("2");
            }, 1000);
        }
        else if (fantasmaRosaMorto) {
            //TODO
        }
    };

    var fantasmaRosaEmMovimento = setInterval(() => {
        let posicaoAtualDoRosa = Number(fantasmaRosa.parentElement.id);
        let direcaoDoRosa = fantasmaRosa.getAttribute("direcao");
        let possiveisQuadradosParaRosa = [];

        //SE O FANTASMA TIVER MATADO O FANTASMA, ENTÃO COMECE DE NOVO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararMovimentacao();
        }*/


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
            velocidadeDoFantasma = 250;;
        }

        //SE O FANTASMA TIVER MATADO O FANTASMA, ENTÃO COMECE DE NOVO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararMovimentacao();
        }*/
    }, velocidadeDoFantasma);

    let pararLoop = setInterval(() => {
        if (pararMovimentacaoEComecarDeNovo || fantasmaRosaMorto) {
            pararMovimentacao();
        }
    }, 200);
};


function sairDoCovilEmInicioDoJogo() {
    console.log("sairDoCovilEmInicioDoJogo")
    let ordemDosQuadrados = [28, 1, -28, -1];
    let autorizarSaidaDoFantasmaRosa = false;
    let autorizarSaidaDoFantasmaCiano = false;
    let autorizarSaidaDoFantasmaAmarelo = false;
    let proximaCasa = 0;


    //autorizar a saida do fantasma rosa
    let saidaDoFantasmaRosa = setTimeout(() => {
        autorizarSaidaDoFantasmaRosa = true;
    }, 1000);

    //autorizar a saida do fantasma ciano
    let saidaDoFantasmaCiano = setTimeout(() => {
        autorizarSaidaDoFantasmaCiano = true;
    }, 7000);

    //autorizar a saida do fantasma amarelo
    let saidaDoFantasmaAmarelo = setTimeout(() => {
        autorizarSaidaDoFantasmaAmarelo = true;
    }, 15250);

    let movimentaçaoDosFantasmasNoCovil = setInterval(() => {
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
                grid.children[idDivPaiRosa + ordemDosQuadrados[proximaCasa]].appendChild(fantasmaRosa)
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
                grid.children[idDivPaiCiano + ordemDosQuadrados[proximaCasa]].appendChild(fantasmaCiano)
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
            console.log("movimentarFantasmaCiano");
            //movimentarFantasmaCiano();
        }
        else if (fantasmaAtual === "fantasmaAmarelo") {
            console.log("movimentarFantasmaAmarelo");
            //movimentarFantasmaAmarelo();
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
                console.log("1");
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
    MAS, IRÁ PARAR QUANDO A PROXIMADIV DA DIREÇÃO DA SETA TIVER UMA PAREDE OU
    QUANDO A FUNÇÃO FOR CHAMADA OUTRA VEZ, PARA A DIREÇÃO DO PACMAN*/
    intervaloAtual = setInterval(() => {
        let idDivPaiDoPacman = Number(pacman.parentElement.id);

        //SE O PACMAN ESTIVER SIDO MORTO PELO FANTASMA, ENTÃO PARE O INTERVALO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararIntervalo();
        }*/


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
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("powerPellet")) {
            grid.children[idDivPaiDoPacman + proximaDiv].removeChild(grid.children[idDivPaiDoPacman + proximaDiv].firstChild);
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("powerPellet");
            decidirLadoDoPacman(idDivPaiDoPacman);
            score.innerHTML = Number(score.textContent) + 50;
            mudarAparenciaDosFantasmas();
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("parede")) {
            pararIntervalo();
        }

        //SE O PACMAN ESTIVER SIDO MORTO PELO FANTASMA, ENTÃO PARE O INTERVALO
        /*if (pararMovimentacaoEComecarDeNovo) {
            pararIntervalo();
        }*/
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