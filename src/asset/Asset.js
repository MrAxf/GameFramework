import TextureLoader from './TextureLoader';
import SoundLoader from './SoundLoader';

const Loaders = {TextureLoader, SoundLoader};

const Asset = ({type, source}) => Loaders[`${type}Loader`](source);

export default Asset;