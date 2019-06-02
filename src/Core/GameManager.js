import * as Constants from '../Constants'
import { Vector2D } from './Utils'
import { Yety } from '../Entities/Yety'

export default class GameManager {
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

  update () {
    // called on per frame
    this.showYety()
  }

  isPlayerisAlive () {
    console.log('player die show some fancy UI')
    document.dispatchEvent(this.gameOverEvent)
  }

  playerWasHit () {
    console.log('PlayerWasHit, play some sound')
  }

  distanceFromOriginToPlayerPosition () {
    const distance = this.skier.position.distance(this.origin)

    if (distance > this.distanceToShowYeti && !this.IsYetiActive && this.currentTime <= 0) {
      console.log('entro')
      this.currentTime = this.waitingSpotTime
      this.IsYetiActive = Math.random() >= 0.5
      console.log(this.IsYetiActive)
      if (this.IsYetiActive) {
        this.yety.start()
        console.log('spawned yeti')
      }
    }

    this.currentTime -= Constants.DELTA_TIME

    return distance
    // console.log('distance from start: ', distance)
  }

  showYety () {
    if (!this.IsYetiActive) {
      return
    }

    this.yety.draw(this.canvas, this.assetManager)
    this.yety.move()
    this.yety.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)
  }
}
