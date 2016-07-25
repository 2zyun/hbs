require.config({
    paths: {
        'jquery': '../../node_modules/jquery/dist/jquery-1.11.3.min',
        'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min',
        'i18next':'../../node_modules/i18next/i18next.min',
        'i18nextXHRBackend':'i18nextXHRBackend.min',
        'i18next-jquery':'i18next-jquery.min',
        'i18n':'modules/i18n',
        'handlebars':'../../node_modules/handlebars/dist/handlebars',
        'module_spot':'module.hbs'

    },
    shim  : {
        'bootstrap':{
            deps:['jquery'],
            exports: 'bootstrap'
        },
        'handlebars': {  
            exports: 'Handlebars'
        },
        'i18n': {
            deps: ['jquery','i18next','i18nextXHRBackend','i18next-jquery']
        }
    }
});
 
/*require(['jquery','i18next','i18nextXHRBackend','i18next-jquery'], function($,i18,i18xb,i18j) {
    $(function(){
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
    });
});*/

/*require(['handlebars','module_spot'],function(){
    var spotlistHtml =  Handlebars.templates.module(retriveSpotListData());
    $(".spot").html(spotlistHtml);
});*/


/*define(function(require){
    'use strict'

    require(['jquery','i18n'],function($,i18n){ 
        
       try{
            console.log(i18n);

        }catch(e){
            console.error(e);
        }
    });



    require(['jquery','handlebars','module_spot','i18n'],function($,hbs,ms,i18n){
        console.log($);
        console.log(hbs);
        var spotListData;
        $.ajax({
            url:'http://192.168.1.5:8008/home/GetXianHuoSupply',
            dataType : "jsonp",
            jsonp: "",
            jsonpCallback:"",
            success:function(data){
                console.log(data);
                if (data != null) {
                    spotListData = data;
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);  
                console.log('读取超时，请检查网络连接');
            }
        });

        var spotlistHtml =  Handlebars.templates.module(retriveSpotListData());
        $(".spot").html(spotlistHtml);

    });


    require(['bootstrap'],function(){ 
        
       try{
            console.log('OK');

        }catch(e){
            console.error(e);
        }
    });



})*/

define(["jquery","handlebars","module_spot"],function($,Handlebars){  
    var showtable1 = {  
  
        reterDiv:function(data){  
            
            console.log(Handlebars.templates.module());
            /*var source = $("#table1").html();  
            var template = Handlebars.compile(source);  
            var html = template(data)  
            $("#my_div1").html(html);

            var spotlistHtml =  Handlebars.templates.module(retriveSpotListData());
            $(".spot").html(spotlistHtml);*/
        }  
              
    };  

    console.log(showtable1);
    return showtable1;  
})



