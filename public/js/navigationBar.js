(function ($) { // Begin jQuery
  $(function () { // DOM ready

    ///////////////////////////////////////////////
    // 동적 상단 네이게이션 메뉴 아이템 생성
    //////////////////////////////////////////
    // 로고
    var title_name = "MY DISNEY";
    var $logo = $("<a>"+title_name+"</a>").attr({
      href: "http://localhost:3000/",
    });
    $(".brand").append($logo);

    const MENU_ITEM_COUNT = 3;
    for (var i = 0; i < MENU_ITEM_COUNT; i++) {
      var $menu_item = $("<li></li>");

      switch (i) {
        case 0:
          var $my_a = $("<a>홈 화면</a>").attr({
            href: "http://localhost:3000/",
          });
          $($menu_item).append($my_a);
          break;
        case 1:
          const SUB_MENU_ITEM_COUNT = 2;
          var $my_a = $("<a>닮은꼴 캐릭터 찾기</a>").attr({
            href: "#!",
          });
          var $sub_ul = $("<ul></ul>").addClass("nav-dropdown");

          for (var j = 0; j < SUB_MENU_ITEM_COUNT; j++) {
            var $sub_menu_item = $("<li></li>");

            switch (j) {
              case 0:
                var $my_sub_a = $("<a>영화 캐릭터</a>").attr({
                  href: "http://localhost:3000/movie",
                });
                break;
              case 1:
                var $my_sub_a = $("<a>애니메이션 캐릭터</a>").attr({
                  href: "http://localhost:3000/ani",
                });
                break;
              default:
                break;
            }
            $($sub_menu_item).append($my_sub_a);
            $($sub_ul).append($sub_menu_item);
          }

          $($menu_item).append($my_a);
          $($menu_item).append($sub_ul);
          break;
        case 2:
          var $my_a = $("<a>팀원 소개</a>").attr({
            href: "http://localhost:3000/intro",
          });

          $($menu_item).append($my_a);
          break;
        case 3:
          break;
        default:
          break;
      }

      $(".nav-list").append($menu_item);
    }


    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function (e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function () {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function () {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active');
    });

  }); // end DOM ready
})(jQuery); // end jQuery