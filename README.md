# Alchemy Embedded Accounts Quickstart Dapp

This is a simple Next.js single page application where users can sign up with email using the Alchemy Signer, silently deploy a Modular Account onchain, and send UserOperations (UOs) with zero gas.

The quickstart documentation is available at [Alchemy's Account Kit docs](https://accountkit.alchemy.com/getting-started/setup.html).

It leverages Alchemy Embedded Accounts using [Account Kit](https://accountkit.alchemy.com/) and the [Alchemy Signer](https://accountkit.alchemy.com/packages/aa-alchemy/signer/overview.html), [Modular Smart Contract Account](https://github.com/alchemyplatform/modular-account), [Rundler](https://github.com/alchemyplatform/rundler) and [Gas Manager](https://docs.alchemy.com/docs/gas-manager-services).

Before running this application, copy the `.env.sample` file to a new `.env`, and follow the steps below to configure your environment variables.

## Configure Your Embedded Accounts

Create an Alchemy API key, an Embedded Accounts Config, and a Gas Manager Policy. You will use these to send UOs, authenticate logins, and sponsor gas respectively.

### Alchemy API Key

The Alchemy API Key will allow you to read and write to blockchains through Alchemy’s reliable infrastructure. In this context, the API Key will let you created Embedded Accounts onchain for your users, and send UserOperations on behalf of those accounts.

To create an API Key, go to [https://dashboard.alchemy.com](https://dashboard.alchemy.com), sign up for an account, and go through the onboarding. Then on the [apps](https://dashboard.alchemy.com/apps) page, create an Alchemy app for the Optimism Sepolia network.

Click the API Key button in the top right corner and copy-paste it into the `.env` file of your application as an environment variable called `ALCHEMY_API_KEY`.

### Alchemy Embedded Accounts Config

The Embedded Accounts Config enables magic auth on your app’s domain by configuring the Alchemy Signer, which securely stores the user’s private key in a non-custodial [secure enclave](https://docs.turnkey.com/security/our-approach). It is responsible for authenticating a user via email or passkey using this config, managing a user’s, and signing messages to send UserOperations. Check out the [AlchemySigner docs](https://accountkit.alchemy.com/packages/aa-alchemy/signer/overview.html) for more details.

To create an Embedded Accounts Config, go to the [embedded accounts page](https://dashboard.alchemy.com/accounts) of the Alchemy dashboard and click the “New account config” button. Then:

1. Name your config.
2. Set `http://localhost:3000` as the redirect URL. NextJS apps by default are hosted locally at port 3000, and you will want to direct the user back to the URL where your application is hosted to authenticate them.
3. [optional] Customize the logo, “Sign In” button color, and support URL of the email.

Next, apply this config to the Alchemy App you created in the previous step. Doing this will allow you send requests to Alchemy Signer via the Account Kit SDKs you installed before.

### Alchemy Gas Manager Policy

The Gas Manager Policy defines a config for Alchemy’s ERC-4337 Paymaster implementation, allowing you to sponsor your users’ gas fees. To learn more about Paymasters, check out Alchemy’s [blog post](https://www.alchemy.com/overviews/what-is-a-paymaster).

To create a Gas Manager Policy, go to the [gas manager](https://dashboard.alchemy.com/gas-manager) page of the Alchemy dashboard and click the “Create new policy” button. Then:

1. Name your policy.
2. Associate the policy with the Alchemy App you created in the last step by selecting it in the “Policy details” section.
3. Select the default configurations for the remaining sections.

Once you create the policy, make sure to activate the policy by clicking the “Activate” button on the policy’s details page. Copy the Policy ID below the policy’s header and copy-paste it into the `.env` file of your application as an environment variable called `NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID`.

## Run Locally @ [http://localhost:3000](http://localhost:3000)

Ensure your `.env` has values for `ALCHEMY_API_KEY` and `NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID`.

Then, run:

```bash
npm install
npm run build
npm run dev
```
