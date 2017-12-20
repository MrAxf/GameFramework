import Texture from "../graphics/texture/Texture";
import { AssetCache } from '../utils';

const TextureLoader = (url) => new Promise((resolve, reject) => {
  let img = new Image();
  img.onload = () => {
    const result = new Texture(img);
    AssetCache.set(url, result);
    resolve(result);
  };
  const formatUlr = `${window.location.origin}/${url}`;
  if ((new URL(formatUlr)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
  img.src = formatUlr;
});

export default TextureLoader;