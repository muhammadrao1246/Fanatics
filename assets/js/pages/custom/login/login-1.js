"use strict";

// Class Definition
var KTLoginV1 = (function () {
  var login = $("#kt_login");

  var showErrorMsg = function (form, type, msg) {
    var alert = $(
      '<div class="alert alert-bold alert-solid-' +
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
    KTUtil.animateClass(alert[0], "fadeIn animated");
  };

  // Private Functions
  var handleSignInFormSubmit = function () {
    $("#kt_login_signin_submit").click(function (e) {
      e.preventDefault();

      var btn = $(this);
      var form = $("#kt_login_form");

      form.validate({
        rules: {
          username: {
            required: true,
          },
          password: {
            required: true,
          },
        },
      });

      if (!form.valid()) {
        return;
      }

      KTApp.progress(btn[0]);

      setTimeout(function () {
        KTApp.unprogress(btn[0]);
      }, 2000);

      // ajax form submit:  http://jquery.malsup.com/form/
      form.ajaxSubmit({
        url: "Fanatics/Controllers/auth/Login_Controller.php",
        success: function (response, status, xhr, $form) {
          // similate 2s delay
          setTimeout(function () {
            KTApp.unprogress(btn[0]);

            if (xhr.responseText == "true")
              showErrorMsg(form, "success", "You've Logged in Successfully!");
            else if (xhr.responseText == "password_check_failed")
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
          }, 2000);
        },
      });
    });
  };

  // Public Functions
  return {
    // public functions
    init: function () {
      handleSignInFormSubmit();
    },
  };
})();

// Class Initialization
jQuery(document).ready(function () {
  KTLoginV1.init();
});
