const path = require('path');


module.exports = { //retorna um objeto que é a configuração do webpack
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js' //pode ser renomeado como quiser, o nome padrão do arquivo é bundle.
    },
    module: {
        rules: [{
            exclude: /node_modules/, //exclui a pasta node modules, evitando que a mesma seja lida
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map' //caso acontece algum erro, ele mapeia e retorna exatamente onde o erro foi encontrado.
};