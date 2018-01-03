class InputManager {
  constructor(canvas){
    this.canvas = canvas
    this._updateFunctions = []
  }
  update(){
    for (let i = 0; i < this._updateFunctions.length; i++) {
      this._updateFunctions[i]()
    }
  }
  addManagers(managers = []){
    let  newUpdateFunctions = new Array(managers.length)
    
    for (let i = 0; i < managers.length; i++) {
      const methodList = Object.entries(managers[i].methods)
      for (let [key, value] of methodList){
        this[key] = value
      }
      (managers[i].init.bind(this))()
      newUpdateFunctions[i] = managers[i].update.bind(this);
    }

    this._updateFunctions = [...this._updateFunctions, ...newUpdateFunctions]
  }
}

export default InputManager