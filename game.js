
    document.addEventListener('keydown', function(evento){
        if (evento.keyCode == 39) {
            logicaCamina();
            logicaDelante();
        }
        if (evento.keyCode == 37){
            logicaCamina();
            logicaDetras();
        }if(evento.keyCode == 38){
            saltar();
            logicaCamina();
        }
        
        
        if(evento.keyCode == 32){
          
            
            console.log("salta");
           
            if (nivel.muerto == false){
            saltar();
            logicaCamina();
            }else  {
                FujiC.vy = 0; 
                nivel.velocidad = 9;
                nube.velocidad = 1;
                cactus.x = ancho + 100;
                nivel.puntos = 0;
                nube.x = ancho + 100;
                nivel.muerto = false;
                FujiC.paso1=0;
                FujiC.velocidad= 86; 
                imgRexC.src = '/img/fujic.png';
                
                
            }
        }
    });
    
    ///------------------------------------------------------------------------------------------------
    //detectando el mouse
    document.addEventListener('click', function(eventoMouse){
    
        if(eventoMouse.clientX > FujiC.x){
            logicaCamina();
            logicaDelante();
        }else{
            logicaCamina();
            logicaDetras();
        }
        if(eventoMouse.clientY < FujiC.y){
            saltar();
            logicaCamina();
        }
        var PosX = event.clientX
        console.log(PosX)
    });
    
    
    //-------------------------------------------------------------------------------------------------
       
    var  imgNube, ImgCactus, imgSuelo, imgfujiC, imgBack, imgFarRock ;
    
    function cargarImagenes(){
        
        imgfujiC     = new Image();
        imgNube     = new Image();
        imgCactus   = new Image();
        imgSuelo    = new Image();
    
        imgBack     = new Image();
        imgFarRock  = new Image();
    
        imgfujiC.src = '/img/fujic.png';
        
        imgNube.src = '/img/clouds.png';
        imgCactus.src = '/img/tree1.png';
        imgSuelo.src = '/img/rock.png';
    
        imgBack.src = '/img/back.png';
        imgFarRock.src = '/img/farrock.png'
    }
    //-------------------------------------------------------------------------------------------------
    var titlesize, textsize;
    
    
    
        var ancho = window.innerWidth;
        
        
        var alto = window.innerHeight;
    
        var canvas, ctx;
    
        
    function inicializa(){
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        cargarImagenes();
    
    }
    
    function borraCanvas(){
        canvas = document.getElementById('canvas');
        canvas.width =  window.innerWidth;
        canvas.height = window.innerHeight;
        
    }
        
    var suelo = 630;
    
    var FujiC = {paso1:0, paso2:100, velocidad: 100, y: suelo+10, vy: 0, gravedad: 2, salto: 16, vymax: 9, saltando: false, x:0, velX: 10  };
                   
    var nivel = {velocidad: 9, puntos: 0, muerto: false};
           
    var cactus = {x: ancho + 100 , y: suelo ,};
         
    var nube = {x:-ancho*0.3, y: alto*0.4, velocidad:0.5, };
        
    var farrock = {x: 0, y: 0}
    
    var piso = {x: 0, y: suelo-190}
    
    //-------------------------------------------------------------------------------------------------------
       
    
   function dibujaCaminando(){
        ctx.drawImage(imgfujiC,FujiC.paso1,0,100,121,FujiC.x,FujiC.y,60,61)
    }
        
        function logicaCamina(){
        if (FujiC.paso1 < 100 ){
            FujiC.paso1 += FujiC.velocidad;
        }else{
                FujiC.paso1 -= FujiC.velocidad;
            }    
         
    }
        function logicaDelante(){
            if (FujiC.x >= 0 && FujiC.x < ancho*0.95){
                FujiC.x += FujiC.velX;
            }else{
                FujiC.x = ancho*0.95;
            }
        } 
        function logicaDetras(){
            if (FujiC.x > 0 && FujiC.x <= ancho ){
                FujiC.x -= FujiC.velX;
            }else {
                FujiC.x == 0
            }
        }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
   
    function dibujaCatus(){
        ctx.drawImage(imgCactus,0,0,50,100,cactus.x,cactus.y,45,80)
    }
    
       
    function logicaCactus(){
        if (cactus.x < -100){
        
            cactus.x =ancho + 100
            nivel.puntos++;
        }
        else {
            cactus.x -= nivel.velocidad;
        }
    }
    //---------------------------------------------------------------------------------------------------
    var altoPiso = 320;
            if (alto <= 720){
                altoPiso= 320;
            }else{
                altoPiso=alto*0.2;
            }
        
       
        function dibujaPiso(){
            ctx.drawImage(imgSuelo,piso.x,0,1600,320,0,piso.y,1600,320)
        }
        
            
        function logicaPiso(){
            if (piso.x > 1400){
                piso.x = 0;
            }
            else{
                piso.x += nivel.velocidad;
            }
        }
            
    
    //---------------------------------------------------------------------------------------------------

    function dibujaBack(){
        ctx.drawImage(imgBack,0,0,1600,320,0,0,1600,400);
    }
    
    function dibujaFarRock(){
        ctx.drawImage(imgFarRock,0,0,1600,320,0,0,1600,400);
    }

    //---------------------------------------------------------------------------------------------------
    
  
    function dibujaNubes(){
            ctx.drawImage(imgNube,0,0,1600,320,nube.x,nube.y,3200,400 );
    }
           
    function logicaNube(){
        if (FujiC.x > 0){
          
           nube.velocidad +=0.01;
           nube.x -= nube.velocidad;
        }
        else {
          if (nube.x < -500 ){  
                nube.velocidad -=0.01;
              nube.x += nube.velocidad;
            }else{
                nube.x == -500;
            }
            
            
        }
        if (nube.x <= -1600){
            nube.velocidad -=0.01;
            nube.x += nube.velocidad;
        }
    }
    
    //----------------------------------------------------------------------------------------------------
    function saltar(){
       
       
        if(FujiC.vy < 30){
        FujiC.vy = FujiC.salto;
        FujiC.saltando = true;
    }else{
        FujiC.saltando = false;
        
    }
    }
    
     
    
    function gravedad() {
        if (FujiC.saltando == true){
            
            if (FujiC.y - FujiC.vy - FujiC.gravedad > suelo){
                FujiC.saltando = false;
                FujiC.vy = 0;
                FujiC.y = suelo+10;
            }
            else{
           
            FujiC.vy -= FujiC.gravedad;
            FujiC.y -= FujiC.vy;
             }
        }
    }
    //--------------------------------------------------------------------------------------------------------
      
    function colision(){
       
        if(FujiC.x >= 540 && FujiC.x <= 550 ){
            if(FujiC.y >= suelo+10){
               if(FujiC.velX >0){
            
                FujiC.velX -= 1;}else{
                    FujiC.velX =0;
                }
    
            }
           else{
               FujiC.y = suelo+20;
               FujiC.velX == 10;
           }
        }
    }
    //-------------------------------------------------------------------------------------------------------
            //puntuacion
            var positionX, positiony, pxGameOver, pyGameOver;
            positionX = ancho - ancho*(10/100);
            positiony =  alto - alto*(90/100);
            pxGameOver =  ancho - ancho*(50/100);
            pyGameOver = alto - alto*(50/100);
            var gameOverText = {x: ancho + 100 , y: suelo - 15, velocidad: 9};
            
        
           
    function puntuacion(){
        ctx.font= "20px 'Press Start 2P'";
        ctx.fillStyle = "#555555";
        ctx.fillText(newFunction() , positionX, positiony);
    
        if(nivel.muerto == true){
            ctx.font = "60px 'Press Start 2P'";
            ctx.fillText(textofinal(), pxGameOver, pyGameOver);
        }if(ancho < 1200){
            gameOverText -= gameOverText.velocidad
        }
    
        
    
        function newFunction() {
            return nivel.puntos;
        }
        function textofinal(){
            return "c'est fini"
        }
        
    }
    
       
    //------------------------------------------------------------------------------------------------------
   
    var FPSCaminando = 5;
    var FPS = 15;
      
    setInterval(function(){
        principal();
    },1000/FPS);
    
    
   
    function principal(){
        borraCanvas();
        gravedad();
        //colision();
    
        //background
       // puntuacion();
        dibujaBack();
        dibujaNubes();
        dibujaFarRock();
      
        
        logicaNube();
        //front-personage
        dibujaPiso();
        dibujaCaminando();
    };
            
    