export default class TextureRegion{
  constructor(texture, x, y, width, height){
    this.texture = texture

    if (x === undefined) {
      x = 0
      width = texture.width
    }
    if (y === undefined) {
      y = 0
      height = texture.height
    }
    if (width === undefined) {
      width = x
      x = 0
    }
    if (height === undefined) {
      height = y
      y = 0
    }
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  split(rows = 1, cols = 1) {
		const rowHeight = this.height/rows
		const colWidth = this.width/cols
		let regions = new Array(rows)
		for (let i = 0; i < rows; i++) {
			regions[i] = new Array(cols)
			for (let j = 0; j < cols; j++) {
				regions[i][j] = new TextureRegion(this.texture, this.x + (j * colWidth), this.y + (i * rowHeight), colWidth, rowHeight)
			}
		}
		return regions
	}
}