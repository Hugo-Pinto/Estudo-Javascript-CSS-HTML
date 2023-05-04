"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);

const upload = _multer2.default.call(void 0, _multer4.default).single('pictures');

class PictureController {
  // método store porque receberemos um post com as fotos.
  store(requisicao, resposta) {
    return upload(requisicao, resposta, async (error) => {
      if (error) {
        return resposta.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = requisicao.file;
        const { aluno_id } = requisicao.body;
        const foto = await _Picture2.default.create({ originalname, filename, aluno_id });
        return resposta.json(foto);
      } catch (e) {
        return resposta.status(400).json({
          errors: ['O Aluno não existe!'],
        });
      }
    });
  }
}

exports. default = new PictureController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
