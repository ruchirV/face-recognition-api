handleRegister = (db, bcrypt) => (req,res) => {

	const {name, email, password } = req.body;
	const saltRounds = 10;

	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);

	db.transaction(trx => {
		trx.insert({hash, email})
			.into('login')
			.returning('email')
			.then(respEmails => {
				return trx('users')
					    .insert({
					    	name : name, 
					    	email: respEmails[0],
					    	joined : new Date()
					    })
					    .returning('*')
					    .then(user => res.send(user[0]))
					    .catch(err => {
					    	console.log(err)
					    	res.status(400).json('could not register1')
					    })
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('could not register2'))
}

module.exports = { handleRegister }