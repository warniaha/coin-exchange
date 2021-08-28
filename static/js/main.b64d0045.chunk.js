(this["webpackJsonpcoin-exchange"]=this["webpackJsonpcoin-exchange"]||[]).push([[0],{101:function(e,t,a){},102:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(12),r=a.n(i),s=(a(74),a(68)),l=a(41),o=a(8),d=a.n(o),u=a(15),h=a(6),j=(a(76),a(35)),b=a(40),f=a(28),p=a(59),x=a(1);function v(e){var t=e.disabled?{display:"inline-block",cursor:"not-allowed"}:{},a=e.disabled?{pointerEvents:"none"}:{};return Object(x.jsx)(b.a,{placement:"top",trigger:["hover","focus"],overlay:Object(x.jsx)(f.a,{children:Object(x.jsx)(f.a.Title,{children:e.popup})}),children:Object(x.jsx)("div",{style:t,children:Object(x.jsx)(p.a,{onClick:e.onClick,style:a,disabled:e.disabled,variant:e.variant,children:e.text})})})}function O(e){var t=e.disabled?{display:"inline-block",cursor:"not-allowed"}:{};return Object(x.jsx)(b.a,{placement:"top",trigger:["hover","focus"],overlay:Object(x.jsx)(f.a,{children:Object(x.jsx)(f.a.Title,{children:e.popup})}),children:Object(x.jsx)("div",{style:t,children:e.text})})}var m={Settings:"Settings",BuyMore:"BuyMore",SellSome:"SellSome",ToggleBalance:"ToggleBalance",Deposit:"Deposit",Withdraw:"Withdraw",BuyNew:"BuyNew",BuyShares:"BuyShares",SellShares:"SellShares",SaveSettings:"SaveSettings",Help:"Help"},g=a(38),k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;if(0===e)return e;for(var a=parseFloat(Number(e).toFixed(t));0===a;++t){if(15===t)return e;a=parseFloat(Number(e).toFixed(t))}return a};a(80);var y,S=a(60),w=a.n(S),B="PaperCoinList",C=function(e){var t=JSON.parse(localStorage.getItem(B));return t&&e(t),t},T=function(e,t){var a=e?e.find((function(e){return e.ticker===t})):void 0;return a?a.price:""},N=function(){var e=Object(u.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://api.coinpaprika.com/v1/tickers").catch((function(e){return console.log(e),console.log("getTickers reading old file from computer"),C(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(e,t,a){N(e).then((function(n){if(void 0!==n){var c=function(e,t){var a=new Set;return e?e.filter((function(e){var n=t(e);return!a.has(n)&&(a.add(n),e)})):e}(n.data,(function(e){return e.symbol}));if(c){var i=c.map((function(e){return function(e){return{key:e.id,name:e.name,ticker:e.symbol,price:e.quotes.USD.price,last_updated:e.last_updated,last_refresh:e.last_updated}}(e)}));e(i),s=i,localStorage.setItem(B,JSON.stringify(s));var r=new Date(Date.now());t("Prices updated at: ".concat(r.toLocaleString())),a()}}var s}),(function(e){t("Failed to load prices: ".concat(e)),console.log("getCoinTicker failed: ".concat(e))}))};function D(e,t){var a=k(t,2);return 0===t?"No gain, no loss":e?t>=0?"Profitted by $".concat(a):"Loss of $".concat(a):t>=0?"Profittable":"Loss encountered"}var F=g.a.td(y||(y=Object(j.a)(["\n    border: 2px solid #cccccc;\n    width: 25vh;\n"])));function P(e){var t=T(e.coinTicker,e.ticker),a=e.shares*t,n=a-e.shares*e.costBasis,c=n>=0?"price-profit":"price-loss",i=n>=0?"\u25b2":"\u25bc",r=e.showBalance?"$"+k(a):i,s=e.showBalance?"$"+k(e.costBasis):"-",l="Buy more ".concat(e.ticker),o="Sell your ".concat(e.ticker),d=D(e.showBalance,n);return Object(x.jsxs)("tr",{className:"coin-row",children:[Object(x.jsx)(F,{children:e.name}),Object(x.jsx)(F,{children:e.ticker}),Object(x.jsx)(F,{children:e.shares}),Object(x.jsxs)(F,{children:["$",k(t)]}),Object(x.jsx)(F,{children:s}),Object(x.jsx)(F,{children:Object(x.jsx)("div",{className:c,children:Object(x.jsx)(O,{popup:d,text:r,disabled:!1})})}),Object(x.jsx)(F,{children:Object(x.jsxs)("div",{className:"td-action-buttons",children:[Object(x.jsx)(v,{disabled:!1,variant:"success",popup:l,text:"Buy",onClick:function(t){t.preventDefault(),e.handleAction(m.BuyMore,e.id)}}),Object(x.jsx)(v,{disabled:!1,variant:"danger",popup:o,text:"Sell",onClick:function(t){t.preventDefault(),e.handleAction(m.SellSome,e.id)}})]})})]})}function H(e){return Object(x.jsx)("div",{children:Object(x.jsxs)("table",{className:"table table-primary table-borders",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Name"}),Object(x.jsx)("th",{children:"Ticker"}),Object(x.jsx)("th",{children:"Shares"}),Object(x.jsx)("th",{children:"Price"}),Object(x.jsx)("th",{children:"Cost Basis"}),Object(x.jsx)("th",{children:"Balance"}),Object(x.jsx)("th",{children:"Actions"})]})}),Object(x.jsx)("tbody",{children:function(){if(e.coinBalance)return e.coinBalance.map((function(t){return Object(x.jsx)(P,Object(l.a)({id:t.key,showBalance:e.showBalance,coinTicker:e.coinTicker,handleAction:e.handleAction},t),t.key)}))}()})]})})}var R=a(64),V=a(65),$=a(69),L=a(67),I=(a(101),function(e){Object($.a)(a,e);var t=Object(L.a)(a);function a(){return Object(R.a)(this,a),t.apply(this,arguments)}return Object(V.a)(a,[{key:"render",value:function(){return Object(x.jsx)("header",{className:"App-header",children:Object(x.jsx)("h1",{className:"App-title",children:"Paper Coin Exchange"})})}}]),a}(n.Component)),q=a(112),E=a(111),M=a(39);function W(e){var t,a=e.coinBalance?e.coinBalance.find((function(t){return t.ticker===e.dialogTicker})):void 0,n=null!==(t=e.dialogTicker)&&void 0!==t?t:"",c=T(e.coinTicker,n),i=e.modalTextFieldStatus?"form-group has-success":"form-group has-danger",r=e.modalTextFieldStatus?"form-control is-valid":"form-control is-invalid",s=e.modalTextFieldStatus?"valid-feedback":"invalid-feedback",l=function(t){var n,c;n=t,c=a,e.onValidator({quantity:n,coin:c})};return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,backdrop:"static",keyboard:!1,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.modalTitle})}),Object(x.jsxs)(q.a.Body,{children:[Object(x.jsx)(E.a,{className:"table table-primary table-borders",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Coin"}),Object(x.jsx)("td",{children:n})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Price"}),Object(x.jsx)("td",{children:c})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:e.availability}),Object(x.jsx)("td",{children:e.cashSharesAvailable})]})]})}),Object(x.jsxs)("div",{className:"flex-filter",children:[e.inputTitle,Object(x.jsx)("div",{children:Object(x.jsx)(p.a,{variant:"danger",size:"sm",onClick:function(){e.onValidator({quantity:e.cashSharesAvailable,coin:a})},children:"All"})})]}),Object(x.jsxs)("div",{className:i,children:[Object(x.jsx)(M.a,{className:r,id:"text-input",name:"input-name",placeholder:"Please enter a dollar amount",decimalsLimit:18,allowNegativeValue:"false",value:e.quantity,defaultValue:e.initialValue,prefix:e.prefix,intlConfig:{locale:"en-US",currency:"USD"},onValueChange:function(e){return l(e)}}),Object(x.jsx)("div",{className:s,children:e.modalStatusMessage})]})]}),Object(x.jsxs)(q.a.Footer,{children:[Object(x.jsx)(p.a,{variant:"secondary",onClick:function(){e.handleClose()},children:"Cancel"}),Object(x.jsx)(p.a,{disabled:!e.modalTextFieldStatus,onClick:function(t){e.handleAction(m.BuyShares,{key:a.key,shares:e.quantity}),e.handleClose()},variant:"primary",children:e.actionTitle})]})]})}a(102);function J(e){var t=e.coinTicker?e.coinTicker.find((function(t){return t.ticker===e.dialogTicker})):void 0,a=function(t,a){e.onValidator({quantity:t,coin:a})},n=function(t){var n=e.selectCoin(t);a(e.quantity,n)},i=function(e,t){return 0===t.length||e.key.toLowerCase().includes(t.toLowerCase())||e.name.toLowerCase().includes(t.toLowerCase())||e.ticker.toLowerCase().includes(t.toLowerCase())},r=t?k(T(e.coinTicker,t.ticker)):"",s=e.modalTextFieldStatus?"form-group has-success":"form-group has-danger",l=e.modalTextFieldStatus?"form-control is-valid":"form-control is-invalid",o=e.modalTextFieldStatus?"valid-feedback":"invalid-feedback",d=c.a.useState(""),u=Object(h.a)(d,2),j=u[0],b=u[1],f=!!t;return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,backdrop:"static",keyboard:!1,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.modalTitle})}),Object(x.jsxs)(q.a.Body,{children:[Object(x.jsxs)("div",{className:"flex-filter",id:"filter-div",children:[Object(x.jsx)("label",{htmlFor:"filter-select",className:"form-label mt-4",children:"Select ticker"}),Object(x.jsx)("div",{children:Object(x.jsx)("input",{type:"text",className:"form-control",id:"filter-coins",name:"filter-coins",placeholder:"Filter list by ticker name",onChange:function(t){return function(t){b(t);var a=e.coinTicker.map((function(e){return i(e,t)?e:null}));!(a=a.filter(Boolean)).find((function(t){return t&&e.dialogTicker===t.ticker}))&&a.length>0&&n(a[0].ticker)}(t.target.value)}})})]}),Object(x.jsx)("select",{className:"form-select",id:"filter-select",onChange:function(e){n(e.target.value)},value:e.dialogTicker,placeholder:"Select ticker name...",children:function(t){if(void 0!==e.coinTicker&&!0===e.show){var a=e.coinTicker.map((function(e){return i(e,t)?Object(x.jsx)("option",{value:e.ticker,children:e.ticker},e.ticker):null}));return a.unshift(Object(x.jsx)("option",{value:""},"null")),a}return null}(j)}),Object(x.jsx)("br",{}),Object(x.jsx)(E.a,{className:"table table-primary table-borders",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Coin"}),Object(x.jsx)("td",{children:e.dialogTicker})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Price"}),Object(x.jsx)("td",{children:r})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:e.availability}),Object(x.jsx)("td",{children:e.cashSharesAvailable})]})]})}),Object(x.jsxs)("div",{className:"flex-filter",children:[e.inputTitle,Object(x.jsx)("div",{children:Object(x.jsx)(p.a,{variant:"danger",size:"sm",onClick:function(){e.onValidator({quantity:e.cashSharesAvailable,coin:t})},children:"All"})})]}),Object(x.jsxs)("div",{className:s,children:[Object(x.jsx)(M.a,{className:l,id:"text-input",name:"input-name",placeholder:"Please enter a dollar amount",decimalsLimit:18,allowNegativeValue:"false",value:e.quantity,defaultValue:e.initialValue,disabled:!f,prefix:e.prefix,intlConfig:{locale:"en-US",currency:"USD"},onValueChange:function(e){a(e,t)}}),Object(x.jsx)("div",{className:o,children:e.modalStatusMessage})]})]}),Object(x.jsxs)(q.a.Footer,{children:[Object(x.jsx)(p.a,{variant:"secondary",onClick:function(){e.handleClose()},children:"Cancel"}),Object(x.jsx)(p.a,{disabled:!e.modalTextFieldStatus,onClick:function(a){e.handleAction(m.BuyShares,{key:t.key,shares:e.quantity}),e.handleClose()},variant:"primary",children:e.actionTitle})]})]})}function z(e){var t=e.coinBalance?e.coinBalance.find((function(t){return t.ticker===e.dialogTicker})):void 0,a=t?t.ticker:"",n=T(e.coinTicker,a),c=e.modalTextFieldStatus?"form-group has-success":"form-group has-danger",i=e.modalTextFieldStatus?"form-control is-valid":"form-control is-invalid",r=e.modalTextFieldStatus?"valid-feedback":"invalid-feedback";return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,backdrop:"static",keyboard:!1,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.modalTitle})}),Object(x.jsxs)(q.a.Body,{children:[Object(x.jsx)(E.a,{className:"table table-primary table-borders",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Coin"}),Object(x.jsx)("td",{children:e.dialogTicker})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Price"}),Object(x.jsx)("td",{children:n})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:e.availability}),Object(x.jsx)("td",{children:e.cashSharesAvailable})]})]})}),Object(x.jsxs)("div",{className:"flex-filter",children:[e.inputTitle,Object(x.jsx)("div",{children:Object(x.jsx)(p.a,{variant:"danger",size:"sm",onClick:function(){e.onValidator(e.cashSharesAvailable)},children:"All"})})]}),Object(x.jsxs)("div",{className:c,children:[Object(x.jsx)("input",{type:"text",className:i,id:"text-input",value:e.quantity,name:"input-name",placeholder:"Please enter number of shares to sell",onChange:function(t){return e.onValidator(t.target.value)}}),Object(x.jsx)("div",{className:r,children:e.modalStatusMessage})]})]}),Object(x.jsxs)(q.a.Footer,{children:[Object(x.jsx)(p.a,{variant:"secondary",onClick:function(){e.handleClose()},children:"Cancel"}),Object(x.jsx)(p.a,{disabled:!e.modalTextFieldStatus,onClick:function(a){e.handleAction(m.SellShares,{key:t.key,shares:e.quantity}),e.handleClose()},variant:"primary",children:e.actionTitle})]})]})}function U(e){var t=function(e){return e?"Completed":"Loading..."},a=c.a.useState(0),n=Object(h.a)(a,2),i=n[0],r=n[1],s=c.a.useState(5),l=Object(h.a)(s,2),o=l[0],d=l[1],u=i>=o;return c.a.useEffect((function(){if(e.show){var t=setInterval((function(){r((function(e){return e+1})),Boolean(e.coinBalance)&&Boolean(e.coinTicker)&&void 0!==e.settings.feeRate&&(e.handleClose(),r(0))}),1e3);return function(){return clearInterval(t)}}}),[e]),Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.modalTitle})}),Object(x.jsxs)(q.a.Body,{children:[Object(x.jsx)(E.a,{className:"table table-primary table-borders",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Balances"}),Object(x.jsx)("td",{children:Object(x.jsx)("div",{children:function(){var a=Boolean(e.coinBalance);return Object(x.jsx)("div",{children:t(a)})}()})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Tickers"}),Object(x.jsx)("td",{children:Object(x.jsx)("div",{children:function(){var a=Boolean(e.coinTicker);return Object(x.jsx)("div",{children:t(a)})}()})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Settings"}),Object(x.jsx)("td",{children:Object(x.jsx)("div",{children:function(){var a=void 0!==e.settings.feeRate;return Object(x.jsx)("div",{children:t(a)})}()})})]})]})}),Object(x.jsxs)("p",{children:[i," seconds have elapsed."]})]}),Object(x.jsx)(q.a.Footer,{children:Object(x.jsx)(p.a,{variant:"primary",disabled:!u,onClick:function(){e.handleReload(),d(i+5)},children:"Attempt to reload"})})]})}function _(e){return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,backdrop:"static",keyboard:!1,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.modalTitle})}),Object(x.jsxs)(q.a.Body,{children:[Object(x.jsx)(E.a,{className:"table table-primary table-borders",children:Object(x.jsx)("tbody",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Simulated fees"}),Object(x.jsx)("td",{children:Object(x.jsx)("input",{type:"text",className:"form-control",id:"text-input",value:e.settings.feeRate,name:"input-name",placeholder:"Enter percentage that should be collected in fees",onChange:function(t){return e.onValidator({feeRate:t.target.value})}})})]})})}),Object(x.jsx)("div",{className:"flex-filter",children:e.inputTitle})]}),Object(x.jsxs)(q.a.Footer,{children:[Object(x.jsx)(p.a,{variant:"info",size:"sm",onClick:function(){e.handleClose(),e.handleAction(m.SaveSettings,{feeRate:e.settings.feeRate})},children:"Save"}),Object(x.jsx)(p.a,{variant:"info",size:"sm",onClick:function(){e.handleClose()},children:"Cancel"})]})]})}var K,G=a(66),Q=a(22),X="Nobody is looking over your shoulder, show your balances",Y="Hide balances from prying eyes",Z=g.a.td(K||(K=Object(j.a)(["\n    border: 2px solid #cccccc;\n    width: 25vh;\n"])));function ee(e){var t=e.netBalance-e.totalDeposits,a=t>=0?"price-profit":"price-loss",n=t>=0?"\u25b2":"\u25bc",c="".concat(e.showBalance?"$"+k(e.netBalance,2):n),i="".concat(e.showBalance?"$"+k(e.totalDeposits,2):"-"),r="".concat(100*e.feeRate,"%"),s="".concat(e.showBalance?"$"+k(e.feesCollected,2):"-"),l=e.showBalance?"Hide Balance":"Show Balance",o=e.showBalance?Y:X,d=e.showBalance?"warning":"info",u="".concat(e.showBalance?"$"+k(e.cashAvailable,2):"-"),h=e.cashAvailable>=1e3,j=h?"Withdraw $1000":"Insufficient funds available to withdraw $1000",b=D(e.showBalance,t);return Object(x.jsxs)("div",{children:[Object(x.jsxs)("table",{className:"table table-primary table-borders",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Total Deposits"}),Object(x.jsx)("th",{children:"Net Balance"}),Object(x.jsx)("th",{children:"Cash Available"}),Object(x.jsx)("th",{children:"Fee Rate"}),Object(x.jsx)("th",{children:"Fees collected"})]})}),Object(x.jsx)("tbody",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)(Z,{children:i}),Object(x.jsx)(Z,{children:Object(x.jsx)("div",{className:a,children:Object(x.jsx)(O,{popup:b,text:c,disabled:!1})})}),Object(x.jsx)(Z,{children:u}),Object(x.jsx)(Z,{children:r}),Object(x.jsx)(Z,{children:s})]})})]}),Object(x.jsx)("div",{className:"button-toolbar-actions",children:Object(x.jsxs)(G.a,{"aria-label":"Toolbar with button groups",children:[Object(x.jsx)(Q.a,{className:"me-2","aria-label":"Show-Hide group",children:Object(x.jsx)(v,{disabled:!1,variant:d,popup:o,text:l,onClick:function(t){t.preventDefault(),e.handleAction(m.ToggleBalance,!e.showBalance)}})}),Object(x.jsx)(Q.a,{className:"me-2","aria-label":"Reset group",children:Object(x.jsx)(v,{disabled:!1,variant:"danger",popup:"Reset all deposits and purchases",text:"Reset",onClick:function(t){t.preventDefault(),e.handleAction(m.Reset)}})}),Object(x.jsx)(Q.a,{className:"me-2","aria-label":"Preferences group",children:Object(x.jsx)(v,{disabled:!1,variant:"secondary",popup:"Adjust application preferences",text:"Settings",onClick:function(t){t.preventDefault(),e.handleAction(m.Settings)}})}),Object(x.jsxs)(Q.a,{className:"me-2","aria-label":"Deposit-Withdraw group",children:[Object(x.jsx)(v,{disabled:!1,variant:"success",popup:"Deposit $1000",text:"Deposit",onClick:function(t){t.preventDefault(),e.handleAction(m.Deposit,1e3)}}),Object(x.jsx)(v,{disabled:!h,variant:"danger",popup:j,text:"Withdraw",onClick:function(t){t.preventDefault(),e.handleAction(m.Withdraw,1e3)}})]}),Object(x.jsx)(Q.a,{className:"me-2","aria-label":"Buy group",children:Object(x.jsx)(v,{disabled:!1,variant:"success",popup:"Purchase coins",text:"Buy",onClick:function(t){t.preventDefault(),e.handleAction(m.BuyNew)}})}),Object(x.jsx)(Q.a,{className:"me-2","aria-label":"Help group",children:Object(x.jsx)(v,{disabled:!1,variant:"info",popup:"Get help for using this application",text:"Help",onClick:function(t){t.preventDefault(),e.handleAction(m.Help)}})})]})})]})}function te(e){var t=function(){return void 0!==e.alertAcceptHandler&&void 0!==e.alertAcceptHandler.handler&&e.alertButtonAcceptText&&e.alertButtonAcceptText.length>0};return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,backdrop:"static",keyboard:!1,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:e.alertHeading})}),Object(x.jsx)(q.a.Body,{children:e.alertMessage}),Object(x.jsxs)(q.a.Footer,{children:[t()?Object(x.jsx)(p.a,{onClick:function(){e.handleClose(),e.alertAcceptHandler.handler()},variant:"outline-danger",children:e.alertButtonAcceptText}):Object(x.jsx)(x.Fragment,{}),Object(x.jsx)(p.a,{onClick:function(){e.handleClose(),e.alertCancelHandler.handler()},variant:"outline-success",children:t()?"Cancel":"Close"})]})]})}var ae=a(27);function ne(e){var t=c.a.useState(0),a=Object(h.a)(t,2),n=a[0],i=a[1],r=["deposit","showBalance","buy"],s=e.netBalance-e.totalDeposits,l=s>=0?"price-profit":"price-loss",o=s>=0?"\u25b2":"\u25bc",d=D(e.showBalance,s),u="".concat(e.showBalance?"$"+k(e.netBalance,2):o),j=e.showBalance?"hide":"show",b=e.showBalance?"Hide Balance":"Show Balance",f=e.showBalance?Y:X,g=e.showBalance?"warning":"info",y=e.showBalance?"Net Balance is displayed for anyone to see":"Net Balance displays as an arrow to hide the amount";return Object(x.jsxs)(q.a,{show:e.show,onHide:e.handleClose,children:[Object(x.jsx)(q.a.Header,{children:Object(x.jsx)(q.a.Title,{children:"Help using Paper Coin Exchange"})}),Object(x.jsx)(q.a.Body,{children:Object(x.jsxs)(ae.a,{onSelect:function(e){return i(e)},activeKey:r[n],id:"help-tabs",className:"mb-3",children:[Object(x.jsx)(ae.a,{eventKey:"deposit",title:"Deposit",children:Object(x.jsxs)("div",{className:"wrap-content",children:[Object(x.jsx)("div",{children:"Click the deposit button to deposit $1000 into your account"}),Object(x.jsx)("div",{className:"right-left-margin",children:Object(x.jsx)(v,{disabled:!1,variant:"success",popup:"Deposit $1000",text:"Deposit",onClick:function(t){t.preventDefault(),e.handleAction(m.Deposit,1e3)}})}),"Deposits: ",k(e.totalDeposits,2)]})}),Object(x.jsx)(ae.a,{eventKey:"showBalance",title:"Balance",children:Object(x.jsxs)("div",{className:"wrap-content",children:[Object(x.jsxs)("div",{children:["Click the ",b," button to ",j," your balances"]}),Object(x.jsx)("div",{className:"right-left-margin",children:Object(x.jsx)(v,{disabled:!1,variant:g,popup:f,text:b,onClick:function(t){t.preventDefault(),e.handleAction(m.ToggleBalance,!e.showBalance)}})}),Object(x.jsx)("div",{className:"right-margin",children:y}),Object(x.jsx)("div",{className:l,children:Object(x.jsx)(O,{popup:d,text:u,disabled:!1})})]})}),Object(x.jsx)(ae.a,{eventKey:"buy",title:"Buy",children:Object(x.jsxs)("div",{className:"wrap-content",children:[Object(x.jsx)("div",{children:"Click the Buy button to display a list of coins available to purchase and enter how much to buy.  When you click the Buy button, the help window will close"}),Object(x.jsx)("div",{className:"right-left-margin",children:Object(x.jsx)(v,{disabled:!1,variant:"success",popup:"Purchase coins",text:"Buy",onClick:function(t){t.preventDefault(),e.handleAction(m.BuyNew),e.handleClose()}})})]})})]})}),Object(x.jsxs)(q.a.Footer,{children:[Object(x.jsx)(p.a,{variant:"secondary",disabled:!1,onClick:function(e){e.preventDefault(),i((n+r.length-1)%r.length)},children:"Previous"}),Object(x.jsx)(p.a,{variant:"secondary",disabled:!1,onClick:function(e){e.preventDefault(),i((n+1)%r.length)},children:"Next"}),Object(x.jsx)(p.a,{variant:"primary",disabled:!1,onClick:e.handleClose,children:"Close"})]})]})}a(105);var ce="Initial",ie="Displayed",re="Completed",se="PaperCoinBalance",le=function(e){var t=e.balance.filter((function(e){return e&&!isNaN(e.shares)&&e.shares>0})),a=JSON.stringify({balance:t,totalDeposits:e.totalDeposits,cash:e.cash,feesPaid:e.feesPaid});localStorage.setItem(se,a),console.log("balances: ".concat(a))},oe=function(e){e.balance(null);var t=localStorage.getItem(se),a=JSON.parse(t);console.log("readCoinBalance: jsonValues: ".concat(t));var n,c,i,r,s=[],l=0,o=0,d=0;null!==a&&(s=null!==(n=a.balance)&&void 0!==n?n:[],l=null!==(c=a.cash)&&void 0!==c?c:0,o=null!==(i=a.feesPaid)&&void 0!==i?i:0,d=null!==(r=a.totalDeposits)&&void 0!==r?r:0);var u=(s=s.map((function(e){return isNaN(e.costBasis)&&(e.costBasis=0),e}))).filter((function(e){return e&&!isNaN(e.shares)}));e.balance(u),e.cash(l),e.feesPaid(o),e.totalDeposits(d)},de="PaperSettings",ue=function(e){var t=JSON.stringify({feeRate:e.feeRate});localStorage.setItem(de,t),console.log("settings: ".concat(t))},he=function(e){var t=localStorage.getItem(de),a=JSON.parse(t);console.log("readSettings: jsonValues: ".concat(t));var n,c=0;null!==a&&(c=null!==(n=a.feeRate)&&void 0!==n?n:0);e.feeRate(c)};var je=function(e){var t=c.a.useState(0),a=Object(h.a)(t,2),n=a[0],i=a[1],r=c.a.useState(0),o=Object(h.a)(r,2),j=o[0],b=o[1],f=c.a.useState(void 0),p=Object(h.a)(f,2),v=p[0],O=p[1],g=c.a.useState(void 0),k=Object(h.a)(g,2),y=k[0],S=k[1],w=c.a.useState(void 0),C=Object(h.a)(w,2),N=C[0],D=C[1],F=c.a.useState(!1),P=Object(h.a)(F,2),R=P[0],V=P[1],$=c.a.useState(void 0),L=Object(h.a)($,2),q=L[0],E=L[1],M=c.a.useState(!1),K=Object(h.a)(M,2),G=K[0],Q=K[1],X=c.a.useState(ce),Y=Object(h.a)(X,2),Z=Y[0],ae=Y[1],je=c.a.useState(!1),be=Object(h.a)(je,2),fe=be[0],pe=be[1],xe=c.a.useState(!1),ve=Object(h.a)(xe,2),Oe=ve[0],me=ve[1],ge=c.a.useState(!1),ke=Object(h.a)(ge,2),ye=ke[0],Se=ke[1],we=c.a.useState(!1),Be=Object(h.a)(we,2),Ce=Be[0],Te=Be[1],Ne=c.a.useState(""),Ae=Object(h.a)(Ne,2),De=Ae[0],Fe=Ae[1],Pe=c.a.useState(0),He=Object(h.a)(Pe,2),Re=He[0],Ve=He[1],$e=c.a.useState(void 0),Le=Object(h.a)($e,2),Ie=Le[0],qe=Le[1],Ee=c.a.useState(0),Me=Object(h.a)(Ee,2),We=Me[0],Je=Me[1],ze=c.a.useState("Loading..."),Ue=Object(h.a)(ze,2),_e=Ue[0],Ke=Ue[1],Ge=c.a.useState(!1),Qe=Object(h.a)(Ge,2),Xe=Qe[0],Ye=Qe[1],Ze=c.a.useState(""),et=Object(h.a)(Ze,2),tt=et[0],at=et[1],nt=c.a.useState(""),ct=Object(h.a)(nt,2),it=ct[0],rt=ct[1],st=c.a.useState(""),lt=Object(h.a)(st,2),ot=lt[0],dt=lt[1],ut=c.a.useState(void 0),ht=Object(h.a)(ut,2),jt=ht[0],bt=ht[1],ft=c.a.useState(void 0),pt=Object(h.a)(ft,2),xt=pt[0],vt=pt[1],Ot=function(e){return 60*e},mt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v;if("object"==typeof Ie&&"object"==typeof e&&void 0!==t&&t>=0){var a=t;e.forEach((function(e){a+=e.shares*T(Ie,e.ticker)})),a!==j&&b(a)}else 0!==j&&b(0)},gt=c.a.useState(0),kt=Object(h.a)(gt,2),yt=kt[0],St=kt[1],wt=c.a.useState(0),Bt=Object(h.a)(wt,2),Ct=Bt[0],Tt=Bt[1];c.a.useEffect((function(){var e=setInterval((function(){St((function(e){return e+1})),function(){if(!Ie)return!1;var e=Ie.find((function(e){return"BTC"===e.ticker})),t=Date.parse(e.last_updated),a=(Date.now()-Ct)/1e3,n=(Date.now()-t)/1e3;return a>Ot(1)&&n>Ot(5)}()&&(Tt(Date.now()),A(qe,Ke,mt))}),1e3);return function(){return clearInterval(e)}}),[yt,Ie,qe,Ct,Tt,Ke,mt]);var Nt=function(){var e=Object(u.a)(d.a.mark((function e(){var t,a=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=a.length>0&&void 0!==a[0]&&a[0],(Z===ce||t)&&ae(ie),A(qe,Ke,mt),(void 0===q||t)&&oe({balance:E,totalDeposits:i,cash:O,feesPaid:D}),(void 0===y||t)&&he({feeRate:S});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();c.a.useEffect((function(){void 0===q&&Nt()}));var At=function(e){V(e),mt()},Dt=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=n+t,O(a=v+t),le({balance:q,totalDeposits:c,cash:a,feesPaid:N}),mt(q,a),i(c),r=new Date(Date.now()),Ke("Depositted $1000 at ".concat(r.toLocaleString()));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ft=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v>=t&&(c=n-t,O(a=v-t),le({balance:q,totalDeposits:c,cash:a,feesPaid:N}),mt(q,a),i(c),r=new Date(Date.now()),Ke("Withdrew $1000 at ".concat(r.toLocaleString())));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Pt=function(){var e=Object(u.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=q.find((function(e){return t===e.key})),Fe(a.ticker),da("Buy"),aa("Buy ".concat(a.ticker)),ra("Spend cash available to purchase ".concat(a.ticker)),ba("Cash Available"),Ve(0),Je(""),Kt(Wt),Yt(!1),pe(!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ht=function(e){e?(aa("Buy ".concat(e.ticker)),ra("Spend cash available to purchase ".concat(e.ticker))):(aa("Buy coins"),ra("Spend cash available to purchase coins"))},Rt=function(){var e=Object(u.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=q.find((function(e){return t===e.key})),Fe(a.ticker),da("Sell"),aa("Sell ".concat(a.ticker)),ra("Sell existing ".concat(a.ticker," for cash")),ba("Shares Available"),Je(""),Ve(0),Kt(Jt),Yt(!1),me(!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Vt=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=null!==De&&void 0!==De?De:"coins",da("Buy"),aa("Buy ".concat(t)),ra("Spend cash available to purchase ".concat(t)),ba("Cash Available"),Je(""),Ve(0),Kt(Wt),Yt(!1),Se(!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$t=function(){localStorage.removeItem(B),localStorage.removeItem(se),localStorage.removeItem(de),qe(void 0),E(void 0),O(void 0),S(void 0),Nt(!0),Ke("All purchases/deposits have been erased")},Lt=function(){},It=function(){var e=Object(u.a)(d.a.mark((function e(t,a){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next=e.t0===m.Reset?3:e.t0===m.Settings?5:e.t0===m.SaveSettings?7:e.t0===m.BuyMore?10:e.t0===m.SellSome?12:e.t0===m.ToggleBalance?14:e.t0===m.Deposit?16:e.t0===m.Withdraw?18:e.t0===m.BuyNew?20:e.t0===m.BuyShares?22:e.t0===m.SellShares?24:e.t0===m.Help?26:28;break;case 3:return Ye(!0),Te(!1),at("Erase everything?"),rt("All of your purchases and deposits will be erased"),dt("Erase"),bt({handler:$t}),vt({handler:Lt}),e.abrupt("break",29);case 5:return Te(!0),Je(y),e.abrupt("break",29);case 7:return S(a.feeRate),ue({feeRate:a.feeRate}),e.abrupt("break",29);case 10:return Pt(a),e.abrupt("break",29);case 12:return Rt(a),e.abrupt("break",29);case 14:return At(a),e.abrupt("break",29);case 16:return Dt(a),e.abrupt("break",29);case 18:return Ft(a),e.abrupt("break",29);case 20:return Vt(),e.abrupt("break",29);case 22:return Mt(a.key,a.shares),e.abrupt("break",29);case 24:return Et(a.key,a.shares),e.abrupt("break",29);case 26:return qt(),e.abrupt("break",29);case 28:throw Object.assign(new Error("Unexpected action type: ".concat(t)),{code:402});case 29:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),qt=function(){Q(!0)},Et=function(e,t){if(De){var a=q.find((function(e){return e.ticker===De}));if(a)if(e===a.key)if(t>a.shares)console.log("not enough ".concat(a.ticker));else{var c=T(Ie,a.ticker),i=t*c*y,r=q.map((function(a){if(a.key===e){var n=a.shares-t,c=Object(l.a)({},a);return c.costBasis=n>0?(a.shares*a.costBasis-(t+i))/n:0,c.shares=n,c}return a})),s=v+t*c-i,o=N+i;O(s),mt(r,s);var d="Sold ".concat(t/c," shares of ").concat(a.ticker," collecting $").concat(t," paying $").concat(i," in fees");D(o),Ke(d),console.log(d),E(r),le({balance:r,totalDeposits:n,cash:s,feesPaid:o})}else console.log("".concat(e," doesn't match ").concat(a.key));else console.log("".concat(De," wasn't found in coinBalance"))}else console.log("Current ticker is null")},Mt=function(e,t){if(t>v)console.log("not enough cach");else{var a,c,i=t*y;t-=i;var r,l=q.find((function(t){return e===t.key}));if(l)c=T(Ie,l.ticker),a=q.map((function(a){if(a.key===e){var n=t/c+a.shares;if(a.costBasis=(a.shares*a.costBasis+t)/n,a.shares=n,0===a.shares)return null}return a}));else{var o=Ie.find((function(t){return e===t.key}));if(!o)return void console.log("ticker ".concat(e," was not found"));l={key:(r=o).key,name:r.name,ticker:r.ticker,shares:0,costBasis:0},c=T(Ie,l.ticker),l.shares=t/c,l.costBasis=c,(a=Object(s.a)(q)).push(l)}var d=v-(t+i),u=N+i;D(u),O(d),mt(a,d);var h="Purchased ".concat(t/c," shares of ").concat(l.ticker," spending $").concat(t," paying $").concat(i," in fees");Ke(h),console.log(h),E(a),le({balance:a,totalDeposits:n,cash:d,feesPaid:u})}},Wt="Amount to purchase must be greater than zero",Jt="Number of shares to sell must be greater than zero",zt=c.a.useState(""),Ut=Object(h.a)(zt,2),_t=Ut[0],Kt=Ut[1],Gt=c.a.useState(!1),Qt=Object(h.a)(Gt,2),Xt=Qt[0],Yt=Qt[1],Zt=c.a.useState(""),ea=Object(h.a)(Zt,2),ta=ea[0],aa=ea[1],na=c.a.useState(""),ca=Object(h.a)(na,2),ia=ca[0],ra=ca[1],sa=c.a.useState(""),la=Object(h.a)(sa,2),oa=la[0],da=la[1],ua=c.a.useState(""),ha=Object(h.a)(ua,2),ja=ha[0],ba=ha[1],fa=function(e){var t=Number(e.quantity),a=e.coin;Je(t);var n=void 0===t?0:Number(t);if(n<=0)Kt(Wt),Yt(!1);else if(n>v)Kt("Amount to purchase exceeds cash available"),Yt(!1);else{var c=n/T(Ie,a.ticker);Kt("Purchase ".concat(c," of ").concat(a.ticker)),Yt(!0)}Ht(a)};return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)(I,{}),Object(x.jsx)(ee,{totalDeposits:n,netBalance:j,feesCollected:N,feeRate:y,cashAvailable:v,showBalance:R,handleAction:It}),Object(x.jsx)(H,{coinBalance:q,coinTicker:Ie,showBalance:R,handleAction:It}),Object(x.jsxs)("div",{className:"status-bar",children:[Object(x.jsx)("div",{children:"Status: "}),Object(x.jsx)("div",{className:"status-bar-message",children:_e})]}),Object(x.jsx)(W,{show:fe,cashSharesAvailable:v,dialogTicker:De,coinBalance:q,coinTicker:Ie,quantity:We,initialValue:Re,modalStatusMessage:_t,modalTextFieldStatus:Xt,onValidator:fa,modalTitle:ta,inputTitle:ia,actionTitle:oa,availability:ja,prefix:"$",handleAction:It,handleClose:function(){pe(!1)}}),Object(x.jsx)(z,{show:Oe,cashSharesAvailable:function(){var e=q?q.find((function(e){return e.ticker===De})):void 0;return Boolean(!e)?0:e.shares}(),coinBalance:q,coinTicker:Ie,dialogTicker:De,quantity:We,initialValue:Re,modalStatusMessage:_t,modalTextFieldStatus:Xt,onValidator:function(e){var t=q.find((function(e){return e.ticker===De}));if(t){Je(e);var a=void 0===e?0:Number(e);if(a<=0)Kt(Jt),Yt(!1);else if(a>t.shares)Kt("Amount to sell exceeds shares available"),Yt(!1);else{var n=T(Ie,t.ticker);Kt("Receive $".concat(a*n," for selling ").concat(t.ticker)),Yt(!0)}}else console.log("".concat(De," wasn't found in coinBalance"))},modalTitle:ta,inputTitle:ia,actionTitle:oa,availability:ja,handleAction:It,handleClose:function(){me(!1)}}),Object(x.jsx)(J,{show:ye,cashSharesAvailable:v,coinBalance:q,coinTicker:Ie,dialogTicker:De,modalStatusMessage:_t,modalTextFieldStatus:Xt,onValidator:fa,modalTitle:ta,inputTitle:ia,actionTitle:oa,availability:ja,selectCoin:function(e){var t=q.find((function(t){return e===t.ticker}));return void 0===t&&(t=Ie.find((function(t){return e===t.ticker}))),Ht(t),Fe(t.ticker),t},quantity:We,handleAction:It,handleClose:function(){Se(!1)}}),Object(x.jsx)(U,{show:Z===ie,coinBalance:q,coinTicker:Ie,settings:{feeRate:y},modalTitle:"Loading values",handleReload:function(){void 0===q&&(oe({balance:E,totalDeposits:i,cash:O,feesPaid:D}),he({feeRate:S}))},handleClose:function(){ae(re),mt()}}),Object(x.jsx)(_,{show:Ce,modalTitle:"Settings",inputTitle:"Paper Coin Exchange Settings",settings:{feeRate:We},onValidator:function(e){Je(e.feeRate)},handleAction:It,handleClose:function(){Te(!1)}}),Object(x.jsx)(te,{alertHeading:tt,alertMessage:it,alertButtonAcceptText:ot,alertAcceptHandler:jt,alertCancelHandler:xt,show:Xe,handleClose:function(){Ye(!1)}}),Object(x.jsx)(ne,{show:G,handleAction:It,totalDeposits:n,netBalance:j,showBalance:R,handleClose:function(){Q(!1)}})]})},be=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,113)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),i(e),r(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(je,{})}),document.getElementById("root")),be()},74:function(e,t,a){},76:function(e,t,a){},80:function(e,t,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.b64d0045.chunk.js.map