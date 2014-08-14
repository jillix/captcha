// Dependencies
var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    // Bind calls
    config.binds = config.binds || [];
    for (var i = 0; i < config.binds.length; ++i) {
        Bind.call(self, config.binds[i]);
    }

    /**
     * load
     * Loads the captcha image
     *
     * @name load
     * @function
     * @param {String} selector The selector where the image is loaded
     * @return {Object} Module instance
     */
    self.load = function(selector) {
        $(selector).attr("src", "/@/" + self.miid + "/captcha/");
    };

    // emit ready
    self.emit("ready", self.config);
};
