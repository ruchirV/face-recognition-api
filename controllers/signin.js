handleSignin = (db, bcrypt) => (req,res) => {

	const {email, password } = req.body;

	db('login')
		.select('*')
		.where({email})
		.then(loginUsers => {
			if(loginUsers.length) {
				const isValid = bcrypt.compareSync(password, loginUsers[0].hash);

				if(isValid) {
					return db('users')
							.select('*')
							.where({email})
							.then((users) => {
								res.json(users[0])
							})
							.catch(err => res.status(400).json('unable to get user'))
				} else {
					res.status(400).json('authentication failed');
				}
			} else {
				res.status(400).json('authentication failed');
			}
		})
		.catch(err => res.status(400).json('bad request'))
}

module.exports = {
	handleSignin
}