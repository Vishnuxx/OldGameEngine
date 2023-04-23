import Game from "./game";

var game = new Game();

//______Object declaration______
let ball1;
let ball2;
let ball3;
//______Object declaration______


//______Object Initialization______
function init(){

   ball1 = new Ball(game);
   ball2 = new Ball(game);
   ball3 = new Ball(game);

}


function update(){

   ball1.update();
   ball2.update();
   ball3.update();

}

function physics(){

   ball1.physics();
   ball2.physics();
   ball3.physics();

}

function lateUpdate(){

  ball1.lateUpdate();
  ball2.lateUpdate();
  ball3.lateUpdate();

}

init();
function render(){

  update();
  physics();
  lateUpdate();

}