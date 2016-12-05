exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['smoke.js'],
	baseUrl: 'http://localhost:8085',
	suites: {
		'vote-winner': 'specs/vote/vote-winner.spec.js',
		'vote-delayed': 'specs/vote/vote-delayed.spec.js',
		'vote-best-player': 'specs/vote/vote-best-player.spec.js',
		'vote-demo': 'specs/vote/vote-demo.spec.js',
		'vote-jubileusz': 'specs/vote/vote-jubileusz.spec.js',
		'zawodnik': 'specs/vote/vote-zawodnik.spec.js',
		smoke: 'smoke.js',
		full: ['specs/vote/vote-zawodnik.spec.js', 'specs/vote/vote-best-player.spec.js']
	},
	//chromeDriver: 'C:/Users/marcin/Downloads/chromedriver_win32/chromedriver.exe',
	capabilities: {
		browserName: 'chrome'
	},
	params: {
		timeouts: {
			big : 5000,
			small: 2000
		},
		user: {
			facebook: {
				name: 'dusrijx_schrockman_1452007570@tfbnw.net',
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