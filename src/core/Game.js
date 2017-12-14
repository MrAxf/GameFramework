import InputManager from "../input/InputManager";

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const defaultOptions = {
  container_id: 'game-container',
  width: 960,
  height: 540,
  ticks_per_second: 60,
}

export default class Game {
  constructor(options = {}, coreGear){
    //Setup options
    this.options = {...defaultOptions, ...options};
    //Canvas container
    this.container = document.getElementById(this.options.container_id);

    this.setCanvas();

    this.input = new InputManager();
    this.container.addEventListener("keydown", e => this.input.keySet(e.keyCode, true));
    this.container.addEventListener("keyup", e => this.input.keySet(e.keyCode, false));

    this.canvas = document.getElementById(`${this.options.container_id}-canvas`);
    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;
    this.context = this.canvas.getContext('2d');
    //FullScreen
    this.fullScreenActive = false;
    //game running
    this.running = false;
    //Game loop data
    this.interval = 1000/this.options.ticks_per_second;
    this.lag = 0;
    this.deltaTime = 0;
    this.then= 0;
    //bind game to loop function
    this.loop = this.loop.bind(this);
    //CoreGear
    this.coreGear = coreGear;
    this.loadData = [[], []];
  }

  setCanvas(){
    this.container.requestFullScreen = this.container.requestFullscreen || this.container.msRequestFullscreen || this.container.mozRequestFullScreen || this.container.webkitRequestFullscreen;

    document.exitFullScreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;

    this.container.style.background = "#000000";
    this.container.style.position = "relative";
    this.container.style.display = "flex";
    this.container.style.alignItems = "center";
    this.container.style.justifyContent = "center";
    this.container.style.overflow = "hidden";
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.setAttribute("tabindex", "1");

    this.container.innerHTML = `<canvas id="${this.options.container_id}-canvas"></canvas>`;
  }

  fitCanvasToConatiner(){
    setTimeout(() => {
      const canvasProportions = this.canvas.clientWidth / this.canvas.clientHeight;
      const containerProportions = this.container.clientWidth / this.container.clientHeight;
  
      if(containerProportions > canvasProportions){
        this.canvas.style.width = "auto";
        this.canvas.style.height = "100%";
      } else {
        this.canvas.style.width = "100%";
        this.canvas.style.height = "auto";
      }
    }, 0);
  }

  resizeCanvas(renderer, width = 960, height = 540, force = false){
    if(!force && this.options.width == width && this.options.height == height) return;
    this.options.width = width;
    this.options.height = height;

    this.canvas.width = width;
    this.canvas.height = height;
  }

  toggleFullScreen(activate = !this.fullScreenActive){
    this.fullScreenActive = activate;

    if(activate) this.container.requestFullScreen();
    else document.exitFullScreen();

    setTimeout(this.fitCanvasToConatiner.bind(this), 300);
  }

  loop(){
    if(this.running){
      const now = Date.now();
      this.deltaTime = now - this.then;
    	this.lag += this.deltaTime;
    	this.then = now;
    	while(this.interval < this.lag){
        this.input.update();
    		this.coreGear.$update();
    		this.lag -= this.interval;
    	}
    }
  	this.coreGear.$render();
    requestAnimationFrame(this.loop);
  }

  start(){
    this.coreGear.$load(this);
    this.load(() => {
      this.coreGear.init();
      this.running = true;
      this.then = Date.now();
      requestAnimationFrame(this.loop);
    });
  }

  pause(){
    this.running = false;
  }

  continue(){
    this.then = Date.now();
    this.lag = 0;
    this.running = true;
  }

  getDeltaTime() {
    return this.deltaTime/1000;
  }

  addToLoad(loadData){
    this.loadData[0] = [...this.loadData[0], ...loadData[0]];
    this.loadData[1] = [...this.loadData[1], ...loadData[1]];
  }

  load(then = () => 0){
    then = then.bind(this);
    Promise.all(this.loadData[1])
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          this.loadData[0][i].assingTo[this.loadData[0][i].id] = values[i];
        }
        this.loadData = [[], []];
        then();
      });
  }
} 