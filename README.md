# Bitácora de Mantenimiento Vehicular

Proyecto de la Entrega 1 — Calidad y Pruebas de Software.
Registro y control de mantenimiento de vehículos (kilometraje, categoría de servicio y
estado de alerta), con una suite de pruebas unitarias y análisis estático dockerizados.

## Estructura

```
├── src/
│   ├── index.html      # Aplicación (UI, un solo archivo, localStorage)
│   └── logic.js        # Lógica de negocio (compartida con las pruebas)
├── tests/
│   └── logic.test.js   # Pruebas unitarias (Jest)
├── docker-compose.yml  # Servicios: sonarqube + unit-tests
├── Dockerfile           # Imagen para correr `npm test`
├── sonar-project.properties
└── package.json
```

## Ejecutar la aplicación

Abrir `src/index.html` directamente en el navegador. No requiere servidor ni instalación.

## Ejecutar las pruebas unitarias (Docker)

```bash
docker-compose build unit-tests
docker-compose run --rm unit-tests
```

Localmente, sin Docker:

```bash
npm install
npm test
```

## Ejecutar el análisis estático con SonarQube

```bash
docker-compose up -d sonarqube
# Esperar a que quede disponible en http://localhost:9000 (usuario/clave por defecto: admin/admin)
```

Luego escanear el código con el SonarScanner CLI (o el plugin de tu IDE), apuntando a
`sonar-project.properties`, y capturar el pantallazo del Quality Gate para el informe.

## Reglas de negocio implementadas

- El kilometraje próximo de mantenimiento debe ser mayor al kilometraje actual.
- Si faltan menos de 500 km para el servicio, el vehículo pasa a estado "Alerta Urgente".
- No se permite guardar un mantenimiento sin seleccionar la categoría del servicio.

## Nota

Esta aplicación fue generada como parte de la actividad e incluye defectos de calidad
introducidos deliberadamente, a detectar mediante las listas de chequeo, el análisis
estático y las pruebas unitarias (ver el informe PDF de la entrega).
