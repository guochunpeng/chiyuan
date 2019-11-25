var totalAmount = 6000;
var susongAmount = 50;
var baoquanAmount = 30;
var detailData = [];
var susongDetailData = [];
$("#btn-profit").click(function () {
    caculate();
});
$("#btn-reset").click(function () {
   clear();

});
function clear() {
    $("#fee_detail tfoot").html("");
    $("#bigAmount").html("");
    $("#jkje").val("");
}
function caculate() {
    var amount = $("#jkje ").val();
    totalAmount = 6000;
    susongAmount = 50;
    baoquanAmount = 30;
    detailData = [];
    susongDetailData = [];
    baoquanDetailData = [];
    var detailItem = {name: "0~1万 ", value: 6000};
    detailData.push(detailItem);
    detailCaculate(amount, 10000, 100000, 0.07, 0);
    detailCaculate(amount, 100000, 500000, 0.06, 0);
    detailCaculate(amount, 500000, 1000000, 0.05, 0);
    detailCaculate(amount, 1000000, 5000000, 0.04, 0);
    detailCaculate(amount, 5000000, 10000000, 0.03, 0);
    detailCaculate(amount, 10000000, 20000000, 0.02, 0);
    if (amount > 20000000) {
        currentAmount = (amount - 20000000) * 0.01;
        totalAmount += (currentAmount);
        var detailItem = {name: "2000万以上 ", value: currentAmount};
        detailData.push(detailItem);
    }
    var detailItem2 = {name: "0~1万 ", value: 50};
    susongDetailData.push(detailItem2);
    detailCaculate(amount, 10000, 100000, 0.025, 1);
    detailCaculate(amount, 100000, 200000, 0.02, 1);
    detailCaculate(amount, 200000, 500000, 0.015, 1);
    detailCaculate(amount, 500000, 1000000, 0.01, 1);
    detailCaculate(amount, 1000000, 2000000, 0.009, 1);
    detailCaculate(amount, 2000000, 5000000, 0.008, 1);
    detailCaculate(amount, 5000000, 10000000, 0.007, 1);
    detailCaculate(amount, 10000000, 20000000, 0.006, 1);
    if (amount > 20000000) {
        currentAmount = (amount - 20000000) * 0.005;
        susongAmount += (currentAmount);
        var detailItem2 = {name: "2000万以上 ", value: currentAmount};
        susongDetailData.push(detailItem2);
    }
    if (amount > 100000) {
        currentAmount = (amount - 100000) * 0.005;
        baoquanAmount += (currentAmount);
        if(baoquanAmount>5000){
        	 baoquanAmount=5000;
        }
    }
  
    pushdetailItems();
};

function pushdetailItems() {
    $("#fee_detail tfoot").html("");
    var childs="";
    childs += "<tr style='height: 40px;' align='center'>" +
        "<td  width='33%' style='text-align: center'><span style='margin: 0 auto'>" + totalAmount + "</span></td>" +
        "<td  width='33%' style='text-align: center'><span style='margin: 0 auto'>" + susongAmount + "</span></td>" +
        "<td  width='33%' style='text-align: center'><span style='margin: 0 auto'>" + baoquanAmount + "</span></td>" +
        "</tr>";
    $("#fee_detail tfoot").html(childs);
}

function detailCaculate(amount, min, max, pro, type) {
    if (amount <= min) {
        return;
    }
    var currentAmount = 0;
    if (amount <= max) {
        currentAmount = parseInt((amount - min) * pro);
    } else {
        currentAmount = parseInt((max - min) * pro);
    }
    if (0 == type) {
    totalAmount += (currentAmount);
    }else{
        susongAmount+=currentAmount;
    }
    var detailItem = {
        name: ((min / 10000) + "万~" + (max / 10000) + "万"),
        value: currentAmount
    };
    if (0 == type) {
        detailData.push(detailItem);
    } else {
        susongDetailData.push(detailItem);
    }
};

$("#jkje").keyup(function() {
    var amount = $("#jkje").val();
    if(amount.length>12){
        clear();
        alert("数据过大，请重试");
        return;
    }
    if(/[^\d]/.test($("#jkje").val())) {
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    };
    $("#bigAmount").html(digitUppercase(amount));
});
var digitUppercase = function(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for(var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for(var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for(var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};