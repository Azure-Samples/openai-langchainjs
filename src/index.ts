import process from 'node:process';
import { AzureChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import { CredentialUtils } from './utils/credential-utils.js';

dotenv.config();

async function main() {
  const azureOpenAIApiDeploymentName: string = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME ?? '';

  const azureOpenAIApiVersion: string = process.env.AZURE_OPENAI_API_VERSION ?? '';

  const azureADTokenProvider = CredentialUtils.getBearerTokenProvider();

  const llm = new AzureChatOpenAI({
    azureOpenAIApiDeploymentName,
    azureOpenAIApiVersion,
    azureADTokenProvider,
  });

  const result = await llm.invoke('Hello World!');
  console.log(result.content);
}

try {
  await main();
} catch (error) {
  console.error('Error running sample:', error);
}
