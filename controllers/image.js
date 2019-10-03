const Clarifai = require('clarifai');

handleFaceRecognitionRequest = (req,res) => {

	console.log(req.body.input)

	const CLARIFY_API_KEY = 'f71df9a269224eaf9cb51b45ff392da2';
	const app = new Clarifai.App({apiKey: CLARIFY_API_KEY});
	
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", 
		req.body.input)
      .then(response => { res.json(response) })
      .catch(err => {})
}

handleImagePut = (db) => (req, res) => {
	const { id } = req.body;

	db('users')
		.where({id})
		.increment('entries',1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('unable to get entries'))
}


module.exports = { handleImagePut, handleFaceRecognitionRequest }