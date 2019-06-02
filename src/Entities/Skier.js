import * as Constants from '../Constants'
import { Entity } from './Entity'
import { intersectTwoRects, Rect } from '../Core/Utils'

/*
 * @class {Skier}
 * */
export class Skier extends Entity {
  /*
   * constructor
   * */
  constructor (vector2Dposition) {
    super(vector2Dposition.x, vector2Dposition.y)
    this.startPosition = vector2Dposition

    this.isDead = false
    this.isPlayerDeadEvent = new Event('IsPlayerDead')
    this.playerWasHit = new Event('PlayerWasHit')
    this.start()
  }

  /*
   * called when the skier is spawned
   * @return {void}
   * */
  start () {
    this.isDead = false
    this.speedMultplier = 1
    this.life = Constants.DEFAULT_LIFE
    this.assetName = Constants.SKIER_DOWN

    this.direction = Constants.SKIER_DIRECTIONS.DOWN
    this.speed = Constants.SKIER_STARTING_SPEED
    this.setPosition(this.startPosition.x, this.startPosition.y)
  }

  /*
   * used to change the player speed
   * @return {number} value
   * @return {void}
   * */
  changeSpeed (value) {
    if (value < 0.01) {
      value = 0.1
    }

    this.speedMultiplier = value
  }

  /*
   * take the player health
   * @return {void}
   * */
  takeLife () {
    --this.life
    if (this.life < 1 && !this.isDead) {
      this.life = 0
      this.die()
    }
    document.dispatchEvent(this.playerWasHit)
  }

  /*
   * event dispatcher when the player die
   * @return {void}
   * */
  die () {
    this.isDead = true
    document.dispatchEvent(this.isPlayerDeadEvent)
  }

  /*
   * set the new direction of the player
   * @param {number} direction
   * @return {void}
   * */
  setDirection (direction) {
    this.direction = direction
    this.updateAsset()
  }

  /*
   * update the asset name
   * @return {void}
   * */
  updateAsset () {
    this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction]
  }

  /*
   * used to move the skier
   * @return {void}
   * */
  move () {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
        this.moveSkierLeftDown()
        break
      case Constants.SKIER_DIRECTIONS.DOWN:
        this.moveSkierDown()
        break
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown()
        break
    }
  }

  /*
   * used to move the skier to the left
   * @return {void}
   * */
  moveSkierLeft () {
    this.position.x -= Constants.SKIER_STARTING_SPEED
  }

  /*
   * used to move the skier to the left down
   * @return {void}
   * */
  moveSkierLeftDown () {
    this.position.x -= (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.position.y += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  /*
   * used to move the skier to down
   * @return {void}
   * */
  moveSkierDown () {
    this.position.y += (this.speed * this.speedMultplier)
  }

  /*
   * used to move the skier to the right down
   * @return {void}
   * */
  moveSkierRightDown () {
    this.position.x += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.position.y += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  /*
   * used to move the skier to the right
   * @return {void}
   * */
  moveSkierRight () {
    this.position.x += Constants.SKIER_STARTING_SPEED
  }

  /*
   * used to move the skier up
   * @return {void}
   * */
  moveSkierUp () {
    this.position.y -= Constants.SKIER_STARTING_SPEED
  }

  /*
   * used to turn left
   * @return {void}
   * */
  turnLeft () {
    if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
      this.moveSkierLeft()
      // challenge error fixed: the direction was below to 0
    } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
      this.setDirection(Constants.SKIER_DIRECTIONS.LEFT)
    } else {
      this.setDirection(this.direction - 1)
    }
  }

  /*
   * used to turn right
   * @return {void}
   * */
  turnRight () {
    if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierRight()
    } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
      this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT)
    } else {
      this.setDirection(this.direction + 1)
    }
  }

  /*
   * used to turn UP
   * @return {void}
   * */
  turnUp () {
    if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierUp()
    }
  }

  /*
   * used to turn down
   * @return {void}
   * */
  turnDown () {
    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN)
  }

  /*
   * used to know if the player is already crashed or was stoped
   * @return {boolean}
   * */
  isAlreadyCrashOrStop () {
    return this.direction === Constants.SKIER_DIRECTIONS.CRASH || this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT
  }

  /*
   * used to compute whenever the player hit some obstacle
   * @param {object} obstacleManager
   * @param {object} assetManager
   * @return {boolean}
   * */
  checkIfSkierHitObstacle (obstacleManager, assetManager) {
    if (this.isAlreadyCrashOrStop()) {
      // already crashed, no need to validate this  anymore
      return
    }
    const asset = assetManager.getAsset(this.assetName)
    const skierBounds = new Rect(
      this.position.x - asset.width / 2,
      this.position.y - asset.height / 2,
      this.position.x + asset.width / 2,
      this.position.y - asset.height / 4
    )

    const collision = obstacleManager.getObstacles().find((obstacle) => {
      const obstacleAsset = assetManager.getAsset(obstacle.getAssetName())
      const obstaclePosition = obstacle.getPosition()
      const obstacleBounds = new Rect(
        obstaclePosition.x - obstacleAsset.width / 2,
        obstaclePosition.y - obstacleAsset.height / 2,
        obstaclePosition.x + obstacleAsset.width / 2,
        obstaclePosition.y
      )

      return intersectTwoRects(skierBounds, obstacleBounds)
    })

    if (collision) {
      this.takeLife()
      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
    }
  };
}
