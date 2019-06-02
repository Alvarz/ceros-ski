
/*
 * get a random int
 * @return {number} min
 * @return {number} max
 * @return {number}
 * */
export function randomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/*
 * round a number to two decimals
 * @return {number} min
 * @return {number}
 * */
export function roundToTwo (num) {
  return +(Math.round(num + 'e+2') + 'e-2')
}

/*
 * compute the intersecton of two rect
 * @return {object} rect1
 * @return {object} rect2
 * @return {boolean}
 * */
export function intersectTwoRects (rect1, rect2) {
  return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top)
}

/*
 * @class Rect
 * */
export class Rect {
  /*
   * constructor
   * */
  constructor (left = 0, top = 0, right = 0, bottom = 0) {
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
  }
}

/*
 * @class Vector2D
 * */
export class Vector2D {
  /*
   * constructor
   * */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /*
   * set the x and y coordinates of the vector
   * @param {number} x
   * @param {number} y
   * @return {void}
   * */
  set (x, y) {
    this.x = x
    this.y = y
  }

  /*
   * get the x and y coordinates of the vector
   * @return {object}
   * */
  get () {
    return {
      x: this.x,
      y: this.y
    }
  }

  /*
   * compute the direction from local vector to given vector
   * @oaram {object} otherVector2D
   * @return {object}
   * */
  direction (otherVector2D) {
    if (!(otherVector2D instanceof Vector2D)) {
      throw 'is not a 2d vector'
    }

    const a = this.x - otherVector2D.x
    const b = this.y - otherVector2D.y

    return new Vector2D(a, b)
  }

  /*
   * compute the distance from local vector to given vector
   * @oaram {object} otherVector2D
   * @return {number}
   * */
  distance (otherVector2D) {
    if (!(otherVector2D instanceof Vector2D)) {
      throw 'is not a 2d vector'
    }

    const a = this.x - otherVector2D.x
    const b = this.y - otherVector2D.y

    return roundToTwo(Math.sqrt(a * a + b * b))
  }
}
