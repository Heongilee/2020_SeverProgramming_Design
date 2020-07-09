///////////////////////////////////////////////////////////////////
// 결과 페이지 디스플레이에 필요한 두 이미지 띄우는거 관련
/////////////////////////////////////////////////////
$(document).ready(function () {
    var img1 = $('#img1').css('background-image');
    var img2 = $('#img2').css('background-image');

    $('#img1').hover(function () {
        $('#img1').css('background-image', img2);
        $('#img2').css('background-image', img1);
    }, function () {
        $('#img1').css('background-image', img1);
        $('#img2').css('background-image', img2);
    });

    $('#img2').hover(function () {
        $('#img1').css('background-image', img2);
        $('#img2').css('background-image', img1);
    }, function () {
        $('#img1').css('background-image', img1);
        $('#img2').css('background-image', img2);
    });
});

$(document).ready(function () {
    // 내 사진
    var dataImage = JSON.parse(localStorage.getItem('my_param'))['my_img'];
    var $myImg = $("<img>").addClass("img_item").attr({
        src: dataImage,
    });
    $("#img1").append($myImg);

    // 테스트 출력
    console.log(JSON.parse(localStorage.getItem('my_param'))['classes']);

    // 가장 높은 probability 찾기
    var max_cn = "";
    var max_prob = 0.0;
    JSON.parse(localStorage.getItem('my_param'))['classes'].forEach(e => {

        if(parseFloat(e['probability']) > max_prob){
            max_prob = parseFloat(e['probability']);
            max_cn = e['className'];
        } else {
            // nothing...
        }
    });

    // 결과에 대한 대표 사진
    $.getJSON("../asset/Representative_image_list.json", function (json) {
        var $resultImg = $("<img>").addClass("img_item").attr({
            src: json[max_cn],
        });
        $("#img2").append($resultImg);
    });

    console.log(max_cn +" 이(가) "+ max_prob * 100 +"% 일치합니다!");
    $(".description > p").text(max_cn +" 이(가) "+ max_prob * 100 +"% 일치합니다!");


    // // 끝으로 로컬스토리지 클리어
    localStorage.clear();

    // $.getJSON("../asset/Representative_image_list.json", function(json) {
    //     console.log(json['test']); // this will show the info it in firebug console
    // });

});