sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'supplier2nd',
            componentId: 'Invoice1ObjectPage',
            contextPath: '/Invoice1'
        },
        CustomPageDefinitions
    );
});