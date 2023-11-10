sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'supplier2nd/test/integration/FirstJourney',
		'supplier2nd/test/integration/pages/Invoice1List',
		'supplier2nd/test/integration/pages/Invoice1ObjectPage',
		'supplier2nd/test/integration/pages/Draft_child2ObjectPage'
    ],
    function(JourneyRunner, opaJourney, Invoice1List, Invoice1ObjectPage, Draft_child2ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('supplier2nd') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheInvoice1List: Invoice1List,
					onTheInvoice1ObjectPage: Invoice1ObjectPage,
					onTheDraft_child2ObjectPage: Draft_child2ObjectPage
                }
            },
            opaJourney.run
        );
    }
);