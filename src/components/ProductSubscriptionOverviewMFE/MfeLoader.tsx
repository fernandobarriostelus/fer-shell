/* eslint-disable import/no-unresolved */
import dynamic from 'next/dynamic'

import { Brand } from '@/config'
import type { ModalSubscription, Subscription } from '@/lib/types/Subscription'

interface PSOMFEProps {
  theme?: Brand
  brand?: Brand
  onRecordList?: (subscriptions: Subscription[]) => void
  onCtaPress?: (subscription: Subscription) => void
  onLinkPress?: (subscription: Subscription) => void
  onModalCtaPress?: (modalSubscription: ModalSubscription) => void
  onError?: (error: unknown) => void
  customerId: string
  hostUrl?: string
  locale?: string
  prov?: string
  errorFallback?: React.ReactNode
  correlationId: string
  commerceSessionId?: string
  generalConfig?: Record<string, string>
}

const MFE = dynamic<PSOMFEProps>(
  async () => {
    const mfe = await import('product_subscription_overview_mfe').catch(() => ({
      default: ({ errorFallback }: PSOMFEProps) => {
        return errorFallback
      }
    }))
    return mfe.default as React.ComponentType<PSOMFEProps>
  },
  {
    ssr: false
  }
)

export default MFE
