(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=(t(19),t(3)),i=function(e){var n=e.newFilter,t=e.handleNewFilterChange;return r.a.createElement("p",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},l=function(e){e.persons;var n=e.newName,t=e.newNumber,a=e.handleNewNameChange,o=e.handleNewNumberChage,u=(e.alertOnSubmit,e.addPerson);return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.newFilter,t=e.persons,a=e.deletePerson;return(""===n?t:t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}))).map((function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))}))},d=t(2),f=t.n(d),s="https://phonebook123123.herokuapp.com/api/persons",h=function(){return f.a.get(s).then((function(e){return e.data}))},b=function(e){return f.a.post(s,e).then((function(e){return e.data}))},w=function(e,n){return f.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),d=Object(c.a)(u,2),f=d[0],s=d[1],v=Object(a.useState)(""),E=Object(c.a)(v,2),g=E[0],N=E[1],k=Object(a.useState)(""),C=Object(c.a)(k,2),O=C[0],j=C[1];Object(a.useEffect)((function(){return h().then((function(e){return o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{newFilter:O,handleNewFilterChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(l,{persons:t,newName:f,newNumber:g,handleNewNameChange:function(e){s(e.target.value)},addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f}));n&&window.confirm("Do you want to edit ".concat(n.name,"s number?"))?w(n.id,{name:n.name,number:g}).then((function(e){o((function(t){return t.id!==n.id?t:e})),s(""),N("")})):(b({name:f,number:g}).then((function(e){return o(t.concat(e))})),s(""),N(""))},handleNewNumberChage:function(e){N(e.target.value)},alertOnSubmit:function(e){e.preventDefault(),window.alert("".concat(f," is already added to the phonebook!"))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{newFilter:O,persons:t,deletePerson:function(e){console.log(t.map((function(n){return n.id!==e?n:null}))),p(e).then((function(n){return o(t.filter((function(n){return n.id!==e})))})).catch((function(){return o(t.filter((function(n){return n.id!==e})))}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.ba70e35f.chunk.js.map