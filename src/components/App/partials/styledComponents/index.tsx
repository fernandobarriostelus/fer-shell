import { ThemeProvider } from 'styled-components'
import type { NextApp } from '@telus/web-app-core'
import type { AppProps } from 'next/app'
import { GlobalStyles } from '@telus/next-styled-base'

import theme from '../../../../styles/theme'

export function withAppStyles(App: NextApp) {
  return function StyledApp(props: AppProps) {
    return (
      <>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <App {...props} />
        </ThemeProvider>
      </>
    )
  }
}
