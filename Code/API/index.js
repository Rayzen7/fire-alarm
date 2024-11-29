import express from 'express';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import cors from 'cors'; 

const app = express();
const port = 3000;

const serialPort = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

let latestData = {};
let alarmStatus = false;

app.use(cors());
app.use(express.json());

app.get('/data', (req, res) => {
  res.json(latestData);
});

app.post('/alarm/on', (req, res) => {
  if (!alarmStatus) {
    serialPort.write('1', (err) => {
      if (err) {
        console.error('Error writing to serial port:', err);
        return res.status(500).send('Error writing to Arduino');
      }
      alarmStatus = true;
      res.send({ status: 'Alarm dihidupkan' });
    });
  } else {
    res.send({ status: 'Alarm sudah aktif' });
  }
});

app.post('/alarm/off', (req, res) => {
  if (alarmStatus) {
    serialPort.write('0', (err) => {
      if (err) {
        console.error('Error writing to serial port:', err);
        return res.status(500).send('Error writing to Arduino');
      }
      alarmStatus = false;
      res.send({ status: 'Alarm dimatikan' });
    });
  } else {
    res.send({ status: 'Alarm sudah mati' });
  }
});

parser.on('data', (data) => {
  try {
    const parsedData = JSON.parse(data.trim());
    latestData = parsedData;
  } catch (error) {
    console.error('Gagal parsing data:', data);
  }
});

app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));
