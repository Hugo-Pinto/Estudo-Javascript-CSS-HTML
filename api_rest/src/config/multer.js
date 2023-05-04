import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// dica: abra alguma dependência do projeto que está utilizando em forma de objeto e dê um ctrl + space para ver os atributos.

// multer({
//   "dê o ctrl + space aqui"
// })

export default {
  fileFilter: (requisicao, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') { // bloqueia qualquer tipo de arquivo que não seja PNG ou JPEG.
      return callback(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }
    return callback(null, true); // se o arquivo estiver ok, passa pra frente.
  },
  storage: multer.diskStorage({
    destination: (requisicao, file, callback) => {
      // o primeiro parâmetro da função de callback é o erro caso ocorra.
      callback(null, resolve(__dirname, '..', '..', 'uploads', 'images')); // indica onde a imagem será salva dentro da base de dados.
    },
    // configuração para receber o arquivo enviado
    filename: (requisicao, file, callback) => {
      callback(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`); // o novo nome que o arquivo enviado irá possuir.
    },
  }),
};
