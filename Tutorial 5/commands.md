# Command-line commands


### Project Set Up

```
nvm install 10
nvm alias default 10
node --version
npm --version
npm install -g npm@6
npm init
npm install express
npm uninstall express
npm install express@4
```

### Express
```
node server.js
npm start
```

### JSX Transform
```
npm install --save-dev @babel/core@7 @babel/cli@7
node_modules/.bin/babel --version
npx babel --version
npm install --save-dev @babel/preset-react@7
npx babel src --presets @babel/react --out-dir public
```

### Older Browsers Support
```
npm install --no-save @babel/plugin-transform-arrow-functions@7
npx babel src --presets @babel/react --plugins=@babel/plugin-transform-arrow-functions --out-dir public
npm uninstall @babel/plugin-transform-arrow-functions@7
npm install --save-dev @babel/preset-env
npx babel src --out-dir public
```

### Automate
```
npm install nodemon@1
```

## Express GraphQL APIs

### About API
```
npm install graphql@0 apollo-server-express@2
```

### MongoDB Node.js Driver
```
npm install mongodb@3
mongo issuetracker --eval "db.employees.remove({})"
node scripts/trymongo.js
```

### Schema Initialization
```
mongo issuetracker scripts/init.mongo.js
```