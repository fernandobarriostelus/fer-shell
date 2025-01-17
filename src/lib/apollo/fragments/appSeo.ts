import { gql } from '@apollo/client'

export const appSeo = gql`
  fragment appSeo on AppSeo {
    __typename
    sys {
      id
    }
    title
    metaTitle
    metaDescription
    metaKeywords
    metaRobots
    openGraphTags {
      __typename
      sys {
        id
      }
      title
      description
      siteName
      type
      url
    }
  }
`
