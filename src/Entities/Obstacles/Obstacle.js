import * as Constants from '../../Constants'
import { Entity } from '../Entity'
import { randomInt } from '../../Core/Utils'

/*
 * assetTypes to be used as obstacles
 * */
const assetTypes = [
  Constants.TREE,
  Constants.TREE_CLUSTER,
  Constants.ROCK1,
  Constants.ROCK2
]

/*
 * @class Obstacle
 * */
export class Obstacle extends Entity {
/*
 * constructor
 * */
  constructor (x, y) {
    super(x, y)

    const assetIdx = randomInt(0, assetTypes.length - 1)
    this.assetName = assetTypes[assetIdx]
  }
}
