const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    html: path.resolve(__dirname, '../index.html'),
    dist: path.resolve(__dirname, '../dist'),
    app: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    common: path.resolve(__dirname, '../src/common')
}