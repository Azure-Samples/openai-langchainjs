targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

param resourceGroupName string = ''

@description('Location for the OpenAI resource group')
@allowed(['australiaeast', 'canadaeast', 'eastus', 'eastus2', 'francecentral', 'japaneast', 'northcentralus', 'swedencentral', 'switzerlandnorth', 'uksouth', 'westeurope'])
@metadata({
  azd: {
    type: 'location'
  }
})
param location string // Set in main.parameters.json
param openAiSkuName string = 'S0'

param chatModelName string // Set in main.parameters.json
param chatDeploymentName string = chatModelName
param chatModelVersion string // Set in main.parameters.json
param chatDeploymentCapacity int = 30
param embeddingsModelName string // Set in main.parameters.json
param embeddingsModelVersion string // Set in main.parameters.json
param embeddingsDeploymentName string = embeddingsModelName
param embeddingsDeploymentCapacity int = 30

// Id of the user or app to assign application roles
param principalId string = ''

var abbrs = loadJsonContent('abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

// Organize resources in a resource group
resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

module openAi 'core/ai/cognitiveservices.bicep' = {
  name: 'openai'
  scope: resourceGroup
  params: {
    name: '${abbrs.cognitiveServicesAccounts}${resourceToken}'
    location: location
    tags: tags
    sku: {
      name: openAiSkuName
    }
    disableLocalAuth: true
    deployments: [
      {
        name: chatDeploymentName
        model: {
          format: 'OpenAI'
          name: chatModelName
          version: chatModelVersion
        }
        sku: {
          name: 'Standard'
          capacity: chatDeploymentCapacity
        }
      }
      {
        name: embeddingsDeploymentName
        model: {
          format: 'OpenAI'
          name: embeddingsModelName
          version: embeddingsModelVersion
        }
        capacity: embeddingsDeploymentCapacity
      }
    ]
  }
}

// Managed identity roles assignation
// ---------------------------------------------------------------------------

// User role
module openAiRoleUser 'core/security/role.bicep' = {
  scope: resourceGroup
  name: 'openai-role-user'
  params: {
    principalId: principalId
    // Cognitive Services OpenAI User
    roleDefinitionId: '5e0bd9bd-7b93-4f28-af87-19fc36ad61bd'
    principalType: 'User'
  }
}

output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output AZURE_RESOURCE_GROUP string = resourceGroup.name

output AZURE_OPENAI_API_ENDPOINT string = 'https://${openAi.outputs.name}.openai.azure.com'
output AZURE_OPENAI_API_DEPLOYMENT_NAME string = chatDeploymentName
output AZURE_OPENAI_API_MODEL string = chatModelName
output AZURE_OPENAI_API_MODEL_VERSION string = chatModelVersion
output AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME string = embeddingsDeploymentName
output AZURE_OPENAI_API_EMBEDDINGS_MODEL string = embeddingsModelName
output AZURE_OPENAI_API_EMBEDDINGS_MODEL_VERSION string = embeddingsModelVersion