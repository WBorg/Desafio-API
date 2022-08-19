exports.userEmailRecovery = (data) =>{
  var mailBody = '<h1>Olá, {name}!</h1>';
      mailBody += '<p>Acesse o link abaixo e insira o código recebido no campo indicado no formulário</p>'
      mailBody += '<p>Código: {code} </p> '

      mailBody = mailBody.replace('{name}', data.name);
      mailBody = mailBody.replace('{code}', data.code);

        return mailBody;
}