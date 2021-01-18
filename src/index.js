const robot = require('robotjs');
const readline = require('readline');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var width = 1025;
var height = 794;
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Settings
app.set('port', process.env.PORT || 3000);


//Sockets
require('./sockets')(io);


//Files
app.use(express.static(path.join(__dirname,'public')));


//Start Server
server.listen(app.get('port'),() =>{
    console.log('Server on port 3000')
});

function findPlayer(){
    var img = robot.screen.capture(0,0,width,height);

    var colors = ["bb0000", "ff0000", "990000"];

    for(var i = 0; i < 5500;i++){
        var randomX = getRandomInt(0,width-1);
        var randomY = getRandomInt(0,height-1);

        var sampleColor = img.colorAt(randomX,randomY);
            
            if(colors.includes(sampleColor))
            {
                console.log("found it! X: "+ randomX +" Y:"+ randomY +" Color: "+ colors[k]);
            }
            
    }


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

