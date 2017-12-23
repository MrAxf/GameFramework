import Sound from '../sound/Sound'
import SoundContext from '../sound/SoundContext'
import loadFromCache from './CacheLoader'
import { AssetCache } from '../utils'

const loadSoundFromUrl = (url) => new Promise((resolve, reject) => {
  const cache = loadFromCache(url)
  if(cache){
    resolve(cache)
    return
  }

  let request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  request.onload = () => SoundContext.decodeAudioData(
    request.response,
    buffer => {
      const result = new Sound(buffer)
      AssetCache.set(url, result)
      return resolve(result)
    },
    error => reject(error)
  )

  request.send()
})

const loadSoundFromFile = (file) => new Promise((resolve, reject) => {
  const cache = loadFromCache(file.name)
  if(cache){
    resolve(cache)
    return
  }

  const fr = new FileReader()

  fr.onloadend = () => {
    const buffer = fr.result
    SoundContext.decodeAudioData(
      request.response,
      buffer => {
        const result = new Sound(buffer)
        AssetCache.set(file.name, result)
        return resolve(result)
      },
      error => reject(error)
    )
  }

  fr.readAsArrayBuffer(file)
})

export { loadSoundFromUrl, loadSoundFromFile }