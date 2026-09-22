const modal=document.getElementById('composer');
function openComposer(){modal.classList.add('show')}
function closeComposer(){modal.classList.remove('show')}
function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open')}
function connectAccount(){alert('OAuth connection flow would open here. Connect your social platform API in the backend.')}
function showAll(){alert('All scheduled posts are available in the Posts section.')}
function schedulePost(){
  const caption=document.getElementById('caption').value.trim();
  if(!caption){alert('Please enter a caption.');return}
  const list=document.getElementById('postList');
  const row=document.createElement('div'); row.className='post';
  row.innerHTML=`<div class="post-thumb one">NEW<br>POST</div><div class="post-info"><b>${escapeHtml(caption.slice(0,42))}${caption.length>42?'…':''}</b><small>Instagram · Facebook</small></div><div class="post-time"><b>Scheduled</b><small>${document.getElementById('time').value}</small></div><button class="dots">⋮</button>`;
  list.prepend(row);
  const count=document.getElementById('scheduledCount'); count.textContent=Number(count.textContent)+1;
  closeComposer(); document.getElementById('caption').value='';
  alert('Post scheduled successfully!');
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function buildCalendar(){
 const el=document.getElementById('days'); el.innerHTML='';
 const first=new Date(2026,8,1).getDay(); const offset=(first+6)%7;
 for(let i=0;i<offset;i++)el.appendChild(document.createElement('div'));
 for(let d=1;d<=30;d++){const x=document.createElement('div');x.textContent=d;if(d===22)x.className='today';if([3,8,12,18,22,24,27].includes(d))x.classList.add('event');el.appendChild(x)}
}
buildCalendar();
