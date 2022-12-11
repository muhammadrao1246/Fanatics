"use strict";

let data = "";

window.addEventListener("load", (e) => {
  // Class Definition
  var KTProductGeneral = (function () {
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

    var handleProductFormSubmit = function () {
      $("#kt_product_submit").click(function (e) {
        e.preventDefault();

        var btn = $(this);
        var form = $(this).closest("form");

        form.validate({
          rules: {
            name: {
              required: true,
              pattern: "[a-zA-Z ]+",
            },

            description: {
              required: true,
            },
            size: {
              required: true,
              //   pattern: "[small,large,medium,extra large]",
            },
            price: {
              required: true,
              pattern: "[0-9 ]+",
            },
            qty: {
              required: true,
              pattern: "[0-9 ]+",
            },
          },
          messages: {
            name: {
              pattern: "Only letters are allowed.",
            },
            price: {
              pattern: "Price should be in numbers",
            },
            qty: {
              pattern: "Quantity should be in number",
            },
            size: {
              pattern: "size should be (small, medium, large, extra large)",
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

        form.ajaxSubmit({
          url: "Fanatics/Controllers/auth/SignUp_Controller.php",
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            setTimeout(function () {
              btn
                .removeClass(
                  "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
                )
                .attr("disabled", false);

              // display signup form
              // displaySignInForm();
              // var signInForm = login.find(".kt-login__signin form");
              // signInForm.clearForm();
              // signInForm.validate().resetForm();

              if (xhr.responseText == "true") {
                showErrorMsg(form, "success", "You've Signed in Successfully!");
                form.clearForm();
                form.validate().resetForm();
                setTimeout(() => {
                  window.location.href = "Fanatics/dashboard/";
                }, 1500);
              } else if (xhr.responseText == "password_check_failed")
                showErrorMsg(
                  form,
                  "danger",
                  "Passwords are Different. Please type again."
                );
              else if (xhr.responseText == "User_exists_already")
                showErrorMsg(
                  form,
                  "danger",
                  "Username Already Exists. Try Another."
                );
              else
                showErrorMsg(
                  form,
                  "danger",
                  "Some Error Happened. Please try Again."
                );
            }, 2000);
          },
        });
      });
    };

    // Public Functions
    return {
      // public functions
      init: function () {
        handleProductFormSubmit();
      },
    };
  })();

  // Class Initialization
  jQuery(document).ready(function () {
    KTProductGeneral.init();
  });
});
