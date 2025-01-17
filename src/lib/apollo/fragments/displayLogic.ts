import { gql } from '@apollo/client'

export const displayLogic = gql`
  fragment displayLogic on DisplayLogic {
    displayLogicItems: displayLogicItemsCollection(limit: 5) {
      items {
        ... on TemplateDisplayLogicItem {
          typename: __typename
          sys {
            id
            spaceId
          }
          logicOperator
          subscriptionCountValue
          matchingSubscriptionStates
          templateIdsMatchingCriteria
          matchingTemplateIds: matchingTemplateIdsCollection(limit: 5) {
            items {
              value
            }
          }
        }
        ... on ProvinceDisplayLogicItem {
          typename: __typename
          sys {
            id
            spaceId
          }
          logicOperator
          provinceCodes
        }
      }
    }
    unleashFeatureFlags
    businessFlags
  }
`
