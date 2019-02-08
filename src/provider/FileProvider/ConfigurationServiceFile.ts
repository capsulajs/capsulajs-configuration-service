import fs from 'fs';
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
import { messages, repositoryRequestValidator, repositoryKeyRequestValidator } from '../../utils';

export class ConfigurationServiceFile<T=any> implements ConfigurationService<T> {
  private storage: any;
  
  constructor(private filename: string) {
    if (!this.filename) {
      throw new Error(messages.filenameNotProvided);
    }
    
    let content: string;
    
    try {
      content = fs.readFileSync(filename,'utf8');
    } catch {
      throw new Error(messages.fileOrDirectoryNotExist);
    }
  
    try {
      this.storage = JSON.parse(content);
    } catch {
      throw new Error(messages.fileNotValid);
    }
  }
  
  private getRepository(repository: string) {
    const data = this.storage[repository];
    if (!data) {
      return Promise.reject(
        new Error(`Configuration repository ${repository} not found`)
      );
    }
    return Promise.resolve(data);
  }
  
  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
  
  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
  
  entries(request: EntriesRequest): Promise<EntriesResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
  
    return this.getRepository(request.repository).then(repository => ({
      entries: Object.keys(repository).map(key => ({ key, value: repository[key] }))
    }));
  };
  
  fetch(request: FetchRequest): Promise<FetchResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }
  
    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then(repository =>
        Object.keys(repository).indexOf(request.key) >= 0
          ? resolve({ key: request.key, value: repository[request.key] })
          : reject(new Error(`Configuration repository key ${request.key} not found`))
      ).catch(reject);
    });
  }
  
  save(request: SaveRequest): Promise<SaveResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
}
