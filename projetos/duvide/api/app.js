import express from 'express';
import {BD, testarConexao} from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasPerguntas from './src/routes/rotasPerguntas.js'

import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())

app.get('/swagger', (req, res) => {
 res.send(`<!DOCTYPE html>
<html><head>
 <title>API - duvide</title>
 <meta charset="utf-8"/>
 <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
 <div id="swagger-ui"></div>
 <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
 <script>
  SwaggerUIBundle({
   spec: ${JSON.stringify(documentacao)},
   dom_id: '#swagger-ui'})
 </script>
</body></html>`);
});

app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json("Api Funcionando");
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasPerguntas)

const porta = 3000
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
})