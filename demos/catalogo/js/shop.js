/**
 * Aura Studio - Catálogo Online con Pedido a WhatsApp
 * Demo comercial desarrollada por Yoider Yancy
 */

const WHATSAPP_PHONE = "573144399660";
const SHIPPING_COST = 10000;
const FREE_SHIPPING_THRESHOLD = 150000;

// Catálogo de Productos
const PRODUCTS = [
  {
    id: "p1",
    name: "Hoodie Oversize Essential Black",
    category: "hoodies",
    price: 110000,
    oldPrice: 135000,
    tag: "MÁS VENDIDO",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p2",
    name: "Hoodie Vintage Acid Wash Grey",
    category: "hoodies",
    price: 125000,
    oldPrice: 145000,
    tag: "NUEVO",
    sizes: ["M", "L", "XL"],
    selectedSize: "L",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p3",
    name: "Camiseta Boxy Fit Heavyweight White",
    category: "camisetas",
    price: 65000,
    oldPrice: 75000,
    tag: null,
    sizes: ["S", "M", "L"],
    selectedSize: "M",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p4",
    name: "Camiseta Graphic Anime Cyberpunk",
    category: "camisetas",
    price: 70000,
    oldPrice: 85000,
    tag: "EDICIÓN LIMITADA",
    sizes: ["M", "L", "XL"],
    selectedSize: "L",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p5",
    name: "Sneakers Retro Low Court Red",
    category: "sneakers",
    price: 210000,
    oldPrice: 245000,
    tag: "TENDENCIA",
    sizes: ["38", "39", "40", "41", "42"],
    selectedSize: "40",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p6",
    name: "Sneakers Chunky Runner Triple White",
    category: "sneakers",
    price: 195000,
    oldPrice: 230000,
    tag: null,
    sizes: ["37", "38", "39", "40", "41"],
    selectedSize: "39",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p7",
    name: "Gorra Snapback Streetwear Bordada",
    category: "accesorios",
    price: 45000,
    oldPrice: null,
    tag: "BÁSICO",
    sizes: ["Única"],
    selectedSize: "Única",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "p8",
    name: "Morral Táctico Impermeable All-Black",
    category: "accesorios",
    price: 95000,
    oldPrice: 120000,
    tag: null,
    sizes: ["Única"],
    selectedSize: "Única",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
  }
];

// Estado del Carrito
let cart = [];
let currentFilter = "all";
let searchQuery = "";

// Elementos DOM
const productsGrid = document.getElementById("productsGrid");
const filterPills = document.querySelectorAll(".filter-pill");
const searchInput = document.getElementById("searchInput");

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const btnCartToggle = document.getElementById("btnCartToggle");
const btnCloseDrawer = document.getElementById("btnCloseDrawer");

const cartCount = document.getElementById("cartCount");
const drawerCount = document.getElementById("drawerCount");
const cartItemsList = document.getElementById("cartItemsList");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");

const btnSendWhatsAppOrder = document.getElementById("btnSendWhatsAppOrder");
const orderSuccessModal = document.getElementById("orderSuccessModal");
const btnCloseSuccessModal = document.getElementById("btnCloseSuccessModal");

// Formateador de moneda colombiana
function formatCOP(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(amount);
}

// Inicialización
function init() {
  renderProducts();
  setupEvents();
  updateCartUI();
}

// Renderizar Productos
function renderProducts() {
  productsGrid.innerHTML = "";

  const filtered = PRODUCTS.filter(p => {
    const matchesCat = currentFilter === "all" || p.category === currentFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
        <i class="ri-search-eye-line" style="font-size: 2.5rem; display: block; margin-bottom: 8px;"></i>
        No encontramos productos que coincidan con tu búsqueda.
      </div>
    `;
    return;
  }

  filtered.forEach(prod => {
    const card = document.createElement("article");
    card.className = "product-card";

    let tagHtml = prod.tag ? `<span class="prod-tag">${prod.tag}</span>` : "";
    let oldPriceHtml = prod.oldPrice ? `<span class="old-price">${formatCOP(prod.oldPrice)}</span>` : "";

    // Opciones de tallas
    let sizesHtml = prod.sizes.map((sz, idx) => `
      <button type="button" class="size-btn ${sz === prod.selectedSize ? 'active' : ''}" data-prod="${prod.id}" data-size="${sz}">${sz}</button>
    `).join("");

    card.innerHTML = `
      ${tagHtml}
      <div class="prod-img-wrap">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
      </div>
      <div class="prod-details">
        <span class="prod-category">${prod.category}</span>
        <h3 class="prod-title">${prod.name}</h3>
        <div class="prod-price-row">
          <span class="current-price">${formatCOP(prod.price)}</span>
          ${oldPriceHtml}
        </div>
        <div class="size-selector">
          <span class="size-label">Talla:</span>
          <div class="size-options">${sizesHtml}</div>
        </div>
        <button type="button" class="btn-add-cart" data-id="${prod.id}">
          <i class="ri-shopping-bag-3-line"></i> Agregar al Pedido
        </button>
      </div>
    `;

    // Eventos de selección de talla
    card.querySelectorAll(".size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        card.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        prod.selectedSize = btn.dataset.size;
      });
    });

    // Evento de agregar al carrito
    card.querySelector(".btn-add-cart").addEventListener("click", (e) => {
      addToCart(prod);
      const btn = e.currentTarget;
      btn.classList.add("added");
      btn.innerHTML = `<i class="ri-check-line"></i> ¡Agregado!`;
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = `<i class="ri-shopping-bag-3-line"></i> Agregar al Pedido`;
      }, 1200);
    });

    productsGrid.appendChild(card);
  });
}

// Agregar al Carrito
function addToCart(product) {
  const itemKey = `${product.id}_${product.selectedSize}`;
  const existing = cart.find(item => item.key === itemKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key: itemKey,
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.selectedSize,
      image: product.image,
      quantity: 1
    });
  }

  updateCartUI();
  openCartDrawer();
}

// Modificar cantidad en carrito
function changeQuantity(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.key !== key);
  }

  updateCartUI();
}

// Eliminar del carrito
function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  updateCartUI();
}

// Actualizar UI del Carrito
function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
  drawerCount.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-message">
        <i class="ri-shopping-bag-line"></i>
        <p>Tu carrito está vacío.</p>
        <span style="font-size: 0.8rem;">Agrega prendas desde el catálogo para enviar tu pedido por WhatsApp.</span>
      </div>
    `;
    cartSubtotal.textContent = "$0";
    cartShipping.textContent = "$0";
    cartTotal.textContent = "$0";
    btnSendWhatsAppOrder.disabled = true;
    btnSendWhatsAppOrder.style.opacity = "0.5";
    return;
  }

  btnSendWhatsAppOrder.disabled = false;
  btnSendWhatsAppOrder.style.opacity = "1";

  // Renderizar ítems
  cartItemsList.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    const itemSub = item.price * item.quantity;
    subtotal += itemSub;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-meta">Talla: <strong>${item.size}</strong> &bull; ${formatCOP(item.price)} c/u</div>
        <div class="cart-qty-ctrl">
          <button type="button" class="qty-btn btn-minus" data-key="${item.key}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button type="button" class="qty-btn btn-plus" data-key="${item.key}">+</button>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="cart-item-price">${formatCOP(itemSub)}</span><br>
        <button type="button" class="btn-remove-item" data-key="${item.key}" title="Eliminar">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;

    div.querySelector(".btn-minus").addEventListener("click", () => changeQuantity(item.key, -1));
    div.querySelector(".btn-plus").addEventListener("click", () => changeQuantity(item.key, 1));
    div.querySelector(".btn-remove-item").addEventListener("click", () => removeFromCart(item.key));

    cartItemsList.appendChild(div);
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  cartSubtotal.textContent = formatCOP(subtotal);
  cartShipping.textContent = shipping === 0 ? "¡GRATIS!" : formatCOP(shipping);
  cartTotal.textContent = formatCOP(total);
}

// Abrir / Cerrar Drawer
function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Enviar Pedido a WhatsApp
function sendWhatsAppOrder() {
  if (cart.length === 0) return;

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const payment = document.getElementById("custPayment").value;

  if (!name || !phone || !address || !city) {
    alert("Por favor completa todos los campos de entrega para procesar tu pedido.");
    return;
  }

  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  let total = subtotal + shipping;

  let msg = `🛍️ *NUEVO PEDIDO - AURA STUDIO*\n`;
  msg += `------------------------------------\n`;
  msg += `🙋‍♂️ *Cliente:* ${name}\n`;
  msg += `📱 *WhatsApp:* ${phone}\n`;
  msg += `📍 *Dirección:* ${address}\n`;
  msg += `🏙️ *Ciudad:* ${city}\n`;
  msg += `💳 *Forma de pago:* ${payment}\n\n`;
  msg += `📦 *PRODUCTOS SOLICITADOS:*\n`;

  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}* (Talla: ${item.size})\n`;
    msg += `   Cantidad: ${item.quantity} x ${formatCOP(item.price)} = ${formatCOP(item.price * item.quantity)}\n`;
  });

  msg += `\n------------------------------------\n`;
  msg += `💵 *Subtotal:* ${formatCOP(subtotal)}\n`;
  msg += `🚚 *Envío:* ${shipping === 0 ? "GRATIS" : formatCOP(shipping)}\n`;
  msg += `💰 *TOTAL A PAGAR:* ${formatCOP(total)}\n`;
  msg += `------------------------------------\n`;
  msg += `_Pedido realizado desde el catálogo online Aura Studio._`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

  window.open(waUrl, "_blank");
  orderSuccessModal.classList.add("active");
}

// Event Listeners
function setupEvents() {
  // Filtros
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.cat;
      renderProducts();
    });
  });

  // Buscador
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Drawer
  btnCartToggle.addEventListener("click", openCartDrawer);
  btnCloseDrawer.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);

  // Checkout
  btnSendWhatsAppOrder.addEventListener("click", sendWhatsAppOrder);
  btnCloseSuccessModal.addEventListener("click", () => {
    orderSuccessModal.classList.remove("active");
    closeCartDrawer();
  });
}

document.addEventListener("DOMContentLoaded", init);
