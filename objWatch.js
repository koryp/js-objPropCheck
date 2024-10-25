/**
 * Sets an interval to watch for the existence of either:
 * - a property in an object; or
 * - an element in a DOM object
 * If found, a callback function is executed.
 * An option for number of attempts may be set which, if exceeded, executes a
 * failure callback function.
 *
 * @param {Object}   obj  The object to watch.
 * @param {string}   prop property (or element) to detect within the object.
 * @param {Object}   [opt] Options
 * @param {number}   [opt.attempts=0]  Number of attempts. 0 for unlimited.
 * @param {number}   [opt.delay=100]   Miliseconds between each check.
 * @param {boolean}  [opt.debug=false] Output debugging to the console.
 * @param {function} [opt.callback]    Called when property is detected.
 * @param {function} [opt.failure]     Called when attempts are exceeded.
 * @returns {void}
 */
function objWatch(obj, prop, opt) {
  const args = { obj: obj, prop: prop, opt: opt }
  const defaults = {
    attempts: 0,
    delay: 100,
    debug: false,
    callback: (result, args) => console.log("objWatch success", result, args),
    failure: (args) => console.log("objWatch failure", args),
  }
  const usage = "objWatch( <obj> , <prop> [ , <opt> ] )"
  if (
    typeof obj !== "object" ||
    typeof prop !== "string" ||
    prop.length === 0
  ) {
    console.error(usage, { opt: defaults })
    throw new Error("objWatch - invalid arguments")
  }
  const options = Object.assign({}, defaults, opt)
  args.opt = options
  let interval = null
  let attempts = 0
  const watch = () => {
    attempts++
    if (options.debug) {
      console.log("objWatch.watch", attempts, args)
    }
    if (typeof obj.querySelectorAll === "function") {
      let elements = obj.querySelectorAll(prop)
      if (elements.length > 0) {
        clearInterval(interval)
        options.callback(
          elements,
          Object.assign({}, args, { attempts: attempts }),
        )
      } else if (options.attempts > 0 && attempts >= options.attempts) {
        clearInterval(interval)
        options.failure(Object.assign({}, args, { attempts: attempts }))
      }
    } else {
      if (typeof obj[prop] !== "undefined") {
        clearInterval(interval)
        options.callback(
          obj[prop],
          Object.assign({}, args, { attempts: attempts }),
        )
      } else if (options.attempts > 0 && attempts >= options.attempts) {
        clearInterval(interval)
        options.failure(Object.assign({}, args, { attempts: attempts }))
      }
    }
  }
  interval = setInterval(watch, options.delay)
}
