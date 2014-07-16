// Dependencies
var CaptchaPng = require("captchapng");

// Sessions
var sessions = {};

// Captcha configuration
var serverConfig = {
    width: 100,
    height: 30
};

// Get configuration
M.emit("captcha.getConfig", function (c) {
    serverConfig = c;
});

// Verify captcha
M.on("captcha.verify", function (link, answer, callback) {
    var sid = link.session && link.session._sid;
    callback(answer === sessions[sid]);
});

/**
 * captcha
 * Serves the captcha image
 *
 * @name captcha
 * @function
 * @param {Object} link Mono link object
 * @return
 */
exports.captcha = function (link) {

    var res = link.res;

    // Generate number and store it in sessions cache
    var number = parseInt(Math.random() * 9000 + 1000);
    if (!link.session || !link.session._sid) {
        sessions[link.session._sid] = number;
    }

    var cap = new CaptchaPng(serverConfig.width, serverConfig.height, number);
    var img = cap.getBase64();
    var imgBase64 = new Buffer(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });

    res.end(imgBase64);
};
