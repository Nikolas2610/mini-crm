import{d as y,u as v,k as u,o as b,r as g,a as e,z as r,e as i,w as a,_ as w,i as c,b as s,F as d,G as f,B as x}from"./index.af2ffd6f.js";import{S as B,_ as C,a as S,D as $,b as A,c as D}from"./Alert.vue_vue_type_script_setup_true_lang.7978864a.js";import{C as N}from"./Container.f2294c64.js";import{a as T}from"./axiosAuth.6854ddf1.js";const U={class:"h-full"},F={key:0},H=y({__name:"Users",setup(V){const m=v(),p=u(["id","name","Admin","email","Created at","updated at"]),o=u([]),n=u(!1);return b(async()=>{if(!m.isAdmin)g.push({name:"home"});else try{n.value=!0;const t=await T.get("/users"),{data:_}=t;o.value=_.users}catch(t){console.log(t)}finally{n.value=!1}}),(t,_)=>(e(),r("div",U,[i(N,null,{default:a(()=>[i(w,{justify:"between",class:"mb-4"},{default:a(()=>[i(B,null,{default:a(()=>[c("Users")]),_:1})]),_:1}),n.value?(e(),s(D,{key:1})):(e(),r("div",F,[o.value.length>0?(e(),s(C,{key:0,"table-headers":p.value,actions:!1},{default:a(()=>[(e(!0),r(d,null,f(o.value,l=>(e(),s($,{key:l.id},{default:a(()=>[(e(!0),r(d,null,f(l,(h,k)=>(e(),s(A,{key:l.id+"-"+k},{default:a(()=>[c(x(h),1)]),_:2},1024))),128))]),_:2},1024))),128))]),_:1},8,["table-headers"])):(e(),s(S,{key:1},{default:a(()=>[c("No users")]),_:1}))]))]),_:1})]))}});export{H as default};