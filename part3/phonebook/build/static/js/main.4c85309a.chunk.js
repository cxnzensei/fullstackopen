(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{24:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var o=n(2),c=n.n(o),r=n(18),i=n.n(r),a=(n(24),n(19)),u=n(3),s=n(0);var l=function(e){var t=e.filter,n=e.people,o=e.deleteContact,c=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return Object(s.jsx)("div",{children:0===c.length?Object(s.jsx)("p",{children:"Nothing to show"}):c.sort((function(e,t){return e.name.toLowerCase()>t.name.toLowerCase()?1:-1})).map((function(e){return Object(s.jsxs)("div",{style:{display:"flex",marginBottom:"15px",alignItems:"center"},children:[Object(s.jsx)("h4",{children:e.name}),Object(s.jsx)("p",{children:e.number}),Object(s.jsx)("button",{onClick:function(){return o(e.name,e.id)},children:"delete"})]},e.id)}))})};var d=function(e){var t=e.setFilter;return Object(s.jsxs)("div",{style:{paddingTop:"25px"},children:["filter shown with -"," ",Object(s.jsx)("input",{style:{outline:"none"},onChange:function(e){return t(e.target.value)}})]})};var j=function(e){var t=e.addToTheBook,n=e.newName,o=e.setNewName,c=e.number,r=e.setNewNumber;return Object(s.jsxs)("form",{onSubmit:t,children:[Object(s.jsx)("h1",{children:"Add a new contact"}),Object(s.jsxs)("div",{children:["Name :"," ",Object(s.jsx)("input",{style:{outline:"none"},value:n,onChange:function(e){return o(e.target.value)}})]}),Object(s.jsxs)("div",{children:["Number:"," ",Object(s.jsx)("input",{style:{outline:"none"},value:c,onChange:function(e){return r(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"Add"})})]})},b=n(5),f=n.n(b),h="/api/people",m=function(){return f.a.get(h).then((function(e){return e.data}))},p=function(e){return f.a.post(h,e).then((function(e){return e.data})).catch((function(){return console.log("failed to upload")}))},O=function(e,t){return f.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},x=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))};var v=function(e){var t=e.notification;return Object(s.jsx)("div",{className:"notification",style:{color:"".concat(t.color)},children:Object(s.jsx)("div",{children:t.message})})};var g=function(){var e=Object(o.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(o.useState)(""),i=Object(u.a)(r,2),b=i[0],f=i[1],h=Object(o.useState)(""),g=Object(u.a)(h,2),w=g[0],N=g[1],y=Object(o.useState)(""),k=Object(u.a)(y,2),C=k[0],T=k[1],S=Object(o.useState)({message:"",color:""}),B=Object(u.a)(S,2),L=B[0],D=B[1];return Object(o.useEffect)((function(){m().then((function(e){c(e)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{style:{marginTop:"-5px"},children:"Phonebook"}),Object(s.jsx)(v,{notification:L}),Object(s.jsx)(d,{setFilter:T}),Object(s.jsx)(j,{addToTheBook:function(e){if(e.preventDefault(),b&&w)if(n.some((function(e){return e.name===b}))){if(window.confirm("".concat(b," is already added to the phonebook. Do you want to update the number?"))){var t=n.find((function(e){return e.name===b})),o=t.id,r={name:b,id:t.id,number:w};O(o,r).then((function(e){c(n.map((function(t){return t.id!==o?t:e})))})),N(""),f("")}}else{var i={name:b,id:(n.length>0?Math.max.apply(Math,Object(a.a)(n.map((function(e){return e.id})))):0)+1,number:w};p(i).then((function(e){c(n.concat(e))})),D({message:"".concat(b," added to phonebook"),color:"green"}),setTimeout((function(){D({message:"",color:"black"})}),3e3),N(""),f("")}else window.alert("complete all the fields")},newName:b,setNewName:f,number:w,setNewNumber:N}),Object(s.jsx)("h1",{children:"Numbers"}),Object(s.jsx)(l,{deleteContact:function(e,t){window.confirm("Delete ".concat(e))&&x(t).then((function(){c(n.filter((function(e){return e.id!==t})))})),D({message:"information of ".concat(e," has been removed from the server"),color:"red"}),setTimeout((function(){D({message:"",color:"black"})}),3e3)},filter:C,people:n,setNotification:D})]})};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.4c85309a.chunk.js.map