import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Admin',
    database: 'barbearia',
    port: 5432
})

const testarConexao = async () => {
    try {
        const cliente = await BD.connect();
        console.log('conexão estabelecida');
        cliente.release();
    } catch (error) {
        console.error('Erro ao conectar com o banco, ', error.message);
    }
}

export {BD, testarConexao}