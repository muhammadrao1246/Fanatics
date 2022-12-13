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
        input: $("#generalSearch"),
      },
      columns: [
        {
          field: "Description",
          type: "text"
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
          field: "Date",
          type: "date",
          format: "YYYY-MM-DD",
        },
        {
          field: "Status",
          title: "Status",
          autoHide: false,
          // callback function support for column rendering
          template: function (row) {
            var status = {
              1: { title: "Enable", class: " kt-badge--success" },
              2: { title: "Disable", class: " kt-badge--danger" },
            };
            return (
              '<span id="product_status_updater" style="cursor:pointer;" class="kt-badge ' +
              status[row.Status].class +
              ' kt-badge--inline kt-badge--pill">' +
              status[row.Status].title +
              "</span>"
            );
          },
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
            return (
              '<span class="kt-badge kt-badge--' +
              status[row.Type].state +
              ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' +
              status[row.Type].state +
              '">' +
              status[row.Type].title +
              "</span>"
            );
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
