const int mq2Pin = A0;
const int buzzerPin = 7;
const int ledPin = 13;

bool alarmOn = false;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int smokeLevel = analogRead(mq2Pin);
  String status = "Normal";

  if (alarmOn) {
    if (smokeLevel > 650) {
      digitalWrite(buzzerPin, HIGH);
      digitalWrite(ledPin, HIGH);
      status = "Bahaya, Asap Terdeteksi";
    } else {
      digitalWrite(buzzerPin, LOW);
      digitalWrite(ledPin, LOW);
      status = "Normal";
    }
  } else {
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledPin, LOW);
    status = "Alarm Dimatikan";
  }

  String jsonData = "{\"smokeLevel\":" + String(smokeLevel) + ",\"status\":\"" + status + "\"}";
  Serial.println(jsonData);

  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == '1') {
      alarmOn = true;
    } else if (command == '0') {
      alarmOn = false;
    }
  }

  delay(500);
}
