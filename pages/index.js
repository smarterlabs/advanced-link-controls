import { Page } from "@shopify/polaris"
import ConfigForm from '../components/config-form'

export default function Index(props) {
  console.log(`Index props`, props)
  return (
    <Page>
      <br /><br />
      <ConfigForm fetch={props.fetch} />
    </Page>
  );
}
