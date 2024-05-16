import { CredentialUtils } from './utils/credentialUtils';
import { AzureChatOpenAI } from '@langchain/openai';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const azureOpenAIApiDeploymentName: string = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME ?? '';

  const azureOpenAIApiVersion: string = process.env.AZURE_OPENAI_API_VERSION ?? '';

  const azureChatModel: string = process.env.AZURE_CHAT_MODEL ?? '';

  const bearerTokenProvider = CredentialUtils.getBearerTokenProvider();

  const llm = new AzureChatOpenAI({
    azureOpenAIApiDeploymentName,
    azureOpenAIApiVersion,
    azureADTokenProvider: bearerTokenProvider,
    modelName: azureChatModel,
  });

  const result = await llm.invoke('Hello World!');
  console.log(result.content);
}

main().catch((err) => {
  console.error('Error running sample:', err);
});
