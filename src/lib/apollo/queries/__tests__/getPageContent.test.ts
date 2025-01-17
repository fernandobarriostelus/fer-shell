import { GetServerSidePropsContext } from 'next'

import { getPageContentFromMainAppQuery } from '..'

jest.mock('@/lib/utilities/contentful', () => {
  return {
    isPreviewEnabled: jest.fn().mockResolvedValue('true')
  }
})

describe('getPageContentQuery', () => {
  it('should return a GQL object filtering by main App', () => {
    const result = getPageContentFromMainAppQuery(
      'test-main-app',
      'test-slug',
      'en',
      {} as unknown as GetServerSidePropsContext
    )
    expect(typeof result).toBe('object')
    expect(result.loc).toBeTruthy()
    expect(result.loc?.source).toHaveProperty('body')
    expect(typeof result.loc?.source.body).toBe('string')
    expect(result.loc?.source.body).toContain('slug: "test-slug"')
    expect(result.loc?.source.body).toContain('locale:"en"')
  })
})
