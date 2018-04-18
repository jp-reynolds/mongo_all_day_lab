const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PeopleSchema = new Schema ({
	id: Number,
	name: String,
	author: String,
	image: String,
	releaseDate: String
});

const People = mongoose.model('People', PeopleSchema);

module.exports = People;