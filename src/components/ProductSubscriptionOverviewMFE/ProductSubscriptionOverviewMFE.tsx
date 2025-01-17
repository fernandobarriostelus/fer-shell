import { Box, FlexGrid } from '@telus-uds/components-web'
import { useState } from 'react'

import MFE from './MfeLoader'

const ProductSubscriptionOverviewMFE: React.FC = () => {
  const [hasError, setHasError] = useState(false)
  const hostUrl = ''
  const errorFallback = <Box bottom={7}>Error</Box>

  if (hasError) {
    // alloyTodo, maybe load an error event pageLoaded here
    return errorFallback
  }

  const onError = () => {
    setHasError(true)
  }

  return (
    <Box bottom={7}>
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col>
            <MFE
              theme={'telus'}
              brand={'telus'}
              customerId={'733739916'}
              locale={'en-CA'}
              prov={'bc'}
              onError={onError}
              errorFallback={errorFallback}
              generalConfig={{
                expiringCardLinkHref: '/my-telus/subscriptions/renew',
                orderShippedCardLinkHref: 'https://self-install.com',
                manageSubscriptionLinkHref: '/my-telus/subscriptions/manage',
                notCompletedCardHeaderLinkHref:
                  '/my-telus/subscriptions/manage-payment',
                lastPaymentDeclinedCardLinkHref:
                  '/my-telus/subscriptions/manage-payment',
                mfeProxyUrl: '/my-telus/subscriptions/api/proxyPsoBff'
              }}
              // The expectation is that hostUrl will be undefined for the live environments but present in env.development
              // so that local reaches out to the live PSO BBF
              hostUrl={hostUrl}
              correlationId={'123'}
              commerceSessionId={'123'}
            />
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </Box>
  )
}

export default ProductSubscriptionOverviewMFE
