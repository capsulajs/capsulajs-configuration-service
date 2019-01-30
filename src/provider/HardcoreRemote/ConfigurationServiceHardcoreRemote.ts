import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import {
  ConfigurationService,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  DeleteRequest,
  DeleteResponse,
  EntriesRequest,
  EntriesResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse,
} from '../../api';
import { messages, repositoryKeyRequestValidator, repositoryRequestValidator } from '../../utils';

const endpoint = '/io.scalecube.configuration.api.ConfigurationService';

export class ConfigurationServiceHardcoreRemote<T=any> implements ConfigurationService<T> {
  constructor(private token: string, private dispatcher: Dispatcher) {
    if (!this.token) {
      throw new Error(messages.tokenNotProvided);
    }
  };

  private prepRequest(request: any): any {
    return {
      token: {
        token: this.token,
        issuer: 'Auth0'
      },
      ...request
    };
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    return this.dispatcher.dispatch(`${endpoint}/createRepository`, this.prepRequest(request));
  }
  
  delete(request: DeleteRequest): Promise<DeleteResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    return this.dispatcher.dispatch(`${endpoint}/delete`, this.prepRequest(request));
  }
  
  entries<T>(request: EntriesRequest): Promise<EntriesResponse<T>> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    return this.dispatcher.dispatch(`${endpoint}/entries`, this.prepRequest({}));
  }
  
  fetch(request: FetchRequest): Promise<FetchResponse<T>> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
  
    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }
    
    return this.dispatcher.dispatch(`${endpoint}/fetch`, this.prepRequest(request));
  }
  
  save(request: SaveRequest<T>): Promise<SaveResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
  
    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }
    
    return this.dispatcher.dispatch(`${endpoint}/save`, this.prepRequest(request));
  }
}
