# Near Generators JS

Near generators monorepo, contains next packages

- ``@neargen-js/abigen`` - utility to extract contracts ABI from Near contracts, written with TypeScript. Moved from [```near-abigen-js```](https://github.com/RedDuck-Software/near-abigen-js) repository
- ``@neargen-js/typegen`` - utility to generate TypeScript type definitions from a given contract abis for interaction with Near smart contracts. Moved from  [```typechain-near```](https://github.com/RedDuck-Software/typechain-near) repository
- ``@neargen-js/core`` - core types and utilities for both ```typegen``` and ```abigen```


## TODO
- ```bigint``` type support
- include contract ```bytecode``` into its ABI
- contracts deployment using generated definitions