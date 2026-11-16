/* Flipp-Out - eigenstaendiges Spielmodul (ohne Abhaengigkeiten, kein Build).
 * Einbinden: <div data-flippout data-mode="breakout|golf" data-label="Titel"></div>
 *            <link rel="stylesheet" href="flippout.css"><script src="flippout.js"></script>
 * Oder per Code: Flippout.mount(element, {mode:'breakout', label:'Flipp-Out'}) */
(function(){
  var TPL = "<section class=\"golf-game amiga\" data-golf-game data-mode=\"{{ mode }}\">\n  <div class=\"amiga-bar\"><span class=\"tl\"><b></b><b></b><b class=\"tl-g\" data-bare title=\"Vollbild: Rahmen und Sidebar ausblenden (F2)\" role=\"button\" aria-label=\"Vollbild\"></b></span><span class=\"amiga-title\">{{ label }}</span><button type=\"button\" class=\"amiga-bare\" data-bare title=\"Rahmen aus/ein (F2)\" aria-label=\"Rahmen ausblenden\">\u26f6</button><span class=\"amiga-info\" tabindex=\"0\">\u24d8<span class=\"amiga-tip\">B = Shop \u00b7 Tab = Autopilot/Ambience an/aus \u00b7 Klick f\u00e4ngt die Maus (Esc = loslassen) \u00b7 Maus = zielen (Abschlag), im Spiel = Balken verschieben \u00b7 Linksklick/Rechtsklick halten = Schlag laden, loslassen = schlagen \u00b7 Linksklick/Leertaste halten = Kraft aufladen, loslassen = Abschlag \u00b7 \u25c0 \u25b6 oder A/D alternativ \u00b7 Goldene (leuchtende) Bumper geben bei Treffern Gold \u00b7 nach jedem Level kaufst du im Shop die roten Banden (Taste 1) und mehr Ball-Ladung (Taste 2) \u2013 oder per Klick \u00b7 Bumper, Flugzeuge, H\u00e4user & kleine Trampoline gehen nach mehreren Treffern kaputt und geben Bonuspunkte \u00b7 LEERTASTE: halten = Kraft/Balken laden, loslassen = Schlag \u00b7 Shift+Leertaste im Spiel = Stups nach oben (Ghost Shot)</span></span></div>\n  <button type=\"button\" class=\"amiga-fab\" data-bare title=\"Rahmen einblenden (F2)\" aria-label=\"Rahmen einblenden\">\u26f6</button>\n  <div class=\"amiga-view\"><div class=\"amiga-hot\"></div><canvas class=\"amiga-screen\" data-golf-canvas width=\"300\" height=\"225\" tabindex=\"0\"></canvas></div>\n  <div class=\"amiga-pad\">\n    <button type=\"button\" data-k=\"l\">\u25c0 FLIPPER</button>\n    <button type=\"button\" data-k=\"s\">SCHLAG</button>\n    <button type=\"button\" data-k=\"r\">FLIPPER \u25b6</button>\n  </div>\n</section>";
  function esc(v){ return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function start(game) {
  var cv = game.querySelector('canvas'), g = cv.getContext('2d');
  var W = 300, H = 225, cx = 150, view = cv.parentNode; // festes Format 4:3
  cv.width=W; cv.height=H;
  // 16-color Amiga-style palette
  var C0 = ['#000000','#ffffff','#dd0000','#ff8800','#ffdd00','#00aa00','#006600','#0055aa','#00aaff','#aa00ff','#aa6622','#888888','#444444','#ff99aa','#00ffdd','#222200'];
  var C = C0.slice();
  // ---- Stile (Farbpaletten) und Grafikqualitaeten: im Shop kaufbar, danach frei umschaltbar, bleiben gespeichert ----
  var STYLES=[{id:'amiga',n:'AMIGA',c:0,d:'ORIGINAL 16 FARBEN'},{id:'gb',n:'GAMEBOY',c:150,d:'VIER GRUENTOENE'},{id:'c64',n:'C64',c:200,d:'COMMODORE FARBEN'},{id:'neon',n:'NEON',c:250,d:'LEUCHTENDE FARBEN'},{id:'sepia',n:'SEPIA',c:120,d:'ALTES FOTO'},
    {id:'psx',n:'PSX',c:180,d:'GRAUE 90ER KONSOLE'},{id:'calc',n:'RECHNER',c:140,d:'TASCHENRECHNER LCD'},{id:'vapor',n:'VAPORWAVE',c:220,d:'ROSA UND TUERKIS'},{id:'vb',n:'VBOY',c:160,d:'ROT AUF SCHWARZ'},
    {id:'cga',n:'CGA',c:120,d:'CYAN MAGENTA WEISS'},{id:'zx',n:'SPECTRUM',c:140,d:'8 HELLE FARBEN'},{id:'amber',n:'AMBER',c:100,d:'BERNSTEIN MONITOR'},{id:'matrix',n:'MATRIX',c:130,d:'GRUENER CODE'},
    {id:'blue',n:'BLAUPAUSE',c:110,d:'WEISS AUF BLAU'},{id:'noir',n:'NOIR',c:90,d:'SCHWARZ WEISS'},{id:'sunset',n:'SUNSET',c:150,d:'ABENDROT VERLAUF'},{id:'ice',n:'EIS',c:110,d:'KALTES BLAU'},{id:'lava',n:'LAVA',c:130,d:'GLUT UND FEUER'}];
  var QUAL=[{id:'sharp',n:'SCHARF',c:0,d:'SCHARFE PIXEL'},{id:'soft',n:'WEICH',c:80,d:'GLATTE PIXEL'},{id:'crt',n:'CRT',c:180,d:'BILDROEHRE MIT ZEILEN'},{id:'bloom',n:'BLOOM',c:220,d:'LEUCHTENDER SCHEIN'},{id:'psx',n:'PSX',c:200,d:'DITHER UND WACKELN'},{id:'lcd',n:'LCD',c:150,d:'PIXELGITTER'},{id:'vhs',n:'VHS',c:200,d:'BANDVERZERRUNG'}];
  var cheat={}, CHEATS=[], own={amiga:1,sharp:1}, actv={style:'amiga',qual:'sharp'}, shopTab=0, palCache={};
  try{ var sv0=JSON.parse(localStorage.golfCos||'null'); if(sv0&&sv0.own){ own=sv0.own; own.amiga=1; own.sharp=1; actv=sv0.act||actv; cheat=sv0.ch||{}; } }catch(e){}
  function saveCos(){ try{ localStorage.golfCos=JSON.stringify({own:own,act:actv,ch:cheat}); }catch(e){} }
  function rgbOf(h){ var v=parseInt(h.slice(1),16); return [(v>>16)&255,(v>>8)&255,v&255]; }
  function hexOf(r,g,b){ function t(x){ x=Math.max(0,Math.min(255,Math.round(x))); return (x<16?'0':'')+x.toString(16); } return '#'+t(r)+t(g)+t(b); }
  function lumOf(c){ return 0.299*c[0]+0.587*c[1]+0.114*c[2]; }
  function nearest(c,list){ var best=0,bd=1e9; list.forEach(function(h,i){ var q=rgbOf(h), d=(q[0]-c[0])*(q[0]-c[0])+(q[1]-c[1])*(q[1]-c[1])+(q[2]-c[2])*(q[2]-c[2]); if(d<bd){ bd=d; best=i; } }); return list[best]; }
  function neonOf(c){ var r=c[0]/255,g=c[1]/255,b=c[2]/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2, h=0, d=mx-mn;
    if(lumOf(c)<26) return '#06060f'; if(mn>0.92) return '#ffffff'; if(d>0){ h=mx===r?((g-b)/d)%6:(mx===g?(b-r)/d+2:(r-g)/d+4); h*=60; if(h<0) h+=360; }
    var cc=0.9, x=cc*(1-Math.abs((h/60)%2-1)), m=0.1, rgb=h<60?[cc,x,0]:h<120?[x,cc,0]:h<180?[0,cc,x]:h<240?[0,x,cc]:h<300?[x,0,cc]:[cc,0,x];
    return hexOf((rgb[0]+m)*255,(rgb[1]+m)*255,(rgb[2]+m)*255); }
  function paletteFor(id){ if(palCache[id]) return palCache[id]; var out;
    if(id==='gb'){ var gl=['#0f380f','#306230','#8bac0f','#9bbc0f']; out=C0.map(function(h){ var l=lumOf(rgbOf(h)); return gl[l<40?0:(l<115?1:(l<200?2:3))]; }); }
    else if(id==='c64'){ var cp=['#000000','#ffffff','#880000','#aaffee','#cc44cc','#00cc55','#0000aa','#eeee77','#dd8855','#664400','#ff7777','#333333','#777777','#aaff66','#0088ff','#bbbbbb']; out=C0.map(function(h){ return nearest(rgbOf(h),cp); }); }
    else if(id==='neon'){ out=C0.map(function(h){ return neonOf(rgbOf(h)); }); }
    else if(id==='sepia'){ out=C0.map(function(h){ var l=lumOf(rgbOf(h)); return hexOf(l*1.08,l*0.76,l*0.45); }); }
    else if(id==='psx'){ out=C0.map(function(h){ var c=rgbOf(h), l=lumOf(c); return hexOf((c[0]*0.7+l*0.3)*0.9+14,(c[1]*0.7+l*0.3)*0.88+12,(c[2]*0.7+l*0.3)*0.82+16); }); }
    else if(id==='calc') out=lumMap(['#c8d0b4','#9ba787','#566548','#1a2314']);
    else if(id==='vapor'){ var vp=['#1b0a3a','#ffffff','#ff71ce','#fffb96','#01cdfe','#05ffa1','#b967ff','#ff6ad5','#6a2c91','#2d1b4e','#ffb3de','#8795e8']; out=C0.map(function(h){ return nearest(rgbOf(h),vp); }); }
    else if(id==='vb') out=lumMap(['#000000','#3a0000','#9a0000','#ff1010']);
    else if(id==='cga'){ var cg=['#000000','#55ffff','#ff55ff','#ffffff']; out=C0.map(function(h){ return nearest(rgbOf(h),cg); }); }
    else if(id==='zx'){ var zp=['#000000','#0000d7','#d70000','#d700d7','#00d700','#00d7d7','#d7d700','#d7d7d7','#ffffff']; out=C0.map(function(h){ return nearest(rgbOf(h),zp); }); }
    else if(id==='amber') out=lumMap(['#100800','#4a2800','#b36200','#ffb000']);
    else if(id==='matrix') out=lumMap(['#000800','#003b00','#00a000','#33ff33']);
    else if(id==='blue') out=lumMap(['#001f4d','#0b3c8c','#4a8be0','#e0f0ff']);
    else if(id==='noir') out=lumMap(['#000000','#555555','#aaaaaa','#ffffff']);
    else if(id==='sunset') out=lumMap(['#1a0033','#7a1e6e','#ff5a5f','#ffd166']);
    else if(id==='ice') out=lumMap(['#04121f','#0a4d7a','#6cc8f0','#f2fbff']);
    else if(id==='lava') out=lumMap(['#110000','#5a0a00','#e03c00','#ffd23f']);
    else out=C0.slice();
    return palCache[id]=out; }
  function lumMap(list){ return C0.map(function(h){ var l=lumOf(rgbOf(h)); return list[l<40?0:(l<115?1:(l<200?2:3))]; }); }
  C=paletteFor(actv.style).slice();
  view.className='amiga-view q-'+actv.qual;

  var K = {l:0, r:0, s:0, ml:0, mr:0}, co = 0, vco = 0; // co = Verschiebung des Flipper-Clusters
  function box(x,y,w,h,c){ g.fillStyle=C[c]; g.fillRect(x|0,y|0,w,h); }
  function disc(cx,cy,r,c){ // chunky pixel circle
    g.fillStyle=C[c];
    for (var y=-r;y<=r;y++){ var w=Math.floor(Math.sqrt(r*r-y*y+r*0.5)); g.fillRect((cx-w)|0,(cy+y)|0,w*2+1,1); }
  }
  var bumpers, holes, guides, fl, bricks=[], stickies=[], mode=game.dataset.mode==='breakout'?'breakout':'golf', lives=3, level=1, hole=1;
  // Feste Level-Reihenfolge: Kulisse, Schwierigkeit und Steinmuster steigen an (danach Wiederholung, schwerer)
  var LEVELS=[ // 10 Welten (Kulissen), je 3 normale Level + 1 Bossstage; innerhalb der Welt steigt die Schwierigkeit
    {name:'DORF',scene:'western',b:3,mv:0.1,rows:2,pat:'full',par:3,sh:[],path:null},
    {name:'SALOON',scene:'western',b:4,mv:0.25,rows:3,pat:'holes',par:3,sh:['bar'],path:'wave'},
    {name:'WILDWEST',scene:'western',b:5,mv:0.5,rows:6,pat:'zigzag',par:4,sh:['cross','diamond'],path:'zigzag'},
    {name:'BANDITENKOENIG',scene:'western',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'NEONGITTER',scene:'vapor',b:5,mv:0.4,rows:6,pat:'waves+checker',par:4,sh:['ring','T'],path:'wave'},
    {name:'SONNENUNTERGANG',scene:'vapor',b:6,mv:0.5,rows:7,pat:'heart',par:4,sh:['cross','arch','diamond'],path:'arch'},
    {name:'PALMENSTRAND',scene:'vapor',b:6,mv:0.55,rows:5,pat:'ring',par:4,sh:['bar','ring'],path:'zigzag'},
    {name:'MARMORBUESTE',scene:'vapor',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'STADT',scene:'city',b:5,mv:0.2,rows:5,pat:'skyline',par:3,sh:['stairs'],path:null},
    {name:'HOCHHAUS',scene:'city',b:6,mv:0.4,rows:5,pat:'steps',par:4,sh:['T'],path:'stairs'},
    {name:'METROPOLIS',scene:'city',b:7,mv:0.5,rows:6,pat:'columns+frame',par:4,sh:['L','stairs','ring'],path:'stairs'},
    {name:'ROBOTURM',scene:'city',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'AIRPORT',scene:'flight',b:5,mv:0.4,rows:5,pat:'cross',par:3,sh:['bar','bar'],path:'arch'},
    {name:'WOLKEN',scene:'flight',b:6,mv:0.6,rows:5,pat:'twin',par:4,sh:['ring'],path:'wave'},
    {name:'JET',scene:'flight',b:8,mv:0.7,rows:7,pat:'xmark',par:5,sh:['arch','T','diamond'],path:'arch'},
    {name:'ZEPPELIN',scene:'flight',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'TRAUMINSEL',scene:'dream',b:6,mv:0.5,rows:5,pat:'twin',par:4,sh:['ring','bar'],path:'wave'},
    {name:'ZUCKERWOLKEN',scene:'dream',b:7,mv:0.6,rows:6,pat:'zigzag+holes',par:4,sh:['cross','ring'],path:'arch'},
    {name:'STERNENHAIN',scene:'dream',b:7,mv:0.6,rows:6,pat:'xmark',par:4,sh:['ring','diamond'],path:'wave'},
    {name:'WOLKENDRACHE',scene:'dream',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'WALDLICHTUNG',scene:'forest',b:6,mv:0.4,rows:6,pat:'ring',par:4,sh:['T','L'],path:'zigzag'},
    {name:'SCHATZTEMPEL',scene:'forest',b:8,mv:0.6,rows:7,pat:'columns+frame',par:5,sh:['arch','stairs','diamond'],path:'stairs'},
    {name:'ELFENPFAD',scene:'forest',b:7,mv:0.5,rows:6,pat:'steps',par:4,sh:['L','ring'],path:'arch'},
    {name:'BAUMGEIST',scene:'forest',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'MONDHUEGEL',scene:'moon',b:4,mv:0.3,rows:4,pat:'waves+holes',par:3,sh:['bar'],path:'wave'},
    {name:'STEINKREIS',scene:'moon',b:6,mv:0.45,rows:5,pat:'ring+checker',par:4,sh:['ring','cross'],path:'zigzag'},
    {name:'RITTERBURG',scene:'moon',b:7,mv:0.6,rows:6,pat:'cross',par:5,sh:['arch','T'],path:'stairs'},
    {name:'DRUIDE',scene:'moon',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'KERKER',scene:'dungeon',b:5,mv:0.35,rows:5,pat:'holes',par:4,sh:['T'],path:'wave'},
    {name:'GRUFT',scene:'dungeon',b:7,mv:0.5,rows:6,pat:'checker+ring',par:4,sh:['L','bar'],path:'zigzag'},
    {name:'SCHATZKAMMER',scene:'dungeon',b:8,mv:0.65,rows:7,pat:'diamond+holes',par:5,sh:['cross','arch','ring'],path:'arch'},
    {name:'SKELETTLORD',scene:'dungeon',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'TEETISCH',scene:'cozy',b:4,mv:0.2,rows:4,pat:'heart',par:3,sh:['ring'],path:'wave'},
    {name:'KAMINZIMMER',scene:'cozy',b:5,mv:0.3,rows:5,pat:'arch',par:4,sh:['arch','bar'],path:'arch'},
    {name:'KEKSBACKSTUBE',scene:'cozy',b:6,mv:0.4,rows:6,pat:'twin+checker',par:4,sh:['ring','diamond'],path:'zigzag'},
    {name:'TEEKANNE',scene:'cozy',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'ABSCHLAG',scene:'golf',b:4,mv:0.2,rows:4,pat:'full',par:3,sh:['ring'],path:'wave'},
    {name:'FAIRWAY',scene:'golf',b:5,mv:0.35,rows:5,pat:'zigzag',par:4,sh:['bar'],path:'arch'},
    {name:'GREEN',scene:'golf',b:6,mv:0.45,rows:6,pat:'ring+holes',par:4,sh:['ring','diamond'],path:'zigzag'},
    {name:'GREENKEEPER',scene:'golf',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true}]; // Golf-Stagecluster: Loecher mit Fahne wirken als Kicker
  function lvNum(){ return mode==='golf'?hole:level; }
  function LV(){ var n=lvNum()-1, base=LEVELS[n%LEVELS.length], lap=Math.floor(n/LEVELS.length);
    return {name:base.name,scene:base.scene,b:base.b+lap,mv:Math.min(0.9,base.mv+lap*0.1),rows:base.boss?0:Math.min(7,base.rows+(base.pat==='full'||base.pat==='checker'?lap:0)),pat:base.pat,par:base.par,sh:base.boss?[]:base.sh.concat(lap>0?['bar']:[]),path:base.path,boss:!!base.boss}; }
  var blocks=[], bgSeed=1;
  var seedN=0, seed=1, scene='western', bgc=document.createElement('canvas');
  var loopG=null, loopPref=false, loopR=null, bestLv=1, gold=0, sling=0, chgT=0, shopR={}, SLC=[100,250,500], CC=[80,200,400];
  function special(b){ return pw.N>0||b.gild&&((tick+b.go)%360)<240; } // goldener Sonderzustand
  function applySling(){ [2,3].forEach(function(i){ var g2=guides[i]; g2.off=sling<1; g2.rest=[1.4,1.4,1.7,2.0][sling]; g2.chg=[0,0.35,0.5,0.7][sling]; }); }
  var shopFrom='level', mapT=0, mapAnim=false, menuSel=0, menuR={}, trashArm=0, shopCol=0, lenT=0, powT=0, poolU=0, goldU=0, luckU=0, ghostU=0, sel=0, scrollY=0;
  function addG(n){ gold+=Math.round(n*[1,1.25,1.5,2][goldU]*((pw.G>0||cheat.goldx)?3:1)*(cheat.dpoor?0.5:1)); }
  function ITEMS(){ var m3=['AUSGEBAUT'];
    return [
      {n:'ROTE BANDEN',d:['KICK UND LADUNG','STAERKER','LAENGER'],c:SLC,g:function(){return sling;},u:function(){ sling++; applySling(); place(); }},
      {n:'BALL LADUNG',d:['HAELT LAENGER','NAEHE LAEDT MEHR','HAELT AM LAENGSTEN'],c:CC,g:function(){return chgT;},u:function(){ chgT++; }},
      {n:'BALKEN LAENGE',d:['+10 PIXEL','+20 PIXEL','+30 PIXEL'],c:[90,200,350],g:function(){return lenT;},u:function(){ lenT++; }},
      {n:'SCHLAGKRAFT',d:['STAERKERER BALKEN','HAERTER SPANNEN','MAXIMALE KRAFT'],c:[100,220,400],g:function(){return powT;},u:function(){ powT++; }},
      {n:'POOL ZEIT',d:['+5 SEKUNDEN','+10 SEKUNDEN','+15 SEKUNDEN'],c:[70,150,300],g:function(){return poolU;},u:function(){ poolU++; }},
      {n:'GOLD BONUS',d:['+25 PROZENT','+50 PROZENT','+100 PROZENT'],c:[120,260,450],g:function(){return goldU;},u:function(){ goldU++; }},
      {n:'PERK GLUECK',d:['MEHR KAPSELN','NOCH MEHR','VIELE KAPSELN'],c:[100,220,400],g:function(){return luckU;},u:function(){ luckU++; }},
      {n:'GHOST SHOT',d:['FERNSTOSS LEERTASTE','STAERKER','WEITER UND OFT'],c:[150,260,420],g:function(){return ghostU;},u:function(){ ghostU++; }},
      {n:mode==='golf'?'BONUS PUNKTE':'EXTRA LEBEN',d:[mode==='golf'?'+500 PUNKTE':'+1 LEBEN'],c:[120],rep:true,g:function(){return 0;},u:function(){ if(mode==='golf'){ score+=500; } else { lives++; } }}]; }
  var upO=[0,0,0,0,0,0,0,0]; // hoechste gekaufte Stufe je Upgrade (aktive Stufe kann darunter liegen)
  function setLvl(i,v){ if(i===0){ sling=v; applySling(); place(); } else if(i===1) chgT=v; else if(i===2) lenT=v; else if(i===3) powT=v; else if(i===4) poolU=v; else if(i===5) goldU=v; else if(i===6) luckU=v; else if(i===7) ghostU=v; }
  function moOf(i,it){ return it.rep?0:Math.max(upO[i]||0,it.g()); }
  function toggle(i){ var it=ITEMS()[i]; if(!it) return; if(it.rep){ buy(i); return; } var t=it.g(), mo=moOf(i,it);
    if(t<mo){ setLvl(i,t+1); msg=it.n+' STUFE '+(t+1); msgT=60; }                 // schon gekauft: kostenlos hochschalten
    else if(mo<3&&gold>=it.c[mo]) buy(i);                                              // genug Gold: naechste Stufe kaufen
    else if(t>1){ setLvl(i,1); msg=it.n+' STUFE 1'; msgT=60; } }                        // sonst: zurueck auf Stufe 1
  function buy(i){ var it=ITEMS()[i]; if(!it) return; var t=it.g(); if(!it.rep&&t>=3) return; var cost=it.c[it.rep?0:t]; if(gold<cost) return;
    gold-=cost; it.u(); if(!it.rep) upO[i]=Math.max(upO[i]||0,it.g()); msg=it.n+(it.rep?'':' STUFE '+(t+1)); msgT=90; }
  function setStyle(id){ actv.style=id; C=paletteFor(id).slice(); mapC=null; restyle(); saveCos(); } // Karten-Gelaende neu zeichnen
  function setQual(id){ actv.qual=id; view.className='amiga-view q-'+id; saveCos(); }
  function skipLevel(){ if(mode==='golf') hole++; else level++; seedN++; layout(); reset(); state='shop'; msg='LEVEL UEBERSPRUNGEN'; msgT=90; }
  CHEATS=[{id:'pools',n:'POOLS ENDLOS',c:300,d:'BODEN-POOLS IMMER AN'},{id:'lives',n:'ENDLOS LEBEN',c:500,d:'KEIN LEBENSVERLUST'},{id:'energy',n:'DAUERENERGIE',c:400,d:'BALL IMMER GELADEN'},
    {id:'saver',n:'BALL RETTER',c:350,d:'JEDER ABFLUSS GERETTET'},{id:'mega',n:'MEGA DAUER',c:450,d:'MEGA BALL IMMER AN'},{id:'goldx',n:'GOLD MAL 3',c:600,d:'DREIFACHES GOLD'},
    {id:'nograv',n:'KEINE SCHWERKRAFT',c:500,d:'BALL FAELLT NIE'},
    {id:'antigrav',n:'MOND MODUS',c:400,d:'SCHWERKRAFT UMGEDREHT - BALL FAELLT NACH OBEN'},{id:'bigball',n:'RIESENBALL',c:350,d:'BALL IST RIESIG'},
    {id:'drunk',n:'BETRUNKENER BALL',c:250,d:'BALL TORKELT BESOFFEN HERUM'},{id:'slowmo',n:'ZEITLUPE',c:300,d:'BALL IN SLOW MOTION'},
    {id:'trail',n:'REGENBOGEN',c:200,d:'BUNTE SPUR HINTER DEM BALL'},{id:'quake',n:'ERDBEBEN',c:150,d:'BILDSCHIRM WACKELT STAENDIG'},{id:'disco',n:'DISCO MODUS',c:250,d:'FARBEN WECHSELN WILD'},
    {id:'autoscore',n:'AUTO PUNKTE',c:400,d:'AUTOPILOT ZAEHLT PUNKTE'},
    {id:'skip',n:'LEVEL SPRUNG',c:200,d:'NAECHSTES LEVEL SOFORT',rep:true}];
  // Schwierigkeiten: einmal kaufen, dann jederzeit an/aus. Jede aktive gibt +25% Punkte
  var DIFFS=[{id:'dlife',n:'1 LEBEN',c:150,d:'NUR EIN LEBEN PRO RUNDE'},{id:'dfast',n:'TURBO BALL',c:200,d:'BALL IST 20 PROZENT SCHNELLER'},{id:'dboss',n:'BOSS PLUS',c:250,d:'BOSSE HABEN DOPPELT SO VIEL HP'},
    {id:'dpoor',n:'ARMUT',c:200,d:'NUR HALBES GOLD'},{id:'dfine',n:'FEINE STEINE',c:300,d:'KLEINERE STEINE - MEHR REIHEN'}];
  function diffN(){ var n=0; DIFFS.forEach(function(d){ if(cheat[d.id]) n++; }); return n; }
  function curList(){ return shopTab===0?ITEMS():(shopTab===1?STYLES:(shopTab===2?QUAL:(shopTab===3?CHEATS:DIFFS))); }
  function activate(i){ var g00=gold; activateCore(i); if(gold<g00&&shopFrom==='auto') shopAutoT=-1; }
  function activateCore(i){ if(shopTab===0){ toggle(i); saveGame(); return; }
    if(shopTab>=3){ var ch=curList()[i]; if(!ch) return;
      if(ch.rep){ if(gold>=ch.c){ gold-=ch.c; skipLevel(); saveGame(); } return; }
      if(!own['c_'+ch.id]){ if(gold<ch.c) return; gold-=ch.c; own['c_'+ch.id]=1; cheat[ch.id]=true; msg=ch.n+' GEKAUFT'; msgT=90; }
      else cheat[ch.id]=!cheat[ch.id];
      saveCos(); saveGame(); return; }
    var it=curList()[i]; if(!it) return; var isSt=shopTab===1;
    if(!own[it.id]){ if(gold<it.c) return; gold-=it.c; own[it.id]=1; msg=it.n+' GEKAUFT'; msgT=90; }
    if(isSt) setStyle(it.id); else setQual(it.id); saveGame(); }
  var shopPg=0, shopPosF=0, shopWheelT=0;
  function setTab(t){ shopTab=(t+5)%5; sel=0; scrollY=0; shopPg=0; shopPosF=0; }
  function shopPageTo(pg){ var N=curList().length, NP=Math.max(1,Math.ceil(N/8)); pg=Math.max(0,Math.min(NP-1,pg)); sel=Math.min(N-1,pg*8+(sel<N?sel%8:0)); shopCol=sel%4; }
  // ---- Fortschritt cachen: Level, Shop-Zustand, Gold und Upgrades bleiben nach dem Neuladen erhalten ----
  function saveGame(){ if(state==='title'||state==='look'||(ambient&&ambFull)) return; if(shopFrom==='title'&&!loadSave()) return;
    try{ localStorage['golfSave_'+mode]=JSON.stringify({lv:lvNum(),gold:gold,score:score,lives:lives,best:bestLv,loop:loopG,sling:sling,chgT:chgT,lenT:lenT,powT:powT,poolU:poolU,goldU:goldU,luckU:luckU,ghostU:ghostU,upO:upO,shop:state==='shop'&&shopFrom!=='title',tab:shopTab,sel:sel}); }catch(e){} }
  function applySave(sv){ level=sv.lv; hole=sv.lv; bestLv=Math.max(sv.best||0,sv.lv); loopG=sv.loop||null; gold=sv.gold||0; score=sv.score||0; lives=sv.lives||3; sling=sv.sling||0; chgT=sv.chgT||0; lenT=sv.lenT||0; powT=sv.powT||0; poolU=sv.poolU||0; goldU=sv.goldU||0; luckU=sv.luckU||0; ghostU=sv.ghostU||0; upO=(sv.upO||[]).concat([0,0,0,0,0,0,0,0]).slice(0,8); [sling,chgT,lenT,powT,poolU,goldU,luckU,ghostU].forEach(function(v,k){ upO[k]=Math.max(upO[k]||0,v); }); }
  function loadSave(){ try{ return JSON.parse(localStorage['golfSave_'+mode]||'null'); }catch(e){ return null; } }
  function clearSave(){ try{ localStorage.removeItem('golfSave_'+mode); }catch(e){} }
  function closeShop(){ if(state!=='shop') return;
    if(shopFrom==='auto'){ autoRestart(); return; }
    if(shopFrom==='title') state='title'; else state='tee'; // nach dem Shop geht es direkt im naechsten Level weiter (keine Karte dazwischen)
    saveGame(); }
  function startLevel(){ state='tee'; saveGame(); }
  function startNew(){ init(); state='map'; mapT=0; mapAnim=false; }
  function continueGame(){ var sv=loadSave(); if(!sv||!sv.lv){ startNew(); return; } applySave(sv); seedN++; layout(); reset(); msgT=0;
    if(sv.shop){ state='shop'; shopFrom='level'; shopTab=sv.tab||0; sel=sv.sel||0; } else { state='map'; mapT=0; mapAnim=false; } }
  function trashClick(){ var sv=loadSave(); if(!sv||!sv.lv) return;
    if(trashArm>0){ clearSave(); init(true); state='title'; menuSel=0; trashArm=0; msg='SPIELSTAND GELOESCHT'; msgT=70; } else trashArm=180; } // 1. Klick = scharf, 2. Klick = loeschen
  var shiftDown=false; window.addEventListener('keydown',function(e){ shiftDown=e.shiftKey; if(e.key==='Shift'||(e.key==='Alt'&&e.shiftKey)){ if(!(e.target&&e.target.matches&&e.target.matches('input,textarea'))) e.preventDefault(); } }, true); // preventDefault: soll Windows-Sprachumschaltung (Alt+Shift) moeglichst verhindern
  window.addEventListener('keyup',function(e){ shiftDown=e.shiftKey; if(e.key==='Shift'||e.key==='Alt'){ if(!(e.target&&e.target.matches&&e.target.matches('input,textarea'))) e.preventDefault(); } }, true); window.addEventListener('blur',function(){ shiftDown=false; });
  try{ if(navigator.keyboard&&navigator.keyboard.lock) cv.addEventListener('pointerdown',function(){ if(document.fullscreenElement) navigator.keyboard.lock(['ShiftLeft','ShiftRight','AltLeft','AltRight']).catch(function(){}); }); }catch(e){} window.addEventListener('blur',function(){ shiftDown=false; });
  function resetShop(){ own={amiga:1,sharp:1}; cheat={}; actv={style:'amiga',qual:'sharp'}; setStyle('amiga'); setQual('sharp'); saveCos(); msg='SHOP ZURUECKGESETZT'; msgT=90; } // gekaufte Styles, Grafik und Cheats zurueck
  function menuItems(){ var sv=loadSave(), out=[]; if(sv&&sv.lv) out.push({t:'WEITER - '+(mode==='golf'?'LOCH ':'LEVEL ')+sv.lv,f:continueGame});
    out.push({t:'NEUES SPIEL',f:function(){ if(shiftDown) resetShop(); mapPick=true; mapNote=''; mapSel=0; mapScroll=0; mapFollow=true; mapT=0; mapAnim=false; state='map'; }}); out.push({t:'STAGES ANSEHEN',f:function(){ pickMode=false; lookStage(1); }}); out.push({t:'AMBIENCE MODUS',f:startAmbient}); out.push({t:'SHOP UND STYLES',f:function(){ openShop('title'); }}); return out; }
  var pickMode=false, mapPick=false, mapSel=0;
  var lastPick=0, mapNote='', backR=null;
  try{ lastPick=Math.max(0,(+localStorage['golfPick_'+mode])||0); }catch(e){}
  try{ loopPref=localStorage['golfLoop_'+mode]==='1'; }catch(e){}
  function toggleLoop(){ loopPref=!loopPref; try{ localStorage['golfLoop_'+mode]=loopPref?'1':'0'; }catch(e){} }
  function startPick(i){ mapPick=false; mapNote=''; lastPick=i; try{ localStorage['golfPick_'+mode]=i; }catch(e){} startLv=i+1; init(); state='tee';
    loopG=null; if(loopPref){ var gr=mapLayout().groups[mapLayout().gi[i]]; loopG={from:gr.from,to:gr.to}; } saveGame(); } // Stage-Cluster-Loop: nach dem Boss geht es im selben Cluster von vorne los
  var overT=0, overSel=0, overIdx=0, overScore=0, overR={}; // Game-Over-Screen
  function overRetry(){ startPick(overIdx); }
  function overMap(){ mapNote=''; gameOver(); }
  function gameOver(){ clearSave(); init(true); mapPick=true; mapSel=Math.min(lastPick,LEVELS.length-1); mapT=0; mapAnim=false; state='map'; } // nach Game Over zurueck in die Stage-Auswahl
  function mapEnter(){ mapFollow=true; mapT=0; }
  function nodeAt(){ for(var i=0;i<LEVELS.length;i++){ var dx=mx+(mapScroll|0)-nodeX(i), dy=my-nodeY(i); if(dx*dx+dy*dy<=100) return i; } return -1; }
  function clusterJump(dir,from){ var N=LEVELS.length, i=(from||lookIdx)-1, sc=LEVELS[i].scene;
    if(dir>0){ var j=i; do{ j=(j+1)%N; }while(LEVELS[j].scene===sc&&j!==i); return j+1; }
    var st=i; while(st>0&&LEVELS[st-1].scene===sc) st--; if(st<i) return st+1;
    var pj=(st-1+N)%N, pst=pj; while(pst>0&&LEVELS[pst-1].scene===LEVELS[pj].scene) pst--; return pst+1; }
  var ambShopT=0;
  function ambShopAI(){ // Ambience: die KI kauft selbst Upgrades; kauft sie nichts, laeuft der Countdown am Weiter-Button
    ambShopT++; var N=ITEMS().length, ph=ambShopT%40;
    if(ph===1){ var best=-1, order=[0,1,3,2,4,5,6];
      for(var k=0;k<order.length;k++){ var it=ITEMS()[order[k]], t=it.g(); if(!it.rep&&t>=3) continue; if(gold>=it.c[it.rep?0:t]){ best=order[k]; break; } }
      ambPick=best; sel=best>=0?best:N; }
    else if(ph===22&&ambPick>=0){ buy(ambPick); ambPick=-1; shopAutoT=Math.min(shopAutoT,90); }
    if(shopAutoT>0) shopAutoT--; else { shopAutoT=-1; state='tee'; msg='STAGE '+lvNum()+' '+LV().name; msgT=140; } }
  function autoShopTick(){ if(shopAutoT>0){ shopAutoT--; if(shopAutoT<=0){ shopAutoT=-1; autoRestart(); } } }
  var ambPick=-1;
  var apScore=0, apGold=0, apLives=3, shopAutoT=-1, shopAutoMax=1;
  // ================= Bossstages: pro Kulisse ein eigener Boss, der oben herumfliegt =================
  var boss=null, bshots=[], stunT=0;
  var BOSSES={western:{w:44,h:26,ax:88,sp:0.034,hp:12},vapor:{w:40,h:30,ax:80,sp:0.03,hp:14},city:{w:44,h:28,ax:70,sp:0.028,hp:16},flight:{w:58,h:24,ax:96,sp:0.038,hp:16},
    dream:{w:46,h:30,ax:84,sp:0.03,hp:18},forest:{w:46,h:32,ax:76,sp:0.026,hp:20},moon:{w:40,h:34,ax:88,sp:0.034,hp:22},dungeon:{w:44,h:34,ax:80,sp:0.03,hp:24},cozy:{w:48,h:36,ax:82,sp:0.03,hp:20},golf:{w:30,h:30,ax:92,sp:0.036,hp:18}};
  var BATK={western:['aim','fan'],vapor:['beam','aim'],city:['homing','aim'],flight:['bomb','fan'],dream:['wave','aim'],forest:['split','bomb'],moon:['ring','homing'],dungeon:['aim2','beam'],cozy:['wave','homing'],golf:['aim','bomb']};
  var BEAT={vapor:1,dream:1,forest:1}; // diese Bosse schlucken den Ball (kein Schaden, spucken ihn geladen wieder aus)
  var BSTUN={aim:70,fan:50,aim2:60,homing:70,bomb:90,wave:60,split:50,ring:40,beam:90};
  function makeBoss(sc){ var d=BOSSES[sc]||BOSSES.western; return {sc:sc,atk:BATK[sc]||['aim'],ai:0,eat:!!BEAT[sc],eatCd:0,mouth:0,x:cx,y:48,w:d.w,h:d.h,hp:d.hp*(cheat.dboss?2:1),hp0:d.hp*(cheat.dboss?2:1),t:(rnd()*6)|0,fl:0,cd:150,ax:Math.min(d.ax,W/2-d.w/2-10),sp:d.sp}; }
  function updateBoss(){ if(!boss) return; var ph2=boss.hp<=boss.hp0/2, spd=boss.sp*(ph2?1.5:1); boss.t++;
    boss.x=cx+Math.sin(boss.t*spd)*boss.ax+Math.sin(boss.t*spd*2.3)*8; boss.x=Math.max(boss.w/2+8,Math.min(W-boss.w/2-8,boss.x));
    boss.y=46+Math.sin(boss.t*spd*1.7)*12+(ph2?Math.sin(boss.t*0.05)*6:0); if(boss.fl>0) boss.fl--;
    if(state==='play'||state==='tee'){ boss.cd--; if(boss.cd<=0){ var ty=boss.atk[boss.ai++%boss.atk.length]; boss.cd=(ph2?150:250)+(ty==='beam'?40:0); bossFire(ty,ph2); } }
    if(boss.mouth>0) boss.mouth--;
    var L=fl[0].len/2, px=cx+co;
    bshots=bshots.filter(function(sh){ sh.t=(sh.t||0)+1;
      if(sh.ty==='beam'){ if(sh.t>=40&&sh.t<=58){ if(!sh.hit&&state==='play'&&Math.abs(px-sh.x)<=L+3){ sh.hit=1; stunT=BSTUN.beam; shake=6; burst(sh.x,200,4,2); }
          if(state==='play'&&ball&&Math.abs(ball.x-sh.x)<6){ ball.vy+=0.5; } } return sh.t<=58; }
      if(sh.ty==='homing'){ sh.vx=Math.max(-1.3,Math.min(1.3,sh.vx+(px-sh.x)*0.004)); }
      if(sh.ty==='wave'){ sh.x=sh.x0+Math.sin(sh.y*0.09)*18; } else sh.x+=sh.vx; sh.y+=sh.vy;
      if(sh.ty==='split'&&!sh.sp&&sh.y>110){ bshots.push({ty:'aim',x:sh.x,y:sh.y,vx:-0.8,vy:1.3},{ty:'aim',x:sh.x,y:sh.y,vx:0.8,vy:1.3}); burst(sh.x,sh.y,3,13); return false; }
      if(sh.y>=196&&sh.y<=206&&Math.abs(sh.x-px)<=L+2&&state==='play'){ drainE(0.4); burst(sh.x,sh.y,4,2); shake=6; return false; }
      if(state==='play'&&ball&&Math.hypot(ball.x-sh.x,ball.y-sh.y)<(sh.ty==='bomb'?8:6)){ drainE(0.4); burst(sh.x,sh.y,sh.ty==='bomb'?4:2,4); return false; }
      return sh.y<H+6&&sh.x>-8&&sh.x<W+8; }); }
  function drainE(d){ if(pw.F>0||cheat.energy) return; [ball].concat(extras).forEach(function(b){ if(b) b.e=Math.max(0,(b.e||0)-d); }); } // Boss-Treffer: nur Energie weg
  function bossFire(ty,ph2){ var bx=boss.x, by=boss.y+boss.h/2, px=cx+co, v=ph2?0.4:0;
    if(ty==='aim') bshots.push({ty:ty,x:bx,y:by,vx:(px-bx)*0.004+(rnd()-0.5)*0.5,vy:1.2+v});
    else if(ty==='aim2'){ [-8,8].forEach(function(o){ bshots.push({ty:ty,x:bx+o,y:by,vx:(px-bx-o)*0.005,vy:2+v}); }); }
    else if(ty==='fan'){ [-0.7,0,0.7].forEach(function(a){ bshots.push({ty:ty,x:bx,y:by,vx:a,vy:1.2+v}); }); }
    else if(ty==='beam') bshots.push({ty:ty,x:px,y:0,vx:0,vy:0,t:0});
    else if(ty==='homing') bshots.push({ty:ty,x:bx,y:by,vx:0,vy:0.9+v});
    else if(ty==='bomb'){ [-16,16].forEach(function(o){ bshots.push({ty:ty,x:bx+o,y:by,vx:0,vy:2.2+v}); }); }
    else if(ty==='wave') bshots.push({ty:ty,x:bx,x0:bx,y:by,vx:0,vy:1+v});
    else if(ty==='split') bshots.push({ty:ty,x:bx,y:by,vx:(rnd()-0.5)*0.6,vy:0.8+v});
    else if(ty==='ring'){ for(var k=0;k<8;k++){ var a=k*0.785+0.4; bshots.push({ty:ty,x:bx,y:boss.y,vx:Math.cos(a)*1.1,vy:Math.sin(a)*1.1+0.3}); } }
    burst(bx,by,2,2); }
  // Ballgroesse: Standard klein (Radius 2), Perk KLEIN = 1.5, WINZIG = 1
  var BALL_SPEED=0.45; // globaler Tempo-Faktor fuer alle Baelle (1 = frueher)
  function ballR(){ return cheat.bigball?5:pw.W>0?1:(pw.K>0?1.5:2); }
  function drawCharge(b){ var be=b.e||0; if(be<0.04) return; // Ladung: leuchtender Rand um den Ball, blinkt mit mehr Energie schneller
    var per=Math.max(3,Math.round(18-15*be)), on=(tick%per)<per*0.6, c=be>0.66?4:(be>0.33?3:8);
    if(!on&&be<0.95) { c=12; }
    var bx0=b.x|0, by0=b.y|0, r=ballR(); disc(bx0,by0,Math.ceil(r)+1,c); }
  function drawBallAt(x,y,c){ x|=0; y|=0; var r=ballR(); if(r>=2){ disc(x,y,Math.round(r),c); box(x-1,y-1,1,1,11); } else if(r>1) disc(x,y,1,c); else box(x-1,y-1,2,2,c); }
  function bossCollide(){ if(!boss) return; var bx0=boss.x-boss.w/2, by0=boss.y-boss.h/2, R=ballR();
    var qx=Math.max(bx0,Math.min(ball.x,bx0+boss.w)), qy=Math.max(by0,Math.min(ball.y,by0+boss.h)), dx=ball.x-qx, dy=ball.y-qy, d=Math.hypot(dx,dy);
    if(d<R){ if(d>0){ dx/=d; dy/=d; ball.x=qx+dx*R; ball.y=qy+dy*R; } else { dx=0; dy=1; ball.y=by0+boss.h+R; }
      if(boss.eat&&!ball.swal&&tick>=boss.eatCd){ ball.swal=55; boss.eatCd=tick+320; boss.mouth=55; burst(ball.x,ball.y,4,13); shake=4; msg='VERSCHLUCKT!'; msgT=40; return; }
      bounce(dx,dy,1.05);
      if(tick-(ball.bh||-99)>10){ ball.bh=tick; var en=Math.max(0,Math.min(1,ball.e||0)), mul=1+Math.floor(en*2.99); boss.hp-=(pw.M>0?2:1)*mul; if(mul>1){ burst(ball.x,ball.y,2+mul,4); msg='ENERGIE x'+mul; msgT=30; } if(!pw.F&&!cheat.energy) ball.e=en*0.5; boss.fl=8; score+=mult()*100; addG(10); burst(ball.x,ball.y,3,1); shake=4; drop(boss.x,boss.y+boss.h/2,0.25);
        if(boss.hp<=0){ var bx=boss.x, by=boss.y; for(var k=0;k<4;k++) burst(bx+(k-1.5)*10,by,8,[1,4,3,2][k]); boss=null; bshots=[]; winLevel(); } } } }
  var winT=0, WINLEN=170, winBoss=false;
  function winLevel(){ // Stage geschafft: erst Siegesanimation (Ball + Balken), danach winApply() -> Shop
    if(ambient){ winApply(); return; }
    state='win'; winT=WINLEN; winBoss=!!LV().boss; ball.vx=ball.vy=0; extras=[]; bshots=[]; stunT=0; shake=10; msgT=0;
    for(var wk=0;wk<4;wk++) burst(ball.x+(wk-1.5)*14,ball.y-6,6,[1,2,3,4][wk]); }
  function winApply(){ // Punkte, naechstes Level aufbauen, Shop oeffnen
    if(ambient&&!ambFull){ autoWin(); return; }
    if(mode==='golf'){ var bsg=LV().boss, pts=bsg?500:Math.max(1,LV().par+3-strokes)*100;
      addG(60); score+=mult()*pts; msg=bsg?'BOSS BESIEGT! +500':'EINGELOCHT! +'+pts; msgT=150; hole++; if(bsg&&loopG) hole=loopG.from+1; if(hole>LEVELS.length){ msg='RUNDE FERTIG: '+score; hole=1; score=0; } bestLv=Math.max(bestLv,hole); strokes=0;
      seedN++; layout(); reset(); openShop(); }
    else { var wasBoss=LV().boss; addG(wasBoss?120:60); if(wasBoss) score+=mult()*500; level=(wasBoss&&loopG)?Math.floor((level-1)/LEVELS.length)*LEVELS.length+loopG.from+1:level+1; bestLv=Math.max(bestLv,level); seedN++; layout(); msg='LEVEL '+level+' '+LV().name; msgT=140; reset(); openShop(); } }
  function autoWin(){ reset(); shopFrom='auto'; state='shop'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; shopAutoT=shopAutoMax=180; if(document.exitPointerLock) document.exitPointerLock(); } // Autopilot: Shop mit Countdown am Weiter-Button
  function autoRestart(){ shopAutoT=-1; seedN++; layout(); reset(); msg='AUTOPILOT: LEVEL NEU'; msgT=120; } // gewonnen: dasselbe Level von vorne
  function apGuard(){ if(ambient&&!ambFull){ if(state==='shop'){ apGold=gold; apScore=score; lives=apLives; return; } if(!cheat.autoscore){ score=apScore; gold=apGold; } lives=apLives; } } // Autopilot: keine Punkte, kein Gold, kein Lebensverlust (ausser Cheat)
  var ambient=false, ambFull=true, ambT=0, ambTee=0, lookIdx=1;
  function toggleAuto(){ if(ambient){ if(ambFull){ exitToTitle(); } else { ambient=false; K.l=0; K.r=0; shopAutoT=-1; msg='AUTOPILOT AUS'; msgT=80; } }
    else if(state==='tee'||state==='play'){ ambient=true; ambFull=false; ambT=0; ambTee=0; apScore=score; apGold=gold; apLives=lives; msg='AUTOPILOT AN - TAB = AUS'; msgT=100; } }
  function exitToTitle(){ ambient=false; var bs=loadSave(); init(true); if(bs&&bs.lv) applySave(bs); state='title'; menuSel=0; }
  function lookStage(n){ lookIdx=n; level=n; hole=n; seedN++; layout(); reset(); state='look'; msgT=0; }
  function startAmbient(){ ambient=true; ambFull=true; ambT=0; ambTee=0; init(true); level=hole=1+((Math.random()*LEVELS.length)|0); lives=99; seedN++; layout(); reset(); msg='AMBIENCE - '+LV().name; msgT=160; }
  function ambientAI(){ ambT++;
    if(ambFull&&ambT>5400){ ambT=1; level=level%LEVELS.length+1; hole=level; seedN++; layout(); reset(); msg='STAGE '+lvNum()+' '+LV().name; msgT=160; return; }
    K.ml=0; K.mr=0; vco=0; if(ambFull) lives=99;
    if(state==='tee'){ K.l=0; if(++ambTee>45){ ambTee=0; aim=(rnd()-0.5)*0.9; var sp0=5.2; ball.vx=Math.sin(aim)*sp0; ball.vy=-Math.cos(aim)*sp0; ball.e=1; state='play'; strokes++; } return; }
    if(state==='play'){ var Lb=fl[0].len/2, tgt, cur=cx+co;
      if(ball.vy<-0.2) ambDesc=false;
      if(ball.vy>0.2){
        if(!ambDesc){ ambDesc=true; ambStrike=rnd()<0.3; // neuer Anflug: Ziel waehlen, selten ein Schlag
          if(boss){ ambTx=boss.x; ambTy=boss.y; }
          else if(mode==='golf'){ var ho=holes.filter(function(q){ return !q.done; }); if(ho.length){ var hh=ho[(rnd()*ho.length)|0]; ambTx=hh.x; ambTy=hh.y; } else { ambTx=rnd()*W; ambTy=40; } }
          else if(bricks.length){ var bk=bricks[(rnd()*bricks.length)|0]; ambTx=bk.x+bk.w/2; ambTy=bk.y; }
          else { ambTx=rnd()*W; ambTy=40; } }
        var tf=(198-ball.y)/ball.vy, land=ball.x+ball.vx*Math.min(tf,60);
        // gewuenschter Abflugwinkel zum Ziel -> Treffpunkt auf dem Balken (Winkel = u * 1,1 rad)
        var ang=Math.max(-1,Math.min(1,Math.atan2(ambTx-land,198-ambTy))), u=Math.max(-0.92,Math.min(0.92,ang/1.1));
        tgt=land-u*Lb; }
      else tgt=ball.x*0.6+cur*0.4;
      tgt=Math.max(Lb+6,Math.min(W-Lb-6,tgt)); co+=Math.max(-4,Math.min(4,(tgt-cur)*0.22));
      K.l=(ambStrike&&ball.vy>0&&ball.y>150&&ball.y<188&&Math.abs(ball.x-(cx+co))<40)?1:0; } }
  var ambDesc=false, ambStrike=false, ambTx=150, ambTy=40;
  function drawLook(){ var N=LEVELS.length, lv=LEVELS[lookIdx-1], cl=(tick>>4)&1;
    bevel(8,13,W-16,15,12,11,15); var t1=(pickMode?'STARTSTAGE ':'STAGE ')+lookIdx+' VON '+N+' - '+lv.name; txtS(t1,((W-t1.length*4)/2)|0,18,4,1);
    for(var k=0;k<6;k++){ box(14+k,20-k+(k>3?0:0),1,2*k+1-(k>5?0:0)>0?1:1,cl?4:1); }
    for(k=0;k<5;k++){ box(14+k,20-k,1,k*2+1,cl?4:1); box(W-14-k,20-k,1,k*2+1,cl?4:1); }
    bevel(8,H-34,W-16,24,12,11,15); txt('KULISSE: '+(SCN[lv.scene]||lv.scene)+'  FORM: '+String(lv.pat).toUpperCase(),16,H-30,8);
    txt(pickMode?'LINKS RECHTS: STAGE - HOCH RUNTER: WELT - ENTER = START':'LINKS RECHTS: STAGE - HOCH RUNTER: WELT - ESC ZURUECK',16,H-20,cl?4:1); }
  function openShop(from){ if(ambient&&ambFull){ state='shop'; shopFrom='level'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; ambShopT=0; shopAutoT=shopAutoMax=180; return; } if(ambient) ambient=false; shopAutoT=-1; shopFrom=from||'level'; state='shop'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; if(document.exitPointerLock) document.exitPointerLock(); saveGame(); } // Shop: Maus freigeben
  var parts=[], caps=[], pw={E:0,S:0,M:0,X:0,T:0,Y:0,G:0,N:0,F:0,K:0,W:0}, saver=false;
  var PU={K:{c:13,t:'KLEINER BALL',d:900},W:{c:14,t:'WINZIG BALL',d:600},E:{c:8,t:'FLIPPER LANG',d:900},S:{c:9,t:'LANGSAM',d:720},M:{c:5,t:'MEGA BALL',d:600},X:{c:4,t:'PUNKTE X2',d:900},T:{c:14,t:'BODEN POOLS',d:900},Y:{c:3,t:'DYNAMIT',d:720},G:{c:4,t:'GOLDRAUSCH',d:900},N:{c:9,t:'NEON',d:720},F:{c:14,t:'FALLSCHIRM',d:720},B:{c:3,t:'BALL RETTER'},P:{c:2,t:'EXTRA LEBEN'},D:{c:14,t:'BALL SPLIT'}};
  function mult(){ return (pw.X>0?2:1)*(1+0.25*diffN()); }
  function boom(x,y){ burst(x,y,6,3); shake=5;
    bumpers.forEach(function(b){ if(!b.dead&&Math.hypot(b.x-x,b.y-y)<26+b.r){ b.hp--; b.flash=6; score+=mult()*20; if(b.hp<=0){ b.dead=true; addG(20); score+=mult()*b.pts; drop(b.x,b.y,0.45); burst(b.x,b.y,b.r); } } });
    blocks.forEach(function(o){ if(!o.dead&&Math.hypot(o.x+5-x,o.y+3-y)<26){ o.hp--; o.fl=6; score+=mult()*20; if(o.hp<=0){ o.dead=true; addG(5); score+=mult()*40*o.hp0; burst(o.x+5,o.y+3,4,12); } } });
    for(var bi=bricks.length-1;bi>=0&&bricks.length>1;bi--){ var br=bricks[bi]; if(Math.hypot(br.x+br.w/2-x,br.y+br.h/2-y)<26){ br.hp--; br.fl=6; if(br.hp<=0){ bricks.splice(bi,1); score+=mult()*50; addG(2); } } } }
  function dropCaps(){ caps.forEach(function(c){ c.fast=true; c.vy=1; burst(c.x,c.y,2,2); }); }
  var lastDrop=-999;
  function drop(x,y,p){ if(caps.length>=1||tick-lastDrop<300) return; if(rnd()<p*0.25*(1+0.3*luckU)){ lastDrop=tick; var ks='ESMXBPDDDTTKKW'+({western:'YYYGG',city:'NNNN',flight:'FFFF',dream:'FFGG',forest:'YYYNN',vapor:'NNFF',moon:'NNGG',dungeon:'YYMM',cozy:'FFGG'}[scene]||''); caps.push({x:x,y:y,k:ks[(rnd()*ks.length)|0]}); } }
  function collect(k){ var u=PU[k]; msg=u.t; msgT=70; score+=50;
    if(u.d) pw[k]=u.d+(k==='T'?300*poolU:0); else if(k==='B') saver=true;
    else if(k==='D') split();
    else if(k==='P'){ if(mode==='breakout') lives++; else score+=300; } }
  function burst(x,y,r,col){ for(var i=0;i<8+r;i++){ var a=rnd()*6.28, v=0.6+rnd()*1.8; parts.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:25+rnd()*20,c:col||[1,4,3,2,11][(rnd()*5)|0]}); } }
  function moveBumpers(){ parts.forEach(function(q){ q.x+=q.vx; q.y+=q.vy; q.vy+=0.04; q.t--; }); parts=parts.filter(function(q){ return q.t>0; }); bumpers.forEach(function(b){
    if(b.mv){ b.ph+=b.sp; b.x=b.hx+b.dx*Math.sin(b.ph); b.y=b.hy+b.dy*Math.sin(b.ph); }
    else if(b.par){ b.an+=b.sp; b.x=b.par.x+Math.cos(b.an)*b.d; b.y=b.par.y+Math.sin(b.an)*b.d; } }); }
  var MAC={cols:["#efdaca", "#e2cab8", "#dfc8b8", "#c4c3d6", "#bdc2de", "#b7a6a5", "#907b76", "#8c7374", "#695b5d", "#44373a", "#241a1f", "#110b0f"],
    rows:[
      '........aaaaaaaaab..........................',
      '.......aa655555559999999999999999aaaaaaaaa..',
      '......a96000000000000000000000000555555558a.',
      '.....aa672000000000000000000000000000000008a',
      '....a96960111111111111111111111111111111112a',
      '...aa56960111111111111111111111111111111112a',
      '..aa666960112699999999999999999995222222112a',
      '.aa6666961116977777777777777777779999995112a',
      'aa66666960119679999999999999999997776659112a',
      'a8776669601198abbbbbbbbbbbbbbbbbbbbb8559112a',
      'a7676669601198b94444444444444444447ab759112a',
      'a7666669601298a444444444444444444448b758112a',
      'a7666769601298a444444444444444444448b758112a',
      'a7666769601298a444449744459544884448b758212a',
      'a7667769601298a44444b84445b5449a4448b758212a',
      'a7776669601298a44444a84445b544894448b758212a',
      'a7777669601298a44444444445b544444448b758212a',
      'a7777769611298a44444444445b544444448b758212a',
      'a7777779611298a44444444478b544444448b758112a',
      'a7777779611298a4444444449aa544444448b758212a',
      'a7777769611298a444444444444444444448b758212a',
      'a7777769611298a444444854444448644448b758212a',
      'a7777669611198a444444a7444444a844448b758212a',
      'a7777769611298a44444448bbbbbb4444448b758212a',
      'a7777669611298a444444457777774444448b758112a',
      'a7777679611298a444444444444444444448b758212a',
      'a7776669611298b95555555555555555556ab758212a',
      'a77776696111959bbbbbbbbbbbbbbbbbbbbb8058212a',
      'a777766961119227777777777777777777770008112a',
      'a777666961127500000000000000000000000026112a',
      'a777666961122511111111111111111111111122212a',
      'a787666961122211111111111111111112222222112a',
      'a79a987961122111111111111111111112222112112a',
      'a798898961125222211111111211122222222222212a',
      'a78a987961169999866666665211158988888898212a',
      'a7a889896115bbbbaaaaaaaa6221159888886989212a',
      'a789a97961159999500000000222225555555555212a',
      'a7a9888960110000111111111222257777777665212a',
      'a878a97961122211122111111111111111111112212a',
      'aa86788961122222222111211111111122111112212a',
      '.a89766962555555555555555555555555555555559a',
      '.a7799796666666666666666666666666666666668a.',
      '.a776899899999999999999999999999999999999aa.',
      '.a77668998777777777777777777777777777777aa..',
      '.a97668995222222222222222222222588886222a...',
      '..aa868995222222222222222222222588886222a...',
      '...aa98995222222222222222222222222222222a...',
      '.....aa997666666666666666666666666666668a...',
      '.......aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....']};
  // Wahrzeichen je Szene/Cluster (Anker = Mitte unten, ca. 32x44 px): Weltkarte, Thumbnails und Hintergruende
  var SPAL={western:{sky:'#f0a860',a:'#c8935a',b:'#b9844d'},city:{sky:'#2a2a50',a:'#4a4a5a',b:'#42424f'},flight:{sky:'#6ab4f0',a:'#7ab86a',b:'#6aa85c'},dream:{sky:'#3a1a6a',a:'#e8b8f0',b:'#dcaae8'},forest:{sky:'#2a5a3a',a:'#3a8a44',b:'#348040'},vapor:{sky:'#5a2a8a',a:'#ff71ce',b:'#b967ff'},moon:{sky:'#0a0e2a',a:'#6a7090',b:'#5e6484'},dungeon:{sky:'#1a1a1a',a:'#555560',b:'#4a4a54'},cozy:{sky:'#5a3a22',a:'#8a5530',b:'#7a4a28'},golf:{sky:'#7ac8f0',a:'#4ab85a',b:'#44ac54'}};
  function drawLandmark(sc,x,y,k){ g.save(); g.translate(x|0,y|0); g.scale(k,k);
    function R(c,a,b,w,h){ g.fillStyle=c; g.fillRect(a,b,w,h); }
    function C(c,cx2,cy2,r){ g.fillStyle=c; for(var yy=-r;yy<=r;yy++){ var xx=Math.round(Math.sqrt(r*r-yy*yy)); g.fillRect(cx2-xx,cy2+yy,xx*2+1,1); } }
    function T(c,cx2,top,hh){ g.fillStyle=c; for(var r2=0;r2<hh;r2++) g.fillRect(cx2-r2,top+r2,r2*2+1,1); }
    R('rgba(0,0,0,0.3)',-14,-2,30,3); // Bodenschatten
    if(sc==='western'){ R('#a8683a',-14,-14,22,14); R('#7a4a26',8,-14,6,14); R('#8a4f2a',-14,-24,28,10); R('#f0d090',-9,-22,18,6); R('#5a3a1e',-7,-20,14,1); R('#5a3a1e',-5,-18,10,1); R('#6a3a1c',-16,-14,32,2); R('#4a2a14',-3,-10,6,10); R('#ffe090',-11,-11,5,4); R('#ffe090',5,-11,5,4); R('#d8a060',-14,-26,28,2); }
    else if(sc==='city'){ R('#6a6aa8',-8,-42,14,42); R('#46467a',6,-40,6,40); R('#9a9ad8',-8,-42,14,2); R('#9a9ad8',-1,-48,2,6); for(var wy=-38;wy<-4;wy+=5) for(var wx=-6;wx<4;wx+=4) R((wx+wy)&2?'#ffdd33':'#3a3a66',wx,wy,2,3); R('#e03a3a',-1,-50,2,2); }
    else if(sc==='flight'){ R('#cfd4dc',-3,-32,6,32); R('#8a8f98',3,-30,3,30); R('#e03a3a',-11,-40,22,3); R('#8ad0ff',-10,-37,20,6); R('#4a8ab0',-10,-32,20,1); R('#fff',-1,-48,2,8); R('#e03a3a',-1,-50,2,2); R('#888',-9,-4,18,4); R('#fff',-14,-6,3,2); }
    else if(sc==='dream'){ R('#fff',-16,-8,32,8); R('#e8e0ff',-12,-10,24,2); R('#ffd1f0',-12,-26,7,18); R('#ffd1f0',5,-26,7,18); R('#ffb3de',-4,-32,8,24); T('#ff6ad5',-8,-34,8); T('#ff6ad5',8,-34,8); T('#ff3d9a',0,-42,9); R('#fffb96',-1,-46,1,5); R('#8795e8',-2,-16,4,8); R('#fff',-18,-4,6,4); R('#fff',12,-5,7,5); }
    else if(sc==='forest'){ R('#5a3a1e',-5,-22,10,22); R('#3a2410',2,-22,3,22); C('#2f9a43',0,-30,14); C('#38b04d',-4,-33,9); C('#44c45a',-6,-36,4); R('#2a1a0a',-2,-10,5,10); R('#ffdd66',7,-18,2,3); R('#ffdd66',-9,-24,2,3); }
    else if(sc==='vapor'){ R('#f0e8ff',-16,-4,32,4); R('#d8c8f0',-14,-6,28,2); for(var cc=-12;cc<=8;cc+=7){ R('#f0e8ff',cc,-28,4,22); R('#b9a8d8',cc+3,-28,1,22); R('#fff',cc-1,-30,6,2); } T('#f0e8ff',0,-38,14); R('#ff71ce',-14,-30,28,2); C('#fffb96',0,-34,2); }
    else if(sc==='moon'){ R('#6a7090',-15,-14,30,14); R('#4a5070',9,-14,6,14); R('#7a80a0',-18,-28,9,28); R('#7a80a0',9,-28,9,28); R('#8a90b0',-4,-22,8,22); for(var bx=-18;bx<18;bx+=4) if(bx<-9||bx>7) R('#7a80a0',bx,-31,2,3); R('#ffdd66',-15,-22,2,4); R('#ffdd66',13,-22,2,4); R('#0a0a1a',-2,-8,4,8); T('#e8e8d0',0,-30,3); R('#e8e8d0',0,-34,1,5); }
    else if(sc==='dungeon'){ R('#4a4a52',-13,-30,26,30); R('#363640',9,-30,4,30); for(var by=-28;by<-2;by+=6) R('#2a2a32',-13,by,26,1); for(var bx2=-13;bx2<13;bx2+=6) R('#4a4a52',bx2,-34,4,4); R('#0a0a0a',-5,-14,10,14); C('#0a0a0a',0,-14,5); R('#ffb030',-11,-20,2,4); R('#ff5a1a',-11,-22,2,2); R('#ffb030',9,-20,2,4); R('#ff5a1a',9,-22,2,2); R('#d8d8c8',-1,-26,2,2); }
    else if(sc==='cozy'){ C('#f2e6d0',0,-14,12); R('#f2e6d0',-8,-4,16,4); R('#d8c8a8',4,-22,6,14); R('#f2e6d0',-4,-28,8,4); C('#f2e6d0',0,-30,2); R('#f2e6d0',11,-20,7,3); R('#f2e6d0',-18,-18,3,10); R('#f2e6d0',-16,-18,5,2); R('#f2e6d0',-16,-10,5,2); R('#e07a7a',-4,-14,2,2); R('#e07a7a',3,-12,2,2); R('#e8e0d0',-2,-36,1,3); R('#e8e0d0',2,-38,1,4); }
    else if(sc==='golf'){ R('#f2e6d0',-14,-14,20,14); R('#c8bca0',6,-14,5,14); R('#c03a3a',-16,-18,24,4); R('#8a2a2a',8,-18,5,4); R('#6a9ac8',-10,-11,5,5); R('#4a2a14',-2,-9,5,9); R('#fff',14,-34,1,34); R('#e03a3a',15,-34,7,5); R('#fff',-18,-3,3,3); }
    g.restore(); }
  function restyle(){ var sv=seed; seed=bgSeed; renderScene(); seed=sv; }
  function paintScene(sc){ // Kulissen-Hintergrund (auch fuer die Weltkarte)
    var x,y,i;
    if(sc==='western'){ box(0,0,W,H,10);
      for(i=0;i<W*H/40;i++) box(rnd()*W,rnd()*H,1,1,rnd()<0.5?11:3);
      var ry=60+rnd()*80; for(x=0;x<W;x+=2){ box(x,ry+Math.sin(x/17)*4,2,12,(x>>1)&1?4:3); }
      var tx=20+rnd()*(W-40); for(y=0;y<H;y+=3){ box(tx,y,1,3,12); box(tx+5,y,1,3,12); if((y/3)%2) box(tx-1,y,8,1,11); } }
    else if(sc==='city'){ box(0,0,W,H,6);
      for(i=0;i<10;i++){ box(rnd()*W,rnd()*H,10+rnd()*20,8+rnd()*14,5); }
      var sx0=14+(rnd()*20|0), sy0=22+(rnd()*20|0);
      for(x=sx0;x<W;x+=44){ box(x,0,6,H,12); for(y=0;y<H;y+=8) box(x+2,y,2,4,4); }
      for(y=sy0;y<H;y+=48){ box(0,y,W,6,12); for(x=0;x<W;x+=8) box(x,y+2,4,2,4); }
      for(i=0;i<14;i++){ var bx=rnd()*W,by=rnd()*H,bw=8+rnd()*12,bh=8+rnd()*12; box(bx,by,bw,bh,15); box(bx+1,by+1,bw-2,bh-2,12); } }
    else if(sc==='dream'){ box(0,0,W,H,8); // Traumland: pastellfarbener Himmel mit Wolken, Sternen und rosa Huegeln
      for(i=0;i<46;i++) box(rnd()*W,rnd()*H,1,1,rnd()<0.5?1:4);
      for(i=0;i<9;i++){ var wx=rnd()*W, wy=10+rnd()*(H-70), wr=7+rnd()*9; disc(wx|0,wy|0,wr|0,1); disc((wx+wr*0.8)|0,(wy+3)|0,(wr*0.7)|0,1); disc((wx-wr*0.8)|0,(wy+4)|0,(wr*0.6)|0,1); }
      var ph2=rnd()*6; for(x=0;x<W;x++){ var hy=H-36+Math.sin(x/23+ph2)*8; box(x,hy,1,H-hy,13); box(x,hy,1,2,1); } }
    else if(sc==='vapor'){ var hz=(H*0.5)|0; // Vaporwave im Stil von Floral-Shoppe-Covern: Pink-Tuerkis-Himmel, Schachbrettboden, Marmorbuste, Pseudo-Schriftzeichen
      var skyC=[13,13,13,10,13,14,14,8,14,8];
      for(y=0;y<hz;y++){ var si2=Math.floor(y/hz*skyC.length); box(0,y,W,1,((y+si2)%3===0&&si2>0)?skyC[si2-1]:skyC[si2]); }
      for(y=hz;y<H;y++){ var dd=(y-hz+3)/(H-hz+3), rowT=Math.floor(8/(dd+0.12)); // Schachbrett in Perspektive
        for(x=0;x<W;x+=2){ var u2=(x-cx)/(dd*34+1), chk=((Math.floor(u2)+rowT)&1)===0; box(x,y,2,1,chk?1:14); } }
      // Retro-Mac (Pixelgrafik 44x49) statt Marmorbueste: Vaporwave-Klassiker im Hintergrund
      var mcx=((W*0.3)|0)-22, mcy=hz+10-MAC.rows.length; macX=mcx; macY=mcy;
      MAC.rows.forEach(function(row,ry){ for(var rx=0;rx<row.length;){ var ch=row[rx]; if(ch==='.'){ rx++; continue; } var e=rx; while(e<row.length&&row[e]===ch) e++; g.fillStyle=MAC.cols[parseInt(ch,16)]; g.fillRect(mcx+rx,mcy+ry,e-rx,1); rx=e; } });
      // Retro-Fenster
      for(i=0;i<2;i++){ var wx2=20+rnd()*(W-90), wy2=hz+14+rnd()*40; box(wx2-1,wy2-1,44,26,0); box(wx2,wy2,42,24,1); box(wx2,wy2,42,6,7); box(wx2+36,wy2+1,4,4,2); box(wx2+4,wy2+10,24,2,11); box(wx2+4,wy2+15,16,2,11); }
      // Palmen
      for(i=0;i<2;i++){ var ppx=i?W-18:14, ppy=hz-4; box(ppx,ppy-26,2,26,10); for(k=0;k<6;k++){ box(ppx+k*2,ppy-26+((k*k)>>2),4,1,5); box(ppx-k*2,ppy-26+((k*k)>>2),4,1,5); } } }
    else if(sc==='moon'){ // Mondstein: mittelalterliche Mondnacht mit Burg, Steinkreis und Nebel
      for(y=0;y<H;y++){ var f2=y/H; box(0,y,W,1,f2<0.25?15:(f2<0.55?7:(f2<0.8?9:12))); }
      for(i=0;i<60;i++) box(rnd()*W,rnd()*H*0.6,1,1,rnd()<0.5?1:4);
      var mx0=(W*0.72)|0; disc(mx0,40,22,1); disc(mx0-6,44,4,11); disc(mx0+7,34,3,11); disc(mx0+2,50,2,11);
      for(x=0;x<W;x++){ var hy2=H-46+Math.sin(x/31)*10+Math.sin(x/13)*3; box(x,hy2,1,H-hy2,6); box(x,hy2,1,2,5); }
      box(18,H-100,10,56,15); box(32,H-88,10,44,15); box(46,H-104,12,60,15); for(i=0;i<4;i++){ box(18+i*3,H-103,2,3,15); box(46+i*3,H-107,2,3,15); } box(21,H-90,3,5,4); box(49,H-96,3,5,4); box(35,H-76,3,5,4);
      for(i=0;i<5;i++){ var sx=(W*0.3+i*34)|0, sy=(H-50-Math.abs(Math.sin(i*1.3))*8)|0; box(sx,sy-18,8,22,11); box(sx,sy-18,8,2,1); box(sx+2,sy-10,1,1,14); }
      for(i=0;i<6;i++){ var fy=H-60+rnd()*50; for(x=0;x<W;x+=3) box(x,fy+Math.sin(x/17+i)*2,3,1,11); } }
    else if(sc==='golf'){ box(0,0,W,H,8); // Golfplatz: Himmel, Huegel, gemaehte Streifen, Bunker, Teich, Fahnen
      for(i=0;i<5;i++){ var cxl=rnd()*W, cyl=6+rnd()*30; box(cxl,cyl,18+rnd()*14,3,1); box(cxl+3,cyl-2,10,2,1); }
      for(x=0;x<W;x++){ var hy3=(H*0.42+Math.sin(x/37)*9+Math.sin(x/15)*3)|0; box(x,hy3,1,H-hy3,6); }
      for(x=0;x<W;x++){ var hy4=(H*0.55+Math.sin(x/53+1)*7)|0; box(x,hy4,1,H-hy4,5); }
      for(x=0;x<W;x+=16) box(x,(H*0.6)|0,8,H,6);
      for(i=0;i<3;i++){ var bxs=20+rnd()*(W-70), bys=H*0.62+rnd()*H*0.25; disc(bxs,bys,9,4); disc(bxs,bys,7,3); }
      var pxl=W*(0.15+rnd()*0.6), pyl=H*0.78; disc(pxl,pyl,16,14); disc(pxl,pyl,13,8);
      for(i=0;i<3;i++){ var fxl=30+rnd()*(W-60), fyl=H*0.5+rnd()*H*0.3; box(fxl,fyl-14,1,16,1); box(fxl+1,fyl-14,6,4,2); } }
    else if(sc==='cozy'){ // Teestube: Streifentapete, Kamin, Fenster, Regal mit Teetassen, Lichterkette
      var k; box(0,0,W,H,13); for(x=0;x<W;x+=14) box(x,0,2,H-36,1);
      for(y=14;y<H-40;y+=14) for(x=7;x<W;x+=14) box(x,y,2,2,2);
      box(0,H-34,W,34,10); for(y=H-34;y<H;y+=9) box(0,y,W,1,0);
      for(y=H-34,k=0;y<H;y+=9,k++) for(x=(k%2)*20;x<W;x+=40) box(x,y,1,9,0);
      box(0,H-36,W,2,1);
      box(100,H-26,110,18,2); box(102,H-24,106,14,1); box(104,H-22,102,10,13); for(x=108;x<204;x+=8) box(x,H-18,3,2,2);   // Teppich
      var fx=16, fy=H-104;   // Kamin
      box(fx-6,fy,82,8,10); box(fx-6,fy,82,1,1);
      box(fx,fy+8,70,62,2); for(y=fy+8;y<fy+70;y+=6){ box(fx,y,70,1,0); for(x=fx+(((y-fy)/6|0)%2)*7;x<fx+70;x+=14) box(x,y,1,6,0); }
      box(fx+14,fy+24,42,46,0); box(fx+16,fy+26,38,44,15); box(fx+20,fy+62,30,6,10); box(fx+20,fy+62,30,1,3); box(fx+24,fy+60,22,2,3);
      box(fx+4,fy-10,3,10,1); box(fx+5,fy-12,1,2,4); box(fx+64,fy-10,3,10,1); box(fx+65,fy-12,1,2,4);   // Kerzen
      box(fx+30,fy-7,8,7,1); box(fx+31,fy-6,6,2,10); box(fx+38,fy-6,3,1,1); box(fx+40,fy-6,1,4,1); box(fx+38,fy-3,3,1,1); box(fx+29,fy-1,10,1,11);   // Tasse auf dem Sims
      box(fx+6,fy+8,6,12,5); box(fx+6,fy+8,6,3,1); box(fx+56,fy+8,6,12,5); box(fx+56,fy+8,6,3,1);   // Struempfe
      var wx=W-78, wy=26;   // Fenster
      box(wx-12,wy-6,76,2,4); box(wx,wy,56,64,10); box(wx+3,wy+3,50,58,15);
      for(i=0;i<12;i++) box(wx+4+rnd()*48,wy+4+rnd()*30,1,1,1);
      disc(wx+40,wy+16,6,4); disc(wx+43,wy+14,5,15);
      for(i=0;i<16;i++) box(wx+4+rnd()*48,wy+30+rnd()*30,1,1,1);
      box(wx+27,wy+3,2,58,10); box(wx+3,wy+31,50,2,10); box(wx-3,wy+64,62,4,10);
      box(wx-8,wy-4,10,76,2); box(wx+54,wy-4,10,76,2); for(y=wy;y<wy+70;y+=6){ box(wx-6,y,1,4,0); box(wx+57,y,1,4,0); }
      var sx=104, sy=70; box(sx,sy,80,3,10);   // Regal mit Teetassen und Teekanne
      for(i=0;i<3;i++){ var cx3=sx+6+i*19; box(cx3,sy-8,8,8,1); box(cx3+1,sy-7,6,2,[2,3,14][i]); box(cx3+8,sy-6,3,1,1); box(cx3+10,sy-6,1,4,1); box(cx3+8,sy-3,3,1,1); box(cx3-1,sy-1,10,1,11); }
      disc(sx+68,sy-7,7,1); box(sx+75,sy-9,3,1,1); box(sx+77,sy-9,1,6,1); box(sx+60,sy-10,4,1,1); box(sx+61,sy-12,3,3,1); box(sx+66,sy-16,5,2,2); box(sx+67,sy-18,3,2,2); box(sx+62,sy-7,6,2,13);
      box(60,34,26,20,10); box(62,36,22,16,1); heartPx(73,45,3,2);   // Bilderrahmen
      for(x=0;x<W;x+=6){ var ly=8+Math.sin(x/W*Math.PI*4)*4; box(x,ly,6,1,12); box(x+2,ly+1,2,3,[4,2,14,3,9][((x/6)|0)%5]); } }
    else if(sc==='dungeon'){ box(0,0,W,H,12); // Heldenkerker: Fliesenboden, Tueren, Fackeln, Knochen
      for(x=0;x<W;x+=24) for(y=0;y<H;y+=24){ box(x,y,24,24,((x/24+y/24)&1)?12:15); box(x,y,24,1,0); box(x,y,1,24,0); }
      for(i=0;i<22;i++){ var cx2=rnd()*W, cy2=rnd()*H; box(cx2,cy2,6,1,0); box(cx2+5,cy2,1,4,0); }
      for(i=0;i<3;i++){ var dx3=((rnd()*(W/24))|0)*24, dy3=((rnd()*(H/24))|0)*24; box(dx3+3,dy3+3,18,18,10); box(dx3+3,dy3+3,18,2,0); box(dx3+15,dy3+12,2,2,4); }
      for(i=0;i<8;i++){ var tx3=rnd()*W, ty3=rnd()*H; box(tx3,ty3,2,6,10); box(tx3-1,ty3-4,4,4,3); box(tx3,ty3-5,2,3,4); }
      for(i=0;i<14;i++){ var bx3=rnd()*W, by3=rnd()*H; box(bx3,by3,5,1,1); box(bx3-1,by3-1,2,3,1); box(bx3+4,by3-1,2,3,1); } }
    else if(sc==='forest'){ box(0,0,W,H,6); // Abenteuerwald: Gras, Steinweg, Teich, Baumkronen
      for(i=0;i<W*H/26;i++) box(rnd()*W,rnd()*H,1,1,rnd()<0.6?5:12);
      var py2=60+rnd()*90; for(x=0;x<W;x+=2) box(x,py2+Math.sin(x/19)*10,2,14,10);
      for(i=0;i<34;i++) box(rnd()*W,py2-10+rnd()*34,2,2,11);
      var qx=30+rnd()*(W-60), qy=H-50-rnd()*30; disc(qx|0,qy|0,16,7); disc((qx+4)|0,(qy+2)|0,9,8);
      for(i=0;i<16;i++){ var tx=rnd()*W, ty=rnd()*H; disc(tx|0,ty|0,9,15); disc(tx|0,ty|0,8,6); disc((tx-2)|0,(ty-2)|0,5,5); } }
    else if(sc==='flight'){ box(0,0,W,H,5);
      for(x=0;x<W;x+=24) for(y=0;y<H;y+=24){ var cc=[5,6,10,5,6][(rnd()*5)|0]; box(x,y,24,24,cc); for(i=0;i<24;i+=3) box(x,y+i,24,1,cc===10?3:(cc===6?5:6)); box(x,y,24,1,15); box(x,y,1,24,15); }
      var rx=W*(0.2+rnd()*0.6), ph=rnd()*6; for(y=0;y<H;y++) box(rx+Math.sin(y/18+ph)*W*0.12,y,7,1,8);
      var px0=20+rnd()*(W-60); box(px0,20,12,H-60,12); for(y=26;y<H-44;y+=10) box(px0+5,y,2,5,1); }
    if(sc!=='flight') drawLandmark(sc,W-42,(H*0.6)|0,0.9); else drawLandmark(sc,W-42,(H*0.6)|0,0.9); // Wahrzeichen des Clusters als Kulisse
  }
  function renderScene(){ // Hintergrund pro Runde einmal vorrendern
    bgc.width=W; bgc.height=H; var g0=g; g=bgc.getContext('2d'); paintScene(scene);
    // Kulisse zuruecknehmen: entsaettigen + abdunkeln, damit sich Spielobjekte klar abheben
    g.globalCompositeOperation='saturation'; g.fillStyle='rgba(128,128,128,0.5)'; g.fillRect(0,0,W,H); g.globalCompositeOperation='source-over';
    g.fillStyle=scene==='cozy'?'rgba(48,18,10,0.42)':scene==='moon'?'rgba(6,8,20,0.6)':scene==='dungeon'?'rgba(8,6,6,0.66)':scene==='vapor'?'rgba(8,4,24,0.62)':scene==='dream'?'rgba(8,16,24,0.58)':(scene==='forest'?'rgba(6,14,18,0.68)':'rgba(8,16,24,0.74)'); g.fillRect(0,0,W,H);
    var vg=g.createRadialGradient(W/2,H/2,H*0.35,W/2,H/2,H*0.85); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.35)'); g.fillStyle=vg; g.fillRect(0,0,W,H);
    g=g0; }
  function drawBumper(b){
    var f=b.flash>0; if(f) b.flash--; var x=b.x|0,y=b.y|0,r=b.r,i;
    if(scene==='western'){
      if(r>=9){ box(x-r-1,y-r-1,2*r+2,2*r+2,0); box(x-r,y-r,2*r,2*r,f?4:2); for(i=3;i<2*r;i+=3) box(x-r,y-r+i,2*r,1,12); box(x-1,y-1,3,3,f?1:0); }
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:3); disc(x,y,r-3,f?1:10); }
      else { disc(x,y,r,0); disc(x,y,r-1,f?4:5); box(x-r,y-1,2*r+1,1,f?1:6); box(x-1,y-r,1,2*r,f?1:6); } }
    else if(scene==='city'){
      if(r>=9){ box(x-r-1,y-r-1,2*r+2,2*r+2,0); box(x-r,y-r,2*r,2*r,f?4:9); box(x-r+2,y-r+2,2*r-4,2*r-4,f?1:8); box(x-2,y-2,4,4,f?3:7);
        for(i=-r+3;i<r-2;i+=4) { box(x+i,y-r+1,1,1,1); box(x+i,y+r-2,1,1,1); } }
      else if(r>=6){ box(x-r-1,y-r+1,2*r+2,2*r-1,0); box(x-r,y-r+2,2*r,2*r-3,f?4:3); box(x-r,y-r+2,2*r,3,f?1:2); }
      else { disc(x,y,r+1,0); disc(x,y,r,f?4:5); disc(x-1,y-1,r-2,f?1:14); } }
    else if(scene==='dream'){
      if(r>=9){ disc(x,y,r+1,0); for(var rr=r;rr>1;rr-=2) disc(x,y,rr,f?4:((rr>>1)%2?1:13)); box(x-1,y+r+1,2,4,12); }   // Lutscher mit Spirale
      else if(r>=6){ for(i=-1;i<=1;i+=2){} box(x-1,y-r-1,3,2*r+3,0); box(x-r-1,y-1,2*r+3,3,0); for(i=0;i<=r*0.7;i++){ box(x+i-1,y+i-1,3,3,0); box(x-i-1,y+i-1,3,3,0); box(x+i-1,y-i-1,3,3,0); box(x-i-1,y-i-1,3,3,0); }
        box(x-1,y-r,3,2*r+1,f?1:4); box(x-r,y-1,2*r+1,3,f?1:4); for(i=0;i<=r*0.7;i++){ box(x+i,y+i,2,2,f?1:4); box(x-i,y+i,2,2,f?1:4); box(x+i,y-i,2,2,f?1:4); box(x-i,y-i,2,2,f?1:4); } box(x-1,y-1,3,3,3); }   // Stern
      else { box(x-1,y-r-1,3,2*r+3,0); box(x-r-1,y-1,2*r+3,3,0); box(x-1,y-r,3,2*r+1,f?4:14); box(x-r,y-1,2*r+1,3,f?4:14); box(x,y,1,1,1); } }   // Funkeln
    else if(scene==='vapor'){
      if(r>=9){ disc(x,y,r+1,0); disc(x,y,r,f?4:12); for(var yy=-r+1;yy<r;yy+=3) for(var xx=-r+1;xx<r;xx+=3) if(xx*xx+yy*yy<(r-1)*(r-1)) box(x+xx,y+yy,3,3,f?1:(((xx+yy)/3|0)%2?14:13)); box(x-3,y-r+2,2,2,1); }   // Disco-Kugel
      else if(r>=6){ box(x-r-1,y-(r>>1)-2,2*r+3,r+5,0); box(x-r,y-(r>>1)-1,2*r+1,r+3,f?4:13); box(x-r+2,y-(r>>1)+1,2*r-3,r-1,15); disc(x-(r>>1),y,1,1); disc(x+(r>>1),y,1,1); box(x-r,y+(r>>1)+1,2*r+1,1,f?1:14); }   // Kassette
      else { for(i=0;i<=r;i++){ box(x-i,y-r+i*2-1,2*i+1,1,0); } for(i=0;i<=r;i++){ box(x-i,y-r+i*2,2*i+1,1,f?4:14); } box(x-1,y,2,1,1); } }   // Dreieck
    else if(scene==='moon'){
      if(r>=9){ box(x-r,y-r+2,2*r,2*r-2,0); box(x-r+1,y-r+3,2*r-2,2*r-3,f?4:11); disc(x,y-r+3,r-1,f?4:11); box(x-1,y-3,3,7,f?1:14); box(x-3,y-1,7,2,f?1:14); }   // Runenstein
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:7); box(x-1,y-r+1,3,2*r-1,f?1:4); box(x-r+1,y-1,2*r-1,3,f?1:4); disc(x,y,2,f?4:1); }   // Schild mit Kreuz
      else { for(i=-r-1;i<=r+1;i++){ var wm=r+1-Math.abs(i); box(x-wm,y+i,2*wm+1,1,0); } for(i=-r;i<=r;i++){ var wm2=r-Math.abs(i); box(x-wm2,y+i,2*wm2+1,1,f?4:1); } } }   // Mondkristall
    else if(scene==='cozy'){
      if(r>=9){ box(x-r-3,y-4,3,8,0); box(x-r-2,y-3,2,6,f?4:1); box(x+r,y-5,4,3,0); box(x+r+3,y-8,2,4,0); box(x+r+1,y-4,3,1,f?4:1); disc(x,y,r+1,0); disc(x,y,r,f?4:1); box(x-r+2,y-1,2*r-3,2,f?3:13); box(x-4,y-r-2,9,3,0); box(x-3,y-r-1,7,1,f?1:2); box(x-1,y-r-4,3,2,0); }   // Teekanne
      else if(r>=6){ box(x-r,y-r+2,2*r,2*r-3,0); box(x-r+1,y-r+3,2*r-2,2*r-5,f?4:1); box(x-r+1,y-r+3,2*r-2,3,f?3:10); box(x+r,y-2,3,5,0); box(x+r+1,y-1,1,3,f?4:1); box(x-r-2,y+r-2,2*r+5,2,0); box(x-r-1,y+r-2,2*r+3,1,f?1:13); box(x-1,y-r,1,2,f?1:11); }   // Teetasse
      else { var hs=Math.max(2,(r/2)|0); heartPx(x,y,hs+1,0); heartPx(x,y,hs,f?4:2); box(x-hs,y-hs-1,1,1,1); } }   // Herz
    else if(scene==='dungeon'){
      if(r>=9){ box(x-r-1,y-r+1,2*r+2,2*r,0); box(x-r,y-r+2,2*r,2*r-2,f?4:10); box(x-r,y-r+2,2*r,4,f?1:3); box(x-2,y-1,5,5,f?1:4); box(x,y,1,2,0); }   // Truhe
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:1); box(x-r+2,y-1,3,3,0); box(x+r-4,y-1,3,3,0); box(x-1,y+2,3,2,0); box(x-r+2,y+r-2,2*r-3,2,f?3:11); }   // Totenkopf
      else { box(x-1,y-1,3,r+2,0); box(x,y,1,r,10); disc(x,y-r+1,2,f?1:3); box(x,y-r-2,1,2,4); } }   // Fackel
    else if(scene==='forest'){
      if(r>=9){ disc(x,y,r+1,0); disc(x,y,r,f?4:5); disc(x-(r/3|0),y-(r/3|0),(r/2)|0,f?1:6); disc(x+(r/3|0),y+(r/3|0),(r/3)|0,f?4:14); box(x-1,y-1,3,3,10); }   // Baum
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:11); disc(x-1,y-1,r-2,f?1:12); box(x-2,y,2,1,0); box(x,y+1,3,1,0); box(x+1,y-2,1,3,0); }   // Fels
      else { for(i=-r-1;i<=r+1;i++){ var wd=r+1-Math.abs(i); box(x-wd,y+i,2*wd+1,1,0); } for(i=-r;i<=r;i++){ var wd2=r-Math.abs(i); box(x-wd2,y+i,2*wd2+1,1,f?4:14); } box(x-1,y-1,2,2,1); } }   // Kristall
    else {
      if(r>=9){ disc(x+2,y+3,r,11); disc(x,y,r,f?4:1); disc(x-(r*0.6|0),y+(r*0.3|0),(r*0.6)|0,f?4:1); disc(x+(r*0.6|0),y+(r*0.25|0),(r*0.6)|0,f?4:1); }
      else if(r>=6){ box(x-r,y-1,2*r+1,3,f?4:2); box(x-1,y-r,3,2*r+1,f?4:1); box(x-3,y+r-2,7,2,f?4:2); box(x-1,y-1,3,3,0); }
      else { disc(x,y,r,f?4:2); box(x-1,y-r,1,2*r,f?1:4); box(x-1,y+r,3,2,10); } } }

  function heartPx(x,y,s,c){ disc(x-s,y-s,s,c); disc(x+s,y-s,s,c); for(var j=0;j<=2*s;j++) box(x-(2*s-j),y-s+j,2*(2*s-j)+1,1,c); } // Pixel-Herz (Spitze unten)
  function rnd(){ seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; }
  function segDist(g2,x,y){ var dx=g2.x2-g2.x1, dy=g2.y2-g2.y1, l=dx*dx+dy*dy||1, t=Math.max(0,Math.min(1,((x-g2.x1)*dx+(y-g2.y1)*dy)/l)); return Math.hypot(x-g2.x1-dx*t,y-g2.y1-dy*t); }
  function layout(){ // prozedurales Spielfeld, jede Runde anders und breitenabhaengig
    cx=W/2; bumpers=[]; holes=[]; blocks=[]; seed=(Math.imul(W,7919)+Math.imul(lvNum(),104729)+Math.imul(seedN,0)+1)>>>0;
    var n=((mode==='golf'||LV().scene==='golf')&&!LV().boss)?Math.max(3,Math.round(W/53)):0;
    for(var i=0;i<n;i++) holes.push({x:8+(i+0.5)*(W-16)/n, y:(i%2===0||n===3&&i===2)?28:20, r:6});
    if(n===3){ holes[0].y=28; holes[1].y=20; holes[2].y=28; }
    var gx=cx-40; guides=[]; // abwechslungsreiche Trampoline statt Diagonalen
    function pad(x1,y1,x2,y2,rest,c,chg,hp){ guides.push({x1:x1,y1:y1,x2:x2,y2:y2,rest:rest,c:c,chg:chg||0,flash:0,hp:hp||999,hp0:hp||999}); }
    pad(6,200,gx-4,200,1.7,14,1); pad(W-6,200,W-gx+4,200,1.7,14,1);   // Boden-Pools (zeitweise)
    pad(gx-28,160,gx-8,188,1.4,2,0.35); pad(W-gx+28,160,W-gx+8,188,1.4,2,0.35); guides[0].pool=guides[1].pool=true; pw.T=900+300*poolU; applySling(); // rote Banden = kaufbares Upgrade
    var np=Math.max(1,Math.round(W/110));
    for(var q=0;q<np;q++){ var px=20+(q+0.2+rnd()*0.6)*(W-40)/np, py=70+rnd()*80, ln=7+rnd()*17,
        a=rnd()<0.25?(rnd()<0.5?-1:1)*(1.1+rnd()*0.4):(rnd()-0.5)*1.8;
      pad(px-ln*Math.cos(a),py-ln*Math.sin(a),px+ln*Math.cos(a),py+ln*Math.sin(a),1.2+rnd()*0.4,3,0.15,3); }
    // Bumper: unregelmaessig verteilt, unterschiedliche Groessen, manchmal mit Trabanten
    var want=Math.max(2,Math.round(LV().b*W/220)), radii=[5,6,6,7,9,9,12], ymin=mode==='breakout'?46:46, ymaxO=mode==='breakout'?142:168; // Breakout: Hindernisse duerfen bis in die Steinwand hinein
    scene=LV().scene;
    function okAt(x,y,r,skip){
      if(x<18+r||x>W-18-r||y<ymin+r||y>ymaxO-r) return false;
      if(y>150&&Math.abs(x-cx)<16) return false;
      for(var k=0;k<bumpers.length;k++) if(bumpers[k]!==skip&&Math.hypot(bumpers[k].x-x,bumpers[k].y-y)<bumpers[k].rr+r+9) return false;
      for(var k2=4;k2<guides.length;k2++) if(segDist(guides[k2],x,y)<r+8) return false;
      for(var kb=0;kb<blocks.length;kb++){ var o=blocks[kb], ddx=Math.max(o.x-x,0,x-o.x-o.w), ddy=Math.max(o.y-y,0,y-o.y-o.h); if(Math.hypot(ddx,ddy)<r+8) return false; }
      return true; }
    // --- Huepfpfade (Trampolin-Ketten), Bloecke mit mehreren Treffern, Bumper-Gruppen ---
    var LVd=LV(); boss=LVd.boss?makeBoss(LVd.scene):null; bshots=[]; stunT=0;
    function placePath(kind){ var n=6, step=kind==='stairs'?20:(kind==='arch'?16:18), span=step*(n-1), pts=[], dirx=rnd()<0.5?1:-1;
      var x0=24+rnd()*Math.max(1,W-48-span), y0={stairs:150,arch:135,wave:112,zigzag:105}[kind]||120;
      for(var i=0;i<n;i++){ var px=x0+i*step, py;
        if(kind==='stairs') py=y0-i*10; else if(kind==='arch') py=y0-Math.sin(i/(n-1)*Math.PI)*26; else if(kind==='wave') py=y0+Math.sin(i*1.1)*10; else py=y0+(i%2?-12:12);
        pts.push([dirx>0?px:W-px,py]); }
      for(var j=0;j<n;j++){ var p0=pts[j], p1=pts[Math.min(n-1,j+1)], pm=pts[Math.max(0,j-1)];
        var aa=Math.atan((p1[1]-pm[1])/((p1[0]-pm[0])||1))*0.6; // Pad neigt sich in Laufrichtung: lenkt den Ball zum naechsten
        pad(p0[0]-6*Math.cos(aa),p0[1]-6*Math.sin(aa),p0[0]+6*Math.cos(aa),p0[1]+6*Math.sin(aa),1.25,3,0.1,3); } }
    var SH={bar:[[0,0],[1,0],[2,0],[3,0]],stairs:[[0,2],[1,1],[2,0]],T:[[0,0],[1,0],[2,0],[1,1],[1,2]],L:[[0,0],[0,1],[0,2],[1,2],[2,2]],cross:[[1,0],[0,1],[1,1],[2,1],[1,2]],arch:[[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[3,1],[3,2]]};
    function placeBlocks(kind){ var cells=SH[kind], mw=0, mh=0; cells.forEach(function(c){ mw=Math.max(mw,c[0]+1); mh=Math.max(mh,c[1]+1); });
      var bw=mw*10, bh=mh*6;
      for(var t=0;t<40;t++){ var bx=24+rnd()*Math.max(1,W-48-bw), by=ymin+6+rnd()*Math.max(1,(mode==='breakout'?128:140)-ymin-bh), ok=true;
        for(var k=4;ok&&k<guides.length;k++) if(segDist(guides[k],bx+bw/2,by+bh/2)<Math.max(bw,bh)/2+6) ok=false;
        for(var k3=0;ok&&k3<blocks.length;k3++){ var o=blocks[k3]; if(bx<o.x+o.w+10&&bx+bw>o.x-10&&by<o.y+o.h+10&&by+bh>o.y-10) ok=false; }
        if(!ok) continue;
        cells.forEach(function(c,i){ var hp=2+(i%3===0?1:0); blocks.push({x:bx+c[0]*10,y:by+c[1]*6,w:10,h:6,hp:hp,hp0:hp,fl:0}); }); return; } }
    function mkB(x,y,r){ var hp=r>=9?3:(r>=6?2:1); return {x:x,y:y,r:r,rr:r,mv:false,hx:x,hy:y,dx:0,dy:0,ph:0,sp:0,flash:0,gild:rnd()<0.7,go:(rnd()*360)|0,hp:hp,hp0:hp,pts:r>=9?150:(r>=6?80:40)}; }
    function placeCluster(kind){ var mem=kind==='ring'?[[0,0,9]].concat([0,1,2,3,4,5].map(function(i){ return [Math.cos(i*1.047)*20,Math.sin(i*1.047)*20,3]; })):[[0,0,6],[-12,0,4],[12,0,4],[0,-12,4],[0,12,4]];
      var R0=kind==='ring'?26:18;
      for(var t=0;t<40;t++){ var x=24+R0+rnd()*Math.max(1,W-48-2*R0), y=ymin+R0+rnd()*Math.max(1,(mode==='breakout'?ymaxO+10:160)-ymin-2*R0), ok=true;
        for(var k=0;ok&&k<mem.length;k++) if(!okAt(x+mem[k][0],y+mem[k][1],mem[k][2])) ok=false;
        if(!ok) continue; mem.forEach(function(m){ bumpers.push(mkB(x+m[0],y+m[1],m[2])); }); return; } }
    if(LVd.path) placePath(LVd.path);
    LVd.sh.forEach(function(k){ if(SH[k]) placeBlocks(k); else placeCluster(k); });
    for(var tries=0;tries<500&&bumpers.length<want;tries++){
      var r0=radii[(rnd()*radii.length)|0], x0=18+rnd()*(W-36), y0=ymin+rnd()*(ymaxO-ymin);
      var mv=rnd()<LV().mv, am=mv?6+rnd()*10:0, dir=rnd()*6.28;
      if(!okAt(x0,y0,r0+am)) continue;
      var bb={x:x0,y:y0,r:r0,rr:r0+am,mv:mv,hx:x0,hy:y0,dx:Math.cos(dir)*am,dy:Math.sin(dir)*am,ph:rnd()*6.28,sp:0.012+rnd()*0.02,flash:0,gild:rnd()<0.7,go:(rnd()*360)|0,hp:r0>=9?3:(r0>=6?2:1),pts:r0>=9?150:(r0>=6?80:40)};
      bb.hp0=bb.hp;
      bumpers.push(bb);
      if(r0>=9&&rnd()<0.25){ var a0=rnd()*6.28, dd=r0+12+am; for(var m=0;m<3;m++){ var aa=a0+m*2.09, sx=x0+Math.cos(aa)*dd, sy=y0+Math.sin(aa)*dd; if(okAt(sx,sy,4,bb)) bumpers.push({x:sx,y:sy,r:4,rr:4,par:bb,an:aa,d:dd,sp:(rnd()<0.5?-1:1)*(0.02+rnd()*0.02),flash:0,hp:1,hp0:1,pts:30}); } }
    }
    bgSeed=seed; renderScene();
    makeBricks(); makeStickies();
    // Wippbalken: zwei Haelften um einen gemeinsamen Drehpunkt, links/rechts hochwippen
    fl=[{px:cx,py:200,len:60,dir:-1,a:0,rest:0,up:0,av:0}]; // ein Balken, Scharnier am gegenueberliegenden Ende
    place();
  }
  var aimKey=false, aimMx=0, aimMy=0, barVel=0, coPrev=0, bulge=0, bulgePrev=0, bv=0, curB=0, tw=0, barSide='l', tiltPrev=0, tilt=0, chSide='l', chV=0, strikeT=0, strikeP=0, strikeDir=1, swingP=0, capB=0, wasHeld=false;
  function place(){ var lim=Math.max(0,cx-fl[0].len/2-6); co=Math.max(-lim,Math.min(lim,co)); var c=cx+co;
    var hl=fl[0].len/2; fl[0].px=c; fl[0].dir=barSide==='l'?-1:1;
    guides[0].x2=c-hl-2; guides[1].x2=c+hl+2; // Pools reichen bis direkt ans Balkenende
    var ext=sling>=3?10:0; guides[2].x1=c-hl-30-ext; guides[2].x2=c-hl-2; guides[2].y2=200; guides[3].x1=c+hl+30+ext; guides[3].x2=c+hl+2; guides[3].y2=200; } // rote Banden enden bündig am Balkenende
  // Formen der Steinwand je Level
  function brickOn(pat,i,j,cols,rows){ var u=(i+0.5)/cols, v=(j+0.5)/rows, x,y, pp=String(pat).split('+');
    if(pp.length===2){ var hh=Math.ceil(rows/2); return j<hh?brickOn(pp[0],i,j,cols,hh):brickOn(pp[1],i,j-hh,cols,rows-hh); } // 'A+B': obere Haelfte Muster A, untere Muster B
    switch(pat){
      case 'holes': return (i+2*j)%5!==0;
      case 'zigzag': return Math.abs(j-Math.abs((i%8)-4)/4*(rows-1))<1.2;
      case 'ring': x=(u-0.5)*2; y=(v-0.5)*2; return x*x+y*y<=1&&x*x+y*y>=0.3;
      case 'cross': return Math.abs(i+0.5-cols/2)<2||j===((rows/2)|0)||j===(((rows-1)/2)|0);
      case 'steps': return ((i+j*2)%7)<4;
      case 'xmark': return Math.abs(u-v)<0.13||Math.abs(u-(1-v))<0.13;
      case 'twin': return Math.pow((u-0.27)/0.22,2)+Math.pow((v-0.5)/0.5,2)<=1||Math.pow((u-0.73)/0.22,2)+Math.pow((v-0.5)/0.5,2)<=1;
      case 'checker': return (i+j)%2===0;
      case 'stripes': return j%2===0;
      case 'pyramid': return i>=j*2&&i<cols-j*2;
      case 'skyline': return j<1+Math.floor((Math.abs(Math.sin(i*2.7)+Math.sin(i*1.3+1))/2)*rows);
      case 'frame': return j===0||j===rows-1||i<2||i>=cols-2;
      case 'waves': return Math.abs(j-(rows-1)/2-Math.sin(u*Math.PI*4)*(rows-1)/2*0.85)<1.1;
      case 'diamond': return Math.abs(u-0.5)*2+Math.abs(v-0.5)*2<=1;
      case 'columns': return i%3!==2;
      case 'heart': x=(u-0.5)*2.6; y=1.3-v*2.4; return Math.pow(x*x+y*y-1,3)-x*x*y*y*y<=0;
      default: return true; } }
  // Steingroessen: je nach Level feiner und tiefer (mehr Reihen). M = normal, S = fein, F = sehr fein
  var BSZ={M:{w:12,h:5,px:14,py:7,rm:1},S:{w:8,h:4,px:9,py:5,rm:1.6},F:{w:6,h:3,px:7,py:4,rm:2.3}};
  function brickSz(){ var z=brickSz0(); return cheat.dfine?(z===BSZ.M?BSZ.S:BSZ.F):z; }
  function brickSz0(){ var i=(lvNum()-1)%LEVELS.length, wd=(i/4)|0, j=i%4; if(j===2) return wd>=3?BSZ.F:BSZ.S; if(j===1&&wd>=2) return BSZ.S; if(j===0&&wd>=5) return BSZ.S; return BSZ.M; }
  // Klebe-Bloecke: der Ball bleibt kurz haften und teilt sich dann in 2 oder 3 Baelle (Block verbraucht sich)
  function makeStickies(){ stickies=[]; if(mode!=='breakout'||LV().boss||lvNum()<2) return; var want=lvNum()>=7?2:1, tries=0;
    while(stickies.length<want&&tries++<60){ var w=16, h=6, x=18+rnd()*(W-36-w), y=96+rnd()*48, ok=true;
      bumpers.forEach(function(b){ if(x+w+6>b.x-b.r&&x-6<b.x+b.r&&y+h+6>b.y-b.r&&y-6<b.y+b.r) ok=false; });
      blocks.forEach(function(o){ if(x+w+6>o.x&&x-6<o.x+o.w&&y+h+6>o.y&&y-6<o.y+o.h) ok=false; });
      guides.forEach(function(q){ if(Math.abs((q.x1+q.x2)/2-(x+w/2))<22+Math.abs(q.x2-q.x1)/2&&Math.abs((q.y1+q.y2)/2-(y+h/2))<14+Math.abs(q.y2-q.y1)/2) ok=false; });
      stickies.forEach(function(q){ if(Math.abs(q.x-x)<w+14&&Math.abs(q.y-y)<18) ok=false; });
      if(ok) stickies.push({x:x,y:y,w:w,h:h,n:(lvNum()>=4&&rnd()<0.5)?3:2,c:stickies.length%2?13:5,fl:0}); } }
  function releaseSticky(b,o){ var room=7-extras.length, n=Math.max(1,Math.min(o.n,room+1)), spread=n===3?[-0.75,0,0.75]:(n===2?[-0.5,0.5]:[0]), sp=4.8, i, en=Math.max(b.e||0,0.6);
    for(i=0;i<n;i++){ var a=b.sn+spread[i]; if(i===0){ b.vx=Math.cos(a)*sp; b.vy=Math.sin(a)*sp; } else extras.push({x:b.x,y:b.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,e:en}); }
    b.e=en; b.stk=null; o.dead=true; score+=mult()*100*n; burst(b.x,b.y,6,o.c); shake=Math.max(shake,4); msg='SPLIT x'+n+'!'; msgT=60; }
  function makeBricks(){ bricks=[]; if(mode!=='breakout'||LV().boss) return;
    var bz=brickSz(), cols=Math.max(4,Math.floor((W-16)/bz.px)), x0=(W-cols*bz.px+(bz.px-bz.w))/2, rows=Math.min(Math.floor(60/bz.py),Math.round(LV().rows*bz.rm)), pat=LV().pat;
    for(var ry=0;ry<rows;ry++) for(var cxi=0;cxi<cols;cxi++){
      if(!brickOn(pat,cxi,ry,cols,rows)) continue;
      bricks.push({w:bz.w,h:bz.h,x:x0+cxi*bz.px,ci:cxi,ri:ry,y:28+ry*bz.py,c:[2,3,4,5,8][ry%5],hp:1+((ry===0&&lvNum()>=3)?1:0)+((lvNum()>=6&&ry<=1)?1:0),fl:0}); }
    // Freiraeume: senkrechte Gaenge (Ball kommt durch) + seitlicher Quergang
    var nl=1+((lvNum()+rnd()*2)|0)%3, lw=Math.max(1,Math.round(18/bz.px)), lanes=[], li;
    for(li=0;li<nl;li++){ var lc=Math.round((li+0.5+(rnd()-0.5)*0.5)*cols/nl); lanes.push(Math.max(1,Math.min(cols-1-lw,lc))); }
    var hrow=rows>=4&&rnd()<0.6?1+((rnd()*(rows-2))|0):-1, hside=rnd()<0.5, hlen=Math.round(cols*(0.45+rnd()*0.25));
    bricks=bricks.filter(function(b){ for(var q=0;q<lanes.length;q++) if(b.ci>=lanes[q]&&b.ci<lanes[q]+lw) return false; if(b.ri===hrow&&(hside?b.ci<hlen:b.ci>=cols-hlen)) return false; return true; });
    // Mischen: Steine weichen Bumpern/Bloecken (Hindernisse sitzen mitten in der Wand), dazu Stein-Grueppchen im Spielfeld
    function clear(x,y,w,h,pad){ var k, o; for(k=0;k<bumpers.length;k++){ o=bumpers[k]; if(Math.hypot(Math.max(x-o.x,0,o.x-x-w),Math.max(y-o.y,0,o.y-y-h))<o.rr+pad) return false; }
      for(k=0;k<blocks.length;k++){ o=blocks[k]; if(x<o.x+o.w+pad&&x+w>o.x-pad&&y<o.y+o.h+pad&&y+h>o.y-pad) return false; }
      for(k=4;k<guides.length;k++) if(segDist(guides[k],x+w/2,y+h/2)<Math.max(w,h)/2+5) return false; return true; }
    bricks=bricks.filter(function(b){ return clear(b.x,b.y,b.w,b.h,2); });
    // Hindernisse in die Luecken des Musters einbauen (Bumper mitten in der Wand)
    var emb=Math.min(4,1+((lvNum()-1)%LEVELS.length%4)), er=0, cand=[];
    for(var ry2=0;ry2<rows;ry2++) for(var cx2=0;cx2<cols;cx2++){ var ex=x0+cx2*bz.px+bz.w/2, ey=28+ry2*bz.py+bz.h/2; if(clear(ex-6,ey-6,12,12,3)&&!bricks.some(function(b){ return Math.hypot(b.x+b.w/2-ex,b.y+b.h/2-ey)<Math.max(bz.px*0.95,10); })) cand.push([ex,ey]); }
    for(var et=0;et<60&&er<emb&&cand.length;et++){ var cd=cand[(rnd()*cand.length)|0], rb=5+((rnd()*2)|0); if(bumpers.some(function(b){ return Math.hypot(b.x-cd[0],b.y-cd[1])<b.rr+rb+14; })) continue; bumpers.push({x:cd[0],y:cd[1],r:rb,rr:rb,mv:false,hx:cd[0],hy:cd[1],dx:0,dy:0,ph:0,sp:0,flash:0,gild:rnd()<0.7,go:(rnd()*360)|0,hp:rb>=6?2:1,hp0:rb>=6?2:1,pts:rb>=6?80:40}); er++; }
    var nc=2+Math.min(4,(lvNum()-1)%LEVELS.length%5), cc=0, tr;
    for(tr=0;tr<120&&cc<nc;tr++){ var cw=2+((rnd()*3)|0), ch=1+((rnd()*2)|0), gx0=24+rnd()*(W-48-cw*bz.px), gy0=92+rnd()*(122-92-ch*bz.py), ok2=true;
      if(!clear(gx0-3,gy0-3,cw*bz.px+6,ch*bz.py+6,4)) continue; for(var bk=0;bk<bricks.length&&ok2;bk++){ var o2=bricks[bk]; if(gx0<o2.x+o2.w+4&&gx0+cw*bz.px>o2.x-4&&gy0<o2.y+o2.h+4&&gy0+ch*bz.py>o2.y-4) ok2=false; } if(!ok2) continue;
      for(var yy2=0;yy2<ch;yy2++) for(var xx2=0;xx2<cw;xx2++) bricks.push({w:bz.w,h:bz.h,x:gx0+xx2*bz.px,y:gy0+yy2*bz.py,c:[2,3,4,5,8][(cc+yy2)%5],hp:1,fl:0}); cc++; }
  }
  layout();
  var bumpCd=0, bumpHeld=false, shake=0, stuckN=0, stuckX=0, stuckY=0;
  var capH=null, capT=0, extras=[];
  function split(){ if(state!=='play'||extras.length>=6) return; var sp=Math.max(3,Math.hypot(ball.vx,ball.vy)), a0=Math.atan2(ball.vy,ball.vx);
    [-0.5,0.5].forEach(function(d){ extras.push({x:ball.x,y:ball.y,vx:Math.cos(a0+d)*sp,vy:Math.sin(a0+d)*sp,e:ball.e}); }); burst(ball.x,ball.y,4,14); }
  var teeHeld=false, ball, state, aim, power, strokes, score, hole, msg, msgT, tick = 0;
  var mainBall=null;
  function reset(){ lastPX=null; chV=0; strikeT=0; wasHeld=false; extras=[]; stuckN=0; bumpHeld=true; ball={x:cx+co,y:172,vx:0,vy:0,e:0}; mainBall=ball; state='tee'; aim=0; power=0; teeHeld=false; }
  var startLv=(location.hash.match(/level=(\d+)/)||[0,1])[1]|0||1; // #level=7 springt zu einem Level
  function init(first){ loopG=null; extras=[]; gold=0; sling=0; chgT=0; lenT=0; powT=0; poolU=0; goldU=0; luckU=0; ghostU=0; upO=[0,0,0,0,0,0,0,0]; pw={E:0,S:0,M:0,X:0,T:0,Y:0,G:0,N:0,F:0,K:0,W:0}; saver=false; caps=[]; strokes=0; score=0; hole=startLv; bestLv=startLv; lives=cheat.dlife?1:3; level=startLv; seedN++; layout(); msg=(mode==='golf'?'LOCH '+hole+' ':'LEVEL '+level+' ')+LV().name+(mode==='golf'?' PAR '+LV().par:''); msgT=140; reset();
    if(!first) clearSave(); }
  init(true);
  var skipTitle=/level=|shop|split/.test(location.hash);
  if(!skipTitle){ var bs=loadSave(); if(bs&&bs.lv) applySave(bs); state='title'; menuSel=0; }
  try{ if(!skipTitle&&sessionStorage['golfIn_'+mode]==='1'&&loadSave()){ continueGame(); startLevel(); inGm=true; } }catch(e){}
  try{ if(!skipTitle&&sessionStorage['golfMap_'+mode]==='1'){ mapPick=true; mapNote=''; mapSel=Math.max(0,Math.min(LEVELS.length-1,+sessionStorage['golfMapSel_'+mode]||0)); mapScroll=0; mapFollow=true; mapT=0; mapAnim=false; state='map'; inMapPick=true; } }catch(e){} // F5 in der Stage-Auswahl bleibt dort
  if(location.hash.indexOf('shop')>=0){ gold=120; openShop(); } // Testhilfe: #shop
  if(location.hash.indexOf('split')>=0) setTimeout(function(){ state='play'; ball.x=cx; ball.y=150; ball.vx=2; ball.vy=-3; ball.e=1; split(); },500); // Testhilfe: #split
  function press(k,v){ K[k]=v; }
  (function(){ // Rahmen ausblenden: Button oder F2, Zustand wird gemerkt
    function setBare(v){ document.body.classList.toggle('golf-bare',v); try{ localStorage.golfBare=v?'1':'0'; }catch(e){} }
    try{ if(localStorage.golfBare==='1') setBare(true); }catch(e){}
    game.querySelectorAll('[data-bare]').forEach(function(b){ b.addEventListener('click',function(){ setBare(!document.body.classList.contains('golf-bare')); }); b.addEventListener('pointerdown',function(e){ e.stopPropagation(); }); });
    window.addEventListener('keydown',function(e){ if(e.key==='F2'){ e.preventDefault(); setBare(!document.body.classList.contains('golf-bare')); } });
  })();
  window.addEventListener('keydown',function(e){
    if(state==='win'){ if(winT<WINLEN-45&&(e.key===' '||e.key==='Enter')) winT=1; e.preventDefault(); return; }
    if(state==='over'){ var ko=e.key; if(ko==='ArrowLeft'||ko==='a'||ko==='A'||ko==='ArrowUp') overSel=0; else if(ko==='ArrowRight'||ko==='d'||ko==='D'||ko==='ArrowDown') overSel=1; else if(overT>40&&(ko==='Enter'||ko===' ')){ if(overSel===0) overRetry(); else overMap(); } else if(overT>40&&(ko==='r'||ko==='R')) overRetry(); else if(overT>40&&(ko==='m'||ko==='M'||ko==='Escape')) overMap(); else return; e.preventDefault(); return; }
    if(e.key==='Tab'&&(ambient||state==='tee'||state==='play')){ e.preventDefault(); toggleAuto(); return; }
    if(ambient&&!(state==='shop'&&!ambFull)){ if(e.key==='Escape'){ e.preventDefault(); if(ambFull) exitToTitle(); else toggleAuto(); } return; }
    if(state==='look'){ var kk3=e.key, N3=LEVELS.length;
      if(kk3==='ArrowRight'||kk3==='d'||kk3==='D') lookStage(lookIdx%N3+1);
      else if(kk3==='ArrowLeft'||kk3==='a'||kk3==='A') lookStage((lookIdx+N3-2)%N3+1);
      else if(kk3==='ArrowDown'||kk3==='s'||kk3==='S') lookStage(clusterJump(1));
      else if(kk3==='ArrowUp'||kk3==='w'||kk3==='W') lookStage(clusterJump(-1));
      else if(kk3==='Enter'||kk3===' '){ startLv=lookIdx; startNew(); }
      else if(kk3==='Escape') exitToTitle();
      else return; e.preventDefault(); return; }
    if(state==='title'){ var mi=menuItems(), kt=e.key;
      if(kt==='ArrowDown'||kt==='s'||kt==='S') menuSel=Math.min(mi.length-1,menuSel+1);
      else if(kt==='ArrowUp'||kt==='w'||kt==='W') menuSel=Math.max(0,menuSel-1);
      else if(kt==='Enter'||kt===' ') mi[menuSel].f();
      else if(kt==='Delete'||kt==='Backspace') trashClick();
      else return; e.preventDefault(); return; }
    if(state==='map'&&mapPick){ var km=e.key, NM=LEVELS.length;
      if(km==='ArrowRight'||km==='d'||km==='D'){ mapSel=(mapSel+1)%NM; mapFollow=true; }
      else if(km==='ArrowLeft'||km==='a'||km==='A'){ mapSel=(mapSel+NM-1)%NM; mapFollow=true; }
      else if(km==='ArrowDown'||km==='s'||km==='S'){ mapSel=clusterJump(1,mapSel+1)-1; mapFollow=true; }
      else if(km==='ArrowUp'||km==='w'||km==='W'){ mapSel=clusterJump(-1,mapSel+1)-1; mapFollow=true; }
      else if(km==='l'||km==='L') toggleLoop();
      else if(km==='PageDown') mapPage(1); else if(km==='PageUp') mapPage(-1);
      else if(km==='Enter'||km===' ') startPick(mapSel);
      else if(km==='Escape'){ mapPick=false; mapNote=''; state='title'; menuSel=0; }
      else return; e.preventDefault(); return; }
    if(state==='map'){ var kc=e.key, smx=mapSelMax(); if(kc==='ArrowRight'||kc==='d'||kc==='D'){ mapSel=Math.min(smx,mapSel+1); mapFollow=true; } else if(kc==='ArrowLeft'||kc==='a'||kc==='A'){ mapSel=Math.max(0,mapSel-1); mapFollow=true; } else if(kc==='PageDown'){ mapPage(1); } else if(kc==='PageUp'){ mapPage(-1); } else if(kc==='Enter'||kc===' '){ mapStart(mapSel); } else if(e.key==='Escape'){ state='title'; menuSel=0; } else return; e.preventDefault(); return; }
    if(state==='tee'&&(e.key==='b'||e.key==='B')){ e.preventDefault(); openShop('tee'); return; }
    if(state==='tee'&&(e.key==='m'||e.key==='M')){ e.preventDefault(); state='map'; mapT=0; mapAnim=false; return; }
    if(state==='tee'&&e.key==='Escape'){ saveGame(); state='title'; menuSel=0; return; }
    if(state==='shop'){ var N=curList().length, kk2=e.key;
      if(kk2==='Tab'||kk2==='e'||kk2==='E'||kk2==='PageDown'){ setTab(shopTab+(e.shiftKey&&kk2==='Tab'?-1:1)); }
      else if(kk2==='q'||kk2==='Q'||kk2==='PageUp'){ setTab(shopTab-1); }
      else if(kk2==='ArrowRight'||kk2==='d'||kk2==='D'){ if(sel<N){ var pgR=(sel/8)|0, rwR=((sel%8)/4)|0; if(sel%4<3&&sel+1<N) sel++; else if(pgR<Math.ceil(N/8)-1) sel=Math.min(N-1,(pgR+1)*8+rwR*4); } shopCol=sel%4; }
      else if(kk2==='ArrowLeft'||kk2==='a'||kk2==='A'){ if(sel<N){ var pgL=(sel/8)|0, rwL=((sel%8)/4)|0; if(sel%4>0) sel--; else if(pgL>0) sel=(pgL-1)*8+rwL*4+3; } shopCol=sel%4; }
      else if(kk2==='ArrowDown'||kk2==='s'||kk2==='S'){ if(sel<N){ if(((sel%8)/4|0)===0&&sel+4<N) sel+=4; else sel=N; } }
      else if(kk2==='ArrowUp'||kk2==='w'||kk2==='W'){ if(sel>=N){ var t2=shopPg*8+4+shopCol; sel=t2<N?t2:Math.min(N-1,shopPg*8+shopCol); } else if(((sel%8)/4|0)===1) sel-=4; }
      else if(kk2==='Enter'){ if(sel>=N) closeShop(); else activate(sel); }
      else if(kk2===' '||kk2==='Escape'){ closeShop(); }
      else if(kk2>='1'&&kk2<='8'&&shopPg*8+ +kk2<=N){ sel=shopPg*8+ +kk2-1; activate(sel); }
      else return;
      e.preventDefault(); return; }
    var k={ArrowLeft:'ml',ArrowRight:'mr',a:'l',A:'l',d:'r',D:'r',' ':'s'}[e.key]; if(!k) return;
    if(e.target.matches&&e.target.matches('input,textarea')) return;
    e.preventDefault(); if(k==='s'&&e.shiftKey&&state==='play') press('g',1); else press(k,1); }); // Shift+Leertaste im Spiel = Stups (Ghost Shot), Leertaste = Balken laden
  window.addEventListener('keyup',function(e){
    var k={ArrowLeft:'ml',ArrowRight:'mr',a:'l',A:'l',d:'r',D:'r',' ':'s'}[e.key]; if(k){ press(k,0); if(k==='s') press('g',0); } });
  var mx=cx, my=H*0.45, mouseIn=false;
  var lockSkip=0;
  function locked(){ return document.pointerLockElement===cv; }
  document.addEventListener('pointerlockchange',function(){ lockSkip=5; lastPX=null; });
  function track(e){ var rc=cv.getBoundingClientRect();
    if(locked()){ if(lockSkip>0||Math.abs(e.movementX)>250||Math.abs(e.movementY)>250){ if(lockSkip>0) lockSkip--; return; } mx=Math.max(0,Math.min(W,mx+e.movementX*W/rc.width)); my=Math.max(0,Math.min(H,my+e.movementY*H/rc.height)); }
    else { mx=(e.clientX-rc.left)/rc.width*W; my=(e.clientY-rc.top)/rc.height*H; }
    mouseIn=e.pointerType!=='touch'; }
  var lastPX=null; // Balken folgt der Maus nur relativ: kein Sprung beim Spawn oder Wechsel in den Spielzustand
  function dragTo(e){ var skipMv=lockSkip>0; track(e); // track() zaehlt lockSkip herunter, daher vorher merken
    if(state==='map'){ var nh=nodeAt(); if(nh>=0&&nh!==mapSel&&(mapPick||nh<=mapSelMax())){ mapSel=nh; mapFollow=false; mapPgT=mapLayout().gi[nh]; } }
    if(state==='title'){ var mi3=menuItems(); for(var q3=0;q3<mi3.length;q3++) if(hit(menuR['m'+q3])) menuSel=q3; }
    if(state==='shop'){ for(var hi=0;hi<curList().length;hi++) if(hit(shopR['b'+hi])) sel=hi; if(hit(shopR.go)) sel=curList().length; }
    if(!ambient && locked() && (state==='play'||(state==='tee'&&!K.s)) && (e.pointerType==='mouse'||(e.buttons&1))){
      var rcw=cv.getBoundingClientRect().width, d=locked()?((skipMv||lockSkip>0||Math.abs(e.movementX)>250)?0:e.movementX):(lastPX===null?0:e.clientX-lastPX);
      co+=d*W/rcw; place(); }
    lastPX=(state==='play'||state==='tee')?e.clientX:null; }
  cv.addEventListener('pointermove',dragTo);
  cv.addEventListener('wheel',function(e){ if(state==='map'){ e.preventDefault(); if(tick-mapWheelT>12){ mapWheelT=tick; mapPage((e.deltaY+e.deltaX)>0?1:-1); } return; } if(state==='shop'){ e.preventDefault(); if(tick-shopWheelT>10){ shopWheelT=tick; shopPageTo(shopPg+((e.deltaY+e.deltaX)>0?1:-1)); } } },{passive:false});
  cv.addEventListener('contextmenu',function(e){ e.preventDefault(); });
  function hit(rc){ return rc&&mx>=rc.x&&mx<=rc.x+rc.w&&my>=rc.y&&my<=rc.y+rc.h; }
  cv.addEventListener('pointerdown',function(e){ if(state==='win'){ if(winT<WINLEN-45) winT=1; return; } if(ambient&&!(state==='shop'&&!ambFull)){ if(ambFull) exitToTitle(); else toggleAuto(); return; } if(state==='look'){ dragTo(e); var N4=LEVELS.length; if(mx<W/3) lookStage((lookIdx+N4-2)%N4+1); else if(mx>W*2/3) lookStage(lookIdx%N4+1); else { startLv=lookIdx; startNew(); } return; }
    shiftDown=e.shiftKey; if(e.pointerType==='mouse'&&!locked()&&(state==='tee'||state==='play')&&cv.requestPointerLock){ try{ var pr=cv.requestPointerLock(); if(pr&&pr.catch) pr.catch(function(){}); }catch(x){} cv.focus(); return; } /* erster Klick fängt nur die Maus (Balken), kein Schlag/Aufladen */ dragTo(e); cv.focus();
    if(state==='over'){ if(overT>40){ if(hit(overR.retry)) overRetry(); else if(hit(overR.map)) overMap(); } return; }
    if(state==='title'){ if(hit(menuR.trash)){ trashClick(); return; } var mi2=menuItems(); for(var q2=0;q2<mi2.length;q2++) if(hit(menuR['m'+q2])){ menuSel=q2; mi2[q2].f(); return; } return; }
    if(state==='map'){ if(e.button===2){ mapPage(1); padFl.pr=14; return; } if(hit(mapR.pl)){ mapPage(-1); padFl.pl=14; return; } if(hit(mapR.pr)){ mapPage(1); padFl.pr=14; return; } for(var dpi=0;dpi<mapPages();dpi++) if(hit(mapR['d'+dpi])){ mapPgT=dpi; mapFollow=false; return; }
      if(mapPick&&hit(loopR)){ toggleLoop(); return; }
      if(mapPick){ if(backR&&hit(backR)){ mapPick=false; mapNote=''; state='title'; menuSel=0; return; } var na=nodeAt(); if(na>=0){ mapSel=na; startPick(na); } else if(my<148){ mapPage(-1); padFl.pl=14; } return; }
      var nb=nodeAt(); if(nb>=0&&nb<=mapSelMax()){ mapSel=nb; mapStart(nb); return; } startLevel(); return; }
    if(state==='shop'){ if(hit(shopR.pl)){ shopPageTo(shopPg-1); return; } if(hit(shopR.pr)){ shopPageTo(shopPg+1); return; } for(var dq=0;dq<9;dq++) if(hit(shopR['dp'+dq])){ shopPageTo(dq); return; } for(var ti2=0;ti2<5;ti2++) if(hit(shopR['t'+ti2])){ setTab(ti2); return; } for(var si=0;si<curList().length;si++) if(hit(shopR['b'+si])){ sel=si; activate(si); return; } if(hit(shopR.go)) closeShop(); return; }
    if(state==='tee'){ if(e.button===0){ try{ cv.setPointerCapture(e.pointerId); }catch(x){} press('s',1); } }
    else { press(e.button===2?'r':'l',1); } });
  function up(e){ if(e.button===0||e.pointerType!=='mouse') press('s',0); if(e.button===2) press('r',0); else if(e.button===0){ press('l',0); } else { press('l',0); press('r',0); } } // nur Linksklick-Loslassen loest den Schuss aus
  cv.addEventListener('pointerup',up);
  // Loslassen auch dann erkennen, wenn die Maus beim Laden das Feld verlaesst oder der Pointer-Lock greift
  window.addEventListener('pointerup',function(e){ if(e.button===0&&state==='tee') press('s',0); });
  window.addEventListener('mouseup',function(e){ if(e.button===0&&state==='tee') press('s',0); });
  window.addEventListener('blur',function(){ teeHeld=false; press('s',0); press('l',0); press('r',0); });
  cv.addEventListener('pointercancel',function(){ teeHeld=false; press('s',0); press('l',0); press('r',0); });
  cv.addEventListener('pointerleave',function(){ press('l',0); press('r',0); });
  game.querySelectorAll('[data-k]').forEach(function(b){
    ['pointerdown'].forEach(function(t){ b.addEventListener(t,function(e){ e.preventDefault(); press(b.dataset.k,1); }); });
    ['pointerup','pointerleave','pointercancel'].forEach(function(t){ b.addEventListener(t,function(){ press(b.dataset.k,0); }); });
  });
  function insideRect(o,R){ // Ballmitte steckt im Rechteck: ueber die kleinste Eindringtiefe zur naechsten Kante hinausschieben (kein Durchrutschen)
    var l=ball.x-o.x, r=o.x+o.w-ball.x, t=ball.y-o.y, b=o.y+o.h-ball.y, m=Math.min(l,r,t,b);
    if(m===t){ ball.y=o.y-R; return [0,-1]; } if(m===b){ ball.y=o.y+o.h+R; return [0,1]; }
    if(m===l){ ball.x=o.x-R; return [-1,0]; } ball.x=o.x+o.w+R; return [1,0]; }
  function bounce(nx,ny,rest){ var d=ball.vx*nx+ball.vy*ny; if(d<0){ ball.vx-=(1+rest)*d*nx; ball.vy-=(1+rest)*d*ny; } }
  var pxo=0, ghostT=0, ghostX=0, ghostY=0, inGm=false, bdrK=null, coS=0, macX, macY;
  // Super-Game-Boy-Rahmen: der schwarze Bereich um das Spielfeld bekommt je Level-Szene ein eigenes Muster
  var BORD={
    western:'repeating-linear-gradient(90deg,#3a2210 0 14px,#4d2f16 14px 16px),#3a2210',
    vapor:'repeating-linear-gradient(45deg,#2a0a45 0 10px,#ff3d9a 10px 12px,#2a0a45 12px 22px,#00e5ff 22px 24px)',
    city:'linear-gradient(#0a0a1c,#1b1b3a),repeating-linear-gradient(90deg,#ffdd0055 0 2px,transparent 2px 18px)',
    cozy:'repeating-conic-gradient(#5a3a22 0 25%,#6e4a2e 0 50%) 0 0/24px 24px',
    dream:'radial-gradient(circle at 20% 30%,#aa00ff55 0 3px,transparent 4px) 0 0/40px 40px,#12082a',
    dungeon:'repeating-linear-gradient(0deg,#1a1a1a 0 18px,#2a2a2a 18px 20px),repeating-linear-gradient(90deg,transparent 0 30px,#0008 30px 32px),#1a1a1a',
    flight:'linear-gradient(#0a3a7a,#7ac8ff)',
    forest:'repeating-linear-gradient(90deg,#0c2a10 0 12px,#124018 12px 20px,#0c2a10 20px 26px)',
    moon:'radial-gradient(circle at 70% 30%,#888 0 4px,transparent 5px) 0 0/60px 60px,radial-gradient(circle at 20% 80%,#666 0 6px,transparent 7px) 0 0/80px 80px,#1a1a22',
    golf:'repeating-linear-gradient(90deg,#1f6a2a 0 20px,#267a32 20px 40px)'};
  function setBorder(){ var k=state==='title'?(tbShow||''):(LV().scene||''); if(k===bdrK) return; bdrK=k; var bg=BORD[k]||'#000'; // ganze Spielflaeche inkl. Bereich ueber/unter dem Feld
    view.style.background=bg; game.style.setProperty('--bd',bg); }
  var inMapPick=false; var discoOn=false; function step(){ if(cheat.disco){ discoOn=true; if(tick%6===0){ var t0=C[2]; C[2]=C[3]; C[3]=C[4]; C[4]=C[5]; C[5]=C[8]; C[8]=C[9]; C[9]=C[13]; C[13]=C[14]; C[14]=t0; } } else if(discoOn){ discoOn=false; C=paletteFor(actv.style).slice(); } stepCore(); apGuard(); setBorder(); var mp=state==='map'&&mapPick; if(mp!==inMapPick){ inMapPick=mp; try{ sessionStorage['golfMap_'+mode]=mp?'1':'0'; }catch(e){} } if(mp){ try{ sessionStorage['golfMapSel_'+mode]=mapSel; }catch(e){} } var ig=!ambient&&(state==='tee'||state==='play'); if(ig!==inGm&&(ig||state==='title'||state==='map')){ inGm=ig; try{ sessionStorage['golfIn_'+mode]=ig?'1':'0'; }catch(e){} } } // merkt: Refresh im Spiel startet das Level neu
  function stepCore(){
    if(state==='title'||state==='map'){ tick++; mapT++; if(state==='map'&&mapT<=2) mapScroll=mapCenter(mapPick?mapSel:(lvNum()-1)%LEVELS.length); return; }
    if(state==='over'){ tick++; overT++; return; }
    if(state==='look'){ tick++; moveBumpers(); updateBoss(); return; }
    if(ambient) ambientAI();
    if(state==='win'){ tick++; moveBumpers(); winT--; ball.x+=(cx+co-ball.x)*0.08; ball.y+=(120+Math.sin(tick*0.15)*6-ball.y)*0.08; bulge=6+Math.sin(tick*0.4)*5; curB=bulge;
      if(winT%9===0) burst(24+Math.random()*(W-48),36+Math.random()*110,5,[1,2,3,4,13,14][(Math.random()*6)|0]);
      if(winT<=0) winApply(); return; }
    if(state==='shop'){ tick++; if(ambient&&ambFull) ambShopAI(); else if(shopFrom==='auto') autoShopTick(); return; }
    if(state==='capt'){ tick++; moveBumpers();
      if(--capT<=0){
        if(holes.every(function(q){ return q.done; })){ // alle Loecher getroffen = Loch geschafft
          winLevel(); return;
        } else { var ea=1.5708+(rnd()-0.5)*1.4;
          ball.vx=Math.cos(ea)*5.5; ball.vy=Math.sin(ea)*5.5; ball.x=capH.x; ball.y=capH.y+capH.r; ball.e=1; state='play'; shake=8; burst(capH.x,capH.y,5,1); } }
      return; }
    tick++; moveBumpers(); updateBoss(); if(tick%180===0) saveGame();
    for(var pk in pw) if(pw[pk]>0&&(pk!=='T'||state==='play')) pw[pk]--;
    guides[0].off=guides[1].off=pw.T<=0&&!cheat.pools; if(cheat.saver) saver=true; if(cheat.mega) pw.M=Math.max(pw.M,2); // Boden-Pools nur zeitweise aktiv
    fl.forEach(function(f){ f.len=60+10*lenT+(pw.E>0?28:0); });
    caps.forEach(function(c){ if(c.fast){ c.vy+=0.45; c.y+=c.vy; c.x+=(c.x<cx?-0.15:0.15); } else c.y+=0.55; // nach einem Verlust fallen Kapseln beschleunigt weg und sind nicht mehr einsammelbar
      if(c.fast){ if(c.y>H+8) c.dead=true; return; }
      if((c.y>=192&&c.y<=208&&c.x>=cx+co-48&&c.x<=cx+co+48)||(state==='play'&&Math.hypot(ball.x-c.x,ball.y-c.y)<7)){ collect(c.k); c.dead=true; burst(c.x,c.y,3); }
      else if(c.y>H+4) c.dead=true; });
    caps=caps.filter(function(c){ return !c.dead; });
    // Pfeiltasten beschleunigen den Balken (Traegheit), ohne Taste bremst er sanft ab
    if(state==='play'&&heldAny()){ var kd2=((K.mr||(K.s&&K.r))?1:0)-((K.ml||(K.s&&K.l))?1:0); if(kd2) aim=Math.max(-1.2,Math.min(1.2,aim+kd2*0.03)); }
    if((teeHeld&&state==='tee')||(state==='play'&&heldAny())) vco*=0.6; // Ball gespannt: Richtungstasten zielen, Balken bleibt stehen
    else if(K.ml&&!K.mr) vco-=(vco>0?0.6:0.3)*(shiftDown?2:1); else if(K.mr&&!K.ml) vco+=(vco<0?0.6:0.3)*(shiftDown?2:1); else vco*=0.82;
    var vmx=shiftDown?7:4; vco=Math.max(-vmx,Math.min(vmx,vco)); var co0=co; co+=vco; place(); if(Math.abs(co-(co0+vco))>0.01) vco=0;
    coS=coPrev; var ddc=co-coPrev; if(Math.abs(ddc)>4){ co=coPrev+(ddc>0?4:-4); place(); } // Balken max. 9px/Frame: schnelle Mausrucke duerfen nicht durch den Ball springen
    barVel=co-coPrev; coPrev=co;
    // Trampolin-Balken: beide Enden fest, die Mitte biegt sich nach oben. Taste halten = laden, loslassen = Schlag
    if(stunT>0) stunT--;
    var kh=(K.l||K.r||(K.s&&state==='play'))&&stunT<=0, tt=0, kk=0.2, wmax=1.2, told=bulge;
    if(state!=='tee'){
      if(kh){ if(strikeT>0){ strikeT=0; chV=0; } chV=Math.min(1,chV+0.022); wasHeld=true; tt=-14*chV; } // Laden: Mitte woelbt sich nach unten (Mulde)
      else if(wasHeld){ wasHeld=false; strikeP=Math.max(0.15,chV); strikeT=12; chV=0; capB=2*strikeP*(1+0.25*powT); }
      if(strikeT>0){ strikeT--; tt=6+16*strikeP; kk=0.4; wmax=(2+3*strikeP)*(1+0.12*powT); swingP=strikeP; } else swingP=0;
    } else { chV=0; wasHeld=false; // tee: Balken biegt sich beim Laden nach unten, beim Abschuss schnellt er hoch
      if(teeHeld) tt=-14*power;
      if(strikeT>0){ strikeT--; tt=6+16*strikeP; kk=0.4; wmax=2+3*strikeP; swingP=strikeP; } else swingP=0; }
    capB=Math.max(0,capB-0.02);
    bulgePrev=told; bulge+=Math.max(-wmax,Math.min(wmax,(tt-bulge)*kk)); bv=bulge-told; curB=bulge; place();
    if(state==='tee'){
      ball.x=cx+co; ball.y=fl[0].py-bulge-5; // Ball liegt auf dem Balken
      var kdir=((K.mr||K.r)?1:0)-((K.ml||K.l)?1:0); if(teeHeld&&kdir){ aim=Math.max(-1.2,Math.min(1.2,aim+kdir*0.03)); aimKey=true; aimMx=mx; aimMy=my; } // Tasten: Flugrichtung
      if(mouseIn&&K.s&&(!aimKey||mx!==aimMx||my!==aimMy)){ aimKey=false; aim=Math.max(-1.2,Math.min(1.2,Math.atan2(mx-ball.x,ball.y-my))); }
      if(mouseIn&&K.s) power=Math.max(0.1,Math.min(1,Math.hypot(mx-ball.x,my-ball.y)/150)); // Entfernung Maus-Ball = Kraft (150px = max)
      if(K.s) teeHeld=true;
      else if(teeHeld){ teeHeld=false; strikeT=12; strikeP=power; strokes++; var sp=(3+power*9)*(1+0.12*powT); ball.vx=Math.sin(aim)*sp; ball.vy=-Math.cos(aim)*sp; ball.e=1; ball.nb=true; state='play'; power=0; }
      return;
    }
    phys(true);
    extras.forEach(function(ex){ if(state!=='play') return; ball=ex; phys(false); }); ball=mainBall; // reset() im Zusatzball-Durchlauf darf den Hauptball nicht ersetzen
    extras=extras.filter(function(q){ return !q.dead; });
  }
  function heldAny(){ return !!(mainBall&&mainBall.held)||extras.some(function(b){ return b.held; }); }
  function hitE(){ if(mode!=='breakout'||pw.F>0||cheat.energy) return; ball.hc=(ball.hc||0)+1; ball.e=Math.min(1,(ball.e||0)+0.03+0.012*Math.min(ball.hc,15)); } // Kette: je mehr Objekte seit dem letzten Balken-Kontakt getroffen, desto mehr Energie pro Treffer
  function barCollide(){ var c=cx+co, L=fl[0].len/2, y0=fl[0].py, N=16, R=ballR(), th=2, bowl=curB<-2&&swingP<=0&&strikeT<=0; // gespannter Balken = Schuessel: Ball bleibt liegen, rollt zur Mitte
    if(ball.nb){ if(ball.y<y0-26||ball.vy>0) ball.nb=false; else return; } // frisch abgeschossen: Balken-Schlag lenkt den Ball nicht ab
    for(var j=0;j<N;j++){
      var u1=-1+2*j/N, u2=-1+2*(j+1)/N, x1=c+u1*L, y1=y0-curB*(1-u1*u1), x2=c+u2*L, y2=y0-curB*(1-u2*u2);
      var dx=x2-x1, dy=y2-y1, l2=dx*dx+dy*dy||1, t=Math.max(0,Math.min(1,((ball.x-x1)*dx+(ball.y-y1)*dy)/l2)), qx=x1+dx*t, qy=y1+dy*t, ex=ball.x-qx, ey=ball.y-qy, d=Math.hypot(ex,ey);
      if(d<R+th+1&&d>0){ ball.hc=0; var nx=ex/d, ny=ey/d; ball.x=qx+nx*(R+th+1); ball.y=qy+ny*(R+th+1);
        var uu=(qx-c)/L, vsy=-bv*(1-uu*uu), rx=ball.vx, ry=ball.vy-vsy, dn=rx*nx+ry*ny;
        if(bowl&&chV>0.3&&(K.l||K.r||K.s)&&!ball.held&&!ball.stk&&state==='play'){ if(!heldAny()) aim=0; ball.held=true; ball.hu=Math.max(-0.9,Math.min(0.9,uu)); ball.vx=ball.vy=0; burst(ball.x,ball.y,2,4); return; } // gespannter Balken: Ball klebt an der Mulde
        var rolling=false;
        if(dn<0){ if(-dn<(bowl?3.4:1.6)){ rx-=dn*nx; ry-=dn*ny; rolling=true; } // langsam: Ball rollt an der Woelbung entlang (Rampe)
          else { var kr=bowl?1.2:1.9; rx-=kr*dn*nx; ry-=kr*dn*ny; } } // schnell: Trampolin-Abprall (Schuessel: Restitution 0,2 = Ball bleibt)
        if(bowl){ ball.bowl=tick; if(rolling){ rx*=0.965; ry*=0.965; } } // Daempfung: Ball pendelt aus und liegt in der Mulde
        if(rolling&&Math.abs(curB)>3&&!bowl){ // Rampe: Ball nimmt entlang der Kurve Schwung auf
          var tx=-ny, ty=nx, vt=rx*tx+ry*ty, dir=Math.abs(vt)>0.25?(vt>0?1:-1):(ty>0?1:-1);
          rx+=tx*dir*0.09; ry+=ty*dir*0.09; ball.rt=tick;
          var atEnd=(j===0&&rx<0)||(j===N-1&&rx>0); // am Ende der Kurve fliegt er mit viel Schwung hinaus
          if(atEnd){ rx*=1.3; ry*=1.3; if(mode==='breakout') ball.e=Math.min(1,ball.e+0.4); burst(ball.x,ball.y,3,4); shake=3; } }
        ball.vx=rx; ball.vy=ry+vsy;
        var wk=bowl?0:(curB<0?Math.max(0,1+curB/1.2):Math.max(0,1-Math.abs(curB)/8)); // gespannt (Mulde): kein Arcade-Winkel, nur echte Physik der Woelbung // gerader Balken: Abprallwinkel wie im Original
        if(wk>0&&dn<0&&ny<-0.5){ var spk=Math.max(Math.hypot(ball.vx,ball.vy),3.4), ang=uu*1.1+Math.max(-0.5,Math.min(0.5,barVel*0.08)); // Treffpunkt auf dem Balken + Balkenbewegung
          ball.vx=ball.vx*(1-wk)+Math.sin(ang)*spk*wk; ball.vy=ball.vy*(1-wk)-Math.cos(ang)*spk*wk; ball.rt=0; if(mode==='breakout') ball.e=Math.min(1,(ball.e||0)+0.15+Math.min(0.85,Math.abs(barVel)*0.25)); } // schneller Balken = mehr Energie
        if(-vsy>1.2&&tick-(ball.kt||-99)>18){ ball.kt=tick; var kq=swingP*3.2*(1-uu*uu)+1.2; ball.vx+=nx*kq; ball.vy+=ny*kq; // Kick entlang der Flaechennormale: Winkel folgt der Woelbung
         
          if(mode==='breakout'&&swingP>0) ball.e=Math.min(1,ball.e+0.5+1.0*swingP+0.1*powT);
          burst(ball.x,ball.y,2,4); shake=3; }
        break; } } }
  function phys(main){
    if(ball.swal>0){ if(!boss){ ball.swal=0; } else { ball.swal--; ball.x=boss.x; ball.y=boss.y; ball.vx=ball.vy=0;
      if(ball.swal<=0){ var ta=Math.PI/2-Math.max(-0.9,Math.min(0.9,Math.atan2(W*(0.3+rnd()*0.4)-boss.x,100))); ball.vx=Math.cos(ta)*7.5; ball.vy=Math.sin(ta)*7.5; ball.e=1; ball.bh=tick+30; boss.fl=8; burst(boss.x,boss.y+boss.h/2,6,3); shake=6; msg='AUFGELADEN!'; msgT=40; } return; } }
    if(ball.held){ if(state!=='play'){ ball.held=false; } else if((K.l||K.r||K.s)&&stunT<=0){ var uh=ball.hu; ball.x=cx+co+uh*fl[0].len/2; ball.y=fl[0].py-curB*(1-uh*uh)-ballR()-3; ball.vx=ball.vy=0; return; }
      else { ball.held=false; var spL=(3+Math.max(0.15,strikeP)*9)*(1+0.12*powT), anL=Math.max(-1.3,Math.min(1.3,aim+ball.hu*0.12)); ball.vx=Math.sin(anL)*spL; ball.vy=-Math.cos(anL)*spL; ball.e=1; ball.nb=true; burst(ball.x,ball.y,3,4); shake=2; return; } } // Loslassen: Ball fliegt in eingestellter Richtung
    if(ball.stk){ if(--ball.stT<=0) releaseSticky(ball,ball.stk); return; }   // klebt am Block: wartet kurz, dann Split
    if(pw.F>0||cheat.energy){ ball.e=1; }
    if(cheat.drunk) ball.vx+=Math.sin(tick*0.09+ball.y*0.05)*0.07; // torkeln
    if(cheat.trail&&(tick&1)) burst(ball.x,ball.y,1,[2,3,4,5,8,9,13,14][(tick>>1)&7]);
    if(cheat.quake&&state==='play') shake=Math.max(shake,2);
    if(mode==='breakout'){
      // Arkanoid-Gefuehl: geladener Ball fliegt schwerelos mit konstantem Tempo, Energie schwindet langsam
      var en=ball.e; ball.e=Math.max(0,en-0.0011*[3,2,1.4,1][chgT]);
      if(!cheat.nograv) ball.vy+=(cheat.antigrav?-1:1)*0.1*(1-en)*(1-en)*(1-en*0.5); // ohne Energie: Schwerkraft; je mehr Energie, desto schwereloser
      if(en>0.05){ var s0=Math.hypot(ball.vx,ball.vy)||1, tgt=1.6+4.4*en+capB, k=1+(tgt/s0-1)*0.2*en;  ball.vx*=k; ball.vy*=k;
        if(en>0.4){ var mn=0.3*Math.hypot(ball.vx,ball.vy); if(Math.abs(ball.vy)<mn) ball.vy=(ball.vy<0?-1:1)*mn; } }
    } else { if(!cheat.nograv) ball.vy+=(cheat.antigrav?-1:1)*0.06*BALL_SPEED*(pw.F>0?0.3:1); if(!pw.F&&!cheat.energy) ball.e=Math.max(0,(ball.e||0)-0.0006); }
    // Leertaste im Spiel = kurzer Stups nach oben (mit Abklingzeit)
    if(main){
    if(bumpCd>0) bumpCd--;
    if(K.g && !bumpHeld && bumpCd<=0 && ghostU>0){ // Ghost Shot: Ball oberhalb des Balkens wird aus der Ferne angestossen
      var gdx=ball.x-(cx+co), gdy=fl[0].py-ball.y, grg=50+35*ghostU;
      if(gdy>6&&Math.abs(gdx)<fl[0].len/2+25&&gdy<grg){ var gf=(0.5+0.5*(1-gdy/grg))*(1.6+0.9*ghostU); ball.vy-=gf; ball.vx+=Math.max(-1,Math.min(1,gdx*0.03)); ball.e=Math.min(1,ball.e+0.08*ghostU); ghostT=10; ghostX=ball.x; ghostY=ball.y; burst(ball.x,ball.y+3,3,14); shake=3; }
      bumpCd=[0,45,35,25][ghostU]; }
    bumpHeld=!!K.g;
    // Anti-Festhaengen: bleibt der Ball lange im gleichen Bereich, gibt es einen Zufallsstups
    if(++stuckN>=150){ if(tick-(ball.bowl||-99)>20&&Math.hypot(ball.x-stuckX,ball.y-stuckY)<30){ ball.vy-=2.2; ball.vx+=(Math.random()-0.5)*3; }
      stuckN=0; stuckX=ball.x; stuckY=ball.y; }
    }
    var sp2=Math.hypot(ball.vx,ball.vy); var capS=6+capB+((tick-(ball.rt||-99))<30?3:0); if(sp2>capS){ ball.vx*=capS/sp2; ball.vy*=capS/sp2; }
    var R=ballR();
    // Naehe-Aufladung: je naeher der Ball an Pools/Trampolinen, desto mehr Energie geht auf ihn ueber
    if(mode==='breakout') guides.forEach(function(g2){ if(g2.off||!g2.chg) return;
      var d=segDist(g2,ball.x,ball.y), range=14+g2.chg*22;
      if(d<range){ ball.e=Math.min(1,ball.e+g2.chg*0.06*(1+0.4*chgT)*(1-d/range)); g2.glow=4; } });
    var coF=co;
    for(var ss=0;ss<4;ss++){ // Teilschritte gegen Durchtunneln
    if(state!=='play') break;
    if(main){ co=coS+(coF-coS)*(ss+1)/4; place(); } // Balken + Banden wandern in Teilschritten mit, sonst springen sie durch den Ball
    curB=bulgePrev+(bulge-bulgePrev)*(ss+1)/4; // Balken biegt sich waehrend des Frames mit
    var spd=BALL_SPEED*(pw.S>0?0.6:1)*(cheat.dfast?1.2:1)*(cheat.slowmo?0.5:1); ball.x+=ball.vx/4*spd; ball.y+=ball.vy/4*spd;
    if(ball.x<R+4){ ball.x=R+4; bounce(1,0,0.7); }
    if(ball.x>W-R-4){ ball.x=W-R-4; bounce(-1,0,0.7); }
    if(ball.y<R+4){ ball.y=R+4; bounce(0,1,0.7); }
    guides.forEach(function(g2){ if(g2.off) return;
      var dx=g2.x2-g2.x1, dy=g2.y2-g2.y1, l=Math.hypot(dx,dy)||1;
      var t=Math.max(0,Math.min(1,((ball.x-g2.x1)*dx+(ball.y-g2.y1)*dy)/(l*l)));
      var qx=g2.x1+dx*t, qy=g2.y1+dy*t, ex=ball.x-qx, ey=ball.y-qy, d=Math.hypot(ex,ey);
      if(d<R+1 && d>0){ ball.x=qx+ex/d*(R+1); ball.y=qy+ey/d*(R+1); bounce(ex/d,ey/d,g2.rest); if(g2.rest>1&&!g2.flash){ score+=mult()*5; if(mode==='breakout') ball.e=Math.min(1,ball.e+g2.chg); } g2.flash=6; if(g2.hp<900&&--g2.hp<=0){ g2.dead=true; drop(qx,qy,0.15); score+=mult()*30; burst(qx,qy,5); } }
    });
    guides=guides.filter(function(q){ return !q.dead; });
    bumpers.forEach(function(b){
      var ex=ball.x-b.x, ey=ball.y-b.y, d=Math.hypot(ex,ey);
      if(d<b.r+R && d>0){ ball.x=b.x+ex/d*(b.r+R); ball.y=b.y+ey/d*(b.r+R); if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); } hitE(); bounce(ex/d,ey/d,1.3); ball.vx+=(Math.random()-0.5)*0.5; score+=mult()*10; if(special(b)){ addG(b.r>=9?40:(b.r>=6?25:12)); burst(b.x,b.y,3,4); } else addG(3); b.flash=6; if(pw.M>0) b.hp--; if(--b.hp<=0){ b.dead=true; addG(special(b)?40:20); drop(b.x,b.y,0.45); score+=mult()*b.pts; burst(b.x,b.y,b.r); msg='+'+(b.pts+10); msgT=40; } }
    });
    bumpers=bumpers.filter(function(q){ return !q.dead; });
    blocks.forEach(function(o){ var qx=Math.max(o.x,Math.min(ball.x,o.x+o.w)), qy=Math.max(o.y,Math.min(ball.y,o.y+o.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R){ if(bd>0){ bx/=bd; by/=bd; ball.x=qx+bx*R; ball.y=qy+by*R; } else { var nn=insideRect(o,R); bx=nn[0]; by=nn[1]; }
        if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); }
        hitE(); if(pw.M<=0) bounce(bx,by,0.8); o.hp-=(pw.M>0?2:1); o.fl=6; score+=mult()*10; addG(1); burst(ball.x,ball.y,1,11);
        if(o.hp<=0){ o.dead=true; score+=mult()*40*o.hp0; addG(5); burst(o.x+5,o.y+3,4,12); drop(o.x+5,o.y,0.2); } } });
    blocks=blocks.filter(function(q){ return !q.dead; });
    if(!ball.stk) stickies.forEach(function(o){ if(o.dead||o.busy||ball.stk) return; var qx=Math.max(o.x,Math.min(ball.x,o.x+o.w)), qy=Math.max(o.y,Math.min(ball.y,o.y+o.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R+0.5){ if(bd>0){ bx/=bd; by/=bd; } else { bx=0; by=-1; } ball.stk=o; o.busy=true; ball.stT=36; ball.sn=Math.atan2(by,bx); ball.x=qx+bx*(R+0.5); ball.y=qy+by*(R+0.5); ball.vx=ball.vy=0; o.fl=10; burst(ball.x,ball.y,2,o.c); score+=mult()*10; } });
    stickies=stickies.filter(function(q){ return !q.dead; });
    bossCollide();
    barCollide();
    for(var bi=0;bi<bricks.length;bi++){ var br=bricks[bi];
      var qx=Math.max(br.x,Math.min(ball.x,br.x+br.w)), qy=Math.max(br.y,Math.min(ball.y,br.y+br.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R){ if(bd>0){ bx/=bd; by/=bd; ball.x=qx+bx*R; ball.y=qy+by*R; } else { var nb=insideRect(br,R); bx=nb[0]; by=nb[1]; }
        if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); }
        if(!bricks.length) break; hitE(); if(pw.M<=0) bounce(bx,by,1); br.hp-=(pw.M>0?2:1); if(br.hp>0){ br.fl=6; score+=mult()*10; burst(br.x+br.w/2,br.y+br.h/2,1,11); break; } drop(br.x+br.w/2,br.y,0.28*br.w/12); bricks.splice(bi,1); score+=mult()*50; addG(2);
        if(!bricks.length){ winLevel(); }
        break; } }
    holes.forEach(function(h){ // Loch = Kicker: Ball wird kurz eingefangen und wieder ins Feld geschossen
      if(main&&!h.done&&state==='play'&&Math.hypot(ball.x-h.x,ball.y-h.y)<h.r-1){
        h.done=true; capH=h; capT=45; state='capt'; ball.vx=0; ball.vy=0; ball.x=h.x; ball.y=h.y;
        score+=mult()*150; addG(30); msg='LOCH! +150'; msgT=60; burst(h.x,h.y,4,4); }
    });
    if(ball.y>H+6){
      if(saver){ saver=false; ball.y=H-12; ball.vy=-6; ball.vx*=0.5; ball.e=1; msg='BALL GERETTET'; msgT=60; }
      else if(!main){ ball.dead=true; }
      else if(extras.length){ var nb=extras.pop(); ball.x=nb.x; ball.y=nb.y; ball.vx=nb.vx; ball.vy=nb.vy; ball.e=nb.e; }
      else if(mode==='golf'){ msg='AUS! +1 SCHLAG'; msgT=80; strokes++; dropCaps(); reset(); }
      else { dropCaps(); if(!cheat.lives&&!(ambient&&!ambFull)) lives--; if(lives<=0){ overIdx=(lvNum()-1)%LEVELS.length; overScore=score; clearSave(); overT=0; overSel=0; overR={}; msgT=0; state='over'; } else { msg='BALL VERLOREN'; msgT=80; reset(); } }
    }
    }
    if(main&&co!==coF){ co=coF; place(); }
  }
  function txtS(str,x,y,c,sc){ str=String(str).toUpperCase(); g.fillStyle=C[c];
    for(var i=0;i<str.length;i++){ var gl=F[str[i]]||F[' ']; for(var p=0;p<15;p++) if(gl[p]==='1') g.fillRect(x+i*4*sc+(p%3)*sc,y+((p/3)|0)*sc,sc,sc); } }
  function bevel(x,y,w,h,fill,hi,lo){ box(x-1,y-1,w+2,h+2,0); box(x,y,w,h,fill); box(x,y,w,1,hi); box(x,y,1,h,hi); box(x,y+h-1,w,1,lo); box(x+w-1,y,1,h,lo); }
  var HEART=['0110110','1111111','1111111','0111110','0011100','0001000'];
  function rd(bg,pref,min){ var lb=lumOf(rgbOf(C[bg])); min=min||90; for(var i=0;i<pref.length;i++) if(Math.abs(lumOf(rgbOf(C[pref[i]]))-lb)>=min) return pref[i]; var bi=1,bd=-1; for(var k=0;k<C.length;k++){ var d=Math.abs(lumOf(rgbOf(C[k]))-lb); if(d>bd){ bd=d; bi=k; } } return bi; } // lesbare Farbe auf Hintergrund (alle Stile)
  function shopIcon(i,x,y){ box(x,y,22,22,15); box(x,y,22,1,12); box(x,y,1,22,12); box(x+21,y,1,22,11); box(x,y+21,22,1,11);
    if(i===0){ for(var k=0;k<=11;k++){ box(x+3+k,y+5+k*0.9,3,2,2); box(x+18-k,y+5+k*0.9,3,2,2); } }
    else if(i===1){ disc(x+11,y+11,3,1); for(var q=0;q<10;q++){ var an=q*0.628; box(x+11+Math.round(Math.cos(an)*7),y+11+Math.round(Math.sin(an)*7),2,2,q<7?4:3); } }
    else if(i===2){ box(x+2,y+10,18,3,3); box(x+2,y+8,2,7,4); box(x+18,y+8,2,7,4); }
    else if(i===3){ for(var k2=0;k2<14;k2++) box(x+3+k2,y+16-k2*0.8,3,3,3); disc(x+17,y+6,2,4); box(x+4,y+17,4,4,12); }
    else if(i===4){ for(var k3=0;k3<18;k3++) box(x+2+k3,y+11+Math.round(Math.sin(k3*0.7)*3),2,2,14); box(x+2,y+17,18,2,14); }
    else if(i===5){ disc(x+11,y+11,8,4); disc(x+11,y+11,6,3); txtS('G',x+8,y+8,0,2); }
    else if(i===7){ disc(x+11,y+7,3,1); for(var gk=0;gk<5;gk++) box(x+10,y+11+gk*2,2,1,gk%2?4:14); box(x+3,y+19,16,2,3); }
    else if(i===6){ box(x+3,y+7,16,8,0); box(x+4,y+8,14,6,14); txtS('D',x+9,y+9,0,1); }
    else { for(var hy=0;hy<6;hy++) for(var hx=0;hx<7;hx++) if(HEART[hy][hx]==='1') box(x+2+hx*2.5|0,y+4+hy*2.5|0,3,3,2); } }
  function shopTile(i,x,y,it){ var w=58, h=42, foc=sel===i, t=it.g(), maxed=!it.rep&&t>=3, mo=moOf(i,it), free=!it.rep&&t<mo;
    var cost=(maxed||free)?null:it.c[it.rep?0:t], can=free||(cost!==null&&gold>=cost); shopR['b'+i]={x:x,y:y,w:w,h:h};
    bevel(x,y,w,h,foc?7:12,foc?8:11,15); if(foc&&(tick>>3)&1){ box(x-1,y-1,w+2,1,4); box(x-1,y+h,w+2,1,4); box(x-1,y,1,h,4); box(x+w,y,1,h,4); }
    shopIcon(i,x+18,y+3);
    var bgT=foc?7:12; txt(it.n.length>14?it.n.slice(0,14):it.n,x+((w-it.n.length*4)>>1),y+27,rd(bgT,can?[1,4]:[11,14,3],can?110:70));
    if(!it.rep) for(var k=0;k<3;k++) { if(k<t) box(x+5+k*7,y+36,5,4,rd(bgT,[4,5,1],90)); else if(k<mo){ box(x+5+k*7,y+36,5,4,rd(bgT,[11,14,3],60)); box(x+6+k*7,y+37,3,2,15); } else box(x+5+k*7,y+36,5,4,15); }
    var pr=cost===null?(free?'WAHL':'MAX'):String(cost); var pc=rd(bgT,cost===null?[5,4]:(can?[4,5,1]:[2,3,14]),110); txt(pr,x+w-4-pr.length*4-(cost===null?0:6),y+36,pc); if(cost!==null) disc(x+w-6,y+38,2,pc); }
  function cosIcon(kind,id,x,y){ box(x,y,22,22,15); box(x,y,22,1,12); box(x,y,1,22,12); box(x+21,y,1,22,11); box(x,y+21,22,1,11);
    if(kind===3){ if(id==='pools'){ for(var w1=0;w1<18;w1++) box(x+2+w1,y+9+Math.round(Math.sin(w1*0.7)*3),2,2,14); box(x+2,y+16,18,2,14); }
      else if(id==='lives'){ for(var hy=0;hy<6;hy++) for(var hx=0;hx<7;hx++) if(HEART[hy][hx]==='1') box(x+2+hx*2,y+3+hy*2,2,2,2); txtS('8',x+8,y+15,4,1); }
      else if(id==='energy'){ disc(x+11,y+11,5,1); for(var q3=0;q3<12;q3++){ var an3=q3*0.5236; box(x+11+Math.round(Math.cos(an3)*8),y+11+Math.round(Math.sin(an3)*8),2,2,4); } }
      else if(id==='nograv'){ disc(x+11,y+14,4,1); box(x+10,y+3,3,6,14); box(x+8,y+5,7,1,14); box(x+9,y+4,5,1,14); for(var q5=0;q5<3;q5++) box(x+4+q5*6,y+19,2,1,12); }
      else if(id==='saver'){ box(x+3,y+14,16,2,3); disc(x+11,y+9,3,1); box(x+3,y+16,1,4,3); box(x+18,y+16,1,4,3); }
      else if(id==='mega'){ box(x+10,y+3,3,16,5); box(x+3,y+10,16,3,5); disc(x+11,y+11,3,1); }
      else if(id==='goldx'){ disc(x+11,y+11,8,4); txtS('3',x+9,y+8,0,2); }
      else { box(x+3,y+9,10,4,14); box(x+11,y+5,3,12,14); box(x+13,y+7,3,8,14); box(x+16,y+9,2,4,14); } }
    else if(kind===4){ if(id==='dlife'){ for(var hy4=0;hy4<6;hy4++) for(var hx4=0;hx4<7;hx4++) if(HEART[hy4][hx4]==='1') box(x+4+hx4*2,y+4+hy4*2,2,2,2); txtS('1',x+9,y+15,0,1); }
      else if(id==='dfast'){ disc(x+11,y+11,5,1); for(var q4=0;q4<3;q4++) box(x+1,y+7+q4*4,6-q4,1,4); disc(x+14,y+11,2,4); }
      else if(id==='dboss'){ disc(x+11,y+10,7,0); disc(x+11,y+10,6,1); box(x+7,y+8,3,3,0); box(x+13,y+8,3,3,0); box(x+9,y+14,5,2,0); box(x+6,y+17,11,2,1); }
      else if(id==='dpoor'){ disc(x+11,y+11,8,12); disc(x+11,y+11,6,11); box(x+5,y+10,13,2,2); }
      else { for(var a4=0;a4<6;a4++) for(var b4=0;b4<4;b4++) box(x+2+a4*3,y+3+b4*4,2,2,(a4+b4)%2?14:3); } }
    else if(kind===1){ var pl=paletteFor(id); for(var q=0;q<16;q++) box(x+1+(q%4)*5,y+1+((q/4)|0)*5,5,5,0), box(x+2+(q%4)*5,y+2+((q/4)|0)*5,4,4,15), (function(c){ g.fillStyle=pl[c]; g.fillRect(x+2+(c%4)*5,y+2+((c/4)|0)*5,4,4); })(q); }
    else if(id==='sharp'){ for(var a1=0;a1<4;a1++) for(var b1=0;b1<4;b1++) box(x+2+a1*5,y+2+b1*5,5,5,(a1+b1)%2?12:1); }
    else if(id==='soft'){ for(var a2=0;a2<20;a2++) { var lv=a2/19; g.fillStyle='rgb('+Math.round(40+lv*200)+','+Math.round(40+lv*200)+','+Math.round(60+lv*190)+')'; g.fillRect(x+1+a2,y+2,1,18); } }
    else if(id==='crt'){ for(var a3=0;a3<20;a3+=2){ box(x+1,y+1+a3,20,1,14); box(x+1,y+2+a3,20,1,7); } }
    else { disc(x+11,y+11,9,3); disc(x+11,y+11,6,4); disc(x+11,y+11,3,1); } }
  function cosTile(i,x,y,it){ var w=58, h=42, foc=sel===i, own1=shopTab>=3?!!own['c_'+it.id]:!!own[it.id], on=shopTab>=3?!!cheat[it.id]:(shopTab===1?actv.style:actv.qual)===it.id, can=!own1&&gold>=it.c; shopR['b'+i]={x:x,y:y,w:w,h:h};
    bevel(x,y,w,h,foc?7:12,foc?8:(on?5:11),15); if(foc&&(tick>>3)&1){ box(x-1,y-1,w+2,1,4); box(x-1,y+h,w+2,1,4); box(x-1,y,1,h,4); box(x+w,y,1,h,4); }
    cosIcon(shopTab,it.id,x+18,y+3);
    var bgC=foc?7:12; txt(it.n,x+((w-it.n.length*4)>>1),y+27,rd(bgC,(own1||it.rep)?[1,4]:[11,14,3],(own1||it.rep)?110:70));
    if(on) txt(shopTab>=3?'AN':'AKTIV',x+((w-(shopTab>=3?8:20))>>1),y+36,rd(bgC,[5,4,1],110)); else if(own1&&!it.rep) txt(shopTab>=3?'AUS':'GEKAUFT',x+((w-(shopTab>=3?12:28))>>1),y+36,rd(bgC,shopTab>=3?[2,3,14]:[8,11,14],80));
    else { var pr=String(it.c), pcc=rd(bgC,can?[4,5,1]:[2,3,14],110); txt(pr,x+((w-pr.length*4-6)>>1),y+36,pcc); disc(x+((w-pr.length*4-6)>>1)+pr.length*4+3,y+38,2,pcc); } }
  function drawShop(){
    box(0,0,W,H,15);
    for(var si=0;si<90;si++){ var sx=(si*73)%W, sy=(si*131)%H; box(sx,sy,1,1,((si+(tick>>4))%5===0)?1:12); }
    for(var cb=0;cb<10;cb++){ var cc=[7,8,14,1,14,8,7,0,0,0][cb]; box(0,4+cb*2,W,2,cc); box(0,H-2-cb*2,W,2,[7,8,14,1,14,8,7,0,0,0][9-cb]); }
    var PW=260, px=(cx-PW/2)|0, py=14, list=curList(), N=list.length;
    shopR={};
    bevel(px,py-2,PW,185,12,11,15);
    for(var rv=0;rv<2;rv++) for(var rw=0;rw<2;rw++) box(px+3+rv*(PW-9),py+1+rw*177,3,3,1);
    txtS('SHOP',px+8,py+1,4,2); txtS(String(gold),px+PW-18-String(gold).length*4,py+3,4,1); disc(px+PW-10,py+6,4,4);
    // Reiter
    ['UPGRADES','STYLES','GRAFIK','CHEATS','DIFFS'].forEach(function(nm,ti){ var tx=px+44+ti*36; shopR['t'+ti]={x:tx,y:py+1,w:34,h:11};
      bevel(tx,py+1,34,11,shopTab===ti?7:15,shopTab===ti?8:12,15); txt(nm,tx+((34-nm.length*4)>>1),py+4,shopTab===ti?1:11); });
    // Seiten: 8 Eintraege pro Seite (4x2), links/rechts blaettern mit weichem Schieben
    var NP=Math.max(1,Math.ceil(N/8)), tgt=sel<N?((sel/8)|0):Math.min(shopPg,NP-1), PGW=PW-8;
    shopPg=tgt; shopPosF+=(tgt-shopPosF)*0.3; if(Math.abs(tgt-shopPosF)<0.01) shopPosF=tgt;
    g.save(); g.beginPath(); g.rect(px+4,py+13,PGW,92); g.clip();
    for(var pp=Math.floor(shopPosF);pp<=Math.ceil(shopPosF);pp++){ if(pp<0||pp>=NP) continue; var odx=Math.round((pp-shopPosF)*PGW);
      for(var gi=pp*8;gi<Math.min(N,pp*8+8);gi++){ var gx=px+7+(gi%4)*63+odx, gy2=py+15+(((gi%8)/4)|0)*45; if(shopTab===0) shopTile(gi,gx,gy2,list[gi]); else cosTile(gi,gx,gy2,list[gi]); } }
    g.restore();
    if(shopPosF!==tgt) for(var di=0;di<N;di++) delete shopR['b'+di];   // waehrend des Schiebens nicht klickbar
    // Schritt-Leiste: Pfeile + Seitenpunkte
    var sy=py+106, dw=NP*12, lx=(cx-dw/2-4-18)|0, rx=(cx+dw/2+4)|0; { shopR.pl={x:lx,y:sy,w:18,h:9}; shopR.pr={x:rx,y:sy,w:18,h:9}; // mittig: Pfeil, Seitenpunkte, Pfeil
      bevel(lx,sy,18,9,hit(shopR.pl)?7:12,tgt>0?8:11,15); bevel(rx,sy,18,9,hit(shopR.pr)?7:12,tgt<NP-1?8:11,15);
      var aOn=rd(12,[4,1,5],110), aOff=rd(12,[11,14,3],50), aL=tgt>0?aOn:aOff, aR=tgt<NP-1?aOn:aOff; for(var ak=0;ak<3;ak++){ box(lx+10-ak,sy+4-ak,1,2*ak+1,aL); box(rx+8+ak,sy+4-ak,1,2*ak+1,aR); }
      var dx0=(cx-NP*6)|0; for(var dp=0;dp<NP;dp++){ shopR['dp'+dp]={x:dx0+dp*12-2,y:sy,w:12,h:9}; box(dx0+dp*12,sy+2,8,5,0); box(dx0+dp*12+1,sy+3,6,3,dp===tgt?4:11); if(dp===tgt) box(dx0+dp*12+1,sy+1,6,1,4); } }
    // Info zum fokussierten Eintrag
    var iy=py+117, ix=px+7, iw=PW-14, ih=34; bevel(ix,iy,iw,ih,15,12,11);
    if(sel<N){ var it=list[sel];
      if(shopTab===0){ var t=it.g(), maxed=!it.rep&&t>=3, mo2=moOf(sel,it), free2=!it.rep&&t<mo2, cost=(maxed||free2)?null:it.c[it.rep?0:t], can=cost!==null&&gold>=cost;
        txtS(it.n,ix+6,iy+3,4,1); txt(it.rep?'BELIEBIG OFT':'STUFE '+t+' VON 3',ix+iw-6-(it.rep?48:56),iy+3,11);
        txt('JETZT: '+(it.rep?'-':(t>0?it.d[t-1]:'NICHT GEKAUFT')),ix+6,iy+11,1);
        txt('NEU:   '+(maxed?'AUSGEBAUT':it.d[it.rep?0:t]),ix+6,iy+18,maxed?5:8);
        txt(maxed?'ENTER = ZURUECK AUF STUFE 1':(free2?'ENTER = STUFE '+(t+1)+' WAEHLEN':(can?'ENTER = KAUFEN FUER '+cost+' G':(t>1?'ZU WENIG GOLD - ENTER = STUFE 1':'ZU WENIG GOLD - BRAUCHT '+cost+' G'))),ix+6,iy+26,(maxed||free2)?5:(can?4:2)); }
      else if(shopTab>=3){ var oc=!!own['c_'+it.id], onc=!!cheat[it.id], cc=gold>=it.c;
        txtS(it.n,ix+6,iy+3,4,1); txt(it.rep?'BELIEBIG OFT':(oc?(onc?'AN':'AUS'):'GESPERRT'),ix+iw-6-(it.rep?48:(oc?12:28)),iy+3,it.rep?11:(oc?(onc?5:2):11));
        txt(it.d,ix+6,iy+11,1); txt(it.rep?'EINMALIGE AKTION':(shopTab===4?'SCHWERER - PUNKTE +25 PROZENT':'CHEAT - JEDERZEIT AN UND AUS'),ix+6,iy+18,8);
        txt(it.rep||!oc?(cc?'ENTER = KAUFEN FUER '+it.c+' G':'ZU WENIG GOLD - BRAUCHT '+it.c+' G'):(onc?'ENTER = AUSSCHALTEN':'ENTER = EINSCHALTEN'),ix+6,iy+26,(it.rep||!oc)?(cc?4:2):8); }
      else { var o1=!!own[it.id], on=(shopTab===1?actv.style:actv.qual)===it.id, can2=!o1&&gold>=it.c;
        txtS(it.n,ix+6,iy+3,4,1); txt(on?'AKTIV':(o1?'GEKAUFT':'GESPERRT'),ix+iw-6-(on?20:(o1?28:28)),iy+3,on?5:(o1?8:11));
        txt(it.d,ix+6,iy+11,1);
        txt(shopTab===1?'FARBPALETTE - JEDERZEIT WECHSELN':'DARSTELLUNG - JEDERZEIT WECHSELN',ix+6,iy+18,8);
        txt(on?'GERADE AKTIV':(o1?'ENTER = AUSWAEHLEN':(can2?'ENTER = KAUFEN FUER '+it.c+' G':'ZU WENIG GOLD - BRAUCHT '+it.c+' G')),ix+6,iy+26,on?5:(o1?8:(can2?4:2))); } }
    else { txtS('WEITER',ix+6,iy+3,4,1); txt('ZURUECK INS SPIEL - NAECHSTES LEVEL',ix+6,iy+13,1); txt('LEERTASTE ODER ENTER',ix+6,iy+21,8); }
    var gy=py+154; shopR.go={x:px+7,y:gy,w:iw,h:16};
    bevel(px+7,gy,iw,16,sel>=N?7:5,sel>=N?8:14,6); if(sel>=N&&(tick>>3)&1) box(px+6,gy-1,iw+2,1,4); { var wl=shopAutoT>0?'WEITER IN '+Math.ceil(shopAutoT/60)+' S':'WEITER - LEERTASTE'; txtS(wl,px+((PW-wl.length*4)/2)|0,gy+5,0,1); if(shopAutoT>0) box(px+8,gy+13,Math.max(0,Math.floor((iw-2)*shopAutoT/shopAutoMax)),2,4); }
    var tk='   Q E WECHSELT DIE REITER - PFEILE LINKS RECHTS BLAETTERN - STYLES UND GRAFIK BLEIBEN GESPEICHERT - TASTE B OEFFNET DEN SHOP AUF DEM ABSCHLAG   ', off=(tick*0.7)|0, tl=tk.length*4;
    for(var ti=0;ti<tk.length;ti++){ var tx2=px+6+ti*4-(off%tl); if(tx2<px+6) tx2+=tl; if(tx2>=px+6&&tx2<px+PW-6-3) txtS(tk[ti],tx2,H-23,4,1); }
    if(mouseIn){ drawCursor(); }
  }
  // ---- Titelbild: zufaellige Level-Kulissen im Hintergrund, weich ueberblendet ----
  var tbC=[document.createElement('canvas'),document.createElement('canvas')], tbCur=0, tbT=0, tbScene='', tbShow='', tbSc=['',''], TBLEN=300, TBFADE=70;
  function tbRender(ci){ var cv2=tbC[ci], oB=bgc, oS=scene, oSeed=seed, oMx=macX, oMy=macY, ss=[]; LEVELS.forEach(function(l){ if(ss.indexOf(l.scene)<0) ss.push(l.scene); });
    var pick=ss[(Math.random()*ss.length)|0]; if(pick===tbScene&&ss.length>1) pick=ss[(ss.indexOf(pick)+1+((Math.random()*(ss.length-1))|0))%ss.length];
    bgc=cv2; scene=pick; seed=(Math.random()*4e9)>>>0; renderScene(); bgc=oB; scene=oS; seed=oSeed; macX=oMx; macY=oMy; tbSc[ci]=pick; tbScene=pick; return pick; }
  function titleBack(){ if(!tbT&&!tbScene){ tbScene=tbRender(0); tbRender(1); }
    tbT++; var ph=tbT%TBLEN, nxt=1-tbCur, al=0;
    if(ph===1) tbRender(nxt); // naechste Kulisse vorbereiten (zufaellig)
    if(ph>TBLEN-TBFADE) al=(ph-(TBLEN-TBFADE))/TBFADE;
    if(ph===0){ tbCur=nxt; al=0; }
    g.drawImage(tbC[tbCur],0,0); if(al>0){ g.globalAlpha=al; g.drawImage(tbC[nxt],0,0); g.globalAlpha=1; }
    tbShow=tbSc[al>0.5?nxt:tbCur]; g.fillStyle='rgba(0,0,0,0.38)'; g.fillRect(0,0,W,H);
    for(var cb=0;cb<10;cb++){ var cc=[7,8,14,1,14,8,7,0,0,0][cb]; box(0,4+cb*2,W,2,cc); box(0,H-2-cb*2,W,2,[7,8,14,1,14,8,7,0,0,0][9-cb]); } }
  function bars(){ box(0,0,W,H,15);
    for(var si=0;si<90;si++){ var sx=(si*73)%W, sy=(si*131)%H; box(sx,sy,1,1,((si+(tick>>4))%5===0)?1:12); }
    for(var cb=0;cb<10;cb++){ var cc=[7,8,14,1,14,8,7,0,0,0][cb]; box(0,4+cb*2,W,2,cc); box(0,H-2-cb*2,W,2,[7,8,14,1,14,8,7,0,0,0][9-cb]); } }
  function drawTitle(){ titleBack();
    var lbl='FLIPP-OUT', sc=4, tw2=lbl.length*4*sc, tx0=((W-tw2)/2)|0;
    txtS(lbl,tx0+2,28,0,sc); txtS(lbl,tx0,26,4,sc); txtS(mode==='golf'?'GOLF':'BREAKOUT',((W-(mode==='golf'?4:8)*8)/2)|0,50,14,2);
    var sub=mode==='golf'?'MINIGOLF TRIFFT FLIPPER':'ARKANOID TRIFFT FLIPPER'; txtS(sub,((W-sub.length*4)/2)|0,70,8,1);
    for(var bi2=0;bi2<3;bi2++){ var bx2=cx+(bi2-1)*46, by2=91-Math.abs(Math.sin(tick*0.07+bi2*1.3))*14; box(bx2-3,95,7,1,12); disc(bx2|0,by2|0,3,[1,14,4][bi2]); }
    menuR={}; var items=menuItems();
    var svT=loadSave(), hasSv=!!(svT&&svT.lv); if(trashArm>0) trashArm--;
    items.forEach(function(it,i){ var x=cx-80, y=98+i*19, foc=menuSel===i, w0=(i===0&&hasSv)?141:160; menuR['m'+i]={x:x,y:y,w:w0,h:15};
      bevel(x,y,w0,15,foc?7:12,foc?8:11,15); if(foc&&(tick>>3)&1){ box(x-1,y-1,w0+2,1,4); box(x-1,y+15,w0+2,1,4); }
      txtS(it.t,x+((w0-it.t.length*4)>>1),y+5,foc?4:1,1);
      if(i===0&&hasSv){ var tx=x+145, arm=trashArm>0, th=mouseIn&&hit({x:tx,y:y,w:15,h:15}), tc=arm?2:(th?4:1); menuR.trash={x:tx,y:y,w:15,h:15};
        bevel(tx,y,15,15,arm?2:(th?7:12),arm?8:11,15); if(arm&&(tick>>3)&1) box(tx-1,y-1,17,1,4);
        box(tx+6,y+2,3,1,tc); box(tx+3,y+3,9,1,tc); box(tx+4,y+5,7,1,tc); box(tx+4,y+11,7,1,tc); box(tx+4,y+5,1,7,tc); box(tx+10,y+5,1,7,tc); box(tx+6,y+6,1,5,tc); box(tx+8,y+6,1,5,tc); } });
    if(trashArm>0) txt('NOCHMAL KLICKEN = SPIELSTAND LOESCHEN',((W-37*4)/2)|0,H-23,(tick>>3)&1?2:4); else txt('PFEILE UND ENTER - ODER MAUS',((W-27*4)/2)|0,H-23,(tick>>4)&1?4:1);
    if(mouseIn){ drawCursor(); } }
  var SCN={western:'WESTERN DORF',city:'SIMCITY',flight:'FLUGSIM',dream:'TRAUMLAND',forest:'ABENTEUERWALD',vapor:'VAPORWAVE',moon:'MONDSTEIN',dungeon:'HELDENKERKER',cozy:'TEESTUBE',golf:'GOLFPLATZ'}, SCC={western:3,city:8,flight:5,dream:13,forest:10,vapor:9,moon:7,dungeon:11,cozy:13,golf:5}, GL={western:'WEST',city:'CITY',flight:'FLUG',dream:'TRAUM',forest:'WALD',vapor:'WAVE',moon:'MOND',dungeon:'KERKER',cozy:'TEE',golf:'GOLF'}, mapC=null;
  // Seiten-Layout: jede Welt (Kulisse) ist genau eine Seite (Breite W); die Level verteilen sich gleichmaessig darauf
  var mapLay=null;
  function mapLayout(){ if(mapLay&&mapLay.n===LEVELS.length) return mapLay; var lay={n:LEVELS.length,groups:[],gi:[],x:[]}, i;
    for(i=0;i<LEVELS.length;i++){ var sc=LEVELS[i].scene, lst=lay.groups[lay.groups.length-1]; if(lst&&lst.sc===sc) lst.to=i; else lay.groups.push({sc:sc,from:i,to:i}); }
    lay.groups.forEach(function(gr,gi){ var m=gr.to-gr.from+1; for(i=gr.from;i<=gr.to;i++){ lay.gi[i]=gi; lay.x[i]=gi*W+34+(m>1?(W-68)*(i-gr.from)/(m-1):(W-68)/2); } });
    return (mapLay=lay); }
  // Wahrzeichen pro Stage (Pixel-Icons ueber dem Knoten der Weltkarte); (x,b) = Mitte/Boden
  function LM(nm,x0,b0){ var x=0, b=0, R=function(dx,dy,w,h,c){ box(x+dx,b+dy,w,h,c); }, D=function(dx,dy,r,c){ disc(x+dx,b+dy,r,c); };
    var F={
      DORF:function(){ R(-6,-9,12,9,1); R(-7,-11,14,2,2); R(-2,-5,4,5,10); R(-1,-18,3,7,1); R(-1,-21,1,3,4); R(-3,-19,5,1,4); },
      SALOON:function(){ R(-8,-10,16,10,10); R(-9,-13,18,3,12); R(-5,-7,3,3,4); R(2,-7,3,3,4); R(-2,-5,4,5,0); R(-6,-16,12,3,3); },
      WILDWEST:function(){ R(-2,-16,4,16,5); R(-6,-12,3,2,5); R(-6,-12,2,6,5); R(3,-9,3,2,5); R(5,-13,2,6,5); },
      BANDITENKOENIG:function(){ R(-9,-5,18,3,10); R(-5,-13,10,8,10); R(-5,-8,10,2,2); R(-9,-3,18,1,3); },
      NEONGITTER:function(){ for(var i=0;i<14;i++){ R(-i/2|0,-i-1,((i/2)|0)*2+1,1,(i%3)?13:14); } R(-7,0,15,1,14); R(0,-14,1,14,14); },
      SONNENUNTERGANG:function(){ D(0,-6,8,3); D(0,-6,6,2); R(-10,-6,21,7,12); for(var i=0;i<3;i++) R(-9,-5+i*2,19,1,i%2?13:14); },
      PALMENSTRAND:function(){ R(0,-14,2,14,10); R(-7,-16,7,2,5); R(2,-16,7,2,5); R(-4,-19,5,2,5); R(1,-19,6,2,5); R(-1,-18,3,3,10); },
      MARMORBUESTE:function(){ D(0,-12,6,1); R(-7,-6,14,6,1); R(-4,-13,3,2,0); R(1,-13,3,2,0); R(-6,-1,12,1,11); },
      STADT:function(){ R(-11,-8,6,8,12); R(-4,-15,6,15,11); R(3,-10,7,10,12); for(var i=0;i<4;i++){ R(-3,-13+i*3,1,1,4); R(0,-13+i*3,1,1,4); } },
      HOCHHAUS:function(){ R(-4,-20,9,20,12); R(-1,-24,3,4,11); for(var i=0;i<5;i++){ R(-2,-18+i*4,2,2,4); R(2,-18+i*4,2,2,(i&1)?4:11); } },
      METROPOLIS:function(){ R(-1,-22,2,14,11); D(0,-14,4,2); R(-4,-9,8,2,12); R(-3,-7,2,7,12); R(2,-7,2,7,12); R(-1,-25,1,4,1); },
      ROBOTURM:function(){ R(-7,-14,14,12,11); R(-5,-11,4,3,2); R(1,-11,4,3,2); R(-4,-6,8,2,0); R(-1,-18,2,4,12); D(0,-19,2,2); },
      AIRPORT:function(){ R(-2,-16,5,12,11); R(-5,-21,11,5,8); R(-5,-21,11,1,1); R(-4,-4,9,4,12); },
      WOLKEN:function(){ D(-5,-6,4,1); D(1,-9,5,1); D(7,-6,4,1); R(-9,-6,17,4,1); },
      JET:function(){ R(-9,-8,18,3,1); R(-3,-14,3,6,11); R(-3,-5,3,5,11); R(6,-11,3,4,2); R(9,-8,2,2,2); },
      ZEPPELIN:function(){ D(0,-9,6,11); R(-9,-9,18,1,11); D(-5,-9,4,11); D(5,-9,4,11); R(-8,-12,16,1,12); R(-2,-4,5,3,12); R(-10,-12,2,6,2); },
      TRAUMINSEL:function(){ R(-9,-2,19,3,4); R(-6,0,13,2,3); R(0,-14,2,12,10); R(-5,-16,6,2,5); R(2,-16,6,2,5); },
      ZUCKERWOLKEN:function(){ D(-4,-6,4,13); D(3,-8,5,13); R(-8,-5,16,3,13); R(-3,-16,1,6,1); R(-3,-16,5,1,2); },
      STERNENHAIN:function(){ R(-1,-18,3,16,4); R(-8,-11,17,3,4); R(-5,-15,11,2,4); R(-5,-7,11,2,4); R(-1,-12,3,5,1); },
      WOLKENDRACHE:function(){ D(0,-8,6,13); R(5,-9,6,5,13); R(-5,-15,2,4,4); R(2,-15,2,4,4); R(-3,-9,2,2,0); R(9,-8,2,1,2); },
      WALDLICHTUNG:function(){ R(-1,-6,3,6,10); D(0,-12,6,5); D(0,-16,4,6); },
      SCHATZTEMPEL:function(){ R(-9,-2,19,2,11); for(var i=-3;i<=3;i+=2) R(i*2,-12,2,10,1); R(-10,-15,21,3,11); R(-6,-18,13,3,11); },
      ELFENPFAD:function(){ R(-1,-6,3,6,1); D(0,-9,7,2); R(-4,-11,2,2,1); R(2,-9,2,2,1); R(-1,-13,2,2,1); },
      BAUMGEIST:function(){ R(-5,-7,10,7,10); D(0,-13,8,6); R(-4,-14,3,3,0); R(2,-14,3,3,0); R(-2,-8,5,2,0); },
      MONDHUEGEL:function(){ D(0,-12,8,4); D(3,-14,7,0); D(0,0,9,6); },
      STEINKREIS:function(){ for(var i=0;i<5;i++){ var h=9+(i%2)*3; R(-11+i*5,-h,4,h,11); R(-11+i*5,-h,4,1,1); } },
      RITTERBURG:function(){ R(-9,-12,18,12,11); for(var i=0;i<4;i++) R(-9+i*5,-15,3,3,11); R(-2,-6,5,6,0); R(-7,-9,2,3,0); R(5,-9,2,3,0); R(0,-22,1,7,10); R(1,-22,5,3,2); },
      DRUIDE:function(){ for(var i=0;i<12;i++) R(-6+i/2|0,-i-1,12-i,1,9); R(-8,-2,17,2,9); R(8,-19,2,19,10); D(9,-20,2,4); },
      KERKER:function(){ R(-8,-16,17,16,12); R(-5,-13,11,9,0); for(var i=0;i<3;i++) R(-3+i*3,-13,1,9,11); },
      GRUFT:function(){ R(-5,-11,11,11,11); D(0,-11,5,11); R(-1,-12,3,1,12); R(0,-14,1,6,12); R(-8,0,17,1,5); },
      SCHATZKAMMER:function(){ R(-8,-7,17,7,10); R(-8,-10,17,3,3); D(0,-10,8,3); R(-8,-5,17,1,4); R(-1,-6,3,3,4); R(-3,-14,2,2,4); R(2,-13,2,2,4); },
      SKELETTLORD:function(){ D(0,-11,7,1); R(-4,-5,9,5,1); R(-4,-12,3,3,0); R(2,-12,3,3,0); R(-1,-8,2,2,0); R(-3,-2,1,2,0); R(0,-2,1,2,0); R(-5,-20,11,2,4); },
      TEETISCH:function(){ R(-6,-8,10,8,1); R(-6,-8,10,2,10); R(4,-6,3,4,1); R(-10,0,20,2,10); R(-3,-14,1,4,11); R(1,-13,1,3,11); },
      KAMINZIMMER:function(){ R(-9,-14,19,14,2); R(-5,-9,11,9,0); R(-3,-6,3,6,3); R(0,-5,3,5,4); R(-10,-16,21,3,10); },
      KEKSBACKSTUBE:function(){ D(0,-7,8,10); R(-4,-10,2,2,0); R(1,-6,2,2,0); R(-2,-4,2,2,0); R(3,-10,2,2,0); },
      TEEKANNE:function(){ D(0,-7,7,13); R(-2,-16,5,3,13); R(-11,-9,4,2,13); R(7,-12,3,8,13); R(-2,-11,5,1,1); },
      ABSCHLAG:function(){ R(-1,-4,3,4,3); D(0,-8,3,1); R(-9,0,19,1,5); },
      FAIRWAY:function(){ R(-9,-5,19,5,5); R(-9,-5,19,1,6); R(-4,-10,3,1,6); R(1,-8,3,1,6); D(4,-9,2,1); },
      GREEN:function(){ R(-9,-1,19,2,5); R(-1,-16,1,15,1); R(0,-16,6,4,2); R(-4,-1,9,1,0); },
      GREENKEEPER:function(){ R(-9,-6,19,5,5); R(-6,-12,12,4,4); R(-8,-8,16,2,4); R(-6,-2,3,3,0); R(4,-2,3,3,0); R(7,-14,1,9,10); }
    };
    var f=F[nm]; if(f){ g.save(); g.translate(x0|0,b0|0); g.scale(2,2); f(); g.restore(); } }
  function bossLM(sc,x,y){ var sb=boss, sbs=bshots; boss={x:0,y:0,w:44,h:28,sc:sc,hp:2,hp0:2,mouth:0}; bshots=[]; g.save(); g.translate(x|0,y|0); g.scale(0.9,0.9); try{ drawBoss(); }catch(e){} g.restore(); boss=sb; bshots=sbs; } // Boss-Sprite als Wahrzeichen der Boss-Stage
  var padFl={pl:0,pr:0}; // Klick-Animation der Seiten-Pfeile (Rest-Frames)
  var MAPSP=46, mapScroll=0, mapFollow=true, mapPgT=0, mapR={}, mapSelFor=-1, mapWheelT=0;
  function nodeX(i){ return mapLayout().x[i]; } // Weltkoordinaten, Bildschirm = nodeX - mapScroll
  function nodeY(i){ return 108+Math.sin(i*0.9+0.4)*16; }
  function mapPages(){ return mapLayout().groups.length; }
  function mapWorldW(){ return mapPages()*W; }
  function mapMax(){ return Math.max(0,mapWorldW()-W); }
  function mapCenter(i){ return mapLayout().gi[i]*W; }
  function mapSelMax(){ var N=LEVELS.length, n=lvNum(), lap=Math.floor((n-1)/N); return Math.max((n-1)%N,Math.min(N-1,bestLv-lap*N-1)); } // hoechster waehlbarer Level (aktuell oder bereits geschafft)
  function mapJump(i){ var N=LEVELS.length, n=Math.floor((lvNum()-1)/N)*N+i+1; if(mode==='golf') hole=n; else level=n; seedN++; layout(); reset(); msg=(mode==='golf'?'LOCH ':'LEVEL ')+n+' '+LV().name; msgT=100; state='tee'; saveGame(); }
  function travelCost(i){ return 25*Math.abs(i-(lvNum()-1)%LEVELS.length); } // Reisen zu einem anderen Level kostet Gold (25 pro Stage Entfernung)
  var mapNoteT=0;
  function mapStart(i){ if(mapPick) startPick(i); else if(i===(lvNum()-1)%LEVELS.length) startLevel(); else { var tc=travelCost(i); if(gold<tc){ mapNote='REISE KOSTET '+tc+' GOLD - DU HAST '+gold; mapNoteT=150; return; } gold-=tc; saveGame(); mapJump(i); } }
  function mapPage(d){ var pg=Math.max(0,Math.min(mapPages()-1,Math.round(mapScroll/W)+d)); mapPgT=pg; mapFollow=false; }
  function isoTile(c,cx2,cy2,hw,hh){ g.fillStyle=c; for(var dy=-hh;dy<hh;dy++){ var w2=Math.round(hw*(1-Math.abs(dy+0.5)/hh)); g.fillRect(cx2-w2,cy2+dy,w2*2,1); } }
  function shd(hx,f){ var n=parseInt(hx.slice(1),16), r=(n>>16)&255, gg=(n>>8)&255, b=n&255; function q(v){ v=f<0?v*(1+f):v+(255-v)*f; return (Math.max(0,Math.min(255,v))>>5<<5)|((v>>5)&0); } return 'rgb('+q(r)+','+q(gg)+','+q(b)+')'; } // Farbe heller/dunkler, auf 8 Stufen gerastert (Retro-Palette)
  function dith(x,y,w,h2,c1,c2,lvl){ g.fillStyle=c1; g.fillRect(x,y,w,h2); g.fillStyle=c2; for(var yy=0;yy<h2;yy++) for(var xx=(yy+lvl)&1;xx<w;xx+=2) g.fillRect(x+xx,y+yy,1,1); } // Raster-Dithering (Schachbrett-Pixel)
  // Themen-Horizont: jede Welt hat eine eigene Silhouette, damit die Karte an das Level erinnert
  function horizon(sc,x0,hz,gi,pal){ var c,i,h,hs=function(a,b){ var v=Math.sin(a*127.1+b*311.7+gi*74.7)*43758.5453; return v-Math.floor(v); }, dk=shd(pal.sky,-0.55), md=shd(pal.sky,-0.3);
    function hills(col,amp,fr,off,step){ g.fillStyle=col; for(c=0;c<W;c+=step){ var hy=Math.round(amp+Math.sin(c*fr+gi*2+off)*amp*0.5+Math.sin(c*fr*3.1+gi+off)*amp*0.2); g.fillRect(x0+c,hz-hy,step,hy+1); } }
    if(sc==='western'){ for(i=0;i<5;i++){ var mx=x0+10+i*60+hs(i,1)*20|0, mw=22+hs(i,2)*22|0, mh=14+hs(i,3)*16|0; g.fillStyle=shd('#b06a3a',-0.25); g.fillRect(mx,hz-mh,mw,mh+1); g.fillRect(mx+3,hz-mh-4,mw-8,4); g.fillStyle=shd('#d88a50',0); g.fillRect(mx,hz-mh,3,mh+1); for(c=0;c<mh;c+=4){ g.fillStyle=shd('#8a4a28',0); g.fillRect(mx+3,hz-c,mw-3,1); } } box(x0+W-40,hz-22,12,12,4); disc(x0+W-34,hz-26,5,4); }
    else if(sc==='city'){ for(c=0;c<W;c+=9){ var bh=10+hs(c,1)*28|0, bw=7+(hs(c,2)*4|0); g.fillStyle=(c/9&1)?shd('#2a3a60',0):shd('#1c2644',0); g.fillRect(x0+c,hz-bh,bw,bh+1); for(var wy=hz-bh+3;wy<hz-2;wy+=4) for(var wx=x0+c+1;wx<x0+c+bw-1;wx+=3) if(hs(wx,wy)>0.45){ g.fillStyle=hs(wx,wy)>0.8?'#ffee66':'#f0c040'; g.fillRect(wx,wy,1,2); } } }
    else if(sc==='flight'){ hills(shd('#6aa05a',-0.1),10,0.04,0,3); for(i=0;i<5;i++){ var cx0=x0+20+i*58+hs(i,4)*18|0, cy0=hz-24-hs(i,5)*22|0; disc(cx0,cy0,5,1); disc(cx0+7,cy0+2,4,1); disc(cx0-7,cy0+2,4,1); box(cx0-10,cy0+2,22,3,1); } }
    else if(sc==='dream'){ hills(shd(pal.sky,0.15),12,0.035,0,2); for(i=0;i<4;i++){ var ix=x0+30+i*70+hs(i,6)*20|0, iy=hz-30-hs(i,7)*20|0; box(ix-9,iy,18,3,13); box(ix-7,iy+3,14,2,10); box(ix-4,iy+5,8,2,10); box(ix-1,iy-5,2,5,10); disc(ix,iy-7,4,14); } }
    else if(sc==='forest'){ hills(shd('#1a4028',0),10,0.05,1,3); for(c=0;c<W;c+=7){ var th=10+hs(c,1)*14|0; g.fillStyle=(c/7&1)?shd('#1c4a2a',0):shd('#143a22',0); for(i=0;i<th;i+=2) g.fillRect(x0+c+(i>>1)-1,hz-th+i,Math.max(1,7-(i>>1)*2+1),2); } }
    else if(sc==='vapor'){ disc(x0+W/2,hz-20,19,13); for(i=0;i<6;i++){ box(x0+W/2-19,hz-14+i*3,38,1+(i>>1),shd(pal.sky,-0.3)); } disc(x0+W/2,hz-20,19,0); disc(x0+W/2,hz-20,18,3); for(i=0;i<7;i++){ box(x0+W/2-19,hz-26+i*4,38,1+(i>>1),shd(pal.sky,-0.2)); } for(i=0;i<5;i++){ var gx=x0+i*80-10, gh=14+hs(i,3)*10|0; for(c=0;c<gh;c++){ box(gx+c,hz-c,1,1,14); box(gx+gh*2-c,hz-c,1,1,14); } } }
    else if(sc==='moon'){ hills(shd('#4a5078',0),10,0.07,0,2); disc(x0+W-50,hz-30,13,7); disc(x0+W-54,hz-33,5,5); disc(x0+W-46,hz-27,6,5); disc(x0+W-50,hz-30,13,7); g.fillStyle=shd('#8a90b0',0); for(c=0;c<W;c+=3){ var jh=Math.round(7+Math.abs(Math.sin(c*0.09+gi))*14); g.fillRect(x0+c,hz-jh,3,jh+1); } for(i=0;i<8;i++){ var cr=x0+hs(i,8)*W|0; box(cr,hz+2,7,1,11); } }
    else if(sc==='dungeon'){ g.fillStyle='#0c0c0c'; for(c=0;c<W;c+=2){ var sh=Math.round(6+hs(c,1)*12); g.fillRect(x0+c,20,2,sh+10); } for(i=0;i<4;i++){ var ax=x0+22+i*70; box(ax-14,hz-22,28,23,12); box(ax-10,hz-18,20,19,0); disc(ax,hz-18,10,0); box(ax-14,hz-24,28,2,11); box(ax+16,hz-14,2,4,3); box(ax+16,hz-17,2,2,4); } }
    else if(sc==='cozy'){ box(x0,hz-8,W,9,shd('#6a4228',0)); for(i=0;i<3;i++){ var fx=x0+14+i*95; if(i===1){ box(fx,hz-38,28,38,10); for(c=0;c<3;c++){ box(fx+2,hz-35+c*12,24,2,3); for(var bk=0;bk<6;bk++) box(fx+3+bk*4,hz-33+c*12,3,8,[2,5,7,4,13,9][bk]); } } else { box(fx,hz-32,22,26,8); box(fx+2,hz-30,9,22,14); box(fx+12,hz-30,8,22,14); box(fx-2,hz-6,26,3,10); } } }
    else { hills(shd('#3a9a50',-0.1),14,0.04,0,2); hills(shd('#2a7a3c',0),8,0.07,2,2); for(i=0;i<3;i++){ var fx=x0+40+i*100+hs(i,2)*20|0; box(fx,hz-24,1,22,1); box(fx+1,hz-24,6,4,2); } for(i=0;i<5;i++){ var tx2=x0+10+i*58+hs(i,3)*20|0; box(tx2,hz-9,2,5,10); disc(tx2+1,hz-12,4,6); } } }
  function padBtn(x,y,w,h2,hv){ g.fillStyle=hv?'rgba(0,0,0,0.5)':'rgba(0,0,0,0.28)'; g.fillRect(x,y,w,h2); g.fillStyle=hv?'rgba(255,221,0,0.4)':'rgba(255,255,255,0.12)'; for(var yy=0;yy<h2;yy++) for(var xx=(yy>>1)&1?2:0;xx<w;xx+=4) g.fillRect(x+xx,y+yy,2,1); // Streifen-/Schachmuster
    g.fillStyle=hv?'#ffdd00':'rgba(255,255,255,0.35)'; g.fillRect(x,y,w,1); g.fillRect(x,y+h2-1,w,1); g.fillRect(x,y,1,h2); g.fillRect(x+w-1,y,1,h2); } // halbtransparenter Pfeil-Button, Hover = dunkler + gelb
  function mapTerrain(){ if(mapC) return; var WW=mapWorldW(); mapC=document.createElement('canvas'); mapC.width=WW; mapC.height=H;
    var g0=g, mg=mapC.getContext('2d'), groups=mapLayout().groups, gi, r, c;
    g=mg;
    groups.forEach(function(gr,gi){ var x0=gi*W, pal=SPAL[gr.sc]||SPAL.golf, hz=82; gr.x0=x0; g.save(); g.beginPath(); g.rect(x0,20,W,128); g.clip(); gr.x1=x0+W;
      var bn=9, bh0=(hz-20)/bn; for(r=0;r<bn;r++){ var y1=(20+r*bh0)|0, y2=(20+(r+1)*bh0)|0, f=-0.4+r*0.08; g.fillStyle=shd(pal.sky,f); g.fillRect(x0,y1,W,y2-y1); if(r<bn-1){ dith(x0,y2-3,W,3,shd(pal.sky,f),shd(pal.sky,f+0.1),0); } }
      if(gr.sc==='moon'||gr.sc==='dream'||gr.sc==='dungeon'||gr.sc==='vapor'||gr.sc==='city'){ for(r=0;r<26;r++){ var sx=x0+((r*97+gi*41)%(W-4))+2, sy=24+((r*53+gi*17)%50); box(sx,sy,1,1,(r%3)?1:4); if(r%7===0){ box(sx-1,sy,3,1,1); box(sx,sy-1,1,3,1); } } }
      // Gelaende: Flecken statt Schachbrett, Farbrauschen, keine Kachelkanten; Pfad entlang der Level-Knoten
      var lay0=mapLayout(), pathY=function(wx){ var i=0; while(i<lay0.x.length-2&&lay0.x[i+1]<wx) i++; var xa=lay0.x[i], xb=lay0.x[i+1], f=Math.max(0,Math.min(1,(wx-xa)/(xb-xa))); return nodeY(i)+(nodeY(i+1)-nodeY(i))*f; };
      var hh=function(a,b){ var v=Math.sin(a*127.1+b*311.7+gi*74.7)*43758.5453; return v-Math.floor(v); };
      g.fillStyle=pal.b; g.fillRect(x0,hz,W,148-hz);
      for(r=0;r<46;r++){ var bx=x0+hh(r,1)*W, by=hz+4+hh(r,2)*(148-hz), brx=10+hh(r,3)*26, bry=3+hh(r,4)*8, up=hh(r,5)>0.5, bc=up?shd(pal.a,hh(r,6)*0.25):shd(pal.b,-0.1-hh(r,6)*0.3), bc2=up?shd(pal.a,0.3):shd(pal.b,-0.4);
        for(var yy=-bry;yy<=bry;yy++){ var ww=Math.sqrt(1-(yy*yy)/(bry*bry))*brx|0; if(!ww) continue; g.fillStyle=bc; g.fillRect(bx-ww,by+yy,ww*2,1); if(yy===-bry||Math.abs(yy)>=bry-1){ g.fillStyle=bc2; for(var xx=-ww+(yy&1);xx<ww;xx+=2) g.fillRect(bx+xx,by+yy,1,1); } } }
      for(r=0;r<160;r++){ var px=x0+hh(r,7)*W, py=hz+2+hh(r,8)*(148-hz); g.fillStyle=hh(r,9)>0.5?shd(pal.a,0.4):shd(pal.b,-0.5); g.fillRect(px|0,py|0,hh(r,10)>0.7?2:1,1); }
      for(c=0;c<W;c+=2){ var wx=x0+c, wy=pathY(wx)+Math.sin(wx*0.11)*2; g.fillStyle=shd('#e8d8a0',-0.1); g.fillRect(wx,(wy-2)|0,2,5); g.fillStyle=shd('#a89060',-0.2); g.fillRect(wx,(wy+2)|0,2,1); if(c%6===0){ g.fillRect(wx,(wy-3)|0,1,1); } }
      if(gr.sc==='vapor'){ g.fillStyle=shd('#ff71ce',0.15); for(r=0;r<7;r++) g.fillRect(x0,hz+4+r*r*1.6|0,W,1); for(c=-10;c<=10;c++){ for(r=0;r<66;r+=2) g.fillRect(x0+W/2+c*(6+r*0.9)|0,hz+r,1,2); } }
      if(gr.sc==='golf'){ for(r=0;r<2;r++){ var px2=x0+50+r*160, py2=hz+34+r*6; disc(px2,py2,12,7); disc(px2,py2,10,8); box(px2-6,py2-3,6,1,1); } disc(x0+W-70,hz+20,9,4); disc(x0+W-70,hz+20,7,4); }
      if(gr.sc==='city'){ g.fillStyle='#2a2a30'; g.fillRect(x0,hz+30,W,8); g.fillStyle='#e8d060'; for(c=0;c<W;c+=12) g.fillRect(x0+c,hz+34,6,1); }
      if(gr.sc==='dungeon'){ g.fillStyle='#202024'; for(r=0;r<8;r++) for(c=0;c<W/12;c++) g.fillRect(x0+c*12+((r&1)*6),hz+4+r*8,11,1); }
      // Horizont: Huegelsilhouette
      horizon(gr.sc,x0,hz,gi,pal);
      // Deko je Welt (deterministisch)
      for(r=0;r<22;r++){ var dx=x0+10+((gi*37+r*83)%(W-20)), dy=hz+10+((gi*29+r*53)%52), sc2=gr.sc; if(Math.abs(dy-pathY(dx))<13||Math.abs(dx-(x0+W/2))<20&&dy<hz+24) continue;
        if(sc2==='forest'||sc2==='golf'||sc2==='flight'){ box(dx,dy-4,2,5,10); disc(dx+1,dy-7,3,sc2==='flight'?5:6); disc(dx+1,dy-8,2,5); }
        else if(sc2==='western'){ box(dx,dy-7,2,8,5); box(dx-2,dy-5,2,1,5); box(dx-2,dy-6,1,3,5); box(dx+2,dy-4,2,1,5); box(dx+3,dy-5,1,3,5); }
        else if(sc2==='city'||sc2==='vapor'){ var bh=5+((r*7)%9); box(dx,dy-bh,5,bh,sc2==='city'?12:9); box(dx,dy-bh,5,1,sc2==='city'?11:14); box(dx+1,dy-bh+2,1,1,4); box(dx+3,dy-bh+4,1,1,4); }
        else if(sc2==='moon'||sc2==='dungeon'){ disc(dx,dy-2,3,11); disc(dx-1,dy-3,2,1); box(dx-3,dy+1,7,1,0); }
        else if(sc2==='dream'){ box(dx,dy-6,1,6,1); box(dx-2,dy-4,5,1,4); box(dx-1,dy-5,3,3,4); }
        else { disc(dx,dy-2,3,10); box(dx-1,dy-3,1,1,0); box(dx+1,dy-1,1,1,0); } }
      var lk=gr.sc==='golf'?1:1; drawLandmark(gr.sc,x0+(W/2|0),hz+8,1.5); // Wahrzeichen steht am Horizont
      g.restore(); });
    g.fillStyle='rgba(0,0,0,0.22)'; for(r=21;r<148;r+=2) g.fillRect(0,r,WW,1); // CRT-Scanlines
    g.fillStyle='#000'; groups.forEach(function(gr,gi){ if(gi>0) g.fillRect(gr.x0-1,20,2,128); });
    g.fillRect(0,19,WW,1); g.fillRect(0,148,WW,1);
    groups.forEach(function(gr,gi){ gr.x0=gi*W; gr.x1=(gi+1)*W; }); // vor dem Zeichnen der Trennlinien noetig
    g=g0; mapC.groups=groups; }
  // Symbolische Cluster-Icons (24x18-Raster, skaliert) fuer die Weltkarten-Buttons
  function drawSceneIcon(sc,x,y,w,h){ var pal=SPAL[sc]||SPAL.golf; g.save(); g.beginPath(); g.rect(x,y,w,h); g.clip();
    g.fillStyle=pal.sky; g.fillRect(x,y,w,h); var gy=y+((h*0.62)|0); for(var r=0;gy+r*2<y+h;r++) for(var c=-1;c<w/6+1;c++){ isoTile(((c+r)&1)?pal.a:pal.b,x+c*6+(r&1)*3,gy+r*2+2,3,2); }
    drawLandmark(sc,x+(w/2|0),y+h-1,Math.min(w/32,h/26)); g.restore(); }
  // ===== Game Over: grosser zerbrochener Ball (Stil: FF8-Verlustbildschirm), Retry / Map-Auswahl =====
  function drawOver(){ box(0,0,W,H,0); var t=overT, bcx=cx, bcy=84, R0=46, r, yy, sep=Math.min(7,t/6), hov;
    for(r=0;r<40;r++){ var sx=(r*73)%W, sy=(r*131)%H; box(sx,sy,1,1,((r+(tick>>4))%5===0)?12:15); }
    var pul=2+Math.round(Math.sin(tick*0.08)*1.5); for(r=0;r<4;r++){ var ra=R0+8+pul-r*2; disc(bcx,bcy,ra,r&1?15:2); disc(bcx,bcy,ra-1,0); } // rotes Pulsieren hinter dem Ball
    var zx=function(y){ return bcx+Math.round(Math.sin(y*0.32)*5+((y*7)%5)-2); };
    for(yy=-R0;yy<=R0;yy++){ var w=Math.floor(Math.sqrt(R0*R0-yy*yy+R0*0.5)), z=zx(yy), shade=yy>R0*0.45?11:(yy>R0*0.1?1:1);
      var ly=bcy+yy+Math.round(sep*0.4), ry=bcy+yy-Math.round(sep*0.4), lx0=bcx-w-sep, lx1=z-sep, rx0=z+sep, rx1=bcx+w+sep;
      if(lx1>lx0){ box(lx0,ly,lx1-lx0,1,shade); box(lx0,ly,2,1,12); box(lx1-2,ly,2,1,t>10?2:12); } // linke Haelfte, roter Bruchrand
      if(rx1>rx0){ box(rx0,ry,rx1-rx0,1,yy>R0*0.2?11:12); box(rx1-2,ry,2,1,12); box(rx0,ry,2,1,t>10?2:12); } }
    for(r=0;r<6;r++){ var hy=bcy-R0*0.6+r*3; box(bcx-sep-R0*0.55+r*2,hy|0,8-r,1,1); } // Glanzlicht
    for(r=0;r<7;r++){ var cyy=bcy-R0+10+r*12, cxx=zx(cyy-bcy)+(r&1?-9:9); box(cxx,cyy+Math.round(sep*0.4),6,1,12); box(cxx+6*(r&1?-1:1),cyy+1+Math.round(sep*0.4),4,1,12); } // Risse
    for(r=0;r<16;r++){ var vx=((r*37)%13-6)*0.35, vy=-1.2-((r*53)%7)*0.25, sx2=bcx+((r*29)%31-15), sy2=bcy+((r*17)%19-9), px=sx2+vx*t*0.6, py=sy2+vy*t*0.6+0.012*t*t*0.5; if(t<4||py>H+4||t<0) continue; var sz=2+(r%3); box(px,py,sz,sz-1,r&1?1:11); box(px,py,1,1,2); } // Bruchstuecke fliegen und fallen
    var gt=t>40?(t>80?2:(t>60?13:12)):15; txtS('GAME OVER',((W-9*16)/2)|0,146,t>40?gt:15,4); // Text blendet verzoegert ein
    if(t>70) txt('PUNKTE '+overScore+'  -  STAGE '+(overIdx+1),((W-(11+String(overScore).length+11)*4)/2)|0,172,11);
    overR={retry:{x:42,y:188,w:100,h:20},map:{x:158,y:188,w:100,h:20}};
    if(t>40){ [['retry','RETRY',0],['map','MAP AUSWAHL',1]].forEach(function(b){ var rc=overR[b[0]], sel=overSel===b[2]||hit(rc); if(hit(rc)) overSel=b[2]; bevel(rc.x,rc.y,rc.w,rc.h,sel?7:12,sel?8:11,15); if(sel&&((tick>>3)&1)) { box(rc.x-3,rc.y+rc.h/2-1,2,3,4); box(rc.x+rc.w+1,rc.y+rc.h/2-1,2,3,4); } txtS(b[1],(rc.x+(rc.w-b[1].length*4*1)/2)|0,rc.y+7,sel?4:1,1); }); txt('R = RETRY - M = MAP',((W-19*4)/2)|0,H-10,11); }
    if(locked()) drawCursor(); }
  function drawMap(){ box(0,0,W,H,15); for(var si=0;si<60;si++) box((si*73)%W,(si*131)%H,1,1,((si+(tick>>4))%5===0)?1:12); mapTerrain();
    var N0=LEVELS.length, cur0=(lvNum()-1)%N0, lap=Math.floor((lvNum()-1)/N0)+1, i, k, mM=mapMax(), sMax=mapPick?N0-1:mapSelMax();
    if(!mapPick&&(mapT<=1||mapSelFor!==lvNum())){ mapSelFor=lvNum(); mapSel=cur0; }   // nach Level-Wechsel wieder auf dem aktuellen Level starten
    if(!mapPick&&mapSel>sMax) mapSel=sMax;
    var idx=mapPick?mapSel:cur0, n=(mapPick?0:(lap-1)*N0)+mapSel+1; if(mapPick) lap=1;
    // Kamera: Seitenweise. Folgt der Auswahl, Seitenpfeile / Punkte / Rad blaettern frei
    if(mapT<=1){ mapScroll=mapCenter(mapSel); mapFollow=true; }
    var camT=mapFollow?mapCenter(mapSel):mapPgT*W; mapScroll+=(camT-mapScroll)*0.2; if(Math.abs(camT-mapScroll)<0.5) mapScroll=camT;
    mapScroll=Math.max(0,Math.min(mM,mapScroll)); var sc0=mapScroll|0, pgNow=Math.round(mapScroll/W);
    g.drawImage(mapC,sc0,0,W,H,0,0,W,H);
    mapC.groups.forEach(function(gr){ var lb=GL[gr.sc]||gr.sc; txt(lb,((gr.x0+gr.x1)/2-lb.length*2-sc0)|0,23,1); });
    txtS(mapPick?'STARTSTAGE':'WELTKARTE',8,4,4,2); if(!mapPick&&mapNoteT>0){ mapNoteT--; txtS(mapNote,92,6,2,1); } else if(!mapPick) txt('GOLD: '+gold,92,7,4);
    backR=null; if(mapPick){ backR={x:W-62,y:4,w:50,h:12}; bevel(backR.x,backR.y,backR.w,backR.h,hit(backR)?7:12,hit(backR)?8:11,15); txt('ZURUECK',backR.x+11,backR.y+4,1); if(mapNote) txtS(mapNote,92,6,2,1); else if(lastPick>=0) txt('ZULETZT: STAGE '+(lastPick+1),92,7,11); } if(mapPick){ loopR={x:W-62-4-70,y:4,w:70,h:12}; var lh=hit(loopR); bevel(loopR.x,loopR.y,loopR.w,loopR.h,lh?7:12,lh?8:11,15); box(loopR.x+3,loopR.y+3,7,7,0); box(loopR.x+4,loopR.y+4,5,5,loopPref?4:15); if(loopPref){ box(loopR.x+5,loopR.y+6,1,1,0); box(loopR.x+6,loopR.y+7,1,1,0); box(loopR.x+7,loopR.y+5,1,1,0); } txt('CLUSTER LOOP',loopR.x+13,loopR.y+4,loopPref?4:1); } else { loopR=null; var rt='RUNDE '+lap, rx0=W-14-rt.length*4; txtS(rt,rx0,6,1,1); if(loopG) txt('LOOP',rx0-24,7,8); }
    for(i=0;i<LEVELS.length-1;i++){ if(nodeX(i+1)-sc0<-4||nodeX(i)-sc0>W+4) continue; for(k=0;k<=12;k++){ var f=k/12; box(nodeX(i)-sc0+(nodeX(i+1)-nodeX(i))*f,nodeY(i)+(nodeY(i+1)-nodeY(i))*f,2,2,(mapPick?false:i<sMax)?4:11); } }
    for(i=0;i<LEVELS.length;i++){ var lv=LEVELS[i], x=(nodeX(i)-sc0)|0, y=nodeY(i)|0, done=mapPick?false:(i<=sMax&&i!==mapSel), cur=i===mapSel; if(x<-14||x>W+14) continue;
      var nr=lv.boss?10:8; if(lv.boss) bossLM(lv.scene,x,y-nr-22); else LM(lv.name,x,y-nr-4); if(lv.boss){ disc(x,y,nr+3,2); txt('BOSS',x-8,y+nr+5,2); } disc(x,y,nr+1,0); disc(x,y,nr,done?SCC[lv.scene]:(cur?4:(mapPick?SCC[lv.scene]:12)));
      if(done){ box(x-3,y,2,2,0); box(x-1,y+2,2,2,0); box(x+1,y,2,2,0); box(x+3,y-2,2,2,0); }
      else txt(String(i+1),x-(i>=9?3:1),y-2,cur?0:(mapPick?0:11));
      if(cur){ var pr=9+Math.round(Math.sin(tick*0.15)*1.5); for(k=0;k<14;k++){ var an=k*0.449; box(x+Math.round(Math.cos(an)*(pr+3)),y+Math.round(Math.sin(an)*(pr+3)),1,1,(tick>>3)&1?4:1); } } }
    var t=(mapAnim&&!mapPick&&idx>0)?Math.min(1,mapT/70):1, e1=t<1?t*t*(3-2*t):1, ax=(idx>0?nodeX(idx-1)+(nodeX(idx)-nodeX(idx-1))*e1:nodeX(idx))-sc0, ay=idx>0?nodeY(idx-1)+(nodeY(idx)-nodeY(idx-1))*e1:nodeY(idx), hop=Math.abs(Math.sin(tick*0.12))*5;
    box((ax|0)-3,(ay|0)-12,7,1,12); disc(ax|0,((ay-14-hop)|0),3,1); box((ax|0)-1,((ay-15-hop)|0),1,1,11);
    mapR={}; var NP=mapPages();
    if(pgNow>0){ mapR.pl={x:2,y:30,w:16,h:108}; var fl1=padFl.pl; if(fl1>0) padFl.pl--; var o1=-Math.round(Math.sin(fl1/14*Math.PI)*4); padBtn(2,30,16,108,hit(mapR.pl)||fl1>0); for(k=0;k<5;k++) box(8+k+o1,84-k,1,2*k+1,(tick>>3)&1?4:1); }
    if(pgNow<NP-1){ mapR.pr={x:W-18,y:30,w:16,h:108}; var fl2=padFl.pr; if(fl2>0) padFl.pr--; var o2=Math.round(Math.sin(fl2/14*Math.PI)*4); padBtn(W-18,30,16,108,hit(mapR.pr)||fl2>0); for(k=0;k<5;k++) box(W-8-k+o2,84-k,1,2*k+1,(tick>>3)&1?4:1); }
    var tw=Math.min(25,((W-8)/NP-3)|0), th=(tw*3/4)|0, dx0=((W-NP*(tw+3)+3)/2)|0, dy0=152; // unter den Level-Bullets (max. y~138) // Cluster-Buttons mit Mini-Vorschau der Weltkarte
    for(i=0;i<NP;i++){ var bx0=dx0+i*(tw+3), gr2=mapLayout().groups[i], lockd=!mapPick&&gr2.from>sMax, hv=false; mapR['d'+i]={x:bx0-1,y:dy0-1,w:tw+2,h:th+2}; hv=hit(mapR['d'+i]);
      box(bx0-1,dy0-1,tw+2,th+2,i===pgNow?4:(hv?1:0)); drawSceneIcon(gr2.sc,bx0,dy0,tw,th);
      if(lockd){ g.globalAlpha=0.6; g.fillStyle='#000'; g.fillRect(bx0,dy0,tw,th); g.globalAlpha=1; }
      box(bx0,dy0+th-2,tw,2,lockd?12:SCC[gr2.sc]); }
    txt('SEITE '+(pgNow+1)+'/'+NP,8,23,11);
    var iw=260, ix=cx-130, iy=175; bevel(ix,iy,iw,41,12,11,15);
    var lvv=LEVELS[mapSel]; txtS((mode==='golf'?'LOCH ':'LEVEL ')+n+' - '+lvv.name,ix+8,iy+5,4,1);
    txt('KULISSE: '+(SCN[lvv.scene]||lvv.scene),ix+8,iy+15,8);
    txt('SCHWIERIGKEIT',ix+8,iy+24,1); var dif=Math.min(5,Math.max(1,Math.round((lvv.b+lvv.mv*6)/3))); for(k=0;k<5;k++) box(ix+64+k*8,iy+23,6,5,k<dif?2:15);
    txt(lvv.boss?'BOSSKAMPF - BESIEGE DEN GEGNER OBEN':(mode==='golf'?'PAR '+lvv.par+' - '+lvv.sh.length+' HINDERNISSE':'STEINFORM: '+String(lvv.pat).toUpperCase()),ix+8,iy+33,lvv.boss?2:11);
    if((tick>>4)&1){ var hint=mapPick?'BLASE ANKLICKEN ODER ENTER = START':(mapSel===cur0?'LEERTASTE ODER KLICK = START':'ENTER = REISE: '+travelCost(mapSel)+' GOLD'); txtS(hint,((W-hint.length*4)/2)|0,H-8,4,1); } else if(mapPick) txt('L = CLUSTER LOOP AN/AUS',((W-23*4)/2)|0,H-8,11); else if(sMax>0) txt('PFEILE = LEVEL WAEHLEN',((W-22*4)/2)|0,H-8,11);
    if(mouseIn){ drawCursor(); } }
  var SHC={aim:[2,4],aim2:[3,1],fan:[3,4],homing:[8,1],bomb:[12,3],wave:[13,1],split:[9,13],ring:[14,1]};
  function drawBoss(){ bshots.forEach(function(sh){
      if(sh.ty==='beam'){ var bx=sh.x|0; if(sh.t<40){ if((sh.t>>2)&1) for(var yy=10;yy<H-20;yy+=6) box(bx,yy,1,3,4); } else { box(bx-3,0,7,H,3); box(bx-1,0,3,H,1); } return; }
      var c=SHC[sh.ty]||[2,4], r=sh.ty==='bomb'?5:3; box(sh.x-r,sh.y-r,r*2+1,r*2+1,0); box(sh.x-r+1,sh.y-r+1,r*2-1,r*2-1,c[0]); box(sh.x-1,sh.y-1,3,3,c[1]); });
    if(boss&&boss.mouth>0){ var mc=((tick>>2)&1)?13:1, bw=boss.w/2+3, bh=boss.h/2+3; box(boss.x-bw,boss.y-bh,bw*2,1,mc); box(boss.x-bw,boss.y+bh,bw*2,1,mc); box(boss.x-bw,boss.y-bh,1,bh*2,mc); box(boss.x+bw,boss.y-bh,1,bh*2,mc); }
    if(!boss) return; var x=boss.x|0, y=boss.y|0, sc=boss.sc, i, k, w2, bl=(tick>>3)&1, ph2=boss.hp<=boss.hp0/2;
    if(sc==='western'){ // Banditenkoenig: Sombrero, Maske, Patronengurt
      box(x-22,y-8,44,4,0); box(x-22,y-8,44,3,10); box(x-22,y-8,44,1,3); box(x-11,y-18,22,11,0); box(x-10,y-17,20,10,10); box(x-10,y-10,20,2,2);
      box(x-9,y-4,18,14,0); box(x-8,y-3,16,12,3); box(x-8,y,16,4,0); box(x-6,y+1,3,2,1); box(x+3,y+1,3,2,1); box(x-6,y+6,12,2,0); box(x-14,y+10,28,9,0); box(x-13,y+10,26,8,2);
      for(i=0;i<6;i++) box(x-12+i*4,y+12,2,4,4); }
    else if(sc==='vapor'){ // schwebende Marmorbueste mit Sonnenbrille
      box(x-16,y+6,32,9,0); box(x-15,y+7,30,8,1); disc(x,y-5,12,0); disc(x,y-5,11,1); disc(x-3,y-7,8,1);
      for(i=0;i<7;i++) disc(x-11+i*4,y-15+(i%2)*2,3,11); box(x-10,y-8,9,5,0); box(x+1,y-8,9,5,0); box(x-9,y-7,7,3,13); box(x+2,y-7,7,3,13); box(x-1,y-7,3,1,0); box(x+10,y-3,4,6,1); box(x-4,y+3,8,2,11);
      for(i=0;i<5;i++) box(x-14+i*7,y+17,4,1,bl?14:13); }
    else if(sc==='city'){ // Robo-Turm
      box(x-13,y-16,26,16,0); box(x-12,y-15,24,14,12); box(x-12,y-15,24,2,11); box(x-1,y-24,3,8,11); disc(x,y-25,2,bl?2:4);
      box(x-9,y-10,7,5,0); box(x+2,y-10,7,5,0); box(x-8,y-9,5,3,ph2?2:4); box(x+3,y-9,5,3,ph2?2:4);
      box(x-19,y,38,16,0); box(x-18,y+1,36,14,12); for(i=0;i<5;i++) for(k=0;k<2;k++) box(x-14+i*6,y+3+k*6,3,3,(i+k+bl)%2?4:15);
      box(x-25,y+2,6,12,0); box(x-24,y+3,4,10,11); box(x+19,y+2,6,12,0); box(x+20,y+3,4,10,11); box(x-9,y+16,5,5+bl*2,3); box(x+5,y+16,5,5+bl*2,3); }
    else if(sc==='flight'){ // Zeppelin
      for(i=-9;i<=9;i++){ w2=Math.round(28*Math.sqrt(1-(i/10)*(i/10))); box(x-w2-1,y+i,2*w2+2,1,0); }
      for(i=-8;i<=8;i++){ w2=Math.round(28*Math.sqrt(1-(i/10)*(i/10))); box(x-w2,y+i,2*w2,1,(i+8)%6<3?1:11); }
      box(x+24,y-12,7,9,0); box(x+25,y-11,5,7,2); box(x+24,y+3,7,9,0); box(x+25,y+4,5,7,2); box(x-10,y+9,20,7,0); box(x-9,y+10,18,5,12); for(i=0;i<4;i++) box(x-7+i*5,y+11,3,2,4);
      box(x+29,y-3,2,7,(tick>>1)&1?11:12); box(x-30,y-2,3,5,2); }
    else if(sc==='dream'){ // Wolkendrache
      disc(x,y,13,0); disc(x-13,y+4,10,0); disc(x+13,y+4,10,0); disc(x,y,12,1); disc(x-13,y+4,9,1); disc(x+13,y+4,9,1);
      box(x-9,y-17,4,8,0); box(x-8,y-16,2,7,13); box(x+6,y-17,4,8,0); box(x+7,y-16,2,7,13);
      disc(x-5,y-2,2,0); disc(x+5,y-2,2,0); box(x-6,y-3,1,1,1); box(x+4,y-3,1,1,1); disc(x-9,y+3,2,13); disc(x+9,y+3,2,13); box(x-4,y+4,8,2,0);
      for(i=0;i<4;i++) disc(x+22+i*3,y+8+Math.round(Math.sin(tick*0.2+i)*3),3-(i>>1),13); }
    else if(sc==='forest'){ // Baumgeist
      box(x-11,y-3,22,22,0); box(x-10,y-2,20,20,10); for(i=0;i<5;i++) box(x-9+i*4,y,1,16,0);
      disc(x,y-12,15,0); disc(x-11,y-8,10,0); disc(x+11,y-8,10,0); disc(x,y-12,14,5); disc(x-11,y-8,9,6); disc(x+11,y-8,9,6); disc(x-4,y-14,5,5);
      box(x-6,y+2,4,4,0); box(x+2,y+2,4,4,0); box(x-5,y+3,2,2,ph2?2:4); box(x+3,y+3,2,2,ph2?2:4); box(x-4,y+10,8,3,0);
      for(i=0;i<8;i++){ box(x-14-i,y+6+i,3,2,10); box(x+12+i,y+6+i,3,2,10); } }
    else if(sc==='moon'){ // Druide mit Mondstab
      for(i=-16;i<=16;i++){ w2=Math.round(6+(i+16)*0.5); box(x-w2-1,y+i,2*w2+2,1,0); box(x-w2,y+i,2*w2,1,(i+16)%8<4?9:7); }
      box(x-6,y-13,12,11,0); box(x-3,y-9,3,2,14); box(x+1,y-9,3,2,14); box(x-8,y-14,16,2,9);
      box(x+17,y-18,3,36,0); box(x+18,y-18,1,36,10); disc(x+18,y-20,5,0); disc(x+18,y-20,4,bl?1:14); }
    else if(sc==='cozy'){ // Teekanne mit Henkel, Tuelle, Dampf und Blush
      box(x-25,y-9,12,18,0); box(x-23,y-7,10,14,1); box(x-20,y-4,7,8,15);
      box(x+12,y-9,10,4,0); box(x+19,y-17,5,12,0); box(x+13,y-8,7,2,1); box(x+20,y-16,3,10,1);
      disc(x,y+2,16,0); disc(x,y+2,15,1); box(x-13,y-1,27,3,ph2?2:13);
      box(x-7,y-19,15,4,0); box(x-6,y-18,13,3,2); box(x-3,y-24,7,5,0); box(x-2,y-23,5,3,4);
      box(x-8,y-8,5,5,0); box(x+4,y-8,5,5,0); box(x-7,y-7,3,3,ph2?2:15); box(x+5,y-7,3,3,ph2?2:15); box(x-6,y-7,1,1,1); box(x+6,y-7,1,1,1);
      box(x-12,y+3,5,2,13); box(x+9,y+3,5,2,13); if(ph2){ box(x-4,y+8,9,2,0); box(x-5,y+9,1,2,0); box(x+5,y+9,1,2,0); } else { box(x-4,y+7,9,2,0); box(x-5,y+6,1,2,0); box(x+5,y+6,1,2,0); }
      for(i=0;i<3;i++) box(x+21+Math.round(Math.sin(tick*0.15+i*1.3)*2),y-22-i*5,2,2,1); }
    else if(sc==='golf'){ // Greenkeeper: riesiger Golfball mit Muetze und Schlaeger
      disc(x,y,15,0); disc(x,y,14,1); for(i=0;i<9;i++) box(x-10+(i%3)*8+(((i/3)|0)&1)*3,y-9+((i/3)|0)*8,2,2,11);
      box(x-14,y-17,28,3,0); box(x-13,y-16,26,2,5); box(x-9,y-23,18,7,0); box(x-8,y-22,16,6,5);
      box(x-8,y-7,5,5,0); box(x+4,y-7,5,5,0); box(x-7,y-6,3,3,ph2?2:15); box(x+5,y-6,3,3,ph2?2:15);
      if(ph2){ box(x-5,y+6,11,2,0); box(x-6,y+5,1,2,0); box(x+6,y+5,1,2,0); } else { box(x-5,y+5,11,2,0); box(x-6,y+6,1,2,0); box(x+6,y+6,1,2,0); }
      box(x+17,y-6,2,24,0); box(x+18,y-6,1,24,10); box(x+14,y+17,9,3,0); box(x+15,y+17,7,2,11); }
    else { // Skelettlord
      box(x-10,y-22,20,5,0); box(x-9,y-21,18,4,4); for(i=0;i<4;i++) box(x-9+i*6,y-25,3,5,4);
      disc(x,y-8,10,0); disc(x,y-8,9,1); box(x-6,y-11,5,5,0); box(x+1,y-11,5,5,0); box(x-5,y-10,3,3,ph2?2:15); box(x+2,y-10,3,3,ph2?2:15); box(x-1,y-5,2,3,0); box(x-5,y-1,10,3,0); for(i=0;i<4;i++) box(x-4+i*3,y-1,1,3,1);
      box(x-13,y+3,26,16,0); for(i=0;i<4;i++){ box(x-11,y+5+i*4,22,2,1); } box(x-1,y+3,2,16,0);
      box(x+16,y-14,4,32,0); box(x+17,y-14,2,32,11); box(x+13,y+8,10,4,4); }
    if(boss.fl>0&&bl){ g.fillStyle='rgba(255,255,255,0.55)'; g.fillRect(x-boss.w/2,y-boss.h/2,boss.w,boss.h); }
    // Lebensbalken
    box(cx-52,12,104,6,0); box(cx-51,13,Math.floor(102*boss.hp/boss.hp0),4,boss.hp/boss.hp0>0.5?5:(boss.hp/boss.hp0>0.25?4:2)); txt('BOSS',cx-80,13,2); }
  function drawPuIcon(k,x,y,bl){ var i;
    if(k==='E'){ box(x-4,y-1,9,3,8); box(x-5,y-3,1,7,1); box(x+5,y-3,1,7,1); }
    else if(k==='S'){ disc(x,y,3,9); box(x,y-3,1,3,1); box(x,y,3,1,1); }
    else if(k==='M'){ box(x-1,y-4,3,9,5); box(x-4,y-1,9,3,5); disc(x,y,2,1); }
    else if(k==='X'){ disc(x,y,3,4); txt('2',x-1,y-2,0); }
    else if(k==='B'){ box(x-4,y+2,9,2,3); disc(x,y-1,2,1); box(x,y-4,1,2,4); }
    else if(k==='P'){ for(var hy=0;hy<6;hy++) for(var hx=0;hx<7;hx++) if(HEART[hy][hx]==='1') box(x-3+hx,y-3+hy,1,1,2); }
    else if(k==='D'){ disc(x-3,y+2,1,14); disc(x+3,y+2,1,14); disc(x,y-2,1,14); box(x,y,1,1,1); }
    else if(k==='T'){ for(i=0;i<9;i++) box(x-4+i,y+Math.round(Math.sin(i*0.9+tick*0.2)*2),1,2,14); }
    else if(k==='Y'){ box(x-1,y-2,3,6,2); box(x,y-4,1,2,12); if(bl) box(x,y-5,1,1,4); box(x-1,y-1,3,1,1); }
    else if(k==='G'){ box(x-4,y+1,9,3,4); box(x-3,y-2,7,3,3); if(bl) box(x+3,y-3,1,1,1); }
    else if(k==='N'){ box(x-4,y-3,9,1,9); box(x-4,y,9,1,8); box(x-4,y+3,9,1,9); }
    else if(k==='F'){ disc(x,y-1,3,14); box(x-3,y,1,3,1); box(x+3,y,1,3,1); disc(x,y+3,1,1); }
    else if(k==='K'){ disc(x,y,1,1); box(x-4,y,2,1,13); box(x+3,y,2,1,13); box(x,y-4,1,2,13); box(x,y+3,1,2,13); }
    else if(k==='W'){ box(x,y,2,2,1); box(x-4,y,1,1,14); box(x+5,y,1,1,14); box(x,y-4,1,1,14); box(x,y+5,1,1,14); }
    else txt(k,x-1,y-2,1); }
  // Status-Effekt: Icon in 13x13-Quadrat mit abgerundeten Ecken, Rahmen laedt im Uhrzeigersinn von oben-Mitte
  // zweilagiger (breiter) Ring: aussen 15x15, innen 11x11, beide mit abgerundeten Ecken; startet oben Mitte, im Uhrzeigersinn
  function ringPath(S,off){ var p=[],i; for(i=1;i<S-1;i++) p.push([i+off,off]); for(i=1;i<S-1;i++) p.push([S-1+off,i+off]); for(i=S-2;i>0;i--) p.push([i+off,S-1+off]); for(i=S-2;i>0;i--) p.push([off,i+off]); var m=(S-3)>>1; return p.slice(m).concat(p.slice(0,m)); }
  var RING_O=ringPath(15,0), RING_I=ringPath(11,2);
  function drawPuRing(k,bx,by,f){ var u=PU[k], low=f<0.25&&((tick>>3)&1), col=low?1:u.c, fr=Math.min(1,f);
    drawPuIcon(k,bx+7,by+7,(tick>>3)&1);   // kein Hintergrund: Icon liegt direkt auf dem Spielfeld
    [RING_O,RING_I].forEach(function(R){ var n=Math.max(1,Math.ceil(fr*R.length)), r;
      g.globalAlpha=0.35; for(r=n;r<R.length;r++) box(bx+R[r][0],by+R[r][1],1,1,0); g.globalAlpha=1;   // leere Spur nur leicht abgedunkelt
      for(r=0;r<n;r++) box(bx+R[r][0],by+R[r][1],1,1,col); }); }
  function drawCap(c){ var u=PU[c.k], x=c.x|0, y=c.y|0, bl=(tick>>3)&1;
    box(x-7,y-6,15,13,0); box(x-6,y-5,13,11,bl?1:u.c); box(x-5,y-4,11,9,15);
    drawPuIcon(c.k,x,y,bl); }
  // Cursor = kleiner Ball: Schweif folgt der Bewegung, Funken beim Klick, Ring pulsiert; aktive Power-Ups faerben den Ball und lassen Punkte um ihn kreisen
  // Leichte Hintergrund-Animation: der Hintergrund bleibt vorgerendert, hier kommen nur wenige guenstige Pixel-Effekte darueber
  function hsh(n){ var v=Math.sin(n*127.1)*43758.5453; return v-Math.floor(v); }
  function bgAnim(){ var t=tick, i, x, y, a, hz=(H*0.5)|0;
    function dot(x,y,c,al,sz){ g.globalAlpha=al; g.fillStyle=c; g.fillRect(x|0,y|0,sz||1,sz||1); }
    function cloud(i,sp,y0,al){ var cw=14+hsh(i+9)*14, cx2=((hsh(i)*(W+60)+t*sp)%(W+60))-30; g.globalAlpha=al; g.fillStyle='#fff'; g.fillRect(cx2|0,y0|0,cw|0,2); g.fillRect((cx2+3)|0,(y0-2)|0,(cw*0.6)|0,2); g.fillRect((cx2+2)|0,(y0+2)|0,(cw-4)|0,1); }
    if(scene==='vapor'){
      for(i=0;i<12;i++){ a=0.5+0.5*Math.sin(t*0.07+i*2.1); if(a<0.55) continue; x=(hsh(i)*W)|0; y=(hsh(i+40)*hz*0.9)|0; var cl=i%2?'#fffb96':'#ff71ce'; dot(x,y,cl,a); dot(x-1,y,cl,a*0.5); dot(x+1,y,cl,a*0.5); dot(x,y-1,cl,a*0.5); dot(x,y+1,cl,a*0.5); }
      var mx1=((W*0.3)|0)-22+15, my1=hz+10-49+10; // (Scanline ueber dem Mac-Bildschirm entfernt)
      if((t%150)<8) dot(mx1+5,my1+3,'#c0c4e0',1,3), dot(mx1+13,my1+3,'#c0c4e0',1,3); } // Mac blinzelt
    else if(scene==='western'||scene==='flight'||scene==='city'){
      var sp=scene==='flight'?0.35:0.1; for(i=0;i<4;i++) cloud(i,sp*(0.6+i*0.3),10+i*13,scene==='city'?0.18:0.32);
      if(scene==='city'){ x=(t*0.5)%(W+40)-20; dot(x,16,'#fff',1); dot(x-6,16,(t>>3)&1?'#f33':'#600',1); } }
    else if(scene==='dream'){
      for(i=0;i<9;i++){ y=H-((t*(0.12+hsh(i+3)*0.18)+hsh(i)*H)%H); x=hsh(i+20)*W+Math.sin(t*0.03+i)*4; dot(x,y,i%2?'#ffd1f0':'#fff',0.55,2); } }
    else if(scene==='forest'){
      for(i=0;i<9;i++){ a=Math.max(0,Math.sin(t*0.05+i*1.9)); x=hsh(i)*W+Math.sin(t*0.02+i*3)*10; y=H*0.35+hsh(i+7)*H*0.55+Math.cos(t*0.025+i)*6; dot(x,y,'#d8ff6a',a); dot(x-1,y,'#d8ff6a',a*0.3); dot(x+1,y,'#d8ff6a',a*0.3); } }
    else if(scene==='moon'){
      for(i=0;i<14;i++){ a=0.15+0.85*Math.max(0,Math.sin(t*0.05+i*1.7)); dot(hsh(i)*W,hsh(i+30)*H*0.4,'#fff',a); }
      for(i=0;i<3;i++){ x=((t*0.15*(i+1)+i*90)%(W+80))-80; g.globalAlpha=0.1; g.fillStyle='#cfe'; g.fillRect(x|0,(H-46+i*12)|0,80,3); } }
    else if(scene==='dungeon'){
      for(i=0;i<2;i++){ x=i?W*0.82:W*0.18; a=0.07+0.05*Math.sin(t*0.3+i*2)+0.03*Math.sin(t*0.71+i); g.globalAlpha=a; g.fillStyle='#ff8c28'; g.beginPath(); g.arc(x,H*0.4,34,0,6.2832); g.fill(); dot(x-1,H*0.4-2,'#ffd060',0.9,3); }
      for(i=0;i<6;i++){ y=H*0.4-((t*0.3+i*11)%40); dot((i<3?W*0.18:W*0.82)+Math.sin(t*0.1+i*2)*4,y,'#ffb040',1-((t*0.3+i*11)%40)/40); } }
    else if(scene==='cozy'){
      var ffx=51, ffy=H-36;   // Kaminfeuer flackert, Funken steigen, Lichterkette blinkt, Dampf ueber den Tassen
      a=0.10+0.05*Math.sin(t*0.3)+0.03*Math.sin(t*0.71); g.globalAlpha=a; g.fillStyle='#ff8c28'; g.beginPath(); g.arc(ffx,H-70,78,0,6.2832); g.fill();
      for(i=0;i<7;i++){ var fh=8+Math.round(Math.sin(t*0.25+i*1.7)*3)+(i>1&&i<5?7:0); x=ffx-17+i*5; g.globalAlpha=0.95; g.fillStyle='#ff5a20'; g.fillRect(x,ffy-fh,5,fh); g.fillStyle='#ffc030'; g.fillRect(x+1,ffy-fh*0.6,3,fh*0.6); }
      for(i=0;i<6;i++){ var fp=(t*0.4+i*13)%50; dot(ffx-12+hsh(i)*24+Math.sin(t*0.1+i)*3,ffy-10-fp,'#ffd060',1-fp/50); }
      for(x=0;x<W;x+=6){ var ln=(x/6)|0; if(((t>>4)+ln)%3===0) dot(x+1,8+Math.sin(x/W*Math.PI*4)*4,'#ffe9a0',0.5,4); }
      for(i=0;i<3;i++){ var sp2=(t*0.2+i*7)%14; dot(104+6+i*19+4+Math.sin(t*0.1+i)*1.5,70-9-sp2,'#fff',0.5*(1-sp2/14),2); } }
    g.globalAlpha=1; }
  var cTrail=[], cSpark=[], cDown=false, cPx=-1, cPy=-1;
  cv.addEventListener('pointerdown',function(){ cDown=true; for(var i=0;i<10;i++){ var a=i*0.628+Math.random()*0.4, v=0.6+Math.random()*1.2; cSpark.push({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:14+(Math.random()*8|0)}); } });
  addEventListener('pointerup',function(){ cDown=false; });
  function drawCursor(){ var x=mx, y=my, i, q, act=-1, k;
    for(k in pw) if(pw[k]>0){ act=PU[k].c; break; }
    var base=act>=0?act:1, glow=act>=0?act:14;
    if(Math.abs(x-cPx)+Math.abs(y-cPy)>0.5){ cTrail.push({x:x,y:y,l:10}); if(cTrail.length>14) cTrail.shift(); }
    cPx=x; cPy=y; if(cDown&&(tick&1)) cSpark.push({x:x,y:y,vx:(Math.random()-0.5)*1.4,vy:(Math.random()-0.5)*1.4,l:10});
    for(i=0;i<cTrail.length;i++){ q=cTrail[i]; if(--q.l<=0){ cTrail.splice(i--,1); continue; } var r=q.l>6?2:1; box((q.x|0)-(r>>1),(q.y|0)-(r>>1),r,r,q.l>6?glow:11); }
    for(i=0;i<cSpark.length;i++){ q=cSpark[i]; q.x+=q.vx; q.y+=q.vy; q.vy+=0.04; if(--q.l<=0){ cSpark.splice(i--,1); continue; } box(q.x|0,q.y|0,1,1,q.l>6?[1,4,glow][i%3]:11); }
    var pr=cDown?5:4+(((tick>>3)&1)?0:0), px=x|0, py=y|0;
    if((tick>>2)%6<3||cDown){ box(px-pr,py,1,1,glow); box(px+pr,py,1,1,glow); box(px,py-pr,1,1,glow); box(px,py+pr,1,1,glow); }   // pulsierender Ring
    if(act>=0){ for(i=0;i<3;i++){ var an=tick*0.18+i*2.094; box((px+Math.cos(an)*6)|0,(py+Math.sin(an)*6)|0,1,1,act); } }
    disc(px,py,3,0); disc(px,py,2,base); box(px-1,py-1,1,1,1);
  }
  function draw(){
    cv.style.cursor=(locked()||mouseIn)?'none':'crosshair';
    g.setTransform(1,0,0,1,0,shake>0?((shake--%2)?1:-1):0);
    // Parallax: Hintergrund folgt minimal der Maus, oben (fern) staerker als unten (nah)
    var td=scene==='city'||scene==='flight'||scene==='dungeon'||scene==='forest'; // Draufsicht-Welten: kein Horizont
    var ptx=locked()?(mx-cx)/cx*(td?14:8):0; pxo+=(ptx-pxo)*0.08;
    function pxAt(y){ if(td) return pxo; var hzp=H*0.5; return y<=hzp?0:pxo*(y-hzp)/(H-hzp); } // Himmel + Horizont fest, nur der Boden parallaxt (unten am staerksten)
    if(Math.abs(pxo)<0.05){ g.drawImage(bgc,0,0); } else { for(var ys=0;ys<H;ys+=3){ var so=Math.round(pxAt(ys+1.5)); g.drawImage(bgc,0,ys,W,3,so,ys,W,3); if(so>0) g.drawImage(bgc,0,ys,1,3,0,ys,so,3); else if(so<0) g.drawImage(bgc,W-1,ys,1,3,W+so,ys,-so,3); } }
    if(scene==='vapor'&&macX!==undefined&&state!=='title'){ g.save(); g.translate(Math.round(pxAt(macY+18)),0); // Retro-Mac flackert: Helligkeit, Bildschirm, kurze Zeilenversaetze
      var sx0=macX+15, sy0=macY+10, sw=21, sh=16, hh=((tick*2654435761)>>>0)%100, h2=(((tick>>2)*40503)>>>0)%100; // nur der Bildschirm flackert, nicht das Gehaeuse
      if(hh<14){ g.globalAlpha=0.12+hh*0.012; g.fillStyle='#000'; g.fillRect(sx0,sy0,sw,sh); g.globalAlpha=1; }
      else if(hh>94){ g.globalAlpha=0.12; g.fillStyle='#fff'; g.fillRect(sx0,sy0,sw,sh); g.globalAlpha=1; }
      if(h2<18){ var gy=sy0+((tick*7)%(sh-1)), dx=((tick&1)?2:-2); g.save(); g.beginPath(); g.rect(sx0,sy0,sw,sh); g.clip(); g.drawImage(bgc,sx0,gy,sw,2,sx0+dx,gy,sw,2); g.restore(); }
    g.restore(); }
    g.save(); g.translate(Math.round(pxAt(H*0.3)),0); bgAnim(); g.restore();
    box(0,0,W,4,12); box(0,0,4,H,12); box(W-4,0,4,H,12);
    box(0,0,W,1,11); box(0,0,1,H,11); box(W-1,0,1,H,11);
    // sand traps
    if(mode==='golf'){ box(cx-20,115,40,6,4); box(cx-16,121,32,3,10); }
    // weiche Schatten unter allen Spielobjekten: loest sie vom Hintergrund
    g.fillStyle='rgba(0,0,0,0.55)';
    bricks.forEach(function(b){ g.fillRect((b.x|0)+2,(b.y|0)+3,b.w,b.h); });
    blocks.forEach(function(o){ g.fillRect(o.x+2,o.y+3,o.w,o.h); });
    bumpers.forEach(function(b){ g.beginPath(); g.arc((b.x|0)+2,(b.y|0)+3,b.r+1,0,6.2832); g.fill(); });
    guides.forEach(function(g2){ if(g2.off) return; for(var si2=0;si2<=12;si2++) g.fillRect((g2.x1+(g2.x2-g2.x1)*si2/12)+1,(g2.y1+(g2.y2-g2.y1)*si2/12)+3,3,3); });
    bricks.forEach(function(b){ if(b.hp>1){ box(b.x,b.y,b.w,b.h,b.hp>2?4:11); box(b.x+1,b.y+1,b.w-2,b.h-2,b.fl>0?1:b.c); } else { box(b.x,b.y,b.w,b.h,b.fl>0?1:b.c); box(b.x,b.y,b.w,1,1); if(b.h>3) box(b.x,b.y+b.h-1,b.w,1,12); } if(b.fl>0) b.fl--; });
    stickies.forEach(function(o){ var f=o.fl>0, x=o.x|0, y=o.y|0, c=f?1:o.c; if(f) o.fl--; box(x-1,y-1,o.w+2,o.h+2,0); box(x,y,o.w,o.h,c); box(x,y,o.w,1,1);
      for(var si3=0;si3<3;si3++) box(x+2+si3*5,y+o.h+(((tick>>3)+si3)%3),1,2,c); txt(String(o.n),x+((o.w-3)>>1),y+1,0); });   // Klebe-Block mit Tropfen und Split-Zahl
    blocks.forEach(function(o){ var f=o.fl>0; if(f) o.fl--; box(o.x-1,o.y-1,o.w+2,o.h+2,0); box(o.x,o.y,o.w,o.h,f?1:[0,12,11,8][Math.min(3,o.hp)]); box(o.x,o.y,o.w,1,f?1:(o.hp>1?1:11)); box(o.x+2,o.y+2,1,1,0); box(o.x+o.w-3,o.y+o.h-3,1,1,0);
      for(var k=0;k<o.hp0-o.hp;k++) box(o.x+2+k*3,o.y+1,1,o.h-2,0); });
    // holes with flags
    holes.forEach(function(h,i){ if(h.done) disc(h.x,h.y,h.r+1,12); disc(h.x,h.y,h.r,0); box(h.x,h.y-16,1,14,1); box(h.x+1,h.y-16,6,4,h.done?5:2); });
    bumpers.forEach(function(b){ drawBumper(b);
      if(special(b)){ var rc=(tick>>2)&1?4:3; for(var a=0;a<16;a++) box((b.x|0)+Math.round(Math.cos(a*0.3927)*(b.r+3)),(b.y|0)+Math.round(Math.sin(a*0.3927)*(b.r+3)),1,1,rc); }
      for(var k=0;k<b.hp0-b.hp;k++) for(var i=-b.r+2;i<b.r-1;i+=2) box((b.x|0)+i,(b.y|0)+((i*(k+2))%(b.r-1)),1,1,0); }); // Risse
    drawBoss();
    parts.forEach(function(q){ box(q.x,q.y,2,2,q.c); });
    // Trampoline / Slingshots
    guides.forEach(function(g2){ if(g2.off) return; var fl2=g2.flash>0; if(fl2) g2.flash--;
      for(var i=0;i<=36;i++){ box(g2.x1+(g2.x2-g2.x1)*i/36, g2.y1+(g2.y2-g2.y1)*i/36, 3,3,fl2?1:(g2.pool&&!cheat.pools&&pw.T<180&&((tick>>3)&1)?12:g2.glow>0?4:(g2.hp<g2.hp0?11:g2.c))); } if(g2.glow>0) g2.glow--; });
    if(chV>0){ var gx0=(cx+co-30)|0; box(gx0,H-9,60,4,12); box(gx0+1,H-8,Math.floor(58*chV),2,chV>0.7?2:(chV>0.35?3:4)); }
    if(saver) box(6,H-3,W-12,2,(tick>>2)&1?4:3);
    caps.forEach(drawCap);
    // Trampolin-Balken
    (function(){ var c=cx+co, L=fl[0].len/2, y0=fl[0].py, col=state==='win'?[4,3,1][(tick>>2)%3]:(stunT>0&&((tick>>2)&1))?2:(chV>0.7?2:(chV>0.35?4:3));
      for(var x=-L;x<=L;x++){ var u=x/L, y=y0-bulge*(1-u*u); box(c+x-1,y-1,3,4,col); box(c+x-1,y-1,3,1,chV>0?1:4); }
      box(c-L-3,y0-2,5,10,12); box(c-L-3,y0-2,5,1,11); box(c+L-2,y0-2,5,10,12); box(c+L-2,y0-2,5,1,11); })();
    // tee + aim + power
    if(state==='tee'){
      box(cx-3,176,6,1,10);
      if(teeHeld||K.s){ var pd=(3+power*9)*(1+0.12*powT)*60, pn=Math.min(60,Math.floor(pd/7)); // Vorschau: Strecke nach 1 s (60 Ticks)
      for(var i=1;i<=pn;i++) box(ball.x+Math.sin(aim)*i*7,ball.y-Math.cos(aim)*i*7,2,2,i%2?4:1);
      box(ball.x+Math.sin(aim)*pd-2,ball.y-Math.cos(aim)*pd-2,5,5,2);
      box(8,H-8,50,5,12); box(9,H-7,Math.floor(48*power),3,power>0.7?2:3); }
    }
    if(mode==='breakout'&&state==='play'){ drawCharge(ball); extras.forEach(drawCharge); }
    if(mode==='breakout'&&state==='play'){ box(W-58,H-8,50,5,12); box(W-57,H-7,Math.floor(48*ball.e),3,ball.e>0.5?14:3); }
    if(ghostT>0){ ghostT--; var gx1=cx+co, gy1=fl[0].py-4, gn=8; for(var gi=1;gi<=gn;gi++) if((gi+ghostT)&1) box(gx1+(ghostX-gx1)*gi/gn,gy1+(ghostY-gy1)*gi/gn,2,2,ghostT>5?1:14); }
    extras.forEach(function(e){ drawBallAt(e.x,e.y,14); });
    if(state!=='capt'&&state!=='look'&&!(ball.swal>0)){ drawBallAt(ball.x,ball.y,1); }
    if(state==='win'){ var wx=ball.x|0, wy=ball.y|0, wr=8+((tick>>2)&1), wa;
      for(wa=0;wa<12;wa++) box(wx+Math.round(Math.cos(wa*0.5236+tick*0.12)*wr)-1,wy+Math.round(Math.sin(wa*0.5236+tick*0.12)*wr)-1,2,2,[4,3,1][wa%3]);
      var wt=winBoss?'BOSS BESIEGT!':'STAGE GESCHAFFT!'; box(0,64,W,22,0); box(0,65,W,1,(tick>>2)&1?4:3); box(0,84,W,1,(tick>>2)&1?3:4);
      txtS(wt,((W-wt.length*8)/2)|0,70,(tick>>2)&1?4:1,2);
      if(winT<WINLEN-45&&(tick>>4)&1) txt('LEERTASTE = WEITER',((W-18*4)/2)|0,H-30,1); }
    // HUD
    box(0,0,W,9,7); box(0,9,W,1,0);
    txt(mode==='golf'?'LOCH '+hole:'LEVEL '+level,3,2,1); if(mode==='golf') txt('SCH '+strokes,(cx-10)|0,2,4); else { var nh=Math.max(0,lives), shown=Math.min(nh,5), hx0=((cx-(shown*9-2)/2)|0); for(var hi=0;hi<shown;hi++) for(var hy=0;hy<6;hy++) for(var hxx=0;hxx<7;hxx++) if(HEART[hy][hxx]==='1') box(hx0+hi*9+hxx,2+hy,1,1,2); if(nh>5) txt('+'+(nh-5),hx0+5*9,3,2); } // Leben als Herz-Icons txt(String(score).padStart(5,'0'),W-42,2,1); if(loopG) txt('LOOP',3,9,8);
    var pk=[]; for(var hk in pw) if(pw[hk]>0) pk.push(hk); var hx=Math.round(cx-pk.length*9+1); pk.forEach(function(k2){ drawPuRing(k2,hx,H-19,pw[k2]/PU[k2].d); hx+=18; }); // Status-Effekte unten in der Mitte
    var gx=W-46-String(gold).length*4-8; disc(gx,5,3,4); box(gx-1,4,2,2,3); txt(String(gold),gx+6,2,4); // Goldstueck statt G
    if(state==='play'&&heldAny()){ var hb=mainBall.held?mainBall:extras.filter(function(b){ return b.held; })[0], pw2=Math.max(0.15,chV), pd2=(3+pw2*9)*(1+0.12*powT)*60, pn2=Math.min(30,Math.floor(pd2/9)); for(var ii=1;ii<=pn2;ii++) box(hb.x+Math.sin(aim)*ii*9,hb.y-Math.cos(aim)*ii*9,2,2,ii%2?4:1); box(hb.x+Math.sin(aim)*pn2*9-2,hb.y-Math.cos(aim)*pn2*9-2,5,5,2); }
    if(locked()&&state!=='play'&&state!=='capt'){ drawCursor(); }
    if(state==='shop') drawShop(); else if(state==='title') drawTitle(); else if(state==='map') drawMap(); else if(state==='look') drawLook(); else if(state==='over') drawOver();
    if(ambient&&ambFull&&ambT<420) txt('AMBIENCE - ESC = ZURUECK',W-102,13,(tick>>4)&1?1:11);
    if(ambient&&!ambFull) txt(cheat.autoscore?'AUTOPILOT - PUNKTE ZAEHLEN - TAB = AUS':'AUTOPILOT - OHNE PUNKTE - TAB = AUS',W-(cheat.autoscore?150:142),13,(tick>>4)&1?4:11);
    if(msgT>0&&state!=='shop'&&state!=='title'&&state!=='map'){ msgT--; box((cx-60)|0,104,120,12,0); txt(msg,(cx-56)|0,107,(tick>>2)&1?4:3); }
  }
  // 3x5 pixel font
  var F={'0':'111101101101111','1':'010110010010111','2':'111001111100111','3':'111001111001111','4':'101101111001001','5':'111100111001111','6':'111100111101111','7':'111001001001001','8':'111101111101111','9':'111101111001111',
  'A':'111101111101101','B':'110101110101110','C':'111100100100111','D':'110101101101110','E':'111100110100111','F':'111100110100100','G':'111100101101111','H':'101101111101101','I':'111010010010111','J':'001001001101111','K':'101101110101101','L':'100100100100111','M':'101111111101101','N':'110101101101101','O':'111101101101111','P':'111101111100100','Q':'111101101111001','R':'110101110101101','S':'111100111001111','T':'111010010010010','U':'101101101101111','V':'101101101101010','W':'101101111111101','X':'101101010101101','Y':'101101010010010','Z':'111001010100111','+':'000010111010000','!':'010010010000010',':':'000010000010000','·':'000000010000000','.':'000000000000010',' ':'000000000000000','-':'000000111000000'};
  function txt(s,x,y,c){ s=String(s).toUpperCase(); g.fillStyle=C[c];
    for(var i=0;i<s.length;i++){ var gl=F[s[i]]||F[' ']; for(var p=0;p<15;p++) if(gl[p]==='1') g.fillRect(x+i*4+(p%3),y+((p/3)|0),1,1); } }
  function fit(){ /* Format ist fest 4:3, die Groesse regelt das CSS */ }
  addEventListener('resize',fit); fit();
  addEventListener('pagehide',saveGame); document.addEventListener('visibilitychange',function(){ if(document.hidden) saveGame(); });
  var last=0, acc=0;
  function loop(t){ acc+=Math.min(50,t-last); last=t; while(acc>=16.7){ step(); acc-=16.7; } draw(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
}
  function mount(el, opts){ opts=opts||{}; var mode=opts.mode||el.getAttribute('data-mode')||'breakout', label=opts.label||el.getAttribute('data-label')||'Flipp-Out';
    el.innerHTML=TPL.replace('{{ mode }}',esc(mode)).replace('{{ label }}',esc(label)); var game=el.firstElementChild; start(game); return game; }
  function auto(){ document.querySelectorAll('[data-flippout]:not([data-mounted])').forEach(function(el){ el.setAttribute('data-mounted','1'); mount(el); }); }
  window.Flippout={mount:mount,auto:auto};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',auto); else auto();
})();
