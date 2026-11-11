const CATS=['Colecciones','Colaboraciones','Sesiones de fotos','Desfiles'];
const KEY='portfolio-modelo-v1';
const def={p:{name:'Tu nombre',tagline:'Modelo · Paraná, Argentina',bio:'',email:'',ig:'',avatar:''},
 stats:[{k:'Altura',v:''},{k:'Busto',v:''},{k:'Cintura',v:''},{k:'Cadera',v:''},{k:'Calzado',v:''},{k:'Ojos',v:''},{k:'Pelo',v:''}],works:[],polas:[]};
let S=load(),filter='Todo',editing=false;if(!S.p.email)S.p.email='ginomelchiori3@gmail.com';
function load(){try{const r=localStorage.getItem(KEY);if(r)return Object.assign({},def,JSON.parse(r))}catch(e){}return JSON.parse(JSON.stringify(def))}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){alert('No hay más espacio guardado en el navegador. Borrá alguna foto o usá imágenes más livianas.')}}
const $=s=>document.querySelector(s);
const esc=t=>String(t||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function shrink(file,max){return new Promise(res=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height));const c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.82))};i.src=r.result};r.readAsDataURL(file)})}
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);

function fields(){document.querySelectorAll('[data-f]').forEach(el=>{const f=el.dataset.f;el.textContent=S.p[f]||(editing?'':'');el.contentEditable=editing;
 if(!S.p[f]&&editing)el.dataset.empty=1;el.oninput=el.onblur=()=>{if(f){S.p[f]=el.textContent.trim();save()}};
 if(!S.p[f]&&!editing&&f!=='name'&&f!=='tagline')el.textContent='';
 if(!S.p[f]&&editing)el.textContent='';el.setAttribute('placeholder',el.dataset.ph)});
 const e=$('[data-f=email]');if(S.p.email&&!editing)e.innerHTML='<a href="https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(S.p.email)+'&su='+encodeURIComponent('Contacto desde tu portfolio')+'" target="_blank" rel="noopener">'+esc(S.p.email)+'</a>';
 const ig=$('[data-f=ig]'),h=(S.p.ig||'@gino.melchiori').trim(),n=h.replace(/^@/,''),u=n==='gino.melchiori'?'https://www.instagram.com/gino.melchiori?rpxt=Y3MxdGFiNHdzdThk':'https://www.instagram.com/'+encodeURIComponent(n);
 if(editing)ig.textContent=h;else ig.innerHTML='<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+esc(h)+'</a>'}
function stats(){const box=$('#stats');box.innerHTML='';S.stats.forEach((s,i)=>{if(!editing&&!s.v)return;const d=document.createElement('div');d.className='stat';
 d.innerHTML='<b data-f contenteditable="'+editing+'">'+esc(s.k)+'</b><span data-f contenteditable="'+editing+'">'+esc(s.v)+'</span>';
 const [b,v]=d.querySelectorAll('[data-f]');b.oninput=()=>{s.k=b.textContent.trim();save()};b.onblur=()=>{s.k=b.textContent.trim();if(!s.k){S.stats.splice(i,1);save();stats()}else save()};v.oninput=v.onblur=()=>{s.v=v.textContent.trim();save()};box.appendChild(d)})}
function avatar(){const a=$('#avatar');a.innerHTML=S.p.avatar?'<img alt="Foto de perfil" src="'+S.p.avatar+'">':'<span>Foto de perfil</span>'}
function tabs(){const t=$('#tabs');t.innerHTML='';['Todo',...CATS].forEach(c=>{const b=document.createElement('button');b.className='tab'+(c===filter?' on':'');b.textContent=c;b.onclick=()=>{filter=c;tabs();grid()};t.appendChild(b)})}
function grid(){const g=$('#grid');const list=S.works.filter(w=>filter==='Todo'||w.cat===filter);
 if(!list.length){g.style.columns='1';g.innerHTML='<div class="empty">Todavía no hay fotos acá. Tocá «Editar» para agregar las primeras.</div>';return}
 g.style.columns='';g.innerHTML='';list.forEach(w=>{const f=document.createElement('figure');f.className='item';
 f.innerHTML='<img loading="lazy" alt="'+esc(w.title||w.cat)+'" src="'+w.src+'"><figcaption><i>'+esc(w.cat)+'</i>'+esc(w.title)+'</figcaption><button class="del" title="Eliminar">✕</button>';
 f.querySelector('img').onclick=()=>zoom(w.src);
 arm(f.querySelector('.del'),()=>{S.works=S.works.filter(x=>x.id!==w.id);save();grid()});g.appendChild(f)})}
function polas(){const g=$('#polas');g.innerHTML='';if(!S.polas.length){g.innerHTML='<div class="empty" style="width:100%">Tus polaroids van a aparecer acá.</div>';return}
 S.polas.forEach(p=>{const d=document.createElement('div');d.className='pola';
 d.innerHTML='<button class="del" title="Eliminar">✕</button><img loading="lazy" alt="'+esc(p.cap||'Polaroid')+'" src="'+p.src+'"><p data-c contenteditable="'+editing+'">'+esc(p.cap)+'</p>';
 d.querySelector('img').onclick=()=>zoom(p.src);
 const c=d.querySelector('[data-c]');c.oninput=c.onblur=()=>{p.cap=c.textContent.trim();save()};c.onclick=e=>e.stopPropagation();
 arm(d.querySelector('.del'),()=>{S.polas=S.polas.filter(x=>x.id!==p.id);save();polas()});g.appendChild(d)})}
function arm(btn,fn){let t;btn.onclick=e=>{e.stopPropagation();if(btn.dataset.arm){clearTimeout(t);fn();return}btn.dataset.arm=1;btn.textContent='¿Borrar?';btn.style.cssText='width:auto;padding:0 10px;border-radius:15px;background:#b3261e';t=setTimeout(()=>{delete btn.dataset.arm;btn.textContent='✕';btn.removeAttribute('style')},3000)}}
function toast(m){let d=$('#toast');if(!d){d=document.createElement('div');d.id='toast';d.style.cssText='position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:#222;color:#fff;padding:10px 18px;border-radius:999px;z-index:60;font-size:14px;max-width:90vw';document.body.appendChild(d)}d.textContent=m;d.style.display='block';clearTimeout(d.t);d.t=setTimeout(()=>d.style.display='none',3500)}
window.alert=toast;
function zoom(src){const l=$('#lb');l.querySelector('img').src=src;l.classList.add('show')}
$('#lb').onclick=()=>$('#lb').classList.remove('show');
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('show')});

$('#wCat').innerHTML=CATS.map(c=>'<option>'+c+'</option>').join('');
$('#wAdd').onclick=async()=>{const fs=[...$('#wFile').files];if(!fs.length)return alert('Elegí al menos una imagen.');
 for(const f of fs)S.works.unshift({id:uid(),src:await shrink(f,1400),title:$('#wTitle').value.trim(),cat:$('#wCat').value});
 save();$('#wFile').value='';$('#wTitle').value='';filter='Todo';tabs();grid()};
$('#pAdd').onclick=async()=>{const fs=[...$('#pFile').files];if(!fs.length)return alert('Elegí al menos una imagen.');
 for(const f of fs)S.polas.unshift({id:uid(),src:await shrink(f,800),cap:$('#pCap').value.trim()});
 save();$('#pFile').value='';$('#pCap').value='';polas()};
$('#avatarIn').onchange=async e=>{const f=e.target.files[0];if(!f)return;S.p.avatar=await shrink(f,1000);save();avatar()};
$('#addStat').onclick=()=>{S.stats.push({k:'Nuevo dato',v:''});save();stats()};
$('#editBtn').onclick=()=>{editing=!editing;document.body.classList.toggle('editing',editing);const b=$('#editBtn');b.textContent=editing?'Listo':'Editar';b.classList.toggle('on',editing);fields();stats();polas()};

$('#expBtn').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='portfolio.json';a.click()};
$('#impIn').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{S=Object.assign({},def,JSON.parse(await f.text()));save();location.reload()}catch(x){alert('Archivo inválido')}};
if(location.hash==='#editar')['editBtn','expBtn','impLbl'].forEach(i=>$('#'+i).hidden=false);
$('#yr').textContent=new Date().getFullYear();
(async()=>{try{if(!localStorage.getItem(KEY)){const r=await fetch('portfolio.json');if(r.ok){S=Object.assign({},def,await r.json());if(!S.p.email)S.p.email='ginomelchiori3@gmail.com'}}}catch(e){}fields();stats();avatar();tabs();grid();polas()})();
