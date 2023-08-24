import useMeasure from 'react-use-measure';

interface gamemodes {
  width: number;
  play_size: number;
  font_size: number;
  mb: number;
  play_button_margin3: number;
}

const GameModesTestViewCOntroller = () => {
  const [ref, bound] = useMeasure();

  const scale: gamemodes = {
    width: bound.width * (4 / 100),
    play_size: bound.width * (32 / 100),
    font_size: bound.width * (32 / 100) * (18 / 100),
    mb: bound.height * (13.06 / 100),
    play_button_margin3: bound.height * (7.95 / 100),
  };
  return {
    ref,
    scale,
  };
};

export default GameModesTestViewCOntroller;
