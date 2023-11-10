using supplier221 from '../db/data-model';

service supplier221Service {
    function getPdfUrl(invoice_no:String)
    returns LargeString;

    function getPdfUrlApproved(invoice_no:String)
    returns LargeString;

    function getPdfUrlSubmitted()
    returns LargeString;

    function getPdfUrlApprovedreal()
    returns LargeString;
    entity MediaFile as projection on supplier221.MediaFile;
        
    // @cds.query.limit.reliablePaging.enabled
     @odata.draft.enabled
    entity Invoice1 as
        projection on supplier221.Table
        actions
        {
            @cds.odata.bindingparameter.name : '_it'
              @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/bool'},false]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/totaltaxamount',
                    '_it/bool'
                ]
            }
            action showigst
            (
            );

            @cds.odata.bindingparameter.name : '_it'
              @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/bool'}, true]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/totaltaxamount',
                    '_it/bool'
                ]
            }
            action hideigst
            (
            );
                        @cds.odata.bindingparameter.name : '_it'
             @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/value1'}, 3]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/ref_po_num',
                    '_it/value1'
                ]
            }
            
            action shownpo
            (
            );

            @cds.odata.bindingparameter.name : '_it'
            @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/value1'}, 7]}}
            @Common.SideEffects : 
            {
                TargetProperties :
            [
                    '_it/ref_po_num',
                    '_it/value1'
                ]
            }
            action hidenpo
            (
            );

        };

    @odata.draft.enabled
    @cds.redirection.target: true
    entity Invoice2 as
        projection on supplier221.Table2
        actions
        {
            @cds.odata.bindingparameter.name : '_it'
              @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/bool'},false]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/totaltaxamount',
                    '_it/bool'
                ]
            }
            action showigst
            (
            );

            @cds.odata.bindingparameter.name : '_it'
              @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/bool'}, true]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/totaltaxamount',
                    '_it/bool'
                ]
            }
            action hideigst
            (
            );

            @cds.odata.bindingparameter.name : '_it'
             @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/value1'}, 3]}}
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    '_it/ref_po_num',
                    '_it/value1'
                ]
            }
            
            action shownpo
            (
            );

            @cds.odata.bindingparameter.name : '_it'
            @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/value1'}, 7]}}
            @Common.SideEffects : 
            {
                TargetProperties :
            [
                    '_it/ref_po_num',
                    '_it/value1'
                ]
            }
            action hidenpo
            (
            );
        };

    entity Invoice3 as
        projection on supplier221.Table3;

    entity Draft_child as
        projection on supplier221.Draft_child;

    @odata.draft.enabled
    entity New as
        projection on supplier221.New;

    @odata.draft.enabled
    entity New_child as
        projection on supplier221.New_child;

    @odata.draft.enabled
    entity Submitted as
        projection on supplier221.Submitted;

    entity sub as
        projection on supplier221.sub;

    entity sub12 as
        projection on supplier221.sub12;

    entity Submitted_child as
        projection on supplier221.Submitted_child;

    entity Submitted_child2 as
        projection on supplier221.Submitted_child2;

    entity Approved as
        projection on supplier221.Approved;

    entity Approved_child as
        projection on supplier221.Approved_child;

    entity Draft_child2 as
        projection on supplier221.Draft_child2
        actions
        {
            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    'in/bigst_per'
                ]
            }
            action showigst1
            (
            );

            @Common.SideEffects : 
            {
                TargetProperties :
                [
                    'in/bigst_per'
                ]
            }
            action hideigst2
            (
            );
        };

    entity Approved_child2 as
        projection on supplier221.Approved_child2;

    //  @odata.draft.enabled
    @cds.redirection.target: true
    entity Rejected_child2 as
        projection on supplier221.Rejected_child2;

    entity Currency as
        projection on supplier221.Currency;

    entity Document_type as
        projection on supplier221.Document_type;

    entity vendor_payment_term as
        projection on supplier221.vendor_payment_term;

    entity vendor_tds as
        projection on supplier221.vendor_tds;

    entity material_gst_per as
        projection on supplier221.material_gst_per;
}
