
/*
 * @class Cnvas
 * */
export class Canvas {
  /*
   * @constructor
   * */
  constructor (width, height) {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.drawOffset = {
      x: 0,
      y: 0
    }
    this.ctx = null

    this.width = width
    this.height = height

    this.createCanvas()
  }

  /*
   * create a new canvas
   * @return {void}
   * */
  createCanvas () {
    const canvas = document.createElement('canvas')
    canvas.id = 'skiCanvas'
    canvas.width = this.width * window.devicePixelRatio
    canvas.height = this.height * window.devicePixelRatio
    canvas.style.width = this.width + 'px'
    canvas.style.height = this.height + 'px'

    this.ctx = canvas.getContext('2d')
    this.ctx.font = '30px VT323'
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    document.body.appendChild(canvas)
  }

  /*
   * clear the current canvas
   * @return {void}
   * */
  clearCanvas () {
    this.ctx.clearRect(this.x, this.y, this.width, this.height)
  }

  /*
   * set the draw offset
   * @return {number} x
   * @return {number} y
   * @return {void}
   * */
  setDrawOffset (x, y) {
    this.drawOffset.x = x
    this.drawOffset.y = y
  }

  /*
   * draw an image to be used as UI element
   * @return {object} image
   * @return {number} x
   * @return {number} y
   * @return {width} x
   * @return {height} y
   * @return {void}
   * */
  drawImageUI (image, x, y, width, height) {
    this.ctx.drawImage(image, x, y, width, height)
  }

  /*
   * draw an image as game element
   * @return {object} image
   * @return {number} x
   * @return {number} y
   * @return {width} x
   * @return {height} y
   * @return {void}
   * */
  drawImage (image, x, y, width, height) {
    x -= this.drawOffset.x
    y -= this.drawOffset.y

    this.ctx.drawImage(image, x, y, width, height)
  }

  /*
   * write a text on given coordinates to be used on UI
   * @return {string} text
   * @return {number} y
   * @return {width} x
   * @return {string} color
   * @return {void}
   * */
  drawText (text, x, y, color) {
    this.ctx.fillStyle = color
    this.ctx.fillText(text, x, y)
  }
}
