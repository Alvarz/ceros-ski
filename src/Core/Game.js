import * as Constants from '../Constants'
import { AssetManager } from './AssetManager'
import { Canvas } from './Canvas'
import { Skier } from '../Entities/Skier'
import GameManager from './GameManager'
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager'
import { Rect, Vector2D } from './Utils'

/*
 * @class Game
 * */
export class Game {
  /*
   * constructor
   * */
  constructor () {
    this.origin = new Vector2D(0, 0)
    this.isGameOver = false
    this.isGamePause = false
    this.catched = false
    this.gameWindow = null
    this.assetManager = new AssetManager()
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT)
    this.skier = new Skier(this.origin)
    this.obstacleManager = new ObstacleManager()
    this.gameManager = new GameManager(this.skier, this.origin, this.canvas, this.assetManager, this.obstacleManager)

    this.baseLocation = 50
    document.addEventListener('Catched', this.Catched.bind(this))
    document.addEventListener('GameOver', this.GameOver.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  /*
   * called at game start
   * @return {void}
   * */
  init () {
    this.heart = this.assetManager.getAsset('HEART')
    this.arrows = this.assetManager.getAsset('ARROWS')
    this.spacebar = this.assetManager.getAsset('SPACEBAR')
    this.obstacleManager.placeInitialObstacles()
  }

  /*
   * load all the assets
   * @async
   * @return {void}
   * */
  async load () {
    await this.assetManager.loadAssets(Constants.ASSETS)
  }

  /*
   * bootstrap the game
   * @return {void}
   * */
  run () {
    this.canvas.clearCanvas()

    this.updateGameWindow()
    this.drawGameWindow()

    window.requestAnimationFrame(this.run.bind(this))
  }

  /*
   * used to draw the Ui
   * @return {void}
   * */
  drawUI () {
    this.drawDistance()
    this.drawHeartLifes()
    this.drawControls()
  }

  /*
   * restart the current game
   * @return {void}
   * */
  restart () {
    window.location.reload()
  }

  /*
   * pause and resume the game
   * @return {void}
   * */
  pauseOrResume () {
    this.isGamePause = !this.isGamePause
  }

  /*
   * method used to handle whenever the game over or is paused
   * @return {void}
   * */
  handleGameOverOrPause () {
    if (this.isGamePause) {
      this.canvas.drawText('Pause', Constants.GAME_WIDTH * 0.48, Constants.GAME_HEIGHT * 0.45)
    }

    if (this.isGameOver) {
      const distance = this.gameManager.distanceFromOriginToPlayerPosition()

      const text = this.catched ? `You've been catched, your distance was: ${distance} mts` : `Well done, your distance was: ${distance} mts`
      this.canvas.drawText(text, Constants.GAME_WIDTH * 0.35, Constants.GAME_HEIGHT * 0.40)
      this.canvas.drawText('click enter to try again', Constants.GAME_WIDTH * 0.40, Constants.GAME_HEIGHT * 0.45)
    }
  }

  /*
   * used to draw the life's hearts in the UI
   * @return {void}
   * */
  drawHeartLifes () {
    for (let i = 1; i <= this.skier.life; i++) {
      this.canvas.drawImageUI(this.heart, Constants.UI_LOCATION.BASE_HEART * i, 30, Constants.UI_LOCATION.HEART_WIDTH, Constants.UI_LOCATION.HEART_HEIGHT)
    }
  }

  /*
   * used to draw the distance traveled by the player in the UI
   * @return {void}
   * */
  drawDistance () {
    const distance = this.gameManager.distanceFromOriginToPlayerPosition()
    this.canvas.drawText(`distance: ${distance} mts`, Constants.GAME_WIDTH - 350, 50, Constants.COLORS.BLACK)
  }

  /*
   * used to draw the controls in the UI
   * @return {void}
   * */
  drawControls () {
    this.canvas.drawImageUI(this.arrows, Constants.GAME_WIDTH * 0.05, Constants.GAME_HEIGHT * 0.75, this.arrows.width * 0.3, this.arrows.height * 0.3)
    this.canvas.drawText('movement', Constants.GAME_WIDTH * 0.12, Constants.GAME_HEIGHT * 0.80, Constants.COLORS.BLACK)
    this.canvas.drawImageUI(this.spacebar, Constants.GAME_WIDTH * 0.06, Constants.GAME_HEIGHT * 0.87, this.spacebar.width * 0.3, this.spacebar.height * 0.3)
    this.canvas.drawText('pause', Constants.GAME_WIDTH * 0.12, Constants.GAME_HEIGHT * 0.90, Constants.COLORS.BLACK)
  }

  /*
   * main game Update
   * @return {void}
   * */
  updateGameWindow () {
    this.drawUI()
    this.gameManager.update()
    if (this.isGameOver || this.isGamePause) {
      this.handleGameOverOrPause()
      return
    }
    this.skier.move()

    const previousGameWindow = this.gameWindow
    this.calculateGameWindow()

    this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow)

    this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)
  }

  /*
   * Game over event
   * @return {void}
   * */
  GameOver (event) {
    this.isGameOver = true
  }

  /*
   * used to draw the elements on game window
   * @return {void}
   * */
  drawGameWindow () {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top)

    if (!this.catched) {
      this.skier.draw(this.canvas, this.assetManager)
    }
    this.obstacleManager.drawObstacles(this.canvas, this.assetManager)
  }

  /*
   * used to compute size of the game window
   * @return {void}
   * */
  calculateGameWindow () {
    const skierPosition = this.skier.getPosition()
    const left = skierPosition.x - (Constants.GAME_WIDTH / 2)
    const top = skierPosition.y - (Constants.GAME_HEIGHT / 2)

    this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT)
  }

  /*
   * key down event handler
   * @param {object} event
   * @return {void}
   * */
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

  /*
   * set state as catched
   * @return {void}
   * */
  Catched () {
    this.catched = true
  }
}
