import "isomorphic-fetch";
import { gql } from "apollo-boost";

export function RECURRING_CREATE(url) {
  return gql`
    mutation {
      appSubscriptionCreate(
          name: "Standard plan"
          returnUrl: "${url}"
          trialDays: 7
          test: true
          lineItems: [
          {
            plan: {
              appUsagePricingDetails: {
                  cappedAmount: { amount: 9.99, currencyCode: USD }
                  terms: "$1 for 1000 emails"
              }
            }
          }
          {
            plan: {
              appRecurringPricingDetails: {
                price: { amount: 4.99, currencyCode: USD },                   
                interval: EVERY_30_DAYS
              }
            }
          }
          ]
        ) {
            userErrors {
              field
              message
            }
            confirmationUrl
            appSubscription {
              id
            }
        }
    }`;
}

export const getSubscriptionUrl = async ctx => {
  const { client } = ctx;
   const confirmationUrl = await client
    .mutate({
      mutation: RECURRING_CREATE(process.env.HOST)
    })
    .then(response => response.data.appSubscriptionCreate.confirmationUrl);
    // console.log(confirmationUrl)
  return ctx.redirect(confirmationUrl);
};
