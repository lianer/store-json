# store-json

simple json storage, read file into memory

## Usage

```js
const Store = require('store-json');
const store = new Store('./data.json');

store.set('name', 'lianer');
store.get('name');  // lianer
```
