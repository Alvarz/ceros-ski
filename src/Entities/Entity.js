import { Vector2D } from '../Core/Utils'

/*
 * @class Entity
 * */
export class Entity {
  /*
   * constructor
   * */
  constructor (x = 0, y = 0) {
    this.position = new Vector2D(x, y)
    this.assetName = ''
  }

  /*
   * get the current asset name
   * @return {string}
   * */
  getAssetName () {
    return this.assetName
  }

  /*
   * set the position of the entity
   * @param {number} x
   * @param {number}  y
   * @return {void}
   * */
  setPosition (x, y) {
    this.position.x = x
    this.position.y = y
  }

  /*
   * get the current position of the entity
   * @return {object}
   * */
  getPosition () {
    return this.position.get()
  }

  /*
   * draw the entity on the canvas
   * @param {object} canvas
   * @param {object} assetManager
   * @return {object}
   * */
  draw (canvas, assetManager) {
    const asset = assetManager.getAsset(this.assetName)
    const drawX = this.position.x - asset.width / 2
    const drawY = this.position.y - asset.height / 2

    canvas.drawImage(asset, drawX, drawY, asset.width, asset.height)
  }
}
