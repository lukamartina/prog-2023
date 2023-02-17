class SceneCreditos extends Phaser.Scene {
    constructor() {
      super('Creditos');
    }

    create() {
      //game menu
      var logo = this.add.image(400, 300, 'logo').setScale(0.26)

      var play=this.add.text(640, 500, 'Play', { fontFamily: 'Comic Sans MS', fontSize: 45, color: '#ffffff'});
      play.setInteractive()
      play.on('pointerdown', () => this.scene.start('juego') )

      var Creeditos=this.add.text(300, 570, 'Designed, programmed and tested by Luka Martina', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff'}); 
      
    }
}
