const socket = io();


function init(){

    function main(){
        let mousePos = {
            pos:{x:500,y:700} 
        };
        socket.emit('update_screen');
       // const image = document.getElementById('gamescreen');
       //  socket.on('get_screen', screen =>{
       //     image.src = screen;
       //   });
        setTimeout(main,250);
    }

    main();
    
}



document.addEventListener('DOMContentLoaded',init())

window.onload = function() {
    var image = document.getElementById("gamescreen");

    function updateImage() {
        image.src = image.src.split("?")[0] + "?" + new Date().getTime();
    }

    setInterval(updateImage, 3000);
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