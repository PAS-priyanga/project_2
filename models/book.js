const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// review
const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
    
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

// books
const bookSchema = new Schema({
  title: { type: String, required: true },
  publishedYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
   
  },
  publisher: String,
  user:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  author:  {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: false
  },
  reviews: [reviewSchema],
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Book', bookSchema);