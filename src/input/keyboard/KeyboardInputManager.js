import KEYS from './KeyboardKeys'

const KeyboardInputManager = {
  KEYS,
  init(){
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

      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
      this._keys[i++] = [false, false]
    }

    this.canvas.addEventListener("keydown", e => this._keySet(e.keyCode, true))
    this.canvas.addEventListener("keyup", e => this._keySet(e.keyCode, false))
  },
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
  },
  methods: {
    _keySet(keycode, value){
      this._keys[keycode][1] = value
    },
    isKeyJustPressed(keycode){
      return (!this._keys[keycode][0] && this._keys[keycode][1])
    },
    isKeyDown(keycode){
      return (this._keys[keycode][0] && this._keys[keycode][1])
    }
  }
}

export default KeyboardInputManager