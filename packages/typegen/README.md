# @neargen-js/typegen

## Installation  

```bash
# Using Yarn
yarn add @neargen-js/typegen

# Using NPM.
npm install @neargen-js/typegen
```

Or, for global usage

```bash
# Using Yarn
yarn global add @neargen-js/typegen

# Using NPM.
npm install -g @neargen-js/typegen
```

### **Note**

If you want to use it with the frontend (or any other environment where ``fs`` is not available), you will need to install ```@neargen-js/typegen``` as a devDependency and install ```@neargen-js/core``` as a regular dependency. Like this

```bash
# Using Yarn
yarn add --dev @neargen-js/typegen
yarn add @neargen-js/core

# Using NPM.
npm install --save-dev @neargen-js/typegen
npm install @neargen-js/core
```

## How to Use It?

```bash
yarn neargenjs-typegen 
    -a <path to abi files using blob pattern. optional>
        example: './abis/**/*.abi.json'
        default: './abis/**/*.abi.json'

    -o <path to definitions output folder. optional>
        example: './src/near-definitions/'
        default: './neargen-types/'        
```