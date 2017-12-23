import { Loader } from '../assetLoader'
import GearStack from './GearStack'

export default class Gear{
  constructor(gear = {}){
    const {load, init, update, render, gears} = {load:()=>({}), init:() => {}, update:() => {}, render:() => {}, gears:[], ...gear}

    this.init = init
    this.gearStack = new GearStack(this, gears)
    this.pause = false
    this.active = true
    this.update = update
    this.render = render
    this.load = load
  }

  $load(){
    Loader.$addLoadContent(this, this.load())
    this.gearStack.load()
  }

  $update(...args){
    if(!this.pause && this.active)
      this.update(...args)
  }

  $render(...args){
    if(this.active)
      this.render(...args)
  }
}