import { useMediaQuery } from 'react-responsive';
import { ScreenType } from '@globalTypes/types';

function useScreenType(): ScreenType {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  let screenType: ScreenType;
  if (isBigScreen) {
    screenType = ScreenType.BigScreen;
  } else if (isDesktopOrLaptop) {
    screenType = ScreenType.DesktopOrLaptop;
  } else if (isTabletOrMobile) {
    screenType = ScreenType.TabletOrMobile;
  } else if (isPortrait) {
    screenType = ScreenType.Portrait;
  } else {
    screenType = ScreenType.Unknown; // default screen type
  }

  return screenType;
}

export default useScreenType;
