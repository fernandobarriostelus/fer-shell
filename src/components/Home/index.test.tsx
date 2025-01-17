import { render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import Home from '.'
import theme from '../../styles/theme'

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />, { wrapper: ThemeWrapper })

    const heading = screen.getByRole('heading', {
      name: /(Insert Homepage Here)/i
    })

    expect(heading).toBeInTheDocument()
  })
})
