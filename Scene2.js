class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }

    create ()
    {
        //  BACKGROUND
        this.add.image(400, 300, 'sky');


        //  SETEAR LAS PLATAFORMAS COMO "staticGroup"
        platforms = this.physics.add.staticGroup();


        //  LIMITES DEL MAPA (PANTALLA)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();


        //  PLATAFORMAS DEL MAPA
        platforms.create(600, 390, 'ground');
        platforms.create(40, 300, 'ground');
        platforms.create(750, 220, 'ground');
        platforms.create(500, 90, 'ground');


        // PJ
        player = this.physics.add.sprite(100, 450, 'dude');


        //  FISICAS
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.7);


        //  INPUT
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }

        //  ESTRELLAS
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 20, y: 150, stepX: 65}
        });

        stars.children.iterate(function (child) {


            //  REBOTE Y GRAVEDAD DE ESTRELLAS 

            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15)
            child.y += Phaser.Math.FloatBetween(-200, -10) 
            
            // Probabilidad de tipo de estrella
            
            if (Phaser.Math.FloatBetween(0, 1) > 0.8){
                child.globalscore = 50;
                child.setTint(0xFF65AF);
            } 
            else
            {
                child.globalscore = 10;
                child.setTint(0x18A87A);
            }
            
        });

        //  comprueba si el jugador esta tocando alguna estrella
        this.physics.add.overlap(player, stars, this.collectStar, null, this);


        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        bombs = this.physics.add.group();

        // PUNTAJE
        scoreText = this.add.text(16, 555, 'Score: 0', { fontSize: '28px', fill: '#FFFFFF' });

        // Inicializacion de variables.
        globalscore = 0;
        gameOver = false;

        
        //this.scene.data.set("puntaje", globalscore);


        //  COLLIDERS
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);


        // Si no junta las estrellas en 30 segundos --> Game Over
        initialTime = 30
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#FFFFFF' });

    }

    update ()
    {

        // REINICIO SI PERDES
        if (gameOver)
        {       
            return
        }
        
        // MOVIMIENTO DEL PJ
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        //SI EL PJ ESTA EN EL SUELO Y TOCAS "W" VA A SALTAR
        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }


    collectStar (player, star)
    {
        //star.disableBody(true, true); // desactiva estrella----------------------------------------------------------------------

        globalscore += star.globalscore;
        scoreText.setText('Score: ' + globalscore); //si el pj toca la estrella aumenta el globalscore

        try {
            star.disableBody(true, true);
            globalscore += 10;
            scoreText.setText("Score: " + globalscore);
            } catch (error) {
            console.error(error);
            }

        //comprueba las estrellas y el spawn
        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, child.y, true, true);

            });
            // SPAWN DE LAS BOMBAS
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


            //CONFIG DE LAS BOMBAS
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

             
            level += 1
            initialTime = 30 - level;
        }


        //ALCANZAR PUNTAJE
        if (globalscore >= 50)
        {
            this.physics.pause();
            
            player.setTint(0x87D3FF);

            player.anims.play('turn');

            var gameOverButton = this.add.text(700, 500, 'You Win!!', { fontFamily: 'Arial', fontSize: 100, color: '#FFC912' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('creditos', {win:true}, { puntaje: this.data.get("puntaje") }));
            Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600)); 
            timedEvent.paused = true;
        }

    }


    //TOCAR BOMBA
    hitBomb (player, bomb)
    {
        this.gameOver()
    }


    //GAME OVER
    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 100, color: '#FFFFFF' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos',{win:false}));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
    }
    

    //CUANDO SE TERMINA EL TIEMPO GAMEOVER
    onSecond() {
        if (! gameOver)
        {       
            initialTime = initialTime - 1;
            timeText.setText('Countdown: ' + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }

    }



}