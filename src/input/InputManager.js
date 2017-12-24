import { Vector2D } from '../maths'

export default class InputManager {
  constructor(canvas){
    this.canvas = canvas

    this._keys = new Array(259)
    this.mousePosition = new Vector2D(0, 0)

    for (let i = 0; i < 259; ) {
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
    }

    this.canvas.addEventListener("keydown", e => this.keySet(e.keyCode, true))
    this.canvas.addEventListener("keyup", e => this.keySet(e.keyCode, false))
    this.canvas.addEventListener("mousedown", e => this.keySet(e.button + 256, true))
    this.canvas.addEventListener("mouseup", e => this.keySet(e.button + 256, false))
    this.canvas.addEventListener("mousemove", e => this.mouseMove(e.pageX, e.pageY))
  }
  update(){
    for (let i = 0; i < 259; ) {
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
    }
  }
  keySet(keycode, value){
    this._keys[keycode][1] = value
  }
  mouseMove(x, y){
    this.mousePosition.setPosition(Math.round((x - this.canvas.offsetLeft) * (this.canvas.width/this.canvas.offsetWidth)), Math.round((y - this.canvas.offsetTop) * (this.canvas.height/this.canvas.offsetHeight)))
  }
  isKeyJustPressed(keycode){
    return (!this._keys[keycode][0] && this._keys[keycode][1])
  }
  isKeyDown(keycode){
    return (this._keys[keycode][0] && this._keys[keycode][1])
  }
} 