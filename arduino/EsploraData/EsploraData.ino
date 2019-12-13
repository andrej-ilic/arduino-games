#include <Esplora.h>

int xValue, yValue;
bool upPressed, downPressed, leftPressed, rightPressed;
int xValuePrev = 1000, yValuePrev = 1000;
bool upPressedPrev = -1, downPressedPrev = -1, leftPressedPrev = -1, rightPressedPrev = -1;

bool dataChanged() {
  return xValue != xValuePrev or
         yValue != yValuePrev or
         upPressed != upPressedPrev or
         downPressed != downPressedPrev or
         rightPressed != rightPressedPrev or
         leftPressed != leftPressedPrev;
}

void printData() {
  Serial.println(String(xValue) + "," + String(yValue) + "," + String(upPressed) + "," + String(downPressed) + "," + String(leftPressed) + "," + String(rightPressed));
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available()) {
    switch (Serial.read()) {
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
  
  xValue = Esplora.readJoystickX() / (-50);
  yValue = Esplora.readJoystickY() / (-50);
  upPressed = !Esplora.readButton(SWITCH_UP);
  downPressed = !Esplora.readButton(SWITCH_DOWN);
  leftPressed = !Esplora.readButton(SWITCH_LEFT);
  rightPressed = !Esplora.readButton(SWITCH_RIGHT);

  if (dataChanged()) {
    printData();
  }

  xValuePrev = xValue;
  yValuePrev = yValue;
  upPressedPrev = upPressed;
  downPressedPrev = downPressed;
  leftPressedPrev = leftPressed;
  rightPressedPrev = rightPressed;
  
  delay(30);
}
