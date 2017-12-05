import Texture from "./Texture";

const TextureLoader = (url) => new Promise((resolve, reject) => {
  let img = new Image();
  img.onload = () => {
    resolve(new Texture(img));
  };
  let formatUlr = `${window.location.origin}/${url}`;
  if ((new URL(formatUlr)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
  img.src = formatUlr;
});

const Resource = (assingTo, {type, source, id}) => ({assingData: {assingTo, id}, promise: TextureLoader(source)});

export default Resource;