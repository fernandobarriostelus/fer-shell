import { gql } from '@apollo/client'

export const subscriptionsControlPanel = gql`
  fragment subscriptionsControlPanel on SubscriptionsControlPanel {
    typename: __typename
    sys {
      id
    }
    slug
    heroTitle
    defaultGreeting
    activeSubscriptionsGreeting
    inProgressOrReadyToActivateGreeting
    longGreeting
    yourSubscriptionsTitle
    subscriptionHeroImage {
      ...appImage
    }
    controlPanelItems: controlPanelItemsCollection(limit: 3) {
      items {
        ... on SubscriptionsControlPanelItem {
          title
          links: linksCollection(limit: 3) {
            items {
              ... on AppLink {
                href
                text
                dataTestId
              }
            }
          }
          displayLogic {
            ...displayLogic
          }
          addDivider
          showLoadingSkeleton
        }
      }
    }
  }
`
