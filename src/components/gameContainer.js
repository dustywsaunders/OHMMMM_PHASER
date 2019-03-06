import Phaser from "phaser";
import * as React from "react";

export default class GameContainer extends React.Component {
  componentDidMount() {
    var config = {
      type: Phaser.AUTO,
      width: 400,
      height: 700,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

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

    var player;
    var ohms;
    // var cursors;
    var score = 0;
    var scoreText;


    function create() {
      this.add.image(200, 350, 'stage');
      // this.add.image(200, 350, 'pohm');
      // this.add.image(300, 525, 'oohm');
      // this.add.image(100, 175, 'gohm');
      player = this.physics.add.sprite(75, 625, 'player').setInteractive();

      this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
        player.y = pointer.y

      });

      ohms = this.physics.add.group({
        key: 'gohm',
        repeat: 7,
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

      this.physics.add.overlap(player, ohms, collectOhms, null, this);

      scoreText = this.add.text(0, 0, 'score: 0', {
        fontSize: '16px',
        fill: '#000'
      });
    }

    function collectOhms(player, ohms) {
      ohms.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);

      // if (ohms.countActive(true) === 0) {
      //   ohms.children.iterate(function (child) {

      //     child.enableBody(true, child.x, 0, true, true);

      //   });
      // }
    }

    function update() {

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