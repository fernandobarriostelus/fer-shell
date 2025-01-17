import { gql } from '@apollo/client'

export const appComponentFaq = gql`
  fragment appComponentFaq on AppComponentFaq {
    typename: __typename
    sys {
      id
    }
    title
    slug
    questions: questionsCollection(limit: 25) {
      items {
        ... on AppComponentFaqQuestion {
          answer
          title
        }
      }
    }
  }
`
