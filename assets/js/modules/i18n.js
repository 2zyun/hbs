define(['jquery','i18next','i18nextXHRBackend','i18next-jquery'],function ($,i18,i18xb,i18j) {
    return function(){
       i18.use(i18xb).init({
	        lng: 'cn', 
	        ns: 'test',
	        defaultNS: 'test',
	        load: 'currentOnly',
	        backend: {
	          loadPath: "../locales/{{lng}}/{{ns}}.json"
	        },
	        fallbackLng: false,
	        debug: false
      	}, function(err, t) {
	        i18j.init(i18, $);
	        $('[data-i18n]').localize();
      	});
    }
});

