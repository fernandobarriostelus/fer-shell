import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client'
import { headerUtils } from '@telus/sod-api-kit'
import safeCache from '@telus/sod-api-kit/lib/safe-cache'
import type { Context } from '@telus/sod-api-kit/lib/types'
import {
  BuildErrorProps,
  buildServiceError
} from '@telus/sod-api-kit/lib/utils/errors'
import fetch from 'isomorphic-fetch'
import { GetServerSidePropsContext } from 'next'

import {
  AUTHORIZATION,
  URL,
  getLocation
} from '../utils/contentfulAccessConsts'

import logger from 'src/lib/logger'

/**
 * gets the pagesCollection from a query started by a Main App
 * @param query
 * @param context
 * @returns
 */

export async function fetchPageGraphQLWithCache(
  query: DocumentNode,
  cacheKey: string,
  context?: Context,
  ctx?: GetServerSidePropsContext
) {
  const brand = 'telus'
  const cacheKeyWithBrand = `${brand}-${cacheKey}`

  if (!cacheKey || cacheKey === '') {
    logger.warn('No cache key provided. Skipping fetch from contentful cache.')
    return await fetchPageGraphQL(query, context, ctx)
  }

  const { data } = await safeCache.get(
    cacheKeyWithBrand,
    async () => await fetchPageGraphQL(query, context, ctx),
    context
  )

  return data
}

export async function fetchPageGraphQL(
  query: DocumentNode,
  context?: Context,
  ctx?: GetServerSidePropsContext
) {
  const headers = { Authorization: AUTHORIZATION }
  const label =
    'Headers logged from: Koodo-My-Account-Shell >> getServerSideContent'
  try {
    const ctfBranch = 'staging'
    const httpLink = createHttpLink({
      uri: `${URL}${getLocation(ctfBranch)}`,
      fetch,
      headers: {
        Authorization: AUTHORIZATION
      }
    })

    const apolloLinks = from([httpLink])
    const cache = new InMemoryCache()
    const client = new ApolloClient({
      link: apolloLinks,
      cache
    })
    context && headerUtils.logHeaders({ headers }, context, label)
    const response = await client.query({ query })
    // grab only the pagesColection
    const pagesCollection = response.data.appCollection?.items[0]
    return { data: pagesCollection }
  } catch (err) {
    const error = buildServiceError(err as BuildErrorProps)
    logger.error(
      `Error getting content: ${JSON.stringify(err)}`,
      context,
      error
    )
    throw error
  }
}
