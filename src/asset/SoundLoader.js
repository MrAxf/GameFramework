import Sound from '../sound/Sound';
import SoundContext from '../sound/SoundContext';
import { AssetCache } from '../utils';

const AudioLoader = (url) => new Promise((resolve, reject) => {
  const formatUrl = `${window.location.origin}/${url}`;
  let request = new XMLHttpRequest();
  request.open('GET', formatUrl, true);
  request.responseType = 'arraybuffer';

  request.onload = () => SoundContext.decodeAudioData(
    request.response,
    buffer => {
      const result = new Sound(buffer);
      AssetCache.set(url, result);
      return resolve(result);
    },
    error => reject(error)
  );

  request.send();
});

export default AudioLoader;