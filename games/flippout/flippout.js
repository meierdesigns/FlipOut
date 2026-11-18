/* Flipp-Out - standalone game module (no dependencies, no build).
 * Embed:  <div data-flippout data-mode="breakout|golf" data-label="Title"></div>
 *         <link rel="stylesheet" href="flippout.css"><script src="flippout.js"></script>
 * Or via code: Flippout.mount(element, {mode:'breakout', label:'Flipp-Out'})
 * Language: English by default; the header button switches to German (saved in localStorage.golfLang). */
(function(){
  // ---- i18n: source strings are English; DE maps English -> German (only used when LANG==='de') ----
  var LANG='en'; try{ LANG=localStorage.golfLang==='de'?'de':'en'; }catch(e){}
  var DE={"PORTAL OPENING":"PORTAL OEFFNET SICH","   Q E SWITCHES TABS - ARROWS LEFT RIGHT FLIP PAGES - STYLES AND GRAPHICS ARE SAVED - KEY B OPENS THE SHOP AT THE TEE   ":"   Q E WECHSELT DIE REITER - PFEILE LINKS RECHTS BLAETTERN - STYLES UND GRAFIK BLEIBEN GESPEICHERT - TASTE B OEFFNET DEN SHOP AUF DEM ABSCHLAG   ","  SHAPE: ":"  FORM: "," BOUGHT":" GEKAUFT"," GOLD - YOU HAVE ":" GOLD - DU HAST "," OBSTACLES":" HINDERNISSE"," OF ":" VON "," OF 3":" VON 3"," SELECT":" WAEHLEN"," TIER ":" STUFE "," TIER 1":" STUFE 1","+1 LIFE":"+1 LEBEN","+10 PIXELS":"+10 PIXEL","+10 SECONDS":"+10 SEKUNDEN","+100 PERCENT":"+100 PROZENT","+15 SECONDS":"+15 SEKUNDEN","+20 PIXELS":"+20 PIXEL","+25 PERCENT":"+25 PROZENT","+30 PIXELS":"+30 PIXEL","+5 SECONDS":"+5 SEKUNDEN","+50 PERCENT":"+50 PROZENT","+500 POINTS":"+500 PUNKTE","1 LIFE":"1 LEBEN","8 BRIGHT COLORS":"8 HELLE FARBEN","ACTIVE":"AKTIV","ADVENTURE FOREST":"ABENTEUERWALD","AMBER MONITOR":"BERNSTEIN MONITOR","AMBIENCE - ESC = BACK":"AMBIENCE - ESC = ZURUECK","AMBIENCE MODE":"AMBIENCE MODUS","ANY NUMBER OF TIMES":"BELIEBIG OFT","ARKANOID MEETS PINBALL":"ARKANOID TRIFFT FLIPPER","ARROWS = PICK LEVEL":"PFEILE = LEVEL WAEHLEN","ARROWS AND ENTER - OR MOUSE":"PFEILE UND ENTER - ODER MAUS","AUTO POINTS":"AUTO PUNKTE","AUTOPILOT - NO SCORE - TAB = OFF":"AUTOPILOT - OHNE PUNKTE - TAB = AUS","AUTOPILOT - SCORING - TAB = OFF":"AUTOPILOT - PUNKTE ZAEHLEN - TAB = AUS","AUTOPILOT COUNTS POINTS":"AUTOPILOT ZAEHLT PUNKTE","AUTOPILOT OFF":"AUTOPILOT AUS","AUTOPILOT ON - TAB = OFF":"AUTOPILOT AN - TAB = AUS","AUTOPILOT: NEW LEVEL":"AUTOPILOT: LEVEL NEU","BACK":"ZURUECK","BACK TO GAME - NEXT LEVEL":"ZURUECK INS SPIEL - NAECHSTES LEVEL","BALL ALWAYS CHARGED":"BALL IMMER GELADEN","BALL CHARGE":"BALL LADUNG","BALL IN SLOW-MO":"BALL IN SLOW MOTION","BALL IS 20 PERCENT FASTER":"BALL IST 20 PROZENT SCHNELLER","BALL IS HUGE":"BALL IST RIESIG","BALL LOST":"BALL VERLOREN","BALL NEVER FALLS":"BALL FAELLT NIE","BALL SAVED":"BALL GERETTET","BALL SAVER":"BALL RETTER","BALL STAGGERS AROUND DRUNK":"BALL TORKELT BESOFFEN HERUM","BANDIT KING":"BANDITENKOENIG","BAR LENGTH":"BALKEN LAENGE","BLACK AND WHITE":"SCHWARZ WEISS","BLUEPRINT":"BLAUPAUSE","BONUS POINTS":"BONUS PUNKTE","BOSS DEFEATED!":"BOSS BESIEGT!","BOSS DEFEATED! +500":"BOSS BESIEGT! +500","BOSS FIGHT - DEFEAT THE ENEMY ABOVE":"BOSSKAMPF - BESIEGE DEN GEGNER OBEN","BOSSES HAVE DOUBLE HP":"BOSSE HABEN DOPPELT SO VIEL HP","BOUGHT":"GEKAUFT","BRICK SHAPE: ":"STEINFORM: ","CALC":"RECHNER","CALCULATOR LCD":"TASCHENRECHNER LCD","CANDY CLOUDS":"ZUCKERWOLKEN","CHARGED!":"AUFGELADEN!","CHEAT - ON AND OFF ANYTIME":"CHEAT - JEDERZEIT AN UND AUS","CLICK AGAIN = DELETE SAVE":"NOCHMAL KLICKEN = SPIELSTAND LOESCHEN","CLICK BUBBLE OR ENTER = START":"BLASE ANKLICKEN ODER ENTER = START","CLOUD DRAGON":"WOLKENDRACHE","CLOUDS":"WOLKEN","COLD BLUE":"KALTES BLAU","COLOR PALETTE - SWITCH ANYTIME":"FARBPALETTE - JEDERZEIT WECHSELN","COLOR TRAIL BEHIND BALL":"BUNTE SPUR HINTER DEM BALL","COLORS CHANGE WILDLY":"FARBEN WECHSELN WILD","COMMODORE COLORS":"COMMODORE FARBEN","CONTINUE":"WEITER","CONTINUE - ":"WEITER - ","CONTINUE - SPACE":"WEITER - LEERTASTE","CONTINUE IN ":"WEITER IN ","COOKIE BAKERY":"KEKSBACKSTUBE","CRISP PIXELS":"SCHARFE PIXEL","CRYPT":"GRUFT","CURRENTLY ACTIVE":"GERADE AKTIV","CYAN MAGENTA WHITE":"CYAN MAGENTA WEISS","DIFFICULTY":"SCHWIERIGKEIT","DISCO MODE":"DISCO MODUS","DISPLAY - SWITCH ANYTIME":"DARSTELLUNG - JEDERZEIT WECHSELN","DITHER AND WOBBLE":"DITHER UND WACKELN","DREAM":"TRAUM","DREAM ISLE":"TRAUMINSEL","DREAMLAND":"TRAUMLAND","DRUID":"DRUIDE","DRUNK BALL":"BETRUNKENER BALL","DUNGEON":"KERKER","DYNAMITE":"DYNAMIT","HUGE":"RIESIG","BIG":"GROSS","SMALL":"KLEIN","FINE":"FEIN","NORMAL":"NORMAL","BRICKS: ":"STEINE: ","BOSS FIGHT":"BOSSKAMPF","LOCKED":"GESPERRT","SETTINGS":"EINSTELLUNGEN","MOUSE SPEED ":"MAUSTEMPO ","SCREEN SHAKE ":"BILDSCHUETTELN ","FULLSCREEN ":"VOLLBILD ","LANGUAGE ":"SPRACHE ","ON":"AN","OFF":"AUS","BACK":"ZURUECK","ESC = BACK":"ESC = ZURUECK","PAUSED":"PAUSE","RESUME":"WEITER","MAIN MENU":"HAUPTMENUE","ESC = RESUME":"ESC = WEITER","BALL SIZE":"BALLGROESSE","SMALLER BALL":"KLEINERER BALL","EVEN SMALLER":"NOCH KLEINER","TINIEST BALL":"WINZIGSTER BALL","CHARGED RELEASE KICKS BALL UP":"VOLL GELADEN LOSLASSEN KICKT KUGEL HOCH","EARTHQUAKE":"ERDBEBEN","ELF PATH":"ELFENPFAD","EMBERS AND FIRE":"GLUT UND FEUER","ENDLESS POOLS":"POOLS ENDLOS","ENERGY x":"ENERGIE x","ENTER = BACK TO TIER 1":"ENTER = ZURUECK AUF STUFE 1","ENTER = BUY FOR ":"ENTER = KAUFEN FUER ","ENTER = SELECT":"ENTER = AUSWAEHLEN","ENTER = TIER ":"ENTER = STUFE ","ENTER = TRIP: ":"ENTER = REISE: ","ENTER = TURN OFF":"ENTER = AUSSCHALTEN","ENTER = TURN ON":"ENTER = EINSCHALTEN","EVEN MORE":"NOCH MEHR","EVERY DRAIN SAVED":"JEDER ABFLUSS GERETTET","EXTRA LIFE":"EXTRA LEBEN","FAR NUDGE SPACEBAR":"FERNSTOSS LEERTASTE","FARTHER AND OFTEN":"WEITER UND OFT","FINE BRICKS":"FEINE STEINE","FIREPLACE ROOM":"KAMINZIMMER","FLIGHT":"FLUG","FLIGHT SIM":"FLUGSIM","FLOOR POOLS":"BODEN POOLS","FLOOR POOLS ALWAYS ON":"BODEN-POOLS IMMER AN","FOREST":"WALD","FOREST CLEARING":"WALDLICHTUNG","FOUR GREEN SHADES":"VIER GRUENTOENE","GIANT BALL":"RIESENBALL","GLOWING COLORS":"LEUCHTENDE FARBEN","GLOWING HALO":"LEUCHTENDER SCHEIN","GOLD RUSH":"GOLDRAUSCH","GOLD X3":"GOLD MAL 3","GOLF COURSE":"GOLFPLATZ","GRAPHICS":"GRAFIK","GRAVITY FLIPPED - BALL FALLS UP":"SCHWERKRAFT UMGEDREHT - BALL FAELLT NACH OBEN","GREEN CODE":"GRUENER CODE","GREY 90S CONSOLE":"GRAUE 90ER KONSOLE","HALF GOLD ONLY":"NUR HALBES GOLD","HARDER - POINTS +25 PERCENT":"SCHWERER - PUNKTE +25 PROZENT","HARDER TENSION":"HAERTER SPANNEN","HERO DUNGEON":"HELDENKERKER","HIGH-RISE":"HOCHHAUS","HIT POWER":"SCHLAGKRAFT","HOLE ":"LOCH ","HOLE! +150":"LOCH! +150","HOLED! +":"EINGELOCHT! +","ICE":"EIS","INFINITE LIVES":"ENDLOS LEBEN","KICK AND CHARGE":"KICK UND LADUNG","KNIGHT CASTLE":"RITTERBURG","L = CLUSTER LOOP ON/OFF":"L = CLUSTER LOOP AN/AUS","LAST: STAGE ":"ZULETZT: STAGE ","LASTS LONGER":"HAELT LAENGER","LASTS LONGEST":"HAELT AM LAENGSTEN","LEFT RIGHT UP DOWN: BACKGROUND - ENTER = START":"PFEILE: HINTERGRUND - ENTER = START","LEFT RIGHT UP DOWN: BACKGROUND - ESC = BACK":"PFEILE: HINTERGRUND - ESC ZURUECK","LEVEL JUMP":"LEVEL SPRUNG","LEVEL SKIPPED":"LEVEL UEBERSPRUNGEN","LOCKED":"GESPERRT","LONG FLIPPER":"FLIPPER LANG","LONGER":"LAENGER","LOTS OF CAPSULES":"VIELE KAPSELN","MAP SELECT":"MAP AUSWAHL","MARBLE BUST":"MARMORBUESTE","MAX POWER":"MAXIMALE KRAFT","MAXED OUT":"AUSGEBAUT","MEGA BALL ALWAYS ON":"MEGA BALL IMMER AN","MEGA DURATION":"MEGA DAUER","MINIGOLF MEETS PINBALL":"MINIGOLF TRIFFT FLIPPER","MOON":"MOND","MOON HILL":"MONDHUEGEL","MOON MODE":"MOND MODUS","MOONSTONE":"MONDSTEIN","MORE CAPSULES":"MEHR KAPSELN","NEAR CHARGES MORE":"NAEHE LAEDT MEHR","8 PURE TV COLORS":"8 REINE TV FARBEN","NOT ENOUGH GOLD - ENTER = OFF":"ZU WENIG GOLD - ENTER = AUS","VIEW: FLAT":"ANSICHT: FLACH","VIEW: HORIZON":"ANSICHT: HORIZONT","LOW POLY AND JITTER":"LOW POLY UND WACKELN","TUTORIAL":"TUTORIAL","SKIP":"SKIP","AIM WITH MOUSE - HOLD CLICK, RELEASE":"ZIELE MIT DER MAUS - KLICK HALTEN, LOSLASSEN","MOVE THE BAR - BREAK ALL BRICKS":"BEWEGE DEN BALKEN - ZERSTOERE ALLE STEINE","BUMPERS GIVE GOLD AND CHARGE":"BUMPER GEBEN GOLD UND LADUNG","FAST BAR = HARD HIT - TRAMPOLINES BOUNCE":"SCHNELLER BALKEN = HARTER SCHLAG - TRAMPOLINE","WELCOME, RECRUIT! I AM PROFESSOR PIXEL.":"WILLKOMMEN, REKRUT! ICH BIN PROFESSOR PIXEL.","AIM WITH THE MOUSE. HOLD CLICK, THEN LET GO TO LAUNCH.":"ZIELE MIT DER MAUS. KLICK HALTEN, DANN LOSLASSEN ZUM ABSCHUSS.","TIP: SHOOT THE SKIP BLOCK AT THE TOP RIGHT TO LEAVE EARLY.":"TIPP: SCHIESS AUF DEN SKIP BLOCK OBEN RECHTS, UM FRUEHER ZU GEHEN.","GOOD SHOT! KEEP THE BALL IN PLAY WITH THE BAR.":"GUTER SCHUSS! HALTE DEN BALL MIT DEM BALKEN IM SPIEL.","BREAK ALL THE BRICKS TO CLEAR THE STAGE.":"ZERSTOERE ALLE STEINE, UM DIE STAGE ZU SCHAFFEN.","BUMPERS GIVE GOLD AND CHARGE YOUR BALL.":"BUMPER GEBEN GOLD UND LADEN DEINEN BALL AUF.","A GLOWING BALL IS FAST. HIT BUMPERS TO CHARGE IT!":"EIN LEUCHTENDER BALL IST SCHNELL. TRIFF BUMPER ZUM AUFLADEN!","GOLD BUYS UPGRADES IN THE SHOP LATER.":"MIT GOLD KAUFST DU SPAETER UPGRADES IM SHOP.","TRAMPOLINES BOUNCE THE BALL BACK UP.":"TRAMPOLINE SCHLEUDERN DEN BALL WIEDER NACH OBEN.","MOVE THE BAR FAST WHEN YOU HIT THE BALL FOR A HARDER STRIKE.":"BEWEGE DEN BALKEN SCHNELL BEIM TREFFEN FUER EINEN HAERTEREN SCHLAG.","HOLD CLICK TO CHARGE A SMASH, RELEASE TO STRIKE.":"KLICK HALTEN LAEDT EINEN SMASH, LOSLASSEN SCHLAEGT ZU.","POWER-UP CAPSULES DROP FROM BROKEN BRICKS.":"POWER UP KAPSELN FALLEN AUS ZERBROCHENEN STEINEN.","CATCH THEM WITH THE BAR TO GET POWER-UPS.":"FANGE SIE MIT DEM BALKEN FUER POWER UPS.","YOU ARE READY. GOOD LUCK OUT THERE!":"DU BIST BEREIT. VIEL GLUECK DA DRAUSSEN!","PRESS H FOR HELP":"H DRUECKEN FUER HILFE","NEON GRID":"NEONGITTER","NEW GAME":"NEUES SPIEL","NEW:   ":"NEU:   ","NEXT LEVEL INSTANTLY":"NAECHSTES LEVEL SOFORT","NO GRAVITY":"KEINE SCHWERKRAFT","NO LIFE LOSS":"KEIN LEBENSVERLUST","NOT BOUGHT":"NICHT GEKAUFT","NOT ENOUGH GOLD - ENTER = TIER 1":"ZU WENIG GOLD - ENTER = STUFE 1","NOT ENOUGH GOLD - NEEDS ":"ZU WENIG GOLD - BRAUCHT ","NOW: ":"JETZT: ","OFF":"AUS","OLD PHOTO":"ALTES FOTO","ON":"AN","ONE-TIME ACTION":"EINMALIGE AKTION","ONLY ONE LIFE PER ROUND":"NUR EIN LEBEN PRO RUNDE","ORIGINAL 16 COLORS":"ORIGINAL 16 FARBEN","OUT! +1 STROKE":"AUS! +1 SCHLAG","PAGE ":"SEITE ","PALM BEACH":"PALMENSTRAND","PARACHUTE":"FALLSCHIRM","PERK LUCK":"PERK GLUECK","PERMANENT ENERGY":"DAUERENERGIE","PICK":"WAHL","PINK AND TEAL":"ROSA UND TUERKIS","PIXEL GRID":"PIXELGITTER","POINTS X2":"PUNKTE X2","POOL TIME":"POOL ZEIT","POVERTY":"ARMUT","RAINBOW":"REGENBOGEN","RED ON BLACK":"ROT AUF SCHWARZ","RED RAILS":"ROTE BANDEN","ROBOT TOWER":"ROBOTURM","ROUND ":"RUNDE ","ROUND DONE: ":"RUNDE FERTIG: ","SAVE DELETED":"SPIELSTAND GELOESCHT","SCENE: ":"KULISSE: ","SCORE ":"PUNKTE ","SCREEN SHAKES CONSTANTLY":"BILDSCHIRM WACKELT STAENDIG","SHARP":"SCHARF","SHOP AND STYLES":"SHOP UND STYLES","SHOP RESET":"SHOP ZURUECKGESETZT","SKELETON LORD":"SKELETTLORD","SLOW":"LANGSAM","SLOW MOTION":"ZEITLUPE","SMALL BALL":"KLEINER BALL","SMALLER BRICKS - MORE ROWS":"KLEINERE STEINE - MEHR REIHEN","SMOOTH PIXELS":"GLATTE PIXEL","SOFT":"WEICH","SPACE = CONTINUE":"LEERTASTE = WEITER","SPACE OR CLICK = START":"LEERTASTE ODER KLICK = START","SPACE OR ENTER":"LEERTASTE ODER ENTER","STAGE CLEARED!":"STAGE GESCHAFFT!","STAR GROVE":"STERNENHAIN","START STAGE":"STARTSTAGE","START STAGE ":"STARTSTAGE ","STONE CIRCLE":"STEINKREIS","STR ":"SCH ","STRONGER":"STAERKER","STRONGER BAR":"STAERKERER BALKEN","SUNSET":"SONNENUNTERGANG","SUNSET GRADIENT":"ABENDROT VERLAUF","SWALLOWED!":"VERSCHLUCKT!","TAPE DISTORTION":"BANDVERZERRUNG","TEA":"TEE","TEA ROOM":"TEESTUBE","TEA TABLE":"TEETISCH","TEAPOT":"TEEKANNE","TEE OFF":"ABSCHLAG","TIER ":"STUFE ","TINY BALL":"WINZIG BALL","TOWN":"STADT","TREASURE TEMPLE":"SCHATZTEMPEL","TREASURY":"SCHATZKAMMER","TREE SPIRIT":"BAUMGEIST","TRIP COSTS ":"REISE KOSTET ","TRIPLE GOLD":"DREIFACHES GOLD","TUBE WITH SCANLINES":"BILDROEHRE MIT ZEILEN","VIEW STAGES":"STAGES ANSEHEN","VILLAGE":"DORF","WESTERN VILLAGE":"WESTERN DORF","WHITE ON BLUE":"WEISS AUF BLAU","WILD WEST":"WILDWEST","WORLD MAP":"WELTKARTE","Fullscreen (Esc exits)":"Vollbild (Esc beendet)","Fullscreen":"Vollbild","Frame off/on (F2)":"Rahmen aus/ein (F2)","Hide frame":"Rahmen ausblenden","Show frame (F2)":"Rahmen einblenden (F2)","HIT":"SCHLAG","Language / Sprache":"Language / Sprache","B = Shop \u00b7 Tab = Autopilot on/off \u00b7 Click captures the mouse (Esc = release) \u00b7 Mouse = aim (tee), in play = move bar \u00b7 Hold left/right click = charge hit, release = strike \u00b7 Hold left click/Space = charge power, release = tee shot \u00b7 \u25c0 \u25b6 or A/D as alternative \u00b7 Golden (glowing) bumpers give gold when hit \u00b7 after each level buy red rails (key 1) and more ball charge (key 2) in the shop \u2013 or by click \u00b7 Bumpers, planes, houses & small trampolines break after several hits and give bonus points \u00b7 SPACE: hold = charge power/bar, release = strike \u00b7 Shift+Space in play = nudge upward (Ghost Shot)":"B = Shop \u00b7 Tab = Autopilot/Ambience an/aus \u00b7 Klick f\u00e4ngt die Maus (Esc = loslassen) \u00b7 Maus = zielen (Abschlag), im Spiel = Balken verschieben \u00b7 Linksklick/Rechtsklick halten = Schlag laden, loslassen = schlagen \u00b7 Linksklick/Leertaste halten = Kraft aufladen, loslassen = Abschlag \u00b7 \u25c0 \u25b6 oder A/D alternativ \u00b7 Goldene (leuchtende) Bumper geben bei Treffern Gold \u00b7 nach jedem Level kaufst du im Shop die roten Banden (Taste 1) und mehr Ball-Ladung (Taste 2) \u2013 oder per Klick \u00b7 Bumper, Flugzeuge, H\u00e4user & kleine Trampoline gehen nach mehreren Treffern kaputt und geben Bonuspunkte \u00b7 LEERTASTE: halten = Kraft/Balken laden, loslassen = Schlag \u00b7 Shift+Leertaste im Spiel = Stups nach oben (Ghost Shot)"};
  function L(s){ return LANG==='de'&&DE[s]!=null?DE[s]:s; }
  function tpl(){ return "<section class=\"golf-game amiga\" data-golf-game data-mode=\"{{ mode }}\">\n  <div class=\"amiga-bar\"><span class=\"tl\"><b></b><b></b><b class=\"tl-g\" data-bare title=\""+L("Fullscreen")+"\" role=\"button\" aria-label=\""+L("Fullscreen")+"\"></b></span><span class=\"amiga-title\">{{ label }}</span><button type=\"button\" class=\"amiga-lang\" data-lang title=\"Language / Sprache\" aria-label=\"Language\">"+(LANG==='de'?'EN':'DE')+"</button><button type=\"button\" class=\"amiga-bare\" data-bare title=\""+L("Fullscreen")+"\" aria-label=\""+L("Fullscreen")+"\">\u26f6</button><span class=\"amiga-info\" tabindex=\"0\">\u24d8<span class=\"amiga-tip\">"+L("B = Shop \u00b7 Tab = Autopilot on/off \u00b7 Click captures the mouse (Esc = release) \u00b7 Mouse = aim (tee), in play = move bar \u00b7 Hold left/right click = charge hit, release = strike \u00b7 Hold left click/Space = charge power, release = tee shot \u00b7 \u25c0 \u25b6 or A/D as alternative \u00b7 Golden (glowing) bumpers give gold when hit \u00b7 after each level buy red rails (key 1) and more ball charge (key 2) in the shop \u2013 or by click \u00b7 Bumpers, planes, houses & small trampolines break after several hits and give bonus points \u00b7 SPACE: hold = charge power/bar, release = strike \u00b7 Shift+Space in play = nudge upward (Ghost Shot)")+"</span></span></div>\n  <button type=\"button\" class=\"amiga-fab\" data-bare title=\""+L("Show frame (F2)")+"\" aria-label=\""+L("Show frame (F2)")+"\">\u26f6</button>\n  <div class=\"amiga-view\"><div class=\"amiga-hot\"></div><canvas class=\"amiga-screen\" data-golf-canvas width=\"300\" height=\"225\" tabindex=\"0\"></canvas></div>\n  <div class=\"amiga-pad\">\n    <button type=\"button\" data-k=\"l\">\u25c0 FLIPPER</button>\n    <button type=\"button\" data-k=\"s\">"+L("HIT")+"</button>\n    <button type=\"button\" data-k=\"r\">FLIPPER \u25b6</button>\n  </div>\n</section>"; }
  function esc(v){ return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function start(game) {
  var cv = game.querySelector('canvas'), g = cv.getContext('2d');
  var W = 300, H = 225, cx = 150, view = cv.parentNode; // fixed 4:3 format
  cv.width=W; cv.height=H;
  // 16-color Amiga-style palette
  var C0 = ['#000000','#ffffff','#dd0000','#ff8800','#ffdd00','#00aa00','#006600','#0055aa','#00aaff','#aa00ff','#aa6622','#888888','#444444','#ff99aa','#00ffdd','#222200'];
  var C = C0.slice();
  // ---- styles (color palettes) and graphics qualities: bought in the shop, then freely switchable, saved ----
  var STYLES=[{id:'amiga',n:'AMIGA',c:0,d:L('ORIGINAL 16 COLORS')},{id:'gb',n:'GAMEBOY',c:150,d:L('FOUR GREEN SHADES')},{id:'c64',n:'C64',c:200,d:L('COMMODORE COLORS')},{id:'neon',n:'NEON',c:250,d:L('GLOWING COLORS')},{id:'sepia',n:'SEPIA',c:120,d:L('OLD PHOTO')},
    {id:'psx',n:'PSX',c:180,d:L('GREY 90S CONSOLE')},{id:'calc',n:L('CALC'),c:140,d:L('CALCULATOR LCD')},{id:'vapor',n:'VAPORWAVE',c:220,d:L('PINK AND TEAL')},{id:'vb',n:'VBOY',c:160,d:L('RED ON BLACK')},
    {id:'cga',n:'CGA',c:120,d:L('CYAN MAGENTA WHITE')},{id:'zx',n:'SPECTRUM',c:140,d:L('8 BRIGHT COLORS')},{id:'amber',n:'AMBER',c:100,d:L('AMBER MONITOR')},{id:'matrix',n:'MATRIX',c:130,d:L('GREEN CODE')},
    {id:'blue',n:L('BLUEPRINT'),c:110,d:L('WHITE ON BLUE')},{id:'noir',n:'NOIR',c:90,d:L('BLACK AND WHITE')},{id:'sunset',n:'SUNSET',c:150,d:L('SUNSET GRADIENT')},{id:'ice',n:L('ICE'),c:110,d:L('COLD BLUE')},{id:'lava',n:'LAVA',c:130,d:L('EMBERS AND FIRE')},{id:'ttx',n:'TELETEXT',c:170,d:L('8 PURE TV COLORS')}];
  var QUAL=[{id:'sharp',n:L('SHARP'),c:0,d:L('CRISP PIXELS')},{id:'soft',n:L('SOFT'),c:80,d:L('SMOOTH PIXELS')},{id:'crt',n:'CRT',c:180,d:L('TUBE WITH SCANLINES')},{id:'bloom',n:'BLOOM',c:220,d:L('GLOWING HALO')},{id:'psx',n:'PSX',c:200,d:L('LOW POLY AND JITTER')},{id:'lcd',n:'LCD',c:150,d:L('PIXEL GRID')},{id:'vhs',n:'VHS',c:200,d:L('TAPE DISTORTION')}];
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
    else if(id==='ttx'){ var tt=['#000000','#ff0000','#00ff00','#ffff00','#0000ff','#ff00ff','#00ffff','#ffffff']; out=C0.map(function(h){ return nearest(rgbOf(h),tt); }); }
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

  var K = {l:0, r:0, s:0, ml:0, mr:0}, co = 0, vco = 0; // co = offset of the flipper cluster
  function box(x,y,w,h,c){ g.fillStyle=C[c]; g.fillRect(x|0,y|0,w,h); }
  function disc(cx,cy,r,c){ // chunky pixel circle
    g.fillStyle=C[c];
    for (var y=-r;y<=r;y++){ var w=Math.floor(Math.sqrt(r*r-y*y+r*0.5)); g.fillRect((cx-w)|0,(cy+y)|0,w*2+1,1); }
  }
  var ptSets=[], ptTmp=false, ptT=0, ptI=0, bumpers, holes, guides, fl, bricks=[], stickies=[], portals=[], pads=[], mode=game.dataset.mode==='breakout'?'breakout':'golf', lives=3, level=1, hole=1;
  // Fixed level order: scene, difficulty and brick pattern increase (then repeat, harder)
  var LEVELS=[ // 10 worlds (scenes), each 3 normal levels + 1 boss stage; difficulty rises within a world
    {name:L('VILLAGE'),scene:'western',b:3,mv:0.1,rows:2,pat:'full',par:3,sh:[],path:null},
    {name:'SALOON',scene:'western',b:4,mv:0.25,rows:3,pat:'holes',par:3,sh:['bar'],path:'wave'},
    {name:L('WILD WEST'),scene:'western',b:5,mv:0.5,rows:6,pat:'zigzag',par:4,sh:['cross','diamond'],path:'zigzag'},
    {name:L('BANDIT KING'),scene:'western',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('NEON GRID'),scene:'vapor',b:5,mv:0.4,rows:6,pat:'waves+checker',par:4,sh:['ring','T'],path:'wave'},
    {name:L('SUNSET'),scene:'vapor',b:6,mv:0.5,rows:7,pat:'heart',par:4,sh:['cross','arch','diamond'],path:'arch'},
    {name:L('PALM BEACH'),scene:'vapor',b:6,mv:0.55,rows:5,pat:'ring',par:4,sh:['bar','ring'],path:'zigzag'},
    {name:L('MARBLE BUST'),scene:'vapor',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('TOWN'),scene:'city',b:5,mv:0.2,rows:5,pat:'skyline',par:3,sh:['stairs'],path:null},
    {name:L('HIGH-RISE'),scene:'city',b:6,mv:0.4,rows:5,pat:'steps',par:4,sh:['T'],path:'stairs'},
    {name:'METROPOLIS',scene:'city',b:7,mv:0.5,rows:6,pat:'columns+frame',par:4,sh:['L','stairs','ring'],path:'stairs'},
    {name:L('ROBOT TOWER'),scene:'city',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:'AIRPORT',scene:'flight',b:5,mv:0.4,rows:5,pat:'cross',par:3,sh:['bar','bar'],path:'arch'},
    {name:L('CLOUDS'),scene:'flight',b:6,mv:0.6,rows:5,pat:'twin',par:4,sh:['ring'],path:'wave'},
    {name:'JET',scene:'flight',b:8,mv:0.7,rows:7,pat:'xmark',par:5,sh:['arch','T','diamond'],path:'arch'},
    {name:'ZEPPELIN',scene:'flight',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('DREAM ISLE'),scene:'dream',b:6,mv:0.5,rows:5,pat:'twin',par:4,sh:['ring','bar'],path:'wave'},
    {name:L('CANDY CLOUDS'),scene:'dream',b:7,mv:0.6,rows:6,pat:'zigzag+holes',par:4,sh:['cross','ring'],path:'arch'},
    {name:L('STAR GROVE'),scene:'dream',b:7,mv:0.6,rows:6,pat:'xmark',par:4,sh:['ring','diamond'],path:'wave'},
    {name:L('CLOUD DRAGON'),scene:'dream',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('FOREST CLEARING'),scene:'forest',b:6,mv:0.4,rows:6,pat:'ring',par:4,sh:['T','L'],path:'zigzag'},
    {name:L('TREASURE TEMPLE'),scene:'forest',b:8,mv:0.6,rows:7,pat:'columns+frame',par:5,sh:['arch','stairs','diamond'],path:'stairs'},
    {name:L('ELF PATH'),scene:'forest',b:7,mv:0.5,rows:6,pat:'steps',par:4,sh:['L','ring'],path:'arch'},
    {name:L('TREE SPIRIT'),scene:'forest',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('MOON HILL'),scene:'moon',b:4,mv:0.3,rows:4,pat:'waves+holes',par:3,sh:['bar'],path:'wave'},
    {name:L('STONE CIRCLE'),scene:'moon',b:6,mv:0.45,rows:5,pat:'ring+checker',par:4,sh:['ring','cross'],path:'zigzag'},
    {name:L('KNIGHT CASTLE'),scene:'moon',b:7,mv:0.6,rows:6,pat:'cross',par:5,sh:['arch','T'],path:'stairs'},
    {name:L('DRUID'),scene:'moon',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('DUNGEON'),scene:'dungeon',b:5,mv:0.35,rows:5,pat:'holes',par:4,sh:['T'],path:'wave'},
    {name:L('CRYPT'),scene:'dungeon',b:7,mv:0.5,rows:6,pat:'checker+ring',par:4,sh:['L','bar'],path:'zigzag'},
    {name:L('TREASURY'),scene:'dungeon',b:8,mv:0.65,rows:7,pat:'diamond+holes',par:5,sh:['cross','arch','ring'],path:'arch'},
    {name:L('SKELETON LORD'),scene:'dungeon',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('TEA TABLE'),scene:'cozy',b:4,mv:0.2,rows:4,pat:'heart',par:3,sh:['ring'],path:'wave'},
    {name:L('FIREPLACE ROOM'),scene:'cozy',b:5,mv:0.3,rows:5,pat:'arch',par:4,sh:['arch','bar'],path:'arch'},
    {name:L('COOKIE BAKERY'),scene:'cozy',b:6,mv:0.4,rows:6,pat:'twin+checker',par:4,sh:['ring','diamond'],path:'zigzag'},
    {name:L('TEAPOT'),scene:'cozy',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true},
    {name:L('TEE OFF'),scene:'golf',b:4,mv:0.2,rows:4,pat:'full',par:3,sh:['ring'],path:'wave'},
    {name:'FAIRWAY',scene:'golf',b:5,mv:0.35,rows:5,pat:'zigzag',par:4,sh:['bar'],path:'arch'},
    {name:'GREEN',scene:'golf',b:6,mv:0.45,rows:6,pat:'ring+holes',par:4,sh:['ring','diamond'],path:'zigzag'},
    {name:'GREENKEEPER',scene:'golf',b:2,mv:0.3,rows:0,pat:'full',par:5,sh:[],path:null,boss:true}]; // Golf stage cluster: holes with flags act as kickers
  function lvNum(){ return mode==='golf'?hole:level; }
  // ===== Tutorial cluster ("level 0"): 3 short stages, must be played once by new players, or leave via the SKIP block (top right) =====
  var tut=0, skipT=0, SKIPLEN=600, TUT=[ // tutorial = its own stage cluster (scene 'train'), every stage teaches one thing
    {name:L('TUTORIAL')+' 1',scene:'train',b:0,mv:0,rows:2,pat:'full',par:3,sh:[],path:null,boss:false,nb:0,np:0,hint:L('MOVE THE BAR - BREAK ALL BRICKS')},
    {name:L('TUTORIAL')+' 2',scene:'train',b:3,mv:0,rows:3,pat:'stripes',par:3,sh:[],path:null,boss:false,nb:3,np:0,hint:L('BUMPERS GIVE GOLD AND CHARGE - GLOWING BALL = FAST')},
    {name:L('TUTORIAL')+' 3',scene:'train',b:2,mv:0,rows:3,pat:'checker',par:3,sh:['bar'],path:null,boss:false,nb:2,np:2,hint:L('FAST BAR = HARD HIT - TRAMPOLINES BOUNCE')},
    {name:L('TUTORIAL')+' 4',scene:'train',b:3,mv:0,rows:4,pat:'waves',par:3,sh:[],path:null,boss:false,nb:2,np:1,hint:L('CATCH FALLING CAPSULES WITH THE BAR FOR POWER-UPS')}];
  // ===== Professor Pixel: the teacher of the tutorial stages. Speech bubbles appear on a timeline (tee phase / play phase per stage) =====
  var tutTeeT=0, tutPlayT=0, TSAY={
    1:{tee:[{at:0,s:'WELCOME, RECRUIT! I AM PROFESSOR PIXEL.'},{at:260,s:'AIM WITH THE MOUSE. HOLD CLICK, THEN LET GO TO LAUNCH.'},{at:780,s:'TIP: SHOOT THE SKIP BLOCK AT THE TOP RIGHT TO LEAVE EARLY.'}],
       play:[{at:30,s:'GOOD SHOT! KEEP THE BALL IN PLAY WITH THE BAR.'},{at:600,s:'BREAK ALL THE BRICKS TO CLEAR THE STAGE.'}]},
    2:{tee:[{at:0,s:'BUMPERS GIVE GOLD AND CHARGE YOUR BALL.'}],
       play:[{at:30,s:'A GLOWING BALL IS FAST. HIT BUMPERS TO CHARGE IT!'},{at:700,s:'GOLD BUYS UPGRADES IN THE SHOP LATER.'}]},
    3:{tee:[{at:0,s:'TRAMPOLINES BOUNCE THE BALL BACK UP.'}],
       play:[{at:30,s:'MOVE THE BAR FAST WHEN YOU HIT THE BALL FOR A HARDER STRIKE.'},{at:700,s:'HOLD CLICK TO CHARGE A SMASH, RELEASE TO STRIKE.'}]},
    4:{tee:[{at:0,s:'POWER-UP CAPSULES DROP FROM BROKEN BRICKS.'}],
       play:[{at:30,s:'CATCH THEM WITH THE BAR TO GET POWER-UPS.'},{at:700,s:'YOU ARE READY. GOOD LUCK OUT THERE!'}]}};
  var tutHelpT=0, tutHelpI=-1, tutHelpTxt='';
  function tutHelp(){ var S=TSAY[tut]; if(!S) return; var all=S.tee.concat(S.play); if(!all.length) return; // H: the teacher answers; pressing again goes to the next tip
    if(tutHelpT>0) tutHelpI=(tutHelpI+1)%all.length; else tutHelpI=state==='tee'?0:Math.min(all.length-1,S.tee.length);
    tutHelpTxt=L(all[tutHelpI].s); tutHelpT=600; }
  function tutSay(){ return tutHelpT>0?tutHelpTxt:null; }
  function drawTeacher(){ var tx=4, ty=160+Math.round(Math.sin(tick*0.07)*1), talk=!!tutSay(), R=function(a,b,w,h,c){ if(typeof c==='string'){ g.fillStyle=qcol(c); g.fillRect(tx+a,ty+b,w,h); } else box(tx+a,ty+b,w,h,c); };
    var SK='#e8c8ac', SKD='#c29c7c', SU='#16161a', SUL='#30303a', SH='#ececec', GR='#a8a8a8';
    // old butler: bald, grey hair at the sides, thin glasses, black suit
    R(-1,30,7,3,'#0a0a0a'); R(8,30,7,3,'#0a0a0a'); R(0,31,4,1,'#2a2a2e'); R(9,31,4,1,'#2a2a2e'); R(1,23,5,8,'#101013'); R(8,23,5,8,'#101013'); R(6,24,2,5,'#08080a'); // shoes, trousers
    R(-1,8,16,3,SU); R(0,10,14,14,SU); R(0,21,14,3,'#0e0e11'); R(0,8,3,1,SUL); R(11,8,3,1,SUL); R(3,9,1,10,SUL); R(10,9,1,10,SUL); R(4,18,1,2,SUL); R(9,18,1,2,SUL); // jacket with lapels
    R(5,9,4,2,SH); R(6,11,2,2,SH); R(6,10,2,8,'#26262c'); R(5,20,1,1,'#58585e'); R(8,20,1,1,'#58585e'); // shirt collar, tie, buttons
    R(-3,10,3,11,SU); R(-3,10,1,11,SUL); R(-3,20,3,1,SH); R(-3,21,3,3,SK); R(-3,23,3,1,SKD); // left arm, cuff, hand
    if(talk){ R(14,11,5,3,SU); R(14,11,5,1,SUL); R(19,10,3,3,SK); R(21,9,1,1,SK); R(19,12,3,1,SKD); } // talking: arm stretched out, open hand
    else { var kp2=((tick>>4)%5===0)?1:0, kyy=-15+Math.round(Math.sin(tick*0.1)*1)+kp2; R(14,2,3,9,SU); R(14,2,1,9,SUL); R(14,1,3,1,SH); R(14,-2,4,3,SK); R(14,0,4,1,SKD); // idle: arm raised, hand holds up a keyboard key H
      R(11,kyy,12,12,0); R(12,kyy+1,10,9,kp2?11:1); R(12,kyy+10,10,1,11); R(13,kyy+2,8,1,1); txt('H',tx+15,kyy+ty+4,0); R(11,kyy+(kp2?2:0),12,1,0); if((tick>>5)&1) { R(10,kyy-1,14,1,4); R(10,kyy+12,14,1,4); R(10,kyy-1,1,14,4); R(23,kyy-1,1,14,4); } } // key pulses and glows
    R(5,7,4,2,SKD); // neck
    R(4,-3,6,1,SK); R(3,-2,8,1,SK); R(2,-1,10,6,SK); R(3,5,8,1,SK); R(4,6,6,1,SK); R(2,-1,1,4,'#f2dcc6'); R(11,1,1,4,SKD); // bald head, rounded
    R(1,1,2,4,GR); R(11,1,2,4,GR); R(1,0,1,1,GR); R(12,0,1,1,GR); R(1,5,2,1,GR); R(11,5,2,1,GR); // grey hair at the sides
    R(3,1,3,1,GR); R(8,1,3,1,GR); // eyebrows
    R(3,2,3,3,'#c8d4de'); R(8,2,3,3,'#c8d4de'); R(4,3,1,1,'#101820'); R(9,3,1,1,'#101820'); R(4,2,1,1,'#f4fbff'); R(9,2,1,1,'#f4fbff'); R(6,3,2,1,'#c8d4de'); // thin glasses
    R(6,4,2,2,SKD); R(5,6,4,1,'#8a5a4a'); if(talk&&((tick>>2)&1)) R(5,6,4,2,'#5a2a2a'); // nose, mouth moves while talking
    R(4,6,1,1,GR); R(9,6,1,1,GR); R(5,7,4,1,GR); } // little grey beard at the chin
  var bubA=1;
  function drawBubble(str){ var words=str.split(' '), lines=[], cur='', i; for(i=0;i<words.length;i++){ if((cur+' '+words[i]).trim().length>24){ lines.push(cur); cur=words[i]; } else cur=(cur+' '+words[i]).trim(); } if(cur) lines.push(cur);
    var mw=0; lines.forEach(function(l){ mw=Math.max(mw,l.length); }); var w=mw*4+8, h=lines.length*8+4, bx=22, by=160-8-h-3;
    var bhit=false, bm=4; function hr(x,y,rw,rh){ return x+rw>bx-bm&&x<bx+w+bm&&y+rh>by-bm&&y<by+h+bm; } // the bubble turns see-through when something is behind it, so nothing is hidden
    [mainBall].concat(extras).forEach(function(b3){ if(b3&&hr(b3.x-6,b3.y-6,12,12)) bhit=true; }); bumpers.forEach(function(o){ if(hr(o.x-o.rr,o.y-o.rr,o.rr*2,o.rr*2)) bhit=true; }); bricks.forEach(function(o){ if(o.hp>0&&hr(o.x,o.y,o.w,o.h)) bhit=true; }); blocks.forEach(function(o){ if(hr(o.x,o.y,o.w,o.h)) bhit=true; }); caps.forEach(function(o){ if(hr(o.x-6,o.y-6,12,12)) bhit=true; }); portals.forEach(function(o){ if(hr(o.x-o.r,o.y-o.r,o.r*2,o.r*2)) bhit=true; }); pads.forEach(function(o){ if(hr(o.x,o.y,o.w,o.h)) bhit=true; }); if(boss&&hr(boss.x-boss.w/2,boss.y-boss.h/2,boss.w,boss.h)) bhit=true;
    bubA+=((bhit?0.25:1)-bubA)*0.2; g.globalAlpha=bubA;
    box(bx-1,by-1,w+2,h+2,0); box(bx,by,w,h,1); box(10,by+h,9,1,0); box(11,by+h+1,7,1,0); box(12,by+h+2,5,1,0); box(11,by+h,7,1,1); box(12,by+h+1,5,1,1); // bubble + tail towards the teacher
    lines.forEach(function(l,j){ txt(l,bx+4,by+4+j*8,0); }); g.globalAlpha=1; }
  function tutDone(){ try{ return localStorage.golfTutDone==='1'||!!loadSave(); }catch(e){ return true; } } // existing players with a save skip the tutorial
  function startTutorial(n){ tut=n||1; skipT=SKIPLEN; tutTeeT=tutPlayT=0; tutHelpT=0; tutHelpI=-1; tutHelpT=0; tutHelpI=-1; startLv=1; mapPick=false; init(true); state='tee'; msg=L('TUTORIAL')+' '+tut+'/'+TUT.length; msgT=90; }
  function finishTut(){ tut=0; try{ localStorage.golfTutDone='1'; }catch(e){} var sv0=loadSave(); if(sv0&&sv0.lv) applySave(sv0); mapPick=true; mapNote=''; mapSel=0; mapScroll=0; mapFollow=true; mapT=0; mapAnim=false; state='map'; }
  function tutNext(){ tut++; skipT=SKIPLEN; tutTeeT=tutPlayT=0; if(tut>TUT.length){ finishTut(); return; } seedN++; layout(); reset(); msg=L('TUTORIAL')+' '+tut+'/'+TUT.length; msgT=90; }
  function skipRect(){ return {x:W-42,y:10,w:34,h:10}; }
  function LV(){ if(tut) return TUT[tut-1]; var n=lvNum()-1, base=LEVELS[n%LEVELS.length], lap=Math.floor(n/LEVELS.length);
    return {name:base.name,scene:base.scene,b:base.b+lap,mv:Math.min(0.9,base.mv+lap*0.1),rows:base.boss?0:Math.min(7,base.rows+(base.pat==='full'||base.pat==='checker'?lap:0)),pat:base.pat,par:base.par,sh:base.boss?[]:base.sh.concat(lap>0?['bar']:[]),path:base.path,boss:!!base.boss}; }
  var blocks=[], bgSeed=1;
  var BGW=750, bgOff=0, WORLDSEED=(Math.random()*4e9)>>>0, seedN=0, seed=1, scene='western', bgc=document.createElement('canvas');
  var loopG=null, loopPref=false, loopR=null, bestLv=1, gold=0, sling=0, chgT=0, shopR={}, SLC=[100,250,500], CC=[80,200,400];
  function special(b){ return pw.N>0||b.gild&&((tick+b.go)%360)<240; } // golden special state
  function applySling(){ [2,3].forEach(function(i){ var g2=guides[i]; g2.off=sling<1; g2.rest=[1.4,1.4,1.7,2.0][sling]; g2.chg=[0,0.35,0.5,0.7][sling]; }); }
  var shopFrom='level', mapT=0, mapAnim=false, menuSel=0, menuR={}, trashArm=0, shopCol=0, lenT=0, powT=0, poolU=0, goldU=0, luckU=0, ballU=0, sel=0, scrollY=0;
  var fpops=[]; function floatPop(x,y,t){ fpops.push({x:x,y:y,s:String(t),t:0}); if(fpops.length>8) fpops.shift(); } // points: number rises from the ball at the spot of impact
  function addG(n){ gold+=Math.round(n*[1,1.25,1.5,2][goldU]*((pw.G>0||cheat.goldx)?3:1)*(cheat.dpoor?0.5:1)); }
  function ITEMS(){ var m3=[L('MAXED OUT')];
    return [
      {n:L('RED RAILS'),d:[L('KICK AND CHARGE'),L('STRONGER'),L('LONGER')],c:SLC,g:function(){return sling;},u:function(){ sling++; applySling(); place(); }},
      {n:L('BALL CHARGE'),d:[L('LASTS LONGER'),L('NEAR CHARGES MORE'),L('LASTS LONGEST')],c:CC,g:function(){return chgT;},u:function(){ chgT++; }},
      {n:L('BAR LENGTH'),d:[L('+10 PIXELS'),L('+20 PIXELS'),L('+30 PIXELS')],c:[90,200,350],g:function(){return lenT;},u:function(){ lenT++; }},
      {n:L('HIT POWER'),d:[L('STRONGER BAR'),L('HARDER TENSION'),L('MAX POWER')],c:[100,220,400],g:function(){return powT;},u:function(){ powT++; }},
      {n:L('POOL TIME'),d:[L('+5 SECONDS'),L('+10 SECONDS'),L('+15 SECONDS')],c:[70,150,300],g:function(){return poolU;},u:function(){ poolU++; }},
      {n:'GOLD BONUS',d:[L('+25 PERCENT'),L('+50 PERCENT'),L('+100 PERCENT')],c:[120,260,450],g:function(){return goldU;},u:function(){ goldU++; }},
      {n:L('PERK LUCK'),d:[L('MORE CAPSULES'),L('EVEN MORE'),L('LOTS OF CAPSULES')],c:[100,220,400],g:function(){return luckU;},u:function(){ luckU++; }},
      {n:L('BALL SIZE'),d:[L('SMALLER BALL'),L('EVEN SMALLER'),L('TINIEST BALL')],c:[110,230,400],g:function(){return ballU;},u:function(){ ballU++; }},
      {n:mode==='golf'?L('BONUS POINTS'):L('EXTRA LIFE'),d:[mode==='golf'?L('+500 POINTS'):L('+1 LIFE')],c:[120],rep:true,g:function(){return 0;},u:function(){ if(mode==='golf'){ score+=500; } else { lives++; } }}]; }
  var upO=[0,0,0,0,0,0,0,0]; // highest bought tier per upgrade (active tier may be lower)
  function setLvl(i,v){ if(i===0){ sling=v; applySling(); place(); } else if(i===1) chgT=v; else if(i===2) lenT=v; else if(i===3) powT=v; else if(i===4) poolU=v; else if(i===5) goldU=v; else if(i===6) luckU=v; else if(i===7) ballU=v; }
  function moOf(i,it){ return it.rep?0:Math.max(upO[i]||0,it.g()); }
  function toggle(i){ var it=ITEMS()[i]; if(!it) return; if(it.rep){ buy(i); return; } var t=it.g(), mo=moOf(i,it);
    if(t<mo){ setLvl(i,t+1); msg=it.n+L(' TIER ')+(t+1); msgT=60; }                 // already bought: upgrade for free
    else if(mo<3&&gold>=it.c[mo]) buy(i);                                              // enough gold: buy next tier
    else if(t>0){ setLvl(i,0); msg=it.n+' '+L('OFF'); msgT=60; } }                        // otherwise: back to tier 0 (off)
  function buy(i){ var it=ITEMS()[i]; if(!it) return; var t=it.g(); if(!it.rep&&t>=3) return; var cost=it.c[it.rep?0:t]; if(gold<cost) return;
    gold-=cost; it.u(); if(!it.rep) upO[i]=Math.max(upO[i]||0,it.g()); msg=it.n+(it.rep?'':L(' TIER ')+(t+1)); msgT=90; }
  function setStyle(id){ actv.style=id; C=paletteFor(id).slice(); qMemo={}; qPal=null; mapC=null; restyle(); saveCos(); } // redraw map terrain
  function setQual(id){ actv.qual=id; view.className='amiga-view q-'+id; saveCos(); }
  function skipLevel(){ if(mode==='golf') hole++; else level++; seedN++; layout(); reset(); state='shop'; msg=L('LEVEL SKIPPED'); msgT=90; }
  CHEATS=[{id:'ghost',n:'GHOST SHOT',c:400,d:L('CHARGED RELEASE KICKS BALL UP')},{id:'pools',n:L('ENDLESS POOLS'),c:300,d:L('FLOOR POOLS ALWAYS ON')},{id:'lives',n:L('INFINITE LIVES'),c:500,d:L('NO LIFE LOSS')},{id:'energy',n:L('PERMANENT ENERGY'),c:400,d:L('BALL ALWAYS CHARGED')},
    {id:'saver',n:L('BALL SAVER'),c:350,d:L('EVERY DRAIN SAVED')},{id:'mega',n:L('MEGA DURATION'),c:450,d:L('MEGA BALL ALWAYS ON')},{id:'goldx',n:L('GOLD X3'),c:600,d:L('TRIPLE GOLD')},
    {id:'nograv',n:L('NO GRAVITY'),c:500,d:L('BALL NEVER FALLS')},
    {id:'antigrav',n:L('MOON MODE'),c:400,d:L('GRAVITY FLIPPED - BALL FALLS UP')},{id:'bigball',n:L('GIANT BALL'),c:350,d:L('BALL IS HUGE')},
    {id:'drunk',n:L('DRUNK BALL'),c:250,d:L('BALL STAGGERS AROUND DRUNK')},{id:'slowmo',n:L('SLOW MOTION'),c:300,d:L('BALL IN SLOW-MO')},
    {id:'trail',n:L('RAINBOW'),c:200,d:L('COLOR TRAIL BEHIND BALL')},{id:'quake',n:L('EARTHQUAKE'),c:150,d:L('SCREEN SHAKES CONSTANTLY')},{id:'disco',n:L('DISCO MODE'),c:250,d:L('COLORS CHANGE WILDLY')},
    {id:'autoscore',n:L('AUTO POINTS'),c:400,d:L('AUTOPILOT COUNTS POINTS')},
    {id:'ambience',n:L('AMBIENCE MODE'),c:350,d:L('DEMO MODE IN THE TITLE MENU')},
    {id:'skip',n:L('LEVEL JUMP'),c:200,d:L('NEXT LEVEL INSTANTLY'),rep:true}];
  // Difficulties: buy once, then toggle anytime. Each active one gives +25% points
  var DIFFS=[{id:'dlife',n:L('1 LIFE'),c:150,d:L('ONLY ONE LIFE PER ROUND')},{id:'dfast',n:'TURBO BALL',c:200,d:L('BALL IS 20 PERCENT FASTER')},{id:'dboss',n:'BOSS PLUS',c:250,d:L('BOSSES HAVE DOUBLE HP')},
    {id:'dpoor',n:L('POVERTY'),c:200,d:L('HALF GOLD ONLY')},{id:'dfine',n:L('FINE BRICKS'),c:300,d:L('SMALLER BRICKS - MORE ROWS')},
    {id:'dclash',n:'BALL CLASH',c:250,d:L('BALLS COLLIDE - MORE ENERGY')}];
  function diffN(){ var n=0; DIFFS.forEach(function(d){ if(cheat[d.id]) n++; }); return n; }
  function curList(){ return shopTab===0?ITEMS():(shopTab===1?STYLES:(shopTab===2?QUAL:(shopTab===3?CHEATS:DIFFS))); }
  function activate(i){ var g00=gold; activateCore(i); if(gold<g00&&shopFrom==='auto') shopAutoT=-1; }
  function activateCore(i){ if(shopTab===0){ toggle(i); saveGame(); return; }
    if(shopTab>=3){ var ch=curList()[i]; if(!ch) return;
      if(ch.rep){ if(gold>=ch.c){ gold-=ch.c; skipLevel(); saveGame(); } return; }
      if(!own['c_'+ch.id]){ if(gold<ch.c) return; gold-=ch.c; own['c_'+ch.id]=1; cheat[ch.id]=true; msg=ch.n+L(' BOUGHT'); msgT=90; }
      else cheat[ch.id]=!cheat[ch.id];
      saveCos(); saveGame(); return; }
    var it=curList()[i]; if(!it) return; var isSt=shopTab===1;
    if(!own[it.id]){ if(gold<it.c) return; gold-=it.c; own[it.id]=1; msg=it.n+L(' BOUGHT'); msgT=90; }
    if(isSt) setStyle(it.id); else setQual(it.id); saveGame(); }
  var shopPg=0, shopPosF=0, shopWheelT=0, shopDrag=false; // shopPg = top visible row (scrollbar instead of pages)
  // ===== shop tab secrets: tabs stay hidden until a secret obstacle in a configured stage was hit (configured in flippout-secrets.js, editable in the dev mode) =====
  var TABN=['UPS','LOOK','GFX','CHEAT','HARD'], tabsOpen={}, secObjs=[], DEVH=window.FLIPPOUT_DEV||null;
  try{ tabsOpen=JSON.parse(localStorage.golfTabs||'{}')||{}; }catch(e){}
  function secCfg(){ return (DEVH&&DEVH.secrets&&DEVH.secrets())||window.FLIPPOUT_SECRETS||{}; } // {tab:{stage:1..N,obs:'bumper'|'block'|'brick'}}
  function bgFor(sc){ var m=secCfg().bgmap; return (m&&m[sc])||sc; }
  function anyTab(){ return [0,1,2,3,4].some(tabVis); }
  var stageUnlock=1; try{ stageUnlock=Math.max(1,+localStorage['golfUnlock_'+mode]||1); }catch(e){} // highest stage number that can be picked (a stage is unlocked by clearing the one before)
  function unlockedStages(){ return (DEVH&&DEVH.showAll&&DEVH.showAll())?LEVELS.length:Math.min(LEVELS.length,stageUnlock); }
  function unlockStage(n){ n=Math.min(LEVELS.length,n); if(n>stageUnlock){ stageUnlock=n; try{ localStorage['golfUnlock_'+mode]=n; }catch(e){} } }
  function tabVis(t){ return !!tabsOpen[t]||!!(DEVH&&DEVH.showAll&&DEVH.showAll()); } // every shop tab (UPS too) stays hidden until its secret was found; without any tab the shop is closed
  var bgOpen={}; try{ bgOpen=JSON.parse(localStorage.golfBgs||'{}')||{}; }catch(e){}
  function bgVis(sc){ return true; } // (backgrounds can no longer be locked: only shop tabs are secrets)
  function tabsSave(){ try{ localStorage.golfBgs=JSON.stringify(bgOpen); }catch(e){} try{ localStorage.golfTabs=JSON.stringify(tabsOpen); }catch(e){} }
  function placeSecrets(){ secObjs=[]; if(tut||mode!=='breakout') return; var cfg=secCfg(), st=((lvNum()-1)%LEVELS.length)+1;
    for(var t=0;t<5;t++){ var c=cfg[t]; if(!c||+c.stage!==st||tabsOpen[t]) continue; var pools={bumper:bumpers.filter(function(b){ return !b.par; }),block:blocks,brick:bricks,boss:boss?[boss]:[]}, k=c.obs, L1=pools[k]||[]; if(!L1.length){ k='bumper'; L1=pools.bumper; if(!L1.length){ k='block'; L1=pools.block; } if(!L1.length){ k='brick'; L1=pools.brick; } } if(!L1.length) continue;
      secObjs.push({o:(c.idx!==undefined&&pools[c.obs]&&pools[c.obs][c.idx])?pools[c.obs][c.idx]:L1[(rnd()*L1.length)|0],t:t,k:(c.idx!==undefined&&pools[c.obs]&&pools[c.obs][c.idx])?c.obs:k}); }
  }
  function checkSecrets(){ if(state!=='play') return; secObjs.forEach(function(sc){ if(sc.spawned||sc.k==='boss'||(typeof sc.t==='string'?bgOpen[sc.t.slice(3)]:tabsOpen[sc.t])) return; var o=sc.o;
      if(o.hp<=0||o.dead||(sc.k==='brick'&&bricks.indexOf(o)<0)){ var bx2=o.w?o.x+o.w/2:o.x, by2=o.h?o.y+o.h/2:o.y; spawnShopCap(sc,bx2,by2,false); } }); } // a destroyed container drops a shop pickup
  function spawnShopCap(sc,x,y,win){ sc.spawned=true; caps.push({k:'SHOP',x:x,y:y,tab:sc.t,win:!!win}); msg=L('SHOP PICKUP!'); msgT=80; shake=Math.max(shake,5); burst(x,y,8,4); }
  var bossWinPend=false, bossWinT=0, tabNew=-1;
  function resolveBossWin(){ if(!bossWinPend) return; bossWinPend=false; winLevel(); }
  function shopPickup(c){ var t=c&&c.tab; if(t===undefined){ return; } // the pickup unlocks the tab / background; a shop tab also pauses the game and shows the shop with the new tab
    if(typeof t==='string'){ bgOpen[t.slice(3)]=true; tabsSave(); msg=L('BACKGROUND UNLOCKED: ')+(SCN[t.slice(3)]||t.slice(3)); msgT=170; score+=mult()*200; if(c.win) resolveBossWin(); return; }
    tabsOpen[t]=true; tabsSave(); tabNew=t; score+=mult()*200; shopFrom='pickup'; shopAutoT=-1; state='shop'; shopTab=t; sel=0; scrollY=0; shopPg=0; shopPosF=0; msg=L('NEW SHOP TAB: ')+TABN[t]; msgT=200; if(document.exitPointerLock) document.exitPointerLock(); }
  function unlockTab(t){ if(typeof t==='string'){ bgOpen[t.slice(3)]=true; tabsSave(); msg=L('SECRET FOUND! BACKGROUND ')+(SCN[t.slice(3)]||t.slice(3))+L(' UNLOCKED'); msgT=170; shake=Math.max(shake,6); score+=mult()*200; burst(cx+co,150,10,4); return; } tabsOpen[t]=true; tabsSave(); msg=L('SECRET FOUND! ')+TABN[t]+L(' TAB UNLOCKED'); msgT=170; shake=Math.max(shake,6); score+=mult()*200; burst(cx+co,150,10,4); }
  if(DEVH) DEVH.api={levels:function(){ return LEVELS.map(function(l){ return l.name; }); },tabs:TABN,open:function(){ return tabsOpen; },setOpen:function(t,v){ if(v) tabsOpen[t]=true; else delete tabsOpen[t]; tabsSave(); },resetOpen:function(){ tabsOpen={}; tabsSave(); }};
  function setTab(t){ var dir=(t>shopTab&&t-shopTab<=1)||t-shopTab===-4?1:(t<shopTab?-1:1), n=(t+5)%5, kz=0; while(!tabVis(n)&&kz++<5) n=(n+dir+5)%5; t=n; shopTab=(t+5)%5; sel=0; scrollY=0; shopPg=0; shopPosF=0; if(state==='shop') saveGame(); }
  function shopPageTo(rw){ var N=curList().length, R=Math.max(1,Math.ceil(N/4)); shopPg=Math.max(0,Math.min(Math.max(0,R-2),rw)); if(sel<N){ var rs=sel>>2; var R0=Math.round(shopPg); if(rs<R0) sel=Math.min(N-1,R0*4+sel%4); else if(rs>R0+1) sel=Math.min(N-1,(R0+1)*4+sel%4); shopCol=sel%4; } } // scroll: selection stays inside the visible rows
  // ---- cache progress: level, shop state, gold and upgrades survive a reload ----
  function saveGame(){ if(tut||(mapPick&&state==='map')||(state==='shop'&&shopFrom==='pickup')) return; if(state==='title'||state==='look'||(ambient&&ambFull)) return; if(shopFrom==='title'&&!loadSave()) return;
    try{ localStorage['golfSave_'+mode]=JSON.stringify({lv:lvNum(),gold:gold,score:score,lives:lives,best:bestLv,loop:loopG,sling:sling,chgT:chgT,lenT:lenT,powT:powT,poolU:poolU,goldU:goldU,luckU:luckU,ballU:ballU,upO:upO,shop:state==='shop'&&shopFrom!=='title',tab:shopTab,sel:sel}); }catch(e){} }
  function applySave(sv){ level=sv.lv; hole=sv.lv; bestLv=Math.max(sv.best||0,sv.lv); unlockStage(bestLv>LEVELS.length?LEVELS.length:bestLv); /* a running save keeps its stages unlocked */ loopG=sv.loop||null; gold=sv.gold||0; score=sv.score||0; lives=sv.lives||3; sling=sv.sling||0; chgT=sv.chgT||0; lenT=sv.lenT||0; powT=sv.powT||0; poolU=sv.poolU||0; goldU=sv.goldU||0; luckU=sv.luckU||0; ballU=sv.ballU||0; upO=(sv.upO||[]).concat([0,0,0,0,0,0,0,0]).slice(0,8); if(sv.ballU===undefined) upO[7]=0; [sling,chgT,lenT,powT,poolU,goldU,luckU,ballU].forEach(function(v,k){ upO[k]=Math.max(upO[k]||0,v); }); }
  function loadSave(){ try{ return JSON.parse(localStorage['golfSave_'+mode]||'null'); }catch(e){ return null; } }
  function clearSave(){ try{ localStorage.removeItem('golfSave_'+mode); }catch(e){} }
  function closeShop(){ if(state!=='shop') return;
    if(shopFrom==='pickup'){ shopFrom='level'; tabNew=-1; state='play'; if(bossWinPend) resolveBossWin(); return; } // pickup shop: the paused level continues
    if(shopFrom==='auto'){ autoRestart(); return; }
    if(shopFrom==='title') state='title'; else if(transPend){ transPend=false; startTrans(); } else state='tee'; // after the shop the next level continues directly (no map in between)
    saveGame(); }
  function startLevel(){ state='tee'; saveGame(); }
  function startNew(){ init(); state='map'; mapT=0; mapAnim=false; }
  function continueGame(){ var sv=loadSave(); if(!sv||!sv.lv){ startNew(); return; } applySave(sv); seedN++; layout(); reset(); msgT=0;
    if(sv.shop){ state='shop'; shopFrom='level'; shopTab=sv.tab||0; sel=sv.sel||0; } else { state='map'; mapT=0; mapAnim=false; } }
  function trashClick(){ var sv=loadSave(); if(!sv||!sv.lv) return;
    if(trashArm>0){ clearSave(); init(true); state='title'; menuSel=0; trashArm=0; msg=L('SAVE DELETED'); msgT=70; } else trashArm=180; } // 1st click = armed, 2nd click = delete
  var shiftDown=false; window.addEventListener('keydown',function(e){ shiftDown=e.shiftKey; if(e.key==='Shift'||(e.key==='Alt'&&e.shiftKey)){ if(!(e.target&&e.target.matches&&e.target.matches('input,textarea'))) e.preventDefault(); } }, true); // preventDefault: try to suppress the Windows language switch (Alt+Shift)
  window.addEventListener('keyup',function(e){ shiftDown=e.shiftKey; if(e.key==='Shift'||e.key==='Alt'){ if(!(e.target&&e.target.matches&&e.target.matches('input,textarea'))) e.preventDefault(); } }, true); window.addEventListener('blur',function(){ shiftDown=false; });
  try{ if(navigator.keyboard&&navigator.keyboard.lock) cv.addEventListener('pointerdown',function(){ if(document.fullscreenElement) navigator.keyboard.lock(['ShiftLeft','ShiftRight','AltLeft','AltRight']).catch(function(){}); }); }catch(e){} window.addEventListener('blur',function(){ shiftDown=false; });
  function resetShop(){ own={amiga:1,sharp:1}; cheat={}; actv={style:'amiga',qual:'sharp'}; setStyle('amiga'); setQual('sharp'); saveCos(); msg=L('SHOP RESET'); msgT=90; } // restore bought styles, graphics and cheats
  function menuItems(){ var sv=loadSave(), out=[]; if(sv&&sv.lv) out.push({ic:0,t:L('CONTINUE - ')+(mode==='golf'?L('HOLE '):'LEVEL ')+sv.lv,f:continueGame});
    out.push({ic:1,t:L('NEW GAME'),f:function(){ if(shiftDown) resetShop(); mapPick=true; mapNote=''; mapSel=0; mapScroll=0; mapFollow=false; mapPgT=0; mapRestPg=0; mapRestApply=true; tutSel=0; /* the map opens on the tutorial section */ mapT=0; mapAnim=false; state='map'; }}); if(DEVH) out.push({ic:2,t:L('VIEW STAGES'),f:function(){ pickMode=false; lookStage(1); }}); /* the stage viewer / editor is dev mode only */ if(cheat.ambience) out.push({ic:3,t:L('AMBIENCE MODE'),f:startAmbient}); // bought in the CHEAT tab of the shop
    out.push({ic:3,t:L('SHOP AND STYLES'),f:function(){ openShop('title'); }}); return out; }
  var pickMode=false, mapPick=false, mapSel=0, mapRestPg=-1, mapRestApply=false, tutBX=-1, tutSel=0; // mapRestPg: page restored after F5; tutSel: selected bubble on the tutorial map page
  var lastPick=0, mapNote='', backR=null;
  try{ lastPick=Math.max(0,(+localStorage['golfPick_'+mode])||0); }catch(e){}
  try{ loopPref=localStorage['golfLoop_'+mode]==='1'; }catch(e){}
  function toggleLoop(){ loopPref=!loopPref; try{ localStorage['golfLoop_'+mode]=loopPref?'1':'0'; }catch(e){} }
  function startPick(i){ if(i>=unlockedStages()){ mapNote=L('LOCKED - CLEAR THE STAGE BEFORE'); mapNoteT=150; return; } mapPick=false; mapNote=''; lastPick=i; try{ localStorage['golfPick_'+mode]=i; }catch(e){} startLv=i+1; init(); tabsOpen={}; tabsSave(); /* new run: every secret shop tab is locked again */ state='tee';
    loopG=null; if(loopPref){ var gr=mapLayout().groups[mapLayout().gi[i]]; loopG={from:gr.from,to:gr.to}; } saveGame(); } // stage cluster loop: after the boss the same cluster starts over
  var overT=0, overSel=0, overIdx=0, overScore=0, overR={}; // game-over screen
  function overRetry(){ startPick(overIdx); }
  function overMap(){ mapNote=''; gameOver(); }
  function gameOver(){ clearSave(); init(true); mapPick=true; mapSel=Math.min(lastPick,LEVELS.length-1); mapT=0; mapAnim=false; state='map'; } // after game over back to stage selection
  function mapEnter(){ mapFollow=true; mapT=0; }
  function mapSh(y){ var v=Math.round(pxo*(y-82)/(H-82)); if(mapC){ var sc=mapScroll|0; v=Math.max(sc-(mapC.width-W),Math.min(sc,v)); } return v; } // map parallax: the horizon (y<66) stays, the ground shifts in perspective with the mouse
  function tutNodeAt(){ if(!mapTK()||Math.round(mapScroll/W)!==0) return -1; for(var j=0;j<4;j++){ var dx=mx-mapSh(108)+(mapScroll|0)-tnx(j), dy=my-nodeY(j); if(dx*dx+dy*dy<=121) return j; } return -1; }
  function nodeAt(){ for(var i=0;i<LEVELS.length;i++){ var dx=mx-mapSh(108)+(mapScroll|0)-nodeX(i), dy=my-nodeY(i); if(dx*dx+dy*dy<=100) return i; } return -1; }
  function clusterJump(dir,from){ var N=LEVELS.length, i=(from||lookIdx)-1, sc=LEVELS[i].scene;
    if(dir>0){ var j=i; do{ j=(j+1)%N; }while(LEVELS[j].scene===sc&&j!==i); return j+1; }
    var st=i; while(st>0&&LEVELS[st-1].scene===sc) st--; if(st<i) return st+1;
    var pj=(st-1+N)%N, pst=pj; while(pst>0&&LEVELS[pst-1].scene===LEVELS[pj].scene) pst--; return pst+1; }
  var ambShopT=0;
  function ambShopAI(){ // Ambience: the AI buys upgrades itself; if it buys nothing, the countdown runs on the continue button
    ambShopT++; var N=ITEMS().length, ph=ambShopT%40;
    if(ph===1&&!tabVis(0)){ ambPick=-1; sel=N; } /* the UPS tab is still locked: the AI cannot buy */
    else if(ph===1){ var best=-1, order=[0,1,3,2,4,5,6];
      for(var k=0;k<order.length;k++){ var it=ITEMS()[order[k]], t=it.g(); if(!it.rep&&t>=3) continue; if(gold>=it.c[it.rep?0:t]){ best=order[k]; break; } }
      ambPick=best; sel=best>=0?best:N; }
    else if(ph===22&&ambPick>=0){ buy(ambPick); ambPick=-1; shopAutoT=Math.min(shopAutoT,90); }
    if(shopAutoT>0) shopAutoT--; else { shopAutoT=-1; state='tee'; msg='STAGE '+lvNum()+' '+LV().name; msgT=140; } }
  function autoShopTick(){ if(shopAutoT>0){ shopAutoT--; if(shopAutoT<=0){ shopAutoT=-1; autoRestart(); } } }
  var ambPick=-1;
  var apScore=0, apGold=0, apLives=3, shopAutoT=-1, shopAutoMax=1;
  // ================= Boss stages: one boss per scene, flying around at the top =================
  var boss=null, bshots=[], stunT=0;
  var BOSSES={western:{w:44,h:26,ax:88,sp:0.034,hp:12},vapor:{w:36,h:36,ax:80,sp:0.03,hp:14},city:{w:44,h:28,ax:70,sp:0.028,hp:16},flight:{w:58,h:24,ax:96,sp:0.038,hp:16},
    dream:{w:46,h:30,ax:84,sp:0.03,hp:18},forest:{w:46,h:32,ax:76,sp:0.026,hp:20},moon:{w:40,h:34,ax:88,sp:0.034,hp:22},dungeon:{w:44,h:34,ax:80,sp:0.03,hp:24},cozy:{w:48,h:36,ax:82,sp:0.03,hp:20},golf:{w:30,h:30,ax:92,sp:0.036,hp:18}};
  var BATK={western:['aim','fan'],vapor:['beam','aim'],city:['homing','aim'],flight:['bomb','fan'],dream:['wave','aim'],forest:['split','bomb'],moon:['ring','homing'],dungeon:['aim2','beam'],cozy:['wave','homing'],golf:['aim','bomb']};
  var BEAT={vapor:1,dream:1,forest:1}; // these bosses swallow the ball (no damage, they spit it back out charged)
  var BSTUN={aim:70,fan:50,aim2:60,homing:70,bomb:90,wave:60,split:50,ring:40,beam:90};
  function makeBoss(sc){ var d=BOSSES[sc]||BOSSES.western; return {sc:sc,atk:BATK[sc]||['aim'],ai:0,eat:!!BEAT[sc],eatCd:0,mouth:0,x:cx,y:48,w:d.w,h:d.h,hp:d.hp*(cheat.dboss?2:1),hp0:d.hp*(cheat.dboss?2:1),t:(rnd()*6)|0,fl:0,cd:150,ax:Math.min(d.ax,W/2-d.w/2-10),sp:d.sp}; }
  function bossAbility(){ var sc=boss.sc, i, bx=boss.x, by=boss.y+boss.h/2;
    if(sc==='western'){ boss.dashT=70; msg=L('QUICKDRAW!'); }
    else if(sc==='vapor'){ boss.sx=40+rnd()*(W-80); boss.fl=10; msg=L('GLITCH!'); burst(bx,boss.y,6,13); }
    else if(sc==='city'){ boss.shT=170; msg=L('SHIELD ONLINE!'); }
    else if(sc==='flight'){ for(i=0;i<6;i++) bshots.push({ty:'bomb',x:20+i*((W-40)/5),y:by-8,vx:0,vy:1.9}); msg=L('CARPET BOMBING!'); }
    else if(sc==='dream'){ boss.wd=rnd()<0.5?-1:1; boss.windT=190; msg=L('GUST OF WIND!'); }
    else if(sc==='forest'){ for(i=0;i<5;i++) bshots.push({ty:'split',x:bx+(i-2)*10,y:by,vx:(i-2)*0.25,vy:0.9}); msg=L('SPORES!'); }
    else if(sc==='moon'){ boss.pullT=170; msg=L('GRAVITY PULL!'); }
    else if(sc==='dungeon'){ for(i=0;i<8;i++){ var a2=i*0.785; bshots.push({ty:'ring',x:bx,y:boss.y,vx:Math.cos(a2)*0.9,vy:Math.sin(a2)*0.9+0.3}); } msg=L('BONE STORM!'); }
    else if(sc==='cozy'){ boss.fogT=260; msg=L('STEAM!'); }
    else if(sc==='golf'){ for(i=0;i<7;i++) bshots.push({ty:'aim',x:bx,y:by,vx:(i-3)*0.45,vy:1.5}); msg=L('SPRINKLERS!'); }
    msgT=70; shake=Math.max(shake,3); }
  function updateBoss(){ if(!boss) return; if(state==='look'&&DEVH){ boss.x=cx; boss.y=48; return; } /* dev viewer: the boss stands still so it can be clicked */ var ph2=boss.hp<=boss.hp0/2, hr=boss.hp/boss.hp0, spd=boss.sp*0.6*(1+0.8*Math.max(0,Math.min(1,(0.3-hr)/0.3))); boss.t++; // slower base speed; only a badly hurt boss (below 30 percent HP) speeds up, smoothly
    if(boss.phs===undefined) boss.phs=boss.t*boss.sp; boss.phs+=spd; // phase accumulates, so a speed change never makes the boss jump
    var tgx=cx+Math.sin(boss.phs)*boss.ax+Math.sin(boss.phs*2.3)*8; if(boss.dashT>0){ boss.dashT--; tgx=ball?ball.x:tgx; } // western dash: rushes at the ball
    if(boss.sx===undefined) boss.sx=tgx; boss.sx+=(tgx-boss.sx)*(boss.dashT>0?0.07:0.3); boss.x=Math.max(boss.w/2+8,Math.min(W-boss.w/2-8,boss.sx));
    boss.y=46+Math.sin(boss.phs*1.7)*12+(ph2?Math.sin(boss.t*0.05)*6:0); if(boss.fl>0) boss.fl--;
    if(state==='play'||state==='tee'){ boss.cd--; if(boss.cd<=0){ var ty=boss.atk[boss.ai++%boss.atk.length]; boss.cd=(ph2?150:250)+(ty==='beam'?40:0); bossFire(ty,ph2); } }
    if(boss.mouth>0) boss.mouth--;
    // ===== each boss has its own special ability (announced by a message) =====
    ['shT','windT','pullT','fogT'].forEach(function(kt){ if(boss[kt]>0) boss[kt]--; });
    if(state==='play'){ if(boss.abT===undefined) boss.abT=260+((rnd()*120)|0); if(--boss.abT<=0){ boss.abT=(ph2?380:560)+((rnd()*120)|0); bossAbility(); }
      var bl3=[ball].concat(extras); if(boss.windT>0) bl3.forEach(function(b){ if(b&&!b.held&&!b.stk) b.vx+=boss.wd*0.03; }); // cloud dragon: gust of wind pushes every ball sideways
      if(boss.pullT>0) bl3.forEach(function(b){ if(b&&!b.held&&!b.stk){ var dx=boss.x-b.x, dy=boss.y-b.y, dl=Math.hypot(dx,dy)||1; b.vx+=dx/dl*0.05; b.vy+=dy/dl*0.05; } }); // druid: gravity pull towards the boss
      if(boss.sc==='forest'&&boss.hp<boss.hp0&&tick%300===0){ boss.hp++; boss.fl=6; burst(boss.x,boss.y,4,5); msg=L('TREE SPIRIT HEALS'); msgT=40; } } // tree spirit: regrows HP over time
    var L=fl[0].len/2, px=cx+co;
    bshots=bshots.filter(function(sh){ sh.t=(sh.t||0)+1;
      if(sh.ty==='beam'){ if(sh.t>=40&&sh.t<=58){ if(!sh.hit&&state==='play'&&Math.abs(px-sh.x)<=L+3){ sh.hit=1; stunT=BSTUN.beam; shake=6; burst(sh.x,200,4,2); }
          if(state==='play'&&ball&&Math.abs(ball.x-sh.x)<6){ ball.vy+=0.5; } } return sh.t<=58; }
      if(sh.ty==='homing'){ sh.vx=Math.max(-1.3,Math.min(1.3,sh.vx+(px-sh.x)*0.004)); }
      if(sh.ty==='wave'){ sh.x=sh.x0+Math.sin(sh.y*0.09)*18; } else sh.x+=sh.vx; sh.y+=sh.vy;
      if(sh.ty==='split'&&!sh.sp&&sh.y>110){ bshots.push({ty:'aim',x:sh.x,y:sh.y,vx:-0.8,vy:1.3},{ty:'aim',x:sh.x,y:sh.y,vx:0.8,vy:1.3}); burst(sh.x,sh.y,3,13); return false; }
      var ub=Math.max(-1,Math.min(1,(sh.x-px)/L)), barY=fl[0].py-bulge*(1-ub*ub); // the bar's curve: bowl or arch
      if(sh.y>=barY-5&&sh.y<=barY+7&&Math.abs(sh.x-px)<=L+2&&(state==='play'||state==='tee')){ if(((state==='play'&&(chV>0.3||ocT>0))||(teeHeld&&power>0.3))&&stunT<=0){ /* only a charged bar (tension above 30 percent) catches */ burst(sh.x,sh.y,5,[1,4,14][(tick>>1)%3]); score+=mult()*10; shake=Math.max(shake,2); if(state==='play'&&extras.length<6){ var hu0=ub*0.9, hu1=hu0, hk=0; while(hk<14&&(extras.concat([mainBall]).some(function(q){ return q&&q.held&&Math.abs(q.hu-hu1)<0.26; })||Math.abs(hu1)>0.9)){ hk++; hu1=hu0+(hk%2?1:-1)*Math.ceil(hk/2)*0.26; } // each caught shot gets its own free spot in the bowl
        if(hk<14) extras.push({x:sh.x,y:barY-3,vx:0,vy:0,e:0.6,held:true,hu:Math.max(-0.9,Math.min(0.9,hu1)),caught:1}); } /* caught shot becomes a ball held in the bowl: release to shoot it at the boss */ return false; } /* charging bar (bowl) catches the shot */ drainE(0.4); burst(sh.x,sh.y,4,2); shake=6; return false; } // uncaught: steals energy from the ball
      var shB=null; if(state==='play') [ball].concat(extras).forEach(function(b){ if(!shB&&b&&!b.held&&Math.hypot(b.x-sh.x,b.y-sh.y)<(sh.ty==='bomb'?8:6)) shB=b; });
      if(shB){ shB.e=Math.min(1,(shB.e||0)+0.4); shB.vx*=1.25; shB.vy*=1.25; capB=Math.min(5,Math.max(0,capB)+1.2); burst(sh.x,sh.y,sh.ty==='bomb'?5:3,[1,4,3][(tick>>1)%3]); shake=Math.max(shake,3); score+=mult()*25; return false; } // ball hits an enemy shot: absorbs it, more energy and faster
      return sh.y<H+6&&sh.x>-8&&sh.x<W+8; }); }
  function drainE(d){ if(pw.F>0||cheat.energy) return; [ball].concat(extras).forEach(function(b){ if(b) b.e=Math.max(0,(b.e||0)-d); }); } // boss hit: only energy lost
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
  // ball size: default small (radius 2), perk SMALL = 1.5, TINY = 1
  var BALL_SPEED=0.45; // global speed factor for all balls (1 = previous)
  function ballR(){ return cheat.bigball?5:Math.min([2,1.7,1.4,1.1][ballU]||2,pw.W>0?1:(pw.K>0?1.5:9)); }
  function flingF(){ return smallF()*(cheat.energy?1.3:1); } // bought PERMANENT ENERGY (full energy) also flings harder
  function smallF(){ return Math.pow(2/Math.max(1,ballR()),0.7); } // smaller ball = flung harder (1.0 normal, ~1.6 at radius 1)
  function launchSp(pw){ return (3+pw*9)*(1+0.12*powT)*(1+0.45*Math.max(0,(pw-0.8)/0.2)); } // full power: noticeably faster shot
  function aimLine(x0,y0,ang,pw,step,nocap){ // aiming line: marching dots, color + size by power (cyan -> yellow -> red), pulsing target with percent
    var pd=launchSp(pw)*60; if(!nocap&&(mouseIn||locked())){ var dc=Math.hypot(mx-x0,my-y0); if(dc>8) pd=Math.min(pd,dc); } // the line never goes past the cursor
    var n=Math.min(60,Math.floor(pd/step)), col=pw>0.7?2:(pw>0.35?4:3), ph=(tick*0.35)%2, i, d, f, px, py, sz;
    for(i=0;i<=n;i++){ d=(i+ph*0.5)*step; if(d<6||d>pd) continue; f=d/pd; px=x0+Math.sin(ang)*d; py=y0-Math.cos(ang)*d; sz=f>0.8?3:2;
      box(Math.round(px-sz/2)-1,Math.round(py-sz/2)-1,sz+2,sz+2,0); box(Math.round(px-sz/2),Math.round(py-sz/2),sz,sz,((i+((tick>>2)&1))%2)?col:1); }
    var ex=x0+Math.sin(ang)*pd, ey=y0-Math.cos(ang)*pd, pr=3+((tick>>3)&1); box(ex-pr-1,ey-pr-1,pr*2+3,1,0);
    box(ex-pr,ey-pr,3,1,col); box(ex+pr-2,ey-pr,3,1,col); box(ex-pr,ey+pr,3,1,col); box(ex+pr-2,ey+pr,3,1,col); box(ex-pr,ey-pr,1,3,col); box(ex+pr,ey-pr,1,3,col); box(ex-pr,ey+pr-2,1,3,col); box(ex+pr,ey+pr-2,1,3,col);
    box(ex-1,ey-1,3,3,(tick>>2)&1?1:col); var pt=Math.round(pw*100)+'%'; txt(pt,Math.max(2,Math.min(W-pt.length*4-2,(ex+pr+3)|0)),Math.max(11,Math.min(H-8,(ey-2)|0)),col); }
  function drawCharge(b){ var be=b.e||0; if(be<0.04) return; // charge: glowing rim around the ball, blinks faster with more energy
    var per=ocT>0?2:Math.max(3,Math.round(18-15*be)), on=(tick%per)<per*0.6, c=be>0.66?4:(be>0.33?3:8);
    if(!on&&be<0.95) { c=12; }
    var bx0=b.x|0, by0=b.y|0, r=ballR();
    if(be>0.6){ var ga=(be-0.6)/0.4; g.globalAlpha=0.10*ga+0.05*Math.sin(tick*0.25); disc(bx0,by0,Math.ceil(r)+5,c); g.globalAlpha=0.16*ga; disc(bx0,by0,Math.ceil(r)+3,c); g.globalAlpha=1; } // soft glow while the ball is highly charged
    disc(bx0,by0,Math.ceil(r)+1,c); }
  function drawBallAt(x,y,c){ x|=0; y|=0; var r=ballR(); if(psxOn&&r>=2){ psxGem(x,y,Math.round(r),c,tick*0.07); return; } if(r>=2){ disc(x,y,Math.round(r),c); box(x-1,y-1,1,1,11); } else if(r>1) disc(x,y,1,c); else box(x-1,y-1,2,2,c); }
  function bossCollide(){ if(!boss) return; var bx0=boss.x-boss.w/2, by0=boss.y-boss.h/2, R=ballR();
    var qx=Math.max(bx0,Math.min(ball.x,bx0+boss.w)), qy=Math.max(by0,Math.min(ball.y,by0+boss.h)), dx=ball.x-qx, dy=ball.y-qy, d=Math.hypot(dx,dy);
    if(d<R){ if(d>0){ dx/=d; dy/=d; ball.x=qx+dx*R; ball.y=qy+dy*R; } else { dx=0; dy=1; ball.y=by0+boss.h+R; }
      if(boss.eat&&!ball.swal&&tick>=boss.eatCd){ ball.swal=55; boss.eatCd=tick+320; boss.mouth=55; burst(ball.x,ball.y,4,13); shake=4; msg=L('SWALLOWED!'); msgT=40; return; }
      bounce(dx,dy,1.05);
      if(tick-(ball.bh||-99)>10){ ball.bh=tick; var en=Math.max(0,Math.min(1,ball.e||0)), mul=1+Math.floor(en*2.99); if(boss.shT>0){ mul=0; boss.fl=4; burst(ball.x,ball.y,3,11); msg=L('SHIELDED!'); msgT=30; } boss.hp-=(pw.M>0?2:1)*mul; if(mul>1){ burst(ball.x,ball.y,2+mul,4); msg=L('ENERGY x')+mul; msgT=30; } if(!pw.F&&!cheat.energy) ball.e=en*0.5; boss.fl=8; score+=mult()*100; addG(10); burst(ball.x,ball.y,3,1); shake=4; drop(boss.x,boss.y+boss.h/2,0.25);
        if(boss.hp<=0&&boss.sc==='dungeon'&&!boss.rev){ boss.rev=1; boss.hp=Math.ceil(boss.hp0*0.35); boss.fl=30; shake=10; msg=L('THE SKELETON LORD RISES AGAIN!'); msgT=100; for(var kr=0;kr<5;kr++) burst(boss.x+(kr-2)*8,boss.y,6,[1,3,11][kr%3]); } /* dungeon boss: revives once */
        if(boss.hp<=0){ var bx=boss.x, by=boss.y; for(var k=0;k<4;k++) burst(bx+(k-1.5)*10,by,8,[1,4,3,2][k]); var bcont=secObjs.filter(function(sc){ return sc.k==='boss'&&!sc.spawned&&!(typeof sc.t==='string'?bgOpen[sc.t.slice(3)]:tabsOpen[sc.t]); })[0]; boss=null; bshots=[]; if(bcont){ spawnShopCap(bcont,bx,by,true); bossWinPend=true; bossWinT=1500; } else winLevel(); } } } }
  var winT=0, WINLEN=170, winBoss=false;
  // victory overlay (CONTINUE / SHOP) and the pan transition into the next stage
  var vicBuild=null, vicSel=0, vicR=[], transT=0, TRANS_LEN=80, transPend=false, prevSceneN='', prevOff=0, bgPrevC=document.createElement('canvas');
  function vicStart(fn){ if(ambient){ fn(); openShop(); return; } vicBuild=fn; vicSel=0; state='victory'; saveGame(); }
  function drawSprites(ctx,src,off,dx,par){ (src.sp||[]).forEach(function(sp){ ctx.drawImage(sp.c,Math.round(sp.wx-off+dx)+(par?Math.round(par(sp.base)):0),sp.y); }); }
  function snapBg(){ bgPrevC.width=W; bgPrevC.height=H; var pc=bgPrevC.getContext('2d'); pc.drawImage(bgc,0,0); if(bgc.lm) pc.drawImage(bgc.lm,0,0); drawSprites(pc,bgc,bgc.spOff,0,false); prevSceneN=scene; prevOff=bgOff; }
  function startTrans(){ transT=0; state='trans'; }
  function vicMenu(){ if(state!=='victory') return; vicBuild=null; saveGame(); state='title'; menuSel=0; } // third button: back to the main menu (the next stage is already saved)
  function vicAct(i){ if(i===2) vicMenu(); else vicGo(i===1); }
  function vicGo(shop){ if(state!=='victory') return; snapBg(); if(vicBuild) vicBuild(); vicBuild=null; if(shop){ transPend=true; openShop(); } else startTrans(); }
  function winLevel(){ // stage cleared: first victory animation (ball + bar), then winApply() -> shop
    if(ambient){ winApply(); return; }
    if(!tut) unlockStage(((lvNum()-1)%LEVELS.length)+2); /* clearing a stage unlocks the next one */
    state='win'; winT=WINLEN; winBoss=!!LV().boss; ball.vx=ball.vy=0; extras=[]; bshots=[]; stunT=0; shake=10; msgT=0;
    for(var wk=0;wk<4;wk++) burst(ball.x+(wk-1.5)*14,ball.y-6,6,[1,2,3,4][wk]); }
  function winApply(){ // score, build next level, open shop
    if(tut){ tutNext(); return; }
    if(ambient&&!ambFull){ autoWin(); return; }
    if(mode==='golf'){ var bsg=LV().boss, pts=bsg?500:Math.max(1,LV().par+3-strokes)*100;
      addG(60); score+=mult()*pts; msg=bsg?L('BOSS DEFEATED! +500'):L('HOLED! +')+pts; msgT=150; hole++; if(bsg&&loopG) hole=loopG.from+1; if(hole>LEVELS.length){ msg=L('ROUND DONE: ')+score; hole=1; score=0; } bestLv=Math.max(bestLv,hole); strokes=0;
      vicStart(function(){ seedN++; layout(); reset(); }); }
    else { var wasBoss=LV().boss; addG(wasBoss?120:60); if(wasBoss) score+=mult()*500; level=(wasBoss&&loopG)?Math.floor((level-1)/LEVELS.length)*LEVELS.length+loopG.from+1:level+1; bestLv=Math.max(bestLv,level); vicStart(function(){ seedN++; layout(); msg='LEVEL '+level+' '+LV().name; msgT=140; reset(); }); } }
  function autoWin(){ reset(); shopFrom='auto'; state='shop'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; shopAutoT=shopAutoMax=180; if(document.exitPointerLock) document.exitPointerLock(); } // autopilot: shop with countdown on the continue button
  function autoRestart(){ shopAutoT=-1; seedN++; layout(); reset(); msg=L('AUTOPILOT: NEW LEVEL'); msgT=120; } // won: same level from the start
  function apGuard(){ if(ambient&&!ambFull){ if(state==='shop'){ apGold=gold; apScore=score; lives=apLives; return; } if(!cheat.autoscore){ score=apScore; gold=apGold; } lives=apLives; } } // autopilot: no score, no gold, no life loss (except cheat)
  var ambient=false, ambFull=true, ambT=0, ambTee=0, lookIdx=1;
  function toggleAuto(){ if(ambient){ if(ambFull){ exitToTitle(); } else { ambient=false; K.l=0; K.r=0; shopAutoT=-1; msg=L('AUTOPILOT OFF'); msgT=80; } }
    else if(state==='tee'||state==='play'){ ambient=true; ambFull=false; ambT=0; ambTee=0; apScore=score; apGold=gold; apLives=lives; msg=L('AUTOPILOT ON - TAB = OFF'); msgT=100; } }
  function startAmbient(){ ambient=true; ambFull=true; ambT=0; ambTee=0; init(true); level=hole=1+((Math.random()*LEVELS.length)|0); lives=99; seedN++; layout(); reset(); msg='AMBIENCE - '+LV().name; msgT=160; }
  function exitToTitle(){ ambient=false; var bs=loadSave(); init(true); if(bs&&bs.lv) applySave(bs); state='title'; menuSel=0; }
  function bgJump1(dir,cur){ if(dir>0) return clusterJump(1,cur); var i=cur-1, sc=LEVELS[i].scene; while(i>0&&LEVELS[i-1].scene===sc) i--; return clusterJump(-1,i+1); }
  var devAllStages=false; // dev mode: step through every single stage in the viewer instead of one per background
  function bgJump(dir){ if(DEVH&&devAllStages) return ((lookIdx-1+dir+LEVELS.length)%LEVELS.length)+1; var n=bgJump1(dir,lookIdx), gz=0; while(!bgVis(LEVELS[n-1].scene)&&gz++<LEVELS.length) n=bgJump1(dir,n); return n; } // locked backgrounds are skipped // arrows: step through background types only (first stage of each)
  var lookSaved=0;
  function lookStage(n){ devSel=null; devScSel=null; lookIdx=n; level=n; hole=n; seedN++; layout(); reset(); state='look'; msgT=0; }
  function ambientAI(){ ambT++;
    if(ambFull&&ambT>5400){ ambT=1; level=level%LEVELS.length+1; hole=level; seedN++; layout(); reset(); msg='STAGE '+lvNum()+' '+LV().name; msgT=160; return; }
    K.ml=0; K.mr=0; vco=0; mpend=0; if(ambFull) lives=99;
    if(state==='tee'){ K.l=0; if(++ambTee>45){ ambTee=0; aim=(rnd()-0.5)*0.9; var sp0=5.2; ball.vx=Math.sin(aim)*sp0; ball.vy=-Math.cos(aim)*sp0; ball.e=1; state='play'; strokes++; } return; }
    if(state==='play'){ var Lb=fl[0].len/2, tgt, cur=cx+co;
      if(ball.vy<-0.2) ambDesc=false;
      if(ball.vy>0.2){
        if(!ambDesc){ ambDesc=true; ambStrike=rnd()<0.3; // new approach: pick a target, rarely a hit
          if(boss){ ambTx=boss.x; ambTy=boss.y; }
          else if(mode==='golf'){ var ho=holes.filter(function(q){ return !q.done; }); if(ho.length){ var hh=ho[(rnd()*ho.length)|0]; ambTx=hh.x; ambTy=hh.y; } else { ambTx=rnd()*W; ambTy=40; } }
          else if(bricks.length){ var bk=bricks[(rnd()*bricks.length)|0]; ambTx=bk.x+bk.w/2; ambTy=bk.y; }
          else { ambTx=rnd()*W; ambTy=40; } }
        var tf=(198-ball.y)/ball.vy, land=ball.x+ball.vx*Math.min(tf,60);
        // desired departure angle to the target -> contact point on the bar (angle = u * 1.1 rad)
        var ang=Math.max(-1,Math.min(1,Math.atan2(ambTx-land,198-ambTy))), u=Math.max(-0.92,Math.min(0.92,ang/1.1));
        tgt=land-u*Lb; }
      else tgt=ball.x*0.6+cur*0.4;
      tgt=Math.max(Lb+6,Math.min(W-Lb-6,tgt)); co+=Math.max(-4,Math.min(4,(tgt-cur)*0.22));
      K.l=(ambStrike&&ball.vy>0&&ball.y>150&&ball.y<188&&Math.abs(ball.x-(cx+co))<40)?1:0; } }
  var ambDesc=false, ambStrike=false, ambTx=150, ambTy=40;
  // stage preview for the map tooltip: runs the real layout once per stage (cached) and restores all state afterwards
  var pvCache={};
  function stagePreview(n,tn){ var key=mode+'|'+n+'|'+W+'|'+(tn||0), otn=tut; if(pvCache[key]!==undefined) return pvCache[key]; var rs=renderScene, o={level:level,hole:hole,bumpers:bumpers,holes:holes,blocks:blocks,guides:guides,boss:boss,bshots:bshots,stunT:stunT,seed:seed,scene:scene,bgSeed:bgSeed,bricks:bricks,stickies:stickies,fl:fl,co:co,pwT:pw.T,cx:cx,sec:secObjs}, res=null;
    try{ renderScene=function(){}; if(tn) tut=tn; level=n; hole=n; layout(); res={bumpers:bumpers.filter(function(b){ return !b.par; }),holes:holes,blocks:blocks,guides:guides.slice(4),bricks:bricks,boss:!!boss}; }catch(e){ res=null; }
    tut=otn; renderScene=rs; level=o.level; hole=o.hole; bumpers=o.bumpers; holes=o.holes; blocks=o.blocks; guides=o.guides; boss=o.boss; bshots=o.bshots; stunT=o.stunT; seed=o.seed; scene=o.scene; bgSeed=o.bgSeed; bricks=o.bricks; stickies=o.stickies; fl=o.fl; co=o.co; pw.T=o.pwT; cx=o.cx; secObjs=o.sec; return (pvCache[key]=res); }
  var lookBackR=null, lookGoR=null, lookViewR=null, lookFlat=false; try{ lookFlat=localStorage.golfLookFlat==='1'; }catch(e){} // viewer: flat map (no movement) or horizon with parallax
  var FLATDEF={western:1,city:1,flight:1,dungeon:1,forest:1,cozy:1}, flatMap={}; try{ flatMap=JSON.parse(localStorage.golfFlatMap||'{}')||{}; }catch(e){}
  function flatFor(sc){ return flatMap[sc]!==undefined?!!flatMap[sc]:!!FLATDEF[sc]; } // parallax setting per background type: flat (still) or horizon (moves)
  function toggleLookView(){ var sc=LEVELS[lookIdx-1].scene; flatMap[sc]=!flatFor(sc); try{ localStorage.golfFlatMap=JSON.stringify(flatMap); }catch(e){} }
  var lookDevR=[], devBgMode=false, devSel=null, devList=false; // devList: overlay with all stages to jump to
  // devSel: the obstacle picked by a click in the viewer {k:'bumper'|'block'|'brick', i:index} (layouts are deterministic per stage)
  function devOutline(o,c){ // exact 1px outline around the obstacle (rect for bricks/blocks/boss, ring for bumpers)
    if(o.r&&!o.w){ var rr=o.r+2, n=Math.max(16,Math.ceil(rr*3)), a; for(a=0;a<n;a++){ var an=a*6.2832/n; box(Math.floor(o.x+Math.cos(an)*rr),Math.floor(o.y+Math.sin(an)*rr),1,1,c); } return; }
    var x0=Math.floor(o.sc?o.x-o.w/2:o.x)-1, y0=Math.floor(o.sc?o.y-o.h/2:o.y)-1, w=Math.ceil(o.w)+2, h=Math.ceil(o.h)+2; box(x0,y0,w,1,c); box(x0,y0+h-1,w,1,c); box(x0,y0,1,h,c); box(x0+w-1,y0,1,h,c); }
  function devBox(o){ return o.sc?{x:o.x,y:o.y,w:o.w/2+3,h:o.h/2+3}:(o.w?{x:o.x+o.w/2,y:o.y+o.h/2,w:o.w/2+3,h:o.h/2+3}:{x:o.x,y:o.y,w:o.r+4,h:o.r+4}); }
  function devObjs(k){ return k==='boss'?(boss?[boss]:[]):k==='bumper'?bumpers.filter(function(b){ return !b.par; }):(k==='block'?blocks:bricks); }
  function devPickNear(fx,fy,tol){ var ex=devPick(fx,fy); if(ex) return ex; var best=null, bd=tol+1; ['boss','bumper','block','brick'].forEach(function(k){ devObjs(k).forEach(function(o,i){ var bb=devBox(o), d; if(k==='bumper') d=Math.max(0,Math.hypot(o.x-fx,o.y-fy)-o.r); else { var hw=bb.w-3, hh2=bb.h-3; d=Math.hypot(Math.max(0,Math.abs(fx-bb.x)-hw),Math.max(0,Math.abs(fy-bb.y)-hh2)); } if(d<bd){ bd=d; best={k:k,i:i}; } }); }); return best; } // forgiving drop: the nearest obstacle within tol field pixels
  function devPick(fx,fy){ var ks=['boss','bumper','block','brick'], a, i, o; for(a=0;a<4;a++){ var arr=devObjs(ks[a]); for(i=0;i<arr.length;i++){ o=arr[i]; if(ks[a]==='boss'?(Math.abs(fx-o.x)<=o.w/2+2&&Math.abs(fy-o.y)<=o.h/2+2):ks[a]==='bumper'?Math.hypot(o.x-fx,o.y-fy)<=o.r+3:(fx>=o.x-2&&fx<=o.x+o.w+2&&fy>=o.y-2&&fy<=o.y+o.h+2)) return {k:ks[a],i:i}; } } return null; }
  function devRelook(){ layout(); reset(); state='look'; } // re-place the secrets in the viewed stage (same seed)
  var devDragPend=null, devDragOn=false, devScSel=null, devConfirm=0, devMsg='', devMsgT=0, devListScroll=-1, devOpenSc={}, devDd=null, devUiLast=''; // devDd: open background dropdown of a cluster {sc,y} // devListScroll -1 = jump to the current stage when the list opens
  try{ var du=JSON.parse(localStorage.golfDevUi||'null'); if(du){ devList=!!du.list; devListScroll=typeof du.scroll==='number'?du.scroll:-1; devOpenSc=du.open||{}; devBgMode=!!du.bg; devAllStages=!!du.all; } }catch(e){} // dev editor UI state (list open, scroll, opened clusters, modes) survives a reload
  function devUiSave(){ var st=JSON.stringify({list:devList,scroll:devListScroll,open:devOpenSc,bg:devBgMode,all:devAllStages}); if(st!==devUiLast){ devUiLast=st; try{ localStorage.golfDevUi=st; }catch(e){} } }
  function lkGeo(){ return (DEVH&&DEVH.set)?{x:6,y:32,s:0.62,fx:2,fy:28,fw:194,fh:148}:{x:45,y:32,s:0.7,fx:41,fy:28,fw:218,fh:162}; } // dev mode: smaller field, a settings panel on the right
  function devDrop(){ var d=devDragPend; if(!d) return; devDragPend=null; var on=devDragOn; devDragOn=false; if(state!=='look') return; if(!on){ d.r.f(); return; } // short press = normal click, real drag = drop onto the obstacle under the cursor
    var lg=lkGeo(); if(mx>=lg.x&&mx<=lg.x+W*lg.s&&my>=lg.y&&my<=lg.y+H*lg.s){ var pk=devPickNear((mx-lg.x)/lg.s,(my-lg.y)/lg.s,14); if(pk){ devSel=pk; if(d.drag.tab!==undefined) DEVH.set(d.drag.tab,lookIdx,pk.k,pk.i); else DEVH.setBg(lookIdx,pk.k,d.drag.scene,pk.i); devRelook(); devMsg='PLACED: '+(d.drag.label||'')+' IN '+pk.k.toUpperCase()+' '+pk.i; devMsgT=150; } else { devMsg='NO OBSTACLE THERE - DROP IT ONTO ONE'; devMsgT=150; } } else { devMsg='DROP IT ONTO AN OBSTACLE IN THE FIELD'; devMsgT=150; } }
  function drawLookDev(){ lookDevR=[]; if(!DEVH||!DEVH.set) return; devUiSave(); if(devDragPend&&!devDragOn&&Math.hypot(mx-devDragPend.x,my-devDragPend.y)>4) devDragOn=true; var cfg=secCfg(), ab={bumper:'BMP',block:'BLK',brick:'BRK',boss:'BOSS'}, sn=['UPS','LOOK','GFX','CHEAT','HARD'], PX=198, PW=99, scl=[]; LEVELS.forEach(function(q){ if(scl.indexOf(q.scene)<0) scl.push(q.scene); });
    function btn(x,y,w,t,col,f,tip,on,drag,bh,thumb){ bh=bh||9; var r={x:x,y:y,w:w,h:bh,f:f,tip:tip||'',drag:drag,thumb:thumb||null}; lookDevR.push(r); var hh=mouseIn&&hit(r); bevel(x,y,w,bh,on?7:(hh?4:12),on?8:(hh?14:11),on?15:(hh?2:15)); txt(t,x+((w-String(t).length*4)>>1),y+2+((bh-9)>>1),on?1:(hh?0:col)); }
    function where(o){ return (ab[o.obs]||'')+(o.idx!==undefined?o.idx:''); }
    bevel(PX-3,28,PW+5,162,12,11,15); txt(L('SECRETS - STAGE ')+lookIdx,PX,31,9);
    txt('1  CLICK AN OBSTACLE',PX,41,1); txt('   IN THE FIELD',PX,47,1);
    if(devMsgT>0){ devMsgT--; txt(devMsg,PX+2,54,(tick>>2)&1?2:1); } else txt(devSel?'SELECTED: '+ab[devSel.k]+' '+devSel.i:'NOTHING SELECTED YET',PX+2,54,devSel?14:8);
    txt('2  DRAG A TAB ONTO AN',PX,64,1); txt('   OBSTACLE (OR CLICK IT)',PX,70,1);
    TABN.forEach(function(nm,t){ var c=cfg[t], here=c&&+c.stage===lookIdx, lab=sn[t]+': '+(c&&c.stage?(here?where(c):'STAGE '+c.stage):'NOT SET');
      btn(PX,80+t*11,PW,lab,here?4:(c&&c.stage?8:11),function(){ if(!devSel){ devMsg='CLICK AN OBSTACLE FIRST'; devMsgT=120; return; } if(here&&c.obs===devSel.k&&c.idx===devSel.i) DEVH.set(t,0); else DEVH.set(t,lookIdx,devSel.k,devSel.i); devRelook(); },
        'HIDE THE '+nm+' TAB IN AN OBSTACLE: DRAG THIS BUTTON ONTO AN OBSTACLE IN THE FIELD (OR SELECT ONE AND CLICK). CLICK ON THE SAME ONE AGAIN = REMOVE. A TAB HAS ONE SECRET IN THE WHOLE GAME',false,{tab:t,label:sn[t]},undefined,(c&&c.stage)?{stage:+c.stage,obs:c.obs,idx:c.idx}:null); });
    var uy=144; btn(PX,uy,48,'MARK:'+(DEVH.mark()?'ON':'OFF'),DEVH.mark()?4:11,function(){ DEVH.toggle('mark'); },'SHOW WHERE THE SECRETS SIT IN THE FIELD');
    btn(PX+50,uy,49,'ALL:'+(DEVH.showAll()?'ON':'OFF'),DEVH.showAll()?4:11,function(){ DEVH.toggle('showAll'); },'PREVIEW: SHOW ALL LOCKED SHOP TABS AND BACKGROUNDS IN THE GAME');
    btn(PX,uy+10,48,'RELOCK',11,function(){ tabsOpen={}; bgOpen={}; tabsSave(); },'LOCK ALL TABS AND BACKGROUNDS AGAIN TO TEST THE UNLOCKING');
    btn(PX+50,uy+10,49,'EXPORT',14,function(){ var tx=DEVH.exportText(); (navigator.clipboard?navigator.clipboard.writeText(tx):Promise.reject()).then(function(){ alert('Copied. Paste it into flippout-secrets.js'); },function(){ prompt('Copy this into flippout-secrets.js:',tx); }); },'COPY THE SETTINGS. PASTE THEM INTO FLIPPOUT-SECRETS.JS FOR THE RELEASE');
    var sure=tick<devConfirm;
    btn(PX,uy+20,48,'RESET STAGE',2,function(){ DEVH.clearStage(lookIdx); devSel=null; devRelook(); },'RESET THIS STAGE: REMOVES ALL SECRETS (SHOP TABS AND BACKGROUND UNLOCKS) HIDDEN IN STAGE '+lookIdx);
    btn(PX+50,uy+20,49,sure?'SURE? CLICK':'RESET ALL',sure?4:2,function(){ if(tick<devConfirm){ devConfirm=0; DEVH.discard(); flatMap={}; try{ localStorage.removeItem('golfFlatMap'); }catch(e){} devSel=null; devScSel=null; devOpenSc={}; devAllStages=false; devBgMode=false; devRelook(); } else devConfirm=tick+240; },'RESET EVERYTHING YOU CHANGED IN THE STAGE EDITOR (SECRETS, STAGE CLUSTER BACKGROUNDS, FLAT/HORIZON VIEWS, MARK/ALL SWITCHES). CLICK TWICE. UNLOCKED PROGRESS IS KEPT (USE RELOCK)');
    btn(PX,uy+30,62,devList?'LIST: ON':'STAGE LIST',devList?4:14,function(){ devList=!devList; devListScroll=-1; devDd=null; },'LIST OF ALL STAGES TO JUMP TO. CLUSTERS OPEN / CLOSE, THE DROPDOWN ON THE RIGHT CHOOSES THEIR BACKGROUND',false,null,14);
    btn(PX+64,uy+30,35,devAllStages?'ARR:ALL':'ARR:BG',devAllStages?4:11,function(){ devAllStages=!devAllStages; },'WHAT THE ARROWS STEP THROUGH: EVERY SINGLE STAGE (ALL) OR ONE STAGE PER BACKGROUND (BG)',false,null,14);
    if(devList){ var has={}; TABN.forEach(function(nm,t){ if(cfg[t]&&cfg[t].stage) has[cfg[t].stage]=1; }); 
      var pxl=6, pyl=30, pwl=186, phl=158, curSc=LEVELS[lookIdx-1].scene, items=[], lastSc=null, yy=0, visH=phl-14; // one column, a dropdown per stage cluster (image label = background icon); click selects the cluster and opens/closes it
      LEVELS.forEach(function(lv2,i){ if(lv2.scene!==lastSc){ lastSc=lv2.scene; items.push({hd:lv2.scene,first:i+1,h:15,y:yy}); yy+=15; } if(devOpenSc[lv2.scene]===undefined?lv2.scene===curSc:devOpenSc[lv2.scene]){ items.push({st:i+1,name:lv2.name,h:7,y:yy}); yy+=7; } });
      var maxS=Math.max(0,yy-visH), curY=0; items.forEach(function(it){ if(it.st===lookIdx) curY=it.y; });
      if(devListScroll<0) devListScroll=Math.max(0,curY-((visH/2)|0)); devListScroll=Math.max(0,Math.min(maxS,Math.round(devListScroll)));
      box(pxl-1,pyl-1,pwl+2,phl+2,1); box(pxl,pyl,pwl,phl,15); txt(L('ALL STAGES')+' ('+LEVELS.length+')   * = SECRET HERE',pxl+4,pyl+3,9);
      g.save(); g.beginPath(); g.rect(pxl,pyl+13,pwl,visH); g.clip(); var rows=[];
      var bmap=cfg.bgmap||{};
      items.forEach(function(it2){ var ry=pyl+13+it2.y-devListScroll; if(ry+it2.h<pyl+13||ry>pyl+13+visH) return; var r={x:pxl+2,y:ry,w:pwl-10,h:it2.h,f:(function(it3){ return function(){ if(it3.hd){ var op=devOpenSc[it3.hd]===undefined?it3.hd===curSc:devOpenSc[it3.hd]; devOpenSc[it3.hd]=!op; } else { devList=false; lookStage(it3.st); } }; })(it2),tip:it2.hd?'CLICK = OPEN / CLOSE THE STAGES OF THIS CLUSTER':''};
        if(it2.hd){ var eff=bmap[it2.hd]||it2.hd, ddr={x:r.x+100,y:ry+1,w:r.w-102,h:12,f:(function(hs,yy2){ return function(){ devDd={sc:hs,y:yy2}; }; })(it2.hd,ry),tip:'WHICH BACKGROUND THIS STAGE CLUSTER GETS. CLICK = CHOOSE ANOTHER ONE'}; rows.push(ddr); }
        rows.push(r); var hh=mouseIn&&hit(r);
        if(it2.hd){ var ex=(devOpenSc[it2.hd]===undefined?it2.hd===curSc:devOpenSc[it2.hd]); box(r.x,ry,r.w,14,hh?14:8); drawSceneIcon(it2.hd,r.x+2,ry+1,18,12); txt((ex?'v ':'> ')+String(SCN[it2.hd]||it2.hd).toUpperCase().slice(0,13),r.x+24,ry+5,0);
          var ov=bmap[it2.hd]&&bmap[it2.hd]!==it2.hd, dh=mouseIn&&hit(rows[rows.length-2]); box(r.x+100,ry+1,r.w-102,12,ov?4:(dh?12:15)); box(r.x+100,ry+1,r.w-102,1,1); txt(String(SCN[eff]||eff).toUpperCase().slice(0,12),r.x+103,ry+5,ov?0:1); txt('v',r.x+r.w-8,ry+5,ov?0:11); }
        else { var cur2=it2.st===lookIdx; if(cur2||hh) box(r.x,ry,r.w,6,cur2?2:12); txt((has[it2.st]?'*':' ')+(it2.st<10?' ':'')+it2.st+'  '+String(it2.name).slice(0,28),r.x+14,ry+1,cur2?1:(has[it2.st]?4:11)); } });
      g.restore();
      var sbx=pxl+pwl-7, sbh=visH; box(sbx,pyl+13,5,sbh,12); if(maxS>0){ var th=Math.max(6,Math.round(sbh*visH/yy)); box(sbx,pyl+13+Math.round((sbh-th)*devListScroll/maxS),5,th,11); }
      lookDevR=rows.concat(lookDevR); lookDevR.push({x:sbx,y:pyl+13,w:5,h:sbh,f:function(){ var q=(my-(pyl+13))/sbh; devListScroll=Math.round(q*maxS); }}); lookDevR.push({x:pxl,y:pyl,w:pwl,h:phl,f:function(){}});
      if(devDd){ var opts=[null].concat(scl), oh=11, dw=112, dx0=pxl+pwl-dw-9, dy0=Math.max(pyl+13,Math.min(pyl+phl-opts.length*oh-3,devDd.y+14)), orows=[]; box(dx0-1,dy0-1,dw+2,opts.length*oh+2,1); box(dx0,dy0,dw,opts.length*oh,15);
        opts.forEach(function(o3,k){ var r3={x:dx0,y:dy0+k*oh,w:dw,h:oh,f:(function(sc3,cl){ return function(){ DEVH.setBgMap(cl,sc3&&sc3!==cl?sc3:null); devDd=null; devRelook(); }; })(o3,devDd.sc),tip:o3?(SCN[o3]||o3).toUpperCase():'BACK TO THE ORIGINAL BACKGROUND OF THE CLUSTER'}; orows.push(r3); var h3=mouseIn&&hit(r3), cur3=(bmap[devDd.sc]||devDd.sc)===(o3||devDd.sc); if(cur3||h3) box(r3.x,r3.y,dw,oh-1,cur3?2:12);
          if(o3){ drawSceneIcon(o3,r3.x+2,r3.y+1,14,9); txt(String(SCN[o3]||o3).toUpperCase().slice(0,16),r3.x+20,r3.y+3,cur3?1:11); } else txt('(ORIGINAL)',r3.x+20,r3.y+3,cur3?1:14); });
        lookDevR=orows.concat([{x:0,y:0,w:W,h:H,f:function(){ devDd=null; }}]); } }
    if(devDragPend&&devDragOn){ var lgd=lkGeo(), pk2=(mx>=lgd.x&&mx<=lgd.x+W*lgd.s&&my>=lgd.y&&my<=lgd.y+H*lgd.s)?devPickNear((mx-lgd.x)/lgd.s,(my-lgd.y)/lgd.s,14):null;
      if(pk2){ var ob2=devObjs(pk2.k)[pk2.i]; if(ob2){ var bb3=devBox(ob2), ox=Math.floor(lgd.x+(bb3.x-bb3.w)*lgd.s), oy=Math.floor(lgd.y+(bb3.y-bb3.h)*lgd.s), ow=Math.ceil(bb3.w*2*lgd.s), oh2=Math.ceil(bb3.h*2*lgd.s), gc=(tick>>1)&1?5:14; box(ox,oy,ow,1,gc); box(ox,oy+oh2,ow,1,gc); box(ox,oy,1,oh2,gc); box(ox+ow,oy,1,oh2+1,gc); } }
      var gl=devDragPend.drag.label||'', gw=gl.length*4+8; var gx6=Math.round(mx+6), gy6=Math.round(my+6); bevel(gx6,gy6,gw,11,pk2?5:7,11,15); txt(gl,gx6+4,gy6+3,1); lookDevR=[]; } // dragging a button: ghost label + the obstacle under the cursor lights up green
    var tp=''; devTipThumb=null; if(mouseIn&&!devDragOn) for(var tq=0;tq<lookDevR.length;tq++) if(lookDevR[tq].tip&&hit(lookDevR[tq])){ tp=lookDevR[tq].tip; devTipThumb=lookDevR[tq].thumb; break; }
    devTipTxt=tp; } // (drawn in drawDevTip, after all buttons)
  var devTipTxt='';
  var devTipThumb=null;
  function drawPvMini(pv,x,y,ps,hl){ // small picture of a stage (the same data as the map preview), the obstacle that hides the secret blinks
    var pw=Math.round(W*ps), ph=Math.round(190*ps); box(x-1,y-1,pw+2,ph+2,11); box(x,y,pw,ph,15); if(!pv) return; var PX=function(v){ return x+Math.round(v*ps); }, PY=function(v){ return y+Math.round((v-18)*ps); }, S=function(v){ return Math.max(1,Math.round(v*ps)); };
    pv.holes.forEach(function(ho){ disc(PX(ho.x),PY(ho.y),S(ho.r),0); }); pv.bricks.forEach(function(br){ box(PX(br.x),PY(br.y),S(br.w),S(br.h),br.c); }); pv.blocks.forEach(function(bl2){ box(PX(bl2.x),PY(bl2.y),S(bl2.w),S(bl2.h),11); });
    pv.guides.forEach(function(gd){ var gl=Math.max(1,Math.round(Math.hypot(gd.x2-gd.x1,gd.y2-gd.y1)*ps)); for(var gi=0;gi<=gl;gi++) box(PX(gd.x1+(gd.x2-gd.x1)*gi/gl),PY(gd.y1+(gd.y2-gd.y1)*gi/gl),1,1,3); });
    pv.bumpers.forEach(function(bp){ disc(PX(bp.x),PY(bp.y),S(bp.r),bp.gild?4:13); }); if(pv.boss) box(PX(W/2-22),PY(34),S(44),S(28),2);
    if(hl&&((tick>>2)&1)){ var o=null, k=hl.obs; if(k==='boss') o={x:W/2-22,y:34,w:44,h:28}; else { var arr=k==='bumper'?pv.bumpers:(k==='block'?pv.blocks:pv.bricks); o=arr&&arr[hl.idx]; } if(o){ var ox,oy,ow,oh; if(k==='bumper'){ ox=PX(o.x-o.r)-1; oy=PY(o.y-o.r)-1; ow=S(o.r*2)+2; oh=ow; } else { ox=PX(o.x)-1; oy=PY(o.y)-1; ow=S(o.w)+2; oh=S(o.h)+2; } box(ox,oy,ow,1,14); box(ox,oy+oh-1,ow,1,14); box(ox,oy,1,oh,14); box(ox+ow-1,oy,1,oh,14); } } }
  function drawDevTip(){ var tp=devTipTxt; if(tp){ var words=tp.split(' '), lns=[], cur3=''; words.forEach(function(wd){ if((cur3+' '+wd).trim().length>30){ lns.push(cur3); cur3=wd; } else cur3=(cur3+' '+wd).trim(); }); if(cur3) lns.push(cur3);
      var th=devTipThumb, ps=0.36, tmw=th?Math.round(W*ps):0, tmh=th?Math.round(190*ps)+10:0, tw=0; lns.forEach(function(l3){ tw=Math.max(tw,l3.length); }); var bw3=Math.max(tw*4,tmw)+8, bh3=lns.length*7+6+tmh, bx3=Math.round(Math.max(2,Math.min(W-bw3-2,mx-bw3-4))), by3=Math.round(Math.max(2,Math.min(H-bh3-2,my+8))); bevel(bx3,by3,bw3,bh3,0,11,12); lns.forEach(function(l3,li){ txt(l3,bx3+4,by3+4+li*7,1); });
      if(th){ var ty=by3+4+lns.length*7+2; txt(L('STAGE ')+th.stage+' - '+String(LEVELS[th.stage-1].name).slice(0,16),bx3+4,ty,4); drawPvMini(stagePreview(th.stage),bx3+4,ty+8,ps,th); } } } // tooltip of the hovered dev button (with a small picture of the stage): drawn last so it lies over everything
  function drawLook(){ var N=LEVELS.length, lv=LEVELS[lookIdx-1], cl=(tick>>4)&1;
    bevel(8,13,W-16,15,12,11,15); var scl=[]; LEVELS.forEach(function(q){ if(scl.indexOf(q.scene)<0) scl.push(q.scene); }); var t1=(DEVH&&devAllStages)?L('STAGE ')+lookIdx+'/'+N+' - '+lv.name:pickMode?L('START STAGE ')+lookIdx+L(' OF ')+N+' - '+lv.name:L('BACKGROUND ')+(scl.indexOf(lv.scene)+1)+L(' OF ')+scl.length+' - '+(SCN[bgFor(lv.scene)]||bgFor(lv.scene)); var vwx=26+L(flatFor(lv.scene)?'VIEW: FLAT':'VIEW: HORIZON').length*4+10+8, tx1=Math.max(((W-t1.length*4)/2)|0,vwx); t1=t1.slice(0,Math.max(0,Math.floor((W-24-tx1)/4))); txtS(t1,tx1,18,4,1); // title never runs under the view button or the arrow
    for(var k=0;k<6;k++){ box(14+k,20-k+(k>3?0:0),1,2*k+1-(k>5?0:0)>0?1:1,cl?4:1); }
    for(k=0;k<5;k++){ box(14+k,20-k,1,k*2+1,cl?4:1); box(W-14-k,20-k,1,k*2+1,cl?4:1); }
    bevel(8,H-34,W-16,24,12,11,15); txt(L('SCENE: ')+(SCN[bgFor(lv.scene)]||bgFor(lv.scene))+L('  SHAPE: ')+String(lv.pat).toUpperCase(),16,H-30,8);
    txt(pickMode?L('LEFT RIGHT UP DOWN: BACKGROUND - ENTER = START'):L('LEFT RIGHT UP DOWN: BACKGROUND - ESC = BACK').replace('ESC',kLab('back')),16,H-20,cl?4:1);
    var lkF=flatFor(lv.scene), vl=lkF?L('VIEW: FLAT'):L('VIEW: HORIZON'); lookViewR={x:26,y:15,w:vl.length*4+10,h:11}; var vh=mouseIn&&hit(lookViewR); bevel(lookViewR.x,lookViewR.y,lookViewR.w,lookViewR.h,vh?4:15,vh?14:12,vh?2:0); txt(vl,lookViewR.x+5,lookViewR.y+3,vh?0:(lkF?11:4));
    drawLookDev();
    lookBackR={x:W-62,y:H-32,w:50,h:10}; lookGoR={x:W-116,y:H-32,w:50,h:10}; [[lookBackR,L('BACK')],[lookGoR,'START']].forEach(function(q){ var r=q[0], hh=mouseIn&&hit(r); bevel(r.x,r.y,r.w,r.h,hh?4:12,hh?14:11,hh?2:15); txt(q[1],r.x+((r.w-q[1].length*4)>>1),r.y+3,hh?0:1); }); if(DEVH) drawDevTip(); if(mouseIn) drawCursor(); }
  function openShop(from){ if(tut) return; if(ambient&&ambFull){ state='shop'; shopFrom='level'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; ambShopT=0; shopAutoT=shopAutoMax=180; return; } if(ambient) ambient=false; shopAutoT=-1; shopFrom=from||'level'; state='shop'; sel=0; shopTab=0; scrollY=0; shopPg=0; shopPosF=0; if(document.exitPointerLock) document.exitPointerLock(); saveGame();
    if(DEVH){ var dv=[]; if(DEVH.showAll&&DEVH.showAll()) dv.push('ALL TABS SHOWN (ALL:ON)'); var cfg5=secCfg(), op5=TABN.filter(function(nm,t){ return cfg5[t]&&cfg5[t].stage&&tabsOpen[t]; }); if(op5.length) dv.push('UNLOCKED: '+op5.join(' ')); var lk5=TABN.filter(function(nm,t){ return !tabsOpen[t]; }); dv.push('LOCKED: '+(lk5.join(' ')||'NONE')); msg='DEV '+dv.join(' - '); msgT=240; } } /* dev mode: tells why tabs are visible or hidden */ // shop: release the mouse
  var parts=[], caps=[], pw={E:0,S:0,M:0,X:0,T:0,Y:0,G:0,N:0,F:0,K:0,W:0,H:0}, saver=false;
  var PU={SHOP:{c:4,t:L('SHOP PICKUP')},K:{c:13,t:L('SMALL BALL'),d:900},W:{c:14,t:L('TINY BALL'),d:600},E:{c:8,t:L('LONG FLIPPER'),d:900},S:{c:9,t:L('SLOW'),d:720},M:{c:5,t:'MEGA BALL',d:600},X:{c:4,t:L('POINTS X2'),d:900},T:{c:14,t:L('FLOOR POOLS'),d:900},Y:{c:3,t:L('DYNAMITE'),d:720},G:{c:4,t:L('GOLD RUSH'),d:900},N:{c:9,t:'NEON',d:720},F:{c:14,t:L('PARACHUTE'),d:720},B:{c:3,t:L('BALL SAVER')},P:{c:2,t:L('EXTRA LIFE')},D:{c:14,t:'BALL SPLIT'},H:{c:12,t:'GHOST SHOT',d:900}};
  function mult(){ return (pw.X>0?2:1)*(1+0.25*diffN()); }
  function boom(x,y){ burst(x,y,6,3); shake=5;
    bumpers.forEach(function(b){ if(!b.dead&&Math.hypot(b.x-x,b.y-y)<26+b.r){ b.hp--; b.flash=6; score+=mult()*20; if(b.hp<=0){ b.dead=true; addG(20); score+=mult()*b.pts; drop(b.x,b.y,0.45); burst(b.x,b.y,b.r); } } });
    blocks.forEach(function(o){ if(!o.dead&&Math.hypot(o.x+5-x,o.y+3-y)<26){ o.hp--; o.fl=6; score+=mult()*20; if(o.hp<=0){ o.dead=true; addG(5); score+=mult()*40*o.hp0; burst(o.x+5,o.y+3,4,12); } } });
    for(var bi=bricks.length-1;bi>=0&&bricks.length>1;bi--){ var br=bricks[bi]; if(Math.hypot(br.x+br.w/2-x,br.y+br.h/2-y)<26){ br.hp--; br.fl=6; if(br.hp<=0){ bricks.splice(bi,1); score+=mult()*50; addG(2); } } } }
  function dropCaps(){ caps.forEach(function(c){ c.fast=true; c.vy=1; burst(c.x,c.y,2,2); }); }
  var lastDrop=-999;
  function drop(x,y,p){ if(caps.length>=1||tick-lastDrop<(tut===4?90:300)) return; if(tut===4?rnd()<0.5:rnd()<p*0.25*(1+0.3*luckU)){ lastDrop=tick; var ks='ESMXBPDDDTTKKWHH'+({western:'YYYGG',city:'NNNN',flight:'FFFF',dream:'FFGG',forest:'YYYNN',vapor:'NNFF',moon:'NNGG',dungeon:'YYMM',cozy:'FFGG'}[scene]||''); caps.push({x:x,y:y,k:ks[(rnd()*ks.length)|0]}); } }
  function collect(k,cp){ if(k==='SHOP'){ shopPickup(cp); return; } var u=PU[k]; msg=u.t; msgT=70; score+=50;
    if(u.d) pw[k]=u.d+(k==='T'?300*poolU:0); else if(k==='B') saver=true;
    else if(k==='D') split();
    else if(k==='P'){ if(mode==='breakout') lives++; else score+=300; } }
  function burst(x,y,r,col){ for(var i=0;i<8+r;i++){ var a=rnd()*6.28, v=0.6+rnd()*1.8; parts.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:25+rnd()*20,c:col||[1,4,3,2,11][(rnd()*5)|0]}); } }
  function moveBumpers(){ parts.forEach(function(q){ q.x+=q.vx; q.y+=q.vy; q.vy+=0.04; q.t--; }); parts=parts.filter(function(q){ return q.t>0; }); bumpers.forEach(function(b){ var obx=b.x, oby=b.y;
    if(b.mv){ b.ph+=b.sp; b.x=b.hx+b.dx*Math.sin(b.ph); b.y=b.hy+b.dy*Math.sin(b.ph); }
    else if(b.par){ b.an+=b.sp; b.x=b.par.x+Math.cos(b.an)*b.d; b.y=b.par.y+Math.sin(b.an)*b.d; } b.pvx=b.x-obx; b.pvy=b.y-oby; }); }
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
  // Landmarks per scene/cluster (anchor = bottom center, approx. 32x44 px): world map, thumbnails and backgrounds
  var SPAL={train:{sky:'#8ec8f0',a:'#4a9a3c',b:'#3f8a34'},western:{sky:'#f0a860',a:'#c8935a',b:'#b9844d'},city:{sky:'#2a2a50',a:'#4a4a5a',b:'#42424f'},flight:{sky:'#6ab4f0',a:'#7ab86a',b:'#6aa85c'},dream:{sky:'#3a1a6a',a:'#e8b8f0',b:'#dcaae8'},forest:{sky:'#2a5a3a',a:'#3a8a44',b:'#348040'},vapor:{sky:'#ff71ce',a:'#01cdfe',b:'#b967ff'},moon:{sky:'#0a0e2a',a:'#6a7090',b:'#5e6484'},dungeon:{sky:'#1a1a1a',a:'#555560',b:'#4a4a54'},cozy:{sky:'#5a3a22',a:'#8a5530',b:'#7a4a28'},golf:{sky:'#7ac8f0',a:'#4ab85a',b:'#44ac54'}};
  var qMemo={}, qPal=null; // map scenery is painted with free colors; map them onto the active style palette
  function qcol(c){ if(actv.style==='amiga'||c.charAt(0)!=='#') return c; var m=qMemo[c]; if(m) return m; if(!qPal) qPal=C.filter(function(h){ return typeof h==='string'&&h.length===7&&h.charAt(0)==='#'; }); return qMemo[c]=nearest(rgbOf(c),qPal); }
  function qCanvas(cv){ if(actv.style==='amiga') return; var cx=cv.getContext('2d'), im=cx.getImageData(0,0,cv.width,cv.height), d=im.data, pal=C.filter(function(h){ return typeof h==='string'&&h.length===7&&h.charAt(0)==='#'; }).map(rgbOf), memo={}, i, k, key, bi, bd, dd;
    for(i=0;i<d.length;i+=4){ if(d[i+3]<8) continue; key=(d[i]<<16)|(d[i+1]<<8)|d[i+2]; bi=memo[key]; if(bi===undefined){ bd=1e9; bi=0; for(k=0;k<pal.length;k++){ dd=(pal[k][0]-d[i])*(pal[k][0]-d[i])+(pal[k][1]-d[i+1])*(pal[k][1]-d[i+1])+(pal[k][2]-d[i+2])*(pal[k][2]-d[i+2]); if(dd<bd){ bd=dd; bi=k; } } memo[key]=bi; } d[i]=pal[bi][0]; d[i+1]=pal[bi][1]; d[i+2]=pal[bi][2]; d[i+3]=255; }
    cx.putImageData(im,0,0); }
  // ===== houses: shaded pixel art (roof tiles, planks, framed windows, door with step, chimney); R(dx,dy,w,h,color) draws relative to the house centre / ground =====
  function houseArt(R,o){ var w=o.w, h=o.h, x0=-(w>>1), rh=o.rh, ov=o.ov===undefined?1:o.ov, i, j;
    R(x0,-h,w,h,o.wall); R(x0,-h,1,h,o.wallL); R(x0+w-1,-h,1,h,o.wallD); R(x0+w-2,-h,1,h,o.wallD);
    if(o.planks) for(j=2;j<h-1;j+=o.planks) R(x0+1,-h+j,w-3,1,o.plank);
    R(x0-1,-2,w+2,2,o.base||o.wallD); R(x0-1,-2,w+2,1,o.stone||o.wallD);
    if(o.chim){ R(o.chim.x,-h-rh-o.chim.h+1,3,o.chim.h+rh-1,o.stone); R(o.chim.x,-h-rh-o.chim.h+1,1,o.chim.h+rh-1,o.trim); R(o.chim.x-1,-h-rh-o.chim.h,5,1,o.roofD); }
    for(i=0;i<rh;i++){ var rw=w+2*ov-2*i; if(rw<2) break; var rx=-(rw>>1), ry=-h-1-i; R(rx,ry,rw,1,(i&1)?o.roofL:o.roof); if(i&1) R(rx,ry,(rw>>1),1,o.roofL); else R(rx+(rw>>1),ry,rw-(rw>>1),1,o.roofD); }
    R(-((w+2*ov)>>1),-h,w+2*ov,1,o.roofD); R(-((w+2*ov)>>1),-h-1,w+2*ov,1,o.roof);
    (o.win||[]).forEach(function(q){ R(q.x-1,q.y-1,q.w+2,q.h+2,o.trim); R(q.x,q.y,q.w,q.h,o.glow); R(q.x,q.y,q.w,1,o.glowL); R(q.x,q.y,1,q.h,o.glowL); if(q.w>=4) R(q.x+(q.w>>1),q.y,1,q.h,o.trim); if(q.h>=4) R(q.x,q.y+(q.h>>1),q.w,1,o.trim); R(q.x-1,q.y+q.h+1,q.w+2,1,o.wallD); });
    if(o.door){ var d=o.door; R(d.x-1,-d.h-2,d.w+2,d.h+1,o.trim); R(d.x,-d.h-1,d.w,d.h-1,o.doorc); R(d.x,-d.h-1,1,d.h-1,o.doorL||o.doorc); R(d.x+d.w-2,-(d.h>>1)-1,1,1,o.glowL); R(d.x-1,-2,d.w+2,1,o.stone||o.wallD); } }
  function saloonArt(R,o){ var w=o.w, h=o.h, ph=o.ph, x0=-(w>>1), j;
    R(x0,-h,w,h,o.wall); R(x0,-h,1,h,o.wallL); R(x0+w-2,-h,2,h,o.wallD);
    for(j=2;j<h-1;j+=o.planks) R(x0+1,-h+j,w-3,1,o.plank);
    R(x0-1,-h-ph,w+2,ph,o.wall); R(x0-1,-h-ph,1,ph,o.wallL); R(x0+w,-h-ph,1,ph,o.wallD); // false front
    R(x0-2,-h-ph-2,w+4,2,o.roofD); R(x0-2,-h-ph-2,w+4,1,o.roof);
    var sx=x0+2, sw=w-4, sy=-h-ph+2, sh=ph-5; R(sx-1,sy-1,sw+2,sh+2,o.trim); R(sx,sy,sw,sh,o.sign); for(j=1;j<sh-1;j+=2) R(sx+2,sy+j,sw-4,1,o.letters); R(sx,sy,sw,1,o.signL);
    R(x0-2,-h+3,w+4,2,o.roof); R(x0-2,-h+5,w+4,1,o.roofD); R(x0-1,-h+6,2,h-6,o.wallD); R(x0+w-1,-h+6,2,h-6,o.wallD); // porch roof + posts
    (o.win||[]).forEach(function(q){ R(q.x-1,q.y-1,q.w+2,q.h+2,o.trim); R(q.x,q.y,q.w,q.h,o.glow); R(q.x,q.y,q.w,1,o.glowL); R(q.x+(q.w>>1),q.y,1,q.h,o.trim); });
    var dx=-3; R(dx-1,-o.dh-1,8,o.dh+1,o.trim); R(dx,-o.dh,3,o.dh-3,o.doorc); R(dx+3,-o.dh,3,o.dh-3,o.doorc); R(dx,-o.dh,3,1,o.doorL); R(dx+3,-o.dh,3,1,o.doorL); // batwing doors
    R(x0-2,-2,w+4,2,o.stone); }
  var HC_DORF={wall:'#c98a52',wallL:'#e3ad74',wallD:'#8a5630',plank:'#aa7140',planks:3,roof:'#b8402f',roofL:'#d85d44',roofD:'#7a2a1f',trim:'#f3e6c8',glow:'#ffd868',glowL:'#fff3b8',doorc:'#5a3418',doorL:'#7a4a28',stone:'#8e867c'};
  var HC_SALOON={wall:'#b87a45',wallL:'#d99d65',wallD:'#7a4a28',plank:'#9a6234',planks:3,roof:'#6a4426',roofD:'#3c2514',trim:'#f1deb0',sign:'#f2dfa6',signL:'#fff1c6',letters:'#8a3a22',glow:'#ffd868',glowL:'#fff3b8',doorc:'#4a2a14',doorL:'#6a3e20',stone:'#8e867c'};
  // ===== tutorial wall screens: a looping demo of charging the bar (hold = bowl bends + meter fills, release = ball shoots up and breaks a brick) =====
  function tutScreen(x,y,label,kind){ var SW=120, SH=76, t=tick%300, tens=0, held=false, rel=0;
    box(x-3,y-3,SW+6,SH+6,12); box(x-3,y-3,SW+6,1,11); box(x-3,y-3,1,SH+6,11); box(x-3,y+SH+2,SW+6,1,0); box(x+SW+2,y-3,1,SH+6,0); box(x,y,SW,SH,15); box(x+SW/2-10,y+SH+3,20,2,12); box(x+SW/2-16,y+SH+5,32,1,0); // monitor + stand
    txt(label,x+4,y+3,8); txt(L('HOW TO CHARGE'),x+SW-4-L('HOW TO CHARGE').length*4,y+3,11);
    if(t>=40&&t<170){ tens=(t-40)/130; held=true; } else if(t>=170&&t<184){ rel=(t-170)/14; }
    var cxm=x+80, by=y+58, bulge=held?-tens*9:(rel>0?2*(1-rel):0), col=held?(tens>0.7?2:(tens>0.35?4:14)):1, i, u, yy;
    // input icon: mouse (left button lights up) or the space bar (is pressed down)
    if(kind==='m'){ box(x+9,y+24,14,22,11); box(x+10,y+25,12,20,12); box(x+15,y+25,1,8,0); box(x+10,y+33,12,1,0); if(held) box(x+10,y+25,5,8,2); else box(x+10,y+25,5,8,13); }
    else { var pd=held?1:0; box(x+5,y+30+pd,30,9,11); box(x+6,y+31+pd,28,7,held?7:12); txt('SPACE',x+9,y+33+pd,1); box(x+5,y+39,30,1,0); }
    txt(held?L('HOLD'):(t<40?L('AIM'):(t<200?L('LET GO!'):L('BOOM'))),x+6,y+50,held?4:(t<40?11:14));
    // bricks at the top of the demo
    for(i=0;i<5;i++){ var gone=t>=204&&(i===2), bx2=cxm-24+i*11; if(!gone) box(bx2,y+20,9,4,i===2?4:2); else if(t<226) box(bx2+((t-204)>>1)%3,y+20+((t-204)>>2),2,2,4); }
    // bar (bowl while charging, snaps up on release) + ball
    for(i=-30;i<=30;i++){ u=i/30; yy=Math.round(by-bulge*(1-u*u)); box(cxm+i,yy,1,2,col); }
    var ballY=by-4-(bulge<0?-bulge*1:bulge*0.5);
    if(t>=170){ var lt=t-170; if(lt<34){ ballY=by-4-lt*0.95; for(i=1;i<7;i++) box(cxm,ballY+i*3,1,1,(i<4)?1:11); } else ballY=y+30+Math.min(24,(lt-34)*0.6); }
    disc(cxm,Math.round(ballY),2,1); box(cxm-1,Math.round(ballY)-1,1,1,11);
    box(cxm-30,y+SH-7,60,4,12); box(cxm-29,y+SH-6,Math.floor(58*tens),2,col); txt(Math.round(tens*100)+'%',cxm+33,y+SH-7,col); }
  function drawTutScreens(){ g.globalAlpha=0.8; tutScreen(14,86,L('MOUSE'),'m'); tutScreen(166,86,L('KEYBOARD'),'s'); g.globalAlpha=1; }
  function drawLandmark(sc,x,y,k){ g.save(); g.translate(x|0,y|0); g.scale(k,k);
    function R(c,a,b,w,h){ g.fillStyle=qcol(c); g.fillRect(a,b,w,h); }
    function C(c,cx2,cy2,r){ g.fillStyle=qcol(c); for(var yy=-r;yy<=r;yy++){ var xx=Math.round(Math.sqrt(r*r-yy*yy)); g.fillRect(cx2-xx,cy2+yy,xx*2+1,1); } }
    function T(c,cx2,top,hh){ g.fillStyle=qcol(c); for(var r2=0;r2<hh;r2++) g.fillRect(cx2-r2,top+r2,r2*2+1,1); }
    R('rgba(0,0,0,0.3)',-14,-2,30,3); // ground shadow
    var HR=function(dx,dy,w,h,c){ R(c,dx+(HRX||0),dy,w,h); }, HRX=0;
    if(sc==='western'){ saloonArt(HR,Object.assign({w:30,h:16,ph:10,dh:10,win:[{x:-12,y:-12,w:5,h:5},{x:8,y:-12,w:5,h:5}]},HC_SALOON)); }
    else if(sc==='city'){ R('#6a6aa8',-8,-42,14,42); R('#46467a',6,-40,6,40); R('#9a9ad8',-8,-42,14,2); R('#9a9ad8',-1,-48,2,6); for(var wy=-38;wy<-4;wy+=5) for(var wx=-6;wx<4;wx+=4) R((wx+wy)&2?'#ffdd33':'#3a3a66',wx,wy,2,3); R('#e03a3a',-1,-50,2,2); }
    else if(sc==='flight'){ R('#cfd4dc',-3,-32,6,32); R('#8a8f98',3,-30,3,30); R('#e03a3a',-11,-40,22,3); R('#8ad0ff',-10,-37,20,6); R('#4a8ab0',-10,-32,20,1); R('#fff',-1,-48,2,8); R('#e03a3a',-1,-50,2,2); R('#888',-9,-4,18,4); R('#fff',-14,-6,3,2); }
    else if(sc==='dream'){ R('#fff',-16,-8,32,8); R('#e8e0ff',-12,-10,24,2); R('#ffd1f0',-12,-26,7,18); R('#ffd1f0',5,-26,7,18); R('#ffb3de',-4,-32,8,24); T('#ff6ad5',-8,-34,8); T('#ff6ad5',8,-34,8); T('#ff3d9a',0,-42,9); R('#fffb96',-1,-46,1,5); R('#8795e8',-2,-16,4,8); R('#fff',-18,-4,6,4); R('#fff',12,-5,7,5); }
    else if(sc==='forest'){ R('#5a3a1e',-5,-22,10,22); R('#3a2410',2,-22,3,22); C('#2f9a43',0,-30,14); C('#38b04d',-4,-33,9); C('#44c45a',-6,-36,4); R('#2a1a0a',-2,-10,5,10); R('#ffdd66',7,-18,2,3); R('#ffdd66',-9,-24,2,3); }
    else if(sc==='vapor'){ R('#f0e8ff',-16,-4,32,4); R('#d8c8f0',-14,-6,28,2); for(var cc=-12;cc<=8;cc+=7){ R('#f0e8ff',cc,-28,4,22); R('#b9a8d8',cc+3,-28,1,22); R('#fff',cc-1,-30,6,2); } T('#f0e8ff',0,-38,14); R('#ff71ce',-14,-30,28,2); C('#fffb96',0,-34,2); }
    else if(sc==='moon'){ R('#6a7090',-15,-14,30,14); R('#4a5070',9,-14,6,14); R('#7a80a0',-18,-28,9,28); R('#7a80a0',9,-28,9,28); R('#8a90b0',-4,-22,8,22); for(var bx=-18;bx<18;bx+=4) if(bx<-9||bx>7) R('#7a80a0',bx,-31,2,3); R('#ffdd66',-15,-22,2,4); R('#ffdd66',13,-22,2,4); R('#0a0a1a',-2,-8,4,8); T('#e8e8d0',0,-30,3); R('#e8e8d0',0,-34,1,5); }
    else if(sc==='dungeon'){ R('#4a4a52',-13,-30,26,30); R('#363640',9,-30,4,30); for(var by=-28;by<-2;by+=6) R('#2a2a32',-13,by,26,1); for(var bx2=-13;bx2<13;bx2+=6) R('#4a4a52',bx2,-34,4,4); R('#0a0a0a',-5,-14,10,14); C('#0a0a0a',0,-14,5); R('#ffb030',-11,-20,2,4); R('#ff5a1a',-11,-22,2,2); R('#ffb030',9,-20,2,4); R('#ff5a1a',9,-22,2,2); R('#d8d8c8',-1,-26,2,2); }
    else if(sc==='train'){ houseArt(HR,{w:26,h:13,rh:7,ov:1,wall:'#b04a3c',wallL:'#cf6a58',wallD:'#7a2e24',plank:'#8e382c',planks:3,roof:'#5a5e70',roofL:'#747890',roofD:'#383a48',trim:'#e8dcc0',glow:'#ffe070',glowL:'#fff6c0',doorc:'#4a2c14',doorL:'#6a4224',stone:'#8e867c',chim:{x:-9,h:4},win:[{x:-11,y:-10,w:4,h:5},{x:7,y:-10,w:4,h:5},{x:-2,y:-10,w:4,h:3}],door:{x:-2,w:5,h:7}}); }
    else if(sc==='cozy'){ C('#f2e6d0',0,-14,12); R('#f2e6d0',-8,-4,16,4); R('#d8c8a8',4,-22,6,14); R('#f2e6d0',-4,-28,8,4); C('#f2e6d0',0,-30,2); R('#f2e6d0',11,-20,7,3); R('#f2e6d0',-18,-18,3,10); R('#f2e6d0',-16,-18,5,2); R('#f2e6d0',-16,-10,5,2); R('#e07a7a',-4,-14,2,2); R('#e07a7a',3,-12,2,2); R('#e8e0d0',-2,-36,1,3); R('#e8e0d0',2,-38,1,4); }
    else if(sc==='golf'){ HRX=-3; houseArt(HR,{w:24,h:12,rh:7,ov:2,wall:'#f2e6d0',wallL:'#fffaf0',wallD:'#bfb190',plank:'#e0d3b8',planks:4,roof:'#c03a3a',roofL:'#dd5555',roofD:'#7c2222',trim:'#ffffff',glow:'#9ccbf0',glowL:'#d8efff',doorc:'#5a3418',doorL:'#7a4a28',stone:'#9a9080',chim:{x:5,h:4},win:[{x:-9,y:-9,w:4,h:5},{x:4,y:-9,w:4,h:5}],door:{x:-2,w:5,h:8}}); HRX=0; R('#fff',16,-36,1,36); R('#e03a3a',17,-36,8,5); R('#b02a2a',17,-32,8,1); }
    g.restore(); }
  function restyle(){ var sv=seed; seed=bgSeed; renderScene(); seed=sv; }
  // Background sprites: objects with their own canvas that scroll with the world and move rigidly with the parallax of the plane they stand on (base = ground y)
  var bgSprites=[], macSp=null, macDX=0;
  function addSprite(wx,wy,w,h,base,paint){ var c=document.createElement('canvas'); c.width=w; c.height=h; var gs=g; g=c.getContext('2d'); g.translate(-wx,-wy); paint(); g=gs; var sp={c:c,wx:wx,y:wy,base:base,w:w,h:h}; bgSprites.push(sp); return sp; }
  function spr(x,y,w,h,base,fn){ x=Math.floor(x); y=Math.floor(y); return addSprite(x-1,y-1,Math.ceil(w)+3,Math.ceil(h)+3,base,fn); } // sprite with a safety margin
  function paintScene(sc,noLM){ // scene background (also for the world map)
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
    else if(sc==='dream'){ box(0,0,W,H,8); // Dreamland: pastel sky with clouds, stars and pink hills
      for(i=0;i<46;i++) box(rnd()*W,rnd()*H,1,1,rnd()<0.5?1:4);
      for(i=0;i<9;i++){ rnd(); rnd(); rnd(); } // (clouds are separate parallax layers now, see drawClouds)
      var ph2=rnd()*6; for(x=0;x<W;x++){ var hy=H-36+Math.sin(x/23+ph2)*8; box(x,hy,1,H-hy,13); box(x,hy,1,2,1); } }
    else if(sc==='vapor'){ var hz=(H*0.5)|0; // Vaporwave in the style of Floral Shoppe covers: pink-teal sky, checkerboard floor, marble bust, pseudo characters
      var skyC=[13,13,13,10,13,14,14,8,14,8];
      for(y=0;y<hz;y++){ var si2=Math.floor(y/hz*skyC.length); box(0,y,W,1,((y+si2)%3===0&&si2>0)?skyC[si2-1]:skyC[si2]); }
      for(y=hz;y<H;y++){ var dd=(y-hz+3)/(H-hz+3), rowT=Math.floor(8/(dd+0.12)); // checkerboard in perspective
        for(x=0;x<W;x+=2){ var u2=(x-cx)/(dd*34+1), chk=((Math.floor(u2)+rowT)&1)===0; box(x,y,2,1,chk?1:14); } }
      // Retro Mac (pixel art 44x49) instead of marble bust: vaporwave classic in the background
      var mcx=((W*0.3)|0)-22, mcy=hz+10-MAC.rows.length; macX=mcx; macY=mcy;
      macSp=addSprite(mcx,mcy,44,MAC.rows.length,hz+10,function(){ MAC.rows.forEach(function(row,ry){ for(var rx=0;rx<row.length;){ var ch=row[rx]; if(ch==='.'){ rx++; continue; } var e=rx; while(e<row.length&&row[e]===ch) e++; g.fillStyle=MAC.cols[parseInt(ch,16)]; g.fillRect(mcx+rx,mcy+ry,e-rx,1); rx=e; } }); });
      // retro window
      for(i=0;i<2;i++){ var wx2=Math.floor(20+rnd()*(W-90)), wy2=Math.floor(hz+14+rnd()*40); addSprite(wx2-1,wy2-1,44,26,wy2+24,function(){ box(wx2-1,wy2-1,44,26,0); box(wx2,wy2,42,24,1); box(wx2,wy2,42,6,7); box(wx2+36,wy2+1,4,4,2); box(wx2+4,wy2+10,24,2,11); box(wx2+4,wy2+15,16,2,11); }); }
      // palms
      for(i=0;i<2;i++){ var ppx=i?W-18:14, ppy=hz-4; addSprite(ppx-12,ppy-27,30,28,ppy,function(){ box(ppx,ppy-26,2,26,10); for(var k=0;k<6;k++){ box(ppx+k*2,ppy-26+((k*k)>>2),4,1,5); box(ppx-k*2,ppy-26+((k*k)>>2),4,1,5); } }); } }
    else if(sc==='moon'){ // Moonstone: medieval moonlit night with castle, stone circle and fog
      for(y=0;y<H;y++){ var f2=y/H; box(0,y,W,1,f2<0.25?15:(f2<0.55?7:(f2<0.8?9:12))); }
      for(i=0;i<60;i++) box(rnd()*W,rnd()*H*0.6,1,1,rnd()<0.5?1:4);
      var mx0=(W*0.72)|0; disc(mx0,40,22,1); disc(mx0-6,44,4,11); disc(mx0+7,34,3,11); disc(mx0+2,50,2,11);
      for(x=0;x<W;x++){ var hy2=H-46+Math.sin(x/31)*10+Math.sin(x/13)*3; box(x,hy2,1,H-hy2,6); box(x,hy2,1,2,5); }
      spr(18,H-107,40,64,H-44,function(){ box(18,H-100,10,56,15); box(32,H-88,10,44,15); box(46,H-104,12,60,15); for(var i=0;i<4;i++){ box(18+i*3,H-103,2,3,15); box(46+i*3,H-107,2,3,15); } box(21,H-90,3,5,4); box(49,H-96,3,5,4); box(35,H-76,3,5,4); });
      for(i=0;i<5;i++){ var sx=(W*0.3+i*34)|0, sy=(H-50-Math.abs(Math.sin(i*1.3))*8)|0; spr(sx,sy-18,8,22,sy+4,function(){ box(sx,sy-18,8,22,11); box(sx,sy-18,8,2,1); box(sx+2,sy-10,1,1,14); }); }
      for(i=0;i<6;i++){ var fy=H-60+rnd()*50; for(x=0;x<W;x+=3) box(x,fy+Math.sin(x/17+i)*2,3,1,11); } }
    else if(sc==='train'){ var k, row, thz=(H*0.52)|0; box(0,0,W,H,8); // English manor (Croft Manor look): red brick facade with stone quoins, gothic windows, arched oak portal, gravel courtyard, hedges and an obstacle course
      for(i=0;i<(W/60|0);i++){ rnd(); rnd(); rnd(); }
      for(x=0;x<W;x++){ var thy=(thz-26+Math.sin(x/45)*5+Math.sin(x/13)*2)|0; box(x,thy,1,thz-thy,6); }
      var gw=function(wx,wy,ww,wh,lit){ disc(wx+ww/2,wy+ww/2,ww/2+2,11); box(wx-2,wy+ww/2,ww+4,wh-ww/2+4,11); disc(wx+ww/2,wy+ww/2,ww/2,lit?4:12); box(wx,wy+ww/2,ww,wh-ww/2,lit?4:12); if(!lit){ for(var q=0;q<5;q++) box(wx+((q*7)%ww),wy+ww/2+((q*11)%(wh-ww/2)),1,1,7); } box(wx+ww/2-1,wy,2,wh,11); box(wx,wy+(wh*0.55|0),ww,1,11); box(wx-3,wy+wh+3,ww+6,2,11); };
      for(var vx=24;vx<W-200;vx+=420){ var Wf=360; // facade
        box(vx,0,Wf,thz,2); for(row=0;row<thz/5;row++){ var by=row*5; box(vx,by+4,Wf,1,10); for(x=vx+(row%2)*8;x<vx+Wf;x+=16) box(x,by,1,5,10); }
        for(i=0;i<Wf*thz/70;i++){ var bkx=vx+((rnd()*Wf/16)|0)*16+((((i%2)*8)|0)), bky=((rnd()*thz/5)|0)*5; box(bkx+1,bky,15,4,3); }
        box(vx-4,0,Wf+8,5,11); box(vx-4,0,Wf+8,1,1); box(vx-4,5,Wf+8,1,12);
        box(vx,thz-50,Wf,3,11); box(vx,thz-50,Wf,1,1);
        for(var qy=8;qy<thz-10;qy+=14){ var qw=10+(((qy/14)|0)%2)*4; box(vx,qy,qw,10,11); box(vx,qy,qw,1,1); box(vx,qy+9,qw,1,12); box(vx+Wf-qw,qy,qw,10,11); box(vx+Wf-qw,qy,qw,1,1); box(vx+Wf-qw,qy+9,qw,1,12); }
        for(k=0;k<3;k++){ var wl=vx+26+k*46, wr=vx+Wf-26-14-k*46; gw(wl,10,14,28,(k+i)%3===0); gw(wr,10,14,28,(k+i)%3===1); gw(wl,thz-40,14,26,(k+i)%4===1); gw(wr,thz-40,14,26,(k+i)%4===2); }
        var ppx=vx+Wf/2-26; // portal
        disc(ppx+26,thz-50,26,11); box(ppx,thz-50,52,50,11); box(ppx,thz-50,52,1,1); disc(ppx+26,thz-44,18,10); box(ppx+8,thz-44,36,44,10);
        for(k=0;k<36;k+=6) box(ppx+8+k,thz-44,1,44,12); box(ppx+25,thz-44,2,44,0); box(ppx+8,thz-30,36,2,0); box(ppx+8,thz-14,36,2,0); box(ppx+20,thz-22,2,3,4); box(ppx+30,thz-22,2,3,4);
        gw(ppx+12,8,26,40,true); box(ppx-6,thz-3,64,3,11); box(ppx-10,thz-1,72,2,12);
        for(var pt=0;pt<2;pt++){ var ptx=pt?ppx+62:ppx-14; box(ptx,thz-9,8,9,10); box(ptx,thz-9,8,1,1); disc(ptx+4,thz-15,5,5); disc(ptx+4,thz-17,3,6); } }
      box(0,thz,W,H-thz,10); for(i=0;i<W*(H-thz)/6;i++) box(rnd()*W,thz+rnd()*(H-thz),1,1,[11,12,1,11,10][(rnd()*5)|0]); box(0,thz,W,1,12); box(0,thz+1,W,1,11);
      for(i=0;i<(W/46|0);i++){ var hx=Math.floor(rnd()*W), hy=Math.floor(thz+10+rnd()*(H-thz-34)), hw=Math.floor(26+rnd()*30); spr(hx,hy,hw,12,hy+11,function(){ box(hx,hy+2,hw,9,0); box(hx,hy,hw,9,6); box(hx,hy,hw,2,5); for(var k=2;k<hw-2;k+=5) box(hx+k,hy+4+((k*3)%4),2,1,5); }); }
      for(i=0;i<(W/52|0);i++){ var ux=Math.floor(rnd()*W), uy=Math.floor(thz+12+rnd()*(H-thz-36)); spr(ux-1,uy,32,12,uy+12,function(){ box(ux,uy,2,11,12); box(ux+28,uy,2,11,12); box(ux,uy+2,30,2,2); box(ux,uy+6,30,2,1); box(ux-1,uy+11,4,1,0); box(ux+27,uy+11,4,1,0); }); }
      for(i=0;i<(W/70|0);i++){ var gx=Math.floor(rnd()*W), gy=Math.floor(thz+16+rnd()*(H-thz-40)); spr(gx,gy,11,11,gy+10,function(){ box(gx,gy+3,1,7,1); box(gx+9,gy+3,1,7,1); box(gx,gy+2,10,1,2); box(gx+1,gy+1,8,1,2); box(gx+3,gy,4,1,2); }); }
      for(i=0;i<(W/60|0);i++){ var px=Math.floor(rnd()*W), py=Math.floor(thz+12+rnd()*(H-thz-38)); spr(px-6,py-11,14,24,py+12,function(){ box(px,py+4,2,8,10); disc(px+1,py,6,5); disc(px+1,py-1,4,6); disc(px+1,py-7,3,5); }); }
      for(i=0;i<(W/200|0);i++){ var fx=Math.floor(100+rnd()*(W-200)), fy=Math.floor(thz+30+rnd()*(H-thz-70)); spr(fx-16,fy-16,32,32,fy+15,function(){ disc(fx,fy,15,11); disc(fx,fy,13,8); box(fx-1,fy-10,3,10,11); disc(fx,fy-11,3,8); }); }
      for(i=0;i<(W/90|0);i++){ var bx9=Math.floor(rnd()*W), by9=Math.floor(thz+18+rnd()*(H-thz-44)); spr(bx9,by9+6,36,10,by9+15,function(){ box(bx9,by9+7,36,3,10); box(bx9+2,by9+10,2,5,10); box(bx9+32,by9+10,2,5,10); box(bx9,by9+6,36,1,11); }); }
      var hbW=W; spr(0,H-21,hbW,21,H,function(){ box(0,H-18,hbW,18,6); for(var x=0;x<hbW;x+=6) box(x,H-21,5,4,5); box(0,H-18,hbW,1,0); }); }
    else if(sc==='golf'){ box(0,0,W,H,8); // Golf course: sky, hills, mowed stripes, bunker, pond, flags
      for(i=0;i<5;i++){ rnd(); rnd(); rnd(); }
      for(x=0;x<W;x++){ var hy3=(H*0.42+Math.sin(x/37)*9+Math.sin(x/15)*3)|0; box(x,hy3,1,H-hy3,6); }
      for(x=0;x<W;x++){ var hy4=(H*0.55+Math.sin(x/53+1)*7)|0; box(x,hy4,1,H-hy4,5); }
      for(x=0;x<W;x+=16) box(x,(H*0.6)|0,8,H,6);
      for(i=0;i<3;i++){ var bxs=20+rnd()*(W-70), bys=H*0.62+rnd()*H*0.25; disc(bxs,bys,9,4); disc(bxs,bys,7,3); }
      var pxl=W*(0.15+rnd()*0.6), pyl=H*0.78; disc(pxl,pyl,16,14); disc(pxl,pyl,13,8);
      for(i=0;i<3;i++){ var fxl=Math.floor(30+rnd()*(W-60)), fyl=Math.floor(H*0.5+rnd()*H*0.3); spr(fxl,fyl-14,8,16,fyl+2,function(){ box(fxl,fyl-14,1,16,1); box(fxl+1,fyl-14,6,4,2); }); } }
    else if(sc==='cozy'){ // Tea room: striped wallpaper, fireplace, window, shelf with teacups, string lights
      var k; box(0,0,W,H,13); for(x=0;x<W;x+=14) box(x,0,2,H-36,1);
      for(y=14;y<H-40;y+=14) for(x=7;x<W;x+=14) box(x,y,2,2,2);
      box(0,H-34,W,34,10); for(y=H-34;y<H;y+=9) box(0,y,W,1,0);
      for(y=H-34,k=0;y<H;y+=9,k++) for(x=(k%2)*20;x<W;x+=40) box(x,y,1,9,0);
      box(0,H-36,W,2,1);
      box(100,H-26,110,18,2); box(102,H-24,106,14,1); box(104,H-22,102,10,13); for(x=108;x<204;x+=8) box(x,H-18,3,2,2);   // rug
      var fx=16, fy=H-104;   // fireplace
      box(fx-6,fy,82,8,10); box(fx-6,fy,82,1,1);
      box(fx,fy+8,70,62,2); for(y=fy+8;y<fy+70;y+=6){ box(fx,y,70,1,0); for(x=fx+(((y-fy)/6|0)%2)*7;x<fx+70;x+=14) box(x,y,1,6,0); }
      box(fx+14,fy+24,42,46,0); box(fx+16,fy+26,38,44,15); box(fx+20,fy+62,30,6,10); box(fx+20,fy+62,30,1,3); box(fx+24,fy+60,22,2,3);
      box(fx+4,fy-10,3,10,1); box(fx+5,fy-12,1,2,4); box(fx+64,fy-10,3,10,1); box(fx+65,fy-12,1,2,4);   // candles
      box(fx+30,fy-7,8,7,1); box(fx+31,fy-6,6,2,10); box(fx+38,fy-6,3,1,1); box(fx+40,fy-6,1,4,1); box(fx+38,fy-3,3,1,1); box(fx+29,fy-1,10,1,11);   // cup on the mantel
      box(fx+6,fy+8,6,12,5); box(fx+6,fy+8,6,3,1); box(fx+56,fy+8,6,12,5); box(fx+56,fy+8,6,3,1);   // stockings
      var wx=W-78, wy=26;   // window
      box(wx-12,wy-6,76,2,4); box(wx,wy,56,64,10); box(wx+3,wy+3,50,58,15);
      for(i=0;i<12;i++) box(wx+4+rnd()*48,wy+4+rnd()*30,1,1,1);
      disc(wx+40,wy+16,6,4); disc(wx+43,wy+14,5,15);
      for(i=0;i<16;i++) box(wx+4+rnd()*48,wy+30+rnd()*30,1,1,1);
      box(wx+27,wy+3,2,58,10); box(wx+3,wy+31,50,2,10); box(wx-3,wy+64,62,4,10);
      box(wx-8,wy-4,10,76,2); box(wx+54,wy-4,10,76,2); for(y=wy;y<wy+70;y+=6){ box(wx-6,y,1,4,0); box(wx+57,y,1,4,0); }
      var sx=104, sy=70; box(sx,sy,80,3,10);   // shelf with teacups and teapot
      for(i=0;i<3;i++){ var cx3=sx+6+i*19; box(cx3,sy-8,8,8,1); box(cx3+1,sy-7,6,2,[2,3,14][i]); box(cx3+8,sy-6,3,1,1); box(cx3+10,sy-6,1,4,1); box(cx3+8,sy-3,3,1,1); box(cx3-1,sy-1,10,1,11); }
      disc(sx+68,sy-7,7,1); box(sx+75,sy-9,3,1,1); box(sx+77,sy-9,1,6,1); box(sx+60,sy-10,4,1,1); box(sx+61,sy-12,3,3,1); box(sx+66,sy-16,5,2,2); box(sx+67,sy-18,3,2,2); box(sx+62,sy-7,6,2,13);
      box(60,34,26,20,10); box(62,36,22,16,1); heartPx(73,45,3,2);   // picture frame
      for(x=0;x<W;x+=6){ var ly=8+Math.sin(x/W*Math.PI*4)*4; box(x,ly,6,1,12); box(x+2,ly+1,2,3,[4,2,14,3,9][((x/6)|0)%5]); } }
    else if(sc==='dungeon'){ box(0,0,W,H,12); // Hero dungeon: tiled floor, doors, torches, bones
      for(x=0;x<W;x+=24) for(y=0;y<H;y+=24){ box(x,y,24,24,((x/24+y/24)&1)?12:15); box(x,y,24,1,0); box(x,y,1,24,0); }
      for(i=0;i<22;i++){ var cx2=rnd()*W, cy2=rnd()*H; box(cx2,cy2,6,1,0); box(cx2+5,cy2,1,4,0); }
      for(i=0;i<3;i++){ var dx3=((rnd()*(W/24))|0)*24, dy3=((rnd()*(H/24))|0)*24; box(dx3+3,dy3+3,18,18,10); box(dx3+3,dy3+3,18,2,0); box(dx3+15,dy3+12,2,2,4); }
      for(i=0;i<8;i++){ var tx3=rnd()*W, ty3=rnd()*H; box(tx3,ty3,2,6,10); box(tx3-1,ty3-4,4,4,3); box(tx3,ty3-5,2,3,4); }
      for(i=0;i<14;i++){ var bx3=rnd()*W, by3=rnd()*H; box(bx3,by3,5,1,1); box(bx3-1,by3-1,2,3,1); box(bx3+4,by3-1,2,3,1); } }
    else if(sc==='forest'){ box(0,0,W,H,6); // Adventure forest: grass, stone path, pond, treetops
      for(i=0;i<W*H/26;i++) box(rnd()*W,rnd()*H,1,1,rnd()<0.6?5:12);
      var py2=60+rnd()*90; for(x=0;x<W;x+=2) box(x,py2+Math.sin(x/19)*10,2,14,10);
      for(i=0;i<34;i++) box(rnd()*W,py2-10+rnd()*34,2,2,11);
      var qx=30+rnd()*(W-60), qy=H-50-rnd()*30; disc(qx|0,qy|0,16,7); disc((qx+4)|0,(qy+2)|0,9,8);
      for(i=0;i<16;i++){ var tx=rnd()*W, ty=rnd()*H; disc(tx|0,ty|0,9,15); disc(tx|0,ty|0,8,6); disc((tx-2)|0,(ty-2)|0,5,5); } }
    else if(sc==='flight'){ box(0,0,W,H,5);
      for(x=0;x<W;x+=24) for(y=0;y<H;y+=24){ var cc=[5,6,10,5,6][(rnd()*5)|0]; box(x,y,24,24,cc); for(i=0;i<24;i+=3) box(x,y+i,24,1,cc===10?3:(cc===6?5:6)); box(x,y,24,1,15); box(x,y,1,24,15); }
      var rx=W*(0.2+rnd()*0.6), ph=rnd()*6; for(y=0;y<H;y++) box(rx+Math.sin(y/18+ph)*W*0.12,y,7,1,8);
      var px0=20+rnd()*(W-60); box(px0,20,12,H-60,12); for(y=26;y<H-44;y+=10) box(px0+5,y,2,5,1); }
    if(!noLM) drawLandmark(sc,W-42,(H*0.6)|0,0.9); // cluster landmark as backdrop (renderScene paints it separately so parallax does not shear it)
  }
  function renderScene(){ // pre-render the background once per round
    // wide world: the background is painted BGW wide once per scene (same seed for all its stages); every stage shows its own slice of it
    var oW=W, g0=g, sSeed=seed, sh0=0; for(var hi0=0;hi0<scene.length;hi0++) sh0=(sh0*31+scene.charCodeAt(hi0))>>>0;
    var wc=renderScene.wc||(renderScene.wc=document.createElement('canvas')); wc.width=BGW; wc.height=H; seed=((WORLDSEED^sh0)>>>0)||1; W=BGW; g=wc.getContext('2d'); bgSprites=[]; macSp=null; paintScene(scene,true); W=oW; seed=sSeed;
    var LA=tut?TUT:LEVELS, ti0=tut?tut-1:(lvNum()-1)%LEVELS.length, ts0=ti0; while(ts0>0&&LA[ts0-1].scene===LA[ti0].scene) ts0--; var tn0=0; while(ts0+tn0<LA.length&&LA[ts0+tn0].scene===LA[ti0].scene) tn0++;
    bgOff=tn0>1?Math.round((ti0-ts0)*(BGW-W)/(tn0-1)):0; if(macX!==undefined){ macX-=bgOff; if(macX<-40||macX>W) macX=undefined; }
    // tone the scene down: desaturate + darken so game objects stand out clearly (on the wide canvas, so it can be panned later)
    g=wc.getContext('2d'); g.globalCompositeOperation='saturation'; g.fillStyle='rgba(128,128,128,0.5)'; g.fillRect(0,0,BGW,H); g.globalCompositeOperation='source-over';
    var dkC=scene==='cozy'?'rgba(48,18,10,0.42)':scene==='moon'?'rgba(6,8,20,0.6)':scene==='dungeon'?'rgba(8,6,6,0.66)':scene==='vapor'?'rgba(8,4,24,0.62)':scene==='dream'?'rgba(8,16,24,0.58)':(scene==='forest'?'rgba(6,14,18,0.68)':'rgba(8,16,24,0.74)'); dkC=dkC.replace(/([\d.]+)\)$/,function(m,a){ return (+a*0.8).toFixed(3)+')'; }); /* a bit lighter overall */ g.fillStyle=dkC; g.fillRect(0,0,BGW,H);
    bgc.width=W; bgc.height=H; g=bgc.getContext('2d'); g.drawImage(wc,-bgOff,0);
    var vg=g.createRadialGradient(W/2,H/2,H*0.35,W/2,H/2,H*0.85); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.35)'); g.fillStyle=vg; g.fillRect(0,0,W,H);
    bgSprites.forEach(function(sp){ var gq=sp.c.getContext('2d'); gq.globalCompositeOperation='source-atop'; gq.fillStyle='rgba(128,128,128,0.5)'; gq.fillRect(0,0,sp.w,sp.h); gq.fillStyle=dkC; gq.fillRect(0,0,sp.w,sp.h); gq.globalCompositeOperation='source-over'; }); bgc.sp=bgSprites; bgc.spOff=bgOff; // sprites toned like the background
    var lc=bgc.lm||(bgc.lm=document.createElement('canvas')); lc.width=W; lc.height=H; var gl=lc.getContext('2d'); g=gl; drawLandmark(scene,W-42,(H*0.6)|0,0.9); // landmark on its own layer, toned like the background
    gl.globalCompositeOperation='source-atop'; gl.fillStyle='rgba(128,128,128,0.35)'; gl.fillRect(0,0,W,H); gl.fillStyle=dkC; gl.fillRect(0,0,W,H); gl.globalCompositeOperation='source-over';
    g=g0; }
  // ===== PSX graphics mode: game objects are flat-shaded low-poly meshes with vertex jitter (no pixel sprites) =====
  var psxOn=false;
  function psxShade(hx,f){ var n=parseInt(String(hx).slice(1),16), r=(n>>16)&255, gg=(n>>8)&255, b=n&255; function q(v){ v=f<0?v*(1+f):v+(255-v)*f; return Math.max(0,Math.min(255,Math.round(v))); } return 'rgb('+q(r)+','+q(gg)+','+q(b)+')'; }
  function psxW(x,y){ return [x,y]; } // vertices stay put: no wobble (flat-shaded low-poly look only)
  function psxTri(a,b,c,col){ var P=[a,b,c].sort(function(u,v){ return u[1]-v[1]; }), y0=Math.round(P[0][1]), y2=Math.round(P[2][1]); g.fillStyle=col; if(P[2][1]===P[0][1]){ g.fillRect(Math.round(Math.min(a[0],b[0],c[0])),y0,Math.max(1,Math.round(Math.max(a[0],b[0],c[0])-Math.min(a[0],b[0],c[0]))),1); return; }
    for(var y=y0;y<=y2;y++){ var yy=Math.max(P[0][1],Math.min(P[2][1],y+0.5)), xa=P[0][0]+(P[2][0]-P[0][0])*(yy-P[0][1])/(P[2][1]-P[0][1]), xb;
      if(yy<P[1][1]||P[2][1]===P[1][1]) xb=P[1][1]===P[0][1]?P[1][0]:P[0][0]+(P[1][0]-P[0][0])*(yy-P[0][1])/(P[1][1]-P[0][1]); else xb=P[1][0]+(P[2][0]-P[1][0])*(yy-P[1][1])/(P[2][1]-P[1][1]);
      var xl=Math.floor(Math.min(xa,xb)), xr=Math.ceil(Math.max(xa,xb)); g.fillRect(xl,y,Math.max(1,xr-xl),1); } }
  function psxQuad(a,b,c,d,col){ psxTri(a,b,c,col); psxTri(a,c,d,col); }
  function psxPrism(x,y,w,h,col,d){ var A=psxW(x,y), B=psxW(x+w,y), Cc=psxW(x+w,y+h), D=psxW(x,y+h), A2=psxW(x+d,y-d), B2=psxW(x+w+d,y-d), C2=psxW(x+w+d,y+h-d), hx=C[col]||'#888888';
    psxQuad(A,B,B2,A2,psxShade(hx,0.35)); psxQuad(B,Cc,C2,B2,psxShade(hx,-0.4)); psxQuad(A,B,Cc,D,hx); } // top (lit), right side (shadow), front face
  function psxGem(x,y,r,col,rot){ var seg=r>=9?10:(r>=5?8:6), hx=C[col]||'#888888', i, V=[], VO=[], ctr=psxW(x-r*0.25,y-r*0.3), cen=psxW(x,y);
    for(i=0;i<seg;i++){ var an=rot+i*6.2832/seg; V.push(psxW(Math.round(x+Math.cos(an)*r),Math.round(y+Math.sin(an)*r))); VO.push(psxW(Math.round(x+Math.cos(an)*(r+1.2)),Math.round(y+Math.sin(an)*(r+1.2)))); }
    for(i=0;i<seg;i++) psxTri(cen,VO[i],VO[(i+1)%seg],'#000'); // dark outline mesh
    for(i=0;i<seg;i++){ var am=rot+(i+0.5)*6.2832/seg, f=0.42*Math.cos(am+2.36)-0.12; psxTri(ctr,V[i],V[(i+1)%seg],psxShade(hx,f)); } } // each facet lit by its own angle
  function psxBrick(b){ var d=b.h>=7?2:1; if(b.hp>1){ psxPrism(b.x,b.y,b.w,b.h,b.fl>0?1:(b.hp>2?4:11),d); if(b.h>=4&&b.w>=4) psxQuad(psxW(b.x+1,b.y+1),psxW(b.x+b.w-1,b.y+1),psxW(b.x+b.w-1,b.y+b.h-1),psxW(b.x+1,b.y+b.h-1),C[b.fl>0?1:b.c]); } else psxPrism(b.x,b.y,b.w,b.h,b.fl>0?1:b.c,d); }
  function psxBumper(b){ var f=b.flash>0; if(f) b.flash--; var r=b.r; psxGem(b.x|0,b.y|0,r,f?1:(b.gild?4:(r>=9?2:(r>=6?3:5))),0.3); }
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
      if(r>=9){ disc(x,y,r+1,0); for(var rr=r;rr>1;rr-=2) disc(x,y,rr,f?4:((rr>>1)%2?1:13)); box(x-1,y+r+1,2,4,12); }   // lollipop with spiral
      else if(r>=6){ for(i=-1;i<=1;i+=2){} box(x-1,y-r-1,3,2*r+3,0); box(x-r-1,y-1,2*r+3,3,0); for(i=0;i<=r*0.7;i++){ box(x+i-1,y+i-1,3,3,0); box(x-i-1,y+i-1,3,3,0); box(x+i-1,y-i-1,3,3,0); box(x-i-1,y-i-1,3,3,0); }
        box(x-1,y-r,3,2*r+1,f?1:4); box(x-r,y-1,2*r+1,3,f?1:4); for(i=0;i<=r*0.7;i++){ box(x+i,y+i,2,2,f?1:4); box(x-i,y+i,2,2,f?1:4); box(x+i,y-i,2,2,f?1:4); box(x-i,y-i,2,2,f?1:4); } box(x-1,y-1,3,3,3); }   // star
      else { box(x-1,y-r-1,3,2*r+3,0); box(x-r-1,y-1,2*r+3,3,0); box(x-1,y-r,3,2*r+1,f?4:14); box(x-r,y-1,2*r+1,3,f?4:14); box(x,y,1,1,1); } }   // sparkle
    else if(scene==='vapor'){
      if(r>=9){ disc(x,y,r+1,0); disc(x,y,r,f?4:12); for(var yy=-r+1;yy<r;yy+=3) for(var xx=-r+1;xx<r;xx+=3) if(xx*xx+yy*yy<(r-1)*(r-1)) box(x+xx,y+yy,3,3,f?1:(((xx+yy)/3|0)%2?14:13)); box(x-3,y-r+2,2,2,1); }   // disco ball
      else if(r>=6){ box(x-r-1,y-(r>>1)-2,2*r+3,r+5,0); box(x-r,y-(r>>1)-1,2*r+1,r+3,f?4:13); box(x-r+2,y-(r>>1)+1,2*r-3,r-1,15); disc(x-(r>>1),y,1,1); disc(x+(r>>1),y,1,1); box(x-r,y+(r>>1)+1,2*r+1,1,f?1:14); }   // cassette
      else { for(i=0;i<=r;i++){ box(x-i,y-r+i*2-1,2*i+1,1,0); } for(i=0;i<=r;i++){ box(x-i,y-r+i*2,2*i+1,1,f?4:14); } box(x-1,y,2,1,1); } }   // triangle
    else if(scene==='moon'){
      if(r>=9){ box(x-r,y-r+2,2*r,2*r-2,0); box(x-r+1,y-r+3,2*r-2,2*r-3,f?4:11); disc(x,y-r+3,r-1,f?4:11); box(x-1,y-3,3,7,f?1:14); box(x-3,y-1,7,2,f?1:14); }   // rune stone
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:7); box(x-1,y-r+1,3,2*r-1,f?1:4); box(x-r+1,y-1,2*r-1,3,f?1:4); disc(x,y,2,f?4:1); }   // shield with cross
      else { for(i=-r-1;i<=r+1;i++){ var wm=r+1-Math.abs(i); box(x-wm,y+i,2*wm+1,1,0); } for(i=-r;i<=r;i++){ var wm2=r-Math.abs(i); box(x-wm2,y+i,2*wm2+1,1,f?4:1); } } }   // moon crystal
    else if(scene==='cozy'){
      if(r>=9){ box(x-r-3,y-4,3,8,0); box(x-r-2,y-3,2,6,f?4:1); box(x+r,y-5,4,3,0); box(x+r+3,y-8,2,4,0); box(x+r+1,y-4,3,1,f?4:1); disc(x,y,r+1,0); disc(x,y,r,f?4:1); box(x-r+2,y-1,2*r-3,2,f?3:13); box(x-4,y-r-2,9,3,0); box(x-3,y-r-1,7,1,f?1:2); box(x-1,y-r-4,3,2,0); }   // teapot
      else if(r>=6){ box(x-r,y-r+2,2*r,2*r-3,0); box(x-r+1,y-r+3,2*r-2,2*r-5,f?4:1); box(x-r+1,y-r+3,2*r-2,3,f?3:10); box(x+r,y-2,3,5,0); box(x+r+1,y-1,1,3,f?4:1); box(x-r-2,y+r-2,2*r+5,2,0); box(x-r-1,y+r-2,2*r+3,1,f?1:13); box(x-1,y-r,1,2,f?1:11); }   // teacup
      else { var hs=Math.max(2,(r/2)|0); heartPx(x,y,hs+1,0); heartPx(x,y,hs,f?4:2); box(x-hs,y-hs-1,1,1,1); } }   // heart
    else if(scene==='dungeon'){
      if(r>=9){ box(x-r-1,y-r+1,2*r+2,2*r,0); box(x-r,y-r+2,2*r,2*r-2,f?4:10); box(x-r,y-r+2,2*r,4,f?1:3); box(x-2,y-1,5,5,f?1:4); box(x,y,1,2,0); }   // chest
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:1); box(x-r+2,y-1,3,3,0); box(x+r-4,y-1,3,3,0); box(x-1,y+2,3,2,0); box(x-r+2,y+r-2,2*r-3,2,f?3:11); }   // skull
      else { box(x-1,y-1,3,r+2,0); box(x,y,1,r,10); disc(x,y-r+1,2,f?1:3); box(x,y-r-2,1,2,4); } }   // torch
    else if(scene==='forest'){
      if(r>=9){ disc(x,y,r+1,0); disc(x,y,r,f?4:5); disc(x-(r/3|0),y-(r/3|0),(r/2)|0,f?1:6); disc(x+(r/3|0),y+(r/3|0),(r/3)|0,f?4:14); box(x-1,y-1,3,3,10); }   // tree
      else if(r>=6){ disc(x,y,r+1,0); disc(x,y,r,f?4:11); disc(x-1,y-1,r-2,f?1:12); box(x-2,y,2,1,0); box(x,y+1,3,1,0); box(x+1,y-2,1,3,0); }   // rock
      else { for(i=-r-1;i<=r+1;i++){ var wd=r+1-Math.abs(i); box(x-wd,y+i,2*wd+1,1,0); } for(i=-r;i<=r;i++){ var wd2=r-Math.abs(i); box(x-wd2,y+i,2*wd2+1,1,f?4:14); } box(x-1,y-1,2,2,1); } }   // crystal
    else {
      if(r>=9){ disc(x+2,y+3,r,11); disc(x,y,r,f?4:1); disc(x-(r*0.6|0),y+(r*0.3|0),(r*0.6)|0,f?4:1); disc(x+(r*0.6|0),y+(r*0.25|0),(r*0.6)|0,f?4:1); }
      else if(r>=6){ box(x-r,y-1,2*r+1,3,f?4:2); box(x-1,y-r,3,2*r+1,f?4:1); box(x-3,y+r-2,7,2,f?4:2); box(x-1,y-1,3,3,0); }
      else { disc(x,y,r,f?4:2); box(x-1,y-r,1,2*r,f?1:4); box(x-1,y+r,3,2,10); } } }

  function heartPx(x,y,s,c){ disc(x-s,y-s,s,c); disc(x+s,y-s,s,c); for(var j=0;j<=2*s;j++) box(x-(2*s-j),y-s+j,2*(2*s-j)+1,1,c); } // pixel heart (point down)
  function rnd(){ seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; }
  function segDist(g2,x,y){ var dx=g2.x2-g2.x1, dy=g2.y2-g2.y1, l=dx*dx+dy*dy||1, t=Math.max(0,Math.min(1,((x-g2.x1)*dx+(y-g2.y1)*dy)/l)); return Math.hypot(x-g2.x1-dx*t,y-g2.y1-dy*t); }
  function layout(){ // procedural playfield, different every round and width-dependent
    cx=W/2; bumpers=[]; holes=[]; blocks=[]; seed=(Math.imul(W,7919)+Math.imul(lvNum(),104729)+Math.imul(seedN,0)+1)>>>0;
    var n=((mode==='golf'||LV().scene==='golf')&&!LV().boss)?Math.max(3,Math.round(W/53)):0;
    var hyA=mode==='breakout'?104:28, hyB=mode==='breakout'?116:20; // breakout: holes + flags sit below the brick wall instead of inside it
    for(var i=0;i<n;i++) holes.push({x:8+(i+0.5)*(W-16)/n, y:(i%2===0||n===3&&i===2)?hyA:hyB, r:6});
    if(n===3){ holes[0].y=hyA; holes[1].y=hyB; holes[2].y=hyA; }
    var gx=cx-40; guides=[]; // varied trampolines instead of diagonals
    function holeHit(x1,y1,x2,y2){ for(var t=0;t<=6;t++){ var sx=x1+(x2-x1)*t/6, sy=y1+(y2-y1)*t/6; for(var hh=0;hh<holes.length;hh++){ var h=holes[hh]; if(Math.abs(sx-h.x)<h.r+9&&sy>h.y-21&&sy<h.y+h.r+5) return true; } } return false; }
    function pad(x1,y1,x2,y2,rest,c,chg,hp){ if(guides.length>=4&&holes.length&&holeHit(x1,y1,x2,y2)){ // trampolines must not cross holes or flag poles: try to slide the piece aside
        var found=false, ox=[0,26,-26,52,-52,78,-78], oy=[0,24,-24,48], ia, ib; for(ib=0;ib<oy.length&&!found;ib++) for(ia=0;ia<ox.length&&!found;ia++){ var nx1=x1+ox[ia], nx2=x2+ox[ia], ny1=y1+oy[ib], ny2=y2+oy[ib]; if(Math.min(nx1,nx2)<12||Math.max(nx1,nx2)>W-12||Math.min(ny1,ny2)<40||Math.max(ny1,ny2)>150) continue; if(!holeHit(nx1,ny1,nx2,ny2)){ x1=nx1; x2=nx2; y1=ny1; y2=ny2; found=true; } }
        if(!found) return; }
      guides.push({x1:x1,y1:y1,x2:x2,y2:y2,rest:rest,c:c,chg:chg||0,flash:0,hp:hp||999,hp0:hp||999}); }
    pad(6,200,gx-4,200,1.7,14,1); pad(W-6,200,W-gx+4,200,1.7,14,1);   // floor pools (temporary)
    pad(gx-28,160,gx-8,188,1.4,2,0.35); pad(W-gx+28,160,W-gx+8,188,1.4,2,0.35); guides[0].pool=guides[1].pool=true; pw.T=900+300*poolU; applySling(); // red rails = buyable upgrade
    var np=tut?TUT[tut-1].np:Math.max(1,Math.round(W/160));
    for(var q=0;q<np;q++){ var px=20+(q+0.2+rnd()*0.6)*(W-40)/np, py=70+rnd()*80, ln=7+rnd()*17,
        a=rnd()<0.25?(rnd()<0.5?-1:1)*(1.1+rnd()*0.4):(rnd()-0.5)*1.8;
      if(Math.abs(a)<0.35) a=a<0?-0.35:0.35; // no almost flat trampolines (they look like stray lines)
      pad(px-ln*Math.cos(a),py-ln*Math.sin(a),px+ln*Math.cos(a),py+ln*Math.sin(a),1.2+rnd()*0.4,3,0.15,3); }
    // bumpers: irregularly distributed, different sizes, sometimes with satellites
    var want=tut?TUT[tut-1].nb:Math.max(2,Math.round(LV().b*W/220*0.6*(mode==='breakout'?({26:1.7,18:1.45,12:1.2,8:1.2,6:1.45}[brickSz().w]||1.2):1))), radii=[5,6,6,7,9,9,12], ymin=mode==='breakout'?46:46, ymaxO=mode==='breakout'?142:168; // breakout: obstacles may reach into the brick wall
    scene=bgFor(LV().scene); // dev setting / shipped setting: a stage cluster can get another background
    function okAt(x,y,r,skip){
      if(x<18+r||x>W-18-r||y<ymin+r||y>ymaxO-r) return false;
      if(y>150&&Math.abs(x-cx)<16) return false;
      for(var kh2=0;kh2<holes.length;kh2++) if(Math.hypot(holes[kh2].x-x,holes[kh2].y-y)<r+16||(Math.abs(holes[kh2].x-x)<r+8&&y<holes[kh2].y&&y>holes[kh2].y-18-r)) return false; // keep holes and flags free
      for(var k=0;k<bumpers.length;k++) if(bumpers[k]!==skip&&Math.hypot(bumpers[k].x-x,bumpers[k].y-y)<bumpers[k].rr+r+9) return false;
      for(var k2=4;k2<guides.length;k2++) if(segDist(guides[k2],x,y)<r+8) return false;
      for(var kb=0;kb<blocks.length;kb++){ var o=blocks[kb], ddx=Math.max(o.x-x,0,x-o.x-o.w), ddy=Math.max(o.y-y,0,y-o.y-o.h); if(Math.hypot(ddx,ddy)<r+8) return false; }
      return true; }
    // --- bounce paths (trampoline chains), multi-hit blocks, bumper groups ---
    var LVd=LV(); boss=LVd.boss?makeBoss(LVd.scene):null; bshots=[]; stunT=0;
    function placePath(kind){ var n=6, step=kind==='stairs'?20:(kind==='arch'?16:18), span=step*(n-1), pts=[], dirx=rnd()<0.5?1:-1;
      var x0=24+rnd()*Math.max(1,W-48-span), y0={stairs:150,arch:135,wave:112,zigzag:105}[kind]||120;
      for(var i=0;i<n;i++){ var px=x0+i*step, py;
        if(kind==='stairs') py=y0-i*10; else if(kind==='arch') py=y0-Math.sin(i/(n-1)*Math.PI)*26; else if(kind==='wave') py=y0+Math.sin(i*1.1)*10; else py=y0+(i%2?-12:12);
        pts.push([dirx>0?px:W-px,py]); }
      for(var j=0;j<n;j++){ var p0=pts[j], p1=pts[Math.min(n-1,j+1)], pm=pts[Math.max(0,j-1)];
        var aa=Math.atan((p1[1]-pm[1])/((p1[0]-pm[0])||1))*0.6; // pad tilts in running direction: steers the ball to the next one
        pad(p0[0]-6*Math.cos(aa),p0[1]-6*Math.sin(aa),p0[0]+6*Math.cos(aa),p0[1]+6*Math.sin(aa),1.25,3,0.1,3); } }
    var SH={bar:[[0,0],[1,0],[2,0],[3,0]],stairs:[[0,2],[1,1],[2,0]],T:[[0,0],[1,0],[2,0],[1,1],[1,2]],L:[[0,0],[0,1],[0,2],[1,2],[2,2]],cross:[[1,0],[0,1],[1,1],[2,1],[1,2]],arch:[[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[3,1],[3,2]]};
    function placeBlocks(kind){ var cells=SH[kind], mw=0, mh=0; cells.forEach(function(c){ mw=Math.max(mw,c[0]+1); mh=Math.max(mh,c[1]+1); });
      var bw=mw*10, bh=mh*6;
      for(var t=0;t<40;t++){ var bx=24+rnd()*Math.max(1,W-48-bw), by=ymin+6+rnd()*Math.max(1,(mode==='breakout'?128:140)-ymin-bh), ok=true;
        for(var k=4;ok&&k<guides.length;k++) if(segDist(guides[k],bx+bw/2,by+bh/2)<Math.max(bw,bh)/2+6) ok=false;
        for(var k3=0;ok&&k3<blocks.length;k3++){ var o=blocks[k3]; if(bx<o.x+o.w+10&&bx+bw>o.x-10&&by<o.y+o.h+10&&by+bh>o.y-10) ok=false; }
        for(var kh3=0;ok&&kh3<holes.length;kh3++){ var ho=holes[kh3]; if(bx<ho.x+ho.r+10&&bx+bw>ho.x-ho.r-10&&by<ho.y+ho.r+8&&by+bh>ho.y-20) ok=false; }
        if(!ok) continue;
        cells.forEach(function(c,i){ var hp=2+(i%3===0?1:0); blocks.push({x:bx+c[0]*10,y:by+c[1]*6,w:10,h:6,hp:hp,hp0:hp,fl:0}); }); return; } }
    function mkB(x,y,r){ var hp=r>=9?3:(r>=6?2:1); return {x:x,y:y,r:r,rr:r,mv:false,hx:x,hy:y,dx:0,dy:0,ph:0,sp:0,flash:0,gild:rnd()<0.7,go:(rnd()*360)|0,hp:hp,hp0:hp,pts:r>=9?150:(r>=6?80:40)}; }
    function placeCluster(kind){ var mem=kind==='ring'?[[0,0,9]].concat([0,1,2,3,4,5].map(function(i){ return [Math.cos(i*1.047)*20,Math.sin(i*1.047)*20,3]; })):[[0,0,6],[-12,0,4],[12,0,4],[0,-12,4],[0,12,4]];
      var R0=kind==='ring'?26:18;
      for(var t=0;t<40;t++){ var x=24+R0+rnd()*Math.max(1,W-48-2*R0), y=ymin+R0+rnd()*Math.max(1,(mode==='breakout'?ymaxO+10:160)-ymin-2*R0), ok=true;
        for(var k=0;ok&&k<mem.length;k++) if(!okAt(x+mem[k][0],y+mem[k][1],mem[k][2])) ok=false;
        if(!ok) continue; mem.forEach(function(m){ bumpers.push(mkB(x+m[0],y+m[1],m[2])); }); return; } }
    if(LVd.path&&LVd.sh.length<2) placePath(LVd.path);
    LVd.sh.slice(0,2).forEach(function(k){ if(SH[k]) placeBlocks(k); else placeCluster(k); });
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
    makeBricks(); makeStickies(); placeSecrets();
    // seesaw bar: two halves around a shared pivot, rock up left/right
    fl=[{px:cx,py:200,len:60,dir:-1,a:0,rest:0,up:0,av:0}]; // one bar, hinge at the opposite end
    place();
  }
  var aimKey=false, aimMx=0, aimMy=0, barVel=0, coPrev=0, bulge=0, bulgePrev=0, bv=0, curB=0, tw=0, barSide='l', tiltPrev=0, tilt=0, chSide='l', chV=0, chS=0, ocM=0, ocT=0, ocLast=0, ocTk=0, strikeT=0, strikeP=0, strikeDir=1, swingP=0, capB=0, wasHeld=false;
  function place(){ var lim=Math.max(0,cx-fl[0].len/2-6); co=Math.max(-lim,Math.min(lim,co)); var c=cx+co;
    var hl=fl[0].len/2; fl[0].px=c; fl[0].dir=barSide==='l'?-1:1;
    guides[0].x2=c-hl-2; guides[1].x2=c+hl+2; // pools reach right up to the bar end
    var ext=sling>=3?10:0; guides[2].x1=c-hl-30-ext; guides[2].x2=c-hl-2; guides[2].y2=200; guides[3].x1=c+hl+30+ext; guides[3].x2=c+hl+2; guides[3].y2=200; } // red rails end flush with the bar end
  // brick wall shapes per level
  function brickOn(pat,i,j,cols,rows){ var u=(i+0.5)/cols, v=(j+0.5)/rows, x,y, pp=String(pat).split('+');
    if(pp.length===2){ var hh=Math.ceil(rows/2); return j<hh?brickOn(pp[0],i,j,cols,hh):brickOn(pp[1],i,j-hh,cols,rows-hh); } // 'A+B': upper half pattern A, lower pattern B
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
  // brick sizes: finer and deeper per level (more rows). M = normal, S = fine, F = very fine
  var BSZ={XL:{w:26,h:9,px:28,py:11,rm:0.6},L:{w:18,h:7,px:20,py:9,rm:0.75},M:{w:12,h:5,px:14,py:7,rm:1},S:{w:8,h:4,px:9,py:5,rm:1.6},F:{w:6,h:3,px:7,py:4,rm:2.3}}, BZL=[BSZ.XL,BSZ.L,BSZ.M,BSZ.S,BSZ.F];
  function brickSz(nn){ var z=brickSz0(nn); return cheat.dfine?BZL[Math.min(BZL.length-1,BZL.indexOf(z)+1)]:z; }
  function brickSz0(nn){ var n=nn||lvNum(), h=((Math.imul(n,2654435761)>>>16)%1000)/1000; // every stage gets its own brick size (big = fewer bricks, more obstacles)
    if(tut) return tut===1?BSZ.XL:BSZ.L;
    var bi=(n-1)%LEVELS.length, bosses=0, total=0, k0; for(k0=0;k0<LEVELS.length;k0++){ if(LEVELS[k0].boss){ if(k0<bi) bosses++; } else total++; }
    var gi=bi-bosses, t=total>1?gi/(total-1)*3.5:0, lo=Math.floor(t), idx=Math.min(4,lo+(h<t-lo?1:0)); // the higher the stage, the finer the bricks: each cluster a bit smaller, finest = former 3rd-stage size (fine)
    return BZL[idx]; }
  // sticky blocks: the ball sticks briefly and then splits into 2 or 3 balls (block is used up)
  function makeStickies(){ stickies=[]; if(mode!=='breakout'||LV().boss||lvNum()<2) return; var want=lvNum()>=7?2:1, tries=0;
    while(stickies.length<want&&tries++<60){ var w=16, h=6, x=18+rnd()*(W-36-w), y=96+rnd()*48, ok=true;
      bumpers.forEach(function(b){ if(x+w+6>b.x-b.r&&x-6<b.x+b.r&&y+h+6>b.y-b.r&&y-6<b.y+b.r) ok=false; });
      blocks.forEach(function(o){ if(x+w+6>o.x&&x-6<o.x+o.w&&y+h+6>o.y&&y-6<o.y+o.h) ok=false; });
      guides.forEach(function(q){ if(Math.abs((q.x1+q.x2)/2-(x+w/2))<22+Math.abs(q.x2-q.x1)/2&&Math.abs((q.y1+q.y2)/2-(y+h/2))<14+Math.abs(q.y2-q.y1)/2) ok=false; });
      stickies.forEach(function(q){ if(Math.abs(q.x-x)<w+14&&Math.abs(q.y-y)<18) ok=false; }); holes.forEach(function(ho){ if(x<ho.x+ho.r+8&&x+w>ho.x-ho.r-8&&y<ho.y+ho.r+4&&y+h>ho.y-20) ok=false; });
      if(ok) stickies.push({x:x,y:y,w:w,h:h,n:(lvNum()>=4&&rnd()<0.5)?3:2,c:stickies.length%2?13:5,fl:0}); } }
  function releaseSticky(b,o){ var room=7-extras.length, n=Math.max(1,Math.min(o.n,room+1)), spread=n===3?[-0.75,0,0.75]:(n===2?[-0.5,0.5]:[0]), sp=4.8, i, en=Math.max(b.e||0,0.6);
    for(i=0;i<n;i++){ var a=b.sn+spread[i]; if(i===0){ b.vx=Math.cos(a)*sp; b.vy=Math.sin(a)*sp; } else extras.push({x:b.x,y:b.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,e:en}); }
    b.e=en; b.stk=null; o.dead=true; score+=mult()*100*n; burst(b.x,b.y,6,o.c); shake=Math.max(shake,4); msg='SPLIT x'+n+'!'; msgT=60; }
  function makeBricks(){ bricks=[]; if(mode!=='breakout'||LV().boss) return;
    var bz=brickSz(), cols=Math.max(4,Math.floor((W-16)/bz.px)), x0=(W-cols*bz.px+(bz.px-bz.w))/2, rows=Math.max(2,Math.min(Math.floor(60/bz.py),Math.round(LV().rows*bz.rm))), pat=LV().pat;
    for(var ry=0;ry<rows;ry++) for(var cxi=0;cxi<cols;cxi++){
      if(!brickOn(pat,cxi,ry,cols,rows)) continue;
      bricks.push({w:bz.w,h:bz.h,x:x0+cxi*bz.px,ci:cxi,ri:ry,y:28+ry*bz.py,c:[2,3,4,5,8][ry%5],hp:1+((ry===0&&lvNum()>=3)?1:0)+((lvNum()>=6&&ry<=1)?1:0),fl:0}); }
    // gaps: vertical lanes (ball passes through) + a sideways cross lane
    var nl=1+((lvNum()+rnd()*2)|0)%3, lw=Math.max(1,Math.round(18/bz.px)), lanes=[], li;
    for(li=0;li<nl;li++){ var lc=Math.round((li+0.5+(rnd()-0.5)*0.5)*cols/nl); lanes.push(Math.max(1,Math.min(cols-1-lw,lc))); }
    var hrow=rows>=4&&rnd()<0.6?1+((rnd()*(rows-2))|0):-1, hside=rnd()<0.5, hlen=Math.round(cols*(0.45+rnd()*0.25));
    bricks=bricks.filter(function(b){ for(var q=0;q<lanes.length;q++) if(b.ci>=lanes[q]&&b.ci<lanes[q]+lw) return false; if(b.ri===hrow&&(hside?b.ci<hlen:b.ci>=cols-hlen)) return false; return true; });
    // mixing: bricks yield to bumpers/blocks (obstacles sit in the middle of the wall), plus small brick groups in the field
    function clear(x,y,w,h,pad){ var k, o; for(k=0;k<bumpers.length;k++){ o=bumpers[k]; if(Math.hypot(Math.max(x-o.x,0,o.x-x-w),Math.max(y-o.y,0,o.y-y-h))<o.rr+pad) return false; }
      for(k=0;k<blocks.length;k++){ o=blocks[k]; if(x<o.x+o.w+pad&&x+w>o.x-pad&&y<o.y+o.h+pad&&y+h>o.y-pad) return false; }
      for(k=4;k<guides.length;k++) if(segDist(guides[k],x+w/2,y+h/2)<Math.max(w,h)/2+5) return false;
      for(k=0;k<holes.length;k++){ o=holes[k]; if(x<o.x+o.r+pad+3&&x+w>o.x-o.r-pad-3&&y<o.y+o.r+pad&&y+h>o.y-18-pad) return false; } return true; } // holes with flags stay free
    bricks=bricks.filter(function(b){ return clear(b.x,b.y,b.w,b.h,2); });
    // build obstacles into the gaps of the pattern (bumper in the middle of the wall)
    var emb=Math.min(4,1+((lvNum()-1)%LEVELS.length%4)), er=0, cand=[];
    for(var ry2=0;ry2<rows;ry2++) for(var cx2=0;cx2<cols;cx2++){ var ex=x0+cx2*bz.px+bz.w/2, ey=28+ry2*bz.py+bz.h/2; if(clear(ex-6,ey-6,12,12,3)&&!bricks.some(function(b){ return Math.hypot(b.x+b.w/2-ex,b.y+b.h/2-ey)<Math.max(bz.px*0.95,10); })) cand.push([ex,ey]); }
    for(var et=0;et<60&&er<emb&&cand.length;et++){ var cd=cand[(rnd()*cand.length)|0], rb=5+((rnd()*2)|0); if(bumpers.some(function(b){ return Math.hypot(b.x-cd[0],b.y-cd[1])<b.rr+rb+14; })) continue; bumpers.push({x:cd[0],y:cd[1],r:rb,rr:rb,mv:false,hx:cd[0],hy:cd[1],dx:0,dy:0,ph:0,sp:0,flash:0,gild:rnd()<0.7,go:(rnd()*360)|0,hp:rb>=6?2:1,hp0:rb>=6?2:1,pts:rb>=6?80:40}); er++; }
    // funky items: portal pair (teleports the ball) and boost pads (kick the ball), mixed in per stage
    portals=[]; pads=[]; var fh=(Math.imul(lvNum(),2246822519)>>>16)%100, fi, ft;
    ptSets=[]; ptTmp=false; ptT=0; ptI=0; // portals: anywhere in the field (top, middle, sides); some stages have temporary portals that open/close and move
    if(lvNum()>=2&&fh<60){ var nps=((fh>>1)%3===0)?3:1, sj; for(sj=0;sj<nps;sj++){ var pr=[]; for(ft=0;ft<120&&pr.length<2;ft++){ var qx=24+rnd()*(W-48), qy=30+rnd()*122; if(!clear(qx-9,qy-9,18,18,3)) continue; if(pr.length&&Math.hypot(pr[0].x-qx,pr[0].y-qy)<60) continue; if(sj&&Math.hypot(ptSets[sj-1][pr.length].x-qx,ptSets[sj-1][pr.length].y-qy)<30) continue; pr.push({x:qx,y:qy,r:6}); } if(pr.length===2) ptSets.push(pr); else break; } portals=ptSets[0]||[]; ptTmp=ptSets.length>1; }
    if(lvNum()>=3&&(fh%7<4)){ var npd=1+(fh%2); for(ft=0;ft<80&&pads.length<npd;ft++){ var pw3=26, ph3=6, px3=20+rnd()*(W-40-pw3), py3=76+rnd()*70; if(!clear(px3-2,py3-2,pw3+4,ph3+4,3)) continue; if([].concat.apply([],ptSets).some(function(po){ return Math.hypot(po.x-px3-pw3/2,po.y-py3)<22; })) continue; if(pads.some(function(o3){ return Math.abs(o3.y-py3)<14&&Math.abs(o3.x-px3)<pw3+8; })) continue; pads.push({x:px3,y:py3,w:pw3,h:ph3,v:rnd()<0.5?0:1,d:rnd()<0.5?-1:1}); } }
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
  function reset(){ bossWinPend=false; ghostFire=false; gWaves=[]; lastPX=null; chV=0; strikeT=0; wasHeld=false; extras=[]; stuckN=0; bumpHeld=true; ball={x:cx+co,y:172,vx:0,vy:0,e:0}; mainBall=ball; state='tee'; aim=0; power=0; teeHeld=false; }
  var startLv=(location.hash.match(/level=(\d+)/)||[0,1])[1]|0||1; // #level=7 jumps to a level
  function init(first){ loopG=null; extras=[]; gold=0; sling=0; chgT=0; lenT=0; powT=0; poolU=0; goldU=0; luckU=0; ballU=0; upO=[0,0,0,0,0,0,0,0]; pw={E:0,S:0,M:0,X:0,T:0,Y:0,G:0,N:0,F:0,K:0,W:0,H:0}; saver=false; caps=[]; strokes=0; score=0; hole=startLv; bestLv=startLv; lives=cheat.dlife?1:3; level=startLv; seedN++; layout(); msg=(mode==='golf'?L('HOLE ')+hole+' ':'LEVEL '+level+' ')+LV().name+(mode==='golf'?' PAR '+LV().par:''); msgT=140; reset();
    if(!first) clearSave(); }
  init(true);
  var skipTitle=/level=|shop|split/.test(location.hash);
  if(!skipTitle){ var bs=loadSave(); if(bs&&bs.lv) applySave(bs); state='title'; menuSel=0; }
  try{ var lk1=+localStorage['golfLook_'+mode]||0; if(DEVH&&!skipTitle&&lk1>0){ pickMode=false; lookStage(Math.min(lk1,LEVELS.length)); lookSaved=lookIdx; } }catch(e){}
  var tutR=0; try{ tutR=skipTitle?0:(+sessionStorage['golfTut_'+mode]||0); if(tutR>0&&tutR<=TUT.length&&mode==='breakout'){ startTutorial(tutR); inGm=true; } else tutR=0; }catch(e){ tutR=0; } // F5 inside the tutorial stays in that tutorial stage
  try{ if(!tutR&&!skipTitle&&sessionStorage['golfIn_'+mode]==='1'&&loadSave()){ continueGame(); if(state!=='shop') startLevel(); inGm=true; } }catch(e){}
  try{ if(!tutR&&!skipTitle&&sessionStorage['golfMap_'+mode]==='1'){ mapPick=true; mapNote=''; mapSel=Math.max(0,Math.min(LEVELS.length-1,+sessionStorage['golfMapSel_'+mode]||0)); mapScroll=0; mapFollow=true; mapT=0; mapAnim=false; state='map'; inMapPick=true; var rp=sessionStorage['golfMapPg_'+mode]; if(rp!==null&&rp!==undefined&&rp!==''){ mapRestPg=+rp; mapRestApply=true; } tutSel=Math.max(0,Math.min(3,+sessionStorage['golfTutSel_'+mode]||0)); } }catch(e){} // F5 in the stage selection stays there (page + tutorial bubble too)
  try{ var shm=!skipTitle&&sessionStorage['golfShopT_'+mode]; if(shm&&state==='title'){ var shp=shm.split(','); openShop('title'); shopTab=Math.max(0,Math.min(4,+shp[0]||0)); sel=Math.max(0,+shp[1]||0); if(sel>curList().length) sel=0; } }catch(e){} // F5 in the shop opened from the title menu stays in the shop
  if(location.hash.indexOf('shop')>=0){ gold=120; openShop(); } // test helper: #shop
  if(location.hash.indexOf('split')>=0) setTimeout(function(){ state='play'; ball.x=cx; ball.y=150; ball.vx=2; ball.vy=-3; ball.e=1; split(); },500); // test helper: #split
  function press(k,v){ K[k]=v; }
  (function(){ // hide frame: button or F2, state is remembered
    function setBare(v){ document.body.classList.toggle('golf-bare',v); try{ localStorage.golfBare=v?'1':'0'; }catch(e){} }
    try{ if(localStorage.golfBare==='1') setBare(true); }catch(e){}
    game.querySelectorAll('[data-lang]').forEach(function(b){ b.addEventListener('click',function(){ saveGame(); try{ localStorage.golfLang=LANG==='de'?'en':'de'; }catch(e){} location.reload(); }); b.addEventListener('pointerdown',function(e){ e.stopPropagation(); }); });
    var fsEl=function(){ return document.fullscreenElement||document.webkitFullscreenElement; };
    function enterFull(){ var el=document.documentElement; var rq=el.requestFullscreen||el.webkitRequestFullscreen; if(rq) Promise.resolve(rq.call(el)).catch(function(){}); }
    function exitFull(){ var ex=document.exitFullscreen||document.webkitExitFullscreen; if(ex) Promise.resolve(ex.call(document)).catch(function(){}); }
    function onFsChange(){ setBare(!!fsEl()); }
    document.addEventListener('fullscreenchange',onFsChange); document.addEventListener('webkitfullscreenchange',onFsChange);
    game.querySelectorAll('[data-bare]').forEach(function(b){ b.addEventListener('click',function(){ if(fsEl()) exitFull(); else if(b.classList.contains('amiga-bare')) enterFull(); else setBare(!document.body.classList.contains('golf-bare')); }); b.addEventListener('pointerdown',function(e){ e.stopPropagation(); }); });
    window.addEventListener('keydown',function(e){ if(e.key==='F3'){ e.preventDefault(); dbgCol=!dbgCol; } if(e.key==='F2'){ e.preventDefault(); setBare(!document.body.classList.contains('golf-bare')); } });
  })();
  window.addEventListener('keydown',function(e){ var rk=e.key, EK=(e.target&&e.target.matches&&e.target.matches('input,textarea'))?rk:canon(rk);
    if(tut&&(EK==='h'||EK==='H')&&!paused&&(state==='tee'||state==='play')){ e.preventDefault(); tutHelp(); return; } // H = ask the teacher
    if(paused){ var kp=EK, pi=pauseItems(); e.preventDefault(); if(pauseView===2&&pauseCap>=0){ if(rk==='Escape') pauseCap=-1; else if(rk!=='Shift'&&rk!=='Control'&&rk!=='Alt'&&rk!=='Meta'){ kAssign(ACT[pauseCap].id,pauseSlot,rk); pauseCap=-1; } return; } if(kIs(kp,'back')){ if(pauseView){ pauseView=pauseView===2?1:0; pauseSel=0; } else resumeGame(); } else if((kp==='ArrowLeft'||kp==='a'||kp==='A')&&pi[pauseSel]&&pi[pauseSel].l) pi[pauseSel].l(); else if((kp==='ArrowRight'||kp==='d'||kp==='D')&&pi[pauseSel]&&pi[pauseSel].r) pi[pauseSel].r(); else if(kp==='ArrowUp'||kp==='w'||kp==='W') pauseSel=(pauseSel+pi.length-1)%pi.length; else if(kp==='ArrowDown'||kp==='s'||kp==='S') pauseSel=(pauseSel+1)%pi.length; else if(kp==='Enter'||kp===' ') pi[Math.min(pauseSel,pi.length-1)].f(); return; }
    if(kIs(EK,'back')&&!ambient&&(state==='tee'||state==='play'||state==='capt')){ e.preventDefault(); setPause(true); return; }
    if((state==='tee'||state==='play')&&!ambient&&!locked()&&cv.requestPointerLock){ try{ var pk=cv.requestPointerLock(); if(pk&&pk.catch) pk.catch(function(){}); }catch(x){} } // keys can enter play too (Space, map, shop): take the mouse as well
    if(state==='victory'){ var kv=EK; if(kv==='ArrowUp'||kv==='ArrowLeft'||kv==='w'||kv==='W'||kv==='a'||kv==='A') vicSel=Math.max(0,vicSel-1); else if(kv==='ArrowDown'||kv==='ArrowRight'||kv==='s'||kv==='S'||kv==='d'||kv==='D') vicSel=Math.min(2,vicSel+1); else if(kv==='b'||kv==='B') vicGo(true); else if(kv==='Enter'||kv===' ') vicAct(vicSel); e.preventDefault(); return; }
    if(state==='win'){ if(winT<WINLEN-45&&(EK===' '||EK==='Enter')) winT=1; e.preventDefault(); return; }
    if(state==='over'){ var ko=EK; if(ko==='ArrowLeft'||ko==='a'||ko==='A'||ko==='ArrowUp') overSel=0; else if(ko==='ArrowRight'||ko==='d'||ko==='D'||ko==='ArrowDown') overSel=1; else if(overT>40&&(ko==='Enter'||ko===' ')){ if(overSel===0) overRetry(); else overMap(); } else if(overT>40&&(ko==='r'||ko==='R')) overRetry(); else if(overT>40&&(ko==='m'||ko==='M')) overMap(); else return; e.preventDefault(); return; }
    if(kIs(EK,'auto')&&(ambient||state==='tee'||state==='play')){ e.preventDefault(); toggleAuto(); return; }
    if(ambient&&!(state==='shop'&&!ambFull)){ if(kIs(EK,'back')){ e.preventDefault(); if(ambFull) exitToTitle(); else toggleAuto(); } return; }
    if(state==='look'){ var kk3=EK, N3=LEVELS.length;
      if(kk3==='ArrowRight'||kk3==='d'||kk3==='D') lookStage(bgJump(1));
      else if(kk3==='ArrowLeft'||kk3==='a'||kk3==='A') lookStage(bgJump(-1));
      else if(kk3==='ArrowDown'||kk3==='s'||kk3==='S') lookStage(bgJump(1));
      else if(kk3==='ArrowUp'||kk3==='w'||kk3==='W') lookStage(bgJump(-1));
      else if(kk3==='Enter'||kk3===' '){ startLv=lookIdx; startNew(); }
      else if(kk3==='v'||kk3==='V') toggleLookView();
      else if(kIs(kk3,'back')){ if(devDd) devDd=null; else if(devList) devList=false; else exitToTitle(); }
      else return; e.preventDefault(); return; }
    if(state==='title'){ var mi=menuItems(), kt=EK;
      if(kt==='ArrowDown'||kt==='s'||kt==='S') menuSel=Math.min(mi.length-1,menuSel+1);
      else if(kt==='ArrowUp'||kt==='w'||kt==='W') menuSel=Math.max(0,menuSel-1);
      else if(kt==='Enter'||kt===' ') mi[menuSel].f();
      else if(kt==='Delete'||kt==='Backspace') trashClick();
      else return; e.preventDefault(); return; }
    if(state==='map'&&mapPick){ var km=EK, NM=LEVELS.length;
      if(mapTK()&&Math.round(mapScroll/W)===0&&!mapFollow){ // tutorial page: keys stay here, Right goes on to the first world, Enter starts the tutorial
        if(km==='ArrowRight'||km==='d'||km==='D'){ if(tutSel<3) tutSel++; else { mapSel=0; mapFollow=true; } e.preventDefault(); return; }
        if(km==='ArrowLeft'||km==='a'||km==='A'){ tutSel=Math.max(0,tutSel-1); e.preventDefault(); return; }
        if(km==='ArrowDown'||km==='s'||km==='S'||km==='PageDown'){ mapSel=0; mapFollow=true; e.preventDefault(); return; }
        if(km==='Enter'||km===' '){ startTutorial(tutSel+1); e.preventDefault(); return; }
        if(km==='ArrowUp'||km==='w'||km==='W'||km==='PageUp'||km==='l'||km==='L'){ e.preventDefault(); return; } }
      else if(mapTK()&&(km==='ArrowLeft'||km==='a'||km==='A')&&mapSel===0){ tutSel=3; mapPage(-1); e.preventDefault(); return; }
      if(km==='ArrowRight'||km==='d'||km==='D'){ mapSel=(mapSel+1)%NM; mapFollow=true; }
      else if(km==='ArrowLeft'||km==='a'||km==='A'){ mapSel=(mapSel+NM-1)%NM; mapFollow=true; }
      else if(km==='ArrowDown'||km==='s'||km==='S'){ mapSel=clusterJump(1,mapSel+1)-1; mapFollow=true; }
      else if(km==='ArrowUp'||km==='w'||km==='W'){ mapSel=clusterJump(-1,mapSel+1)-1; mapFollow=true; }
      else if(km==='l'||km==='L') toggleLoop();
      else if(km==='PageDown') mapPage(1); else if(km==='PageUp') mapPage(-1);
      else if(km==='Enter'||km===' ') startPick(mapSel);
      else if(kIs(km,'back')){ mapPick=false; mapNote=''; state='title'; menuSel=0; }
      else return; e.preventDefault(); return; }
    if(state==='map'){ var kc=EK, smx=mapSelMax(); 
    if(kc==='ArrowRight'||kc==='d'||kc==='D'){ mapSel=Math.min(smx,mapSel+1); mapFollow=true; } else if(kc==='ArrowLeft'||kc==='a'||kc==='A'){ mapSel=Math.max(0,mapSel-1); mapFollow=true; } else if(kc==='PageDown'){ mapPage(1); } else if(kc==='PageUp'){ mapPage(-1); } else if(kc==='Enter'||kc===' '){ mapStart(mapSel); } else if(kIs(EK,'back')){ state='title'; menuSel=0; } else return; e.preventDefault(); return; }
    if(state==='tee'&&kIs(EK,'shop')){ e.preventDefault(); openShop('tee'); return; }
    if(state==='tee'&&(EK==='m'||EK==='M')){ e.preventDefault(); state='map'; mapT=0; mapAnim=false; return; }
    if(state==='tee'&&kIs(EK,'back')){ saveGame(); state='title'; menuSel=0; return; }
    if(state==='shop'&&!anyTab()){ if(EK===' '||EK==='Enter'||kIs(EK,'back')) closeShop(); e.preventDefault(); return; } /* shop's closed: only leaving works */
    if(state==='shop'){ var N=curList().length, kk2=EK;
      if(kk2==='Tab'||kk2==='e'||kk2==='E'||kk2==='PageDown'){ setTab(shopTab+(e.shiftKey&&kk2==='Tab'?-1:1)); }
      else if(kk2==='q'||kk2==='Q'||kk2==='PageUp'){ setTab(shopTab-1); }
      else if(kk2==='ArrowRight'||kk2==='d'||kk2==='D'){ if(sel<N&&sel+1<N) sel++; shopCol=sel%4; }
      else if(kk2==='ArrowLeft'||kk2==='a'||kk2==='A'){ if(sel<N&&sel>0) sel--; shopCol=sel%4; }
      else if(kk2==='ArrowDown'||kk2==='s'||kk2==='S'){ if(sel<N){ if(sel+4<N) sel+=4; else sel=N; } }
      else if(kk2==='ArrowUp'||kk2==='w'||kk2==='W'){ if(sel>=N){ var t2=(Math.round(shopPg)+1)*4+shopCol; sel=t2<N?t2:Math.min(N-1,Math.round(shopPg)*4+shopCol); } else if(sel>=4) sel-=4; }
      else if(kk2==='Enter'){ if(sel>=N) closeShop(); else activate(sel); }
      else if(kk2===' '||kIs(kk2,'back')){ closeShop(); }
      else if(kk2>='1'&&kk2<='8'&&Math.round(shopPg)*4+ +kk2<=N){ sel=Math.round(shopPg)*4+ +kk2-1; activate(sel); }
      else return;
      if(state==='shop') saveGame(); // remember tab and selection, so a reload lands back in the shop
      e.preventDefault(); return; }
    var k={ArrowLeft:'ml',ArrowRight:'mr',a:'ml',A:'ml',d:'mr',D:'mr',' ':'s'}[EK]; if(!k||paused) return;
    if(e.target.matches&&e.target.matches('input,textarea')) return;
    e.preventDefault(); if(k==='s'&&e.shiftKey&&state==='play') press('g',1); else press(k,1); }); // Shift+Space in play = nudge (Ghost Shot), Space = charge bar
  window.addEventListener('keyup',function(e){ var EK=(e.target&&e.target.matches&&e.target.matches('input,textarea'))?e.key:canon(e.key);
    var k={ArrowLeft:'ml',ArrowRight:'mr',a:'ml',A:'ml',d:'mr',D:'mr',' ':'s'}[EK]; if(k){ press(k,0); if(k==='s') press('g',0); } });
  var mx=cx, my=H*0.45, mouseIn=false;
  var lockSkip=0;
  function locked(){ return document.pointerLockElement===cv; }
  document.addEventListener('pointerlockchange',function(){ lockSkip=0; lastPX=null; });
  function track(e){ var rc=cv.getBoundingClientRect();
    if(locked()){ if(lockSkip>0||Math.abs(e.movementX)>250||Math.abs(e.movementY)>250){ if(lockSkip>0) lockSkip--; return; } mx=Math.max(0,Math.min(W,mx+e.movementX*msens*W/rc.width)); my=Math.max(0,Math.min(H,my+e.movementY*msens*H/rc.height)); }
    else if(paused||(state!=='play'&&state!=='tee')){ mx=(e.clientX-rc.left)/rc.width*W; my=(e.clientY-rc.top)/rc.height*H; }
    mouseIn=e.pointerType!=='touch'; }
  var lastPX=null, lastPY=null; // bar follows the mouse only relatively: no jump on spawn or when entering the play state
  function dragTo(e){ var skipMv=lockSkip>0; track(e); // track() counts lockSkip down, so remember it beforehand
    if(paused){ for(var ph=0;ph<pauseR.length;ph++) if(hit(pauseR[ph])) pauseSel=ph; return; }
    if(state==='map'){ var nh=nodeAt(); if(nh>=0&&nh!==mapSel&&(mapPick||nh<=mapSelMax())){ mapSel=nh; } } // hovering only selects: it must not hijack the camera while it scrolls
    if(state==='victory'){ for(var vq=0;vq<3;vq++) if(hit(vicR[vq])) vicSel=vq; }
    if(state==='title'){ var mi3=menuItems(); for(var q3=0;q3<mi3.length;q3++) if(hit(menuR['m'+q3])) menuSel=q3; }
    if(state==='shop'){ for(var hi=0;hi<curList().length;hi++) if(hit(shopR['b'+hi])) sel=hi; if(hit(shopR.go)) sel=curList().length; }
    if(!ambient && (state==='play'||(state==='tee'&&!K.s)) && (e.pointerType==='mouse'||(e.buttons&1))){
      var rcw=cv.getBoundingClientRect().width, d=locked()?((skipMv||lockSkip>0||Math.abs(e.movementX)>250)?0:e.movementX):(lastPX===null?0:e.clientX-lastPX);
      co+=d*msens*2*Math.max(0,cx-fl[0].len/2-6)/rcw; place();
      mdy+=locked()?((skipMv||lockSkip>0||Math.abs(e.movementY)>250)?0:e.movementY):(lastPY===null?0:e.clientY-lastPY); } // vertical mouse movement shapes the bowl while charging
    if(!locked() && (state==='play'||state==='tee') && lastPX!==null && (e.pointerType==='mouse'||(e.buttons&1))){ var rcb=cv.getBoundingClientRect(); mx=Math.max(0,Math.min(W,mx+(e.clientX-lastPX)*W/rcb.width)); my=Math.max(0,Math.min(H,my+(e.clientY-lastPY)*H/rcb.height)); }
    lastPX=(state==='play'||state==='tee')?e.clientX:null; lastPY=(state==='play'||state==='tee')?e.clientY:null; }
  cv.addEventListener('pointermove',dragTo);
  cv.addEventListener('wheel',function(e){ if(state==='look'&&devList){ e.preventDefault(); if(devDd) return; devListScroll+=Math.max(-20,Math.min(20,e.deltaY*(e.deltaMode===1?7:0.3))); /* proportional: a trackpad sends many small events */ return; } if(state==='map'){ e.preventDefault(); if(tick-mapWheelT>6){ mapWheelT=tick; mapPage((e.deltaY+e.deltaX)>0?1:-1); } return; } if(state==='shop'){ e.preventDefault(); shopPageTo(shopPg+(e.deltaY+e.deltaX)*(e.deltaMode===1?0.35:1/110)); } },{passive:false});
  cv.addEventListener('contextmenu',function(e){ e.preventDefault(); });
  window.addEventListener('contextmenu',function(e){ if(locked()||(e.target&&e.target.closest&&e.target.closest('[data-golf-game]'))) e.preventDefault(); },true); // right click in the game never opens the browser menu (not even with the mouse locked)
  // ===== Pause menu (Esc in tee/play): game freezes, menu is overlaid =====
  document.addEventListener('pointerlockchange',function(){ if(!locked()&&!paused&&!ambient&&(state==='play'||state==='tee'||state==='capt')) setPause(true); }); // browser eats Esc while the mouse is locked and only releases the lock: that opens the pause menu
  function setPause(v){ paused=v; pauseSel=0; pauseView=0; pauseR=[]; if(v){ K.l=K.r=K.s=K.g=K.ml=K.mr=0; if(document.exitPointerLock&&locked()) document.exitPointerLock(); } else { lastPX=null; lockSkip=5; } }
  var SENS=[0.5,0.75,1,1.5,2]; try{ var sv0=+localStorage.golfSens; if(SENS.indexOf(sv0)>=0) msens=sv0; shakeOn=localStorage.golfShake!=='0'; }catch(e){}
  function fsOn(){ return !!(document.fullscreenElement||document.webkitFullscreenElement); }
  function resumeGame(){ setPause(false); if((state==='tee'||state==='play')&&!ambient&&!locked()&&cv.requestPointerLock){ try{ var rq=cv.requestPointerLock(); if(rq&&rq.catch) rq.catch(function(){}); }catch(x){} } } // resume (key/click = user gesture) takes the mouse again
  function pauseItems(){ var it;
    if(pauseView===1){ // settings
      var si=function(d){ var i=SENS.indexOf(msens); i=Math.max(0,Math.min(SENS.length-1,(i<0?2:i)+d)); msens=SENS[i]; try{ localStorage.golfSens=msens; }catch(e){} };
      return [{t:L('MOUSE SPEED ')+Math.round(msens*100)+'%',f:function(){ var i=SENS.indexOf(msens); if(i<0) i=2; msens=SENS[(i+1)%SENS.length]; try{ localStorage.golfSens=msens; }catch(e){} },l:function(){ si(-1); },r:function(){ si(1); }},
        {t:L('SCREEN SHAKE ')+(shakeOn?L('ON'):L('OFF')),f:function(){ shakeOn=!shakeOn; try{ localStorage.golfShake=shakeOn?'1':'0'; }catch(e){} }},
        {t:L('FULLSCREEN ')+(fsOn()?L('ON'):L('OFF')),f:function(){ if(fsOn()){ var ex=document.exitFullscreen||document.webkitExitFullscreen; if(ex) Promise.resolve(ex.call(document)).catch(function(){}); } else { var el=document.documentElement, rq=el.requestFullscreen||el.webkitRequestFullscreen; if(rq) Promise.resolve(rq.call(el)).catch(function(){}); } }},
        {t:L('LANGUAGE ')+(LANG==='de'?'DE':'EN'),f:function(){ saveGame(); try{ localStorage.golfLang=LANG==='de'?'en':'de'; }catch(e){} location.reload(); }},
        {t:L('KEYS'),f:function(){ pauseView=2; pauseSel=0; pauseCap=-1; pauseSlot=0; }},
        {t:L('BACK'),f:function(){ pauseView=0; pauseSel=0; }}]; }
    if(pauseView===2){ var kc0=0, kp0=0, ki=[]; // two clustered columns: left = movement + game, right = menus + misc + buttons
      var ord=['left','right','up','down','fire','ok','back','shop','auto','map','retry','tabn','tabp','pgd','pgu','loop','view','help','del'];
      ord.forEach(function(id,n){ var a=ACT.filter(function(q){ return q.id===id; })[0], ai=ACT.indexOf(a); if(KCOL[id]!==undefined) kc0=KCOL[id]; if(KPG[id]!==undefined) kp0=KPG[id]; var b=KBND[id];
        ki.push({c:kc0,pg:kp0,hd:KGRP[id]?L(KGRP[id]):'',nm:L(a.n),k0:kShow(b[0]),k1:kShow(b[1]),ai:ai,key:1,f:function(){ pauseCap=ai; },l:function(){ pauseSlot=0; },r:function(){ pauseSlot=1; }}); });
      ki.push({c:1,pg:1,hd:'',t:L('RESET KEYS'),f:function(){ ACT.forEach(function(a){ KBND[a.id]=a.d.slice(); }); kbSave(); }}); ki.push({c:1,pg:1,hd:'',t:L('BACK'),f:function(){ pauseView=1; pauseSel=0; pauseCap=-1; }}); return ki; }
    it=[{t:L('RESUME'),f:resumeGame}];
    it.push({t:L('SETTINGS'),f:function(){ pauseView=1; pauseSel=0; }});
    it.push({t:L('MAIN MENU'),f:function(){ setPause(false); saveGame(); state='title'; menuSel=0; }}); return it; }
  function drawKeysView(it){ var bw=140, rh=13, st=18, cx0=[6,154], cy=[40,40], i, ttl=L('KEYS'), pgN=(it[Math.min(pauseSel,it.length-1)]||{}).pg||0; g.fillStyle='rgba(0,0,0,0.7)'; g.fillRect(0,0,W,H); txtS(ttl,((W-ttl.length*12)/2)|0,8,1,3); pauseR=[];
    txt((pgN+1)+'/2',W-26,10,11); txt(pgN?'<':'>',pgN?W-34:W-14,10,4);
    for(i=0;i<it.length;i++){ var q=it[i]; if(q.pg!==pgN&&!(q.pg===undefined&&pgN===1)) continue; var c=q.c, x=cx0[c], sel=i===pauseSel; if(q.hd){ if(cy[c]>40) cy[c]+=8; txt(q.hd,x,cy[c],4); cy[c]+=11; } else if(!q.key&&it[i-1]&&it[i-1].key) cy[c]+=10;
      var y=cy[c]; pauseR[i]={x:x,y:y,w:bw,h:rh}; box(x-1,y-1,bw+2,rh+2,1); box(x,y,bw,rh,sel?2:0);
      if(q.key){ var cap=pauseCap===q.ai, a0=cap&&pauseSlot===0?'...':q.k0, a1=cap&&pauseSlot===1?'...':q.k1; if(sel&&pauseSlot===0) a0='['+a0+']'; if(sel&&pauseSlot===1) a1='['+a1+']'; var ks=a0+'  '+a1; txt(q.nm,x+5,y+4,1); txt(ks,x+bw-5-ks.length*4,y+4,sel?1:11); }
      else txt(q.t,x+((bw-q.t.length*4)>>1),y+4,1);
      cy[c]+=st; }
    var hint=pauseCap>=0?L('PRESS A KEY - ESC CANCELS'):L('ENTER = CHANGE - LEFT RIGHT = KEY 1 OR 2'); txt(hint,((W-hint.length*4)/2)|0,H-12,11); if(mouseIn) drawCursor(); }
  function drawPause(){ var it=pauseItems(); if(pauseView===2) return drawKeysView(it); var bw=pauseView===2?160:110, bh=14, x=((W-bw)/2)|0, VIS=9, n0=it.length, st=n0>VIS?Math.max(0,Math.min(n0-VIS,pauseSel-4)):0, nv=Math.min(n0,VIS), y0=84-((nv*18)>>1)+10, i; g.fillStyle='rgba(0,0,0,0.65)'; g.fillRect(0,0,W,H);
    var ttl=pauseView===2?L('KEYS'):(pauseView===1?L('SETTINGS'):L('PAUSED')); txtS(ttl,((W-ttl.length*12)/2)|0,y0-30,1,3); pauseR=[];
    for(i=st;i<st+nv;i++){ var yy=y0+(i-st)*18, sel=i===pauseSel; pauseR[i]={x:x,y:yy,w:bw,h:bh}; box(x-1,yy-1,bw+2,bh+2,1); box(x,yy,bw,bh,sel?2:0); txt(it[i].t,x+((bw-it[i].t.length*4)>>1),yy+4,1); }
    if(st>0) txt('^',(W/2)|0,y0-8,11); if(st+nv<n0) txt('v',(W/2)|0,y0+nv*18-4,11);
    var hint=(pauseView?L('ESC = BACK'):L('ESC = RESUME')).replace('ESC',kLab('back')); if(pauseView===2) hint=pauseCap>=0?L('PRESS A KEY - ESC CANCELS'):L('ENTER = CHANGE - LEFT RIGHT = KEY 1 OR 2'); txt(hint,((W-hint.length*4)/2)|0,H-14,11); if(mouseIn) drawCursor(); }
  function hit(rc){ return rc&&mx>=rc.x&&mx<=rc.x+rc.w&&my>=rc.y&&my<=rc.y+rc.h; }
  function skyPage(){ var base=mapFollow?Math.round(mapScroll/W):mapPgT; if(mx<W/2){ if(base>0){ mapPage(-1); padFl.pl=14; } } else if(base<mapPages()-1){ mapPage(1); padFl.pr=14; } } // sky: left half = back, right half = forward (left click only)
  function menuBack(){ if(state==='look'&&devDd){ devDd=null; return; } if(state==='look'&&devList){ devList=false; return; } // right click in menus = cancel / back (left click is always the positive action)
    if(paused){ if(pauseCap>=0){ pauseCap=-1; return; } if(pauseView){ pauseView=pauseView===2?1:0; pauseSel=0; } else resumeGame(); return; }
    if(state==='shop') closeShop(); else if(state==='look') exitToTitle(); else if(state==='over'){ if(overT>40) overMap(); } else if(state==='map'){ mapPick=false; mapNote=''; state='title'; menuSel=0; } }
  cv.addEventListener('pointerdown',function(e){ var inMenu=paused||state==='victory'||state==='win'||state==='over'||state==='title'||state==='map'||state==='shop'||state==='look';
    if(inMenu&&!(ambient&&!(state==='shop'&&!ambFull))&&e.pointerType==='mouse'&&e.button!==0){ track(e); if(e.button===2) menuBack(); return; } // menus: only the left button confirms, right button goes back
    if(paused){ track(e); var pi2=pauseItems(); for(var pq=0;pq<pi2.length;pq++) if(hit(pauseR[pq])){ pauseSel=pq; pi2[pq].f(); break; } return; } if(state==='victory'){ for(var vq2=0;vq2<3;vq2++) if(hit(vicR[vq2])){ vicSel=vq2; vicAct(vq2); return; } return; } if(state==='win'){ if(winT<WINLEN-45) winT=1; return; } if(ambient&&!(state==='shop'&&!ambFull)){ if(ambFull) exitToTitle(); else toggleAuto(); return; } if(state==='look'){ dragTo(e); var N4=LEVELS.length; if(lookBackR&&hit(lookBackR)){ exitToTitle(); return; } if(lookViewR&&hit(lookViewR)){ toggleLookView(); return; } if(lookGoR&&hit(lookGoR)){ startLv=lookIdx; startNew(); return; } for(var ldi=0;ldi<lookDevR.length;ldi++) if(hit(lookDevR[ldi])){ if(lookDevR[ldi].drag){ devDragPend={r:lookDevR[ldi],drag:lookDevR[ldi].drag,x:mx,y:my}; devDragOn=false; return; } lookDevR[ldi].f(); return; } var lg2=lkGeo(); if(DEVH&&DEVH.set&&mx>=lg2.x&&mx<=lg2.x+W*lg2.s&&my>=lg2.y&&my<=lg2.y+H*lg2.s){ devSel=devPick((mx-lg2.x)/lg2.s,(my-lg2.y)/lg2.s); return; } /* dev: click an obstacle to select it */ lookStage(bgJump(mx<W/2?-1:1)); return; }
    if(e.button===2) e.preventDefault();
    shiftDown=e.shiftKey; if(e.pointerType==='mouse'&&!locked()&&(state==='tee'||state==='play')&&cv.requestPointerLock){ try{ var pr=cv.requestPointerLock(); if(pr&&pr.catch) pr.catch(function(){}); }catch(x){} cv.focus(); return; } /* first click only captures the mouse (bar), no hit/charge */ dragTo(e); cv.focus();
    if(state==='over'){ if(overT>40){ if(hit(overR.retry)) overRetry(); else if(hit(overR.map)) overMap(); } return; }
    if(state==='title'){ if(hit(menuR.trash)){ trashClick(); return; } var mi2=menuItems(); for(var q2=0;q2<mi2.length;q2++) if(hit(menuR['m'+q2])){ menuSel=q2; mi2[q2].f(); return; } return; }
    if(state==='map'){ if(mapPick&&tutNodeAt()>=0){ startTutorial(tutNodeAt()+1); return; } if(mapPick&&mapR.tut&&hit(mapR.tut)){ startTutorial(); return; } if(hit(mapR.pl)){ mapPage(-1); padFl.pl=14; return; } if(hit(mapR.pr)){ mapPage(1); padFl.pr=14; return; } for(var dpi=0;dpi<mapPages();dpi++) if(hit(mapR['d'+dpi])){ mapPgT=dpi; mapFollow=false; return; }
      if(mapPick&&hit(loopR)){ toggleLoop(); return; }
      if(mapPick){ if(backR&&hit(backR)){ mapPick=false; mapNote=''; state='title'; menuSel=0; return; } var na=nodeAt(); if(na>=0){ mapSel=na; startPick(na); } else if(my>=16&&my<60) skyPage(); return; }
      var nb=nodeAt(); if(nb>=0&&nb<=mapSelMax()){ mapSel=nb; mapStart(nb); return; } if(nb<0&&my>=16&&my<60){ skyPage(); return; } startLevel(); return; }
    if(state==='shop'){ if(hit(shopR.su)){ shopPageTo(Math.round(shopPg)-1); return; } if(hit(shopR.sd)){ shopPageTo(Math.round(shopPg)+1); return; } if(hit(shopR.st)){ shopDrag=true; return; } for(var ti2=0;ti2<5;ti2++) if(hit(shopR['t'+ti2])){ setTab(ti2); return; } for(var si=0;si<curList().length;si++) if(hit(shopR['b'+si])){ sel=si; activate(si); return; } if(hit(shopR.go)) closeShop(); return; }
    if(state==='tee'){ if(e.button===0){ try{ cv.setPointerCapture(e.pointerId); }catch(x){} press('s',1); } }
    else { press(e.button===2?'r':'l',1); } });
  function up(e){ devDrop(); if(e.button===0||e.pointerType!=='mouse') press('s',0); if(e.button===2) press('r',0); else if(e.button===0){ press('l',0); } else { press('l',0); press('r',0); } } // only releasing the left button triggers the shot
  cv.addEventListener('pointerup',up);
  // also detect release when the mouse leaves the field while charging or pointer lock kicks in
  window.addEventListener('pointerup',function(e){ devDrop(); shopDrag=false; if(e.button===0&&state==='tee') press('s',0); });
  window.addEventListener('mouseup',function(e){ if(e.button===0&&state==='tee') press('s',0); });
  window.addEventListener('blur',function(){ teeHeld=false; press('s',0); press('l',0); press('r',0); });
  cv.addEventListener('pointercancel',function(){ teeHeld=false; press('s',0); press('l',0); press('r',0); });
  cv.addEventListener('pointerleave',function(){ press('l',0); press('r',0); });
  game.querySelectorAll('[data-k]').forEach(function(b){
    ['pointerdown'].forEach(function(t){ b.addEventListener(t,function(e){ e.preventDefault(); press(b.dataset.k,1); }); });
    ['pointerup','pointerleave','pointercancel'].forEach(function(t){ b.addEventListener(t,function(){ press(b.dataset.k,0); }); });
  });
  function insideRect(o,R){ // ball center is inside the rectangle: push it out via the smallest penetration depth to the nearest edge (no slipping through)
    var l=ball.x-o.x, r=o.x+o.w-ball.x, t=ball.y-o.y, b=o.y+o.h-ball.y, m=Math.min(l,r,t,b);
    if(m===t){ ball.y=o.y-R; return [0,-1]; } if(m===b){ ball.y=o.y+o.h+R; return [0,1]; }
    if(m===l){ ball.x=o.x-R; return [-1,0]; } ball.x=o.x+o.w+R; return [1,0]; }
  function bounceRel(nx,ny,rest,o){ var ovx=(o.pvx||0)/BALL_SPEED, ovy=(o.pvy||0)/BALL_SPEED, d=(ball.vx-ovx)*nx+(ball.vy-ovy)*ny; if(d<0){ ball.imp=tick; ball.vx-=(1+rest)*d*nx; ball.vy-=(1+rest)*d*ny; } } // reflection relative to a moving obstacle: it hands over its own motion
  function bounce(nx,ny,rest){ var d=ball.vx*nx+ball.vy*ny; if(d<0){ ball.imp=tick; ball.vx-=(1+rest)*d*nx; ball.vy-=(1+rest)*d*ny; } }
  // configurable shortcuts (Settings > Keys): every keyboard action has up to two keys. Raw keys are translated ONCE per event (canon) into the canonical key the game logic knows
  var ACT=[{id:'left',n:'MOVE LEFT',d:['a','ArrowLeft'],o:'ArrowLeft'},{id:'right',n:'MOVE RIGHT',d:['d','ArrowRight'],o:'ArrowRight'},{id:'up',n:'MOVE UP',d:['w','ArrowUp'],o:'ArrowUp'},{id:'down',n:'MOVE DOWN',d:['s','ArrowDown'],o:'ArrowDown'},
    {id:'fire',n:'CHARGE FIRE',d:[' ',''],o:' '},{id:'ok',n:'CONFIRM',d:['Enter',''],o:'Enter'},{id:'back',n:'PAUSE BACK',d:['p',''],o:'p'},{id:'shop',n:'SHOP',d:['b',''],o:'b'},{id:'auto',n:'AUTOPILOT',d:['Tab',''],o:'Tab'},
    {id:'map',n:'MAP',d:['m',''],o:'m'},{id:'retry',n:'RETRY',d:['r',''],o:'r'},{id:'tabn',n:'TAB NEXT',d:['e',''],o:'e'},{id:'tabp',n:'TAB PREV',d:['q',''],o:'q'},{id:'pgd',n:'PAGE DOWN',d:['PageDown',''],o:'PageDown'},{id:'pgu',n:'PAGE UP',d:['PageUp',''],o:'PageUp'},
    {id:'loop',n:'CLUSTER LOOP',d:['l',''],o:'l'},{id:'view',n:'VIEW MODE',d:['v',''],o:'v'},{id:'help',n:'TEACHER HELP',d:['h',''],o:'h'},{id:'del',n:'DELETE SAVE',d:['Delete','Backspace'],o:'Delete'}];
  var KGRP={left:'MOVEMENT',fire:'ACTIONS',back:'GAME',tabn:'MENUS',help:'MISC'}, KCOL={left:0,fire:0,back:1,tabn:0,help:1}, KPG={left:0,back:0,tabn:1,help:1}, KBND={}, KOUT={}, pauseCap=-1, pauseSlot=0;
  ACT.forEach(function(a){ KBND[a.id]=a.d.slice(); KOUT[a.id]=a.o; });
  try{ var kbs=JSON.parse(localStorage.golfKeys2||'null'); if(kbs) ACT.forEach(function(a){ if(Array.isArray(kbs[a.id])) KBND[a.id]=[String(kbs[a.id][0]||''),String(kbs[a.id][1]||'')]; }); }catch(e){}
  function kbSave(){ try{ localStorage.golfKeys2=JSON.stringify(KBND); }catch(e){} }
  function kNorm(k){ return k&&k.length===1?k.toLowerCase():k; }
  function canon(k){ var n=kNorm(k), i, m; for(i=0;i<ACT.length;i++) if(KBND[ACT[i].id].indexOf(n)>=0&&n) return ACT[i].o;
    for(i=0;i<ACT.length;i++) if(ACT[i].d.indexOf(n)>=0&&n) return '\u0000'; // a default key of an action that was rebound: no longer does anything
    return k; }
  function kIs(k,a){ return k===KOUT[a]; }
  function kShow(k){ return !k?'-':({' ':'SPACE',ArrowLeft:'LEFT',ArrowRight:'RIGHT',ArrowUp:'UP',ArrowDown:'DOWN'}[k]||k).toUpperCase(); }
  function kLab(a){ return kShow(KBND[a][0]||KBND[a][1]); }
  function kAssign(id,slot,raw){ var n=kNorm(raw); ACT.forEach(function(a){ KBND[a.id]=KBND[a.id].map(function(v,si){ return (v===n&&!(a.id===id&&si===slot))?'':v; }); }); KBND[id][slot]=n; kbSave(); }
  var mdy=0, manualCh=false, paused=false, pauseSel=0, pauseR=[], pauseView=0, msens=1, shakeOn=true, gWaves=[], dbgCol=false, ghostFire=false, pxo=0, ghostT=0, ghostX=0, ghostY=0, inGm=false, bdrK=null, coS=0, macX, macY, mpend=0; // mpend = mouse movement the bar could not follow yet (speed cap)
  // Super Game Boy frame: the black area around the playfield gets its own pattern per level scene
  var BORD={
    train:'repeating-linear-gradient(90deg,#1f4a22 0 14px,#2a5e2c 14px 16px),#1f4a22',
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
  function setBorder(){ var k=state==='title'?(tbShow||''):(LV().scene||''); if(k===bdrK) return; bdrK=k; var bg=BORD[k]||'#000'; // whole play area incl. the region above/below the field
    view.style.background=bg; game.style.setProperty('--bd',bg); }
  var tutMem=-1, shopMem=null, inMapPick=false; var discoOn=false; function step(){ try{ var lk0=state==='look'?lookIdx:0; if(lk0!==lookSaved){ lookSaved=lk0; if(lk0) localStorage['golfLook_'+mode]=lk0; else localStorage.removeItem('golfLook_'+mode); } }catch(e){} if(cheat.disco){ discoOn=true; if(tick%6===0){ var t0=C[2]; C[2]=C[3]; C[3]=C[4]; C[4]=C[5]; C[5]=C[8]; C[8]=C[9]; C[9]=C[13]; C[13]=C[14]; C[14]=t0; } } else if(discoOn){ discoOn=false; C=paletteFor(actv.style).slice(); } stepCore(); checkSecrets(); if(bossWinPend&&state==='play'&&--bossWinT<=0) resolveBossWin(); apGuard(); setBorder(); if(tut&&state==='title') tut=0; try{ var tv=tut&&state!=='map'?tut:0; if(tv!==tutMem){ tutMem=tv; sessionStorage['golfTut_'+mode]=tv; } }catch(e){} if(tut&&state==='play'&&skipT>0) skipT--; if(tut&&state==='tee') tutTeeT++; else if(tut&&state==='play') tutPlayT++; if(tutHelpT>0) tutHelpT--; try{ var shk=(state==='shop'&&shopFrom==='title')?shopTab+','+sel:''; if(shk!==shopMem){ shopMem=shk; sessionStorage['golfShopT_'+mode]=shk; } }catch(e){} var mp=state==='map'&&mapPick; if(mp!==inMapPick){ inMapPick=mp; try{ sessionStorage['golfMap_'+mode]=mp?'1':'0'; }catch(e){} } if(mp){ try{ sessionStorage['golfMapSel_'+mode]=mapSel; if(mapT>2&&!mapRestApply) sessionStorage['golfMapPg_'+mode]=Math.round(mapScroll/W); /* not before the restored page was applied, else F5 overwrites it with page 0 */ sessionStorage['golfTutSel_'+mode]=tutSel; }catch(e){} } var ig=!ambient&&(state==='tee'||state==='play'||(state==='shop'&&shopFrom!=='title')); if(ig!==inGm&&(ig||state==='title'||state==='map')){ inGm=ig; try{ sessionStorage['golfIn_'+mode]=ig?'1':'0'; }catch(e){} } } // remembers: refresh during play restarts the level
  function stepCore(){
    if(paused) return;
    if(state==='victory'){ tick++; return; } if(state==='trans'){ tick++; transT++; if(transT>=TRANS_LEN){ state='tee'; saveGame(); } return; }
    if(state==='title'||state==='map'){ tick++; mapT++; if(state==='map'&&mapT<=2&&mapRestPg<0&&!mapRestApply) mapScroll=mapCenter(mapPick?mapSel:(lvNum()-1)%LEVELS.length); return; }
    if(state==='over'){ tick++; overT++; return; }
    if(state==='look'){ tick++; moveBumpers(); updateBoss(); return; }
    if(ambient) ambientAI();
    if(state==='win'){ tick++; moveBumpers(); winT--; ball.x+=(cx+co-ball.x)*0.08; ball.y+=(120+Math.sin(tick*0.15)*6-ball.y)*0.08; bulge=6+Math.sin(tick*0.4)*5; curB=bulge;
      if(winT%9===0) burst(24+Math.random()*(W-48),36+Math.random()*110,5,[1,2,3,4,13,14][(Math.random()*6)|0]);
      if(winT<=0) winApply(); return; }
    if(state==='shop'){ tick++; if(ambient&&ambFull) ambShopAI(); else if(shopFrom==='auto') autoShopTick(); return; }
    if(state==='capt'){ tick++; moveBumpers();
      if(--capT<=0){
        if(holes.every(function(q){ return q.done; })){ // all holes hit = hole done
          winLevel(); return;
        } else { var ea=1.5708+(rnd()-0.5)*1.4;
          ball.vx=Math.cos(ea)*5.5; ball.vy=Math.sin(ea)*5.5; ball.x=capH.x; ball.y=capH.y+capH.r; ball.e=1; state='play'; shake=8; burst(capH.x,capH.y,5,1); } }
      return; }
    tick++; if(ptTmp){ ptT++; if(ptT===520) portals=[]; else if(ptT>=660){ ptI=(ptI+1)%ptSets.length; portals=ptSets[ptI]; ptT=0; portals.forEach(function(po,i5){ burst(po.x,po.y,6,i5?14:13); }); } else if(ptT===560&&msgT<=0&&state==='play'){ msg=L('PORTAL OPENING'); msgT=60; } } moveBumpers(); updateBoss(); if(tick%180===0) saveGame();
    for(var pk in pw) if(pw[pk]>0&&(pk!=='T'||state==='play')) pw[pk]--;
    guides[0].off=guides[1].off=pw.T<=0&&!cheat.pools; if(cheat.saver) saver=true; if(cheat.mega) pw.M=Math.max(pw.M,2); // floor pools only temporarily active
    fl.forEach(function(f){ f.len=60+10*lenT+(pw.E>0?28:0); });
    caps.forEach(function(c){ if(c.fast){ c.vy+=0.45; c.y+=c.vy; c.x+=(c.x<cx?-0.15:0.15); } else c.y+=0.55; // after a loss capsules fall away faster and can no longer be collected
      if(c.fast){ if(c.y>H+8){ c.dead=true; if(c.k==='SHOP'&&c.win) resolveBossWin(); } return; }
      if((c.y>=192&&c.y<=208&&c.x>=cx+co-48&&c.x<=cx+co+48)||(state==='play'&&Math.hypot(ball.x-c.x,ball.y-c.y)<7)){ collect(c.k,c); c.dead=true; burst(c.x,c.y,3); }
      else if(c.y>H+4){ c.dead=true; if(c.k==='SHOP'&&c.win) resolveBossWin(); } });
    caps=caps.filter(function(c){ return !c.dead; });
    // arrow keys accelerate the bar (inertia), without a key it brakes gently
    if(state==='play'&&heldAny()){ var kd2=((K.mr||(K.s&&K.r))?1:0)-((K.ml||(K.s&&K.l))?1:0); if(kd2) aim=Math.max(-1.2,Math.min(1.2,aim+kd2*0.03)); }
    if((teeHeld&&state==='tee')||(state==='play'&&heldAny())) vco*=0.6; // ball tensioned: direction keys aim, bar stays still
    else if(K.ml&&!K.mr) vco-=(vco>0?0.6:0.3)*(shiftDown?2:1); else if(K.mr&&!K.ml) vco+=(vco<0?0.6:0.3)*(shiftDown?2:1); else vco*=0.82;
    var vmx=shiftDown?7:4; vco=Math.max(-vmx,Math.min(vmx,vco)); var co0=co; co+=vco; place(); if(Math.abs(co-(co0+vco))>0.01) vco=0;
    var limB=Math.max(0,cx-fl[0].len/2-6);
    if(mpend){ var mpS=Math.max(-9,Math.min(9,mpend)); co+=mpS; mpend-=mpS; place(); }
    coS=coPrev; var ddc=co-coPrev; if(Math.abs(ddc)>9){ var stpB=ddc>0?9:-9; mpend=Math.max(-30,Math.min(30,mpend+ddc-stpB)); co=coPrev+stpB; place(); } // bar max. 9px/frame: fast mouse jerks must not jump through the ball, the excess is followed later
    if(Math.abs(co)>=limB-0.01&&mpend*co>0) mpend=0; // at the rail: don't keep movement that can't be used
    barVel=co-coPrev; coPrev=co;
    // overcharge: shaking the bar quickly back and forth fills a meter; when full the bar is overcharged for a few seconds
    if(state==='play'||state==='tee'){ if(Math.abs(barVel)>1){ var ocSg=barVel>0?1:-1; if(ocLast&&ocSg!==ocLast&&tick-ocTk<24) ocM=Math.min(1,ocM+0.16); ocLast=ocSg; ocTk=tick; } /* direction change of a fast movement, counted within 24 ticks of the previous fast move */ ocM=Math.max(0,ocM-0.005); if(ocT>0) ocT--; else if(ocM>=0.95){ ocT=420; ocM=0; msg=L('OVERCHARGED!'); msgT=70; shake=Math.max(shake,4); burst(cx+co,fl[0].py,8,14); } } else { ocM=0; ocT=0; }
    // trampoline bar: both ends fixed, the middle bends upward. Hold key = charge, release = hit
    if(stunT>0) stunT--;
    var kh=(K.l||K.r||(K.s&&state==='play'))&&stunT<=0, tt=0, kk=0.2, wmax=1.2, told=bulge;
    if(state!=='tee'){
      if(kh){ if(strikeT>0){ strikeT=0; chV=0; } if(Math.abs(mdy)>0.5) manualCh=true; if(manualCh) chS=Math.max(-1,Math.min(1,chS+mdy*msens*0.006)); else chS=(chS<0?-1:1)*Math.min(1,Math.abs(chS)+0.022); chV=Math.abs(chS); mdy=0; wasHeld=true; tt=-14*chS; } /* signed: mouse down = bowl, mouse up = arch; tension is the magnitude */ // charging: middle bulges downward (bowl)
      else { manualCh=false; mdy=0; chS=0; }
      if(!kh&&wasHeld){ wasHeld=false; ghostFire=Math.max(0.15,chV); var fullC=chV>=0.99; strikeP=Math.max(0.15,chV); strikeT=12; chV=0; capB=2*strikeP*(1+0.25*powT)+(fullC?1.5:0); /* full tension: faster ball */ }
      if(strikeT>0){ strikeT--; tt=6+16*strikeP; kk=0.4; wmax=(2+3*strikeP)*(1+0.12*powT); swingP=strikeP; } else swingP=0;
    } else { chV=0; wasHeld=false; // tee: bar bends downward while charging, snaps up on launch
      if(teeHeld) tt=-14*power;
      if(strikeT>0){ strikeT--; tt=6+16*strikeP; kk=0.4; wmax=2+3*strikeP; swingP=strikeP; } else swingP=0; }
    capB=Math.max(0,capB-0.02);
    bulgePrev=told; bulge+=Math.max(-wmax,Math.min(wmax,(tt-bulge)*kk)); bv=bulge-told; curB=bulge; place();
    if(state==='tee'){
      ball.x=cx+co; ball.y=fl[0].py-bulge-5; // ball rests on the bar
      var kdir=((K.mr||K.r)?1:0)-((K.ml||K.l)?1:0); if(teeHeld&&kdir){ aim=Math.max(-1.2,Math.min(1.2,aim+kdir*0.03)); aimKey=true; aimMx=mx; aimMy=my; } // keys: flight direction
      if(mouseIn&&K.s&&(!aimKey||mx!==aimMx||my!==aimMy)){ aimKey=false; aim=Math.max(-1.2,Math.min(1.2,Math.atan2(mx-ball.x,ball.y-my))); }
      if(mouseIn&&K.s) power=Math.max(0.1,Math.min(1,Math.hypot(mx-ball.x,my-ball.y)/150)); // distance mouse-ball = power (150px = max)
      if(K.s) teeHeld=true;
      else if(teeHeld){ teeHeld=false; strikeT=12; strikeP=power; strokes++; var sp=launchSp(power); ball.vx=Math.sin(aim)*sp; ball.vy=-Math.cos(aim)*sp; ball.e=1; ball.nb=true; state='play'; power=0; }
      return;
    }
    phys(true);
    extras.forEach(function(ex){ if(state!=='play') return; ball=ex; var pvx=ex.vx, pvy=ex.vy, wasH=ex.held; phys(false);
      if(ex.caught&&!wasH&&!ex.held&&!ex.dead&&ex.imp===tick){ ex.dead=true; burst(ex.x,ex.y,5,[2,4,1][(tick>>1)%3]); shake=Math.max(shake,2); } /* a caught shot breaks only on a real hit (boss or obstacle), boss damage is dealt first */ }); ball=mainBall;
    if(cheat.dclash&&state==='play'&&extras.length){ // hard upgrade: balls collide with each other (elastic) and charge each other up
      var cb=[mainBall].concat(extras), cr=ballR()*2+1, ci, cj; for(ci=0;ci<cb.length;ci++) for(cj=ci+1;cj<cb.length;cj++){ var A=cb[ci], B=cb[cj]; if(!A||!B||A.held||B.held) continue;
        var dx=B.x-A.x, dy=B.y-A.y, dd=Math.hypot(dx,dy); if(dd>=cr||dd<0.01) continue; var nx=dx/dd, ny=dy/dd, rv=(A.vx-B.vx)*nx+(A.vy-B.vy)*ny; if(rv<=0) continue; // only when approaching
        A.vx-=rv*nx; A.vy-=rv*ny; B.vx+=rv*nx; B.vy+=rv*ny; var ov=(cr-dd)/2; A.x-=nx*ov; A.y-=ny*ov; B.x+=nx*ov; B.y+=ny*ov;
        A.e=Math.min(1,(A.e||0)+0.25); B.e=Math.min(1,(B.e||0)+0.25); burst((A.x+B.x)/2,(A.y+B.y)/2,3,[1,4,14][(tick>>1)%3]); shake=Math.max(shake,2); score+=mult()*15; } } // reset() in the extra-ball pass must not replace the main ball
    extras=extras.filter(function(q){ return !q.dead; });
  }
  function heldAny(){ return !!(mainBall&&mainBall.held)||extras.some(function(b){ return b.held; }); }
  function hitE(){ if(mode!=='breakout'||pw.F>0||cheat.energy) return; ball.hc=(ball.hc||0)+1; ball.e=Math.min(1,(ball.e||0)+0.03+0.012*Math.min(ball.hc,15)); } // chain: the more objects hit since the last bar contact, the more energy per hit
  function barCollide(){ var c=cx+co, L=fl[0].len/2, y0=fl[0].py, N=16, R=ballR(), th=2, bowl=curB<-2&&swingP<=0&&strikeT<=0; // tensioned bar = bowl: ball stays put, rolls to the middle
    if(ball.nb){ if(ball.y<y0-26||ball.vy>0) ball.nb=false; else return; } // freshly launched: bar hit does not deflect the ball
    for(var j=0;j<N;j++){
      var u1=-1+2*j/N, u2=-1+2*(j+1)/N, x1=c+u1*L, y1=y0-curB*(1-u1*u1), x2=c+u2*L, y2=y0-curB*(1-u2*u2);
      var dx=x2-x1, dy=y2-y1, l2=dx*dx+dy*dy||1, t=Math.max(0,Math.min(1,((ball.x-x1)*dx+(ball.y-y1)*dy)/l2)), qx=x1+dx*t, qy=y1+dy*t, ex=ball.x-qx, ey=ball.y-qy, d=Math.hypot(ex,ey);
      if(d<R+th+1&&d>0){ ball.hc=0; ball.imp=tick; if(ocT>0&&mode==='breakout') ball.e=1; /* overcharged bar: full energy on contact */ var nx=ex/d, ny=ey/d; ball.x=qx+nx*(R+th+1); ball.y=qy+ny*(R+th+1);
        var uu=(qx-c)/L, vsy=-bv*(1-uu*uu), rx=ball.vx, ry=ball.vy-vsy, dn=rx*nx+ry*ny;
        if(bowl&&chV>0.3&&(K.l||K.r||K.s)&&!ball.held&&!ball.stk&&state==='play'){ if(!heldAny()) aim=0; ball.held=true; ball.hu=Math.max(-0.9,Math.min(0.9,uu)); ball.vx=ball.vy=0; burst(ball.x,ball.y,2,4); return; } // tensioned bar: ball sticks to the bowl
        var rolling=false;
        if(dn<0){ if(-dn<(bowl?3.4:1.6)){ rx-=dn*nx; ry-=dn*ny; rolling=true; } // slow: ball rolls along the curvature (ramp)
          else { var kr=bowl?1.2:1.9; rx-=kr*dn*nx; ry-=kr*dn*ny; } } // fast: trampoline bounce (bowl: restitution 0.2 = ball stays)
        if(bowl){ ball.bowl=tick; if(rolling){ rx*=0.965; ry*=0.965; } } // damping: ball swings out and rests in the bowl
        if(rolling&&Math.abs(curB)>3&&!bowl){ // ramp: ball gains momentum along the curve
          var tx=-ny, ty=nx, vt=rx*tx+ry*ty, dir=Math.abs(vt)>0.25?(vt>0?1:-1):(ty>0?1:-1);
          rx+=tx*dir*0.09; ry+=ty*dir*0.09; ball.rt=tick;
          var atEnd=(j===0&&rx<0)||(j===N-1&&rx>0); // at the end of the curve it flies out with lots of momentum
          if(atEnd){ rx*=1.3; ry*=1.3; if(mode==='breakout') ball.e=Math.min(1,ball.e+0.4); burst(ball.x,ball.y,3,4); shake=3; } }
        ball.vx=rx; ball.vy=ry+vsy;
        var wk=bowl?0:(curB<0?Math.max(0,1+curB/1.2):Math.max(0,1-Math.abs(curB)/8)); // tensioned (bowl): no arcade angle, only real physics of the curvature // straight bar: bounce angle as in the original
        if(wk>0&&dn<0&&ny<-0.5){ var spk=Math.max(Math.hypot(ball.vx,ball.vy),3.4)*(1+(flingF()-1)*0.5)*(1+Math.min(0.9,Math.abs(barVel)*0.22)), ang=uu*1.1+Math.max(-0.8,Math.min(0.8,barVel*0.14)); // fast sideways bar movement (slicing the ball): much more speed and a steeper angle // contact point on the bar + bar movement
          ball.vx=ball.vx*(1-wk)+Math.sin(ang)*spk*wk; ball.vy=ball.vy*(1-wk)-Math.cos(ang)*spk*wk; ball.rt=0; if(ocT>0&&tick-(ball.oct||-99)>20){ ball.oct=tick; ball.vx*=1.7; ball.vy*=1.7; } if(mode==='breakout') ball.e=Math.min(1,(ball.e||0)+0.15+Math.min(0.85,Math.abs(barVel)*0.25)); } // faster bar = more energy
        if(!bowl&&dn<0&&ny<-0.3&&Math.abs(barVel)>0.4){ var gtx=-ny, gty=nx, gvt=ball.vx*gtx+ball.vy*gty, gk=Math.min(0.7,(0.2+Math.abs(barVel)*0.06)*(1+Math.min(0.7,Math.abs(curB)/5))), gd=(barVel*gtx*1.6-gvt)*gk; ball.vx+=gtx*gd; ball.vy+=gty*gd; } // grip along the CURVED surface: the bar drags the ball along its tangent; more curvature = more grip and the ball follows the curve up/down
        if(-vsy>1.2&&tick-(ball.kt||-99)>18){ ball.kt=tick; var fullK=swingP>=0.97, kq=(swingP*3.2*(1-uu*uu)+1.2)*flingF()*(fullK?1.3:1); ball.vx+=nx*kq; ball.vy+=ny*kq; // kick along the surface normal: angle follows the curvature
         
          if(mode==='breakout'&&swingP>0) ball.e=Math.min(1,ball.e+0.5+1.0*swingP+0.1*powT+(fullK?0.3:0)); // full tension: more energy
          burst(ball.x,ball.y,2,4); shake=3; }
        break; } } }
  function phys(main){
    if(ball.swal>0){ if(!boss){ ball.swal=0; } else { ball.swal--; ball.x=boss.x; ball.y=boss.y; ball.vx=ball.vy=0;
      if(ball.swal<=0){ var ta=Math.PI/2-Math.max(-0.9,Math.min(0.9,Math.atan2(W*(0.3+rnd()*0.4)-boss.x,100))); ball.vx=Math.cos(ta)*7.5; ball.vy=Math.sin(ta)*7.5; ball.e=1; ball.bh=tick+30; boss.fl=8; burst(boss.x,boss.y+boss.h/2,6,3); shake=6; msg=L('CHARGED!'); msgT=40; } return; } }
    if(ball.held){ if(state!=='play'){ ball.held=false; } else if((K.l||K.r||K.s)&&stunT<=0){ var uh=ball.hu; ball.x=cx+co+uh*fl[0].len/2; ball.y=fl[0].py-curB*(1-uh*uh)-ballR()-3; ball.vx=ball.vy=0; ball.ca=Math.max(-1,Math.min(1,Math.atan(2*curB*uh/(fl[0].len/2)))); return; }
      else { ball.held=false; var spL=launchSp(Math.max(0.15,strikeP))*(ocT>0?1.7:1), anL=Math.max(-1.3,Math.min(1.3,aim+(ball.ca||0))); ball.vx=Math.sin(anL)*spL; ball.vy=-Math.cos(anL)*spL; ball.e=1; ball.nb=true; burst(ball.x,ball.y,3,4); shake=2; return; } } // release: ball flies in the set direction
    if(ball.stk){ if(--ball.stT<=0) releaseSticky(ball,ball.stk); return; }   // sticks to the block: waits briefly, then splits
    if(pw.F>0||cheat.energy){ ball.e=1; }
    if(cheat.drunk) ball.vx+=Math.sin(tick*0.09+ball.y*0.05)*0.07; // stagger
    if(cheat.trail&&(tick&1)) burst(ball.x,ball.y,1,[2,3,4,5,8,9,13,14][(tick>>1)&7]);
    if(cheat.quake&&state==='play') shake=Math.max(shake,2);
    if(mode==='breakout'){
      // Arkanoid feel: charged ball flies weightlessly at constant speed, energy slowly fades
      var en=ball.e; ball.e=Math.max(0,en-0.0011*[3,2,1.4,1][chgT]);
      if(!cheat.nograv) ball.vy+=(cheat.antigrav?-1:1)*0.1*(1-en)*(1-en)*(1-en*0.5); // without energy: gravity; the more energy, the more weightless
      if(en>0.05){ var s0=Math.hypot(ball.vx,ball.vy)||1, tgt=1.6+4.4*en+2.4*en*en*en+5*Math.max(0,(en-0.85)/0.15)+capB, k=1+(tgt/s0-1)*(0.2+0.15*en*en+0.2*Math.max(0,(en-0.9)/0.1))*en; // full energy: clearly faster and snappier acceleration
         ball.vx*=k; ball.vy*=k;
        if(en>0.4){ var mn=0.3*Math.hypot(ball.vx,ball.vy); if(Math.abs(ball.vy)<mn) ball.vy=(ball.vy<0?-1:1)*mn; } }
    } else { if(!cheat.nograv) ball.vy+=(cheat.antigrav?-1:1)*0.06*BALL_SPEED*(pw.F>0?0.3:1); if(!pw.F&&!cheat.energy) ball.e=Math.max(0,(ball.e||0)-0.0006); }
    gWaves.forEach(function(w){ if(w.hit.indexOf(ball)>=0||ball.held||ball.stk) return; var R8=ballR();
      if(Math.abs(ball.x-w.x)<w.w/2+R8&&Math.abs(ball.y-w.y)<R8+7){ w.hit.push(ball); ball.vy=Math.min(ball.vy,0)-(2.5+3.5*w.p)*(w.p>=0.99?1.25:1); ball.vx*=0.7; ball.e=w.p>=0.99?1:Math.min(1,(ball.e||0)+0.1+0.3*w.p); burst(ball.x,ball.y,3,12); shake=Math.max(shake,3); } });
    // Space in play = short nudge upward (with cooldown)
    if(main){
    if(bumpCd>0) bumpCd--;
    var gFire=ghostFire; ghostFire=false; var gOn=pw.H>0||cheat.ghost;
    if((gFire||(K.g && !bumpHeld)) && bumpCd<=0 && gOn){ gWaves.push({x:cx+co,y:fl[0].py-4,w:fl[0].len,hit:[],p:(typeof gFire==='number'&&gFire>0)?Math.min(1,gFire):1}); burst(cx+co,fl[0].py-4,3,14); shake=2; bumpCd=30; } // Ghost Shot: a wave rises from the bar and kicks every ball it touches upward
    gWaves.forEach(function(w){ caps.forEach(function(c){ if(!c.dead&&Math.abs(c.x-w.x)<w.w/2+7&&Math.abs(c.y-w.y)<10){ collect(c.k,c); c.dead=true; burst(c.x,c.y,3); } }); }); // the wave also picks up perk capsules
    gWaves.forEach(function(w){ w.y-=5; }); gWaves=gWaves.filter(function(w){ return w.y>6; });
    bumpHeld=!!K.g;
    // anti-stuck: if the ball stays in the same area for long, it gets a random nudge
    if(++stuckN>=150){ if(tick-(ball.bowl||-99)>20&&Math.hypot(ball.x-stuckX,ball.y-stuckY)<30){ ball.vy-=2.2; ball.vx+=(Math.random()-0.5)*3; }
      stuckN=0; stuckX=ball.x; stuckY=ball.y; }
    }
    var sp2=Math.hypot(ball.vx,ball.vy); var capS=(6+capB+((tick-(ball.rt||-99))<30?3:0))*flingF(); if(sp2>capS){ ball.vx*=capS/sp2; ball.vy*=capS/sp2; }
    var R=ballR();
    // proximity charge: the closer the ball to pools/trampolines, the more energy transfers to it
    if(mode==='breakout') guides.forEach(function(g2){ if(g2.off||!g2.chg) return;
      var d=segDist(g2,ball.x,ball.y), range=14+g2.chg*22;
      if(d<range){ ball.e=Math.min(1,ball.e+g2.chg*0.06*(1+0.4*chgT)*(1-d/range)); g2.glow=4; } });
    var coF=co;
    for(var ss=0;ss<4;ss++){ // sub-steps against tunneling
    if(state!=='play') break;
    if(main){ co=coS+(coF-coS)*(ss+1)/4; place(); } // bar + rails move along in sub-steps, otherwise they jump through the ball
    curB=bulgePrev+(bulge-bulgePrev)*(ss+1)/4; // bar bends along during the frame
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
      if(d<b.r+R && d>0){ ball.x=b.x+ex/d*(b.r+R); ball.y=b.y+ey/d*(b.r+R); if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); } hitE(); bounceRel(ex/d,ey/d,1.3,b); score+=mult()*10; if(special(b)){ addG(b.r>=9?40:(b.r>=6?25:12)); burst(b.x,b.y,3,4); } else addG(3); b.flash=6; if(pw.M>0) b.hp--; if(--b.hp<=0){ b.dead=true; addG(special(b)?40:20); drop(b.x,b.y,0.45); score+=mult()*b.pts; burst(b.x,b.y,b.r); floatPop(ball.x,ball.y,'+'+(b.pts+10)); } }
    });
    bumpers=bumpers.filter(function(q){ return !q.dead; });
    blocks.forEach(function(o){ var qx=Math.max(o.x,Math.min(ball.x,o.x+o.w)), qy=Math.max(o.y,Math.min(ball.y,o.y+o.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R){ if(bd>0){ bx/=bd; by/=bd; ball.x=qx+bx*R; ball.y=qy+by*R; } else { var nn=insideRect(o,R); bx=nn[0]; by=nn[1]; }
        if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); }
        hitE(); if(pw.M<=0) bounce(bx,by,0.8); o.hp-=(pw.M>0?2:1); o.fl=6; score+=mult()*10; addG(1); burst(ball.x,ball.y,1,11);
        if(o.hp<=0){ o.dead=true; score+=mult()*40*o.hp0; addG(5); burst(o.x+5,o.y+3,4,12); drop(o.x+5,o.y,0.2); } } });
    blocks=blocks.filter(function(q){ return !q.dead; });
    if(tut&&main&&skipT>0){ var sk=skipRect(), skx=Math.max(sk.x,Math.min(ball.x,sk.x+sk.w)), sky=Math.max(sk.y,Math.min(ball.y,sk.y+sk.h)); if(Math.hypot(ball.x-skx,ball.y-sky)<R){ finishTut(); return; } } // shooting the SKIP block ends the tutorial
    if(!ball.stk) stickies.forEach(function(o){ if(o.dead||o.busy||ball.stk) return; var qx=Math.max(o.x,Math.min(ball.x,o.x+o.w)), qy=Math.max(o.y,Math.min(ball.y,o.y+o.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R+0.5){ if(bd>0){ bx/=bd; by/=bd; } else { bx=0; by=-1; } ball.stk=o; o.busy=true; ball.stT=36; ball.sn=Math.atan2(by,bx); ball.x=qx+bx*(R+0.5); ball.y=qy+by*(R+0.5); ball.vx=ball.vy=0; o.fl=10; burst(ball.x,ball.y,2,o.c); score+=mult()*10; } });
    stickies=stickies.filter(function(q){ return !q.dead; });
    if(!ball.stk&&!ball.held){
      if(portals.length===2&&tick-(ball.pt||-99)>25) for(var pi3=0;pi3<2;pi3++){ var po=portals[pi3]; if(Math.hypot(ball.x-po.x,ball.y-po.y)<po.r+R){ var po2=portals[1-pi3], sp3=Math.hypot(ball.vx,ball.vy)||1; ball.pt=tick; burst(po.x,po.y,3,13); ball.x=po2.x+ball.vx/sp3*(po2.r+R+1); ball.y=po2.y+ball.vy/sp3*(po2.r+R+1); burst(po2.x,po2.y,3,14); score+=mult()*20; break; } } // portal: exits at the other one, direction is kept
      pads.forEach(function(pd){ if(ball.x>pd.x-R&&ball.x<pd.x+pd.w+R&&Math.abs(ball.y-(pd.y+pd.h/2))<pd.h/2+R&&tick-(ball.pdt||-99)>14){ ball.pdt=tick; if(pd.v===0) ball.vy=Math.min(ball.vy,0)-3.5; else ball.vx+=pd.d*3.5; if(mode==='breakout') ball.e=Math.min(1,(ball.e||0)+0.2); burst(ball.x,ball.y,2,4); score+=mult()*10; } }); // boost pad
    }
    bossCollide();
    barCollide();
    for(var bi=0;bi<bricks.length;bi++){ var br=bricks[bi];
      var qx=Math.max(br.x,Math.min(ball.x,br.x+br.w)), qy=Math.max(br.y,Math.min(ball.y,br.y+br.h)), bx=ball.x-qx, by=ball.y-qy, bd=Math.hypot(bx,by);
      if(bd<R){ if(bd>0){ bx/=bd; by/=bd; ball.x=qx+bx*R; ball.y=qy+by*R; } else { var nb=insideRect(br,R); bx=nb[0]; by=nb[1]; }
        if(pw.Y>0&&tick-(ball.bt||-99)>20){ ball.bt=tick; boom(ball.x,ball.y); }
        if(!bricks.length) break; hitE(); if(pw.M<=0) bounce(bx,by,1); br.hp-=(pw.M>0?2:1); if(br.hp>0){ br.fl=6; score+=mult()*10; burst(br.x+br.w/2,br.y+br.h/2,1,11); break; } drop(br.x+br.w/2,br.y,0.28*br.w/12); bricks.splice(bi,1); score+=mult()*50; addG(2);
        if(!bricks.length){ winLevel(); }
        break; } }
    holes.forEach(function(h){ // hole = kicker: ball is briefly caught and shot back into the field
      if(main&&!h.done&&state==='play'&&Math.hypot(ball.x-h.x,ball.y-h.y)<h.r-1){
        h.done=true; capH=h; capT=45; state='capt'; ball.vx=0; ball.vy=0; ball.x=h.x; ball.y=h.y;
        score+=mult()*150; addG(30); msg=L('HOLE! +150'); msgT=60; burst(h.x,h.y,4,4); }
    });
    if(ball.y>H+6){
      if(saver){ saver=false; ball.y=H-12; ball.vy=-6; ball.vx*=0.5; ball.e=1; msg=L('BALL SAVED'); msgT=60; }
      else if(!main){ ball.dead=true; }
      else if(extras.length){ var nb=extras.pop(); ball.x=nb.x; ball.y=nb.y; ball.vx=nb.vx; ball.vy=nb.vy; ball.e=nb.e; }
      else if(mode==='golf'){ msg=L('OUT! +1 STROKE'); msgT=80; strokes++; dropCaps(); reset(); }
      else { dropCaps(); if(!cheat.lives&&!(ambient&&!ambFull)&&!tut) lives--; if(lives<=0){ overIdx=(lvNum()-1)%LEVELS.length; overScore=score; clearSave(); overT=0; overSel=0; overR={}; msgT=0; state='over'; if(document.exitPointerLock&&locked()) document.exitPointerLock(); } else { msg=L('BALL LOST'); msgT=80; reset(); } }
    }
    }
    if(main&&co!==coF){ co=coF; place(); }
  }
  function txtS(str,x,y,c,sc){ str=String(str).toUpperCase(); x=Math.round(x); y=Math.round(y); g.fillStyle=C[c];
    for(var i=0;i<str.length;i++){ var gl=F[str[i]]||F[' ']; for(var p=0;p<15;p++) if(gl[p]==='1') g.fillRect(x+i*4*sc+(p%3)*sc,y+((p/3)|0)*sc,sc,sc); } }
  function bevel(x,y,w,h,fill,hi,lo){ box(x-1,y-1,w+2,h+2,0); box(x,y,w,h,fill); box(x,y,w,1,hi); box(x,y,1,h,hi); box(x,y+h-1,w,1,lo); box(x+w-1,y,1,h,lo); }
  var HEART=['0110110','1111111','1111111','0111110','0011100','0001000'];
  function rd(bg,pref,min){ var lb=lumOf(rgbOf(C[bg])); min=min||90; for(var i=0;i<pref.length;i++) if(Math.abs(lumOf(rgbOf(C[pref[i]]))-lb)>=min) return pref[i]; var bi=1,bd=-1; for(var k=0;k<C.length;k++){ var d=Math.abs(lumOf(rgbOf(C[k]))-lb); if(d>bd){ bd=d; bi=k; } } return bi; } // readable color on background (all styles)
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
  function coinAt(cx0,cy0,col,spin,sd){ if(!spin){ disc(cx0,cy0,2,col); return; } var cs=Math.abs(Math.cos(tick*(0.045+((sd*7)%5)*0.006)+(((sd+1)*2654435761)>>>0)%628/100)); for(var q=-2;q<=2;q++){ var hw=Math.round(Math.sqrt(6.5-q*q)*cs); box(cx0-hw,cy0+q,hw*2+1,1,col); } }
  function shopTile(i,x,y,it){ var w=62, h=42, foc=sel===i, t=it.g(), maxed=!it.rep&&t>=3, mo=moOf(i,it), free=!it.rep&&t<mo;
    var cost=(maxed||free)?null:it.c[it.rep?0:t], can=free||(cost!==null&&gold>=cost); shopR['b'+i]={x:x,y:y,w:w,h:h};
    bevel(x,y,w,h,12,11,15); if(foc){ box(x-2,y-2,w+4,2,4); box(x-2,y+h,w+4,2,4); box(x-2,y,2,h,4); box(x+w,y,2,h,4); }
    shopIcon(i,x+20,y+3);
    var bgT=12; txt(it.n.length>14?it.n.slice(0,14):it.n,x+((w-it.n.length*4)>>1),y+27,rd(bgT,can?[1,4]:[11,14,3],can?110:70));
    if(!it.rep) for(var k=0;k<3;k++) { if(k<t) box(x+5+k*7,y+36,5,4,rd(bgT,[4,5,1],90)); else if(k<mo){ box(x+5+k*7,y+36,5,4,rd(bgT,[11,14,3],60)); box(x+6+k*7,y+37,3,2,15); } else box(x+5+k*7,y+36,5,4,15); }
    var pr=cost===null?(free?L('PICK'):'MAX'):String(cost); var pc=cost===null?rd(bgT,[5,4],110):(can?rd(bgT,[4,5,1],110):11); txt(pr,x+w-4-pr.length*4-(cost===null?0:6),y+36,pc); if(cost!==null) coinAt(x+w-6,y+38,pc,can,i+shopTab*40); }
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
      else if(id==='dclash'){ disc(x+7,y+11,4,1); disc(x+15,y+11,4,14); box(x+10,y+9,3,1,4); box(x+10,y+13,3,1,4); box(x+11,y+5,1,3,4); box(x+11,y+15,1,3,4); }
      else { for(var a4=0;a4<6;a4++) for(var b4=0;b4<4;b4++) box(x+2+a4*3,y+3+b4*4,2,2,(a4+b4)%2?14:3); } }
    else if(kind===1){ var pl=paletteFor(id); for(var q=0;q<16;q++) box(x+1+(q%4)*5,y+1+((q/4)|0)*5,5,5,0), box(x+2+(q%4)*5,y+2+((q/4)|0)*5,4,4,15), (function(c){ g.fillStyle=pl[c]; g.fillRect(x+2+(c%4)*5,y+2+((c/4)|0)*5,4,4); })(q); }
    else if(id==='sharp'){ for(var a1=0;a1<4;a1++) for(var b1=0;b1<4;b1++) box(x+2+a1*5,y+2+b1*5,5,5,(a1+b1)%2?12:1); }
    else if(id==='soft'){ for(var a2=0;a2<20;a2++) { var lv=a2/19; g.fillStyle='rgb('+Math.round(40+lv*200)+','+Math.round(40+lv*200)+','+Math.round(60+lv*190)+')'; g.fillRect(x+1+a2,y+2,1,18); } }
    else if(id==='crt'){ for(var a3=0;a3<20;a3+=2){ box(x+1,y+1+a3,20,1,14); box(x+1,y+2+a3,20,1,7); } }
    else if(id==='psx'){ psxGem(x+11,y+11,8,4,tick*0.03); psxPrism(x+3,y+15,6,4,2,2); } // low-poly gem + cube
    else { disc(x+11,y+11,9,3); disc(x+11,y+11,6,4); disc(x+11,y+11,3,1); } }
  function cosTile(i,x,y,it){ var w=62, h=42, foc=sel===i, own1=shopTab>=3?!!own['c_'+it.id]:!!own[it.id], on=shopTab>=3?!!cheat[it.id]:(shopTab===1?actv.style:actv.qual)===it.id, can=!own1&&gold>=it.c; shopR['b'+i]={x:x,y:y,w:w,h:h};
    bevel(x,y,w,h,12,on?5:11,15); if(foc){ box(x-2,y-2,w+4,2,4); box(x-2,y+h,w+4,2,4); box(x-2,y,2,h,4); box(x+w,y,2,h,4); }
    cosIcon(shopTab,it.id,x+20,y+3);
    var bgC=12; txt(it.n,x+((w-it.n.length*4)>>1),y+27,rd(bgC,(own1||it.rep)?[1,4]:[11,14,3],(own1||it.rep)?110:70));
    if(own1&&!it.rep&&shopTab<3){ var bl=on?L('ACTIVE'):L('PICK'), bw=bl.length*4+10, bx2=x+((w-bw)>>1); // styles/graphics: only one can be active -> plain button
      bevel(bx2,y+33,bw,8,on?5:(foc?8:12),on?4:11,on?2:15); txt(bl,bx2+5,y+35,on?0:1); }
    else if(own1&&!it.rep){ var lb=on?L('ON'):L('OFF'), swx=x+((w-(20+4+lb.length*4))>>1); // owned: real on/off switch
      box(swx-1,y+33,22,8,0); box(swx,y+34,20,6,on?5:15); box(swx,y+34,20,1,on?4:12); var kx=on?swx+11:swx+1; box(kx,y+34,8,6,0); box(kx+1,y+35,6,4,on?1:11); box(kx+1,y+35,6,1,1);
      txt(lb,swx+24,y+35,on?rd(bgC,[5,4,1],110):rd(bgC,[11,14,3],80)); }
    else if(!(own1&&!it.rep)) { var pr=String(it.c), pcc=can?rd(bgC,[4,5,1],110):11; txt(pr,x+((w-pr.length*4-6)>>1),y+36,pcc); coinAt(x+((w-pr.length*4-6)>>1)+pr.length*4+3,y+38,pcc,can,i+shopTab*40); } }
  var TABIC=[['...#...','..###..','.#####.','...#...','...#...','...#...','.......'],['aaa.bbb','aaa.bbb','aaa.bbb','.......','ccc.ddd','ccc.ddd','ccc.ddd'],['#######','#.....#','#.....#','#.....#','#######','..###..','.#####.'],['....##.','...##..','..##...','.#####.','...##..','..##...','.##....'],['.#####.','#######','#.###.#','#######','.#####.','.#.#.#.','.......']]; // tab icons: arrow, palette, monitor, bolt, skull
  function drawShop(){
    box(0,0,W,H,15);
    for(var si=0;si<90;si++){ var sx=(si*73)%W, sy=(si*131)%H; box(sx,sy,1,1,((si+(tick>>4))%5===0)?1:12); }
    var PW=288, px=(cx-PW/2)|0, py=14, list=curList(), N=list.length;
    shopR={};
    bevel(px,py-2,PW,196,12,11,15);
    for(var rv=0;rv<2;rv++) for(var rw=0;rw<2;rw++) box(px+3+rv*(PW-9),py+1+rw*188,3,3,1);
    txtS('SHOP',px+7,py+3,4,2); box(px+42,py+1,44,16,12); box(px+42,py+1,41,15,0); box(px+44,py+3,37,11,15); for(var sl=0;sl<11;sl+=2) box(px+44,py+3+sl,37,1,0); var gs=gold<1000?String(gold):(gold<10000?(Math.floor(gold/100)/10)+'K':Math.floor(gold/1000)+'K'); txtS(gs,px+70-gs.length*4,py+6,4,1); { var cxx=px+77, cs=Math.abs(Math.cos(tick*0.04)); for(var cy2=-3;cy2<=3;cy2++){ var hw=Math.round(Math.sqrt(10-cy2*cy2)*cs); box(cxx-hw,py+8+cy2,hw*2+1,1,4); } }
    // tabs
    if(!tabVis(shopTab)){ for(var fv=0;fv<5;fv++) if(tabVis(fv)){ shopTab=fv; sel=0; break; } }
    var vTabs=0; TABN.forEach(function(nm,ti){ shopR['t'+ti]=null; if(!tabVis(ti)) return; var tw3=35, tx=px+89+(vTabs++)*38, ty=py+1; shopR['t'+ti]={x:tx,y:ty,w:tw3,h:16}; if(ti===tabNew&&((tick>>3)&1)){ box(tx,ty-5,tw3,4,4); txt('NEW',tx+((tw3-12)>>1),ty-4,0); } var hv=hit(shopR['t'+ti])&&shopTab!==ti;
      bevel(tx,ty,tw3,16,shopTab===ti?7:(hv?12:15),shopTab===ti?8:(hv?11:12),shopTab===ti?15:0); var tcol=shopTab===ti?1:(hv?4:11), cw=10+3+nm.length*4, ox0=tx+((tw3-cw)>>1); TABIC[ti].forEach(function(row,ry){ for(var rx=0;rx<7;rx++) if(row[rx]!=='.') box(ox0+((rx*3)>>1),ty+3+((ry*3)>>1),(((rx+1)*3)>>1)-((rx*3)>>1),(((ry+1)*3)>>1)-((ry*3)>>1),ti===1&&shopTab!==1?11:(ti===1?({a:2,b:4,c:5,d:8}[row[rx]]||tcol):tcol)); }); txt(nm,ox0+13,ty+5,tcol); });
    if(vTabs===0){ // shop's closed: no tab found yet
      var iwc=PW-14, sgx=cx|0, sgy=py+34, bob=Math.round(Math.sin(tick*0.04)*1.5);
      box(sgx-50,py+18,2,sgy-py-18+bob,11); box(sgx+48,py+18,2,sgy-py-18+bob,11); box(sgx-52,py+18,6,3,12); box(sgx+46,py+18,6,3,12); // chains
      bevel(sgx-70,sgy+bob,140,40,2,3,6); txtS("SHOP'S",sgx-((6*8)>>1),sgy+7+bob,1,2); txtS('CLOSED',sgx-((6*8)>>1),sgy+22+bob,1,2);
      [L('THE SHELVES ARE EMPTY.'),L('FIND SECRET SHOP KEYS IN THE STAGES'),L('TO OPEN THE FIRST TAB.')].forEach(function(ln,li){ txt(ln,sgx-((ln.length*4)>>1),py+88+li*9,li===0?8:11); });
      var gyc=py+160; shopR.go={x:px+7,y:gyc,w:iwc,h:16}; bevel(px+7,gyc,iwc,16,7,8,6); if((tick>>3)&1) box(px+6,gyc-1,iwc+2,1,4); var wlc=L('BACK TO THE GAME - SPACE'); txtS(wlc,px+((PW-wlc.length*4)/2)|0,gyc+5,0,1);
      if(mouseIn){ drawCursor(); } return; }
    py+=12;
    // pages: 8 entries per page (4x2), flip left/right with smooth sliding
    var R=Math.max(1,Math.ceil(N/4)), maxTop=Math.max(0,R-2), VY=py+13, VH=102, TX=px+275;
    if(sel<N){ var rowS=sel>>2; if(rowS<shopPg-0.5) shopPg=rowS; else if(rowS>shopPg+1.5) shopPg=rowS-1; } shopPg=Math.max(0,Math.min(maxTop,shopPg));
    if(shopDrag&&maxTop>0){ var thH0=Math.max(10,Math.round(84*2/R)); shopPg=Math.max(0,Math.min(maxTop,(my-(VY+9)-thH0/2)/(84-thH0)*maxTop)); if(sel<N) shopPageTo(shopPg); }
    shopPosF+=(shopPg-shopPosF)*0.35; if(Math.abs(shopPg-shopPosF)<0.005) shopPosF=shopPg;
    g.save(); g.beginPath(); g.rect(px+4,VY,PW-8,VH); g.clip();
    for(var gi=0;gi<N;gi++){ var gx=px+7+(gi%4)*64, gy2=Math.round(py+15+((gi>>2)-shopPosF)*45+Math.min(1,shopPosF)*7); if(gy2>VY+VH||gy2+42<VY) continue; /* when scrolled, the row above peeks in at the top */ if(shopTab===0) shopTile(gi,gx,gy2,list[gi]); else cosTile(gi,gx,gy2,list[gi]); }
    g.restore();
    for(var di=0;di<N;di++){ var rb=shopR['b'+di]; if(!rb) continue; if(shopPosF!==shopPg||rb.y<VY||rb.y+rb.h>VY+VH){ var ty0=Math.max(rb.y,VY), ty1=Math.min(rb.y+rb.h,VY+VH); if(shopPosF!==shopPg||ty1-ty0<=0) delete shopR['b'+di]; else { rb.y=ty0; rb.h=ty1-ty0; } } }
    // scrollbar: up/down buttons, track, draggable thumb (only if the list is longer than two rows)
    shopR.su={x:TX,y:VY,w:7,h:7}; shopR.sd={x:TX,y:VY+VH-7,w:7,h:7}; var trY=VY+9, trH=VH-18;
    bevel(TX,VY,7,7,hit(shopR.su)?7:12,shopPg>0?8:11,15); bevel(TX,VY+VH-7,7,7,hit(shopR.sd)?7:12,shopPg<maxTop?8:11,15);
    for(var ak=0;ak<3;ak++){ box(TX+3-ak,VY+2+ak,1+2*ak,1,shopPg>0?4:11); box(TX+3-ak,VY+VH-3-ak,1+2*ak,1,shopPg<maxTop?4:11); }
    box(TX,trY,7,trH,0); box(TX+1,trY+1,5,trH-2,15); delete shopR.st;
    if(maxTop>0){ var thH=Math.max(10,Math.round(trH*2/R)), thY=trY+Math.round(shopPosF/maxTop*(trH-thH)); shopR.st={x:TX,y:thY,w:7,h:thH}; bevel(TX+1,thY,5,thH,hit(shopR.st)||shopDrag?7:12,8,15); box(TX+2,thY+(thH>>1)-1,3,1,4); box(TX+2,thY+(thH>>1)+1,3,1,4); }
    // info for the focused entry
    var iy=py+117, ix=px+7, iw=PW-14, ih=40; bevel(ix,iy,iw,ih,15,12,11); function actBar(t,x0,y0,c){ box(ix+3,iy+27,iw-6,10,0); box(ix+3,iy+27,iw-6,1,12); txt(t,ix+((iw-t.length*4)>>1),iy+30,c); }
    if(sel<N){ var it=list[sel];
      if(shopTab===0){ var t=it.g(), maxed=!it.rep&&t>=3, mo2=moOf(sel,it), free2=!it.rep&&t<mo2, cost=(maxed||free2)?null:it.c[it.rep?0:t], can=cost!==null&&gold>=cost;
        txtS(it.n,ix+6,iy+3,4,1); txt(it.rep?L('ANY NUMBER OF TIMES'):L('TIER ')+t+L(' OF 3'),ix+iw-6-(it.rep?48:56),iy+3,11);
        txt(L('NOW'),ix+6,iy+11,11); txt(it.rep?'-':(t>0?it.d[t-1]:L('NOT BOUGHT')),ix+32,iy+11,1);
        txt(L('NEW'),ix+6,iy+18,11); txt(maxed?L('MAXED OUT'):it.d[it.rep?0:t],ix+32,iy+18,maxed?5:8);
        actBar(maxed?L('ENTER = TURN OFF'):(free2?L('ENTER = TIER ')+(t+1)+L(' SELECT'):(can?L('ENTER = BUY FOR ')+cost+' G':(t>0?L('NOT ENOUGH GOLD - ENTER = OFF'):L('NOT ENOUGH GOLD - NEEDS ')+cost+' G'))),ix+6,iy+26,(maxed||free2)?5:(can?4:2)); }
      else if(shopTab>=3){ var oc=!!own['c_'+it.id], onc=!!cheat[it.id], cc=gold>=it.c;
        txtS(it.n,ix+6,iy+3,4,1); txt(it.rep?L('ANY NUMBER OF TIMES'):(oc?(onc?L('ON'):L('OFF')):L('LOCKED')),ix+iw-6-(it.rep?48:(oc?12:28)),iy+3,it.rep?11:(oc?(onc?5:2):11));
        txt(it.d,ix+6,iy+11,1); txt(it.rep?L('ONE-TIME ACTION'):(shopTab===4?L('HARDER - POINTS +25 PERCENT'):L('CHEAT - ON AND OFF ANYTIME')),ix+6,iy+18,8);
        actBar(it.rep||!oc?(cc?L('ENTER = BUY FOR ')+it.c+' G':L('NOT ENOUGH GOLD - NEEDS ')+it.c+' G'):(onc?L('ENTER = TURN OFF'):L('ENTER = TURN ON')),ix+6,iy+26,(it.rep||!oc)?(cc?4:2):8); }
      else { var o1=!!own[it.id], on=(shopTab===1?actv.style:actv.qual)===it.id, can2=!o1&&gold>=it.c;
        txtS(it.n,ix+6,iy+3,4,1); txt(on?L('ACTIVE'):(o1?L('BOUGHT'):L('LOCKED')),ix+iw-6-(on?20:(o1?28:28)),iy+3,on?5:(o1?8:11));
        txt(it.d,ix+6,iy+11,1);
        txt(shopTab===1?L('COLOR PALETTE - SWITCH ANYTIME'):L('DISPLAY - SWITCH ANYTIME'),ix+6,iy+18,8);
        actBar(on?L('CURRENTLY ACTIVE'):(o1?L('ENTER = SELECT'):(can2?L('ENTER = BUY FOR ')+it.c+' G':L('NOT ENOUGH GOLD - NEEDS ')+it.c+' G')),ix+6,iy+26,on?5:(o1?8:(can2?4:2))); } }
    else { txtS(L('CONTINUE'),ix+6,iy+3,4,1); var ck=L('SPACE OR ENTER'); txt(ck,ix+iw-6-ck.length*4,iy+3,8); txt(L('BACK TO GAME - NEXT LEVEL'),ix+6,iy+11,1); txt(L('PROGRESS IS SAVED AUTOMATICALLY'),ix+6,iy+18,11); }
    var gy=py+160; shopR.go={x:px+7,y:gy,w:iw,h:16};
    bevel(px+7,gy,iw,16,sel>=N?7:5,sel>=N?8:14,6); if(sel>=N&&(tick>>3)&1) box(px+6,gy-1,iw+2,1,4); { var wl=shopAutoT>0?L('CONTINUE IN ')+Math.ceil(shopAutoT/60)+' S':L('CONTINUE - SPACE'); txtS(wl,px+((PW-wl.length*4)/2)|0,gy+5,0,1); if(shopAutoT>0) box(px+8,gy+13,Math.max(0,Math.floor((iw-2)*shopAutoT/shopAutoMax)),2,4); }
    var tk=L('   Q E SWITCHES TABS - ARROWS LEFT RIGHT FLIP PAGES - STYLES AND GRAPHICS ARE SAVED - KEY B OPENS THE SHOP AT THE TEE   '), off=(tick*0.7)|0, tl=tk.length*4;
    for(var ti=0;ti<tk.length;ti++){ var tx2=px+6+ti*4-(off%tl); if(tx2<px+6) tx2+=tl; if(tx2>=px+6&&tx2<px+PW-6-3) txtS(tk[ti],tx2,py+188,4,1); }
    if(mouseIn){ drawCursor(); }
  }
  // ---- title screen: random level scenes in the background, softly cross-faded ----
  var tbC=[document.createElement('canvas'),document.createElement('canvas')], tbCur=0, tbT=0, tbScene='', tbShow='', tbSc=['',''], TBLEN=300, TBFADE=70;
  function tbRender(ci){ var cv2=tbC[ci], oB=bgc, oS=scene, oSeed=seed, oMx=macX, oMy=macY, ss=[]; LEVELS.forEach(function(l){ if(ss.indexOf(l.scene)<0) ss.push(l.scene); });
    var pick=ss[(Math.random()*ss.length)|0]; if(pick===tbScene&&ss.length>1) pick=ss[(ss.indexOf(pick)+1+((Math.random()*(ss.length-1))|0))%ss.length];
    bgc=cv2; scene=pick; seed=(Math.random()*4e9)>>>0; renderScene(); cv2.bo=bgOff; bgc=oB; /* layers (landmark, sprites) stay separate so the title can move them with parallax */ scene=oS; seed=oSeed; macX=oMx; macY=oMy; tbSc[ci]=pick; tbScene=pick; return pick; }
  var CLD={dream:{c:'#ffe6f8',a:0.55,y1:150},golf:{c:'#ffffff',a:0.45,y1:80},train:{c:'#ffffff',a:0.45,y1:70},western:{c:'#ffffff',a:0.32,y1:110},flight:{c:'#ffffff',a:0.4,y1:150},city:{c:'#cfd8ff',a:0.2,y1:100}};
  function drawClouds(sc,po,t){ // three cloud layers: far ones are small, slow and barely follow the mouse, near ones are big, faster and move most
    var cf=CLD[sc]; if(!cf) return; [{n:4,s:0.05,pf:0.3,y0:6,y1:cf.y1*0.45,sz:0.7,a:0.55},{n:4,s:0.11,pf:0.6,y0:cf.y1*0.2,y1:cf.y1*0.75,sz:1,a:0.8},{n:3,s:0.2,pf:1,y0:cf.y1*0.4,y1:cf.y1,sz:1.4,a:1}].forEach(function(ly,li){ for(var i=0;i<ly.n;i++){
      var sd=li*13+i, span=W+90, x=((hsh(sd+1)*span+t*ly.s+po*ly.pf*3)%span+span)%span-45, y=ly.y0+hsh(sd+9)*(ly.y1-ly.y0), w=(18+hsh(sd+21)*22)*ly.sz; g.globalAlpha=cf.a*ly.a; g.fillStyle=cf.c;
      var xi=Math.round(x), yi=Math.round(y), wi=Math.round(w); g.fillRect(xi,yi,wi,3); g.fillRect(xi+3,yi-2,Math.round(wi*0.6),2); g.fillRect(xi+2,yi+3,wi-4,2); g.fillRect(xi+Math.round(wi*0.25),yi-3,Math.round(wi*0.3),1); } }); g.globalAlpha=1; }
  var titlePo=0;
  function bgPxAt(sc,y,po){ if(sc==='cozy'){ var hzc=H-36; return y<hzc?po*0.3:po*(0.3+0.9*(y-hzc)/(H-hzc)); } if(flatFor(sc)) return po*0.3; var hzp=H*({vapor:0.5,golf:0.42,dream:0.82,moon:0.78}[sc]||0.5); return y<=hzp?0:po*(y-hzp)/(H-hzp); } // parallax of a background plane for a given scene
  function drawBgLayers(src,sc,po){ // background strips in perspective, the landmark and the sprites move rigidly with their own plane
    if(Math.abs(po)<0.05){ g.drawImage(src,0,0); drawClouds(sc,po,tbT); if(src.lm) g.drawImage(src.lm,0,0); drawSprites(g,src,src.spOff,0,false); return; }
    for(var ys=0;ys<H;ys+=3){ var so=Math.round(bgPxAt(sc,ys+1.5,po)); g.drawImage(src,0,ys,W,3,so,ys,W,3); if(so>0) g.drawImage(src,0,ys,1,3,0,ys,so,3); else if(so<0) g.drawImage(src,W-1,ys,1,3,W+so,ys,-so,3); }
    drawClouds(sc,po,tbT); if(src.lm) g.drawImage(src.lm,Math.round(bgPxAt(sc,H*0.6,po)),0); drawSprites(g,src,src.spOff,0,function(b){ return bgPxAt(sc,b,po); }); }
  function titleBack(){ if(!tbT&&!tbScene){ tbScene=tbRender(0); tbRender(1); }
    tbT++; var ph=tbT%TBLEN, nxt=1-tbCur, al=0;
    if(ph===1) tbRender(nxt); // prepare next scene (random)
    if(ph>TBLEN-TBFADE) al=(ph-(TBLEN-TBFADE))/TBFADE;
    if(ph===0){ tbCur=nxt; al=0; }
    var tpt=mouseIn?(mx-cx)/cx*18:Math.sin(tbT*0.012)*9; titlePo+=(tpt-titlePo)*0.06; // mouse parallax, a slow sway without the mouse
    drawBgLayers(tbC[tbCur],tbSc[tbCur],titlePo); if(al>0){ g.globalAlpha=al; drawBgLayers(tbC[nxt],tbSc[nxt],titlePo); g.globalAlpha=1; }
    var sS=scene, wS=W, mdx=macDX; scene=tbSc[tbCur]; W=BGW; macDX=0; g.save(); g.translate(Math.round(bgPxAt(scene,H*0.3,titlePo))-(tbC[tbCur].bo||0),0); try{ bgAnim(); }catch(e){} g.restore(); W=wS; scene=sS; macDX=mdx; // animated sky details (stars, clouds, sparks) of the shown scene
    tbShow=tbSc[al>0.5?nxt:tbCur]; g.fillStyle='rgba(0,0,0,0.38)'; g.fillRect(0,0,W,H); }
  function bars(){ box(0,0,W,H,15);
    for(var si=0;si<90;si++){ var sx=(si*73)%W, sy=(si*131)%H; box(sx,sy,1,1,((si+(tick>>4))%5===0)?1:12); }
    for(var cb=0;cb<10;cb++){ var cc=[7,8,14,1,14,8,7,0,0,0][cb]; box(0,4+cb*2,W,2,cc); box(0,H-2-cb*2,W,2,[7,8,14,1,14,8,7,0,0,0][9-cb]); } }
  var MENUIC=[['.#.....','.##....','.###...','.####..','.###...','.##....','.#.....'],['...#...','...#...','...#...','#######','...#...','...#...','...#...'],['###.###','###.###','###.###','.......','###.###','###.###','###.###'],['..###..','.##....','##.....','##.....','##.....','.##....','..###..'],['..###..','.#...#.','#######','#######','#######','#######','#######']]; // menu icons: play, plus, grid, moon, bag
  function drawTitle(){ titleBack();
    var lbl='FLIPP-OUT', sc=4, tw2=lbl.length*4*sc, tx0=((W-tw2)/2)|0;
    txtS(lbl,tx0+2,28,0,sc); txtS(lbl,tx0,26,4,sc); txtS(mode==='golf'?'GOLF':'BREAKOUT',((W-(mode==='golf'?4:8)*8)/2)|0,50,14,2);
    var sub=mode==='golf'?L('MINIGOLF MEETS PINBALL'):L('ARKANOID MEETS PINBALL'); txtS(sub,((W-sub.length*4)/2)|0,70,8,1);
    for(var bi2=0;bi2<3;bi2++){ var bx2=cx+(bi2-1)*46, by2=91-Math.abs(Math.sin(tick*0.07+bi2*1.3))*14; box(bx2-3,95,7,1,12); disc(bx2|0,by2|0,3,[1,14,4][bi2]); }
    menuR={}; var items=menuItems();
    var svT=loadSave(), hasSv=!!(svT&&svT.lv); if(trashArm>0) trashArm--;
    items.forEach(function(it,i){ var x=cx-80, y=98+i*19, foc=menuSel===i, w0=(i===0&&hasSv)?141:160; menuR['m'+i]={x:x,y:y,w:w0,h:15};
      if(foc){ box(x-2,y-2,w0+4,19,4); box(x-1,y-1,w0+2,17,0); bevel(x,y,w0,15,4,1,11); var ar=((tick>>5)&1)?1:0; box(x-10+ar,y+4,3,7,4); box(x-7+ar,y+5,1,5,4); box(x+w0+7-ar,y+4,3,7,4); box(x+w0+6-ar,y+5,1,5,4); txtS(it.t,x+((w0-it.t.length*4)>>1),y+5,0,1); } else { bevel(x,y,w0,15,12,11,15); txtS(it.t,x+((w0-it.t.length*4)>>1),y+5,1,1); }
      { var mic=MENUIC[it.ic!==undefined?it.ic:i+(hasSv?0:1)], mcl=foc?0:1; if(mic) mic.forEach(function(row,ry){ for(var rx=0;rx<7;rx++) if(row[rx]==='#') box(x+7+rx,y+4+ry,1,1,mcl); }); }
      if(i===0&&hasSv){ var tx=x+145, arm=trashArm>0, th=mouseIn&&hit({x:tx,y:y,w:15,h:15}), tc=arm?2:(th?4:1); menuR.trash={x:tx,y:y,w:15,h:15};
        bevel(tx,y,15,15,arm?2:(th?7:12),arm?8:11,15); if(arm&&(tick>>3)&1) box(tx-1,y-1,17,1,4);
        box(tx+6,y+2,3,1,tc); box(tx+3,y+3,9,1,tc); box(tx+4,y+5,7,1,tc); box(tx+4,y+11,7,1,tc); box(tx+4,y+5,1,7,tc); box(tx+10,y+5,1,7,tc); box(tx+6,y+6,1,5,tc); box(tx+8,y+6,1,5,tc); } });
    if(trashArm>0) txt(L('CLICK AGAIN = DELETE SAVE'),((W-37*4)/2)|0,H-23,(tick>>3)&1?2:4); else txt(L('ARROWS AND ENTER - OR MOUSE'),((W-27*4)/2)|0,H-23,(tick>>4)&1?4:1);
    if(mouseIn){ drawCursor(); } }
  var SCN={train:L('ENGLISH VILLA'),western:L('WESTERN VILLAGE'),city:'SIMCITY',flight:L('FLIGHT SIM'),dream:L('DREAMLAND'),forest:L('ADVENTURE FOREST'),vapor:'VAPORWAVE',moon:L('MOONSTONE'),dungeon:L('HERO DUNGEON'),cozy:L('TEA ROOM'),golf:L('GOLF COURSE')}, SCC={western:3,city:8,flight:5,dream:13,forest:10,vapor:9,moon:7,dungeon:11,cozy:13,golf:5,train:5}, GL={train:L('VILLA'),western:'WEST',city:'CITY',flight:L('FLIGHT'),dream:L('DREAM'),forest:L('FOREST'),vapor:'WAVE',moon:L('MOON'),dungeon:L('DUNGEON'),cozy:L('TEA'),golf:'GOLF'}, mapC=null;
  // page layout: each world (scene) is exactly one page (width W); levels are spread evenly across it
  var mapLay=null;
  function mapTK(){ return !!(mapPick&&mode==='breakout'); } // tutorial cluster is page 0 of the map while picking a stage
  function tnx(j){ return 34+(W-68)*j/3; }
  function mapLayout(){ var pkL=mapTK(); if(mapLay&&mapLay.n===LEVELS.length&&mapLay.pk===pkL) return mapLay; var lay={n:LEVELS.length,pk:pkL,groups:[],gi:[],x:[]}, i; if(pkL) lay.groups.push({sc:'train',from:-1,to:-1,tut:true});
    for(i=0;i<LEVELS.length;i++){ var sc=LEVELS[i].scene, lst=lay.groups[lay.groups.length-1]; if(lst&&lst.sc===sc) lst.to=i; else lay.groups.push({sc:sc,from:i,to:i}); }
    lay.groups.forEach(function(gr,gi){ if(gr.tut) return; var m=gr.to-gr.from+1; for(i=gr.from;i<=gr.to;i++){ lay.gi[i]=gi; lay.x[i]=gi*W+34+(m>1?(W-68)*(i-gr.from)/(m-1):(W-68)/2); } });
    return (mapLay=lay); }
  // landmarks per stage (pixel icons above the world map node); (x,b) = center/bottom
  function LM(nm,x0,b0){ var x=0, b=0, LR=function(dx,dy,w,h,c){ if(typeof c==='string'){ g.fillStyle=qcol(c); g.fillRect(dx,dy,w,h); } else box(dx,dy,w,h,c); }, R=function(dx,dy,w,h,c){ box(x+dx,b+dy,w,h,c); }, D=function(dx,dy,r,c){ disc(x+dx,b+dy,r,c); };
    var F={
      DORF:function(){ houseArt(LR,Object.assign({w:20,h:11,rh:7,ov:1,chim:{x:5,h:4},win:[{x:-8,y:-8,w:4,h:4},{x:4,y:-8,w:4,h:4}],door:{x:-2,w:4,h:8}},HC_DORF)); },
      SALOON:function(){ saloonArt(LR,Object.assign({w:26,h:13,ph:9,dh:9,win:[{x:-10,y:-10,w:4,h:4},{x:7,y:-10,w:4,h:4}]},HC_SALOON)); },
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
    var f=F[nm]; if(f){ var fs=(nm==='DORF'||nm==='SALOON')?1:2; /* the houses are drawn in finer detail (1 pixel instead of 2) */ g.save(); g.translate(x0|0,b0|0); g.scale(fs,fs); f(); g.restore(); } }
  function bossLM(sc,x,y){ var sb=boss, sbs=bshots; boss={x:0,y:0,w:44,h:28,sc:sc,hp:2,hp0:2,mouth:0}; bshots=[]; g.save(); g.translate(x|0,y|0); g.scale(0.9,0.9); try{ drawBoss(); }catch(e){} g.restore(); boss=sb; bshots=sbs; } // boss sprite as landmark of the boss stage
  var padFl={pl:0,pr:0}; // click animation of the page arrows (remaining frames)
  var MAPSP=46, mapScroll=0, mapFollow=true, mapPgT=0, mapR={}, mapSelFor=-1, mapWheelT=0;
  function nodeX(i){ return mapLayout().x[i]; } // world coordinates, screen = nodeX - mapScroll
  function nodeY(i){ return 108+Math.sin(i*0.9+0.4)*16; }
  function mapPages(){ return mapLayout().groups.length; }
  function mapWorldW(){ return mapPages()*W; }
  function mapMax(){ return Math.max(0,mapWorldW()-W); }
  function mapCenter(i){ return mapLayout().gi[i]*W; }
  function mapSelMax(){ var N=LEVELS.length, n=lvNum(), lap=Math.floor((n-1)/N); return Math.max((n-1)%N,Math.min(N-1,bestLv-lap*N-1)); } // highest selectable level (current or already cleared)
  function mapJump(i){ var N=LEVELS.length, n=Math.floor((lvNum()-1)/N)*N+i+1; if(mode==='golf') hole=n; else level=n; seedN++; layout(); reset(); msg=(mode==='golf'?L('HOLE '):'LEVEL ')+n+' '+LV().name; msgT=100; state='tee'; saveGame(); }
  function travelCost(i){ return 25*Math.abs(i-(lvNum()-1)%LEVELS.length); } // traveling to another level costs gold (25 per stage of distance)
  var mapNoteT=0;
  function mapStart(i){ if(mapPick) startPick(i); else if(i===(lvNum()-1)%LEVELS.length) startLevel(); else { var tc=travelCost(i); if(gold<tc){ mapNote=L('TRIP COSTS ')+tc+L(' GOLD - YOU HAVE ')+gold; mapNoteT=150; return; } gold-=tc; saveGame(); mapJump(i); } }
  function mapPage(d){ var base=mapFollow?Math.round(mapScroll/W):mapPgT, pg=Math.max(0,Math.min(mapPages()-1,base+d)); mapPgT=pg; mapFollow=false; } // relative to the target page, so fast flips add up
  function isoTile(c,cx2,cy2,hw,hh){ g.fillStyle=c; for(var dy=-hh;dy<hh;dy++){ var w2=Math.round(hw*(1-Math.abs(dy+0.5)/hh)); g.fillRect(cx2-w2,cy2+dy,w2*2,1); } }
  function shd(hx,f){ var n=parseInt(hx.slice(1),16), r=(n>>16)&255, gg=(n>>8)&255, b=n&255; function q(v){ v=f<0?v*(1+f):v+(255-v)*f; return (Math.max(0,Math.min(255,v))>>5<<5)|((v>>5)&0); } return 'rgb('+q(r)+','+q(gg)+','+q(b)+')'; } // color lighter/darker, quantized to 8 steps (retro palette)
  function dith(x,y,w,h2,c1,c2,lvl){ g.fillStyle=c1; g.fillRect(x,y,w,h2); g.fillStyle=c2; for(var yy=0;yy<h2;yy++) for(var xx=(yy+lvl)&1;xx<w;xx+=2) g.fillRect(x+xx,y+yy,1,1); } // raster dithering (checkerboard pixels)
  // themed horizon: each world has its own silhouette so the map recalls the level
  function horizon(sc,x0,hz,gi,pal){ var c,i,h,hs=function(a,b){ var v=Math.sin(a*127.1+b*311.7+gi*74.7)*43758.5453; return v-Math.floor(v); }, dk=shd(pal.sky,-0.55), md=shd(pal.sky,-0.3);
    function hills(col,amp,fr,off,step){ g.fillStyle=col; for(c=0;c<W;c+=step){ var hy=Math.round(amp+Math.sin(c*fr+gi*2+off)*amp*0.5+Math.sin(c*fr*3.1+gi+off)*amp*0.2); g.fillRect(x0+c,hz-hy,step,hy+1); } }
    if(sc==='western'){ for(i=0;i<5;i++){ var mx=x0+10+i*60+hs(i,1)*20|0, mw=22+hs(i,2)*22|0, mh=14+hs(i,3)*16|0; g.fillStyle=shd('#b06a3a',-0.25); g.fillRect(mx,hz-mh,mw,mh+1); g.fillRect(mx+3,hz-mh-4,mw-8,4); g.fillStyle=shd('#d88a50',0); g.fillRect(mx,hz-mh,3,mh+1); for(c=0;c<mh;c+=4){ g.fillStyle=shd('#8a4a28',0); g.fillRect(mx+3,hz-c,mw-3,1); } } box(x0+W-40,hz-22,12,12,4); disc(x0+W-34,hz-26,5,4); }
    else if(sc==='city'){ for(c=0;c<W;c+=9){ var bh=10+hs(c,1)*28|0, bw=7+(hs(c,2)*4|0); g.fillStyle=(c/9&1)?shd('#2a3a60',0):shd('#1c2644',0); g.fillRect(x0+c,hz-bh,bw,bh+1); for(var wy=hz-bh+3;wy<hz-2;wy+=4) for(var wx=x0+c+1;wx<x0+c+bw-1;wx+=3) if(hs(wx,wy)>0.45){ g.fillStyle=hs(wx,wy)>0.8?'#ffee66':'#f0c040'; g.fillRect(wx,wy,1,2); } } }
    else if(sc==='train'){ hills(shd('#3f8a34',-0.2),9,0.03,0,3); }
    else if(sc==='flight'){ hills(shd('#6aa05a',-0.1),10,0.04,0,3); for(i=0;i<5;i++){ var cx0=x0+20+i*58+hs(i,4)*18|0, cy0=hz-24-hs(i,5)*22|0; disc(cx0,cy0,5,1); disc(cx0+7,cy0+2,4,1); disc(cx0-7,cy0+2,4,1); box(cx0-10,cy0+2,22,3,1); } }
    else if(sc==='dream'){ hills(shd(pal.sky,0.15),12,0.035,0,2); for(i=0;i<4;i++){ var ix=x0+30+i*70+hs(i,6)*20|0, iy=hz-30-hs(i,7)*20|0; box(ix-9,iy,18,3,13); box(ix-7,iy+3,14,2,10); box(ix-4,iy+5,8,2,10); box(ix-1,iy-5,2,5,10); disc(ix,iy-7,4,14); } }
    else if(sc==='forest'){ hills(shd('#1a4028',0),10,0.05,1,3); for(c=0;c<W;c+=7){ var th=10+hs(c,1)*14|0; g.fillStyle=(c/7&1)?shd('#1c4a2a',0):shd('#143a22',0); for(i=0;i<th;i+=2) g.fillRect(x0+c+(i>>1)-1,hz-th+i,Math.max(1,7-(i>>1)*2+1),2); } }
    else if(sc==='vapor'){ g.fillStyle='#fff3a0'; for(i=-19;i<=19;i++){ var vh=Math.round(Math.sqrt(361-i*i)); g.fillRect(x0+(W*0.2|0)+i,hz-20-vh,1,vh*2); } for(i=0;i<9;i++){ g.fillStyle=i<3?'#ffe060':i<6?'#ff9ad0':'#ff60b8'; g.fillRect(x0+(W*0.2|0)-19,hz-38+i*4,38,i>3?1:0); } for(i=0;i<3;i++){ var px=x0+30+i*150, pyy=hz; g.fillStyle='#2a0a45'; for(c=0;c<22;c++) g.fillRect(px+(c>>3),pyy-c,2,1); g.fillStyle='#05ffa1'; for(c=-7;c<=7;c+=2) g.fillRect(px+c,pyy-22-(c*c>>4),3,1); g.fillRect(px-3,pyy-24,8,1); } for(i=0;i<5;i++){ var gx=x0+i*80-10, gh=14+hs(i,3)*10|0; for(c=0;c<gh;c++){ box(gx+c,hz-c,1,1,14); box(gx+gh*2-c,hz-c,1,1,14); } } }
    else if(sc==='moon'){ hills(shd('#4a5078',0),10,0.07,0,2); disc(x0+W-50,hz-30,13,7); disc(x0+W-54,hz-33,5,5); disc(x0+W-46,hz-27,6,5); disc(x0+W-50,hz-30,13,7); g.fillStyle=shd('#8a90b0',0); for(c=0;c<W;c+=3){ var jh=Math.round(7+Math.abs(Math.sin(c*0.09+gi))*14); g.fillRect(x0+c,hz-jh,3,jh+1); } for(i=0;i<8;i++){ var cr=x0+hs(i,8)*W|0; box(cr,hz+2,7,1,11); } }
    else if(sc==='dungeon'){ g.fillStyle='#0c0c0c'; for(c=0;c<W;c+=2){ var sh=Math.round(6+hs(c,1)*12); g.fillRect(x0+c,20,2,sh+10); } for(i=0;i<4;i++){ var ax=x0+22+i*70; box(ax-14,hz-22,28,23,12); box(ax-10,hz-18,20,19,0); disc(ax,hz-18,10,0); box(ax-14,hz-24,28,2,11); box(ax+16,hz-14,2,4,3); box(ax+16,hz-17,2,2,4); } }
    else if(sc==='cozy'){ box(x0,hz-8,W,9,shd('#6a4228',0)); for(i=0;i<3;i++){ var fx=x0+14+i*95; if(i===1){ box(fx,hz-38,28,38,10); for(c=0;c<3;c++){ box(fx+2,hz-35+c*12,24,2,3); for(var bk=0;bk<6;bk++) box(fx+3+bk*4,hz-33+c*12,3,8,[2,5,7,4,13,9][bk]); } } else { box(fx,hz-32,22,26,8); box(fx+2,hz-30,9,22,14); box(fx+12,hz-30,8,22,14); box(fx-2,hz-6,26,3,10); } } }
    else { hills(shd('#3a9a50',-0.1),14,0.04,0,2); hills(shd('#2a7a3c',0),8,0.07,2,2); for(i=0;i<3;i++){ var fx=x0+40+i*100+hs(i,2)*20|0; box(fx,hz-24,1,22,1); box(fx+1,hz-24,6,4,2); } for(i=0;i<5;i++){ var tx2=x0+10+i*58+hs(i,3)*20|0; box(tx2,hz-9,2,5,10); disc(tx2+1,hz-12,4,6); } } }
  function padBtn(x,y,w,h2,hv){ g.fillStyle=hv?'rgba(0,0,0,0.5)':'rgba(0,0,0,0.28)'; g.fillRect(x,y,w,h2); g.fillStyle=hv?'rgba(255,221,0,0.4)':'rgba(255,255,255,0.12)'; for(var yy=0;yy<h2;yy++) for(var xx=(yy>>1)&1?2:0;xx<w;xx+=4) g.fillRect(x+xx,y+yy,2,1); // stripe/checker pattern
    g.fillStyle=hv?'#ffdd00':'rgba(255,255,255,0.35)'; g.fillRect(x,y,w,1); g.fillRect(x,y+h2-1,w,1); g.fillRect(x,y,1,h2); g.fillRect(x+w-1,y,1,h2); } // semi-transparent arrow button, hover = darker + yellow
  function mapDeco(sc2,dx,dy,r){
    if(sc2==='train'){ if(r%2){ box(dx-6,dy-5,1,6,10); box(dx+5,dy-5,1,6,10); box(dx-6,dy-4,12,1,2); box(dx-6,dy-2,12,1,1); } else { box(dx,dy-2,1,4,10); disc(dx,dy-5,3,5); disc(dx,dy-6,2,6); } }
    else if(sc2==='forest'||sc2==='golf'||sc2==='flight'){ box(dx,dy-4,2,5,10); disc(dx+1,dy-7,3,sc2==='flight'?5:6); disc(dx+1,dy-8,2,5); }
        else if(sc2==='western'){ box(dx,dy-7,2,8,5); box(dx-2,dy-5,2,1,5); box(dx-2,dy-6,1,3,5); box(dx+2,dy-4,2,1,5); box(dx+3,dy-5,1,3,5); }
        else if(sc2==='city'||sc2==='vapor'){ var bh=5+((r*7)%9); box(dx,dy-bh,5,bh,sc2==='city'?12:9); box(dx,dy-bh,5,1,sc2==='city'?11:14); box(dx+1,dy-bh+2,1,1,4); box(dx+3,dy-bh+4,1,1,4); }
        else if(sc2==='moon'||sc2==='dungeon'){ disc(dx,dy-2,3,11); disc(dx-1,dy-3,2,1); box(dx-3,dy+1,7,1,0); }
        else if(sc2==='dream'){ box(dx,dy-6,1,6,1); box(dx-2,dy-4,5,1,4); box(dx-1,dy-5,3,3,4); }
        else { disc(dx,dy-2,3,10); box(dx-1,dy-3,1,1,0); box(dx+1,dy-1,1,1,0); }
  }
  function mapTerrain(){ if(mapC) return; var WW=mapWorldW(); mapC=document.createElement('canvas'); mapC.width=WW; mapC.height=H; mapC.decos=[]; mapC.lms=[]; mapC.pk=mapTK();
    var g0=g, mg=mapC.getContext('2d'), groups=mapLayout().groups, gi, r, c;
    g=mg;
    groups.forEach(function(gr,gi){ var x0=gi*W, pal=SPAL[gr.sc]||SPAL.golf, hz=82; gr.x0=x0; g.save(); g.beginPath(); g.rect(x0,20,W,128); g.clip(); gr.x1=x0+W;
      var bn=9, bh0=(hz-20)/bn, vpS=['#05c8e8','#40d8f0','#8ae0f8','#b8c8f8','#d8a8f0','#f090e0','#ff80d0','#ff9ad8','#ffc0e8']; for(r=0;r<bn;r++){ var y1=(20+r*bh0)|0, y2=(20+(r+1)*bh0)|0, f=-0.4+r*0.08; var c1=gr.sc==='vapor'?vpS[r]:shd(pal.sky,f), c2=gr.sc==='vapor'?vpS[Math.min(bn-1,r+1)]:shd(pal.sky,f+0.1); g.fillStyle=c1; g.fillRect(x0,y1,W,y2-y1); if(r<bn-1){ dith(x0,y2-3,W,3,c1,c2,0); } }
      if(gr.sc==='moon'||gr.sc==='dream'||gr.sc==='dungeon'||gr.sc==='vapor'||gr.sc==='city'){ for(r=0;r<26;r++){ var sx=x0+((r*97+gi*41)%(W-4))+2, sy=24+((r*53+gi*17)%50); box(sx,sy,1,1,(r%3)?1:4); if(r%7===0){ box(sx-1,sy,3,1,1); box(sx,sy-1,1,3,1); } } }
      // terrain: patches instead of checkerboard, color noise, no tile edges; path along the level nodes
      var lay0=mapLayout(), pathY=function(wx){ if(lay0.pk&&wx<W){ var tj=Math.max(0,Math.min(2,Math.floor((wx-34)/((W-68)/3)))), tf=Math.max(0,Math.min(1,(wx-tnx(tj))/(tnx(tj+1)-tnx(tj)))); return nodeY(tj)+(nodeY(tj+1)-nodeY(tj))*tf; } var i=0; while(i<lay0.x.length-2&&lay0.x[i+1]<wx) i++; var xa=lay0.x[i], xb=lay0.x[i+1], f=Math.max(0,Math.min(1,(wx-xa)/(xb-xa))); return nodeY(i)+(nodeY(i+1)-nodeY(i))*f; };
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
      // horizon: hill silhouette
      horizon(gr.sc,x0,hz,gi,pal);
      // decoration per world (deterministic)
      for(r=0;r<22;r++){ var dx=x0+10+((gi*37+r*83)%(W-20)), dy=hz+10+((gi*29+r*53)%52), sc2=gr.sc; if(Math.abs(dy-pathY(dx))<13||Math.abs(dx-(x0+W/2))<20&&dy<hz+24) continue;
        mapC.decos.push([sc2,dx,dy,r]); }
      var lk=gr.sc==='golf'?1:1; mapC.lms.push([gr.sc,x0+(W/2|0),hz+8]); // landmark stands on the horizon (drawn each frame as a rigid sprite)
      g.restore(); });
    g.fillStyle='#000'; groups.forEach(function(gr,gi){ if(gi>0) g.fillRect(gr.x0-1,20,2,128); });
    g.fillRect(0,19,WW,1); g.fillRect(0,148,WW,1);
    groups.forEach(function(gr,gi){ gr.x0=gi*W; gr.x1=(gi+1)*W; }); // needed before drawing the divider lines
    g=g0; qCanvas(mapC); mapC.groups=groups; }
  // symbolic cluster icons (24x18 grid, scaled) for the world map buttons
  // Game Boy box-art style thumbnail (25x18 grid): banded sky, layered ground, one bold shaded subject with black outline, no text
  // palette: [sky1, sky2, sky3, ground, ground-dark, main, light, dark, accent]
  var SICON={train:['#2868d8','#58a8f8','#a8d8ff','#58b848','#388a30','#e83030','#ffffff','#a07840','#ffe050'],western:['#ff8a28','#ffb040','#ffe080','#c85a20','#8a3a14','#a85a28','#e0924c','#6a3414','#fff070'],
    city:['#1c2060','#2c3a90','#4a5cc0','#303060','#1a1a40','#7880e0','#b0b8ff','#4048a0','#ffe050'],
    flight:['#2868d8','#58a8f8','#a8d8ff','#38b040','#208030','#f4f4f4','#ffffff','#a8b8d0','#e83030'],
    dream:['#6a28b0','#a048d8','#e888f0','#ff90d8','#c050a8','#f0d8ff','#ffffff','#b890e0','#ffe870'],
    forest:['#103c20','#1c6430','#38983c','#7a4a20','#4a2a10','#40b840','#88f070','#208030','#b87a38'],
    vapor:['#ff48a8','#ff80c0','#ffb8d8','#6a1ea8','#3a0e70','#ffe060','#fff8a0','#ff9040','#30e8e8'],
    moon:['#0c1040','#1c2c78','#3850b0','#2c3870','#141c48','#f8f8d0','#ffffff','#c8c890','#ffffff'],
    dungeon:['#18181c','#2c2c34','#40404a','#505058','#2a2a30','#8c8c98','#c0c0cc','#505060','#ffa030'],
    cozy:['#ffd0a0','#ffe4c0','#fff4e0','#c87888','#8a4a5a','#f0e0d0','#ffffff','#c0a890','#e05868'],
    golf:['#38a0f0','#70c8ff','#b0e8ff','#38c038','#208820','#f8f8f8','#ffffff','#b0b0c0','#f03030']};
  function drawSceneIcon(sc,x,y,w,h){ var c=SICON[sc]||SICON.golf, K=null;
    function R(a,b,ww,hh,col){ g.fillStyle=K||col; g.fillRect(a,b,ww,hh); }
    function S(a,b,ww,hh,m,l,d){ if(K){ R(a,b,ww,hh); return; } R(a,b,ww,hh,m); R(a,b,ww,1,l); R(a,b,1,hh,l); R(a,b+hh-1,ww,1,d); R(a+ww-1,b,1,hh,d); }
    function D(cx,cy,r,m,l,d){ for(var j=-r;j<=r;j++){ var hw=Math.round(Math.sqrt(r*r+r*0.6-j*j)); R(cx-hw,cy+j,hw*2+1,1,m); if(!K){ if(j<=-r+1) R(cx-hw,cy+j,Math.max(1,hw),1,l||m); if(j>=r-1) R(cx,cy+j,hw+1,1,d||m); } } if(!K&&l) R(cx-Math.round(r*0.5),cy-Math.round(r*0.5),1,1,'#fff'); }
    function art(){
      if(sc==='western'){ S(2,6,3,8,'#38a838','#78e078','#206020'); R(0,8,2,2,'#38a838'); R(5,9,2,2,'#38a838'); // cactus
        S(6,7,15,7,c[5],c[6],c[7]); S(5,4,17,3,'#e8c060','#fff0a0','#a07830'); R(8,2,11,2,'#e8c060'); R(10,9,5,5,'#000'); R(7,9,3,3,c[8]); R(15,9,3,3,c[8]); R(11,10,3,1,'#c05820'); }
      else if(sc==='city'){ S(2,7,7,7,c[5],c[6],c[7]); S(9,2,8,12,'#a0a8f8',c[6],c[7]); S(17,6,7,8,'#6068c8',c[6],c[7]); for(var i=0;i<4;i++){ R(11,4+i*3,2,2,c[8]); R(14,4+i*3,2,2,(i&1)?c[8]:c[2]); } R(4,9,2,2,c[8]); R(4,12,2,1,c[2]); R(19,8,2,2,c[8]); R(19,11,2,2,c[2]); R(12,0,1,2,c[8]); }
      else if(sc==='flight'){ S(3,8,19,4,c[5],c[6],c[7]); R(22,9,2,2,c[5]); R(20,7,3,1,c[5]); S(11,3,4,12,'#d0d8e8',c[6],c[7]); S(3,5,3,4,c[8],'#ff8080','#a01818'); R(7,9,9,1,c[8]); R(18,9,2,2,'#58a8f8'); }
      else if(sc==='dream'){ S(3,3,5,11,c[5],c[6],c[7]); S(10,1,5,13,c[5],c[6],c[7]); S(17,3,5,11,c[5],c[6],c[7]); S(1,13,23,3,'#ffd0f0',c[6],c[4]); S(2,1,7,2,'#ffd0f0',c[6],c[7]); S(16,1,7,2,'#ffd0f0',c[6],c[7]); R(5,5,1,8,c[7]); R(12,3,1,10,c[7]); R(19,5,1,8,c[7]); }
      else if(sc==='forest'){ S(10,9,5,7,c[8],'#e0a860','#6a3a10'); D(12,6,6,c[5],c[6],c[7]); D(6,9,3,c[5],c[6],c[7]); D(19,9,3,c[5],c[6],c[7]); R(11,3,1,1,'#fff'); }
      else if(sc==='vapor'){ D(12,8,8,c[5],c[6],c[7]); R(3,9,19,1,c[1]); R(3,11,19,1,c[0]); R(3,13,19,2,c[0]); }
      else if(sc==='moon'){ D(12,8,8,c[5],c[6],c[7]); if(!K){ D(16,6,7,c[1]); R(7,5,2,1,c[7]); R(9,10,3,1,c[7]); } }
      else if(sc==='dungeon'){ S(3,3,19,12,c[5],c[6],c[7]); for(var r=0;r<4;r++){ R(4,6+r*3,17,1,c[7]); R(4+((r&1)?3:7),3+r*3,1,3,c[7]); } R(9,6,7,9,'#000'); R(10,5,5,1,'#000'); R(8,8,1,7,'#000'); R(16,8,1,7,'#000'); S(4,5,2,3,'#604020','#a07040','#3a2010'); R(4,3,2,2,c[8]); R(5,2,1,1,'#ffe050'); R(19,3,2,2,c[8]); R(20,2,1,1,'#ffe050'); }
      else if(sc==='train'){ S(5,7,15,8,'#c8503c','#e88068','#802818'); R(3,5,19,2,'#585868'); R(6,3,13,2,'#585868'); R(10,1,5,2,'#585868'); R(8,9,3,3,c[8]); R(14,9,3,3,c[8]); R(11,11,3,4,'#5a3818'); S(0,13,5,3,'#2a8a30','#58c050','#186018'); S(20,13,5,3,'#2a8a30','#58c050','#186018'); R(2,11,1,3,c[6]); R(22,11,1,3,c[6]); }
      else if(sc==='cozy'){ D(12,10,6,c[5],c[6],c[7]); S(8,2,9,3,c[8],'#ff9098','#a02838'); R(11,1,3,1,c[6]); R(2,6,5,2,c[5]); R(1,4,2,3,c[5]); R(19,7,4,2,c[5]); R(22,9,1,3,c[5]); D(12,10,2,c[8]); }
      else { S(12,1,2,13,'#f8f8f8','#fff','#b0b0c0'); S(14,1,8,5,c[8],'#ff8080','#a01818'); D(5,13,3,c[5],c[6],c[7]); R(17,13,4,2,'#000'); } }
    g.save(); g.beginPath(); g.rect(x,y,w,h); g.clip(); g.translate(x,y); if(w!==25||h!==18) g.scale(w/25,h/18);
    g.fillStyle=c[0]; g.fillRect(0,0,25,18); g.fillStyle=c[1]; g.fillRect(0,5,25,4); g.fillStyle=c[2]; g.fillRect(0,9,25,5);
    if(sc==='western'){ D(19,7,5,'#fff070'); } else if(sc==='city'||sc==='moon'||sc==='dungeon'){ for(var q=0;q<7;q++) R((q*9+3)%24,(q*5)%8,1,1,'#fff'); } else if(sc==='flight'){ R(1,3,6,2,'#fff'); R(18,11,6,2,'#fff'); } else if(sc==='forest'){ D(3,7,4,'#1c6430'); D(21,6,4,'#1c6430'); } else if(sc==='vapor'){ R(0,13,25,5,c[3]); for(var v=-12;v<=12;v+=4) { g.fillStyle=c[8]; g.fillRect(12+v,13,1,5); } R(0,15,25,1,c[8]); } else if(sc==='dream'){ R(2,2,1,1,'#fff'); R(22,6,1,1,'#fff'); R(6,9,1,1,'#fff'); }
    if(sc!=='vapor'){ g.fillStyle='#000'; g.fillRect(0,13,25,5); g.fillStyle=c[3]; g.fillRect(0,14,25,4); g.fillStyle=c[4]; g.fillRect(0,16,25,2); }
    K='#000'; for(var o=0;o<8;o++){ g.save(); g.translate([1,-1,0,0,1,1,-1,-1][o],[0,0,1,-1,1,-1,1,-1][o]); art(); g.restore(); } K=null; art();
    g.restore(); }
  // ===== Game over: big broken ball (style: FF8 loss screen), retry / map select =====
  function drawOver(){ box(0,0,W,H,0); var t=overT, bcx=cx, bcy=84, R0=46, r, yy, sep=Math.min(7,t/6), hov;
    for(r=0;r<40;r++){ var sx=(r*73)%W, sy=(r*131)%H; box(sx,sy,1,1,((r+(tick>>4))%5===0)?12:15); }
    var pul=2+Math.round(Math.sin(tick*0.08)*1.5); for(r=0;r<4;r++){ var ra=R0+8+pul-r*2; disc(bcx,bcy,ra,r&1?15:2); disc(bcx,bcy,ra-1,0); } // red pulsing behind the ball
    var zx=function(y){ return bcx+Math.round(Math.sin(y*0.32)*5+((y*7)%5)-2); };
    for(yy=-R0;yy<=R0;yy++){ var w=Math.floor(Math.sqrt(R0*R0-yy*yy+R0*0.5)), z=zx(yy), shade=yy>R0*0.45?11:(yy>R0*0.1?1:1);
      var ly=bcy+yy+Math.round(sep*0.4), ry=bcy+yy-Math.round(sep*0.4), lx0=bcx-w-sep, lx1=z-sep, rx0=z+sep, rx1=bcx+w+sep;
      if(lx1>lx0){ box(lx0,ly,lx1-lx0,1,shade); box(lx0,ly,2,1,12); box(lx1-2,ly,2,1,t>10?2:12); } // left half, red broken edge
      if(rx1>rx0){ box(rx0,ry,rx1-rx0,1,yy>R0*0.2?11:12); box(rx1-2,ry,2,1,12); box(rx0,ry,2,1,t>10?2:12); } }
    for(r=0;r<6;r++){ var hy=bcy-R0*0.6+r*3; box(bcx-sep-R0*0.55+r*2,hy|0,8-r,1,1); } // highlight
    for(r=0;r<7;r++){ var cyy=bcy-R0+10+r*12, cxx=zx(cyy-bcy)+(r&1?-9:9); box(cxx,cyy+Math.round(sep*0.4),6,1,12); box(cxx+6*(r&1?-1:1),cyy+1+Math.round(sep*0.4),4,1,12); } // cracks
    for(r=0;r<16;r++){ var vx=((r*37)%13-6)*0.35, vy=-1.2-((r*53)%7)*0.25, sx2=bcx+((r*29)%31-15), sy2=bcy+((r*17)%19-9), px=sx2+vx*t*0.6, py=sy2+vy*t*0.6+0.012*t*t*0.5; if(t<4||py>H+4||t<0) continue; var sz=2+(r%3); box(px,py,sz,sz-1,r&1?1:11); box(px,py,1,1,2); } // fragments fly and fall
    var gt=t>40?(t>80?2:(t>60?13:12)):15; txtS('GAME OVER',((W-9*16)/2)|0,146,t>40?gt:15,4); // text fades in delayed
    if(t>70) txt(L('SCORE ')+overScore+'  -  STAGE '+(overIdx+1),((W-(11+String(overScore).length+11)*4)/2)|0,172,11);
    overR={retry:{x:42,y:188,w:100,h:20},map:{x:158,y:188,w:100,h:20}};
    if(t>40){ [['retry','RETRY',0],['map',L('MAP SELECT'),1]].forEach(function(b){ var rc=overR[b[0]], sel=overSel===b[2]||hit(rc); if(hit(rc)) overSel=b[2]; bevel(rc.x,rc.y,rc.w,rc.h,sel?7:12,sel?8:11,15); if(sel&&((tick>>3)&1)) { box(rc.x-3,rc.y+rc.h/2-1,2,3,4); box(rc.x+rc.w+1,rc.y+rc.h/2-1,2,3,4); } txtS(b[1],(rc.x+(rc.w-b[1].length*4*1)/2)|0,rc.y+7,sel?4:1,1); }); txt('R = RETRY - M = MAP',((W-19*4)/2)|0,H-10,11); }
    if(locked()||mouseIn) drawCursor(); }
  function drawMap(){ box(0,0,W,H,15); for(var si=0;si<60;si++) box((si*73)%W,(si*131)%H,1,1,((si+(tick>>4))%5===0)?1:12); var pkNow=mapTK(); if(mapC&&mapC.pk!==pkNow) mapC=null; mapTerrain();
    var N0=LEVELS.length, cur0=(lvNum()-1)%N0, lap=Math.floor((lvNum()-1)/N0)+1, i, k, mM=mapMax(), sMax=mapPick?N0-1:mapSelMax();
    if(!mapPick&&(mapT<=1||mapSelFor!==lvNum())){ mapSelFor=lvNum(); mapSel=cur0; }   // after level change start on the current level again
    if(!mapPick&&mapSel>sMax) mapSel=sMax;
    var idx=mapPick?mapSel:cur0, n=(mapPick?0:(lap-1)*N0)+mapSel+1; if(mapPick) lap=1;
    // camera: page by page. Follows the selection, page arrows / dots / wheel flip freely
    if(mapRestApply&&mapRestPg>=0){ mapScroll=mapRestPg*W; mapFollow=false; mapPgT=mapRestPg; mapRestApply=false; mapT=1; } /* restore applies on the first drawn frame, even if several ticks ran before it */ else if(mapT<=1){ if(mapRestPg>=0){ mapScroll=mapRestPg*W; mapFollow=false; mapPgT=mapRestPg; } else { mapScroll=mapCenter(mapSel); mapFollow=true; } } else mapRestPg=-1;
    var camT=mapFollow?mapCenter(mapSel):mapPgT*W; mapScroll+=(camT-mapScroll)*0.2; if(Math.abs(camT-mapScroll)<0.5) mapScroll=camT;
    mapScroll=Math.max(0,Math.min(mM,mapScroll)); var sc0=mapScroll|0, pgNow=Math.round(mapScroll/W);
    { var WWm=mapC.width, plm=Math.round(sc0/W)*W, setl=Math.abs(sc0-plm)<1; for(var ym=0;ym<H;ym+=3){ var som=ym+1.5<82?0:mapSh(ym+1.5), sxm=Math.max(0,Math.min(WWm-W,sc0-som)); var dxm=sxm-sc0+som; g.drawImage(mapC,sxm,ym,W,3,dxm,ym,W,3); if(setl&&som){ var bl=plm-sc0+som+1, br=plm+W-sc0+som-1; if(bl>0) g.drawImage(mapC,plm+3,ym,1,3,0,ym,bl,3); if(br<W) g.drawImage(mapC,plm+W-4,ym,1,3,br,ym,W-br,3); } } } // settled on a page: the neighbour page never shows, the page edge is stretched instead // horizon steady, ground in perspective
    g.save(); g.beginPath(); g.rect(setl?plm-sc0:0,20,W,128); g.clip(); // objects on the ground are rigid sprites (never sheared), each shifted by the ground offset at its base
    mapC.decos.forEach(function(d){ if(d[1]-sc0<-24||d[1]-sc0>W+24) return; g.save(); g.translate(mapSh(d[2])-sc0,0); mapDeco(d[0],d[1],d[2],d[3]); g.restore(); });
    mapC.lms.forEach(function(m){ if(m[1]-sc0<-60||m[1]-sc0>W+60) return; g.save(); g.translate(mapSh(m[2])-sc0,0); drawLandmark(m[0],m[1],m[2],1.5); g.restore(); });
    g.restore(); g.fillStyle='rgba(0,0,0,0.22)'; for(var scl2=21;scl2<148;scl2+=2) g.fillRect(0,scl2,W,1); // CRT scanlines over everything
    mapC.groups.forEach(function(gr){ var lb=GL[gr.sc]||gr.sc, lx=((gr.x0+gr.x1)/2-lb.length*2-sc0)|0; bevel(lx-5,20,lb.length*4+9,11,15,12,0); txt(lb,lx,23,1); });
    var mTit=mapPick?L('START STAGE'):L('WORLD MAP'), mtx=12+mTit.length*8; txtS(mTit,8,4,4,2); if(!mapPick&&mapNoteT>0){ mapNoteT--; txtS(mapNote,mtx,6,2,1); } else if(!mapPick) txt('GOLD: '+gold,mtx,7,4);
    backR=null; if(mapPick){ backR={x:W-62,y:4,w:50,h:12}; bevel(backR.x,backR.y,backR.w,backR.h,hit(backR)?7:12,hit(backR)?8:11,15); txt(L('BACK'),backR.x+11,backR.y+4,1); if(mapNote) txtS(mapNote,mtx,6,2,1); else if(lastPick>=0) txt(L('LAST: STAGE ')+(lastPick+1),mtx,7,11); } if(mapPick){ loopR={x:W-62-4-70,y:4,w:70,h:12}; var lh=hit(loopR); bevel(loopR.x,loopR.y,loopR.w,loopR.h,lh?7:12,lh?8:11,15); box(loopR.x+3,loopR.y+3,7,7,0); box(loopR.x+4,loopR.y+4,5,5,loopPref?4:15); if(loopPref){ box(loopR.x+5,loopR.y+6,1,1,0); box(loopR.x+6,loopR.y+7,1,1,0); box(loopR.x+7,loopR.y+5,1,1,0); } txt('CLUSTER LOOP',loopR.x+13,loopR.y+4,loopPref?4:1); } else { loopR=null; var rt=L('ROUND ')+lap, rx0=W-14-rt.length*4; txtS(rt,rx0,6,1,1); if(loopG) txt('LOOP',rx0-24,7,8); }
    var shN=mapSh(108); g.save(); g.translate(shN,0);
    for(i=0;i<LEVELS.length-1;i++){ if(nodeX(i+1)-sc0<-4||nodeX(i)-sc0>W+4) continue; for(k=0;k<=12;k++){ var f=k/12; box(nodeX(i)-sc0+(nodeX(i+1)-nodeX(i))*f,nodeY(i)+(nodeY(i+1)-nodeY(i))*f,2,2,(mapPick?false:i<sMax)?4:11); } }
    var secSt={}, cfgS=secCfg(); TABN.forEach(function(nm,t){ if(cfgS[t]&&cfgS[t].stage&&!tabsOpen[t]) secSt[+cfgS[t].stage]=true; });
    for(i=0;i<LEVELS.length;i++){ var lv=LEVELS[i], x=(nodeX(i)-sc0)|0, y=nodeY(i)|0, done=mapPick?false:(i<=sMax&&i!==mapSel), cur=i===mapSel, hovN=mouseIn&&i===nodeAt(); if(x<-14||x>W+14) continue;
      var nr=lv.boss?10:8, lk=mapPick&&i>=unlockedStages(); if(lk) g.globalAlpha=0.28; if(lv.boss) bossLM(lv.scene,x,y-nr-22); else LM(lv.name,x,y-nr-4); g.globalAlpha=1; if(lv.boss){ disc(x,y,nr+3,lk?12:2); txt('BOSS',x-8,y+nr+5,lk?11:2); } if(hovN){ disc(x,y,nr+3,(tick>>2)&1?4:1); disc(x,y,nr+2,0); disc(x,y,nr+1,0); } disc(x,y,nr+1,0); disc(x,y,nr,lk?(hovN?11:12):(hovN?4:(done?SCC[lv.scene]:(cur?4:(mapPick?SCC[lv.scene]:12)))));
      if(done){ box(x-3,y,2,2,0); box(x-1,y+2,2,2,0); box(x+1,y,2,2,0); box(x+3,y-2,2,2,0); }
      else txt(String(i+1),x-(i>=9?3:1),y-2,lk?11:(cur?0:(mapPick?0:11)));
      if(lk){ box(x-2,y+nr+3,5,4,11); box(x-1,y+nr+1,3,2,11); box(x,y+nr+4,1,2,12); } // padlock under a locked stage
      if(secSt[i+1]&&!lk){ disc(x+nr,y-nr,5,0); disc(x+nr,y-nr,4,((tick>>4)&1)?4:3); txt('?',x+nr-1,y-nr-2,0); } // a locked secret shop tab hides in this stage
      if(cur){ var pr=9+Math.round(Math.sin(tick*0.15)*1.5); for(k=0;k<14;k++){ var an=k*0.449; box(x+Math.round(Math.cos(an)*(pr+3)),y+Math.round(Math.sin(an)*(pr+3)),1,1,(tick>>3)&1?4:1); } } }
    if(pkNow){ var thv=mouseIn?tutNodeAt():-1; for(k=0;k<3;k++) for(var fk=0;fk<=12;fk++){ var ff=fk/12; box(tnx(k)-sc0+(tnx(k+1)-tnx(k))*ff,nodeY(k)+(nodeY(k+1)-nodeY(k))*ff,2,2,4); }
      for(k=0;k<4;k++){ var tx3=(tnx(k)-sc0)|0, ty3=nodeY(k)|0; if(tx3<-14||tx3>W+14) continue; var tsel=(thv>=0?thv:tutSel)===k&&pgNow===0; if(thv===k) tutSel=k; if(tsel){ var tpr=9+Math.round(Math.sin(tick*0.15)*1.5); for(var tkk=0;tkk<14;tkk++){ var tan=tkk*0.449; box(tx3+Math.round(Math.cos(tan)*(tpr+3)),ty3+Math.round(Math.sin(tan)*(tpr+3)),1,1,(tick>>3)&1?4:1); } } disc(tx3,ty3,9,0); disc(tx3,ty3,8,tsel?4:5); txt('T'+(k+1),tx3-3,ty3-2,0); }
      { var tgx=tnx(tutSel); tutBX=tutBX<0?tgx:tutBX+(tgx-tutBX)*0.22; var tfj=Math.max(0,Math.min(3,(tutBX-34)/((W-68)/3))), tj0=Math.min(2,Math.floor(tfj)), tby=nodeY(tj0)+(nodeY(tj0+1)-nodeY(tj0))*(tfj-tj0), thop=Math.abs(Math.sin(tick*0.12))*5, tbx=(tutBX-sc0)|0; // the ball hops from bubble to bubble
        box(tbx-3,(tby|0)-12,7,1,12); disc(tbx,((tby-14-thop)|0),3,1); box(tbx-1,((tby-15-thop)|0),1,1,11); } }
    var t=(mapAnim&&!mapPick&&idx>0)?Math.min(1,mapT/70):1, e1=t<1?t*t*(3-2*t):1, ax=(idx>0?nodeX(idx-1)+(nodeX(idx)-nodeX(idx-1))*e1:nodeX(idx))-sc0, ay=idx>0?nodeY(idx-1)+(nodeY(idx)-nodeY(idx-1))*e1:nodeY(idx), hop=Math.abs(Math.sin(tick*0.12))*5;
    box((ax|0)-3,(ay|0)-12,7,1,12); disc(ax|0,((ay-14-hop)|0),3,1); box((ax|0)-1,((ay-15-hop)|0),1,1,11);
    g.restore();
    mapR={}; var NP=mapPages();
    var skyH=-1; if(mouseIn&&my>=16&&my<60&&nodeAt()<0&&tutNodeAt()<0&&!(mapR.tut&&hit(mapR.tut))&&!(backR&&hit(backR))&&!(loopR&&hit(loopR))) skyH=mx<W/2?0:1; // hovering the sky: highlight that half + its arrow button
    if(skyH===0&&pgNow>0){ g.globalAlpha=0.14; box(0,16,W/2,44,1); g.globalAlpha=1; } else if(skyH===1&&pgNow<NP-1){ g.globalAlpha=0.14; box(W/2,16,W/2,44,1); g.globalAlpha=1; }
    if(pgNow>0){ mapR.pl={x:2,y:30,w:16,h:108}; var fl1=padFl.pl; if(fl1>0) padFl.pl--; var o1=-Math.round(Math.sin(fl1/14*Math.PI)*4); padBtn(2,30,16,108,hit(mapR.pl)||skyH===0||fl1>0); for(k=0;k<5;k++) box(8+k+o1,84-k,1,2*k+1,(tick>>3)&1?4:1); }
    if(pgNow<NP-1){ mapR.pr={x:W-18,y:30,w:16,h:108}; var fl2=padFl.pr; if(fl2>0) padFl.pr--; var o2=Math.round(Math.sin(fl2/14*Math.PI)*4); padBtn(W-18,30,16,108,hit(mapR.pr)||skyH===1||fl2>0); for(k=0;k<5;k++) box(W-8-k+o2,84-k,1,2*k+1,(tick>>3)&1?4:1); }
    var offT=0, NPx=NP+offT, tw=Math.min(25,((W-8)/NPx-3)|0), th=(tw*3/4)|0, dx0=((W-NPx*(tw+3)+3)/2)|0, dy0=152; // below the level bullets (max. y~138) // cluster buttons with mini preview of the world map
    if(offT){ var hvT=hit({x:dx0-1,y:dy0-1,w:tw+2,h:th+2}); mapR.tut={x:dx0-1,y:dy0-1,w:tw+2,h:th+2}; box(dx0-1,dy0-1,tw+2,th+2,hvT?1:((!tutDone()&&((tick>>4)&1))?4:0)); box(dx0,dy0,tw,th,5); { var qx2=dx0+((tw-7)>>1), qy2=dy0+2; box(qx2+1,qy2,5,2,1); box(qx2+5,qy2+2,2,3,1); box(qx2+3,qy2+5,3,2,1); box(qx2+3,qy2+8,2,2,1); box(qx2+1,qy2+2,2,2,1); } box(dx0,dy0+th-2,tw,2,4); if(hvT) txt(L('TUTORIAL'),dx0,dy0-8,4); } // tutorial cluster ("level 0")
    for(i=0;i<NP;i++){ var bx0=dx0+(i+offT)*(tw+3), gr2=mapLayout().groups[i], lockd=!mapPick&&gr2.from>sMax, hv=false; mapR['d'+i]={x:bx0-1,y:dy0-1,w:tw+2,h:th+2}; hv=hit(mapR['d'+i]);
      box(bx0-1,dy0-1,tw+2,th+2,i===pgNow?4:(hv?1:0)); drawSceneIcon(gr2.sc,bx0,dy0,tw,th);
      if(lockd){ g.globalAlpha=0.6; g.fillStyle='#000'; g.fillRect(bx0,dy0,tw,th); g.globalAlpha=1; }
      box(bx0,dy0+th-2,tw,2,lockd?12:SCC[gr2.sc]); }
    txt(L('PAGE ')+(pgNow+1)+'/'+NP,8,23,11);
    var hvN=mouseIn?nodeAt():-1, sIdx=hvN>=0?hvN:mapSel, nS=(mapPick?0:(lap-1)*N0)+sIdx+1;
    var iw=W-16-62, ix=8, iy=H-52; bevel(ix,iy,iw,37,12,11,15);
    var lvv=LEVELS[sIdx]; txtS((mode==='golf'?L('HOLE '):'LEVEL ')+nS+' - '+lvv.name,ix+8,iy+4,4,1);
    txt(L('SCENE: ')+(SCN[lvv.scene]||lvv.scene),ix+8,iy+13,8);
    txt(L('DIFFICULTY'),ix+8,iy+22,1); var dif=Math.min(5,Math.max(1,Math.round((lvv.b+lvv.mv*6)/3))); for(k=0;k<5;k++) box(ix+64+k*8,iy+21,6,5,k<dif?2:15);
    var hsz=mode==='breakout'&&!lvv.boss?brickSz(nS):null, hzn=hsz===BSZ.XL?L('HUGE'):hsz===BSZ.L?L('BIG'):hsz===BSZ.S?L('SMALL'):hsz===BSZ.F?L('FINE'):L('NORMAL');
    txt(lvv.boss?L('BOSS FIGHT - DEFEAT THE ENEMY ABOVE'):(mode==='golf'?'PAR '+lvv.par+' - '+lvv.sh.length+L(' OBSTACLES'):L('BRICKS: ')+hzn+' '+String(lvv.pat).toUpperCase()),ix+8,iy+30,lvv.boss?2:11);
    if(!mapPick&&sIdx>sMax) txt(L('LOCKED'),ix+iw-6-24,iy+4,2);
    drawStagePv(stagePreview(nS),iy);
    if(pkNow&&pgNow===0){ var tj2=mouseIn?tutNodeAt():-1; if(tj2<0) tj2=tutSel; bevel(8,H-52,W-16-62,37,12,11,15); drawStagePv(stagePreview(1,tj2+1),H-52); txtS(TUT[tj2].name,16,H-48,4,1); txt(L('SCENE: ')+(SCN.train||'TRAINING'),16,H-39,8); txt(TUT[tj2].hint,16,H-30,1); txt(L('ARROWS + ENTER OR CLICK = START TUTORIAL'),16,H-21,11); }
    var hint=mapPick?L('CLICK BUBBLE OR ENTER = START'):(mapSel===cur0?L('SPACE OR CLICK = START'):L('ENTER = TRIP: ')+travelCost(mapSel)+' GOLD'), tk=hint+(mapPick?'   -   '+L('L = CLUSTER LOOP ON/OFF'):(sMax>0?'   -   '+L('ARROWS = PICK LEVEL'):''))+'   -   ', tkW=tk.length*4, tkX=-((tick*0.5)%tkW); // ticker: scrolls right to left, no blinking
    bevel(4,H-13,W-8,10,15,12,0); g.save(); g.beginPath(); g.rect(5,H-13,W-10,10); g.clip(); for(var tq=tkX;tq<W;tq+=tkW) txt(tk,tq|0,H-11,4); g.restore();
    if(mouseIn){ drawCursor(); } }
  function drawStagePv(pv,iy){ var ps=0.18, pw2=Math.round(W*ps), ph2=34, pox=W-8-pw2, poy=iy+2; bevel(pox-2,iy,pw2+4,37,12,11,15); box(pox,poy,pw2,ph2,15);
      if(pv){ var PX=function(v){ return pox+Math.round(v*ps); }, PY=function(v){ return poy+Math.round((v-18)*ps); };
        pv.holes.forEach(function(ho){ disc(PX(ho.x),PY(ho.y),Math.max(1,Math.round(ho.r*ps)),0); });
        pv.bricks.forEach(function(br){ box(PX(br.x),PY(br.y),Math.max(1,Math.round(br.w*ps)),Math.max(1,Math.round(br.h*ps)),br.c); });
        pv.blocks.forEach(function(bl2){ box(PX(bl2.x),PY(bl2.y),Math.max(1,Math.round(bl2.w*ps)),Math.max(1,Math.round(bl2.h*ps)),11); });
        pv.guides.forEach(function(gd){ var gl=Math.max(1,Math.round(Math.hypot(gd.x2-gd.x1,gd.y2-gd.y1)*ps)); for(var gi=0;gi<=gl;gi++) box(PX(gd.x1+(gd.x2-gd.x1)*gi/gl),PY(gd.y1+(gd.y2-gd.y1)*gi/gl),1,1,3); });
        pv.bumpers.forEach(function(bp){ disc(PX(bp.x),PY(bp.y),Math.max(1,Math.round(bp.r*ps)),bp.gild?4:13); });
        if(pv.boss) box(PX(W/2-22),PY(34),Math.round(44*ps),Math.round(28*ps),2); } }

  function drawVictory(){ g.fillStyle='rgba(0,0,0,0.6)'; g.fillRect(0,10,W,H-10);
    var px0=cx-84, py0=52; bevel(px0,py0,168,118,12,11,15);
    var wt=winBoss?L('BOSS DEFEATED!'):L('STAGE CLEARED!'); txtS(wt,((W-wt.length*8)/2)|0,py0+8,(tick>>3)&1?4:1,2);
    var nx=L('NEXT: ')+(mode==='golf'?L('HOLE '):'LEVEL ')+lvNum()+' - '+LV().name; if(nx.length>40) nx=nx.slice(0,40); txt(nx,((W-nx.length*4)/2)|0,py0+30,8);
    var gl=L('GOLD ')+gold+'   '+L('SCORE ')+score; txt(gl,((W-gl.length*4)/2)|0,py0+39,11);
    vicR=[]; [L('CONTINUE'),'SHOP',L('MAIN MENU')].forEach(function(t,i){ var x=cx-60, y=py0+52+i*20, foc=vicSel===i; vicR[i]={x:x,y:y,w:120,h:15};
      if(foc){ box(x-2,y-2,124,19,4); box(x-1,y-1,122,17,0); bevel(x,y,120,15,4,1,11); txtS(t,x+((120-t.length*4)>>1),y+5,0,1); } else { bevel(x,y,120,15,12,11,15); txtS(t,x+((120-t.length*4)>>1),y+5,1,1); } });
    if(mouseIn) drawCursor(); }
  var SHC={aim:[2,4],aim2:[3,1],fan:[3,4],homing:[8,1],bomb:[12,3],wave:[13,1],split:[9,13],ring:[14,1]};
  function drawBoss(){ bshots.forEach(function(sh){
      if(sh.ty==='beam'){ var bx=sh.x|0; if(sh.t<40){ if((sh.t>>2)&1) for(var yy=10;yy<H-20;yy+=6) box(bx,yy,1,3,4); } else { box(bx-3,0,7,H,3); box(bx-1,0,3,H,1); } return; }
      var c=SHC[sh.ty]||[2,4], r=sh.ty==='bomb'?5:3; box(sh.x-r,sh.y-r,r*2+1,r*2+1,0); box(sh.x-r+1,sh.y-r+1,r*2-1,r*2-1,c[0]); box(sh.x-1,sh.y-1,3,3,c[1]); });
    if(boss&&boss.shT>0){ var sa=(tick>>1)&1?0.5:0.3; g.globalAlpha=sa; disc(boss.x|0,boss.y|0,Math.max(boss.w,boss.h)/2+6,8); g.globalAlpha=1; }
    if(boss&&boss.fogT>0){ g.globalAlpha=Math.min(0.55,boss.fogT/40)*0.9; g.fillStyle='#f4efe8'; g.fillRect(0,70,W,H-70); g.globalAlpha=1; }
    if(boss&&boss.windT>0&&((tick&3)===0)) burst(boss.wd>0?4:W-4,70+((tick*37)%140),1,1);
    if(boss&&boss.mouth>0){ var mc=((tick>>2)&1)?13:1, bw=boss.w/2+3, bh=boss.h/2+3; box(boss.x-bw,boss.y-bh,bw*2,1,mc); box(boss.x-bw,boss.y+bh,bw*2,1,mc); box(boss.x-bw,boss.y-bh,1,bh*2,mc); box(boss.x+bw,boss.y-bh,1,bh*2,mc); }
    if(!boss) return; var x=boss.x|0, y=boss.y|0, sc=boss.sc, i, k, w2, bl=(tick>>3)&1, ph2=boss.hp<=boss.hp0/2, gm0=g, fo=boss.fl>0&&boss.fl!==undefined&&!boss.noFx; if(fo){ if(!drawBoss.fc) drawBoss.fc=document.createElement('canvas'); drawBoss.fc.width=W; drawBoss.fc.height=H; g=drawBoss.fc.getContext('2d'); } // hit flash: draw the boss on its own layer, tint it, shake it
    if(sc==='western'){ // Bandit King: sombrero, mask, bandolier
      box(x-22,y-8,44,4,0); box(x-22,y-8,44,3,10); box(x-22,y-8,44,1,3); box(x-11,y-18,22,11,0); box(x-10,y-17,20,10,10); box(x-10,y-10,20,2,2);
      box(x-9,y-4,18,14,0); box(x-8,y-3,16,12,3); box(x-8,y,16,4,0); box(x-6,y+1,3,2,1); box(x+3,y+1,3,2,1); box(x-6,y+6,12,2,0); box(x-14,y+10,28,9,0); box(x-13,y+10,26,8,2);
      for(i=0;i<6;i++) box(x-12+i*4,y+12,2,4,4); }
    else if(sc==='vapor'){ // floating marble bust (pixel-art David head), drawn from a character raster
      var BR=["...........ooccmmoocccmmmo..........","..........occcccmmccccccmmo.........",".......ooooccccccccccccckmmooo......",".....ooccmlcccccckmmccccckkcmmoo....","....occcccllcccccckcmmcccccccmmmo...","...occcccclllccccccccmmccccccccmo...","...occccccmmlcccccccccmkcmmccccmmo..","..olcccccccmkcccccccccccccmmmcccmo..","..olllcccccmlklcccccckccccccmcccmo..","..ollllcccccllllcccclckcccccmmkmmo..",".ooccmmcccccmlllllccllccddddcccmmo..","occccclccccccmldddddddddccckkccccmo.","occccclkcccccmmlkklkkmlllccclccccmo.","lcccccllllccccmmllllmmllllccllcccmo.","llccccmmllkkcccccllllllcclllllllcmo.","llllcccmllllcdcccccccccllllllmmmmo..","mmlllccmmmlldcdcccccccclllllllooo...","omccmmccmmmmmklccccccccllllmlllo....","occcckkcmmoodkdccccccccllllmlllo....","olccccmcccmoodccccccccclllllddo.....","ollcccmcccmookcccccccccllllmkmo.....","ommllmmcccmo.occccccccclllmmmmo.....",".ommmmlllcmoooccccccccclllddddo.....","..oooommmmoccoocclllllllllldmo......","......ooooccccclcmmmmmmmmmmdo.......","........occcccclllmmmmdddddo........","........occcccclldddddmoooo.........","........occcccdddddddddoo...........","........occcccdddddddddddo..........",".......occcccccllllllmmmmmo.........",".......occcccccllllllmmmmmoooo......",".......occcccccllllllmmmmmmcccoooo..","......occccccccllllllmmmmmmccccccco.",".....olllllllllllllllllllllllllllllo","...oollllllllllllllllllllllllllllllo","..ommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmo.",".ommmmmmmmmmmmddddddddddddddddddoo..","..oooooooooooooooooooooooooooooo...."], BC={o:'#150a24',c:'#f3e6d6',l:'#cdbfd3',m:'#9b86b8',d:'#5e4687',k:'#2a1a45'}, bx0=x-18, by0=y-19+(((tick>>4)&1)?0:0);
      BR.forEach(function(row,ry){ for(var rx=0;rx<row.length;){ var ch=row[rx]; if(ch==='.'){ rx++; continue; } var e=rx; while(e<row.length&&row[e]===ch) e++; g.fillStyle=BC[ch]; g.fillRect(bx0+rx,by0+ry,e-rx,1); rx=e; } });
      if(bl){ g.fillStyle='#ff71ce'; g.fillRect(bx0+23,by0+13,3,1); } } // eye glints
    else if(sc==='city'){ // robo tower
      box(x-13,y-16,26,16,0); box(x-12,y-15,24,14,12); box(x-12,y-15,24,2,11); box(x-1,y-24,3,8,11); disc(x,y-25,2,bl?2:4);
      box(x-9,y-10,7,5,0); box(x+2,y-10,7,5,0); box(x-8,y-9,5,3,ph2?2:4); box(x+3,y-9,5,3,ph2?2:4);
      box(x-19,y,38,16,0); box(x-18,y+1,36,14,12); for(i=0;i<5;i++) for(k=0;k<2;k++) box(x-14+i*6,y+3+k*6,3,3,(i+k+bl)%2?4:15);
      box(x-25,y+2,6,12,0); box(x-24,y+3,4,10,11); box(x+19,y+2,6,12,0); box(x+20,y+3,4,10,11); box(x-9,y+16,5,5+bl*2,3); box(x+5,y+16,5,5+bl*2,3); }
    else if(sc==='flight'){ // zeppelin
      for(i=-9;i<=9;i++){ w2=Math.round(28*Math.sqrt(1-(i/10)*(i/10))); box(x-w2-1,y+i,2*w2+2,1,0); }
      for(i=-8;i<=8;i++){ w2=Math.round(28*Math.sqrt(1-(i/10)*(i/10))); box(x-w2,y+i,2*w2,1,(i+8)%6<3?1:11); }
      box(x+24,y-12,7,9,0); box(x+25,y-11,5,7,2); box(x+24,y+3,7,9,0); box(x+25,y+4,5,7,2); box(x-10,y+9,20,7,0); box(x-9,y+10,18,5,12); for(i=0;i<4;i++) box(x-7+i*5,y+11,3,2,4);
      box(x+29,y-3,2,7,(tick>>1)&1?11:12); box(x-30,y-2,3,5,2); }
    else if(sc==='dream'){ // cloud dragon
      disc(x,y,13,0); disc(x-13,y+4,10,0); disc(x+13,y+4,10,0); disc(x,y,12,1); disc(x-13,y+4,9,1); disc(x+13,y+4,9,1);
      box(x-9,y-17,4,8,0); box(x-8,y-16,2,7,13); box(x+6,y-17,4,8,0); box(x+7,y-16,2,7,13);
      disc(x-5,y-2,2,0); disc(x+5,y-2,2,0); box(x-6,y-3,1,1,1); box(x+4,y-3,1,1,1); disc(x-9,y+3,2,13); disc(x+9,y+3,2,13); box(x-4,y+4,8,2,0);
      for(i=0;i<4;i++) disc(x+22+i*3,y+8+Math.round(Math.sin(tick*0.2+i)*3),3-(i>>1),13); }
    else if(sc==='forest'){ // tree spirit
      box(x-11,y-3,22,22,0); box(x-10,y-2,20,20,10); for(i=0;i<5;i++) box(x-9+i*4,y,1,16,0);
      disc(x,y-12,15,0); disc(x-11,y-8,10,0); disc(x+11,y-8,10,0); disc(x,y-12,14,5); disc(x-11,y-8,9,6); disc(x+11,y-8,9,6); disc(x-4,y-14,5,5);
      box(x-6,y+2,4,4,0); box(x+2,y+2,4,4,0); box(x-5,y+3,2,2,ph2?2:4); box(x+3,y+3,2,2,ph2?2:4); box(x-4,y+10,8,3,0);
      for(i=0;i<8;i++){ box(x-14-i,y+6+i,3,2,10); box(x+12+i,y+6+i,3,2,10); } }
    else if(sc==='moon'){ // druid with moon staff
      for(i=-16;i<=16;i++){ w2=Math.round(6+(i+16)*0.5); box(x-w2-1,y+i,2*w2+2,1,0); box(x-w2,y+i,2*w2,1,(i+16)%8<4?9:7); }
      box(x-6,y-13,12,11,0); box(x-3,y-9,3,2,14); box(x+1,y-9,3,2,14); box(x-8,y-14,16,2,9);
      box(x+17,y-18,3,36,0); box(x+18,y-18,1,36,10); disc(x+18,y-20,5,0); disc(x+18,y-20,4,bl?1:14); }
    else if(sc==='cozy'){ // teapot with handle, spout, steam and blush
      box(x-25,y-9,12,18,0); box(x-23,y-7,10,14,1); box(x-20,y-4,7,8,15);
      box(x+12,y-9,10,4,0); box(x+19,y-17,5,12,0); box(x+13,y-8,7,2,1); box(x+20,y-16,3,10,1);
      disc(x,y+2,16,0); disc(x,y+2,15,1); box(x-13,y-1,27,3,ph2?2:13);
      box(x-7,y-19,15,4,0); box(x-6,y-18,13,3,2); box(x-3,y-24,7,5,0); box(x-2,y-23,5,3,4);
      box(x-8,y-8,5,5,0); box(x+4,y-8,5,5,0); box(x-7,y-7,3,3,ph2?2:15); box(x+5,y-7,3,3,ph2?2:15); box(x-6,y-7,1,1,1); box(x+6,y-7,1,1,1);
      box(x-12,y+3,5,2,13); box(x+9,y+3,5,2,13); if(ph2){ box(x-4,y+8,9,2,0); box(x-5,y+9,1,2,0); box(x+5,y+9,1,2,0); } else { box(x-4,y+7,9,2,0); box(x-5,y+6,1,2,0); box(x+5,y+6,1,2,0); }
      for(i=0;i<3;i++) box(x+21+Math.round(Math.sin(tick*0.15+i*1.3)*2),y-22-i*5,2,2,1); }
    else if(sc==='golf'){ // Greenkeeper: giant golf ball with cap and club
      disc(x,y,15,0); disc(x,y,14,1); for(i=0;i<9;i++) box(x-10+(i%3)*8+(((i/3)|0)&1)*3,y-9+((i/3)|0)*8,2,2,11);
      box(x-14,y-17,28,3,0); box(x-13,y-16,26,2,5); box(x-9,y-23,18,7,0); box(x-8,y-22,16,6,5);
      box(x-8,y-7,5,5,0); box(x+4,y-7,5,5,0); box(x-7,y-6,3,3,ph2?2:15); box(x+5,y-6,3,3,ph2?2:15);
      if(ph2){ box(x-5,y+6,11,2,0); box(x-6,y+5,1,2,0); box(x+6,y+5,1,2,0); } else { box(x-5,y+5,11,2,0); box(x-6,y+6,1,2,0); box(x+6,y+6,1,2,0); }
      box(x+17,y-6,2,24,0); box(x+18,y-6,1,24,10); box(x+14,y+17,9,3,0); box(x+15,y+17,7,2,11); }
    else { // skeleton lord
      box(x-10,y-22,20,5,0); box(x-9,y-21,18,4,4); for(i=0;i<4;i++) box(x-9+i*6,y-25,3,5,4);
      disc(x,y-8,10,0); disc(x,y-8,9,1); box(x-6,y-11,5,5,0); box(x+1,y-11,5,5,0); box(x-5,y-10,3,3,ph2?2:15); box(x+2,y-10,3,3,ph2?2:15); box(x-1,y-5,2,3,0); box(x-5,y-1,10,3,0); for(i=0;i<4;i++) box(x-4+i*3,y-1,1,3,1);
      box(x-13,y+3,26,16,0); for(i=0;i<4;i++){ box(x-11,y+5+i*4,22,2,1); } box(x-1,y+3,2,16,0);
      box(x+16,y-14,4,32,0); box(x+17,y-14,2,32,11); box(x+13,y+8,10,4,4); }
    if(fo){ var gx=g; g=gm0; gx.globalCompositeOperation='source-atop'; gx.fillStyle=(boss.fl&2)?'rgba(255,255,255,0.8)':'rgba(255,70,50,0.6)'; gx.fillRect(0,0,W,H); gx.globalCompositeOperation='source-over'; var jx=boss.fl>3?((boss.fl&1)?2:-2):0; g.drawImage(drawBoss.fc,jx,0); } // flash white/red + short shake instead of the old square
    // health bar
    box(cx-52,12,104,6,0); box(cx-51,13,Math.floor(102*boss.hp/boss.hp0),4,boss.hp/boss.hp0>0.5?5:(boss.hp/boss.hp0>0.25?4:2)); txt('BOSS',cx-80,13,2); }
  function drawPuIcon(k,x,y,bl){ var i;
    if(k==='SHOP'){ box(x-4,y-1,9,5,4); box(x-3,y-3,7,2,3); box(x-4,y-1,9,1,1); box(x-1,y+1,3,2,12); box(x-3,y+4,2,1,1); box(x+2,y+4,2,1,1); }
    else if(k==='E'){ box(x-4,y-1,9,3,8); box(x-5,y-3,1,7,1); box(x+5,y-3,1,7,1); }
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
    else if(k==='H'){ disc(x,y+2,2,1); for(i=0;i<3;i++) box(x-1,y-4+i*2,3,1,(i+(tick>>3))%3===0?4:12); }
    else if(k==='W'){ box(x,y,2,2,1); box(x-4,y,1,1,14); box(x+5,y,1,1,14); box(x,y-4,1,1,14); box(x,y+5,1,1,14); }
    else txt(k,x-1,y-2,1); }
  // status effect: icon in a 13x13 square with rounded corners, frame fills clockwise from top center
  // two-layer (wide) ring: outside 15x15, inside 11x11, both with rounded corners; starts top center, clockwise
  function ringPath(S,off){ var p=[],i; for(i=1;i<S-1;i++) p.push([i+off,off]); for(i=1;i<S-1;i++) p.push([S-1+off,i+off]); for(i=S-2;i>0;i--) p.push([i+off,S-1+off]); for(i=S-2;i>0;i--) p.push([off,i+off]); var m=(S-3)>>1; return p.slice(m).concat(p.slice(0,m)); }
  var RING_O=ringPath(15,0), RING_I=ringPath(11,2);
  function drawPuRing(k,bx,by,f){ var u=PU[k], low=f<0.25&&((tick>>3)&1), col=low?1:u.c, fr=Math.min(1,f);
    drawPuIcon(k,bx+7,by+7,(tick>>3)&1);   // no background: icon sits directly on the playfield
    [RING_O,RING_I].forEach(function(R){ var n=Math.max(1,Math.ceil(fr*R.length)), r;
      g.globalAlpha=0.35; for(r=n;r<R.length;r++) box(bx+R[r][0],by+R[r][1],1,1,0); g.globalAlpha=1;   // empty track only slightly darkened
      for(r=0;r<n;r++) box(bx+R[r][0],by+R[r][1],1,1,col); }); }
  function drawCap(c){ var u=PU[c.k], x=c.x|0, y=c.y|0, bl=(tick>>3)&1;
    box(x-7,y-6,15,13,0); box(x-6,y-5,13,11,bl?1:u.c); box(x-5,y-4,11,9,15);
    drawPuIcon(c.k,x,y,bl); }
  // cursor = small ball: tail follows the movement, sparks on click, ring pulses; active power-ups tint the ball and make dots orbit it
  // light background animation: the background stays pre-rendered, only a few cheap pixel effects on top
  function hsh(n){ var v=Math.sin(n*127.1)*43758.5453; return v-Math.floor(v); }
  function bgAnim(){ var t=tick, i, x, y, a, hz=(H*0.5)|0;
    function dot(x,y,c,al,sz){ g.globalAlpha=al; g.fillStyle=c; g.fillRect(x|0,y|0,sz||1,sz||1); }
    function cloud(i,sp,y0,al){ var cw=14+hsh(i+9)*14, cx2=((hsh(i)*(W+60)+t*sp)%(W+60))-30; g.globalAlpha=al; g.fillStyle='#fff'; g.fillRect(cx2|0,y0|0,cw|0,2); g.fillRect((cx2+3)|0,(y0-2)|0,(cw*0.6)|0,2); g.fillRect((cx2+2)|0,(y0+2)|0,(cw-4)|0,1); }
    if(scene==='vapor'){
      for(i=0;i<12;i++){ a=0.5+0.5*Math.sin(t*0.07+i*2.1); if(a<0.55) continue; x=(hsh(i)*W)|0; y=(hsh(i+40)*hz*0.9)|0; var cl=i%2?'#fffb96':'#ff71ce'; dot(x,y,cl,a); dot(x-1,y,cl,a*0.5); dot(x+1,y,cl,a*0.5); dot(x,y-1,cl,a*0.5); dot(x,y+1,cl,a*0.5); }
      var mx1=((W*0.3)|0)-22+15, my1=hz+10-49+10; // (scanline over the Mac screen removed)
      if((t%150)<8) dot(mx1+5+macDX,my1+3,'#c0c4e0',1,3), dot(mx1+13+macDX,my1+3,'#c0c4e0',1,3); } // Mac blinks
    else if(scene==='western'||scene==='flight'||scene==='city'){
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
      var ffx=51, ffy=H-36;   // fireplace flickers, sparks rise, string lights blink, steam above the cups
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
    if((tick>>2)%6<3||cDown){ box(px-pr,py,1,1,glow); box(px+pr,py,1,1,glow); box(px,py-pr,1,1,glow); box(px,py+pr,1,1,glow); }   // pulsing ring
    if(act>=0){ for(i=0;i<3;i++){ var an=tick*0.18+i*2.094; box((px+Math.cos(an)*6)|0,(py+Math.sin(an)*6)|0,1,1,act); } }
    disc(px,py,3,0); disc(px,py,2,base); box(px-1,py-1,1,1,1);
  }
  function draw(){
    psxOn=actv.qual==='psx';
    if(locked()&&(paused||state==='title'||state==='map'||state==='shop'||state==='look'||state==='over'||state==='victory')&&document.exitPointerLock) document.exitPointerLock(); // menus always release the mouse
    cv.style.cursor=(locked()||mouseIn)?'none':'crosshair';
    g.setTransform(1,0,0,1,0,shake>0?((shake--%2)&&shakeOn?1:(shakeOn?-1:0)):0);
    if(state==='look'){ box(0,0,W,H,15); for(var lsi=0;lsi<60;lsi++) box((lsi*73)%W,(lsi*131)%H,1,1,12); var lg=lkGeo(); bevel(lg.fx,lg.fy,lg.fw,lg.fh,12,11,15); box(lg.fx+3,lg.fy+3,lg.fw-6,lg.fh-6,0); g.save(); g.translate(lg.x,lg.y); g.scale(lg.s,lg.s); g.beginPath(); g.rect(0,0,W,H); g.clip(); } // viewer: whole field framed in a smaller window
    // parallax only where the scene is a side view with sky + horizon + ground (read from paintScene): vapor, dream, moon, golf.
    // Top-down scenes (western, city, flight, dungeon, forest) and the frontal tea room (cozy) are flat: background stays still
    var inLook=state==='look', flatBg=flatFor(scene); // viewer: choose flat map or horizon + parallax for every scene
    var ptx=((locked()||((inLook||state==='map')&&mouseIn)))?(mx-cx)/cx*(tut?6:18):0; /* tutorial stages: a much calmer parallax */ pxo+=(ptx-pxo)*0.08;
    function pxAt(y){ if(scene==='cozy'){ var hzc=H-36; return y<hzc?pxo*0.3:pxo*(0.3+0.9*(y-hzc)/(H-hzc)); } if(flatBg) return pxo*0.3; var hzp=H*({vapor:0.5,golf:0.42,dream:0.82,moon:0.78}[scene]||0.5); return y<=hzp?0:pxo*(y-hzp)/(H-hzp); } // only the ground below the horizon moves, strongest at the bottom
    var tE=1, bgOffV=bgOff; if(state==='trans'){ var tq0=transT/TRANS_LEN; tE=1-(1-tq0)*(1-tq0); }
    if(state==='trans'){ if(prevSceneN===scene){ bgOffV=Math.round(prevOff+(bgOff-prevOff)*tE); g.drawImage(renderScene.wc,-bgOffV,0); drawSprites(g,bgc,bgOffV,0,false); } else { bgOffV=bgOff-Math.round((1-tE)*W); g.drawImage(bgPrevC,-Math.round(tE*W),0); g.drawImage(bgc,Math.round((1-tE)*W),0); drawSprites(g,bgc,bgc.spOff,Math.round((1-tE)*W),false); } }
    else if(Math.abs(pxo)<0.05){ g.drawImage(bgc,0,0); drawClouds(scene,pxo,tick); if(bgc.lm) g.drawImage(bgc.lm,0,0); drawSprites(g,bgc,bgc.spOff,0,false); } else { for(var ys=0;ys<H;ys+=3){ var so=Math.round(pxAt(ys+1.5)); g.drawImage(bgc,0,ys,W,3,so,ys,W,3); if(so>0) g.drawImage(bgc,0,ys,1,3,0,ys,so,3); else if(so<0) g.drawImage(bgc,W-1,ys,1,3,W+so,ys,-so,3); } drawClouds(scene,pxo,tick); if(bgc.lm) g.drawImage(bgc.lm,Math.round(pxAt(H*0.6)),0); drawSprites(g,bgc,bgc.spOff,0,pxAt); } // landmark moves rigidly with its base, never distorted
    if(scene==='vapor'&&macX!==undefined&&state!=='title'&&state!=='trans'){ g.save(); g.translate(Math.round(pxAt(macSp?macSp.base:macY+18)),0); // retro Mac flickers: brightness, screen, short line offsets
      var sx0=macX+15, sy0=macY+10, sw=21, sh=16, hh=((tick*2654435761)>>>0)%100, h2=(((tick>>2)*40503)>>>0)%100; // only the screen flickers, not the case
      if(hh<14){ g.globalAlpha=0.12+hh*0.012; g.fillStyle='#000'; g.fillRect(sx0,sy0,sw,sh); g.globalAlpha=1; }
      else if(hh>94){ g.globalAlpha=0.12; g.fillStyle='#fff'; g.fillRect(sx0,sy0,sw,sh); g.globalAlpha=1; }
      if(h2<18){ var gy=sy0+((tick*7)%(sh-1)), dx=((tick&1)?2:-2); g.save(); g.beginPath(); g.rect(sx0,sy0,sw,sh); g.clip(); if(macSp) g.drawImage(macSp.c,15,gy-macSp.y,sw,2,sx0+dx,gy,sw,2); g.restore(); }
    g.restore(); }
    macDX=macSp?Math.round(pxAt(macSp.base))-Math.round(pxAt(H*0.3)):0; g.save(); if(state==='trans'&&prevSceneN!==scene){ g.beginPath(); g.rect(Math.round((1-tE)*W),0,W,H); g.clip(); } g.translate((state==='trans'?0:Math.round(pxAt(H*0.3)))-bgOffV,0); var wS0=W; W=BGW; bgAnim(); W=wS0; g.restore();
    if(scene==='cozy'&&state!=='trans'){ // tea room: the room moves flat, the floor in perspective; the view outside (sky, moon) stays; only the window bars move with the room
      var cwx=BGW-78-bgOff, cwy=26, cso=Math.round(pxAt(cwy+30)); g.save(); g.beginPath(); g.rect(cwx+3,cwy+3,50,58); g.clip(); g.drawImage(bgc,0,0); box(cwx+27+cso,cwy+3,2,58,10); box(cwx+3,cwy+31,50,2,10); g.restore(); }
    if(tut===1&&state!=='title') drawTutScreens(); // big wall screens that show how to charge the bar
    box(0,0,W,4,12); box(0,0,4,H,12); box(W-4,0,4,H,12);
    box(0,0,W,1,11); box(0,0,1,H,11); box(W-1,0,1,H,11);
    g.save(); if(tE<1) g.translate(Math.round((1-tE)*W),0); // new stage slides in from the right
    // sand traps
    if(mode==='golf'){ box(cx-20,115,40,6,4); box(cx-16,121,32,3,10); }
    // soft shadows under all game objects: detaches them from the background
    g.fillStyle='rgba(0,0,0,0.55)';
    bricks.forEach(function(b){ g.fillRect((b.x|0)+2,(b.y|0)+3,b.w,b.h); });
    blocks.forEach(function(o){ g.fillRect(o.x+2,o.y+3,o.w,o.h); });
    bumpers.forEach(function(b){ g.beginPath(); g.arc((b.x|0)+2,(b.y|0)+3,b.r+1,0,6.2832); g.fill(); });
    guides.forEach(function(g2){ if(g2.off) return; for(var si2=0;si2<=12;si2++) g.fillRect((g2.x1+(g2.x2-g2.x1)*si2/12)+1,(g2.y1+(g2.y2-g2.y1)*si2/12)+3,3,3); });
    if(tut) drawTeacher();
    bricks.forEach(function(b){ if(psxOn){ psxBrick(b); if(b.fl>0) b.fl--; return; } if(b.hp>1){ box(b.x,b.y,b.w,b.h,b.hp>2?4:11); box(b.x+1,b.y+1,b.w-2,b.h-2,b.fl>0?1:b.c); } else { box(b.x,b.y,b.w,b.h,b.fl>0?1:b.c); box(b.x,b.y,b.w,1,1); if(b.h>3) box(b.x,b.y+b.h-1,b.w,1,12); } if(b.fl>0) b.fl--; });
    stickies.forEach(function(o){ var f=o.fl>0, x=o.x|0, y=o.y|0, c=f?1:o.c; if(f) o.fl--; box(x-1,y-1,o.w+2,o.h+2,0); box(x,y,o.w,o.h,c); box(x,y,o.w,1,1);
      for(var si3=0;si3<3;si3++) box(x+2+si3*5,y+o.h+(((tick>>3)+si3)%3),1,2,c); txt(String(o.n),x+((o.w-3)>>1),y+1,0); });   // sticky block with drips and split count
    pads.forEach(function(pd){ box(pd.x-1,pd.y-1,pd.w+2,pd.h+2,0); box(pd.x,pd.y,pd.w,pd.h,12); for(var ci=0;ci<pd.w;ci+=6){ var cph=((ci+(tick>>1)*(pd.v?pd.d:-1))%pd.w+pd.w)%pd.w; if(pd.v){ box(pd.x+cph,pd.y+1,2,pd.h-2,4); } else { box(pd.x+ci,pd.y+((tick>>2)+ci/6|0)%pd.h,4,1,4); box(pd.x+ci+1,pd.y+((tick>>2)+ci/6|0)%pd.h-1,2,1,4); } } }); // boost pads
    if(ptTmp&&!portals.length&&ptT>=560){ var nx=ptSets[(ptI+1)%ptSets.length], fp=(ptT-560)/100; nx.forEach(function(po,i6){ var rr=Math.max(1,Math.round(po.r*fp)), pc2=i6?14:13; if((tick>>2)&1||fp>0.85){ for(var a6=0;a6<12;a6++){ var an=a6/12*6.283+tick*0.08; box(po.x+Math.cos(an)*(po.r+3-(po.r-rr)*0.5)-1,po.y+Math.sin(an)*(po.r+3-(po.r-rr)*0.5)-1,2,2,pc2); } } disc(po.x,po.y,rr>>1,pc2); }); } // announcement: the next portal pair is drawn as a ghost ring that closes in just before it opens
    portals.forEach(function(po,pi4){ if(ptTmp&&ptT>450&&((tick>>2)&1)) return; var pc=pi4?14:13; disc(po.x,po.y,po.r+1,0); disc(po.x,po.y,po.r,pc); disc(po.x,po.y,po.r-2,0); disc(po.x,po.y,1+((tick>>3)%3),pc); }); // portal pair
    blocks.forEach(function(o){ var f=o.fl>0; if(f) o.fl--; if(psxOn) psxPrism(o.x,o.y,o.w,o.h,f?1:[0,12,11,8][Math.min(3,o.hp)],2); else { box(o.x-1,o.y-1,o.w+2,o.h+2,0); box(o.x,o.y,o.w,o.h,f?1:[0,12,11,8][Math.min(3,o.hp)]); box(o.x,o.y,o.w,1,f?1:(o.hp>1?1:11)); box(o.x+2,o.y+2,1,1,0); box(o.x+o.w-3,o.y+o.h-3,1,1,0); }
      for(var k=0;k<o.hp0-o.hp;k++) box(o.x+2+k*3,o.y+1,1,o.h-2,0); });
    // holes with flags
    holes.forEach(function(h,i){ if(h.done) disc(h.x,h.y,h.r+1,12); disc(h.x,h.y,h.r,0); box(h.x,h.y-16,1,14,1); box(h.x+1,h.y-16,6,4,h.done?5:2); });
    bumpers.forEach(function(b){ if(psxOn) psxBumper(b); else drawBumper(b);
      if(special(b)){ var rc=(tick>>2)&1?4:3; for(var a=0;a<16;a++) box((b.x|0)+Math.round(Math.cos(a*0.3927)*(b.r+3)),(b.y|0)+Math.round(Math.sin(a*0.3927)*(b.r+3)),1,1,rc); }
      for(var k=0;k<b.hp0-b.hp;k++) for(var i=-b.r+2;i<b.r-1;i+=2) box((b.x|0)+i,(b.y|0)+((i*(k+2))%(b.r-1)),1,1,0); }); // cracks
    if(tut){ if(skipT>0){ var sr=skipRect(), sb=(tick>>(skipT<150?2:4))&1; box(sr.x-1,sr.y-1,sr.w+2,sr.h+2,0); box(sr.x,sr.y,sr.w,sr.h,sb?4:3); box(sr.x,sr.y,sr.w,1,1); txt(L('SKIP'),sr.x+((sr.w-16)>>1),sr.y+3,0); }
      txt(L('TUTORIAL')+' '+tut+'/'+TUT.length,7,11,0); txt(L('TUTORIAL')+' '+tut+'/'+TUT.length,6,10,4); if(!tutSay()){ var th=(state==='tee'?L('AIM WITH MOUSE - HOLD CLICK, RELEASE'):TUT[tut-1].hint); txt(th,7,19,0); txt(th,6,18,1); } }
    drawBoss();
    parts.forEach(function(q){ box(q.x,q.y,2,2,q.c); });
    // trampolines / slingshots
    guides.forEach(function(g2){ if(g2.off) return; var fl2=g2.flash>0; if(fl2) g2.flash--;
      for(var i=0;i<=36;i++){ box(g2.x1+(g2.x2-g2.x1)*i/36, g2.y1+(g2.y2-g2.y1)*i/36, 3,3,fl2?1:(g2.pool&&!cheat.pools&&pw.T<180&&((tick>>3)&1)?12:g2.glow>0?4:(g2.hp<g2.hp0?11:g2.c))); } if(g2.glow>0) g2.glow--; });
    if(chV>0){ var gx0=(cx+co-30)|0; box(gx0,H-9,60,4,12); box(gx0+1,H-8,Math.floor(58*chV),2,chV>0.7?2:(chV>0.35?3:4)); }
    if(ocM>0||ocT>0){ var og0=(cx+co-30)|0, ov=ocT>0?ocT/420:ocM; box(og0,H-14,60,4,12); box(og0+1,H-13,Math.floor(58*ov),2,ocT>0?(tick&1?1:14):14); }
    if(saver) box(6,H-3,W-12,2,(tick>>2)&1?4:3);
    caps.forEach(drawCap);
    if(DEVH&&devSel&&state==='look'){ var so=devObjs(devSel.k)[devSel.i]; if(so) devOutline(so,(tick>>2)&1?14:1); } // selected obstacle
    if(DEVH&&DEVH.mark&&DEVH.mark()) secObjs.forEach(function(sc){ var o=sc.o, mc=(tick>>3)&1?9:13, bb2=devBox(o); devOutline(o,mc); txt(typeof sc.t==='string'?'BG '+sc.t.slice(3).toUpperCase():TABN[sc.t],Math.round(bb2.x-bb2.w),Math.round(bb2.y-bb2.h-7),mc); }); // dev mode: shows where the secrets sit
    // trampoline bar
    (function(){ var c=cx+co, L=fl[0].len/2, y0=fl[0].py, col=state==='win'?[4,3,1][(tick>>2)%3]:(ocT>0)?(tick&1?1:14):(stunT>0&&((tick>>2)&1))?2:(chV>0.7?2:(chV>0.35?4:3));
      if(tut){ // tutorial: the bar is a serving tray (silver, raised rim, two handles); behaviour unchanged
        for(var x=-L;x<=L;x++){ var u=x/L, y=y0-bulge*(1-u*u), ax=Math.abs(x); // tray tilted towards the viewer: far rim (shorter), the inner surface, the near rim and its shadow
          if(ax<=L-4) box(c+x-1,y-3,3,1,1); if(ax<=L-2) box(c+x-1,y-2,3,1,12); box(c+x-1,y-1,3,2,ax<L*0.45?col:11); box(c+x-1,y+1,3,1,1); box(c+x-1,y+2,3,1,12); box(c+x-1,y+3,3,1,0); }
        for(var tx2=-L+3;tx2<=L-3;tx2+=9){ var tu=tx2/L, ty2=y0-bulge*(1-tu*tu); box(c+tx2,ty2-1,2,1,1); } // little glints on the silver
        var ye=y0; box(c-L-1,ye-3,3,4,1); box(c-L-1,ye-3,1,4,11); box(c+L-1,ye-3,3,4,1); box(c+L+1,ye-3,1,4,11);
        box(c-L-5,ye-1,4,3,11); box(c-L-4,ye,2,1,15); box(c+L+2,ye-1,4,3,11); box(c+L+3,ye,2,1,15); }
      else {
      for(var x=-L;x<=L;x++){ var u=x/L, y=y0-bulge*(1-u*u); box(c+x-1,y-1,3,4,col); box(c+x-1,y-1,3,1,chV>0?1:4); if(ocT>0&&((tick+x)&7)===0) box(c+x-1,y-3-((tick*3+x)&3),1,2,1); }
      box(c-L-3,y0-2,5,10,12); box(c-L-3,y0-2,5,1,11); box(c+L-2,y0-2,5,10,12); box(c+L-2,y0-2,5,1,11); 
      } })();
    // tee + aim + power
    if(state==='tee'){
      box(cx-3,176,6,1,10);
      if(teeHeld||K.s){ aimLine(ball.x,ball.y,aim,power,7); // preview: path after 1 s (60 ticks)
      box(7,H-9,54,7,0); box(8,H-8,52,5,12); var pseg=Math.round(power*10); for(var pk=0;pk<10;pk++) if(pk<pseg) box(9+pk*5,H-7,4,3,pk>6?2:(pk>3?4:3)); if(pseg>=10&&(tick>>2)&1) box(8,H-8,52,5,1); txt('POWER',64,H-9,11); }
    }
    if(mode==='breakout'&&state==='play'){ drawCharge(ball); extras.forEach(drawCharge); }
    if(mode==='breakout'&&state==='play'){ box(W-58,H-8,50,5,12); box(W-57,H-7,Math.floor(48*ball.e),3,ball.e>0.5?14:3); }
    if(dbgCol){ // F3 debug: outline of all real collision shapes (magenta); wall limits dashed
      var R9=ballR(); g.save(); g.strokeStyle='#ff00ff'; g.lineWidth=1;
      var rc2=function(o){ g.strokeRect((o.x|0)+0.5,(o.y|0)+0.5,o.w,o.h); };
      bricks.forEach(rc2); blocks.forEach(rc2); stickies.forEach(rc2); pads.forEach(rc2); portals.forEach(function(po){ g.beginPath(); g.arc(po.x,po.y,po.r,0,6.2832); g.stroke(); });
      bumpers.forEach(function(b){ g.beginPath(); g.arc(b.x,b.y,b.r,0,6.2832); g.stroke(); });
      guides.forEach(function(g2){ if(g2.off) return; g.beginPath(); g.moveTo(g2.x1,g2.y1); g.lineTo(g2.x2,g2.y2); g.stroke(); });
      if(boss) g.strokeRect(boss.x-boss.w/2,boss.y-boss.h/2,boss.w,boss.h);
      g.strokeStyle='#00ffff'; g.strokeRect(R9+4,R9+4,W-2*R9-8,H);
      [ball].concat(extras).forEach(function(q){ g.beginPath(); g.arc(q.x,q.y,R9,0,6.2832); g.stroke(); }); g.restore(); txt('F3 COLLISION',4,H-8,2); }
    gWaves.forEach(function(w){ var hw=w.w/2, on=((tick*0.3)|0)&1, c1=on?1:12, c2=on?12:14, th=2+Math.round(w.p*4); // strength = thickness (2..6 px); pulse speed is the same for all
      for(var gx2=-hw;gx2<=hw;gx2+=2) box(w.x+gx2,w.y+((gx2*gx2/(hw*hw+1))*2|0)-((th-2)>>1),2,th,c1); // flat crest, only slightly bent at the ends
      box(w.x-hw+2,w.y+3+((th-2)>>1),w.w-4,1,c2); }); // thin trail
    extras.forEach(function(e){ if(e.caught&&e.held) disc(e.x|0,e.y|0,Math.ceil(ballR())+1,(tick>>2)&1?4:3); drawBallAt(e.x,e.y,e.caught?2:14); });
    if(state!=='capt'&&state!=='look'&&!(ball.swal>0)){ drawBallAt(ball.x,ball.y,1); }
    g.restore();
    if(state==='win'){ var wx=ball.x|0, wy=ball.y|0, wr=8+((tick>>2)&1), wa;
      for(wa=0;wa<12;wa++) box(wx+Math.round(Math.cos(wa*0.5236+tick*0.12)*wr)-1,wy+Math.round(Math.sin(wa*0.5236+tick*0.12)*wr)-1,2,2,[4,3,1][wa%3]);
      var wt=winBoss?L('BOSS DEFEATED!'):L('STAGE CLEARED!'); box(0,64,W,22,0); box(0,65,W,1,(tick>>2)&1?4:3); box(0,84,W,1,(tick>>2)&1?3:4);
      txtS(wt,((W-wt.length*8)/2)|0,70,(tick>>2)&1?4:1,2);
      if(winT<WINLEN-45&&(tick>>4)&1) txt(L('SPACE = CONTINUE'),((W-18*4)/2)|0,H-30,1); }
    // HUD
    box(0,0,W,9,7); box(0,9,W,1,0);
    txt(mode==='golf'?L('HOLE ')+hole:'LEVEL '+level,3,2,1); if(mode==='golf') txt(L('STR ')+strokes,(cx-10)|0,2,4); else { var nh=Math.max(0,lives), shown=Math.min(nh,5), hx0=((cx-(shown*9-2)/2)|0); for(var hi=0;hi<shown;hi++) for(var hy=0;hy<6;hy++) for(var hxx=0;hxx<7;hxx++) if(HEART[hy][hxx]==='1') box(hx0+hi*9+hxx,2+hy,1,1,2); if(nh>5) txt('+'+(nh-5),hx0+5*9,3,2); } // lives as heart icons txt(String(score).padStart(5,'0'),W-42,2,1); if(loopG) txt('LOOP',3,9,8);
    var pk=[]; for(var hk in pw) if(pw[hk]>0) pk.push(hk); var hx=Math.round(cx-pk.length*9+1); pk.forEach(function(k2){ drawPuRing(k2,hx,H-19,pw[k2]/PU[k2].d); hx+=18; }); // status effects at the bottom center
    var gx=W-46-String(gold).length*4-8; disc(gx,5,3,4); box(gx-1,4,2,2,3); txt(String(gold),gx+6,2,4); // gold piece instead of G
    if(state==='play'&&heldAny()){ [mainBall].concat(extras).filter(function(b){ return b.held; }).forEach(function(hb){ var pw2=Math.max(0.15,chV), pa2=Math.max(-1.3,Math.min(1.3,aim+(hb.ca||0))); aimLine(hb.x,hb.y,pa2,Math.min(1,pw2),9,true); });
      // where two trajectories cross, a crosshair marks the point
      var hbs=[mainBall].concat(extras).filter(function(b){ return b.held; }), rays=hbs.map(function(hb){ var an=Math.max(-1.3,Math.min(1.3,aim+(hb.ca||0))); return {x:hb.x,y:hb.y,dx:Math.sin(an),dy:-Math.cos(an),len:launchSp(Math.min(1,Math.max(0.15,chV)))*60}; });
      for(var ra=0;ra<rays.length;ra++) for(var rb=ra+1;rb<rays.length;rb++){ var A=rays[ra], B=rays[rb], den=A.dx*B.dy-A.dy*B.dx; if(Math.abs(den)<0.02) continue; var ex=B.x-A.x, ey=B.y-A.y, ta=(ex*B.dy-ey*B.dx)/den, tb=(ex*A.dy-ey*A.dx)/den;
        if(ta>8&&tb>8&&ta<A.len&&tb<B.len){ var ix=Math.round(A.x+A.dx*ta), iy=Math.round(A.y+A.dy*ta); if(ix>4&&ix<W-4&&iy>14&&iy<H-4){ var cc=(tick>>2)&1?4:2, rr=5; for(var an2=0;an2<16;an2++) box(Math.round(ix+Math.cos(an2*0.3927)*rr),Math.round(iy+Math.sin(an2*0.3927)*rr),1,1,cc);
          box(ix-9,iy,5,1,cc); box(ix+5,iy,5,1,cc); box(ix,iy-9,1,5,cc); box(ix,iy+5,1,5,cc); box(ix-1,iy-1,3,3,0); box(ix,iy,1,1,1); } } } } // trajectory of every ball stuck on the bar
    if(locked()&&state!=='play'&&state!=='capt'){ drawCursor(); }
    if(state==='look') g.restore();
    if(tut&&tutSay()&&(state==='tee'||state==='play')) drawBubble(tutSay()); // speech bubble above all game objects
    if(state==='shop') drawShop(); else if(state==='title') drawTitle(); else if(state==='map') drawMap(); else if(state==='look') drawLook(); else if(state==='over') drawOver(); else if(state==='victory') drawVictory();
    if(paused) drawPause();
    if(ambient&&ambFull&&ambT<420) txt(L('AMBIENCE - ESC = BACK').replace('ESC',kLab('back')),W-102,13,(tick>>4)&1?1:11);
    if(ambient&&!ambFull) txt(cheat.autoscore?L('AUTOPILOT - SCORING - TAB = OFF'):L('AUTOPILOT - NO SCORE - TAB = OFF'),W-(cheat.autoscore?150:142),13,(tick>>4)&1?4:11);
    if(fpops.length&&(state==='tee'||state==='play'||state==='win'||state==='capt')){ fpops.forEach(function(f){ var yy=Math.round(f.y-6-f.t*0.5), xx=Math.max(1,Math.min(W-f.s.length*4-1,Math.round(f.x-f.s.length*2))); if(f.t<34||(f.t>>1)&1){ txt(f.s,xx+1,yy+1,0); txt(f.s,xx,yy,(f.t>>2)&1?4:1); } f.t++; }); fpops=fpops.filter(function(f){ return f.t<48; }); } // rising score numbers, drawn above everything
    if(msgT>0&&state!=='shop'&&state!=='title'&&state!=='map'&&state!=='victory'){ msgT--; var mw=String(msg).length*4, mc=(tick>>3)&1?4:1, mx0=40, mwid=86; // messages appear in the header bar, between level label and hearts
      g.save(); g.beginPath(); g.rect(mx0,0,mwid,9); g.clip(); box(mx0,0,mwid,9,7); if(mw<=mwid) txt(msg,mx0+((mwid-mw)>>1),2,mc); else txt(msg,mx0+mwid-(((tick*0.9)|0)%(mw+mwid)),2,mc); g.restore(); }
  }
  // 3x5 pixel font
  var F={'?':'111001011000010','0':'111101101101111','1':'010110010010111','2':'111001111100111','3':'111001111001111','4':'101101111001001','5':'111100111001111','6':'111100111101111','7':'111001001001001','8':'111101111101111','9':'111101111001111',
  'A':'111101111101101','B':'110101110101110','C':'111100100100111','D':'110101101101110','E':'111100110100111','F':'111100110100100','G':'111100101101111','H':'101101111101101','I':'111010010010111','J':'001001001101111','K':'101101110101101','L':'100100100100111','M':'101111111101101','N':'110101101101101','O':'111101101101111','P':'111101111100100','Q':'111101101111001','R':'110101110101101','S':'111100111001111','T':'111010010010010','U':'101101101101111','V':'101101101101010','W':'101101111111101','X':'101101010101101','Y':'101101010010010','Z':'111001010100111','+':'000010111010000','!':'010010010000010',':':'000010000010000','·':'000000010000000','.':'000000000000010',' ':'000000000000000','-':'000000111000000'};
  function txt(s,x,y,c){ s=String(s).toUpperCase(); x=Math.round(x); y=Math.round(y); g.fillStyle=C[c]; // whole pixels only: fractional positions blur the glyphs
    for(var i=0;i<s.length;i++){ var gl=F[s[i]]||F[' ']; for(var p=0;p<15;p++) if(gl[p]==='1') g.fillRect(x+i*4+(p%3),y+((p/3)|0),1,1); } }
  function fit(){ /* format is fixed 4:3, CSS controls the size */ }
  addEventListener('resize',fit); fit();
  addEventListener('pagehide',saveGame); document.addEventListener('visibilitychange',function(){ if(document.hidden) saveGame(); });
  var last=0, acc=0;
  function loop(t){ acc+=Math.min(50,t-last); last=t; while(acc>=16.7){ step(); acc-=16.7; } draw(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
}
  function mount(el, opts){ opts=opts||{}; var mode=opts.mode||el.getAttribute('data-mode')||'breakout', label=opts.label||el.getAttribute('data-label')||'Flipp-Out';
    el.innerHTML=tpl().replace('{{ mode }}',esc(mode)).replace('{{ label }}',esc(label)); var game=el.firstElementChild; start(game); return game; }
  function auto(){ document.querySelectorAll('[data-flippout]:not([data-mounted])').forEach(function(el){ el.setAttribute('data-mounted','1'); mount(el); }); }
  window.Flippout={mount:mount,auto:auto};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',auto); else auto();
})();
