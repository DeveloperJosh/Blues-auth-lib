# SSOClient Documentation

This class facilitates Single Sign-On (SSO) integration, handling login URL generation, callback processing, user data fetching, and token saving.

## Dependencies

* axios: Handles HTTP requests.
* dotenv: Loads environment variables from a `.env` file.

## Installation 

* Assumes you have Node.js and npm installed. 
* You'll need to install the required dependencies using a package manager like npm.

## Usage

* Import the `SSOClient` class into your project.
* Load your environment variables (clientId, clientSecret, ssoUrl, callbackUrl) from a `.env` file.
* Create an instance of the `SSOClient` class, providing the necessary configuration options.
* Use the `getLoginUrl` method to get the URL to initiate the SSO login process.
* Handle the callback after the SSO login (e.g., in an Express route) using the `handleCallback` method to extract the token.
* Fetch user data using the `fetchUserData` method, providing the extracted token.
* Render a page to save the token in local storage using the `renderSaveTokenPage` method.

## Class: `SSOClient`

### Constructor

* **`clientId`**: Your application's client ID from the SSO provider.
* **`clientSecret`**: Your application's client secret from the SSO provider.
* **`ssoUrl`**: The base URL of the SSO provider.
* **`callbackUrl`**: The URL in your application where the SSO provider will redirect after login.

### Methods

* **`getLoginUrl()`**: Returns the URL to initiate the SSO login process.
* **`handleCallback(query)`**: Extracts the token from the callback query parameters. Throws an error if no token is found.
* **`fetchUserData(token)`**: Fetches user data from the SSO provider's API using the provided token. Returns a Promise that resolves with the user data or rejects with an error.
* **`renderSaveTokenPage(token)`**: Generates an HTML page that saves the token in local storage and redirects to the root path ('/').

## Important Notes

* Ensure you have a `.env` file with the required environment variables.
* Handle potential errors from `handleCallback` and `fetchUserData`.
* Customize the `renderSaveTokenPage` as needed for your application's flow.