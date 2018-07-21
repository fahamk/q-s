/***
* Contact Us page
**/
$(document).ready(function () {

    $("#btnSubmit").click(function (e) {

        //validate fields are not empty
        var isValid = true;
        $('#txtName,#txtEmail,#txtSubject,#txtMessage').each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
        if (isValid == false) {
            e.preventDefault();
            return false;
        }

        var inputParam = {};
        inputParam.p_Name = $('#txtName').val();
        inputParam.p_Email = $('#txtEmail').val();
        inputParam.p_Phone = "";
        inputParam.p_Subject = $('#txtSubject').val();
        inputParam.p_Message = $('#txtMessage').val();

        $.ajax({
            type: "POST",
            url: "../WebServices/WebService.asmx/SendEmail",
            data: JSON.stringify(inputParam),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var JObject = $.parseJSON(response.d);

                if (JObject.Error.length > 0) {
                    alert(JObject.Error[0].ErrorMessage);

                    // Clear fields
                    $('#txtSubject').val("");
                    $('#txtMessage').val("");
                }

            },
            failure: function (response) {
                alert(response.d);
            }
        });
    });

    

});