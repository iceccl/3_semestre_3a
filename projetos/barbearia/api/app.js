import express from 'express';
import {BD, testarConexao} from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasServicos from './src/routes/rotasServicos.js'
import rotasAgendamentos from './src/routes/rotasAgendamentos.js';

import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())

app.get('/', async(req, res) => {
    await testarConexao()
    res.redirect('/swagger')
})

app.use(rotasUsuarios)
app.use(rotasServicos)
app.use(rotasAgendamentos)

const porta = 3000;
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
})