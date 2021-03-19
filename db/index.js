const mongoose = require('mongoose')
console.log("db url", process.env.DB_URL);
mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(x => {
		console.log(" Connected Successfully")
	})
	.catch(e => {
		console.error('Connection error', e.message)
	})