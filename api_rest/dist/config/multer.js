"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// dica: abra alguma dependência do projeto que está utilizando em forma de objeto e dê um ctrl + space para ver os atributos.

// multer({
//   "dê o ctrl + space aqui"
// })

exports. default = {
  fileFilter: (requisicao, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') { // bloqueia qualquer tipo de arquivo que não seja PNG ou JPEG.
      return callback(new _multer2.default.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }
    return callback(null, true); // se o arquivo estiver ok, passa pra frente.
  },
  storage: _multer2.default.diskStorage({
    destination: (requisicao, file, callback) => {
      // o primeiro parâmetro da função de callback é o erro caso ocorra.
      callback(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images')); // indica onde a imagem será salva dentro da base de dados.
    },
    // configuração para receber o arquivo enviado
    filename: (requisicao, file, callback) => {
      callback(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`); // o novo nome que o arquivo enviado irá possuir.
    },
  }),
};
