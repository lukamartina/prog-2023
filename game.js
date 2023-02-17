var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 320 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, Scene2b, Scene3, Scene4, SceneCreditos] 
    //la primera escena que pones en el array es la primera que se ejecuta
};

var game = new Phaser.Game(config);

var globalscore;
var globalscore2;
var finalscore;
var gameOver;

var player;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;

var timedEvent;
var initialTime;
var timeText;
var winlo;
var level = 0;