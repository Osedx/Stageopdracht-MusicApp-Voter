'use strict';

var npm = require('npm-run');

module.exports.spawnOut = function spawn(cmd, args, options) {
    var instance = npm.spawn(cmd, args, options);

    if(instance.stdout) {
        instance.stdout.pipe(process.stdout);
    }
    if(instance.stderr) {
        instance.stderr.pipe(process.stderr);
    }
};

module.exports.spawnSyncOut = function spawn(cmd, args, options) {
    var instance = npm.spawnSync(cmd, args, options);

    if(instance.tsdout) {
        console.log(instance.stdout.toString());
    }

    if(instance.stderr) {
        console.error(instance.stderr.toString());
    }
};
