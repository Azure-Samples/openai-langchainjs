---
page_type: sample
languages:
  - azdeveloper
  - javascript
  - typescript
  - nodejs
  - bicep
products:
  - azure
  - azure-openai
urlFragment: tutorial
name: Azure OpenAI with LangChain.js Sample
description: Build your AI application using LLMs with LangChain.js, TypeScript and Azure OpenAI.
---

<!-- Learn samples onboarding: https://review.learn.microsoft.com/en-us/help/contribute/samples/process/onboarding?branch=main -->
<!-- prettier-ignore -->
<div align="center">

## Overview

This sample project demonstrates how to use Azure OpenAI using [LangChain.js](https://js.langchain.com/) and the [`@langchain/openai`](https://www.npmjs.com/package/@langchain/openai) package.

## Prerequisites

You need to install following tools to run the sample:

- [Node.js LTS](https://nodejs.org/download/)
- [Azure Developer CLI](https://aka.ms/azure-dev/install)
- [PowerShell 7+](https://github.com/powershell/powershell) _(for Windows users only)_
  - **Important**: Ensure you can run `pwsh.exe` from a PowerShell command. If this fails, you likely need to upgrade PowerShell.
  - Instead of Powershell, you can also use Git Bash or WSL to run the Azure Developer CLI commands.

In order to deploy the Azure OpenAI resources, you also need the following:

- **Azure account**. If you're new to Azure, [get an Azure account for free](https://azure.microsoft.com/free) to get free Azure credits to get started. If you're a student, you can also get free credits with [Azure for Students](https://aka.ms/azureforstudents).
- **Azure subscription with access enabled for the Azure OpenAI service**. You can request access with [this form](https://aka.ms/oaiapply).
- **Azure account permissions**:
  - Your Azure account must have `Microsoft.Authorization/roleAssignments/write` permissions, such as [Role Based Access Control Administrator](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#role-based-access-control-administrator-preview), [User Access Administrator](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#user-access-administrator), or [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner). If you don't have subscription-level permissions, you must be granted [RBAC](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#role-based-access-control-administrator-preview) for an existing resource group and [deploy to that existing group](docs/deploy_existing.md#resource-group).
  - Your Azure account also needs `Microsoft.Resources/deployments/write` permissions on the subscription level.

## Run the sample

First, [fork](https://github.com/Azure-Samples/open-langchainjs/fork) and clone the repository or [open it in GitHub Codespaces](https://codespaces.new/Azure-Samples/openai-langchainjs?hide_repo_select=true&ref=main&quickstart=true).

In the project directory, open a terminal and run the following command to install the dependencies:

```bash
npm install
```

### Create AzureOpenAI Resources

> [!INFO]
> See the [cost estimation](./cost.md) details for running this sample on Azure.

Open a terminal in the project directory and run the following commands to create the Azure resources needed to run this sample:

```bash
azd auth login
azd up
```

You will be prompted to select a base location for the resources. If you're unsure of which location to choose, select `eastus2`.

Once the deployment is complete a `.env` file will be created at the root of the project with the necessary environment variables to run the sample.

You only need to deploy the resource once.

### Run the code

To run the sample, use the following command:

```bash
npm start
```

This will run the sample and output the results to the console, you should see an answer to the "Hello World!" prompt.

Open the file [`src/index.ts`](src/index.ts) to see how the code works.

## Clean up

To clean up all the Azure resources created by this sample:

1. Run `azd down --purge`
2. When asked if you are sure you want to continue, enter `y`

The resource group and all the resources will be deleted.

## FAQ

You can find answers to frequently asked questions in the [FAQ](./faq.md).

## Next steps

Here are some resources to learn more about the technologies used in this sample:

- [Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/overview)
- [LangChain.js documentation](https://js.langchain.com)
- [Generative AI For Beginners](https://github.com/microsoft/generative-ai-for-beginners)
- [Ask YouTube: LangChain.js + Azure Quickstart sample](https://github.com/Azure-Samples/langchainjs-quickstart-demo)
- [Serverless AI Chat with RAG using LangChain.js](https://github.com/Azure-Samples/serverless-chat-langchainjs/)
- [Chat + Enterprise data with Azure OpenAI and Azure AI Search](https://github.com/Azure-Samples/azure-search-openai-javascript)

You can also find [more Azure AI samples here](https://github.com/Azure-Samples/azureai-samples).
