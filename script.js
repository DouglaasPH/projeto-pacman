var grid = document.querySelector(".grid");
var score = document.querySelector(".score");
var level = document.querySelector(".level");
var pacman = document.querySelector(".grid .pacman");
var intervaloAtual = null;
var contadorDeIntervalos = 0;

//MOVIMENTAR PACMAN.
function movimentoDoPacman(proximaDiv) {
    /*SE O PACMAN JÁ ESTIVER INDO EM UMA DIREÇÃO, ENTÃO PARE O INTERVALO E
    E INCIE UM OUTRO NOVO INTERVALO COM UMA NOVA DIREÇÃO, DE ACORDO COM A SETA CLICADA*/
    contadorDeIntervalos += 1;
    if (contadorDeIntervalos > 1) {
        contadorDeIntervalos = 1;
        clearInterval(intervaloAtual);
    };

    /*O PACMAN IRÁ SEGUIR INFINIMANTE PARA O LADO EM QUE A SETA FOI CLICADO, 
    MAS, IRÁ PARAR QUANDO A PROXIMADIV DA DIREÇÃO DA SETA TIVER UMA PAREDE OU
    QUANDO A FUNÇÃO FOR CHAMADA OUTRA VEZ, PARA A DIREÇÃO DO PACMAN*/
    intervaloAtual = setInterval(() => {
        let idDivPaiDoPacman = Number(pacman.parentElement.id);
        if (idDivPaiDoPacman === 364) {
            grid.children[391].appendChild(pacman);
        } else if (idDivPaiDoPacman === 391) {
            grid.children[364].appendChild(pacman);
        }

        if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("vazio")) {
            grid.children[idDivPaiDoPacman + proximaDiv].appendChild(pacman)
        };
        if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("pacDot")) {
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("pacDot");
            grid.children[idDivPaiDoPacman + proximaDiv].classList.add("vazio");
            grid.children[idDivPaiDoPacman + proximaDiv].innerHTML = "";
            score.innerHTML = Number(score.textContent) + 10;
            grid.children[idDivPaiDoPacman + proximaDiv].appendChild(pacman)
        };
        if (grid.children[idDivPaiDoPacman + proximaDiv].classList.contains("powerPellet")) {
            grid.children[idDivPaiDoPacman + proximaDiv].classList.remove("powerPellet");
            grid.children[idDivPaiDoPacman + proximaDiv].classList.add("vazio");
            grid.children[idDivPaiDoPacman + proximaDiv].innerHTML = "";
            score.innerHTML = Number(score.textContent) + 50;
            grid.children[idDivPaiDoPacman + proximaDiv].appendChild(pacman)
        }
    }, 250);
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