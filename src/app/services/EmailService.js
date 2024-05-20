import nodemailer from 'nodemailer';
import crypto from 'crypto';
import UsuarioRepository from '../repositories/UsuarioRepository.js';

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'trivobeats@hotmail.com',
    pass: 'Ronaldovit10*' // Certifique-se de usar variáveis de ambiente para credenciais sensíveis
  }
});

// Função para enviar email de confirmação
export const enviarEmailDeConfirmacao = async (email) => {
  const token = crypto.randomBytes(20).toString('hex');
  const mailOptions = {
    from: 'trivobeats@hotmail.com',
    to: email,
    subject: 'Confirmação de Email',
    text: `Por favor, confirme seu email usando o seguinte token: ${token}`
  };

  await transporter.sendMail(mailOptions);

  // Salvar o token e o email no banco de dados
  //await UsuarioRepository.salvarToken(email, token);

  return token;
};

