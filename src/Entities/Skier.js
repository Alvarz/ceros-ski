import * as Constants from '../Constants'
import { Entity } from './Entity'
import { intersectTwoRects, Rect } from '../Core/Utils'

export class Skier extends Entity {
  constructor (x, y) {
    super(x, y)
    this.start()
  }

  start () {
    this.life = Constants.DEFAULT_LIFE
    this.assetName = Constants.SKIER_DOWN

    this.direction = Constants.SKIER_DIRECTIONS.DOWN
    this.speed = Constants.SKIER_STARTING_SPEED
    this.setPosition(0, 0)
  }

  takeLife () {
    --this.life
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
    this.x -= Constants.SKIER_STARTING_SPEED
  }

  moveSkierLeftDown () {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  moveSkierDown () {
    this.y += this.speed
  }

  moveSkierRightDown () {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER
  }

  moveSkierRight () {
    this.x += Constants.SKIER_STARTING_SPEED
  }

  moveSkierUp () {
    this.y -= Constants.SKIER_STARTING_SPEED
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
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
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
