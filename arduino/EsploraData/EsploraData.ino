#include <Esplora.h>

int xValuePrev = 1000, xValue;
bool leftPressedPrev = -1, leftPressed, downPressedPrev = -1, downPressed;
char buffer[128];

void printJSON() {
  sprintf(buffer, "{\"x\":%d,\"left\":%d,\"down\":%d}", xValue, leftPressed, downPressed);
  Serial.println(buffer);
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  xValue = Esplora.readJoystickX();
  leftPressed = !Esplora.readButton(SWITCH_LEFT);
  downPressed = !Esplora.readButton(SWITCH_DOWN);

  xValue = (xValue / 50) * (-50);

  if (leftPressed != leftPressedPrev or downPressed != downPressedPrev or xValue != xValuePrev) {
    printJSON();
  }

  xValuePrev = xValue;
  leftPressedPrev = leftPressed;
  downPressedPrev = downPressed;
  
  delay(33);
}
