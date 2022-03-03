<div align="center">
  <h1>Next.js Image Proxy</h1>
  <p>Image proxy for Next.js. Makes it possible to use dynamic domains in next/image component.</p>
  <br />
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@blazity/next-image-proxy"><img alt="npm version badge" src="https://img.shields.io/npm/v/@blazity/next-image-proxy"></a>
  <img alt="license badge" src="https://img.shields.io/npm/l/@blazity/next-image-proxy">
</div>

<br />

## ❔ Motivation

This library makes it possible to use `next/image` with dynamic domains. If you work with external providers, like Facebook, Instagram, Etsy, Medium, and others, the images often have dynamic subdomains. For example, you might get the first image from `scontent-akl1-1.cdninstagram.com` and the second one from `scontent-akl3-1.cdninstagram.com`. Although adding them one by one to the config could work temporarily, it would not be reliable since they can change at any time. The whole issue could be resolved by adding a regex pattern to `next.config.js`, but unfortunately, Next.js doesn't support that.

If you want to follow the discussion about Next.js supporting it outside of the box, please refer to this [Discussion](https://github.com/vercel/next.js/discussions/18429) and this [Pull Request](https://github.com/vercel/next.js/pull/27345)

You have to remember that there're some cons:

- You can create a security loophole if your regex isn't strict enough
- Since it is a proxy, it will increase bandwidth costs. But the increase will be marginal unless you're working on big scale project (i.e. mils of requests per month)

## 🧰 Installation

```
$ npm i --save @blazity/next-image-proxy

# or

$ yarn add @blazity/next-image-proxy
```

## 💻 Use

It is really simple to setup, you just need to add a new API route that exports one function. The name of the endpoint is up to you.

```tsx
// pages/api/imageProxy.ts

import { withImageProxy } from '@blazity/next-image-proxy'

export default withImageProxy({ whitelistedPatterns: [/^https?:\/\/(.*).medium.com/] })
```

and now you prefix the image you want to use:

```tsx
import NextImage from 'next/image'

export function SomeComponent() {
  const actualImageUrl = 'https://cdn-images-1.medium.com/max/1024/1*xYoAR2XRmoCmC9SONuTb-Q.png'

  return <NextImage src={`/api/imageProxy?imageUrl=${actualImageUrl}`} width={700} height={300} />
}
```

## 🤲🏻 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/Blazity/next-saas-starter/issues/new) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
