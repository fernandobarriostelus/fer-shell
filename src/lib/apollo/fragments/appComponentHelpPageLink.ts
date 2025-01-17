import { gql } from '@apollo/client'

export const appComponentHelpPageLink = gql`
  fragment appComponentHelpPageLink on AppComponentHelpPageLink {
    typename: __typename
    sys {
      id
    }
    slug
    copyRichText {
      json
    }
  }
`
