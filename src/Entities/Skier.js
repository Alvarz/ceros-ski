import * as Constants from '../Constants'
import { Entity } from './Entity'
import { intersectTwoRects, Rect } from '../Core/Utils'

export class Skier extends Entity {
  constructor (vector2Dposition) {
    super(vector2Dposition.x, vector2Dposition.y)
    this.startPosition = vector2Dposition

    this.isDead = false
    this.isPlayerDeadEvent = new Event('IsPlayerDead')
    this.playerWasHit = new Event('PlayerWasHit')
    this.start()
  }

  start () {
    this.isDead = false
    this.speedMultplier = 1
    this.life = Constants.DEFAULT_LIFE
    this.assetName = Constants.SKIER_DOWN

    this.direction = Constants.SKIER_DIRECTIONS.DOWN
    this.speed = Constants.SKIER_STARTING_SPEED
    this.setPosition(this.startPosition.x, this.startPosition.y)
  }

  changeSpeed (value) {
    if (value < 0.01) {
      value = 0.1
    }

    this.speedMultiplier = value
  }

  takeLife () {
    --this.life
    if (this.life < 1 && !this.isDead) {
      this.life = 0
      this.die()
    }
    document.dispatchEvent(this.playerWasHit)
  }

  die () {
    this.isDead = true
    document.dispatchEvent(this.isPlayerDeadEvent)
  }

  setDirection (direction) {
    this.direction = direction
    this.updateAsset()
  }

  updateAsset () {
    this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction]
  }

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

  moveSkierLeft () {
    this.position.x -= Constants.SKIER_STARTING_SPEED
  }

  moveSkierLeftDown () {
    this.position.x -= (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.position.y += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  moveSkierDown () {
    this.position.y += (this.speed * this.speedMultplier)
  }

  moveSkierRightDown () {
    this.position.x += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.position.y += (this.speed * this.speedMultplier) / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  moveSkierRight () {
    this.position.x += Constants.SKIER_STARTING_SPEED
  }

  moveSkierUp () {
    this.position.y -= Constants.SKIER_STARTING_SPEED
  }

  turnLeft () {
    if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
      this.moveSkierLeft()
    } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
      this.setDirection(Constants.SKIER_DIRECTIONS.LEFT)
    } else {
      this.setDirection(this.direction - 1)
    }
  }

  turnRight () {
    if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierRight()
    } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
      this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT)
    } else {
      this.setDirection(this.direction + 1)
    }
  }

  turnUp () {
    if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierUp()
    }
  }

  turnDown () {
    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN)
  }

  isAlreadyCrashOrStop () {
    return this.direction === Constants.SKIER_DIRECTIONS.CRASH || this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT
  }

  checkIfSkierHitObstacle (obstacleManager, assetManager) {
    if (this.isAlreadyCrashOrStop()) {
      // already crashed no need to more validate this
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
