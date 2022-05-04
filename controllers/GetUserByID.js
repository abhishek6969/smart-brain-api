const getUserByID = (req,res,db)=>{
  const {id} = req.params;
  db.select('*').from('users').where({
    id : id
  })
  .then(user=>{
    if(res.length){
      res.json(user[0])
    }else{
      res.status(400).json('NOT FOUND')
    }
  })
  .catch(err=>res.status(400).json('Error'))
}

module.exports = {
  getUserByID
}