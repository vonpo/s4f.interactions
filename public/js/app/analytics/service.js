define(function () {
	var ga = window.ga;
	var started = false;

	function trackPage(options) {
		if (!ga) {
			return;
		}
		ga('send', 'pageview', options.url);
	}

	function bootstrapAnalytics(gaCode) {
		if (typeof(gaCode) === 'undefined') {
			console.info('no google analytics set');
			return;
		}


		started = true;
		if (!ga) {
			return;
		}
		ga('create', gaCode, 'auto');
	}

	function handleRouteChange() {
		if (typeof (ga) === 'undefined' || !started) {
			return;
		}

		trackPage({url: window.location.pathname});
	}

	return {
		bootstrapAnalytics : bootstrapAnalytics,
		handleRouteChange: handleRouteChange
	}
});