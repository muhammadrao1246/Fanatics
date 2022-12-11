"use strict";

let data = "";

window.addEventListener("load", (e) => {
  // Class Definition
  var KTLoginGeneral = (function () {
    var login = $("#kt_login");

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

    // Private Functions
    var displaySignUpForm = function () {
      login.removeClass("kt-login--forgot");
      login.removeClass("kt-login--signin");

      login.addClass("kt-login--signup");
      KTUtil.animateClass(
        login.find(".kt-login__signup")[0],
        "flipInX animated"
      );
    };

    var displaySignInForm = function () {
      login.removeClass("kt-login--forgot");
      login.removeClass("kt-login--signup");

      login.addClass("kt-login--signin");
      KTUtil.animateClass(
        login.find(".kt-login__signin")[0],
        "flipInX animated"
      );
      //login.find('.kt-login__signin').animateClass('flipInX animated');
    };

    var displayForgotForm = function () {
      login.removeClass("kt-login--signin");
      login.removeClass("kt-login--signup");

      login.addClass("kt-login--forgot");
      //login.find('.kt-login--forgot').animateClass('flipInX animated');
      KTUtil.animateClass(
        login.find(".kt-login__forgot")[0],
        "flipInX animated"
      );
    };

    var handleFormSwitch = function () {
      $("#kt_login_forgot").click(function (e) {
        e.preventDefault();
        displayForgotForm();
      });

      $("#kt_login_forgot_cancel").click(function (e) {
        e.preventDefault();
        displaySignInForm();
      });

      $("#kt_login_signup").click(function (e) {
        e.preventDefault();
        displaySignUpForm();
      });

      $("#kt_login_signup_cancel").click(function (e) {
        e.preventDefault();
        displaySignInForm();
      });
    };

    var handleSignInFormSubmit = function () {
      $("#kt_login_signin_submit").click(function (e) {
        e.preventDefault();
        var btn = $(this);
        var form = $(this).closest("form");

        form.validate({
          rules: {
            email: {
              required: true,
              email: true,
            },
            password: {
              required: true,
              minlength: 8,
              pattern: "(([a-zA-Z0-9]+)||([ ]{0,0}))",
            },
          },
          messages: {
            password: {
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

        form.ajaxSubmit({
          url: "Fanatics/Controllers/auth/Login_Controller.php",
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            setTimeout(function () {
              btn
                .removeClass(
                  "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
                )
                .attr("disabled", false);

              if (xhr.responseText == "true") {
                showErrorMsg(form, "success", "You've Logged in Successfully!");
                setTimeout(() => {
                  window.location.href = "Fanatics/dashboard/";
                }, 1500);
              } else if (xhr.responseText == "password_check_failed")
                showErrorMsg(
                  form,
                  "danger",
                  "Incorrect password. Please try again."
                );
              else if (xhr.responseText == "user_does_not_exists")
                showErrorMsg(
                  form,
                  "danger",
                  "Incorrect username. Please try again."
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

    var handleSignUpFormSubmit = function () {
      $("#kt_login_signup_submit").click(function (e) {
        e.preventDefault();

        var btn = $(this);
        var form = $(this).closest("form");

        form.validate({
          rules: {
            fullname: {
              required: true,
              pattern: "[a-zA-Z ]+",
            },
            email: {
              required: true,
              email: true,
            },
            address: {
              required: true,
            },
            contactNo: {
              required: true,
            },
            password: {
              required: true,
              minlength: 8,
              pattern: "(([a-zA-Z0-9]+)||([ ]{0,0}))",
            },
            rpassword: {
              required: true,
              minlength: 8,
              pattern: "(([a-zA-Z0-9]+)||([ ]{0,0}))",
            },
            agree: {
              required: true,
            },
          },
          messages: {
            fullname: {
              pattern: "Only letters are allowed.",
            },
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

    var handleForgotFormSubmit = function () {
      $("#kt_login_forgot_submit").click(function (e) {
        e.preventDefault();

        var btn = $(this);
        var form = $(this).closest("form");

        form.validate({
          rules: {
            email: {
              required: true,
              email: true,
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
          url: "f",
          success: function (response, status, xhr, $form) {
            // similate 2s delay
            setTimeout(function () {
              btn
                .removeClass(
                  "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
                )
                .attr("disabled", false); // remove
              form.clearForm(); // clear form
              form.validate().resetForm(); // reset validation states

              // display signup form
              displaySignInForm();
              var signInForm = login.find(".kt-login__signin form");
              signInForm.clearForm();
              signInForm.validate().resetForm();

              showErrorMsg(
                signInForm,
                "success",
                "Cool! Password recovery instruction has been sent to your email."
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
        handleFormSwitch();
        handleSignInFormSubmit();
        handleSignUpFormSubmit();
        handleForgotFormSubmit();
      },
    };
  })();

  // Class Initialization
  jQuery(document).ready(function () {
    KTLoginGeneral.init();
  });
});
