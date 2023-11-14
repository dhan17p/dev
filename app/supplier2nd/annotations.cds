using supplier221Service as service from '../../srv/service';

annotate service.Invoice1 with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: invoice_no,
        Label: 'INVOICE NO',
    },
    {
        $Type: 'UI.DataField',
        Value: user_invoice_id,
        Label: 'REF. INVOICE NO',
    },
    {
        $Type: 'UI.DataField',
        Value: invoice_date,
        Label: 'DATE',
    },
    {
        $Type: 'UI.DataField',
        Value: total_value,
        Label: 'TOTAL VALUE',
    },
    {
        $Type: 'UI.DataField',
        Value: INVOICE_FILE,
        Label: 'INVOICE FILE',
    },
]);

annotate service.Invoice1 with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Draft',
    },
    UI.LineItem #tableView                     : [],
    UI.SelectionPresentationVariant #tableView1: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Rejected',
    }
);
// annotate service.Draft_child  {
// ref_po_num   @mandatory;
// }

annotate service.Invoice1 with @(
    UI.Facets        : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'DATA',
            ID    : 'F1',
            Target: '@UI.FieldGroup#F1',
        },
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'ITEMSSECTION',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'ITEMS',
                    Target: 'child_draft2/@UI.LineItem#ITEMS',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'Comments',
                    Target: '@UI.FieldGroup#Comments',
                },
            ],
        },
    ],
    UI.FieldGroup #F1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: invoice_no,
                Label: 'INVOICE NUMBER',
            },
            //   {
            //     $Type : 'UI.DataField',
            //     Value : child_draft.Boolean,
            //     Label : 'boolean',
            // },

            {
                $Type: 'UI.DataField',
                Value: irn,
                Label: 'IRN',
            },
            {
                $Type               : 'UI.DataField',
                Value               : ref_po_num,
                Label               : ' Reference PO Number',
                @Common.FieldControl: value1

            },
            {
                $Type: 'UI.DataField',
                Value: gstin,
                Label: 'GSTIN',
            },
            {
                $Type: 'UI.DataField',
                Value: doc_type_desc,
                Label: 'Document Type',
            },
            {
                $Type: 'UI.DataField',
                Value: user_invoice_id,
                Label: 'Ref. Invoice No',

            },
            {
                $Type: 'UI.DataField',
                Value: invoice_date,
                Label: 'Invoice Date',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : posting_date,
            //     Label : 'Posting Date',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : baseline_date,
            //     Label : 'Baseline Date ',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : supplier_id,
            //     Label : 'Vendor',
            // },
            {
                $Type: 'UI.DataField',
                Value: payment_terms,
                Label: 'Payment Terms',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : payment_method,
            //     Label : 'Payment Method',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : company_code,
            //     Label : 'Company Code',
            // },
            {
                $Type: 'UI.DataField',
                Value: currency,
                Label: 'Currency',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : department_name,
            //     Label : 'Department',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : gl_account,
            //     Label : 'G/L Account',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : cost_center,
            //     Label : 'Cost Center',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : internal_order,
            //     Label : 'Internal Order',
            // },
            {
                $Type: 'UI.DataField',
                Value: taxable_amount,
                Label: 'Taxable Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: adjustment,
                Label: 'Adjustment',
            },
            {
                $Type: 'UI.DataField',
                Value: amount,
                Label: 'Amount (Total)',
            },
            {
                $Type: 'UI.DataField',
                Value: tcs,
                Label: 'TCS Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_per,
                Label: 'TDS %',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_tot_amt,
                Label: 'Total TDS Amt.',
            },
            {
                $Type: 'UI.DataField',
                Value: discount_per,
                Label: 'Discount %',
            },
            {
                $Type: 'UI.DataField',
                Value: total_discount_amount,
                Label: 'Total Disc Amt.',
            },
            {
                $Type: 'UI.DataField',
                Value: cgst_tot_amt,
                Label: 'CGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: tax_per,
                Label: 'Tax %',
            },
            {
                $Type: 'UI.DataField',
                Value: sgst_tot_amt,
                Label: 'SGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: igst_tot_amt,
                Label: 'IGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: totaltaxamount,
                Label: 'Total Tax Amt.',
            //   @Common.FieldControl : value1
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : showgst,
            //     Label : 'showgst',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : totaltaxamount,
            //     Label : 'showgst',
            // },

            // {
            //     $Type : 'UI.DataField',
            //     Value : INVOICE_FILE,
            //     Label : 'INVOICE_FILE',
            // },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.showigst',
                Label         : 'showigst',
                ![@UI.Hidden] : IsActiveEntity,
            //  ![@UI.Hidden] : {
            //     $edmJson : {
            //          $And: [
            //             {
            //         $Eq : [{$Path : 'bool'}, false]
            //         },
            //         {
            //             $Ne :[{$Path:'buttonbool'},true]
            //         }
            //     ]
            //     }
            //         }
            },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.hideigst',
                Label         : 'hideigst',
                ![@UI.Hidden] : IsActiveEntity,
            //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'bool'}, true]}}

            },

            //  {
            //     $Type : 'UI.DataField',
            //     Value : bool,
            //     Label : 'totaltaxamount',
            // },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.shownpo',
                Label         : 'PO MANDATORY',
                // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 1]}}
                ![@UI.Hidden] : IsActiveEntity,
            },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.hidenpo',
                Label         : 'PO OPTIONAL',
                //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 7]}}
                ![@UI.Hidden] : IsActiveEntity,
            },


        ],
    }
);

annotate service.Invoice1 with @(UI.UpdateHidden: {$edmJson: {$Eq: [
    {$Path: 'INVOICE_FILE'},
    'In Process'
]}});

annotate service.Invoice1 with @(Common.DefaultValuesFunction: 'getOrderDefaults');

annotate service.Invoice2 with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'REF. INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'INVOICE DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: total_value,
            Label: 'TOTAL VALUE',
        },
        {
            $Type: 'UI.DataField',
            Value: INVOICE_FILE,
            Label: 'INVOICE_FILE',
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Rejected',
    }
);

annotate service.New with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'REF. INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: supplier_name,
            Label: ' SUPPLIER NAME',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: working_person,
            Label: 'MODIFIED BY',
        },
        {
            $Type: 'UI.DataField',
            Value: modified_date,
            Label: 'MODIFIED DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: INVOICE_FILE,
            Label: 'INVOICE FILErue',
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'New',
    }
);

annotate service.Submitted with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'REF.INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'INVOICE DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: total_value,
            Label: 'TOTAL VALUE',
        },
        {
            $Type: 'UI.DataField',
            Value: INVOICE_FILE,
            Label: 'INVOICE_FILE',
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Submitted',
    }
);

annotate service.Approved with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'REF.INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'INVOICE DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: total_value,
            Label: 'TOTAL  VALUE',
        },
        {
            $Type: 'UI.DataField',
            Value: INVOICE_FILE,
            Label: 'INVOICE FILE',
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Approved',
    }
);

annotate service.Invoice1 with @(UI.HeaderInfo: {
    TypeNamePlural: '',
    TypeName      : '',
    Title         : {
        $Type: 'UI.DataField',
        Value: invoice_no,
    },
});

annotate service.Submitted with @(UI.Facets: [{
    $Type : 'UI.ReferenceFacet',
    Label : 'F1',
    ID    : 'F1',
    Target: '@UI.FieldGroup#F1',
}, ],
//     UI.FieldGroup #INVOICEDATA : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//  {
//                 $Type : 'UI.DataField',
//                 Value : invoice_no,
//                 Label : 'INVOICE NO',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.irn,
//                 Label : 'IRN',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.ref_po_num,
//                 Label : ' Reference PO Number',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.gstin,
//                 Label : 'GSTIN',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.doc_type_desc,
//                 Label : 'Document Type',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.user_invoice_id,
//                 Label : 'Ref. Invoice No',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.invoice_date,
//                 Label : 'Invoice Date',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.posting_date,
//                 Label : 'Posting Date',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.baseline_date,
//                 Label : 'Baseline Date ',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.supplier_id,
//                 Label : 'Vendor',
//             },
//              {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.payment_terms,
//                 Label : 'Payment Terms',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.payment_method,
//                 Label : 'Payment Method',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.company_code,
//                 Label : 'Company Code',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.currency,
//                 Label : 'Currency',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.department_name,
//                 Label : 'Department',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.gl_account,
//                 Label : 'G/L Account',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.cost_center,
//                 Label : 'Cost Center',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.internal_order,
//                 Label : 'Internal Order',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.taxable_amount,
//                 Label : 'Taxable Amount',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.adjustment,
//                 Label : 'Adjustment',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.amount,
//                 Label : 'Amount (Total)',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.tcs,
//                 Label : 'TCS Amount',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.tds_per,
//                 Label : 'TDS %',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.tds_tot_amt,
//                 Label : 'Total TDS Amt.',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.discount_per,
//                 Label : 'Discount %',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.total_discount_amount,
//                 Label : 'Total Disc Amt.',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.cgst_tot_amt,
//                 Label : 'CGST:',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value :child_Submitted.sgst_tot_amt,
//                 Label : 'SGST:',
//             },],
//     }
);

annotate service.Invoice2 with @(

);

annotate service.Invoice2 with @(UI.HeaderInfo: {
    TypeNamePlural: ' ',
    TypeName      : '',
    Title         : {
        $Type: 'UI.DataField',
        Value: invoice_no,
    },
});

annotate service.Draft_child2 with @(UI.FieldGroup #FieldGroup1: {Data: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Sl No.',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Material',
    }
]});

annotate service.Draft_child2 with @(UI.FieldGroup #FieldGroup2: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_per,
        Label: 'gst%',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_per,
        Label         : 'sgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : ''}, true]}}

    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_per,
        Label         : 'cgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_per,
        Label         : 'igst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : IsActiveEntity,
    //   ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'hide'}, true]}}


    },

]});

annotate service.Draft_child2 with @(UI.FieldGroup #FieldGroup3: {Data: [
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'taxable_amount',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_amount,
        Label         : 'sgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_amount,
        Label         : 'cgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_amount,
        Label         : 'igst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : IsActiveEntity,
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'hide'}, false]}}


    },
]});

annotate service.Draft_child2 with @(UI.HeaderInfo: {
    TypeName      : 'Items',
    TypeNamePlural: 'Items',
});

annotate service.Draft_child2 with
 @UI.PresentationVariant: 
 {
    Visualizations : [
        '@UI.LineItem#ITEMS',
    ],
    SortOrder:[
        {
            $Type:'Common.SortOrderType',
            Property:'item_no',
            Descending:true
        }
    ]
};
annotate service.Draft_child2 with @(
    UI.LineItem #ITEMS: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Sl No.',
        ![@UI.Importance] : #High,
    },
        {
        $Type: 'UI.DataField',
        Value: material,
        Label: 'Material',
           ![@UI.Importance] : #High,
    },
        {
        $Type: 'UI.DataField',
        Value: hsn_code,
        Label: 'HSN Code',
           ![@UI.Importance] : #High,
    },
        {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Qty',
           ![@UI.Importance] : #High,
    },
        {
        $Type: 'UI.DataField',
        Value: amt_per_unit,
        Label: 'Unit Price',
           ![@UI.Importance] : #High,
    },
        {
        $Type: 'UI.DataField',
        Value: discount,
        Label: 'Disc.%',
           ![@UI.Importance] : #High,
    },
    //      {
    //     $Type : 'UI.DataFieldForAnnotation',
    //     Target : '@UI.FieldGroup#FieldGroup1',
    //     Label : 'Type Information'
    // },

    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup2',
        Label : 'GST%',
           ![@UI.Importance] : #High,
    },
        // {
    //     $Type : 'UI.DataField',
    //     Value : gst_per,
    //     Label : 'GST %',
    // },

    // {
    //     $Type : 'UI.DataField',
    //     Value : sgst_per,
    //     Label : 'sgst_per',

    // },
    // {
    //     $Type : 'UI.DataField',
    //     Value : cgst_per,
    //     Label : 'cgst_per',
    // },
    //  {
    //     $Type : 'UI.DataField',
    //     Value : igst_per,
    //     Label : 'igst_per',
    // },
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'Taxable Amount',
           ![@UI.Importance] : #High,
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup3',
        Label : 'Tax Amount',
           ![@UI.Importance] : #High,
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : tax_value_amount,
    //     Label : 'TAX AMOUNT	',
    // },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : sgst_amount,
    //         Label : 'sgst_amount',
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : cgst_amount,
    //         Label : 'cgst_amount',
    //     },
    //    {
    //         $Type : 'UI.DataField',
    //         Value : igst_amount,
    //         Label : 'igst_amount',
    //     },
    {
        $Type: 'UI.DataField',
        Value: tax_value_amount,
        Label: 'Total Amount',
           ![@UI.Importance] : #High,
    },

    {
        $Type         : 'UI.DataFieldForAction',
        Action        : 'supplier221Service.showigst1',
        Label         : 'showigst1',
        ![@UI.Hidden] : true,
    },
    {
        $Type         : 'UI.DataFieldForAction',
        Action        : 'supplier221Service.hideigst2',
        Label         : 'hideigst2',
        ![@UI.Hidden] : true,
    },
// {
//     $Type : 'UI.DataFieldForAction',
//     Action : 'supplier221Service.hideigst2',
//     Label : 'hideigst2',
//     Inline : true,
//     ![@UI.Importance] : #High,
//     //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'bigst_per'}, false]}}
// },
// {
//     $Type : 'UI.DataFieldForAction',
//     Action : 'supplier221Service.showigst1',
//     Label : 'showigst1',
//     Inline : true,
//     ![@UI.Importance] : #High,
//     //   ![@UI.Hidden] : {$edmJson : {$Eq: [{$Path : 'bigst_per'}, true]}}
// },
]);

annotate service.Submitted_child2 with @(UI.LineItem #ITEMS: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'item_no',
    },
    {
        $Type: 'UI.DataField',
        Value: invoice_no,
        Label: 'invoice_no',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'quantity',
    },
]);

// annotate service.Submitted with @(
//     UI.FieldGroup #test : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.payment_terms,
//                 Label : 'payment_terms',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.supplier_id,
//                 Label : 'supplier_id',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.user_invoice_id,
//                 Label : 'user_invoice_id',
//             },],
//     }
// );
annotate service.Submitted with @(UI.FieldGroup #ITEMS: {
    $Type: 'UI.FieldGroupType',
    Data : [],
});

// annotate service.Submitted with @(
//     UI.FieldGroup #DATA : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.payment_terms,
//                 Label : 'payment_terms',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.invoice_no,
//                 Label : 'invoice_no',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.gstin,
//                 Label : 'gstin',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.discount_per,
//                 Label : 'discount_per',
//             },],
//     }
// );
// annotate service.Submitted with @(
//     UI.FieldGroup #DATA1 : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.payment_terms,
//                 Label : 'payment_terms',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.invoice_no,
//                 Label : 'invoice_no',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.irn,
//                 Label : 'irn',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.taxable_amount,
//                 Label : 'taxable_amount',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.supplier_id,
//                 Label : 'supplier_id',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.ref_po_num,
//                 Label : 'ref_po_num',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.posting_date,
//                 Label : 'posting_date',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.cost_center,
//                 Label : 'cost_center',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.currency,
//                 Label : 'currency',
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Value : child_Submitted.department_name,
//                 Label : 'department_name',
//             },],
//     }
// );
annotate service.Submitted with @(UI.FieldGroup #F1: {
    $Type: 'UI.FieldGroupType',
    Data : [
        // {
        //     $Type : 'UI.DataField',
        //     Value : child_Submitted123.adjustment,
        //     Label : 'adjustment',
        // },{
        //     $Type : 'UI.DataField',
        //     Value : child_Submitted123.amount,
        //     Label : 'amount',
        // },{
        //     $Type : 'UI.DataField',
        //     Value : child_Submitted123.baseline_date,
        //     Label : 'baseline_date',
        // },{
        //     $Type : 'UI.DataField',
        //     Value : child_Submitted123.cgst_tot_amt,
        //     Label : 'cgst_tot_amt',
        // },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'user_invoice_id',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'invoice_date',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'invoice_no',
        },
    ],
});

annotate service.sub with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'REF.INVOICE NO',
        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'INVOICE DATE',
        },
        {
            $Type: 'UI.DataField',
            Value: total_value,
            Label: 'TOTAL VALUE',
        },
        {
            $Type: 'UI.DataField',
            Value: INVOICE_FILE,
            Label: 'INVOICE FILE',
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Submitted',
    }
);

annotate service.sub with @(
    UI.Facets          : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'DATA',
            ID    : 'DATA',
            Target: '@UI.FieldGroup#DATA1',
        },
        {
            $Type : 'UI.CollectionFacet',
            ID : 'itemssection',
            Facets : [
                {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ITEMS',
            Target: 'child_sub2/@UI.LineItem#ITEMS3',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID : 'Comments',
                    Target : '@UI.FieldGroup#Comments',
                },],
        },
    ],
    UI.FieldGroup #DATA: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.adjustment,
                Label: 'adjustment',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.amount,
                Label: 'amount',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.baseline_date,
                Label: 'baseline_date',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.cgst_tot_amt,
                Label: 'cgst_tot_amt',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.company_code,
                Label: 'company_code',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.cost_center,
                Label: 'cost_center',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.currency,
                Label: 'currency',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.department_name,
                Label: 'department_name',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.discount_per,
                Label: 'discount_per',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.doc_type_desc,
                Label: 'doc_type_desc',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.gl_account,
                Label: 'gl_account',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.gstin,
                Label: 'gstin',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.internal_order,
                Label: 'internal_order',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.invoice_date,
                Label: 'invoice_date',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.invoice_no,
                Label: 'invoice_no',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.irn,
                Label: 'irn',
            },
            // ,{
            //     $Type : 'UI.DataField',
            //     Value : child_Submitted123.parent_Submitted_invoice_no,
            //     Label : 'parent_Submitted_invoice_no',
            // },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.payment_method,
                Label: 'payment_method',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.payment_terms,
                Label: 'payment_terms',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.ref_po_num,
                Label: 'ref_po_num',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.sgst_tot_amt,
                Label: 'sgst_tot_amt',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.posting_date,
                Label: 'posting_date',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.supplier_id,
                Label: 'supplier_id',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.taxable_amount,
                Label: 'taxable_amount',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.tcs,
                Label: 'tcs',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.tds_per,
                Label: 'tds_per',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.tds_tot_amt,
                Label: 'tds_tot_amt',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.total_discount_amount,
                Label: 'total_discount_amount',
            },
            {
                $Type: 'UI.DataField',
                Value: child_Submitted123.user_invoice_id,
                Label: 'user_invoice_id',
            },
        ],
    }
);

annotate service.sub with @(UI.FieldGroup #DATA1: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type: 'UI.DataField',
            Value: invoice_no,
            Label: 'INVOICE NUMBER',
        },
        //   {
        //     $Type : 'UI.DataField',
        //     Value : child_draft.Boolean,
        //     Label : 'boolean',
        // },

        {
            $Type: 'UI.DataField',
            Value: irn,
            Label: 'IRN',
        },
        {
            $Type               : 'UI.DataField',
            Value               : ref_po_num,
            Label               : ' Reference PO Number',
            @Common.FieldControl: value1

        },
        {
            $Type: 'UI.DataField',
            Value: gstin,
            Label: 'GSTIN',
        },
        {
            $Type: 'UI.DataField',
            Value: doc_type_desc,
            Label: 'Document Type',
        },
        {
            $Type: 'UI.DataField',
            Value: user_invoice_id,
            Label: 'Ref. Invoice No',

        },
        {
            $Type: 'UI.DataField',
            Value: invoice_date,
            Label: 'Invoice Date',
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : posting_date,
        //     Label : 'Posting Date',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : baseline_date,
        //     Label : 'Baseline Date ',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : supplier_id,
        //     Label : 'Vendor',
        // },
        {
            $Type: 'UI.DataField',
            Value: payment_terms,
            Label: 'Payment Terms',
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : payment_method,
        //     Label : 'Payment Method',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : company_code,
        //     Label : 'Company Code',
        // },
        {
            $Type: 'UI.DataField',
            Value: currency,
            Label: 'Currency',
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : department_name,
        //     Label : 'Department',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : gl_account,
        //     Label : 'G/L Account',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : cost_center,
        //     Label : 'Cost Center',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : internal_order,
        //     Label : 'Internal Order',
        // },
        {
            $Type: 'UI.DataField',
            Value: taxable_amount,
            Label: 'Taxable Amount',
        },
        {
            $Type: 'UI.DataField',
            Value: adjustment,
            Label: 'Adjustment',
        },
        {
            $Type: 'UI.DataField',
            Value: amount,
            Label: 'Amount (Total)',
        },
        {
            $Type: 'UI.DataField',
            Value: tcs,
            Label: 'TCS Amount',
        },
        {
            $Type: 'UI.DataField',
            Value: tds_per,
            Label: 'TDS %',
        },
        {
            $Type: 'UI.DataField',
            Value: tds_tot_amt,
            Label: 'Total TDS Amt.',
        },
        {
            $Type: 'UI.DataField',
            Value: discount_per,
            Label: 'Discount %',
        },
        {
            $Type: 'UI.DataField',
            Value: total_discount_amount,
            Label: 'Total Disc Amt.',
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : cgst_tot_amt,
        //     Label : 'CGST:',
        // },
        {
            $Type: 'UI.DataField',
            Value: tax_per,
            Label: 'Tax %',
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : sgst_tot_amt,
        //     Label : 'SGST:',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : igst_tot_amt,
        //     Label : 'IGST:',
        // },
        {
            $Type: 'UI.DataField',
            Value: totaltaxamount,
            Label: 'Total Tax Amt.',
        //   @Common.FieldControl : value1
        },

    ],
});

annotate service.Submitted_child2 with @(UI.LineItem #ITEMS1: [
    {
        $Type: 'UI.DataField',
        Value: parent_sub2.child_sub2.invoice_no,
        Label: 'invoice_no',
    },
    {
        $Type: 'UI.DataField',
        Value: parent_sub2.child_sub2.item_no,
        Label: 'item_no',
    },
    {
        $Type: 'UI.DataField',
        Value: parent_sub2.child_sub2.quantity,
        Label: 'quantity',
    },
]);

annotate service.Submitted_child2 with @(UI.LineItem #ITE: [
    {
        $Type: 'UI.DataField',
        Value: invoice_no,
        Label: 'invoice_no',
    },
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'item_no',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'quantity',
    },
]);

annotate service.Submitted_child2 with @(UI.LineItem #ITEMS2: []);

annotate service.Submitted_child2 with @(UI.FieldGroup #FieldGroup2: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_per,
        Label: 'gst%',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_per,
        Label         : 'sgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            true
        ]}}
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : ''}, true]}}

    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_per,
        Label         : 'cgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_per,
        Label         : 'igst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'hide'},
            true
        ]}}


    },

]});

annotate service.Submitted_child2 with @(UI.FieldGroup #FieldGroup3: {Data: [
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'taxable_amount',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_amount,
        Label         : 'sgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_amount,
        Label         : 'cgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_amount,
        Label         : 'igst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'is_igst'},
            false
        ]}}
    },
//        {
//      $Type : 'UI.DataField',
//     Value : bigst_per,
//     Label : 'bigst_per',
//      ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'hide'}, true]}}


// },
]});


annotate service.Submitted_child2 with @(UI.HeaderInfo: {
    TypeName      : 'Items',
    TypeNamePlural: 'Items',
});

annotate service.Submitted_child2 with @(UI.LineItem #ITEMS3: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Sl No.',
    },
    {
        $Type: 'UI.DataField',
        Value: material,
        Label: 'Material',
    },
    {
        $Type: 'UI.DataField',
        Value: hsn_code,
        Label: 'HSN Code',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Qty',
    },
    {
        $Type: 'UI.DataField',
        Value: amt_per_unit,
        Label: 'Unit Price',
    },
    {
        $Type: 'UI.DataField',
        Value: discount,
        Label: 'Disc.%',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup2',
        Label : 'GST%'
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : gst_per,
    //     Label : 'GST %',
    // },

    // {
    //     $Type : 'UI.DataField',
    //     Value : sgst_per,
    //     Label : 'sgst_per',

    // },
    // {
    //     $Type : 'UI.DataField',
    //     Value : cgst_per,
    //     Label : 'cgst_per',
    // },
    //  {
    //     $Type : 'UI.DataField',
    //     Value : igst_per,
    //     Label : 'igst_per',
    // },
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'Taxable Amount',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup3',
        Label : 'Tax Amount'
    },

    // {
    //     $Type : 'UI.DataField',
    //     Value : tax_value_amount,
    //     Label : 'TAX AMOUNT	',
    // },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : sgst_amount,
    //         Label : 'sgst_amount',
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : cgst_amount,
    //         Label : 'cgst_amount',
    //     },
    //    {
    //         $Type : 'UI.DataField',
    //         Value : igst_amount,
    //         Label : 'igst_amount',
    //     },
    {
        $Type: 'UI.DataField',
        Value: tax_value_amount,
        Label: 'Total Amount',
    },

]);

annotate service.Approved with @(
    UI.Facets          : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'DATA',
            ID    : 'DATA',
            Target: '@UI.FieldGroup#DATA',
        },
        {
            $Type : 'UI.CollectionFacet',
            ID : 'Itemssection',
            Facets : [
            {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ITEMS',
            Target: 'child_Approved2/@UI.LineItem#ITEMS',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID : 'Comments',
                    Target : '@UI.FieldGroup#Comments',
                },
                ],
        },
    ],
    UI.FieldGroup #DATA: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: invoice_no,
                Label: 'INVOICE NUMBER',
            },
            //   {
            //     $Type : 'UI.DataField',
            //     Value : child_draft.Boolean,
            //     Label : 'boolean',
            // },

            {
                $Type: 'UI.DataField',
                Value: irn,
                Label: 'IRN',
            },
            {
                $Type               : 'UI.DataField',
                Value               : ref_po_num,
                Label               : ' Reference PO Number',
                @Common.FieldControl: value1

            },
            {
                $Type: 'UI.DataField',
                Value: gstin,
                Label: 'GSTIN',
            },
            {
                $Type: 'UI.DataField',
                Value: doc_type_desc,
                Label: 'Document Type',
            },
            {
                $Type: 'UI.DataField',
                Value: user_invoice_id,
                Label: 'Ref. Invoice No',

            },
            {
                $Type: 'UI.DataField',
                Value: invoice_date,
                Label: 'Invoice Date',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : posting_date,
            //     Label : 'Posting Date',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : baseline_date,
            //     Label : 'Baseline Date ',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : supplier_id,
            //     Label : 'Vendor',
            // },
            {
                $Type: 'UI.DataField',
                Value: payment_terms,
                Label: 'Payment Terms',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : payment_method,
            //     Label : 'Payment Method',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : company_code,
            //     Label : 'Company Code',
            // },
            {
                $Type: 'UI.DataField',
                Value: currency,
                Label: 'Currency',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : department_name,
            //     Label : 'Department',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : gl_account,
            //     Label : 'G/L Account',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : cost_center,
            //     Label : 'Cost Center',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : internal_order,
            //     Label : 'Internal Order',
            // },
            {
                $Type: 'UI.DataField',
                Value: taxable_amount,
                Label: 'Taxable Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: adjustment,
                Label: 'Adjustment',
            },
            {
                $Type: 'UI.DataField',
                Value: amount,
                Label: 'Amount (Total)',
            },
            {
                $Type: 'UI.DataField',
                Value: tcs,
                Label: 'TCS Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_per,
                Label: 'TDS %',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_tot_amt,
                Label: 'Total TDS Amt.',
            },
            {
                $Type: 'UI.DataField',
                Value: discount_per,
                Label: 'Discount %',
            },
            {
                $Type: 'UI.DataField',
                Value: total_discount_amount,
                Label: 'Total Disc Amt.',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : cgst_tot_amt,
            //     Label : 'CGST:',
            // },
            {
                $Type: 'UI.DataField',
                Value: tax_per,
                Label: 'Tax %',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : sgst_tot_amt,
            //     Label : 'SGST:',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : igst_tot_amt,
            //     Label : 'IGST:',
            // },
            {
                $Type: 'UI.DataField',
                Value: totaltaxamount,
                Label: 'Total Tax Amt.',
            //   @Common.FieldControl : value1
            },
        // {
        //     $Type : 'UI.DataField',
        //     Value : showgst,
        //     Label : 'showgst',
        // },
        // {
        //     $Type : 'UI.DataField',
        //     Value : totaltaxamount,
        //     Label : 'showgst',
        // },

        // {
        //     $Type : 'UI.DataField',
        //     Value : INVOICE_FILE,
        //     Label : 'INVOICE_FILE',
        // },
        //         {
        //             $Type : 'UI.DataFieldForAction',
        //             Action : 'supplier221Service.showigst',
        //             Label : 'showigst',
        //     // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'totaltaxamount'}, 'IGST']}}
        // //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'bool'}, false]}}
        //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'buttonbool'}, true]}}
        //         },
        //         {
        //             $Type : 'UI.DataFieldForAction',
        //             Action : 'supplier221Service.hideigst',
        //             Label : 'hideigst',
        // //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'bool'}, true]}}
        //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'buttonbool'}, true]}}
        //         },

        //  {
        //     $Type : 'UI.DataField',
        //     Value : bool,
        //     Label : 'totaltaxamount',
        // },
        // {
        //     $Type : 'UI.DataFieldForAction',
        //     Action : 'supplier221Service.shownpo',
        //     Label : 'nporeadonly',
        //     // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 1]}}
        //      ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'buttonbool'}, true]}}
        // },
        // {
        //     $Type : 'UI.DataFieldForAction',
        //     Action : 'supplier221Service.hidenpo',
        //     Label : 'npomandat',
        //     //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 7]}}
        //      ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'buttonbool'}, true]}}
        // },
        ],
    }
);


annotate service.Approved_child2 with @(UI.FieldGroup #FieldGroup2: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_per,
        Label: 'gst%',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_per,
        Label         : 'sgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : ''}, true]}}

    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_per,
        Label         : 'cgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_per,
        Label         : 'igst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'hide'},
            true
        ]}}


    },

]});

annotate service.Approved_child2 with @(UI.FieldGroup #FieldGroup3: {Data: [
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'taxable_amount',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_amount,
        Label         : 'sgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_amount,
        Label         : 'cgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_amount,
        Label         : 'igst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'hide'},
            true
        ]}}


    },
]});

annotate service.Approved_child2 with @(UI.HeaderInfo: {
    TypeName      : 'Items',
    TypeNamePlural: 'Items',
});

annotate service.Approved_child2 with @(UI.LineItem #ITEMS: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Sl No.',
    },
    {
        $Type: 'UI.DataField',
        Value: material,
        Label: 'Material',
    },
    {
        $Type: 'UI.DataField',
        Value: hsn_code,
        Label: 'HSN Code',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Qty',
    },
    {
        $Type: 'UI.DataField',
        Value: amt_per_unit,
        Label: 'Unit Price',
    },
    {
        $Type: 'UI.DataField',
        Value: discount,
        Label: 'Disc.%',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup2',
        Label : 'GST%'
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : gst_per,
    //     Label : 'GST %',
    // },

    // {
    //     $Type : 'UI.DataField',
    //     Value : sgst_per,
    //     Label : 'sgst_per',

    // },
    // {
    //     $Type : 'UI.DataField',
    //     Value : cgst_per,
    //     Label : 'cgst_per',
    // },
    //  {
    //     $Type : 'UI.DataField',
    //     Value : igst_per,
    //     Label : 'igst_per',
    // },
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'Taxable Amount',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup3',
        Label : 'Tax Amount'
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : tax_value_amount,
    //     Label : 'TAX AMOUNT	',
    // },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : sgst_amount,
    //         Label : 'sgst_amount',
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : cgst_amount,
    //         Label : 'cgst_amount',
    //     },
    //    {
    //         $Type : 'UI.DataField',
    //         Value : igst_amount,
    //         Label : 'igst_amount',
    //     },
    {
        $Type: 'UI.DataField',
        Value: tax_value_amount,
        Label: 'Total Amount',
    },

]);

annotate service.sub with @(UI.HeaderInfo: {
    TypeNamePlural: '',
    TypeName      : '',
    Title         : {
        $Type: 'UI.DataField',
        Value: invoice_no,
    },
});

annotate service.sub with @(UI.FieldGroup #F1: {
    $Type: 'UI.FieldGroupType',
    Data : [],
});

annotate service.Submitted_child with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Submitted_child with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Submitted_child with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
            Label         : 'lab1',
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Draft_child with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Draft_child with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Draft_child with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice3 with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Invoice3 with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice3 with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved_child with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved_child with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved_child with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Submitted_child with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Draft_child with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice3 with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved_child with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice1 with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Document_type with {
    description @Common.Text: master_name
};

annotate service.Draft_child2 with {
    material @Common.Text: {
        $value                 : material_desc,
        ![@UI.TextArrangement] : #TextLast,
    }
};

annotate service.Invoice1 with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice1 with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Invoice1 with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice1 with {
    tax_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'material_gst_per',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tax_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};


//*Invoice2*//
annotate service.Invoice2 with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice2 with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Invoice2 with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice2 with {
    tax_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'material_gst_per',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tax_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Invoice2 with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Rejected_child2 with {
    material @Common.Text: {
        $value                 : material_desc,
        ![@UI.TextArrangement] : #TextLast,
    }
};


//*approved*//
annotate service.Approved with {
    payment_terms @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_payment_term',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: payment_terms,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved with {
    currency @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Currency',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: currency,
                    ValueListProperty: 'code',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description',
                },
            ],
        },
        Common.ValueListWithFixedValues: false
    )
};

annotate service.Approved with {
    tds_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'vendor_tds',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tds_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved with {
    tax_per @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'material_gst_per',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: tax_per,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved with {
    doc_type_desc @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Document_type',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: doc_type_desc,
                ValueListProperty: 'description',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.Approved_child2 with {
    material @Common.Text: {
        $value                 : material_desc,
        ![@UI.TextArrangement] : #TextLast,
    }
};


annotate service.Submitted_child2 with {
    material @Common.Text: material_desc
};

annotate service.Invoice1 with @(UI.Identification: []);

annotate service.Invoice2 with @(
    UI.Facets          : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'DATA',
            ID    : 'DATA',
            Target: '@UI.FieldGroup#DATA',
        },
        {
            $Type : 'UI.CollectionFacet',
            ID : 'itesec',
            Facets : [
            {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ITEMS',
            Target: 'child2/@UI.LineItem#ITEMS1',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID : 'Comments',
                    Target : '@UI.FieldGroup#Comments',
                },
                ],
        },
    ],
    UI.FieldGroup #DATA: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: invoice_no,
                Label: 'INVOICE NUMBER',
            },
            //   {
            //     $Type : 'UI.DataField',
            //     Value : child_draft.Boolean,
            //     Label : 'boolean',
            // },

            {
                $Type: 'UI.DataField',
                Value: irn,
                Label: 'IRN',
            },
            {
                $Type               : 'UI.DataField',
                Value               : ref_po_num,
                Label               : ' Reference PO Number',
                @Common.FieldControl: value1

            },
            {
                $Type: 'UI.DataField',
                Value: gstin,
                Label: 'GSTIN',
            },
            {
                $Type: 'UI.DataField',
                Value: doc_type_desc,
                Label: 'Document Type',
            },
            {
                $Type: 'UI.DataField',
                Value: user_invoice_id,
                Label: 'Ref. Invoice No',

            },
            {
                $Type: 'UI.DataField',
                Value: invoice_date,
                Label: 'Invoice Date',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : posting_date,
            //     Label : 'Posting Date',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : baseline_date,
            //     Label : 'Baseline Date ',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : supplier_id,
            //     Label : 'Vendor',
            // },
            {
                $Type: 'UI.DataField',
                Value: payment_terms,
                Label: 'Payment Terms',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : payment_method,
            //     Label : 'Payment Method',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : company_code,
            //     Label : 'Company Code',
            // },
            {
                $Type: 'UI.DataField',
                Value: currency,
                Label: 'Currency',
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : department_name,
            //     Label : 'Department',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : gl_account,
            //     Label : 'G/L Account',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : cost_center,
            //     Label : 'Cost Center',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : internal_order,
            //     Label : 'Internal Order',
            // },
            {
                $Type: 'UI.DataField',
                Value: taxable_amount,
                Label: 'Taxable Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: adjustment,
                Label: 'Adjustment',
            },
            {
                $Type: 'UI.DataField',
                Value: amount,
                Label: 'Amount (Total)',
            },
            {
                $Type: 'UI.DataField',
                Value: tcs,
                Label: 'TCS Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_per,
                Label: 'TDS %',
            },
            {
                $Type: 'UI.DataField',
                Value: tds_tot_amt,
                Label: 'Total TDS Amt.',
            },
            {
                $Type: 'UI.DataField',
                Value: discount_per,
                Label: 'Discount %',
            },
            {
                $Type: 'UI.DataField',
                Value: total_discount_amount,
                Label: 'Total Disc Amt.',
            },
            {
                $Type: 'UI.DataField',
                Value: cgst_tot_amt,
                Label: 'CGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: tax_per,
                Label: 'Tax %',
            },
            {
                $Type: 'UI.DataField',
                Value: sgst_tot_amt,
                Label: 'SGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: igst_tot_amt,
                Label: 'IGST:',
            },
            {
                $Type: 'UI.DataField',
                Value: totaltaxamount,
                Label: 'Total Tax Amt.',
            //   @Common.FieldControl : value1
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : showgst,
            //     Label : 'showgst',
            // },
            // {
            //     $Type : 'UI.DataField',
            //     Value : totaltaxamount,
            //     Label : 'showgst',
            // },

            // {
            //     $Type : 'UI.DataField',
            //     Value : INVOICE_FILE,
            //     Label : 'INVOICE_FILE',
            // },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.showigst',
                Label         : 'showigst',
                ![@UI.Hidden] : IsActiveEntity,
            //  ![@UI.Hidden] : {
            //     $edmJson : {
            //          $And: [
            //             {
            //         $Eq : [{$Path : 'bool'}, false]
            //         },
            //         {
            //             $Ne :[{$Path:'buttonbool'},true]
            //         }
            //     ]
            //     }
            //         }
            },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.hideigst',
                Label         : 'hideigst',
                ![@UI.Hidden] : IsActiveEntity,
            //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'bool'}, true]}}

            },

            //  {
            //     $Type : 'UI.DataField',
            //     Value : bool,
            //     Label : 'totaltaxamount',
            // },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.shownpo',
                Label         : 'PO MANDATORY',
                // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 1]}}
                ![@UI.Hidden] : IsActiveEntity,
            },
            {
                $Type         : 'UI.DataFieldForAction',
                Action        : 'supplier221Service.hidenpo',
                Label         : 'PO OPTIONAL',
                //    ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'value1'}, 7]}}
                ![@UI.Hidden] : IsActiveEntity,
            },
        ],
    }
);

// annotate service.Rejected_child2 with @(
//     UI.LineItem #ITEMS : [
//     ]
// );
annotate service.Rejected_child2 with @(UI.FieldGroup #FieldGroup2: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_per,
        Label: 'gst%',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_per,
        Label         : 'sgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : ''}, true]}}

    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_per,
        Label         : 'cgst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_per,
        Label         : 'igst_per',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : IsActiveEntity,
    //   ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'hide'}, true]}}


    },

]});

annotate service.Rejected_child2 with @(UI.HeaderInfo: {
    TypeName      : 'Items',
    TypeNamePlural: 'Items',
});

annotate service.Rejected_child2 with @(UI.FieldGroup #FieldGroup3: {Data: [
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'taxable_amount',
    },
    {
        $Type         : 'UI.DataField',
        Value         : sgst_amount,
        Label         : 'sgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : cgst_amount,
        Label         : 'cgst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            true
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : igst_amount,
        Label         : 'igst_amount',
        ![@UI.Hidden] : {$edmJson: {$Eq: [
            {$Path: 'bigst_per'},
            false
        ]}}
    },
    {
        $Type         : 'UI.DataField',
        Value         : bigst_per,
        Label         : 'bigst_per',
        ![@UI.Hidden] : IsActiveEntity,
    //  ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'hide'}, false]}}


    },
]});

annotate service.Rejected_child2 with @(UI.LineItem #ITEMS1: [

    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Sl No.',
    },
    {
        $Type: 'UI.DataField',
        Value: material,
        Label: 'Material',
    },
    {
        $Type: 'UI.DataField',
        Value: hsn_code,
        Label: 'HSN Code',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Qty',
    },
    {
        $Type: 'UI.DataField',
        Value: amt_per_unit,
        Label: 'Unit Price',
    },
    {
        $Type: 'UI.DataField',
        Value: discount,
        Label: 'Disc.%',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup2',
        Label : 'GST%'
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : gst_per,
    //     Label : 'GST %',
    // },

    // {
    //     $Type : 'UI.DataField',
    //     Value : sgst_per,
    //     Label : 'sgst_per',

    // },
    // {
    //     $Type : 'UI.DataField',
    //     Value : cgst_per,
    //     Label : 'cgst_per',
    // },
    //  {
    //     $Type : 'UI.DataField',
    //     Value : igst_per,
    //     Label : 'igst_per',
    // },
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'Taxable Amount',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#FieldGroup3',
        Label : 'Tax Amount'
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : tax_value_amount,
    //     Label : 'TAX AMOUNT	',
    // },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : sgst_amount,
    //         Label : 'sgst_amount',
    //     },
    //     {
    //         $Type : 'UI.DataField',
    //         Value : cgst_amount,
    //         Label : 'cgst_amount',
    //     },
    //    {
    //         $Type : 'UI.DataField',
    //         Value : igst_amount,
    //         Label : 'igst_amount',
    //     },
    {
        $Type: 'UI.DataField',
        Value: tax_value_amount,
        Label: 'Total Amount',
    },

    {
        $Type         : 'UI.DataFieldForAction',
        Action        : 'supplier221Service.showigst1',
        Label         : 'showigst1',
        ![@UI.Hidden] : true,
    },
    {
        $Type         : 'UI.DataFieldForAction',
        Action        : 'supplier221Service.hideigst2',
        Label         : 'hideigst2',
        ![@UI.Hidden] : true,
    },
]);

annotate service.Invoice1 with @(UI.FieldGroup #Comments: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type : 'UI.DataField',
            Value : comment,
            Label : 'comments',
        },],
});
annotate service.Invoice2 with @(
    UI.FieldGroup #Comments : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comment,
                Label : 'comment',
            },],
    }
);
annotate service.sub with @(
    UI.FieldGroup #Comments : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comment,
                Label : 'comment',
            },],
    }
);
annotate service.Approved with @(
    UI.FieldGroup #Comments : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comment,
                Label : 'comment',
            },],
    }
);
// annotate service.Approved with {
//     user_invoice_id @Common.SemanticObject : '  '
// };
