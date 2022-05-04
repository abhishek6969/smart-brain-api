const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey : '86cdff8889b141a3b27e5435baf9ee0d'
});

const handleAPI = (req,res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => res.json(data))
  .catch(err=>res.status(400).json("API call failed"))
}

const image = (req,res,db)=>{
  const {id} = req.body;
  db('users').where('id','=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
    res.json(entries[0].entries )
  })
  .catch(err=>res.status(400).json("Unable to login"))
  
}

module.exports = {
  image,
  handleAPI
}