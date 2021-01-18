const { Socket } = require("socket.io");
const robot = require('robotjs');
const Jimp = require('jimp')

module.exports = io => {
  
    var line_history = [];
    var imageCounter = 0;

    io.on('connection', socket => {
        console.log("user Connected");
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
          });
        
          

         socket.on('update_screen', msg => {
           if(imageCounter < 31){

             var width = 1025;
             var height = 800;
             var screen = robot.screen.capture(0,0,width,height).image;
             var path = 'src/public/screen/screen_'+imageCounter+'.jpeg';
             new Jimp({data: screen, width, height}, (err, image) => {
               image.quality(10).write(path);
              });
              
              var screenPath = 'screen/screen_'+imageCounter+'.jpeg';
              io.emit('get_screen',screenPath);
              imageCounter++;
            }else{
              imageCounter = 0;
            }
        });

            socket.on('click_mouse', msg => {
              robot.mouseClick();
          });
          socket.on('right_click_mouse', msg => {
            robot.mouseClick('right');
          });
            socket.on('move_mouse', msg => {
              robot.moveMouseSmooth(msg.x,msg.y);
          });

             socket.on('key_held', msg => {
              console.log('Pressing... ' + msg);
              robot.keyToggle(msg,'down');

            });
            socket.on('key_release', msg => {
              console.log('Stopping...');
              robot.keyToggle(msg,'up');
            });

            socket.on('run_right', msg => {
              console.log('Moving...');
              robot.keyToggle("right",'down');
              sleep(1000);
              robot.keyToggle("right",'up');
              console.log('Stopping...');
          });

            socket.on('run_left', msg => {
              console.log('Moving...');
              robot.keyToggle("left",'down');
              sleep(1000);
              robot.keyToggle("left",'up');
              console.log('Stopping...');
          });

            socket.on('jump', msg => {
              console.log('Jumping...');
              robot.keyTap("space");
          });

            socket.on('attack', msg => {
              console.log('Attacking...');
              robot.keyTap("z");
          });


    
    });

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}