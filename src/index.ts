import process from 'node:process';
import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

const credential = new DefaultAzureCredential();
const openai = new AzureOpenAI({
  azureADTokenProvider: getBearerTokenProvider(credential, 'https://cognitiveservices.azure.com/.default'),
});

const result = await openai.chat.completions.create({
  model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME ?? '',
  messages: [{ role: 'user', content: 'Say hello!' }],
  max_tokens: 32,
});

console.log(result.choices[0].message?.content);
