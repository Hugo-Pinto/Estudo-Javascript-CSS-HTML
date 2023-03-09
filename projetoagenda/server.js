require('dotenv').config();//relacionado ao mongo DB, permitirá que a senha e o usuário não fiquem.

const express = require('express'); //como faz parte do node, não precisa de caminho.
const app = express(); //carregando o express.

//conectando a base de dados (MONGO DB)
const mongoose = require('mongoose'); 

mongoose.set('strictQuery', true); //remove o warning no terminal

mongoose.connect(process.env.CONNECTIONSTRING, 
    {
        
    })
    .then(() => {
        console.log('estou rodando');//conectará primeiro a base de dados e só depois o node irá escutar.
        app.emit('pronto'); //emitirá um evento quando o app estiver pronto.
    }) 
    .catch(e => console.log(e));

const session = require('express-session'); //irá salvar as sessões na memória, os cookies.
const MongoStore = require('connect-mongo'); //permitirá que as sessões sejam salvas no servidor e não na memória.
const flash = require('connect-flash');

//routs e paths .
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf'); //Responsável pela segurança em POST, impedindo que terceiros não consigam realizar POST na conta de usuários.
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

//maneira de recebe um método POST
//se não fizer isto, qualquer método POST realizado NÃO será tratado.
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public'))); //acessando arquivos estáticos da aplicação.

//configurando as sessões.
const sessionOptions = session({
    secret: 'meiaNoiteTeContoUmSegredo',
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

//caminho absoluto da pasta de views
//views são arquivos que serão renderizados na tela.
app.set('views', path.resolve(__dirname, 'src', 'views')); //do diretório atual, vá para pasta SRC e depois VIEWS
//caminho relativo caso queira utilizar, não é muito recomendado!
//app.set('views', './src/views');

app.set('view engine', 'ejs'); //usaremos EJS para renderizar as views, precisa instalar via NPM
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes); //dizemos ao express para utilizar as nossas rotas criadas para a aplicação.

//escutamos o evento e, quando o app estiver pronto, rodará a aplicação.
app.on('pronto', () => { 
    app.listen(3000, () => {
        console.log('http://localhost:3000');//permitirá que o vscode abra a porta 3000
        console.log('servidor rodando na porta 3000');
    });
});