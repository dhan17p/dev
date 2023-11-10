const cds = require('@sap/cds',);


module.exports = cds.service.impl(async function () {
    /* SERVICE ENTITIES */
    let { Invoice2, Invoice1, Draft_child,Draft_child2,Rejected_child2,Submitted_child2,Approved_child2,sub,Currency,Document_type,vendor_tds,sub12, New, New_child, Submitted, Submitted_child, Approved, Approved_child, vendor_payment_term ,material_gst_per} = this.entities;

    const c4re = await cds.connect.to('iflow');
    var firstReadInvoice1 = true;
    var firstReadInvoice2 = true;
    var firstReadInvoice3 = true;
    const cachedData = {}; 
// this.before('READ', Invoice2, async (req) => {
//     try {
//         if (firstReadInvoice2) {
//             let pageno = 1;
//             const entries = [];
//             const batchSize = 10; // Adjust batch size as needed
//             const body = {"condn":[]};

//             // while (true) {
//                 const resp = await c4re.post(`/dev/fetch-invoice?tabname=rejected&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com`,body);
//                 const spaces = resp.body.invoices;

//                 // if (spaces.length === 0) {
//                 //     break;
//                 // }

//                 for (let i = 0; i < spaces.length; i += batchSize) {
//                     const batch = spaces.slice(i, i + batchSize);
//                     const batchRequests = batch.map(async (space) => {
//                         const invoice_no = space.invoice_no;
                        
//                         // Check if data is cached
//                         if (cachedData[invoice_no]) {
//                             return cachedData[invoice_no];
//                         }

//                         try {
//                             const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
//                             const entry = {
//                                 invoice_no: space.invoice_no,
//                                 user_invoice_id: space.user_invoice_id,
//                                 supplier_name: space.supplier_name || 'NA',
//                                 invoice_date: space.invoice_date,
//                                 working_person: space.working_person,
//                                 modified_date: space.modified_date,
//                                 ref_po_num: resp1.body.ref_po_num,
//                                 // INVOICE_FILE: 'Open',
//                                 payment_terms: resp1.body.payment_terms,
//                                    irn: resp1.body.irn,
//                                 ref_po_num: resp1.body.ref_po_num,
//                                 gstin: resp1.body.gstin,
//                                 doc_type_desc: resp1.body.doc_type_desc,
//                                 user_invoice_id: resp1.body.user_invoice_id,
//                                 invoice_date: resp1.body.invoice_date,
//                                 posting_date: resp1.body.posting_date,
//                                 baseline_date: resp1.body.baseline_date,
//                                 supplier_id: resp1.body.supplier_id,
//                                 payment_method: resp1.body.payment_method,
//                                 company_code: resp1.body.company_code,
//                                 currency: resp1.body.currency,
//                                 department_name: resp1.body.department_name,
//                                 gl_account: resp1.body.gl_account,
//                                 cost_center: resp1.body.cost_center,
//                                 internal_order: resp1.body.internal_order,
//                                 taxable_amount: resp1.body.taxable_amount,
//                                 adjustment: resp1.body.adjustment,
//                                 amount: resp1.body.amount,
//                                 tcs: resp1.body.tcs,
//                                 tds_per: resp1.body.tds_per,
//                                 tds_tot_amt: resp1.body.tds_tot_amt,
//                                 discount_per: resp1.body.discount_per,
//                                 total_discount_amount: resp1.body.total_discount_amount,
//                                 cgst_tot_amt: resp1.body.cgst_tot_amt,
//                                 sgst_tot_amt: resp1.body.sgst_tot_amt,
//                                 igst_tot_amt: resp1.body.igst_tot_amt,
//                                 file_link : resp1.body.files[0].file_link,
//                                 // file_link : "cccc",
//                             };

//                             // Cache the data
//                             cachedData[invoice_no] = entry;

//                             return entry;
//                         } catch (error) {
//                             console.error(`Error fetching data for invoice_no: ${invoice_no}`, error);
//                             return null; // Handle the error appropriately
//                         }
//                     });

//                     entries.push(...(await Promise.all(batchRequests)).filter(Boolean));
//                 }
  
//             //     pageno++;
//             // }

//             await cds.tx(req).run(DELETE(Invoice2));
//             await cds.tx(req).run(INSERT.into(Invoice2).entries(entries));

//             firstReadInvoice2 = false;
//         }

//         return req;
//     } catch (err) {
//         req.error(500, err.message);
//     }
// });
this.before('READ', Invoice2, async (req) => {
    try {
        if (firstReadInvoice2) {
            const entries = [];
            const entries1 = [];
            const body = { "condn": [] };

            // Fetch the initial data from the first endpoint
            const resp = await c4re.post(`/dev/fetch-invoice-sup?tabname=rejected&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com`, body);
            const spaces = resp.body.invoices;

            // Loop through the initial data and retrieve additional data for each invoice
            for (let i = 0; i < spaces.length; i++) {
                const space = spaces[i];
                const invoice_no = space.invoice_no;

                // Fetch additional data for the current invoice
                const resp1 = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`);

                // Push the data for Invoice2
                entries.push({
                    INVOICE_FILE :`${ space.invoice_files.length || 'NA'}`,
                    invoice_no: `${space.invoice_no}`,
                    user_invoice_id: `${space.user_invoice_id}`,
                    supplier_name: `${space.supplier_name || 'NA'}`,
                    invoice_date: `${space.invoice_date}`,
                    working_person: `${space.working_person}`,
                    modified_date: `${space.modified_date}`,
                    payment_terms: `${resp1.body.payment_terms}`,
                    irn: `${resp1.body.irn}`,
                    ref_po_num: `${resp1.body.ref_po_num}`,
                    gstin: `${resp1.body.gstin}`,
                    doc_type_desc: `${resp1.body.doc_type_desc}`,
                    posting_date: `${resp1.body.posting_date}`,
                    baseline_date: `${resp1.body.baseline_date}`,
                    supplier_id: `${resp1.body.supplier_id}`,
                    payment_method: `${resp1.body.payment_method}`,
                    company_code: `${resp1.body.company_code}`,
                    currency: `${resp1.body.currency}`,
                    department_name: `${resp1.body.department_name}`,
                    gl_account: `${resp1.body.gl_account}`,
                    cost_center: `${resp1.body.cost_center}`,
                    internal_order: `${resp1.body.internal_order}`,
                    taxable_amount: `${resp1.body.taxable_amount}`,
                    adjustment: `${resp1.body.adjustment}`,
                    amount: `${resp1.body.amount}`,
                    tcs: `${resp1.body.tcs}`,
                    tds_per: `${resp1.body.tds_per}`,
                    tds_tot_amt: `${resp1.body.tds_tot_amt}`,
                    discount_per: `${resp1.body.discount_per}`,
                    total_discount_amount: `${resp1.body.total_discount_amount}`,
                    cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
                    sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
                    igst_tot_amt: `${resp1.body.igst_tot_amt}`,
                    file_link: `${(resp1.body && resp1.body.invoice_files && resp1.body.invoice_files.length > 0) ? resp1.body.invoice_files[0].file_link : 'NA'}`,
                    // buttonbool: `false`,
                    bool: (() => {
                        if (resp1.body.igst_tot_amt == 0) {
                            return 0; //for cgsst
                        } else {
                            return 1; //for igst
                        }
                    })(),
                    totaltaxamount: (() => {
                        if (resp1.body.igst_tot_amt === 0) {
                            return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                        } else {
                            return `IGST: ${resp1.body.igst_tot_amt}`;
                        }
                    })(),
                    value1: (() => {
                        if (resp1.body.npo == "y") {
                            return 7;
                        } else {
                            return 3;
                        }
                    })(),
                    is_igst: `${resp1.body.is_igst}`,
                    npo: `${resp1.body.npo}`,
                    sup_status: `${resp1.body.sup_status}`
                

                });
                var spaces1 = resp1.body.items;

                if (typeof resp1.body === 'string' && resp1.body.includes("'NoneType' object is not subscriptable")) {
                    console.log("no items");
                }
                    else{
                spaces1.forEach(space => {
                  
                    entries1.push({

                        parentrejected2_invoice_no: `${resp1.body.invoice_no}`,
                        invoice_no: `${resp1.body.invoice_no}`,
                        material: `${space.material}`,
                        material_desc: `${space.material_desc}`,
                        hsn_code: `${space.hsn_code}`,
                        item_no: `${space.item_no}`,
                        quantity: `${space.quantity}`,
                        amt_per_unit: `${space.amt_per_unit}`,
                        discount: `${space.discount}`,
                        gst_per: `${space.gst_per}`,
                        sgst_per: `SGST:${space.sgst_per}`,
                        cgst_per: `CGST:${space.cgst_per}`,
                        igst_per: `IGST:${space.igst_per}`,
                        taxable_amount: `${space.taxable_amount}`,
                        tax_value_amount: `${(space.taxable_amount * (space.gst_per / 100)) + space.taxable_amount}`,
                        sgst_amount: `SGST:${space.sgst_amount}`,
                        cgst_amount: `CGST:${space.cgst_amount}`,
                        igst_amount: `IGST:${space.igst_amount}`,
                        amount: `${space.amount}`,
                        bigst_per: space.sgst_amount == 0 ? true : false

                    });     
              });
            }
            }

            // Perform database operations
            await cds.tx(req).run(DELETE(Invoice2));
             await cds.tx(req).run(DELETE(Rejected_child2));
            await cds.tx(req).run(INSERT.into(Invoice2).entries(entries));
         await cds.tx(req).run(INSERT.into(Rejected_child2).entries(entries1));

            firstReadInvoice2 = false;
        }

        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});




// this.before('PATCH',Invoice2.dr
// aft,async req => {
//     console.log("patch");
//     // await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
// });
// this.before('PUT',Invoice2.drafts,async req => {
//     console.log("patch");
//     // await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
// });
// this.on('EDIT',Invoice2,async req => {

//     // await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
// });
// this.on('POST',Invoice2,async req => {
//     // await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
// });
// this.on('POST',Invoice2.drafts,async req => {
//     // await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
// });
this.before('READ', Invoice1, async (req) => {
    try {
        if (firstReadInvoice1) {
            const entries = [];
            const entries1 = [];
            page_no = 3;
            const body = { "condn": [] };
            // while(true){
            // Fetch the initial data from the first endpoint
            const resp = await c4re.post(`/dev/fetch-invoice-sup?tabname=draft&pageno=${page_no}&nooflines=10&userid=einvoiceportal@gmail.com`, body);
            const spaces = resp.body.invoices;

            // if (spaces.length == 0) {
            //     break;
            // }

            // Loop through the initial data and retrieve additional data for each invoice
            for (let i = 0; i < spaces.length; i++) {
                const space = spaces[i];
                const invoice_no = space.invoice_no;

                // Fetch additional data for the current invoice
                // const resp1 = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`);
                const resp1 = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`);
                //  if(resp1.body.length == 0){
                //    continue;
                //  }
                // Push the data for Invoice2
                entries.push({
                    INVOICE_FILE: `${space.invoice_files.length || 'NA'}`,
                    invoice_no: `${space.invoice_no}`,
                    user_invoice_id: `${space.user_invoice_id}`,
                    supplier_name: `${space.supplier_name || 'NA'}`,
                    invoice_date: `${space.invoice_date}`,
                    working_person: `${space.working_person}`,
                    modified_date: `${space.modified_date}`,
                    payment_terms: `${resp1.body.payment_terms}`,
                    irn: `${resp1.body.irn}`,
                    ref_po_num: `${resp1.body.ref_po_num}`,
                    gstin: `${resp1.body.gstin}`,
                    doc_type_desc: `${resp1.body.doc_type_desc}`,
                    posting_date: `${resp1.body.posting_date}`,
                    baseline_date: `${resp1.body.baseline_date}`,
                    supplier_id: `${resp1.body.supplier_id}`,
                    payment_method: `${resp1.body.payment_method}`,
                    company_code: `${resp1.body.company_code}`,
                    currency: `${resp1.body.currency}`,
                    department_name: `${resp1.body.department_name}`,
                    gl_account: `${resp1.body.gl_account}`,
                    cost_center: `${resp1.body.cost_center}`,
                    internal_order: `${resp1.body.internal_order}`,
                    taxable_amount: `${resp1.body.taxable_amount}`,
                    adjustment: `${resp1.body.adjustment}`,
                    amount: `${resp1.body.amount}`,
                    tcs: `${resp1.body.tcs}`,
                    tds_per: `${resp1.body.tds_per}`,
                    tds_tot_amt: `${resp1.body.tds_tot_amt}`,
                    discount_per: `${resp1.body.discount_per}`,
                    total_discount_amount: `${resp1.body.total_discount_amount}`,
                    cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
                    sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
                    igst_tot_amt: `${resp1.body.igst_tot_amt}`,
                    file_link: `${(resp1.body && resp1.body.invoice_files && resp1.body.invoice_files.length > 0) ? resp1.body.invoice_files[0].file_link : 'NA'}`,
                    // buttonbool: `${false}`,
                    bool: (() => {
                        if (resp1.body.igst_tot_amt == 0) {
                            return 0; // for cgsst
                        } else {
                            return 1; // for igst
                        }
                    })(),
                    totaltaxamount: `${(() => {
                        if (resp1.body.is_igst == "n") {
                            return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                        } else {
                            return `IGST: ${resp1.body.igst_tot_amt}`;
                        }
                    })()}`,
                    value1: (() => {
                        if (resp1.body.npo == "y") {
                            return 7;
                        } else {
                            return 3;
                        }
                    })(),
                    is_igst: `${resp1.body.is_igst}`,
                    npo: `${resp1.body.npo}`,
                    sup_status: `${resp1.body.sup_status}`

                });
                var spaces1 = resp1.body.items;

            //     if (!resp1.body || (typeof resp1.body === 'string' && resp1.body.includes("'NoneType' object is not subscriptable")) || (!resp1.body || (typeof resp1.body !== 'string' || !resp1.body.includes('Internal Server Error')))) {
            //         console.log(`no items in ${invoice_no}`);

            //     }
            //         else if (
            //        Object.keys(resp1.body).length === 0 && 
            //         resp1.statuscode === 200
            //         )
            //         {
            //             console.log(`no items in ${invoice_no}`);
            //         }
            //         else{

                        
            //          console.log  (`wrong ${invoice_no}`) ;
            //     spaces1.forEach(space => {
                  
            //         entries1.push({

            //             parentrejected2_invoice_no:invoice_no,
            //              invoice_no: invoice_no,
            //             // invoice_no: 12,
            //             // id : 2222,
            //             material: space.material,
            //            material_desc: space.material_desc,
            //            hsn_code: space.hsn_code,
            //            item_no : space.item_no,
            //            quantity: space.quantity,
            //            amt_per_unit: space.amt_per_unit,
            //            discount: space.discount,
            //               gst_per:  space.gst_per,
            //               sgst_per: `SGST:${space.sgst_per}`,
            //               cgst_per: `CGST:${space.cgst_per}`,
            //               igst_per: `IGST:${space.igst_per}`,
            //             taxable_amount: space.taxable_amount,
            //             tax_value_amount:  ((space.taxable_amount*(space.gst_per/100))+(space.taxable_amount)),
            //             sgst_amount: `SGST:${space.sgst_amount}`,
            //             cgst_amount: `CGST:${space.cgst_amount}`,
            //             igst_amount: `IGST:${space.igst_amount}`,
            //             amount: space.amount,
            //             bigst_per : space.sgst_amount == 0 ? true : false ,
            //         });     
            //   });
            // }
            if (
                resp1.body &&
                resp1.statuscode === 200 &&
                resp1.body.invoice_no &&
                resp1.body.invoice_date )
                // Add more conditions for other expected fields 
                 {
                // The response format matches the expected format, proceed to process it
                // ...
                spaces1.forEach(space => {
                    entries1.push({
                        invoice_no: `${invoice_no}`,
                        material: `${space.material}`,
                        material_desc: `${space.material_desc}`,
                        hsn_code: `${space.hsn_code}`,
                        item_no: space.item_no,
                        quantity: `${space.quantity}`,
                        amt_per_unit: `${space.amt_per_unit}`,
                        discount: `${space.discount}`,
                        gst_per: `${space.gst_per}`,
                        sgst_per: `SGST:${space.sgst_per}`,
                        cgst_per: `CGST:${space.cgst_per}`,
                        igst_per: `IGST:${space.igst_per}`,
                        taxable_amount: `${space.taxable_amount}`,
                        tax_value_amount: `${(space.taxable_amount * (space.gst_per / 100)) + space.taxable_amount}`,
                        sgst_amount: `SGST:${space.sgst_amount}`,
                        cgst_amount: `CGST:${space.cgst_amount}`,
                        igst_amount: `IGST:${space.igst_amount}`,
                        amount: `${space.amount}`,
                        bigst_per: (() => {
                            if (resp1.body.is_igst == "n") {
                                return 0;
                            } else {
                                return 1;
                            }})(),
                        // is_igst: `${(() => {
                        //     if (resp1.body.is_igst == "n") {
                        //         return false;
                        //     } else {
                        //         return true;
                        //     }})()}`
                    });
                });
            } else {
                console.log(`Response format is not as expected for invoice ${invoice_no}. Rejecting it.`);
            }

            
            


             }
        //     page_no++;
        // }

            // Perform database operations
            await cds.tx(req).run(DELETE(Invoice1));
             await cds.tx(req).run(DELETE(Draft_child2));
            await cds.tx(req).run(INSERT.into(Invoice1).entries(entries));
         await cds.tx(req).run(INSERT.into(Draft_child2).entries(entries1));

            firstReadInvoice1 = false;
        }

        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});







    this.on('UPDATE', Invoice1, async (req) => {
        try {
            const originalData = req.data;
            invoice_no = data.invoice_no;
    
    
            const payload = {
                header: {
                    user_invoice_id: `${originalData.user_invoice_id}`,
                    supplier_name: `${originalData.supplier_name}`,
                    invoice_date: `${originalData.invoice_date}`,
                    payment_terms: `${originalData.payment_terms}`,
                    baseline_date: `${originalData.baseline_date}`,
                    posting_date: `${originalData.posting_date}`,
                    ref_po_num: `${originalData.ref_po_num}`,
                    currency: `${originalData.currency}`,
                    taxable_amount: `${originalData.taxable_amount}`,
                    tax_per: `${originalData.tax_per}`,
                    is_igst: `${originalData.is_igst}`,
                    cgst_tot_amt: `${originalData.cgst_tot_amt}`,
                    sgst_tot_amt: `${originalData.sgst_tot_amt}`,
                    igst_tot_amt: `${originalData.igst_tot_amt}`,
                    discount_per: `${originalData.discount_per}`,
                    total_discount_amount: `${originalData.total_discount_amount}`,
                    tds_per: `${originalData.tds_per}`,
                    tds_tot_amt: `${originalData.tds_tot_amt}`,
                    amount: `${originalData.amount}`,
                    adjustment: `${originalData.adjustment}`,
                    tcs: `${originalData.tcs}`,
                    sup_status: `${originalData.sup_status}`,
                    approver_comments: `${originalData.approver_comments}`,
                    npo: `${originalData.npo}`,
                    gstin: `${originalData.gstin}`,
                    document_type: `${originalData.document_type}`,
                    irn: `${originalData.irn || null}`,
                    invoice_files: [],
                    is_igst: `${originalData.is_igst}`,
                    npo: `${originalData.npo}`,
                    sup_status: `${originalData.npo}`
                    // You may need to fill this based on your logic
                },
                item: data.child_draft2.map(item => ({
                    item_no: `${item.item_no}`,
    material_desc: `${item.material_desc}`,
    material: `${item.material}`,
    quantity: `${item.quantity}`,
    amt_per_unit: `${item.amt_per_unit}`,
    unit: `${item.unit}`,
    discount: `${item.discount}`,
    discount_amount: `${item.discount_amount}`,
    gst_per: `${item.gst_per}`,
    sgst_per: `${item.sgst_per}`,
    cgst_per: `${item.cgst_per}`,
    igst_per: `${item.igst_per}`,
    taxable_amount: `${item.taxable_amount}`,
    tax_value_amount: `${item.tax_value_amount}`,
    cgst_amount: `${item.cgst_amount}`,
    sgst_amount: `${item.sgst_amount}`,
    igst_amount: `${item.igst_amount}`,
    hsn_code: `${item.hsn_code}`,
    gross_amount: `${item.gross_amount}`
                })),
            };
            const resp = await c4re.post(`/dev/supplier?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`, payload);
            return resp;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    this.on('UPDATE', Invoice2, async (req) => {
        try {
            const originalData = req.data;
            const invoice_no = req.data.invoice_no;
    
    
            const payload = {
                header: {
                    user_invoice_id: `${originalData.user_invoice_id}`,
                    supplier_name: `${originalData.supplier_name}`,
                    invoice_date: `${originalData.invoice_date}`,
                    payment_terms: `${originalData.payment_terms}`,
                    baseline_date: `${originalData.baseline_date}`,
                    posting_date: `${originalData.posting_date}`,
                    ref_po_num: `${originalData.ref_po_num}`,
                    currency: `${originalData.currency}`,
                    taxable_amount: `${originalData.taxable_amount}`,
                    tax_per: `${originalData.tax_per}`,
                    is_igst: `${originalData.is_igst}`,
                    cgst_tot_amt: `${originalData.cgst_tot_amt}`,
                    sgst_tot_amt: `${originalData.sgst_tot_amt}`,
                    igst_tot_amt: `${originalData.igst_tot_amt}`,
                    discount_per: `${originalData.discount_per}`,
                    total_discount_amount: `${originalData.total_discount_amount}`,
                    tds_per: `${originalData.tds_per}`,
                    tds_tot_amt: `${originalData.tds_tot_amt}`,
                    amount: `${originalData.amount}`,
                    adjustment: `${originalData.adjustment}`,
                    tcs: `${originalData.tcs}`,
                    sup_status: `${originalData.sup_status}`,
                    approver_comments: `${originalData.approver_comments}`,
                    npo: `${originalData.npo}`,
                    gstin: `${originalData.gstin}`,
                    document_type: `${originalData.document_type}`,
                    irn: originalData.irn || null,
                    invoice_files: [],
                    is_igst: `${originalData.is_igst}`,
                    npo: `${originalData.npo}`,
                    sup_status: `${originalData.npo}`
                     // You may need to fill this based on your logic
                },
                item: originalData.child2.map(item => ({
                    amt_per_unit: `${item.amt_per_unit}`,
                    cgst_amount: `${item.cgst_amount}`,
                    cgst_per: `${item.cgst_per}`,
                    discount: `${item.discount}`,
                    discount_amount: `${item.discount_amount}`,
                    gross_amount: `${item.gross_amount}`,
                    gst_per: `${item.gst_per}`,
                    hsn_code: `${item.hsn_code}`,
                    igst_amount: `${item.igst_amount}`,
                    igst_per: `${item.igst_per}`,
                    item_no: `${item.item_no}`,
                    material: `${item.material}`,
                    material_desc: `${item.material_desc}`,
                    quantity: `${item.quantity}`,
                    sgst_amount: `${item.sgst_amount}`,
                    sgst_per: `${item.sgst_per}`,
                    taxable_amount: `${item.taxable_amount}`,
                    tax_value_amount: `${item.tax_value_amount}`,
                    unit: `${item.unit}`
                })),
            };
            const resp = await c4re.post(`/dev/supplier?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`, payload);
            return resp;
        } catch (err) {
            req.error(500, err.message);
        }
    });



 /*APPROVED*/
 var firstReadInvoiceApproved = true;
    this.before('READ', Approved, async (req) => {
        firstReadInvoiceApproved = true;
        try {
            //debugger
            var er = false;
            const data = await SELECT.from(Approved);
            invoiceNo1 = data[0].invoice_no;   
                if (req.params[0].invoice_no != null)  {
                    // debugger
                    cds.tx(req).run(DELETE(Approved));
                    var er = true;
                    // cds.tx(req).run(DELETE(podatatab));
                    const invoice_no = req.params[0].invoice_no;
                    const link = `/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`;
                    const resp1 = await c4re.post(link);
                    const spaces1 = resp1.body;
                    const entries1 = [];
                    
                        entries1.push({
                             invoice_no: `${resp1.body.invoice_no}`,
    INVOICE_FILE: 'Open',
    payment_terms: `${resp1.body.payment_terms}`,
    irn: `${resp1.body.irn}`,
    ref_po_num: `${resp1.body.ref_po_num}`,
    gstin: `${resp1.body.gstin}`,
    doc_type_desc: `${resp1.body.doc_type_desc}`,
    user_invoice_id: `${resp1.body.user_invoice_id}`,
    invoice_date: `${resp1.body.invoice_date}`,
    posting_date: `${resp1.body.posting_date}`,
    baseline_date: `${resp1.body.baseline_date}`,
    supplier_id: `${resp1.body.supplier_id}`,
    payment_method: `${resp1.body.payment_method}`,
    company_code: `${resp1.body.company_code}`,
    currency: `${resp1.body.currency}`,
    department_name: `${resp1.body.department_name}`,
    gl_account: `${resp1.body.gl_account}`,
    cost_center: `${resp1.body.cost_center}`,
    internal_order: `${resp1.body.internal_order}`,
    taxable_amount: `${resp1.body.taxable_amount}`,
    adjustment: `${resp1.body.adjustment}`,
    amount: `${resp1.body.amount}`,
    tcs: `${resp1.body.tcs}`,
    tds_per: `${resp1.body.tds_per}`,
    tds_tot_amt: `${resp1.body.tds_tot_amt}`,
    discount_per: `${resp1.body.discount_per}`,
    total_discount_amount: `${resp1.body.total_discount_amount}`,
    cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
    sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
    igst_tot_amt: `${resp1.body.igst_tot_amt}`,
    file_link: `${resp1.body.invoice_files[0]?.file_link || 'NA'}`,
    buttonbool: true,
    bool: (() => {
        if (`${resp1.body.igst_tot_amt}` == '0') {
            return false; // for cgsst
        } else {
            return true; // for igst
        }
    })(),
    totaltaxamount: (() => {
        if (`${resp1.body.igst_tot_amt}` == '0') {
            return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
        } else {
            return `IGST: ${resp1.body.igst_tot_amt}`;
        }
    })()
                        });
                    // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                    await cds.tx(req).run(INSERT.into(Approved).entries(entries1));    
                
                }
                // debugger
                
            // }
            var er = false;
            return req;
        } catch (err) {
            if (er) {
               req.error(500, err.message);
            }
            try {
                //debugger
                var er = false;
                
                    if (req.query.SELECT.where[2].val != null)  {
                        // debugger
                        cds.tx(req).run(DELETE(Approved));
                        var er = true;
                        // cds.tx(req).run(DELETE(podatatab));
                        const invoice_no = req.query.SELECT.where[2].val;
                        const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                        const resp1 = await c4re.post(link);
                        const spaces1 = resp1.body;
                        const entries1 = [];
                        
                            entries1.push({
                                invoice_no: `${resp1.body.invoice_no}`,
                                INVOICE_FILE: 'Open',
                                payment_terms: `${resp1.body.payment_terms}`,
                                irn: `${resp1.body.irn}`,
                                ref_po_num: `${resp1.body.ref_po_num}`,
                                gstin: `${resp1.body.gstin}`,
                                doc_type_desc: `${resp1.body.doc_type_desc}`,
                                user_invoice_id: `${resp1.body.user_invoice_id}`,
                                invoice_date: `${resp1.body.invoice_date}`,
                                posting_date: `${resp1.body.posting_date}`,
                                baseline_date: `${resp1.body.baseline_date}`,
                                supplier_id: `${resp1.body.supplier_id}`,
                                payment_method: `${resp1.body.payment_method}`,
                                company_code: `${resp1.body.company_code}`,
                                currency: `${resp1.body.currency}`,
                                department_name: `${resp1.body.department_name}`,
                                gl_account: `${resp1.body.gl_account}`,
                                cost_center: `${resp1.body.cost_center}`,
                                internal_order: `${resp1.body.internal_order}`,
                                taxable_amount: `${resp1.body.taxable_amount}`,
                                adjustment: `${resp1.body.adjustment}`,
                                amount: `${resp1.body.amount}`,
                                tcs: `${resp1.body.tcs}`,
                                tds_per: `${resp1.body.tds_per}`,
                                tds_tot_amt: `${resp1.body.tds_tot_amt}`,
                                discount_per: `${resp1.body.discount_per}`,
                                total_discount_amount: `${resp1.body.total_discount_amount}`,
                                cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
                                sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
                                igst_tot_amt: `${resp1.body.igst_tot_amt}`,
                                file_link: `${resp1.body.files[0]?.file_link || 'NA'}`,
                                buttonbool: false,
                                bool: (() => {
                                    if (`${resp1.body.igst_tot_amt}` == '0') {
                                        return false; // for cgsst
                                    } else {
                                        return true; // for igst
                                    }
                                })(),
                                totaltaxamount: (() => {
                                    if (`${resp1.body.is_igst}` === '1') {
                                        return `IGST: ${resp1.body.igst_tot_amt}`;
                                    } else {
                                        return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                    }
                                })()
                            });
                        // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                        await cds.tx(req).run(INSERT.into(Approved).entries(entries1));    
                    
                    }
                    // debugger
                    
                // }
                var er = false;
                return req;
            } catch (err) {
                if (er) {
                   req.error(500, err.message);
                }
    
            try
            {
            if (firstReadInvoiceApproved) {
                cds.tx(req).run(DELETE(Approved));
                const body = { "condn": [] };
                const resp = await c4re.post('/dev/fetch-invoice-sup?tabname=approved&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com',body);
                const spaces = resp.body.invoices;
                const entries = [];
                spaces.forEach(space=>{
                    entries.push({
                        INVOICE_FILE: `${space.invoice_files.length || 'NA'}`,
                        invoice_no: `${space.invoice_no}`,
                        user_invoice_id: `${space.user_invoice_id}`,
                        supplier_name: `${space.supplier_name || 'NA'}`,
                        invoice_date: `${space.invoice_date}`,
                        working_person: `${space.working_person}`,
                        modified_date: `${space.modified_date}`
                    });
                });
    
                
                await cds.tx(req).run(INSERT.into(Approved).entries(entries));
            }
            return req;
            
        }catch(err){
         req.error(500, err.message);
        }
    
        }
    
        }
    });
 var firstReadApproved_child2 = true;
    this.before('READ', Approved_child2, async (req) => {
        try {
            if (firstReadApproved_child2) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail`);
                cds.tx(req).run(DELETE(Approved_child2));


                const spaces = resp.body.items;
                // debugger;
                spaces.forEach(space => {
                    entries.push({
                        invoice_no: `${resp.body.invoice_no}`,
                        material: `${space.material}`,
                        material_desc: `${space.material_desc}`,
                        hsn_code: `${space.hsn_code}`,
                        item_no: `${space.item_no}`,
                        quantity: `${space.quantity}`,
                        amt_per_unit: `${space.amt_per_unit}`,
                        discount: `${space.discount}`,
                        gst_per: `${space.gst_per}`,
                        sgst_per: `SGST:${space.sgst_per}`,
                        cgst_per: `CGST:${space.cgst_per}`,
                        igst_per: `IGST:${space.igst_per}`,
                        taxable_amount: `${space.taxable_amount}`,
                        tax_value_amount: `${(space.taxable_amount * (space.gst_per / 100)) + space.taxable_amount}`,
                        sgst_amount: `SGST:${space.sgst_amount}`,
                        cgst_amount: `CGST:${space.cgst_amount}`,
                        igst_amount: `IGST:${space.igst_amount}`,
                        amount: `${space.amount}`,
                        bigst_per: space.sgst_amount == 0 ? 1 : 0,
                        // is_igst: resp.body.igst_amount == 0 ? 0 : 1
                    });
                });
                await cds.tx(req).run(INSERT.into(Approved_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    /* submmitted */

    var firstReadSubmitted1 = true;
this.before('READ', sub, async (req) => {
 firstReadSubmitted1 = true;
    try {
        //debugger
        var er = false;
        const data = await SELECT.from(sub);
        invoiceNo1 = data[0].invoice_no;   
            if (req.params[0].invoice_no != null)  {
                // debugger
                cds.tx(req).run(DELETE(sub));
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                const invoice_no = req.params[0].invoice_no;
                const link = `/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`;
                const resp1 = await c4re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                        invoice_no: `${invoice_no}`,
                        INVOICE_FILE: 'Open',
                        payment_terms: `${resp1.body.payment_terms}`,
                        irn: `${resp1.body.irn}`,
                        ref_po_num: `${resp1.body.ref_po_num}`,
                        gstin: `${resp1.body.gstin}`,
                        doc_type_desc: `${resp1.body.doc_type_desc}`,
                        user_invoice_id: `${resp1.body.user_invoice_id}`,
                        invoice_date: `${resp1.body.invoice_date}`,
                        posting_date: `${resp1.body.posting_date}`,
                        baseline_date: `${resp1.body.baseline_date}`,
                        supplier_id: `${resp1.body.supplier_id}`,
                        payment_method: `${resp1.body.payment_method}`,
                        company_code: `${resp1.body.company_code}`,
                        currency: `${resp1.body.currency}`,
                        department_name: `${resp1.body.department_name}`,
                        gl_account: `${resp1.body.gl_account}`,
                        cost_center: `${resp1.body.cost_center}`,
                        internal_order: `${resp1.body.internal_order}`,
                        taxable_amount: `${resp1.body.taxable_amount}`,
                        adjustment: `${resp1.body.adjustment}`,
                        amount: `${resp1.body.amount}`,
                        tcs: `${resp1.body.tcs}`,
                        tds_per: `${resp1.body.tds_per}`,
                        tds_tot_amt: `${resp1.body.tds_tot_amt}`,
                        discount_per: `${resp1.body.discount_per}`,
                        total_discount_amount: `${resp1.body.total_discount_amount}`,
                        cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
                        sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
                        igst_tot_amt: `${resp1.body.igst_tot_amt}`,
                        file_link: `${(resp1.body === "\"'NoneType' object is not subscriptable\"") ? 'NA' : resp1.body.invoice_files[0]?.file_link || 'NA'}`,

                        totaltaxamount: (() => {
                            if (resp1.body.is_igst == 1) {
                                return `IGST: ${resp1.body.igst_tot_amt}`;
                            } else {
                                return `CGST: ${resp1.body.cgst_tot_amt} SGST: ${resp1.body.sgst_tot_amt}`;
                            }
                        })()
                    });
                // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                await cds.tx(req).run(INSERT.into(sub).entries(entries1));    
            
            }
            // debugger
            
        // }
        var er = false;
        return req;
    } catch (err) {
        if (er) {
           req.error(500, err.message);
        }
        try {
            //debugger
            var er = false;
            // const data = await SELECT.from(sub);
            // invoiceNo1 = data[0].invoice_no;   
                if (req.query.SELECT.where[2].val != null)  {
                    // debugger
                    cds.tx(req).run(DELETE(sub));
                    var er = true;
                    // cds.tx(req).run(DELETE(podatatab));
                    const invoice_no = req.query.SELECT.where[2].val;
                    const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                    const resp1 = await c4re.post(link);
                    const spaces1 = resp1.body;
                    const entries1 = [];
                    
                        entries1.push({
                            invoice_no: `${resp1.body.invoice_no}`,
                            INVOICE_FILE: 'Open',
                            payment_terms: `${resp1.body.payment_terms}`,
                            irn: `${resp1.body.irn}`,
                            ref_po_num: `${resp1.body.ref_po_num}`,
                            gstin: `${resp1.body.gstin}`,
                            doc_type_desc: `${resp1.body.doc_type_desc}`,
                            user_invoice_id: `${resp1.body.user_invoice_id}`,
                            invoice_date: `${resp1.body.invoice_date}`,
                            posting_date: `${resp1.body.posting_date}`,
                            baseline_date: `${resp1.body.baseline_date}`,
                            supplier_id: `${resp1.body.supplier_id}`,
                            payment_method: `${resp1.body.payment_method}`,
                            company_code: `${resp1.body.company_code}`,
                            currency: `${resp1.body.currency}`,
                            department_name: `${resp1.body.department_name}`,
                            gl_account: `${resp1.body.gl_account}`,
                            cost_center: `${resp1.body.cost_center}`,
                            internal_order: `${resp1.body.internal_order}`,
                            taxable_amount: `${resp1.body.taxable_amount}`,
                            adjustment: `${resp1.body.adjustment}`,
                            amount: `${resp1.body.amount}`,
                            tcs: `${resp1.body.tcs}`,
                            tds_per: `${resp1.body.tds_per}`,
                            tds_tot_amt: `${resp1.body.tds_tot_amt}`,
                            discount_per: `${resp1.body.discount_per}`,
                            total_discount_amount: `${resp1.body.total_discount_amount}`,
                            cgst_tot_amt: `${resp1.body.cgst_tot_amt}`,
                            sgst_tot_amt: `${resp1.body.sgst_tot_amt}`,
                            igst_tot_amt: `${resp1.body.igst_tot_amt}`,
                            file_link: `${resp1.body.files[0]?.file_link || 'NA'}`,
                            totaltaxamount: (() => {
                                if (resp1.body.igst_tot_amt === 1) {
                                    return `IGST: ${resp1.body.igst_tot_amt}`;
                                } else {
                                    return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                }
                            })()
                        });
                    // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                    await cds.tx(req).run(INSERT.into(sub).entries(entries1));    
                
                }
                // debugger
                
            // }
            var er = false;
            return req;
        } catch (err) {
            if (er) {
               req.error(500, err.message);
            }

        try
        {
        if (firstReadSubmitted1) {
            cds.tx(req).run(DELETE(sub));
            const body = { "condn": [] };
            
            const resp = await c4re.post('/dev/fetch-invoice-sup?tabname=inapproval&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com',body);
            const spaces = resp.body.invoices;
            const entries = [];
            spaces.forEach(space=>{
                entries.push({
                    INVOICE_FILE: `${space.invoice_files.length || 'NA'}`,
                    invoice_no: `${space.invoice_no}`,
                    user_invoice_id: `${space.user_invoice_id}`,
                    supplier_name: `${space.supplier_name || 'NA'}`,
                    invoice_date: `${space.invoice_date}`,
                    working_person: `${space.working_person}`,
                    modified_date: `${space.modified_date}`
                });
            });

            
            await cds.tx(req).run(INSERT.into(sub).entries(entries));
        }
        return req;
        
    }catch(err){
     req.error(500, err.message);
    }

    }

    }
});



    /*submiitedchild*/
    // var firstReadSubmittedchild = true;
    // this.before('READ', Submitted_child, async (req) => {
    //     try {
    //         if (firstReadSubmittedchild) { 
    //             let invoice_no = req.params[0].invoice_no;
    //             console.log(invoice_no);
    //             //  debugger
    //             const entries = [];
    //             const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
    //             cds.tx(req).run(DELETE(Submitted_child));
    //             entries.push({
    //                 invoice_no: `${resp.body.invoice_no}`,
    //                 payment_terms: `${resp.body.payment_terms}`,
    //                 irn: `${resp.body.irn}`,
    //                 ref_po_num: `${resp.body.ref_po_num}`,
    //                 gstin: `${resp.body.gstin}`,
    //                 doc_type_desc: `${resp.body.doc_type_desc}`,
    //                 user_invoice_id: `${resp.body.user_invoice_id}`,
    //                 invoice_date: `${resp.body.invoice_date}`,
    //                 posting_date: `${resp.body.posting_date}`,
    //                 baseline_date: `${resp.body.baseline_date}`,
    //                 supplier_id: `${resp.body.supplier_id}`,
    //                 payment_method: `${resp.body.payment_method}`,
    //                 company_code: `${resp.body.company_code}`,
    //                 currency: `${resp.body.currency}`,
    //                 department_name: `${resp.body.department_name}`,
    //                 gl_account: `${resp.body.gl_account}`,
    //                 cost_center: `${resp.body.cost_center}`,
    //                 internal_order: `${resp.body.internal_order}`,
    //                 taxable_amount: `${resp.body.taxable_amount}`,
    //                 adjustment: `${resp.body.adjustment}`,
    //                 amount: `${resp.body.amount}`,
    //                 tcs: `${resp.body.tcs}`,
    //                 tds_per: `${resp.body.tds_per}`,
    //                 tds_tot_amt: `${resp.body.tds_tot_amt}`,
    //                 discount_per: `${resp.body.discount_per}`,
    //                 total_discount_amount: `${resp.body.total_discount_amount}`,
    //                 cgst_tot_amt: `${resp.body.cgst_tot_amt}`,
    //                 sgst_tot_amt: `${resp.body.sgst_tot_amt}`
    //             });
    //             await cds.tx(req).run(INSERT.into(Submitted_child).entries(entries));
    //         }
    //         return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });



    var firstReadSubmitted_child2 = true;
    this.before('READ', Submitted_child2, async (req) => {
        try {
            if (firstReadSubmitted_child2) {
                var invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`);
                // const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com`);
                cds.tx(req).run(DELETE(Submitted_child2));


                // const spaces = resp.body;
                 const spaces = resp.body.items;
                 if (typeof resp.body === 'string' && resp.body.includes("'NoneType' object is not subscriptable")) {
                    console.log("no items");
                }
                else{
                // debugger;
                 spaces.forEach(space => {
                    entries.push({
     invoice_no: `${resp.body.invoice_no}`,
    material: `${space.material}`,
    material_desc: `${space.material_desc}`,
    hsn_code: `${space.hsn_code}`,
    item_no: `${space.item_no}`,
    quantity: `${space.quantity}`,
    amt_per_unit: `${space.amt_per_unit}`,
    discount: `${space.discount}`,
    gst_per: `${space.gst_per}`,
    sgst_per: `SGST:${space.sgst_per}`,
    cgst_per: `CGST:${space.cgst_per}`,
    igst_per: `IGST:${space.igst_per}`,
    taxable_amount: `${space.taxable_amount}`,
    tax_value_amount: `${((space.taxable_amount * (space.gst_per / 100)) + space.taxable_amount)}`,
    sgst_amount: `SGST:${space.sgst_amount}`,
    cgst_amount: `CGST:${space.cgst_amount}`,
    igst_amount: `IGST:${space.igst_amount}`,
    is_igst: (() => {
        if (resp.body.is_igst == 1) {
            return 1;
        } else {
            return 0;
        }
    })()
                        //  bigst_per : space.sgst_amount == 0 ? true : false ,
                         
                    });
             });}
                await cds.tx(req).run(INSERT.into(Submitted_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

//    this.before('READ', Invoice2, async (req) => {
//         try {
//             if (firstReadInvoice2) {
           
//                 const entries = [];
//                 const entries1 = [];
//                 const body = {"condn":[]};
//                     const resp = await c4re.post(`/dev/fetch-invoice?tabname=rejected&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com`,body);
//                     cds.tx(req).run(DELETE(Invoice2));
//                     cds.tx(req).run(DELETE(Rejected_child2));
//                     // const spaces = resp.content;
//                     const spaces = resp.body.invoices;
//                     spaces.forEach(space => {
//                         entries.push({
//                             invoice_no: space.invoice_no,
//                             user_invoice_id: space.user_invoice_id,
//                             supplier_name: space.supplier_name || 'NA',
//                             invoice_date: space.invoice_date,
//                             working_person: space.working_person,
//                             modified_date: space.modified_date,
//                         });
//                     });
//                     entries1.push({

//                         parentrejected2_invoice_no: '3467',
//                         // invoice_no: resp.body.invoice_no,
//                         invoice_no: 12,
//                         id : 2222,
//                     });
//                 await cds.tx(req).run(INSERT.into(Invoice2).entries(entries));
//                 await cds.tx(req).run(INSERT.into(Rejected_child2).entries(entries1));
//                 // return spaces;
//                 firstReadInvoice2 = false;
//             }
//             return req;
//         } catch (err) {
//             req.error(500, err.message);
//         }
//     });


// this.on('showigst' ,'Invoice2.drafts', async req => {
//     // await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: 'IGST'});
    
//     const invoiceNo = req.params[0].invoice_no;
//     const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
//     const IGST =  resp.body.igst_tot_amt;
//     await cds.update(Invoice2.drafts)
//     .set({ totaltaxamount:  `IGST:${IGST}`, bool : true })
//     .where({ invoice_no: invoiceNo });
// });

// this.on('hideigst', Invoice2.drafts, async req => {
//     const invoiceNo = req.params[0].invoice_no;
//     const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
//     const CGST =  resp.body.cgst_tot_amt;
//     const SGST =  resp.body.sgst_tot_amt;
//     await cds.update(Invoice2.drafts, req.params[0].invoice_no).set({totaltaxamount: `CGST:${CGST} SGST:${SGST}`,bool : false});
//   });

this.on('shownpo',Invoice2.drafts,async req => {
    await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 7, npo:'y'});
});
this.on('hidenpo',Invoice2.drafts,async req => {
    await cds.update(Invoice2.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
});
this.on('shownpo',Invoice1.drafts,async req => {
    await cds.update(Invoice1.drafts, req.params[0].ID).set({value1: 7, npo:'y'});
});
this.on('hidenpo',Invoice1.drafts,async req => {
    await cds.update(Invoice1.drafts, req.params[0].ID).set({value1: 3, npo:'n'});
});

this.on('showigst' ,'Invoice2.drafts', async req => {
    // await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: 'IGST'});
    
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com`);
    const IGST =  resp.body.igst_tot_amt;
    await cds.update(Invoice2.drafts)
    .set({ totaltaxamount:  `IGST:${IGST}`, bool : 1 })
    .where({ invoice_no: invoiceNo });
});

this.on('hideigst', Invoice2.drafts, async req => {
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com`);
    const CGST =  resp.body.cgst_tot_amt;
    const SGST =  resp.body.sgst_tot_amt;
    await cds.update(Invoice2.drafts, req.params[0].invoice_no).set({totaltaxamount: `CGST:${CGST} SGST:${SGST}`,bool : 0});
  });


    this.on('showigst' ,'Invoice1.drafts', async req => {
    // await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: 'IGST'});
    
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com`);
    const IGST =  resp.body.igst_tot_amt;
    await cds.update(Invoice1.drafts)
    .set({ totaltaxamount:  `IGST:${IGST}`, bool : 1 })
    .where({ invoice_no: invoiceNo });
}); 
this.on('hideigst', Invoice1.drafts , async req => {
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice-sup?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com`);
    const CGST =  resp.body.cgst_tot_amt;
    const SGST =  resp.body.sgst_tot_amt;
    await cds.update(Invoice1.drafts, req.params[0].invoice_no).set({totaltaxamount: `CGST:${CGST} SGST:${SGST}`,bool : 0});
    // await cds.update(Draft_child2.drafts)
    // .set({bigst_per : true})
    // .where({ invoice_no : invoiceNo})
  });



  this.on('getPdfUrl', async (req) => {
    // debugger
    
    const fileLinkValue = await SELECT `file_link`.from(Invoice1).where({invoice_no:req.data.invoice_no});
    
    return fileLinkValue;
  });

  //* for rejected*//
  this.on('getPdfUrlApproved', async (req) => {
    // debugger
    
    const fileLinkValue = await SELECT `file_link`.from(Invoice2).where({invoice_no:req.data.invoice_no});
    
    return fileLinkValue;
  });
  this.on('getPdfUrlSubmitted', async (req) => {
    // debugger
    
    const fileLinkValue = await SELECT `file_link`.from(sub); //.where({invoice_no:req.data.invoice_no});
    
    return fileLinkValue;
  });
  this.on('getPdfUrlApprovedreal', async (req) => {
    // debugger
    
    const fileLinkValue = await SELECT `file_link`.from(Approved);//.where({invoice_no:req.data.invoice_no});
    
    return fileLinkValue;
  });




  //    currency 
var firstReadCurrency = true;
this.before('READ', Currency, async (req) => {
    try {
        if (firstReadCurrency) {
            // let pageno = 1;
            const entries = [];
            // while (true) {
                const resp = await c4re.get(`/dev/search-help?master_id=12`);
                cds.tx(req).run(DELETE(Currency));
                // const spaces = resp.content;
                const spaces = resp.body.search_help;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        code : `${space.code}`,
                        description: `${space.description}`,
                    });
                });
                // pageno++;
            // }
            await cds.tx(req).run(INSERT.into(Currency).entries(entries));
            // return spaces;
            firstReadCurrency = false;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
// Document_type
var firstReadDocument_type = true;
this.before('READ', Document_type, async (req) => {
    try {
        if (firstReadDocument_type) {
            // let pageno = 1;
            const entries = [];
            // while (true) {
                const resp = await c4re.get(`/dev/report?document_type=invoice-help?master_id=12`);
                cds.tx(req).run(DELETE(Document_type));
                // const spaces = resp.content;
                const spaces = resp.body.search_help;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        code : `${space.code}`,
                        description: `${space.description}`,
                    });
                });
                // pageno++;
            // }
            await cds.tx(req).run(INSERT.into(Document_type).entries(entries));
            // return spaces;
            firstReadDocument_type = false;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});





var firstReadDocument_type111 = true;
this.before('READ', material_gst_per, async (req) => {
    try {
        if (firstReadDocument_type111) {
            // let pageno = 1;
            const entries = [];
            // while (true) {
                const resp = await c4re.get(`/dev/dropdown?drop_key=material_gst_per
                `);
                cds.tx(req).run(DELETE(material_gst_per));
                // const spaces = resp.content;
                const spaces = resp.body;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        value2 : `${space.value2}`,
                       
                    });
                });
                // pageno++;
            // }
            await cds.tx(req).run(INSERT.into(material_gst_per).entries(entries));
            // return spaces;
            firstReadDocument_type111 = false;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
//vendor_payment_term - Search help
var firstReadvendor_payment_term = true;
this.before('READ', vendor_payment_term, async (req) => {
    try {
        if (firstReadvendor_payment_term) {
            // let pageno = 1;
            const entries = [];
            // while (true) {
                const resp = await c4re.get(`/dev/dropdown?drop_key=vendor_payment_terms`);
                cds.tx(req).run(DELETE(vendor_payment_term));
                // const spaces = resp.content;
                const spaces = resp.body;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        drop_key : `${space.drop_key}` ,
                        table_key :  `${space.table_key}`,
                        value2 :  `${space.value2}`,
                        value3 :  `${space.value3}`,
                        value4 :  `${space.value4}`,
                    });
                });
                // pageno++;
            // }
            await cds.tx(req).run(INSERT.into(vendor_payment_term).entries(entries));
            // return spaces;
            firstReadvendor_payment_term = false;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});


//vendor_tds

var firstReadvendorvendor_tds = true;
this.before('READ', vendor_tds, async (req) => {
    try {
        if (firstReadvendorvendor_tds) {
            // let pageno = 1;
            const entries = [];
            // while (true) {
                const resp = await c4re.get(`/dev/dropdown?drop_key=vendor_tds`);
                cds.tx(req).run(DELETE(vendor_tds));
                // const spaces = resp.content;
                const spaces = resp.body;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        drop_key : `${space.drop_key}` ,
                        table_key : `${space.table_key}`,
                        value2 : `${space.value2}`,
                        value3 : `${space.value3}`,
                        value4 : `${space.value4}`,
                    });
                });
                // pageno++;
            // }
            await cds.tx(req).run(INSERT.into(vendor_tds).entries(entries));
            // return spaces;
            firstReadvendorvendor_tds = false;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});

}); 