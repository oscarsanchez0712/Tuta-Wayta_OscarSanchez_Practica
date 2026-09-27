// ─── ESTADO GLOBAL DEL CHAT ───
let isLoading = false;
let hasWelcomed = false;

// ─── DICCIONARIO MULTIIDIOMA ───
const chatboxTranslations = {
  es: {
    welcome: '¡Hola! 🌺 Soy el asistente de **Tuta Wayta**.\n¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros productos, quiénes somos, beneficios de la pitahaya o cómo contactarnos.',
    greetings: [
      'Hola, que gusto saludarte. Soy el asistente de **Tuta Wayta** y puedo ayudarte con horarios, productos, envios, ubicacion y contacto.',
      'Hola, bienvenido a **Tuta Wayta**. Si quieres, te doy datos rapidos sobre pedidos, horarios o productos.',
      'Hola, estoy para ayudarte. Preguntame por horarios, ubicacion, contacto o los productos que ofrecemos.'
    ],
    order: [
      'Claro, te ayudo con eso. Puedes escribirnos por el formulario o al **+51 987 654 321** y coordinamos tu pedido.',
      'Perfecto. Si deseas hacer un pedido, dejanos tu nombre, distrito y producto de interes para orientarte mejor.',
      'Con gusto. Escribenos por el chat o al **contacto@tutawayta.org** y te guiamos paso a paso.'
    ],
    hours: [
      'Atendemos de **lunes a sabado, de 8:00 a.m. a 6:00 p.m.**.',
      'Nuestro horario es de **lunes a sabado, 8:00 a.m. a 6:00 p.m.**. Si escribes fuera de ese horario, igual te respondemos luego.',
      'Estamos disponibles de **8:00 a.m. a 6:00 p.m., de lunes a sabado**.'
    ],
    products: [
      'Estos son nuestros productos principales:\n- **Pitahaya Fresca** (1 kg): S/ 25.00\n- **Pitahaya Deshidratada** (100 g): S/ 18.00\n- **Pulpa Congelada** (400 g): S/ 20.00\n- **Pack Degustacion**: S/ 35.00',
      'Manejamos pitahaya fresca, deshidratada, pulpa congelada y pack degustacion. Si quieres, te cuento uno por uno.',
      'Tenemos varias presentaciones de pitahaya. Si te interesa, te paso la opcion mas conveniente segun lo que buscas.'
    ],
    shipping: [
      'Sí, realizamos envios. En **Lima** el tiempo estimado es de **24 horas** y en **provincias** de **48 a 72 horas**.',
      'Hacemos envios segun destino y disponibilidad. Si me dices tu distrito o ciudad, te orientamos mejor.',
      'Claro, trabajamos con entregas en Lima y provincias. Indicanos tu ubicacion y vemos la mejor opcion.'
    ],
    contact: [
      'Puedes escribirnos a **contacto@tutawayta.org** o llamarnos al **+51 987 654 321**.',
      'Claro, nuestro contacto es **contacto@tutawayta.org** y el telefono **+51 987 654 321**.',
      'Si prefieres hablar directo, estamos en **contacto@tutawayta.org** y **+51 987 654 321**.'
    ],
    location: [
      'Estamos en **Valle de Cañete, Lima**. Tambien puedes ver la ubicacion exacta en el mapa de esta pagina.',
      'Nuestra base esta en **Valle de Cañete, Lima**. Si quieres, te orientamos con referencia o ruta.',
      'Nos ubicamos en **Valle de Cañete, Lima**. El mapa de esta pagina te muestra el punto exacto.'
    ],
    benefits: [
      'La pitahaya aporta antioxidantes, fibra y vitamina C. Tambien puede ayudar a la digestion y a la hidratacion.',
      'Es una fruta ligera y nutritiva, rica en fibra, antioxidantes y vitamina C.',
      'La pitahaya es una excelente opcion por su aporte de fibra, antioxidantes y frescura natural.'
    ],
    fallback: [
      'Gracias por tu mensaje. Si quieres, puedo ayudarte con **horarios**, **productos**, **envios**, **ubicacion** o **contacto**.',
      'No estoy seguro de esa consulta, pero si me preguntas por horarios, pedidos o contacto, te respondo al instante.',
      'Si deseas, te doy informacion rapida sobre pedidos, productos o como contactarnos.'
    ]
  },
  en: {
    welcome: "Hello! 🌺 I'm the **Tuta Wayta** assistant.\nHow can I help you today? I can tell you about our products, who we are, the benefits of dragon fruit, or how to contact us.",
    greetings: [
      "Hello, nice to meet you. I'm the **Tuta Wayta** assistant and I can help you with hours, products, shipping, location, and contact information.",
      "Hello, welcome to **Tuta Wayta**. If you'd like, I can give you quick details on orders, hours, or products.",
      "Hello, I'm here to help. Ask me about hours, location, contact, or the products we offer."
    ],
    order: [
      "Of course, I can help with that. You can write to us through the form or at **+51 987 654 321** and we'll coordinate your order.",
      "Perfect. If you want to place an order, leave us your name, district, and the product you're interested in so we can better assist you.",
      "With pleasure. Write to us via chat or at **contacto@tutawayta.org** and we'll guide you step by step."
    ],
    hours: [
      "We are open from **Monday to Saturday, from 8:00 a.m. to 6:00 p.m.**.",
      "Our hours are from **Monday to Saturday, 8:00 a.m. to 6:00 p.m.**. If you write outside of these hours, we will still get back to you later.",
      "We are available from **8:00 a.m. to 6:00 p.m., Monday to Saturday**."
    ],
    products: [
      "These are our main products:\n- **Fresh Dragon Fruit** (1 kg): S/ 25.00\n- **Dehydrated Dragon Fruit** (100 g): S/ 18.00\n- **Frozen Pulp** (400 g): S/ 20.00\n- **Tasting Pack**: S/ 35.00",
      "We offer fresh, dehydrated, and frozen pulp dragon fruit, as well as a tasting pack. If you'd like, I can tell you about them one by one.",
      "We have several dragon fruit presentations. If you're interested, I can suggest the most suitable option for what you're looking for."
    ],
    shipping: [
      "Yes, we do ship. In **Lima**, the estimated time is **24 hours**, and for **provinces**, it's **48 to 72 hours**.",
      "We ship based on destination and availability. If you tell me your district or city, I can better assist you.",
      "Of course, we deliver in Lima and provinces. Let us know your location and we'll find the best option."
    ],
    contact: [
      "You can email us at **contacto@tutawayta.org** or call us at **+51 987 654 321**.",
      "Sure, our contact is **contacto@tutawayta.org** and the phone number is **+51 987 654 321**.",
      "If you prefer to speak directly, we are at **contacto@tutawayta.org** and **+51 987 654 321**."
    ],
    location: [
      "We are in the **Cañete Valley, Lima**. You can also see the exact location on the map on this page.",
      "Our base is in the **Cañete Valley, Lima**. If you'd like, we can provide you with a reference or route.",
      "We are located in the **Cañete Valley, Lima**. The map on this page shows the exact spot."
    ],
    benefits: [
      "Dragon fruit provides antioxidants, fiber, and vitamin C. It can also help with digestion and hydration.",
      "It is a light and nutritious fruit, rich in fiber, antioxidants, and vitamin C.",
      "Dragon fruit is an excellent choice for its fiber, antioxidants, and natural freshness."
    ],
    fallback: [
      "Thanks for your message. If you'd like, I can help you with **hours**, **products**, **shipping**, **location**, or **contact**.",
      "I'm not sure about that query, but if you ask me about hours, orders, or contact, I can answer instantly.",
      "If you wish, I can give you quick information about orders, products, or how to contact us."
    ]
  },
  zh: {
    welcome: '您好！🌺 我是 **Tuta Wayta** 的智能助理。\n今天有什么可以帮助您的吗？我可以告诉您关于我们的产品、我们是谁、火龙果的好处或如何联系我们。',
    greetings: [
      '您好，很高兴为您服务。我是 **Tuta Wayta** 的智能助理，可以帮助您了解营业时间、产品、配送、地址和联系方式。',
      '您好，欢迎来到 **Tuta Wayta**。如果您需要，我可以快速提供关于订单、营业时间或产品的信息。',
      '您好，我在这里为您服务。您可以询问我关于营业时间、地址、联系方式或我们提供的产品。'
    ],
    order: [
      '当然，我可以帮您。您可以通过表格或致电 **+51 987 654 321** 联系我们，协调您的订单。',
      '好的。如果您想下单，请留下您的姓名、地区和感兴趣的产品，以便我们更好地为您服务。',
      '很乐意为您服务。请通过聊天或发送邮件至 **contacto@tutawayta.org** 联系我们，我们将一步步指导您。'
    ],
    hours: [
      'Our operational hours are **Monday to Saturday, 8:00 a.m. to 6:00 p.m.**.',
      '我们的营业时间是**周一至周六，上午8:00至下午6:00**。如果您在营业时间外留言，我们稍后会回复您。',
      '我们的服务时间是**周一至周六，上午8:00至下午6:00**。'
    ],
    products: [
      '我们的主要产品如下：\n- **新鲜火龙果** (1公斤): S/ 25.00\n- **脱水火龙果干** (100克): S/ 18.00\n- **冷冻果肉** (400克): S/ 20.00\n- **品尝套餐**: S/ 35.00',
      '我们提供新鲜火龙果、脱水火龙果干、冷冻果肉和品尝套餐。如果您愿意，我可以逐一为您介绍。',
      '我们有多种火龙果产品。如果您感兴趣，我可以根据您的需求推荐最合适的选择。'
    ],
    shipping: [
      '是的，我们提供配送服务。在**利马**，预计送达时间为**24小时**，在**其他省份**为**48至72小时**。',
      '我们根据目的地和库存情况安排配送。如果您告诉我您所在的地区或城市，我可以更好地为您提供建议。',
      '当然，我们在利马和其他省份都提供配送服务。请告知我们您的位置，我们会为您找到最佳方案。'
    ],
    contact: [
      '您可以发送邮件至 **contacto@tutawayta.org** 或致电 **+51 987 654 321**。',
      '好的，我们的联系邮箱是 **contacto@tutawayta.org**，电话是 **+51 987 654 321**。',
      '如果您希望直接沟通，我们的联系方式是 **contacto@tutawayta.org** 和 **+51 987 654 321**。'
    ],
    location: [
      '我们位于**利马的卡涅特山谷**。您也可以在本页的地图上查看确切位置。',
      '我们的基地在**利马的卡涅特山谷**。如果您需要，我们可以为您提供参考或路线。',
      '我们位于**利马的卡涅特山谷**。本页的地图会显示确切地点。'
    ],
    benefits: [
      '火龙果富含抗氧化剂、纤维和维生素C。它还有助于消化和补水。',
      '它是一种轻盈而营养丰富的水果，富含纤维、抗氧化剂和维生素C。',
      '火龙果因其纤维、抗氧化剂和天然的清爽口感而成为绝佳选择。'
    ],
    fallback: [
      '感谢您的留言。如果您需要，我可以帮助您了解**营业时间**、**产品**、**配送**、**地址**或**联系方式**。',
      '我不确定您的问题，但如果您问我关于营业时间、订单或联系方式，我可以立即回答。',
      '如果您愿意，我可以快速提供关于订单、产品或如何联系我们的信息。'
    ]
  },
  pt: { // ─── PORTUGUÉS ───
    welcome: 'Olá! 🌺 Sou o assistente da **Tuta Wayta**.\nComo posso ajudar você hoje? Posso falar sobre nossos produtos, quem somos, benefícios da pitaya ou como entrar em contato.',
    greetings: [
      'Olá, que prazer cumprimentar você. Sou o assistente da **Tuta Wayta** e posso ajudar com horários, produtos, envios, localização e contato.',
      'Olá, bem-vindo à **Tuta Wayta**. Se desejar, posso te dar dados rápidos sobre pedidos, horários ou produtos.',
      'Olá, estou aqui para ajudar. Pergunte-me sobre horários, localização, contato ou os produtos que oferecemos.'
    ],
    order: [
      'Claro, eu te ajudo com isso. Você pode nos escrever pelo formulário ou pelo **+51 987 654 321** e coordenamos seu pedido.',
      'Perfeito. Se deseja fazer um pedido, deixe seu nome, distrito e produto de interesse para te orientar melhor.',
      'Com prazer. Escreva-nos pelo chat ou em **contacto@tutawayta.org** e guiaremos você passo a passo.'
    ],
    hours: [
      'Atendemos de **segunda a sábado, das 8h00 às 18h00**.',
      'Nosso horário é de **segunda a sábado, das 8h00 às 18h00**. Se escrever fora desse horário, responderemos mais tarde.',
      'Estamos disponíveis das **8h00 às 18h00, de segunda a sábado**.'
    ],
    products: [
      'Estes são nossos principais produtos:\n- **Pitaya Fresca** (1 kg): S/ 25.00\n- **Pitaya Desidratada** (100 g): S/ 18.00\n- **Polpa Congelada** (400 g): S/ 20.00\n- **Pack Degustação**: S/ 35.00',
      'Trabalhamos com pitaya fresca, desidratada, polpa congelada e pack degustação. Se quiser, te conto mais sobre cada um.',
      'Temos várias apresentações de pitaya. Se tiver interesse, te passo a opção mais conveniente segundo o que busca.'
    ],
    shipping: [
      'Sim, realizamos envios. Em **Lima** o tempo estimado é de **24 horas** e nas **províncias** de **48 a 72 horas**.',
      'Fazemos envios segundo o destino e disponibilidade. Se me disser seu distrito ou cidade, te orientamos melhor.',
      'Claro, trabalhamos com entregas em Lima e províncias. Indique sua localização e veremos a melhor opção.'
    ],
    contact: [
      'Você pode nos escrever em **contacto@tutawayta.org** ou ligar para **+51 987 654 321**.',
      'Claro, nosso contato é **contacto@tutawayta.org** e o telefone é **+51 987 654 321**.',
      'Se preferir falar diretamente, estamos em **contacto@tutawayta.org** e **+51 987 654 321**.'
    ],
    location: [
      'Estamos no **Valle de Cañete, Lima**. Também pode ver a localização exata no mapa desta página.',
      'Nossa base fica no **Valle de Cañete, Lima**. Se quiser, te orientamos com referências ou rotas.',
      'Estamos localizados no **Valle de Cañete, Lima**. O mapa desta página mostra o ponto exato.'
    ],
    benefits: [
      'A pitaya fornece antioxidantes, fibras e vitamina C. Também pode ajudar na digestão e hidratação.',
      'É uma fruta leve e nutritiva, rica em fibras, antioxidantes e vitamina C.',
      'A pitaya é uma excelente opção pelo seu aporte de fibras, antioxidantes e frescor natural.'
    ],
    fallback: [
      'Obrigado pela sua mensagem. Se quiser, posso te ajudar com **horários**, **produtos**, **envios**, **localização** ou **contato**.',
      'Não tenho certeza sobre essa dúvida, mas se me perguntar por horários, pedidos ou contato, te respondo instantaneamente.',
      'Se desejar, posso te dar informações rápidas sobre pedidos, produtos ou como entrar em contato.'
    ]
  },
  de: { // ─── ALEMÁN ───
    welcome: 'Hallo! 🌺 Ich bin der Assistent von **Tuta Wayta**.\nWie kann ich Ihnen heute helfen? Ich kann Ihnen von unseren Produkten erzählen, wer wir sind, welche Vorteile die Drachenfrucht hat oder wie Sie uns kontaktieren können.',
    greetings: [
      'Hallo, schön Sie kennenzulernen. Ich bin der Assistent von **Tuta Wayta** und kann Ihnen bei Öffnungszeiten, Produkten, Versand, Standort und Kontakt helfen.',
      'Hallo, willkommen bei **Tuta Wayta**. Auf Wunsch gebe ich Ihnen schnelle Details zu Bestellungen, Öffnungszeiten oder Produkten.',
      'Hallo, ich bin hier, um zu helfen. Fragen Sie mich nach Öffnungszeiten, Standort, Kontakt oder den von uns angebotenen Produkten.'
    ],
    order: [
      'Natürlich helfe ich Ihnen dabei. Sie können uns über das Formular oder unter **+51 987 654 321** schreiben und wir koordinieren Ihre Bestellung.',
      'Perfekt. Wenn Sie eine Bestellung aufgeben möchten, nennen Sie uns Ihren Namen, Ihren Bezirk und das gewünschte Produkt, damit wir Sie besser beraten können.',
      'Sehr gerne. Schreiben Sie uns im Chat oder an **contacto@tutawayta.org** und wir führen Sie Schritt für Schritt.'
    ],
    hours: [
      'Wir haben von **Montag bis Samstag von 8:00 bis 18:00 Uhr** geöffnet.',
      'Unsere Öffnungszeiten sind **Montag bis Samstag, 8:00 bis 18:00 Uhr**. Wenn Sie außerhalb dieser Zeiten schreiben, antworten wir Ihnen später.',
      'Wir sind von **Montag bis Samstag von 8:00 bis 18:00 Uhr** für Sie da.'
    ],
    products: [
      'Dies sind unsere Hauptprodukte:\n- **Frische Drachenfrucht** (1 kg): S/ 25.00\n- **Getrocknete Drachenfrucht** (100 g): S/ 18.00\n- **Gefrorenes Fruchtfleisch** (400 g): S/ 20.00\n- **Verkostungspaket**: S/ 35.00',
      'Wir bieten frische, getrocknete Drachenfrüchte, gefrorenes Fruchtfleisch und ein Verkostungspaket an. Wenn Sie möchten, erzähle ich Ihnen eins nach dem anderen davon.',
      'Wir haben verschiedene Präsentationen der Drachenfrucht. Bei Interesse nenne ich Ihnen die passendste Option für Ihre Bedürfnisse.'
    ],
    shipping: [
      'Ja, wir versenden. In **Lima** beträgt die geschätzte Zeit **24 Stunden** und in den **Provinzen** **48 bis 72 Stunden**.',
      'Wir versenden je nach Bestimmungsort und Verfügbarkeit. Wenn Sie uns Ihren Bezirk oder Ihre Stadt nennen, können wir Sie besser informieren.',
      'Natürlich liefern wir nach Lima und in die Provinzen. Teilen Sie uns Ihren Standort mit und wir finden die beste Option.'
    ],
    contact: [
      'Sie können uns an **contacto@tutawayta.org** schreiben oder uns unter **+51 987 654 321** anrufen.',
      'Klar, unser Kontakt ist **contacto@tutawayta.org** und die Telefonnummer lautet **+51 987 654 321**.',
      'Wenn Sie lieber direkt sprechen möchten, sind wir unter **contacto@tutawayta.org** und **+51 987 654 321** erreichbar.'
    ],
    location: [
      'Wir befinden uns im **Cañete-Tal, Lima**. Sie können den genauen Standort auch auf der Karte auf dieser Seite sehen.',
      'Unser Stützpunkt befindet sich im **Cañete-Tal, Lima**. Wenn Sie möchten, helfen wir Ihnen mit Referenzen oder Routen.',
      'Wir befinden uns im **Cañete-Tal, Lima**. Die Karte auf dieser Seite zeigt Ihnen den genauen Punkt.'
    ],
    benefits: [
      'Drachenfrucht liefert Antioxidantien, Ballaststoffe und Vitamin C. Sie kann auch die Verdauung und Hydratation unterstützen.',
      'Es ist eine leichte und nahrhafte Frucht, reich an Ballaststoffen, Antioxidantien und Vitamin C.',
      "Drachenfrucht ist aufgrund ihres Gehalts an Ballaststoffen, Antioxidantien und ihrer natürlichen Frische eine ausgezeichnete Wahl."
    ],
    fallback: [
      'Vielen Dank für Ihre Nachricht. Wenn Sie möchten, kann ich Ihnen bei **Öffnungszeiten**, **Produkten**, **Versand**, **Standort** oder **Kontakt** helfen.',
      'Ich bin mir bei dieser Anfrage nicht sicher, aber wenn Sie mich nach Öffnungszeiten, Bestellungen oder Kontakt fragen, antworte ich sofort.',
      'Auf Wunsch gebe ich Ihnen schnelle Informationen zu Bestellungen, Produkten oder wie Sie uns kontaktieren können.'
    ]
  },
  it: { // ─── ITALIANO ───
    welcome: "Ciao! 🌺 Sono l'assistente di **Tuta Wayta**.\nCome posso aiutarti oggi? Posso parlarti dos nostri prodotti, di chi siamo, dei benefici della pitaya o di come contattarci.",
    greetings: [
      "Ciao, che piacere salutarti. Sono l'assistente di **Tuta Wayta** e posso aiutarti con orari, prodotti, spedizioni, posizione e contatti.",
      "Ciao, benvenuto in **Tuta Wayta**. Se vuoi, ti do informazioni rapide su ordini, orari o prodotti.",
      "Ciao, sono qui per aiutarti. Chiedimi di orari, posizione, contatti o prodotti che offriamo."
    ],
    order: [
      "Certo, ti aiuto io. Puoi scriverci tramite il modulo o al numero **+51 987 654 321** e coordineremo il tuo ordine.",
      "Perfetto. Se desideri effettuare un ordine, lasciaci il teu nome, quartiere e prodotto di interesse per orientarti al meglio.",
      "Con piacere. Scrivici in chat o a **contacto@tutawayta.org** e ti guideremo passo dopo passo."
    ],
    hours: [
      "Siamo aperti dal **lunedì al sabato, dalle 8:00 alle 18:00**.",
      "Il nostro orario è dal **lunedì al sabato, dalle 8:00 alle 18:00**. Se scrivi fuori da questo orario, ti risponderemo più tardi.",
      "Siamo disponibili dalle **8:00 alle 18:00, dal lunedì al sabato**."
    ],
    products: [
      "Questi sono i nostri prodotti principali:\n- **Pitaya Fresca** (1 kg): S/ 25.00\n- **Pitaya Disidratata** (100 g): S/ 18.00\n- **Polpa Congelata** (400 g): S/ 20.00\n- **Pacchetto Degustazione**: S/ 35.00",
      "Offriamo pitaya fresca, disidratata, polpa congelata e un pacchetto degustazione. Se vuoi, ti parlo di ognuno singolarmente.",
      "Abbiamo varie presentazioni di pitaya. Se ti interessa, ti mostro l'opzione più conveniente in base a ciò que cerchi."
    ],
    shipping: [
      "Sì, effettuiamo spedizioni. A **Lima** il tempo stimato è di **24 ore** e nelle **province** da **48 a 72 ore**.",
      "Spediamo in base alla destinazione e alla disponibilità. Se mi dici il tuo quartiere o città, ti orientiamo meglio.",
      "Certo, lavoriamo con consegne a Lima e nelle province. Indicaci la tua posizione e vedremo l'opzione migliore."
    ],
    contact: [
      "Puoi scriverci a **contacto@tutawayta.org** o chiamarci al **+51 987 654 321**.",
      "Certo, il nostro contatto è **contacto@tutawayta.org** e il telefono è **+51 987 654 321**.",
      "Se preferisci parlare direttamente, siamo su **contacto@tutawayta.org** e al **+51 987 654 321**."
    ],
    location: [
      "Siamo nella **Valle di Cañete, Lima**. Puoi anche vedere la posizione esatta sulla mappa in questa pagina.",
      "La nostra base è nella **Valle di Cañete, Lima**. Se vuoi, ti guideremo con riferimenti o percorsi.",
      "Ci troviamo nella **Valle di Cañete, Lima**. La mappa in questa pagina ti mostra il punto esatto."
    ],
    benefits: [
      "La pitaya fornisce antiossidanti, fibre e vitamina C. Può anche aiutare la digestione e l'idratazione.",
      "È un frutto leggero e nutritivo, ricco di fibre, antiossidanti e vitamina C.",
      "La pitaya è un'ottima opzione per il suo apporto di fibre, antiossidanti e freschezza naturale."
    ],
    fallback: [
      "Grazie per il tuo messaggio. Se vuoi, posso aiutarti con **orari**, **prodotti**, **spedizioni**, **posizione** o **contatti**.",
      "Non sono sicuro di questa richiesta, ma se mi chiedi di orari, ordini o contatti, ti risponderò all'istante.",
      "Se lo desideri, posso darti informazioni rapide su ordini, prodotti o su come contattarci."
    ]
  },
  fr: { // ─── FRANCÉS ───
    welcome: "Bonjour ! 🌺 Je suis l'assistant de **Tuta Wayta**.\nComment puis-je vous aider aujourd'hui ? Je peux vous parler de nos produits, de qui nous sommes, des bienfaits de la pitaya ou de la façon de nous contacter.",
    greetings: [
      "Bonjour, ravi de vous saluer. Je suis l'assistant de **Tuta Wayta** et je peux vous aider avec les horaires, les produits, les expéditions, l'emplacement et les contacts.",
      "Bonjour, bienvenue chez **Tuta Wayta**. Si vous le souhaitez, je peux vous donner des détails rapides sur les commandes, les horaires ou les produits.",
      "Bonjour, je suis là pour vous aider. Posez-moi des questions sur les horaires, l'emplacement, les contacts ou los produits que nous proposons."
    ],
    order: [
      "Bien sûr, je peux vous aider. Vous pouvez nous écrire via le formulaire ou au **+51 987 654 321** et nous coordonnerons votre commande.",
      "Parfait. Si vous souhaitez passer une commande, laissez-nous votre nom, quartier et produit d'intérêt pour mieux vous orienter.",
      "Avec plaisir. Écrivez-nous par chat ou à **contacto@tutawayta.org** et nous vous guiderons pas à pas."
    ],
    hours: [
      "Nous sommes ouverts du **lundi au samedi, de 8h00 à 18h00**.",
      "Nos horaires sont du **lundi au samedi, de 8h00 à 18h00**. Si vous écrivez en dehors de ces heures, nous vous répondrons plus tard.",
      "Nous sommes disponibles de **8h00 à 18h00, du lundi au samedi**."
    ],
    products: [
      "Voici nos principaux produits :\n- **Pitaya Fraîche** (1 kg) : S/ 25.00\n- **Pitaya Déshydratée** (100 g) : S/ 18.00\n- **Pulpe Surgelée** (400 g) : S/ 20.00\n- **Pack Dégustation** : S/ 35.00",
      "Nous proposons de la pitaya fraîche, déshydratée, de la pulpe surgelée et un pack dégustation. Si vous le souhaitez, je peux vous les présenter un par un.",
      "Nous avons plusieurs présentations de pitaya. Si cela vous intéresse, je vous proposerai l'option la plus adaptée à ce que vous recherchez."
    ],
    shipping: [
      "Oui, nous expédions. À **Lima**, le délai estimé est de **24 heures** et dans les **provinces**, de **48 à 72 heures**.",
      "Nous expédions selon la destination et la disponibilité. Si vous me donnez votre quartier ou votre ville, nous pourrons mieux vous guider.",
      "Bien sûr, nous livrons à Lima et dans les provinces. Indiquez-nous votre emplacement et nous verrons la meilleure option."
    ],
    contact: [
      "Vous pouvez nous écrire à **contacto@tutawayta.org** ou nous appeler au **+51 987 654 321**.",
      "Bien sûr, notre contact est **contacto@tutawayta.org** et le numéro de téléphone est **+51 987 654 321**.",
      "Si vous préférez parler directement, nous sommes joignables à **contacto@tutawayta.org** et au **+51 987 654 321**."
    ],
    location: [
      "Nous sommes dans la **Vallée de Cañete, Lima**. Vous pouvez également voir l'emplacement exact sur la carte de cette page.",
      "Notre base est dans la **Vallée de Cañete, Lima**. Si vous le souhaitez, nous vous guiderons avec des références ou un itinéraire.",
      "Nous sommes situés dans la **Vallée de Cañete, Lima**. La carte sur cette page vous montre le point exact."
    ],
    benefits: [
      "La pitaya apporte des antioxydants, des fibres et de la vitamine C. Elle peut également aider à la digestion et à l'hydratation.",
      "C'est un fruit léger et nutritif, riche en fibres, en antioxydants et en vitamine C.",
      "La pitaya est une excellente option pour son apport en fibres, en antioxydants et sa fraîcheur naturelle."
    ],
    fallback: [
      "Merci pour votre message. Si vous le souhaitez, je peux vous aider avec les **horaires**, les **produits**, les **expéditions**, l'**emplacement** ou los **contacts**.",
      "Je ne suis pas sûr de cette demande, mais si vous m'interrogez sur les horaires, les commandes ou les contacts, je vous répondrai instantanément.",
      "Si vous le souhaitez, je peux vous donner des informations rapides sur les commandes, les produits ou la façon de nous contacter."
    ]
  }
};

const buttonTextMapping = {
  es: { order: 'Hacer pedido', hours: 'Horario', location: 'Ubicación', contact: 'Contacto', products: 'Productos', shipping: 'Envíos' },
  en: { order: 'Place an order', hours: 'Hours', location: 'Location', contact: 'Contact', products: 'Products', shipping: 'Shipping' },
  zh: { order: '下单', hours: '营业时间', location: '地址', contact: '联系我们', products: '产品', shipping: '配送' },
  pt: { order: 'Fazer pedido', hours: 'Horário', location: 'Localização', contact: 'Contato', products: 'Produtos', shipping: 'Envios' },
  de: { order: 'Bestellen', hours: 'Öffnungszeiten', location: 'Standort', contact: 'Kontakt', products: 'Produkte', shipping: 'Versand' },
  it: { order: 'Ordinare', hours: 'Orari', location: 'Posizione', contact: 'Contatti', products: 'Prodotti', shipping: 'Spedizioni' },
  fr: { order: 'Commander', hours: 'Horaires', location: 'Emplacement', contact: 'Contact', products: 'Produits', shipping: 'Expéditions' }
};

// ─── ELEMENTOS DEL DOM ───
const toggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const quickReplies = document.getElementById('quick-replies');
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const langSelector = document.getElementById('langSelector');

// ─── LOGICA DE IDIOMA NATIVO ───
function getCurrentLang() {
  return document.documentElement.lang || 'es';
}

// ─── MANEJO DE ESTADOS DE APERTURA ───
function openState(isOpen) {
  chatWindow.classList.toggle('open', isOpen);
  chatWindow.setAttribute('aria-hidden', String(!isOpen));
  toggle.querySelector('.icon-chat').style.display = isOpen ? 'none' : 'block';
  toggle.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';
}

toggle.addEventListener('click', () => {
  const isOpen = !chatWindow.classList.contains('open');
  openState(isOpen);
  if (isOpen && !hasWelcomed && chatMessages.children.length === 0) {
    showWelcome();
    hasWelcomed = true;
    replayQuickRepliesAnimation();
  }
});

function showWelcome() {
  const lang = getCurrentLang();
  addMessage('bot', chatboxTranslations[lang].welcome);
}

// ─── ENVIAR / RENDERIZAR MENSAJES ───
function addMessage(role, text) {
  const msg = document.createElement('div');
  msg.classList.add('msg', role);

  const bubble = document.createElement('div');
  bubble.classList.add('msg-bubble');
  bubble.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  const time = document.createElement('div');
  time.classList.add('msg-time');
  time.textContent = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

  msg.appendChild(bubble);
  msg.appendChild(time);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.classList.add('msg', 'bot');
  div.id = 'typing';
  div.innerHTML = '<div class="msg-bubble" style="padding:8px 14px"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// ─── PROCESADOR DE RESPUESTAS SIMULADAS ───
function getSimulatedReply(userText) {
  const lang = getCurrentLang();
  const i18n = chatboxTranslations[lang] || chatboxTranslations.es;
  const text = normalizeText(userText);

  if (i18n[userText]) {
    return pickRandom(i18n[userText]);
  }

  // Palabras clave extendidas balanceadas para todos los idiomas
  const keywords = {
    greetings: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hello', 'hi', 'good morning', 'good afternoon', 'good evening', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hallo', 'guten tag', 'ciao', 'buongiorno', 'bonjour', 'salut'],
    order: ['pedido', 'comprar', 'compra', 'quiero un pedido', 'hacer un pedido', 'order', 'buy', 'purchase', 'i want to order', 'compras', 'bestellen', 'bestellung', 'ordinare', 'ordine', 'commander', 'commande'],
    hours: ['hora', 'horario', 'abren', 'atienden', 'atencion', 'hours', 'opening', 'open', 'attention', 'horarios', 'uhrzeit', 'offnungszeiten', 'geoffnet', 'orari', 'orario', 'aperto', 'horaires', 'horaire', 'ouvert'],
    products: ['producto', 'productos', 'precio', 'precios', 'catalogo', 'product', 'products', 'price', 'prices', 'catalog', 'preço', 'preços', 'catalogo', 'produkte', 'preis', 'preise', 'katalog', 'prodotto', 'prodotti', 'prezzo', 'prezzi', 'produit', 'produits', 'prix'],
    shipping: ['envio', 'envios', 'delivery', 'entrega', 'reparto', 'shipping', 'shipment', 'send', 'entregas', 'versand', 'lieferung', 'spedizione', 'spedizioni', 'livraison', 'expedition'],
    contact: ['contacto', 'correo', 'email', 'telefono', 'whatsapp', 'numero', 'llamar', 'contact', 'phone', 'number', 'call', 'telefone', 'kontakt', 'telefon', 'nummer', 'contatto', 'telefono', 'numero', 'telephone'],
    location: ['donde', 'ubicacion', 'direccion', 'canete', 'cañete', 'lima', 'where', 'location', 'address', 'onde', 'localizacao', 'standort', 'adresse', 'wo', 'dove', 'posizione', 'indirizzo', 'ou', 'emplacement'],
    benefits: ['beneficio', 'beneficios', 'pitahaya', 'salud', 'nutricion', 'benefit', 'benefits', 'dragon fruit', 'health', 'nutrition', 'pitaya', 'saude', 'nutricao', 'vorteile', 'gesundheit', 'benefici', 'salute', 'bienfaits', 'sante']
  };

  if (keywords.greetings.some(k => text.includes(k))) return pickRandom(i18n.greetings);
  if (keywords.order.some(k => text.includes(k))) return pickRandom(i18n.order);
  if (keywords.hours.some(k => text.includes(k))) return pickRandom(i18n.hours);
  if (keywords.products.some(k => text.includes(k))) return pickRandom(i18n.products);
  if (keywords.shipping.some(k => text.includes(k))) return pickRandom(i18n.shipping);
  if (keywords.contact.some(k => text.includes(k))) return pickRandom(i18n.contact);
  if (keywords.location.some(k => text.includes(k))) return pickRandom(i18n.location);
  if (keywords.benefits.some(k => text.includes(k))) return pickRandom(i18n.benefits);

  return pickRandom(i18n.fallback);
}

// ─── LOGICA DE ENVIO CON TIEMPO NATURAL ───
async function sendMessage(userText, textToDisplay = null) {
  if (!userText.trim() || isLoading) return;

  isLoading = true;
  quickReplies.style.display = 'none';
  
  const displayMessage = textToDisplay || userText;
  addMessage('user', displayMessage);
  
  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;
  showTyping();

  const naturalDelay = 450 + Math.random() * 450;

  setTimeout(() => {
    removeTyping();
    addMessage('bot', getSimulatedReply(userText));
    replayQuickRepliesAnimation();
    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }, naturalDelay);
}

function sendQuick(key) {
  const lang = getCurrentLang();
  const textToDisplay = (buttonTextMapping[lang] && buttonTextMapping[lang][key]) || key;
  sendMessage(key, textToDisplay);
}

// ─── ESCUCHADORES DE EVENTOS DE ENTRADA ───
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 100) + 'px';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(input.value);
  }
});

sendBtn.addEventListener('click', () => sendMessage(input.value));

function replayQuickRepliesAnimation() {
  quickReplies.style.display = 'flex';
  quickReplies.classList.remove('qr-animate');
  void quickReplies.offsetWidth; 
  quickReplies.classList.add('qr-animate');
}

// ─── CONTROLADOR DEL SELECTOR MULTI-IDIOMA NATIVO ───
if (langSelector) {
  langSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    document.documentElement.lang = selectedLang;

    const event = new CustomEvent('languageChanged', {
      detail: { language: selectedLang }
    });
    document.dispatchEvent(event);
  });
}

// ─── ESCUCHADOR ASÍNCRONO DE CAMBIO DE IDIOMA EN VIVO ───
document.addEventListener('languageChanged', () => {
  const lang = getCurrentLang();
  const translations = chatboxTranslations[lang];
  const i18nData = window.i18nData ? (window.i18nData[lang] || {}) : {};

  if (!translations) return;

  const firstMsgBubble = chatMessages.querySelector('.msg.bot .msg-bubble');
  if (firstMsgBubble && chatMessages.children.length === 1) {
    firstMsgBubble.innerHTML = translations.welcome
      .replace(/\*\*(.*?)\*\"/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  const headerTitle = document.querySelector('#chat-window .chat-info h3');
  const headerStatus = document.querySelector('#chat-window .chat-info p span:last-child');
  const inputEl = document.getElementById('chat-input');

  const fallbacks = {
    es: { title: 'Asistente Tuta Wayta', status: 'En línea', placeholder: 'Escribe tu pregunta…' },
    en: { title: 'Tuta Wayta Assistant', status: 'Online', placeholder: 'Type your question…' },
    zh: { title: 'Tuta Wayta 助手', status: '在线', placeholder: '输入您的问题…' },
    pt: { title: 'Assistente Tuta Wayta', status: 'On-line', placeholder: 'Digite sua pergunta…' },
    de: { title: 'Tuta Wayta Assistent', status: 'Online', placeholder: 'Stellen Sie eine Frage…' },
    it: { title: 'Assistente Tuta Wayta', status: 'Online', placeholder: 'Scrivi la tua domanda…' },
    fr: { title: 'Assistant Tuta Wayta', status: 'En ligne', placeholder: 'Posez votre question…' }
  };
  const fallbackLang = fallbacks[lang] || fallbacks.es;

  if (headerTitle) headerTitle.textContent = i18nData['chat_header_title'] || fallbackLang.title;
  if (headerStatus) headerStatus.textContent = i18nData['chat_header_status'] || fallbackLang.status;
  if (inputEl) inputEl.placeholder = i18nData['chat_input_ph'] || fallbackLang.placeholder;

  const currentMap = buttonTextMapping[lang];
  if (currentMap) {
    Object.keys(currentMap).forEach(key => {
      const btn = document.querySelector(`.quick-btn[onclick*="${key}"]`);
      if (btn) btn.textContent = currentMap[key];
    });
  }
});

