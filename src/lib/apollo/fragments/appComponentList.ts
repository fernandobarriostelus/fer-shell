import { gql } from '@apollo/client'

export const appComponentList = gql`
  fragment appComponentList on AppPageComponentsCollection {
    items {
      ... on AppComponentFaq {
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
      ... on AppComponentBreadcrumbs {
        slug
        typename: __typename
        sys {
          id
        }
        routes: routesCollection {
          items {
            path
            breadcrumbName
          }
        }
      }
      ... on AppGenericComponent {
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
      ... on AppComponentTermsAndConditions {
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
      ... on SubscriptionsControlPanel {
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
      ... on AppComponentBackLink {
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
      ... on AppComponentCrossSellPromoBanners {
        slug
        typename: __typename
        sys {
          id
        }
        promoBanners: promoBannersCollection(limit: 3) {
          items {
            typename: __typename
            ... on AppDisplayComponentWrapper {
              typename: __typename
              slug
              displayLogic {
                ...displayLogic
              }
              appComponents: appComponentsCollection(limit: 3) {
                items {
                  typename: __typename
                  ... on AppComponentSodShsCard {
                    __typename
                    sys {
                      id
                    }
                    slug
                    entryTitle
                    cardHeading
                    linkUrl
                    ctaText
                    images: imagesCollection(limit: 3) {
                      items {
                        __typename
                        sys {
                          id
                        }
                        ... on AppImage {
                          ...appImage
                        }
                      }
                    }
                    cardEyebrow
                    cardDescriptionMarkdown
                    backgroundColour
                    cardHeadingSize
                    cardHeadingColour
                    cardEyebrowColour
                    cardDescriptionColour
                    authenticatedLinkUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
