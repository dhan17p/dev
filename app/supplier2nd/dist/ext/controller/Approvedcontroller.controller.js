sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("project1.ext.controller.Approvedcontroller",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){debugger;var n=this.getView();const o=this.base.getExtensionAPI(),r=o.getModel(),i="getPdfUrlApproved",s=r.bindContext(`/${i}(...)`);const d=await e.requestObject(e.getPath());s.setParameter("invoice_no",d.invoice_no);await s.execute();var a=s.getBoundContext();var l=a.getObject();debugger;l=l.value.file_link;console.log(l);debugger;var c=new t({pdfUrl:l});n.setModel(c,"pdfModel")}}}})});