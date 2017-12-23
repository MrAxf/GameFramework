import SoundContext from './SoundContext'

export default class Sound{
  constructor(audioBuffer){
    this.audioBuffer = audioBuffer
    this.instances = {}
    this.idCounter = 0
  }
  
  play(options = {}){
    const {time, volume, loop} = {time: 0, volume: 1, loop: false, ...options}
    //Set id
    const id = this.idCounter++

    //Create instance
    let source = SoundContext.createBufferSource()
    source.addEventListener("ended", e => delete this.instances[id])
    source.buffer = this.audioBuffer

    //Set loop
    source.loop = loop

    //Create GainNode for volume
    let gainNode = SoundContext.createGain()
    source.connect(gainNode)
    gainNode.gain.setTargetAtTime(volume, SoundContext.currentTime, 0.015)

    gainNode.connect(SoundContext.destination)
    source.start(time)


    this.instances[id] = {source, gainNode}
    return id
  }

  isSet(id){
    return Boolean(this.instances[id])
  }
  
  stop(id){
    if(!this.isSet(id)) return false
    this.instances[id].source.stop(0)
    this.instances[id].source.noteOff(0)
    delete this.instances[id]
  }

  setvolume(id, volume){
    if(!this.isSet(id)) return false
    this.instances[id].gainNode.gain.setTargetAtTime(volume, SoundContext.currentTime, 0.015)
  }
}