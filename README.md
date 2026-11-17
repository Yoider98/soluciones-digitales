# 🚀 Showcase de Soluciones Web & Demos para Negocios

Plataforma comercial y catálogo interactivo de aplicaciones web y sitios completos para emprendimientos y negocios locales (barberías, estéticas, tiendas de ropa, restaurantes y comidas rápidas).

Desarrollado por **Yoider Yancy** &bull; WhatsApp Comercial: [+57 314 439 9660](https://wa.me/573144399660).

---

## 📱 Demos Disponibles (Sitio Web + Módulo Funcional)

Cada demo cuenta con una arquitectura de dos niveles:
1. **Página Web Oficial del Negocio (`index.html`)**: Presentación comercial, identidad de marca, promociones, testimonios y ubicación.
2. **Aplicación Web Interactiva**: Módulo de conversión conectado directamente a WhatsApp.

---

### 1. 📅 Élite Studio - Web & Citas Online
- **Ubicación:** `demos/citas/`
- **Público:** Barberías, spas, estéticas, consultorios médicos/odontológicos, veterinarias.
- **Páginas:**
  - `index.html`: Landing page con catálogo de cortes, paquetes VIP y opiniones.
  - `agendar.html`: Selector de profesional, calendario dinámico de turnos y confirmación de reserva a WhatsApp.

---

### 2. 🛍️ Aura Studio - Tienda de Moda & Carrito a WhatsApp
- **Ubicación:** `demos/catalogo/`
- **Público:** Tiendas de ropa urbana, calzado, accesorios, repostería o boutiques.
- **Páginas:**
  - `index.html`: Web comercial con colecciones destacadas, beneficios de entrega y testimonios.
  - `tienda.html`: Catálogo con buscador en vivo, selector de tallas/variantes, carrito interactivo y resumen de comanda a WhatsApp con cálculo de envío.

---

### 3. 🍔 Fuego & Leña - Web de Restaurante & Menú QR
- **Ubicación:** `demos/restaurante/`
- **Público:** Restaurantes, hamburgueserías, pizzerías, asadores y cafeterías.
- **Páginas:**
  - `index.html`: Web del restaurante con especialidades del chef, experiencia al carbón y reservas.
  - `menu.html`: Menú QR digital con selector de **Mesa** o **Domicilio**, selección de adiciones (tocineta, quesos, salsas), bandeja flotante y comanda directa a cocina por WhatsApp.

---

## 📂 Estructura del Proyecto

```text
negocios-web-demos/
├── index.html                  # Showroom / Vitrina general de soluciones
├── assets/
│   └── css/
│       └── main.css            # Estilos del Showroom principal
├── demos/
│   ├── citas/                  # Demo 1: Barbería/Spa & Citas Online
│   │   ├── index.html          # Web del negocio
│   │   ├── agendar.html        # App de agendamiento
│   │   ├── css/
│   │   └── js/
│   ├── catalogo/               # Demo 2: Tienda & Carrito a WhatsApp
│   │   ├── index.html          # Web comercial de moda
│   │   ├── tienda.html         # Catálogo interactivo con carrito
│   │   ├── css/
│   │   └── js/
│   └── restaurante/            # Demo 3: Restaurante & Menú QR
│       ├── index.html          # Web oficial del restaurante
│       ├── menu.html           # Menú QR y comanda
│       ├── css/
│       └── js/
└── README.md
```

---

## 🌐 Publicación en GitHub Pages

Para publicar y compartir este catálogo con clientes:

```bash
git add .
git commit -m "feat: complete suite with booking, catalog and restaurant demos"
git push origin main
```

En tu repositorio de GitHub:
1. Ve a **Settings** > **Pages**.
2. En **Source** selecciona `Deploy from a branch`.
3. Selecciona la rama `main` y `/ (root)`.
4. Haz clic en **Save**.

¡Quedará activo en: `https://yoider98.github.io/negocios-web-demos/`!
