import{d as y,u as v,k as u,o as b,r as g,a as e,z as r,e as i,w as a,_ as w,i as c,b as s,F as d,G as f,B as x}from"./index.c7ef58d3.js";import{_ as B,a as C,D as S,b as $,c as A}from"./Alert.vue_vue_type_script_setup_true_lang.a454903f.js";import{C as D}from"./Container.7e439d2b.js";import{a as N,S as T}from"./SectionTitle.78ab651d.js";const U={class:"h-full"},F={key:0},H=y({__name:"Users",setup(V){const m=v(),p=u(["id","name","Admin","email","Created at","updated at"]),o=u([]),n=u(!1);return b(async()=>{if(!m.isAdmin)g.push({name:"home"});else try{n.value=!0;const t=await N.get("/users"),{data:_}=t;o.value=_.users}catch(t){console.log(t)}finally{n.value=!1}}),(t,_)=>(e(),r("div",U,[i(D,null,{default:a(()=>[i(w,{justify:"between",class:"mb-4"},{default:a(()=>[i(T,null,{default:a(()=>[c("Users")]),_:1})]),_:1}),n.value?(e(),s(A,{key:1})):(e(),r("div",F,[o.value.length>0?(e(),s(B,{key:0,"table-headers":p.value,actions:!1},{default:a(()=>[(e(!0),r(d,null,f(o.value,l=>(e(),s(S,{key:l.id},{default:a(()=>[(e(!0),r(d,null,f(l,(h,k)=>(e(),s($,{key:l.id+"-"+k},{default:a(()=>[c(x(h),1)]),_:2},1024))),128))]),_:2},1024))),128))]),_:1},8,["table-headers"])):(e(),s(C,{key:1},{default:a(()=>[c("No users")]),_:1}))]))]),_:1})]))}});export{H as default};
