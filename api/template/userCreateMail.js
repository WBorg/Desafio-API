exports.userEmailRecovery = (data) =>{
  var mailBody = '<h1>Olá, {name}!</h1>';
      mailBody += '<p>Acesse o link abaixo e insira o código recebido no campo <b>CÓDIGO</b>         indicado no formulário</p>'
      mailBody += '<p><a target="_blank" href="http://127.0.0.1:5173/updatepassword">Link para recuperação de senha</a></p>'
      mailBody += '<h2 style="background-color: orange">Código: {code} </h2> '

      mailBody = mailBody.replace('{name}', data.name);
      mailBody = mailBody.replace('{code}', data.code);

        return mailBody;
}