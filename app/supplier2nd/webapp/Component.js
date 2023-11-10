sap.ui.define(
    ["sap/fe/core/AppComponent"],
    function (Component) {
        "use strict";

        return Component.extend("supplier2nd.Component", {
            metadata: {
                manifest: "json",
                
            }
        });
    }
);

// sap.ui.define(
//     ["sap/fe/core/AppComponent"],
//     function (Component) {
//         "use strict";

//         return Component.extend("supplier2nd.Component", {
//             metadata: {
//                 manifest: "json"
//             },

//             // Add an init function to change the text
//             init: function () {
//                 // Use a selector to target the element by its ID
//                 // var element = document.getElementById("supplier2nd::Invoice1ObjectPage--fe::FooterBar::StandardAction::Save-BDI-content");

//                 // // Check if the element exists
//                 // if (element) {
//                 //     // Change the text to "Demo"
//                 //     element.textContent = "Demo";
//                 // }
//             }
//         });
//     }
// );
