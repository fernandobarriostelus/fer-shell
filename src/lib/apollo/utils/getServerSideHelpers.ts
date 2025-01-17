import {
  configToCamelCaseSlug,
  itemsToCamelCaseSlug,
  labelsToCamelCaseSlug,
  normalizeGqlResponse
} from '@telus/hs-contentful-toolkit'

import { fetchPageGraphQL } from '../queries/getServerSideContent'

import logger from '@/lib/logger'
import {
  AppComponentFaq,
  AppComponentTermsAndConditions,
  AppConfig,
  AppGenericComponent,
  AppLabel,
  AppPage,
  AppSeo,
  OpenGraph
} from 'src/codegen/types'
import { Clean, RenameByT } from 'src/lib/types/utils'

type GetElementType<T extends unknown[]> = T extends Array<infer U> ? U : never

export type Generic = RenameByT<
  { configsCollection: 'configs'; labelsCollection: 'labels'; imagesCollection: 'images' },
  AppGenericComponent
>

export type FaqSection = RenameByT<{ questionsCollection: 'questions' }, AppComponentFaq>

export type TermsAndConditionsSection = RenameByT<
  { commonTermsAndConditionsItemsCollection: 'commonTermsAndConditionsItems' },
  Clean<AppComponentTermsAndConditions>
>

export type RenamedAppSeo = Omit<AppSeo, 'openGraph'> & {
  openGraph: RenameByT<{ imagesCollection: 'images' }, OpenGraph>
}

type RenamedAppPage = Omit<
  RenameByT<
    {
      configsCollection: 'configs'
      labelsCollection: 'labels'
      componentsCollection: 'components'
    },
    AppPage
  >,
  'components'
> & {
  components: Generic[]
} & {
  seo?: RenamedAppSeo
}

type FetchPageGraphQL = Awaited<ReturnType<typeof fetchPageGraphQL>>
type Page = GetElementType<
  Exclude<Exclude<FetchPageGraphQL['data'], null | undefined>['pages'], null | undefined>['items']
>

export function parseContentfulPage(page: Page) {
  logger.info(`Parsing contentful page: ${JSON.stringify(page)}`)
  const normalizedContent = normalizeGqlResponse<Clean<RenamedAppPage>>(page ?? [])
  logger.info(`Parsing completed: ${JSON.stringify(normalizedContent)}`)

  return {
    ...normalizedContent,
    components: normalizedContent.components
      ? normalizedContent.components.reduce<{
          [key: string]: Generic
        }>(itemsToCamelCaseSlug as (acc: unknown, item: unknown) => Record<string, Generic>, {})
      : null,
    configs: normalizedContent.configs
      ? normalizedContent.configs.reduce<{
          [key: string]: AppConfig['data']
        }>(configToCamelCaseSlug, {})
      : null,
    labels: normalizedContent.labels
      ? normalizedContent.labels.reduce<{
          [key: string]: AppLabel['text']
        }>(labelsToCamelCaseSlug, {})
      : null
  }
}

export type ParsedContentfulPage = ReturnType<typeof parseContentfulPage>

export function parseContentfulModel(contentfulModel: FetchPageGraphQL['data']) {
  const pages = contentfulModel?.pages?.items ?? []
  const normalizePages = pages?.reduce<ParsedContentfulPage[]>(
    (pages, page) => pages.concat(parseContentfulPage(page)),
    []
  )

  return normalizePages
}
