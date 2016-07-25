define(["jquery","handlebars"],function($,Handlebars){
    var showtable1 = {
  
        reterDiv:function(data){
              
            var source = $("#spotList").html();
            var template = Handlebars.compile(source);
            var html = template(data);
            $(".spot").html(html);
            
        }
    };
    return showtable1;
})  