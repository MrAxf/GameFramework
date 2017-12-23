export default class InputManager {
  constructor(){
    this._keys = new Array(256)
    for (let i = 0; i < 256; ) {
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]

      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]

      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
    }
  }
  update(){
    for (let i = 0; i < 256; ) {
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]

      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]
      this._keys[i][0] = this._keys[i++][1]

      this._keys[i][0] = this._keys[i++][1]
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
  isKeyJustPressed(keycode){
    return (!this._keys[keycode][0] && this._keys[keycode][1])
  }
  isKeyDown(keycode){
    return (this._keys[keycode][0] && this._keys[keycode][1])
  }
} 