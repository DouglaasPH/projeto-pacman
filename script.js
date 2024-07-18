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


//TESTE: MOVIMENTAÇÃO DOS FANTASMAS (FALTA O CIANO E AMARELO)
//TODO: QUANDO O PACMAN TIVER COMIDO 60 PAC-DOTS, FAÇA COM QUE TODOS OS FANTASMAS VÁ DIRETAMENTE ATRÁS DO PACMAN
//TODO: FUNCIONALIDADE PARA QUANDO O PACMAN COMER O POWER-PELLET (efeito dura 10 segundos)
//TODO: MATAR PACMAN
//TODO: FANTASMA MORRER, RETORNAR AO COVIL E DEPOIS SAIR DO COVIL 
//TODO: FANTASMAS CONSEGUIR IR DO 391 AO 364, E VICE-VERSA
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
                fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-esquerda.png";                                
                grid.children[posicaoAtualDoVermelho - 1].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "esquerda");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao esquerda");
            }
        }
        else if (direcaoDoVermelho === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-direita.png";
                grid.children[posicaoAtualDoVermelho + 1].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "direita");

            }
            if (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao direita");
            }
        }
        else if (direcaoDoVermelho === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoVermelho - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-cima.png";
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
                fantasmaVermelho.src = "Direçoes para os fantasmas/fantasma-vermelho-baixo.png";
                grid.children[posicaoAtualDoVermelho + 28].appendChild(fantasmaVermelho);
                fantasmaVermelho.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaVermelho.setAttribute("direcao", "mudar a direçao baixo");
            }
        }
    }, 300);
};
movimentarFantasmaVermelho();





//TODO: RESOLVER BUG DO FANTASMA ROSA DA LINHA 189
function movimentarFantasmaRosa() {
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
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-esquerda.png";                    
                grid.children[posicaoAtualDoRosa - 1].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "esquerda");
            }
            if (grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] - 1].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao esquerda");
            }
        }
        else if (direcaoDoRosa === "direita") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa + 1);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-direita.png";
                grid.children[posicaoAtualDoRosa + 1].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "direita");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 1].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao direita");
            }
        }
        else if (direcaoDoRosa === "cima") {
            let futuraPosicao = quadradosPretos.indexOf(posicaoAtualDoRosa - 28);
            if (!grid.children[quadradosPretos[futuraPosicao]].classList.contains("parede") && !grid.children[quadradosPretos[futuraPosicao]].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-cima.png";
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
                fantasmaRosa.src = "Direçoes para os fantasmas/fantasma-rosa-baixo.png";
                grid.children[posicaoAtualDoRosa + 28].appendChild(fantasmaRosa);
                fantasmaRosa.setAttribute("direcao", "baixo");
            }
            if (grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("parede") || grid.children[quadradosPretos[futuraPosicao] + 28].classList.contains("covilDosFantasmas")) {
                fantasmaRosa.setAttribute("direcao", "mudar a direçao baixo");
            }
        }
    }, 300);
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

    let movimentacaoDoRosaDentroDoCovil = setInterval(() => {
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
        clearInterval(movimentacaoDoRosaDentroDoCovil);
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