
exports.config = {
	onPrepare: function() {
        var reporters = require('jasmine-reporters');
        var junitReporter = new reporters.JUnitXmlReporter({
            savePath: './e2etests',
            consolidateAll: false
        });
        jasmine.getEnv().addReporter(junitReporter);
	},
	getPageTimeout: 20000,
	jasmineNodeOpts: {
		defaultTimeoutInterval: 70000
	},
	capabilities: {
		browserName: 'chrome'
	},
	seleniumAddress: 'http://192.168.1.146:4445/wd/hub',
	directConnect: false,
	//specs: ['specs/vote/vote-winner.spec.js', 'specs/vote/vote-best-player.spec.js'],
	specs: ['specs/vote/vote-winner.spec.js', 'specs/vote/vote-delayed.spec.js'],
	baseUrl: 'https://screen4fans.com',
	suites: {
		'vote-winner': 'specs/vote/vote-winner.spec.js',
		'vote-best-player': 'specs/vote/vote-best-player.spec.js',
		'vote-jubileusz': 'specs/vote/vote-jubileusz.spec.js',
		'zawodnik': 'specs/vote/vote-zawodnik.spec.js',
		smoke: 'smoke.js',
		full: ['specs/vote/vote-zawodnik.spec.js', 'specs/vote/vote-best-player.spec.js']
	},
	params: {
		timeouts: {
			big : 2000,
			small: 2000
		},
		user: {
			facebook: {
				name: 'fkhzdfc_vijayvergiyasky_1455057494@tfbnw.net',
				password: 'testowehaslo'
			}
		},
		vote: {
			winner: 'kto-wygra',
			bestPlayer: 'test-best-player',
            jubileusz: 'tychy-ankieta',
            zawodnik: 'zawodnik'
		}
	}
};