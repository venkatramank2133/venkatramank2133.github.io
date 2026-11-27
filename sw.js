// WALKIE - HOLD TO TALK - NO CUT!
let mediaRecorder;
let audioChunks = [];
let isTalking = false;
let talkBtn = document.getElementById('talkBtn');

async function startTalk(){
  if(isTalking) return;
  isTalking = true;
  document.getElementById('talkStatus').innerText = "🎙️ Talking... PMR446 Channel 8 - Voice Going! - கையை எடுக்கும் வரை பேசும்!";
  try{
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
      let blob = new Blob(audioChunks, {type:'audio/webm'});
      let url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.play();
      document.getElementById('talkStatus').innerText = "✅ Voice Sent via Mesh! - கேட்டுச்சா Bro?";
    };
    mediaRecorder.start();
  }catch(err){
    alert("Mic Allow பண்ணு Bro! " + err);
    isTalking = false;
  }
}

function stopTalk(){
  if(!isTalking) return;
  isTalking = false;
  if(mediaRecorder && mediaRecorder.state !== 'inactive'){
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
}

// கையை வச்சா START - எடுத்தா STOP!
talkBtn.addEventListener('touchstart', e => { e.preventDefault(); startTalk(); });
talkBtn.addEventListener('touchend', e => { e.preventDefault(); stopTalk(); });
talkBtn.addEventListener('mousedown', startTalk);
talkBtn.addEventListener('mouseup', stopTalk);
