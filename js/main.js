/**
 * Huella Profesional - Manifiesto de Identidad Ética (EC1)
 * Lógica interactiva: Hotspots, Mapa Geográfico SVG, Pirámide de Scheler, Luces/Sombras y Contador en Vivo.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
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
   1. Detector de sección activa en la barra de navegación (Scrollspy con rayita dorada)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 180;
    let currentId = 'portada';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = id;
      }
    });

    if (window.scrollY < 120) {
      currentId = 'portada';
    }

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav, { passive: true });
  updateActiveNav();
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
  // Las Meninas (Interdisciplinario: Arquitectura de Interiores & Ing. Empresarial y de Sistemas)
  'meninas-1': {
    title: '1. El bastidor oculto: Calidad técnica e infraestructura invisible',
    subtitle: '',
    text: `
      <p class="mb-2 text-stone-700">El pintor trabaja detrás de un imponente bastidor de espaldas al espectador. Esto nos recuerda que lo más importante está en lo que no se ve a simple vista:</p>
      <div class="space-y-2">
        <div class="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
          <strong class="text-amber-900 font-bold block text-xs mb-1">🏛️ Arquitectura de Interiores:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">No basta con que un espacio se vea bonito; lo principal es que sea seguro, esté bien construido y cuide la vida de quienes lo usan.</p>
        </div>
        <div class="bg-sky-50/80 p-3 rounded-lg border border-sky-200">
          <strong class="text-sky-900 font-bold block text-xs mb-1">💻 Ingeniería Empresarial y de Sistemas:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">La estructura interna del software debe ser firme y confiable para evitar fallas y proteger siempre los datos de las personas.</p>
        </div>
      </div>
    `
  },
  'meninas-2': {
    title: '2. El espejo al fondo: Las personas y usuarios en el centro',
    subtitle: '',
    text: `
      <p class="mb-2 text-stone-700">El espejo al fondo refleja a quienes observan la escena, recordándonos que el centro de todo proyecto siempre son las personas:</p>
      <div class="space-y-2">
        <div class="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
          <strong class="text-amber-900 font-bold block text-xs mb-1">🏛️ Arquitectura de Interiores:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">Un espacio no se diseña para el gusto personal de quien lo crea, sino para brindar comodidad, salud y bienestar diario a quienes van a vivirlo.</p>
        </div>
        <div class="bg-sky-50/80 p-3 rounded-lg border border-sky-200">
          <strong class="text-sky-900 font-bold block text-xs mb-1">💻 Ingeniería Empresarial y de Sistemas:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">La tecnología y los sistemas deben facilitar el trabajo y la vida diaria, tratando siempre al usuario con respeto y como la prioridad principal.</p>
        </div>
      </div>
    `
  },
  'meninas-3': {
    title: '3. El espacio compartido: Inclusión, accesibilidad universal y equidad',
    subtitle: '',
    text: `
      <p class="mb-2 text-stone-700">En el salón conviven personas de distintas edades y características, lo que nos enseña el valor de la inclusión y la igualdad:</p>
      <div class="space-y-2">
        <div class="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
          <strong class="text-amber-900 font-bold block text-xs mb-1">🏛️ Arquitectura de Interiores:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">Los espacios deben ser accesibles para todos, eliminando barreras y facilitando el paso seguro de niños, adultos mayores y personas con discapacidad.</p>
        </div>
        <div class="bg-sky-50/80 p-3 rounded-lg border border-sky-200">
          <strong class="text-sky-900 font-bold block text-xs mb-1">💻 Ingeniería Empresarial y de Sistemas:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">Las plataformas y aplicaciones deben ser fáciles de usar para cualquier persona y funcionar con justicia, sin discriminar a nadie.</p>
        </div>
      </div>
    `
  },
  'meninas-4': {
    title: '4. La puerta abierta: Transparencia y conexión con la sociedad',
    subtitle: '',
    text: `
      <p class="mb-2 text-stone-700">La puerta abierta y luminosa conecta el interior con el exterior, recordándonos nuestro compromiso con la comunidad:</p>
      <div class="space-y-2">
        <div class="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
          <strong class="text-amber-900 font-bold block text-xs mb-1">🏛️ Arquitectura de Interiores:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">El diseño de un espacio no debe aislarse; debe respetar su entorno, cuidar el medio ambiente y aportar de manera positiva a la comunidad.</p>
        </div>
        <div class="bg-sky-50/80 p-3 rounded-lg border border-sky-200">
          <strong class="text-sky-900 font-bold block text-xs mb-1">💻 Ingeniería Empresarial y de Sistemas:</strong>
          <p class="text-stone-700 text-xs leading-relaxed">El trabajo tecnológico debe ser transparente y honesto. Nunca se deben ocultar errores o fallas que puedan perjudicar a las personas.</p>
        </div>
      </div>
    `
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
        if (data.subtitle && data.subtitle.trim() !== '') {
          modalSubtitle.textContent = data.subtitle;
          modalSubtitle.classList.remove('hidden');
        } else {
          modalSubtitle.textContent = '';
          modalSubtitle.classList.add('hidden');
        }
        modalText.innerHTML = data.text;
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
    whyVulnerable: 'Muchas veces se prioriza la estética o reducir costos antes que la accesibilidad. Al no aplicar normas de diseño universal, se generan obstáculos en tiendas, oficinas o viviendas que limitan su movilidad e independencia.',
    bioethicsPrinciple: 'Justicia y autonomía',
    bioethicsDetail: 'La justicia exige un acceso libre de barreras para todos; la autonomía busca que las personas puedan trasladarse y realizar sus actividades de manera segura e independiente.',
    statEvidence: 'En el Perú, más de 3.1 millones de personas viven con alguna limitación permanente (INEI). En muchos comercios y galerías faltan rampas reglamentarias y vías seguras de evacuación.',
    ethicalAction: 'Diseñar con accesibilidad desde el inicio, sustentar que la seguridad y el ancho de paso no son negociables, y dejar constancia escrita de las observaciones técnicas.'
  },
  'pop-adultos': {
    tag: 'Diseño Gerontológico & Hábitat Residencial',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    icon: '👴',
    title: '2. Personas adultas mayores en viviendas y espacios públicos o comerciales',
    whyVulnerable: 'Gran parte de las viviendas y espacios públicos no están adaptados al envejecimiento (falta de rampas, buena iluminación y pisos seguros), lo que aumenta el peligro de caídas y la pérdida de autonomía.',
    bioethicsPrinciple: 'Beneficencia y no maleficencia',
    bioethicsDetail: 'El diseño debe promover activamente su bienestar (beneficencia) y evitar que un espacio mal planificado cause accidentes graves o aislamiento físico (no maleficencia).',
    statEvidence: 'En el Perú, más del 13% de la población es adulta mayor (INEI). La gran mayoría de caídas graves ocurren dentro del propio domicilio por desniveles, mala iluminación o pisos resbaladizos.',
    ethicalAction: 'Diseñar sin desniveles peligrosos, colocar barras de apoyo seguras, garantizar iluminación clara no deslumbrante y utilizar pisos antideslizantes certificados.'
  },
  'pop-algoritmos': {
    tag: 'Ingeniería Empresarial y de Sistemas & Ética de Datos',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: '💻',
    title: '3. Postulantes y trabajadores evaluados por sistemas empresariales automatizados',
    whyVulnerable: 'Los sistemas automatizados pueden entrenarse con datos históricos con sesgos de género, edad o procedencia, descartando injustamente a postulantes calificados sin una debida supervisión.',
    bioethicsPrinciple: 'No maleficencia y justicia',
    bioethicsDetail: 'Se debe evitar generar perjuicios injustos (no maleficencia) y garantizar oportunidades equitativas, tratando a cada postulante como persona y no como un simple dato (justicia y dignidad kantiana).',
    statEvidence: 'En el Perú, el uso de sistemas automatizados de selección creció más de un 120% en empresas (MTPE, 2023); sin embargo, muy pocas auditan la equidad real de sus modelos y bases de datos.',
    ethicalAction: 'Auditar periódicamente los algoritmos, documentar con claridad los criterios de decisión y exigir siempre una revisión humana antes de definir un resultado final.'
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
          <span class="text-[10px] text-stone-400 font-mono font-semibold"></span>
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
          <div class="p-3.5 bg-stone-100/80 rounded-lg border border-stone-200">
            <strong class="text-stone-900 font-bold block mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span>
              Evidencia cuantitativa:
            </strong>
            <p class="text-stone-700">${data.statEvidence}</p>
          </div>

          <!-- Acciones Positivas del Profesional -->
          <div class="p-3.5 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs">
            <strong class="text-emerald-950 font-bold block mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              Acción positiva deontológica:
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
  'tier-agradable': {
    name: '1. Valores de lo Agradable o Sensorial',
    rank: 'Rango sensible: Lo placentero vs. lo desagradable.',
    desc: 'Asociados a la satisfacción sensorial inmediata, el confort de primer nivel y las respuestas afectivas placenteras del usuario.',
    presence: 'Sí (Frecuente en el diseño estético comercial y UX)',
    exampleArq: 'Texturas táctiles agradables, combinaciones cromáticas acogedoras, diseño de iluminación ambiental escenográfica en restaurantes o departamentos piloto.',
    exampleSys: 'Microinteracciones fluidas en interfaces móviles, navegación intuitiva, gratificación visual en dashboards interactivos y confort visual en modo oscuro.',
    quote: '«El agrado es fugaz y subjetivo; una sociedad que confunde el placer sensorial con la excelencia moral degrada su propia cultura.»'
  },
  'tier-economicos': {
    name: '2. Valores Económicos y de lo Útil',
    rank: 'Rango instrumental: Lo rentable, lo eficiente, lo productivo.',
    desc: 'Valores indispensables para la viabilidad de cualquier empresa o proyecto, pero subordinados ontológicamente a los valores vitales y espirituales. Son medios, no fines.',
    presence: 'Sí (Ampliamente hegemónicos en el mercado peruano)',
    exampleArq: 'Optimización de presupuestos, reducción de desperdicios en obra, retorno sobre la inversión en locales comerciales y costos de mantenimiento a largo plazo.',
    exampleSys: 'Eficiencia computacional, escalabilidad en la nube, reducción de costos operativos y maximización de conversiones en plataformas de comercio electrónico.',
    quote: '«Lo útil adquiere valor solo cuando está al servicio de un bien superior; desligado de la ética, se convierte en mera explotación.»'
  },
  'tier-vitales': {
    name: '3. Valores Vitales',
    rank: 'Rango vital: Lo noble vs. lo vulgar; lo sano vs. lo enfermo.',
    desc: 'Vinculados a la preservación de la vida orgánica, la integridad psicofísica, la salud comunitaria y el bienestar colectivo duradero.',
    presence: 'Parcial (reconocidos en la teoría, pero vulnerados en la informalidad peruana)',
    exampleArq: 'Garantizar ventilación cruzada, iluminación natural bioclimática, evacuación segura contra incendios y ergonomía postural que evite lesiones crónicas en los trabajadores.',
    exampleSys: 'Garantizar la protección de la salud mental de los operadores frente a interfaces adictivas o ritmos algorítmicos extenuantes, y asegurar sistemas críticos hospitalarios.',
    quote: '«La subordinación de la vida al lucro monetario constituye la principal patología moral de las organizaciones modernas.»'
  },
  'tier-espirituales': {
    name: '4. Valores Espirituales',
    rank: 'Rango superior: Lo justo, lo bello, lo verdadero.',
    desc: 'Trascienden las necesidades biológicas y la mera utilidad material. Representan la rectitud intelectiva, la honestidad desinteresada y la justicia en el trato humano.',
    presence: 'Parcial (en disputa con la urgencia económica)',
    exampleArq: 'En Arquitectura de Interiores: Defender la verdad en la memoria descriptiva de materiales, negándose a utilizar sustitutos inflamables que el cliente no percibe a simple vista pero comprometen la vida.',
    exampleSys: 'En Ingeniería de Sistemas: Diseñar arquitecturas de software transparentes y negarse a manipular reportes analíticos de métricas o retención para inflar valoraciones corporativas falsas.',
    quote: '«Los valores espirituales no se subordinan al éxito instrumental; sostienen la dignidad misma de la conciencia profesional.» (Scheler, 1916).'
  },
  'tier-sagrado': {
    name: '5. Valores de lo Sagrado',
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
   6. Infografía: Mapa de Negligencias Éticas y Acciones Positivas
   ========================================================================== */
function initShadowsLightsToggle() {
  const filterBtns = document.querySelectorAll('.filter-sit-btn');
  const rows = document.querySelectorAll('.infographic-row');
  const cellsSombras = document.querySelectorAll('.cell-sombras');
  const cellsLuces = document.querySelectorAll('.cell-luces');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white');
        b.classList.add('bg-stone-50', 'text-stone-700');
      });
      btn.classList.add('bg-stone-900', 'text-white');
      btn.classList.remove('bg-stone-50', 'text-stone-700');

      if (filter === 'all') {
        rows.forEach(r => {
          r.classList.remove('hidden', 'row-dimmed');
        });
        cellsSombras.forEach(c => c.classList.remove('infographic-cell-dimmed'));
        cellsLuces.forEach(c => c.classList.remove('infographic-cell-dimmed'));
      } else if (filter === 'sombras') {
        rows.forEach(r => {
          r.classList.remove('hidden', 'row-dimmed');
        });
        cellsSombras.forEach(c => c.classList.remove('infographic-cell-dimmed'));
        cellsLuces.forEach(c => c.classList.add('infographic-cell-dimmed'));
      } else if (filter === 'luces') {
        rows.forEach(r => {
          r.classList.remove('hidden', 'row-dimmed');
        });
        cellsLuces.forEach(c => c.classList.remove('infographic-cell-dimmed'));
        cellsSombras.forEach(c => c.classList.add('infographic-cell-dimmed'));
      } else {
        // filter by situation (sit-1, sit-2, sit-3)
        rows.forEach(r => {
          const sitId = r.getAttribute('data-sit-id');
          if (sitId === filter) {
            r.classList.remove('hidden', 'row-dimmed');
          } else {
            r.classList.add('hidden');
          }
        });
        cellsSombras.forEach(c => c.classList.remove('infographic-cell-dimmed'));
        cellsLuces.forEach(c => c.classList.remove('infographic-cell-dimmed'));
      }
    });
  });

  const modal = document.getElementById('infographic-lightbox-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeInfographicModal();
    });
  }
}

function switchInfographicView(mode) {
  const interactiveWrapper = document.getElementById('view-interactive-wrapper');
  const originalWrapper = document.getElementById('view-original-wrapper');
  const tabInteractive = document.getElementById('tab-interactive-view');
  const tabOriginal = document.getElementById('tab-original-view');
  const filtersBar = document.getElementById('interactive-filters-bar');

  if (!interactiveWrapper || !originalWrapper) return;

  if (mode === 'interactive') {
    interactiveWrapper.classList.remove('hidden');
    originalWrapper.classList.add('hidden');
    if (filtersBar) filtersBar.classList.remove('hidden');

    tabInteractive.classList.add('bg-stone-900', 'text-white');
    tabInteractive.classList.remove('text-stone-700');
    tabOriginal.classList.remove('bg-stone-900', 'text-white');
    tabOriginal.classList.add('text-stone-700');
  } else {
    interactiveWrapper.classList.add('hidden');
    originalWrapper.classList.remove('hidden');
    if (filtersBar) filtersBar.classList.add('hidden');

    tabOriginal.classList.add('bg-stone-900', 'text-white');
    tabOriginal.classList.remove('text-stone-700');
    tabInteractive.classList.remove('bg-stone-900', 'text-white');
    tabInteractive.classList.add('text-stone-700');
  }
}

function openInfographicModal() {
  const modal = document.getElementById('infographic-lightbox-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeInfographicModal() {
  const modal = document.getElementById('infographic-lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
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
    anchor.addEventListener('click', function (e) {
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

