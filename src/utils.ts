import {
  Repository,
  LocalFileConfigurationProvider,
  HttpFileConfigurationProvider,
  ScalecubeConfigurationProvider,
  HttpServerConfigurationProvider,
  LocalStorageConfigurationProvider,
  GetProviderRequest,
  ConfigurationProviderClass
} from './api';
import { ConfigurationServiceScalecube } from './provider/Scalecube';
import { ConfigurationServiceLocalStorage } from './provider/LocalStorage';
import { ConfigurationServiceFile } from './provider/FileProvider';
import { ConfigurationServiceHttp } from './provider/HttpProvider';
import { ConfigurationServiceHttpFile } from './provider/HttpFile';
import 'whatwg-fetch';

export const repositoryRequestValidator = (request: any) => request === undefined || request.repository === undefined;

export const repositoryKeyRequestValidator = (request: any) => request.key === undefined;

export const configurationTypes = {
  localFile: 'localFile' as LocalFileConfigurationProvider,
  scalecube: 'scalecube' as ScalecubeConfigurationProvider,
  httpFile: 'httpFile' as HttpFileConfigurationProvider,
  httpServer: 'httpServer' as HttpServerConfigurationProvider,
  localStorage: 'localStorage' as LocalStorageConfigurationProvider,
};

export const messages = {
  notImplemented: 'Configuration repository method not implemented yet',
  tokenNotProvided: 'Configuration repository token not provided',
  repositoryNotProvided: 'Configuration repository not provided',
  repositoryKeyNotProvided: 'Configuration repository key not provided',
  repositoryAlreadyExists: 'Configuration repository already exists',
  configProviderDoesNotExist: `ConfigProvider does not exist. One of these values is available: ${Object.keys(configurationTypes).join(', ')}`,
  getProviderInvalidRequest: `GetProvider request is not valid`,
  invalidRequest: 'Request is invalid - it should be a valid object',
  invalidRepository: 'Repository is invalid - it should be a non-empty string',
  invalidKey: 'Key is invalid - it should be a non-empty string',
  entryAlreadyExist: (key: string) => `The entry for the key "${key}" already exists`,
  entryDoesNotExist: (key: string) => `The entry for the key "${key}" has not been created yet`,
  repositoryDoesNotExist: (repository: string) => `Configuration repository ${repository} not found`,
};

export const fetchFile = (token: string, fileName: string, disableCache?: boolean) => {
  const timeStamp = disableCache ? `?=${Date.now()}`: '';
  return fetch(`${token}/${fileName}.json${timeStamp}`).then((response) => response.json())};

export const formatRepositoryToEntries = (repository: Repository) => Object.keys(repository)
  .map(key => ({ key, value: repository[key] }));

export const getRepositoryNotFoundErrorMessage = (repository: string) => `Configuration repository ${repository} not found`;

export const getRepositoryKeyNotFoundErrorMessage = (key: string) => `Configuration repository key ${key} not found`;

export const getProvider = (getProviderRequest: GetProviderRequest): ConfigurationProviderClass => {
  if (!getProviderRequest || typeof getProviderRequest !== 'object' || !getProviderRequest.configProvider) {
    throw new Error(messages.getProviderInvalidRequest);
  }

  switch (getProviderRequest.configProvider) {
    case configurationTypes.httpServer: {
      return ConfigurationServiceHttp;
    }
    case configurationTypes.scalecube: {
      return ConfigurationServiceScalecube;
    }
    case configurationTypes.httpFile: {
      return ConfigurationServiceHttpFile;
    }
    case configurationTypes.localFile: {
      return ConfigurationServiceFile;
    }
    case configurationTypes.localStorage: {
      return ConfigurationServiceLocalStorage;
    }
    default: {
      throw new Error(messages.configProviderDoesNotExist);
    }
  }
};
