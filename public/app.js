const A=window.GMR_ASSETS||{};
const $=s=>document.querySelector(s);
async function api(path,opts){let r=await fetch('/api/'+path,opts);if(!r.ok)throw Error(await r.text());return r.json()}
async function content(){try{return await api('content')}catch(e){return null}}
function nav(){return `<header><div class="wrap nav"><a class="brand" href="/"><img id="siteLogo" src="${A.logo}" alt="Greg Marshall Racing"></a><button id="menu" class="menu">MENU</button><nav id="navlinks" class="navlinks"><a href="/">Home</a><a href="/news">News</a><a href="/photos">Photos</a><a href="/about">About</a><a href="/2026">2026</a><a href="/sponsors">Sponsors</a><a target="_blank" rel="noopener" href="https://gregmarshall95.myshopify.com">Merchandise</a><a class="admin-link" href="/admin">Admin</a></nav></div></header>`}
function foot(){return `<footer><div class="wrap footer-inner"><strong>GREG MARSHALL <span>#95</span></strong><div>Copyright © Greg Marshall. All Rights Reserved.</div></div></footer>`}
document.addEventListener('DOMContentLoaded',async()=>{$('#top').innerHTML=nav();$('#bottom').innerHTML=foot();$('#menu')?.addEventListener('click',()=>$('#navlinks').classList.toggle('open'));let d=await content();if(d?.branding?.logo)$('#siteLogo').src=d.branding.logo});
