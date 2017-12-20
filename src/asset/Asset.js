import TextureLoader from './TextureLoader';
import SoundLoader from './SoundLoader';
import { AssetCache } from '../utils';

const Loaders = {TextureLoader, SoundLoader};

const Asset = ({type, source}) => {
  if (AssetCache.has(source)) return AssetCache.get(source);
  return Loaders[`${type}Loader`](source);
}

export default Asset;