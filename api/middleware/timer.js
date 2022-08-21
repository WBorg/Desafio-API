exports.timer = async (req,res,next)=>{

  await sleep(3000)
  return next()

    function sleep(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve,ms)
        })
    }



}