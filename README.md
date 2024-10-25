# objWatch
## Description
A simple, vanilla javascript function that sets an interval to watch for the existence of either:

* a property in an object; or
* an element in the DOM

and execute a callback if/when found.

## Usage
    objWatch( <obj> , <prop> [ , <opt> ] )

### Arguments

<dl>  
  
<dt>obj</dt>
<dd>The object to watch.</dd>

<dt>prop</dt>
<dd>A string representing the property name or the element selector to detect within the object.</dd>

<dt>opt</dt>
<dd>An options object</dd>

<dt>opt.attempts</dt>
<dd>Number of attempts. 0 for unlimited. Default: 0</dd>

<dt>opt.delay</dt>
<dd>Miliseconds between each check. Default: 100</dd>

<dt>opt.debug</dt>
<dd>Boolean for outputing debugging to the console. Default: false</dd>

<dt>opt.callback</dt>
<dd>Callback function when a property or element is detected. Default:<br/><code>(result, args) => console.log("objWatch success", result, args)</code>
</dd>

<dt>opt.failure</dt>
<dd>Callback function when attempts are exceeded. Default:<br/><code>(args) => console.log("objWatch failure", args)</code>
</dd>

</dl>
