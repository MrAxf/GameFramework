import { AssetCache } from '../utils'

const loadFromCache = (src) => {
  if (AssetCache.has(src)) return AssetCache.get(src)
  return false
}

export default loadFromCache