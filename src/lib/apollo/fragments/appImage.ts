import { gql } from '@apollo/client'

export const appImage = gql`
  fragment appImage on AppImage {
    __typename
    sys {
      id
    }
    slug
    fallbackImage {
      __typename
      sys {
        id
      }
      url
      description
    }
    xsImage {
      __typename
      sys {
        id
      }
      url
      description
    }
    smImage {
      __typename
      sys {
        id
      }
      url
      description
    }
    mdImage {
      __typename
      sys {
        id
      }
      url
      description
    }
    lgImage {
      __typename
      sys {
        id
      }
      url
      description
    }
    xlImage {
      __typename
      sys {
        id
      }
      url
      description
    }
  }
`
