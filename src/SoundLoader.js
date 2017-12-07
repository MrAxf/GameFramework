import Sound from './Sound';
import SoundContext from './SoundContext';

const AudioLoader = (url) => new Promise((resolve, reject) => {
  const formatUrl = `${window.location.origin}/${url}`;
  let request = new XMLHttpRequest();
  request.open('GET', formatUrl, true);
  request.responseType = 'arraybuffer';

  request.onload = () => SoundContext.decodeAudioData(
    request.response,
    buffer => resolve(new Sound(buffer)),
    error => reject(error)
  );

  request.send();
});

export default AudioLoader;