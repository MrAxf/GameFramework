import M3 from '../maths/Mat3'

export default class Camera{
  constructor(width, height){
    this.x = 0
    this.y = 0
    this.width = width
    this.height = height
    this.zoom = 1
    this.rotation = 0
    this.offsetX = 0
    this.offsetY = 0
    this.cameraMatrix = M3.identity()
  }

  translate(x, y){
    this.x += x
    this.y += y
  }

  setPosition(x, y){
    this.x = x
    this.y = y
  }

  rotate(rotation){
    this.rotation += rotation
  }

  setRotation(rotation){
    this.rotation = rotation
  }

  setZoom(zoom){
    this.zoom = zoom
  }

  setOffset(offsetX, offsetY){
    this.offsetX = offsetX
    this.offsetY = offsetY
  }

  update(){
    let matrix = M3.identity()
    matrix = M3.translate(matrix, -(this.x - (this.offsetX * this.width)), -(this.y - (this.offsetY * this.height)))

    matrix = M3.translate(matrix, this.width * this.offsetX, this.height * this.offsetY)
    matrix = M3.rotate(matrix, this.rotation * (Math.PI/180))
    matrix = M3.scale(matrix, this.zoom, this.zoom)
    matrix = M3.translate(matrix, this.width * -this.offsetX, this.height * -this.offsetY)

    this.cameraMatrix = matrix
  }

}