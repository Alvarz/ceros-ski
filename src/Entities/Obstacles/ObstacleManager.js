import * as Constants from '../../Constants'
import { randomInt } from '../../Core/Utils'
import { Obstacle } from './Obstacle'

const DISTANCE_BETWEEN_OBSTACLES = 50
const STARTING_OBSTACLE_GAP = 100
const STARTING_OBSTACLE_REDUCER = 300
const NEW_OBSTACLE_CHANCE = 8

/*
 * @class ObstacleManager
 * */
export class ObstacleManager {
  /*
   * constructor
   * */
  constructor () {
    this.obstacles = []
  }

  /*
   * return all the obstacles
   * @return {Array}
   * */
  getObstacles () {
    return this.obstacles
  }

  /*
   * draw the obstacles on the game
   * @param {object} canvas
   * @return {oject} assetManager
   * @return {void}
   * */
  drawObstacles (canvas, assetManager) {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(canvas, assetManager)
    })
  }

  /*
   * set the intial onstacles
   * @return {void}
   * */
  placeInitialObstacles () {
    const numberObstacles = Math.ceil((Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) * (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER))

    const minX = -Constants.GAME_WIDTH / 2
    const maxX = Constants.GAME_WIDTH / 2
    const minY = STARTING_OBSTACLE_GAP
    const maxY = Constants.GAME_HEIGHT / 2

    for (let i = 0; i < numberObstacles; i++) {
      this.placeRandomObstacle(minX, maxX, minY, maxY)
    }

    this.obstacles.sort((obstacle1, obstacle2) => {
      return obstacle1.getPosition().y - obstacle2.getPosition().y
    })
  }

  /*
   * set a new obstacle
   * @param {object} gameWindow,
   * @param {object }previousGameWindow
   * @return {void}
   * */
  placeNewObstacle (gameWindow, previousGameWindow) {
    // this is used to prevent a bug, sometimes when load, previousGameWindow is
    // null cause the game to crash
    if (!previousGameWindow) {
      return
    }
    const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE)
    if (shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE) {
      return
    }

    if (gameWindow.left < previousGameWindow.left) {
      this.placeObstacleLeft(gameWindow)
    } else if (gameWindow.left > previousGameWindow.left) {
      this.placeObstacleRight(gameWindow)
    }

    if (gameWindow.top < previousGameWindow.top) {
      this.placeObstacleTop(gameWindow)
    } else if (gameWindow.top > previousGameWindow.top) {
      this.placeObstacleBottom(gameWindow)
    }
  };

  /*
   * set a new obstacle on left
   * @param {object }gameWindow,
   * @return {void}
   * */
  placeObstacleLeft (gameWindow) {
    this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom)
  }

  /*
   * set a new obstacle on right
   * @param {object }gameWindow,
   * @return {void}
   * */
  placeObstacleRight (gameWindow) {
    this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom)
  }

  /*
   * set a new obstacle on top
   * @param {object }gameWindow,
   * @return {void}
   * */
  placeObstacleTop (gameWindow) {
    this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top)
  }

  /*
   * set a new obstacle on bottom
   * @param {object }gameWindow,
   * @return {void}
   * */
  placeObstacleBottom (gameWindow) {
    this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom)
  }

  /*
   * set a new obstacle on bottom
   * @param {number} minX
   * @param {number} maxX
   * @param {number} minY
   * @param {number} maxY
   * @return {void}
   * */
  placeRandomObstacle (minX, maxX, minY, maxY) {
    const position = this.calculateOpenPosition(minX, maxX, minY, maxY)
    const newObstacle = new Obstacle(position.x, position.y)

    this.obstacles.push(newObstacle)
  }

  /*
   * compute an open position in the map
   * @param {number} minX
   * @param {number} maxX
   * @param {number} minY
   * @param {number} maxY
   * @return {object}
   * */
  calculateOpenPosition (minX, maxX, minY, maxY) {
    const x = randomInt(minX, maxX)
    const y = randomInt(minY, maxY)

    const foundCollision = this.obstacles.find((obstacle) => {
      return (
        x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
      )
    })

    if (foundCollision) {
      return this.calculateOpenPosition(minX, maxX, minY, maxY)
    } else {
      return {
        x: x,
        y: y
      }
    }
  }
}
