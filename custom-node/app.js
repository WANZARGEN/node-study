/**--------------------------------------------------------------------------*
 * 
 *
 * @module app.js
 *
 * @description :: Server app module.
 * 
 * @author wanzargen
 * 
 * @since 2018-08-02
 * 
 * 
 *----------------------------------------------------------------------------*/



 /**---------------------------------------------------------------------------*
 *                                    INCLUDE                                 *
 *----------------------------------------------------------------------------*/

var express       = require('express'),
    path          = require('path'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    cors          = require('cors'),
    logger        = require('morgan'),
    indexRouter   = require('./routes/index')



/**---------------------------------------------------------------------------*
 *                                    PRIVATE                                 *
 *----------------------------------------------------------------------------*/
var app = express() 

var detectDebug = function() {
  return process.env.NODE_ENV == 'development'
};

/**---------------------------------------------------------------------------*
 *                                 MIDDLEWARES                                *
 *----------------------------------------------------------------------------*/

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cookie-parser
app.use(cookieParser())

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use((req,res,next) => {
  let origin = req.headers.origin || req.headers.host;
  req.headers.origin = origin.startsWith('http://') ? origin : 'http://' + origin;
  next()
})

// Cross-origin setup
var whitelist = [
  'http://localhost:8080', 
  'http://127.0.0.1:8080',
  'http://localhost:8081', 
  'http://127.0.0.1:8081', 
  'http://127.0.0.1:3000', 
  'http://localhost:3000', 
  `http://localhost:${process.env.PORT}`, 
  `http://127.0.0.1:${process.env.PORT}`
]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// Static File Service
app.use(express.static(path.join(__dirname, '../vue-test/dist')))
app.use('/service2', express.static(path.join(__dirname, '../vue-test2/dist')))

// Link Routers
app.use('/api/', indexRouter)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});




/**---------------------------------------------------------------------------*
 *                                      LOG                                   *
 *----------------------------------------------------------------------------*/

app.use(logger('dev'));

["log", "warn", "error"].forEach(function(fn) {

	var org = console[fn].bind(console);

	console[fn] = function() {

		var now = new Date();
		var arg = Array.prototype.slice.call(arguments);
		var tag = '[' + now.toTimeString().slice(0, 8) + '.' + now.getMilliseconds() + ']';

		arg.unshift(tag);

        org.apply(console, arg);
    };
});


console.log('\n\n')
console.log(`\t  __ __ __ __ _    _ _       ___   __ _      _ _   / _\` |   ___    _ _    `)
console.log(`\t  \\ V  V // _\` |  | ' \\     |_ /  / _\` |    | '_|  \\__, |  / -_)  | \' \\   `)
console.log(`\t   \\_/\\_/ \\__,_|  |_||_|   _/__|  \\__,_|   _|_|_   |___/   \\___|  |_||_|`)
console.log(`\t _|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| `)
console.log(`\t "\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-' `)
console.log(`\n`)

console.log(detectDebug() ? "This is development mode." : "This is production mode.")
console.log(`SERVER LISTEN AT ${process.env.PORT||"3000"}`)


/**---------------------------------------------------------------------------*
 *                                    EXPORTS                                 *
 *----------------------------------------------------------------------------*/

module.exports = app
