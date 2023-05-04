import Aluno from '../models/Aluno';
import Picture from '../models/Picture';

class AlunoController {
  async index(requisicao, resposta) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
      include: {
        model: Picture,
        attributes: ['url', 'filename'],
      },
    });
    resposta.json(alunos);
  }

  async store(requisicao, resposta) {
    try {
      const aluno = await Aluno.create(requisicao.body);
      return resposta.jason(aluno);
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(requisicao, resposta) {
    try {
      const { id } = requisicao.params.id;

      if (!id) {
        return resposta.status(400).json({
          errors: ['ID inexistente!'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      const {
        nome, sobrenome, idade, email,
      } = aluno;
      if (!aluno) {
        return resposta.status(400).json({
          errors: ['Aluno não existe!'],
        });
      }

      const alunoAtualizado = await aluno.update(requisicao.body);

      return resposta.json(alunoAtualizado);
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(requisicao, resposta) {
    try {
      const { id } = requisicao.params;

      if (!id) {
        return resposta.status(400).json({
          errors: ['ID inexistente!'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
        include: {
          model: Picture,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return resposta.status(400).json({
          errors: ['Aluno não existe!'],
        });
      }

      return resposta.json(aluno);
    } catch (e) {
      console.log(e);
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(requisicao, resposta) {
    try {
      const { id } = requisicao.params.id;

      if (!id) {
        return resposta.status(400).json({
          errors: ['ID inexistente!'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      const {
        nome, sobrenome, idade, email,
      } = aluno;
      if (!aluno) {
        return resposta.status(400).json({
          errors: ['Aluno não existe!'],
        });
      }

      await aluno.destroy();

      return resposta.json({
        apagado: true,
      });
    } catch (e) {
      return resposta.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
