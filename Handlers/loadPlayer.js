function loadPlayer (client) {
  const { white, green } = require('chalk')

  // require("./Player/loadDistube.js")(client);
  // require("./Player/loadContent.js")(client);
  require('./Player/loadSetup.js')(client)
  // require("./Player/loadUpdate.js")(client);
}

module.exports = { loadPlayer }
