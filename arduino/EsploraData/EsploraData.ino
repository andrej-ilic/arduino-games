#include <Esplora.h>

int xValue;
bool leftPressed, downPressed;
char buffer[128];

void printJSON() {
  sprintf(buffer, "{\"x\":%d,\"left\":%d,\"down\":%d}", xValue, leftPressed, downPressed);
  Serial.println(buffer);
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  xValue = Esplora.readJoystickX() * (-1);
  leftPressed = !Esplora.readButton(SWITCH_LEFT);
  downPressed = !Esplora.readButton(SWITCH_DOWN);

  printJSON();

  delay(50);
}
