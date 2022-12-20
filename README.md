# HalfMoonBK Site Rebuild

## Running the App

### Node/npm

NVM should be installed; an `.nvrmc` file is provided.

This project currently uses **Node v14.21.2**, with npm version **6.14.17**.

## Setting up a new deploy

### Fetching the environment variables (tested as working on node v14.21.2)

1. Login to dotenv-vault: `npx dotenv-vault login`
2. In the browser that's opened on success; log in to generate a local `.env.me`
3. After that, run `npx dotenv-vault open` to access this project's `.env` files
4. Pull down the `.env` files (they're the same):
   1. ```
      npx dotenv-vault pull
      npx dotenv-vault pull production
      ```

### Adding the environment variables to Netlify

**As of 20-Dec-2022, the `dotenv` vault key method does not work, likely due to outdated `gatsby-plugin-netlify` in use.**

1. Add the `GATSBY_` prefixed environment variables to the `app.netlify` page.
2. Deploy the site.
