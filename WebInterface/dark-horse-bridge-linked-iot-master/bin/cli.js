const http = require('http')
const Device = require('../lib/Devices')
const Proxy = require('../lib/Proxy')
const fs = require('fs');
const program = require('commander')
const exec = require('child_process').exec;


let child;


function list(options) {
  Device.list({
    all: options.all
  }).then((descriptions) => {
    process.stdout.write(JSON.stringify(descriptions, null, ' '))
  }).catch((err) => {
    console.error(err.stack || err.message)
  })
}

function proxy(iri,options) {
  if (child != undefined) {
    process.kill(-child.pid);
  }
  child = exec('node cli proxy ' + options.parent.args[0]);
}

function proxy1(iri, options) {
  Device.open(iri, options).then((device) => {
    const server = http.createServer(Proxy.createMiddleware(device))

    console.error('start server on port: ' + options.port)


    server.listen(options.port)
  }).catch((err) => {
    console.error(err.stack || err.message)
  })
}


program
  .command('list')
  .option('-a, --all', 'list all devices')
  .action(list)

program
  .command('proxy <device>')
  .option('-p, --port <port>', 'port', 8080, parseInt)
  .action(proxy1)

program.parse(process.argv)

module.exports = {
  list : function(options) {
    Device.list({
      all: options.all
    }).then((descriptions) => {
      //process.stdout.write(JSON.stringify(descriptions, null, ' '))
      fs.writeFile('routes/devicejson.json',JSON.stringify(descriptions, null, ' '));
    }).catch((err) => {
      console.error(err.stack || err.message)
    })
  },
    proxy : function (iri,options) {

        Device.open(iri, options).then((device) => {
            const server = http.createServer(Proxy.createMiddleware(device))

            console.error('start server on port: ' + 8080)


        server.listen(8080)
    }).catch((err) => {
            console.error(err.stack || err.message)
          });
}};
