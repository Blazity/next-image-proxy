import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'isomorphic-unfetch'
import stream, { Stream } from 'stream'
import merge from 'lodash.merge'
import UserAgent from 'user-agents'
import { DeepPartial, Options } from './types'

export function withImageProxy(passedOptions?: DeepPartial<Options>) {
  const defaultOptions: Options = {
    whitelistedPatterns: [],
    fallbackUrl: '',
    messages: {
      wrongFormat: 'Image url not provided or has wrong format',
      notWhitelisted: 'Provided image url is not whitelisted',
      imageFetchError: "Couldn't fetch the image",
    },
  }

  const options: Options = merge(defaultOptions, passedOptions)

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const imageUrl = req.query.imageUrl

    if (!imageUrl || (imageUrl && Array.isArray(imageUrl))) {
      res.status(400).send({ message: options.messages.wrongFormat })
      return
    }

    const isAllowed = isUrlWhitelisted(imageUrl)

    if (!isAllowed) {
      res.status(422).send({ message: options.messages.notWhitelisted })
      return
    }

    const imageBlob = await fetchImageBlob(imageUrl)

    if (!imageBlob) {
      handleFallback()
      return
    }

    pipeImage(imageBlob)

    function pipeImage(imageBlob: ReadableStream<Uint8Array>) {
      const passThrough = new Stream.PassThrough()

      stream.pipeline(imageBlob as unknown as NodeJS.ReadableStream, passThrough, (err) => {
        if (err) {
          console.log(err)
          handleFallback()
          return
        }
      })
      passThrough.pipe(res)
    }

    function handleFallback() {
      if (options.fallbackUrl.trim()) {
        res.redirect(options.fallbackUrl)
      } else {
        res.status(422).send({ message: options.messages.imageFetchError })
      }
    }

    async function fetchImageBlob(url: string) {
      return await fetch(url, {
        headers: { 'user-agent': new UserAgent().toString() },
      }).then((data) => data.body)
    }

    function isUrlWhitelisted(url: string) {
      return options.whitelistedPatterns.some((singleHost) => {
        return url.match(singleHost)
      })
    }
  }
}
