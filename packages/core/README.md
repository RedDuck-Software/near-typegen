# @neargen-js/core

Core package for ```@neargen-js/abigen``` and ```@neargen-js/typegen```

## Contract ABI specification

```ts
{
    contractName: string; // The name of the smart contract
    methods: { 
        view: Array<NearFunctionView>, // array of view functions
        call: Array<NearFunctionCall> // array of call functions
    }
    byteCode: string // The bytecode of the smart contract. Is not yet implemented
}   
```

You can check more detailed abi type definitions [here](../core/src/lib/abi/index.ts)

### Current limitations

For now, contract methods can have only 1 object parameter. In other cases, abi might be generated incorrectly. Example: 

```ts
@call({})
public some_method({ someValue }:{ someValue: string }) {/*...*/}

/* But NOT: */
@call({})
public some_method(someValue: string) {/*...*/}
```
