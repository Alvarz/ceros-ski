import * as Constants from '../Constants'
import { AssetManager } from './AssetManager'
import { Canvas } from './Canvas'
import { Skier } from '../Entities/Skier'
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager'
import { Rect } from './Utils'

export class Game {
  constructor () {
    this.isGameOver = false
    this.gameWindow = null
    this.assetManager = new AssetManager()
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
    this.skier = new Skier(0, 0)
    this.obstacleManager = new ObstacleManager()

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  restart () {

        console.log('restart')
    this.skier.start()
    this.isGameOver = false
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

  /*
   * main game Update
   * @return {void}
   * */
  updateGameWindow () {
    if (this.isGameOver) {
      return
    }
    this.skier.move()

    const previousGameWindow = this.gameWindow
    this.calculateGameWindow()

    this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow)

    this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)

    this.validatePlayerLife()
  }

  validatePlayerLife () {
    let currentLife = this.skier.life
    if (currentLife < 1) {
      currentLife = 0
      this.gameOver()
    }
    console.log(currentLife, 'life')
  }

  gameOver () {
    if (this.isGameOver) {
      return
    }
    this.isGameOver = true
    console.log('game over')
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
    }
  }
}
