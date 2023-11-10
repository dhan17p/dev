sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'supplier2nd',
            componentId: 'Invoice1List',
            contextPath: '/Invoice1'
        },
        CustomPageDefinitions
    );
});