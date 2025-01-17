import { gql } from '@apollo/client'

export const appComponentCrossSellPromoBanners = gql`
  fragment appComponentCrossSellPromoBanners on AppComponentCrossSellPromoBanners {
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
`
