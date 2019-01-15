#############################################
# Capsula-Hub ConfigurationService Gherkin  #
#############################################

# 'configurationService' configuration is built into the local storage from remote service with configKey, defaultValues
Scenario: 'configKey' receive 'localStorageKey' and builds the configurationService local storage
  Given   configurationService with buildConfigurationServiceLocalStorage method
  And     user sends createConfigurationService request
  Then    buildConfigurationServiceLocalStorage response will be received
  And     buildConfigurationServiceLocalStorage (configKey, defaultValues)

# The method 'deleteAll' provides the deletion of all configuration keys, return empty promise
Scenario: If a valid 'deleteAll' is sent then a response received is rejected or passed
  Given   configurationService with deleteAll method
  When    user sends a valid deleteAll request (default values{numValue: 1, stringValue: 'test'})
  And     request is valid
  Then    a rejected or passed response will be received

Scenario: A 'deleteAll' is sent and no response is received due to server or network error
  Given   configurationService with deleteAll method
  And     keys array in local storage has configuration values
  When    user sends a valid deleteAll request
  And     network or server error
  Then    a relevant error message will be presented
  And     hub will continue to run

Scenario: Validating the 'deleteAll' method values
  Given   configurationService with deleteAll method
  When    user sends a deleteAll request (default values{numValue: 1, stringValue: 'test'})
  Then    a rejected or passed response will be received

# The method 'deleteKey' provides the deletion of configuration by specific key, return empty promise
Scenario: If a 'deleteKey' is sent then a response received is rejected or passed
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request (default values{numValue: 1, stringValue: 'test'})
  Then    a rejected or passed response will be received

Scenario: If a 'deleteKey' is sent with a non exist key, an error will be received
  Given   configurationService with deleteKey method
  When    user sends a deleteKey request
  And     key sent does not exist
  Then    rejected response will be received
  And     error(`Configuration key ${configKey} not found`)

Scenario: A 'deleteKey' is sent and no response is received due to server or network error
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request
  And     network or server error
  Then    a relevant error message will be presented
  And     hub will continue to run

Scenario: Validating the response from a 'deleteKey' method
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request (default values{numValue: 1, stringValue: 'test'})
  And     response that was given was not a rejected or passed
  Then    a relevant error will be presented

# The method 'get' provides the configuration by specific key, return promise with configuration object
Scenario: 'get' method is used for a specific key, return configuration received

Scenario: 'get' method is sent with a non exist key, a rejection message "Configuration key aKey not found" will be received

Scenario: Validating the 'get' return value (string)

# The method 'keys' provides the list of configuration keys, return promise string array
Scenario: 'keys' method is used by ConfigurationService to send configurations for all keys, an array of configurations received

Scenario: 'keys' method is used by ConfigurationService to send a non exist value, an error will be presented

Scenario: Validating the 'keys' return value (string)

# The method 'set' provides the setting of configuration by specific key, return empty promise
Scenario: 'set' method is used to send a specific key configuration, response received is rejected or passed

Scenario: 'set' method is used by ConfigurationService to send a non exist value, an error will be presented

Scenario: Validating the 'set' return value for a specific key (string)

# The method 'values' provides the getting of configurations by specific key, return promise with array of configuration objects by all key
Scenario: 'values' method is used to get the configuration of a specific key, response received is an array of configurations by all keys

Scenario: 'values' method is used by ConfigurationService to send a non exist value of a specific key, an error will be presented

Scenario: Validating the 'values' returned response of the array
