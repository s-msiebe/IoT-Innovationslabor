const mongoose = require('mongoose');
const config = require('../config/database');

const DeviceSchema = mongoose.Schema({

  context: [{ vocab : String }],
  id: String,
  type: [{ device1 : String, device2 : String}],
  radio: [{ type : String , frequency : Number, network : Number, client : Number, password : String}]

});

const Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.addDevice = function(newDevice, callback) {

  newDevice.save(callback);

}

module.exports.getDevice = function(callback) {

  newDevice.find({},callback);

}
