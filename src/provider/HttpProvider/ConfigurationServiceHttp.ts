import { Dispatcher, AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';
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
  Repository
} from '../../api';
import {
  messages,
  repositoryRequestValidator,
  repositoryKeyRequestValidator,
  formatRepositoryToEntries,
  getRepositoryNotFoundErrorMessage,
  getRepositoryKeyNotFoundErrorMessage
} from '../../utils';

export class ConfigurationServiceHttp implements ConfigurationService {
  private dispatcher: Dispatcher;

  constructor(private token: string) {
    if (!this.token) {
      throw new Error(messages.tokenNotProvided);
    }
    this.dispatcher = new AxiosDispatcher(`${token}`);
  }

  private getRepository(repository: string): Promise<Repository> {
    return new Promise((resolve, reject) => {
      this.dispatcher.dispatch<Repository, {}>(`/${repository}`, {}).then((repo: Repository) => {
        repo ? resolve(repo) : reject(new Error(getRepositoryNotFoundErrorMessage(repository)));
      }).catch(() => reject(new Error(getRepositoryNotFoundErrorMessage(repository))));
    });
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

    return this.getRepository(request.repository).then((repository: Repository) => ({
      entries: formatRepositoryToEntries(repository)
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
          : reject(new Error(getRepositoryKeyNotFoundErrorMessage(request.key)))
      ).catch(reject);
    });
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }

  createEntry(request: SaveRequest) {
    return Promise.reject(new Error(messages.notImplemented));
  }

  updateEntry(request: SaveRequest) {
    return Promise.reject(new Error(messages.notImplemented));
  }
}
