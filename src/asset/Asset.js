import TextureLoader from './TextureLoader';
import SoundLoader from './SoundLoader';
import { AssetCache } from '../utils';

/**
 * Aviable loaders.
 * 
 * @constant
 * @type {object}
 */
const Loaders = {TextureLoader, SoundLoader};

/**
 * Defines an Asset.
 * 
 * @constant
 * @type {function}
 * @param {string} type - The type of the Asset ("Texture or Sound").
 * @param {string} source - Relative url to the Asset.
 * @returns {Promise} Promise that loads the Asset.
 * 
 */
const Asset = ({type, source}) => {
  if (AssetCache.has(source)) return AssetCache.get(source);
  return Loaders[`${type}Loader`](source);
}

export default Asset;