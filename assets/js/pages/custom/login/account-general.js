"use strict";

var request = new XMLHttpRequest();

window.addEventListener("load", (e) => {
  // Class Definition
  var KTLoginGeneral = (function () {
    var account = $("#kt_account");

    var showErrorMsg = function (form, type, msg) {
      var alert = $(
        '<div class="alert alert-' +
          type +
          ' alert-dismissible" role="alert">\
          <div class="alert-text">' +
          msg +
          '</div>\
          <div class="alert-close">\
                    <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>\
                </div>\
        </div>'
      );

      form.find(".alert").remove();
      alert.prependTo(form);
      //alert.animateClass('fadeIn animated');
      KTUtil.animateClass(alert[0], "fadeIn animated");
      alert.find("span").html(msg);
    };

    var handleInfoUpdateForm = function () {
      $("#kt_account_form_submit").click(function (e) {
        console.log("working");
        e.preventDefault();
        var btn = $(this);
        var form = $("#account_form");

        form.validate({
          ignore: ":hidden",
          rules: {
            name: {
              required: true,
              pattern: "[a-zA-Z ]+",
            },
            profile_image: {
              required: false,
            },
            address: {
              required: true,
            },
            contactNo: {
              required: true,
            },
            email: {
              required: true,
              email: true,
            },
            password: {
              minlength: 8,
              pattern: "(([a-zA-Z0-9]+)||([ ]{0,0}))",
            },
            rpassword: {
              minlength: 8,
              pattern: "(([a-zA-Z0-9]+)||([ ]{0,0}))",
            },
          },
          messages: {
            password: {
              minlength: "Password must be atleast 8 characters long.",
              pattern: "Only letters and numbers allowed.",
            },
            rpassword: {
              minlength: "Password must be atleast 8 characters long.",
              pattern: "Only letters and numbers allowed.",
            },
          },
        });

        if (!form.valid()) {
          return;
        }

        btn
          .addClass(
            "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
          )
          .attr("disabled", true);

        //MY LOGIC
        request = new XMLHttpRequest();

        var myForm = new FormData(document.getElementById("account_form"));
        request.onload = function () {
          // similate 2s delay
          setTimeout(function () {
            btn
              .removeClass(
                "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
              )
              .attr("disabled", false);

            if (request.responseText == "true") {
              showErrorMsg(
                form,
                "success",
                "You've Information Updated Successfully!"
              );
              setTimeout(() => {
                window.location.href = "../account/";
              }, 1500);
            } else if (request.responseText == "image_size_greater_than_1MB")
              showErrorMsg(form, "danger", "Image size greater than 1 MB!  ");
            else if (request.responseText == "image_mime_type_not_allowed")
              showErrorMsg(
                form,
                "danger",
                "Only JPG, PNG and JPEG image formats are supported. "
              );
            else if (request.responseText == "password_check_failed")
              showErrorMsg(
                form,
                "danger",
                "Passwords not matching. Please try again."
              );
            else
              showErrorMsg(
                form,
                "danger",
                "Some Error Happened. Please try Again."
              );
          }, 2000);
        };
        request.open(
          "POST",
          "../Controllers/account/Account_Controller.php",
          true
        );
        request.send(myForm);
      });
    };

    // Public Functions
    return {
      // public functions
      init: function () {
        handleInfoUpdateForm();
      },
    };
  })();

  // Class Initialization
  jQuery(document).ready(function () {
    KTLoginGeneral.init();
  });
});
