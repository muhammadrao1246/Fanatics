"use strict";

let latest = "";
var observer = new MutationObserver(element => 
{
    console.log(element.target);
    latest = element;
    element.forEach((mutated_element)=>{
        if( mutated_element.target.getAttribute("aria-invalid") == "true")
        {
            mutated_element.target.classList.remove("is-invalid");
            mutated_element.target.classList.add("is-invalid");
        }
    })
    
});


document.querySelectorAll(".kt-form > .input-group > input").forEach((tag)=>{
    observer.observe(tag, 
            {
                attributes: true,
                attributeFilter: ["aria-invalid"]
            }); 
})



// COntact No 
setTimeout(() => {
    let country_code = document.getElementById("country_code");

    let code_observer = new MutationObserver(element=>{
        element.forEach(code=>{
            country_code.setAttribute( "value", (code.target.getAttribute("title").split(": ")[1]) );
        })
    })

    code_observer.observe(document.getElementsByClassName("iti__selected-flag")[0],
        {
            attributes: true,
            attributeFilter: ["title"]
        }
    );
}, 2000);




 