import Aluno from '../models/Aluno';

class HomeController {
  async index(requisicao, resposta) {
    resposta.json('index');
  }
}

export default new HomeController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
