const Users = require('../model/User');
const bcrypt = require('bcryptjs');
const sendMail = require('../providers/mailProvider')
const {userEmailRecovery} = require('../template/userCreateMail')



exports.create =  async(req, res) =>{
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);



  await Users.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Usuário não encontrado... ${err}`
    })
  })
}
/********************************************************************************* */

exports.findAll = async(req,res)=>{
  await Users.findAll({
    attributes: ['id','name','email', 'password'],
    order: [['id', 'ASC']]

  })
  .then((users) => {
    return res.json({
      erro: false,
      users
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum usuário encontrado!!!`
    })
  })
}
/**************************************************************************** */
/******************************************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const users = await Users.findByPk(id, {attributes: ['id','name', 'email']});
    if(!users){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum usuário encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      users
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
}
/************************************************************************************ */
exports.login =  async (req, res) => {
  const user = await Users.findOne({
      attributes: ['id', 'name', 'email', 'password'],
      where: {
          email: req.body.email
      }
  })
  if(user === null){
      return res.status(400).json({
          erro: true,
          mensagem:"Erro: Email ou senha incorreta!!!"
      })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))){
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Email ou senha incorreta!!!"
      })
  }
  return res.json({
    erro:false,
    mensagem: "Login realizado com sucesso!!!",
  })
}
  

/*********************************************************************** */

exports.recovery = async (req,res) =>{

  const email = req.body.email
  const user = await Users.findOne({where: {email}})

  if(!user){
    return res.status(400).json({
      erro : true,
      mensagem : "Usuário não encontrado!"
    })
  }
  else{

    let code = (Math.random() * Date.now()).toString().substring(0,6)
    
    await Users.update({verificationCode: code},{where: {id: user.id} })
    .then(()=>{
    
      //Enviar email
    let dadosEmail = {
      name : user.name,
      code : code
    }

    let mailBody = userEmailRecovery(dadosEmail)
    let subject = "Alteração de senha"
    let to = user.email

    sendMail(to,subject,mailBody)

    return res.status(200).json({
      erro: false,
      mensagem: "Um email com o assunto: ALTERAÇÃO DE SENHA foi enviado para você. Siga as intruções nele contidas.",
      code
    })
    }).catch((err)=>{
      return res.status(400).json({
        erro: true,
        mensagem: `Erro: falha no envio do email! ${err}`
      })
    })
  }
}

exports.updatepassword = async(req,res) => {
  const {email,code, password, confirmpass} = req.body
  const user = await Users.findOne({where: {email}})
  if(!user || (password != confirmpass)){
    return res.status(400).json({
      erro: true,
      mensagem: "Email inválido e ou senhas não conferem!"
    })
  }
  if(code == user.verificationCode){
    const newpassword = await bcrypt.hash(password,8)
    await Users.update({password:newpassword, verificationCode:null},{where: {id: user.id}})
    .then(()=>{
      return res.status(200).json({
        erro: false,
        mensagem: "Senha alterada com sucesso"
      })
     }
    ).catch((err)=>{
        return res.status(400).json({
          erro: true,
          mensagem: `Erro: ${err}. Falha na alteração de senha`
        })
      })
  }
  else{
    return res.status(400).json({
      erro: true,
      mensagem: "Código inválido"
    })
  }
}
  
  
    
    
  




  

  
    
    



      
    
    







