import Phaser from "phaser";
import * as React from "react";

export default class GameContainer extends React.Component {
  componentDidMount() {
    var config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 2000,
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

    var player;
    var game = new Phaser.Game(config);
    var pointer;

    function preload() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create() {
      this.add.image(400, 300, 'sky');
      player = this.add.sprite(100, 450, 'dude').setInteractive();

      this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
        player.y = pointer.y

      });

    }

    function update() {

    }
  }


    shouldComponentUpdate() {
      return false;
    }

    render() {
      return (
        <div id="phaser-game" />
      )
    }
  }