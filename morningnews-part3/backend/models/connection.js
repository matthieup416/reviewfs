const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI
console.log('MONGODB_URI', MONGODB_URI)

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connection = mongoose.connect(
	MONGODB_URI,
	options,
	function (err) {
		if (err) {
			console.log(`❌ Database is not connected ❌ --> ${err}`);
		} else {
			console.info("✅ Database connected successfully ✅");
		}
	},
);

module.exports = connection;
