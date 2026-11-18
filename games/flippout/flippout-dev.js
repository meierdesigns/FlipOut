// Flipp-Out DEV MODE: NOT part of the itch deploy zip (itch/build.py leaves this file and its script tag out).
// It only stores the secret configuration; the editor itself is in the game's stage viewer (VIEW STAGES), which shows the dev controls only when this file is loaded.
(function(){
  var KEY='golfDevSecrets', FLAGS='golfDevFlags', cfg=null, fl={showAll:false,mark:true};
  try{ cfg=JSON.parse(localStorage[KEY]||'null'); }catch(e){}
  try{ fl=Object.assign(fl,JSON.parse(localStorage[FLAGS]||'{}')); }catch(e){}
  function save(){ try{ if(cfg) localStorage[KEY]=JSON.stringify(cfg); else localStorage.removeItem(KEY); localStorage[FLAGS]=JSON.stringify(fl); }catch(e){} }
  function cur(){ if(!cfg) cfg=JSON.parse(JSON.stringify(window.FLIPPOUT_SECRETS||{})); delete cfg.bgs; return cfg; } // background unlocks were removed: only shop tabs are secrets
  window.FLIPPOUT_DEV={
    secrets:function(){ return cfg||window.FLIPPOUT_SECRETS||{}; },
    set:function(tab,stage,obs,idx){ var c=cur(); if(stage){ c[tab]={stage:stage,obs:obs}; if(idx!==undefined) c[tab].idx=idx; } else delete c[tab]; save(); },
    setBgMap:function(cluster,scene){ var c=cur(); c.bgmap=c.bgmap||{}; if(scene) c.bgmap[cluster]=scene; else delete c.bgmap[cluster]; if(!Object.keys(c.bgmap).length) delete c.bgmap; save(); },
    showAll:function(){ return fl.showAll; }, mark:function(){ return fl.mark; },
    toggle:function(k){ fl[k]=!fl[k]; save(); return fl[k]; },
    discard:function(){ cfg=null; fl={showAll:false,mark:true}; save(); },
    clearStage:function(stage){ var c=cur(); Object.keys(c).forEach(function(k){ if(k!=='bgs'&&k!=='bgmap'&&c[k]&&+c[k].stage===stage) delete c[k]; }); if(c.bgs){ c.bgs=c.bgs.filter(function(e){ return +e.stage!==stage; }); if(!c.bgs.length) delete c.bgs; } save(); },
    exportText:function(){ return 'window.FLIPPOUT_SECRETS = '+JSON.stringify(cur())+';\n'; }
  };
})();
