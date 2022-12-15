"use strict";

let new_prod_id = null;
let data = "";
let prod_id = null;
let nflag = 0;
let eflag = 0;
let prod_form = document.getElementById("product_form");


//When Adding New Product
let new_product_button = document.getElementById("new_product");
new_product_button.onclick = function()
{
  nflag = 1;
  eflag = 0;
  document.getElementsByClassName("kt-avatar__holder")[0].style.backgroundImage  = "url(../assets/media/products/default.png);";
  prod_form.reset();
  document.getElementById("form_manager").setAttribute("name","add_product");
}

//When User Clicks on Edit Button for specific product
function edit_called(element) 
{
  nflag = 0;
  eflag = 1;
  prod_form.reset();
  let trow= element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling;
  prod_id = Number(trow.querySelector("td:nth-child(2)").innerText);

  let formdata ;
  let xhr = new XMLHttpRequest();
  xhr.onload = function () 
  {
    formdata = JSON.parse(xhr.responseText);
    document.getElementsByClassName("kt-avatar__holder")[0].style.backgroundImage  = "url('"+formdata["product_image"]+"')";
    prod_form[2].value = formdata["product_name"];
    prod_form[3].value = formdata["product_description"];
    prod_form[4].value = formdata["product_size"];
    prod_form[5].value = formdata["product_price"];
    prod_form[6].value = formdata["product_quantity"];
  }

  xhr.open("GET", ("../Controllers/product/editProduct.php?id="+prod_id), true);
  xhr.send();

  document.getElementById("form_manager").setAttribute("name","edit_product");  
}

//When Delete button pressed
function delete_call(dis) 
{
  let trow= dis.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling;
  prod_id = Number(trow.querySelector("td:nth-child(2)").innerText);
  
  let xhr = new XMLHttpRequest();
  xhr.onload = function () 
  {
    if ( xhr.responseText != "" ) 
    {
      trow.nextSibling.remove();
      trow.remove();
    }

  }

  xhr.open("GET", ("../Controllers/product/deleteProduct.php?id="+prod_id), true);
  xhr.send();
  
}

//When Disable button pressed
function disable_call(dis) 
{
  let trow= dis.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling;
  prod_id = Number(trow.querySelector("td:nth-child(2)").innerText);
  let status = dis.getAttribute("data-value");
  let xhr = new XMLHttpRequest();
  xhr.onload = function () 
  {
    if ( xhr.responseText != "" ) 
    {
      new_prod_id = Number(xhr.responseText) ;
      setTimeout(() => 
      {
        window.location.href = "../dashboard/?product_id="+new_prod_id;
      }, 300);
    }
  }
console.log(status);
  xhr.open("GET", ("../Controllers/product/disableEnableProduct.php?id="+prod_id+"&status="+status), true);
  xhr.send();
  
}

//Preview Logic

if (!!document.getElementById("viewProductModal")) 
{
  let modal = document.getElementById("viewProductModal");
  setTimeout(() => {
    modal.classList.add("show");
    modal.style.display = "block";
  }, 1000);
  
} 

function disable_view_modal(){
  let modal = document.getElementById("viewProductModal");
  modal.classList.remove("show");
  modal.style.display = "none";
  
}

//Form handling Login Below
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
          ignore: ":hidden",
          rules: {
            name: {
              required: true,
              pattern: "[a-zA-Z ]+",
            },
            image:{
              required:false
            },
            description: {
              required: true,
              maxlength: 100
            },
            size: {
              required: true,
              pattern: "((small)|(large)|(medium)|(extra large))",
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

        //MY LOGIC
        request = new XMLHttpRequest();

        var ProductForm = new FormData(document.getElementById("product_form"));
        if(eflag) 
        {
          ProductForm.append("id",prod_id);          
          new_prod_id = prod_id;
        }

        request.onload = function () 
        {
          // similate 2s delay
          setTimeout(function () {
            btn
              .removeClass(
                "kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light"
              )
              .attr("disabled", false);

            if (((request.responseText).split(":"))[1] == "100") {
              new_prod_id = Number(((request.responseText).split(":"))[0]);
              showErrorMsg(
                form,
                "success",
                "New product added Successfully!"
              );
              setTimeout(() => {
                window.location.href = "../dashboard/?product_id="+new_prod_id;
              }, 1500);
            }
            else if (((request.responseText).split(":"))[1] == "101") {
              new_prod_id = Number(((request.responseText).split(":"))[0]);
              showErrorMsg(
                form,
                "success",
                "Product details updated successfully!"
              );
              setTimeout(() => {
                window.location.href = "../dashboard/?product_id="+new_prod_id;
              }, 1500);
            } 
            else if(request.responseText == "Product Name Already Exists.")
              showErrorMsg(form, "danger", "Product Name Already Exists.");
            else if (request.responseText == "image_size_greater_than_1MB")
              showErrorMsg(form, "danger", "Image size greater than 1 MB!  ");
            else if (request.responseText == "image_mime_type_not_allowed")
              showErrorMsg(
                form,
                "danger",
                "Only JPG, PNG and JPEG image formats are supported. "
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
          "../Controllers/product/Product_Controller.php",
          true
        );
        request.send(ProductForm);
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
