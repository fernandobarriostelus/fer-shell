/* eslint-disable jest/no-mocks-import */

import { DocumentNode } from '@apollo/client'
import Tracker from '@telus/contentful-tracking'
import safeCache from '@telus/sod-api-kit/lib/safe-cache'
import { logger } from '@telus/sod-api-kit/lib/utils/logger'
import { GetServerSidePropsContext } from 'next'

import fetchPageGraphQLData from '../../../../__mocks__/fetchPageGraphQL.json'
import { getPageContentFromMainAppQuery } from '../../queries'
import { fetchPageGraphQL, fetchPageGraphQLWithCache } from '../../queries/getServerSideContent'

jest.mock('@telus/sod-api-kit/lib/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  }
}))

jest.mock('@telus/sod-api-kit/lib/safe-cache', () => ({
  get: jest.fn().mockImplementation((key, callback) => {
    return { data: callback() }
  })
}))

jest.mock('@telus/contentful-tracking', () => {
  return jest.fn().mockImplementation(() => {
    return {
      GQLTracker: jest.fn()
    }
  })
})

jest.mock('@/lib/utilities/contentful', () => {
  return {
    isPreviewEnabled: jest.fn().mockResolvedValue('true'),
    getCtfBranchCookie: jest.fn().mockResolvedValue('staging')
  }
})

describe('getServerSideContent', () => {
  describe('fetchPageGraphQL', () => {
    const ctx = {
      req: {
        query: {
          ctfPreview: 'true',
          ctfBranch: 'staging'
        }
      }
    } as unknown as GetServerSidePropsContext
    it('should fetchPageGraphQL with correct response for main-app structure', async () => {
      const query = await getPageContentFromMainAppQuery('main-app', 'my-telus-page', 'en-CA', ctx)
      const { data } = await fetchPageGraphQL(query)
      expect(data).toEqual(fetchPageGraphQLData.appCollection.items[0])
    })
    it('fetchPageGraphQL should throw', async () => {
      let error = null
      try {
        const { data } = await fetchPageGraphQL({} as unknown as DocumentNode)
        expect(data).toEqual(undefined)
      } catch (err) {
        error = err
      }
      expect(error).toBeTruthy()
    })

    it('should call tracker with existing responses with no issue', async () => {
      const query = await getPageContentFromMainAppQuery('main-app', 'my-telus-page', 'en-CA', ctx)
      await fetchPageGraphQL(query)
      expect(Tracker).toHaveBeenCalled()
    })
  })

  describe('fetchPageGraphQLWithCache', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    const ctx = {
      req: {
        query: {
          ctfPreview: 'true',
          ctfBranch: 'staging'
        }
      }
    } as unknown as GetServerSidePropsContext

    it('should return the same object as fetchPageGraphQL with the same query and context', async () => {
      const query = await getPageContentFromMainAppQuery('main-app', 'my-telus-page', 'en-CA', ctx)
      const { data } = await fetchPageGraphQLWithCache(query, 'my-telus-page-en-CA')
      expect(data).toEqual(fetchPageGraphQLData.appCollection.items[0])
    })

    it('should skip cache call if cache key is unavailable', async () => {
      const query = await getPageContentFromMainAppQuery('main-app', 'my-telus-page', 'en-CA', ctx)
      const { data } = await fetchPageGraphQLWithCache(query, '')

      expect(safeCache.get).not.toHaveBeenCalled()
      expect(logger.warn).toHaveBeenCalledWith(
        'No cache key provided. Skipping fetch from contentful cache.'
      )
      expect(data).toEqual(fetchPageGraphQLData.appCollection.items[0])
    })
  })
})
