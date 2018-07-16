#include "Stm32EEPROM.h"


String Stm32EEPROM::readFromStorage(String key)
{
	DynamicJsonBuffer jsonBuffer;
	JsonObject& root = readJsonFromEeprom(jsonBuffer);
	return root[key];
}
		
bool Stm32EEPROM::writeInStorage(String key, String value)
{
	DynamicJsonBuffer jsonBuffer;
	JsonObject& root = readJsonFromEeprom(jsonBuffer);
	
	if(key.equals("@id"))
		root["@id"] = value;
	else if(key.equals("radio"))
	{
		/*DynamicJsonBuffer buffer;
		JsonVariant var = buffer.parseObject(value);
		JsonObject& radio = var.as<JsonObject&>();*/
		String radioString = "{\"radio\":{\"@type\":\"ty\",\"frequency\":\"fre\",\"network\":\"net\",\"client\":\"cli\",\"password\":\"pwd\"}}";
		DynamicJsonBuffer bufferForValue;
		JsonObject& jsonValue = bufferForValue.parseObject(value);
		//JsonVariant var = root2.get<JsonVariant>("radio");
		//JsonObject& rad = var.as<JsonObject&>();
		root.set(key,jsonValue);
		//DynamicJsonBuffer buffer;
		//JsonVariant radio = buffer.parseObject(radioString);
		//JsonObject& radio = var.as<JsonObject&>();
		//root.set("radio",radio);
		//root.set("radio","edcfvgbhnjnmkm");
		//root["radio"] = radio;
	}
	else
	{
		//TODO auch andere Objekte müssen gespeichert werden können
		return false;
	}

	bool isOk = this->saveJsonInEeprom(root);
	
	return isOk;
	
}

bool Stm32EEPROM::removeFromStorage(String key)
{
	DynamicJsonBuffer jsonBuffer;
	JsonObject& root = readJsonFromEeprom(jsonBuffer);
	root.remove(key);
	saveJsonInEeprom(root);
	return true;
}

JsonObject& Stm32EEPROM::readJsonFromEeprom(DynamicJsonBuffer& jsonBuffer)
{
	String ret = "";
	char tmp;
	tmp = EEPROM.read(0);
		
	if(tmp == '{'){

		//Lese Daten aus EEPROM
		int length = 0;
		do{
		  tmp = EEPROM.read(length);      
		  length++;
		} while(tmp != '\0');

		char chars[length];
		int i = 0;
		do
		{
		  tmp = EEPROM.read(i);
		  
		  if(tmp != '\0')
			chars[i] = tmp;  
		  
		  i++;
		} while(tmp != '\0');
		
		
		ret = String(chars);
		
		//Wandel Daten in Json um
		JsonObject& root = jsonBuffer.parseObject(ret);
		return root;
	}
	else{
		
		JsonObject& root = jsonBuffer.createObject();
		return root;
	}
}

bool Stm32EEPROM::saveJsonInEeprom(JsonObject& json)
{
	String t;
	json.printTo(t);
	
	String saveInEprom = t + '\0';
	
	int length = strlen(saveInEprom.c_str());
	for(int i = 0; i<length;i++)
	{
		byte ch = saveInEprom.charAt(i);
		EEPROM.write(i,ch);
	}
	return true;
}