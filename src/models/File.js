var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const axios = require("axios");
require("dotenv").config({path: __dirname + "./../../.env"})

const File = new Schema({
  file_id: String,
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
}, {toJSON:{virtuals:true}});

File.virtual('get_stripe_file').
  get(() => { await axios
    .post(process.env.REACT_APP_BACKEND_URL + '/retrieve_file', {
      file_id: this.file_id
    })
    .then((response) => {
      return response;
    },
    (error) => {
      return error;
    })
  });

modules.export (File)