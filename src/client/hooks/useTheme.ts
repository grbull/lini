import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';

export function useTheme(): 'dark' | 'light' {
  const userTheme =
    useSelector((state: RootState) => state.user.profile?.theme) || 'auto';

  const systemTheme = useMediaPredicate('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  if (userTheme === 'auto') {
    return systemTheme;
  }

  return userTheme;
}
