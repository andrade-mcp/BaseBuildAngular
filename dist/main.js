
var _     = require('lodash');
var chalk = require('chalk');

module.exports = function(options){

  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);
  var baseBuildName  = chalk.bgWhite( chalk.black('[ ' + 'Base Build ' + chalk.underline.red('Angular') + ' ]') ) + ' ';

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modulesData){
    var value      = options.modulesData[key].uses;
    var category   = chalk.green(' external ');
    var useMode    = '';

    !options.modulesData[key] && (options.modulesData[key] = {});
    var moduleData = options.modulesData[key];

    !moduleData.notStart ? (useMode = 'required') : (useMode = 'using');
    moduleData.requireName = value;

    if(defaultOptions.modulesData[key] && value === defaultOptions.modulesData[key].defaultValue && !moduleData.isExternal){
      category = chalk.cyan(' built-in ');
    } else {
      moduleData.isDefault = false;
      moduleData.requireName = process.cwd() + "/" + value;
    }

    if(!moduleData.notStart){
      var module = require( moduleData.requireName );
      _.isFunction(module) && module(options);
    }

    console.log( baseBuildName + useMode + category + chalk.magenta(value) + ' module');

  }
}