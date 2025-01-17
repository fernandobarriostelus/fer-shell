import { gql } from '@apollo/client'

export const appComponentBreadcrumbs = gql`
  fragment appComponentBreadcrumbs on AppComponentBreadcrumbs {
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
`
