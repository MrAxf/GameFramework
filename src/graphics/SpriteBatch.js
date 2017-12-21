import ImageBuffer from "./ImageBuffer";
import M3 from "../maths/Mat3";

export default class SpriteBatch {
	constructor(context) {
		this.context = context;
    this.buffer = new ImageBuffer(context.canvas.width, context.canvas.height);
    this.drawing = false;
    this.projectionMatrix = M3.identity();
	}
	begin(){
		if(this.drawing)
			throw "This batch is currenly drawing";
		this.drawing = true;
		this.buffer.clear();
	}
	drawTexture(texture, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, srcRotation = 0, offsetX = 0, offsetY = 0){
		if(!this.drawing)
			throw "This batch is not begin to draw";
		if (dstX === undefined) {
      dstX = srcX;
      srcX = 0;
    }
    if (dstY === undefined) {
      dstY = srcY;
      srcY = 0;
    }
    if (srcWidth === undefined) {
      srcWidth = texture.width;
    }
    if (srcHeight === undefined) {
      srcHeight = texture.height;
    }
    if (dstWidth === undefined) {
      dstWidth = srcWidth;
      srcWidth = texture.width;
    }
    if (dstHeight === undefined) {
      dstHeight = srcHeight;
      srcHeight = texture.height;
    }
    if (texture.constructor.name == "TextureRegion") {
      srcX += texture.x;
      srcY += texture.y;
      texture = texture.texture;
    } 

    let matrix = M3.identity();

    // this matrix will translate our quad to dstX, dstY
    matrix = M3.translate(matrix, dstX - (dstWidth * offsetX), dstY - (dstHeight * offsetY));

    matrix = M3.translate(matrix, dstWidth * offsetX, dstHeight * offsetY);
    matrix = M3.rotate(matrix, srcRotation * (Math.PI/180));
    matrix = M3.scale(matrix, dstWidth/srcWidth, dstHeight/srcHeight);
    matrix = M3.translate(matrix, dstWidth * -offsetX, dstHeight * -offsetY);

    this.buffer.context.setTransform(...M3.toCanvas2dMatrix(M3.multiply(this.projectionMatrix, matrix)));

    this.buffer.context.drawImage(texture.image, srcX, srcY, srcWidth, srcHeight, 0, 0, srcWidth, srcHeight);
	}
	end(){
		if(!this.drawing)
			throw "This batch is not begin to draw";
		this.drawing = false;
		this.context.drawImage(this.buffer.canvas, 0, 0);
  }
  setProjection(matrix){
    this.projectionMatrix = matrix;
  }
  resetProjection(){
    this.projectionMatrix = M3.identity();
  }
}