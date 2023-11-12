#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

//Deklarasi Pin Inject ke Mega
#define Pin_Main_Switch D0
#define Pin_Auto_Switch D1
#define Pin_Internet_Status D2
#define Pin_Pump_Tank D3
#define Pin_Pump_Booster D4
#define Pin_Selenoid_Valve D5
#define Pin_Lamp D6

const char* ssid = "p";               // Ganti dengan nama WiFi Anda
const char* password = "Kata Sandi";  // Ganti dengan password WiFi Anda
const char* api_auto = "http://api.aqualifier.cloud/api/get/system/auto";
const char* api_switch = "http://api.aqualifier.cloud/api/get/system/switch";
const char* api_actuactor_get = "http://api.aqualifier.cloud/api/get/actuator";

unsigned long lastTime = 0;  // Variabel untuk menyimpan waktu terakhir pengambilan data
unsigned long lastTimeActuator = 0;
const unsigned long interval = 1000;  // Interval waktu (dalam milidetik) antara setiap pengambilan data

bool lastAutoValue = true;     // Variabel untuk menyimpan nilai Auto terakhir
bool currentAutoValue = true;  // Variabel untuk menyimpan nilai Auto saat ini

bool lastSwitchValue = true;     // Variabel untuk menyimpan nilai Switch terakhir
bool currentSwitchValue = true;  // Variabel untuk menyimpan nilai Switch saat ini

bool pumpTankStatus = false;
bool pumpBoosterStatus = false;
bool selenoidValveStatus = false;
bool lampStatus = false;

//Deklarasi untuk parsing data
String dataIn;
String dt[60];
int i;
boolean parsing = false;

//Deklarasi String Sensor
String Str_Water_Ph = "0";              //Integer to String
String Str_Water_Index = "-";           //Pure String
String Str_Water_Flow = "0";            //Integer to String
String Str_Water_Flow_Index = "-";      //Pure String
String Str_Water_Temperature = "0";     //Integer to String
String Str_Soil_Ph = "=";               //Integer to String
String Str_Soil_Index = "-";            //Pure String
String Str_Soil_Moisture = "0";         //Integer to String
String Str_Soil_Moisture_Index = "-";   //Pure String
String Str_Soil_Temperature = "0";      //Integer to String
String Str_Air_Temperature = "0";       //Integer to String
String Str_Air_Humidity = "0";          //Integer to String
String Str_Anemo = "0";                 //Integer to String
String Str_Anemo_Index = "-";           //Pure String
String Str_LDR = "0";                   //Boolean to Integer to String(1/0)
String Str_LDR_Index = "-";             //Pure String
String Str_Ultrasonic = "0";            //Integer to String
String Str_Tank_Percentage = "0";       //Integer to String (Percent 0-100)
String Str_Tank_Capacity = "0";         //Integer to String (Value Fix)
String Str_Unit_Ph = "pH";              //Pure Fix String
String Str_Unit_Water = "L/Jam";        //Pure Fix String
String Str_Unit_Moisture = "%";         //Pure Fix String
String Str_Unit_Temperature = "°C";     //Pure Fix String
String Str_Unit_Humidity = "%";         //Pure Fix String
String Str_Unit_Anemo = "Knot";         //Pure Fix String
String Str_Unit_LDR = "%";              //Pure Fix String
String Str_Unit_Ultrasonic = "cm";      //Pure Fix String
String Str_Unit_Tank_Percentage = "%";  //Pure Fix String
String Str_Unit_Tank_Capacity = "Cm";   //Pure Fix String

//Deklarasi String System (Hanya Up PLN & PLTS)
String Str_PLN = "false";  //Boolean to String
String Str_PLTS = "true";  //Boolean to String

//Deklarasi String Voltage
String Str_Solar_Voltage;             //Integer to String
String Str_Battery1_Voltage;          //Integer to String
String Str_Battery2_Voltage;          //Integer to String
String Str_Battery1_Capacity;         //Integer to String(fix)
String Str_Battery2_Capacity = "60";  //Integer to String(fix)
String Str_StepDown_Voltage = "7.5";  //Integer to String
String Str_PLN_Voltage;               //Integer to String
String Str_PLN_Current;               //Integer to String
String Str_PLN_Power;                 //Integer to String
String Str_PLN_Energy;                //Integer to String
String Str_PLN_Frequency;             //Integer to String
String Str_PLN_PF;                    //Integer to String
String Str_Inverter_Voltage;          //Integer to String
String Str_Inverter_Current;          //Integer to String
String Str_Inverter_Power;            //Integer to String
String Str_Inverter_Energy;           //Integer to String
String Str_Inverter_Frequency;        //Integer to String
String Str_Inverter_PF;               //Integer to String
String Str_Unit_Voltage = "V";        //Pure String
String Str_Unit_Capacity = "Ah";      //Pure String
String Str_Unit_Current = "A";        //Pure String
String Str_Unit_Power = "Watt";       //Pure String
String Str_Unit_Energy = "Kwh";       //Pure String
String Str_Unit_Frequency = "Hz";     //Pure String
String Str_Unit_PF = "kW";            //Pure String

//Deklarasi String Actuator
String Str_Pump_Tank = "false";       //Boolean to String
String Str_Pump_Booster = "false";    //Boolean to String
String Str_Selenoid_Valve = "false";  //Boolean to String
String Str_Lamp = "false";            //Boolean to String

//EDITED API
const char* api_sensor_edit = ("http://api.aqualifier.cloud/api/get/edit/batch/sensor?water_ph=" + Str_Water_Ph + "&water_index=" + Str_Water_Index + "&water_flow=" + Str_Water_Flow + "&water_flow_index=" + Str_Water_Flow_Index + "&water_temp=" + Str_Water_Temperature + "&soil_ph=" + Str_Soil_Ph + "&soil_index=" + Str_Soil_Index + "&soil_moisture=" + Str_Soil_Moisture + "&soil_moisture_index=" + Str_Soil_Moisture_Index + "&soil_temp=" + Str_Soil_Temperature + "&air_temp=" + Str_Air_Temperature + "&air_humidity=" + Str_Air_Humidity + "&anemo=" + Str_Anemo + "&anemo_index=" + Str_Anemo_Index + "&ldr=" + Str_LDR + "&ldr_index=" + Str_LDR_Index + "&ultrasonic=" + Str_Ultrasonic + "&tank_percentage=" + Str_Tank_Percentage + "&tank_capacity=" + Str_Tank_Capacity + "&unit_ph=" + Str_Unit_Ph + "&unit_water=" + Str_Unit_Water + "&unit_moisture=" + Str_Unit_Moisture + "&unit_temp=" + Str_Unit_Temperature + "&unit_humidity=" + Str_Unit_Humidity + "&unit_anemo=" + Str_Unit_Anemo + "&unit_ldr=" + Str_Unit_LDR + "&unit_ultrasonic=" + Str_Unit_Ultrasonic + "&unit_tank_percentage=" + Str_Unit_Tank_Percentage + "&unit_tank_capacity=" + Str_Unit_Tank_Capacity).c_str();

const char* api_actuator_edit = ("http://api.aqualifier.cloud/api/get/edit/actuator?pumptank=" + Str_Pump_Tank + "&pumpboost=" + Str_Pump_Booster + "&selenoid=" + Str_Selenoid_Valve + "&lamp=" + Str_Lamp).c_str();

const char* api_voltage_edit = ("http://api.aqualifier.cloud/api/get/edit/batch/voltage?solar_voltage=" + Str_Solar_Voltage + "&battery1_voltage=" + Str_Battery1_Voltage + "&battery2_voltage=" + Str_Battery2_Voltage + "&battery1_capacity=" + Str_Battery1_Capacity + "&battery2_capacity=" + Str_Battery2_Capacity + "&stepdown_voltage=" + Str_StepDown_Voltage + "&pln_voltage=" + Str_PLN_Voltage + "&pln_current=" + Str_PLN_Current + "&pln_power=" + Str_PLN_Power + "&pln_energy=" + Str_PLN_Energy + "&pln_frequency=" + Str_PLN_Frequency + "&pln_pf=" + Str_PLN_PF + "&inverter_voltage=" + Str_Inverter_Voltage + "&inverter_current=" + Str_Inverter_Current + "&inverter_power=" + Str_Inverter_Power + "&inverter_energy=" + Str_Inverter_Energy + "&inverter_frequency=" + Str_Inverter_Frequency + "&inverter_pf=" + Str_Inverter_PF + "&unit_voltage=" + Str_Unit_Voltage + "&unit_capacity=" + Str_Unit_Capacity + "&unit_current=" + Str_Unit_Current + "&unit_power=" + Str_Unit_Power + "&unit_energy=" + Str_Unit_Energy + "&unit_frequency=" + Str_Unit_Frequency + "&unit_pf=" + Str_Unit_PF).c_str();

const char* api_system_edit = ("https://api.aqualifier.cloud/api/get/edit/batch/system/onlymcu?pln=" + Str_PLN + "&plts=" + Str_PLTS).c_str();

void setup() {
  //Set Ouput pin inject
  pinMode(Pin_Main_Switch, OUTPUT);
  pinMode(Pin_Auto_Switch, OUTPUT);
  pinMode(Pin_Internet_Status, OUTPUT);
  pinMode(Pin_Pump_Tank, OUTPUT);
  pinMode(Pin_Pump_Booster, OUTPUT);
  pinMode(Pin_Selenoid_Valve, OUTPUT);
  pinMode(Pin_Lamp, OUTPUT);

  Serial.begin(9600);
  delay(100);

  connectToWiFi();
}

void loop() {
  unsigned long currentTime = millis();

  // Cek apakah sudah mencapai interval waktu yang diinginkan sejak pengambilan data terakhir
  if (currentTime - lastTime >= interval) {
    getAutoValue();
    getMainSwitchValue();
    sendHttpGetRequest(api_sensor_edit);
    sendHttpGetRequest(api_actuator_edit);
    sendHttpGetRequest(api_voltage_edit);
    sendHttpGetRequest(api_system_edit);
    lastTime = currentTime;  // Perbarui waktu terakhir
  }
  // Cek apakah nilai Auto telah berubah sejak pengambilan data terakhir
  if (lastSwitchValue != currentSwitchValue) {
    // Lakukan sesuatu jika nilai Switch berubah
    if (currentSwitchValue) {
      Serial.println("Nilai Switch berubah menjadi: true");
      digitalWrite(Pin_Main_Switch, LOW);
      if (lastAutoValue != currentAutoValue) {
        // Lakukan sesuatu jika nilai Auto berubah
        if (currentAutoValue) {
          Serial.println("Nilai Auto berubah menjadi: true");
          digitalWrite(Pin_Auto_Switch, LOW);
        } else {
          unsigned long currentTimeActuator = millis();
          Serial.println("Nilai Auto berubah menjadi: false");
          digitalWrite(Pin_Auto_Switch, HIGH);
          if (currentTimeActuator - lastTimeActuator >= interval) {
            getActuatorData();
            lastTimeActuator = currentTimeActuator;  // Perbarui waktu terakhir
          }
        }
        lastAutoValue = currentAutoValue;  // Perbarui nilai Auto terakhir
      }

      if (Serial.available() > 0) {
        char inChar = (char)Serial.read();
        dataIn += inChar;
        if (inChar == '\n') {
          parsing = true;
        }
      }

      if (parsing) {
        parsingData();
        parsing = false;
        dataIn = "";
      }
    } else {
      Serial.println("Nilai Switch berubah menjadi: false");
      digitalWrite(Pin_Main_Switch, HIGH);
    }
    lastSwitchValue = currentSwitchValue;  // Perbarui nilai Switch terakhir
  }
}

void parsingData() {
  int j = 0;

  //kirim data yang telah diterima sebelumnya
  Serial.print("data masuk : ");
  Serial.print(dataIn);

  //inisialisasi variabel, (reset isi variabel)
  dt[j] = "";
  //proses parsing data
  for (i = 1; i < dataIn.length(); i++) {
    //pengecekan tiap karakter dengan karakter (#) dan (,)
    if ((dataIn[i] == '#') || (dataIn[i] == ',')) {
      //increment variabel j, digunakan untuk merubah index array penampung
      j++;
      dt[j] = "";  //inisialisasi variabel array dt[j]
    } else {
      //proses tampung data saat pengecekan karakter selesai.
      dt[j] = dt[j] + dataIn[i];
    }
  }

  //kirim data hasil parsing
  Serial.print("data 1 (Water_Ph) : ");
  Serial.println(dt[0]);
  Serial.print("data 2 (Water_Index) : ");
  Serial.println(dt[1]);
  Serial.print("data 3 (Water_Flow) : ");
  Serial.println(dt[2]);
  Serial.print("data 4 (Water_Flow_Index) : ");
  Serial.println(dt[3]);
  Serial.print("data 5 (Water_Temperature) : ");
  Serial.println(dt[4]);
  Serial.print("data 6 (Soil_Ph) : ");
  Serial.println(dt[5]);
  Serial.print("data 7 (Soil_Index) : ");
  Serial.println(dt[6]);
  Serial.print("data 8 (Soil_Moisture) : ");
  Serial.println(dt[7]);
  Serial.print("data 9 (Soil_Moisture_Index) : ");
  Serial.println(dt[8]);
  Serial.print("data 10 (Soil_Temperature) : ");
  Serial.println(dt[9]);
  Serial.print("data 11 (Air_Temperature) : ");
  Serial.println(dt[10]);
  Serial.print("data 12 (Air_Humidity) : ");
  Serial.println(dt[11]);
  Serial.print("data 13 (Anemo) : ");
  Serial.println(dt[12]);
  Serial.print("data 14 (Anemo_Index) : ");
  Serial.println(dt[13]);
  Serial.print("data 15 (LDR) : ");
  Serial.println(dt[14]);
  Serial.print("data 16 (LDR_Index) : ");
  Serial.println(dt[15]);
  Serial.print("data 17 (Ultrasonic) : ");
  Serial.println(dt[16]);
  Serial.print("data 18 (Tank_Percentage) : ");
  Serial.println(dt[17]);
  Serial.print("data 19 (Tank_Capacity) : ");
  Serial.println(dt[18]);
  Serial.print("data 20 (Solar_Voltage) : ");
  Serial.println(dt[19]);
  Serial.print("data 21 (Battery1_Voltage) : ");
  Serial.println(dt[20]);
  Serial.print("data 22 (Battery2_Voltage) : ");
  Serial.println(dt[21]);
  Serial.print("data 23 (StepDown_Voltage) : ");
  Serial.println(dt[22]);
  Serial.print("data 24 (AC_Voltage) : ");
  Serial.println(dt[23]);
  Serial.print("data 25 (AC_Current) : ");
  Serial.println(dt[24]);
  Serial.print("data 26 (AC_Power) : ");
  Serial.println(dt[25]);
  Serial.print("data 27 (AC_Energy) : ");
  Serial.println(dt[26]);
  Serial.print("data 28 (AC_Frequency) : ");
  Serial.println(dt[27]);
  Serial.print("data 29 (AC_PF) : ");
  Serial.println(dt[28]);
  Serial.print("data 30 (Pump_Tank) : ");
  Serial.println(dt[29]);
  Serial.print("data 31 (Pump_Booster) : ");
  Serial.println(dt[30]);
  Serial.print("data 32 (Selenoid_Valve) : ");
  Serial.println(dt[31]);
  Serial.print("data 33 (Lamp) : ");
  Serial.println(dt[32]);
  Serial.print("data 34 (PLN) : ");
  Serial.println(dt[33]);
  Serial.print("data 35 (PLTS) : ");
  Serial.println(dt[34]);
  Serial.print("\n\n");

  //Wrapping data untuk di definisikan
  Str_Water_Ph = dt[0];
  Str_Water_Index = dt[1];
  Str_Water_Flow = dt[2];
  Str_Water_Flow_Index = dt[3];
  Str_Water_Temperature = dt[4];
  Str_Soil_Ph = dt[5];
  Str_Soil_Index = dt[6];
  Str_Soil_Moisture = dt[7];
  Str_Soil_Moisture_Index = dt[8];
  Str_Soil_Temperature = dt[9];
  Str_Air_Temperature = dt[10];
  Str_Air_Humidity = dt[11];
  Str_Anemo = dt[12];
  Str_Anemo_Index = dt[13];
  Str_LDR = dt[14];
  Str_LDR_Index = dt[15];
  Str_Ultrasonic = dt[16];
  Str_Tank_Percentage = dt[17];
  Str_Tank_Capacity = dt[18];
  Str_Solar_Voltage = dt[19];
  Str_Battery1_Voltage = dt[20];
  Str_Battery2_Voltage = dt[21];
  Str_StepDown_Voltage = dt[22];
  Str_Pump_Tank = dt[29];
  Str_Pump_Booster = dt[30];
  Str_Selenoid_Valve = dt[31];
  Str_Lamp = dt[32];

  //Change Record Automatic
  if (dt[33] == "true" && dt[34] == "false") {
    Str_PLN_Voltage = dt[23];
    Str_PLN_Current = dt[24];
    Str_PLN_Power = dt[25];
    Str_PLN_Energy = dt[26];
    Str_PLN_Frequency = dt[27];
    Str_PLN_PF = dt[28];
    Str_Inverter_Voltage = "0";
    Str_Inverter_Current = "0";
    Str_Inverter_Power = "0";
    Str_Inverter_Energy = "0";
    Str_Inverter_Frequency = "0";
    Str_Inverter_PF = "0";
  } else {
    Str_PLN_Voltage = "0";
    Str_PLN_Current = "0";
    Str_PLN_Power = "0";
    Str_PLN_Energy = "0";
    Str_PLN_Frequency = "0";
    Str_PLN_PF = "0";
    Str_Inverter_Voltage = dt[23];
    Str_Inverter_Current = dt[24];
    Str_Inverter_Power = dt[25];
    Str_Inverter_Energy = dt[26];
    Str_Inverter_Frequency = dt[27];
    Str_Inverter_PF = dt[28];
  }
}

void connectToWiFi() {
  Serial.println("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to Wi-Fi");
}

void getMainSwitchValue() {
  if ((WiFi.status() == WL_CONNECTED)) {
    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] Memulai...\n");

    if (http.begin(client, api_switch)) {
      int httpCode = http.GET();

      if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();

          Serial.println("Response payload: ");
          Serial.println(payload);

          // Parsing JSON
          DynamicJsonDocument doc(200);
          DeserializationError error = deserializeJson(doc, payload);

          if (error) {
            Serial.print("Gagal parsing JSON: ");
            Serial.println(error.c_str());
            return;
          }

          currentSwitchValue = doc["Switch"];

          if (currentSwitchValue) {
            Serial.println("Nilai Switch: true");
            // Lakukan sesuatu jika nilai Switch true
          } else {
            Serial.println("Nilai Switch: false");
            // Lakukan sesuatu jika nilai Switch false
          }
        }
      } else {
        Serial.printf("[HTTP] GET request gagal, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.println("Gagal melakukan koneksi HTTP");
    }
  } else {
    Serial.println("Gagal terhubung ke Wi-Fi");
  }
}


void getAutoValue() {
  if ((WiFi.status() == WL_CONNECTED)) {
    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] Memulai...\n");

    if (http.begin(client, api_auto)) {
      int httpCode = http.GET();

      if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();

          Serial.println("Response payload: ");
          Serial.println(payload);

          // Parsing JSON
          DynamicJsonDocument doc(200);
          DeserializationError error = deserializeJson(doc, payload);

          if (error) {
            Serial.print("Gagal parsing JSON: ");
            Serial.println(error.c_str());
            return;
          }

          currentAutoValue = doc["Auto"];

          if (currentAutoValue) {
            Serial.println("Nilai Auto: true");
            // Lakukan sesuatu jika nilai Auto true
          } else {
            Serial.println("Nilai Auto: false");
            // Lakukan sesuatu jika nilai Auto false
          }
        }
      } else {
        Serial.printf("[HTTP] GET request gagal, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.println("Gagal melakukan koneksi HTTP");
    }
  } else {
    Serial.println("Gagal terhubung ke Wi-Fi");
  }
}

void getActuatorData() {
  if ((WiFi.status() == WL_CONNECTED)) {
    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] Memulai...\n");

    if (http.begin(client, api_actuactor_get)) {
      int httpCode = http.GET();

      if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();

          Serial.println("Response payload: ");
          Serial.println(payload);

          // Parsing JSON
          DynamicJsonDocument doc(200);
          DeserializationError error = deserializeJson(doc, payload);

          if (error) {
            Serial.print("Gagal parsing JSON: ");
            Serial.println(error.c_str());
            return;
          }

          pumpTankStatus = doc["Pump_Tank"];
          pumpBoosterStatus = doc["Pump_Booster"];
          selenoidValveStatus = doc["Selenoid_Valve"];
          lampStatus = doc["Lamp"];

          // Cek status masing-masing komponen dan lakukan sesuatu
          if (pumpTankStatus) {
            Serial.println("Pump Tank: ON");
            // Lakukan sesuatu jika Pump Tank ON
            digitalWrite(Pin_Pump_Tank, LOW);
          } else {
            Serial.println("Pump Tank: OFF");
            // Lakukan sesuatu jika Pump Tank OFF
            digitalWrite(Pin_Pump_Tank, HIGH);
          }

          if (pumpBoosterStatus) {
            Serial.println("Pump Booster: ON");
            // Lakukan sesuatu jika Pump Booster ON
            digitalWrite(Pin_Pump_Booster, LOW);
          } else {
            Serial.println("Pump Booster: OFF");
            // Lakukan sesuatu jika Pump Booster OFF
            digitalWrite(Pin_Pump_Booster, HIGH);
          }

          if (selenoidValveStatus) {
            Serial.println("Selenoid Valve: ON");
            // Lakukan sesuatu jika Selenoid Valve ON
            digitalWrite(Pin_Selenoid_Valve, LOW);
          } else {
            Serial.println("Selenoid Valve: OFF");
            // Lakukan sesuatu jika Selenoid Valve OFF
            digitalWrite(Pin_Selenoid_Valve, HIGH);
          }

          if (lampStatus) {
            Serial.println("Lamp: ON");
            // Lakukan sesuatu jika Lamp ON
            digitalWrite(Pin_Lamp, LOW);
          } else {
            Serial.println("Lamp: OFF");
            // Lakukan sesuatu jika Lamp OFF
            digitalWrite(Pin_Lamp, HIGH);
          }
        }
      } else {
        Serial.printf("[HTTP] GET request gagal, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.println("Gagal melakukan koneksi HTTP");
    }
  } else {
    Serial.println("Gagal terhubung ke Wi-Fi");
  }
}

void sendHttpGetRequest(const char *apiEndpoint) {
  HTTPClient http;
  WiFiClient client;

  // Specify the server address and port
  http.begin(client, apiEndpoint);

  // Send GET request
  int httpCode = http.GET();

  // Check for a successful request
  if (httpCode > 0) {
    Serial.printf("HTTP GET request to %s completed with status code %d\n", apiEndpoint, httpCode);

    // You can handle the response here if needed
    // String payload = http.getString();
    // Serial.println(payload);
  } else {
    Serial.printf("HTTP GET request to %s failed with error %s\n", apiEndpoint, http.errorToString(httpCode).c_str());
  }

  // Close connection
  http.end();
}
