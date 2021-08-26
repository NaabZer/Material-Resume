export const THEME_BASELINE = 'THEME_BASELINE';
export const THEME_CRANE = 'THEME_CRANE';
export const THEME_DARK = 'THEME_DARK';

export const THEME_COLOR_PRIMARY = '--mdc-theme-primary'
export const THEME_COLOR_SECONDARY = '--mdc-theme-secondary'
export const THEME_COLOR_ERROR = '--mdc-theme-error'
export const THEME_COLOR_BACKGROUND = '--mdc-theme-background'
export const THEME_COLOR_SURFACE = '--mdc-theme-surface'
export const THEME_COLOR_ON_PRIMARY = '--mdc-theme-on-primary'
export const THEME_COLOR_ON_SECONDARY = '--mdc-theme-on-secondary'
export const THEME_COLOR_ON_SURFACE = '--mdc-theme-on-surface'

export const THEMES = [
  THEME_BASELINE,
  THEME_CRANE,
  THEME_DARK
]

export const TEXT_COLOR_OPTIONS = [
  {
    label: 'Primary',
    value: THEME_COLOR_PRIMARY
  },
  {
    label: 'Secondary',
    value: THEME_COLOR_SECONDARY
  },
  {
    label: 'On Primary',
    value: THEME_COLOR_ON_PRIMARY
  },
  {
    label: 'On Secondary',
    value: THEME_COLOR_ON_SECONDARY
  },
  {
    label: 'On Surface',
    value: THEME_COLOR_ON_SURFACE
  },
]

export function getThemeName(theme){
  switch(theme){
    case THEME_BASELINE:
      return 'Base';
    case THEME_CRANE:
      return 'Crane';
    case THEME_DARK:
      return 'Dark';
    default:
      return 'Base';
  }
}

export function getThemeOptions(theme){
  switch(theme){
    case THEME_BASELINE:
      return baseline
    case THEME_CRANE:
      return crane
    case THEME_DARK:
      return dark;
    default:
      return baseline
  }
}

export const baseline = {
  primary: '#6200ee',
  secondary: '#03dac4',
  error: '#b00020',
  background: '#fff',
  surface: '#fff',
  onPrimary: 'rgba(255, 255, 255, 1)',
  onSecondary: 'rgba(0, 0, 0, 0.87)',
  onSurface: 'rgba(0, 0, 0, 0.87)',
  onError: '#fff',
  textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
  textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
  textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
  textHintOnLight: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
  textIconOnLight: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnDark: 'white',
  textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
  textHintOnDark: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
  textIconOnDark: 'rgba(255, 255, 255, 0.5)'
}

export const crane = {
  primary: '#5d1049',
  secondary: '#fa3336',
  error: '#b00020',
  background: '#fff',
  surface: '#fff',
  onPrimary: 'rgba(255, 255, 255, 1)',
  onSecondary: 'rgba(255, 255, 255, 1)',
  onSurface: 'rgba(0, 0, 0, 0.87)',
  onError: '#fff',
  textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
  textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
  textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
  textHintOnLight: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
  textIconOnLight: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnDark: 'white',
  textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
  textHintOnDark: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
  textIconOnDark: 'rgba(255, 255, 255, 0.5)'
}

export const dark = {
  primary: '#24aee9',
  secondary: '#e539ff',
  error: '#b00020',
  background: '#212121',
  surface: '#37474F',
  onPrimary: 'rgba(255,255,255,.87)',
  onSecondary: 'rgba(0,0,0,0.87)',
  onSurface: 'rgba(255,255,255,.87)',
  onError: '#fff',
  textPrimaryOnBackground: 'rgba(255, 255, 255, 1)',
  textSecondaryOnBackground: 'rgba(255, 255, 255, 0.7)',
  textHintOnBackground: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnBackground: 'rgba(255, 255, 255, 0.5)',
  textIconOnBackground: 'rgba(255, 255, 255, 0.5)',
  textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
  textHintOnLight: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
  textIconOnLight: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnDark: 'white',
  textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
  textHintOnDark: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
  textIconOnDark: 'rgba(255, 255, 255, 0.5)'
}
