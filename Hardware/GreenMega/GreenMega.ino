//==============================IMPORT LIBRARY==============================//
#include "Wire.h"  // For I2C
//#include "LCD.h" // For LCD
#include "LiquidCrystal_I2C.h"  // Added library*
#include <Adafruit_INA219.h>
#include "DHT.h"
#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>
#include <DFRobot_PH.h>
#include <OneWire.h>
#include <DallasTemperature.h>

//==============================CONFIG LIBRARY==============================//
//PZEM004Tv30 pzem(14, 15); // Software Serial pin 11 (RX) & 12 (TX)
PZEM004Tv30 pzem(&Serial3);  // Menggunakan Hardware Serial 3 TX RX ke 3 di balik

LiquidCrystal_I2C lcd(0x3F, 20, 4);  // 0x27 is the default I2C bus address of the backpack-see article
//const int INA_addr = 0x40;           // INA219 address
//Adafruit_INA219 ina219(INA_addr);

//==============================INPUT BYPASS==============================//
#define Main_Switch 40
#define Auto 41
#define Pump_Tank 42
#define Pump_Booster 43
#define Selenoid_Valve 44
#define Lamp_Switch 45
#define Internet_Status 46

//==============================BUTTON CHANGE LCD==============================//
#define buttonlcd 12  //tombol utk perubahan lcd

//==============================INPUT SENSOR==============================//

//;;;;;------;;;;;;;;;;_____________DIGITAL____________;;;;;;;;;;------;;;;;//
#define echoPin 22  //Echo Pin
#define trigPin 23  //Trigger Pin
#define DHTPIN 24   //DHT
#define DHTTYPE DHT11
#define LDR 25        //LDR LAMPU
#define tempsoil 26   //Suhu Tanah
#define tempwater 27  //Suhu Air
#define DMSph 28    //DMS ph meter air (hijau)
#define soilph 29    //Ph meter air  (kuning)
unsigned char FlowSensor = 30;

//;;;;;------;;;;;;;;;;_____________ANALOG____________;;;;;;;;;;------;;;;;//
#define soilsensor A7     //Soil Sensor
#define voltagesolar A8   //voltage sensor panel
#define voltagebatt1 A9   //voltage sensor battery besar
#define voltagebatt2 A10  //voltage sensor battery kecil
#define voltageSD A11     //voltage sensor stepdown (5V)
#define waterph A12        //Ph meter soil
#define anemo A13        //Anemo meter

//=========================Power Source Relay==========================//
#define PLTS_AC 2 //Dari Inverter
#define PLTS_DC 3 //Dari Battery
#define PLN_AC 4 //Dari PLN
#define PLN_DC 5 //Dari PSU
#define batt1state 6  //Controll Charger Battery 1

//==============================OUTPUT RELAY==============================//
#define bigpump 8
#define minipump 9
#define selvalve 10
#define lamp 11

//>>>>>>>>>>>>>> PILOT LAMP
#define PL1 32 //Merah (Main Switch Off)
#define PL2 33 //kuning (Internet)
#define PL3 34 //Hijau (Auto)
#define PL4 35 //Biru (PLTS)

//==============================EXEC LIBRARY==============================//
DHT dht(DHTPIN, DHTTYPE);
DFRobot_PH phwater_sensor;
OneWire wiretempsoil(tempsoil);
OneWire wiretempwater(tempwater);
DallasTemperature sensorphsoil(&wiretempsoil);
DallasTemperature sensorphwater(&wiretempwater);

//==============================TYPE DATA==============================//

//>>>>>>>>>>> ValueSwitch
int Main_Switch_Value;
int Auto_Value;
int Pump_Tank_Value;
int Pump_Booster_Value;
int Selenoid_Valve_Value;
int Lamp_Switch_Value;
int Internet_Status_Value;

//>>>>>>>>>>> Konfigurasi VDC
float R1 = 30000.0;
float R2 = 7500.0;
float ref_voltage = 5.0;  // Sesuaikan dengan nilai tegangan referensi yang benar

//>>>>>>>>>>> Konfigurasi Limit OnGrid
float limitbatt1 = 11.5;
float limitbatt2 = 11.5;

//>>>>>>>>>>> SOLAR
int sensorsolarValue = 0;  // Nilai dari pin analog
float fvoltagesolar = 0.0;
float avoltagesolar = 0.0;  // Nilai tegangan solar panel

//>>>>>>>>>>> BATT 1
int sensorbatt1Value = 0;  // Nilai dari pin analog
float fvoltagebatt1 = 0.0;
float avoltagebatt1 = 0.0;  // Nilai tegangan batt1

//>>>>>>>>>>> BATT 2
int sensorbatt2Value = 0;  // Nilai dari pin analog
float fvoltagebatt2 = 0.0;
float avoltagebatt2 = 0.0;  // Nilai tegangan batt2

//>>>>>>>>>>> VAC String
String voltAC;
String ampAC;
String powerAC;
String energyAC;
String freqAC;
String pfAC;

//FLOAT FOR PZEM
float voltage, current, power, energy, frequency, pf;

//>>>>>>>>>>> StepDown
int sensorSDValue = 0;  // Nilai dari pin analog
float fvoltageSD = 0.0;
float avoltageSD = 0.0;  // Nilai tegangan batt2

//>>>>>>>>>>> Ultrasonic
int maximumRange = 140;  //kebutuhan akan maksimal range
int minimumRange = 5;    //kebutuhan akan minimal range
int maximumPercent = 100;
int minimumPercent = 0;
int tair = 0;
long duration, distance;  //waktu untuk kalkulasi jarak

//>>>>>>>>>>> DHT
float temp, humidity;
String tempe, humidy;

//>>>>>>>>>>> pH Water
int waterph_value;
float phwater_value;
String IndexWaterPh;

//>>>>>>>>>>> pH Soil
int soilph_value;
float lastReading = 0;
float phsoil_value = 0;
String IndexSoilPh;

//>>>>>>>>>>> Suhu Air & Tanah
float suhutanah, suhuair;

//>>>>>>>>>>> Flow Sensor
volatile int pulsa_sensor;
unsigned int literPerjam;
unsigned long waktuAktual;
unsigned long waktuLoop;
double liter;
String IndexWaterFlow;

//>>>>>>>>>>> LDR
int LDRdata;
String LDRState;

int AnemoValue = "0";
String Anemo_Index = "-";

//>>>>>>>>>>> Soil Mois
int SoilMdata;
float kelembabanTanah;
String Str_kelembabanTanah;

//>>>>>>>>>>> Relay State
String BigPumpState = "false";
String MiniPumpState = "false";
String SelenoidState = "false";
String LampState = "false";

//>>>>>>>>>>> PLN/PLTS
String PLNState = "false";
String PLTSState = "true";

//>>>>> Posisi LCD
int valuebuttonlcd = 1;
int lcdposition = 1;

void cacahPulsa() {
  pulsa_sensor++;
}

void setup() {
  Serial.begin(9600);  //inisialiasasi komunikasi serial

  //INITIAL LIBRARY
  dht.begin();
  lcd.init();
  lcd.backlight();
  phwater_sensor.begin();
  sensorphsoil.begin();
  sensorphwater.begin();

  //INPUT SENSOR DIGITAL
  pinMode(echoPin, INPUT);
  pinMode(trigPin, INPUT);
  pinMode(LDR, INPUT);
  pinMode(FlowSensor, INPUT);
  digitalWrite(FlowSensor, HIGH);
  pinMode(DMSph, OUTPUT);
  digitalWrite(DMSph, HIGH);    // non-aktifkan DMS

  //>>>>>> FlowSensor Equipment
  attachInterrupt(0, cacahPulsa, RISING);
  sei();
  waktuAktual = millis();
  waktuLoop = waktuAktual;

  //INPUT SENSOR ANALOG
  // Use external voltage reference
  //analogReference(EXTERNAL);
  pinMode(soilsensor, INPUT);
  pinMode(voltagesolar, INPUT);
  pinMode(voltagebatt1, INPUT);
  pinMode(voltagebatt2, INPUT);
  pinMode(voltageSD, INPUT);
  //pinMode(waterph, INPUT);
  pinMode(anemo, INPUT);

  //INPUT DARI NODEMCU
  pinMode(Main_Switch, INPUT_PULLUP);
  pinMode(Auto, INPUT_PULLUP);
  pinMode(Pump_Tank, INPUT_PULLUP);
  pinMode(Pump_Booster, INPUT_PULLUP);
  pinMode(Selenoid_Valve, INPUT_PULLUP);
  pinMode(Lamp_Switch, INPUT_PULLUP);
  pinMode(Internet_Status, INPUT_PULLUP);

  //Tombol LCD
  pinMode(buttonlcd, INPUT_PULLUP);

  //OUTPUT RELAY POWER
  pinMode(PLTS_AC, OUTPUT);
  pinMode(PLTS_DC, OUTPUT);
  pinMode(PLN_AC, OUTPUT);
  pinMode(PLN_DC, OUTPUT);
  pinMode(batt1state, OUTPUT);

  //>>>>>Pilot Lamp
  pinMode(PL1, OUTPUT);
  pinMode(PL2, OUTPUT);
  pinMode(PL3, OUTPUT);
  pinMode(PL4, OUTPUT);

  //OUTPUT RELAY DC
  pinMode(minipump, OUTPUT);
  pinMode(selvalve, OUTPUT);

  //OUTPUT RELAY AC
  pinMode(bigpump, OUTPUT);
  pinMode(lamp, OUTPUT);

  startup_lcd();
}

void loop() {
  //Read Value Switch
  Main_Switch_Value = digitalRead(Main_Switch);
  Auto_Value = digitalRead(Auto);
  Internet_Status_Value = digitalRead(Internet_Status);

  //Pilot Lamp Status Internet
  if(Internet_Status_Value == 0){
    digitalWrite(PL2, HIGH);
  } else { 
    digitalWrite(PL2, LOW);
  }

  //SCHEMA LCD
  if (lcdposition == 1) {
    schema_lcd_1();
  } else if (lcdposition == 2) {
    schema_lcd_2();
  } else if (lcdposition == 3) {
    schema_lcd_3();
  } else if (lcdposition == 4) {
    schema_lcd_4();
  } else if (lcdposition == 5) {
    schema_lcd_5();
  }

  //OUTPUT STATE
  if(Auto_Value == 0){
    //MANUAL
    Pump_Tank_Value = digitalRead(Pump_Tank);
    Pump_Booster_Value = digitalRead(Pump_Booster);
    Selenoid_Valve_Value = digitalRead(Selenoid_Valve);
    Lamp_Switch_Value = digitalRead(Lamp_Switch);
    digitalWrite(PL3, LOW);
    if(Pump_Tank_Value == 0){
      digitalWrite(bigpump, HIGH);
      BigPumpState = "true";
    } else {
      digitalWrite(bigpump, LOW);
      BigPumpState = "false";
    }

    if(Pump_Booster_Value == 0){
      digitalWrite(minipump, HIGH);
      MiniPumpState = "true";
    } else {
      digitalWrite(minipump, LOW);
      MiniPumpState = "false";
    }

    if(Selenoid_Valve_Value == 0){
      digitalWrite(selvalve, HIGH);
      SelenoidState = "true";
    } else {
      digitalWrite(selvalve, LOW);
      SelenoidState = "false";
    }

    if(Lamp_Switch_Value == 0){
      digitalWrite(lamp, HIGH);
      LampState = "true";
    } else {
      digitalWrite(lamp, LOW);
      LampState = "false";
    }
  } else {
    //AUTO
    digitalWrite(PL3, HIGH);
    if(tair < 10){
      //Pompa Besar Hidup
      digitalWrite(bigpump, HIGH);
      BigPumpState = "true";
    } else if (tair > 10 && tair > 98){
      //Pompa Besar Mati
      digitalWrite(bigpump, LOW);
      BigPumpState = "false";
    }

    if(kelembabanTanah < 10){
      //Pompa Kecil & Selenoid Hidup
      digitalWrite(minipump, HIGH);
      digitalWrite(selvalve, HIGH);
      MiniPumpState = "true";
      SelenoidState = "true";
    } else if (kelembabanTanah > 10 && kelembabanTanah > 98){
      //Pompa Kecil & Selenoid Mati
      digitalWrite(minipump, LOW);
      digitalWrite(selvalve, LOW);
      MiniPumpState = "true";
      SelenoidState = "true";
    }

    if(LDRdata == 1){
      //Lampu hidup
      digitalWrite(lamp, HIGH);
      LampState = "true";
    } else {
      //Lampu mati
      digitalWrite(lamp, LOW);
      LampState = "false";
    }
  }

  read_button_lcd();
  //------------------------------< FlowSensor >-----------------------------------//
  waktuAktual = millis();
  if (waktuAktual >= (waktuLoop + 1000)) {
    waktuLoop = waktuAktual;
    literPerjam = (pulsa_sensor * 60 / 7.5);
    pulsa_sensor = 0;
    //Serial.print(literPerjam, DEC);
    //Serial.println(" L/jam");
  }
  read_button_lcd();

  //------------------------------< VDC >-----------------------------------//
  sensorbatt1Value = analogRead(voltagebatt1);
  avoltagebatt1 = (sensorbatt1Value * ref_voltage) / 1024.0;
  fvoltagebatt1 = avoltagebatt1 / (R2 / (R1 + R2));
  read_button_lcd();

  sensorbatt2Value = analogRead(voltagebatt2);
  avoltagebatt2 = (sensorbatt2Value * ref_voltage) / 1024.0;
  fvoltagebatt2 = avoltagebatt2 / (R2 / (R1 + R2));
  read_button_lcd();

  sensorsolarValue = analogRead(voltagesolar);
  avoltagesolar = (sensorsolarValue * ref_voltage) / 1024.0;
  fvoltagesolar = avoltagesolar / (R2 / (R1 + R2));
  read_button_lcd();

  sensorSDValue = analogRead(voltageSD);
  avoltageSD = (sensorSDValue * ref_voltage) / 1024.0;
  fvoltageSD = avoltageSD / (R2 / (R1 + R2));
  read_button_lcd();

  //------------------------------< VAC >-----------------------------------//
  voltage = pzem.voltage();
  if (isnan(voltage)) {
    voltAC = "-";
    //Serial.print("Voltage: ");
    //Serial.print(voltage);
    //Serial.println("V");
  } else {
    voltAC = String(voltage);
    //Serial.println("Error reading voltage");
  }
  read_button_lcd();

  current = pzem.current();
  if (isnan(current)) {
    ampAC = "-";
    //Serial.print("Current: ");
    //Serial.print(current);
    //Serial.println("A");
  } else {
    ampAC = String(current);
    //Serial.println("Error reading current");
  }
  read_button_lcd();

  power = pzem.power();
  if (isnan(power)) {
    powerAC = "-";
    //Serial.print("Power: ");
    //Serial.print(power);
    //Serial.println("W");
  } else {
    powerAC = String(power);
    //Serial.println("Error reading power");
  }
  read_button_lcd();

  energy = pzem.energy();
  if (isnan(energy)) {
    energyAC = "-";
    //Serial.print("Energy: ");
    //Serial.print(energy,3);
    //Serial.println("kWh");
  } else {
    energyAC = String(energy);
    //Serial.println("Error reading energy");
  }
  read_button_lcd();

  frequency = pzem.frequency();
  if (isnan(frequency)) {
    freqAC = "-";
    //Serial.print("Frequency: ");
    //Serial.print(frequency, 1);
    //Serial.println("Hz");
  } else {
    freqAC = String(frequency);
    //Serial.println("Error reading frequency");
  }
  read_button_lcd();

  pf = pzem.pf();
  if (isnan(pf)) {
    pfAC = "-";
    //Serial.print("PF: ");
    //Serial.println(pf);
  } else {
    pfAC = String(pf);
    //Serial.println("Error reading power factor");
  }
  read_button_lcd();

  //>>>>>>>>>On grid buatan
  //Battery 1 (Utama)
  if (fvoltagebatt1 < limitbatt1) {
    digitalWrite(PLTS_DC, LOW);
    digitalWrite(PLTS_AC, LOW);
    digitalWrite(PLN_DC, HIGH);
    digitalWrite(PLN_AC, HIGH);
    digitalWrite(PL4, LOW);
    PLNState = "true";
    PLTSState = "false";
  } else if (fvoltagebatt1 >= limitbatt1) {
    digitalWrite(PLTS_DC, HIGH);
    digitalWrite(PLTS_AC, HIGH);
    digitalWrite(PLN_DC, LOW);
    digitalWrite(PLN_AC, LOW);
    digitalWrite(PL4, HIGH);
    PLNState = "false";
    PLTSState = "true";
  }
  read_button_lcd();

  //Battery 2 (Second Charger)
  if (fvoltagebatt2 < limitbatt2) {
    digitalWrite(batt1state, HIGH);
  } else if (fvoltagebatt2 >= limitbatt2) {
    digitalWrite(batt1state, LOW);
  }
  read_button_lcd();

  if (Main_Switch_Value == false) {
    digitalWrite(PL1, LOW);
    //------------------------------< Ultrasonic >-----------------------------------//
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    //-------------------< Short delay for ultrasonic >---------------------//
    delay(500);  //Delay Setengah Detik Pertama (Wajib Untuk ultrasonic)
    distance = duration / 58.2;

    read_button_lcd();

    //---------------------------< persentase tanki >-----------------------------//
    tair = int(map(distance, minimumRange, maximumRange, maximumPercent, minimumPercent));

    read_button_lcd();

    //------------------------------< DHT >-----------------------------------//
    temp = dht.readTemperature();
    humidity = dht.readHumidity();

    read_button_lcd();

    //-----------------------< DHT REMOVE NAN DISPLAY >---------------------------//
    if (isnan(temp)) {
      tempe = "-";
    } else {
      tempe = temp;
    }

    if (isnan(humidity)) {
      humidy = "-";
    } else {
      humidy = humidity;
    }

    read_button_lcd();
    //------------------------------< LDR >-----------------------------------//
    LDRdata = digitalRead(LDR);

    read_button_lcd();

    //------------------------------< Temp Soil >-----------------------------------//
    sensorphsoil.requestTemperatures();
    suhutanah = sensorphsoil.getTempCByIndex(0);

    read_button_lcd();
    //------------------------------< Temp Water >-----------------------------------//
    sensorphwater.requestTemperatures();
    suhuair = sensorphwater.getTempCByIndex(0);

    read_button_lcd();
    //------------------------------< Water pH >-----------------------------------//
    phwater_value = phwater_sensor.readPH(0, 25);
    //Serial.print("Nilai pH (Water): ");
    //Serial.println(phwater_value);

    read_button_lcd();
    //------------------------------< Soil pH >-----------------------------------//
    digitalWrite(DMSph, LOW);     // aktifkan DMS

    soilph_value = analogRead(soilph);

    read_button_lcd();

    // Setelah melakukan proses kalibrasi dan mendapatkan rumus kalibrasi,
    // ganti rumus regresi dengan nilai yang sudah didapat
    phsoil_value = (-0.0233 * soilph_value) + 12.698; // ganti dengan rumus regresi yang didapat
    if (phsoil_value != lastReading) {
      lastReading = phsoil_value;
    }

    read_button_lcd();
    //Serial.print("ADC=");
    //Serial.print(soilph_value);       // menampilkan nilai ADC di serial monitor pada baudrate 115200
    //Serial.print(" pH=");
    //Serial.println(lastReading, 1); // menampilkan nilai pH di serial monitor pada baudrate 115200

    digitalWrite(DMSph, HIGH);
    //------------------------------< Soil Moisture >-----------------------------------//
    SoilMdata = analogRead(soilsensor);
    kelembabanTanah = (100 - ((SoilMdata / 1023.00) * 100));

    read_button_lcd();

    //------------------------------< Anemo >-----------------------------------//

    read_button_lcd();
    //------------------------------< Fill Index Value >-----------------------------------//
    if (phwater_value > 6 && phwater_value < 8) {
      //Netral
      IndexWaterPh = "Netral";
    } else if (phwater_value < 6) {
      //Asam
      IndexWaterPh = "Asam";
    } else if (phwater_value > 8) {
      //Alkali
      IndexWaterPh = "Alkali";
    }
    read_button_lcd();

    if (lastReading > 6 && lastReading < 8) {
      //Netral
      IndexSoilPh = "Netral";
    } else if (lastReading < 6) {
      //Asam
      IndexSoilPh = "Asam";
    } else if (lastReading > 8) {
      //Alkali
      IndexSoilPh = "Alkali";
    }
    read_button_lcd();

    if (literPerjam < 8) {
      //No Flow
      IndexWaterFlow = "No Flow";
    } else if (literPerjam > 8 && literPerjam < 40) {
      //Idle
      IndexWaterFlow = "Idle Flow";
    } else if (literPerjam > 40) {
      //Active Flow
      IndexWaterFlow = "Active Flow";
    }
    read_button_lcd();

    if(kelembabanTanah > 0 && kelembabanTanah < 11){
      Str_kelembabanTanah = "Kering";
    } else if(kelembabanTanah > 11 && kelembabanTanah < 90){
      Str_kelembabanTanah = "Midle";
    } else if(kelembabanTanah > 90 && kelembabanTanah <= 100){
      Str_kelembabanTanah = "Basah";
    }
    read_button_lcd();

    if(LDRdata == 1){
      //Lampu hidup
      LDRState = "Hidup";
    } else {
      //Lampu mati
      LDRState = "Mati";
    }
    read_button_lcd();

    delay(500);  //Waktu Pembacaan pas 1 detik
      //Send String to Nodemcu
    Serial.println("*"+String(phwater_value)+","+IndexWaterPh+","+String(literPerjam)+","+IndexWaterFlow+","+String(suhuair)+","+String(lastReading)+","+IndexSoilPh+","+String(kelembabanTanah)+","+Str_kelembabanTanah+","+String(suhutanah)+","+tempe+","+humidy+","+String(AnemoValue)+","+Anemo_Index+","+String(LDRdata)+","+LDRState+","+String(distance)+","+String(tair)+","+String(maximumRange)+","+String(fvoltagesolar)+","+String(fvoltagebatt1)+","+String(fvoltagebatt2)+","+String(fvoltageSD)+","+voltAC+","+ampAC+","+powerAC+","+energyAC+","+freqAC+","+pfAC+","+BigPumpState+","+MiniPumpState+","+SelenoidState+","+LampState+","+PLNState+","+PLTSState+"#"); //inject wrapping
    lcd.clear();
  } else {
    //Pembacaan Sensor Mati (Selain Power Supply)
    digitalWrite(PL1, HIGH);
  }
}

void read_button_lcd() {
  valuebuttonlcd = digitalRead(buttonlcd);
  if (valuebuttonlcd == 0) {
    if (lcdposition == 5) {
      lcdposition = 1;
    } else {
      lcdposition = lcdposition + 1;
    }
  }
}

void startup_lcd() {
  lcd.setCursor(0, 0);
  lcd.print("Aqualifier");
  lcd.setCursor(0, 1);
  lcd.print("System");
  lcd.setCursor(0, 2);
  lcd.print("Taman");
  lcd.setCursor(0, 3);
  lcd.print("Otomatis");
  delay(1000);
  lcd.setCursor(0, 0);
  lcd.print("Dibuat Oleh");
  lcd.setCursor(0, 1);
  lcd.print("SMK SMTI YK");
  lcd.setCursor(0, 2);
  lcd.print("KIR x Robotic");
  lcd.setCursor(0, 3);
  lcd.print("With PemPli");
  delay(1000);
  lcd.clear();
}

void schema_lcd_1() {
  lcd.setCursor(0, 0);
  lcd.print("WaterpH: " + String(phwater_value));
  lcd.setCursor(0, 1);
  lcd.print("Index: " + IndexWaterPh);
  lcd.setCursor(0, 2);
  lcd.print("Flow: " + String(literPerjam));
  lcd.setCursor(0, 3);
  lcd.print("Index: " + IndexWaterFlow);
}

void schema_lcd_2() {
  lcd.setCursor(0, 0);
  lcd.print("  ---Temperature---");
  lcd.setCursor(0, 1);
  lcd.print("Water temp: " + String(suhuair) + "°C");
  lcd.setCursor(0, 2);
  lcd.print("Air temp: " + String(temp) + "°C");
  lcd.setCursor(0, 3);
  lcd.print("Soil Temp: " + String(suhutanah) + "°C");
}

void schema_lcd_3() {
  lcd.setCursor(0, 0);
  lcd.print("WaterpH: " + String(phwater_value));
  lcd.setCursor(0, 1);
  lcd.print("Index: " + IndexWaterPh);
  lcd.setCursor(0, 2);
  lcd.print("Flow: " + literPerjam);
  lcd.setCursor(0, 3);
  lcd.print("Index: " + IndexWaterFlow);
}

void schema_lcd_4() {
  lcd.setCursor(0, 0);
  lcd.print("WaterpH: " + String(phwater_value));
  lcd.setCursor(0, 1);
  lcd.print("Index: " + IndexWaterPh);
  lcd.setCursor(0, 2);
  lcd.print("Flow: " + literPerjam);
  lcd.setCursor(0, 3);
  lcd.print("Index: " + IndexWaterFlow);
}

void schema_lcd_5() {
  lcd.setCursor(0, 0);
  lcd.print("WaterpH: " + String(phwater_value));
  lcd.setCursor(0, 1);
  lcd.print("Index: " + IndexWaterPh);
  lcd.setCursor(0, 2);
  lcd.print("Flow: " + literPerjam);
  lcd.setCursor(0, 3);
  lcd.print("Index: " + IndexWaterFlow);
}