import { gql } from '@apollo/client'

import { appComponentBreadcrumbs } from '../fragments/appComponentBreadcrumbs'
import { appComponentCrossSellPromoBanners } from '../fragments/appComponentCrossSellPromoBanners'
import { appGenericComponent } from '../fragments/appGenericComponent'
import { appImage } from '../fragments/appImage'
import { appSeo } from '../fragments/appSeo'
import { displayLogic } from '../fragments/displayLogic'
import { subscriptionsControlPanel } from '../fragments/subscriptionsControlPanel'

/**
 * Fetches a specific app page content to be rendered filtering it by the Main App from Contentful
 * @param mainApp Main app values are telus-my-account-shell or koodo-my-account-shell
 * @param slug the page slug to be fetched - e.g. my-telus-page, receipts-page, etc.
 * @param locale the expected locale of the content - e.g. en-CA, fr-CA
 * @returns the query to be used to fetch the page content
 */
export const getSubscriptionPageContent = () => {
  return gql`
    ${appImage}
    ${appSeo}
    ${displayLogic}
    ${appComponentBreadcrumbs}
    ${appGenericComponent}
    ${subscriptionsControlPanel}
    ${appComponentCrossSellPromoBanners}
    query getServerSideMainApp {
      appCollection(where: { slug: "telus-my-account-shell" }, limit: 1) {
        items {
          __typename
          pages: pagesCollection(
            where: { slug: "my-telus-page" }
            limit: 1
            locale: "en-CA"
          ) {
            items {
              __typename
              slug
              seo {
                ...appSeo
              }
              labels: labelsCollection(limit: 15) {
                items {
                  ... on AppLabel {
                    __typename
                    sys {
                      id
                      spaceId
                    }
                    slug
                    text
                  }
                  ... on AppMarkdownLabel {
                    __typename
                    slug
                    text
                  }
                }
              }
              components: componentsCollection {
                items {
                  ...appComponentBreadcrumbs
                  ...appGenericComponent
                  ...subscriptionsControlPanel
                  ...appComponentCrossSellPromoBanners
                }
              }
              configs: configsCollection(limit: 15) {
                items {
                  ... on AppConfig {
                    __typename
                    slug
                    data
                  }
                }
              }
            }
          }
        }
      }
    }
  `
}
