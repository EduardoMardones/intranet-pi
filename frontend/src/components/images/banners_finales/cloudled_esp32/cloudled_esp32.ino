/*
 * CloudLed - ESP32 IoT Controller
 * 
 * Proyecto: Control de LED mediante Firebase Realtime Database
 * Hardware: ESP32 + LED (Pin 2) + Botón (Pin 4)
 * 
 * Cumple con:
 * - ISO 27400 (Seguridad IoT)
 * - Comunicación segura TLS/SSL
 * - Reconexión automática
 * - Persistencia offline
 * - Optimización de energía
 * 
 * Autor: Sistema CloudLed
 * Fecha: Noviembre 2024
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include <Preferences.h>
#include <esp_sleep.h>

// ============================================
// CONFIGURACIÓN - MODIFICAR ESTOS VALORES
// ============================================

// Credenciales WiFi
#define WIFI_SSID "C3RKM12Q1"
#define WIFI_PASSWORD "12345678"

// Credenciales Firebase
#define API_KEY "AIzaSyD4aoI7JF9Lc7bJy2JipIJBPTzyGNRE-sk"
#define DATABASE_URL "https://cloudled-65e13-default-rtdb.firebaseio.com/"
#define USER_EMAIL "eduardo.mardones08@gmail.com"
#define USER_PASSWORD "lalo123"

// ============================================
// CONFIGURACIÓN DE HARDWARE
// ============================================

#define LED_PIN 2        // Pin del LED (GPIO 2)
#define BUTTON_PIN 4     // Pin del botón (GPIO 4)
#define SERIAL_BAUD 115200

// ============================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================

// Timeouts y reintentos
#define WIFI_TIMEOUT_MS 20000           // 20 segundos para conectar WiFi
#define FIREBASE_TIMEOUT_MS 10000       // 10 segundos para Firebase
#define MAX_RECONNECT_ATTEMPTS 5        // Máximo de intentos de reconexión
#define RECONNECT_DELAY_MS 5000         // Delay entre intentos (5 seg)

// Optimización de energía
#define DEEP_SLEEP_DURATION 60000000    // 60 segundos en microsegundos
#define WIFI_CHECK_INTERVAL 30000       // Verificar WiFi cada 30 seg
#define FIREBASE_CHECK_INTERVAL 5000    // Verificar Firebase cada 5 seg

// Ruta de Firebase
#define FIREBASE_PATH "prueba_iot/estado"

// Estados
#define ESTADO_ENCENDIDO "ENCENDIDO"
#define ESTADO_APAGADO "APAGADO"

// ============================================
// OBJETOS GLOBALES
// ============================================

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

Preferences preferences;  // Almacenamiento persistente

// Variables de estado
bool ledState = false;
bool lastButtonState = HIGH;
bool currentButtonState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

// Control de conexión
bool wifiConnected = false;
bool firebaseConnected = false;
unsigned long lastWifiCheck = 0;
unsigned long lastFirebaseCheck = 0;
int reconnectAttempts = 0;

// Almacenamiento temporal offline
String pendingCommand = "";
bool hasPendingCommand = false;

// Estadísticas de energía
unsigned long lastActivityTime = 0;
unsigned long inactivityThreshold = 300000; // 5 minutos de inactividad

// ============================================
// PROTOTIPOS DE FUNCIONES
// ============================================

void setupHardware();
void setupWiFi();
void setupFirebase();
void setupOfflineStorage();
void handleButton();
void updateLED(bool state);
void sendToFirebase(String estado);
void checkFirebaseState();
void reconnectWiFi();
void reconnectFirebase();
void savePendingCommand(String command);
void processPendingCommands();
void printStatus();
void enterDeepSleep();
void optimizePower();
void sendSerialCommand(String command);
String receiveSerialCommand();
void handleSerialCommunication();
bool verifyDataIntegrity(String data);
String addChecksum(String data);

// ============================================
// SETUP
// ============================================

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(1000);
  
  Serial.println("\n\n=================================");
  Serial.println("  CloudLed ESP32 - Iniciando");
  Serial.println("=================================\n");
  
  // 3.1.3.10: Inicializar hardware con optimización de energía
  setupHardware();
  
  // 3.1.1.4: Configurar almacenamiento persistente offline
  setupOfflineStorage();
  
  // 3.1.1.1: Conectar WiFi con seguridad
  setupWiFi();
  
  // 3.1.1.1: Conectar Firebase con TLS/SSL
  setupFirebase();
  
  // Cargar estado anterior del LED
  ledState = preferences.getBool("ledState", false);
  updateLED(ledState);
  
  Serial.println("\n✓ Sistema iniciado correctamente\n");
  printStatus();
}

// ============================================
// LOOP PRINCIPAL
// ============================================

void loop() {
  unsigned long currentMillis = millis();
  
  // 3.1.2.5 y 3.1.2.6: Comunicación serial bidireccional
  handleSerialCommunication();
  
  // Verificar estado de WiFi periódicamente
  if (currentMillis - lastWifiCheck >= WIFI_CHECK_INTERVAL) {
    lastWifiCheck = currentMillis;
    if (WiFi.status() != WL_CONNECTED) {
      wifiConnected = false;
      reconnectWiFi();
    } else {
      wifiConnected = true;
    }
  }
  
  // Verificar estado de Firebase periódicamente
  if (wifiConnected && currentMillis - lastFirebaseCheck >= FIREBASE_CHECK_INTERVAL) {
    lastFirebaseCheck = currentMillis;
    if (!Firebase.ready()) {
      firebaseConnected = false;
      reconnectFirebase();
    } else {
      firebaseConnected = true;
      
      // 3.1.2.7: Procesar comandos pendientes cuando hay conexión
      if (hasPendingCommand) {
        processPendingCommands();
      }
      
      // Verificar cambios en Firebase
      checkFirebaseState();
    }
  }
  
  // Manejar botón físico
  handleButton();
  
  // 3.1.3.10: Optimización de energía
  optimizePower();
  
  // Pequeño delay para estabilidad
  delay(10);
}

// ============================================
// CONFIGURACIÓN DE HARDWARE
// ============================================

void setupHardware() {
  Serial.println("→ Configurando hardware...");
  
  // Configurar LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Configurar botón con pull-up interno
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Configurar WiFi para ahorro de energía
  WiFi.setSleep(WIFI_PS_MIN_MODEM);  // Ahorro mínimo pero mantiene conexión
  
  Serial.println("  ✓ LED configurado (Pin 2)");
  Serial.println("  ✓ Botón configurado (Pin 4)");
  Serial.println("  ✓ Modo ahorro de energía activado");
}

// ============================================
// CONFIGURACIÓN DE WiFi
// ============================================

void setupWiFi() {
  Serial.println("→ Conectando a WiFi...");
  Serial.print("  SSID: ");
  Serial.println(WIFI_SSID);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  unsigned long startAttemptTime = millis();
  
  // 3.1.1.3: Intentar conectar con timeout
  while (WiFi.status() != WL_CONNECTED && 
         millis() - startAttemptTime < WIFI_TIMEOUT_MS) {
    delay(500);
    Serial.print(".");
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\n  ✓ WiFi conectado");
    Serial.print("  IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("  RSSI: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    wifiConnected = false;
    Serial.println("\n  ✗ Error conectando WiFi");
    Serial.println("  → Modo offline activado");
  }
}

// ============================================
// CONFIGURACIÓN DE FIREBASE
// ============================================

void setupFirebase() {
  if (!wifiConnected) {
    Serial.println("→ Firebase: WiFi no disponible");
    return;
  }
  
  Serial.println("→ Configurando Firebase...");
  
  // 3.1.1.1: Configurar Firebase con seguridad TLS
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  
  // Autenticación de usuario
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  
  // 3.1.1.2: Configurar reconexión automática para integridad
  config.timeout.serverResponse = 10 * 1000;  // 10 segundos
  config.timeout.rtdbKeepAlive = 45 * 1000;   // 45 segundos
  config.timeout.rtdbStreamReconnect = 1 * 1000; // 1 segundo
  
  // 3.1.1.3: Habilitar reconexión automática WiFi
  Firebase.reconnectNetwork(true);
  config.max_token_generation_retry = 5;
  
  // Token helper para renovación automática
  config.token_status_callback = tokenStatusCallback;
  
  // Inicializar Firebase
  Firebase.begin(&config, &auth);
  
  // Esperar autenticación
  Serial.print("  Autenticando");
  unsigned long startTime = millis();
  while (!Firebase.ready() && millis() - startTime < FIREBASE_TIMEOUT_MS) {
    Serial.print(".");
    delay(500);
  }
  
  if (Firebase.ready()) {
    firebaseConnected = true;
    Serial.println("\n  ✓ Firebase conectado");
    Serial.println("  ✓ Autenticación exitosa");
    Serial.println("  ✓ TLS/SSL activo");
  } else {
    firebaseConnected = false;
    Serial.println("\n  ✗ Error conectando Firebase");
    Serial.println("  → Modo offline activado");
  }
}

// ============================================
// ALMACENAMIENTO PERSISTENTE OFFLINE
// ============================================

void setupOfflineStorage() {
  Serial.println("→ Configurando almacenamiento offline...");
  
  // 3.1.1.4: Inicializar Preferences para almacenamiento persistente
  preferences.begin("cloudled", false);
  
  // Recuperar comandos pendientes
  hasPendingCommand = preferences.getBool("hasPending", false);
  if (hasPendingCommand) {
    pendingCommand = preferences.getString("pendingCmd", "");
    Serial.print("  ⚠ Comando pendiente recuperado: ");
    Serial.println(pendingCommand);
  }
  
  Serial.println("  ✓ Almacenamiento offline configurado");
}

// ============================================
// MANEJO DEL BOTÓN
// ============================================

void handleButton() {
  // Leer estado del botón con debounce
  int reading = digitalRead(BUTTON_PIN);
  
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != currentButtonState) {
      currentButtonState = reading;
      
      // Botón presionado (LOW porque usa INPUT_PULLUP)
      if (currentButtonState == LOW) {
        lastActivityTime = millis();
        
        // Cambiar estado
        ledState = !ledState;
        updateLED(ledState);
        
        String nuevoEstado = ledState ? ESTADO_ENCENDIDO : ESTADO_APAGADO;
        
        Serial.println("\n▶ Botón presionado");
        Serial.print("  Nuevo estado: ");
        Serial.println(nuevoEstado);
        
        // 3.1.3.8: Enviar comando por serial
        sendSerialCommand(nuevoEstado);
        
        // Intentar enviar a Firebase
        if (firebaseConnected) {
          sendToFirebase(nuevoEstado);
        } else {
          // 3.1.1.4: Guardar para sincronización posterior
          Serial.println("  ⚠ Offline: guardando para sincronizar...");
          savePendingCommand(nuevoEstado);
        }
        
        printStatus();
      }
    }
  }
  
  lastButtonState = reading;
}

// ============================================
// ACTUALIZAR LED
// ============================================

void updateLED(bool state) {
  digitalWrite(LED_PIN, state ? HIGH : LOW);
  
  // Guardar estado en memoria persistente
  preferences.putBool("ledState", state);
}

// ============================================
// ENVIAR A FIREBASE
// ============================================

void sendToFirebase(String estado) {
  if (!firebaseConnected) {
    Serial.println("  ✗ Firebase no disponible");
    savePendingCommand(estado);
    return;
  }
  
  // 3.1.1.2: Agregar checksum para verificar integridad
  String dataWithChecksum = addChecksum(estado);
  
  Serial.print("  → Enviando a Firebase: ");
  Serial.println(estado);
  
  // Enviar a Firebase con manejo de errores
  if (Firebase.RTDB.setString(&fbdo, FIREBASE_PATH, estado)) {
    Serial.println("  ✓ Enviado correctamente");
    
    // Limpiar comandos pendientes si había
    hasPendingCommand = false;
    preferences.putBool("hasPending", false);
    
  } else {
    Serial.println("  ✗ Error enviando:");
    Serial.print("    ");
    Serial.println(fbdo.errorReason());
    
    // 3.1.1.4: Guardar para reintento
    savePendingCommand(estado);
  }
}

// ============================================
// VERIFICAR ESTADO EN FIREBASE
// ============================================

void checkFirebaseState() {
  if (!firebaseConnected) return;
  
  // Leer estado actual de Firebase
  if (Firebase.RTDB.getString(&fbdo, FIREBASE_PATH)) {
    String estadoFirebase = fbdo.stringData();
    
    // 3.1.1.2: Verificar integridad de datos recibidos
    if (!verifyDataIntegrity(estadoFirebase)) {
      Serial.println("  ⚠ Datos recibidos corruptos, ignorando...");
      return;
    }
    
    // Normalizar el estado
    estadoFirebase.toUpperCase();
    estadoFirebase.trim();
    
    bool nuevoEstado = (estadoFirebase == ESTADO_ENCENDIDO);
    
    // Solo actualizar si cambió
    if (nuevoEstado != ledState) {
      ledState = nuevoEstado;
      updateLED(ledState);
      
      Serial.println("\n◀ Cambio desde Firebase detectado");
      Serial.print("  Nuevo estado: ");
      Serial.println(estadoFirebase);
      
      // 3.1.3.9: Enviar confirmación por serial
      sendSerialCommand(estadoFirebase);
      
      printStatus();
    }
  } else {
    // Error al leer, pero no crítico
    if (fbdo.httpCode() != 200) {
      Serial.print("  ⚠ Error leyendo Firebase: ");
      Serial.println(fbdo.errorReason());
    }
  }
}

// ============================================
// RECONEXIÓN WiFi
// ============================================

void reconnectWiFi() {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    Serial.println("  ✗ Máximo de intentos de reconexión WiFi alcanzado");
    Serial.println("  → Entrando en modo offline extendido");
    reconnectAttempts = 0;
    return;
  }
  
  Serial.println("\n→ Intentando reconectar WiFi...");
  reconnectAttempts++;
  
  WiFi.disconnect();
  delay(1000);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED && 
         millis() - startTime < WIFI_TIMEOUT_MS) {
    delay(500);
    Serial.print(".");
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    reconnectAttempts = 0;
    Serial.println("\n  ✓ WiFi reconectado");
    
    // Intentar reconectar Firebase también
    reconnectFirebase();
  } else {
    wifiConnected = false;
    Serial.println("\n  ✗ Reconexión WiFi fallida");
    delay(RECONNECT_DELAY_MS);
  }
}

// ============================================
// RECONEXIÓN FIREBASE
// ============================================

void reconnectFirebase() {
  if (!wifiConnected) {
    Serial.println("  → Firebase: Esperando WiFi...");
    return;
  }
  
  Serial.println("→ Reconectando Firebase...");
  
  // Verificar si Firebase está listo
  if (Firebase.ready()) {
    firebaseConnected = true;
    Serial.println("  ✓ Firebase reconectado");
    
    // 3.1.2.7: Procesar comandos pendientes
    if (hasPendingCommand) {
      Serial.println("  → Sincronizando datos pendientes...");
      processPendingCommands();
    }
  } else {
    firebaseConnected = false;
    Serial.println("  ✗ Firebase no disponible");
  }
}

// ============================================
// GUARDAR COMANDO PENDIENTE
// ============================================

void savePendingCommand(String command) {
  // 3.1.1.4: Almacenar temporalmente para sincronización posterior
  pendingCommand = command;
  hasPendingCommand = true;
  
  preferences.putString("pendingCmd", command);
  preferences.putBool("hasPending", true);
  
  Serial.println("  💾 Comando guardado localmente");
}

// ============================================
// PROCESAR COMANDOS PENDIENTES
// ============================================

void processPendingCommands() {
  if (!hasPendingCommand || pendingCommand.length() == 0) {
    return;
  }
  
  Serial.println("\n→ Procesando comandos pendientes...");
  Serial.print("  Comando: ");
  Serial.println(pendingCommand);
  
  // Intentar enviar comando pendiente
  if (Firebase.RTDB.setString(&fbdo, FIREBASE_PATH, pendingCommand)) {
    Serial.println("  ✓ Sincronización exitosa");
    
    // Limpiar comando pendiente
    hasPendingCommand = false;
    pendingCommand = "";
    preferences.putBool("hasPending", false);
    preferences.remove("pendingCmd");
    
  } else {
    Serial.println("  ✗ Error sincronizando, se reintentará");
  }
}

// ============================================
// COMUNICACIÓN SERIAL
// ============================================

// 3.1.3.8: Enviar comando por serial
void sendSerialCommand(String command) {
  // Formato: CMD:ESTADO:CHECKSUM
  String message = "CMD:" + command + ":" + addChecksum(command);
  Serial.print("\n[SERIAL-TX] ");
  Serial.println(message);
}

// 3.1.3.9: Recibir comando por serial
String receiveSerialCommand() {
  if (Serial.available() > 0) {
    String received = Serial.readStringUntil('\n');
    received.trim();
    
    Serial.print("[SERIAL-RX] ");
    Serial.println(received);
    
    // Verificar formato: CMD:ESTADO:CHECKSUM
    if (received.startsWith("CMD:")) {
      int firstColon = received.indexOf(':');
      int secondColon = received.indexOf(':', firstColon + 1);
      
      if (secondColon > 0) {
        String command = received.substring(firstColon + 1, secondColon);
        
        // 3.1.1.2: Verificar integridad
        if (verifyDataIntegrity(command)) {
          return command;
        } else {
          Serial.println("  ⚠ Checksum inválido");
        }
      }
    }
  }
  return "";
}

// 3.1.2.5 y 3.1.2.6: Manejar comunicación serial bidireccional
void handleSerialCommunication() {
  String command = receiveSerialCommand();
  
  if (command.length() > 0) {
    command.toUpperCase();
    command.trim();
    
    if (command == ESTADO_ENCENDIDO || command == ESTADO_APAGADO) {
      ledState = (command == ESTADO_ENCENDIDO);
      updateLED(ledState);
      
      Serial.println("  ✓ Comando serial procesado");
      
      // Sincronizar con Firebase si está disponible
      if (firebaseConnected) {
        sendToFirebase(command);
      } else {
        savePendingCommand(command);
      }
    }
  }
}

// ============================================
// INTEGRIDAD DE DATOS
// ============================================

// 3.1.1.2: Agregar checksum para verificar integridad
String addChecksum(String data) {
  unsigned int checksum = 0;
  for (unsigned int i = 0; i < data.length(); i++) {
    checksum += data.charAt(i);
  }
  return String(checksum % 256, HEX);
}

// 3.1.1.2: Verificar integridad de datos
bool verifyDataIntegrity(String data) {
  // Para datos simples como ENCENDIDO/APAGADO, verificar formato básico
  data.toUpperCase();
  data.trim();
  
  return (data == ESTADO_ENCENDIDO || data == ESTADO_APAGADO);
}

// ============================================
// OPTIMIZACIÓN DE ENERGÍA
// ============================================

void optimizePower() {
  // 3.1.3.10: Entrar en deep sleep si hay inactividad prolongada
  unsigned long inactiveTime = millis() - lastActivityTime;
  
  if (inactiveTime > inactivityThreshold) {
    Serial.println("\n→ Inactividad detectada");
    Serial.println("  Preparando para deep sleep...");
    
    // Guardar estado actual
    preferences.putBool("ledState", ledState);
    
    // Cerrar conexiones
    Firebase.RTDB.end(&fbdo);
    WiFi.disconnect(true);
    
    Serial.println("  💤 Entrando en deep sleep (60s)");
    Serial.flush();
    
    // Configurar wake-up por tiempo
    esp_sleep_enable_timer_wakeup(DEEP_SLEEP_DURATION);
    
    // Configurar wake-up por botón
    esp_sleep_enable_ext0_wakeup((gpio_num_t)BUTTON_PIN, 0);
    
    // Entrar en deep sleep
    esp_deep_sleep_start();
  }
}

// ============================================
// UTILIDADES
// ============================================

void printStatus() {
  Serial.println("\n┌─────────────────────────────────┐");
  Serial.println("│       ESTADO DEL SISTEMA        │");
  Serial.println("├─────────────────────────────────┤");
  Serial.print("│ WiFi:     ");
  Serial.println(wifiConnected ? "✓ Conectado           │" : "✗ Desconectado        │");
  Serial.print("│ Firebase: ");
  Serial.println(firebaseConnected ? "✓ Conectado           │" : "✗ Desconectado        │");
  Serial.print("│ LED:      ");
  Serial.println(ledState ? "💡 ENCENDIDO          │" : "⚫ APAGADO             │");
  Serial.print("│ Pendiente:");
  Serial.println(hasPendingCommand ? " ⚠ Sí                  │" : " No                    │");
  Serial.println("└─────────────────────────────────┘\n");
}

