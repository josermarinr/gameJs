//--------------------1-----------------------------------------
document.addEventListener('keydown', function (evento) {
    switch (evento.code) {
        case evento.code == 'ArrowRight':
            logicaCamina();
            logicaDelante();
        case evento.code == 'ArrowLeft':
            logicaCamina();
            logicaDetras();;
        case evento.code == 'ArrowUp':
            saltar();
            logicaCamina();
    }

});

///------------------------------------------------------------------------------------------------
//detectando el mouse
document.addEventListener('click', function (eventoMouse) {

    if (eventoMouse.clientX > FujiC.x) {
        logicaCamina();
        logicaDelante();
    } else {
        logicaCamina();
        logicaDetras();
    }
    if (eventoMouse.clientY < FujiC.y) {
        saltar();
        logicaCamina();
    }
});

//---------------------------------------------------------------------------------------
//detectando el tactil
document.addEventListener('touchmove', function (touch) {
    if (touch.touches[0].clientX > FujiC.x) {
        logicaCamina();
        logicaDelante();
    } else {
        logicaCamina();
        logicaDetras();
    }
    if (touch.touches[0].clientY < FujiC.y) {
        saltar();
        logicaCamina();
    }
    /*var TouchX = touch.touches[0].clientX;
        console.log("el tactil es" +TouchX);
    var TouchY = touch.touches[0].clientY;   
       console.log("el tactil y es" +TouchY);*/
});
//-----------------------3-------------------------------------------------------------

var canvas, ctx;

function inicial() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargarImagenes();
}


function borrarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//-------------------4-------------------------------------------------------------------------------------

var imgNube, imgTree, imgSuelo, imgfujiC, imgBack, imgFarRock, imgCoin;

function cargarImagenes() {

    imgfujiC = new Image();
    imgNube = new Image();
    imgCoin = new Image();
    imgSuelo = new Image();

    imgBack = new Image();
    imgFarRock = new Image();

    imgfujiC.src = '/img/fujic.png';

    imgNube.src = '/img/clouds.png';
    imgCoin.src = '/img/coin.png'
    imgSuelo.src = '/img/rock.png';

    imgBack.src = '/img/back.png';
    imgFarRock.src = '/img/farrock.png'
}

//-------------------------5---------------------------------------------------
var ancho = window.innerWidth;
var alto = window.innerHeight;

var suelo = alto * 0.85;

var FujiC = {
    paso1: 0,
    paso2: 100,
    velocidad: 100,
    y: suelo + 10,
    vy: 0,
    gravedad: 4,
    salto: 16,
    vymax: 9,
    saltando: false,
    x: 0,
    velX: 10
};



function dibujandoFuji() {

    ctx.drawImage(imgfujiC, FujiC.paso1, 0, 100, 121, FujiC.x, FujiC.y, 60, 61)

}

function logicaCamina() {
    if (FujiC.paso1 < 100) {
        FujiC.paso1 += FujiC.velocidad;
    } else {
        FujiC.paso1 -= FujiC.velocidad;
    }

}

function logicaDelante() {
    if (FujiC.x >= 0 && FujiC.x < ancho * 0.95) {
        FujiC.x += FujiC.velX;
    } else {
        FujiC.x = ancho * 0.95;
    }
}

function logicaDetras() {
    if (FujiC.x > 0 && FujiC.x <= ancho) {

        FujiC.x -= FujiC.velX;
    } else {
        FujiC.x == 0
    }
}

function saltar() {

    FujiC.vy = FujiC.salto;
    FujiC.saltando = true;

}



function gravedad() {
    if (FujiC.saltando == true) {

        if (FujiC.y - FujiC.vy - FujiC.gravedad > suelo) {
            FujiC.saltando = false;
            FujiC.vy = 0;
            FujiC.y = suelo + 10;
        } else {

            FujiC.vy -= FujiC.gravedad;
            FujiC.y -= FujiC.vy;

        }
    }
}
//----------------------------------6-----------------------------
//------------------------------background--------------------------

var piso = {
    x: 0,
    y: suelo - 190
}

var altoPiso = 320;
if (alto <= 720) {
    altoPiso = 320;
} else {
    altoPiso = alto * 0.2;
}


function dibujaPiso() {
    ctx.drawImage(imgSuelo, piso.x, 0, 1600, 320, 0, piso.y, 1600, 320)
}


function logicaPiso() {
    if (piso.x > 1400) {
        piso.x = 0;
    } else {
        piso.x += nivel.velocidad;
    }
}
//----------------------
var tree = {
    x: ancho + 100,
    y: suelo,
};

var farrock = {
    x: 0,
    y: 0
}

function dibujaBack() {
    ctx.drawImage(imgBack, 0, 0, 1600, 320, 0, 0, 1600, alto);
}

function dibujaFarRock() {
    ctx.drawImage(imgFarRock, 0, 0, 1600, 320, 0, 0, 1600, alto);
}
//------------------------
var nube = {
    x: -ancho * 0.3,
    y: alto * 0.4,
    velocidad: 0.5,
};

function dibujaNubes() {
    ctx.drawImage(imgNube, 0, 0, 1600, 320, nube.x, nube.y, 3200, alto * 0.5);
}

function logicaNube() {
    if (FujiC.x > 0) {

        nube.velocidad += 0.01;
        nube.x -= nube.velocidad;
    } else {
        if (nube.x < -500) {
            nube.velocidad -= 0.01;
            nube.x += nube.velocidad;
        } else {
            nube.x == -500;
        }
    }
    if (nube.x <= -1600) {
        nube.velocidad -= 0.01;
        nube.x += nube.velocidad;
    }
}

//------------------------------7---------------------------------
//--------------------------moneda------------------------------
function RandomPositionCoin(min, max) {
    return Math.random() * (max - min) + min;
}
//console.log("el numero rando es" + RandomPositionCoin(100, ancho));


var i = RandomPositionCoin(80, ancho - 50);

var coin = {
    velocidad: 70,
    step1: 0,
    x: i,
    y: suelo
}

function dibujandoCoin() {
    // 0 70 140 210 280 350

    ctx.drawImage(imgCoin, coin.step1, 0, 70, 66, coin.x, coin.y, 33, 36)

}

function logicaCoin1() {

    if (coin.step1 >= 0 && coin.step1 < 410) {
        coin.step1 += coin.velocidad;
    } else {
        coin.step1 -= coin.velocidad;
    }
}

function logicaCoin1() {

    if (coin.step1 <= 420 && coin.step1 <= 0) {
        coin.step1 = coin.velocidad;
    } else {
        coin.step1 -= coin.velocidad;
    }
}
//-------------------------8--------------------------------------------------------------
//puntuacion ----------------------------------- 

var nivel = {
    velocidad: 9,
    puntos: 0,
    muerto: false,
    point: 0,
};

function pointAdd() {
    if (FujiC.x >= coin.x - 1 && FujiC.x <= coin.x + 15) {
        nivel.puntos++;



    }

}

function cambiarCoin() {
    if (nivel.point != nivel.puntos) {

        coin.x =
            RandomPositionCoin(50, ancho - 50);


        nivel.point++;

    } //console.log("esto es i" + coin.x); 

    // console.log("tus puntos son" + nivel.puntos);

}

var positionX, positiony, pxGameOver, pyGameOver;
positionX = ancho * 1.1;
positiony = alto * 0.1;
pxGameOver = ancho - ancho * (50 / 100);
pyGameOver = alto - alto * (50 / 100);
var gameOverText = {
    x: ancho + 100,
    y: suelo - 15,
    velocidad: 9
};



function puntuacion() {
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillStyle = "#555555";
    ctx.fillText(newFunction(), positionX, positiony);

    if (nivel.muerto == true) {
        ctx.font = "60px 'Press Start 2P'";
        ctx.fillText(textofinal(), pxGameOver, pyGameOver);
    }
    if (ancho < 1200) {
        gameOverText -= gameOverText.velocidad
    }



    function newFunction() {
        return nivel.puntos;
    }

    function textofinal() {
        return "Game Over"
    }

}





//---------------------2-----------------------------------------------------------------------------------

var FPSCaminando = 2;
var FPS = 15;

setInterval(function () {
    window.onload(principal())
}, 1000 / FPS);

setInterval(function () {
    logicaCoin1();

}, 10000 / FPSCaminando);

function principal() {
    borrarCanvas();
    gravedad();
    pointAdd();
    //------
    window.onload(
        dibujaBack(),
        dibujaNubes(),
        dibujaFarRock(),
        dibujaPiso(),
        dibujandoCoin(),
        dibujandoFuji()
    )

    //-----
    puntuacion();
    cambiarCoin();
};