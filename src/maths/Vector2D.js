import M3 from "./Mat3"

export default class Vector2D{
  constructor(x, y, xo = 0, yo= 0){
    this.x = x - xo
    this.y = y - yo
  }

  transform(tranformationMatrix){
    this.x = (this.x * tranformationMatrix[0]) + (this.y * tranformationMatrix[3] + tranformationMatrix[6])
    this.y = (this.x * tranformationMatrix[1]) + (this.y * tranformationMatrix[4] + tranformationMatrix[7])
  }

  translate(vector){
    this.x += vector.x
    this.y += vector.y
  }

  rotate(rotation){
    let matrix = M3.identity()
    matrix = M3.rotate(matrix, rotation * (Math.PI/180))
    this.transform(matrix)
  }

  sacale(scaleX, scaleY){
    let matrix = M3.identity()
    matrix = M3.scale(matrix, scaleX, scaleY)
    this.transform(matrix)
  }

  normal() {
    return new Vector2D(-this.y, this.x)
  }

  magnitude(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  projection(proyectionVector){
    const proyectionVectorMagnitude = proyectionVector.magnitude()
    return (this.x * (proyectionVector.x/proyectionVectorMagnitude)) + (this.y * (proyectionVector.y/proyectionVectorMagnitude))
  }

}