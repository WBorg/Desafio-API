exports.userCreateMailTemplate = (data) =>{
  var mailBody = "";
      
        mailBody = mailBody.replace('{gender}', data.gender);

        return mailBody;
}