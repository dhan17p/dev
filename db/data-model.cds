namespace supplier221;

entity Entity1
{
    key ID : UUID
        @Core.Computed;
}
entity MediaFile {
    key id        : Integer;
        @Core.MediaType   : mediaType
        content   : LargeBinary;
        @Core.IsMediaType : true
        mediaType : String;
        fileName  : String;
        url       : String;
        userid : String;
};

entity Table
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    invoice_date : String;
    total_value : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
    totaltaxamount : String;
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    tax_per : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    igst_tot_amt : String;
    showgst : String;
    file_link : LargeString;
    npo : String;
    is_igst : String;
    sup_status : String;
      value1 : Integer;
     buttonbool : Boolean;
     bool : Boolean;
       ref_po_num_bool : Boolean;
        comment: String;
    child_draft2 : Composition of many Draft_child2 on child_draft2.invoice_no = invoice_no;
}

entity Draft_child
{
    key invoice_no : String;
    irn : String;
    ref_po_num : String default '123'
        @readonly;
    gstin : String;
    doc_type_desc : String
        @readonly;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String
        @readonly;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    tax_per : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    igst_tot_amt : String;
    showgst : String;
    totaltaxamount : String;
    fieldControl : Integer default 1;
    Boolean : Boolean default true;
}

entity Draft_child2
{  
    key invoice_no : String;
    key id : UUID;
    item_no : Integer;
    material : String;
    material_desc : String;
    hsn_code : String;
    quantity : String;
    amt_per_unit : String;
    discount : String;
    gst_per : String;
    sgst_per : String default 'SGST:';
    cgst_per : String default 'CGST:';
    igst_per : String default 'SGST:';
    taxable_amount : String;
    tax_value_amount : String;
    sgst_amount : String  default 'CGST:';
    cgst_amount : String  default 'CGST:';
    igst_amount : String  default 'SGST:';
    amount : String;
    start : String;
    bsgst_per : Boolean ;
    bigst_per : Boolean;
    comment: String;
    // hide : Boolean default true;
    parent_draft2 : Association to one Table on parent_draft2.invoice_no = invoice_no;

}

entity Table2
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    total_value : String;
    invoice_date : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
    totaltaxamount : String;
    bool : Boolean ;
    value1 : Integer;
    ref_po_num : String;
    ref_po_num_bool : Boolean;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    tax_per : String;
    cgst_tot_amt : String ;
    sgst_tot_amt : String;
    igst_tot_amt : String;
    showgst : String;
    file_link : LargeString;
    // buttonbool : Boolean;
    npo : String;
    is_igst : String;
    sup_status : String;
     comment: String;
    child2 : Composition of many Rejected_child2 on child2.invoice_no = invoice_no;
}

entity Table3
{
    key invoice_no : String default 'weq';
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    parent : Association to one Table2 on parent.invoice_no = invoice_no;
}

entity Rejected_child2
{
    key uid : UUID;
    key invoice_no : String;
    id : Integer default 212;
    item_no : String default 'NA';
    material : String default 'NA';
    material_desc : String default 'NA';
    hsn_code : String default 'NA';
    quantity : String default 'NA';
    amt_per_unit : String default 'NA';
    discount : String default 'NA';
    gst_per : String default 'NA';
    sgst_per : String default 'SGST:';
    cgst_per : String default 'CGST:';
    igst_per : String  default 'IGST:';
    taxable_amount : String default 'NA';
    tax_value_amount : String default 'NA';
    sgst_amount : String default  'SGST:';
    cgst_amount : String default  'CGST:';
    igst_amount : String default  'IGST:';
    amount : String default 'NA';
    start : String default 'NA';
    bsgst_per : Boolean default true;
    bigst_per : Boolean;
    hide : Boolean default true;
    DraftUUID : UUID;
    comment: String;
    parentrejected2 : Association to one Table2 on parentrejected2.invoice_no = invoice_no;
}

entity New
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    total_value : String;
    invoice_date : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
    child_new : Association to many New_child on child_new.parent_new = $self;
}

entity New_child
{
    key invoice_no : String;
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    parent_new : Association to one New on parent_new.invoice_no = invoice_no;
}

entity Submitted
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    total_value : String;
    invoice_date : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
}

entity sub
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    total_value : String;
    invoice_date : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
    totaltaxamount : String;
    bool : Boolean default true;
    value1 : Integer default 7;
    ref_po_num : String;
    ref_po_num_bool : Boolean;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    tax_per : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    igst_tot_amt : String;
    showgst : String;
    is_igst : String;
    file_link : LargeString;
     comment: String;
    child_Submitted123 : Association to many Submitted_child on child_Submitted123.invoice_no = invoice_no;
    child_sub2 : Composition of many Submitted_child2 on child_sub2.invoice_no = invoice_no;
}

entity sub12
{
    key invoice_no : String;
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
}

entity Submitted_child
{
    key invoice_no : String default '1234';
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    showIGST : Boolean
        @VirtualElement
        @VirtualElementExpression : 'true';
    showgst : String;
    parent_Submitted : Association to one sub on parent_Submitted.invoice_no = invoice_no;
}

entity Submitted_child2
{
    key invoice_no : String;
    item_no : String;
    key id : UUID;
    material : String;
    material_desc : String;
    hsn_code : String;
    quantity : String;
    amt_per_unit : String;
    discount : String;
    gst_per : String;
    sgst_per : String;
    cgst_per : String;
    igst_per : String;
    taxable_amount : String;
    tax_value_amount : String;
    sgst_amount : String;
    cgst_amount : String;
    igst_amount : String;
    amount : String;
    start : String;
    bsgst_per : Boolean;
    bigst_per : Boolean;
    hide : Boolean default true;
    is_igst : Boolean;
    comment: String;
    parent_sub2 : Association to one sub on parent_sub2.invoice_no = invoice_no;
}

entity Approved
{
    key invoice_no : String;
    user_invoice_id : String;
    supplier_name : String default 'NA';
    total_value : String;
    invoice_date : String;
    working_person : String;
    modified_date : String;
    INVOICE_FILE : String;
    totaltaxamount : String;
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    tax_per : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    igst_tot_amt : String;
    showgst : String;
    file_link : LargeString;
    value1 : Integer default 7;
    bool : Boolean default true;
    ref_po_num_bool : Boolean;
    buttonbool : Boolean;
     comment: String;
    child_Approved : Association to many Approved_child on child_Approved.parent_Approved = $self;
    child_Approved2 : Association to many Approved_child2 on child_Approved2.invoice_no = invoice_no;
}

entity Approved_child
{
    key invoice_no : String;
    ref_po_num : String;
    irn : String;
    gstin : String;
    doc_type_desc : String;
    user_invoice_id : String;
    invoice_date : String;
    posting_date : String;
    baseline_date : String;
    supplier_id : String;
    payment_terms : String;
    payment_method : String;
    company_code : String;
    currency : String;
    department_name : String;
    gl_account : String;
    cost_center : String;
    internal_order : String;
    taxable_amount : String;
    adjustment : String;
    amount : String;
    tcs : String;
    tds_per : String;
    tds_tot_amt : String;
    discount_per : String;
    total_discount_amount : String;
    cgst_tot_amt : String;
    sgst_tot_amt : String;
    parent_Approved : Association to one Approved on parent_Approved.invoice_no = invoice_no;
}

entity Approved_child2
{
    key invoice_no : String;
    item_no : String;
    key id : UUID;
    material : String;
    material_desc : String;
    hsn_code : String;
    quantity : String;
    amt_per_unit : String;
    discount : String;
    gst_per : String;
    sgst_per : String;
    cgst_per : String;
    igst_per : String;
    taxable_amount : String;
    tax_value_amount : String;
    sgst_amount : String;
    cgst_amount : String;
    igst_amount : String;
    amount : String;
    start : String;
    // bsgst_per : Boolean;
    bigst_per : Boolean;
    hide : Boolean default true;
    comment: String;
    // is_igst : Boolean;
    parent_Approved2 : Association to one Approved on parent_Approved2.invoice_no = invoice_no;
}

entity Currency
{
    code : String;
    description : String;
}

entity Document_type
{
    code : String;
    description : String;
    master_name : String;
}

entity vendor_payment_term
{
    drop_key : String;
    table_key : String;
    value2 : String;
    value3 : String;
    value4 : String;
}

entity vendor_tds
{
    drop_key : String;
    table_key : String;
    value2 : String;
    value3 : String;
    value4 : String;
}

entity material_gst_per
{
    value2 : String;
}

entity Entity2
{
    key ID : UUID
        @Core.Computed;
}
