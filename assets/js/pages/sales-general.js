"use strict";
// Class definition

var KTDatatableHtmlTableDemo = (function () {
  // Private functions

  // demo initializer
  var demo = function () {
    var datatable = $(".kt-datatable").KTDatatable({
      data: {
        saveState: { cookie: false },
      },
      search: {
        input: $("#ingeneralSearch"),
      },
      columns: [
        {
          field: "Description",
          type: "text",
        },
        {
          field: "Price",
          type: "number",
        },
        {
          field: "ID",
          type: "number",
        },
        {
          field: "Dates",
          type: "date",
          format: "YYYY-MM-DD",
        },
        {
          //   field: "Statuss",
          //   title: "Status",
          //   autoHide: false,
          // callback function support for column rendering
          //   template: function (row) {
          //     var status = {
          //       1: { title: "Enable", class: " kt-badge--success" },
          //       2: { title: "Disable", class: " kt-badge--danger" },
          //       3: { title: "Updated", class: " kt-badge--warning" },
          //       4: { title: "Deleted", class: " kt-badge--danger" },
          //       5: { title: "Added", class: " kt-badge--dark" }
          //     };
          // return
          // (
          //   '<span class="kt-badge ' +
          //   status[row.Status].class +
          //   ' kt-badge--inline kt-badge--pill">' +
          //   status[row.Status].title +
          //   "</span>"
          // );
          //   },
        },
        {
          field: "Type",
          title: "Type",
          autoHide: false,
          // callback function support for column rendering
          template: function (row) {
            var status = {
              1: { title: "Online", state: "danger" },
              2: { title: "Retail", state: "primary" },
              3: { title: "Direct", state: "success" },
            };
            // return (
            //   '<span class="kt-badge kt-badge--' +
            //   status[row.Type].state +
            //   ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' +
            //   status[row.Type].state +
            //   '">' +
            //   status[row.Type].title +
            //   "</span>"
            // );
          },
        },
      ],
    });

    $("#kt_form_status").on("change", function () {
      datatable.search($(this).val().toLowerCase(), "Status");
    });

    $("#kt_form_type").on("change", function () {
      datatable.search($(this).val().toLowerCase(), "Type");
    });

    $("#kt_form_status,#kt_form_type").selectpicker();
  };

  return {
    // Public functions
    init: function () {
      // init dmeo
      demo();
    },
  };
})();

jQuery(document).ready(function () {
  KTDatatableHtmlTableDemo.init();
});
