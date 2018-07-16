const express = require('express');
const router = express.Router();
const cli = require('../dark-horse-bridge-linked-iot-master/bin/cli');
const Radio = require('../models/radioconfig');
const program = require('commander');
const Device = require('../models/device');
const fs = require('fs');
const spawn = require('child_process').spawn;


let child;


function deleteAt(sbi) {
  sbi = JSON.stringify(sbi);
  sbi = sbi.replace("@id", "id");
  sbi = sbi.replace("@context", "context");
  sbi = sbi.replace("@type", "type");
  sbi = sbi.replace("@type", "type");
  sbi = sbi.replace("@vocab", "vocab");
  sbi = JSON.parse(sbi);
  return sbi;
}

function addAt(sbi) {
  sbi = JSON.stringify(sbi);
  sbi = sbi.replace("id", "@id");
  sbi = sbi.replace("context", "@context");
  sbi = sbi.replace("type", "@type");
  sbi = sbi.replace(/\"type\"/, "\"@type\"");
  sbi = sbi.replace("vocab", "@vocab");
  sbi = JSON.parse(sbi);
  return sbi;
}

router.get('/closeProxy',function (req,res) {

})

//Register
router.post('/addConfig', function(req, res, next) {
  let newRadioConfig = new Radio({
    type: req.body.type,
    frequency: req.body.frequency,
    network: req.body.network,
    client: req.body.client,
    password: req.body.password
  });

  Radio.addConfig(newRadioConfig, function(err, radioconfig) {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to Add Config'
      });
    } else {
      res.json({
        success: true,
        msg: 'Config Added'
      })
    }
  });
});

/*router.post('/saveDevice', function(req, res) {
  console.log("Body von Server SaveDEVICE");
  data = JSON.stringify(req.body);
  data = deleteAt(data);
  data = JSON.parse(data);
  var jsonarray = new Array();
  fs.readFile(__dirname + "/" + "device.json", 'utf-8', function(err, oldData) {
    console.log(Object.keys(oldData).length)
    if (Object.keys(oldData).length == 0) {
      console.log("leer");
      jsonarray.push(data);
      fs.writeFile('routes/device.json',JSON.stringify(jsonarray,null,' '));
    } else {
    if (oldData.id = data.id) {
      oldData = JSON.parse(oldData);
      oldData['radio'] = data.radio;
      console.log("new OLD DATA")
      jsonarray.push(oldData);
      console.log(jsonarray);
      fs.writeFile('routes/device.json',JSON.stringify(jsonarray,null,' '));
    } else {
      jsonarray.push(oldData);
      jsonarray.push(data);
      fs.writeFile('routes/device.json',JSON.stringify(jsonarray,null,' '));
    }
  }
  });


});*/

router.put('/updateConfig', function(req, res, next) {

  let updatedRadioConfig = {
    type: req.body.type,
    frequency: req.body.frequency,
    network: req.body.network,
    client: req.body.client,
    password: req.body.password,
    id: req.body.id
  }


  Radio.updateConfig(updatedRadioConfig, function(err, upData) {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to Update Config'
      });
    } else {
      res.json({
        success: true,
        msg: 'Config Updated'
      })
    }
  });
});



router.get('/getDevice', function(req, res) {
  Device.getDevice(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})

router.post('/addDevice', function(req, res) {

  Device.addDevice()
})

router.get('/initialize', function(req, res) {

})

router.get('/startProxy', function(req, res) {


  process.argv[2] = 'proxy';
  process.argv[3] = req.query.name;


  function proxy(options) {
    cli.proxy(options);
  }

  program
    .command('proxy <device>')
    .option('-p, --port <port>', 'port', 8080, parseInt)
    .action(proxy)

  program.parse(process.argv)
})

router.get('/showDevice', function(req, res, next) {

  process.argv[2] = 'list';
  process.argv[3] = '-a';

  function list(options) {
    cli.list(options);
  }

  program
    .command('list')
    .option('-a, --all', 'list all devices')
    .action(list)

  program.parse(process.argv)

  fs.readFile(__dirname + "/" + "devicejson.json", 'utf-8', function(err, data) {
    var newData = data.replace(/@id/g, 'id');
    res.json(newData);
  });
})


router.get('/getConfig', function(req, res, next) {
  Radio.getConfig((err, config) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(res.json(config));
      res.json(config);
    }
  })
})

router.delete('/deleteConfig', function(req, res, next) {
  //console.log(req);
  Radio.deleteRadioConfig(req, (err, config) => {
    if (err) {
      //console.log(err);
    } else {
      res.json({
        success: true,
        msg: 'Config Deleted'
      });
    }
  })
})


module.exports = router;
