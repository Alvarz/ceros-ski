import { Vector2D } from '../Core/Utils'

export class Entity {
  constructor (x = 0, y = 0) {
    this.position = new Vector2D(x, y)
    this.assetName = ''
  }

  getAssetName () {
    return this.assetName
  }

  setPosition (x, y) {
    this.position.x = x
    this.position.y = y
  }

  getPosition () {
    return this.position.get()
  }

  draw (canvas, assetManager) {
    const asset = assetManager.getAsset(this.assetName)
    const drawX = this.position.x - asset.width / 2
    const drawY = this.position.y - asset.height / 2

    canvas.drawImage(asset, drawX, drawY, asset.width, asset.height)
  }
}
