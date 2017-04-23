module.exports = {
    scripts: {
        default: "node npm_scripts/start.js",
        extract_pot: "node npm_scripts/extract_pot.js",
        build: "node ./npm_scripts/build.js",
        test: "./node_modules/.bin/istanbul cover --dir ./coverage ./node_modules/.bin/_mocha -- -R spec -t 15000 --recursive --slow 2"
    }
};
