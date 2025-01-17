export const URL = `${process.env.NEXT_PUBLIC_CONTENTFUL_URL as string}`
export const LOCATION = `/content/v1/spaces/${
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE as string
}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT as string}`
export const AUTHORIZATION = `Bearer ${process.env.CONTENTFUL_TOKEN as string}`

export const getLocation = (contentfulEnv: string | undefined) => {
  return contentfulEnv
    ? `/content/v1/spaces/${
        process.env.NEXT_PUBLIC_CONTENTFUL_SPACE as string
      }/environments/${contentfulEnv}`
    : LOCATION
}
