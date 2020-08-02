jQuery.validator.addMethod("math",
    function(value, element, params) {
        var sign = params[0];
        var result;
        switch (sign) {
            case "*":
                result = params[1] * params[2];
                break;
            case "/":
                result = params[1] / params[2];
                break;
            case "-":
                result = params[1] - params[2];
                break;
            default:
                result = params[1] + params[2];
        }
        return this.optional(element) || value == result;
    },
    jQuery.validator.format("Please enter the correct value for {0} + {1} + {2}"));
jQuery.validator.addClassRules("math_class", {
    required: true,
    math: ['*', 5, 6]
});
jQuery.validator.setDefaults({
    // 仅做校验，不提交表单
    debug: true,
    // 提交表单时做校验
    onsubmit: true,
    // 焦点自动定位到第一个无效元素
    focusInvalid: true,
    // 元素获取焦点时清除错误信息
    focusCleanup: true,
    //忽略 class="ignore" 的项不做校验
    ignore: ".ignore",
    // 忽略title属性的错误提示信息
    ignoreTitle: true,
    // 为错误信息提醒元素的 class 属性增加 invalid
    errorClass: "invalid",
    // 为通过校验的元素的 class 属性增加 valid
    validClass: "valid",
    // 使用 <em> 元素进行错误提醒
    errorElement: "em",
    // 使用 <li> 元素包装错误提醒元素
    wrapper: "li",
    // 将错误提醒元素统一添加到指定元素
    //errorLabelContainer: "#error_messages ul",
    // 自定义错误容器
    errorContainer: "#error_messages, #error_container",
    // 自定义错误提示如何展示
    showErrors: function(errorMap, errorList) {
        $("#error_tips").html("Your form contains " + this.numberOfInvalids() + " errors, see details below.");
        this.defaultShowErrors();
    },
    // 自定义错误提示位置
    errorPlacement: function(error, element) {
        error.insertAfter(element);
    },
    // 单个元素校验通过后处理
    success: function(label, element) {
        console.log(label);
        console.log(element);
        label.addClass("valid").text("")
    },

    highlight: function(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
    },
    //校验通过后的回调，可用来提交表单
    submitHandler: function(form, event) {
        console.log($(form).attr("id"));
        //$(form).ajaxSubmit();
        //form.submit();
    },
    //校验未通过后的回调
    invalidHandler: function(event, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        if (errors) {
            var message = errors == 1 ? 'You missed 1 field. It has been highlighted': 'You missed ' + errors + ' fields. They have been highlighted';
            console.log(message);
        }
    }
});
//自定义验证方法    username中不能有中文  只能是数字和字母
jQuery.validator.addMethod("userLimit", function(value, element) {
    var flag=true;
    var reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
    /*var chine = [\u4e00-\u9fa5];*/
    if(reg.test(value)){
        flag=true;
    }else{
        flag=false;
    }
    return this.optional(element)||(flag);
}, "用户名必须含有数字和字母，且不能包含中文");

$("#loginForm").validate({
    rules: {
        username: {
            required: true,
            minlength: 5,//不能少于5位
            userLimit:{
                required: true,
            }
        },
        password: {
            required: true,
            minlength: 6,
        },

    },
    messages: {
        username: {
            required: "请输入用户名",
            minlength: "用户名必需由五个字母或数字组成",
        },
        password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
        },
    }
});