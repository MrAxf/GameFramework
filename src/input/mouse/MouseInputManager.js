import { Vector2D } from '../../maths'
import BUTTONS from './MouseButtons'

const MouseInputManager = {
  BUTTONS,
  init(){
    this._mouseButtons = [
      [false, false],
      [false, false],
      [false, false]
    ]
    this.mousePosition = new Vector2D(0, 0)

    this.canvas.addEventListener("mousedown", e => this._clickSet(e.button, true))
    this.canvas.addEventListener("mouseup", e => this._clickSet(e.button, false))
    this.canvas.addEventListener("mousemove", e => this._mouseMove(e.pageX, e.pageY))
    //TODO
    //this.canvas.addEventListener("wheel", e => this.mouseMove(e.pageX, e.pageY))
  },
  update(){
    this._mouseButtons[0][0] = this._mouseButtons[0][1]
    this._mouseButtons[1][0] = this._mouseButtons[1][1]
    this._mouseButtons[2][0] = this._mouseButtons[2][1]
  },
  methods:{
    _mouseMove(x, y){
      this.mousePosition.setPosition(Math.round((x - this.canvas.offsetLeft) * (this.canvas.width/this.canvas.offsetWidth)), Math.round((y - this.canvas.offsetTop) * (this.canvas.height/this.canvas.offsetHeight)))
    },
    _clickSet(clickcode, value){
      this._mouseButtons[clickcode][1] = value
    },
    isJustClicked(clickcode){
      return (!this._mouseButtons[clickcode][0] && this._mouseButtons[clickcode][1])
    },
    isClicked(clickcode){
      return (this._mouseButtons[clickcode][0] && this._mouseButtons[clickcode][1])
    }
  }
}

export default MouseInputManager