(this["webpackJsonpcoin-exchange"]=this["webpackJsonpcoin-exchange"]||[]).push([[0],{35:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){},41:function(e,n,t){},59:function(e,n,t){"use strict";t.r(n);var c,a,r=t(1),s=t.n(r),i=t(23),o=t.n(i),l=(t(35),t(7)),h=t(3),j=t.n(h),u=t(11),d=t(9),b=(t(37),t(4)),p=t(5),f=(t(38),t(0)),O=p.a.section(c||(c=Object(b.a)(["\n    border: 1px solid red;\n    font-size: 3rem;\n"])));function x(e){var n=e.showBalance?"Hide Balance":"Show Balance",t=e.showBalance?"Balance: $"+e.amount:"";return Object(f.jsxs)(O,{className:"balance",children:[t,Object(f.jsx)("button",{className:"showHideBalance",onClick:function(n){n.preventDefault(),e.showHideBalance(!e.showBalance)},children:n})]})}var m=p.a.td(a||(a=Object(b.a)(["\n    border: 2px solid #cccccc;\n    width: 25vh;\n"])));function v(e){var n=e.showBalance?Object(f.jsxs)(m,{children:["$",e.balance]}):Object(f.jsx)(f.Fragment,{});return Object(f.jsxs)("tr",{className:"coin-row",children:[Object(f.jsx)(m,{children:e.name}),Object(f.jsx)(m,{children:e.ticker}),Object(f.jsxs)(m,{children:["$",e.price]}),n,Object(f.jsx)(m,{children:Object(f.jsx)("form",{action:"#",method:"POST",children:Object(f.jsx)("button",{onClick:function(n){n.preventDefault(),e.handleRefresh(e.id)},children:"Refresh"})})})]})}function w(e){var n=e.showBalance?Object(f.jsx)("th",{children:"Balance"}):Object(f.jsx)(f.Fragment,{});return Object(f.jsx)("div",{children:Object(f.jsxs)("table",{className:"coin-table",children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"Name"}),Object(f.jsx)("th",{children:"Ticker"}),Object(f.jsx)("th",{children:"Price"}),n,Object(f.jsx)("th",{children:"Actions"})]})}),Object(f.jsx)("tbody",{children:e.coinData.map((function(n){return Object(f.jsx)(v,Object(l.a)({id:n.key,showBalance:e.showBalance,handleRefresh:e.handleRefresh},n),n.key)}))})]})})}var g=t(27),k=t(28),B=t(30),y=t(29),N=t.p+"static/media/logo.6ce24c58.svg",S=(t(41),function(e){Object(B.a)(t,e);var n=Object(y.a)(t);function t(){return Object(g.a)(this,t),n.apply(this,arguments)}return Object(k.a)(t,[{key:"render",value:function(){return Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)("img",{src:N,alt:"React logo",className:"App-logo"}),Object(f.jsx)("h1",{className:"App-title",children:"Coin Exchange"})]})}}]),t}(r.Component)),F=t(8),C=t.n(F),D=function(e){return parseFloat(Number(e).toFixed(4))};var R=function(e){var n=s.a.useState(1e4),t=Object(d.a)(n,2),c=t[0],a=(t[1],s.a.useState(!0)),r=Object(d.a)(a,2),i=r[0],o=r[1],h=s.a.useState([]),b=Object(d.a)(h,2),p=b[0],O=b[1],m=function(){var e=Object(u.a)(j.a.mark((function e(){var n,t,c,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("https://api.coinpaprika.com/v1/coins");case 2:return n=e.sent,t=n.data.slice(0,10).map((function(e){return e.id})),c=t.map((function(e){return C.a.get("https://api.coinpaprika.com/v1/tickers/".concat(e))})),e.next=7,Promise.all(c);case 7:a=e.sent,r=a.map((function(e){var n=e.data;return{key:n.id,name:n.name,ticker:n.symbol,balance:0,price:D(n.quotes.USD.price)}})),O(r);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();s.a.useEffect((function(){0===p.length&&m()}));var v=function(e){o(e)},g=function(){var e=Object(u.a)(j.a.mark((function e(n){var t,c,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("https://api.coinpaprika.com/v1/tickers/".concat(n));case 2:t=e.sent,c=D(t.data.quotes.USD.price),a=p.map((function(e){var t=Object(l.a)({},e);return n===e.key&&(t.price=c),t})),O(a);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(S,{}),Object(f.jsx)(x,{showHideBalance:v,amount:c,showBalance:i}),Object(f.jsx)(w,{coinData:p,showHideBalance:v,showBalance:i,handleRefresh:g})]})},A=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,60)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,s=n.getTTFB;t(e),c(e),a(e),r(e),s(e)}))};o.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(R,{})}),document.getElementById("root")),A()}},[[59,1,2]]]);
//# sourceMappingURL=main.99012e05.chunk.js.map