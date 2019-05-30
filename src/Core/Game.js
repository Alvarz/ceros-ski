import * as Constants from '../Constants'
import { AssetManager } from './AssetManager'
import { Canvas } from './Canvas'
import { Skier } from '../Entities/Skier'
import GameManager from './GameManager'
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager'
import { Rect, Vector2D } from './Utils'

export class Game {
  constructor () {
    this.origin = new Vector2D(0, 0)
    this.isGameOver = false
    this.isGamePause = false
    this.gameWindow = null
    this.assetManager = new AssetManager()
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
    this.skier = new Skier(this.origin)
    this.obstacleManager = new ObstacleManager()
    this.gameManager = new GameManager(this.skier, this.origin)

    document.addEventListener('GameOver', this.GameOver.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  init () {
    this.obstacleManager.placeInitialObstacles()
  }

  async load () {
    await this.assetManager.loadAssets(Constants.ASSETS)
  }

  run () {
    this.canvas.clearCanvas()

    this.updateGameWindow()
    this.drawGameWindow()

    window.requestAnimationFrame(this.run.bind(this))
  }

  restart () {
    console.log('restart')
    this.skier.start()
    this.isGameOver = false
  }

  pauseOrResume () {
    console.log('pause or resume')
    this.isGamePause = !this.isGamePause
  }

  /*
   * main game Update
   * @return {void}
   * */
  updateGameWindow () {
    if (this.isGameOver || this.isGamePause) {
      return
    }
    this.skier.move()

    const previousGameWindow = this.gameWindow
    this.calculateGameWindow()

    this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow)

    this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)

    this.gameManager.update()
  }

  GameOver (event) {
    console.log('Game Over!')
    this.isGameOver = true
  }

  drawGameWindow () {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top)

    this.skier.draw(this.canvas, this.assetManager)
    this.obstacleManager.drawObstacles(this.canvas, this.assetManager)
  }

  calculateGameWindow () {
    const skierPosition = this.skier.getPosition()
    const left = skierPosition.x - (Constants.GAME_WIDTH / 2)
    const top = skierPosition.y - (Constants.GAME_HEIGHT / 2)

    this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT)
  }

  handleKeyDown (event) {
    if (this.isGameOver) {
      if (event.which === Constants.KEYS.ENTER) {
        this.restart()
      }
      console.log(event.which)
      return
    }
    switch (event.which) {
      case Constants.KEYS.LEFT:
        this.skier.turnLeft()
        event.preventDefault()
        break
      case Constants.KEYS.RIGHT:
        this.skier.turnRight()
        event.preventDefault()
        break
      case Constants.KEYS.UP:
        this.skier.turnUp()
        event.preventDefault()
        break
      case Constants.KEYS.DOWN:
        this.skier.turnDown()
        event.preventDefault()
        break
      case Constants.KEYS.SPACEBAR:
        this.pauseOrResume()
        event.preventDefault()
        break
    }
  }
}
