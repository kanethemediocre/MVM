//A lot of player keyboard controls are handled in system.playerkeys().
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	if (keyspressed.includes(event.key)){	
		}
	else {
		keyspressed.push(event.key);
		}	
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		


window.addEventListener("keyup", function (event) {
	if (event.defaultPrevented) {
		return; // Do nothing if the event was already processed
		}
	var i=0;
	while(i<keyspressed.length){
		if (keyspressed[i]==event.key){
			keyspressed.splice(i, 1);
			}
		i++;
		}
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

