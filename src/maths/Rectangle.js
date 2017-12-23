import Polygon from "./Polygon"
import Vector2D from "./Vector2D"

export default class Rectangle extends Polygon{
  constructor(x, y, width, height){
    super([new Vector2D(x, y), new Vector2D(x, y + height), new Vector2D(x + width, y + height), new Vector2D(x + width, y)])
    this.width = width
    this.height = height
  }

  getNormals(){
    return [
      new Vector2D(this.vertexs[0].x, this.vertexs[0].y, this.vertexs[1].x, this.vertexs[1].y),
      new Vector2D(this.vertexs[1].x, this.vertexs[1].y, this.vertexs[2].x, this.vertexs[2].y)
    ]
  }
}