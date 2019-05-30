export function randomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function roundToTwo (num) {
  return +(Math.round(num + 'e+2') + 'e-2')
}

export function intersectTwoRects (rect1, rect2) {
  return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top)
}

export class Rect {
  constructor (left = 0, top = 0, right = 0, bottom = 0) {
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
  }
}

export class Vector2D {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  set (x, y) {
    this.x = x
    this.y = y
  }

  get () {
    return {
      x: this.x,
      y: this.y
    }
  }

  distance (otherVector2D) {
    if (!(otherVector2D instanceof Vector2D)) {
      throw 'is not a 2d vector'
    }

    const a = this.x - otherVector2D.x
    const b = this.y - otherVector2D.y

    return roundToTwo(Math.sqrt(a * a + b * b))
  }
}
