import { GetServerSidePropsContext } from 'next'

import { getManagePaymentPageContent } from '..'

jest.mock('@/lib/utilities/contentful', () => {
  return {
    isPreviewEnabled: jest.fn().mockResolvedValue('true')
  }
})

describe('getManagePaymentPageContentQuery', () => {
  it('should return a GQL object filtering by main App', () => {
    const result = getManagePaymentPageContent(
      'test-main-app',
      'en',
      {} as unknown as GetServerSidePropsContext
    )
    expect(typeof result).toBe('object')
    expect(result.loc).toBeTruthy()
    expect(result.loc?.source).toHaveProperty('body')
    expect(typeof result.loc?.source.body).toBe('string')
    expect(result.loc?.source.body).toContain('locale:"en"')
  })
})
