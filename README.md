# Taski - Gestión de Tareas Híbrida 🚀

**Taski** es una aplicación móvil desarrollada con **Ionic y Angular**, diseñada para demostrar habilidades en arquitectura de software, integración de servicios en la nube (Firebase) y optimización de rendimiento en dispositivos móviles.


## 🛠️ Tecnologías Utilizadas
*   **Framework:** Ionic 8 con Angular 20.
*   **Wrapper Nativo:** Cordova para despliegue híbrido.
*   **Backend:** Firebase Remote Config para gestión de Feature Flags y Firebase para la base de datos.
*   **Estado:** Programación reactiva con RxJS.
*   **Arquitectura:** Organización por capas (Core, Features, Shared) y patrón MVVM.

---

## ✨ Funcionalidades Implementadas
*   **Gestión de Tareas:** Permite agregar,editar , marcar como completadas y eliminar tareas de forma eficiente.
*   **Categorización Personalizada:** Creación, edición y eliminación de categorías.
*   **Filtrado Inteligente:** Capacidad de filtrar la lista de tareas según la categoría asignada realizando una busqueda con el nombre.
*   **Feature Flag (Firebase):** Control remoto de la funcionalidad de edición mediante el parámetro `task_edit_enabled` en Firebase.
*   **Firestore (Firebase):** Uso de firestore para almacenar las categorias y tareas creadas.

---

## 🚀 Instalación y Compilación
Siga estos pasos para preparar el entorno y generar el build de Android:

### 1. Prerrequisitos
*   Node.js (Versión LTS). Recomendada la versión 22.12.0
*   Angular CLI (`npm install -g @angular/cli`). Recomendada la versión 22.0.0
*   Ionic CLI (`npm install -g @ionic/cli`). Recomendada la versión 7.2.1
*   Cordova CLI (`npm install -g cordova`). Recomendada la versión 13.0.0
*   Java JDK 17 y Android SDK configurado.

### 2. Configuración Inicial
```bash
# Instalar dependencias del proyecto
npm install
```

### 3. Compilación para Android
```bash
# Agregar la plataforma Android
ionic cordova platform add android

# Generar el archivo APK
ionic cordova build android
```
Una vez termine el proceso se visualizara la url donde se genero el archivo APK

### 4. Compilación para IOS

Para su finalizacióon se debe realizar en un Mac y contar con una developer para finalizar el proceso
```bash
# Agregar la plataforma IOS
ionic cordova platform add ios

# Generar el archivo IPA
ionic cordova build ios
```
1. Cuando finalice correctamente se debe terminar el proceso en Xcode
2. Abre el archivo platforms/ios/App.xcworkspace en Xcode.
3. En la barra superior, selecciona Any iOS Device (arm64) como destino (no selecciones un simulador).
4. Ve al menú Product > Archive.
5. Espera a que termine. Se abrirá la ventana "Organizer".
6. Haz clic en el botón azul Distribute App.
7. Seleccione la opción de Custom.
8. Seleccione la opción de Ad Hoc.
9. te pedira firma la app y luego de de te dara la opcion de "export"


