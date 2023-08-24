import useMeasure from 'react-use-measure';

const PoinstSectionViewController = () => {
  const [ref, bounds] = useMeasure();
  const [refd, bound] = useMeasure();

  const width = bounds.width;

  const achievement_size = bound.width * (15 / 100);

  return {
    ref,
    refd,
    width,
    achievement_size,
  };
};

export default PoinstSectionViewController;
