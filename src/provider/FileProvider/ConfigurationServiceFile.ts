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
  
  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
  
  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
  
  entries(request: EntriesRequest): Promise<any> { // EntriesResponse
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
  
    return Promise.resolve({});
  };
  
  fetch(request: FetchRequest): Promise<any> { // FetchResponse
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }
  
    return Promise.resolve({});
  }
  
  save(request: SaveRequest): Promise<SaveResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
}
