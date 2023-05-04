"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(requisicao, resposta) {
    const { email = '', password = '' } = requisicao.body; // vamos receber um email e senha no body da requisição.

    // verifica se a senha ou o email foram enviados
    if (!email || !password) {
      return resposta.status(401).json({
        errors: ['Credenciais inválidas!'], // se um dos dois dados estiver corretos, retorna este erro.
      });
    }

    const user = await _User2.default.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return resposta.status(401).json({
        errors: ['Usuário não Existe!'], // só exibe este erro se o usuário e a senha forem inexistentes.
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return resposta.status(401).json({
        errors: ['Senha incorreta!'], // só exibe este erro se o usuário e a senha forem inexistentes.
      });
    }

    const { id } = user; // igual a fazer const id = user.id
    const token = _jsonwebtoken2.default.sign(
      // Payload: dados que queremos recuperar posteriormente, neste caso, o ID e o email para manter a sessão do usuário.
      { id, email },
      // secret: apenas para validar
      process.env.TOKEN_SECRET,
      // tempo de duração até o token expirar
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    return resposta.json({ token });
  }
}

exports. default = new TokenController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
