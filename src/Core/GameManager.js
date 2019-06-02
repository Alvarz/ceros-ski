import * as Constants from '../Constants'
import { Vector2D } from './Utils'
import { Yety } from '../Entities/Yety'

/*
 * @class GameManager
 * */
export default class GameManager {
  /*
   * @class costructor
   * */
  constructor (skier, origin, canvas, assetManager, obstacleManager) {
    this.IsYetiActive = false
    // his.yetiStartPoint = new Vector2D(Constants.GAME_WIDTH * 0.75, Constants.GAME_HEIGHT * 0.2)
    this.yetiStartPoint = new Vector2D(skier.position.x * 0.5, skier.position.y * 0.5)
    this.yety = new Yety(this.yetiStartPoint, skier)
    this.origin = origin
    this.canvas = canvas
    this.obstacleManager = obstacleManager
    this.assetManager = assetManager
    this.skier = skier
    this.distanceToShowYeti = 2000
    this.waitingSpotTime = 50
    this.currentTime = this.waitingSpotTime
    this.gameOverEvent = new Event('GameOver')
    document.addEventListener('PlayerWasHit', this.playerWasHit.bind(this))
    document.addEventListener('IsPlayerDead', this.isPlayerisAlive.bind(this))
  }

  /*
   * called one per frame
   * @return {void}
   * */
  update () {
    // called on per frame
    this.showYety()
  }

  /*
   * event dispatcher if player die
   * @return {void}
   * */
  isPlayerisAlive () {
    document.dispatchEvent(this.gameOverEvent)
  }

  /*
   * called when player was hit
   * @return {void}
   * */
  playerWasHit () {
    // play some fancy sound
  }

  /*
   * get the distance traveled for the player from origin and spawn a yety under
   * certains conditions
   * @return {void}
   * */
  distanceFromOriginToPlayerPosition () {
    const distance = this.skier.position.distance(this.origin)

    if (distance > this.distanceToShowYeti && !this.IsYetiActive && this.currentTime <= 0) {
      this.currentTime = this.waitingSpotTime
      this.IsYetiActive = Math.random() >= 0.5
      if (this.IsYetiActive) {
        this.yety.start()
      }
    }

    this.currentTime -= Constants.DELTA_TIME

    return distance
  }

  /*
   * used to activate the yety graphics on the game
   * @return {void}
   * */
  showYety () {
    if (!this.IsYetiActive) {
      return
    }

    this.yety.draw(this.canvas, this.assetManager)
    this.yety.move()
    this.yety.checkIfSkierHitObstacle(this.assetManager)
  }
}
