export const GAME_WIDTH = window.innerWidth
export const GAME_HEIGHT = window.innerHeight
export const DELTA_TIME = 0.1

export const SKIER_CRASH = 'skierCrash'
export const SKIER_LEFT = 'skierLeft'
export const SKIER_LEFTDOWN = 'skierLeftDown'
export const SKIER_DOWN = 'skierDown'
export const SKIER_RIGHTDOWN = 'skierRightDown'
export const SKIER_RIGHT = 'skierRight'
export const TREE = 'tree'
export const TREE_CLUSTER = 'treeCluster'
export const ROCK1 = 'rock1'
export const ROCK2 = 'rock2'

export const YETY_DEFAULT = 'yetyDefault'
export const YETY_RUN_LEFT = 'yetyRunLeft'
export const YETY_RUN_LEFT_TWO = 'yetyRunLeftTwo'
export const YETY_RUN_RIGHT = 'yetyRunRight'
export const YETY_RUN_RIGHT_TWO = 'yetyRunTwo'
export const YETY_LIFT = 'yetyLift'
export const YETY_MOUTH_OPEN = 'yetyMouthOpen'
export const YETY_EAT_1 = 'yetyEat1'
export const YETY_EAT_2 = 'yetyEat2'
export const YETY_EAT_3 = 'yetyEat3'
export const YETY_EAT_4 = 'yetyEat4'

export const YETY = {
  SPEED: 10

}

export const SKIER_STARTING_SPEED = 10
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142

export const DEFAULT_LIFE = 3

export const ASSETS = {
  [SKIER_CRASH]: 'img/skier_crash.png',
  [SKIER_LEFT]: 'img/skier_left.png',
  [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
  [SKIER_DOWN]: 'img/skier_down.png',
  [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
  [SKIER_RIGHT]: 'img/skier_right.png',
  [TREE]: 'img/tree_1.png',
  [TREE_CLUSTER]: 'img/tree_cluster.png',
  [ROCK1]: 'img/rock_1.png',
  [ROCK2]: 'img/rock_2.png',
  HEART: 'img/heart.png',
  ARROWS: 'img/movement.png',
  SPACEBAR: 'img/spacebar.png',
  [YETY_DEFAULT]: 'img/rhino_default.png',
  [YETY_RUN_LEFT]: 'img/rhino_run_left.png',
  [YETY_RUN_LEFT_TWO]: 'img/rhino_run_left_2.png',
  [YETY_LIFT]: 'img/rhino_lift.png',
  [YETY_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
  [YETY_EAT_1]: 'img/rhino_lift_eat_1.png',
  [YETY_EAT_2]: 'img/rhino_lift_eat_2.png',
  [YETY_EAT_3]: 'img/rhino_lift_eat_3.png',
  [YETY_EAT_4]: 'img/rhino_lift_eat_4.png'

}

export const UI_LOCATION = {
  BASE_HEART: 50,
  HEART_WIDTH: 30,
  HEART_HEIGHT: 30

}

export const COLORS = {

  BLACK: 'black',
  WHITE: 'white',
  ORANGE: 'orange'

}

export const YETI_STATE_MACHINE = {
  DEFAULT: 0,
  MOVE_LEFT: 1,
  EAT: 2,
  LIFT: 3,
  LIFT_MOUTH: 4,
  EAT_1: 5,
  EAT_2: 6,
  EAT_3: 7,
  EAT_4: 8
}

export const SKIER_DIRECTIONS = {
  CRASH: 0,
  LEFT: 1,
  LEFT_DOWN: 2,
  DOWN: 3,
  RIGHT_DOWN: 4,
  RIGHT: 5
}

export const YETI_DIRECTION_ASSET = {
  [YETI_STATE_MACHINE.DEFAULT]: YETY_DEFAULT,
  [YETI_STATE_MACHINE.MOVE_LEFT]: YETY_RUN_LEFT,
  [YETI_STATE_MACHINE.MOVE_LEFT_2]: YETY_RUN_LEFT_TWO,
  [YETI_STATE_MACHINE.LIFT]: YETY_LIFT,
  [YETI_STATE_MACHINE.LIFT_MOUTH]: YETY_MOUTH_OPEN,
  [YETI_STATE_MACHINE.EAT_1]: YETY_EAT_1,
  [YETI_STATE_MACHINE.EAT_2]: YETY_EAT_2,
  [YETI_STATE_MACHINE.EAT_3]: YETY_EAT_3,
  [YETI_STATE_MACHINE.EAT_4]: YETY_EAT_4
}

export const SKIER_DIRECTION_ASSET = {
  [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
  [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
  [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
  [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
  [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
  [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT
}

export const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  SPACEBAR: 32
}

export const UI_TEXT = {
  PAUSE: 'Pause',
  GAME_OVER: 'Game Over'
}
