"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

class HomeController {
  async index(requisicao, resposta) {
    resposta.json('index');
  }
}

exports. default = new HomeController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
