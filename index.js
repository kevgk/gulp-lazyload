module.exports = function (plugins) {
  if ((plugins === null) || (typeof plugins !== 'object')) {
    throw new Error(`Invalid plugin list passed. \
Plugin list should be key-value hash containing plugin and module names. \
You passed ${plugins}.`
    );
  }

  for (let plugin in plugins) {
    const module = plugins[plugin];
    if (global[plugin]) {
      throw new Error(`Property '${plugin}' exists on global object. Change plugin name to different.`);
    }
    (function (plugin, module) {
      return Object.defineProperty(global, plugin,
        {
          get() {
            let name;
            return this[name = `_${plugin}`] || (this[name] = require(module));
          }
        });
    })(plugin, module);
  }
};
