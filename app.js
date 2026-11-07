let S={done:{},sub:{},q:{},note:{},wk:"19:00",we:"09:00",sel:null,theme:""};
try{Object.assign(S,JSON.parse(localStorage.getItem("pcac")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("pcac",JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),pad=n=>String(n).padStart(2,"0");
const iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const D=[];let k=0;
for(let i=0;i<61;i++){const d=new Date(2026,10,9+i),sun=d.getDay()==0;D.push({d,sun,t:sun?null:k++})}
const parts=s=>{const r=[];let d=0,c="";for(const ch of s){if(ch=="(")d++;if(ch==")")d--;if(ch==","&&!d){r.push(c.trim());c=""}else c+=ch}r.push(c.trim());return r.filter(Boolean)};
const SUN=["Resolver 50 questões em tempo cronometrado","Revisar cada erro e anotar o motivo","Escrever 20 a 30 linhas e conferir com o conteúdo programático"];
const subs=i=>D[i].sun?SUN:parts(T[D[i].t][2]);
const rev=i=>[[1,"ontem"],[7,"7 dias"],[30,"30 dias"]].map(([n,l])=>{let j=i-n;while(j>=0&&D[j].sun)j--;return j>=0?T[D[j].t][1]+" ("+l+")":null}).filter(Boolean);
const blocks=i=>D[i].sun?[["Simulado semanal",90],["Corrigir e atualizar o caderno de erros",45],["Redação técnica sobre Informática Forense",45]]:[["Teoria: "+T[D[i].t][1],90],["Questões do tema no estilo IDECAN",60],["Revisão espaçada",30]];
const start=i=>{const w=D[i].d.getDay(),[h,m]=(w==0||w==6?S.we:S.wk).split(":").map(Number);return h*60+m};
const hm=m=>pad(Math.floor(m/60)%24)+":"+pad(m%60);
const st=i=>{const n=[0,1,2].filter(j=>S.done[i+"."+j]).length;return n==3?"full":n?"part":""};
const gc=i=>D[i].sun?"gS":"g"+T[D[i].t][0];
const real=Math.floor((new Date()-new Date(2026,10,9))/864e5),today=Math.max(0,Math.min(60,real));
if(S.sel==null)S.sel=today;
function render(){
 let mins=0,tot=0,streak=0,qf=0,qa=0;
 D.forEach((_,i)=>{blocks(i).forEach((b,j)=>{tot+=b[1];if(S.done[i+"."+j])mins+=b[1]});const q=S.q[i];if(q){qf+=+q[0]||0;qa+=+q[1]||0}});
 for(let i=today;i>=0;i--){if(st(i)=="full")streak++;else if(i<today)break}
 const dl=Math.ceil((new Date(2027,0,24)-new Date())/864e5);
 $("#stats").innerHTML=[[Math.max(dl,0),"dias para a prova","first"],[Math.round(mins/tot*100)+"%","do plano concluído"],[(mins/60).toFixed(1)+" h","estudadas de "+tot/60+" h"],[streak,"dias seguidos completos"],[qf?Math.round(qa/qf*100)+"%":"–",qf?"de acerto em "+qf+" questões":"de acerto nas questões"]].map(([a,b,c])=>`<div class="card stat ${c||""}"><div class="big">${a}</div><div class="lab">${b}</div></div>`).join("");
 $("#map").innerHTML=`<div class="map">`+D.map((x,i)=>`<button class="s ${gc(i)} ${st(i)} ${i==S.sel?"sel":""}" data-d="${i}" aria-label="Dia ${i+1}: ${x.sun?"domingo":T[x.t][1]}" title="${x.d.toLocaleDateString("pt-BR")}: ${x.sun?"Simulado":T[x.t][1]}"></button>`).join("")+`</div><div class="leg"><span class="gE"><i></i>Informática Forense</span><span class="gP"><i></i>Perito comum</span><span class="gJ"><i></i>Jurídicas</span><span class="gB"><i></i>Básicas</span><span class="gS"><i></i>Domingo</span><span>Metade preenchida: dia em andamento</span></div>`;
 const i=S.sel,x=D[i],b=blocks(i),sl=subs(i);let t=start(i);
 const ds=x.d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
 const nsub=sl.filter((_,n)=>S.sub[i+"."+n]).length,q=S.q[i]||["",""];
 $("#day").innerHTML=`<div class="dayhead ${gc(i)}"><div class="dn mono">${pad(i+1)}</div><div><h2 style="margin:0">${i==real?"Hoje, ":""}${ds}</h2><div class="sub">Dia ${i+1} de 61${x.sun?"":`<span class="chip ${gc(i)}" style="margin-left:8px">${GN[T[x.t][0]]}</span>`}</div></div></div>`+
 b.map((r,j)=>{const a=t;t+=r[1];const key=i+"."+j;
  return`<label class="blk ${S.done[key]?"ok":""}"><input type="checkbox" data-k="${key}" ${S.done[key]?"checked":""}><div><div class="t">${r[0]}</div><div class="tm">${hm(a)} às ${hm(t)}, ${r[1]} min</div></div></label>`+
  (j==0?`<details open><summary>Itens do conteúdo: ${nsub} de ${sl.length}</summary>`+sl.map((s,n)=>`<label class="sl ${S.sub[i+"."+n]?"ok":""}"><input type="checkbox" data-s="${i}.${n}" ${S.sub[i+"."+n]?"checked":""}><span>${s}</span></label>`).join("")+`<button class="b" data-all="${i}" style="margin:6px 0">${nsub==sl.length?"Desmarcar todos":"Marcar todos"}</button></details>`:"")+
  (j==2&&!x.sun?`<div class="rv">${rev(i).map(r=>`<span>${r}</span>`).join("")||"<span>Caderno de erros</span>"}</div>`:"")}).join("")+
 `<div class="qrow"><span>Questões do dia</span><label>feitas <input type="number" min="0" max="500" data-q="0" data-i="${i}" value="${q[0]}"></label><label>acertos <input type="number" min="0" max="500" data-q="1" data-i="${i}" value="${q[1]}"></label></div><textarea data-n="${i}" placeholder="Anotações do dia: dúvidas, pontos fracos, ideias de flashcards" aria-label="Anotações do dia">${(S.note[i]||"").replace(/</g,"&lt;")}</textarea>`;
 const g={};T.forEach(r=>g[r[0]]=g[r[0]]||[0,0]);
 D.forEach((y,n)=>{if(!y.sun){const z=g[T[y.t][0]];z[1]++;if(S.done[n+".0"])z[0]++}});
 $("#subj").innerHTML="<h2>Teoria concluída por área</h2>"+Object.keys(g).map(c=>`<div class="g${c}"><div>${GN[c]} <span class="lab">${g[c][0]} de ${g[c][1]} dias</span></div><div class="bar"><i style="width:${g[c][0]/g[c][1]*100}%"></i></div></div>`).join("")+`<div class="sub">Cada tema volta em revisão 1, 7 e 30 dias depois. Domingos: simulado e redação.</div>`;
 let h="<h2>Calendário</h2>";
 [[2026,10],[2026,11],[2027,0]].forEach(([y,m])=>{
  const f=new Date(y,m,1),n=new Date(y,m+1,0).getDate();
  h+=`<div class="mon"><h3>${f.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</h3><div class="cal">`+"DSTQQSS".split("").map(c=>`<div class="dw">${c}</div>`).join("")+"<div></div>".repeat(f.getDay());
  for(let d=1;d<=n;d++){const dt=new Date(y,m,d),idx=Math.round((dt-new Date(2026,10,9))/864e5),inn=idx>=0&&idx<61,key=KEY[iso(dt)];
   const cl=["c",inn?gc(idx):"out",inn?st(idx):"",inn&&idx==S.sel?"sel":"",iso(dt)==iso(new Date())?"today":""].join(" ");
   h+=`<button class="${cl}" ${inn?`data-d="${idx}"`:""} aria-label="${dt.toLocaleDateString("pt-BR")}">${d}${key?`<small class="k">${key}</small>`:""}${inn&&!D[idx].sun?`<small>${T[D[idx].t][1]}</small>`:""}</button>`}
  h+="</div></div>"});
 $("#cal").innerHTML=h+`<div class="sub">Entre 9 e 23 de janeiro ficam 16 dias de margem para revisão livre antes da prova.</div>`}
document.addEventListener("click",e=>{const c=e.target.closest("[data-d]");if(c&&!c.classList.contains("out")){S.sel=+c.dataset.d;save();render();return}
 const a=e.target.closest("[data-all]");if(a){const i=+a.dataset.all,l=subs(i),all=l.every((_,n)=>S.sub[i+"."+n]);l.forEach((_,n)=>all?delete S.sub[i+"."+n]:S.sub[i+"."+n]=1);save();render()}});
document.addEventListener("change",e=>{const d=e.target.dataset||{};
 if(d.k){e.target.checked?S.done[d.k]=1:delete S.done[d.k]}
 else if(d.s){e.target.checked?S.sub[d.s]=1:delete S.sub[d.s]}
 else if(d.q){const q=S.q[d.i]||["",""];q[d.q]=e.target.value;S.q[d.i]=q}
 else return;
 save();render()});
document.addEventListener("input",e=>{if(e.target.dataset&&e.target.dataset.n!=null){S.note[e.target.dataset.n]=e.target.value;save()}});
$("#wk").value=S.wk;$("#we").value=S.we;
$("#wk").onchange=e=>{S.wk=e.target.value||"19:00";save();render()};
$("#we").onchange=e=>{S.we=e.target.value||"09:00";save();render()};
const ap=()=>{if(S.theme)document.documentElement.dataset.theme=S.theme};
if(!S.theme)S.theme="dark";ap();
$("#th").onclick=()=>{S.theme=S.theme=="dark"?"light":"dark";ap();save()};
$("#rs").onclick=()=>{if(confirm("Apagar todo o progresso, questões e anotações?")){S.done={};S.sub={};S.q={};S.note={};S.sel=today;save();render()}};
function dl(n,c,t){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:t}));a.download=n;document.body.appendChild(a);a.click();a.remove()}
$("#ex").onclick=()=>dl("progresso-pcac.json",JSON.stringify({done:S.done,sub:S.sub,q:S.q,note:S.note,wk:S.wk,we:S.we}),"application/json");
$("#im").onclick=()=>$("#fi").click();
$("#fi").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const j=JSON.parse(r.result);["done","sub","q","note"].forEach(c=>S[c]=j[c]||{});S.wk=j.wk||S.wk;S.we=j.we||S.we;$("#wk").value=S.wk;$("#we").value=S.we;save();render()}catch(x){alert("Arquivo inválido.")}};r.readAsText(f)};
$("#ics").onclick=()=>{
 const f=(d,m)=>d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(Math.floor(m/60))+pad(m%60)+"00";
 let o="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//PCAC Plano de Estudos//PT\r\nCALSCALE:GREGORIAN\r\nX-WR-TIMEZONE:America/Rio_Branco\r\n";
 D.forEach((x,i)=>{let t=start(i);blocks(i).forEach((b,j)=>{const a=t;t+=b[1];
  o+="BEGIN:VEVENT\r\nUID:pcac-"+i+"-"+j+"@plano-pcac\r\nDTSTAMP:20261107T000000Z\r\nDTSTART;TZID=America/Rio_Branco:"+f(x.d,a)+"\r\nDTEND;TZID=America/Rio_Branco:"+f(x.d,t)+"\r\nSUMMARY:"+b[0].replace(/[,;]/g," ")+"\r\nDESCRIPTION:PCAC Perito Informática Forense, dia "+(i+1)+" de 61\r\nEND:VEVENT\r\n"})});
 dl("plano-pcac.ics",o+"END:VCALENDAR\r\n","text/calendar")};
render();
