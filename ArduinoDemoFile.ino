#include <SingleLedStatusDevice.h>
#include <PullUpSetupButtonDevice.h>
#include <EmptyTestRadioDevice.h>
#include <BrightnessSensor.h>
#include <Stm32EEPROM.h>
#include <STM32SensorBoard.h>


SingleLedStatusDevice statusLed(PC13);
PullUpSetupButtonDevice setupButton(PA0);
EmptyTestRadioDevice emptyRadio;
Stm32EEPROM stm32Eeprom;
BrightnessSensor brightnessSensor;
STM32SensorBoard sensorboard;


void setup() 
{
  sensorboard.setStatus(statusLed);
  sensorboard.setSetupButton(setupButton);
  sensorboard.setRadioModul(emptyRadio);
  sensorboard.setSensor(brightnessSensor);
  sensorboard.setConnectionStream(&Serial);
  sensorboard.setSetupModePressTime(4);
  sensorboard.setResetPressTime(10);
  sensorboard.setStorageDevice(stm32Eeprom);
  
  
  
  sensorboard.begin();
}

void loop() 
{
  sensorboard.loop();
}
