import { GetServerSideProps } from 'next'
import logger from 'src/lib/logger'
import { getContext } from '@telus/sod-api-kit/lib/utils/context'

import { fetchPageGraphQLWithCache } from 'src/lib/apollo/queries/getServerSideContent'
import { getSubscriptionPageContent } from 'src/lib/apollo/queries'

interface HomePageProps {
  data: string
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  return (
    <div>
      <h1>Server Side Rendered Page</h1>
      <p>{JSON.stringify(content)}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Fetch data from an API or perform any server-side logic here
  const data = 'This is server-side rendered content'
  const logContext = getContext(ctx.req, 'sod-my-account-sub-overview')
  logger.info('Server-side rendered page', logContext)

  const content = await fetchPageGraphQLWithCache(
    getSubscriptionPageContent(),
    'cacheKeyFer',
    logContext,
    ctx
  )

  return {
    props: {
      data,
      content
    }
  }
}

export default HomePage
