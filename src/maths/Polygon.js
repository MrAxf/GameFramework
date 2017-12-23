import Vector2D from "./Vector2D"

export default class Polygon{
  constructor(vertexs = []){
    this.vertexs = vertexs
  }

  transform(tranformationMatrix){
    for (let i = 0; i < this.vertexs.length; i++) {
      this.vertexs[i].transform(tranformationMatrix)
    }
  }

  translate(vector){
    for (let i = 0; i < this.vertexs.length; i++) {
      this.vertexs[i].x += vector.x
      this.vertexs[i].y += vector.y
    }
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

  getNormals(){
    let normals = new Array(this.vectexs.length)
    let lastVertex = this.vertexs[this.vertexs.length - 1]
    for (let i = 0; i < this.vertexs.length; i++) {
      normals[i] = (new Vector2D(this.vertexs[i].x, this.vertexs[i].y, lastVertex.x, lastVertex.y)).normal()
      lastVertex = this.vertexs[i]
    }
    return normals
  }

  proyection(vector){
    let min = this.vertexs[0].projection(vector)
    let max = min
    for (let i = 1; i < this.vertexs.length; i++) {
      const p = this.vertexs[i].projection(vector)
      if (p < min) min = p
      else if (p > max) max = p
    }
    return {min, max}
  }

  collides(polygon){
    const thisNormals = this.getNormals()
    const polygonNormals = this.getNormals()

    for (let i = 0; i < thisNormals.length; i++) {
      const thisProjection = this.projection(thisNormals[i])
      const polygonProjection = polygon.projection(thisNormals[i])
      if(!(thisProjection.max >= polygonProjection.min && polygonProjection.max >= thisProjection.min)) return false
    }

    for (let i = 0; i < polygonNormals.length; i++) {
      const thisProjection = this.projection(polygonNormals[i])
      const polygonProjection = polygon.projection(polygonNormals[i])
      if(!(thisProjection.max >= polygonProjection.min && polygonProjection.max >= thisProjection.min)) return false
    }

    return true
  }
}