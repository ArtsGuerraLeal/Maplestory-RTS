const socket = io();


function init(){

    let mouse = {
        click: false,
        right_click: false,
        move: false,
        pos:{x:0,y:0}
    };

    let keyPress = {
        pressed:false,
        held:false,
        keyup: false,
        keydown: false,
        keyCode: false
    }
    

    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        mouse.right_click = true;
        console.log('Right Click');
      });

    document.addEventListener('mousedown',(e) => {
        mouse.click = true;
        console.log('Click');

    });   

    document.addEventListener('mouseup',(e) => {
        mouse.click = false;
    }); 

    document.addEventListener('mousemove',(e) => {
        mouse.move = true;
        mouse.pos.x = e.clientX;
        mouse.pos.y = e.clientY;
    }); 

    document.addEventListener('keypress', (e) => {

     //   pressed = true;
    //    held = false;
    //    keyup = false;
    //    keyCode = e.key;
    //    console.log('Key Pressed');

    });
    
    document.addEventListener('keydown', (e) => {
        if(!keyPress.held){
            keyPress.pressed = true;
            keyPress.held = true;
            keyPress.keyup = false;
            keyPress.keyCode = e.key;

            if(keyPress.keyCode == ' '){
                keyPress.keyCode = 'space';
            }
            if(keyPress.keyCode == 'ArrowRight'){
                keyPress.keyCode = 'right';
            }
            if(keyPress.keyCode == 'ArrowLeft'){
                keyPress.keyCode = 'left';
            }
            if(keyPress.keyCode == 'ArrowUp'){
                keyPress.keyCode = 'up';
            }
            if(keyPress.keyCode == 'ArrowDown'){
                keyPress.keyCode = 'down';
            }

        }


    }); 

    document.addEventListener('keyup', (e) => {
        if(keyPress.held){
        keyPress.pressed = false;
        keyPress.held = false;
        keyPress.keyup = true;
        keyPress.keyCode = e.key;
        if(keyPress.keyCode == ' '){
            keyPress.keyCode = 'space';
        }
        if(keyPress.keyCode == 'ArrowRight'){
            keyPress.keyCode = 'right';
        }
        if(keyPress.keyCode == 'ArrowLeft'){
            keyPress.keyCode = 'left';
        }
        if(keyPress.keyCode == 'ArrowUp'){
            keyPress.keyCode = 'up';
        }
        if(keyPress.keyCode == 'ArrowDown'){
            keyPress.keyCode = 'down';
        }
        }
    }); 

   

    function main(){

        if(mouse.move){
            socket.emit('move_mouse', mouse.pos );
            mouse.move = false;
        }

        if(mouse.click & mouse.right_click != true){
            socket.emit('click_mouse');
        }

        if(mouse.right_click){
            socket.emit('right_click_mouse');
            mouse.right_click = false;
        }

        if(keyPress.held & keyPress.pressed){
            
            socket.emit('key_held', keyPress.keyCode);  
            keyPress.pressed = false;
 
        }

        if(keyPress.keyup){
            socket.emit('key_release', keyPress.keyCode);
            keyPress.keyup = false;

        }

    
        socket.emit('update_screen');
       // const image = document.getElementById('gamescreen');
     //    socket.on('get_screen', screen =>{
      //      image.src = screen;
      //    });
        setTimeout(main,250);
    }

    main();
    
}



document.addEventListener('DOMContentLoaded',init())

window.onload = function() {
    var image = document.getElementById("gamescreen");
    var imageCounter = 0;
    function updateImage() {
        if(imageCounter<31){
            image.src = '/screen/screen_'+imageCounter+'.jpeg';
            imageCounter++;
        }else{
            imageCounter = 0;
        }
        
     //   image.src = image.src.split("?")[0] + "?" + new Date().getTime();
    }

    setInterval(updateImage, 1000);
}

function commandRunRight(){
    socket.emit('run_right');
}

function commandRunLeft(){
    socket.emit('run_left');
}

function commandJump(){
    socket.emit('jump');
}

function commandAttack(){
    socket.emit('attack');
}