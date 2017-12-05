import Resurce from './Resource';

export default class Gear{
  constructor({load, init, update, render}){
    this.init = init;
    this.update = update;
    this.render = render;
    this.loadData = [new Array(load.lenght), new Array(load.lenght)];
    for (let i = 0; i < load.length; i++) {
      const { assingData, promise} = Resurce(this, load[i]);
      this.loadData[0][i] = assingData;
      this.loadData[1][i] = promise; 
    }
  }

  load(game){
    game.addToLoad(this.loadData);
  }
}