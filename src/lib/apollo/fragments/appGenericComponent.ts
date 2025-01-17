import { gql } from '@apollo/client'

export const appGenericComponent = gql`
  fragment appGenericComponent on AppGenericComponent {
    typename: __typename
    slug
    sys {
      id
    }
    labels: labelsCollection(limit: 15) {
      items {
        ... on AppLabel {
          slug
          text
        }
        ... on AppMarkdownLabel {
          slug
          text
        }
      }
    }
    configs: configsCollection(limit: 10) {
      items {
        ... on AppConfig {
          slug
          data
        }
      }
    }
    images: imagesCollection(limit: 10) {
      items {
        ...appImage
      }
    }
  }
`
