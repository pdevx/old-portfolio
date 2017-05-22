
/**
 * Module dependencies
 */

var akeypair = require('akeypair'),
    express = require('express'),
	  routes = require('./routes'),
	  api = require('./routes/api'),
	  https = require('https'),
	  http = require('http'),
	  bodyParser = require('body-parser'),
		passwordless = require('passwordless'),
		cors = require('cors'),
		MongoStore = require('passwordless-mongostore'),
		MongoClient = require('mongodb').MongoClient,
		assert = require('assert'),
		email   = require("emailjs"),
		session = require('express-session'),
		router = express.Router(),
	  path = require('path');
    
var app = module.exports = express();

/**
* Configuration
*/

// cors
var whitelist = ['http://portfolio-angrybearmusic.rhcloud.com/','http://localhost:3000/'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: 'GET,POST'
};

app.options('/', cors(corsOptions));
app.use('/',cors(corsOptions));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({limit: '250mb', extended: false}));
 
// parse application/json 
app.use(bodyParser.json({limit: '250mb'}));

// Passwordless implementation

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var smtpServer  = email.server.connect({
   user:    'angrybearmusicnodemailer@gmail.com', 
   password: 'Sumer!@n1', 
   host:    'smtp.gmail.com', 
   ssl:     true
});

var pathToMongoDb = process.env.OPENSHIFT_MONGODB_DB_URL;
// var pathToMongoDb = 'mongodb://127.0.0.1/passwordless-simple-mail';

MongoClient.connect(pathToMongoDb, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

passwordless.init(new MongoStore(pathToMongoDb));

passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        var host = 'http://portfolio-angrybearmusic.rhcloud.com/login';
        smtpServer.send({
            text:    'Hello!\nAccess secured content here:  ' 
            + host + '?token=' + tokenToSend + '&uid=' 
            + encodeURIComponent(uidToSend), 
            from:    'James K Hester', 
            to:      recipient,
            subject: 'Token for access to secure content: '
        }, function(err, message) { 
            if(err) {
                console.log(err);
            }
            callback(err);
        });
});

app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken());

/* GET login screen. */
router.get('/login', function(req, res) {
   res.redirect('http://portfolio-angrybearmusic.rhcloud.com/restricted/index');
});

/* POST login details. */
router.post('/sendtoken', 
    passwordless.requestToken(
        // Turn the email address into an user ID
        function(user, delivery, callback, req) {
            // usually you would want something like:
          //   User.find({email: user}, callback(ret) {
          //      if(ret)
          //         callback(null, ret.id)
          //      else
          //         callback(null, null)
          // })
          // but you could also do the following 
          // if you want to allow anyone:
          callback(null, user);
        }),
    function(req, res) {
       // success!
          res.redirect('http://portfolio-angrybearmusic.rhcloud.com/sent');
});

// You can also protect a full path, by doing:
router.use('/restricted', passwordless.restricted());

// Logout
router.get('/logout', passwordless.logout(),
    function(req, res) {
        res.redirect('/');
});

app.use('/', router);

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || 'localhost');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);
app.post('/api/contact', api.contact);
app.post('/api/htmlextract', api.htmlExtract);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

akeypair({cert:true},function(err,options){
  console.log(options);
  http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
});