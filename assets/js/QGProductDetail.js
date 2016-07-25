$(function () {
    var template = Handlebars.compile($("#content-box-template").html()); //编译模板
    $.ajax({
        type: "GET",
        url: "../json/QGProductDetail.json",
        data: "json",
        success: function (data) {
            dataBind(data);
            leftRightBtn();
            i18nextFn();
        }
    });

    //数据绑定中间层数据
    function dataBind(data) {
        //；单位
        Handlebars.registerHelper('compareProPrice', function (items, options) {
            if (!isNaN(items))
                return '<span class="product-content-unit" data-i18n="unit.currency"></span>';
            return "";
        });
        Handlebars.registerHelper('compareWeightT', function (items, options) {
            if (!isNaN(items))
                return '<span class="product-content-unit" data-i18n="unit.weight-t"></span>';
            return "";
        });

        //附加信息处理
        Handlebars.registerHelper('list', function (items, options) {
            //包装
            var info = '';
            if (items["Packing"]) {
                info += createInfo("product.packing", items["Packing"]);
            }
            //单包重量
            if (items["SingleWeight"] && items["SingleWeight"] != -1) {
                info += createInfo("product.singleWeight", items["SingleWeight"], "unit.weight-kg");
            }
            //颜色
            if (items["Color"]) {
                info += createInfo("product.color", items["Color"]);
            }
            //密度
            var densityFlag = (items["Density"] && items["Density"] != -1) ? true : false,
                densityValueFlag = (items["DensityValue"] && items["DensityValue"] != -1) ? true : false;
            if (densityFlag || densityValueFlag) {
                info += '<li>';
                info += '<span data-i18n="product.density"></span>';
                info += '<span>：</span>';
                if (densityValueFlag) {//显示百分比值
                    info += '<span>' + items["DensityValue"] + '</span>';
                    info += '<span data-i18n="unit.percent"></span>';
                    info += '<span>&nbsp;</span>';
                }
                if (densityFlag) {//显示描述
                    info += '<span data-i18n="density.density' + items["Density"] + '"></span>';
                }
                info += '</li>';
            }
            //加工原料
            if (items["Processing"]) {
                info += createInfo("product.processing", items["Processing"]);
            }
            //杂质
            if (items["Impurity"] && items["Impurity"] != -1) {
                info += createInfo("product.impurity", items["Impurity"], "unit.percent");
            }
            //水分
            if (items["Moisture"] && items["Moisture"] != -1) {
                info += createInfo("product.moisture", items["Moisture"], "unit.percent");
            }
            //目数
            var meshNumberFlag = (items["Meshnumber"] && items["Meshnumber"] != -1) ? true : false,
                layerNumberFlag = (items["LayerNumber"] && items["LayerNumber"] != -1) ? true : false;
            if (meshNumberFlag || layerNumberFlag) {
                info += '<li>';
                info += '<span data-i18n="product.meshNumber"></span>';
                info += '<span>：</span>';
                if (layerNumberFlag) {//显示层
                    info += '<span>' + items["LayerNumber"] + '</span>';
                    info += '<span data-i18n="unit.layer"></span>';
                    info += '<span>&nbsp;</span>';
                }
                if (meshNumberFlag) {//显示目
                    info += '<span>' + items["Meshnumber"] + '</span>';
                    info += '<span data-i18n="unit.mesh"></span>';
                }
                info += '</li>';
            }
            //含钙量
            if (items["Calcium"] && items["Calcium"] != -1) {
                info += createInfo("product.calcium", items["Calcium"], "unit.percent");
            }
            //阻燃性
            if (items["Combustion"]) {
                info += createInfo("product.combustion", items["Combustion"]);
            }
            return info;
        });
        $("#content-box").html(template(data));
    }

    //创建一条附加信息
    function createInfo(key_en, val, unit) {
        if (!key_en || !val) return "";
        var info = "";
        info += '<li>';
        info += '<span data-i18n="' + key_en + '"></span>';
        info += '<span>：</span>';
        info += '<span>' + val + '</span>';
        if (unit) {
            info += '<span data-i18n="' + unit + '"></span>';
        }
        info += '</li>';
        return info;
    }

    //小图片左右按钮
    function leftRightBtn() {
        var $imgBig = $(".content-pic-big img"),
            $btnLeft = $(".content-pic-list-btn.btn-left"),
            $btnRight = $(".content-pic-list-btn.btn-right"),
            $minImgList = $(".content-pic-list li img"),
            $minImgUl = $(".content-pic-list ul"),
            $minImgListLen = $minImgList.length;

        //点击小图,切换显示大图
        $minImgList.on("click", changeBigImg);

        //首次显示时右按钮有效
        if ($minImgListLen > 3) {
            $btnRight.addClass("valid");
        }

        var step = 0, pace = 80;
        //左按钮点击切换
        $btnLeft.on("click", function () {
            if ($(this).hasClass("valid")) {
                if (step > 0) {
                    step--;
                    scroll($minImgUl, "left", pace);
                    $btnRight.addClass("valid");
                    if (step == 0) $(this).removeClass("valid");
                    var $checkImgIndex = $minImgList.index($minImgList.parent().find(".check"));
                    if ($checkImgIndex > step + 2) changeBigImg.call($minImgList.eq(step + 2));
                }
            }
        });

        //右按钮点击切换
        $btnRight.on("click", function () {
            if ($(this).hasClass("valid")) {
                if ($minImgListLen - 3 > step) {
                    step++;
                    scroll($minImgUl, "left", -pace);
                    $btnLeft.addClass("valid");
                    if ($minImgListLen - 3 == step) $(this).removeClass("valid");
                    var $checkImgIndex = $minImgList.index($minImgList.parent().find(".check"));
                    if ($checkImgIndex < step) changeBigImg.call($minImgList.eq(step));
                }
            }
        });

        //切换大图
        function changeBigImg() {
            $minImgList.removeClass("check");
            var imgSrc = $(this).addClass("check").attr("src");
            $imgBig.attr("src", imgSrc);
        }

        //滚动动画
        function scroll($ele, attr, val) {
            var step = 0,
                $attrOld = parseFloat($ele.css(attr)),
                pace = val / 10;
            var timer = window.setTimeout(move, 10);

            function move() {
                window.clearTimeout(timer);
                step++;
                $ele.css(attr, $attrOld + pace * step);
                if (step < 10) timer = window.setTimeout(move, 10);
            }
        }
    }
    //i18next
    function i18nextFn(){
        i18next.use(i18nextXHRBackend).init({
            lng: 'cn',
            ns: 'QGProductDetail',
            defaultNS: 'QGProductDetail',
            load: 'currentOnly',
            backend: {
                loadPath: "../assets/locales/{{lng}}/{{ns}}.json"
            },
            fallbackLng: false,
            debug: false
        }, function (err, t) {
            i18nextJquery.init(i18next, $);
            $('[data-i18n]').localize();
        });
    }
});



