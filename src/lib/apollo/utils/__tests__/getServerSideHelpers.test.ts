import fetchGraphQLData from '../../../../__mocks__/fetchGraphQL.json'
import parsedPageContent from '../../../../__mocks__/fetchSubscriptionGraphQL.json'
import { parseContentfulModel, parseContentfulPage } from '../getServerSideHelpers'

// import { GetServerSidePageQuery } from 'src/codegen/types'
import { GetElementType } from 'src/lib/types/utils'
type GQLQueryResponse = GetElementType<Exclude<any['pages'], null | undefined>['items']>

jest.mock('@telus/sod-api-kit/lib/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn()
  }
}))

describe('parseContentfulPage', () => {
  it('should correctly parse the contentful page', () => {
    const examplePage: any = {
      __typename: 'AppPage',
      slug: 'my-telus-page',
      seo: null,
      components: { __typename: 'AppPageComponentsCollection', items: [] },
      labels: { __typename: 'AppPageLabelsCollection', items: [] },
      configs: { __typename: 'AppPageConfigsCollection', items: [] }
    }
    const partialPage: GQLQueryResponse = {
      ...examplePage,
      components: {
        __typename: examplePage.components?.__typename,
        items: [
          {
            __typename: 'AppGenericComponent',
            slug: 'test-generic-00'
          }
        ]
      }
    }

    const parsedExamplePage = {
      slug: 'my-telus-page',
      seo: null,
      components: {},
      labels: {},
      configs: {}
    }
    const parsedPartialPage = {
      slug: 'my-telus-page',
      seo: null,
      components: {
        testGeneric00: {
          slug: 'test-generic-00'
        }
      },
      labels: {},
      configs: {}
    }
    const emptyResult = {
      components: null,
      configs: null,
      labels: null
    }
    expect(parseContentfulPage({ __typename: 'AppPage' })).toEqual(emptyResult)
    expect(parseContentfulPage(null)).toEqual(emptyResult)
    expect(parseContentfulPage(partialPage as any)).toEqual(parsedPartialPage)
    expect(parseContentfulPage(examplePage)).toEqual(parsedExamplePage)
  })
})

describe('parseContentfulModel', () => {
  it('should correctly parse the contentful model', () => {
    expect(parseContentfulModel(parsedPageContent as any)).toEqual([fetchGraphQLData])
    expect(parseContentfulModel({ __typename: 'App' })).toEqual([])
  })
})
