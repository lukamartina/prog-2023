class Scene4 extends Phaser.Scene {
    constructor() {
      super("creditos2");
    }
    init(win) {winlo=win
    console.log (winlo)
    }

    preload ()
    {
      this.load.image('logo2D', 'assets/logo2D.png');   
    }
    
    create() {
      this.add.image(400, 300, 'sky');
      this.add.image(400, 568, 'ground').setScale(2)
      this.add.image(400, 100, 'logo2D');
      
      finalscore = globalscore + globalscore2;
      scoreText = this.add.text(16, 555, 'Tu puntaje total es: ' + finalscore, { fontSize: '28px', fill: '#FFFFFF' });

      var restartButton = this.add.text(700, 500, 'Restart', { fontFamily: 'Arial', fontSize: 20, color: '#000000' })
      .setInteractive()
      .on('pointerdown', () => this.reiniciar() );
      if (winlo.win==true) { var ta 
        ta = this.add.text(700, 470, '', { fontFamily: 'Arial', fontSize: 20, color: '#000000'});
        ta.setText('Next level');
        ta.setInteractive(); ta.on('pointerdown', () => this.scene.start("juego2"));}
    }

    reiniciar() {
      this.scene.start('juego');
    }

    
}
  