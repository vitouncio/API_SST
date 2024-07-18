
function verificarSessao(req, res, next){
    if (req.session && req.session.usuario) {
      next();
    } else {
      res.render('../views/error/telaUsuarioNaoLogado.ejs');
    }
  };

  export default verificarSessao;