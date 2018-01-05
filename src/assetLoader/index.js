import * as textureLoaders from './TextureLoaders'
import * as soundLoaders from './SoundLoaders'
import AssetLoader from './AssetLoader'

const Loader = new AssetLoader({...textureLoaders, ...soundLoaders})

export {Loader}