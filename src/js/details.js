// 夺宝
function detailsFn() {
    var details = {
        init: function () {
            _this = this;

            _this.exchange();
        },
        exchange: function () {
            // 兑换
            var number = $(".buy_num .txt").html();
            $('#Red').on('click', function () {
                number--;
                if (number < 0) {
                    number = 0;
                }
                $(".buy_num .txt").html(number);
            });
            $('#Inc').on('click', function () {
                number++;
                $(".buy_num .txt").html(number);
            });
        }
    }
    details.init();
};
$(function () {
    detailsFn();
});