const FONT=[[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[2,0,0,0,0,128,128,128,128,128,128,0,128,0,0,0,0],[4,0,0,0,0,160,160,160,0,0,0,0,0,0,0,0,0],[9,0,0,0,0,18,20,127,36,36,254,40,72,0,0,0,0],[6,0,0,0,0,32,120,160,160,112,40,40,240,32,32,0,0],[9,0,0,0,0,98,148,148,104,11,20,20,35,0,0,0,0],[9,0,0,0,0,48,72,64,96,145,138,196,123,0,0,0,0],[2,0,0,0,0,128,128,128,0,0,0,0,0,0,0,0,0],[3,0,0,0,64,128,128,128,128,128,128,128,128,64,0,0,0],[3,0,0,0,128,128,64,64,64,64,64,64,128,128,0,0,0],[6,0,0,0,0,32,168,112,112,168,32,0,0,0,0,0,0],[8,0,0,0,0,0,16,16,16,254,16,16,16,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,128,128,0,0,0],[4,0,0,0,0,0,0,0,0,224,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,0],[5,0,0,0,0,16,48,32,32,96,64,64,192,128,0,0,0],[6,0,0,0,0,112,216,136,136,136,136,216,112,0,0,0,0],[6,0,0,0,0,224,32,32,32,32,32,32,248,0,0,0,0],[6,0,0,0,0,112,136,8,8,16,32,64,248,0,0,0,0],[6,0,0,0,0,112,136,8,112,8,8,136,112,0,0,0,0],[7,0,0,0,0,8,24,40,72,136,252,8,8,0,0,0,0],[6,0,0,0,0,240,128,128,240,8,8,8,240,0,0,0,0],[6,0,0,0,0,56,64,128,240,136,136,136,112,0,0,0,0],[6,0,0,0,0,248,8,16,16,32,32,32,64,0,0,0,0],[6,0,0,0,0,112,136,136,112,136,136,136,112,0,0,0,0],[6,0,0,0,0,112,136,136,136,120,8,16,224,0,0,0,0],[2,0,0,0,0,0,0,128,0,0,0,0,128,0,0,0,0],[2,0,0,0,0,0,0,128,0,0,0,0,128,128,0,0,0],[8,0,0,0,0,0,0,2,28,224,224,28,2,0,0,0,0],[8,0,0,0,0,0,0,0,254,0,254,0,0,0,0,0,0],[8,0,0,0,0,0,0,128,112,14,14,112,128,0,0,0,0],[5,0,0,0,0,224,16,48,96,64,64,0,64,0,0,0,0],[9,0,0,0,0,30,99,64,140,148,149,142,64,98,28,0,0],[8,0,0,0,0,16,40,40,40,68,124,68,130,0,0,0,0],[7,0,0,0,0,248,132,132,248,132,132,132,248,0,0,0,0],[7,0,0,0,0,56,68,128,128,128,128,68,56,0,0,0,0],[7,0,0,0,0,240,136,132,132,132,132,136,240,0,0,0,0],[6,0,0,0,0,248,128,128,248,128,128,128,248,0,0,0,0],[6,0,0,0,0,248,128,128,248,128,128,128,128,0,0,0,0],[8,0,0,0,0,60,66,128,128,142,130,66,60,0,0,0,0],[7,0,0,0,0,132,132,132,252,132,132,132,132,0,0,0,0],[2,0,0,0,0,128,128,128,128,128,128,128,128,0,0,0,0],[4,0,0,0,0,32,32,32,32,32,32,32,32,32,192,0,0],[7,0,0,0,0,136,144,160,192,160,144,136,132,0,0,0,0],[6,0,0,0,0,128,128,128,128,128,128,128,248,0,0,0,0],[8,0,0,0,0,130,198,198,170,170,146,130,130,0,0,0,0],[7,0,0,0,0,196,196,164,164,148,148,140,140,0,0,0,0],[8,0,0,0,0,56,68,130,130,130,130,68,56,0,0,0,0],[6,0,0,0,0,240,136,136,136,240,128,128,128,0,0,0,0],[8,0,0,0,0,56,68,130,130,130,130,68,56,12,0,0,0],[7,0,0,0,0,240,136,136,136,240,144,136,132,0,0,0,0],[7,0,0,0,0,120,132,128,240,12,4,132,120,0,0,0,0],[8,0,0,0,0,254,16,16,16,16,16,16,16,0,0,0,0],[7,0,0,0,0,132,132,132,132,132,132,204,120,0,0,0,0],[8,0,0,0,0,130,130,68,68,40,40,16,16,0,0,0,0],[9,0,0,0,0,136,136,73,85,85,85,34,34,0,0,0,0],[8,0,0,0,0,198,68,40,16,16,40,68,198,0,0,0,0],[8,0,0,0,0,130,68,40,16,16,16,16,16,0,0,0,0],[8,0,0,0,0,254,4,8,16,16,32,64,254,0,0,0,0],[3,0,0,0,0,192,128,128,128,128,128,128,128,128,192,0,0],[5,0,0,0,0,128,192,64,64,96,32,32,48,16,0,0,0],[3,0,0,0,0,192,64,64,64,64,64,64,64,64,192,0,0],[8,0,0,0,0,56,108,198,0,0,0,0,0,0,0,0,0],[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,252,0],[3,0,0,0,128,64,0,0,0,0,0,0,0,0,0,0,0],[6,0,0,0,0,0,0,112,8,120,136,136,120,0,0,0,0],[6,0,0,0,128,128,128,240,136,136,136,136,240,0,0,0,0],[5,0,0,0,0,0,0,112,128,128,128,128,112,0,0,0,0],[6,0,0,0,8,8,8,120,136,136,136,136,120,0,0,0,0],[6,0,0,0,0,0,0,112,136,248,128,200,112,0,0,0,0],[5,0,0,0,48,64,64,240,64,64,64,64,64,0,0,0,0],[6,0,0,0,0,0,0,120,136,136,136,136,120,8,112,0,0],[6,0,0,0,128,128,128,240,136,136,136,136,136,0,0,0,0],[2,0,0,0,0,128,0,128,128,128,128,128,128,0,0,0,0],[3,0,0,0,0,64,0,64,64,64,64,64,64,64,192,0,0],[6,0,0,0,128,128,128,144,160,192,160,144,136,0,0,0,0],[2,0,0,0,128,128,128,128,128,128,128,128,128,0,0,0,0],[9,0,0,0,0,0,0,238,145,145,145,145,145,0,0,0,0],[6,0,0,0,0,0,0,240,136,136,136,136,136,0,0,0,0],[6,0,0,0,0,0,0,112,136,136,136,136,112,0,0,0,0],[6,0,0,0,0,0,0,240,136,136,136,136,240,128,128,0,0],[6,0,0,0,0,0,0,120,136,136,136,136,120,8,8,0,0],[5,0,0,0,0,0,0,176,192,128,128,128,128,0,0,0,0],[6,0,0,0,0,0,0,112,136,224,24,136,112,0,0,0,0],[5,0,0,0,0,64,64,240,64,64,64,64,112,0,0,0,0],[6,0,0,0,0,0,0,136,136,136,136,136,120,0,0,0,0],[7,0,0,0,0,0,0,132,132,72,72,48,48,0,0,0,0],[8,0,0,0,0,0,0,146,146,170,170,68,68,0,0,0,0],[7,0,0,0,0,0,0,132,72,48,48,72,132,0,0,0,0],[7,0,0,0,0,0,0,132,132,72,72,48,48,32,192,0,0],[6,0,0,0,0,0,0,248,8,16,32,64,248,0,0,0,0],[6,0,0,0,0,56,32,32,32,192,32,32,32,32,56,0,0],[2,0,0,0,0,128,128,128,128,128,128,128,128,128,128,128,0],[6,0,0,0,0,224,32,32,32,24,32,32,32,32,224,0,0],[8,0,0,0,0,0,0,0,114,156,0,0,0,0,0,0,0],[8,0,0,0,0,0,0,0,0,0,0,0,170,0,0,0,0]];
(function(){
'use strict';
var css=function(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#fff'};
var C={ink:css('--fg'),dim:css('--dim'),yel:css('--yel'),mag:css('--mag'),cyan:css('--cyan')||'#3ee6d4',deep:css('--deep'),line:css('--line')};
function glyph(ch){var c=ch.charCodeAt(0);if(c<32||c>126)c=63;return FONT[c-32]}
function adv(ch){return glyph(ch)[0]}
function textW(s){var w=0;for(var i=0;i<s.length;i++)w+=adv(s[i]);return w}
function el(tag,attrs,kids){var e=document.createElement(tag);for(var k in attrs||{}){if(k==='text')e.textContent=attrs[k];else e.setAttribute(k,attrs[k])}(kids||[]).forEach(function(c){e.appendChild(c)});return e}
function canvas(w,h){var c=el('canvas',{width:w,height:h,class:'dcv'});c.style.aspectRatio=w+'/'+h;return c}
function put(ctx,ch,x,y,col){var g=glyph(ch);ctx.fillStyle=col;for(var r=0;r<16;r++){var b=g[r+1];for(var k=0;k<8;k++)if(b>>(7-k)&1)ctx.fillRect(x+k,y+r,1,1)}}
function field(label,input){return el('label',{class:'dfield'},[el('span',{text:label}),input])}
function readout(){return el('div',{class:'dread','aria-live':'polite'})}
function wrapPx(s,limit){var out=[],cur='',words=s.split(' ');words.forEach(function(w){var t=cur?cur+' '+w:w;if(textW(t)<=limit||!cur)cur=t;else{out.push(cur);cur=w}});if(cur)out.push(cur);return out}

/* 1. fixed cells vs proportional */
function width(root){
  var inp=el('input',{type:'text',value:"Frankly, this is big trouble, y'know!",maxlength:'120',spellcheck:'false'});
  var a=canvas(176,16*4),b=canvas(176,16*4),ro=readout();
  root.appendChild(field('Type a line',inp));
  root.appendChild(el('div',{class:'dcols'},[
    el('div',{},[el('div',{class:'dlabel',text:'ORIGINAL ENGINE: 16 px per character'}),a]),
    el('div',{},[el('div',{class:'dlabel',text:'NEW RENDERER: each letter its own width'}),b])]));root.appendChild(ro);
  function go(){
    var s=inp.value.replace(/[^\x20-\x7e]/g,'?'),ca=a.getContext('2d'),cb=b.getContext('2d');
    var la=[];for(var i=0;i<s.length;i+=11)la.push(s.slice(i,i+11));
    var lb=wrapPx(s,176);
    function fit(c,n){n=Math.min(4,Math.max(1,n));c.height=n*16;c.style.aspectRatio='176/'+n*16}
    fit(a,la.length);fit(b,lb.length);ca=a.getContext('2d');cb=b.getContext('2d');
    ca.strokeStyle=C.line;
    la.slice(0,4).forEach(function(l,r){for(var c=0;c<11;c++){ca.strokeRect(c*16+.5,r*16+.5,15,15)}for(var i=0;i<l.length;i++)put(ca,l[i],i*16+4,r*16,C.dim)});
    lb.slice(0,4).forEach(function(l,r){var x=0;for(var i=0;i<l.length;i++){put(cb,l[i],x,r*16,C.yel);x+=adv(l[i])}
      cb.fillStyle=C.mag;cb.fillRect(x,r*16+14,Math.max(0,176-x),1)});
    ro.innerHTML='<b>'+s.length+'</b> characters &middot; fixed cells: <b>'+la.length+'</b> line'+(la.length==1?'':'s')+' of 11 &middot; proportional: <b>'+textW(s)+' px</b> in <b>'+lb.length+'</b> line'+(lb.length==1?'':'s')+' of 176'+((la.length>4||lb.length>4)?' (preview shows 4)':'');
  }
  inp.addEventListener('input',go);go();
}

/* 2. stamping one glyph at a pen position */
function stamp(root){
  var ch=el('input',{type:'text',value:'W',maxlength:'1',class:'dshort',spellcheck:'false'});
  var xs=el('input',{type:'range',min:'0',max:'160',value:'13'}),xo=el('output');
  var S=10,cv=canvas(32*S,16*S+0),ro=readout();
  root.appendChild(el('div',{class:'drow'},[field('Letter',ch),field('Pen x (pixels)',xs),xo]));
  var side=el('div',{class:'dside'},[ro]);root.appendChild(el('div',{class:'dcols dstamp'},[cv,side]));
  function hex(n,d){return '$'+('0000'+n.toString(16).toUpperCase()).slice(-d)}
  function go(){
    var c=(ch.value||'W')[0],x=+xs.value,g=glyph(c),cell0=x>>4,ox=cell0*16,ctx=cv.getContext('2d'),sh=x&7;
    xo.textContent=x+' px';
    ctx.clearRect(0,0,cv.width,cv.height);
    var t1=x>>3;
    for(var r=0;r<16;r++)for(var k=0;k<8;k++)if(g[r+1]>>(7-k)&1){
      var px=x+k-ox;ctx.fillStyle=((x+k)>>3)===t1?C.yel:C.mag;ctx.fillRect(px*S,r*S,S-1,S-1)}
    ctx.strokeStyle=C.line;ctx.lineWidth=1;
    for(var i=0;i<=4;i++){ctx.beginPath();ctx.moveTo(i*8*S+.5,0);ctx.lineTo(i*8*S+.5,cv.height);ctx.stroke()}
    ctx.beginPath();ctx.moveTo(0,8*S+.5);ctx.lineTo(cv.width,8*S+.5);ctx.stroke();
    ctx.strokeStyle=C.cyan;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(16*S,0);ctx.lineTo(16*S,cv.height);ctx.stroke();
    var spill=sh>0&&(g.slice(1).some(function(b){return (b&((1<<sh)-1))!==0}));
    var offA=cell0*0x40+((x&8)?0x10:0),x2=x+8,offB=(x2>>4)*0x40+((x2&8)?0x10:0);
    ro.innerHTML='cell <b>'+cell0+'</b>, '+((x&8)?'right':'left')+' tile &middot; shift <b>'+sh+'</b> &middot; buffer offset <b>'+hex(offA,4)+'</b>'+
      (sh? ' + spill into the next tile at <b>'+hex(offB,4)+'</b>'+(spill?'':' (nothing lands there for this letter)'):' &middot; lands exactly on one tile, no spill')+
      '<br><span class="k1">yellow</span> = pixels in the first tile &middot; <span class="k2">magenta</span> = spilled into the next &middot; cyan line = cell border &middot; advance after drawing: <b>'+g[0]+' px</b> (pen becomes '+(x+g[0])+')';
  }
  ch.addEventListener('input',go);xs.addEventListener('input',go);go();
}

/* 3. text speed */
function ticks(root){
  var text="Frankly, this is big trouble,\ny'know!";
  var btn=el('button',{type:'button',text:'Play'}),rows=[],ro=readout();
  var modes=[{n:'Original, Japanese: 11 chars a line, 1 per tick',per:1,jp:true,s:'ここはどうしても大変だよ\nということ'},
    {n:'English, 1 per tick',per:1},{n:'English, 2 per tick (the patch)',per:2}];
  root.appendChild(btn);
  modes.forEach(function(m){var pre=el('pre',{class:'dtype'}),lab=el('div',{class:'dlabel',text:m.n}),t=el('span',{class:'dticks'});
    root.appendChild(lab);root.appendChild(pre);m.pre=pre;m.t=t;lab.appendChild(t);m.src=m.s||text;m.pos=0;m.tk=0});
  root.appendChild(ro);
  var timer=null;
  function step(m){
    if(m.pos>=m.src.length)return;
    function printable(c){return c&&c!=='\n'}
    m.tk++;
    var c=m.src[m.pos++];m.pre.textContent+=c;
    if(m.per===2&&printable(c)&&printable(m.src[m.pos])){m.pre.textContent+=m.src[m.pos++]}
    m.t.textContent='  tick '+m.tk;
  }
  function reset(){modes.forEach(function(m){m.pos=0;m.tk=0;m.pre.textContent='';m.t.textContent=''})}
  function done(){return modes.every(function(m){return m.pos>=m.src.length})}
  btn.addEventListener('click',function(){
    clearInterval(timer);reset();btn.textContent='Replay';btn.disabled=true;
    var quick=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function finish(){clearInterval(timer);btn.disabled=false;ro.textContent='Same text, same engine: '+modes.map(function(m){return m.tk}).join(' / ')+' ticks (Japanese / English one per tick / English two per tick). A newline is a control code, so the second character of a pair is never taken from it.'}
    if(quick){var g=0;while(!done()&&g++<500)modes.forEach(step);finish();return}
    timer=setInterval(function(){modes.forEach(step);if(done())finish()},90);
  });
  ro.textContent='Press Play. The speed here is arbitrary; compare the tick counts, not the clock.';
}

/* 4. the referee */
function referee(root){
  var cards={'Brainbuster':[60,13,8],'Dropkick':[56,14,8],'Lariat':[44,10,24],'Elbow':[48,12,24],'Tiger Suplex':[52,9,52],'Front Neck Lock':[28,8,40]};
  var sel=el('select');Object.keys(cards).forEach(function(k){sel.appendChild(el('option',{text:k,value:k}))});
  var hp=el('input',{type:'range',min:'0',max:'255',value:'255'}),hpo=el('output');
  var gd=el('input',{type:'range',min:'0',max:'120',value:'0'}),gdo=el('output');
  var lit=el('input',{type:'checkbox'});
  var cv=el('canvas',{class:'dcv'}),ro=readout();cv.style.height='86px';
  root.appendChild(el('div',{class:'drow'},[field('Attacker plays',sel),field('Defender health',hp),hpo]));
  root.appendChild(el('div',{class:'drow'},[field('Guard spent by defender',gd),gdo,field('Glowing signature card',lit)]));
  root.appendChild(cv);root.appendChild(ro);
  function go(){
    var c=cards[sel.value],P=c[0],R=c[1],H=+hp.value,L=lit.checked?80:0,G=+gd.value;
    var bonus=(255-H)>>2,base=109+P+L+bonus,def=104+G;
    hpo.textContent=H+' HP (bonus +'+bonus+')';gdo.textContent=G;
    var hold=0,tot=256;for(var b=0;b<256;b++){var a=base+((b*R)>>8);if(!(a<def))hold++}
    var pct=Math.round(hold/tot*100),lo=base,hi=base+((255*R)>>8);
    var dpr=window.devicePixelRatio||1,W=Math.max(260,Math.floor(cv.parentNode.clientWidth-30));
    if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(86*dpr);cv.style.width=W+'px'}
    var ctx=cv.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);var sc=W/340;
    ctx.clearRect(0,0,W,86);
    ctx.fillStyle=C.deep;ctx.fillRect(0,0,W,86);
    ctx.fillStyle=C.dim;ctx.font='12px monospace';
    for(var v=0;v<=340;v+=50){ctx.fillRect(v*sc,66,1,6);ctx.fillText(v,v*sc+3,82)}
    ctx.fillStyle=C.yel;ctx.fillRect(lo*sc,26,Math.max(3,(hi-lo+1)*sc),18);
    var at='attack '+lo+(hi>lo?'..'+hi:''),ax=lo*sc+(hi-lo+1)*sc+8;if(ax+ctx.measureText(at).width>W)ax=lo*sc-ctx.measureText(at).width-8;
    ctx.fillText(at,Math.max(4,ax),40);ctx.fillStyle=C.yel;ctx.fillText(at,Math.max(4,ax),40);
    ctx.fillStyle=C.mag;ctx.fillRect(def*sc-1,16,3,44);
    var dt='defence '+def,dx=def*sc+8;if(dx+ctx.measureText(dt).width>W)dx=def*sc-ctx.measureText(dt).width-8;ctx.fillText(dt,dx,14);
    var verdict=lo>=def?'The move <b>always lands</b>.':hi<def?'The move is <b>always reversed</b>.':'The move lands <b>'+pct+'%</b> of the time (depends on the random byte).';
    ro.innerHTML='Attack = 109 + '+P+' power + rand(0..'+(R-1)+')'+(L?' + 80 lit':'')+' + '+bonus+' (health bonus) = <b>'+lo+(hi>lo?' to '+hi:'')+'</b><br>Defence = 104 + '+G+' guard = <b>'+def+'</b>. Reversed only if attack &lt; defence, so a tie lands. '+verdict;
  }
  [sel,hp,gd,lit].forEach(function(e){e.addEventListener('input',go)});go();
  if(window.ResizeObserver)new ResizeObserver(function(){go()}).observe(root);
}

/* 5. one move, start to finish */
function flow(root){
  var NS='http://www.w3.org/2000/svg';
  function sv(tag,attrs,text){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;return e}
  var N={
    neutral:{x:0,y:30,w:120,h:64,a:'NEUTRAL',b:'$3C = 5',code:'$C0:C5F3',d:'Both wrestlers circle and every ready card is an attack. Whoever presses first starts a move. If both press on the same frame, the player wins.'},
    starts:{x:145,y:30,w:120,h:64,a:'ATTACK STARTS',b:'$3C = 6',code:'$C0:C659',d:'The card goes on cooldown and the Attack number is fixed: 109 + Power + a random bit + a bonus for how hurt the victim is. The game waits until both wrestlers are free.'},
    script:{x:290,y:30,w:120,h:64,a:'MOVE PLAYS',b:'$3C = 7',code:'$C0:C6BB',d:'The animation script runs. The defender can press ready cards now, and each one adds its Guard to the defence number. Presses before the move starts never count.'},
    check:{x:435,y:30,w:120,h:64,a:'CHECK',b:'script op $03',code:'$C0:ED18',d:'One comparison. Attack below defence means reversed. Attack equal to or above defence means the move lands.'},
    rev:{x:580,y:0,w:130,h:56,a:'REVERSED',b:'fail branch plays',code:'$C0:ED3D',d:'Roles swap and every value resets to zero. The old attacker’s card gets a Fail point, and the script jumps to its hand-made fail animation.'},
    land:{x:580,y:78,w:130,h:56,a:'LANDS',b:'animation goes on',code:'$C0:EC14',d:'The script pointer skips the three bytes of the check and the animation carries on as if nothing happened.'},
    over:{x:580,y:190,w:130,h:64,a:'SCRIPT OVER',b:'$3C = 3',code:'$C0:C4BA',d:'Damage is applied: the card’s damage on a hit, or the fail branch’s fixed number on a reversal. Then the wrestler’s end pose is read.'},
    pose:{x:435,y:190,w:120,h:64,a:'POSE DECIDES',b:'down / pin / none',code:'$C0:C502',d:'The end pose of the animation says what happens next: the victim goes down, the attacker gets an automatic pin, or nobody is down.'}
  };
  var order=['neutral','starts','script','check','branch','over','pose','neutral'];
  var step=0,roll=0,attack=0,guard=0,locked=false,branch='land',timer=null;
  var gd=el('input',{type:'range',min:'0',max:'120',value:'0'}),gdo=el('output');
  var next=el('button',{type:'button',text:'Step'}),auto=el('button',{type:'button',text:'Auto'});
  var svg=sv('svg',{viewBox:'-2 -2 724 274',role:'img','aria-label':'State diagram of one move: neutral, attack starts, move plays, check, reversed or lands, script over, pose decides'});
  svg.setAttribute('class','dsvg');
  var defs=sv('defs',{});var mk=sv('marker',{id:'ah'+Math.random().toString(36).slice(2,6),markerWidth:'8',markerHeight:'8',refX:'7',refY:'4',orient:'auto'});mk.appendChild(sv('path',{d:'M0,0 L8,4 L0,8 z',fill:C.dim}));defs.appendChild(mk);svg.appendChild(defs);
  var mid=mk.getAttribute('id');
  function arrow(d,dash){var p=sv('path',{d:d,fill:'none',stroke:C.dim,'stroke-width':'1.5','marker-end':'url(#'+mid+')'});if(dash)p.setAttribute('stroke-dasharray','4 3');svg.appendChild(p);return p}
  arrow('M120,62 L143,62');arrow('M265,62 L288,62');arrow('M410,62 L433,62');
  arrow('M555,52 L578,30');arrow('M555,72 L578,104');
  arrow('M710,28 L716,28 L716,222 L712,222');arrow('M645,134 L645,188');
  arrow('M580,222 L557,222');arrow('M435,222 L60,222 L60,96');
  svg.appendChild(sv('text',{x:250,y:244,fill:C.dim,'font-size':'11','font-family':'monospace','text-anchor':'middle'},'next frame: back to neutral'));
  var boxes={};
  Object.keys(N).forEach(function(k){var n=N[k],g=sv('g',{});
    var r=sv('rect',{x:n.x,y:n.y,width:n.w,height:n.h,fill:C.deep,stroke:C.line,'stroke-width':'2'});
    g.appendChild(r);
    g.appendChild(sv('text',{x:n.x+n.w/2,y:n.y+n.h/2-2,fill:C.ink,'font-size':'12','font-weight':'700','font-family':'monospace','text-anchor':'middle'},n.a));
    g.appendChild(sv('text',{x:n.x+n.w/2,y:n.y+n.h/2+14,fill:C.dim,'font-size':'11','font-family':'monospace','text-anchor':'middle'},n.b));
    svg.appendChild(g);boxes[k]=r});
  var info=el('div',{class:'dflow','aria-live':'polite'}),nums=readout();
  root.appendChild(el('div',{class:'drow'},[next,auto,field('Guard the defender spends before the check',gd),gdo]));
  root.appendChild(svg);root.appendChild(info);root.appendChild(nums);
  function paint(active){
    Object.keys(boxes).forEach(function(k){var r=boxes[k];r.setAttribute('stroke',C.line);r.setAttribute('fill',C.deep);r.removeAttribute('stroke-dasharray')});
    for(var i=0;i<=step;i++){var k=order[i];if(k==='branch')k=branch==='rev'?'rev':'land';boxes[k].setAttribute('stroke',C.cyan)}
    if(step>=4){var other=branch==='rev'?'land':'rev';boxes[other].setAttribute('stroke',C.line);boxes[other].setAttribute('stroke-dasharray','4 3')}
    var a=order[step];if(a==='branch')a=branch==='rev'?'rev':'land';
    boxes[a].setAttribute('stroke',branch==='rev'&&a==='rev'?C.mag:C.yel);boxes[a].setAttribute('fill','rgba(255,225,74,.12)');
    if(a==='rev')boxes[a].setAttribute('fill','rgba(255,47,135,.14)');
  }
  function show(){
    var k=order[step];if(k==='branch')k=branch==='rev'?'rev':'land';
    var n=N[k];
    info.innerHTML='<b>'+n.a+'</b> <span class="dcode">'+n.code+'</span><br>'+n.d;
    var def=104+guard,t='';
    if(step>=1)t+='Attack = 109 + 60 power + '+(attack-169)+' (random) = <b>'+attack+'</b>. ';
    if(step>=3)t+='Defence = 104 + '+guard+' guard = <b>'+def+'</b>. '+attack+(attack<def?' < ':' ≥ ')+def+', so the move is <b>'+(attack<def?'reversed':'landed')+'</b>.';
    nums.innerHTML=t||'Brainbuster, full health. Press Step to run it one state at a time.';
    paint();
    next.textContent=step>=order.length-1?'Again':'Step';
  }
  function go(){
    if(step>=order.length-1){step=0;locked=false;gd.disabled=false;roll=Math.floor(Math.random()*256);attack=109+60+((roll*13)>>8);show();return}
    step++;
    if(order[step]==='check'){locked=true;gd.disabled=true;guard=+gd.value}
    if(order[step]==='branch')branch=attack<104+guard?'rev':'land';
    show();
  }
  roll=Math.floor(Math.random()*256);attack=109+60+((roll*13)>>8);
  gd.addEventListener('input',function(){gdo.textContent=gd.value;if(!locked)guard=+gd.value;show()});gdo.textContent='0';
  next.addEventListener('click',function(){clearInterval(timer);auto.textContent='Auto';go()});
  auto.addEventListener('click',function(){
    if(timer){clearInterval(timer);timer=null;auto.textContent='Auto';return}
    var quick=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(quick){while(step<order.length-1)go();return}
    auto.textContent='Stop';if(step>=order.length-1)go();
    timer=setInterval(function(){go();if(step>=order.length-1){clearInterval(timer);timer=null;auto.textContent='Auto'}},1100);
  });
  show();
}

var M={width:width,stamp:stamp,ticks:ticks,referee:referee,flow:flow};
var T={width:'Type a line',stamp:'Slide a letter across the buffer',ticks:'Compare text speeds',referee:'Hit a wrestler',flow:'Step through one move'};
function mount(r){
  var f=M[r.getAttribute('data-demo')];if(!f)return;
  var body=r.querySelector('.dbody'),name=r.getAttribute('data-demo');
  var head=el('div',{class:'dhead'},[el('span',{},[el('b',{text:'INTERACTIVE'}),el('span',{text:'  '+(T[name]||'')})])]);
  var reset=el('button',{type:'button',text:'Reset','aria-label':'Reset this figure'});head.appendChild(reset);
  r.insertBefore(head,body);
  function run(){body.textContent='';f(body)}
  reset.addEventListener('click',run);run();
}
document.querySelectorAll('[data-demo]').forEach(mount);
})();
