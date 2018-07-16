#ifndef LINKEDIOT_STORAGEDEVICE_H
#define LINKEDIOT_STORAGEDEVICE_H

#include <Arduino.h>

class StorageDevice
{
    public:
		/*!
         * Liest den Wert zum zugehörigen key aus dem Speicher aus.
         *
         * @param[in] key	Key des Wertes.
         *
         * @return Value des keys.
         */
		virtual String readFromStorage(String key) = 0;
		
		/*!
         * Speichert permanent den Wert von value mit dem zugehörigen key im Speicher.
         *
         * @retval TRUE     Wert erfolgreich gespeichert
         * @retval FALSE    Wert konnte nicht gespeichert werden
         */
		virtual bool writeInStorage(String key, String value) = 0;
		
		/*!
         * Löscht den Wert vom Speicher.
         *
         * @retval TRUE     Wert erfolgreich gelöscht
         * @retval FALSE    Wert konnte nicht gelöscht werden
         */
		virtual bool removeFromStorage(String key) = 0;
};


#endif //LINKEDIOT_STORAGEDEVICE_H
