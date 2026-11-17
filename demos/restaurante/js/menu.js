/**
 * Fuego & Leña - Menú QR Digital y Comanda a WhatsApp
 * Demo comercial desarrollada por Yoider Yancy
 */

const WHATSAPP_PHONE = "573144399660";

// Datos de la Carta
const MENU_ITEMS = [
  {
    id: "m1",
    name: "La Trufada Monster",
    category: "burgers",
    price: 38000,
    desc: "200g carne Angus, queso brie, mayonesa de trufa negra, cebolla caramelizada y pan brioche.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Tocineta ahumada extra", price: 4500 },
      { name: "Doble Queso Cheddar", price: 3500 },
      { name: "Papas Rústicas de acompañamiento", price: 6000 }
    ]
  },
  {
    id: "m2",
    name: "Smoked Bacon BBQ Double",
    category: "burgers",
    price: 36000,
    desc: "Doble carne smash Angus, queso cheddar fundido, tocineta crocante y salsa BBQ bourbon.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Huevo frito de campo", price: 3000 },
      { name: "Jalapeños picantes", price: 2500 }
    ]
  },
  {
    id: "m3",
    name: "Costillas San Luis Ahumadas (500g)",
    category: "parrilla",
    price: 45000,
    desc: "Ahumadas 8 horas en leña de manzano, glaseadas en salsa barbacoa y ensalada coleslaw.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Porción de Mazorca dulce a la parrilla", price: 5000 },
      { name: "Yuca al vapor con mojo de ajo", price: 4500 }
    ]
  },
  {
    id: "m4",
    name: "Ojo de Bife / Rib Eye (350g)",
    category: "parrilla",
    price: 52000,
    desc: "Corte madurado 25 días, marmoleo superior a la brasa con chimichurri rústico de la casa.",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Espárragos salteados a la mantequilla", price: 8000 },
      { name: "Puré de papa trufado", price: 7000 }
    ]
  },
  {
    id: "m5",
    name: "Papas Loaded Volcano",
    category: "entradas",
    price: 24000,
    desc: "Papas rústicas con fondue de cuatro quesos, pulled pork ahumado y sour cream.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Guacamole fresco artesanal", price: 4000 }
    ]
  },
  {
    id: "m6",
    name: "Alitas BBQ Ahumadas (8 uds)",
    category: "entradas",
    price: 26000,
    desc: "Alitas selladas a la parrilla, bañadas en salsa Buffalo o BBQ con aderezo Blue Cheese.",
    image: "https://images.unsplash.com/photo-1527477378370-5b5832a875a5?w=500&auto=format&fit=crop&q=80",
    addons: [
      { name: "Bastones de apio y zanahoria extra", price: 3000 }
    ]
  },
  {
    id: "m7",
    name: "Cerveza Artesanal IPA Tropical (330ml)",
    category: "bebidas",
    price: 14000,
    desc: "Notas cítricas de maracuyá y mango, lúpulo aromático y amargor balanceado.",
    image: "https://images.unsplash.com/photo-1608270190562-b13c7a38b1f5?w=500&auto=format&fit=crop&q=80",
    addons: []
  },
  {
    id: "m8",
    name: "Limonada de Coco & Hierbabuena",
    category: "bebidas",
    price: 11000,
    desc: "Leche de coco cremosa, zumo de limón fresco y hojas de hierbabuena maceradas.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
    addons: []
  }
];

// Estado de la Comanda
let currentMode = "table"; // 'table' o 'delivery'
let currentCategory = "all";
let order = [];

// Elementos DOM
const dishesList = document.getElementById("dishesList");
const catPills = document.querySelectorAll(".cat-pill");

const btnModeTable = document.getElementById("btnModeTable");
const btnModeDelivery = document.getElementById("btnModeDelivery");
const tableInputWrap = document.getElementById("tableInputWrap");
const deliveryInputWrap = document.getElementById("deliveryInputWrap");
const tableNumber = document.getElementById("tableNumber");
const deliveryAddress = document.getElementById("deliveryAddress");

const stickyOrderBar = document.getElementById("stickyOrderBar");
const stickyQty = document.getElementById("stickyQty");
const stickyTotal = document.getElementById("stickyTotal");
const btnViewOrder = document.getElementById("btnViewOrder");

const trayDrawer = document.getElementById("trayDrawer");
const trayOverlay = document.getElementById("trayOverlay");
const btnOpenTray = document.getElementById("btnOpenTray");
const btnCloseTray = document.getElementById("btnCloseTray");
const trayCount = document.getElementById("trayCount");
const trayItemsList = document.getElementById("trayItemsList");
const trayTotalPrice = document.getElementById("trayTotalPrice");
const trayContextInfo = document.getElementById("trayContextInfo");

const dinerName = document.getElementById("dinerName");
const dinerNotes = document.getElementById("dinerNotes");
const btnSendKitchen = document.getElementById("btnSendKitchen");
const orderSuccessModal = document.getElementById("orderSuccessModal");
const btnCloseModal = document.getElementById("btnCloseModal");

function formatCOP(num) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(num);
}

// Inicializar
function init() {
  renderDishes();
  setupEvents();
  updateOrderUI();
}

// Renderizar Platos
function renderDishes() {
  dishesList.innerHTML = "";

  const filtered = MENU_ITEMS.filter(item => {
    return currentCategory === "all" || item.category === currentCategory;
  });

  filtered.forEach(dish => {
    const card = document.createElement("article");
    card.className = "dish-card-item";

    let addonsHtml = "";
    if (dish.addons && dish.addons.length > 0) {
      const addonsInputs = dish.addons.map((add, idx) => `
        <label class="addon-checkbox">
          <span>
            <input type="checkbox" class="dish-addon-cb" data-dish="${dish.id}" data-name="${add.name}" data-price="${add.price}">
            ${add.name}
          </span>
          <span class="addon-price">+${formatCOP(add.price)}</span>
        </label>
      `).join("");

      addonsHtml = `
        <div class="addons-box">
          <span class="addons-label">Adiciones opcionales:</span>
          <div class="addons-list">${addonsInputs}</div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="dish-main-row">
        <img src="${dish.image}" alt="${dish.name}" class="dish-thumb" loading="lazy">
        <div class="dish-info">
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-desc">${dish.desc}</p>
          <span class="dish-price-tag">${formatCOP(dish.price)}</span>
        </div>
      </div>
      ${addonsHtml}
      <button type="button" class="btn-add-dish" data-id="${dish.id}">
        <i class="ri-add-line"></i> Agregar a mi Orden
      </button>
    `;

    // Botón agregar
    card.querySelector(".btn-add-dish").addEventListener("click", (e) => {
      // Capturar adiciones chequeadas en este card
      const selectedAddons = [];
      card.querySelectorAll(".dish-addon-cb:checked").forEach(cb => {
        selectedAddons.push({
          name: cb.dataset.name,
          price: parseInt(cb.dataset.price, 10)
        });
      });

      addToOrder(dish, selectedAddons);

      // Limpiar checkboxes
      card.querySelectorAll(".dish-addon-cb").forEach(cb => cb.checked = false);

      // Feedback
      const btn = e.currentTarget;
      btn.classList.add("added");
      btn.innerHTML = `<i class="ri-check-line"></i> ¡Plato Agregado!`;
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = `<i class="ri-add-line"></i> Agregar a mi Orden`;
      }, 1000);
    });

    dishesList.appendChild(card);
  });
}

// Agregar a la Comanda
function addToOrder(dish, addons) {
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const finalItemPrice = dish.price + addonsTotal;

  order.push({
    dishId: dish.id,
    name: dish.name,
    basePrice: dish.price,
    addons: addons,
    unitPrice: finalItemPrice
  });

  updateOrderUI();
}

// Eliminar plato de la comanda
function removeFromOrder(index) {
  order.splice(index, 1);
  updateOrderUI();
}

// Actualizar UI de Orden y Barra Sticky
function updateOrderUI() {
  const totalItems = order.length;
  trayCount.textContent = totalItems;

  const totalSum = order.reduce((acc, item) => acc + item.unitPrice, 0);

  stickyQty.textContent = `${totalItems} ${totalItems === 1 ? 'plato agregado' : 'platos agregados'}`;
  stickyTotal.textContent = formatCOP(totalSum);
  trayTotalPrice.textContent = formatCOP(totalSum);

  // Barra sticky
  if (totalItems > 0) {
    stickyOrderBar.classList.add("active");
  } else {
    stickyOrderBar.classList.remove("active");
  }

  // Renderizar en Drawer
  if (totalItems === 0) {
    trayItemsList.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: #a8a29e;">
        <i class="ri-restaurant-line" style="font-size: 2.5rem; display: block; margin-bottom: 8px;"></i>
        Aún no has agregado platos a tu orden.
      </div>
    `;
    btnSendKitchen.disabled = true;
    btnSendKitchen.style.opacity = "0.5";
  } else {
    btnSendKitchen.disabled = false;
    btnSendKitchen.style.opacity = "1";
    trayItemsList.innerHTML = "";

    order.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "tray-item";

      let addonsText = item.addons.length > 0 
        ? item.addons.map(a => `+ ${a.name} (${formatCOP(a.price)})`).join("<br>") 
        : "Sin adiciones";

      div.innerHTML = `
        <div class="tray-item-info">
          <h4>${item.name}</h4>
          <div class="tray-addons-text">${addonsText}</div>
          <span class="tray-item-price">${formatCOP(item.unitPrice)}</span>
        </div>
        <div>
          <button type="button" class="btn-remove-item" data-index="${idx}" style="background:transparent;border:none;color:#ef4444;cursor:pointer;font-size:1.1rem;" title="Quitar">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      `;

      div.querySelector(".btn-remove-item").addEventListener("click", () => removeFromOrder(idx));
      trayItemsList.appendChild(div);
    });
  }

  // Contexto de servicio
  if (currentMode === "table") {
    trayContextInfo.innerHTML = `Servicio: <strong>${tableNumber.value} (En el local)</strong>`;
  } else {
    const addr = deliveryAddress.value.trim() || "Dirección por definir";
    trayContextInfo.innerHTML = `Servicio: <strong>Domicilio en: ${addr}</strong>`;
  }
}

// Enviar Comanda a WhatsApp
function sendKitchenOrder() {
  if (order.length === 0) return;

  const name = dinerName.value.trim();
  const notes = dinerNotes.value.trim();

  if (!name) {
    alert("Por favor ingresa tu nombre para identificar la comanda.");
    return;
  }

  let serviceLocation = "";
  if (currentMode === "table") {
    serviceLocation = `🍽️ *EN EL LOCAL - ${tableNumber.value}*`;
  } else {
    const addr = deliveryAddress.value.trim();
    if (!addr) {
      alert("Por favor escribe tu dirección para el domicilio.");
      return;
    }
    serviceLocation = `🛵 *PEDIDO A DOMICILIO - ${addr}*`;
  }

  const totalSum = order.reduce((acc, item) => acc + item.unitPrice, 0);

  let msg = `🔥 *NUEVA COMANDA - FUEGO & LEÑA* 🔥\n`;
  msg += `------------------------------------\n`;
  msg += `${serviceLocation}\n`;
  msg += `🙋‍♂️ *Comensal:* ${name}\n\n`;
  msg += `📋 *PLATOS ORDENADOS:*\n`;

  order.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}* — ${formatCOP(item.unitPrice)}\n`;
    if (item.addons.length > 0) {
      item.addons.forEach(a => {
        msg += `   └ + ${a.name}\n`;
      });
    }
  });

  if (notes) {
    msg += `\n📝 *Notas al chef:* ${notes}\n`;
  }

  msg += `\n------------------------------------\n`;
  msg += `💰 *TOTAL COMANDA:* ${formatCOP(totalSum)}\n`;
  msg += `------------------------------------\n`;
  msg += `_Comanda enviada desde el Menú QR Digital._`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

  window.open(waUrl, "_blank");
  orderSuccessModal.classList.add("active");
}

// Configurar Eventos
function setupEvents() {
  // Selector Mesa / Domicilio
  btnModeTable.addEventListener("click", () => {
    btnModeTable.classList.add("active");
    btnModeDelivery.classList.remove("active");
    tableInputWrap.classList.remove("hidden");
    deliveryInputWrap.classList.add("hidden");
    currentMode = "table";
    updateOrderUI();
  });

  btnModeDelivery.addEventListener("click", () => {
    btnModeDelivery.classList.add("active");
    btnModeTable.classList.remove("active");
    deliveryInputWrap.classList.remove("hidden");
    tableInputWrap.classList.add("hidden");
    currentMode = "delivery";
    updateOrderUI();
  });

  tableNumber.addEventListener("change", updateOrderUI);
  deliveryAddress.addEventListener("input", updateOrderUI);

  // Filtros de Categorías
  catPills.forEach(pill => {
    pill.addEventListener("click", () => {
      catPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.cat;
      renderDishes();
    });
  });

  // Drawer de Comanda
  btnViewOrder.addEventListener("click", () => {
    trayDrawer.classList.add("active");
    trayOverlay.classList.add("active");
  });

  btnOpenTray.addEventListener("click", () => {
    trayDrawer.classList.add("active");
    trayOverlay.classList.add("active");
  });

  btnCloseTray.addEventListener("click", () => {
    trayDrawer.classList.remove("active");
    trayOverlay.classList.remove("active");
  });

  trayOverlay.addEventListener("click", () => {
    trayDrawer.classList.remove("active");
    trayOverlay.classList.remove("active");
  });

  // Enviar
  btnSendKitchen.addEventListener("click", sendKitchenOrder);

  btnCloseModal.addEventListener("click", () => {
    orderSuccessModal.classList.remove("active");
    trayDrawer.classList.remove("active");
    trayOverlay.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", init);

