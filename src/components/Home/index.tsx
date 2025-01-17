import styled from 'styled-components'

const Hint = styled.h1`
  padding: 4rem 0;
  color: ${({ theme }) => theme.color.greyThunder};
  font-style: italic;
  text-align: center;
`

const Home = () => {
  return (
    <>
      <main>
        <Hint>(Insert Homepage Here)</Hint>
      </main>
    </>
  )
}

export default Home
