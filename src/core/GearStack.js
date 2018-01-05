export default class GearStack{
  constructor(parent, stack = {}){
    const gears = Object.entries(stack)
    this.stack = new Array(gears.length)
    let i = 0
    for (let [key, value] of gears){
      parent[key] = value
      this.stack[i] = value
      i++
    }
    this.pause = false
    this.active = true
  }

  init(){
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].init()
    }
  }

  update(...args){
    if(!this.pause && this.active){
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].$update(...args)
      }
    }
  }

  render(...args){
    if(this.active){
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].$render(...args)
      }
    }
  }

  load(){
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].$load()
    }
  }
}