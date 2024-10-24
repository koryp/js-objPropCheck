/**
 * Sets an interval to check for the existence of a property in an object.
 * If the property is defined, a callback function is executed.
 * An option for number of attempts may be set which, if exceeded, executes a
 * failure callback function.
 *
 * @param {Object}   obj  The object that should contain the specified property.
 * @param {string}   prop The property to detect within the specified object.
 * @param {Object}   [opt] Options
 * @param {number}   [opt.attempts=0]  Number of attempts. 0 for unlimited.
 * @param {number}   [opt.delay=100]   Miliseconds between each check.
 * @param {boolean}  [opt.debug=false] Output debugging to the console.
 * @param {function} [opt.callback]    Called when property is detected.
 * @param {function} [opt.failure]     Called when attempts are exceeded.
 * @returns {void}
 */
function objPropCheck(obj, prop, opt) {
  const properties = {
    obj  : obj,
    prop : prop,
    opt  : opt,
  }
  const defaults = {
    attempts : 0,
    delay    : 100,
    debug    : false,
    callback : ()=>console.log( 'objPropCheck success', properties ),
    failure  : ()=>console.log( 'objPropCheck failure', properties ),
  };
  const usage = 'objPropCheck( <obj>, <prop>, [<options>] )';
  if ( ( typeof obj !== 'object' ) ||
       ( typeof prop !== 'string' || prop.length === 0 ) ) {
    console.error( usage, {options: defaults} );
    throw new Error( 'objPropCheck - invalid properties' );
  }
  const options = { ...defaults, ...opt };
  properties.opt = options;
  let interval = null;
  let attempts = 0;
  const check = () => {
    attempts++;
    if ( options.debug ) {
      console.log( 'objPropCheck.check', attempts, properties );
    }
    if ( typeof obj[prop] !== 'undefined' ) {
      clearInterval(interval);
      properties.attempts = attempts;
      options.callback( properties );
    } else
    if ( options.attempts > 0 ) {
      if ( attempts >= options.attempts ) {
        clearInterval(interval);
        properties.attempts = attempts;
        options.failure( properties );
      }
    }
  };
  interval = setInterval( check, options.delay );
};
