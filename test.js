const Store = require('./store-json.js');
const store = new Store('./data.json');

let t1 = new Date() * 1;

store.set('name', 'lianer');

let value = store.get('name');

let tx = new Date() - t1;

console.log(`Value: ${value}`);
console.log(`Time: ${tx}ms`);
