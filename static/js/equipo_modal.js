// Base path del servidor: vacio en local, "/tutawayta" en produccion.
const equipoBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
const equipoAssetUrl = (path) => (path && path.startsWith('/') && !path.startsWith('//')) ? equipoBasePath + path : path;

// ==========================================
// 1. TEAM TRANSLATIONS (DICCIONARIO MULTI-IDIOMA INDEPENDIENTE)
// ==========================================
const teamModalTranslations = {
  es: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — Presidenta y Gestión Estratégica",
      desc: "Fundadora y líder encargada de articular la visión de la asociación, coordinar las políticas internas y abrir canales de diálogo con el sector público y privado para consolidar el crecimiento sostenible en Cañete.",
      points: [
        "Lideró el proceso de formalización legal y jurídica de la asociación Tuta Wayta.",
        "Desarrolla alianzas estratégicas con ministerios y entidades gubernamentales de agricultura.",
        "Supervisa la transparencia en la toma de decisiones y asambleas generales con los 30 socios.",
        "Representante legal oficial de la marca ante mercados comerciales competitivos."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vicepresidenta y Visión Comercial",
      desc: "Productora con amplia trayectoria en el campo que se encarga de balancear los requerimientos técnicos de la siembra con el posicionamiento comercial del producto en el mercado nacional e internacional.",
      points: [
        "Más de 6 años de experiencia directa en el cultivo especializado de variedades de pitahaya.",
        "Diseño y apertura de canales logísticos para la distribución directa sin intermediarios.",
        "Coordinadora de la participación de la asociación en ferias y ruedas de negocios internacionales.",
        "Supervisora del control de calidad preventivo durante el proceso de post-cosecha."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Tesorero y Control de Eficiencia",
      desc: "Encargado de velar por la salud financiera de la asociación, ejecutando auditorías internas y administrando los presupuestos de manera transparente y eficiente para el beneficio colectivo.",
      points: [
        "Optimización del presupuesto anual para la compra corporativa de insumos orgánicos.",
        "Administración y rendición de cuentas clara en cada asamblea mediante reportes financieros.",
        "Evaluación del retorno de inversión (ROI) para la implementación de tecnologías de riego.",
        "Gestión del fondo común destinado a emergencias agrícolas o climáticas de los socios."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Coordinador de Producción Agrícola",
      desc: "Responsable técnico de estandarizar los procesos de cultivo en las parcelas de todos los socios, garantizando que el fruto cumpla con los calibres y la calidad requeridos para exportación.",
      points: [
        "Diseño e implementación de calendarios unificados de fertilización 100% orgánica.",
        "Programación y zonificación de cosechas escalonadas para mantener un flujo de oferta constante.",
        "Dirección de capacitaciones técnicas en el campo sobre poda, guiado y manejo del cultivo.",
        "Especialista en control biológico preventivo de plagas nativas del valle."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Relaciones Comunitarias y Cooperativismo",
      desc: "Encargada de fortalecer el tejido social de la asociación, promoviendo los valores del comercio justo, la equidad y el bienestar de todas las familias agricultoras del valle.",
      points: [
        "Organización de talleres participativos e integracionales para los socios y sus familias.",
        "Gestión de programas de bienestar social y desarrollo sostenible en la comunidad de Cañete.",
        "Mediación y resolución pacífica de conflictos internos dentro de la cadena productiva.",
        "Promotora de las normativas internacionales de Comercio Justo (Fair Trade)."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Promotor de Innovación y Mercados",
      desc: "Líder enfocada en el futuro tecnológico del agro, encargada de buscar nuevas certificaciones de calidad internacional y adaptar empaques bio-amigables para conquistar mercados premium.",
      points: [
        "Investigación y adecuación de estándares para la obtención de la certificación Global G.A.P.",
        "Desarrollo y testeo de empaques eco-amigables que extienden la vida útil de la fruta.",
        "Análisis y monitoreo de tendencias globales en el consumo de superfrutas orgánicas.",
        "Vinculación con universidades y centros de desarrollo tecnológico para proyectos de innovación."
      ]
    }
  },
  en: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — President & Strategic Management",
      desc: "Founder and leader responsible for articulating the association's vision, coordinating internal policies, and opening dialogue channels with public and private sectors to consolidate sustainable growth in Cañete.",
      points: [
        "Led the legal and structural formalization process of the Tuta Wayta association.",
        "Develops strategic alliances with ministries and governmental agricultural entities.",
        "Oversees transparency in decision-making and general assemblies with the 30 partners.",
        "Official legal representative of the brand before highly competitive commercial markets."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vice President & Commercial Vision",
      desc: "Producer with a long trajectory in the field who is responsible for balancing the technical requirements of farming with the commercial positioning of the fruit in the domestic and international market.",
      points: [
        "More than 6 years of direct experience in the specialized cultivation of dragon fruit varieties.",
        "Design and development of logistical channels for direct distribution without intermediaries.",
        "Coordinator of the association's participation in international fairs and business roundtables.",
        "Supervisor of preventive quality control during the post-harvest process."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Treasurer & Efficiency Control",
      desc: "In charge of ensuring the financial health of the association, executing internal audits, and managing budgets transparently and efficiently for the collective benefit.",
      points: [
        "Optimization of the annual budget for the corporate purchase of organic inputs.",
        "Clear management and accountability in each assembly through financial reports.",
        "Evaluation of return on investment (ROI) for the implementation of irrigation technologies.",
        "Management of the common fund destined for agricultural or climatic emergencies of the members."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Agricultural Production Coordinator",
      desc: "Technical lead responsible for standardizing cultivation processes across all members' plots, ensuring that the fruit meets the sizing and quality required for export.",
      points: [
        "Design and implementation of unified calendars for 100% organic fertilization.",
        "Scheduling and zoning of staggered harvests to maintain a constant supply flow.",
        "Direction of technical field training on pruning, guiding, and crop management.",
        "Specialist in preventive biological control of pests native to the valley."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Community Relations & Cooperativism",
      desc: "Responsible for strengthening the association's social fabric, promoting fair trade values, equity, and the well-being of all farming families in the valley.",
      points: [
        "Organization of participatory and integration workshops for members and their families.",
        "Management of social welfare and sustainable development programs in the Cañete community.",
        "Mediation and peaceful resolution of internal conflicts within the production chain.",
        "Promoter of international Fair Trade regulations and standards."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Innovation & Markets Promoter",
      desc: "Future-focused agricultural technology leader, responsible for seeking new international quality certifications and adapting bio-friendly packaging to conquer premium markets.",
      points: [
        "Research and adaptation of standards to obtain the Global G.A.P. certification.",
        "Development and testing of eco-friendly packaging that extends the shelf life of the fruit.",
        "Analysis and monitoring of global trends in the consumption of organic superfruits.",
        "Liaison with universities and technological centers for innovation projects."
      ]
    }
  },
  zh: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — 主席兼战略管理",
      desc: "创始人兼核心领导者，负责阐明协会的宏伟愿景、协调内部政策，并开辟与公私部门的对话渠道，以巩固卡涅特（Cañete）农业的可持续增长。",
      points: [
        "主导并完成了 Tuta Wayta 协会官方及法律层面的正规化注册流程。",
        "积极发展与秘鲁农业部及各级政府农业职能实体的战略联盟。",
        "严格监督决策透明度，定期向 30 位社员召开全体大会并作汇报。",
        "作为协会法定代表人，代表品牌对接极具竞争力的海内外高端商业市场。"
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — 副主席兼商业愿景",
      desc: "在田间种植领域深耕多年的资深农业专家，主要负责平衡农作物生产的技术要求与水果在国内外的商业市场定位。",
      points: [
        "在火龙果特色品种的精细化、专业化栽培方面拥有超过 6 年的直接经验。",
        "设计并建立高效的物流渠道，实现无中间商的基地直供模式。",
        "全面统筹和协调协会参加国际水果博览会及跨国贸易对接会。",
        "在采收后处理及包装阶段，全面监管预防性质量控制流程。"
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — 财务主管兼效率管控",
      desc: "负责保障协会的财务健康与资金安全，执行严格的内部审计，透明、高效地管理各项预算以实现全体社员的共同利益。",
      points: [
        "深度优化年度预算，实现全品类大宗有机农业物资的集团化集中采购。",
        "在每届社员大会上提交清晰详实的财务报告，落实公开、透明的财务问责制。",
        "对现代化节水灌溉技术和设备投入进行严谨的投资回报率（ROI）评估。",
        "管理协会设立的互助公共基金，用于应对农业自然灾害或突发气候异常。"
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — 农业生产总协调员",
      desc: "技术总负责人，负责将标准化种植流程落实到每位社员的土地上，确保出产的火龙果在规格、甜度和品质上完全达到出口标准。",
      points: [
        "制定并推行统一的 100% 纯天然有机肥料施肥周期与田间管理日程表。",
        "对不同梯度的果园进行错峰采收规划，确保全年在市场上维持稳定的货源供应。",
        "在田间一线主持技术培训，手把手指导农户进行果树修剪、牵引及作物维护。",
        "山谷原生病虫害生物防治领域的专家，坚持实施零化学农药化秘防御。"
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — 社区关系兼合作社推进员",
      desc: "致力于巩固协会内部以及与当地社区的社会纽带，积极倡导公平贸易价值观、社员平等以及山谷中所有农户家庭的福祉。",
      points: [
        "为社员及其家庭成员组织开办参与式工作坊与各类凝聚力建设活动。",
        "在卡涅特社区内规划并跟进社会福利项目以及农村可持续发展计划。",
        "在生产供应链内部建立高效、和平的矛盾协调与内部纠纷仲裁机制。",
        "积极宣贯和践行国际公平贸易（Fair Trade）的规范与行业高标准。"
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — 创新推广兼全球市场开拓者",
      desc: "着眼于现代农业科技未来的先锋领导者，负责对接国际高标准质量认证，并通过改良环保生态包装助力品牌打入高端市场。",
      points: [
        "深入研究并对标国际良好农业操作规范，全力推进 Global G.A.P. 认证落地。",
        "开发并测试新型可降解生态包装，有效延长火龙果的保鲜期与货架寿命。",
        "严密监控与分析全球市场关于有机超级水果的消费趋势变化。",
        "积极对接高校及科研院所，引入智慧农业和科技强农创新项目。"
      ]
    }
  },
  de: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — Präsidentin und Strategische Leitung",
      desc: "Gründerin und Leiterin, verantwortlich für die Formulierung der Vision des Verbandes, die Koordination interner Richtlinien und die Eröffnung von Dialogkanälen mit dem öffentlichen und privaten Sektor zur Festigung des nachhaltigen Wachstums in Cañete.",
      points: [
        "Leitete den Prozess der rechtlichen und juristischen Formalisierung des Verbandes Tuta Wayta.",
        "Entwickelt strategische Allianzen mit Ministerien und Regierungsbehörden für Landwirtschaft.",
        "Überwacht die Transparenz bei der Entscheidungsfindung und den Generalversammlungen mit den 30 Mitgliedern.",
        "Offizielle gesetzliche Vertreterin der Marke vor wettbewerbsintensiven kommerziellen Märkten."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vizepräsidentin und Kommerzielle Vision",
      desc: "Produzentin mit langjähriger Erfahrung im Feld, verantwortlich für die Balance zwischen den technischen Anforderungen des Anbaus und der kommerziellen Positionierung des Produkts auf dem nationalen und internationalen Markt.",
      points: [
        "Mehr als 6 Jahre direkte Erfahrung im spezialisierten Anbau von Drachenfruchtsorten.",
        "Konzeption und Eröffnung von Logistikkanälen für den Direktvertrieb ohne Zwischenhändler.",
        "Koordinatorin für die Teilnahme des Verbandes an internationalen Messen und Geschäftsrunden.",
        "Verantwortliche für die präventive Qualitätskontrolle während des Prozesses nach der Ernte."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Schatzmeister und Effizienzkontrolle",
      desc: "Verantwortlich für die finanzielle Gesundheit des Verbandes, die Durchführung interner Audits und die transparente und effiziente Verwaltung der Budgets zum kollektiven Nutzen.",
      points: [
        "Optimierung des Jahresbudgets für den korporativen Einkauf von biologischen Betriebsmitteln.",
        "Klare Verwaltung und Rechenschaftspflicht in jeder Versammlung durch Finanzberichte.",
        "Bewertung des Return on Investment (ROI) für die Implementierung von Bewässerungstechnologien.",
        "Verwaltung des gemeinsamen Fonds für landwirtschaftliche oder klimatische Notfälle der Mitglieder."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Koordinator der landwirtschaftlichen Produktion",
      desc: "Technischer Leiter, verantwortlich für die Standardisierung der Anbauprozesse auf den Parzellen aller Mitglieder, um sicherzustellen, dass die Früchte die für den Export erforderlichen Größen und Qualitäten erfüllen.",
      points: [
        "Konzeption und Umsetzung einheitlicher Kalender für eine 100% biologische Düngung.",
        "Planung und Zonierung gestaffelter Ernten zur Aufrechterhaltung eines konstanten Angebotsflusses.",
        "Leitung von technischen Schulungen im Feld zu Beschneidung, Führung und Pflanzenmanagement.",
        "Spezialist für die präventive biologische Bekämpfung von im Tal heimischen Schädlingen."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Gemeinschaftsbeziehungen und Genossenschaftswesen",
      desc: "Verantwortlich für die Stärkung des sozialen Gefüges des Verbandes, die Förderung der Werte des fairen Handels, der Gleichberechtigung und des Wohlergehens aller Bauernfamilien im Tal.",
      points: [
        "Organisation von partizipativen und integrativen Workshops für Mitglieder und ihre Familien.",
        "Verwaltung von Programmen für soziale Wohlfahrt und nachhaltige Entwicklung in der Gemeinschaft von Cañete.",
        "Vermittlung und friedliche Lösung interner Konflikte innerhalb der Produktionskette.",
        "Förderin internationaler Standards des fairen Handels (Fair Trade)."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Förderer für Innovation und Märkte",
      desc: "Zukunftsorientierte Führungskraft für Agrartechnologie, verantwortlich für die Suche nach neuen internationalen Qualitätszertifizierungen und die Anpassung biofreundlicher Verpackungen zur Erschließung von Premium-Märkten.",
      points: [
        "Erforschung und Anpassung von Standards zur Erlangung der Global G.A.P.-Zertifizierung.",
        "Entwicklung und Erprobung umweltfreundlicher Verpackungen, die die Haltbarkeit der Früchte verlängern.",
        "Analyse und Überwachung globaler Trends beim Konsum von biologischen Superfrüchten.",
        "Verbindung zu Universitäten und technologischen Entwicklungszentren für Innovationsprojekte."
      ]
    }
  },
  pt: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — Presidenta e Gestão Estratégica",
      desc: "Fundadora e líder encarregada de articular a visão da associação, coordenar as políticas internas e abrir canais de diálogo com o setor público e privado para consolidar o crescimento sustentável em Cañete.",
      points: [
        "Liderou o processo de formalização legal e jurídica da associação Tuta Wayta.",
        "Desenvolve alianças estratégicas com ministérios e entidades governamentais de agricultura.",
        "Supervisiona a transparência na tomada de decisões e assembleias gerais com os 30 sócios.",
        "Representante legal oficial da marca perante mercados comerciais competitivos."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vice-Presidenta e Visão Comercial",
      desc: "Produtora com ampla trajetória no campo encarregada de balancear os requisitos técnicos do plantio com o posicionamento comercial do produto no mercado nacional e internacional.",
      points: [
        "Mais de 6 anos de experiência direta no cultivo especializado de variedades de pitaia.",
        "Design e abertura de canais logísticos para a distribuição direta sem intermediários.",
        "Coordenadora da participação da associação em feiras e rodadas de negócios internacionais.",
        "Supervisora do controle de qualidade preventivo durante o processo de pós-colheita."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Tesoureiro e Controle de Eficiência",
      desc: "Encarregado de zelar pela saúde financeira da associação, executando auditorias internas e administrando os orçamentos de maneira transparente e eficiente para o benefício coletivo.",
      points: [
        "Otimização do orçamento anual para a compra corporativa de insumos orgânicos.",
        "Administração e prestação de contas clara em cada assembleia através de relatórios financeiros.",
        "Avaliação do retorno sobre o investimento (ROI) para a implementação de tecnologias de irrigação.",
        "Gestão do fundo comum destinado a emergências agrícolas ou climáticas dos sócios."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Coordenador de Produção Agrícola",
      desc: "Responsável técnico por padronizar os processos de cultivo nas parcelas de todos os sócios, garantindo que o fruto cumpra com os calibres e a qualidade exigidos para exportação.",
      points: [
        "Design e implementação de calendários unificados de fertilização 100% orgânica.",
        "Programação e zoneamento de colheitas escalonadas para manter um fluxo de oferta constante.",
        "Direção de capacitações técnicas no campo sobre poda, tutoramento e manejo do cultivo.",
        "Especialista em controle biológico preventivo de pragas nativas do vale."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Relações Comunitárias e Cooperativismo",
      desc: "Encarregada de fortalecer o tecido social da associação, promovendo os valores do comércio justo, a equidade e o bem-estar de todas as famílias agricultoras do vale.",
      points: [
        "Organização de workshops participativos e de integração para os sócios e suas famílias.",
        "Gestão de programas de bem-estar social e desenvolvimento sustentável na comunidade de Cañete.",
        "Mediação e resolução pacífica de conflitos internos dentro da cadeia produtiva.",
        "Promotora das normativas internacionais de Comércio Justo (Fair Trade)."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Promotor de Inovação e Mercados",
      desc: "Líder focada no futuro tecnológico do agronegócio, encarregada de buscar novas certificações de qualidade internacional e adaptar embalagens bioamigáveis para conquistar mercados premium.",
      points: [
        "Pesquisa e adequação de padrões para a obtenção da certificação Global G.A.P.",
        "Desenvolvimento e teste de embalagens ecoamigáveis que estendem a vida útil da fruta.",
        "Análise e monitoramento de tendências globais no consumo de superfrutas orgânicas.",
        "Vinculação com universidades e centros de desenvolvimento tecnológico para projetos de inovação."
      ]
    }
  },
  fr: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — Présidente et Gestion Stratégique",
      desc: "Fondatrice et leader chargée d'articuler la vision de l'association, de coordonner les politiques internes et d'ouvrir des canaux de dialogue avec les secteurs public et privé pour consolider la croissance durable à Cañete.",
      points: [
        "A dirigé le processus de formalisation légale et juridique de l'association Tuta Wayta.",
        "Développe des alliances stratégiques avec les ministères et les entités gouvernementales de l'agriculture.",
        "Supervise la transparence dans la prise de décision et les assemblées générales avec les 30 membres.",
        "Représentante légale officielle de la marque auprès des marchés commerciaux compétitifs."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vice-Présidente et Vision Commerciale",
      desc: "Productrice ayant une longue expérience de terrain, chargée d'équilibrer les exigences techniques de la plantation avec le positionnement commercial du produit sur les marchés nationaux et internationaux.",
      points: [
        "Plus de 6 ans d'expérience directe dans la culture spécialisée de variétés de fruits du dragon.",
        "Conception et ouverture de canaux logistiques pour la distribution directe sans intermédiaires.",
        "Coordinatrice de la participation de l'association aux salons et tables rondes d'affaires internationaux.",
        "Superviseuse du contrôle qualité préventif pendant le processus de post-récolte."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Trésorier et Contrôle de l'Efficacité",
      desc: "Chargé de veiller à la santé financière de l'association, d'exécuter les audits internes et de gérer les budgets de manière transparente et efficace pour le bénéfice collectif.",
      points: [
        "Optimisation du budget annuel pour l'achat groupé d'intrants organiques.",
        "Gestion et reddition de comptes claires à chaque assemblée au moyen de rapports financiers.",
        "Évaluation du retour sur investissement (ROI) pour la mise en œuvre des technologies d'irrigation.",
        "Gestion du fonds commun destiné aux urgences agricoles ou climatiques des membres."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Coordinateur de la Production Agricole",
      desc: "Responsable technique de la standardisation des processus de culture sur les parcelles de tous les membres, garantissant que le fruit respecte les calibres et la qualité requis pour l'exportation.",
      points: [
        "Conception et mise en œuvre de calendriers unifiés de fertilisation 100% organique.",
        "Planification et zonage des récoltes échelonnées pour maintenir un flux d'offre constant.",
        "Direction des formations techniques sur le terrain concernant la taille, le guidage et la gestion des cultures.",
        "Spécialiste du contrôle biologique préventif des ravageurs indigènes de la vallée."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Relations Communautaires et Coopérativisme",
      desc: "Chargée de renforcer le tissu social de l'association, de promouvoir les valeurs du commerce équitable, de l'équité et du bien-être de toutes les familles d'agriculteurs de la vallée.",
      points: [
        "Organisation d'ateliers participatifs et d'intégration pour les membres et leurs familles.",
        "Gestion des programmes de protection sociale et de développement durable dans la communauté de Cañete.",
        "Médiation et résolution pacifique des conflits internes au sein de la chaîne de production.",
        "Promotrice des réglementations internationales du Commerce Équitable (Fair Trade)."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Promoteur de l'Innovation et des Marchés",
      desc: "Leader axée sur l'avenir technologique de l'agriculture, chargée de rechercher de nouvelles certifications de qualité internationales et d'adapter des emballages bio-responsables pour conquérir les marchés premium.",
      points: [
        "Recherche et adéquation des normes pour l'obtention de la certification Global G.A.P.",
        "Développement et test d'emballages éco-responsables qui prolongent la durée de conservation du fruit.",
        "Analyse et suivi des tendances mondiales de consommation de super-fruits biologiques.",
        "Liaison avec les universités et les centres de développement technologique pour des projets d'innovation."
      ]
    }
  },
  it: {
    presidenta: {
      icon: '👑',
      image: '/static/img/presidenta.png',
      title: "Kelly Carvajal — Presidentessa e Gestione Strategica",
      desc: "Fondatrice e leader incaricata di articolare la visione dell'associazione, coordinare le politiche interne e aprire canali di dialogo con il settore pubblico e privato per consolidare la crescita sostenibile a Cañete.",
      points: [
        "Ha guidato il processo di formalizzazione legale e giuridica dell'associazione Tuta Wayta.",
        "Sviluppa alleanze strategiche con ministeri ed enti governativi dell'agricoltura.",
        "Supervisiona la trasparenza nel processo decisionale e nelle assemblee generali con i 30 soci.",
        "Rappresentante legale ufficiale del marchio di fronte a mercati commerciali competitivi."
      ]
    },
    vicepresidenta: {
      icon: '📈',
      image: '/static/img/vicepresidenta.png',
      title: "Talia Rodriguez Rojas — Vicepresidente e Visione Commerciale",
      desc: "Produttrice con una lunga esperienza sul campo, incaricata di bilanciare i requisiti tecnici della semina con il posizionamento commerciale del prodotto sul mercato nazionale e internazionale.",
      points: [
        "Più di 6 anni di esperienza diretta nella coltivazione specializzata di varietà di frutto del drago.",
        "Progettazione e apertura di canali logistici per la distribuzione diretta senza intermediari.",
        "Coordinatrice della partecipazione dell'associazione a fiere e tavoli d'affari internazionali.",
        "Supervisore del controllo qualità preventivo durante il processo di post-raccolta."
      ]
    },
    tesorero: {
      icon: '💰',
      image: '/static/img/TESORERO.png',
      title: "Kelly Maynard — Tesoriere e Controllo dell'Efficienza",
      desc: "Incaricato di vigilare sulla salute finanziaria dell'associazione, eseguendo audit interni e gestendo i budget in modo trasparente ed efficiente per il beneficio collettivo.",
      points: [
        "Ottimizzazione del budget annuale per l'acquisto aziendale di input biologici.",
        "Amministrazione e rendicontazione chiara in ogni assemblea tramite rapporti finanziari.",
        "Valutazione del ritorno sull'investimento (ROI) per l'implementazione di tecnologie di irrigazione.",
        "Gestione del fondo comune destinato alle emergenze agricole o climatiche dei soci."
      ]
    },
    produccion: {
      icon: '🛠️',
      image: 'https://i.ibb.co/Xktgp8BW/IMG-8370.avif',
      title: "Henry Perez — Coordinatore della Produzione Agricola",
      desc: "Responsabile tecnico della standardizzazione dei processi di coltivazione nei terreni di tutti i soci, garantendo che il frutto soddisfi i calibri e la qualità richiesti per l'esportazione.",
      points: [
        "Progettazione e implementazione di calendari unificati di fertilizzazione 100% biologica.",
        "Programmazione e zonizzazione di raccolti scaglionati per mantenere un flusso costante di offerta.",
        "Direzione di corsi di formazione tecnica sul campo relativi a potatura, guida e gestione delle colture.",
        "Specialista nel controllo biologico preventivo dei parassiti nativi della valle."
      ]
    },
    comunidad: {
      icon: '🤝',
      image: '/static/img/Astrid Guardia.png',
      title: "Astrid Guardia — Relazioni Comunitarie e Cooperativismo",
      desc: "Incaricata di rafforzare il tessuto sociale dell'associazione, promuovendo i valori del commercio equo e solidale, l'equità e il benessere di tutte le famiglie di agricoltori della valle.",
      points: [
        "Organizzazione di workshop partecipativi e di integrazione per i soci e le loro famiglie.",
        "Gestione di programmi di benessere sociale e sviluppo sostenibile nella comunità di Cañete.",
        "Mediazione e risoluzione pacifica dei conflitti interni alla catena produttiva.",
        "Promotrice delle normative internazionali del Commercio Equo (Fair Trade)."
      ]
    },
    innovacion: {
      icon: '💡',
      image: '/static/img/Ricardo Zúñiga.png',
      title: "Ricardo Zúñiga — Promotore di Innovazione e Mercati",
      desc: "Leader focalizzata sul futuro tecnologico dell'agricoltura, incaricata di cercare nuove certificazioni di qualità internazionale e adattare imballaggi eco-compatibili per conquistare mercati premium.",
      points: [
        "Ricerca e adeguamento degli standard per l'ottenimento della certificazione Global G.A.P.",
        "Sviluppo e test di imballaggi eco-compatibili che prolungano la durata di conservazione del frutto.",
        "Analisi e monitoraggio delle tendenze globali nel consumo di superfrutti biologici.",
        "Collegamento con università e centri di sviluppo tecnologico per progetti di innovazione."
      ]
    }
  }
};
let currentOpenMemberKey = null;

// ==========================================
// 2. LÓGICA DE CONTROL DEL MODAL DE EQUIPO
// ==========================================
window.openMemberModal = function(memberKey) {
  currentOpenMemberKey = memberKey;

  // Leer idioma actual directamente desde el selector de la interfaz o el HTML
  const langSelector = document.getElementById('langSelector');
  const currentLang = langSelector ? langSelector.value : (document.documentElement.lang || 'es');
  
  // Obtener diccionario de traducción con fallback seguro a español
  const langData = teamModalTranslations[currentLang] || teamModalTranslations['es'];
  const data = langData[memberKey];

  if (!data) return;

  const modalEl = document.getElementById('memberModal');
  const profilePic = document.getElementById('modal-profile-pic');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const pointsList = document.getElementById('modal-points');

  // Quitar atributos i18n externos si existieran para evitar interferencias
  if (modalTitle) modalTitle.removeAttribute('data-i18n');
  if (modalDesc) modalDesc.removeAttribute('data-i18n');

  // Inyectar datos de forma directa de manera segura
  if (profilePic) profilePic.src = equipoAssetUrl(data.image);
  if (modalIcon) modalIcon.textContent = data.icon;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.desc;
  
  // Limpiar y mapear la lista de logros/puntos clave
  if (pointsList && data.points) {
    pointsList.innerHTML = data.points
      .map(pointText => pointText ? `<li>${pointText}</li>` : '')
      .join('');
  }

  // Activar modal e impedir scroll de fondo
  if (modalEl) {
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeMemberModal = function() {
  const modalEl = document.getElementById('memberModal');
  if (modalEl) {
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentOpenMemberKey = null;
};

// ==========================================
// 3. LISTENERS DE INTERFAZ (DOM CONTENT LOADED)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  
  // Escuchar directamente los cambios del selector de idioma nativo
  const langSelector = document.getElementById('langSelector');
  if (langSelector) {
    langSelector.addEventListener('change', () => {
      // Si el modal está abierto al cambiar de idioma, lo vuelve a renderizar al instante
      if (currentOpenMemberKey) {
        window.openMemberModal(currentOpenMemberKey);
      }
    });
  }

  // Cerrar modal al presionar Escape
  window.addEventListener('keydown', (e) => {
    const modalEl = document.getElementById('memberModal');
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('active')) {
      window.closeMemberModal();
    }
  });

  // Cerrar el modal haciendo clic fuera de la caja de contenido (en el backdrop)
  const modalEl = document.getElementById('memberModal');
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        window.closeMemberModal();
      }
    });
  }
});

// Listener adicional por si se despacha el evento global personalizado desde otro componente
document.addEventListener('languageChanged', () => {
  if (currentOpenMemberKey) {
    window.openMemberModal(currentOpenMemberKey);
  }
});