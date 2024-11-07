import mysql from 'mysql'
import bodyParser from "body-parser";

//criando a conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Ronaldovitor10!',
    database: 'bd_sst'
})

/**
 * executa um código sql com ou sem valores
 * @param {string} sql intrução sql a ser executada
 * @param {string | [aluno, id]} valores valores a serem passados para o sql 
 * @param {error} mensagemReject mensagem a ser exibida 
 * @returns objeto da Promisse
 */

//função para fazer consultas no banco de dados
//recebe como parâmetros o sql, os valores e a mensagem de erro
export const consulta = (sql, valores='', mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        //casting de dados obtidos
        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      }
    });
  });
}


//fazendo a conexão
conexao.connect((error) => {
    // escutar a porta 3000
   
  
    if (error) {
      console.log(error);
    } else {
      console.log("Conexão estabelecida com Banco de Dados ");
    }
  });
export default conexao
