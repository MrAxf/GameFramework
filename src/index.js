import Texture from './graphics/texture/Texture';
import TextureRegion from './graphics/texture/TextureRegion';
import SpriteBatch from './graphics/SpriteBatch';
import Game from './core/Game';
import Animation from './graphics/Animation';
import Gear from './core/Gear';

const marioGear = new Gear({
	load: [
		{ type: 'Texture', source: 'mario.png', id: 'texture' },
	],
	init() {
		this.x = 0;
		this.facingRight = 1;
		this.walking = false;
		this.regions = this.texture.split(1, 3);
		this.mario = new Animation(0.1, this.regions[0], Animation.PLAY_MODES.LOOP);
	},
	update() {
		this.walking = false;
		if(game.input.isKeyDown(39)){
			this.x += 4;
			this.facingRight = 1;
			this.walking = true;
		} 
		else if(game.input.isKeyDown(37)){
			this.x -= 4;
			this.facingRight = 0;
			this.walking = true;
		}
		if (this.x < -60) this.x = 1021;
		if (this.x > 1021) this.x = -60;
	},
	render(sb) {
		const toDraw = this.walking ? this.mario.getFrame(game.getDeltaTime()) : this.regions[0][1];
		sb.drawTexture(toDraw, 0, 0, 60, 64, this.x + (this.facingRight ? 0:60), 240, 60 * (this.facingRight ? 1:-1), 64);
	},
});

const game = new Game({}, new Gear({
	load: [
		{ type: 'Sound', source: 'song.mp3', id: 'song' },
		{ type: 'Texture', source: 'marioBg.png', id: 'background' },
	],
	init() {
		this.sb = new SpriteBatch(game.context);
		game.context.fillStyle = "cyan";
		this.song.play({volume: 0.75, loop: true});
		this.gearStack.init();
	},
	update() {
		this.gearStack.update();
	},
	render() {
		game.context.fillRect(0, 0, game.options.width, game.options.height);
		this.sb.begin();
		this.sb.drawTexture(this.background, 0, 0);
		this.gearStack.render(this.sb);
		this.sb.end();
	},
	gears: [
		{gear: marioGear},
	],
}));
game.fitCanvasToConatiner();
game.start();
