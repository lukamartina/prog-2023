class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      this.load.image('logo', 'assets/logo.png');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('sky2', 'assets/sky2.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });  
    }

    create() {

      //  animaciones del jugador
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      //game menu
      var logo = this.add.image(400, 300, 'logo').setScale(0.26)

      var play=this.add.text(640, 500, 'Play', { fontFamily: 'Comic Sans MS', fontSize: 45, color: '#ffffff'}); 
      play.setInteractive()
      play.on('pointerdown', () => this.scene.start('juego') )

      var Creeditos=this.add.text(640, 565, 'Credits', { fontFamily: 'Comic Sans MS', fontSize: 20, color: '#ffffff'}); 
      Creeditos.setInteractive()
      Creeditos.on('pointerdown', () => this.scene.start('Creditos') )
    }
}
