import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface SSOClientOptions {
  clientId: string;
  clientSecret: string;
  ssoUrl: string;
  callbackUrl: string;
}

interface QueryParams {
  [key: string]: string | undefined;
}

export default class SSOClient {
  private clientId: string;
  private clientSecret: string;
  private ssoUrl: string;
  private callbackUrl: string;

  constructor({ clientId, clientSecret, ssoUrl, callbackUrl }: SSOClientOptions) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.ssoUrl = ssoUrl;
    this.callbackUrl = callbackUrl;
  }

  getLoginUrl(): string {
    return `${this.ssoUrl}/sso/login?client_id=${this.clientId}&callback_url=${encodeURIComponent(this.callbackUrl)}`;
  }

  handleCallback(query: QueryParams): string {
    const token = query.token;
    if (!token) {
      throw new Error('No token received');
    }
    return token;
  }

  async fetchUserData(token: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(`${this.ssoUrl}/api/user/me`, {
        client_id: this.clientId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Client-Secret': this.clientSecret,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch user data: ${error.response ? error.response.data.message : error.message}`);
    }
  }

  renderSaveTokenPage(token: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Save Token</title>
        <script>
          window.onload = function () {
            localStorage.setItem('token', '${token}');
            window.location.href = '/';
          };
        </script>
      </head>
      <body>
        <p>Saving your session securely...</p>
      </body>
      </html>
    `;
  }
}
