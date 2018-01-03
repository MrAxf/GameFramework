import { Loader } from '../assetLoader'
import InputManager from '../input/InputManager'

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

/**
 * Default options for Game.
 */
const defaultOptions = {
  container_id: 'game-container',
  width: 960,
  height: 540,
}

/**
 * Main class of the frawerwork, define a Game.
 * 
 * @class
 */
class Game {

  /**
   * Create a game.
   * 
   * @param {object} options - Options that define a game.
   * @param {Gear} coreGear - Main Gear module of a game.
   */
  constructor(options = {}, coreGear){
    
    const { container_id, width, height } = {...defaultOptions, ...options}

    /**
     * TODO
     */
    this.width = width

    /**
     * TODO
     */
    this.height = height
    
    /**
     * Game container defined at DOM.
     * 
     * @member {object} 
     */
    this.container = document.getElementById(container_id)

    this.setCanvas(container_id)

    /**
     * Defines the canvas inside the game container
     * 
     * @member {object}
     */
    this.canvas = document.getElementById(`${container_id}-canvas`)
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.outline = "none"
    this.canvas.setAttribute("tabindex", "1")

    /**
     * Manage the inputs of the Game
     * 
     * @member {InputManager}
     */
    this.input = new InputManager(this.canvas)

    /**
     * Defines the context of the canvas.
     * 
     * @member {object}
     */
    this.context = this.canvas.getContext('2d')
    
    /**
     * Defines if the Game is in fullScreen mode.
     * 
     * @member {boolean}
     */
    this.fullScreenActive = false
    //game running
    this.running = false
    //Game loop data
    this.delta = 0
    this.then= 0
    //bind game to loop function
    this.loop = this.loop.bind(this)
    //CoreGear
    this.coreGear = coreGear
  }

  setCanvas(container_id){
    this.container.requestFullScreen = this.container.requestFullscreen || this.container.msRequestFullscreen || this.container.mozRequestFullScreen || this.container.webkitRequestFullscreen

    document.exitFullScreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen

    this.container.style.background = "#000000"
    this.container.style.position = "relative"
    this.container.style.display = "flex"
    this.container.style.alignItems = "center"
    this.container.style.justifyContent = "center"
    this.container.style.overflow = "hidden"
    this.container.style.width = "100%"
    this.container.style.height = "100%"

    this.container.innerHTML = `<canvas id="${container_id}-canvas"></canvas>`
  }

  fitCanvasToConatiner(){
    setTimeout(() => {
      const canvasProportions = this.canvas.clientWidth / this.canvas.clientHeight
      const containerProportions = this.container.clientWidth / this.container.clientHeight
  
      if(containerProportions > canvasProportions){
        this.canvas.style.width = "auto"
        this.canvas.style.height = "100%"
      } else {
        this.canvas.style.width = "100%"
        this.canvas.style.height = "auto"
      }
    }, 0)
  }

  resizeCanvas(renderer, width = 960, height = 540, force = false){
    if(!force && this.width == width && this.height == height) return
    this.width = width
    this.height = height

    this.canvas.width = width
    this.canvas.height = height
  }

  toggleFullScreen(activate = !this.fullScreenActive){
    this.fullScreenActive = activate

    if(activate) this.container.requestFullScreen()
    else document.exitFullScreen()

    setTimeout(this.fitCanvasToConatiner.bind(this), 300)
  }

  loop(){
    const now = Date.now()
    this.delta = now - this.then
    this.then = now
    
    if(this.running){
      this.input.update()
    	this.coreGear.$update()
    }
    
    this.coreGear.$render()
    requestAnimationFrame(this.loop)
  }

  start(){
    this.coreGear.$load()
    Loader.$load((() => {
      this.coreGear.init()
      this.running = true
      this.then = Date.now()
      requestAnimationFrame(this.loop)
    }).bind(this))
  }

  pause(){
    this.running = false
  }

  continue(){
    this.then = Date.now()
    this.running = true
  }

  addInputManagers(...args) {
    this.input.addManagers([...args])
  }

  get deltaTime() {
    return this.delta/1000
  }

}

export default Game