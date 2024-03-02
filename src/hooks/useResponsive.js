import { BREAKPOINTS, media } from '@theme/styles/constants';
import { useMediaQuery } from 'react-responsive';
export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: media.xs });
  const isTablet = useMediaQuery({ query: media.md });
  const isDesktop = useMediaQuery({ query: media.xl });
  const isBigScreen = useMediaQuery({ query: media.xxl });
  const mobileOnly = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.sm}px)`,
  });
  const tabletOnly = useMediaQuery({
    query: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${
      BREAKPOINTS.xl - 0.02
    }px)`,
  });
  const mediumScreen = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md}px)`,
  })
  const desktopOnly = useMediaQuery({
    query: `(min-width: ${BREAKPOINTS.xl}px) and (max-width: ${
      BREAKPOINTS.xxl - 0.02
    }px)`,
  });
  return {
    isMobile,
    isTablet,
    isDesktop,
    isBigScreen,
    mobileOnly,
    tabletOnly,
    desktopOnly,
    useMediaQuery,
    mediumScreen,
  };
};
