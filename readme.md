# Cypress QA Automation Project

Este proyecto consiste en la automatización de pruebas de calidad para el sitio web [Automation Exercise](https://automationexercise.com/), utilizando el framework [Cypress](https://www.cypress.io/).

Se desarrollaron distintos casos de prueba de extremo a extremo (E2E) para validar funcionalidades principales como: registro de usuarios, inicio de sesión, navegación entre páginas, suscripciones, carrito de compras y formularios de contacto.  
La automatización busca asegurar el correcto funcionamiento de la plataforma mediante simulaciones reales de comportamiento de usuario.

Este proyecto aplica conceptos de:
- Automatización de pruebas UI (User Interface)
- Validación de flujos de negocio críticos
- Manejo de eventos reales en navegador
- Carga y validación de archivos
- Testing de formularios web y carritos de compras
- Patrón de diseño POM

## 🎯 Objetivos

- Verificar la correcta funcionalidad de las principales características del sitio.
- Asegurar la estabilidad y confiabilidad ante cambios en la plataforma.
- Identificar posibles errores o inconsistencias en los flujos de usuario.
- Agilizar la validación manual mediante la ejecución automatizada de pruebas.
- Promover buenas prácticas de automatización de calidad en proyectos web.

## 📂 Estructura del Proyecto

cypress/
├── downloads/
├── e2e/
│   ├── Page/                  # Page Objects por módulo
│   ├── automation_exercise/    # Casos E2E sobre flujo general de la página
│   ├── cart/                   # Casos de carrito de compras
│   ├── contact/                # Casos de formulario de contacto
│   ├── page_testcases/         # Casos específicos por página
│   ├── products/               # Casos de productos
│   ├── suscription/            # Casos de suscripciones
│   ├── cart.cy.js
│   ├── contact_us.cy.js
│   ├── home_page.cy.js
│   ├── login.cy.js
│   ├── products.cy.js
│   ├── suscription.cy.js
│   ├── test_cases.cy.js
├── fixtures/                   # Datos estáticos (mocked data)
├── support/
│   ├── commands.js             # Comandos personalizados de Cypress
│   ├── e2e.js                  # Configuración global para las pruebas
cypress.config.js                # Configuración general de Cypress
package.json                     # Dependencias, scripts y configuración del proyecto

### ✅ Descripción  de carpetas:

- **downloads/**: Carpeta donde Cypress guarda archivos descargados durante la ejecución de pruebas (si aplica).
- **e2e/Page/**: Carpeta que contiene los **Page Objects**, organizados por funcionalidades (cart, contact, products, etc.), facilitando el mantenimiento de los tests.
- **e2e/** (nivel superior): Contiene los archivos de prueba `.cy.js` donde se escriben los distintos escenarios de prueba E2E.
- **fixtures/**: Archivos estáticos como datos de usuarios, productos o respuestas mockeadas, para ser usados en las pruebas.
- **support/**: Código de soporte como comandos personalizados (`commands.js`) o configuraciones globales (`e2e.js`) para Cypress.
- **cypress.config.js**: Archivo de configuración de Cypress donde se define, entre otras cosas, la `baseUrl`.
- **package.json**: Archivo que administra las dependencias, versiones y scripts del proyecto.


## 🚀 Tecnologías usadas

- [Cypress](https://docs.cypress.io/) v14.2.1
- [cypress-file-upload](https://github.com/abramenal/cypress-file-upload) v5.0.8
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) v1.14.0

## ⚙️ Configuración Principal

- **Base URL**: `https://automationexercise.com/`
- **Runner de Cypress**: Se usa `cypress open` para ejecutar las pruebas.

## 📜 Instalación

1. Clonar el repositorio:
   git clone https://github.com/rleyb/Cypress_QA.git
   cd Cypress_QA

2. Instalar dependencias:
    npm install

3. Ejecutar Cypress:
    npm run test
    Esto abrirá el Test Runner de Cypress

🧪 Scripts disponibles
npm run test: abre la interfaz gráfica de Cypress para ejecutar los tests manualmente.

🛠️ Requisitos Previos
Node.js instalado.

npm instalado (se incluye con Node.js).

---

## 📈 Futuras Expansiones

- Agregar pruebas de API RESTful para validar servicios backend de [Automation Exercise](https://automationexercise.com/).
- Organizar las pruebas API en una carpeta independiente (`cypress/e2e/api/`).
- Implementar validaciones de status code, body response, headers y tiempos de respuesta.
- Integrar ejecución conjunta de pruebas UI + API.
- Considerar la integración con pipelines de CI/CD para ejecución automática (opcional).

📄 Notas Adicionales
Las pruebas están organizadas por páginas (Page) y casos de prueba (page_testcases).

Se utiliza cypress-file-upload para la carga de archivos en pruebas específicas.

Se utilizan eventos reales de usuario (cypress-real-events) para interacciones más realistas.

📬 Contacto
Para reportar errores o solicitar nuevas características, por favor utiliza Issues.

🚀 ¡Gracias por visitar este proyecto!

