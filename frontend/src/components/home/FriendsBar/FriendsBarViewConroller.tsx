import useMeasure from 'react-use-measure';

interface side_bar {
  w: number;
  h: number;
  buttomMargine: number;
  online: number;
  card: {
    w: number;
    h: number;
    cornershape: number;
  };
}

const FriendsBarViewController = () => {
  const [ref_sidebar, data] = useMeasure();

  const scalSideBar: side_bar = {
    w: data.height * (15 / 100),
    h: data.height / 6 - data.height * (5 / 100) - 6,
    buttomMargine: data.height * (5 / 100),
    online: (data.height / 6 - data.height * (5 / 100)) * (18 / 100),
    card: {
      w: data.width * (44.89 / 100),
      h: data.width * (44.89 / 100) * (27.27 / 100),
      cornershape: data.width * (44.89 / 100) * (27.27 / 100) * (30 / 100),
    },
  };

  return {
    ref_sidebar,
    scalSideBar,
  };
};

export default FriendsBarViewController;
