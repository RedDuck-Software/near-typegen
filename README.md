# Near Generators JS

Near generators monorepo, contains next packages

- ``@neargen-js/abigen`` - utility to extract contracts ABI from Near contracts, written with TypeScript. [```near-abigen-js```](https://github.com/RedDuck-Software/near-abigen-js) repository. Read more about this package [here](./packages/abigen/README.md)
- ``@neargen-js/typegen`` - utility to generate TypeScript type definitions from a given contract abis for interaction with Near smart contracts. Moved from  [```typechain-near```](https://github.com/RedDuck-Software/typechain-near) repository. Read more about this package [here](./packages/typegen/README.md)
- ``@neargen-js/core`` - core types and utilities for both ```typegen``` and ```abigen```. Read more about this package and about ABI specification [here](./packages/core/README.md)


## TODO
- ```bigint``` type support
- include contract ```bytecode``` into its ABI
- contracts deployment using generated definitions