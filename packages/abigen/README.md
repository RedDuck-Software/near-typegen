# @neargen-js/abigen


## Installation  

```
# Using Yarn
yarn add @neargen-js/abigen

# Using NPM.
npm install @neargen-js/abigen
```

Or, for global usage

```
# Using Yarn
yarn global add @neargen-js/abigen

# Using NPM.
npm install -g @neargen-js/abigen
```


## How to Use It?

```
yarn neargenjs-abigen 
    -c <path to ts contract file[s] using blob pattern. optional>
        example: './src/contracts/**/*.ts'
        default: './src/contracts/**/*.ts'

    -o <path to abis output folder. optional>
        example: './abis/'
        default: './abis/'        
```