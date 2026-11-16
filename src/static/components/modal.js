/* Modal logic: [data-modal-open=ID] opens <dialog id=ID data-modal>; Esc, X and a click on the backdrop close it. */
(function(){
  document.querySelectorAll('[data-modal-open]').forEach(function(b){
    b.addEventListener('click',function(){var d=document.getElementById(b.dataset.modalOpen);if(!d)return;d.showModal();var i=d.querySelector('input,textarea');if(i)i.focus();});
  });
  document.querySelectorAll('dialog[data-modal]').forEach(function(d){
    var x=d.querySelector('[data-modal-close]');if(x)x.addEventListener('click',function(){d.close();});
    d.addEventListener('mousedown',function(e){if(e.target===d)d.close();});
    if(location.hash==='#'+d.id)d.showModal();
  });
})();
