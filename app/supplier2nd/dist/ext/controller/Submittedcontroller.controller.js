sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("project1.ext.controller.Submittedcontroller",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){debugger;var n=this.getView();const o=this.base.getExtensionAPI(),i=o.getModel(),r="getPdfUrlSubmitted",d=i.bindContext(`/${r}(...)`);await d.execute();var g=d.getBoundContext();var u=g.getObject();debugger;await d.execute();debugger;g=d.getBoundContext();u=g.getObject();u=u.value.file_link;console.log(u);debugger;var l=new t({pdfUrl:u});n.setModel(l,"pdfModel")}}}})});