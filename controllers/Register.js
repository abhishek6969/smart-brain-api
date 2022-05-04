const registerUser = (req,res,db,bcrypt)=>{
  const {email,name,password} = req.body;
  if(!name || !email || !password){
    return res.status(400).json("Missing data fields") 
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trans=>{
    trans.insert({
      hash : hash,
      email : email,
    })
    .into('login')
    .returning('email')
    .then(returnedMail=>{
      return trans('users')
      .returning('*')
      .insert({
        name : name,
        email : returnedMail[0].email,
        joined : new Date()
      }).then(user=>{
        res.json(user[0]);
      })
    })
    .then(trans.commit)
    .catch(trans.rollback)
  })
  .catch(err=>res.status(400).json('Unable to register(user may already exist )'))
  
}

module.exports = {
  registerUser
}