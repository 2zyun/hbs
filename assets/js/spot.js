define(['jquery'], function($){
    function foo(){
　　　　//todo
        $('.filtercriteria li>a').on('click',function(){
            $(this).addClass('selected').parent().siblings().children().removeClass('selected');
        });
　　}
　　return {
　　　　foo : foo
　　};
});