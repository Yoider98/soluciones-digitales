/**
 * quote-modal.js
 * Cuestionario interactivo avanzado y flexible para cotizaciones a medida.
 * Permite combinaciones múltiples (ej: citas + venta de productos),
 * campos para ideas personalizadas y espacio amplio para escribir requerimientos.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeQuoteModal');
  const openButtons = document.querySelectorAll('[data-open-quote-modal]');
  const progressBar = document.getElementById('quoteProgressBar');
  const currentStepLabel = document.getElementById('quoteCurrentStepLabel');
  const prevBtn = document.getElementById('quotePrevBtn');
  const nextBtn = document.getElementById('quoteNextBtn');
  const submitBtn = document.getElementById('quoteSubmitBtn');
  const directWaBtn = document.getElementById('quoteDirectWa');

  const steps = [
    document.getElementById('quoteStep1'),
    document.getElementById('quoteStep2'),
    document.getElementById('quoteStep3'),
    document.getElementById('quoteStep4')
  ];

  let currentStep = 1;
  const totalSteps = 4;

  const quoteData = {
    businessTypes: [],
    customBusinessType: '',
    solutions: [],
    customSolution: '',
    features: ['Cierre directo por WhatsApp sin registro obligatorio'],
    ideaDescription: '',
    clientName: '',
    timeline: 'En las próximas 2 a 3 semanas'
  };

  const whatsappPhone = '573144399660';

  // Abrir Modal
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToStep(1);
  }

  // Cerrar Modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Navegación entre pasos
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;
    currentStep = stepNumber;

    steps.forEach((stepEl, idx) => {
      if (stepEl) {
        stepEl.classList.toggle('active', idx + 1 === currentStep);
      }
    });

    // Actualizar barra de progreso
    const percentage = (currentStep / totalSteps) * 100;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (currentStepLabel) currentStepLabel.textContent = `Paso ${currentStep} de ${totalSteps}`;

    // Control de visibilidad de botones
    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (nextBtn && submitBtn) {
      if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        goToStep(currentStep + 1);
      }
    });
  }

  // PASO 1: Selección Múltiple de Tipo de Negocio
  const step1Cards = document.querySelectorAll('#quoteStep1 .quote-option-card');
  const step1CustomBox = document.getElementById('step1Custom');
  const step1CustomInput = document.getElementById('step1CustomInput');

  step1Cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const val = card.getAttribute('data-value');
      const isCustomTrigger = card.getAttribute('data-trigger-custom') === 'step1Custom';

      if (card.classList.contains('selected')) {
        if (!quoteData.businessTypes.includes(val)) quoteData.businessTypes.push(val);
        if (isCustomTrigger && step1CustomBox) {
          step1CustomBox.classList.add('active');
          if (step1CustomInput) step1CustomInput.focus();
        }
      } else {
        quoteData.businessTypes = quoteData.businessTypes.filter(item => item !== val);
        if (isCustomTrigger && step1CustomBox) {
          step1CustomBox.classList.remove('active');
        }
      }
    });
  });

  // PASO 2: Selección Múltiple de Soluciones / Objetivos (Combinación)
  const step2Cards = document.querySelectorAll('#quoteStep2 .quote-option-card');
  const step2CustomBox = document.getElementById('step2Custom');
  const step2CustomInput = document.getElementById('step2CustomInput');

  step2Cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const val = card.getAttribute('data-value');
      const isCustomTrigger = card.getAttribute('data-trigger-custom') === 'step2Custom';

      if (card.classList.contains('selected')) {
        if (!quoteData.solutions.includes(val)) quoteData.solutions.push(val);
        if (isCustomTrigger && step2CustomBox) {
          step2CustomBox.classList.add('active');
          if (step2CustomInput) step2CustomInput.focus();
        }
      } else {
        quoteData.solutions = quoteData.solutions.filter(item => item !== val);
        if (isCustomTrigger && step2CustomBox) {
          step2CustomBox.classList.remove('active');
        }
      }
    });
  });

  // PASO 3: Selección de Funciones Extras (Chips)
  const step3Chips = document.querySelectorAll('#quoteStep3 .quote-chip');
  step3Chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const val = chip.getAttribute('data-value');
      if (chip.classList.contains('selected')) {
        if (!quoteData.features.includes(val)) quoteData.features.push(val);
      } else {
        quoteData.features = quoteData.features.filter(f => f !== val);
      }
    });
  });

  // Validación de pasos
  function validateCurrentStep() {
    if (currentStep === 1) {
      if (quoteData.businessTypes.length === 0) {
        alert('Por favor selecciona al menos una opción o cuéntanos el tipo de tu negocio.');
        return false;
      }
    } else if (currentStep === 2) {
      if (quoteData.solutions.length === 0) {
        alert('Por favor selecciona al menos una solución o funcionalidad que necesitas (puedes combinar varias).');
        return false;
      }
    }
    return true;
  }

  // PASO 4 y Envío a WhatsApp
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const ideaInput = document.getElementById('quoteIdeaDescription');
      const nameInput = document.getElementById('quoteClientName');
      const timelineSelect = document.getElementById('quoteTimeline');

      quoteData.ideaDescription = ideaInput ? ideaInput.value.trim() : '';
      quoteData.clientName = nameInput ? nameInput.value.trim() : '';
      quoteData.timeline = timelineSelect ? timelineSelect.value : 'En las próximas 2 a 3 semanas';

      if (step1CustomInput && step1CustomInput.value.trim()) {
        quoteData.customBusinessType = step1CustomInput.value.trim();
      }
      if (step2CustomInput && step2CustomInput.value.trim()) {
        quoteData.customSolution = step2CustomInput.value.trim();
      }

      // Preparar mensaje para WhatsApp
      let businessList = [...quoteData.businessTypes];
      if (quoteData.customBusinessType) {
        businessList = businessList.filter(b => !b.includes('Otro modelo'));
        businessList.push(`Personalizado: ${quoteData.customBusinessType}`);
      }

      let solutionsList = [...quoteData.solutions];
      if (quoteData.customSolution) {
        solutionsList = solutionsList.filter(s => !s.includes('Otro requerimiento'));
        solutionsList.push(`Especial: ${quoteData.customSolution}`);
      }

      const clientIdentity = quoteData.clientName 
        ? quoteData.clientName 
        : 'Emprendedor / Cliente interesado';

      let message = `¡Hola Yoider! Me gustaría cotizar un proyecto web a la medida 🚀\n\n`;
      message += `🏢 *Tipo de negocio:*\n• ${businessList.join('\n• ')}\n\n`;
      message += `🎯 *Soluciones que necesito combinar:*\n• ${solutionsList.join('\n• ')}\n\n`;

      if (quoteData.features.length > 0) {
        message += `⚡ *Funciones extras de interés:*\n• ${quoteData.features.join('\n• ')}\n\n`;
      }

      if (quoteData.ideaDescription) {
        message += `💡 *Descripción de mi idea / Requerimiento:*\n"${quoteData.ideaDescription}"\n\n`;
      }

      message += `👤 *Mi nombre / Negocio:* ${clientIdentity}\n`;
      message += `⏱️ *Tiempo estimado:* ${quoteData.timeline}\n\n`;
      message += `¿Podemos conversarlo para ver opciones y una cotización personalizada?`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

      window.open(waUrl, '_blank');
      closeModal();
    });
  }

  // Botón para saltar cuestionario y hablar directo
  if (directWaBtn) {
    directWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const directMsg = encodeURIComponent('Hola Yoider, me gustaría cotizar un proyecto personalizado directamente contigo.');
      window.open(`https://wa.me/${whatsappPhone}?text=${directMsg}`, '_blank');
      closeModal();
    });
  }
});
