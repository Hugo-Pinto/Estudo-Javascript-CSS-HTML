import multer from 'multer';
import multerConfig from '../config/multer';
import Picture from '../models/Picture';

const upload = multer(multerConfig).single('pictures');

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
        const foto = await Picture.create({ originalname, filename, aluno_id });
        return resposta.json(foto);
      } catch (e) {
        return resposta.status(400).json({
          errors: ['O Aluno não existe!'],
        });
      }
    });
  }
}

export default new PictureController(); // quando exportamos a classe desssa forma, o objeto já vai estar instanciado ao realizar o import.
