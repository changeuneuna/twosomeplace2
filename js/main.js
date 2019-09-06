$(function(){            
    //swiper =======================================================================================
    var setting={
        loop: true,
        pagination: {
            el: '.main-area .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.main-area .swiper-button-next',
            prevEl: '.main-area .swiper-button-prev',
        },
    }
    var newmenuSetting={
        loop: true,
        pagination: {
            el: '.newmenu-area .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.newmenu-area .swiper-button-next',
            prevEl: '.newmenu-area .swiper-button-prev',
        },
        breakpoints:{        
            767: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            },
        }
    };
    var mainSwiper = new Swiper('.main-area .swiper-container', setting);
    var newmenuSwiper = new Swiper('.newmenu-area .swiper-container', newmenuSetting);
    var play;
    var noticeCopy= $('.info-area .info').html();
    $(window).resize(function(){
        var windowW=$(this).width();
        var newmenuImag=[];
        if(windowW<768){
            newmenuImag=['img/newmenu_mb_1.jpg', 'img/newmenu_mb_2.jpg', 'img/newmenu_mb_3.jpg', 'img/newmenu_mb_4.jpg', 'img/newmenu_mb_5.jpg'];
        }else{
            newmenuImag=['img/newmenu_1.jpg', 'img/newmenu_2.jpg', 'img/newmenu_3.jpg', 'img/newmenu_4.jpg', 'img/newmenu_5.jpg'];
        }
        mainSwiper.destroy();
        newmenuSwiper.destroy();
        $('.newmenu-area .swiper-slide').each(function(i){
            $(this).find('img').attr('src',newmenuImag[i]);
        })
        mainSwiper= new Swiper('.main-area .swiper-container',setting);
        newmenuSwiper= new Swiper('.newmenu-area .swiper-container',newmenuSetting);
        newmenuSwiper.on('slideChange', function(){
            var realIndex=newmenuSwiper.realIndex;
            console.log(realIndex);
            
            $('.new-list li').each(function(i){
                if(i==0){
                    var realIndex=newmenuSwiper.realIndex;
                    realIndex--;
                    if(realIndex<0){realIndex=newmenuImag.length-1;}
                    $(this).find('img').attr('src',newmenuImag[realIndex])
                }else{
                    var realIndex=newmenuSwiper.realIndex;
                    realIndex++;
                    if(realIndex>=newmenuImag.length){realIndex=0;}
                    $(this).find('img').attr('src',newmenuImag[realIndex])
                }
                console.log(realIndex);
            });
        })


        $('.gnb ul').removeAttr('style');
        $('.gnb a').removeClass('active');
        $('.gnb > li, .depth2-bg').off('mouseenter');
        $('.gnb > li > a').off('click');
        $('.gnb, .depth2-bg').off('mouseleave');

         //메뉴 네비게이션 드롭다운
        if(windowW>767){
            console.log('pc');
            $('.gnb >li, .depth2-bg').on('mouseenter',function(){
                $('.gnb > li > a').removeClass('active');
                $(this).children('a').addClass('active');
                $('.gnb ul, .depth2-bg').stop(true).slideDown();
            });
            
            $('.gnb, .depth2-bg').on('mouseleave',function(){
                $('.gnb > li > a').removeClass('active');
                $('.gnb ul, .depth2-bg').stop(true).slideUp();
            })
        }else{
            $('.gnb > li > a').on('click',function(){
                $('.gnb > li > a').removeClass('active');
                $(this).addClass('active');
                $(this).find('i').toggleClass('active');
                $(this).next().stop(true).slideToggle();
            });
        }   

        //공지사항 롤링
        clearInterval(play)
        if(windowW<767){
            play=setInterval(move, 3000);
        }else{
            $('.info-area .info').empty().append(noticeCopy);
        }
    }).resize();

    var eventSwiper = new Swiper('.event-area .swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        pagination: {
            el: '.event-area .swiper-pagination',
            clickable: true,
        },
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });

    var swiper3;
    swiper3=new Swiper('.swiper3 > .swiper-container',{
        navigation:{
            nextEl: '.swiper3 > .swiper-button-next',
            prevEl: '.swiper3 > .swiper-button-prev',
        },
        slidesPerView: 4,
        pagination: {
            el: '.swiper3 > .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            991: {
                slidesPerView: 3,                        
                spaceBetween: '10px',
            },                    
            767: {
                slidesPerView: 'auto',                        
                spaceBetween: '10px',
            }
        }
    });
    $('.tab-menu li i').click(function(){
        $('.tab-menu li i').removeClass('active');
        $(this).addClass('active');
    })
    var swiper4;
    $('.tab-menu li a').click(function(){
        $('.tab-menu li a').removeClass('active');
        $(this).addClass('active');
        var id=$(this).attr('href');
        $('.content').hide();
        $(id).show();
        console.log(swiper3);
        console.log(swiper4);
        if(swiper3!=undefined){swiper3.update();}//swiper가 객체생성이 되었다면 업데이트를 해라(undefined가 정의되었다면)
        if(swiper4!=undefined){swiper4.update();}
        
        if(swiper4==undefined){
            swiper4=new Swiper('.swiper4 > .swiper-container',{
                navigation:{
                    nextEl: '.swiper4 > .swiper-button-next',
                    prevEl: '.swiper4 > .swiper-button-prev',
                },
                slidesPerView: 4,
                pagination: {
                    el: '.swiper4 > .swiper-pagination',
                    clickable: true
                },
                breakpoints: { 
                    991: {
                        slidesPerView: 3,                        
                        spaceBetween: '10px',
                    },                    
                    767: {
                        slidesPerView: 'auto',                        
                        spaceBetween: '10px',
                    }
                }
            });
        }

    })

    $('#btn-menu, #btn-close').click(function(){
        $('nav').toggleClass('open');
        $('.mo-depth2-bg').toggle();
    })

   
  

    $(window).scroll(function(){
        var windowW=$(this).width();
        var scrollTop=$(this).scrollTop();
        if(windowW>767){
            if(scrollTop>150){
                $('header').addClass('scroll');
                $('.go-top').fadeIn();
            }else{
                $('.go-top').fadeOut();
                $('header').removeClass('scroll');
            }
        }else{
            $('header').removeClass('scroll');
        }
    })

    $('.go-top').click(function(){
        $('html, body').animate({scrollTop:0},1000);
        return false;
    })


    //전체검색창 드롭다운
    $('.icon-search').click(function(){
        $('.gnb').after(`<div class="popup-bg"></div>`);
        $(this).next().css('display','block');
        $(this).toggleClass('icon-search icon-close-category');
        $('.search-bg').slideToggle();
    })


    //카테고리검색창 드롭다운
    $('.select').click(function(e){
        e.preventDefault();
        if($(this).find('ul').css('display')!='block'){
            $('.select').find('i').removeClass('active');
            $('.select ul').slideUp();
            $(this).find('ul').slideDown();
            $(this).find('i').addClass('active');  
        }else{
            $(this).find('ul').slideUp();
            $(this).find('i').removeClass('active');
        }
    })
    $('.select ul').on('click', 'a' ,function(e){
        $(this).parents('.select').find('a').removeClass('active');
        e.preventDefault();
        $(this).addClass('active');
        $(this).parents('.select').find('ul').slideUp();
        $(this).parents('.select').find('i').toggleClass('active');
    })
    $('html').click(function(e){
        e.preventDefault();
        if(!$(e.target).is('.select *')){
            $('.select ul').slideUp();
            $('.select').find('i').removeClass('active');
        }
    })
    
    $('body').on('click','.icon-search',function(){
        $('.search-bg').slideUp();
        $('.popup-bg').remove();
    })

    //카테고리
    var category={
        category0:{
            categoryName:'전체',
            result:['전체']
        },
        category1:{
            categoryName:'커피 & 음료',
            result:['전체','에스프레소','블렌디드','티','기타']
        },
        category2:{
            categoryName:'디저트',
            result:['전체','디저트','아이스크림','빙수','마카롱/초코렛']
        },
        category3:{
            categoryName:'델리',
            result:['전체','샌드위치','샐러드','베이커리']
        },
        category4:{
            categoryName:'상품',
            result:['전체','커피상품','커피웨어/기타','기프트세트']
        },
        category5:{
            categoryName:'홀케이크',
            result:['전체','무스케이크','생크림케이크']
        },
    }

    for(var key in category){
        $('.select-all ul').append(`<li><a href="#${key}">${category[key]['categoryName']}</a></li>`);
    }

    $('.select-all ul').on('click', 'a',function(e){
        e.preventDefault();
        var categoryName=$(this).attr('href').substring(1);
        var name=$(this).text();
        // console.log(name);
        $('.select-all > a').text(name);
        $('.select-result ul').empty();
        $('.select-result > a').text('세부분류');     
        $('.select-result ul').empty();
        for(var i in category[categoryName]['result']){
            $('.select-result ul').append(`<li><a href="#">${category[categoryName]['result'][i]}</a></li>`)
        }   
    })

    $('.select-result ul').on('click', 'a', function(){
        var resultName=$(this).text();
        console.log(resultName);
        $('.select-result > a').text(resultName);
    })

    //배너 애니메이션
    $(window).scroll(function(){
        var nowIndex=0;
        if($(this).scrollTop() >= 850){
            $('.banner').eq(nowIndex).find('.banner-img').addClass('move');
        }
    }).scroll();

    function move(){
        $('.notice-list').animate({
            'margin-top':-50
        },function(){
            $('.notice-list li').first().appendTo('.notice-list');
            $('.notice-list').css('margin-top',0);
        })
    }

    $('.login').click(function(){
        $('#id, #password').val('');
        $('.popup').after(`<div class="login-bg"></div>`);
        $('.popup').show();
    })

    $('#btn-login').click(function(){
        var id=$('#id').val();
        var pw=$('#password').val();
        $('.message').remove();
        if(id==''){
            $('#id').after('<p class="message">아이디값을 입력하세요.</p>')
        }else if(pw==''){
            $('#password').after('<p class="message">비밀번호를 입력하세요.</p>')
        }else{
            $('.popup').hide(); 
            $('.login-bg').css('display','none');
            $('.pc > .login > a').text('로그아웃');
            $('.login').find('a').addClass('active'); 
            $('.nav-etc').show();
            
        }
    })
    $('#id, #password').keyup(function(){
        var loginText=$(this).val().length;
        if(loginText!==0){
            $(this).next('.message').remove();
        }
    })
    $('.popup-title button').click(function(){
        $('.popup').hide(); 
        $('.login-bg').css('display','none');
    })

})