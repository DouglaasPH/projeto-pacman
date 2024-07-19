import { quadradosPretos } from "./criacao.js";
var grid = document.querySelector(".grid");
var score = document.querySelector(".score");
var level = document.querySelector(".level");
var quantidadeDeVidas = document.querySelectorAll(".vidas");
var pacman = document.querySelector(".grid .pacman");
var fantasmaVermelho = document.querySelector(".grid .fantasma-vermelho");
var fantasmaCiano = document.querySelector(".grid .fantasma-ciano");
var fantasmaRosa = document.querySelector(".grid .fantasma-rosa");
var fantasmaAmarelo = document.querySelector(".grid .fantasma-amarelo");
var intervaloAtual = null;
var contadorDeIntervalos = 0;
var pararMovimentacaoEComecarDeNovo = false;

//ADICIONAR EFEITO POWER-PELLET NOS FANTASMAS
function mudarAparenciaDosFantasmas() {
    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
    let voltarAparenciaNormal = false;

    //ALTERNAR COR ENTRE AZUL E BRANCO
    function alternarCorDoFantasma() {
        function pararIntervalo() {
            clearInterval(alternanciaDeCor);
        };

        let contador = 1;
        let alternanciaDeCor = setInterval(() => {
            if (!voltarAparenciaNormal) {
                if (contador % 2 !== 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-amedrontado-branco.png";
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-amedrontado-branco.png";
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-amedrontado-branco.png";
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amedrontado-branco.png";
                }
                else if (contador % 2 === 0) {
                    fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
                    fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
                    fantasmaCiano.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
                    fantasmaAmarelo.src = "Direçoes para os fantasmas/fantasma-amedrontado-azul.png";
                }
            } else pararIntervalo();
            contador++;
            }, 200);
    }

    //DURAÇÃO DA APARÊNCIA AZUL + TRANSIÇÃO DO BRANCO AO NORMAL
    let duracaoDoEfeito = setTimeout(() => {
        fantasmaVermelho.setAttribute("efeito-do-power-pellet", false);
        fantasmaRosa.setAttribute("efeito-do-power-pellet", false);
        fantasmaCiano.setAttribute("efeito-do-power-pellet", false);
        fantasmaAmarelo.setAttribute("efeito-do-power-pellet", false);
        voltarAparenciaNormal = true;
    }, 6000);

    let depoisDeUmTempoAtiveAAlternancia = setTimeout(() => {
        alternarCorDoFantasma();
    }, 4000);
}

//EM ANDAMENTO: MOVIMENTAÇÃO DOS FANTASMAS (FALTA O CIANO E AMARELO)
//TODO: QUANDO O PACMAN TIVER COMIDO 60 PAC-DOTS, FAÇA COM QUE TODOS OS FANTASMAS VÁ DIRETAMENTE ATRÁS DO PACMAN
//FEITO: FUNCIONALIDADE PARA QUANDO O PACMAN COMER O POWER-PELLET (efeito dura 7 segundos)
//TODO: MATAR PACMAN
//TODO: FANTASMA MORRER, RETORNAR AO COVIL E DEPOIS SAIR DO COVIL 
//FEITO: FANTASMAS CONSEGUIR IR DO 391 AO 364, E VICE-VERSA
function movimentarFantasmaVermelho() {
    var velocidadeDoFantasma = 250;

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
        if (fantasmaRosa.getAttribute("efeito-do-power-pellet") === "true") {
            velocidadeDoFantasma = 500;
        } else {
            velocidadeDoFantasma = 250;;
        }
    }, velocidadeDoFantasma);
};
movimentarFantasmaVermelho();





//TODO: RESOLVER BUG DO FANTASMA ROSA DA LINHA 189
function movimentarFantasmaRosa() {
    var velocidadeDoFantasma = 250;

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
            velocidadeDoFantasma = 250;;
        }
    }, velocidadeDoFantasma);
};


function sairDoCovilEmInicioDoJogo() {
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
        clearInterval(movimentaçaoDosFantasmasNoCovil);
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
            fantasmaVermelho.setAttribute("efeito-do-power-pellet", true);
            fantasmaRosa.setAttribute("efeito-do-power-pellet", true);
            fantasmaCiano.setAttribute("efeito-do-power-pellet", true);
            fantasmaAmarelo.setAttribute("efeito-do-power-pellet", true);
            mudarAparenciaDosFantasmas();
        }
        else if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("parede")) {
            pararIntervalo();
        }
    }, 250);

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