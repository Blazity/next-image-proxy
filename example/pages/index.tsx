import NextImage from 'next/image'

export default function Homepage() {
  return (
    <>
      <NextImage
        src="/api/imageProxy?imageUrl=https://cdn-images-1.medium.com/max/1024/1*xYoAR2XRmoCmC9SONuTb-Q.png"
        width={700}
        height={300}
      />
      <NextImage
        src="/api/imageProxy?imageUrl=https://cdn-images-1.medium.com/max/300/1*TOh1Ybtg_AmyvhA9Dgc65Q.png"
        width={700}
        height={300}
      />
      <NextImage
        src="/api/imageProxy?imageUrl=https://cdn-images-1.medium.com/max/287/1*ObtObJyNveLZtKF4eTgeLw.png"
        width={700}
        height={300}
      />
    </>
  )
}
