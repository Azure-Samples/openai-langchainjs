import { ClientSecretCredential, getBearerTokenProvider } from '@azure/identity';

import * as dotenv from 'dotenv';
dotenv.config();

export class CredentialUtils {
  static getAzureCredentials(): ClientSecretCredential {
    const tenantId: string = process.env.AZURE_TENANT_ID ?? '';
    const clientId: string = process.env.AZURE_CLIENT_ID ?? '';
    const clientSecret: string = process.env.AZURE_CLIENT_SECRET ?? '';
    return new ClientSecretCredential(tenantId, clientId, clientSecret);
  }

  static getBearerTokenProvider() {
    const tenantId: string = process.env.AZURE_TENANT_ID ?? '';
    const clientId: string = process.env.AZURE_CLIENT_ID ?? '';
    const clientSecret: string = process.env.AZURE_CLIENT_SECRET ?? '';
    const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);
    return getBearerTokenProvider(credentials, 'https://cognitiveservices.azure.com/.default');
  }
}
