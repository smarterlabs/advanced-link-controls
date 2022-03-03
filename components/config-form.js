import { useState } from 'react'
import {
  Form,
  FormLayout,
  SettingToggle,
  Button,
  TextStyle,
} from "@shopify/polaris"

export default function ConfigForm() {
  const [config, setConfig] = useState({
    newTab: false,
    secureLinks: false,
    forceHttps: false,
  })

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