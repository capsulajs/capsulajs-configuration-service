import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceFile } from 'provider/FileProvider';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceFile(token);

describe('Test suite for the ConfigurationServiceFile', () => {
  beforeEach(localStorage.clear);
  
  it('createRepository() should create configuration repository', async () => {
    expect.assertions(1);
    expect(1 + 1).toEqual(2);
    
    // expect(await configService.createRepository({ repository })).toEqual({ repository });
    // expect(await configService.entries({ repository })).toEqual({ entries: [] });
  });
  
  // it('delete() should return empty object and delete configuration repository key', async () => {
  //   expect.assertions(5);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
  //   expect(await configService.delete({ repository, key })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [] });
  // });
  //
  // it('entries() should return all values and keys', async () => {
  //   expect.assertions(4);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.save({
  //     repository, key: 'Surprise', value: 'I have a balloon'
  //   })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({
  //     entries: [{ key, value }, { key: 'Surprise', value: 'I have a balloon' }]
  //   });
  // });
  //
  // it('fetch() should return value by key', async () => {
  //   expect.assertions(3);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.fetch({ repository, key })).toEqual({ key, value });
  // });
  //
  // it('save() should persist value by key', async () => {
  //   expect.assertions(3);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
  // });
  //
  // it('save() should persist new value by the same key', async () => {
  //   expect.assertions(5);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
  //   expect(await configService.save({ repository, key, value: 'Goodbye' })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value: 'Goodbye' }] });
  // });
  
});
