import Phaser from "phaser";
import * as React from "react";

export default class GameContainer extends React.Component {
  componentDidMount() {
    var config = {
      type: Phaser.AUTO,
      pixelArt: true,
      width: 400,
      height: 700,
      parent: "phaser-game",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    var player;
    var ohms;
    var score = 0;
    var scoreText;
    var timedEvent;
    var timeText;
    var gameOver = false;


    new Phaser.Game(config);

    function preload() {
      this.load.image('stage', 'assets/Stage.png');
      this.load.image('gohm', 'assets/DotGreen.png');
      this.load.image('pohm', 'assets/DotPurple.png');
      this.load.image('oohm', 'assets/DotOrange.png');
      this.load.spritesheet('player', 'assets/Player.png', {
        frameWidth: 150,
        frameHeight: 150
      });
    }

    function create() {

      this.add.image(200, 350, 'stage');

      timeText = this.add.text(300, 0, '', {
        fontSize: '16px',
        fill: '#000'
      });

      timedEvent = this.time.delayedCall(5000, onEvent, [], this);


      player = this.physics.add.sprite(75, 625, 'player').setInteractive();

      this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
        player.y = pointer.y

      });

      ohms = this.physics.add.group({
        key: 'gohm',
        repeat: 8,
        setXY: {
          x: 40,
          y: 70,
          stepX: 40,
          stepY: 70
        }
      })

      ohms.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9))

      })

      scoreText = this.add.text(0, 0, 'score: 0', {
        fontSize: '16px',
        fill: '#000'
      });

      this.physics.add.overlap(player, ohms, collectOhms, null, this);

      function collectOhms(player, ohms) {

        ohms.disableBody(true, true);
  
        score += 10;
        scoreText.setText('Score: ' + score);
  
        // if (ohms.countActive(true) === 0) {
  
        //   ohms.children.iterate(function (child) {
        //     child.enableBody(true, child.x, 0, true, true);
        //   });
  
        //   gameOver = true;
  
        // }
      }
    }

    function update() {

      timeText.setText('Time: ' + timedEvent.getElapsedSeconds().toString().substr(0, 3));

    }

    

    var gameOverText

    function onEvent () {

      gameOver = true
      gameOverText = this.add.text(30, 270, 'GOOD JOB!', {
        fontSize: '64px',
        fill: '#000'
      });

    }

  }


  shouldComponentUpdate() {
    return false;
  }

  render() {
    return ( <
      div id = "phaser-game" / >
    )
  }
}