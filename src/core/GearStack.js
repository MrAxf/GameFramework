export default class GearStack{
  constructor(parent, stack = []){
    this.stack = new Array(stack.length);
    for (let i = 0; i < stack.length; i++) {
      this.stack[i] = stack[i].gear;
    }
    this.pause = false;
    this.active = true;
  }

  init(){
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].init();
    }
  }

  update(...args){
    if(!this.pause && this.active){
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].$update(...args);
      }
    }
  }

  render(...args){
    if(this.active){
      for (let i = 0; i < this.stack.length; i++) {
        this.stack[i].$render(...args);
      }
    }
  }

  load(game){
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].load(game);
    }
  }
}