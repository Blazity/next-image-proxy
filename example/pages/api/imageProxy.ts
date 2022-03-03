import { withImageProxy } from '@blazity/next-image-proxy'

export default withImageProxy({ whitelistedPatterns: [/^https?:\/\/(.*).medium.com/] })
