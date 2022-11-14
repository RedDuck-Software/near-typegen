# @neargen-js/typegen


## Installation  

```
# Using Yarn
yarn add @neargen-js/typegen

# Using NPM.
npm install @neargen-js/typegen
```

Or, for global usage

```
# Using Yarn
yarn global add @neargen-js/typegen

# Using NPM.
npm install -g @neargen-js/typegen
```

## How to Use It?

```
yarn neargenjs-typegen 
    -a <path to abi files using blob pattern. optional>
        example: './abis/**/*.abi.json'
        default: './abis/**/*.abi.json'

    -o <path to definitions output folder. optional>
        example: './src/near-definitions/'
        default: './neargen-types/'        
```