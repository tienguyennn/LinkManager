﻿function calculateSoTienConLai() {
    if ($("#SO_TIEN_KHACH_PHAI_NOP_ID").length > 0) {
        var so_tien_dat_coc = $("#DatCoc_TienDatCoc_show").val();
        var so_tien_da_dong = $("#SO_TIEN_DA_DONG_ID").val();
        so_tien_dat_coc = so_tien_dat_coc.trim().replace(/,/gi, "");
        so_tien_da_dong = so_tien_da_dong.trim().replace(/,/gi, "");
        var total = so_tien_dat_coc - so_tien_da_dong;
        if (total > 0) {
            $("#SO_TIEN_KHACH_PHAI_NOP_ID").html(format(total));
        }
    }
}

function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && unicode != 46 && unicode != 37 && unicode != 39 && unicode != 35 && unicode != 36 && unicode != 9) {
        if (unicode < 48 || unicode > 57) {
            return false;
        }
    }
};

function customNumberOnly(event) {
    var unicode = event.charCode ? event.charCode : event.keyCode;
    if (unicode != 8 && unicode != 46 && unicode != 37 && unicode != 39 && unicode != 35 && unicode != 36 && unicode != 9) {
        if (unicode < 48 || unicode > 57) {
            return false;
        }
    }
    currencyFormat(event.target.id)
    return true;
}

///@author: duynn
///@created date: 2/11/2017
function pressNumberOnly(event, isSemiColonFormat) {
    var unicode = event.charCode ? event.charCode : event.keyCode;
    if (unicode != 8 && unicode != 46 && unicode != 37 && unicode != 39 && unicode != 35 && unicode != 36 && unicode != 9) {
        if (unicode < 48 || unicode > 57) {
            return false;
        }
    }
    if (isSemiColonFormat) {
        formatSemiColon(event.target.id)
    }
    return true;
}
///@author: duynn
///@created date: 2/11/2017
function formatSemiColon(selectorId) {
    setTimeout(function () {
        var value = $('#' + selectorId).val().replace(/,/g, "").toString();
        var parts = value.split('').reverse();
        var count = parts.length;
        for (var i = 0; i < count - 1; i++) {
            if ((i + 1) % 3 === 0) {
                parts[i] = "," + parts[i];
            }
        }
        value = parts.reverse().join("");
        $('#' + selectorId).val(value);
    }, 100);
}

function numberSoLuong(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;

    if (unicode != 8 && unicode != 37 && unicode != 39 && unicode != 35 && unicode != 36 && unicode != 46 && unicode != 9) {
        if (unicode < 48 || unicode > 57)
            return false;
    } else {
        if (unicode == 39)
            return false;
    }
};

//hàm format tiền tệ
var format = function (num) {
    var str = num.toString(), parts = false, output = [], i = 1, formatted = null;
    if (str.indexOf(".") > 0) {
        parts = str.split(".");
        str = parts[0];
    }
    str = str.split("").reverse();
    for (var j = 0, len = str.length; j < len; j++) {
        if (str[j] != ",") {
            output.push(str[j]);
            if (i % 3 == 0 && j < (len - 1)) {
                output.push(",");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    return (formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};

function currencyFormat(id) {
    var str = $('#' + id).val().replace(/,/g, "");
    str = format(str);
    $('#' + id).val(str);
}

//hàm keyup tiến hành thực hiện format tiền tệ
function FormatCurrency(obj) {
    var id = obj.getAttribute("id");
    if ($("#" + id + "").val() != format($("#" + id + "").val())) {
        $("#" + id + "").val(format($("#" + id + "").val()));
    }

    //test

    var _check = $("#" + id + "").val().charAt(0);
    //console.log(_check);
    if ($("#" + id + "").val().indexOf("0") == 0) {
        return false;
    }
    if (_check == ",") {
        var test_last = $("#" + id + "").val();
        var test_after = test_last.substring(1, test_last.length);
        $("#" + id + "").val(test_after);
    }
    //if (_check == "0") {
    //    //console.log(2);
    //    if ($("#" + id + "").val().trim().length == 3) {
    //        var test_last = $("#" + id + "").val();
    //        var test_after = test_last.substring(1, test_last.length);
    //        $("#" + id + "").val(test_after);
    //        console.log(test_last);
    //        console.log(test_after);
    //    }
    //    else {
    //        //var test_last = $("#" + id + "").val();
    //       // var test_after = $("#" + id + "").val().substring(2, $("#" + id + "").val().length);
    //        $("#" + id + "").val($("#" + id + "").val().substring(2, $("#" + id + "").val().length));
    //        //console.log(test_last);
    //        //console.log(test_after);
    //    }

    //}
    //entest
    calculateSoTienConLai();
};

//hàm focusout đẩy giá trị tiền tệ xuống hidden
function AssignValue(obj) {
    var id = obj.getAttribute("id");
    var id_hidden = id.substring(0, id.length - 5);
    $("#" + id + "").val(format($("#" + id + "").val()));
    var hiden_val = $("#" + id + "").val().replace(/,/gi, "");
    $("#" + id_hidden + "").val(hiden_val);
    //console.log(id.substring(0,id.length-5));
};

//function FormatCurrency(obj) {
//    var id = obj.getAttribute("id");
//    if ($("#" + id + "").val() != format($("#" + id + "").val())) {
//        $("#" + id + "").val(format($("#" + id + "").val()));
//    }
//};

//hàm check giá trị tỉ lệ chiết khấu, lãi suất
function CheckPercent(obj) {
    var id = obj.getAttribute("id");
    if ($("#" + id + "").val() > 100) {
        $("#CHECK_VALUE_" + id + "").css('display', 'inline');
    } else {
        $("#CHECK_VALUE_" + id + "").css('display', 'none');
    }
}

//@author duynn
//@created date
//@default class = 'number-field'
function preventCopyAndPaste(event) {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        return false;
    }
    return true;
}