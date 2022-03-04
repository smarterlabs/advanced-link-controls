import createApp from '@shopify/app-bridge'

export default function useAppBridge(){
  const app = createApp({
    apiKey: process.env.SHOPIFY_API_KEY,
    host: host,
  })

}