Cypress UI Testing - Proyecto de Automatización

Este repositorio contiene un conjunto de pruebas automatizadas para validar la funcionalidad 
de la página web https://automationexercise.com/ utilizando Cypress. Se ha implementado 
la arquitectura Page Object Model (POM) para mantener un diseño limpio, modular y escalable, 
facilitando el mantenimiento y la reutilización del código.
Las pruebas están enfocadas en validar distintos flujos críticos de la aplicación, como el 
inicio de sesión, el carrito de compras, la navegación entre productos, el contacto con soporte, entre otros.

## Estructura del proyecto

- `/e2e`
  Directorio de cypress por default que almacena las pruebas ralizadas, es usado para buscar todas las pruebas
  que existen para ejecutar cada una de ellas. 
  Además, contiene los objetos de página organizados por módulo (e.g., `cart`, `products`, `login`, etc.),
  aplicando el patrón de pruebas POM (Page Object Model).

- `/Page`  
  Contiene los objetos de página organizados por módulo (e.g., `cart`, `products`, `login`, etc.).

- `*.cy.js`  
  Archivos de pruebas (test cases) que interactúan con las clases de las páginas.

- `cypress.config.js`  
  Archivo de configuración general de Cypress.

- `fixtures/`  
  Datos estáticos reutilizables durante las pruebas.

- `support/`  
  Comandos personalizados y configuración global.

## Requisitos
- Node.js
- Cypress

## Cómo ejecutar las pruebas
1. Instala las dependencias:
   ```bash
   npm install