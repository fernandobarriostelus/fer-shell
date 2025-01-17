import { type NextRequest, NextResponse } from 'next/server.js'
import logger from './lib/logger'
export default async function testMiddleware(request: NextRequest) {
  const { nextUrl } = request
  const { pathname } = nextUrl

  // Uncomment the next line to see the logger in action
  //   logger.info('this is a test logger', pathname)

  return NextResponse.next()
}
