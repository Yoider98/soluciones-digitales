# 🚀 Showcase de Soluciones Web & Demos para Negocios

Plataforma comercial y catálogo interactivo de aplicaciones web ligeras, orientadas a emprendimientos y negocios locales (barberías, estéticas, consultorios, tiendas, restaurantes).

Desarrollado por **Yoider Yancy** &bull; WhatsApp Comercial: [+57 314 439 9660](https://wa.me/573144399660).

---

## 📱 Demos Disponibles

### 1. 📅 CitaFácil - Agendamiento de Citas Online
- **Ubicación:** `demos/citas/`
- **Público:** Barberías, salones de belleza, spas, consultorios médicos/odontológicos, veterinarias.
- **Funcionalidades:**
  - Selector rápido de nicho (Barbería, Spa, Consultorio, Pet Shop).
  - Flujo guiado en 3 pasos: Servicio -> Especialista y Horario -> Datos del cliente.
  - Generador automático de mensaje estructurado a **WhatsApp** para confirmación inmediata sin pasarelas de pago.
  - Diseño 100% responsivo y adaptado para celulares.

---

## 📂 Estructura del Proyecto

```text
negocios-web-demos/
├── index.html                  # Vitrina comercial principal (Showroom)
├── assets/
│   └── css/
│       └── main.css            # Estilos del Showroom principal
├── demos/
│   └── citas/                  # Demo interactiva de Citas
│       ├── index.html
│       ├── css/style.css
│       └── js/app.js
└── README.md
```

---

## 🌐 Publicación en GitHub Pages

Para publicar este proyecto y tener tus demos funcionando en vivo con enlace público:

1. Inicializa el repositorio Git:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit with showcase and appointment booking demo"
   ```

2. Vincula tu repositorio remoto en GitHub:
   ```bash
   git remote add origin https://github.com/Yoider98/negocios-web-demos.git
   git branch -M main
   git push -u origin main
   ```

3. En GitHub:
   - Ve a **Settings** > **Pages**.
   - En **Build and deployment** > **Source**, selecciona `Deploy from a branch`.
   - Elige la rama `main` y la carpeta `/ (root)`.
   - Haz clic en **Save**.

¡Tu catálogo quedará disponible en `https://yoider98.github.io/negocios-web-demos/`!
