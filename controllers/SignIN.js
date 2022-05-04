const userSignIN = (req,res,db,bcrypt)=>{
  const { email , password } = req.body;
  if(!email || !password){
    return res.status(400).json("Missing data fields") 
  }
  db.select('email','hash').from('login')
  .where('email','=',email)
  .then(data =>{
    const isvalid = bcrypt.compareSync(password,data[0].hash)
    if(isvalid){
      return db.select('*').from('users')
      .where('email',"=",email)
      .then(user=>{
        res.json(user[0])
      })
    }else{
      res.status(400).json("Incorrect username or password")
    }
  })
  .catch(err=>res.status(400).json("Incorrect username or password"))
}

module.exports = {
  userSignIN
}