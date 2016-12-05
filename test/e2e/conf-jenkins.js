
exports.config = {
	onPrepare: function() {
        var reporters = require('jasmine-reporters');
        var junitReporter = new reporters.JUnitXmlReporter({
            savePath: './e2etests',
            consolidateAll: false
        });
        jasmine.getEnv().addReporter(junitReporter);
	},
	capabilities: {
		browserName: 'chrome'
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
	directConnect: false,
	specs: ['specs/vote/vote-winner.spec.js', 'specs/vote/vote-best-player.spec.js'],
	baseUrl: 'http://test.glosuj.mobi',
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
				name: 'xeklhxn_lausky_1467120745@tfbnw.net',
				password: 'Kurwamac6'
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