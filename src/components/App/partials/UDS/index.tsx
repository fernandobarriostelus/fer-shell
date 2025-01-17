import React from 'react'
import { type Theme, BaseProvider } from '@telus-uds/components-web'
import type { NextApp } from '@telus/web-app-core'
import type { AppProps } from 'next/app'
import getTheme from './theme'

export interface UDSAppProps {
  udsTheme?: string
}

export function withUDS(App: NextApp) {
  return function UDSWeb(props: AppProps<UDSAppProps>) {
    const theme = getTheme(props.pageProps?.udsTheme) as Theme
    return (
      <BaseProvider defaultTheme={theme}>
        <App {...props} />
      </BaseProvider>
    )
  }
}
