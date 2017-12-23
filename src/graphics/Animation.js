export default class Animation{

  static PLAY_MODES = {
    NORMAL: 0,
    LOOP: 1,
    REVERSE: 2,
    LOOP_REVERSE: 3,
  }

  constructor(frameTime, frames, playMode = 0){
    this.frameTime = frameTime
    this.frames = frames
    this.playMode = playMode
    this.animationEnded = false
    this._frame = this.playMode > 1 ? this.frames.length - 1 : 0
    this._acumulateTime = 0
  }

  getFrame(deltaTime){
    if (this.animationEnded) return this.frames[this._frame]
    const framesElapses = Math.floor((this._acumulateTime + deltaTime) / this.frameTime)
    this._acumulateTime = (this._acumulateTime + deltaTime) - (framesElapses * this.frameTime)
    this._nextFrame(framesElapses)
    return this.frames[this._frame]
  }

  _nextFrame(frameElapse){
    this[`_nextFrame${this.playMode}`](frameElapse)
  }
  _nextFrame0(frameElapse){
    this._frame = Math.min(this._frame += frameElapse, this.frames.length - 1)
    if (this._frame == this.frames.length - 1) this.animationEnded = true
  }
  _nextFrame1(frameElapse){
    this._frame = (this._frame + frameElapse) % this.frames.length
  }
  _nextFrame2(frameElapse){
    this._frame = Math.max(this._frame -= frameElapse, 0)
    if (this._frame == 0) this.animationEnded = true
  }
  _nextFrame3(frameElapse){
    this._frame = (this._frame - frameElapse).mod(this.frames.length)
  }
}