// 有奖调查
function prizeFn(obj) {
    var prize = {
        init: function () {
            _this = this;
            var str = '',
                nameval = list_id = 0,
                phone,
                name,
                email;
            $(".one").siblings().addClass('hide');
            $(".prize_one .btn").on('click', function () {
                $(".two").removeClass("hide").siblings().addClass('hide');
            });
            $("#popup .btn").on('click', function () {
                $("#popup").removeClass('show');
            });
            $(".registered .submit").on('click', function () {
                str = '';
                name = $("#name").val();
                email = trim($('#email').val());
                phone = trim$($("#phone").val());
                if (!isName(name)) {
                    $("#popup h1").html('请输出正确的名称');
                    $("#popup").addClass('show');
                    return false;
                } else if (!isMobile(phone)) {
                    $("#popup h1").html('请输入正确的手机号码');
                    $("#popup").addClass('show');
                    return false;
                } else if (!isEmail(email)) {
                    $("#popup h1").html('请输入正确的邮箱地址');
                    $("#popup").addClass('show');
                    return false;
                } else {
                    str += "[";
                    for (var i in obj.result) {
                        str += "{ 'topic_name': '" + obj.result[i].topic_name + "', 'items': '" + obj.result[i].items + "'  },"
                    };
                    str = str.slice(0, str.length - 1);
                    str += "]";
                    $.ajax({
                        type: "post",
                        url: "<%=base%>/rtmap_easygo/more/submitQuestion",
                        data: {
                            user_name: name,
                            phone: phone,
                            email_qq: email,
                            result: str
                        },
                        success: function (json) {
                            $(".four").removeClass('hide').siblings().addClass('hide');
                        }
                    });
                    str = '';
                };
            });
            ajax({
                url: "<%=base%>/rtmap_easygo/more/getQuestionList",
                dataType: "text",
                success: function (json) {
                    var json = $.parseJSON(json).data;
                    for (var i = 0; i < json.length; i++) {
                        nameval++;
                        if (json[i].items == '' && json[i].topic_type == 2) {
                            str += '<div class="questions_' + i + '" data-name="type_' + json[i].topic_type + '" >\
                                        <h1>' + json[i].topic_name + '</h1>\
                                        <textarea class="text"></textarea>';
                        } else {
                            str += '<div class="questions_' + i + '" data-name="type_' + json[i].topic_type + '" >\
                                    <h1>' + json[i].topic_name + '</h1>\
                                    <ul>';
                            for (var j = 0; j < json[i].items.length; j++) {
                                list_id++;
                                if (json[i].topic_type == 0) { // 0 = 单选题
                                    str += '<li>\
                                                <input type="radio" id="' + list_id + '" name="radio_' + nameval + '"  value="' + json[i].items[j].item_name + '" />\
                                                <label for="' + list_id + '">' + json[i].items[j].item_name + '</label>\
                                            </li>';
                                } else {
                                    str += '<li>\
                                        <input type="checkbox" id="' + list_id + '" name="checkbox_' + nameval + '" value="' + json[i].items[j].item_name + '" />\
                                        <label for="' + list_id + '">' + json[i].items[j].item_name + '</label>\
                                    </li>';
                                };
                            };
                            str += '</ul>';
                        };
                        if (i == 0) {
                            str += '<div class="btns">\
                                        <div class="btn2 btn">下一题</div>\
                                    </div>\
                                    </div>';
                        } else {
                            str += '<div class="btns">\
                                        <div class="btn1">上一题</div>\
                                        <div class="btn2">下一题</div>\
                                    </div>\
                                    </div>';
                            // <p>第' + Number(nameval) + '题/共' + json.length + '题</p>\
                        };
                    };
                    $(".questions").append(str).attr("data-len", json.length);
                    $(".questions div").first().siblings().addClass("hide");
                    str = '';
                    _this.submit();
                }
            });
        },
        submit: function () {
            var listLen = Number($(".questions").attr("data-len"));
            var index = 0;
            var val = '';
            var btnsIndex = 1;
            $(".questions").off('click', '.btn2').on('click', '.btn2', function () {
                if ($(this).parent().parent().attr('data-name') != 'type_2') {
                    $(this).parent().prev().find('input:checked').each(function (i) {
                        val += $(this).val() + ',';
                    });
                    if (val == undefined || val == '') {
                        $("#popup h1").html('请至少选择一个');
                        $("#popup").addClass('show');
                        return false;
                    };
                    val = val.slice(0, val.length - 1);
                } else {
                    val = $(this).parent().prev().val();
                    if (val == undefined || val == '') {
                        $("#popup h1").html('请输入内容');
                        $("#popup").addClass('show');
                        return false;
                    };
                };
                obj.result[index] = {
                    "topic_name": $(this).parent().siblings('h1').html(),
                    "items": val
                };
                index++;
                btnsIndex++;
                val = '';
                if (index == listLen) {
                    $(".three").removeClass('hide').siblings().addClass('hide');
                    prize_title([0, 0]);
                    return false;
                } else {
                    // $(".questions").children().eq(index).fadeIn().siblings().fadeOut();
                    $(".questions").children().eq(index).removeClass('hide').siblings().addClass('hide');
                    prize_title([btnsIndex, listLen]);
                };
            });

            $(".questions").off('click', '.btn1').on('click', '.btn1', function () {
                if (index <= 0) {
                    index = 0;
                    return false;
                } else {
                    index--;
                    btnsIndex--;
                    // $(".questions").children().eq(index).fadeIn().siblings().fadeOut();
                    $(".questions").children().eq(index).removeClass('hide').siblings().addClass('hide');
                    prize_title([btnsIndex, listLen]);
                };
            });
            $(".prize_one .btn").on('click', function () {
                prize_title([btnsIndex, listLen]);
            });
        }
    };
    prize.init();
};
$(function () {
    var data = {
        prize: '',
        result: []
    };
    prizeFn(data);
});