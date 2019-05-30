import { Canvas } from './Canvas'

export default class GameManager {
  constructor (skier, origin) {
    this.origin = origin
    this.skier = skier
    this.gameOverEvent = new Event('GameOver')
    document.addEventListener('PlayerWasHit', this.playerWasHit.bind(this))
    document.addEventListener('IsPlayerDead', this.isPlayerisAlive.bind(this))
  }

  update () {
    // called on per frame
    this.distanceFromOriginToPlayerPosition(this.origin)
  }

  isPlayerisAlive () {
    console.log('player die show some fancy UI')
    document.dispatchEvent(this.gameOverEvent)
  }

  playerWasHit () {
    console.log('PlayerWasHit, play some sound')
  }

  distanceFromOriginToPlayerPosition (origin) {
    const distance = this.skier.position.distance(origin)

    console.log('distance from start: ', distance)
  }
}
