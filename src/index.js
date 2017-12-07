import Texture from './Texture';
import TextureRegion from './TextureRegion';
import SpriteBatch from './SpriteBatch';
import Game from './Game';
import Animation from './Animation';
import Gear from './Gear';

const game = new Game({}, new Gear({
	load: [
		{ type: 'Texture', source: 'mario.png', id: 'texture' },
		{ type: 'Sound', source: 'song.mp3', id: 'song' }
	],
	init() {
		this.x = 0;
		this.sb = new SpriteBatch(game.context);
		this.regions = this.texture.split(1, 3);
		this.mario = new Animation(0.1, this.regions[0], Animation.PLAY_MODES.LOOP);
		game.context.fillStyle = "cyan";
		//this.song.play({loop: true});
	},
	update() {
		if(game.input.isKeyDown(39)) this.x += 4;
		if(game.input.isKeyDown(37)) this.x -= 4;
		if (this.x < -60) this.x = 1021;
		if (this.x > 1021) this.x = -60;
	},
	render() {
		game.context.fillRect(0, 0, game.options.width, game.options.height);
		this.sb.begin();
		this.sb.drawTexture(this.mario.getFrame(game.getDeltaTime()), this.x, 240);
		this.sb.end();
	}
}));
game.fitCanvasToConatiner();
game.start();
