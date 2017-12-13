import Asset from '../asset/Asset';
import GearStack from './GearStack';

export default class Gear{
  constructor({load, init, update, render, gears}){
    this.init = init;
    this.gearStack = new GearStack(this, gears);
    this.pause = false;
    this.active = true;
    this.update = update;
    this.render = render;
    this.loadData = [new Array(load.lenght), new Array(load.lenght)];
    for (let i = 0; i < load.length; i++) {
      const promise = Asset(load[i]);
      this.loadData[0][i] = {assingTo: this, id: load[i].id};
      this.loadData[1][i] = promise; 
    }
  }

  load(game){
    game.addToLoad(this.loadData);
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