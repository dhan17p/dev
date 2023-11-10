
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    /* SERVICE ENTITIES */
    let { Invoice1, Invoice2, Invoice3, Draft_child,Draft_child2,Rejected_child2,Submitted_child2,Approved_child2,sub,Currency,Document_type,vendor_tds,sub12, New, New_child, Submitted, Submitted_child, Approved, Approved_child, vendor_payment_term ,material_gst_per} = this.entities;

    const c4re = await cds.connect.to('iflow');
    var firstReadInvoice1 = true;
    var firstReadInvoice2 = true;
    var firstReadInvoice3 = true;

    this.on('getPdfUrl', async (req) => {
        // debugger
        
        const fileLinkValue = await SELECT `file_link`.from(Invoice1);
        
        return fileLinkValue;
      });
      this.on('getPdfUrlApproved', async (req) => {
        // debugger
        
        const fileLinkValue = await SELECT `file_link`.from(Invoice2);
        
        return fileLinkValue;
      });
      this.on('getPdfUrlSubmitted', async (req) => {
        // debugger
        
        const fileLinkValue = await SELECT `file_link`.from(sub);
        
        return fileLinkValue;
      });



/* SERVICE HANDLERS */
/* INVOICE1 - FOR DRAFT */
const cachedData = {}; // Cache to store previously fetched data

// this.before('READ', Invoice1, async (req) => {
//     try {
//         if (firstReadInvoice1) {
//             let pageno = 1;
//             const entries = [];
//             const batchSize = 10; // Adjust batch size as needed

//             // while (true) {
//                 const resp = await c4re.post(`/dev/fetch-invoice?tabname=draft&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com`);
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

//             await cds.tx(req).run(DELETE(Invoice1));
//             await cds.tx(req).run(INSERT.into(Invoice1).entries(entries));

//             firstReadInvoice1 = false;
//         }

//         return req;
//     } catch (err) {
//         req.error(500, err.message);
//     }
// });
firstReadInvoice1 = true;
this.before('READ', Invoice1, async (req) => {
    firstReadInvoice1 = true;
    try {
        //debugger
        var er = false;
        const data = await SELECT.from(Invoice1);
        invoiceNo1 = data[0].invoice_no;   
            if (req.params[0].invoice_no != null)  {
                // debugger
                cds.tx(req).run(DELETE(Invoice1));
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                const invoice_no = req.params[0].invoice_no;
                const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                const resp1 = await c4re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                        invoice_no : resp1.body.invoice_no,
                                                         INVOICE_FILE: 'Open',
                                                        payment_terms: resp1.body.payment_terms,
                                                           irn: resp1.body.irn,
                                                        ref_po_num: resp1.body.ref_po_num,
                                                        gstin: resp1.body.gstin,
                                                        doc_type_desc: resp1.body.doc_type_desc,
                                                        user_invoice_id: resp1.body.user_invoice_id,
                                                        invoice_date: resp1.body.invoice_date,
                                                        posting_date: resp1.body.posting_date,
                                                        baseline_date: resp1.body.baseline_date,
                                                        supplier_id: resp1.body.supplier_id,
                                                        payment_method: resp1.body.payment_method,
                                                        company_code: resp1.body.company_code,
                                                        currency: resp1.body.currency,
                                                        department_name: resp1.body.department_name,
                                                        gl_account: resp1.body.gl_account,
                                                        cost_center: resp1.body.cost_center,
                                                        internal_order: resp1.body.internal_order,
                                                        taxable_amount: resp1.body.taxable_amount,
                                                        adjustment: resp1.body.adjustment,
                                                        amount: resp1.body.amount,
                                                        tcs: resp1.body.tcs,
                                                        tds_per: resp1.body.tds_per,
                                                        tds_tot_amt: resp1.body.tds_tot_amt,
                                                        discount_per: resp1.body.discount_per,
                                                        total_discount_amount: resp1.body.total_discount_amount,
                                                        cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                        sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                        igst_tot_amt: resp1.body.igst_tot_amt,
                                                        file_link : resp1.body.files[0]?.file_link || 'NA',
                                                        totaltaxamount: (() => {
                                                            if (resp1.body.igst_tot_amt === 0) {
                                                                return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                                            } else {
                                                                return `IGST: ${resp1.body.igst_tot_amt}`;
                                                            }
                                                        })()
                    });
                // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                await cds.tx(req).run(INSERT.into(Invoice1).entries(entries1));    
            
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
            const data = await SELECT.from(Invoice1);
            invoiceNo1 = data[0].invoice_no;   
                if (req.query.SELECT.where[2].val != null)  {
                    // debugger
                    cds.tx(req).run(DELETE(Invoice1));
                    var er = true;
                    // cds.tx(req).run(DELETE(podatatab));
                    const invoice_no = req.query.SELECT.where[2].val;
                    const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                    const resp1 = await c4re.post(link);
                    const spaces1 = resp1.body;
                    const entries1 = [];
                    
                        entries1.push({
                            invoice_no : resp1.body.invoice_no,
                                                             INVOICE_FILE: 'Open',
                                                            payment_terms: resp1.body.payment_terms,
                                                               irn: resp1.body.irn,
                                                            ref_po_num: resp1.body.ref_po_num,
                                                            gstin: resp1.body.gstin,
                                                            doc_type_desc: resp1.body.doc_type_desc,
                                                            user_invoice_id: resp1.body.user_invoice_id,
                                                            invoice_date: resp1.body.invoice_date,
                                                            posting_date: resp1.body.posting_date,
                                                            baseline_date: resp1.body.baseline_date,
                                                            supplier_id: resp1.body.supplier_id,
                                                            payment_method: resp1.body.payment_method,
                                                            company_code: resp1.body.company_code,
                                                            currency: resp1.body.currency,
                                                            department_name: resp1.body.department_name,
                                                            gl_account: resp1.body.gl_account,
                                                            cost_center: resp1.body.cost_center,
                                                            internal_order: resp1.body.internal_order,
                                                            taxable_amount: resp1.body.taxable_amount,
                                                            adjustment: resp1.body.adjustment,
                                                            amount: resp1.body.amount,
                                                            tcs: resp1.body.tcs,
                                                            tds_per: resp1.body.tds_per,
                                                            tds_tot_amt: resp1.body.tds_tot_amt,
                                                            discount_per: resp1.body.discount_per,
                                                            total_discount_amount: resp1.body.total_discount_amount,
                                                            cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                            sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                            igst_tot_amt: resp1.body.igst_tot_amt,
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                        });
                    // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                    await cds.tx(req).run(INSERT.into(Invoice1).entries(entries1));    
                
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
        if (firstReadInvoice1) {
            cds.tx(req).run(DELETE(Invoice1));
            
            const resp = await c4re.get('/dev/fetch-invoice?tabname=draft&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com');
            const spaces = resp.body.invoices;
            const entries = [];
            spaces.forEach(space=>{
                entries.push({
                               INVOICE_FILE : space.invoice_files.length || 'NA',
                                invoice_no: space.invoice_no,
                                user_invoice_id: space.user_invoice_id,
                                supplier_name: space.supplier_name || 'NA',
                                invoice_date: space.invoice_date,
                                working_person: space.working_person,
                                modified_date: space.modified_date,
                });
            });

            
            await cds.tx(req).run(INSERT.into(Invoice1).entries(entries));
        }
        return req;
        
    }catch(err){
     req.error(500, err.message);
    }

    }

    }
});


    /*DRAFT_CHILD- FOR DRAFT-CHILD*/

    var firstReadDraft_child = true;
    this.before('READ', Draft_child, async (req) => {
        try {
            if (firstReadDraft_child) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const entries1 = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Draft_child));
                // cds.tx(req).run(DELETE(Draft_child1));
                const spaces = resp.body.items;
                entries.push({
                    invoice_no: resp.body.invoice_no,
                    payment_terms: resp.body.payment_terms,
                       irn: resp.body.irn,
                    ref_po_num: resp.body.ref_po_num,
                    gstin: resp.body.gstin,
                    doc_type_desc: resp.body.doc_type_desc,
                    user_invoice_id: resp.body.user_invoice_id,
                    invoice_date: resp.body.invoice_date,
                    posting_date: resp.body.posting_date,
                    baseline_date: resp.body.baseline_date,
                    supplier_id: resp.body.supplier_id,
                    payment_method: resp.body.payment_method,
                    company_code: resp.body.company_code,
                    currency: resp.body.currency,
                    department_name: resp.body.department_name,
                    gl_account: resp.body.gl_account,
                    cost_center: resp.body.cost_center,
                    internal_order: resp.body.internal_order,
                    taxable_amount: resp.body.taxable_amount,
                    adjustment: resp.body.adjustment,
                    amount: resp.body.amount,
                    tcs: resp.body.tcs,
                    tds_per: resp.body.tds_per,
                    tds_tot_amt: resp.body.tds_tot_amt,
                    discount_per: resp.body.discount_per,
                    total_discount_amount: resp.body.total_discount_amount,
                    cgst_tot_amt: resp.body.cgst_tot_amt,
                    sgst_tot_amt: resp.body.sgst_tot_amt,
                    igst_tot_amt: resp.body.igst_tot_amt,

                });
                // spaces.forEach(space => {
                //     entries1.push({
                //         invoice_no: resp.body.invoice_no,
                //         material: space.material,
                //         material_desc: space.material_desc,
                //         hsn_code: space.hsn_code,
                //         quantity: space.quantity,
                //         amt_per_unit: space.amt_per_unit,
                //         discount: space.discount,
                //         gst_per: space.gst_per,
                //         sgst_per: space.sgst_per,
                //         cgst_per: space.cgst_per,
                //         igst_per: space.igst_per,
                //         taxable_amount: space.taxable_amount,
                //         tax_value_amount: space.tax_value_amount,
                //         sgst_amount: space.sgst_amount,
                //         cgst_amount: space.cgst_amount,
                //         igst_amount: space.igst_amount,
                //         amount: space.amount
                //     });
                // });



                await cds.tx(req).run(INSERT.into(Draft_child).entries(entries));
                // await cds.tx(req).run(INSERT.into(Draft_child1).entries(entries1));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });



    var firstReadDraft_child2 = true;
    this.before('READ', Draft_child2, async (req) => {
        try {
            if (firstReadDraft_child2) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Draft_child2));


                const spaces = resp.body.items;
                // debugger;
                 spaces.forEach(space => {
                    entries.push({
                        invoice_no: resp.body.invoice_no,
                         material: space.material,
                        material_desc: space.material_desc,
                        hsn_code: space.hsn_code,
                        item_no : space.item_no,
                        quantity: space.quantity,
                        amt_per_unit: space.amt_per_unit,
                        discount: space.discount,
                           gst_per:  space.gst_per,
                           sgst_per: `SGST:${space.sgst_per}`,
                           cgst_per: `CGST:${space.cgst_per}`,
                           igst_per: `IGST:${space.igst_per}`,
                        // gst_per: ' GST PER: 12',
                        // sgst_per: 'SGST PER : 19',
                        // cgst_per: 'CGST PER: 34',
                        // igst_per: 'IGST PER :13',
                        // start : 'True',
                         taxable_amount: space.taxable_amount,
                         tax_value_amount: space.tax_value_amount,
                         sgst_amount: `SGST:${space.sgst_amount}`,
                         cgst_amount: `CGST:${space.cgst_amount}`,
                         igst_amount: `IGST:${space.igst_amount}`,
                         amount: space.amount,
                         bigst_per : space.sgst_amount === 0 ? true : false ,
                    });
                 });
                await cds.tx(req).run(INSERT.into(Draft_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });



    /*Invoice2 - for rejected  entity-table2*/

    // this.before('READ', Invoice2, async (req) => {
    //     try {
    //         if (firstReadInvoice2) {
    //             let pageno = 1;
    //             const entries = [];
    //             while (true) {
    //                 const resp = await c4re.post(`/dev/fetch-invoice?userid=einvoiceportal@gmail.com&tabname=rejected&pageno=${pageno}&nooflines=50`);
    //                 cds.tx(req).run(DELETE(Invoice2));
    //                 // const spaces = resp.content;
    //                 const spaces = resp.body.invoices;
    //                 if (spaces.length == 0) {
    //                     break;
    //                 }
    //                 spaces.forEach(space => {
    //                     entries.push({
    //                         invoice_no: space.invoice_no,
    //                         user_invoice_id: space.user_invoice_id,
    //                         supplier_name: space.supplier_name || 'NA',
    //                         invoice_date: space.invoice_date,
    //                         working_person: space.working_person,
    //                         modified_date: space.modified_date,
    //                     });
    //                 });
    //                 pageno++;
    //             }
    //             await cds.tx(req).run(INSERT.into(Invoice2).entries(entries));
    //             // return spaces;
    //             firstReadInvoice2 = false;
    //         }
    //         return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });
    firstReadInvoice2 = true;
this.before('READ', Invoice2, async (req) => {
    firstReadInvoice2 = true;
    try {
        //debugger
        var er = false;
        const data = await SELECT.from(Invoice2);
        invoiceNo1 = data[0].invoice_no;   
            if (req.params[0].invoice_no != null)  {
                // debugger
                cds.tx(req).run(DELETE(Invoice2));
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                const invoice_no = req.params[0].invoice_no;
                const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                const resp1 = await c4re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                        invoice_no : resp1.body.invoice_no,
                                                         INVOICE_FILE: 'Open',
                                                        payment_terms: resp1.body.payment_terms,
                                                           irn: resp1.body.irn,
                                                        ref_po_num: resp1.body.ref_po_num,
                                                        gstin: resp1.body.gstin,
                                                        doc_type_desc: resp1.body.doc_type_desc,
                                                        user_invoice_id: resp1.body.user_invoice_id,
                                                        invoice_date: resp1.body.invoice_date,
                                                        posting_date: resp1.body.posting_date,
                                                        baseline_date: resp1.body.baseline_date,
                                                        supplier_id: resp1.body.supplier_id,
                                                        payment_method: resp1.body.payment_method,
                                                        company_code: resp1.body.company_code,
                                                        currency: resp1.body.currency,
                                                        department_name: resp1.body.department_name,
                                                        gl_account: resp1.body.gl_account,
                                                        cost_center: resp1.body.cost_center,
                                                        internal_order: resp1.body.internal_order,
                                                        taxable_amount: resp1.body.taxable_amount,
                                                        adjustment: resp1.body.adjustment,
                                                        amount: resp1.body.amount,
                                                        tcs: resp1.body.tcs,
                                                        tds_per: resp1.body.tds_per,
                                                        tds_tot_amt: resp1.body.tds_tot_amt,
                                                        discount_per: resp1.body.discount_per,
                                                        total_discount_amount: resp1.body.total_discount_amount,
                                                        cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                        sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                        igst_tot_amt: resp1.body.igst_tot_amt,
                                                        file_link : resp1.body.files[0]?.file_link || 'NA',
                                                        totaltaxamount: (() => {
                                                            if (resp1.body.igst_tot_amt === 0) {
                                                                return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                                            } else {
                                                                return `IGST: ${resp1.body.igst_tot_amt}`;
                                                            }
                                                        })()
                    });
                // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                await cds.tx(req).run(INSERT.into(Invoice2).entries(entries1));    
            
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
            const data = await SELECT.from(Invoice2);
            invoiceNo1 = data[0].invoice_no;   
                if (req.query.SELECT.where[2].val != null)  {
                    // debugger
                    cds.tx(req).run(DELETE(Invoice2));
                    var er = true;
                    // cds.tx(req).run(DELETE(podatatab));
                    const invoice_no = req.query.SELECT.where[2].val;
                    const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                    const resp1 = await c4re.post(link);
                    const spaces1 = resp1.body;
                    const entries1 = [];
                    
                        entries1.push({
                            invoice_no : resp1.body.invoice_no,
                                                             INVOICE_FILE: 'Open',
                                                            payment_terms: resp1.body.payment_terms,
                                                               irn: resp1.body.irn,
                                                            ref_po_num: resp1.body.ref_po_num,
                                                            gstin: resp1.body.gstin,
                                                            doc_type_desc: resp1.body.doc_type_desc,
                                                            user_invoice_id: resp1.body.user_invoice_id,
                                                            invoice_date: resp1.body.invoice_date,
                                                            posting_date: resp1.body.posting_date,
                                                            baseline_date: resp1.body.baseline_date,
                                                            supplier_id: resp1.body.supplier_id,
                                                            payment_method: resp1.body.payment_method,
                                                            company_code: resp1.body.company_code,
                                                            currency: resp1.body.currency,
                                                            department_name: resp1.body.department_name,
                                                            gl_account: resp1.body.gl_account,
                                                            cost_center: resp1.body.cost_center,
                                                            internal_order: resp1.body.internal_order,
                                                            taxable_amount: resp1.body.taxable_amount,
                                                            adjustment: resp1.body.adjustment,
                                                            amount: resp1.body.amount,
                                                            tcs: resp1.body.tcs,
                                                            tds_per: resp1.body.tds_per,
                                                            tds_tot_amt: resp1.body.tds_tot_amt,
                                                            discount_per: resp1.body.discount_per,
                                                            total_discount_amount: resp1.body.total_discount_amount,
                                                            cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                            sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                            igst_tot_amt: resp1.body.igst_tot_amt,
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                                                            totaltaxamount: (() => {
                                                                if (resp1.body.igst_tot_amt === 0) {
                                                                    return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                                                } else {
                                                                    return `IGST: ${resp1.body.igst_tot_amt}`;
                                                                }
                                                            })()
                        });
                    // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                    await cds.tx(req).run(INSERT.into(Invoice2).entries(entries1));    
                
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
        if (firstReadInvoice2) {
            cds.tx(req).run(DELETE(Invoice2));
            
            const resp = await c4re.get('/dev/fetch-invoice?tabname=rejected&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com');
            const spaces = resp.body.invoices;
            const entries = [];
            spaces.forEach(space=>{
                entries.push({
                               INVOICE_FILE : space.invoice_files.length || 'NA',
                                invoice_no: space.invoice_no,
                                user_invoice_id: space.user_invoice_id,
                                supplier_name: space.supplier_name || 'NA',
                                invoice_date: space.invoice_date,
                                working_person: space.working_person,
                                modified_date: space.modified_date,
                });
            });

            
            await cds.tx(req).run(INSERT.into(Invoice2).entries(entries));
        }
        return req;
        
    }catch(err){
     req.error(500, err.message);
    }

    }

    }
});


    /*Invoice3 - for rejected child */
    var firstReadRejected = true;
    this.before('READ', Invoice3, async (req) => {
        try {
            if (firstReadRejected) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Invoice3));
                entries.push({
                    invoice_no: resp.body.invoice_no,
                    payment_terms: resp.body.payment_terms,
                    irn: resp.body.irn,
                    ref_po_num: resp.body.ref_po_num,
                    gstin: resp.body.gstin,
                    doc_type_desc: resp.body.doc_type_desc,
                    user_invoice_id: resp.body.user_invoice_id,
                    invoice_date: resp.body.invoice_date,
                    posting_date: resp.body.posting_date,
                    baseline_date: resp.body.baseline_date,
                    supplier_id: resp.body.supplier_id,
                    payment_method: resp.body.payment_method,
                    company_code: resp.body.company_code,
                    currency: resp.body.currency,
                    department_name: resp.body.department_name,
                    gl_account: resp.body.gl_account,
                    cost_center: resp.body.cost_center,
                    internal_order: resp.body.internal_order,
                    taxable_amount: resp.body.taxable_amount,
                    adjustment: resp.body.adjustment,
                    amount: resp.body.amount,
                    tcs: resp.body.tcs,
                    tds_per: resp.body.tds_per,
                    tds_tot_amt: resp.body.tds_tot_amt,
                    discount_per: resp.body.discount_per,
                    total_discount_amount: resp.body.total_discount_amount,
                    cgst_tot_amt: resp.body.cgst_tot_amt,
                    sgst_tot_amt: resp.body.sgst_tot_amt
                });
                await cds.tx(req).run(INSERT.into(Invoice3).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

var firstRejected_child2 = true;
    this.before('READ', Rejected_child2, async (req) => {
        try {
            if (firstRejected_child2) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Rejected_child2));


                const spaces = resp.body.items;
                // debugger;
                spaces.forEach(space => {
                    entries.push({
                        invoice_no: resp.body.invoice_no,
                        material: space.material,
                       material_desc: space.material_desc,
                       hsn_code: space.hsn_code,
                       item_no : space.item_no,
                       quantity: space.quantity,
                       amt_per_unit: space.amt_per_unit,
                       discount: space.discount,
                          gst_per:  space.gst_per,
                          sgst_per: `SGST:${space.sgst_per}`,
                          cgst_per: `CGST:${space.cgst_per}`,
                          igst_per: `IGST:${space.igst_per}`,
                        taxable_amount: space.taxable_amount,
                        tax_value_amount: space.tax_value_amount,
                        sgst_amount: `SGST:${space.sgst_amount}`,
                        cgst_amount: `CGST:${space.cgst_amount}`,
                        igst_amount: `IGST:${space.igst_amount}`,
                        amount: space.amount,
                        bigst_per : space.sgst_amount === 0 ? true : false ,
                    });
             });
                await cds.tx(req).run(INSERT.into(Rejected_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });




    /* submmitted */

    var firstReadSubmitted = true;
    this.before('READ', Submitted, async (req) => {
        try {
            if (firstReadSubmitted) {
                let pageno = 1;
                const entries = [];
                while (true) {
                    const resp = await c4re.post(`/dev/fetch-invoice?userid=einvoiceportal@gmail.com&tabname=inapproval&pageno=${pageno}&nooflines=50`);
                    cds.tx(req).run(DELETE(Submitted));
                    // const spaces = resp.content;
                    const spaces = resp.body.invoices;
                    if (spaces.length == 0) {
                        break;
                    }
                    spaces.forEach(space => {
                        entries.push({
                            invoice_no: space.invoice_no,
                            user_invoice_id: space.user_invoice_id,
                            supplier_name: space.supplier_name || 'NA',
                            invoice_date: space.invoice_date,
                            working_person: space.working_person,
                            modified_date: space.modified_date,
                        });
                    });
                    pageno++;
                }
                await cds.tx(req).run(INSERT.into(Submitted).entries(entries));
                // return spaces;
                firstReadSubmitted = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });




    /*submiitedchild*/
    var firstReadSubmittedchild = true;
    this.before('READ', Submitted_child, async (req) => {
        try {
            if (firstReadSubmittedchild) { 
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                //  debugger
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Submitted_child));
                entries.push({
                    invoice_no: resp.body.invoice_no,
                    payment_terms: resp.body.payment_terms,
                    irn: resp.body.irn,
                    ref_po_num: resp.body.ref_po_num,
                    gstin: resp.body.gstin,
                    doc_type_desc: resp.body.doc_type_desc,
                    user_invoice_id: resp.body.user_invoice_id,
                    invoice_date: resp.body.invoice_date,
                    posting_date: resp.body.posting_date,
                    baseline_date: resp.body.baseline_date,
                    supplier_id: resp.body.supplier_id,
                    payment_method: resp.body.payment_method,
                    company_code: resp.body.company_code,
                    currency: resp.body.currency,
                    department_name: resp.body.department_name,
                    gl_account: resp.body.gl_account,
                    cost_center: resp.body.cost_center,
                    internal_order: resp.body.internal_order,
                    taxable_amount: resp.body.taxable_amount,
                    adjustment: resp.body.adjustment,
                    amount: resp.body.amount,
                    tcs: resp.body.tcs,
                    tds_per: resp.body.tds_per,
                    tds_tot_amt: resp.body.tds_tot_amt,
                    discount_per: resp.body.discount_per,
                    total_discount_amount: resp.body.total_discount_amount,
                    cgst_tot_amt: resp.body.cgst_tot_amt,
                    sgst_tot_amt: resp.body.sgst_tot_amt
                });
                await cds.tx(req).run(INSERT.into(Submitted_child).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });



    var firstReadSubmitted_child2 = true;
    this.before('READ', Submitted_child2, async (req) => {
        try {
            if (firstReadSubmitted_child2) {
                var invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Submitted_child2));


                // const spaces = resp.body;
                 const spaces = resp.body.items;
                // debugger;
                 spaces.forEach(space => {
                    entries.push({
                        invoice_no: resp.body.invoice_no,
                         material: space.material,
                        material_desc: space.material_desc,
                        hsn_code: space.hsn_code,
                        item_no : space.item_no,
                        quantity: space.quantity,
                        amt_per_unit: space.amt_per_unit,
                        discount: space.discount,
                           gst_per:  space.gst_per,
                           sgst_per: `SGST:${space.sgst_per}`,
                           cgst_per: `CGST:${space.cgst_per}`,
                           igst_per: `IGST:${space.igst_per}`,
                        // gst_per: ' GST PER: 12',
                        // sgst_per: 'SGST PER : 19',
                        // cgst_per: 'CGST PER: 34',
                        // igst_per: 'IGST PER :13',
                        // start : 'True',
                         taxable_amount: space.taxable_amount,
                         tax_value_amount: space.tax_value_amount,
                         sgst_amount: `SGST:${space.sgst_amount}`,
                         cgst_amount: `CGST:${space.cgst_amount}`,
                         igst_amount: `IGST:${space.igst_amount}`,
                         amount: space.amount,
                         bigst_per : space.sgst_amount === 0 ? true : false ,
                    });
             });
                await cds.tx(req).run(INSERT.into(Submitted_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    


   
    // this.before('READ', sub, async (req) => {
    //     try {
    //         if (firstReadSubmitted1) {
    //             let pageno = 1;
    //             const entries = [];
    //             while (true) {
    //                 const resp = await c4re.post(`/dev/fetch-invoice?userid=einvoiceportal@gmail.com&tabname=inapproval&pageno=${pageno}&nooflines=50`);
    //                 cds.tx(req).run(DELETE(sub));
    //                 // const spaces = resp.content;
    //                 const spaces = resp.body.invoices;
    //                 if (spaces.length == 0) {
    //                     break;
    //                 }
    //                 spaces.forEach(space => {
    //                     entries.push({
    //                         invoice_no: space.invoice_no,
    //                         user_invoice_id: space.user_invoice_id,
    //                         supplier_name: space.supplier_name || 'NA',
    //                         invoice_date: space.invoice_date,
    //                         working_person: space.working_person,
    //                         modified_date: space.modified_date,
    //                     });
    //                 });
    //                 pageno++;
    //             }
    //             await cds.tx(req).run(INSERT.into(sub).entries(entries));
    //             // return spaces;
    //             firstReadSubmitted1 = false;
    //         }
    //         return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });

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
                const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                const resp1 = await c4re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                        invoice_no : resp1.body.invoice_no,
                                                         INVOICE_FILE: 'Open',
                                                        payment_terms: resp1.body.payment_terms,
                                                           irn: resp1.body.irn,
                                                        ref_po_num: resp1.body.ref_po_num,
                                                        gstin: resp1.body.gstin,
                                                        doc_type_desc: resp1.body.doc_type_desc,
                                                        user_invoice_id: resp1.body.user_invoice_id,
                                                        invoice_date: resp1.body.invoice_date,
                                                        posting_date: resp1.body.posting_date,
                                                        baseline_date: resp1.body.baseline_date,
                                                        supplier_id: resp1.body.supplier_id,
                                                        payment_method: resp1.body.payment_method,
                                                        company_code: resp1.body.company_code,
                                                        currency: resp1.body.currency,
                                                        department_name: resp1.body.department_name,
                                                        gl_account: resp1.body.gl_account,
                                                        cost_center: resp1.body.cost_center,
                                                        internal_order: resp1.body.internal_order,
                                                        taxable_amount: resp1.body.taxable_amount,
                                                        adjustment: resp1.body.adjustment,
                                                        amount: resp1.body.amount,
                                                        tcs: resp1.body.tcs,
                                                        tds_per: resp1.body.tds_per,
                                                        tds_tot_amt: resp1.body.tds_tot_amt,
                                                        discount_per: resp1.body.discount_per,
                                                        total_discount_amount: resp1.body.total_discount_amount,
                                                        cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                        sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                        igst_tot_amt: resp1.body.igst_tot_amt,
                                                        file_link : resp1.body.files[0]?.file_link || 'NA',
                                                        totaltaxamount: (() => {
                                                            if (resp1.body.igst_tot_amt === 0) {
                                                                return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                                            } else {
                                                                return `IGST: ${resp1.body.igst_tot_amt}`;
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
                            invoice_no : resp1.body.invoice_no,
                                                             INVOICE_FILE: 'Open',
                                                            payment_terms: resp1.body.payment_terms,
                                                               irn: resp1.body.irn,
                                                            ref_po_num: resp1.body.ref_po_num,
                                                            gstin: resp1.body.gstin,
                                                            doc_type_desc: resp1.body.doc_type_desc,
                                                            user_invoice_id: resp1.body.user_invoice_id,
                                                            invoice_date: resp1.body.invoice_date,
                                                            posting_date: resp1.body.posting_date,
                                                            baseline_date: resp1.body.baseline_date,
                                                            supplier_id: resp1.body.supplier_id,
                                                            payment_method: resp1.body.payment_method,
                                                            company_code: resp1.body.company_code,
                                                            currency: resp1.body.currency,
                                                            department_name: resp1.body.department_name,
                                                            gl_account: resp1.body.gl_account,
                                                            cost_center: resp1.body.cost_center,
                                                            internal_order: resp1.body.internal_order,
                                                            taxable_amount: resp1.body.taxable_amount,
                                                            adjustment: resp1.body.adjustment,
                                                            amount: resp1.body.amount,
                                                            tcs: resp1.body.tcs,
                                                            tds_per: resp1.body.tds_per,
                                                            tds_tot_amt: resp1.body.tds_tot_amt,
                                                            discount_per: resp1.body.discount_per,
                                                            total_discount_amount: resp1.body.total_discount_amount,
                                                            cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                            sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                            igst_tot_amt: resp1.body.igst_tot_amt,
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                                                            totaltaxamount: (() => {
                                                                if (resp1.body.igst_tot_amt === 0) {
                                                                    return `CGST: ${resp1.body.cgst_tot_amt}, SGST: ${resp1.body.sgst_tot_amt}`;
                                                                } else {
                                                                    return `IGST: ${resp1.body.igst_tot_amt}`;
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
            
            const resp = await c4re.get('/dev/fetch-invoice?tabname=inapproval&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com');
            const spaces = resp.body.invoices;
            const entries = [];
            spaces.forEach(space=>{
                entries.push({
                               INVOICE_FILE : space.invoice_files.length || 'NA',
                                invoice_no: space.invoice_no,
                                user_invoice_id: space.user_invoice_id,
                                supplier_name: space.supplier_name || 'NA',
                                invoice_date: space.invoice_date,
                                working_person: space.working_person,
                                modified_date: space.modified_date,
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


    /*approved*/
    
    // var firstReadInvoiceApproved = true;
    // this.before('READ', Approved, async (req) => {
    //     try {
    //         if (firstReadInvoiceApproved) {
    //             let pageno = 1;
    //             const entries = [];
    //             // while (true) {
    //                 // debugger
    //                 // let url = '/dev/fetch-invoice';
    //                 // let body = {"condn":[]};
    //                 // let params = {
    //                 //     'userid':'einvoiceportal@gmail',
    //                 //     'tabname':'approved',
    //                 //     'pageno': 1,
    //                 //     'nooflines' : 50
    //                 // }
    //                 // `/dev/fetch-invoice?userid=einvoiceportal@gmail.com&tabname=approved&pageno=${pageno}&nooflines=50`
    //                 // const resp = await c4re.post(url,body,{params});
    //                 const requestBody = {
    //                     condn: entries
    //                 };
    //                 const resp = await c4re.post(`/dev/fetch-invoice?userid=einvoiceportal@gmail.com&tabname=approved&pageno=1&nooflines=50`,requestBody);
    //                 cds.tx(req).run(DELETE(Approved));
    //                 // const spaces = resp.content;
    //                 const spaces = resp.body.invoices;
    //                 // if (spaces.length == 0) {
    //                 //     break;
    //                 // }
    //                 spaces.forEach(space => {
    //                     entries.push({
    //                         invoice_no: space.invoice_no,
    //                         user_invoice_id: space.user_invoice_id,
    //                         supplier_name: space.supplier_name || 'NA',
    //                         invoice_date: space.invoice_date,
    //                         working_person: space.working_person,
    //                         modified_date: space.modified_date,
    //                     });
    //                 });
    //                 // pageno++;
    //             // }
    //             await cds.tx(req).run(INSERT.into(Approved).entries(entries));
    //             // return spaces;
    //             firstReadInvoiceApproved = false;
    //         }
    //         return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });
    firstReadInvoiceApproved = true;
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
                    const link = `/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`;
                    const resp1 = await c4re.post(link);
                    const spaces1 = resp1.body;
                    const entries1 = [];
                    
                        entries1.push({
                            invoice_no : resp1.body.invoice_no,
                                                             INVOICE_FILE: 'Open',
                                                            payment_terms: resp1.body.payment_terms,
                                                               irn: resp1.body.irn,
                                                            ref_po_num: resp1.body.ref_po_num,
                                                            gstin: resp1.body.gstin,
                                                            doc_type_desc: resp1.body.doc_type_desc,
                                                            user_invoice_id: resp1.body.user_invoice_id,
                                                            invoice_date: resp1.body.invoice_date,
                                                            posting_date: resp1.body.posting_date,
                                                            baseline_date: resp1.body.baseline_date,
                                                            supplier_id: resp1.body.supplier_id,
                                                            payment_method: resp1.body.payment_method,
                                                            company_code: resp1.body.company_code,
                                                            currency: resp1.body.currency,
                                                            department_name: resp1.body.department_name,
                                                            gl_account: resp1.body.gl_account,
                                                            cost_center: resp1.body.cost_center,
                                                            internal_order: resp1.body.internal_order,
                                                            taxable_amount: resp1.body.taxable_amount,
                                                            adjustment: resp1.body.adjustment,
                                                            amount: resp1.body.amount,
                                                            tcs: resp1.body.tcs,
                                                            tds_per: resp1.body.tds_per,
                                                            tds_tot_amt: resp1.body.tds_tot_amt,
                                                            discount_per: resp1.body.discount_per,
                                                            total_discount_amount: resp1.body.total_discount_amount,
                                                            cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                            sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                            igst_tot_amt: resp1.body.igst_tot_amt,
                                                            file_link : resp1.body.files[0]?.file_link || 'NA',
                                                            totaltaxamount: (() => {
                                                                if (resp1.body.igst_tot_amt === 0) {
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
                                invoice_no : resp1.body.invoice_no,
                                                                 INVOICE_FILE: 'Open',
                                                                payment_terms: resp1.body.payment_terms,
                                                                   irn: resp1.body.irn,
                                                                ref_po_num: resp1.body.ref_po_num,
                                                                gstin: resp1.body.gstin,
                                                                doc_type_desc: resp1.body.doc_type_desc,
                                                                user_invoice_id: resp1.body.user_invoice_id,
                                                                invoice_date: resp1.body.invoice_date,
                                                                posting_date: resp1.body.posting_date,
                                                                baseline_date: resp1.body.baseline_date,
                                                                supplier_id: resp1.body.supplier_id,
                                                                payment_method: resp1.body.payment_method,
                                                                company_code: resp1.body.company_code,
                                                                currency: resp1.body.currency,
                                                                department_name: resp1.body.department_name,
                                                                gl_account: resp1.body.gl_account,
                                                                cost_center: resp1.body.cost_center,
                                                                internal_order: resp1.body.internal_order,
                                                                taxable_amount: resp1.body.taxable_amount,
                                                                adjustment: resp1.body.adjustment,
                                                                amount: resp1.body.amount,
                                                                tcs: resp1.body.tcs,
                                                                tds_per: resp1.body.tds_per,
                                                                tds_tot_amt: resp1.body.tds_tot_amt,
                                                                discount_per: resp1.body.discount_per,
                                                                total_discount_amount: resp1.body.total_discount_amount,
                                                                cgst_tot_amt: resp1.body.cgst_tot_amt,
                                                                sgst_tot_amt: resp1.body.sgst_tot_amt,
                                                                igst_tot_amt: resp1.body.igst_tot_amt,
                                                                file_link : resp1.body.files[0]?.file_link || 'NA',
                                                                file_link : resp1.body.files[0]?.file_link || 'NA',
                                                                totaltaxamount: (() => {
                                                                    if (resp1.body.igst_tot_amt === 0) {
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
    
            try
            {
            if (firstReadInvoiceApproved) {
                cds.tx(req).run(DELETE(Approved));
                
                const resp = await c4re.get('/dev/fetch-invoice?tabname=rejected&pageno=1&nooflines=10&userid=einvoiceportal@gmail.com');
                const spaces = resp.body.invoices;
                const entries = [];
                spaces.forEach(space=>{
                    entries.push({
                                   INVOICE_FILE : space.invoice_files.length || 'NA',
                                    invoice_no: space.invoice_no,
                                    user_invoice_id: space.user_invoice_id,
                                    supplier_name: space.supplier_name || 'NA',
                                    invoice_date: space.invoice_date,
                                    working_person: space.working_person,
                                    modified_date: space.modified_date,
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












    /*approved_child*/
    var firstReadInvoiceApproved_child = true;
    this.before('READ', Approved_child, async (req) => {
        try {
            if (firstReadInvoiceApproved_child) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Approved_child));
                entries.push({
                    invoice_no: resp.body.invoice_no,
                    payment_terms: resp.body.payment_terms,
                    irn: resp.body.irn,
                    ref_po_num: resp.body.ref_po_num,
                    gstin: resp.body.gstin,
                    doc_type_desc: resp.body.doc_type_desc,
                    user_invoice_id: resp.body.user_invoice_id,
                    invoice_date: resp.body.invoice_date,
                    posting_date: resp.body.posting_date,
                    baseline_date: resp.body.baseline_date,
                    supplier_id: resp.body.supplier_id,
                    payment_method: resp.body.payment_method,
                    company_code: resp.body.company_code,
                    currency: resp.body.currency,
                    department_name: resp.body.department_name,
                    gl_account: resp.body.gl_account,
                    cost_center: resp.body.cost_center,
                    internal_order: resp.body.internal_order,
                    taxable_amount: resp.body.taxable_amount,
                    adjustment: resp.body.adjustment,
                    amount: resp.body.amount,
                    tcs: resp.body.tcs,
                    tds_per: resp.body.tds_per,
                    tds_tot_amt: resp.body.tds_tot_amt,
                    discount_per: resp.body.discount_per,
                    total_discount_amount: resp.body.total_discount_amount,
                    cgst_tot_amt: resp.body.cgst_tot_amt,
                    sgst_tot_amt: resp.body.sgst_tot_amt
                });
                await cds.tx(req).run(INSERT.into(Approved_child).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });




    var firstReadApproved_child2 = true;
    this.before('READ', Approved_child2, async (req) => {
        try {
            if (firstReadApproved_child2) {
                let invoice_no = req.params[0].invoice_no;
                console.log(invoice_no);
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoice_no}&userid=einvoiceportal@gmail.com&edit=X`);
                cds.tx(req).run(DELETE(Approved_child2));


                const spaces = resp.body.items;
                // debugger;
                spaces.forEach(space => {
                    entries.push({
                        invoice_no: resp.body.invoice_no,
                        material: space.material,
                       material_desc: space.material_desc,
                       hsn_code: space.hsn_code,
                       item_no : space.item_no,
                       quantity: space.quantity,
                       amt_per_unit: space.amt_per_unit,
                       discount: space.discount,
                          gst_per:  space.gst_per,
                          sgst_per: `SGST:${space.sgst_per}`,
                          cgst_per: `CGST:${space.cgst_per}`,
                          igst_per: `IGST:${space.igst_per}`,
                       // gst_per: ' GST PER: 12',
                       // sgst_per: 'SGST PER : 19',
                       // cgst_per: 'CGST PER: 34',
                       // igst_per: 'IGST PER :13',
                       // start : 'True',
                        taxable_amount: space.taxable_amount,
                        tax_value_amount: space.tax_value_amount,
                        sgst_amount: `SGST:${space.sgst_amount}`,
                        cgst_amount: `CGST:${space.cgst_amount}`,
                        igst_amount: `IGST:${space.igst_amount}`,
                        amount: space.amount,
                        bigst_per : space.sgst_amount === 0 ? true : false ,
                    });
                });
                await cds.tx(req).run(INSERT.into(Approved_child2).entries(entries));
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
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
                        code : space.code,
                        description: space.description,
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
                        code : space.code,
                        description: space.description,
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
                        value2 : space.value2,
                       
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
                        drop_key : space.drop_key ,
                        table_key : space.table_key,
                        value2 : space.value2,
                        value3 : space.value3,
                        value4 : space.value4,
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
                        drop_key : space.drop_key ,
                        table_key : space.table_key,
                        value2 : space.value2,
                        value3 : space.value3,
                        value4 : space.value4,
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




this.on('getOrderDefaults', async req => {
    return {INVOICE_FILE: 'Open'};
  });
  this.on('setOrderProcessing', Invoice1, async req => {
    await cds.update(Invoice1, req.params[0].ID).set({INVOICE_FILE: 'In Process'});
  });
  
  this.on('setOrderOpen', Invoice1, async req => {
    await cds.update(Invoice1, req.params[0].ID).set({INVOICE_FILE: 'Open'});
  });
  this.on('showigst','Invoice1', async req => {
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
    // await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: 'IGST'});
    const IGST =  resp.body.igst_tot_amt;
    await cds.update(Invoice1)
    .set({ totaltaxamount: `IGST:${IGST}`, bool : false})
    .where({ invoice_no: invoiceNo });
    // await cds.update(Draft_child2, req.params[0].ID).set({start: true});
  });


  this.on('showigst' ,'Invoice1.drafts', async req => {
    // await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: 'IGST'});
    
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
    const IGST =  resp.body.igst_tot_amt;
    await cds.update(Invoice1.drafts)
    .set({ totaltaxamount:  `IGST:${IGST}`, bool : false })
    .where({ invoice_no: invoiceNo });
    // await cds.update(Draft_child2.drafts)
    // .set({ bigst_per : false })
    // .where({ invoice_no: invoiceNo });

    // await cds.update(Draft_child2.drafts)
    // .set({ bigst_per: true })
    // .where({ invoice_no: invoiceNo });
    // await cds.update(Draft_child2, req.params[0].ID).set({start: 'true'});
  });




  this.on('hideigst', Invoice1, async req => {
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
    const CGST =  resp.body.cgst_tot_amt;
    const SGST =  resp.body.sgst_tot_amt;
    await cds.update(Invoice1, req.params[0].invoice_no).set({totaltaxamount: `CGST:${CGST} SGST:${SGST}`,bool : true});
    await cds.update(Draft_child2, req.params[0].invoice_no).set({bigst_per : true});
  });

  this.on('hideigst', Invoice1.drafts , async req => {
    const invoiceNo = req.params[0].invoice_no;
    const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${invoiceNo}&userid=einvoiceportal@gmail.com&edit=X`);
    const CGST =  resp.body.cgst_tot_amt;
    const SGST =  resp.body.sgst_tot_amt;
    await cds.update(Invoice1.drafts, req.params[0].invoice_no).set({totaltaxamount: `CGST:${CGST} SGST:${SGST}`,bool : true});
    await cds.update(Draft_child2.drafts)
    .set({bigst_per : true})
    .where({ invoice_no : invoiceNo})
  });

  this.on('showigst1',Draft_child2, async req => {
    // const invoiceNo = req.params[1].id;
    // const record = await cds.read(Draft_child2).where({ id: invoiceNo });
    // if (record) {
    //     record.bigst_per = 'false';
    //     record.start = 'false';
    //     // await cds.delete(Draft_child2).where( {id : invoiceNo});
    //     await cds.update(Draft_child2, record);
    // }
    const invoiceNo = req.params[1].id;
    await cds.update(Draft_child2)
    .set({ bigst_per: true  })
    .where({ id: invoiceNo });
   
    // await cds.update(Draft_child2)
    // .set({ start: 'false'  })
    // .where({ id: invoiceNo });
    // await cds.update(Draft_child2, req.params[0].ID).set({bigst_per: false});
    // await cds.update(Draft_child2, req.subject[1]).set({start: 'fasssss'});
}
  );
  
  this.on('hideigst2',Draft_child2,async req => {
    const invoiceNo = req.params[1].id;
     UPDATE (Draft_child2)
      .set ({bigst_per: false})
      .where ({ id :invoiceNo })
    });
    // const id = req.params[1].id;
    // const invoice_no = req.params[1].invoice_no;

    // await cds.update(Draft_child2)
    // .set({ bigst_per: false  })
    // .where({ id: invoice_no , id : id  });
    // await cds.update(Invoice1, req.params[0].ID).set({supplier_name: 'IIII'});
    // await cds.update(Draft_child2, req.params[1].ID).set({bigst_per: true});
//   });
// this.on ('showigst1', req => UPDATE (req.subject) .with ({start: 'False'}))
// this.on ('hideigst2', req => UPDATE (req.subject) .with ({start: 'True'}))



this.on('shownpo',Invoice1.drafts,async req => {
    await cds.update(Invoice1.drafts, req.params[0].ID).set({value1: 1});
});
this.on('hidenpo',Invoice1.drafts,async req => {
    await cds.update(Invoice1.drafts, req.params[0].ID).set({value1: 7});
});
});
