import { gql } from '@apollo/client'

export const appComponentBackLink = gql`
  fragment appComponentBackLink on AppComponentBackLink {
    typename: __typename
    sys {
      id
    }
    slug
    text
    chevronLinkIsAlternative
    chevronLinkIsQuiet
    backgroundColor
  }
`
