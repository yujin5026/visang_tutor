
$(function(){
    // 패스워드 입력 시 버튼 활성화
    $("#join_password").on("keyup", function() {
        var flag = true;
        flag = $(this).val().length > 0 ? false : true;
        $('#join_button').attr('disabled', false);
    });
})