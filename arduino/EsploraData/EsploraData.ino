#include <Esplora.h>

#define DATA_N 7

// xAcc, right, left, down, up, yJoy, xJoy
long mode = 0;

int data[DATA_N];
int prevData[DATA_N];

bool dataChanged() {
  int mask = 1;
  
  for (int i = 0; i < DATA_N; i++) {
    if (mode & mask) {
      if (data[i] != prevData[i]) {
        return true;
      }
    }

    mask <<= 1;
  }

  return false;
}

void printData() {
  int mask = 1;
  
  for (int i = 0; i < DATA_N; i++) {
    if (mode & mask) {
      Serial.print(data[i]);

      if ((mode >> (i + 1)) > 0) {
        Serial.print(",");
      } else {
        break;
      }
    }

    mask <<= 1;
  }
  
  Serial.println();
}

void setup() {
  for (int i = 0; i < DATA_N; i++) {
    prevData[i] = -1000;
  }
  
  Serial.begin(115200);
}

void loop() {
  if (Serial.available()) {
    switch (Serial.read()) {
      case 'm':
        mode = Serial.parseInt();
        Serial.println("modeChanged");
        break;
      case 'f':
        Esplora.tone(523, 50);
        break;
      case 'b':
        Esplora.tone(262, 100);
        break;
      case 'd':
        Esplora.tone(100, 1000);
        break;
      default:
        break;
    }
  }
  
  data[0] = Esplora.readJoystickX() / (-50);
  data[1] = Esplora.readJoystickY() / (-50);
  data[2] = !Esplora.readButton(SWITCH_UP);
  data[3] = !Esplora.readButton(SWITCH_DOWN);
  data[4] = !Esplora.readButton(SWITCH_LEFT);
  data[5] = !Esplora.readButton(SWITCH_RIGHT);
  data[6] = Esplora.readAccelerometer(X_AXIS) / (-10);

  if (dataChanged()) {
    printData();
  }

  for (int i = 0; i < DATA_N; i++) {
    prevData[i] = data[i];
  }
  
  delay(30);
}
