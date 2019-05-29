export class Entity {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
    this.assetName = ''
  }

  getAssetName () {
    return this.assetName
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
  }

  getPosition () {
    return {
      x: this.x,
      y: this.y
    }
  }

  draw (canvas, assetManager) {
    const asset = assetManager.getAsset(this.assetName)
    const drawX = this.x - asset.width / 2
    const drawY = this.y - asset.height / 2

    canvas.drawImage(asset, drawX, drawY, asset.width, asset.height)
  }
}
