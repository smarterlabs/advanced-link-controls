import { useState, useEffect } from 'react'
import {
  Form,
  FormLayout,
  SettingToggle,
  Button,
  TextStyle,
} from "@shopify/polaris"
import { useAppBridge } from '@shopify/app-bridge-react'
import useShopifyRest from './use-shopify-rest'
import axios from 'axios'


export default function ConfigForm(props) {
  const client = useShopifyRest()
  const [config, setConfig] = useState({
    newTab: false,
    secureLinks: false,
    forceHttps: false,
  })
  const app = useAppBridge()


  console.log(`app`, app)

  async function fetchConfig(){
    const query = window.location.search
    // Get shop param
    if(!query) return
    const shopPart = query.split(`&`).find(param => param.startsWith(`shop=`))
    if(!shopPart) return
    const shop = shopPart.split(`=`)[1]
    console.log(`shop`, shop)
    // Fetch all themes
    const configRes = await props.fetch(`/config`, {
      method: `GET`,
    })
    const data = await configRes.json()
    console.log(`data`, data)
    

  }

  useEffect(() => {
    fetchConfig()
  }, [])

  function updateConfig(obj){
    setConfig({
      ...config,
      ...obj,
    })
  }

  return (
    <Form onSubmit={e => {
      e.preventDefault()
      console.log(`Submit`)
    }}>
      <FormLayout>


        <SettingToggle
          action={{
            content: config.newTab ? 'Disable' : 'Enable',
            onAction: () => updateConfig({ newTab: !config.newTab }),
          }}
          enabled={config.newTab}
        >
          Open all external links in a new tab<br />
          <TextStyle variation="strong">{config.newTab ? `Enabled` : `Disabled`}</TextStyle>
        </SettingToggle>


        <SettingToggle
          action={{
            content: config.secureLinks ? 'Disable' : 'Enable',
            onAction: () => updateConfig({ secureLinks: !config.secureLinks }),
          }}
          enabled={config.secureLinks}
        >
          Secure all external links<br />
          <TextStyle variation="strong">{config.secureLinks ? `Enabled` : `Disabled`}</TextStyle>
        </SettingToggle>


        <SettingToggle
          action={{
            content: config.forceHttps ? 'Disable' : 'Enable',
            onAction: () => updateConfig({ forceHttps: !config.forceHttps }),
          }}
          enabled={config.forceHttps}
        >
          Force HTTPS on all external links<br />
          <TextStyle variation="strong">{config.forceHttps ? `Enabled` : `Disabled`}</TextStyle>
        </SettingToggle>



        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}