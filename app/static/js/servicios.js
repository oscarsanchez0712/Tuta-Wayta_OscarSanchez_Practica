// ==========================================
// 1. DATA TRANSLATIONS (DICCIONARIO MULTI-IDIOMA)
// ==========================================
const servicesTranslations = {
    es: {
        1: {
            badge: "Desarrollo Sostenible",
            title: "Cultivo Sostenible",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "Implementamos metodologías agrícolas avanzadas para mitigar de forma activa la huella de carbono, optimizando de extremo a extremo el rendimiento integral y la salud de nuestros suelos vivos mediante prácticas 100% circulares.",
            steps: [
                { num: "01", title: "Nutrición Orgánica Integrada", desc: "Sustitución completa de aditivos sintéticos por compostaje microbiológico de alta densidad hecho a base de biomasa reciclada." },
                { num: "02", title: "Gestión Hídrica de Precisión", desc: "Sistemas automatizados de riego por goteo con análisis volumétrico en tiempo real para evitar cualquier pérdida." },
                { num: "03", title: "Auditoría de Captura de Carbono", desc: "Medición científica del impacto ecológico positivo y fijación de gases de efecto invernadero en las plantaciones." }
            ],
            benefits: ["Cero impacto químico", "Reducción hídrica del 40%", "Preservación del ecosistema", "Certificación biológica internacional"]
        },
        2: {
            badge: "Procesamiento de Valor",
            title: "Transformación de Fruta",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "Convertimos materia prima seleccionada en derivados alimentarios de categoría gourmet y premium listos para abastecer la demanda industrial de los mercados internacionales más exigentes.",
            steps: [
                { num: "01", title: "Control de Calidad Funcional", desc: "Selección rigurosa basándonos en la concentración exacta de grados Brix y análisis fitoquímico inicial de la pulpa." },
                { num: "02", title: "Procesamiento Ultra Cuidado", desc: "Procesos térmicos y de liofilización sumamente controlados para conservar las vitaminas y propiedades antioxidantes intactas." },
                { num: "03", title: "Empaque Aséptico y Sostenible", desc: "Envasado en atmósferas protegidas con materiales reciclables que prolongan la vida útil del producto sin conservantes." }
            ],
            benefits: ["Sin azúcares añadidos", "Cadena aséptica certificada", "Trazabilidad alimentaria 100%", "Larga vida útil comercial"]
        },
        3: {
            badge: "Optimización Comercial",
            title: "Distribución a Mercados",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "Conectamos los centros de cosecha directamente con los principales nodos logísticos mundiales y cadenas hoteleras, asegurando tiempos mínimos y la máxima frescura.",
            steps: [
                { num: "01", title: "Clasificación Post-Cosecha", desc: "Estandarización mecánica por tamaño, peso y madurez justo tras la recolección manual para homogenizar lotes." },
                { num: "02", title: "Despacho Multimodal Ágil", desc: "Rutas logísticas inteligentes pre-programadas por software para eludir retrasos e intermediarios innecesarios." },
                { num: "03", title: "Entrega Certificada en Punto", desc: "Monitoreo de satisfacción y entrega de informes de frescura directamente al sector retail o mayorista." }
            ],
            benefits: ["Entregas just-in-time", "Garantía de frescura absoluta", "Rutas logísticas eficientes", "Acceso directo a grandes superficies"]
        },
        4: {
            badge: "I+D Agroindustrial",
            title: "Desarrollo de Variedades",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "Investigamos de manera continua perfiles botánicos y genéticos de la fruta del dragón para dar con cultivos adaptables, resistentes al cambio climático y altamente atractivos para el consumidor.",
            steps: [
                { num: "01", title: "Hibridación Controlada", desc: "Polinización dirigida en entornos científicos para potenciar el dulzor natural y la densidad cromática interna." },
                { num: "02", title: "Ensayos de Adaptabilidad", desc: "Evaluaciones de estrés biótico e hídrico en múltiples altitudes y terrenos antes de su propagación masiva." },
                { num: "03", title: "Propagación de Esquejes Élite", desc: "Distribución controlada de plantas madre certificadas con alta tasa de éxito de enraizamiento y brote." }
            ],
            benefits: ["Mayor concentración Brix", "Resistencia climática extrema", "Mayor densidad de producción", "Patentes vegetales exclusivas"]
        },
        5: {
            badge: "Consultoría Técnica",
            title: "Asesoría Agrícola",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Soporte corporativo integral ejecutado por ingenieros agrónomos de primer nivel para auditar, rediseñar y elevar radicalmente la rentabilidad de las plantaciones de nuestros productores asociados.",
            steps: [
                { num: "01", title: "Auditoría Fisicoquímica", desc: "Muestreo periódico del agua de riego y de la estructura del suelo para diseñar planes de fertilización a medida." },
                { num: "02", title: "Planes Fitocleanos Específicos", desc: "Estrategias preventivas de carácter biológico para mitigar plagas sin recurrir a pesticidas tradicionales restrictivos." },
                { num: "03", title: "Monitoreo de Rendimiento Financiero", desc: "Evaluación del costo por hectárea contra los kilos cosechados para maximizar los márgenes de ganancia." }
            ],
            benefits: ["Ingeniería de campo avanzada", "Maximización garantizada del retorno", "Soporte técnico integral 24/7", "Mitigación eficaz de riesgos de pérdida"]
        },
        6: {
            badge: "Ingeniería Logística",
            title: "Logística Fría",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "Administramos sistemas avanzados de refrigeración continuos con el objetivo de detener el proceso degradativo natural y respiratorio de la fruta fresca durante traslados transatlánticos.",
            steps: [
                { num: "01", title: "Choque Térmico Inicial", desc: "Bajada rápida de la temperatura interna de la fruta en cámaras de estabilización por aire dinámico post-empaque." },
                { num: "02", title: "Monitoreo Telemático IoT", desc: "Sensores inalámbricos midiendo en tiempo real la temperatura, humedad y niveles de etileno en contenedores marítimos." },
                { num: "03", title: "Descarga en Atmósfera Controlada", desc: "Ruptura de cadena de frío planificada solo en muelles de destino equipados con exclusas térmicas herméticas." }
            ],
            benefits: ["Cadena de frío 100% sellada", "Alertas telemáticas automáticas", "Mayor durabilidad comercial", "Cumplimiento de estándares de sanidad"]
        }
    },
    en: {
        1: {
            badge: "Sustainable Development",
            title: "Sustainable Farming",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "We implement advanced agricultural methodologies to actively mitigate the carbon footprint, optimizing overall yield and the health of our living soils from end to end through 100% circular practices.",
            steps: [
                { num: "01", title: "Integrated Organic Nutrition", desc: "Complete replacement of synthetic additives with high-density microbiological composting made from recycled biomass." },
                { num: "02", title: "Precision Water Management", desc: "Automated drip irrigation systems with real-time volumetric analysis to prevent any water loss." },
                { num: "03", title: "Carbon Capture Audit", desc: "Scientific measurement of positive ecological impact and greenhouse gas fixation in plantations." }
            ],
            benefits: ["Zero chemical impact", "40% water reduction", "Ecosystem preservation", "International biological certification"]
        },
        2: {
            badge: "Value Processing",
            title: "Fruit Transformation",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "We convert selected raw materials into gourmet and premium food derivatives, ready to supply the industrial demand of the most demanding international markets.",
            steps: [
                { num: "01", title: "Functional Quality Control", desc: "Rigorous selection based on the exact concentration of Brix degrees and initial phytochemical analysis of the pulp." },
                { num: "02", title: "Ultra-Careful Processing", desc: "Highly controlled thermal and lyophilization (freeze-drying) processes to keep vitamins and antioxidant properties intact." },
                { num: "03", title: "Aseptic & Sustainable Packaging", desc: "Packaging in protected atmospheres with recyclable materials that extend the product's shelf life without preservatives." }
            ],
            benefits: ["No added sugars", "Certified aseptic chain", "100% food traceability", "Long commercial shelf life"]
        },
        3: {
            badge: "Commercial Optimization",
            title: "Market Distribution",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "We connect harvest centers directly with major global logistical hubs and hotel chains, ensuring minimal turnaround times and maximum freshness.",
            steps: [
                { num: "01", title: "Post-Harvest Sorting", desc: "Mechanical standardization by size, weight, and ripeness right after manual harvesting to homogenize batches." },
                { num: "02", title: "Agile Multimodal Dispatch", desc: "Smart logistical routes pre-programmed via software to bypass unnecessary delays and intermediaries." },
                { num: "03", title: "Certified On-Site Delivery", desc: "Satisfaction monitoring and delivery of freshness reports directly to the retail or wholesale sector." }
            ],
            benefits: ["Just-in-time deliveries", "Absolute freshness guarantee", "Efficient logistics routes", "Direct access to large retail surfaces"]
        },
        4: {
            badge: "Agro-industrial R&D",
            title: "Variety Development",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "We continuously research botanical and genetic profiles of dragon fruit to deliver highly adaptable, climate-resilient crops that are exceptionally appealing to consumers.",
            steps: [
                { num: "01", title: "Controlled Hybridization", desc: "Targeted pollination in scientific environments to boost natural sweetness and internal color density." },
                { num: "02", title: "Adaptability Trials", desc: "Biotic and water stress evaluations across multiple altitudes and terrains prior to mass propagation." },
                { num: "03", title: "Elite Cuttings Propagation", desc: "Controlled distribution of certified mother plants with high rooting and sprouting success rates." }
            ],
            benefits: ["Higher Brix concentration", "Extreme climate resilience", "Greater production density", "Exclusive plant patents"]
        },
        5: {
            badge: "Technical Consultancy",
            title: "Agricultural Advisory",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Comprehensive corporate support executed by top-tier agronomists to audit, redesign, and radically elevate the profitability of our partner farmers' plantations.",
            steps: [
                { num: "01", title: "Physicochemical Audit", desc: "Periodic sampling of irrigation water and soil structure to design custom fertilization plans." },
                { num: "02", title: "Specific Phytoclean Plans", desc: "Biological preventive strategies to mitigate pests without relying on traditional restrictive pesticides." },
                { num: "03", title: "Financial Yield Monitoring", desc: "Evaluation of cost per hectare against harvested kilograms to maximize profit margins." }
            ],
            benefits: ["Advanced field engineering", "Guaranteed ROI maximization", "24/7 comprehensive technical support", "Effective loss risk mitigation"]
        },
        40: { // Nota: Manteniendo la estructura de ID numéricos idénticos
            badge: "Logistics Engineering",
            title: "Cold Chain Logistics",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "We manage advanced continuous refrigeration systems to arrest the natural degradative and respiratory process of fresh fruit during transatlantic transits.",
            steps: [
                { num: "01", title: "Initial Thermal Shock", desc: "Rapid lowering of the fruit's internal temperature in post-packaging dynamic air stabilization chambers." },
                { num: "02", title: "IoT Telematic Monitoring", desc: "Wireless sensors measuring temperature, humidity, and ethylene levels in shipping containers in real time." },
                { num: "03", title: "Controlled Atmosphere Discharge", desc: "Planned cold chain breaks only at destination docks equipped with airtight thermal seals." }
            ],
            benefits: ["100% sealed cold chain", "Automated telematic alerts", "Extended commercial shelf life", "Compliance with health and sanitation standards"]
        }
    },
    zh: {
        1: {
            badge: "可持续发展",
            title: "绿色生态种植",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "我们采用前沿的现代农业技术，主动减少碳足迹，通过100%的循环经济模式，全方位优化活土健康并提升作物的综合产量。",
            steps: [
                { num: "01", title: "一体化有机营养体系", desc: "彻底停用化学合成添加剂，转而使用由回收生物质制成的高密度微生物发酵堆肥。" },
                { num: "02", title: "精准智能水利管理", desc: "搭载自动化滴灌系统，配合实时水容积数据分析，杜绝任何水资源的浪费。" },
                { num: "03", title: "碳捕集与固碳合规审计", desc: "运用科学手段定量评估生态正向效益，并精确测定种植园的温室气体固化率。" }
            ],
            benefits: ["零化学农药化肥残留", "节约高达40%的农业用水", "深度保护原生生态系统", "荣获国际权威有机认证"]
        },
        2: {
            badge: "价值深加工",
            title: "果品精细化高值转换",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "我们将严选的优质原果转化为高档、特级的食品衍生品，以高标准全面满足全球主流工业与餐饮市场对高品质的严苛需求。",
            steps: [
                { num: "01", title: "功能性质量精选控制", desc: "依托精准的果肉糖度（Brix）测定与初始植物化学成分分析进行严格筛选。" },
                { num: "02", title: "极致呵护锁鲜加工", desc: "采用高精度温控的热加工与低温冷冻干燥（liofilización）技术，完整保留维生素及抗氧化活性。" },
                { num: "03", title: "全无菌绿色环保包装", desc: "在气调保护环境下进行密封包装，使用可回收材质，不添加防腐剂即可大幅延长保质期。" }
            ],
            benefits: ["绝无任何人工添加糖", "通过国际认证的全无菌生产链", "100%全程食品安全可追溯", "极具商业竞争力的超长保质期"]
        },
        3: {
            badge: "商业化链路优化",
            title: "全球多渠道市场分销",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "打通采收基地与世界主要物流枢纽及连锁酒店集团的垂直供应链，以极高的周转效率确保鲜果以巅峰新鲜度送达目的地。",
            steps: [
                { num: "01", title: "采后标准化智能分级", desc: "手工采收后立即启动机械化分选，依据尺寸、重量及成熟度统筹锁价，保证批次高度均一。" },
                { num: "02", title: "多式联运敏捷高效调配", desc: "利用智能软件提前规划并生成最佳物流路径，有效避开传统中间商与多余的运输延误。" },
                { num: "03", title: "到店/到仓签到落地查验", desc: "持续追踪客户满意度，并将新鲜度监测报告直接同步呈报给零售巨头或批发商客户。" }
            ],
            benefits: ["准时化（Just-in-time）高效交付", "无条件绝对新鲜度官方保障", "科学低碳的物流路径规划", "直通大型连锁商超的绿色通道"]
        },
        4: {
            badge: "农业科技高端研发",
            title: "卓越新品种培育拓展",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "我们持续深耕火龙果的植物学性状与基因组学剖析，致力于培育出适应性强、耐极端气候且深受市场青睐的精英作物。",
            steps: [
                { num: "01", title: "定向可控杂交授粉", desc: "在尖端科研温室中进行定向人工授粉，旨在显著拉高自然甜度与果肉内源色彩饱和度。" },
                { num: "02", title: "多生境气候适应性测试", desc: "在大规模扩繁前，对作物在跨海拔、跨土质环境下的生物逆境及抗旱性能进行极限评估。" },
                { num: "03", title: "黄金初代优质种苗扩繁", desc: "严格受控分发带有官方认证的母株种苗，确保生根率与抽芽成功率处于行业领先水平。" }
            ],
            benefits: ["大幅提升果实 Brix 糖度", "兼具极强的抗逆性气候韧性", "显著拉高单位亩产种植密度", "拥有独家且合规的植物新品种专利"]
        },
        5: {
            badge: "专家技术咨询",
            title: "现代化农业全息顾问",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "由业内顶尖的农艺工程师组建企业级支持团队，为合作农户与基地提供全方位的审计、重新设计和效益升级方案，全面释放农田利润空间。",
            steps: [
                { num: "01", title: "理化性质定期精密审计", desc: "定期对灌溉水源质量及土壤质地进行取样化验，量身定制科学的配方施肥方案。" },
                { num: "02", title: "定制化生物绿色防控", desc: "制定以预防为主的纯生物技术策略，替代传统高毒性农药，有效解决作物的病虫害困扰。" },
                { num: "03", title: "农田财务与投入产出监测", desc: "科学量化评估每公顷亩产投入成本与采收斤两的动态效益比，实现净利润最大化。" }
            ],
            benefits: ["国际先进的农田实战工程方案", "有可量化数据支撑的ROI最大化", "24/7全天候管家式技术团队响应", "科学降低和抵御不可控减产风险"]
        },
        6: {
            badge: "智能冷链物流工程",
            title: "全温控冷链运输",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "采用全球领先的无断点冷冻恒温控制系统，在跨大西洋的远洋长途运输中，科学延缓新鲜果实的自然有氧呼吸与品质衰减速度。",
            steps: [
                { num: "01", title: "预冷处理初期冷休克", desc: "果实包装完毕后，立即送入动态强风循环稳定冷库，以最快速度拉低并稳定鲜果的核心内温。" },
                { num: "02", title: "物联网（IoT）远程跟踪", desc: "海运集装箱内全程部署无线智能传感器，全天候实时回传温度、相对湿度以及乙烯浓度。" },
                { num: "03", title: "严密气调密封卸货交付", desc: "仅在配备密闭式隔热气闸的目的地专用码头平台进行交接，杜绝任何盲目冷链断点。" }
            ],
            benefits: ["100%全封闭无断链恒温守护", "异常数据自动触发智能报警", "大幅拓宽海外上架黄金销售期", "完美契合国际高标准的进出口海关检验检疫规范"]
        }
    },
    de: {
        1: {
            badge: "Nachhaltige Entwicklung",
            title: "Nachhaltiger Anbau",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "Wir setzen fortschrittliche landwirtschaftliche Methoden ein, um den CO2-Fußabdruck aktiv zu reduzieren. Durch 100% kreislauforientierte Praktiken optimieren wir den Gesamtertrag und die Gesundheit unserer lebendigen Böden.",
            steps: [
                { num: "01", title: "Integrierte biologische Ernährung", desc: "Vollständiger Ersatz synthetischer Zusätze durch hochdichten mikrobiologischen Kompost aus recycelter Biomasse." },
                { num: "02", title: "Präzises Wassermanagement", desc: "Automatisierte Tröpfchenbewässerungssysteme mit Volumenanalyse in Echtzeit, um Wasserverluste vollständig zu vermeiden." },
                { num: "03", title: "Audit zur CO2-Bindung", desc: "Wissenschaftliche Messung der positiven ökologischen Auswirkungen und der Fixierung von Treibhausgasen auf den Plantagen." }
            ],
            benefits: ["Keine chemischen Belastungen", "40% weniger Wasserverbrauch", "Erhaltung des Ökosystems", "Internationale Bio-Zertifizierung"]
        },
        2: {
            badge: "Wertschöpfende Verarbeitung",
            title: "Fruchtverarbeitung",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "Wir verwandeln ausgewählte Rohstoffe in erstklassige Fruchterzeugnisse der Gourmet- und Premiumklasse, um die industrielle Nachfrage der anspruchsvollsten internationalen Märkte zu bedienen.",
            steps: [
                { num: "01", title: "Funktionelle Qualitätskontrolle", desc: "Strengste Auswahl basierend auf der exakten Brix-Konzentration und einer anfänglichen phytochemischen Analyse des Fruchtfleisches." },
                { num: "02", title: "Schonende Verarbeitung", desc: "Sorgfältig kontrollierte thermische Prozesse und Gefriertrocknung, um Vitamine und antioxidative Eigenschaften intakt zu halten." },
                { num: "03", title: "Aseptische & nachhaltige Verpackung", desc: "Verpackung in Schutzatmosphäre mit recycelbaren Materialien, die die Haltbarkeit des Produkts ohne Konservierungsstoffe verlängern." }
            ],
            benefits: ["Ohne Zuckerzusatz", "Zertifizierte aseptische Kette", "100% Rückverfolgbarkeit", "Lange kommerzielle Haltbarkeit"]
        },
        3: {
            badge: "Kommerzielle Optimierung",
            title: "Marktdistribution",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "Wir verbinden Erntezentren direkt mit den wichtigsten globalen Logistikknotenpunkten und Hotelketten, um minimale Lieferzeiten und maximale Frische zu gewährleisten.",
            steps: [
                { num: "01", title: "Nachernte-Sortierung", desc: "Mechanische Standardisierung nach Größe, Gewicht und Reifegrad direkt nach der manuellen Ernte zur Homogenisierung der Chargen." },
                { num: "02", title: "Agiler multimodaler Versand", desc: "Intelligente Logistikrouten, die per Software vorprogrammiert werden, um unnötige Verzögerungen und Zwischenhändler zu vermeiden." },
                { num: "03", title: "Zertifizierte Lieferung vor Ort", desc: "Zufriedenheitsüberwachung und Bereitstellung von Frischeberichten direkt an den Einzel- oder Großhandel." }
            ],
            benefits: ["Just-In-Time-Lieferungen", "Absolute Frischegarantie", "Effiziente Logistikrouten", "Direkter Zugang zu großen Verkaufsflächen"]
        },
        4: {
            badge: "Agrarindustrielle F&E",
            title: "Sortenentwicklung",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "Wir erforschen kontinuierlich botanische und genetische Profile von Drachenfrüchten, um anpassungsfähige, klimaresistente Pflanzen zu züchten, die für Verbraucher hochattraktiv sind.",
            steps: [
                { num: "01", title: "Kontrollierte Hybridisierung", desc: "Gezielte Bestäubung in wissenschaftlichen Umgebungen zur Steigerung der natürlichen Süße und der internen Farbdichte." },
                { num: "02", title: "Anpassungstests", desc: "Bewertungen von biotischem und Wasserstress in verschiedenen Höhenlagen und auf unterschiedlichen Böden vor der Massenvermehrung." },
                { num: "03", title: "Vermehrung von Elite-Stecklingen", desc: "Kontrollierte Abgabe zertifizierter Mutterpflanzen mit hohen Erfolgsraten bei Bewurzelung und Austrieb." }
            ],
            benefits: ["Höhere Brix-Konzentration", "Extreme Klimaresistenz", "Höhere Produktionsdichte", "Exklusive Pflanzenpatente"]
        },
        5: {
            badge: "Technische Beratung",
            title: "Agrarberatung",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Umfassende Unterstützung durch erstklassige Agraringenieure zur Überprüfung, Neugestaltung und radikalen Steigerung der Rentabilität der Plantagen unserer Partnerlandwirte.",
            steps: [
                { num: "01", title: "Physikalisch-chemische Prüfung", desc: "Regelmäßige Probenahme von Bewässerungswasser und Bodenstruktur zur Erstellung maßgeschneiderter Düngepläne." },
                { num: "02", title: "Spezifische Pflanzenschutzpläne", desc: "Biologische Präventionsstrategien zur Schädlingsbekämpfung ohne den Einsatz traditioneller, restriktiver Pestizide." },
                { num: "03", title: "Finanzielle Ertragsüberwachung", desc: "Bewertung der Kosten pro Hektar im Verhältnis zu den geernteten Kilogramm zur Maximierung der Gewinnspannen." }
            ],
            benefits: ["Fortschrittliche Feldtechnik", "Garantierte ROI-Maximierung", "Umfassender technischer Support rund um die Uhr", "Effektive Minimierung von Verlustrisiken"]
        },
        6: {
            badge: "Logistik-Engineering",
            title: "Kühlkettenlogistik",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "Wir verwalten fortschrittliche kontinuierliche Kühlsysteme, um den natürlichen Abbau- und Atmungsprozess frischer Früchte während transatlantischer Transporte zu stoppen.",
            steps: [
                { num: "01", title: "Anfänglicher Thermoschock", desc: "Schnelle Absenkung der Innentemperatur der Früchte in dynamischen Luftstabilisierungskammern nach dem Verpacken." },
                { num: "02", title: "IoT-Telematik-Überwachung", desc: "Drahtlose Sensoren messen Temperatur, Feuchtigkeit und Ethulenwerte in Versandcontainern in Echtzeit." },
                { num: "03", title: "Entladung unter kontrollierter Atmosphäre", desc: "Geplante Kühlkettenunterbrechungen nur an Bestimmungsdockstationen, die mit luftdichten Thermoschleusen ausgestattet sind." }
            ],
            benefits: ["100% geschlossene Kühlkette", "Automatische Telematik-Warnungen", "Verlängerte Haltbarkeit", "Einhaltung von Gesundheits- und Hygienestandards"]
        }
    },
    pt: {
        1: {
            badge: "Desenvolvimento Sustentável",
            title: "Cultivo Sustentável",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "Implementamos metodologias agrícolas avançadas para mitigar de forma ativa a pegada de carbono, otimizando de ponta a ponta o rendimento integral e a saúde dos nossos solos vivos através de práticas 100% circulares.",
            steps: [
                { num: "01", title: "Nutrição Orgânica Integrada", desc: "Substituição completa de aditivos sintéticos por compostagem microbiológica de alta densidade feita à base de biomassa reciclada." },
                { num: "02", title: "Gestão Hídrica de Precisão", desc: "Sistemas automatizados de irrigação por gotejamento com análise volumétrica em tempo real para evitar qualquer perda." },
                { num: "03", title: "Auditoria de Captura de Carbono", desc: "Medição científica do impacto ecológico positivo e fixação de gases de efeito estufa nas plantações." }
            ],
            benefits: ["Zero impacto químico", "Redução hídrica de 40%", "Preservação do ecossistema", "Certificação biológica internacional"]
        },
        2: {
            badge: "Processamento de Valor",
            title: "Transformação de Frutas",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "Convertemos matéria-prima selecionada em derivados alimentares de categoria gourmet e premium prontos para abastecer a demanda industrial dos mercados internacionais mais exigentes.",
            steps: [
                { num: "01", title: "Controle de Qualidade Funcional", desc: "Seleção rigorosa baseada na concentração exata de graus Brix e análise fitoquímica inicial da polpa." },
                { num: "02", title: "Processamento Ultra Cuidadoso", desc: "Processos térmicos e de liofilização altamente controlados para conservar as vitaminas e propriedades antioxidantes intactas." },
                { num: "03", title: "Embalagem Asséptica e Sustentável", desc: "Embalado em atmosferas protegidas com materiais recicláveis que prolongam a vida útil do produto sem conservantes." }
            ],
            benefits: ["Sem açúcares adicionados", "Cadeia asséptica certificada", "Rastreabilidade alimentar 100%", "Longa vida útil comercial"]
        },
        3: {
            badge: "Otimização Comercial",
            title: "Distribuição para Mercados",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "Conectamos los centros de colheita diretamente com os principais nós logísticos mundiais e redes hoteleiras, garantindo tempos mínimos e máxima frescura.",
            steps: [
                { num: "01", title: "Classificação Pós-Colheita", desc: "Padronização mecânica por tamanho, peso e maturação logo após a coleta manual para homogeneizar os lotes." },
                { num: "02", title: "Despacho Multimodal Ágil", desc: "Rotas logísticas inteligentes pré-programadas por software para evitar atrasos e intermediários desnecessários." },
                { num: "03", title: "Entrega Certificada no Ponto", desc: "Monitoramento de satisfação e entrega de relatórios de frescura diretamente ao setor varejista ou atacadista." }
            ],
            benefits: ["Entregas just-in-time", "Garantia de frescura absoluta", "Rotas logísticas eficientes", "Acesso direto a grandes superfícies"]
        },
        4: {
            badge: "P&D Agroindustrial",
            title: "Desenvolvimento de Variedades",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "Pesquisamos continuamente perfis botânicos e genéticos da pitaia para desenvolver cultivos adaptáveis, resistentes às mudanças climáticas e altamente atraentes para o consumidor.",
            steps: [
                { num: "01", title: "Hibridização Controlada", desc: "Polinização direcionada em ambientes científicos para potencializar a doçura natural e a densidade cromática interna." },
                { num: "02", title: "Ensaios de Adaptabilidade", desc: "Avaliações de estresse biótico e hídrico em múltiplas altitudes e terrenos antes da sua propagação massiva." },
                { num: "03", title: "Propagação de Estacas Elite", desc: "Distribuição controlada de plantas-mãe certificadas com alta taxa de sucesso de enraizamento e broto." }
            ],
            benefits: ["Maior concentração Brix", "Resistência climática extrema", "Maior densidade de produção", "Patentes vegetais exclusivas"]
        },
        5: {
            badge: "Consultoria Técnica",
            title: "Assessoria Agrícola",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Suporte corporativo integral executado por engenheiros agrônomos de primeiro nível para auditar, redesenhar e elevar radicalmente a rentabilidade das plantações dos nossos produtores associados.",
            steps: [
                { num: "01", title: "Auditoria Físico-Química", desc: "Amostragem periódica da água de irrigação e da estrutura do solo para projetar planos de fertilização sob medida." },
                { num: "02", title: "Planos Fitocleanos Específicos", desc: "Estratégias preventivas de caráter biológico para mitigar pragas sem recorrer a pesticidas tradicionais restritivos." },
                { num: "03", title: "Monitoramento de Rendimento Financeiro", desc: "Avaliação do custo por hectare contra os quilos colhidos para maximizar as margens de lucro." }
            ],
            benefits: ["Engenharia de campo avançada", "Maximização garantizada do retorno", "Suporte técnico integral 24/7", "Mitigação eficaz de riscos de perda"]
        },
        6: {
            badge: "Engenharia Logística",
            title: "Logística Fria",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "Administramos sistemas avançados de refrigeração contínuos com o objetivo de conter o processo degradativo natural e respiratório da fruta fresca durante traslados transatlânticos.",
            steps: [
                { num: "01", title: "Choque Térmico Inicial", desc: "Redução rápida da temperatura interna da fruta em câmaras de estabilização por ar dinâmico pós-embalagem." },
                { num: "02", title: "Monitoramento Telemático IoT", desc: "Sensores sem fio medindo em tempo real a temperatura, umidade e níveis de etileno em contêineres marítimos." },
                { num: "03", title: "Descarga em Atmosfera Controlada", desc: "Ruptura de cadeia de frio planejada apenas em docas de destino equipadas com eclusas térmicas herméticas." }
            ],
            benefits: ["Cadeia de frio 100% selada", "Alertas telemáticos automáticos", "Maior durabilidade comercial", "Cumprimento de padrões de sanidade"]
        }
    },
    fr: {
        1: {
            badge: "Développement Durable",
            title: "Agriculture Durable",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "Nous déployons des méthodologies agricoles avancées pour atténuer activement l'empreinte carbone, optimisant de bout en bout le rendement global et la santé de nos sols vivants grâce à des pratiques 100% circulaires.",
            steps: [
                { num: "01", title: "Nutrition Organique Intégrée", desc: "Substitution totale des additifs synthétiques par un compostage microbiologique à haute densité fabriqué à partir de biomasse recyclée." },
                { num: "02", title: "Gestion Hydrique de Précision", desc: "Systèmes d'irrigation au goutte-à-goutte automatisés avec analyse volumétrique en temps réel pour éviter toute perte d'eau." },
                { num: "03", title: "Audit de Capture du Carbone", desc: "Mesure scientifique de l'impact écologique positif et fixation des gaz à effet de serre au sein des plantations." }
            ],
            benefits: ["Zéro impact chimique", "Réduction hydrique de 40%", "Préservation de l'écosystème", "Certification biologique internationale"]
        },
        2: {
            badge: "Transformation de Valeur",
            title: "Transformation des Fruits",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "Nous convertissons les matières premières sélectionnées en dérivés alimentaires de catégorie gourmet et premium, prêts à approvisionner la demande industrielle des marchés internationaux les plus exigeants.",
            steps: [
                { num: "01", title: "Contrôle de Qualité Fonctionnel", desc: "Sélection rigoureuse basée sur la concentration exacte de degrés Brix et l'analyse phytochimique initiale de la pulpe." },
                { num: "02", title: "Transformation Éco-Responsable", desc: "Procédés thermiques et de lyophilisation hautement contrôlés pour préserver intactes les vitamines et les propriétés antioxydantes." },
                { num: "03", title: "Emballage Aseptique et Durable", desc: "Conditionnement sous atmosphère protégée avec des matériaux recyclables qui prolongent la durée de conservation sans conservateurs." }
            ],
            benefits: ["Sans sugars ajoutés", "Chaîne aseptique certifiée", "Traçabilité alimentaire 100%", "Longue durée de conservation commerciale"]
        },
        3: {
            badge: "Optimisation Commerciale",
            title: "Distribution sur les Marchés",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "Nous connectons les centres de récolte directement aux principaux hubs logistiques mondiaux et aux chaînes hôtelières, garantissant des délais minimaux et une fraîcheur maximale.",
            steps: [
                { num: "01", title: "Tri Post-Récolte", desc: "Standardisation mécanique par taille, poids et maturité juste après la cueillette manuelle pour homogénéiser les lots." },
                { num: "02", title: "Expédition Multimodale Agile", desc: "Routes logistiques intelligentes préprogrammées par logiciel pour contourner les retards et les intermédiaires inutiles." },
                { num: "03", title: "Livraison Certifiée sur Site", desc: "Suivi de la satisfaction et transmission des rapports de fraîcheur directement aux secteurs du commerce de détail ou de gros." }
            ],
            benefits: ["Livraisons just-in-time", "Garantie de fraîcheur absolue", "Routes logistiques efficaces", "Accès direct aux grandes surfaces"]
        },
        4: {
            badge: "R&D Agro-industrielle",
            title: "Développement de Variétés",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "Nous recherchons continuellement les profils botaniques et génétiques du fruit du dragon pour proposer des cultures adaptables, résilientes au changement climatique et attractives pour le consommateur.",
            steps: [
                { num: "01", title: "Hybridation Contrôlée", desc: "Pollinisation ciblée en milieu scientifique pour booster la douceur naturelle et la densité chromatique interne." },
                { num: "02", title: "Essais d'Adaptabilité", desc: "Évaluations du stress biotique et hydrique à plusieurs altitudes et types de sols avant la propagation de masse." },
                { num: "03", title: "Propagation de Boutures Élite", desc: "Distribution contrôlée de plantes mères certifiées présentant un taux de réussite d'enracinement et de bourgeonnement élevé." }
            ],
            benefits: ["Plus haute concentration Brix", "Résilience climatique extrême", "Plus forte densité de production", "Brevets végétaux exclusifs"]
        },
        5: {
            badge: "Consultation Technique",
            title: "Conseil Agricole",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Un support d'entreprise complet réalisé par des ingénieurs agronomes de premier plan pour auditer, repenser et élever radicalement la rentabilité des plantations de nos producteurs associés.",
            steps: [
                { num: "01", title: "Audit Physico-chimique", desc: "Échantillonnage périodique de l'eau d'irrigation et de la structure du sol pour concevoir des plans de fertilisation sur mesure." },
                { num: "02", title: "Plans Phytosanitaires Biologiques", desc: "Stratégies préventives de nature biologique pour atténuer les ravageurs sans recourir aux pesticides traditionnels restrictifs." },
                { num: "03", title: "Suivi du Rendement Financier", desc: "Évaluation du coût par hectare par rapport aux kilogrammes récoltés afin de maximiser les marges bénéficiaires." }
            ],
            benefits: ["Ingénierie de terrain avancée", "Maximisation garantie du ROI", "Support technique complet 24/7", "Atténuation efficace des risques de perte"]
        },
        6: {
            badge: "Ingénierie Logistique",
            title: "Logistique du Froid",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "Nous gérons des systèmes avancés de réfrigération continue dans le but de stopper le processus de dégradation naturel et respiratoire des fruits frais pendant les transits transatlantiques.",
            steps: [
                { num: "01", title: "Choc Thermique Initial", desc: "Abaissement rapide de la température interne du fruit dans des chambres de stabilisation à air dynamique après l'emballage." },
                { num: "02", title: "Suivi Télématique IoT", desc: "Capteurs sans fil mesurant en temps réel la température, l'humidité et les niveaux d'éthylène dans les conteneurs maritimes." },
                { num: "03", title: "Déchargement sous Atmosphère Contrôlée", desc: "Ruptures de la chaîne du froid planifiées uniquement au niveau des quais de destination équipés de sas thermiques étanches." }
            ],
            benefits: ["Chaîne du froid 100% scellée", "Alertes télématiques automatiques", "Durée de conservation étendue", "Respect des normes sanitaires"]
        }
    },
    it: {
        1: {
            badge: "Sviluppo Sostenibile",
            title: "Agricoltura Sostenibile",
            image: "https://images.pexels.com/photos/5945924/pexels-photo-5945924.jpeg",
            intro: "Implementiamo metodologie agricole avanzate per mitigare attivamente l'impronta di carbonio, ottimizzando da un capo all'altro la resa complessiva e la salute dei nostri terreni vivi attraverso pratiche circolari al 100%.",
            steps: [
                { num: "01", title: "Nutrizione Organica Integrata", desc: "Sostituzione completa degli additivi sintetici con compostaggio microbiologico ad alta densità ricavato da biomassa riciclata." },
                { num: "02", title: "Gestione Idrica di Precisione", desc: "Sistemi automatizzati di irrigazione a goccia con analisi volumetrica in tempo real per evitare qualsiasi dispersione d'acqua." },
                { num: "03", title: "Audit di Cattura del Carbonio", desc: "Misurazione scientifica dell'impatto ecologico positivo e fissazione dei gas serra nelle piantagioni." }
            ],
            benefits: ["Zero impatto chimico", "Riduzione idrica del 40%", "Preservazione dell'ecosistema", "Certificazione biologica internazionale"]
        },
        2: {
            badge: "Lavorazione di Valore",
            title: "Trasformazione della Frutta",
            image: "https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg",
            intro: "Convertiamo materie prime selezionate in derivati alimentari di categoria gourmet e premium pronti a soddisfare la domanda industriale dei mercati internazionali più esigenti.",
            steps: [
                { num: "01", title: "Controllo Qualità Funzionale", desc: "Selezione rigorosa basata sull'esatta concentrazione di gradi Brix e sull'analisi chimica iniziale della polpa." },
                { num: "02", title: "Lavorazione ad Alta Protezione", desc: "Processi termici e di liofilizzazione fortemente controllati per mantenere intatte le vitamine e le proprietà antiossidanti." },
                { num: "03", title: "Confezionamento Asettico e Sostenibile", desc: "Confezionamento in atmosfera protetta con materiali riciclabili che prolungano la durata di conservazione del prodotto senza conservanti." }
            ],
            benefits: ["Senza zuccheri aggiunti", "Filiera asettica certificata", "Tracciabilità alimentare al 100%", "Lunga durata commerciale"]
        },
        3: {
            badge: "Ottimizzazione Commerciale",
            title: "Distribuzione nei Mercati",
            image: "https://images.pexels.com/photos/27175835/pexels-photo-27175835.jpeg",
            intro: "Colleghiamo i centri di raccolta direttamente con i principali nodi logistici mondiali e catene alberghiere, garantendo tempi minimi di consegna e massima freschezza.",
            steps: [
                { num: "01", title: "Classificazione Post-Raccolta", desc: "Standardizzazione meccanica per dimensioni, peso e maturazione subito dopo la raccolta manuale per omogeneizzare i lotti." },
                { num: "02", title: "Spedizione Multimodale Agile", desc: "Rotte logistiche intelligenti preprogrammate tramite software per evitare ritardi e intermediari non necessari." },
                { num: "03", title: "Consegna Certificata in Loco", desc: "Monitoraggio della soddisfazione e consegna dei rapporti sulla freschezza direttamente al settore retail o all'ingrosso." }
            ],
            benefits: ["Consegne just-in-time", "Garanzia di freschezza assoluta", "Rotte logistiche efficienti", "Accesso diretto alla grande distribuzione"]
        },
        4: {
            badge: "R&S Agroindustriale",
            title: "Sviluppo di Varietà",
            image: "https://images.pexels.com/photos/18925477/pexels-photo-18925477.jpeg",
            intro: "Ricerchiamo continuamente i profili botanici e genetici del frutto del drago per sviluppare colture adattabili, resilienti ai cambiamenti climatici e fortemente attrattive per il consumatore finale.",
            steps: [
                { num: "01", title: "Ibridazione Controllata", desc: "Impollinazione mirata in ambienti scientifici per potenziare la dolcezza naturale e la densità cromatica interna." },
                { num: "02", title: "Test di Adattabilità", desc: "Valutazioni dello stress biotico e idrico a diverse altitudini e tipologie di terreno prima della propagazione di massa." },
                { num: "03", title: "Propagazione di Talee Élite", desc: "Distribuzione controllata di piante madri certificate con un alto tasso di successo di radicazione e germogliazione." }
            ],
            benefits: ["Maggiore concentrazione Brix", "Resilienza climatica estrema", "Maggiore densità produttiva", "Brevets vegetali esclusivi"]
        },
        5: {
            badge: "Consulenza Tecnica",
            title: "Consulenza Agricola",
            image: "https://images.pexels.com/photos/37796583/pexels-photo-37796583.jpeg",
            intro: "Supporto aziendale completo eseguito da ingegneri agronomi di alto livello per verificare, riprogettare ed elevare radicalmente la redditività delle piantagioni dei nostri produttori associati.",
            steps: [
                { num: "01", title: "Audit Chimico-Fisico", desc: "Campionamento periodico dell'acqua di irrigazione e della struttura del suolo per progettare piani di fertilizzazione su misura." },
                { num: "02", title: "Piani Fitoterapici Biologici", desc: "Strategie preventive di natura biologica per mitigare i parassiti senza ricorrere ai tradizionali pesticidi restrittivi." },
                { num: "03", title: "Monitoraggio del Rendimento Finanziario", desc: "Valutazione del costo per ettaro rispetto ai chili raccolti per massimizzare i margini di profitto." }
            ],
            benefits: ["Ingegneria di campo avanzata", "Massimizzazione del ROI garantita", "Supporto tecnico completo 24/7", "Efficace mitigazione del rischio di perdite"]
        },
        6: {
            badge: "Ingegneria Logistica",
            title: "Logistica del Freddo",
            image: "https://images.pexels.com/photos/11760084/pexels-photo-11760084.jpeg",
            intro: "Gestiamo sistemi avanzati di refrigerazione continua con l'obiettivo di arrestare il naturale processo degradativo e respiratorio della frutta fresca durante i trasporti transatlantici.",
            steps: [
                { num: "01", title: "Shock Termico Iniziale", desc: "Abbassamento rapido della temperatura interna della frutta in camere di stabilizzazione ad aria dinamica post-confezionamento." },
                { num: "02", title: "Monitoraggio Telematico IoT", desc: "Sensori wireless che misurano in tempo reale temperatura, umidità e livelli di etilene nei container marittimi." },
                { num: "03", title: "Scarico in Atmosfera Controllata", desc: "Interruzioni programmate della catena del freddo solo in banchine di destinazione attrezzate con chiuse termiche ermetiche." }
            ],
            benefits: ["Catena del freddo sigillata al 100%", "Allarmi telematici automatici", "Maggiore durata commerciale", "Conformità agli standard igienico-sanitari"]
        }
    }
};
let currentActiveServiceId = null;

// ==========================================
// 2. CONTROL DEL MODAL DINÁMICO & I18N
// ==========================================
function openModal(id) {
    // Fallback: Si el HTML invoca el antiguo ID 40 (Logística en inglés), lo redirigimos al ID 6 unificado
    if (id === 40) id = 6;
    
    currentActiveServiceId = id;
    
    const currentLang = document.documentElement.lang || 'es';
    const langData = servicesTranslations[currentLang] || servicesTranslations['es'];
    const data = langData[id];

    if (!data) return;

    const modal = document.getElementById('serviceModal');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalIntro = document.getElementById('modalIntro');

    // Desvincular i18n para evitar sobrescrituras del motor externo
    if (modalBadge) modalBadge.removeAttribute('data-i18n');
    if (modalTitle) modalTitle.removeAttribute('data-i18n');
    if (modalIntro) modalIntro.removeAttribute('data-i18n');

    // Setear información base
    if (modalBadge) modalBadge.innerText = data.badge;
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalIntro) modalIntro.innerText = data.intro;
    
    const modalHero = document.getElementById('modalHero');
    if (modalHero) {
        modalHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${data.image}')`;
        modalHero.style.backgroundSize = 'cover';
        modalHero.style.backgroundPosition = 'center';
    }

    // Renderizar Pasos (Steps)
    const stepsContainer = document.getElementById('modalSteps');
    if (stepsContainer) {
        stepsContainer.innerHTML = '';
        data.steps.forEach(step => {
            stepsContainer.innerHTML += `
                <div class="modal-step-item">
                    <div class="step-num">${step.num}</div>
                    <div class="step-content">
                        <h5>${step.title}</h5>
                        <p>${step.desc}</p>
                    </div>
                </div>
            `;
        });
    }

    // Renderizar Beneficios (Benefits)
    const benefitsContainer = document.getElementById('modalBenefits');
    if (benefitsContainer) {
        benefitsContainer.innerHTML = '';
        data.benefits.forEach(benefit => {
            benefitsContainer.innerHTML += `
                <div class="benefit-badge-item">
                    <span>✓</span> ${benefit}
                </div>
            `;
        });
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeModalForce();
    }
}

function closeModalForce() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentActiveServiceId = null;
}

// ==========================================
// 3. CAROUSEL DE IMÁGENES (SCROLL HORIZONTAL)
// ==========================================
function scrollCarousel(direction) {
    const slider = document.getElementById('carouselSlider');
    const card = slider?.querySelector('.card-item');
    if (card && slider) {
        const cardWidth = card.getBoundingClientRect().width + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap') || 24);
        slider.scrollLeft += direction * cardWidth;
    }
}

// ==========================================
// 4. PANALES Y TARJETAS ACTIVAS INDIVIDUALES
// ==========================================
function selectPanel(panelId) {
    const paneles = document.querySelectorAll('.servicio-panel');
    paneles.forEach(p => p.classList.remove('panel-active'));
    
    const selected = document.getElementById(panelId);
    if (selected) selected.classList.add('panel-active');
}

// ==========================================
// 5. INICIALIZADOR GLOBAL (DOM CONTENT LOADED)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Tarjetas de servicios simples (.servicio-card)
    const servicioCards = document.querySelectorAll('.servicio-card');
    if (servicioCards.length > 0) {
        servicioCards.forEach(card => {
            card.addEventListener('click', () => {
                servicioCards.forEach(otherCard => {
                    if (otherCard !== card) otherCard.classList.remove('active');
                });
                card.classList.toggle('active');
            });
        });
    }

    // Asignar evento a los paneles del acordeón de servicios
    const panelesServicio = document.querySelectorAll('.servicio-panel');
    if (panelesServicio.length > 0) {
        panelesServicio.forEach(panel => {
            panel.addEventListener('click', () => selectPanel(panel.id));
        });
    }

    // Abanico de cartas apiladas (.stacked-card)
    const cards = Array.from(document.querySelectorAll('.stacked-card'));
    const btnNext = document.getElementById('nextStackBtn');
    const btnPrev = document.getElementById('prevStackBtn');
    
    if (cards.length > 0) {
        let currentIndex = 0; 
        const totalCards = cards.length;

        function updateStackStyles() {
            cards.forEach((card, i) => {
                let relativeIndex = (i - currentIndex + totalCards) % totalCards;

                if (relativeIndex === 0) {
                    card.style.zIndex = "3";
                    card.style.opacity = "1";
                    card.style.transform = "translateX(0px) translateY(0px) rotate(0deg) scale(1)";
                } else if (relativeIndex === 1) {
                    card.style.zIndex = "2";
                    card.style.opacity = "1";
                    card.style.transform = "translateX(25px) translateY(8px) rotate(5deg) scale(0.96)";
                } else if (relativeIndex === 2) {
                    card.style.zIndex = "1";
                    card.style.opacity = "1";
                    card.style.transform = "translateX(50px) translateY(18px) rotate(10deg) scale(0.92)";
                } else {
                    card.style.zIndex = "0";
                    card.style.opacity = "0";
                    card.style.transform = "translateX(50px) translateY(18px) rotate(10deg) scale(0.92)";
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateStackStyles();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateStackStyles();
            });
        }

        cards.forEach((card) => {
            card.addEventListener('click', function() {
                let relativeIndex = (cards.indexOf(this) - currentIndex + totalCards) % totalCards;
                if (relativeIndex === 1 || relativeIndex === 2) {
                    currentIndex = cards.indexOf(this);
                    updateStackStyles();
                }
            });
        });

        updateStackStyles();
    }

    // Reveal al Scroll & Lupa de Alta Precisión (Zoom Magnético)
    const textoCol = document.getElementById('nosotrosTextoCol');
    const mediaCol = document.getElementById('nosotrosMediaCol');
    const gridGod = document.querySelector('.container-nosotros-grid-god');

    if (gridGod && textoCol && mediaCol) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    textoCol.classList.add('reveal-active');
                    mediaCol.classList.add('reveal-active');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);
        observer.observe(gridGod);
    }

    const container = document.getElementById('zoomContainer');
    const image = document.getElementById('zoomImage');
    const nivelZoom = "scale(1.8)"; 

    if (container && image) {
        container.addEventListener('mousemove', (e) => {
            const posX = e.offsetX;
            const posY = e.offsetY;
            const totalWidth = container.offsetWidth;
            const totalHeight = container.offsetHeight;

            const percentageX = (posX / totalWidth) * 100;
            const percentageY = (posY / totalHeight) * 100;

            image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
            image.style.transform = nivelZoom;
        });

        container.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            image.style.transformOrigin = 'center center';
        });
    }
});

// Listener por si cambian de idioma asíncronamente (actualiza el modal al instante)
document.addEventListener('languageChanged', () => {
    if (currentActiveServiceId !== null) {
        openModal(currentActiveServiceId);
    }
});