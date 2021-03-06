const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const q = require('queuee')()

var createFile = function (filepath) {
	var filedir = path.dirname(filepath);
	var filename = path.basename(filepath);
	q.push(function (dequeue) {
		mkdirp(filedir, function () {
			fs.writeFile(filepath, JSON.stringify({}), dequeue);
		});
	});
};

function Store(filename) {
	var filepath;
	var store = this;

	if(!filename){
		throw '文件名不能为空';
		return;
	}
	else if(path.isAbsolute(filename)){
		filepath = filename;
	}
	else{
		let parentDirname = path.dirname(module.parent.filename);
		filepath = path.resolve(parentDirname, filename);
	}

	store.$filepath = filepath;

	if(fs.existsSync(filepath)){
		let content = fs.readFileSync(filepath).toString();
		store.$data = content ? JSON.parse(content) : {};
	}
	else{
		store.$data = {};
		createFile(filepath);
	}
}

Store.prototype.set = function (key, value) {
	var store = this;
	store.$data[key] = value;
	q.push(function (dequeue) {
		fs.writeFile(store.$filepath, JSON.stringify(store.$data), function () {
			dequeue();
		});
	});
	return store;
};

Store.prototype.get = function (key) {
	return this.$data[key];
};

module.exports = Store;