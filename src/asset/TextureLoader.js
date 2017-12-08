import Texture from "../graphics/texture/Texture";

const TextureLoader = (url) => new Promise((resolve, reject) => {
  let img = new Image();
  img.onload = () => {
    resolve(new Texture(img));
  };
  const formatUlr = `${window.location.origin}/${url}`;
  if ((new URL(formatUlr)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
  img.src = formatUlr;
});

export default TextureLoader;