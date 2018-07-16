const mongoose = require('mongoose');
const config = require('../config/database');

const RadioConfigSchema = mongoose.Schema({

  type: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },
  network: {
    type: Number,
    required: true
  },
  client: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

const RadioConfig = module.exports = mongoose.model('RadioConfig', RadioConfigSchema);

module.exports.getConfig = function(callback){
  /*const query = {
    _id: id
  }*/
  RadioConfig.find({},callback);
}

module.exports.getConfigById = function(id,callback) {
  const query = {
    _id: id
  }
  RadioConfig.findOne(id,callback);
}

module.exports.updateConfig = function(updateConfig,callback) {
  const query = {
    _id: updateConfig.id
  }
  RadioConfig.findOne(query,function (err,data) {
    data.type = updateConfig.type;
    data.frequency = updateConfig.frequency;
    data.network = updateConfig.network;
    data.client = updateConfig.client;
    data.password = updateConfig.password;
    data.save(function (err,upData) {
      console.log(err);
    })
  })

}

module.exports.deleteRadioConfig = function(id,callback) {
  const query = {
    _id: id.query.id
  }
  RadioConfig.remove(query,callback);
}

module.exports.addConfig = function(newConfig, callback) {
  console.log("radioconfig.js");
  console.log(newConfig);
  console.log(callback);
  newConfig.save(callback);
}
