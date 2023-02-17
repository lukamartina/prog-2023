class Scene2b extends Phaser.Scene {
    constructor() {
      super('juego2');
    }

    create ()
    {
        // BACKGROUND
        this.add.image(400, 300, 'sky2');

        //  PLATAFORMAS CATEGORIA
        platforms = this.physics.add.staticGroup();


        //  SUELO DEL LVL
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  PLATAFORMAS DEL LVL
        platforms.create(620, 382, 'ground');
        platforms.create(500, 230, 'ground');
        platforms.create(0, 380, 'ground');
        platforms.create(850, 90, 'ground');

        // PJ
        player = this.physics.add.sprite(100, 450, 'dude');

        //  GRAVEDAD Y REBOTE DEL PJ
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.7);

        //  Input Events
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
            

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 20, y: 150, stepX: 65}
        });

        stars.children.iterate(function (child) {

            //  GRAVEDAD Y REBOTE DE ESTRELLAS
            
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15)
            child.y += Phaser.Math.FloatBetween(-200, -10) 


            // CONFIG ESTRELLAS
            if (Phaser.Math.FloatBetween(0, 1) > 0.8){
                child.globalscore2 = 50;
                child.setTint(0xFF65AF);
            } 
            else
            {
                child.globalscore2 = 10;
                child.setTint(0x18A87A);
            }     

        });


        //BOMBAS CATEGORIA
        bombs = this.physics.add.group();

        //  COLLIDERS
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  si el pj junta una estrella (llama a collectstar)
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        globalscore2 = 0;
        
        // Inicialización de variables
         gameOver = false;
        scoreText = this.add.text(16, 555, 'Score: ' + globalscore2 , { fontSize: '28px', fill: '#FFFFFF' });


        // Si no junta las estrellas en 30 segundos --> Game Over
        initialTime = 30
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#FFFFFF' });


    }

    update ()
    {
        if (gameOver)
        {       
            return
        }
        
        
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

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }
          //recoleccion de estrellas
    collectStar (player, star)
    {
        star.disableBody(true, true);
        globalscore2 += star.globalscore2;
        scoreText.setText('Score: ' + globalscore2);
        


        
        //si no hay estrellas, estas spawnean
        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, child.y, true, true);

            });
            //lugar de spawn de las bombas lejos del pj
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            //config bombas
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

             
            level += 1
            initialTime = 30 - level;
        }

        //puntaje para ganar
        if (globalscore2 >= 100)
        {
            this.physics.pause();
            
            player.setTint(0x87D3FF);

            player.anims.play('turn');

            var gameOverButton = this.add.text(700, 500, 'You Win!!', { fontFamily: 'Arial', fontSize: 100, color: '#FFC912' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('creditos2',{win:true}));
            Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600)); 
            timedEvent.paused = true;
        }

    }


    //SI PJ TOCA BOMBA GAMEOVER
    hitBomb (player, bomb)
    {
        this.gameOver()
    }


    gameOver() {        
        gameOver = true;
        this.physics.pause();

        //PLAYER CONFG
        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 100, color: '#FFFFFF' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos',{win:false}));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
    }
    
    //TIEMPO DE JUEGO
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