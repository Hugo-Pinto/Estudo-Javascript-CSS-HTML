import User from '../models/User';

class UserController {
  async store(requisicao, resposta) {
    try {
      const novoUser = await User.create(requisicao.body);
      const { id, nome, email } = novoUser;
      return resposta.json(
        { id, nome, email }, // assim  que cadastrado um novo usuário, retorna somente id, nome e email.
      );
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  // index
  // sempre trabalhando com base de dados, utilizar async await e try catch.

  async index(requisicao, resposta) {
    try {
      // retornará todos os usuários na base de dados.
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] }); // passamos os atributos que queremos exibir caso a busca retorne true
      return resposta.json(users); // retorna um json dos usuários.
    } catch (e) {
      return resposta.jason(null);
    }
  }

  // show

  async show(requisicao, resposta) {
    try {
      // para o show, precisamos receber um parametro
      const user = await User.findByPk(requisicao.params.id); // retornará todos os usuários na base de dados.
      const { id, nome, email } = user;

      return resposta.json({ id, nome, email }); // retorna um json dos usuários.
    } catch (e) {
      return resposta.jason(null);
    }
  }

  // update
  async update(requisicao, resposta) {
    try {
      // para o show, precisamos receber um parametro
      // verifica se o ID existe.

      // if (!requisicao.params.id) {
      //   return resposta.status(404).json({
      //     errors: ['ID não enviado!'],
      //   });
      // }

      const users = await User.findByPk(requisicao.userId);

      if (!users) { // se não houver nenhum usuário, retorna o erro.
        return resposta.status(404).json({
          errors: ['Usuário não existe!'],
        });
      }

      const novosDados = await users.update(requisicao.body);// envia o que foi passado no body da requisição para realizar a atualização.
      const { id, nome, email } = novosDados;
      return resposta.json({ id, nome, email }); // retorna um json do usuário atualizado.
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(requisicao, resposta) {
    try {
      // para o show, precisamos receber um parametro
      // verifica se o ID existe.

      // if (!requisicao.params.id) {
      //   return resposta.status(404).json({
      //     errors: ['ID não enviado!'],
      //   });
      // }

      const users = await User.findByPk(requisicao.userId);

      if (!users) { // se não houver nenhum usuário, retorna o erro.
        return resposta.status(404).json({
          errors: ['Usuário não existe!'],
        });
      }

      await users.destroy();// envia o que foi passado no body da requisição para realizar a atualização.

      return resposta.json(null); // retorna um json do usuário atualizado.
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
