const config = require('config').get('facebook');
const passport = require('passport');
const userService = require('../user/service');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const oneHour = 60000 * 60;
const Schema = require('../db/db').Schema;

var FacebookTokenStrategy = require('passport-facebook-token');

exports.setupPassport = function (app) {
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, callback) => Schema.User.findById(id, callback));
	passport.use(new FacebookTokenStrategy({
			clientID: config.get('appId'),
			clientSecret: config.get('secret'),
			profileUrl: config.get('userInfo'),
			enableProof: true
		}, function (accessToken, refreshToken, profile, done) {
			userService.findOneOrCreate(profile, done);
		}
	));

	app.use(session({
		secret: 'xxxxxxxxx23caXXX#%#t',
		saveUninitialized: true,
		resave: true,
		cookie: {maxAge: oneHour},
		store: new MongoStore({
			mongooseConnection: Schema.connection
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
};

exports.facebookAuth = function () {
	if (config.skipSecurity) {
		return function (req, res, next) {
			Schema.User
				.findOne({})
				.exec((err, user) => {
					req.user = user;
				next();
			});
		};
	} else {
		return passport.authenticate('facebook-token');
	}
};