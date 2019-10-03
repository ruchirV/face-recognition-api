const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt');
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
	    host : '127.0.0.1',
	    user : '',
	    password : '',
	    database : 'smart-brain'
	  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	db('users')
		.select('*')
		.then((users) => {
			res.json(users)
		})
		.catch(err => res.status(400).json('bad request'))
});


app.post('/signin',signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db, bcrypt))
app.get('/profile/:id',profile.handleProfileGet(db))
app.put('/image',image.handleImagePut(db))
app.post('/facerec',image.handleFaceRecognitionRequest)

app.listen(3000, () => {
	console.log("app is running on 3000");
})