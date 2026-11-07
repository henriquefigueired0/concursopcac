let S={done:{},wk:"19:00",we:"09:00",sel:null,theme:""};
try{Object.assign(S,JSON.parse(localStorage.getItem("pcac")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("pcac",JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),pad=n=>String(n).padStart(2,"0");
const iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const D=[];let k=0;
for(let i=0;i<61;i++){const d=new Date(2026,10,9+i),sun=d.getDay()==0;D.push({d,sun,t:sun?null:k++})}
const blocks=i=>{const x=D[i];if(x.sun)return[["Simulado semanal: 50 questões, tempo cronometrado",90],["Corrigir e atualizar o caderno de erros",45],["Redação técnica de 20 a 30 linhas sobre Informática Forense",45]];
const rv=[[1,"ontem"],[7,"7 dias"],[30,"30 dias"]].map(([n,l])=>{let j=i-n;while(j>=0&&D[j].sun)j--;return j>=0?T[D[j].t][1]+" ("+l+")":null}).filter(Boolean);
return[["Teoria: "+T[x.t][1],90],["Questões do tema no estilo IDECAN",60],["Revisão espaçada"+(rv.length?": "+rv.join("; "):": caderno de erros"),30]]};
const start=i=>{const w=D[i].d.getDay(),[h,m]=(w==0||w==6?S.we:S.wk).split(":").map(Number);return h*60+m};
const hm=m=>pad(Math.floor(m/60)%24)+":"+pad(m%60);
const today=Math.max(0,Math.min(60,Math.floor((new Date()-new Date(2026,10,9))/864e5)));
if(S.sel==null)S.sel=today;
const st=i=>{const b=blocks(i),n=b.filter((_,j)=>S.done[i+"."+j]).length;return n==3?"full":n?"part":""};
function render(){
 let mins=0,tot=0,streak=0;
 D.forEach((_,i)=>blocks(i).forEach((b,j)=>{tot+=b[1];if(S.done[i+"."+j])mins+=b[1]}));
 for(let i=Math.min(today,60);i>=0;i--){if(st(i)=="full")streak++;else if(i<today)break}
 const dl=Math.ceil((new Date(2027,0,24)-new Date())/864e5);
 $("#stats").innerHTML=[[Math.max(dl,0),"dias para a prova"],[Math.round(mins/tot*100)+"%","do plano concluído"],[(mins/60).toFixed(1)+" h","estudadas de "+(tot/60)+" h"],[streak,"dias seguidos completos"]].map(([a,b])=>`<div class="card"><div class="big">${a}</div><div class="lab">${b}</div></div>`).join("");
 const i=S.sel,x=D[i],b=blocks(i);let t=start(i);
 const ds=x.d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
 $("#day").innerHTML=`<h2>${i==today?"Hoje":"Dia selecionado"}: ${ds} <span class="sub">(dia ${i+1} de 61)</span></h2>`+(x.sun?`<div class="sub">Domingo: sem conteúdo novo. Consolide a semana.</div>`:`<div><span class="tag ${T[x.t][0]}">${GN[T[x.t][0]]}</span><span class="sub">${T[x.t][2]}</span></div>`)+
 b.map((r,j)=>{const a=t;t+=r[1];return`<label class="blk ${S.done[i+"."+j]?"ok":""}"><input type="checkbox" data-k="${i}.${j}" ${S.done[i+"."+j]?"checked":""}><div><div class="t">${r[0]}</div><div class="tm">${hm(a)} às ${hm(t)} · ${r[1]} min</div></div></label>`}).join("");
 const g={};T.forEach(r=>g[r[0]]=g[r[0]]||[0,0]);
 D.forEach((y,n)=>{if(!y.sun){const q=g[T[y.t][0]];q[1]++;if(S.done[n+".0"])q[0]++}});
 $("#subj").innerHTML="<h2>Teoria concluída por área</h2>"+Object.keys(g).map(c=>`<div class="${c}"><div style="color:var(--ink)">${GN[c]} <span class="lab">${g[c][0]} de ${g[c][1]} dias</span></div><div class="bar"><i style="width:${g[c][0]/g[c][1]*100}%"></i></div></div>`).join("")+`<div class="sub">Revisões nos dias 1, 7 e 30 após cada tema. Domingos: simulado e redação.</div>`;
 let h="<h2>Calendário</h2>";
 [[2026,10],[2026,11],[2027,0]].forEach(([y,m])=>{
  const f=new Date(y,m,1),n=new Date(y,m+1,0).getDate();
  h+=`<div class="mon"><h3>${f.toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</h3><div class="cal">`+"DSTQQSS".split("").map(c=>`<div class="dw">${c}</div>`).join("")+"<div></div>".repeat(f.getDay());
  for(let d=1;d<=n;d++){const dt=new Date(y,m,d),idx=Math.round((dt-new Date(2026,10,9))/864e5),inn=idx>=0&&idx<61,key=KEY[iso(dt)];
   const cl=["c",inn?(D[idx].sun?"gS":"g"+T[D[idx].t][0]):"out",inn?st(idx):"",inn&&idx==S.sel?"sel":"",inn&&idx==today&&new Date()<=new Date(2027,0,9)?"today":""].join(" ");
   h+=`<button class="${cl}" ${inn?`data-d="${idx}"`:""} aria-label="${dt.toLocaleDateString("pt-BR")}">${d}${key?`<small>${key}</small>`:""}${inn&&!D[idx].sun?`<small style="color:var(--mut);font-weight:400">${T[D[idx].t][1].slice(0,13)}</small>`:""}</button>`}
  h+="</div></div>"});
 $("#cal").innerHTML=h+`<div class="sub"><span class="tag E">Informática Forense</span><span class="tag P">Perito comum</span><span class="tag J">Jurídicas</span><span class="tag B">Básicas</span> Entre 9 e 23 de janeiro ficam 16 dias de margem para revisão livre antes da prova.</div>`}
document.addEventListener("click",e=>{const c=e.target.closest("[data-d]");if(c){S.sel=+c.dataset.d;save();render()}});
document.addEventListener("change",e=>{const k=e.target.dataset&&e.target.dataset.k;if(k){e.target.checked?S.done[k]=1:delete S.done[k];save();render()}});
$("#wk").value=S.wk;$("#we").value=S.we;
$("#wk").onchange=e=>{S.wk=e.target.value||"19:00";save();render()};
$("#we").onchange=e=>{S.we=e.target.value||"09:00";save();render()};
const ap=()=>{if(S.theme)document.documentElement.dataset.theme=S.theme};
if(!S.theme)S.theme="dark";ap();
$("#th").onclick=()=>{S.theme=S.theme=="dark"?"light":"dark";ap();save()};
$("#rs").onclick=()=>{if(confirm("Apagar todo o progresso marcado?")){S.done={};S.sel=today;save();render()}};
render();

/* Exportar e importar progresso (JSON) */
$("#ex").onclick=()=>dl("progresso-pcac.json",JSON.stringify({done:S.done,wk:S.wk,we:S.we}),"application/json");
$("#im").onclick=()=>$("#fi").click();
$("#fi").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const j=JSON.parse(r.result);S.done=j.done||{};S.wk=j.wk||S.wk;S.we=j.we||S.we;$("#wk").value=S.wk;$("#we").value=S.we;save();render()}catch(x){alert("Arquivo inválido.")}};r.readAsText(f)};
/* Agenda .ics para importar no Google Calendar (fuso America/Rio_Branco) */
function dl(n,c,t){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:t}));a.download=n;document.body.appendChild(a);a.click();a.remove()}
$("#ics").onclick=()=>{
 const f=(d,m)=>d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(Math.floor(m/60))+pad(m%60)+"00";
 let o="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//PCAC Plano de Estudos//PT\r\nCALSCALE:GREGORIAN\r\nX-WR-TIMEZONE:America/Rio_Branco\r\n";
 D.forEach((x,i)=>{let t=start(i);blocks(i).forEach((b,j)=>{const a=t;t+=b[1];
  o+="BEGIN:VEVENT\r\nUID:pcac-"+i+"-"+j+"@plano-pcac\r\nDTSTAMP:20261107T000000Z\r\nDTSTART;TZID=America/Rio_Branco:"+f(x.d,a)+"\r\nDTEND;TZID=America/Rio_Branco:"+f(x.d,t)+"\r\nSUMMARY:"+b[0].replace(/[,;]/g," ")+"\r\nDESCRIPTION:PCAC Perito Informática Forense - dia "+(i+1)+" de 61\r\nEND:VEVENT\r\n"})});
 dl("plano-pcac.ics",o+"END:VCALENDAR\r\n","text/calendar")};
