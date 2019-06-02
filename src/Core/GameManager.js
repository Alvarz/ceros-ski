
export default class GameManager {
  constructor (skier, origin) {
    this.origin = origin
    this.canvas =
    this.skier = skier
    this.gameOverEvent = new Event('GameOver')
    document.addEventListener('PlayerWasHit', this.playerWasHit.bind(this))
    document.addEventListener('IsPlayerDead', this.isPlayerisAlive.bind(this))
  }

  update () {
    // called on per frame
  }

  isPlayerisAlive () {
    console.log('player die show some fancy UI')
    document.dispatchEvent(this.gameOverEvent)
  }

  playerWasHit () {
    console.log('PlayerWasHit, play some sound')
  }

  distanceFromOriginToPlayerPosition () {
    return this.skier.position.distance(this.origin)
    // console.log('distance from start: ', distance)
  }
}
