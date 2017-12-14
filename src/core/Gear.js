import Asset from '../asset/Asset';
import GearStack from './GearStack';

export default class Gear{
  constructor(gear = {}){
    const {load, init, update, render, gears} = {load:()=>({}), init:() => {}, update:() => {}, render:() => {}, gears:[], ...gear};

    this.init = init;
    this.gearStack = new GearStack(this, gears);
    this.pause = false;
    this.active = true;
    this.update = update;
    this.render = render;
    this.load = load;
  }

  $load(game){
    const toLoad = Object.entries(this.load());
    let loadData = [new Array(toLoad.lenght), new Array(toLoad.lenght)];
    let i = 0;
    for (let [key, value] of toLoad){
      const promise = Asset(value);
      loadData[0][i] = {assingTo: this, id: key};
      loadData[1][i] = promise;
      i++;
    }
    game.addToLoad(loadData);
    this.gearStack.load(game);
  }

  $update(...args){
    if(!this.pause && this.active)
      this.update(...args);
  }

  $render(...args){
    if(this.active)
      this.render(...args);
  }
}