sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        pdfhandlerfun: function(oEvent) {
            // MessageToast.show("Custom handler invoked.");
            this.showSideContent("F1");
        }
    };
});
