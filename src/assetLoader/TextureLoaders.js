import Texture from "../graphics/texture/Texture"
import { AssetCache } from '../utils'
import loadFromCache from './CacheLoader'

const loadTextureFromUrl = (url) => new Promise((resolve, reject) => {
  const cache = loadFromCache(url)
  if(cache){
    resolve(cache)
    return
  }

  let img = new Image()
  img.onload = () => {
    const result = new Texture(img)
    AssetCache.set(url, result)
    resolve(result)
  }
  if ((new URL(url)).origin !== window.location.origin) {
    img.crossOrigin = ""
  }
  img.src = url
})

const loadTextureFromFile = (file) => new Promise((resolve, reject) => {
  const cache = loadFromCache(file.name)
  if(cache){
    resolve(cache)
    return
  }

  const fr = new FileReader()
  let img = new Image()

  fr.onloadend = () => {
    img.src = fr.result
  }
  img.onload = () => {
    const result = new Texture(img)
    AssetCache.set(file.name, result)
    resolve(result)
  }

  fr.readAsDataURL(file)
})

export { loadTextureFromUrl, loadTextureFromFile }