import { Pool } from 'pg';

// Conexão local - PGADMIN
const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Admin',
    database: 'bd_jogo_bandeiras',
    port: 5432
})

// Utilizando banco do supabase
// const BD = new Pool({
//     connectionString: "postgres://postgres.vynqcucefedsuslhzhmx:VQRoK70XPAEDw5mq@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {rejectUnauthorized: false}
// })

const testarConexao = async () =>{
    try{
        const cliente = await BD.connect(); // Realiza a conexão
        console.log('Conexão estabelecida');
        cliente.release(); // Libera a conexão
    }catch(error){
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export {BD, testarConexao}