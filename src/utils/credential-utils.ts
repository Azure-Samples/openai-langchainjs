import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

export const CredentialUtils = {
  getAzureCredentials() {
    return new DefaultAzureCredential();
  },

  getBearerTokenProvider() {
    const credentials = this.getAzureCredentials();
    return getBearerTokenProvider(credentials, 'https://cognitiveservices.azure.com/.default');
  },
};
