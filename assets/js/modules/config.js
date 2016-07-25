//  
require.config({  
    
    paths:{        
        'domready':'domready',
        'jquery': '../../../node_modules/jquery/dist/jquery-1.11.3.min',
        'bootstrap': '../../../node_modules/bootstrap/dist/js/bootstrap.min',
        'tojson':'../jquery.json.min',
        'i18next':'../../../node_modules/i18next/i18next.min',
        'i18nextXHRBackend':'../i18nextXHRBackend.min',
        'i18next-jquery':'../i18next-jquery.min',
        'i18n':'../modules/i18n',
        'handlebars':'../../../node_modules/handlebars/dist/handlebars',
        'module_spot':'../module.hbs',
        'showdiv1':"showtable1", 
        'home':'home'
    },  
      
    //shim专门用来配置不兼容的模块。每个模块要定义。例如此例中handlebars，不是符合AMD规范  
    //----属性1：exports值（输出的变量名），表明这个模块外部调用时的名称；  
    //----属性2：deps数组，表明该模块的依赖性。  
     shim: {        
        'bootstrap':{
            deps:['jquery'],
            exports: 'bootstrap'
        },
        'tojson':{
            deps:['jquery'],
            exports: 'tojson'
        },
        'handlebars': {  
            exports: 'Handlebars'
        },
        'i18n': {
            deps: ['jquery','i18next','i18nextXHRBackend','i18next-jquery']
        }
    }

});


require(["domready",'i18n','home'],function(doc,i18n,home){
    home.init();
},function (err) {
    var failedId = err.requireModules && err.requireModules[0];
    if (failedId === 'home') {
        requirejs.undef(failedId);
    }
});