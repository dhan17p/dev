sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'supplier2nd',
            componentId: 'Draft_child2ObjectPage',
            contextPath: '/Invoice1/child_draft2'
        },
        CustomPageDefinitions
    );
});