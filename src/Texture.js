import TextureRegion from "./TextureRegion";

export default class Texture {
	constructor(image) {
		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	split(rows = 1, cols = 1) {
		const rowHeight = this.height/rows;
		const colWidth = this.width/cols;
		let regions = new Array(rows);
		for (let i = 0; i < rows; i++) {
			regions[i] = new Array(cols);
			for (let j = 0; j < cols; j++) {
				regions[i][j] = new TextureRegion(this, j * colWidth, i * rowHeight, colWidth, rowHeight);
			}
		}
		return regions;
	}

	static loadFromUrl(url) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => {
				resolve(new Texture(img));
			};
			let formatUlr = `${window.location.origin}/${url}`;
			if ((new URL(formatUlr)).origin !== window.location.origin) {
				img.crossOrigin = "";
			}
			img.src = formatUlr;
		});
	}
}
