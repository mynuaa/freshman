var comment = function() {
    window.uyan_config = {
        title:'纸飞机新生手册',
        su:'zfj-freshman',
        url:'http://my.nuaa.edu.cn/'
    };
    $('#content').append('<div id="uyan_frame"></div><script id="UYScript" src="http://v2.uyan.cc/code/uyan.js?uid=2051019" async=""></script>');
}
var init = function() {
    $.get('../markdown/freshman.md', function(data) {
        var html = markdown.toHTML(data);
       html = html.replace(/<h2>(.*)——(.*) (.*)<\/h2>/g, "<h2>$1</h2><div class=\"sub-header\">$2<br>$3</div>");
        html = html.replace(/@@/g, '');
        html = html.replace(/<p>@@<\/p>/g, '</div></div>');
        html = html.replace(/\\n/g, '<br>'); // 匹配 \n 为 <br>
        html = html.replace(/<p>[ ]+/, '<p>'); // 去除 <p> 标签开头的空白
         // html = html.replace(/<p>(<img alt="cover".*>)<\/p>/g, '$1');
    html = html.replace(/<img .*>/g, '');
      var jq = $(html);
        $('#content').html(jq);
         var index = jq.clone().filter('h1, h2');
       $('#index').html(index);
        comment();
        $('h1, h2').on('click', function() {
            var text = $(this).text();
            $('#content h1, #content h2').each(function() {
                if($(this).text() == text) {
                    var y = $(this).offset().top - 40;
                    window.scrollTo(0, y);
                }
            });
        });
    });

};
$(document).ready(function(){
  $("#cover,#open-sb").click(function(){
    $("#cover").fadeOut(1000, function(){
        $("#cover").remove();
    });
  });
});


$(document).ready(function(e) {
    //页面滚动事件
    init();
    $(window).scroll(function(){
        //获取窗口已滚动的高度
        var windowScrollTop=$(window).scrollTop();
        var oTools=$("#tools");
            //如果大约100PX，就渐显出“回到顶部”，否则即隐藏
            if(windowScrollTop>100)
            {
                oTools.fadeIn();
                }else{
                        oTools.fadeOut();
                    }
        });
         
    $("#top").click(function(){
        //点击“回到顶部”，滚动到顶部，并带动画效果
            $("html,body").animate({scrollTop:0},1000);
        }); 
});
$( document ).ready(function() {
   $.ajaxSetup({
        cache: false
    });
    $( '.sidebar' ).simpleSidebar({
       settings: {
            opener: '#open-sb',
            wrapper: '.wrapper',
           animation: {
                 duration: 500,
                easing: 'easeOutQuint',
            }
        },
        sidebar: {
            align: 'left',
            width:170,
           closingLinks: 'a',
        }
         });

  });

$(".sidebar dt").css({"background":""});
$(function(){
    $(".sidebar dd").hide();
    $(".sidebar dt").click(function(){
        $(".sidebar dt").css({"background": ""});
        $(this).css({"background": "#00CED1"});
        $(this).parent().find('dd').removeClass("menu_chioce");
    
        $(".menu_chioce").slideUp(); 
        $(this).parent().find('dd').slideToggle();
        $(this).parent().find('dd').addClass("menu_chioce");
    });

})