handleProfileGet = (db) => (req, res) => {

	const { id } = req.params;
    
    db('users')
	    .where({id})
	    .select('*')
	    .then(user => {
	    	if(user.length) {
	    		res.json(user[0])
	    	} else {
	    		res.status(400).json('user not found')
	    	}
	    })
	    .catch(err => res.status(400).json('bad request'))
}

module.exports = { handleProfileGet }