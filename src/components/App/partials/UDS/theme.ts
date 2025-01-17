import '@telus-uds/palette-allium/build/web/fonts/fonts-cdn.css'
import '@telus-uds/palette-koodo/build/web/fonts/fonts-cdn.css'
import alliumTheme from '@telus-uds/theme-allium'
import koodoTheme from '@telus-uds/theme-koodo'

export const DEFAULT_UDS_THEME = 'allium'

export const themes: Record<string, unknown> = {
  allium: alliumTheme,
  koodo: koodoTheme
}

export default function getTheme(themeName = DEFAULT_UDS_THEME): unknown | null {
  return themes[themeName] ?? themes[DEFAULT_UDS_THEME]
}
