/**
 * CitaFácil - Demo Interactiva de Agendamiento
 * Desarrollado para Showcase de Soluciones Web para Negocios
 */

// Teléfono comercial del negocio (WhatsApp)
const WHATSAPP_BUSINESS_NUMBER = "573144399660";

// Datos por Nicho de Negocio
const NICHES = {
  barber: {
    name: "Barbería & Spa Élite",
    subtitle: "Cl. Principal # 10 - 20 • Abierto hoy",
    icon: "ri-scissors-2-line",
    themeClass: "theme-barber",
    staff: [
      { id: "s1", name: "Mateo R.", role: "Master Barber" },
      { id: "s2", name: "Andrés V.", role: "Especialista Barba" },
      { id: "s3", name: "Cualquiera", role: "Primer disponible" }
    ],
    services: [
      { id: "b1", title: "Corte Clásico & Peinado", duration: "35 min", price: 25000, icon: "ri-scissors-cut-line" },
      { id: "b2", title: "Corte + Barba Spa (Toalla caliente)", duration: "50 min", price: 42000, icon: "ri-fire-line" },
      { id: "b3", title: "Perfilado & Terapia de Barba", duration: "25 min", price: 20000, icon: "ri-user-smile-line" },
      { id: "b4", title: "Combo VIP (Corte, Barba, Exfoliación)", duration: "65 min", price: 60000, icon: "ri-vip-crown-line" }
    ]
  },
  spa: {
    name: "Serena Spa & Estética",
    subtitle: "Av. Las Palmas # 45 • Citas personalizadas",
    icon: "ri-sparkles-line",
    themeClass: "theme-spa",
    staff: [
      { id: "sp1", name: "Valentina M.", role: "Cosmetóloga" },
      { id: "sp2", name: "Camila S.", role: "Terapeuta Holística" },
      { id: "sp3", name: "Cualquiera", role: "Primer disponible" }
    ],
    services: [
      { id: "s1", title: "Limpieza Facial Profunda", duration: "60 min", price: 75000, icon: "ri-heart-pulse-line" },
      { id: "s2", title: "Masaje Relajante con Piedras", duration: "50 min", price: 85000, icon: "ri-water-flash-line" },
      { id: "s3", title: "Manicura & Pedicura Spa", duration: "45 min", price: 45000, icon: "ri-hand-sanitizer-line" },
      { id: "s4", title: "Depilación Láser Diodo (Zona)", duration: "30 min", price: 60000, icon: "ri-flashlight-line" }
    ]
  },
  dental: {
    name: "Clínica Dental & Sonrisas",
    subtitle: "Edificio Médico Torre A • Piso 3",
    icon: "ri-stethoscope-line",
    themeClass: "theme-dental",
    staff: [
      { id: "d1", name: "Dra. Laura Gómez", role: "Odontóloga General" },
      { id: "d2", name: "Dr. Felipe Ruiz", role: "Ortodoncista" },
      { id: "d3", name: "Cualquiera", role: "Disponibilidad rápida" }
    ],
    services: [
      { id: "de1", title: "Valoración & Diagnóstico Digital", duration: "30 min", price: 35000, icon: "ri-file-search-line" },
      { id: "de2", title: "Profilaxis (Limpieza por Ultrasonido)", duration: "45 min", price: 70000, icon: "ri-shield-flash-line" },
      { id: "de3", title: "Blanqueamiento Dental LED", duration: "60 min", price: 180000, icon: "ri-contrast-drop-2-line" },
      { id: "de4", title: "Control / Ajuste de Ortodoncia", duration: "30 min", price: 50000, icon: "ri-tools-line" }
    ]
  },
  pet: {
    name: "Happy Paws - Pet Shop & Spa",
    subtitle: "Cra. 70 # 22 - 15 • Mascotas felices",
    icon: "ri-baidu-line",
    themeClass: "theme-pet",
    staff: [
      { id: "p1", name: "Carlos Peluquero", role: "Groomer Canino" },
      { id: "p2", name: "Dra. Sofía", role: "Médica Veterinaria" },
      { id: "p3", name: "Cualquiera", role: "Turno más cercano" }
    ],
    services: [
      { id: "pt1", title: "Baño Medicado & Desparasitación", duration: "40 min", price: 35000, icon: "ri-bubble-chart-line" },
      { id: "pt2", title: "Grooming & Corte de Raza", duration: "60 min", price: 55000, icon: "ri-scissors-2-line" },
      { id: "pt3", title: "Consulta Veterinaria Preventiva", duration: "30 min", price: 45000, icon: "ri-heart-add-line" },
      { id: "pt4", title: "Spa Completo (Uñas, Oídos, Masaje)", duration: "75 min", price: 70000, icon: "ri-medal-line" }
    ]
  }
};

// Estado Actual de la Reserva
const state = {
  currentNiche: "barber",
  selectedService: null,
  selectedStaff: null,
  selectedDate: null,
  selectedHour: null,
  clientName: "",
  clientPhone: "",
  clientNotes: ""
};

// Elementos DOM
const nicheSelect = document.getElementById("nicheSelect");
const businessName = document.getElementById("businessName");
const businessSubtitle = document.getElementById("businessSubtitle");
const businessIcon = document.getElementById("businessIcon");
const servicesList = document.getElementById("servicesList");
const staffGrid = document.getElementById("staffGrid");
const daysSlider = document.getElementById("daysSlider");
const hoursGrid = document.getElementById("hoursGrid");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const btnToStep2 = document.getElementById("btnToStep2");
const btnBackToStep1 = document.getElementById("btnBackToStep1");
const btnToStep3 = document.getElementById("btnToStep3");
const btnBackToStep2 = document.getElementById("btnBackToStep2");
const btnConfirmWhatsApp = document.getElementById("btnConfirmWhatsApp");

const summaryService = document.getElementById("summaryService");
const summaryStaff = document.getElementById("summaryStaff");
const summaryDateTime = document.getElementById("summaryDateTime");
const summaryPrice = document.getElementById("summaryPrice");

const successModal = document.getElementById("successModal");
const btnCloseModal = document.getElementById("btnCloseModal");

// Formateador de Moneda
function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(amount);
}

// Inicialización
function init() {
  renderNiche(state.currentNiche);
  generateDays();
  setupEventListeners();
}

// Renderizar Nicho
function renderNiche(nicheKey) {
  const data = NICHES[nicheKey];
  document.body.className = data.themeClass;
  businessName.textContent = data.name;
  businessSubtitle.innerHTML = `<i class="ri-map-pin-2-fill"></i> ${data.subtitle}`;
  businessIcon.innerHTML = `<i class="${data.icon}"></i>`;

  // Renderizar Servicios
  servicesList.innerHTML = "";
  data.services.forEach(srv => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.dataset.id = srv.id;
    card.innerHTML = `
      <div class="service-meta">
        <div class="service-icon"><i class="${srv.icon}"></i></div>
        <div class="service-info">
          <h3>${srv.title}</h3>
          <p><i class="ri-time-line"></i> ${srv.duration}</p>
        </div>
      </div>
      <div class="service-pricing">
        <span class="service-price">${formatCurrency(srv.price)}</span>
        <div class="service-check"><i class="ri-check-line"></i></div>
      </div>
    `;
    card.addEventListener("click", () => selectService(srv, card));
    servicesList.appendChild(card);
  });

  // Renderizar Especialistas
  staffGrid.innerHTML = "";
  data.staff.forEach((st, idx) => {
    const card = document.createElement("div");
    card.className = `staff-card ${idx === 0 ? "selected" : ""}`;
    card.innerHTML = `
      <div class="staff-name">${st.name}</div>
      <div class="staff-role">${st.role}</div>
    `;
    card.addEventListener("click", () => {
      document.querySelectorAll(".staff-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.selectedStaff = st;
      updateStep2ButtonState();
    });
    staffGrid.appendChild(card);
  });
  state.selectedStaff = data.staff[0];

  // Reset de selección de servicio
  state.selectedService = null;
  btnToStep2.disabled = true;
}

// Seleccionar Servicio
function selectService(srv, cardElement) {
  document.querySelectorAll(".service-card").forEach(c => c.classList.remove("selected"));
  cardElement.classList.add("selected");
  state.selectedService = srv;
  btnToStep2.disabled = false;
}

// Generar Próximos 7 Días
function generateDays() {
  daysSlider.innerHTML = "";
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dayName = i === 0 ? "Hoy" : dayNames[date.getDay()];
    const dayNumber = date.getDate();
    const fullDateStr = date.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" });

    const pill = document.createElement("div");
    pill.className = `day-pill ${i === 0 ? "selected" : ""}`;
    pill.innerHTML = `
      <div class="day-name">${dayName}</div>
      <div class="day-number">${dayNumber}</div>
    `;

    pill.addEventListener("click", () => {
      document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      state.selectedDate = fullDateStr;
      generateHours();
      updateStep2ButtonState();
    });

    daysSlider.appendChild(pill);

    if (i === 0) {
      state.selectedDate = fullDateStr;
    }
  }

  generateHours();
}

// Generar Horas Disponibles
function generateHours() {
  hoursGrid.innerHTML = "";
  const slots = [
    "09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM",
    "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM",
    "05:00 PM", "05:45 PM", "06:30 PM"
  ];

  state.selectedHour = null;

  slots.forEach((hour) => {
    const pill = document.createElement("div");
    pill.className = "hour-pill";
    pill.textContent = hour;
    pill.addEventListener("click", () => {
      document.querySelectorAll(".hour-pill").forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      state.selectedHour = hour;
      updateStep2ButtonState();
    });
    hoursGrid.appendChild(pill);
  });
}

function updateStep2ButtonState() {
  btnToStep3.disabled = !(state.selectedDate && state.selectedHour && state.selectedStaff);
}

// Navegación de Pasos
function goToStep(stepNumber) {
  [step1, step2, step3].forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".step-pill").forEach(p => p.classList.remove("active"));

  if (stepNumber === 1) {
    step1.classList.add("active");
    document.querySelector('.step-pill[data-step="1"]').classList.add("active");
  } else if (stepNumber === 2) {
    step2.classList.add("active");
    document.querySelector('.step-pill[data-step="1"]').classList.add("active");
    document.querySelector('.step-pill[data-step="2"]').classList.add("active");
  } else if (stepNumber === 3) {
    step3.classList.add("active");
    document.querySelectorAll(".step-pill").forEach(p => p.classList.add("active"));
    renderSummary();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Renderizar Resumen en Paso 3
function renderSummary() {
  summaryService.textContent = `${state.selectedService.title} (${state.selectedService.duration})`;
  summaryStaff.textContent = state.selectedStaff ? state.selectedStaff.name : "Primer disponible";
  summaryDateTime.textContent = `${state.selectedDate} a las ${state.selectedHour}`;
  summaryPrice.textContent = formatCurrency(state.selectedService.price);
}

// Enviar Reserva a WhatsApp
function confirmBookingToWhatsApp() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const notes = document.getElementById("clientNotes").value.trim();

  if (!name || !phone) {
    alert("Por favor completa tu nombre y número de WhatsApp para confirmar.");
    return;
  }

  const currentBusiness = NICHES[state.currentNiche].name;

  let message = `¡Hola *${currentBusiness}*! 👋\n`;
  message += `Quiero solicitar la confirmación de mi cita:\n\n`;
  message += `📌 *Servicio:* ${state.selectedService.title} (${state.selectedService.duration})\n`;
  message += `👤 *Especialista:* ${state.selectedStaff.name}\n`;
  message += `🗓️ *Fecha y Hora:* ${state.selectedDate} - ${state.selectedHour}\n`;
  message += `💰 *Valor aproximado:* ${formatCurrency(state.selectedService.price)}\n\n`;
  message += `🙋‍♂️ *Cliente:* ${name}\n`;
  message += `📱 *WhatsApp:* ${phone}\n`;
  if (notes) {
    message += `📝 *Notas:* ${notes}\n`;
  }
  message += `\n_Enviado desde el sistema de reservas web CitaFácil._`;

  const waUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;

  // Abrir WhatsApp
  window.open(waUrl, "_blank");

  // Mostrar modal de confirmación
  successModal.classList.add("active");
}

// Listeners
function setupEventListeners() {
  nicheSelect.addEventListener("change", (e) => {
    state.currentNiche = e.target.value;
    renderNiche(state.currentNiche);
    goToStep(1);
  });

  btnToStep2.addEventListener("click", () => goToStep(2));
  btnBackToStep1.addEventListener("click", () => goToStep(1));

  btnToStep3.addEventListener("click", () => goToStep(3));
  btnBackToStep2.addEventListener("click", () => goToStep(2));

  btnConfirmWhatsApp.addEventListener("click", confirmBookingToWhatsApp);

  btnCloseModal.addEventListener("click", () => {
    successModal.classList.remove("active");
  });
}

// Iniciar app
document.addEventListener("DOMContentLoaded", init);
