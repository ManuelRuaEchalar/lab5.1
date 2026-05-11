# Informe del Laboratorio 5.1: Workflow de GitHub Actions para CI

## Descripción del Proyecto y Pipeline Configurado

En esta práctica, se ha desarrollado una API RESTful sencilla utilizando **Express.js**, implementando un CRUD para la entidad `User`. Se incluyeron pruebas unitarias y de integración utilizando `Jest` y `Supertest` para garantizar que todas las rutas funcionen según lo esperado y tengan buena cobertura. Además, se ha configurado `ESLint` para el análisis estático de código.

El pipeline configurado en GitHub Actions (`.github/workflows/ci.yml`) consta de los siguientes pasos automatizados que se disparan en los eventos de `push` y `pull_request` a la rama `main`:
1. **Checkout del código:** Utiliza `actions/checkout` para descargar el repositorio.
2. **Setup de Node.js:** Se establece la versión de Node.js en la 20.x usando `actions/setup-node`.
3. **Instalación de dependencias:** Se ejecuta `npm ci` para instalar exactamente las versiones del `package-lock.json`.
4. **Análisis estático (Linting):** Ejecuta `npm run lint` para validar la sintaxis y estilo del código con ESLint.
5. **Ejecución de pruebas y cobertura:** Corre la suite de tests unitarios y de integración generando un reporte de cobertura mediante `npm test` (que ejecuta `jest --coverage`).

## Capturas de Pantalla y Evidencias

A continuación se deberán agregar las capturas de pantalla solicitadas para comprobar la correcta ejecución:

### 1. Historial de Ejecuciones en Actions
*(Inserta aquí la captura de pantalla de la pestaña Actions listando las ejecuciones)*

![Historial de ejecuciones]()

### 2. Detalle de Workflow Exitoso con Cobertura
*(Inserta aquí la captura del log de GitHub Actions mostrando que las pruebas y la cobertura pasaron correctamente)*

![Workflow Exitoso]()

### 3. Detalle de un Workflow Fallido
*(Inserta aquí la captura de cuando el workflow falló tras forzar un error, por ejemplo, rompiendo una regla de lint o de testing)*

![Workflow Fallido]()

### 4. Configuración de Protección de Rama
*(Inserta aquí la captura de la pantalla de configuración de la regla "Require status checks to pass before merging" en la rama main)*

![Protección de Rama]()

## Conclusión

La configuración de Integración Continua (CI) resulta de suma importancia porque nos permite tener la certeza de que el código que estamos a punto de integrar a nuestra rama principal (main) cumple con los estándares mínimos de calidad (pasando el linting) y que ninguna nueva característica rompe el funcionamiento existente (pasando los tests). Al vincular CI a las "Branch protection rules", evitamos introducir defectos críticos a producción de manera accidental.
