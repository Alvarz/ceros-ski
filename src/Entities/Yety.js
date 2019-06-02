import * as Constants from '../Constants'
import { Entity } from './Entity'
import { intersectTwoRects, Rect } from '../Core/Utils'

export class Yety extends Entity {
  constructor (vector2Dposition, skier) {
    super(vector2Dposition.x, vector2Dposition.y)
    this.startPosition = vector2Dposition
    this.skier = skier
    this.anmationTime = 1.0
    this.currentTime = 0
    this.gameOverEvent = new Event('GameOver')
    this.catchedEvent = new Event('Catched')
    this.catched = false
  }

  start () {
    this.speedMultplier = 1
    this.assetName = Constants.YETY_RUN_LEFT

    this.isLeft = false
    this.stateMachine = Constants.YETI_STATE_MACHINE.MOVE_LEFT
    this.speed = Constants.SKIER_STARTING_SPEED

    const x = Constants.GAME_WIDTH * 0.5
    const y = this.skier.position.y

    this.setPosition(x, y)
  }

  setDirection (direction) {
    this.stateMachine = direction
    this.updateAsset()
  }

  updateAsset () {
    this.assetName = Constants.YETI_DIRECTION_ASSET[this.stateMachine]
  }

  move () {
    if (this.catched) {
      this.eatAnimation()
    } else {
      this.moveAnimate()
      this.chasePlayer()
    }

    this.currentTime -= Constants.DELTA_TIME
  }

  moveAnimate () {
    const self = this
    if (this.currentTime <= 0) {
      this.currentTime = this.anmationTime
      if (this.stateMachine === Constants.YETI_STATE_MACHINE.MOVE_LEFT) {
        if (self.assetName === Constants.YETY_RUN_LEFT_TWO) {
          self.assetName = Constants.YETY_RUN_LEFT
        } else {
          self.assetName = Constants.YETY_RUN_LEFT_TWO
        }
      }
    }
  }

  eatAnimation () {
    const self = this
    if (this.currentTime <= 0) {
      this.currentTime = this.anmationTime

      switch (this.stateMachine) {
        case Constants.YETI_STATE_MACHINE.LIFT:
          this.setDirection(Constants.YETI_STATE_MACHINE.LIFT_MOUTH)
          break
        case Constants.YETI_STATE_MACHINE.LIFT_MOUTH:
          this.setDirection(Constants.YETI_STATE_MACHINE.EAT_1)
          break
        case Constants.YETI_STATE_MACHINE.EAT_1:
          this.setDirection(Constants.YETI_STATE_MACHINE.EAT_2)
          break
        case Constants.YETI_STATE_MACHINE.EAT_2:
          this.setDirection(Constants.YETI_STATE_MACHINE.EAT_3)
          break
        case Constants.YETI_STATE_MACHINE.EAT_3:
          this.setDirection(Constants.YETI_STATE_MACHINE.EAT_4)
          break
        default:
          break
      }
    }
  }

  chasePlayer () {
    if (this.skier.position.y < this.position.y) {
      this.position.y -= (this.speed * 1)
    } else if (this.skier.position.y > this.position.y) {
      this.position.y += (this.speed * 1)
    }

    if (this.skier.position.x < this.position.x) {
      this.position.x -= (this.speed * 1)
    } else if (this.skier.position.x > this.position.x) {
      this.position.x += (this.speed * 1)
    }
  }

  eatSkier () {
    this.catched = true
    this.setDirection(Constants.YETI_STATE_MACHINE.LIFT)
    document.dispatchEvent(this.gameOverEvent)
    document.dispatchEvent(this.catchedEvent)
  }

  checkIfSkierHitObstacle (obstacleManager, assetManager) {
    if (this.catched) {
      return
    }
    const asset = assetManager.getAsset(this.assetName)
    const yetiBounds = new Rect(
      this.position.x - asset.width / 2,
      this.position.y - asset.height / 2,
      this.position.x + asset.width / 2,
      this.position.y - asset.height / 4
    )

    // const asset = assetManager.getAsset()
    const obstacleAsset = assetManager.getAsset(this.skier.assetName)
    const obstaclePosition = this.skier.getPosition()
    const obstacleBounds = new Rect(
      obstaclePosition.x - obstacleAsset.width / 2,
      obstaclePosition.y - obstacleAsset.height / 2,
      obstaclePosition.x + obstacleAsset.width / 2,
      obstaclePosition.y
    )

    const collision = intersectTwoRects(yetiBounds, obstacleBounds)

    if (collision) {
      this.eatSkier()
      // this.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
    }
  };
}
