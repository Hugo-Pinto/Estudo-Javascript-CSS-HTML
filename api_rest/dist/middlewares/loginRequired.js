"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (requisicao, resposta, next) => {
  const { authorization } = requisicao.headers; // autorização é o token que é criado no tokenController

  if (!authorization) { // verifica se o token existe
    return resposta.status(401).json({
      errors: ['É necessário fazer login!'],
    });
  }

  const [, token] = authorization.split(' '); // separa a string a partir do espaço em branco.

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);// verifica o token passado no header da requisição.

    const { id, email } = dados;

    // checa se o usuário existe e o id e email estão corretos.
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return resposta.status(401).json({
        errors: ['Usuário inválido!'],
      });
    }

    requisicao.userId = id;
    requisicao.userEmail = email;

    return next();
  } catch (e) {
    console.log(e);
    return resposta.status(401).json({
      errors: ['Token expirado ou inválido!'],
    });
  }
};
