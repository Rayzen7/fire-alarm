const turnOnBtn = document.getElementById('turnOnBtn');
const turnOffBtn = document.getElementById('turnOffBtn');
const alarmStatus = document.getElementById('alarmStatus');
const smokeLevelDisplay = document.getElementById('smokeLevel');
const statusMessage = document.getElementById('statusMessage');

turnOnBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/alarm/on', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alarmStatus.textContent = 'Aktif';
      statusMessage.textContent = 'Alarm berhasil dihidupkan.';
      statusMessage.style.color = 'green';
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

turnOffBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/alarm/off', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alarmStatus.textContent = 'Tidak Aktif';
      statusMessage.textContent = 'Alarm berhasil dimatikan.';
      statusMessage.style.color = 'red';
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function getAlarmStatus() {
  fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
      alarmStatus.textContent = data.status;
      smokeLevelDisplay.textContent = data.smokeLevel;
    });
}

setInterval(getAlarmStatus, 1000);