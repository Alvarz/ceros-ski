export class Canvas {
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

  createCanvas () {
    const canvas = document.createElement('canvas')
    canvas.id = 'skiCanvas'
    canvas.width = this.width * window.devicePixelRatio
    canvas.height = this.height * window.devicePixelRatio
    canvas.style.width = this.width + 'px'
    canvas.style.height = this.height + 'px'

    this.ctx = canvas.getContext('2d')
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    document.body.appendChild(canvas)
  }

  clearCanvas () {
    this.ctx.clearRect(this.x, this.y, this.width, this.height)
  }

  setDrawOffset (x, y) {
    this.drawOffset.x = x
    this.drawOffset.y = y
  }

  drawImage (image, x, y, width, height) {
    x -= this.drawOffset.x
    y -= this.drawOffset.y

    this.ctx.drawImage(image, x, y, width, height)
  }
}
