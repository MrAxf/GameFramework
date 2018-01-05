import { Loader } from '../assetLoader'
import { EventEmiter } from '../utils'
import GearStack from './GearStack'

export default class Gear{
  constructor(gear = {}){
    const {load, init, update, render, gears, methods} = {load:()=>({}), init:() => {}, update:() => {}, render:() => {}, gears:[], methods:{}, ...gear}

    this.init = init
    this.gearStack = new GearStack(this, gears)
    this.pause = false
    this.active = true
    this.update = update
    this.render = render
    this.load = load

    const methodList = Object.entries(methods)
    for (let [key, value] of methodList){
      this[key] = value
    }
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

  $emit(message, ...args){
    EventEmiter.emit(message, ...args)
  }

  $subscribe(message, callback){
    EventEmiter.subscribe(this, message, callback.bind(this))
  }

  $unsubscribe(message){
    EventEmiter.unsubscribe(this, message)
  }
}