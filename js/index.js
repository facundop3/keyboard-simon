const levels = 10,
        //Gets a random key using it's keycode
      getRandomKey = (min=65,max=90) => Math.round(Math.random() * (max-min)  + min),
      //Gets an Array of random keys using it's keycodes
      getRanomKeys = (levels) => Array(levels).fill(0).map(()=> getRandomKey()),
      // Gets a Dom element taking it with it's datakey
      getElementByKeyCode = (dataKey) => document.querySelector(`[data-key="${dataKey}"]`),
      // Initial keys Array
      teclas = getRanomKeys(levels),
      // replaces active class
      deactivate = (el) => { setTimeout(()=>{
                              el.className = "key noselect";
                            }, 1000)},
      // Checks if player wins
      checkWin = (currentLevel) => {
        if(currentLevel === levels) {
          const title = "You win!",
                icon = "success",
                text = `nivel ${currentLevel}/ ${levels}`

          swal({ title,
                  icon,
                  text })
        }
      },
      // Checks if player loses
      lose = (currentLevel)=> {
        const title = "Perdiste", 
              icon = "error",
              text = `nivel ${currentLevel}/ ${levels}`
        swal({ title,
              icon,
              text })
        nextLevel(0)
    }
function nextLevel(currentLevel){
  checkWin(currentLevel)

  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(()=>{ activate(teclas[i]) }, (1000)*(i+1))
  }
  window.addEventListener('keydown', keyPressed);
  window.addEventListener('click', (ev)=>keyPressed({keyCode:ev.toElement.getAttribute('data-key')}));

  let i =0;
  let currentKey= teclas[i];
  function keyPressed(ev){
    if(ev.keyCode === currentKey){
        activate(currentKey, {success:true});
        i++
        currentKey = teclas[i]
        if (i>currentLevel) {
          window.removeEventListener('keydown', keyPressed )
          window.removeEventListener('click', keyPressed )
          setTimeout(()=>nextLevel(i), 1000)
        }
    } else {
      activate(ev.keyCode, {fail:true})
      lose(currentLevel)
      window.removeEventListener('keydown', keyPressed )
      window.removeEventListener('click', keyPressed )
    }
  }
}
// Adds active class to current active key
function activate(keyCode, options={}){
  const el = getElementByKeyCode(keyCode);
  el.classList.add('active');
  if(options.success){
    el.classList.add('success');
  }else if(options.fail){
    el.classList.add('fail');
  }
  deactivate(el)
}
// Starts the game at lvl 0
nextLevel(0)