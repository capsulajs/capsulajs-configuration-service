import { Dispatcher, AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';
import { ConfigurationServiceHttp } from 'provider/HttpProvider';
import { messages } from '../../src/utils';
import { runTestsExpectRejectedError } from '../utils';

const token = 'localhost:1234';
const repository = 'Adele';
const notFoundRepository = 'Freddie Mercury';
const key = 'Hello';
const notFoundkey = 'Goodbye';
const value = 'It\'s me';
const data = {
  [key]: value,
  Surprise: 'I have a balloon'
};

const mock = jest.fn();
const configService = new ConfigurationServiceHttp(token);
configService.dispatcher.dispatch = mock;

describe('Test suite for the ConfigurationServiceHttp', () => {

  it('New instance of service should throw \'dispatcherNotProvided\' error', async () => {
    expect.assertions(1);
    return expect(() => new ConfigurationServiceHttp()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('New instance should return \'repositoryNotProvided\' error', async () => {
    expect.assertions(2);
    ['entries', 'fetch'].forEach((method) => {
      configService[method]({}).catch(
        error => expect(error).toEqual(new Error(messages.repositoryNotProvided))
      );
    });
  });

  it('Call fetch(), entries() with unexisting repository should' +
    ' return \'Configuration repository is not found\' error', (done) => {
    runTestsExpectRejectedError(
      configService,
      ['entries', 'fetch'],
      { repository: notFoundRepository, key },
      new Error(`Configuration repository ${notFoundRepository} not found`),
      expect,
      done,
      () => mock.mockRejectedValueOnce(null)
    );
  });

  it('Call fetch() without providing key should return \'repositoryKeyNotProvided\' error', (done) => {
    runTestsExpectRejectedError(
      configService,
      ['fetch'],
      { repository },
      new Error(messages.repositoryKeyNotProvided),
      expect,
      done
    );
  });

  it('Call fetch()  with unexisting key should' +
    ' return \'Configuration repository key not found\' error', async () => {
    expect.assertions(1);
    ['fetch'].forEach((method) => {
      mock.mockResolvedValueOnce({ [key]: value });
      configService[method]({ repository, key: notFoundkey }).catch(
        error => expect(error).toEqual(new Error(`Configuration repository key ${notFoundkey} not found`))
      );
    });
  });

});
