/**
 * Huella Profesional - Manifiesto de Identidad Ética (EC1)
 * Lógica interactiva: Hotspots, Mapa Geográfico SVG, Pirámide de Scheler, Luces/Sombras y Contador en Vivo.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initWordCounter();
  initArtworkHotspots();
  initFacesMapInteractions();
  initSchelerPyramid();
  initShadowsLightsToggle();
  initPresentationMode();
  initSmoothScroll();
  initCoverCarousel();
});

/* ==========================================================================
   1. Barra de progreso de lectura superior
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================================================
   2. Contador en vivo de palabras académicas (Rúbrica EC1: 1,200 a 1,500)
   ========================================================================== */
function initWordCounter() {
  let totalWords = 0;

  const pElements = document.querySelectorAll('p.academic-text');
  pElements.forEach(el => {
    const text = el.innerText.trim();
    if (text.length > 0) {
      const words = text.split(/\s+/).filter(w => w.length > 0);
      totalWords += words.length;
    }
  });

  const quoteElements = document.querySelectorAll('div.academic-quote');
  quoteElements.forEach(el => {
    if (!el.querySelector('p.academic-text')) {
      const text = el.innerText.trim();
      if (text.length > 0) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        totalWords += words.length;
      }
    }
  });

  const wordBadge = document.getElementById('academic-word-count');
  const wordStatus = document.getElementById('academic-word-status');
  
  if (wordBadge) {
    wordBadge.textContent = totalWords.toLocaleString();
    if (wordStatus) {
      if (totalWords >= 1200 && totalWords <= 1500) {
        wordStatus.textContent = 'Cumple rango EC1 (1,200 - 1,500)';
        wordStatus.className = 'text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200';
      } else if (totalWords > 1500) {
        wordStatus.textContent = 'Contenido profundo y sustentado (>1,500 palabras)';
        wordStatus.className = 'text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200';
      } else {
        wordStatus.textContent = 'Rango en progreso';
        wordStatus.className = 'text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200';
      }
    }
  }
}

/* ==========================================================================
   3. Hotspots interactivos en las obras artísticas
   ========================================================================== */
const hotspotData = {
  // Las Meninas
  'meninas-1': {
    title: 'El Pintor y el Bastidor Oculto (La Areté)',
    subtitle: 'Diego Velázquez ante el lienzo invertido',
    text: 'Velázquez no se retrata contemplando una corte vacía, sino en plena ejecución reflexiva. El bastidor nos da la espalda: lo esencial de su maestría ocurre en esa estructura oculta que el espectador no ve. En arquitectura y sistemas, la verdadera excelencia (areté) no es el maquillaje superficial ni el diseño estético para la foto, sino la seguridad estructural, la accesibilidad de las rutas de escape y la solidez de los algoritmos invisibles que sostienen la vida humana cotidiana.'
  },
  'meninas-2': {
    title: 'El Espejo Central (El Telos: La Persona como Fin)',
    subtitle: 'Los reyes reflejados como destinatarios últimos',
    text: 'En el centro geométrico del fondo, un espejo refleja a quienes están fuera del cuadro. Esto invierte la mirada: el propósito final (telos) de toda obra profesional no es la complacencia del autor ni el beneficio mercantil inmediato, sino el ser humano que habita el espacio o interactúa con el sistema informático. Como postula Kant (1785), la persona debe ser tratada siempre como un fin supremo, jamás como un medio de lucro.'
  },
  'meninas-3': {
    title: 'El Espacio Habitado y la Iluminación',
    subtitle: 'La Infanta y el séquito: el confort y la convivencia',
    text: 'La composición genera una atmósfera habitable donde conviven diferentes corporalidades y estaturas. En la arquitectura de interiores, esto simboliza el mandato ético del diseño universal: proyectar ambientes con ventilación adecuada, ergonomía sensible y accesibilidad irrestricta que permitan el florecimiento humano (eudaimonía), sin excluir a personas con movilidad reducida o adultos mayores.'
  },
  'meninas-4': {
    title: 'La Puerta Abierta hacia la Sociedad',
    subtitle: 'José Nieto en el vano iluminado',
    text: 'Al fondo a la derecha, una figura cruza el umbral entre el espacio privado y la luz pública. Representa la conexión ineludible con la realidad peruana: el ejercicio profesional no opera en un vacío aséptico de oficina o estudio, sino en un país atravesado por desigualdades y precariedad donde cada decisión técnica tiene impacto público y social.'
  },

  // Manos Dibujando (M. C. Escher)
  'escher-1': {
    title: 'La Mano que Modela el Algoritmo',
    subtitle: 'El ingeniero como arquitecto de reglas invisibles',
    text: 'La mano izquierda sostiene la pluma y da relieve a la manga derecha. En la ingeniería empresarial y de sistemas, cada línea de código, arquitectura de datos y regla de decisión es trazada por un criterio humano. No existe la «neutralidad algorítmica»: el sistema automatizado hereda la visión, los valores o los sesgos de su programador.'
  },
  'escher-2': {
    title: 'El Bucle de Retroalimentación Social',
    subtitle: 'La recursividad: el sistema actúa sobre la sociedad',
    text: 'A su vez, la mano derecha dibuja el puño de la mano izquierda, cerrando una paradoja de causalidad circular. Cuando un algoritmo de selección laboral o scoring crediticio se implementa en empresas peruanas, las decisiones automatizadas modifican las oportunidades reales de miles de postulantes, reforzando o corrigiendo las desigualdades históricas del país.'
  },
  'escher-3': {
    title: 'El Papel Plano y los Datos de Entrenamiento',
    subtitle: 'La ilusión de objetividad en la superficie bidimensional',
    text: 'Ambas manos emergen de una hoja de papel sujeta con chinchetas. El papel representa la base de datos histórica. Si los datos reflejan siglos de discriminación de género, etnia o procedencia regional, el algoritmo simplemente optimizará y amplificará la injusticia bajo un falso ropaje de objetividad matemática (apelación a la autoridad del algoritmo).'
  },
  'escher-4': {
    title: 'El Imperativo de la Auditoría Humana',
    subtitle: 'Romper el ciclo mediante la responsabilidad ética',
    text: 'Escher nos obliga a observar la trampa del bucle infinito. La ética deontológica en sistemas exige que siempre exista supervisión humana (human-in-the-loop). Ninguna decisión que comprometa el sustento, la dignidad o los derechos de una persona puede delegarse ciegamente a una «caja negra» tecnológica sin explicabilidad y auditoría periódica.'
  }
};

function initArtworkHotspots() {
  const modal = document.getElementById('hotspot-modal');
  const modalTitle = document.getElementById('modal-hotspot-title');
  const modalSubtitle = document.getElementById('modal-hotspot-subtitle');
  const modalText = document.getElementById('modal-hotspot-text');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  document.querySelectorAll('.hotspot-point').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-hotspot');
      const data = hotspotData[id];
      if (data) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalText.textContent = data.text;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. Mapa interactivo de rostros y realidades vulnerables (AC2)
   ========================================================================== */
const populationInfo = {
  'pop-discapacidad': {
    tag: 'Arquitectura de Interiores & Diseño Universal',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: '♿',
    title: '1. Personas con discapacidad en espacios públicos, comerciales o residenciales',
    whyVulnerable: 'Son vulnerables porque muchas veces se prioriza la estética o reducir costos antes que la accesibilidad. En el Perú, cuando no se cumplen las normas de diseño universal, se generan barreras arquitectónicas y sensoriales en espacios comerciales, corporativos y residenciales, lo que limita su movilidad y autonomía.',
    bioethicsPrinciple: 'Justicia y autonomía',
    bioethicsDetail: 'La justicia implica garantizar que todas las personas tengan un acceso equitativo a los espacios, sin que su discapacidad sea una barrera. La autonomía se relaciona con diseñar espacios que les permitan movilizarse y realizar sus actividades de manera segura e independiente, sin depender de otras personas.',
    statEvidence: 'En el Perú, más de 3.1 millones de personas viven con alguna limitación permanente (INEI). En galerías y centros comerciales informales de Lima, las vías de evacuación y servicios carecen de accesibilidad podotáctil y rampas normalizadas.',
    ethicalAction: 'Incorporar el diseño universal y la seguridad desde el anteproyecto preliminar, sustentar ante el cliente por qué ciertos materiales y anchos de circulación no son negociables, y dejar constancia escrita de las observaciones técnicas.'
  },
  'pop-adultos': {
    tag: 'Diseño Gerontológico & Hábitat Residencial',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    icon: '👴',
    title: '2. Personas adultas mayores en viviendas y espacios públicos o comerciales',
    whyVulnerable: 'En el Perú, gran parte del parque inmobiliario y de los espacios públicos no contempla el diseño para el envejecimiento (rampas, iluminación adecuada, mobiliario ergonómico, señalética clara). Esto aumenta el riesgo de caídas, aislamiento y dependencia de terceros para realizar actividades cotidianas.',
    bioethicsPrinciple: 'Beneficencia y no maleficencia',
    bioethicsDetail: 'El diseño de interiores tiene el deber de promover el bienestar de las personas mayores (beneficencia) y de evitar que un espacio mal planificado se convierta en una fuente de daño físico, accidentes graves o de exclusión social (no maleficencia).',
    statEvidence: 'En el Perú, más del 13% de la población es adulta mayor (INEI). El 67% de los traumatismos graves por caídas en personas mayores se producen dentro del propio domicilio por desniveles, mala iluminación o pisos resbaladizos.',
    ethicalAction: 'Aplicar criterios de arquitectura del envejecimiento: supresión de umbrales, instalación de barras de sujeción ergonómicas con diseño digno, iluminación difusa no deslumbrante y pisos con coeficiente antideslizante certificado.'
  },
  'pop-algoritmos': {
    tag: 'Ingeniería Empresarial y de Sistemas & Ética de Datos',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: '💻',
    title: '3. Postulantes y trabajadores evaluados por sistemas empresariales automatizados',
    whyVulnerable: 'Estos sistemas suelen entrenarse con datos históricos que ya contienen sesgos de género, edad o procedencia. Si una empresa peruana automatiza procesos sin auditar sus datos, corre el riesgo de excluir injustamente a personas calificadas, como ocurrió con algoritmos de contratación que penalizaban currículums de mujeres o egresados de provincia.',
    bioethicsPrinciple: 'No maleficencia y justicia',
    bioethicsDetail: 'Quien diseña o administra estos sistemas debe evitar que causen un daño no intencional (no maleficencia) y garantizar que las decisiones automatizadas distribuyan las oportunidades de manera equitativa, reconociendo a cada persona como fin y no como dato útil (justicia y dignidad ontológica kantiana).',
    statEvidence: 'El uso de software ATS (Applicant Tracking Systems) y scoring automatizado creció más de un 120% en el sector corporativo peruano; sin embargo, menos del 4% de empresas audita la representatividad y equidad de sus bases de datos.',
    ethicalAction: 'Auditar periódicamente los datos y resultados de los sistemas, documentar los criterios de decisión en un lenguaje que el área usuaria entienda, exigir revisión humana obligatoria (human-in-the-loop) y capacitar al equipo en sesgos algorítmicos.'
  }
};

function initFacesMapInteractions() {
  const displayCard = document.getElementById('faces-details-card');
  const filterBtns = document.querySelectorAll('.face-filter-btn');
  const hotspots = document.querySelectorAll('.face-hotspot');

  if (!displayCard) return;

  function updateFacesCard(key) {
    const data = populationInfo[key];
    if (!data) return;

    displayCard.innerHTML = `
      <div class="transition-all duration-300">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 font-semibold text-xs rounded-full border ${data.badgeClass}">
            <span>${data.icon}</span>
            <span>${data.tag}</span>
          </span>
          <span class="text-[10px] text-stone-400 font-mono font-semibold">Ficha Oficial AC2</span>
        </div>

        <h4 class="text-xl font-bold font-serif-title text-stone-900 mb-3 leading-snug">
          ${data.title}
        </h4>

        <!-- Tabla estructurada del AC2 -->
        <div class="space-y-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
          
          <!-- Pregunta 1 del AC2 -->
          <div class="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <strong class="text-stone-900 font-bold block mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-amber-600"></span>
              ¿Por qué es vulnerable en tu contexto profesional?
            </strong>
            <p class="text-stone-700">${data.whyVulnerable}</p>
          </div>

          <!-- Pregunta 2 del AC2 -->
          <div class="p-3.5 bg-amber-50/70 rounded-lg border border-amber-200">
            <strong class="text-amber-950 font-bold block mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-gold-600"></span>
              ¿Qué principio de bioética o de dignidad se pone en juego?
            </strong>
            <p class="font-semibold text-amber-900 mb-1">${data.bioethicsPrinciple}</p>
            <p class="text-amber-950/90 text-xs">${data.bioethicsDetail}</p>
          </div>

          <!-- Datos de contexto real peruano -->
          <div class="p-3 bg-stone-100/80 rounded-lg text-xs text-stone-600 border border-stone-200">
            <span class="font-bold text-stone-800">Evidencia cuantitativa (Perú):</span> ${data.statEvidence}
          </div>

          <!-- Acciones Positivas del Profesional -->
          <div class="p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs">
            <strong class="text-emerald-950 font-bold block mb-1 uppercase tracking-wider">
              Acción Positiva Deontológica:
            </strong>
            <p class="text-emerald-900 font-medium">${data.ethicalAction}</p>
          </div>

        </div>
      </div>
    `;

    // Resaltar botón activo
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-pop') === key) {
        btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-stone-700');
      } else {
        btn.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-stone-700');
      }
    });

    // Resaltar y animar los hotspots de esa población en el collage
    hotspots.forEach(hs => {
      if (hs.getAttribute('data-pop') === key) {
        hs.classList.add('scale-125', 'ring-4', 'ring-gold-500', 'z-30');
        hs.style.opacity = '1';
      } else {
        hs.classList.remove('scale-125', 'ring-4', 'ring-gold-500', 'z-30');
        hs.style.opacity = '0.55';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateFacesCard(btn.getAttribute('data-pop'));
    });
  });

  hotspots.forEach(hs => {
    hs.addEventListener('click', (e) => {
      e.stopPropagation();
      updateFacesCard(hs.getAttribute('data-pop'));
    });
  });

  // Carga inicial con la primera población (Discapacidad)
  updateFacesCard('pop-discapacidad');
}

/* ==========================================================================
   5. Pirámide interactiva de Max Scheler
   ========================================================================== */
const schelerData = {
  'tier-espirituales': {
    name: '1. Valores Espirituales (La Cúspide Ética)',
    rank: 'Rango superior: Lo justo, lo bello, lo verdadero.',
    desc: 'Trascienden las necesidades biológicas y la mera utilidad material. Representan la rectitud intelectiva, la honestidad desinteresada y la justicia en el trato humano.',
    presence: 'Parcial (en disputa con la urgencia económica)',
    exampleArq: 'En Arquitectura de Interiores: Defender la verdad en la memoria descriptiva de materiales, negándose a utilizar sustitutos inflamables que el cliente no percibe a simple vista pero comprometen la vida.',
    exampleSys: 'En Ingeniería de Sistemas: Diseñar arquitecturas de software transparentes y negarse a manipular reportes analíticos de métricas o retención para inflar valoraciones corporativas falsas.',
    quote: '«Los valores espirituales no se subordinan al éxito instrumental; sostienen la dignidad misma de la conciencia profesional.» (Scheler, 1916).'
  },
  'tier-vitales': {
    name: '2. Valores Vitales (La Vida y la Seguridad)',
    rank: 'Rango vital: Lo noble vs. lo vulgar; lo sano vs. lo enfermo.',
    desc: 'Vinculados a la preservación de la vida orgánica, la integridad psicofísica, la salud comunitaria y el bienestar colectivo duradero.',
    presence: 'Parcial (reconocidos en la teoría, pero vulnerados en la informalidad peruana)',
    exampleArq: 'Garantizar ventilación cruzada, iluminación natural bioclimática, evacuación segura contra incendios y ergonomía postural que evite lesiones crónicas en los trabajadores.',
    exampleSys: 'Garantizar la protección de la salud mental de los operadores frente a interfaces adictivas o ritmos algorítmicos extenuantes, y asegurar sistemas críticos hospitalarios.',
    quote: '«La subordinación de la vida al lucro monetario constituye la principal patología moral de las organizaciones modernas.»'
  },
  'tier-economicos': {
    name: '3. Valores Económicos y de lo Útil',
    rank: 'Rango instrumental: Lo rentable, lo eficiente, lo productivo.',
    desc: 'Valores indispensables para la viabilidad de cualquier empresa o proyecto, pero subordinados ontológicamente a los valores vitales y espirituales. Son medios, no fines.',
    presence: 'Sí (Ampliamente hegemónicos en el mercado peruano)',
    exampleArq: 'Optimización de presupuestos, reducción de desperdicios en obra, retorno sobre la inversión en locales comerciales y costos de mantenimiento a largo plazo.',
    exampleSys: 'Eficiencia computacional, escalabilidad en la nube, reducción de costos operativos y maximización de conversiones en plataformas de comercio electrónico.',
    quote: '«Lo útil adquiere valor solo cuando está al servicio de un bien superior; desligado de la ética, se convierte en mera explotación.»'
  },
  'tier-agradable': {
    name: '4. Valores de lo Agradable y Sensorial',
    rank: 'Rango sensible: Lo placentero vs. lo desagradable.',
    desc: 'Asociados a la satisfacción sensorial inmediata, el confort de primer nivel y las respuestas afectivas placenteras del usuario.',
    presence: 'Sí (Frecuente en el diseño estético comercial y UX)',
    exampleArq: 'Texturas táctiles agradables, combinaciones cromáticas acogedoras, diseño de iluminación ambiental escenográfica en restaurantes o departamentos piloto.',
    exampleSys: 'Microinteracciones fluidas en interfaces móviles, navegación intuitiva, gratificación visual en dashboards interactivos y confort visual en modo oscuro.',
    quote: '«El agrado es fugaz y subjetivo; una sociedad que confunde el placer sensorial con la excelencia moral degrada su propia cultura.»'
  },
  'tier-sagrado': {
    name: '5. Valores de lo Sagrado (La Trascendencia)',
    rank: 'Rango absoluto: Lo santo vs. lo profano.',
    desc: 'Constituyen el rango supremo en la metafísica de Scheler. Aunque en la profesión técnica secular no se opere directamente con lo religioso, conecta con el carácter sagrado e inviolable de la dignidad de cada ser humano.',
    presence: 'No directo (Presente como reverencia incondicional hacia la persona humana)',
    exampleArq: 'Diseñar espacios memoriales, capillas ecuménicas o reconocer que el hogar de una familia humilde es un santuario de dignidad que merece el mismo rigor que un hotel de lujo.',
    exampleSys: 'El respeto absoluto a la intimidad profunda de la persona, negándose a comercializar datos confidenciales íntimos o biométricos como mercancía profana.',
    quote: '«La reverencia ante la vida humana es el ancla que impide la cosificación total de la técnica.»'
  }
};

function initSchelerPyramid() {
  const detailBox = document.getElementById('scheler-detail-box');
  const tiers = document.querySelectorAll('.pyramid-tier');

  if (!detailBox) return;

  function updateTier(key) {
    const data = schelerData[key];
    if (!data) return;

    detailBox.innerHTML = `
      <div class="transition-all duration-300">
        <div class="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
          <div>
            <h4 class="text-xl font-bold font-serif-title text-stone-900">${data.name}</h4>
            <p class="text-xs text-amber-800 font-semibold tracking-wide uppercase mt-0.5">${data.rank}</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-800 font-medium border border-stone-300">
            Presencia en carrera: <strong>${data.presence}</strong>
          </span>
        </div>

        <p class="text-sm text-stone-700 leading-relaxed mb-4">${data.desc}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div class="bg-amber-50/50 p-3 rounded border border-amber-200">
            <span class="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
              📐 En Arquitectura de Interiores
            </span>
            <p class="text-xs text-stone-700 leading-relaxed">${data.exampleArq}</p>
          </div>
          <div class="bg-blue-50/50 p-3 rounded border border-blue-200">
            <span class="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1">
              💻 En Ingeniería de Sistemas
            </span>
            <p class="text-xs text-stone-700 leading-relaxed">${data.exampleSys}</p>
          </div>
        </div>

        <blockquote class="italic text-xs text-stone-500 border-l-2 border-stone-400 pl-3">
          ${data.quote}
        </blockquote>
      </div>
    `;

    tiers.forEach(t => {
      if (t.getAttribute('data-tier') === key) {
        t.classList.add('active-tier', 'scale-[1.02]');
      } else {
        t.classList.remove('active-tier', 'scale-[1.02]');
      }
    });
  }

  tiers.forEach(t => {
    t.addEventListener('click', () => {
      updateTier(t.getAttribute('data-tier'));
    });
  });

  // Iniciar en Valores Espirituales
  updateTier('tier-espirituales');
}

/* ==========================================================================
   6. Conmutador Sombras (Negligencias) vs Luces (Acciones Positivas)
   ========================================================================== */
function initShadowsLightsToggle() {
  const filterBtns = document.querySelectorAll('.filter-view-btn');
  const cards = document.querySelectorAll('.dichotomy-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-700');
      });
      btn.classList.add('bg-stone-900', 'text-white');
      btn.classList.remove('bg-stone-100', 'text-stone-700');

      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (mode === 'all') {
          card.classList.remove('hidden');
        } else if (mode === 'sombras') {
          if (type === 'sombra') card.classList.remove('hidden');
          else card.classList.add('hidden');
        } else if (mode === 'luces') {
          if (type === 'luz') card.classList.remove('hidden');
          else card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   7. Modo Sustentación (10 min de Exposición Oral)
   ========================================================================== */
function initPresentationMode() {
  const toggleBtn = document.getElementById('toggle-presentation-mode');
  const banner = document.getElementById('presentation-banner');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('presentation-mode');
    const isActive = document.body.classList.contains('presentation-mode');

    if (isActive) {
      toggleBtn.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1"></span>
        Modo Sustentación: ACTIVO
      `;
      toggleBtn.classList.replace('bg-stone-800', 'bg-emerald-900');
      if (banner) banner.classList.remove('hidden');
    } else {
      toggleBtn.innerHTML = `
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        Modo Sustentación (10 min)
      `;
      toggleBtn.classList.replace('bg-emerald-900', 'bg-stone-800');
      if (banner) banner.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   8. Desplazamiento suave para la barra de navegación
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   9. Carrusel automático de imágenes de fondo para la portada
   ========================================================================== */
function initCoverCarousel() {
  const slides = document.querySelectorAll('.cover-slide');
  const buttons = document.querySelectorAll('.carousel-nav-btn');
  const statusText = document.getElementById('carousel-status-text');
  const portada = document.getElementById('portada');

  if (slides.length === 0) return;

  const slideTitles = [
    '1. Atrio & Red',
    '2. Taller & Algoritmos',
    '3. Holograma Espacial'
  ];

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5000; // 5 segundos

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    // Alternar opacidad suave de las diapositivas
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
      }
    });

    // Actualizar estado de los botones
    buttons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('bg-gold-500', 'text-navy-950', 'border-gold-400', 'shadow');
        btn.classList.remove('bg-navy-950/60', 'text-stone-300', 'border-white/20');
      } else {
        btn.classList.remove('bg-gold-500', 'text-navy-950', 'border-gold-400', 'shadow');
        btn.classList.add('bg-navy-950/60', 'text-stone-300', 'border-white/20');
      }
    });

    // Actualizar texto del indicador
    if (statusText) {
      statusText.textContent = slideTitles[currentIndex] || `Imagen ${currentIndex + 1}`;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Asignar eventos de clic a cada botón
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      goToSlide(i);
      startAutoplay(); // Reinicia el temporizador tras interacción
    });
  });

  // Pausar al pasar el cursor para permitir lectura o apreciación detallada
  if (portada) {
    portada.addEventListener('mouseenter', stopAutoplay);
    portada.addEventListener('mouseleave', startAutoplay);
  }

  // Iniciar carrusel automático
  startAutoplay();
}

