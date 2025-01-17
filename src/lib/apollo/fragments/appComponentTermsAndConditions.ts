import { gql } from '@apollo/client'

export const appComponentTermsAndConditions = gql`
  fragment appComponentTermsAndConditions on AppComponentTermsAndConditions {
    typename: __typename
    sys {
      id
    }
    slug
    title
    text
    commonTermsAndConditionsItems: commonTermsAndConditionsItemsCollection {
      items {
        slug
        text
        longText
        link
        templateId
      }
    }
  }
`
