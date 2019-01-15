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
Scenario: If a 'deleteAll' is sent then a response received is rejected or passed

Scenario: A 'deleteAll' is sent and no response is received due to server or network error

Scenario: Validating the response from a 'deleteAll' method

# The method 'deleteKey' provides the deletion of configuration by specific key, return empty promise
Scenario: If a 'deleteKey' is sent then a response received is rejected or passed

Scenario: A 'deleteKey' is sent and no response is received due to server or network error

Scenario: Validating the response from a 'deleteKey' method

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
