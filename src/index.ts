import process from 'node:process';
import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();
const credential = new DefaultAzureCredential();

// This should be run in azureADTokenProvider delegate function,
// but currently it's not possible to use async functions there.
const { token } = await credential.getToken('https://cognitiveservices.azure.com/.default');

const openai = new AzureOpenAI({
  azureADTokenProvider: () => token,
});

const result = await openai.chat.completions.create({
  model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME ?? '',
  messages: [{ role: 'user', content: 'Say hello!' }],
  max_tokens: 32,
});

console.log(result.choices[0].message?.content);
