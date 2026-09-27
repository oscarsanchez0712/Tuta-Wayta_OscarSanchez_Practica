/* ================================================================
   TUTA WAYTA - BASE DE DATOS DE PRODUCTOS Y LÓGICA DE DETALLES
   ================================================================
*/

const productosTraducidos = {
  es: {
    1: {
      id: 1,
      nombre: "Jugo Refrescante de Pitahaya Fucsia",
      etiqueta: "Jugo Pitahaya",
      titulo: "El Tesoro del Valle",
      descripcion: "Fruta peruana cosechada en su punto ideal, dulce y fresca.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Perú",
      certificacion: "100% Orgánico",
      variedad: "American Beauty",
      temporada: "Octubre - Enero",
      bondades: ["Rica en Vitamina C", "Apto para Diabéticos", "Antioxidantes Naturales", "Laxante Natural"]
    },
    3: {
      id: 3,
      nombre: "Mermelada Artesanal",
      etiqueta: "Derivado",
      titulo: "Tradición Artesanal",
      descripcion: "Cada frasco conserva el sabor auténtico de la pitahaya orgánica peruana.",
      imagen: "/static/img/mermelada artesanal.png",
      origen: "Perú",
      certificacion: "Artesanal",
      variedad: "Clásica",
      temporada: "Todo el año",
      bondades: ["100% Natural", "Sin Conservantes", "Rica en Fibra", "Ideal para Desayunos"]
    },
    4: {
      id: 4,
      nombre: "Mermelada Premium",
      etiqueta: "Premium",
      titulo: "Edición Especial",
      descripcion: "Edición especial con mayor concentración de fruta y sabor intenso.",
      imagen: "/static/img/MermeladaP.png",
      origen: "Perú",
      certificacion: "Premium",
      variedad: "Alta concentración",
      temporada: "Limitado",
      bondades: ["Alta Concentración", "Sabor Intenso", "Edición Limitada", "Regalo Perfecto"]
    },
    5: {
      id: 5,
      nombre: "Néctar Natural",
      etiqueta: "Bebida",
      titulo: "Refrescancia Pura",
      descripcion: "Bebida natural de pitahaya, ligera y refrescante",
      imagen: "/static/img/Nectar Natural.png",
      category: "Derivado",
      origen: "Perú",
      certificacion: "100% Natural",
      variedad: "Sin azúcar",
      temporada: "Todo el año",
      bondades: ["Sin Azúcar Añadida", "Baja en Calorías", "Vitamina C Natural", "Hidratante"]
    },
    6: {
      id: 6,
      nombre: "Pack Especial",
      etiqueta: "Combo",
      descripcion: "Combinación curada de nuestros mejores productos en una caja regalo.",
      imagen: "/static/img/packEspecial.jpeg",
      origen: "Perú",
      certificacion: "Especial",
      variedad: "Mix Variado",
      temporada: "Campaña"
    },
    7.5: {
      id: 7.5,
      nombre: "Pulpa Deshidratada",
      etiqueta: "Ingrediente",
      descripcion: "Concentrado de pitahaya para smoothies, postres y recetas saludables.",
      imagen: "/static/img/pulpa deshidratada.png",
      origen: "Perú",
      certificacion: "Natural",
      variedad: "Concentrada",
      temporada: "Todo el año"
    },
    7: {
      id: 7,
      nombre: "Yogurt de Pitahaya",
      etiqueta: "Lácteo",
      descripcion: "Cremoso, natural y lleno del sabor único de nuestra pitahaya orgánica.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      origen: "Perú",
      certificacion: "Natural",
      variedad: "Frutado",
      temporada: "Semanal"
    },
    8: {
      id: 8,
      nombre: "Yogurt Premium",
      etiqueta: "Premium",
      descripcion: "Con trozos reales de pitahaya fresca y sin colorantes artificiales.",
      imagen: "/static/img/yogurt_Premium.png",
      origen: "Perú",
      certificacion: "Premium",
      variedad: "Con fruta Real",
      temporada: "Especial"
    },
    9: {
      id: 9,
      nombre: "Helado de Pitahaya",
      etiqueta: "Postre",
      descripcion: "Refrescante helado artesanal elaborado con pulpa natural de pitahaya.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      origen: "Perú",
      certificacion: "Artesanal",
      variedad: "Natural",
      temporada: "Todo el año"
    },
    101: {
      id: 101,
      nombre: "Pitahaya American Beauty",
      etiqueta: "Fruta Premium",
      precio: "S/ 23.90",
      category: "Fruta",
      descripcion: "Exquisito sabor dulce con notas de bayas y pulpa fucsia vibrante.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "American Beauty",
      temporada: "Todo el año"
    },
    102: {
      id: 102,
      nombre: "Pitahaya Amarilla Palora",
      etiqueta: "Fruta Dulce",
      precio: "S/ 19.90",
      category: "Fruta",
      descripcion: "La variedad más dulce del mercado, ideal para la digestión.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Palora",
      temporada: "Todo el año"
    },
    103: {
      id: 103,
      nombre: "Pitahaya Híbrida Tesoro",
      etiqueta: "Fruta Especial",
      precio: "S/ 18.50",
      category: "Fruta",
      descripcion: "Equilibrio perfecto entre dulzor y acidez con textura firme.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Híbrida",
      temporada: "Todo el año"
    },
    104: {
      id: 104,
      nombre: "Pitahaya Blanca",
      etiqueta: "Fruta Ligera",
      precio: "S/ 14.90",
      category: "Fruta",
      descripcion: "Ligera, refrescante y perfecta para ensaladas o dietas saludables.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Blanca",
      temporada: "Todo el año"
    },
    105: {
      id: 105,
      nombre: "Pitahaya Roja",
      etiqueta: "Alta en antioxidantes",
      precio: "S/ 21.90",
      category: "Fruta",
      descripcion: "Piel roja intensa y pulpa blanca, cargada de vitamina C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Roja",
      temporada: "Todo el año"
    },
    106: {
      id: 106,
      nombre: "Pitahaya Golden Dragon",
      etiqueta: "Fruta Exótica",
      precio: "S/ 24.90",
      category: "Fruta",
      descripcion: "Variedad dorada de piel lisa, apreciada por su aroma floral.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Golden",
      temporada: "Todo el año"
    },
    107: {
      id: 107,
      nombre: "Pitahaya Purpúrea",
      etiqueta: "Color Natural",
      precio: "S/ 22.50",
      category: "Fruta",
      descripcion: "Rica en antocianinas, con un color morado profundo y dulce sabor.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Púrpura",
      temporada: "Todo el año"
    },
    108: {
      id: 108,
      nombre: "Pitahaya Vietnam",
      etiqueta: "Alta Frescura",
      precio: "S/ 17.90",
      category: "Fruta",
      category: "Importada",
      descripcion: "Excelente tiempo de conservación post-cosecha y gran tamaño.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Importado",
      certificacion: "Calidad Premium",
      variedad: "Vietnamita",
      temporada: "Todo el año"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitahaya",
      etiqueta: "Fruta Premium",
      precio: "S/ 26.90",
      category: "Fruta",
      category: "Importada",
      descripcion: "Frutos grandes y carnosos con un sabor sumamente intenso.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Orgánico",
      variedad: "Costa Rica",
      temporada: "Todo el año"
    },
    109: {
      id: 109,
      nombre: "Néctar Orgánico",
      etiqueta: "100% Natural",
      descripcion: "Bebida prensada en frío, conservando todas sus propiedades.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Líquido Natural",
      temporada: "Todo el año"
    },
    110: {
      id: 110,
      nombre: "Mermelada Orgánica",
      etiqueta: "Artesanal",
      descripcion: "Endulzada con panela orgánica para un perfil más saludable.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Artesanal Panela",
      temporada: "Todo el año"
    },
    111: {
      id: 111,
      nombre: "Yogur Orgánico",
      etiqueta: "Probiótico",
      descripcion: "Yogur griego estilo artesanal con base de pitahaya orgánica.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Griego",
      temporada: "Todo el año"
    },
    112: {
      id: 112,
      nombre: "Pulpa Orgánica",
      etiqueta: "Snack Natural",
      descripcion: "Rodajas deshidratadas a baja temperatura para conservar nutrientes.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Deshidratada",
      temporada: "Todo el año"
    },
    113: {
      id: 113,
      nombre: "Extracto Orgánico",
      etiqueta: "Súper alimento",
      descripcion: "Shot concentrado rico en antioxidantes naturales y fibra.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Concentrado",
      temporada: "Todo el año"
    },
    114: {
      id: 114,
      nombre: "Pitahaya Orgánica",
      precio: "S/ 24.50",
      category: "Fruta",
      etiqueta: "Alta Calidad",
      descripcion: "Los mejores ejemplares de la cosecha, seleccionados por tamaño.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Híbrida Premium",
      temporada: "Todo el año"
    },
    115: {
      id: 115,
      nombre: "Néctar Premium Orgánico",
      etiqueta: "Línea Elite",
      descripcion: "Máxima pureza, extraído de la variedad American Beauty.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Premium Gold",
      temporada: "Todo el año"
    },
    116: {
      id: 116,
      nombre: "Snacks Orgánicos",
      etiqueta: "Saludable",
      descripcion: "Crocantes láminas de pitahaya sin azúcares añadidos.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Deshidratado",
      temporada: "Todo el año"
    },
    117: {
      id: 117,
      nombre: "Jarabe Orgánico",
      etiqueta: "Endulzante Natural",
      descripcion: "Jarabe botánico ideal para coctelería y postres saludables.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      origen: "Perú",
      certificacion: "Orgánico",
      variedad: "Botánico",
      temporada: "Todo el año"
    },
    118: {
      id: 118,
      nombre: "Pulpa Concentrada",
      etiqueta: "100% Natural",
      descripcion: "Base ideal para la industria alimentaria y repostería.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      origen: "Perú",
      certificacion: "Natural",
      variedad: "Concentrada",
      temporada: "Todo el año"
    },
    119: {
      id: 119,
      nombre: "Mermelada Lote 2",
      etiqueta: "Hecho a mano",
      descripcion: "Elaborada en pequeños lotes siguiendo recetas tradicionales.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      origen: "Perú",
      certificacion: "Artesanal",
      variedad: "Clásica",
      temporada: "Todo el año"
    },
    121: {
      id: 121,
      nombre: "Pitahaya Púrpura Intensa",
      etiqueta: "Superalimento",
      titulo: "El Poder de los Antioxidantes",
      descripcion: "Una variedad excepcional, famosa por su pulpa de color púrpura intenso, rica en betalaínas y antioxidantes que combaten el envejecimiento celular.",
      imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
      origen: "Cañete, Perú",
      certificacion: "100% Orgánico",
      variedad: "Púrpura Intensa",
      temporada: "Todo el año",
      precio: "S/ 24.50",
      category: "Fruta",
      bondades: ["Máximo Poder Antioxidante", "Protección Celular", "Sabor Profundo a Frutos Rojos", "Ideal para Jugos y Postres"]
    }
  },
  en: {
    1: {
      id: 1,
      nombre: "Refreshing Fuchsia Pitahaya Juice",
      etiqueta: "Pitahaya Juice",
      titulo: "The Valley's Treasure",
      descripcion: "Peruvian fruit harvested at its perfect ripeness, sweet and fresh.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Peru",
      certificacion: "100% Organic",
      variedad: "American Beauty",
      temporada: "October - January",
      bondades: ["Rich in Vitamin C", "Suitable for Diabetics", "Natural Antioxidants", "Natural Laxative"]
    },
    3: {
      id: 3,
      nombre: "Artisanal Jam",
      etiqueta: "By-product",
      titulo: "Artisanal Tradition",
      descripcion: "Each jar preserves the authentic taste of Peruvian organic pitahaya.",
      imagen: "/static/img/mermelada artesanal.png",
      origen: "Peru",
      certificacion: "Artisanal",
      variedad: "Classic",
      temporada: "All year round",
      bondades: ["100% Natural", "Preservative Free", "Rich in Fiber", "Ideal for Breakfast"]
    },
    4: {
      id: 4,
      nombre: "Premium Jam",
      etiqueta: "Premium",
      titulo: "Special Edition",
      descripcion: "Special edition with higher fruit concentration and intense flavor.",
      imagen: "/static/img/MermeladaP.png",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "High concentration",
      temporada: "Limited",
      bondades: ["High Concentration", "Intense Flavor", "Limited Edition", "Perfect Gift"]
    },
    5: {
      id: 5,
      nombre: "Natural Nectar",
      etiqueta: "Beverage",
      titulo: "Pure Refreshment",
      descripcion: "Natural pitahaya beverage, light and refreshing.",
      imagen: "/static/img/Nectar Natural.png",
      origen: "Peru",
      certificacion: "100% Natural",
      variedad: "Sugar free",
      temporada: "All year round",
      bondades: ["No Added Sugar", "Low Calories", "Natural Vitamin C", "Hydrating"]
    },
    6: {
      id: 6,
      nombre: "Special Pack",
      etiqueta: "Combo",
      descripcion: "Curated combination of our best products in a gift box.",
      imagen: "/static/img/packEspecial.jpeg",
      origen: "Peru",
      certificacion: "Special",
      variedad: "Varied Mix",
      temporada: "Campaign"
    },
    7.5: {
      id: 7.5,
      nombre: "Dehydrated Pulp",
      etiqueta: "Ingredient",
      descripcion: "Pitahaya concentrate for smoothies, desserts, and healthy recipes.",
      imagen: "/static/img/pulpa deshidratada.png",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Concentrated",
      temporada: "All year round"
    },
    7: {
      id: 7,
      nombre: "Pitahaya Yogurt",
      etiqueta: "Dairy",
      descripcion: "Creamy, natural and full of the unique flavor of our organic pitahaya.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Fruity",
      temporada: "Weekly"
    },
    8: {
      id: 8,
      nombre: "Premium Yogurt",
      etiqueta: "Premium",
      descripcion: "With real pieces of fresh pitahaya and no artificial colorants.",
      imagen: "/static/img/yogurt_Premium.png",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "With Real Fruit",
      temporada: "Special"
    },
    9: {
      id: 9,
      nombre: "Pitahaya Ice Cream",
      etiqueta: "Dessert",
      descripcion: "Refreshing artisanal ice cream made with natural pitahaya pulp.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      origen: "Peru",
      certificacion: "Artisanal",
      variedad: "Natural",
      temporada: "All year round"
    },
    101: {
      id: 101,
      nombre: "American Beauty Pitahaya",
      etiqueta: "Premium Fruit",
      precio: "S/ 23.90",
      category: "Fruit",
      descripcion: "Exquisite sweet flavor with berry notes and vibrant fuchsia pulp.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "American Beauty",
      temporada: "All year round"
    },
    102: {
      id: 102,
      nombre: "Palora Yellow Pitahaya",
      etiqueta: "Sweet Fruit",
      precio: "S/ 19.90",
      category: "Fruit",
      descripcion: "The sweetest variety on the market, ideal for digestion.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Palora",
      temporada: "All year round"
    },
    103: {
      id: 103,
      nombre: "Tesoro Hybrid Pitahaya",
      etiqueta: "Special Fruit",
      precio: "S/ 18.50",
      category: "Fruit",
      descripcion: "Perfect balance between sweetness and acidity with firm texture.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Hybrid",
      temporada: "All year round"
    },
    104: {
      id: 104,
      nombre: "White Pitahaya",
      etiqueta: "Light Fruit",
      precio: "S/ 14.90",
      category: "Fruit",
      descripcion: "Light, refreshing and perfect for salads or healthy diets.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "White",
      temporada: "All year round"
    },
    105: {
      id: 105,
      nombre: "Red Pitahaya",
      etiqueta: "High in antioxidants",
      precio: "S/ 21.90",
      category: "Fruit",
      descripcion: "Intense red skin and white pulp, loaded with vitamin C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Red",
      temporada: "All year round"
    },
    106: {
      id: 106,
      nombre: "Golden Dragon Pitahaya",
      etiqueta: "Exotic Fruit",
      precio: "S/ 24.90",
      category: "Fruit",
      descripcion: "Golden variety with smooth skin, prized for its floral aroma.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Golden",
      temporada: "All year round"
    },
    107: {
      id: 107,
      nombre: "Purple Pitahaya",
      etiqueta: "Natural Color",
      precio: "S/ 22.50",
      category: "Fruit",
      descripcion: "Rich in anthocyanins, with a deep purple color and sweet taste.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Purple",
      temporada: "All year round"
    },
    108: {
      id: 108,
      nombre: "Vietnam Pitahaya",
      etiqueta: "High Freshness",
      precio: "S/ 17.90",
      category: "Fruit",
      descripcion: "Excellent post-harvest storage time and large size.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Imported",
      certificacion: "Premium Quality",
      variedad: "Vietnamese",
      temporada: "All year round"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitahaya",
      etiqueta: "Premium Fruit",
      precio: "S/ 26.90",
      category: "Fruit",
      descripcion: "Large and fleshy fruits with a highly intense flavor.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Organic",
      variedad: "Costa Rica",
      temporada: "All year round"
    },
    109: {
      id: 109,
      nombre: "Organic Nectar",
      etiqueta: "100% Natural",
      descripcion: "Cold-pressed beverage, conserving all its properties.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Natural Liquid",
      temporada: "All year round"
    },
    110: {
      id: 110,
      nombre: "Organic Jam",
      etiqueta: "Artisanal",
      descripcion: "Sweetened with organic panela for a healthier profile.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Artisanal Panela",
      temporada: "All year round"
    },
    111: {
      id: 111,
      nombre: "Organic Yogurt",
      etiqueta: "Probiotic",
      descripcion: "Artisanal style Greek yogurt with an organic pitahaya base.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Greek",
      temporada: "All year round"
    },
    112: {
      id: 112,
      nombre: "Organic Pulp",
      etiqueta: "Natural Snack",
      descripcion: "Slices dehydrated at a low temperature to preserve nutrients.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Dehydrated",
      temporada: "All year round"
    },
    113: {
      id: 113,
      nombre: "Organic Extract",
      etiqueta: "Superfood",
      descripcion: "Concentrated shot rich in natural antioxidants and fiber.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Concentrate",
      temporada: "All year round"
    },
    114: {
      id: 114,
      nombre: "Organic Pitahaya",
      precio: "S/ 24.50",
      category: "Fruit",
      etiqueta: "High Quality",
      descripcion: "The finest specimens of the harvest, selected by size.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Premium Hybrid",
      temporada: "All year round"
    },
    115: {
      id: 115,
      nombre: "Organic Premium Nectar",
      etiqueta: "Elite Line",
      descripcion: "Maximum purity, extracted from the American Beauty variety.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Premium Gold",
      temporada: "All year round"
    },
    116: {
      id: 116,
      nombre: "Organic Snacks",
      etiqueta: "Healthy",
      descripcion: "Crisp pitahaya slices with no added sugars.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Dehydrated",
      temporada: "All year round"
    },
    117: {
      id: 117,
      nombre: "Organic Syrup",
      etiqueta: "Natural Sweetener",
      descripcion: "Botanical syrup ideal for cocktails and healthy desserts.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      origen: "Peru",
      certificacion: "Organic",
      variedad: "Botanical",
      temporada: "All year round"
    },
    118: {
      id: 118,
      nombre: "Concentrated Pulp",
      etiqueta: "100% Natural",
      descripcion: "Ideal base for the food industry and baking.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Concentrated",
      temporada: "All year round"
    },
    119: {
      id: 119,
      nombre: "Batch 2 Jam",
      etiqueta: "Handmade",
      descripcion: "Crafted in small batches following traditional recipes.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      origen: "Peru",
      certificacion: "Artisanal",
      variedad: "Classic",
      temporada: "All year round"
      
    },
    121: {
  id: 121,
  nombre: "Deep Purple Pitahaya",
  etiqueta: "Superfood",
  titulo: "The Power of Antioxidants",
  descripcion: "An exceptional variety, famous for its deep purple pulp, rich in betalains and antioxidants that combat cellular aging.",
  imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
  origen: "Cañete, Peru",
  certificacion: "100% Organic",
  variedad: "Deep Purple",
  temporada: "All year round",
  precio: "S/ 24.50",
  category: "Fruta",
  bondades: ["Maximum Antioxidant Power", "Cellular Protection", "Deep Red Fruit Flavor", "Ideal for Juices and Desserts"]
}
  },
  zh: {
    1: {
      id: 1,
      nombre: "清爽枚红火龙果汁",
      etiqueta: "火龙果汁",
      titulo: "山谷的珍宝",
      descripcion: "在最佳成熟度采收的秘鲁水果，清甜爽口。",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "秘鲁，卡涅特",
      certificacion: "100% 有机",
      variedad: "美国丽人 (American Beauty)",
      temporada: "10月 - 1月",
      bondades: ["富含维生素 C", "适合糖尿病患者", "天然抗氧化剂", "天然轻泻调理"]
    },
    3: {
      id: 3,
      nombre: "手工火龙果酱",
      etiqueta: "衍生副产品",
      titulo: "传统手工艺",
      descripcion: "每一罐都保留了秘鲁有机火龙果的正宗风味。",
      imagen: "/static/img/mermelada artesanal.png",
      origen: "秘鲁",
      certificacion: "手工制作",
      variedad: "经典款",
      temporada: "全年供应",
      bondades: ["100% 纯天然", "无防腐剂", "富含膳食纤维", "早餐理想搭配"]
    },
    4: {
      id: 4,
      nombre: "特级精品果酱",
      etiqueta: "特级精品",
      titulo: "特别限定版",
      descripcion: "特别限定版，具有更高的水果浓度和浓郁的风味。",
      imagen: "/static/img/MermeladaP.png",
      origen: "秘鲁",
      certificacion: "特级精品",
      variedad: "高浓度",
      temporada: "限量供应",
      bondades: ["高果肉浓度", "浓郁风味", "限量发售", "完美礼品"]
    },
    5: {
      id: 5,
      nombre: "天然果蜜果汁",
      etiqueta: "饮品",
      titulo: "纯粹清爽",
      descripcion: "纯天然火龙果饮品，口感轻盈清爽。",
      imagen: "/static/img/Nectar Natural.png",
      origen: "秘鲁",
      certificacion: "100% 纯天然",
      variedad: "无糖",
      temporada: "全年供应",
      bondades: ["无添加糖", "低卡路里", "天然维生素 C", "补水解渴"]
    },
    6: {
      id: 6,
      nombre: "特选尊享礼盒",
      etiqueta: "精选组合",
      descripcion: "精心搭配的明星产品精选，配有精美礼盒包装。",
      imagen: "/static/img/packEspecial.jpeg",
      origen: "秘鲁",
      certificacion: "特选级",
      variedad: "多种风味混搭",
      temporada: "特定活动期"
    },
    7.5: {
      id: 7.5,
      nombre: "冷冻脱水干果肉",
      etiqueta: "原材料成分",
      descripcion: "高浓缩火龙果肉，适用于奶昔、甜点和健康食谱。",
      imagen: "/static/img/pulpa deshidratada.png",
      origen: "秘鲁",
      certificacion: "纯天然",
      variedad: "浓缩型",
      temporada: "全年供应"
    },
    7: {
      id: 7,
      nombre: "火龙果酸奶",
      etiqueta: "乳制品",
      descripcion: "口感细腻顺滑，融入了我们有机火龙果的独特风味。",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      origen: "秘鲁",
      certificacion: "纯天然",
      variedad: "果粒风味",
      temporada: "每周新鲜供应"
    },
    8: {
      id: 8,
      nombre: "特级精品酸奶",
      etiqueta: "特级精品",
      descripcion: "添加真实新鲜火龙果果粒，绝不添加人工色素。",
      imagen: "/static/img/yogurt_Premium.png",
      origen: "秘鲁",
      certificacion: "特级精品",
      variedad: "含真实果肉",
      temporada: "特别供应"
    },
    9: {
      id: 9,
      nombre: "火龙果冰淇淋",
      etiqueta: "甜点",
      descripcion: "清爽的手工冰淇淋，采用纯天然火龙果肉精制而成。",
      imagen: "/static/img/Helado de Pitahaya.webp",
      origen: "秘鲁",
      certificacion: "手工制作",
      variedad: "纯天然",
      temporada: "全年供应"
    },
    101: {
      id: 101,
      nombre: "美国丽人火龙果",
      etiqueta: "特级精品水果",
      precio: "S/ 23.90",
      category: "水果",
      descripcion: "精致清甜的口感，带有淡淡浆果香，果肉呈明亮的枚红色。",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "美国丽人 (American Beauty)",
      temporada: "全年供应"
    },
    102: {
      id: 102,
      nombre: "帕洛拉燕窝黄火龙果",
      etiqueta: "高甜度水果",
      precio: "S/ 19.90",
      category: "水果",
      descripcion: "市面上甜度极高的品种，对肠胃消化非常有益。",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "帕洛拉 (Palora)",
      temporada: "全年供应"
    },
    103: {
      id: 103,
      nombre: "宝藏杂交红火龙果",
      etiqueta: "特选品种水果",
      precio: "S/ 18.50",
      category: "水果",
      descripcion: "酸甜比例近乎完美，果肉紧致饱满。",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "杂交品种",
      temporada: "全年供应"
    },
    104: {
      id: 104,
      nombre: "白心火龙果",
      etiqueta: "轻食低卡水果",
      precio: "S/ 14.90",
      category: "水果",
      descripcion: "口感轻盈清爽，非常适合沙拉或健康减脂饮食。",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "白心品种",
      temporada: "全年供应"
    },
    105: {
      id: 105,
      nombre: "红皮白心火龙果",
      etiqueta: "高抗氧化",
      precio: "S/ 21.90",
      category: "水果",
      descripcion: "鲜红的外皮与白色的果肉，蕴含丰富的维生素 C。",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "红皮白心",
      temporada: "全年供应"
    },
    106: {
      id: 106,
      nombre: "金龙黄火龙果",
      etiqueta: "稀有珍贵水果",
      precio: "S/ 24.90",
      category: "水果",
      descripcion: "光滑表皮的金黄色品种，因其独特的独特花香而备受推崇。",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "黄金品种",
      temporada: "全年供应"
    },
    107: {
      id: 107,
      nombre: "深紫火龙果",
      etiqueta: "天然色彩",
      precio: "S/ 22.50",
      category: "水果",
      descripcion: "富含花青素，色泽深紫华丽，口感浓郁甘甜。",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "紫心品种",
      temporada: "全年供应"
    },
    108: {
      id: 108,
      nombre: "越南火龙果",
      etiqueta: "极高保鲜度",
      precio: "S/ 17.90",
      category: "水果",
      descripcion: "采收后具备极佳的耐储藏寿命，且果实硕大。",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "进口水果",
      certificacion: "特级精品品质",
      variedad: "越南品种",
      temporada: "全年供应"
    },
    120: {
      id: 120,
      nombre: "哥斯达黎加火龙果",
      etiqueta: "顶级精选水果",
      precio: "S/ 26.90",
      category: "水果",
      descripcion: "果实硕大饱满，果肉丰厚，风味极为浓郁醇厚。",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "哥斯达黎加",
      certificacion: "有机认证",
      variedad: "哥斯达黎加品种",
      temporada: "全年供应"
    },
    109: {
      id: 109,
      nombre: "纯有机冷榨果蜜",
      etiqueta: "100% 纯天然",
      descripcion: "采用冷榨工艺制作的饮品，完好保留了原果的所有营养营养成分。",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "纯天然纯原液",
      temporada: "全年供应"
    },
    110: {
      id: 110,
      nombre: "有机纯手工果酱",
      etiqueta: "手工制作",
      descripcion: "使用纯有机红糖（Panela）调味，带来更健康的轻负担选择。",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "手工红糖款",
      temporada: "全年供应"
    },
    111: {
      id: 111,
      nombre: "有机益生菌酸奶",
      etiqueta: "含活性益生菌",
      descripcion: "传统风味希腊酸奶，以天然有机火龙果为黄金底层铺垫。",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "希腊风味",
      temporada: "全年供应"
    },
    112: {
      id: 112,
      nombre: "有机脱水干果片",
      etiqueta: "健康天然零食",
      descripcion: "采用低温轻柔脱水烘干的果片，锁住纯正天然果肉营养。",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "低温脱水片",
      temporada: "全年供应"
    },
    113: {
      id: 113,
      nombre: "高浓缩有机纯原汁",
      etiqueta: "超级食品",
      descripcion: "浓缩精华饮品，富含强大的天然抗氧化剂与丰富膳食纤维。",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "高浓缩原汁",
      temporada: "全年供应"
    },
    114: {
      id: 114,
      nombre: "臻选有机火龙果",
      precio: "S/ 24.50",
      category: "水果",
      etiqueta: "高标准品控",
      descripcion: "从丰收产物中严苛甄选，在个头和外观上均属上乘的极品珍果。",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "特级精品杂交种",
      temporada: "全年供应"
    },
    115: {
      id: 115,
      nombre: "顶级有机尊享果蜜",
      etiqueta: "尊享高端系列",
      descripcion: "极致纯净的品质，100% 提取自极品美国丽人火龙果肉。",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "金牌至尊款",
      temporada: "全年供应"
    },
    116: {
      id: 116,
      nombre: "有机火龙果脆片 snacks",
      etiqueta: "健康养生轻食",
      descripcion: "香脆美味的火龙果薄片，绝无添加任何多余糖分。",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "香脆脱水片",
      temporada: "全年供应"
    },
    117: {
      id: 117,
      nombre: "有机天然果味糖浆",
      etiqueta: "天然调味糖浆",
      descripcion: "纯正植物基提取糖浆，是高端调酒和健康烘焙甜点的完美绝配。",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      origen: "秘鲁",
      certificacion: "有机认证",
      variedad: "纯植物提炼",
      temporada: "全年供应"
    },
    118: {
      id: 118,
      nombre: "全天然高浓缩果泥",
      etiqueta: "100% 纯天然",
      descripcion: "食品加工工业、高端烘焙和精致甜点制作的理想商用原料基地。",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      origen: "秘鲁",
      certificacion: "纯天然认证",
      variedad: "工业商用浓缩泥",
      temporada: "全年供应"
    },
    119: {
      id: 119,
      nombre: "手工限量版果酱（批次2）",
      etiqueta: "纯手工小批次",
      descripcion: "秉承小批量古法慢熬手艺，完美还原最传统的至纯风味。",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      origen: "秘鲁",
      certificacion: "手工特产认证",
      variedad: "经典匠心款",
      temporada: "全年供应"
    },
  121: {
  id: 121,
  nombre: "浓郁紫火龙果",
  etiqueta: "超级食物",
  titulo: "抗氧化剂的力量",
  descripcion: "一个极其卓越 confirmation 的品种，以其浓郁的紫色果肉而闻名，富含甜菜红素和抗氧化剂，能有效对抗细胞衰老。",
  imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
  origen: "秘鲁，卡涅特",
  certificacion: "100% 有机认证",
  variety: "浓郁紫", // Se mantiene la propiedad o traducción según tu mapeo
  variedad: "浓郁紫", 
  temporada: "全年供应",
  precio: "S/ 24.50",
  category: "Fruta",
  bondades: ["极致抗氧化功效", "细胞屏障保护", "浓郁红莓风味", "果汁与甜品的绝佳选择"]
}
  },
  fr: {
    1: {
      id: 1,
      nombre: "Jus Rafraîchissant de Pitaya Fuchsia",
      etiqueta: "Jus de Pitaya",
      titulo: "Le Trésor de la Vallée",
      descripcion: "Fruit péruvien récolté à sa maturité idéale, doux et frais.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Pérou",
      certificacion: "100% Biologique",
      variedad: "American Beauty",
      temporada: "Octobre - Janvier",
      bondades: ["Riche en Vitamine C", "Adapté aux Diabétiques", "Antioxydants Naturels", "Laxatif Naturel"]
    },
    3: {
      id: 3,
      nombre: "Confiture Artisanale",
      etiqueta: "Dérivé",
      titulo: "Tradition Artisanale",
      descripcion: "Chaque pot conserve la saveur authentique du pitaya biologique péruvien.",
      imagen: "/static/img/mermelada artesanal.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Artisanale",
      variedad: "Classique",
      temporada: "Toute l'année",
      bondades: ["100% Naturel", "Sans Conservateurs", "Riche en Fibres", "Idéal pour le Petit-déjeuner"]
    },
    4: {
      id: 4,
      nombre: "Confiture Premium",
      etiqueta: "Premium",
      titulo: "Édition Spéciale",
      descripcion: "Édition spéciale avec une plus grande concentration de fruits et une saveur intense.",
      imagen: "/static/img/MermeladaP.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Premium",
      variedad: "Haute concentration",
      temporada: "Limitée",
      bondades: ["Haute Concentration", "Saveur Intense", "Édition Limitée", "Cadeau Parfait"]
    },
    5: {
      id: 5,
      nombre: "Nectar Naturel",
      etiqueta: "Boisson",
      titulo: "Pure Fraîcheur",
      descripcion: "Boisson naturelle de pitaya, légère et rafraîchissante.",
      imagen: "/static/img/Nectar Natural.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "100% Naturel",
      variedad: "Sans sucre",
      temporada: "Toute l'année",
      bondades: ["Sans Sucre Ajouté", "Faible en Calories", "Vitamine C Naturelle", "Hydratant"]
    },
    6: {
      id: 6,
      nombre: "Pack Spécial",
      etiqueta: "Combo",
      descripcion: "Combinaison sélectionnée de nos meilleurs produits dans un coffret cadeau.",
      imagen: "/static/img/packEspecial.jpeg",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Spécial",
      variedad: "Mix Varié",
      temporada: "Campagne"
    },
    7.5: {
      id: 7.5,
      nombre: "Pulpe Déshydratée",
      etiqueta: "Ingrédient",
      descripcion: "Concentré de pitaya pour smoothies, desserts et recettes saines.",
      imagen: "/static/img/pulpa deshidratada.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Naturel",
      variedad: "Concentrée",
      temporada: "Toute l'année"
    },
    7: {
      id: 7,
      nombre: "Yaourt au Pitaya",
      etiqueta: "Laitage",
      descripcion: "Crémeux, naturel et plein de la saveur unique de notre pitaya biologique.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Naturel",
      variedad: "Aux fruits",
      temporada: "Hebdomadaire"
    },
    8: {
      id: 8,
      nombre: "Yaourt Premium",
      etiqueta: "Premium",
      descripcion: "Avec de vrais morceaux de pitaya frais et sans colorants artificiels.",
      imagen: "/static/img/yogurt_Premium.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Premium",
      variedad: "Avec de vrais fruits",
      temporada: "Spécial"
    },
    9: {
      id: 9,
      nombre: "Glace au Pitaya",
      etiqueta: "Dessert",
      descripcion: "Glace artisanale rafraîchissante élaborée avec de la pulpe naturelle de pitaya.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Artisanale",
      variedad: "Naturelle",
      temporada: "Toute l'année"
    },
    101: {
      id: 101,
      nombre: "Pitaya American Beauty",
      etiqueta: "Fruit Premium",
      precio: "S/ 23.90",
      category: "Fruit",
      descripcion: "Exquise saveur douce avec des notes de baies et une pulpe fuchsia vibrante.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "American Beauty",
      temporada: "Toute l'année"
    },
    102: {
      id: 102,
      nombre: "Pitaya Jaune Palora",
      etiqueta: "Fruit Doux",
      precio: "S/ 19.90",
      category: "Fruit",
      descripcion: "La variété la plus douce du marché, idéale pour la digestion.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Palora",
      temporada: "Toute l'année"
    },
    103: {
      id: 103,
      nombre: "Pitaya Hybride Tesoro",
      etiqueta: "Fruit Spécial",
      precio: "S/ 18.50",
      category: "Fruit",
      descripcion: "Équilibre parfait entre douceur et acidité avec une texture ferme.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Hybride",
      temporada: "Toute l'année"
    },
    104: {
      id: 104,
      nombre: "Pitaya Blanc",
      etiqueta: "Fruit Léger",
      precio: "S/ 14.90",
      category: "Fruit",
      descripcion: "Léger, rafraîchissant et parfait pour les salades ou les régimes sains.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Blanc",
      temporada: "Toute l'année"
    },
    105: {
      id: 105,
      nombre: "Pitaya Rouge",
      etiqueta: "Riche en antoxydants",
      precio: "S/ 21.90",
      category: "Fruit",
      descripcion: "Peau rouge intense et pulpe blanche, gorgée de vitamine C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Rouge",
      temporada: "Toute l'année"
    },
    106: {
      id: 106,
      nombre: "Pitaya Golden Dragon",
      etiqueta: "Fruit Exotique",
      precio: "S/ 24.90",
      category: "Fruit",
      descripcion: "Variété dorée à la peau lisse, appréciée pour son arôme floral.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Golden",
      temporada: "Toute l'année"
    },
    107: {
      id: 107,
      nombre: "Pitaya Pourpre",
      etiqueta: "Couleur Naturelle",
      precio: "S/ 22.50",
      category: "Fruit",
      descripcion: "Riche en anthocyanes, avec une couleur violet profond et une saveur douce.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Pourpre",
      temporada: "Toute l'année"
    },
    108: {
      id: 108,
      nombre: "Pitaya Vietnam",
      etiqueta: "Haute Fraîcheur",
      precio: "S/ 17.90",
      category: "Fruit",
      descripcion: "Excellente durée de conservation après récolte et grande taille.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Importé",
      certificacion: "Qualité Premium",
      variedad: "Vietnamienne",
      temporada: "Toute l'année"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitaya",
      etiqueta: "Fruit Premium",
      precio: "S/ 26.90",
      category: "Fruit",
      descripcion: "Fruits grands et charnus avec une saveur extrêmement intense.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Biologique",
      variedad: "Costa Rica",
      temporada: "Toute l'année"
    },
    109: {
      id: 109,
      nombre: "Nectar Biologique",
      etiqueta: "100% Naturel",
      descripcion: "Boisson pressée à froid, conservant toutes ses propriétés.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Liquide Naturel",
      temporada: "Toute l'année"
    },
    110: {
      id: 110,
      nombre: "Confiture Biologique",
      etiqueta: "Artisanale",
      descripcion: "Édulcorée avec de la panela biologique pour un profil plus sain.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Artisanale Panela",
      temporada: "Toute l'année"
    },
    111: {
      id: 111,
      nombre: "Yaourt Biologique",
      etiqueta: "Probiotique",
      descripcion: "Yaourt grec de style artisanal sur une base de pitaya biologique.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Grec",
      temporada: "Toute l'année"
    },
    112: {
      id: 112,
      nombre: "Pulpe Biologique",
      etiqueta: "Snack Naturel",
      descripcion: "Tranches déshydratées à basse température pour conserver les nutriments.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Déshydratée",
      temporada: "Toute l'année"
    },
    113: {
      id: 113,
      nombre: "Extrait Biologique",
      etiqueta: "Super-aliment",
      descripcion: "Shot concentré riche en antioxydants naturels et en fibres.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Concentré",
      temporada: "Toute l'année"
    },
    114: {
      id: 114,
      nombre: "Pitaya Biologique",
      precio: "S/ 24.50",
      category: "Fruit",
      etiqueta: "Haute Qualité",
      descripcion: "Les meilleurs exemplaires de la récolte, sélectionnés par taille.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Hybride Premium",
      temporada: "Toute l'année"
    },
    115: {
      id: 115,
      nombre: "Nectar Premium Biologique",
      etiqueta: "Ligne Élite",
      descripcion: "Pureté maximale, extrait de la variété American Beauty.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Premium Gold",
      temporada: "Toute l'année"
    },
    116: {
      id: 116,
      nombre: "Snacks Biologiques",
      etiqueta: "Sain",
      descripcion: "Croustillantes lamelles de pitaya sans sucres ajoutés.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Déshydraté",
      temporada: "Toute l'année"
    },
    117: {
      id: 117,
      nombre: "Sirop Biologique",
      etiqueta: "Édulcorant Naturel",
      descripcion: "Sirop botanique idéal pour la mixologie et les desserts sains.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Biologique",
      variedad: "Botanique",
      temporada: "Toute l'année"
    },
    118: {
      id: 118,
      nombre: "Pulpe Concentrée",
      etiqueta: "100% Naturel",
      descripcion: "Base idéale pour l'industrie alimentaire et la pâtisserie.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Naturel",
      variedad: "Concentrée",
      temporada: "Toute l'année"
    },
    119: {
      id: 119,
      nombre: "Confiture Lot 2",
      etiqueta: "Fait main",
      descripcion: "Élaborée en petits lots en suivant des recettes traditionnelles.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      category: "Derivado",
      origen: "Pérou",
      certificacion: "Artisanale",
      variedad: "Classique",
      temporada: "Toute l'année"
    },
    121: {
      id: 121,
      nombre: "Pitahaya Viola Intenso",
      etiqueta: "Superfood",
      titulo: "Il Potere degli Antiossidanti",
      descripcion: "Una varietà eccezionale, famosa per la sua polpa di un viola intenso, ricca di betalaine e antiossidanti che combattono l'invecchiamento cellulare.",
      imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
      origen: "Cañete, Perù",
      certificacion: "100% Biologico",
      variedad: "Viola Intenso",
      temporada: "Tutto l'anno",
      precio: "S/ 24.50",
      category: "Frutta",
      bondades: ["Massimo Potere Antiossidante", "Protezione Cellulare", "Sapore Profondo di Frutti Rossi", "Ideale per Succhi e Dolci"]
    }
},
it: {
    1: {
      id: 1,
      nombre: "Succo Rinfrescante di Pitaya Fucsia",
      etiqueta: "Succo di Pitaya",
      titulo: "Il Tesoro della Valle",
      descripcion: "Frutto peruviano raccolto nel suo punto ideale, dolce e fresco.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Perù",
      certificacion: "100% Biologico",
      variedad: "American Beauty",
      temporada: "Ottobre - Gennaio",
      bondades: ["Ricco di Vitamina C", "Adatto ai Diabetici", "Antiossidanti Naturali", "Lassativo Naturale"]
    },
    3: {
      id: 3,
      nombre: "Confettura Artigianale",
      etiqueta: "Derivato",
      titulo: "Tradizione Artigianale",
      descripcion: "Ogni barattolo conserva il sapore autentico della pitaya biologica peruviana.",
      imagen: "/static/img/mermelada artesanal.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Artigianale",
      variedad: "Classica",
      temporada: "Tutto l'anno",
      bondades: ["100% Naturale", "Senza Conservanti", "Ricco di Fibre", "Ideale per la Colazione"]
    },
    4: {
      id: 4,
      nombre: "Confettura Premium",
      etiqueta: "Premium",
      titulo: "Edizione Speciale",
      descripcion: "Edizione speciale con una maggiore concentrazione di frutta e un sapore intenso.",
      imagen: "/static/img/MermeladaP.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Premium",
      variedad: "Alta concentrazione",
      temporada: "Limitata",
      bondades: ["Alta Concentrazione", "Sapore Intenso", "Edizione Limitata", "Regalo Perfetto"]
    },
    5: {
      id: 5,
      nombre: "Nettare Naturale",
      etiqueta: "Bevanda",
      titulo: "Pura Freschezza",
      descripcion: "Bevanda naturale di pitaya, leggera e rinfrescante.",
      imagen: "/static/img/Nectar Natural.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "100% Naturale",
      variedad: "Senza zucchero",
      temporada: "Tutto l'anno",
      bondades: ["Senza Zuccheri Aggiunti", "Basso Contenuto Calorico", "Vitamina C Naturale", "Idratante"]
    },
    6: {
      id: 6,
      nombre: "Pack Speciale",
      etiqueta: "Combo",
      descripcion: "Combinazione curata dei nostri migliori prodotti in una confezione regalo.",
      imagen: "/static/img/packEspecial.jpeg",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Speciale",
      variedad: "Mix Variato",
      temporada: "Campagna"
    },
    7.5: {
      id: 7.5,
      nombre: "Polpa Disidratata",
      etiqueta: "Ingrediente",
      descripcion: "Concentrato di pitaya per smoothies, dolci e ricette salutari.",
      imagen: "/static/img/pulpa deshidratada.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Naturale",
      variedad: "Concentrata",
      temporada: "Tutto l'anno"
    },
    7: {
      id: 7,
      nombre: "Yogurt alla Pitaya",
      etiqueta: "Latteria",
      descripcion: "Cremoso, naturale e ricco del sapore unico della nostra pitaya biologica.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Naturale",
      variedad: "Fruttato",
      temporada: "Settimanale"
    },
    8: {
      id: 8,
      nombre: "Yogurt Premium",
      etiqueta: "Premium",
      descripcion: "Con veri pezzi di pitaya fresca e senza coloranti artificiali.",
      imagen: "/static/img/yogurt_Premium.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Premium",
      variedad: "Con vera frutta",
      temporada: "Speciale"
    },
    9: {
      id: 9,
      nombre: "Gelato alla Pitaya",
      etiqueta: "Dolce",
      descripcion: "Rinfrescante gelato artigianale preparato con polpa naturale di pitaya.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Artigianale",
      variedad: "Naturale",
      temporada: "Tutto l'anno"
    },
    101: {
      id: 101,
      nombre: "Pitaya American Beauty",
      etiqueta: "Frutta Premium",
      precio: "S/ 23.90",
      category: "Frutta",
      descripcion: "Squisito sapore dolce con note di bosco e una polpa fucsia vibrante.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "American Beauty",
      temporada: "Tutto l'anno"
    },
    102: {
      id: 102,
      nombre: "Pitaya Gialla Palora",
      etiqueta: "Frutta Dolce",
      precio: "S/ 19.90",
      category: "Frutta",
      descripcion: "La varietà più dolce del mercato, ideale per la digestione.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Palora",
      temporada: "Tutto l'anno"
    },
    103: {
      id: 103,
      nombre: "Pitaya Ibrida Tesoro",
      etiqueta: "Frutta Speciale",
      precio: "S/ 18.50",
      category: "Frutta",
      descripcion: "Perfetto equilibrio tra dolcezza e acidità con una consistenza soda.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Ibrida",
      temporada: "Tutto l'anno"
    },
    104: {
      id: 104,
      nombre: "Pitaya Bianca",
      etiqueta: "Frutta Leggera",
      precio: "S/ 14.90",
      category: "Frutta",
      descripcion: "Leggera, rinfrescante e perfetta per insalate o diete salutari.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Bianca",
      temporada: "Tutto l'anno"
    },
    105: {
      id: 105,
      nombre: "Pitaya Rossa",
      etiqueta: "Ricca in antiossidanti",
      precio: "S/ 21.90",
      category: "Frutta",
      descripcion: "Buccia rossa intensa e polpa bianca, ricca di vitamina C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Rossa",
      temporada: "Tutto l'anno"
    },
    106: {
      id: 106,
      nombre: "Pitaya Golden Dragon",
      etiqueta: "Frutta Esotica",
      precio: "S/ 24.90",
      category: "Frutta",
      descripcion: "Varietà dorata dalla buccia liscia, apprezzata per il suo aroma floreale.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Golden",
      temporada: "Tutto l'anno"
    },
    107: {
      id: 107,
      nombre: "Pitaya Purpurea",
      etiqueta: "Colore Naturale",
      precio: "S/ 22.50",
      category: "Frutta",
      descripcion: "Ricca di antocianine, con un colore viola profondo e un sapore dolce.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Viola",
      temporada: "Tutto l'anno"
    },
    108: {
      id: 108,
      nombre: "Pitaya Vietnam",
      etiqueta: "Alta Freschezza",
      precio: "S/ 17.90",
      category: "Frutta",
      descripcion: "Ottimo tempo di conservazione post-raccolta e grandi dimensioni.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Importato",
      certificacion: "Qualità Premium",
      variedad: "Vietnamita",
      temporada: "Tutto l'anno"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitaya",
      etiqueta: "Frutta Premium",
      precio: "S/ 26.90",
      category: "Frutta",
      descripcion: "Frutti grandi e polposi con un sapore estremamente intenso.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Biologico",
      variedad: "Costa Rica",
      temporada: "Tutto l'anno"
    },
    109: {
      id: 109,
      nombre: "Nettare Biologico",
      etiqueta: "100% Naturale",
      descripcion: "Bevanda estratta a freddo, che conserva intatte tutte le sue proprietà.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Liquido Naturale",
      temporada: "Tutto l'anno"
    },
    110: {
      id: 110,
      nombre: "Confettura Biologica",
      etiqueta: "Artigianale",
      descripcion: "Dolcificata con panela biologica per un profilo più salutare.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Artigianale Panela",
      temporada: "Tutto l'anno"
    },
    111: {
      id: 111,
      nombre: "Yogurt Biologico",
      etiqueta: "Probiotico",
      descripcion: "Yogurt greco in stile artigianale a base di pitaya biologica.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Greco",
      temporada: "Tutto l'anno"
    },
    112: {
      id: 112,
      nombre: "Polpa Biologica",
      etiqueta: "Snack Naturale",
      descripcion: "Fette disidratate a bassa temperatura per preservare i nutrienti.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Disidratata",
      temporada: "Tutto l'anno"
    },
    113: {
      id: 113,
      nombre: "Estratto Biologico",
      etiqueta: "Superalimento",
      descripcion: "Shot concentrato ricco di antiossidanti naturali e fibre.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Concentrato",
      temporada: "Tutto l'anno"
    },
    114: {
      id: 114,
      nombre: "Pitaya Biologica",
      precio: "S/ 24.50",
      category: "Frutta",
      etiqueta: "Alta Qualità",
      descripcion: "I migliori esemplari del raccolto, selezionati per dimensione.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Ibrida Premium",
      temporada: "Tutto l'anno"
    },
    115: {
      id: 115,
      nombre: "Nettare Premium Biologico",
      etiqueta: "Linea Elite",
      descripcion: "Massima purezza, estratto dalla varietà American Beauty.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Premium Gold",
      temporada: "Tutto l'anno"
    },
    116: {
      id: 116,
      nombre: "Snack Biologici",
      etiqueta: "Salutare",
      descripcion: "Croccanti sfoglie di pitaya senza zuccheri aggiunti.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Disidratato",
      temporada: "Tutto l'anno"
    },
    117: {
      id: 117,
      nombre: "Sciroppo Biologico",
      etiqueta: "Dolcificante Naturale",
      descripcion: "Sciroppo botanico ideale per la mixology e dolci salutari.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Biologico",
      variedad: "Botanico",
      temporada: "Tutto l'anno"
    },
    118: {
      id: 118,
      nombre: "Polpa Concentrata",
      etiqueta: "100% Naturale",
      descripcion: "Base ideale per l'industria alimentare e la pasticceria.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Naturale",
      variedad: "Concentrata",
      temporada: "Tutto l'anno"
    },
    119: {
      id: 119,
      nombre: "Confettura Lotto 2",
      etiqueta: "Fatto a mano",
      descripcion: "Preparata in piccoli lotti seguendo ricette tradizionali.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      category: "Derivado",
      origen: "Perù",
      certificacion: "Artigianale",
      variedad: "Classica",
      temporada: "Tutto l'anno"
    },
    121: {
      id: 121,
      nombre: "Pitahaya Pourpre Intense",
      etiqueta: "Superaliment",
      titulo: "Le Pouvoir des Antioxydants",
      descripcion: "Une variété exceptionnelle, célèbre pour sa pulpe d'un pourpre intense, riche en bétalaïnes et en antioxydants qui combattent le vieillissement cellulaire.",
      imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
      origen: "Cañete, Pérou",
      certificacion: "100% Biologique",
      variedad: "Pourpre Intense",
      temporada: "Toute l'année",
      precio: "S/ 24.50",
      category: "Fruit",
      bondades: ["Pouvoir Antioxydant Maximal", "Protection Cellulaire", "Saveur Profonde de Fruits Rouges", "Idéal pour Jus et Desserts"]
    }
},
de: {
    1: {
      id: 1,
      nombre: "Erfrischender fuchsiafarbener Pitahaya-Saft",
      etiqueta: "Pitahaya-Saft",
      titulo: "Der Schatz des Tals",
      descripcion: "Peruanische Frucht, im idealen Reifegrad geerntet, süß und frisch.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Peru",
      certificacion: "100% Biologisch",
      variedad: "American Beauty",
      temporada: "Oktober - Januar",
      bondades: ["Reich an Vitamin C", "Für Diabetiker geeignet", "Natürliche Antioxidantien", "Natürliches Abführmittel"]
    },
    3: {
      id: 3,
      nombre: "Hausgemachte Marmelade",
      etiqueta: "Fruchterzeugnis",
      titulo: "Traditionelles Handwerk",
      descripcion: "Jedes Glas bewahrt den authentischen Geschmack der peruanischen Bio-Pitahaya.",
      imagen: "/static/img/mermelada artesanal.png",
      origen: "Peru",
      certificacion: "Handwerklich",
      variedad: "Klassisch",
      temporada: "Ganzjährig",
      bondades: ["100% Natürlich", "Ohne Konservierungsstoffe", "Ballaststoffreich", "Ideal fürs Frühstück"]
    },
    4: {
      id: 4,
      nombre: "Premium-Marmelade",
      etiqueta: "Premium",
      titulo: "Sonderedition",
      descripcion: "Sonderedition mit höherer Fruchtkonzentration und intensivem Geschmack.",
      imagen: "/static/img/MermeladaP.png",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "Hohe Konzentration",
      temporada: "Limitiert",
      bondades: ["Hohe Konzentration", "Intensiver Geschmack", "Limitierte Auflage", "Perfektes Geschenk"]
    },
    5: {
      id: 5,
      nombre: "Natürlicher Nektar",
      etiqueta: "Getränk",
      titulo: "Reine Erfrischung",
      descripcion: "Natürliches Pitahaya-Getränk, leicht und erfrischend.",
      imagen: "/static/img/Nectar Natural.png",
      origen: "Peru",
      certificacion: "100% Natürlich",
      variedad: "Ohne Zucker",
      temporada: "Ganzjährig",
      bondades: ["Ohne Zuckerzusatz", "Kalorienarm", "Natürliches Vitamin C", "Hydratisierend"]
    },
    6: {
      id: 6,
      nombre: "Spezial-Pack",
      etiqueta: "Kombi",
      descripcion: "Sorgfältig zusammengestellte Auswahl unserer besten Produkte in einer Geschenkbox.",
      imagen: "/static/img/packEspecial.jpeg",
      origen: "Peru",
      certificacion: "Spezial",
      variedad: "Abwechslungsreicher Mix",
      temporada: "Saisonale Aktion"
    },
    7.5: {
      id: 7.5,
      nombre: "Getrocknetes Fruchtfleisch",
      etiqueta: "Zutat",
      descripcion: "Pitahaya-Konzentrat für Smoothies, Desserts und gesunde Rezepte.",
      imagen: "/static/img/pulpa deshidratada.png",
      origen: "Peru",
      certificacion: "Natürlich",
      variedad: "Konzentriert",
      temporada: "Ganzjährig"
    },
    7: {
      id: 7,
      nombre: "Pitahaya-Joghurt",
      etiqueta: "Milchprodukt",
      descripcion: "Cremig, natürlich und voller einzigartigem Geschmack unserer Bio-Pitahaya.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      origen: "Peru",
      certificacion: "Natürlich",
      variedad: "Fruchtig",
      temporada: "Wöchentlich"
    },
    8: {
      id: 8,
      nombre: "Premium-Joghurt",
      etiqueta: "Premium",
      descripcion: "Mit echten Stücken frischer Pitahaya und ohne künstliche Farbstoffe.",
      imagen: "/static/img/yogurt_Premium.png",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "Mit echten Früchten",
      temporada: "Spezial"
    },
    9: {
      id: 9,
      nombre: "Pitahaya-Eis",
      etiqueta: "Dessert",
      descripcion: "Erfrischendes handgemachtes Eis, hergestellt aus natürlichem Pitahaya-Fruchtfleisch.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      origen: "Peru",
      certificacion: "Handwerklich",
      variedad: "Natürlich",
      temporada: "Ganzjährig"
    },
    101: {
      id: 101,
      nombre: "Pitahaya American Beauty",
      etiqueta: "Premium-Frucht",
      precio: "S/ 23.90",
      category: "Frucht",
      descripcion: "Exquisiter, süßer Geschmack mit Beerennoten und kräftigem, fuchsiafarbenem Fruchtfleisch.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "American Beauty",
      temporada: "Ganzjährig"
    },
    102: {
      id: 102,
      nombre: "Gelbe Pitahaya Palora",
      etiqueta: "Süße Frucht",
      precio: "S/ 19.90",
      category: "Frucht",
      descripcion: "Die süßeste Sorte auf dem Markt, ideal für die Verdauung.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Palora",
      temporada: "Ganzjährig"
    },
    103: {
      id: 103,
      nombre: "Pitahaya Hybrid-Schatz",
      etiqueta: "Spezial-Frucht",
      precio: "S/ 18.50",
      category: "Frucht",
      descripcion: "Perfekte Balance zwischen Süße und Säure mit fester Textur.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Hybrid",
      temporada: "Ganzjährig"
    },
    104: {
      id: 104,
      nombre: "Weiße Pitahaya",
      etiqueta: "Leichte Frucht",
      precio: "S/ 14.90",
      category: "Frucht",
      descripcion: "Leicht, erfrischend und perfekt für Salate oder eine gesunde Ernährung.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Weiß",
      temporada: "Ganzjährig"
    },
    105: {
      id: 105,
      nombre: "Rote Pitahaya",
      etiqueta: "Reich an Antioxidantien",
      precio: "S/ 21.90",
      category: "Frucht",
      descripcion: "Tiefrote Schale und weißes Fruchtfleisch, voller Vitamin C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Rot",
      temporada: "Ganzjährig"
    },
    106: {
      id: 106,
      nombre: "Pitahaya Golden Dragon",
      etiqueta: "Exotische Frucht",
      precio: "S/ 24.90",
      category: "Frucht",
      descripcion: "Goldene Sorte mit glatter Schale, geschätzt für ihr blumiges Aroma.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Golden",
      temporada: "Ganzjährig"
    },
    107: {
      id: 107,
      nombre: "Purpurrote Pitahaya",
      etiqueta: "Natürliche Farbe",
      precio: "S/ 22.50",
      category: "Frucht",
      descripcion: "Reich an Anthocyanen, mit einer tiefvioletten Farbe und süßem Geschmack.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Purpur",
      temporada: "Ganzjährig"
    },
    108: {
      id: 108,
      nombre: "Pitahaya Vietnam",
      etiqueta: "Hohe Frische",
      precio: "S/ 17.90",
      category: "Frucht",
      descripcion: "Hervorragende Haltbarkeit nach der Ernte und beachtliche Größe.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Importiert",
      certificacion: "Premium-Qualität",
      variedad: "Vietnamesisch",
      temporada: "Ganzjährig"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitahaya",
      etiqueta: "Premium-Frucht",
      precio: "S/ 26.90",
      category: "Frucht",
      descripcion: "Große, fleischige Früchte mit einem äußerst intensiven Geschmack.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Biologisch",
      variedad: "Costa Rica",
      temporada: "Ganzjährig"
    },
    109: {
      id: 109,
      nombre: "Bio-Nektar",
      etiqueta: "100% Natürlich",
      descripcion: "Kaltgepresstes Getränk, das alle seine wertvollen Eigenschaften bewahrt.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Natürliche Flüssigkeit",
      temporada: "Ganzjährig"
    },
    110: {
      id: 110,
      nombre: "Bio-Marmelade",
      etiqueta: "Handwerklich",
      descripcion: "Mit Bio-Panela gesüßt für ein gesünderes Nährwertprofil.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Handwerklich mit Panela",
      temporada: "Ganzjährig"
    },
    111: {
      id: 111,
      nombre: "Bio-Joghurt",
      etiqueta: "Probiotisch",
      descripcion: "Griechischer Joghurt nach traditioneller Art auf Basis von Bio-Pitahaya.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Griechischer Art",
      temporada: "Ganzjährig"
    },
    112: {
      id: 112,
      nombre: "Bio-Fruchtfleisch",
      etiqueta: "Natürlicher Snack",
      descripcion: "Bei niedriger Temperatur getrocknete Scheiben, um die Nährstoffe zu erhalten.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Getrocknet",
      temporada: "Ganzjährig"
    },
    113: {
      id: 113,
      nombre: "Bio-Extrakt",
      etiqueta: "Superfood",
      descripcion: "Konzentrierter Shot, reich an natürlichen Antioxidantien und Ballaststoffen.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Konzentrat",
      temporada: "Ganzjährig"
    },
    114: {
      id: 114,
      nombre: "Bio-Pitahaya",
      precio: "S/ 24.50",
      category: "Frucht",
      etiqueta: "Hohe Qualität",
      descripcion: "Die besten Exemplare der Ernte, sorgfältig nach Größe sortiert.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Hybrid Premium",
      temporada: "Ganzjährig"
    },
    115: {
      id: 115,
      nombre: "Premium Bio-Nektar",
      etiqueta: "Elite-Linie",
      descripcion: "Maximale Reinheit, gewonnen aus der Sorte American Beauty.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Premium Gold",
      temporada: "Ganzjährig"
    },
    116: {
      id: 116,
      nombre: "Bio-Snacks",
      etiqueta: "Gesund",
      descripcion: "Knusprige Pitahaya-Scheiben ohne Zuckerzusatz.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Getrocknet",
      temporada: "Ganzjährig"
    },
    117: {
      id: 117,
      nombre: "Bio-Sirup",
      etiqueta: "Natürliches Süßungsmittel",
      descripcion: "Botanischer Sirup, ideal für Cocktails und gesunde Desserts.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      origen: "Peru",
      certificacion: "Biologisch",
      variedad: "Botanisch",
      temporada: "Ganzjährig"
    },
    118: {
      id: 118,
      nombre: "Konzentriertes Fruchtfleisch",
      etiqueta: "100% Natürlich",
      descripcion: "Ideale Basis für die Lebensmittelindustrie und Konditorei.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      origen: "Peru",
      certificacion: "Natürlich",
      variedad: "Konzentriert",
      temporada: "Ganzjährig"
    },
    119: {
      id: 119,
      nombre: "Marmelade Charge 2",
      etiqueta: "Handgemacht",
      descripcion: "In kleinen Chargen nach traditionellen Rezepten hergestellt.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      origen: "Peru",
      certificacion: "Handwerklich",
      variedad: "Klassisch",
      temporada: "Ganzjährig"
    },
    121: {
      id: 121,
      nombre: "Intensive Purpur-Pitahaya",
      etiqueta: "Superfood",
      titulo: "Die Kraft der Antioxidantien",
      descripcion: "Eine außergewöhnliche Sorte, berühmt für ihr intensiv purpurrotes Fruchtfleisch, reich an Betalainen und Antioxidantien, die die Zellalterung bekämpfen.",
      imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
      origen: "Cañete, Peru",
      certificacion: "100% Biologisch",
      variedad: "Intensives Purpur",
      temporada: "Ganzjährig",
      precio: "S/ 24.50",
      category: "Frucht",
      bondades: ["Maximale Antioxidantienkraft", "Zellschutz", "Tiefer Geschmack roter Beeren", "Ideal für Säfte und Desserts"]
    }
},
pt: {
    1: {
      id: 1,
      nombre: "Suco Refrescante de Pitaya Fúcsia",
      etiqueta: "Suco de Pitaya",
      titulo: "O Tesouro do Vale",
      descripcion: "Fruta peruana colhida no seu ponto ideal, doce e fresca.",
      imagen: "/static/img/Pitahaya_fresca.avif",
      origen: "Cañete, Peru",
      certificacion: "100% Orgânico",
      variedad: "American Beauty",
      temporada: "Outubro - Janeiro",
      bondades: ["Rica em Vitamina C", "Apto para Diabéticos", "Antioxidantes Naturais", "Laxante Natural"]
    },
    3: {
      id: 3,
      nombre: "Geleia Artesanal",
      etiqueta: "Derivado",
      titulo: "Tradição Artesanal",
      descripcion: "Cada frasco conserva o sabor autêntico da pitaya orgânica peruana.",
      imagen: "/static/img/mermelada artesanal.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Artesanal",
      variedad: "Clássica",
      temporada: "Ano todo",
      bondades: ["100% Natural", "Sem Conservantes", "Rica em Fibra", "Ideal para o Café da Manhã"]
    },
    4: {
      id: 4,
      nombre: "Geleia Premium",
      etiqueta: "Premium",
      titulo: "Edição Especial",
      descripcion: "Edição especial com maior concentração de fruta e sabor intenso.",
      imagen: "/static/img/MermeladaP.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "Alta concentração",
      temporada: "Limitado",
      bondades: ["Alta Concentração", "Sabor Intenso", "Edição Limitada", "Presente Perfeito"]
    },
    5: {
      id: 5,
      nombre: "Néctar Natural",
      etiqueta: "Bebida",
      titulo: "Puro Frescor",
      descripcion: "Bebida natural de pitaya, leve e refrescante.",
      imagen: "/static/img/Nectar Natural.png",
      origen: "Peru",
      certificacion: "100% Natural",
      variedad: "Sem açúcar",
      temporada: "Ano todo",
      bondades: ["Sem Açúcar Adicionado", "Baixa em Calorias", "Vitamina C Natural", "Hidratante"]
    },
    6: {
      id: 6,
      nombre: "Pack Especial",
      etiqueta: "Combo",
      descripcion: "Combinação selecionada dos nossos melhores produtos em uma caixa de presente.",
      imagen: "/static/img/packEspecial.jpeg",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Especial",
      variedad: "Mix Variado",
      temporada: "Campanha"
    },
    7.5: {
      id: 7.5,
      nombre: "Polpa Desidratada",
      etiqueta: "Ingrediente",
      descripcion: "Concentrado de pitaya para smoothies, sobremesas e receitas saudáveis.",
      imagen: "/static/img/pulpa deshidratada.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Concentrada",
      temporada: "Ano todo"
    },
    7: {
      id: 7,
      nombre: "Iogurte de Pitaya",
      etiqueta: "Laticínio",
      descripcion: "Cremoso, natural e cheio do sabor único da nossa pitaya orgânica.",
      imagen: "/static/img/yogurt_de_pitahaya.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Frutado",
      temporada: "Semanal"
    },
    8: {
      id: 8,
      nombre: "Iogurte Premium",
      etiqueta: "Premium",
      descripcion: "Com pedaços reais de pitaya fresca e sem corantes artificiais.",
      imagen: "/static/img/yogurt_Premium.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Premium",
      variedad: "Com fruta Real",
      temporada: "Especial"
    },
    9: {
      id: 9,
      nombre: "Sorvete de Pitaya",
      etiqueta: "Sobremesa",
      descripcion: "Refrescante sorvete artesanal elaborado com polpa natural de pitaya.",
      imagen: "/static/img/Helado de Pitahaya.webp",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Artesanal",
      variedad: "Natural",
      temporada: "Ano todo"
    },
    101: {
      id: 101,
      nombre: "Pitaya American Beauty",
      etiqueta: "Fruta Premium",
      precio: "S/ 23.90",
      category: "Fruta",
      descripcion: "Exquisito sabor doce com notas de bagas e polpa fúcsia vibrante.",
      imagen: "/static/img/Pitahaya American Beauty.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "American Beauty",
      temporada: "Ano todo"
    },
    102: {
      id: 102,
      nombre: "Pitaya Amarela Palora",
      etiqueta: "Fruta Doce",
      precio: "S/ 19.90",
      category: "Fruta",
      descripcion: "A variedade mais doce do mercado, ideal para a digestão.",
      imagen: "/static/img/Pitahaya Amarilla Palora.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Palora",
      temporada: "Ano todo"
    },
    103: {
      id: 103,
      nombre: "Pitaya Híbrida Tesoro",
      etiqueta: "Fruta Especial",
      precio: "S/ 18.50",
      category: "Fruta",
      descripcion: "Equilíbrio perfeito entre doçura e acidez com textura firme.",
      imagen: "/static/img/Pitahaya Híbrida Tesoro.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Híbrida",
      temporada: "Ano todo"
    },
    104: {
      id: 104,
      nombre: "Pitaya Branca",
      etiqueta: "Fruta Leve",
      precio: "S/ 14.90",
      category: "Fruta",
      descripcion: "Leve, refrescante e perfeita para saladas ou dietas saudáveis.",
      imagen: "/static/img/Pitahaya Blanca.jpg",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Branca",
      temporada: "Ano todo"
    },
    105: {
      id: 105,
      nombre: "Pitaya Vermelha",
      etiqueta: "Alta em antioxidantes",
      precio: "S/ 21.90",
      category: "Fruta",
      descripcion: "Casca vermelha intensa e polpa branca, carregada de vitamina C.",
      imagen: "/static/img/Pitahaya Roja.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Vermelha",
      temporada: "Ano todo"
    },
    106: {
      id: 106,
      nombre: "Pitaya Golden Dragon",
      etiqueta: "Fruta Exótica",
      precio: "S/ 24.90",
      category: "Fruta",
      descripcion: "Variedade dourada de casca lisa, apreciada pelo seu aroma floral.",
      imagen: "/static/img/Pitahaya Golden Dragon.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Golden",
      temporada: "Ano todo"
    },
    107: {
      id: 107,
      nombre: "Pitaya Púrpura",
      etiqueta: "Cor Natural",
      precio: "S/ 22.50",
      category: "Fruta",
      descripcion: "Rica em antocianinas, com uma cor roxa profunda e sabor doce.",
      imagen: "/static/img/Pitahaya Purpúrea.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Púrpura",
      temporada: "Ano todo"
    },
    108: {
      id: 108,
      nombre: "Pitaya Vietnã",
      etiqueta: "Alta Frescura",
      precio: "S/ 17.90",
      category: "Fruta",
      descripcion: "Excelente tempo de conservação pós-colheita e grande tamanho.",
      imagen: "/static/img/Pitahaya Vietnam.jpg",
      origen: "Importado",
      certificacion: "Qualidade Premium",
      variedad: "Vietnamita",
      temporada: "Ano todo"
    },
    120: {
      id: 120,
      nombre: "Costa Rica Pitaya",
      etiqueta: "Fruta Premium",
      precio: "S/ 26.90",
      category: "Fruta",
      descripcion: "Frutos grandes e carnosos com um sabor extremamente intenso.",
      imagen: "/static/img/Pitahaya Costa Rica.png",
      origen: "Costa Rica",
      certificacion: "Orgânico",
      variedad: "Costa Rica",
      temporada: "Ano todo"
    },
    109: {
      id: 109,
      nombre: "Néctar Orgânico",
      etiqueta: "100% Natural",
      descripcion: "Bebida prensada a frio, conservando todas as suas propriedades.",
      imagen: "/static/img/nectar-pitahaya-100-natural.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Líquido Natural",
      temporada: "Ano todo"
    },
    110: {
      id: 110,
      nombre: "Geleia Orgânica",
      etiqueta: "Artesanal",
      descripcion: "Adoçada com panela orgânica para um perfil mais saudável.",
      imagen: "/static/img/Mermelada Artesanal Orgánica.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Artesanal Panela",
      temporada: "Ano todo"
    },
    111: {
      id: 111,
      nombre: "Iogurte Orgânico",
      etiqueta: "Probiótico",
      descripcion: "Iogurte grego estilo artesanal com base de pitaya orgânica.",
      imagen: "/static/img/Yogur Griego con Pitahaya Orgánica.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Grego",
      temporada: "Ano todo"
    },
    112: {
      id: 112,
      nombre: "Polpa Orgânica",
      etiqueta: "Snack Natural",
      descripcion: "Rodelas desidratadas a baixa temperatura para conservar nutrientes.",
      imagen: "/static/img/Pulpa Deshidratada Orgánica.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Desidratada",
      temporada: "Ano todo"
    },
    113: {
      id: 113,
      nombre: "Extrato Orgânico",
      etiqueta: "Superalimento",
      descripcion: "Shot concentrado rico em antioxidantes naturais e fibras.",
      imagen: "/static/img/Extracto de Pitahaya Concentrado Orgánico.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Concentrado",
      temporada: "Ano todo"
    },
    114: {
      id: 114,
      nombre: "Pitaya Orgânica",
      precio: "S/ 24.50",
      category: "Fruta",
      etiqueta: "Alta Qualidade",
      descripcion: "Os melhores exemplares da colheita, selecionados por tamanho.",
      imagen: "/static/img/Pitahaya Híbrida Orgánica Seleccionada.png",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Híbrida Premium",
      temporada: "Ano todo"
    },
    115: {
      id: 115,
      nombre: "Néctar Premium Orgânico",
      etiqueta: "Linha Elite",
      descripcion: "Máxima pureza, extraído da variedade American Beauty.",
      imagen: "/static/img/Néctar Premium Orgánico.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Premium Gold",
      temporada: "Ano todo"
    },
    116: {
      id: 116,
      nombre: "Snacks Orgânicos",
      etiqueta: "Saudável",
      descripcion: "Crocantes lâminas de pitaya sem açúcares adicionados.",
      imagen: "/static/img/Snacks Deshidratados Orgánicos.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Desidratado",
      temporada: "Ano todo"
    },
    117: {
      id: 117,
      nombre: "Xarope Orgânico",
      etiqueta: "Adoçante Natural",
      descripcion: "Xarope botânico ideal para coquetéis e sobremesas saudáveis.",
      imagen: "/static/img/Jarabe Botánico Orgánico.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Orgânico",
      variedad: "Botânico",
      temporada: "Ano todo"
    },
    118: {
      id: 118,
      nombre: "Polpa Concentrada",
      etiqueta: "100% Natural",
      descripcion: "Base ideal para a indústria alimentícia e confeitaria.",
      imagen: "/static/img/Pulpa Concentrada de Pitahaya.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Natural",
      variedad: "Concentrada",
      temporada: "Ano todo"
    },
    119: {
      id: 119,
      nombre: "Geleia Lote 2",
      etiqueta: "Feito à mão",
      descripcion: "Elaborada em pequenos lotes seguindo receitas tradicionais.",
      imagen: "/static/img/Mermelada de Pitahaya Artesanal.png",
      category: "Derivado",
      origen: "Peru",
      certificacion: "Artesanal",
      variedad: "Clássica",
      temporada: "Ano todo"
    },
    121: {
      id: 121,
      nombre: "Pitaia Roxa Intensa",
      etiqueta: "Superalimento",
      titulo: "O Poder dos Antioxidantes",
      descripcion: "Uma variedade excecional, famosa pela sua polpa de cor roxa intensa, rica em betalaínas e antioxidantes que combatem o envelhecimento celular.",
      imagen: "/static/img/Pitahaya Púrpura Intensa.jpg",
      origen: "Cañete, Peru",
      certificacion: "100% Orgânico",
      variedad: "Roxa Intensa",
      temporada: "Todo o ano",
      precio: "S/ 24.50",
      category: "Fruta",
      bondades: ["Máximo Poder Antioxidante", "Proteção Celular", "Sabor Profundo a Frutos Vermelhos", "Ideal para Sucos e Sobremesas"]
    }
},

};
// ==========================================
// 1. CONFIGURACIÓN DEL ENRUTAMIENTO DEL SERVIDOR Y ESTADOS
// ==========================================
const detalleBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
const detalleAppUrl = (path) => `${detalleBasePath}${path}`;
const detalleAssetUrl = (path) => path.startsWith('/static/') ? detalleAppUrl(path) : path;

const idiomaGuardado = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';
 
let productos = (typeof productosTraducidos !== 'undefined' && productosTraducidos[idiomaGuardado]) 
    ? productosTraducidos[idiomaGuardado] 
    : (typeof productosTraducidos !== 'undefined' ? productosTraducidos.es : {});

let carruselIndex = 0; 
let carruselIntervalo = null;

function getAdminProducts() {
    try {
        const adminProducts = JSON.parse(localStorage.getItem('tuta_admin_products')) || [];
        const lang = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';

        return adminProducts.map(p => {
            const translation = (p.translations && p.translations[lang]) ? p.translations[lang] : (p.translations ? p.translations.es : null);
            
            const nombreTraducido = translation ? translation.nombre : p.name;
            const descripcionTraducida = translation ? translation.descripcion : p.description;

            return {
                id: p.id,
                nombre: nombreTraducido,
                precio: p.price, 
                descripcion: descripcionTraducida,
                imagen: p.image,
                category: p.category,
                etiqueta: p.category || 'Producto Admin',
                titulo: p.name,
                origen: 'Perú',
                certificacion: 'Orgánico',
                bondades: ["Cultivado localmente", "Cosecha fresca", "Calidad garantizada"]
            };
        });
    } catch (e) { 
        return []; 
    }
}

// ==========================================
// 2. FUNCIONES UTILITARIAS Y DE INTERFAZ (UI)
// ==========================================
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || "";
    }
}

function setAttr(id, attribute, value) {
    const element = document.getElementById(id);
    if (element) {
        element.setAttribute(attribute, value);
    }
}

function actualizarNumeroBadge() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalUnidades = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    const btnBadge = document.getElementById("button-cart-badge");
    if (btnBadge) btnBadge.textContent = totalUnidades;

    const headerBadge = document.getElementById("cart-count-badge");
    if (headerBadge) headerBadge.textContent = totalUnidades;
}

function mostrarToast(mensaje) {
    const toast = document.createElement("div");
    toast.className = "toast-success";
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ==========================================
// 3. LOGICA DE CONTROL DE PRECIOS Y CARRITO (FILTROS DE EXCLUSIÓN MEJORADOS)
// ==========================================
function obtenerPrecioActual(producto) {
    const overrides = JSON.parse(localStorage.getItem("tuta_product_price_overrides") || "{}");
    if (overrides[producto.nombre] !== undefined) {
        return Number(overrides[producto.nombre]);
    }

    let precio = producto.precio || 0;
    if (typeof precio === "string") {
        precio = precio.replace("S/", "").trim();
    }
    precio = parseFloat(precio);
    return isNaN(precio) ? 0 : precio;
}

async function sincronizarPreciosServidor() {
    try {
        const response = await fetch(detalleAppUrl('/api/admin/price-overrides'));
        if (!response.ok) throw new Error('No se pudieron cargar precios');
        const data = await response.json();
        localStorage.setItem("tuta_product_price_overrides", JSON.stringify(data.overrides || {}));
    } catch (error) {
        // Mantiene los precios locales en contingencia
    }
}

function verificarSiEsFruta(producto) {
    if (!producto) return false;

    // Validación de categoría extendida para admitir traducción al chino o inglés
    if (producto.category) {
        const catLower = producto.category.toLowerCase();
        if (catLower === 'fruta' || catLower === 'fruit' || catLower === '水果') {
            // Se sigue evaluando el nombre por si corresponde a un derivado clasificado en la misma categoría
        }
    }

    const nombreLower = (producto.nombre || "").toLowerCase();

    // Palabras que descartan que sea una fruta fresca (Añadido "crisps", "chips", "snacks" y "脆片")
    const palabrasDerivados = [
        "jugo", "mermelada", "pulpa", "deshidratado", "derivado", "extracto", "bebida", "yogurt", "yogur", "helado", "crema", "sorbete", "snack", "chips", "crisps",
        "juice", "jam", "pulp", "dehydrated", "derivative", "extract", "beverage", "ice cream", "sorbet", "snacks",
        "saft", "marmelade", "fruchtfleisch", "getrocknet", "derivat", "extrakt", "getränk", "eis", "joghurt",
        "jus", "confiture", "pulpe", "déshydraté", "dérivé", "extrait", "boisson", "glace", "yaourt", "crème",
        "succo", "marmellata", "polpa", "disidratato", "derivato", "estratto", "bevanda", "gelato", 
        "suco", "geleia", "extrato", "iogurte", "sorvete",
        "果汁", "果酱", "果肉", "脱水", "衍生", "提取物", "饮料", "酸奶", "冰淇淋", "冰沙", "脆片", "零食"
    ];
    
    const esDerivado = palabrasDerivados.some(palabra => nombreLower.includes(palabra));
    if (esDerivado) return false; 

    // Palabras clave que confirman que ES una fruta fresca (Incluye caracteres Chinos)
    const palabrasFrutaExclusivas = [
        "pitahaya", "mango", "pitaya", "pitaia", "drachenfrucht", "fruit", "fruta", "frucht",
        "火龙果", "芒果", "水果", "鲜果"
    ];
    return palabrasFrutaExclusivas.some(fruta => nombreLower.includes(fruta));
}

function agregarAlCarrito(producto, precioActual) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(item => String(item.id) === String(producto.id));
    const urlLimpia = producto.imagen ? detalleAssetUrl(producto.imagen).replace(/ /g, "%20") : "";

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: precioActual,
            imagen: urlLimpia, 
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarNumeroBadge();
    
    const langActual = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';
    
    let msg = "Producto agregado al carrito";
    if (langActual === 'zh') msg = "商品已成功加入购物车";
    else if (langActual === 'en') msg = "Product added to cart";
    else if (langActual === 'fr') msg = "Produit ajouté au panier";
    else if (langActual === 'it') msg = "Prodotto aggiunto al carrello";
    else if (langActual === 'de') msg = "Produkt zum Warenkorb hinzugefügt";
    else if (langActual === 'pt') msg = "Produto adicionado ao carrinho";

    mostrarToast(msg);
}

function navegarAProducto(id) {
    const nuevaUrl = `${detalleAppUrl('/detalles')}?p=${id}`;
    window.history.pushState({ p: id }, "", nuevaUrl);
    renderizarDetalleProducto();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cortarTexto(texto, limite) {
    if (!texto) return "";
    if (texto.length <= limite) return texto;
    return texto.substr(0, texto.lastIndexOf(' ', limite)) + '...';
}

// ==========================================
// 4. FUNCIÓN PRINCIPAL DE RENDERIZADO DE PRODUCTO
// ==========================================
function renderizarDetalleProducto() {
    const langActual = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';
    if (typeof productosTraducidos === 'undefined') return;

    const productosBase = productosTraducidos[langActual] || productosTraducidos.es;
    const productosAdmin = getAdminProducts();
    productos = { ...productosBase, ...Object.fromEntries(productosAdmin.map(p => [p.id, p])) };

    const params = new URLSearchParams(window.location.search);
    const productIdParam = params.get("p") || "1";

    const producto = productos[productIdParam] || Object.values(productos)[0];
    if (!producto) return;
    
    const precioActual = obtenerPrecioActual(producto);

    document.title = "Tuta Wayta - " + producto.nombre;
    actualizarNumeroBadge();

    const imagenLimpia = producto.imagen ? detalleAssetUrl(producto.imagen).replace(/ /g, "%20") : "";
    setAttr("img", "src", imagenLimpia);
    setAttr("img", "alt", producto.nombre);

    const elementosID = ["etiqueta", "titulo", "nombre", "descripcion", "origen", "certificacion", "variedad", "temporada", "bondades", "related"];
    elementosID.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('data-i18n');
    });

    setText("etiqueta", producto.etiqueta);
    setText("titulo", producto.titulo || "");
    setText("nombre", producto.nombre);
    setText("descripcion", producto.descripcion);
    setText("origen", producto.origen);
    setText("certificacion", producto.certificacion);
    setText("variedad", producto.variedad);
    setText("temporada", producto.temporada);

    const esFruta = verificarSiEsFruta(producto);
    const contenedorCompra = document.getElementById("compra-container") || document.querySelector(".purchase-actions-box");
    const precioElement = document.getElementById("precio");
    const estrellasElement = document.getElementById("estrellas") || document.querySelector(".rating-box");
    const addToCartBtn = document.getElementById("addToCartBtn");

    if (esFruta) {
        if (precioElement) {
            precioElement.textContent = "S/ " + precioActual.toFixed(2);
            precioElement.style.display = "";
        }
        if (estrellasElement) estrellasElement.style.display = "";
        if (contenedorCompra) contenedorCompra.style.display = "";

        if (addToCartBtn) {
            addToCartBtn.style.display = "";
            addToCartBtn.onclick = () => { agregarAlCarrito(producto, precioActual); };
        }
    } else {
        if (precioElement) precioElement.style.display = "none";
        if (estrellasElement) estrellasElement.style.display = "none";
        if (contenedorCompra) contenedorCompra.style.display = "none";
        if (addToCartBtn) {
            addToCartBtn.style.display = "none";
            addToCartBtn.onclick = null;
        }
    }

    const bondadesList = document.getElementById("bondades");
    if (bondadesList) {
        let listadoHTML = `<li>Rica en Vitamina C</li><li>Apto para Diabéticos</li><li>Antioxidantes Naturales</li><li>Laxante Natural</li>`;
        
        if (langActual === 'zh') {
            listadoHTML = `<li>富含维生素 C</li><li>适合糖尿病患者</li><li>天然抗氧化剂</li><li>天然轻泻调理</li>`;
        } else if (langActual === 'en') {
            listadoHTML = `<li>Rich in Vitamin C</li><li>Suitable for Diabetics</li><li>Natural Antioxidants</li><li>Natural Laxative</li>`;
        } else if (langActual === 'fr') {
            listadoHTML = `<li>Riche en Vitamine C</li><li>Adapté aux Diabétiques</li><li>Antioxydants Naturels</li><li>Laxatif Naturel</li>`;
        } else if (langActual === 'it') {
            listadoHTML = `<li>Ricco di Vitamina C</li><li>Adatto ai Diabetici</li><li>Antiossidanti Naturali</li><li>Lassativo Naturale</li>`;
        } else if (langActual === 'de') {
            listadoHTML = `<li>Reich an Vitamin C</li><li>Für Diabetiker geeignet</li><li>Natürliche Antioxidantien</li><li>Natürliches Abführmittel</li>`;
        } else if (langActual === 'pt') {
            listadoHTML = `<li>Rica em Vitamina C</li><li>Apto para Diabéticos</li><li>Antioxidantes Naturais</li><li>Laxante Natural</li>`;
        }

        if (producto.bondades && Array.isArray(producto.bondades)) {
            const fijas = [
                "rica en vitamina c", "apto para diabeticos", "antioxidantes naturales", "laxante natural",
                "rich in vitamin c", "suitable for diabetics", "natural antioxidants", "natural laxative",
                "富含维生素 c", "适合糖尿病患者", "天然抗氧化剂", "天然轻泻调理",
                "riche en vitamine c", "adapte aux diabetiques", "antioxydants naturels", "laxatif naturel",
                "ricco di vitamina c", "adatto ai diabetici", "antiossidanti naturali", "lassativo naturale",
                "reich an vitamin c", "für diabetiker geeignet", "natürliche herkunft", "natürliches abführmittel",
                "rica em vitamina c", "apto para diabeticos", "antioxidantes naturales", "laxante natural"
            ];
            producto.bondades.forEach(item => {
                const normalizado = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (!fijas.includes(normalizado)) {
                    listadoHTML += `<li>${item}</li>`;
                }
            });
        }
        bondadesList.innerHTML = listadoHTML;
    }

    const track = document.getElementById("related");
    if (track) {
        const itemsCarrusel = Object.values(productos).filter(item => String(item.id) !== String(producto.id));
        
        let textoEnlace = "Ver detalles";
        if (langActual === 'zh') textoEnlace = "查看详情";
        else if (langActual === 'en') textoEnlace = "View details";
        else if (langActual === 'fr') textoEnlace = "Voir les détails";
        else if (langActual === 'it') textoEnlace = "Vedi dettagli";
        else if (langActual === 'de') textoEnlace = "Details anzeigen";
        else if (langActual === 'pt') textoEnlace = "Ver detalhes";

        track.innerHTML = itemsCarrusel.map(item => {
            const precioRelacionado = obtenerPrecioActual(item);
            const imgRelacionadaLimp = item.imagen ? detalleAssetUrl(item.imagen).replace(/ /g, "%20") : "";
            const esItemFruta = verificarSiEsFruta(item);
            
            return `
                <div class="product-card" 
                     onmouseenter="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 30px rgba(0,0,0,0.08)';"
                     onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.04)';"
                     style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 500px; width: 310px; box-sizing: border-box; flex: 0 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); padding: 0 0 30px 0; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;">
                    <div style="display: flex; flex-direction: column;">
                        <div style="width: 100%; height: 210px; overflow: hidden; position: relative;">
                            <img src="${imgRelacionadaLimp}" alt="${item.nombre}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="padding: 24px 28px 0 28px; display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <h3 style="margin: 0 0 8px 0; font-family: 'Playfair Display', 'Georgia', serif; font-size: 1.35rem; font-weight: 700; color: #1a1a1a; line-height: 1.3; min-height: 2.7rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; width: 100%; text-align: center;">
                                ${item.nombre}
                            </h3>
                            ${esItemFruta ? `<span class="related-price" style="display: block; margin: 6px 0 0 0; font-family: 'Poppins', sans-serif; font-weight: 600; color: #2d3748; font-size: 1.15rem; text-align: center;">S/ ${precioRelacionado.toFixed(2)}</span>` : ''}
                            <p style="margin: 10px 0 0 0; font-family: 'Poppins', sans-serif; font-size: 0.9rem; color: #718096; line-height: 1.6; font-weight: 400; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; width: 100%; text-align: center; min-height: 4.3rem;">
                                ${cortarTexto(item.descripcion, 80)}
                            </p>
                        </div>
                    </div>
                    <div style="padding: 20px 28px 0 28px; flex-grow: 1; display: flex; align-items: center; justify-content: center; width: 100%; box-sizing: border-box;">
                        <a href="${detalleAppUrl('/detalles')}?p=${item.id}" 
                           onclick="event.preventDefault(); navegarAProducto('${item.id}');"
                           onmouseenter="this.style.background='#800042'; this.style.transform='scale(1.02)';"
                           onmouseleave="this.style.background='#a20054'; this.style.transform='scale(1)';"
                           style="display: block; width: 85%; text-align: center; background: #a20054; color: #ffffff; padding: 12px 0; border-radius: 100px; font-family: 'Poppins', sans-serif; font-size: 0.92rem; font-weight: 600; text-decoration: none; letter-spacing: 0.5px; transition: background 0.3s ease, transform 0.2s ease; box-shadow: 0 4px 14px rgba(162, 0, 84, 0.25);">
                             ${textoEnlace}
                        </a>
                    </div>
                </div>
            `;
        }).join("");

        track.style.display = "flex";
        track.style.alignItems = "stretch"; 
        track.style.gap = "24px";
        track.style.transition = "transform 0.4s ease-in-out";

        carruselIndex = 0;
        track.style.transform = `translateX(0px)`;
        
        inicializarControlesCarrusel(track);
    }
}

// ==========================================
// 5. LÓGICA DINÁMICA DEL CARRUSEL DE PRODUCTOS RELACIONADOS
// ==========================================
function inicializarControlesCarrusel(track) {
    const nextBtn = document.querySelector(".next") || document.querySelector(".nextBtn");
    const prevBtn = document.querySelector(".prev") || document.querySelector(".prevBtn");

    if (!nextBtn || !prevBtn || !track) return;

    const newNext = nextBtn.cloneNode(true);
    const newPrev = prevBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);

    function actualizarDesplazamiento() {
        const cards = track.querySelectorAll(".product-card");
        if (cards.length === 0) return;

        const maxVisibleScroll = track.scrollWidth - track.clientWidth;
        if (carruselIndex >= cards.length) {
            carruselIndex = 0;
        }

        let targetScroll = cards[carruselIndex].offsetLeft - track.offsetLeft;
        if (targetScroll > maxVisibleScroll) {
            targetScroll = maxVisibleScroll;
        }

        track.style.transform = `translateX(-${targetScroll}px)`;
    }

    newNext.addEventListener("click", () => {
        const cards = track.querySelectorAll(".product-card");
        const maxVisibleScroll = track.scrollWidth - track.clientWidth;
        
        const style = window.getComputedStyle(track);
        const matrix = style.transform || style.webkitTransform;
        let currentTransform = 0;
        
        if (matrix && matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            currentTransform = Math.abs(parseFloat(values[4] || values[12] || 0));
        }

        if (carruselIndex >= cards.length - 1 || currentTransform >= maxVisibleScroll - 5) {
            carruselIndex = 0;
        } else {
            carruselIndex++;
        }
        actualizarDesplazamiento();
    });

    newPrev.addEventListener("click", () => {
        const cards = track.querySelectorAll(".product-card");
        if (carruselIndex <= 0) {
            carruselIndex = cards.length - 1;
        } else {
            carruselIndex--;
        }
        actualizarDesplazamiento();
    });

    if (carruselIntervalo) clearInterval(carruselIntervalo);
    carruselIntervalo = setInterval(() => {
        newNext.click();
    }, 4000);
}

// ==========================================
// 6. CONTROLADOR AISLADO: CARRUSEL DE IMÁGENES (HOME / BANNER PRINCIPAL)
// ==========================================
function inicializarCarruselImagenes() {
    const contenedorImg = document.getElementById('carruselImat');
    
    if (contenedorImg) {
        let indexImagen = 0;
        const totalImagenes = document.querySelectorAll('.slide').length;
        
        function aplicarCambio() {
            contenedorImg.style.transform = `translateX(${-indexImagen * 100}%)`;
        }
        
        window.moverDerecha = function () {
            if (totalImagenes === 0) return;
            indexImagen = (indexImagen + 1) % totalImagenes;
            aplicarCambio();
        };
        
        window.moverIzquierda = function () {
            if (totalImagenes === 0) return;
            indexImagen = (indexImagen - 1 + totalImagenes) % totalImagenes;
            aplicarCambio();
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarCarruselImagenes();
});

// ==========================================
// 7. LISTENERS ACTIVOS Y LOGICA CENTRAL DE IDIOMAS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarDetalleProducto();
    sincronizarPreciosServidor().then(() => {
        renderizarDetalleProducto();
    });

    const desktopSelector = document.getElementById('lang-selector-desktop');
    const mobileSelector = document.getElementById('langSelectorMobile');
    const mobileCustomSelector = document.getElementById('lang-selector-mobile-custom');

    const languages = {
        es: { text: 'Español', flag: 'flag-icon-pe' },
        en: { text: 'English', flag: 'flag-icon-gb' },
        de: { text: 'Deutsch', flag: 'flag-icon-de' },
        fr: { text: 'Français', flag: 'flag-icon-fr' },
        it: { text: 'Italiano', flag: 'flag-icon-it' },
        pt: { text: 'Português', flag: 'flag-icon-pt' },
        zh: { text: '中文', flag: 'flag-icon-cn' }
    };

    function updateAllSelectors(lang) {
        if (!languages[lang]) return;
        const details = languages[lang];

        if (desktopSelector) {
            const txtEl = desktopSelector.querySelector('.current-lang-text');
            const flagEl = desktopSelector.querySelector('.flag-icon');
            if (txtEl) txtEl.textContent = details.text;
            if (flagEl) flagEl.className = 'flag-icon ' + details.flag;
        }

        if (mobileSelector) mobileSelector.value = lang;

        if (mobileCustomSelector) {
            const txtEl = mobileCustomSelector.querySelector('.current-lang-text');
            const flagEl = mobileCustomSelector.querySelector('.flag-icon');
            if (txtEl) txtEl.textContent = details.text;
            if (flagEl) flagEl.className = 'flag-icon ' + details.flag;
        }
    }

    window.changeLanguage = function(lang) {
        if (!languages[lang]) return;

        localStorage.setItem('tuta_lang', lang);
        document.documentElement.lang = lang;
        updateAllSelectors(lang);

        if (window.applyTranslations) {
            window.applyTranslations(lang);
        }

        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    };

    if (desktopSelector) {
        const button = desktopSelector.querySelector('.current-lang');
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                desktopSelector.classList.toggle('open');
            });
        }

        desktopSelector.querySelectorAll('.lang-options a').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                window.changeLanguage(option.dataset.lang);
                desktopSelector.classList.remove('open');
            });
        });
    }

    if (mobileCustomSelector) {
        const mobileButton = mobileCustomSelector.querySelector('.current-lang-mobile');
        if (mobileButton) {
            mobileButton.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileCustomSelector.classList.toggle('open');
            });
        }

        mobileCustomSelector.querySelectorAll('.lang-options-mobile a').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.changeLanguage(option.dataset.lang);
                mobileCustomSelector.classList.remove('open');
                document.getElementById('dropdownMenu')?.classList.remove('active');
                document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (mobileSelector) {
        mobileSelector.addEventListener("change", (e) => {
            window.changeLanguage(e.target.value);
        });
    }

    document.addEventListener('click', (e) => {
        if (desktopSelector && !desktopSelector.contains(e.target)) {
            desktopSelector.classList.remove('open');
        }
        if (mobileCustomSelector && !mobileCustomSelector.contains(e.target)) {
            mobileCustomSelector.classList.remove('open');
        }
    });

    const savedLang = localStorage.getItem('tuta_lang') || document.documentElement.lang || 'es';
    window.changeLanguage(savedLang);

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
     reveals.forEach(el => observer.observe(el));
});

window.addEventListener('languageChanged', () => {
    renderizarDetalleProducto();
    inicializarCarruselImagenes(); // <--- MANTIENE EL CARRUSEL VIVO AL CAMBIAR DE IDIOMA
    if (currentActiveServiceId !== null) {
        openModal(currentActiveServiceId);
    }
});

window.addEventListener('popstate', () => {
    renderizarDetalleProducto();
});

// ==========================================
// 8. CONTROL DEL MODAL DE SERVICIOS
// ==========================================
let currentActiveServiceId = null;

function openModal(id) {
    currentActiveServiceId = id;
    const currentLang = document.documentElement.lang || 'es';
    
    if (typeof servicesTranslations === 'undefined') return;
    const langData = servicesTranslations[currentLang] || servicesTranslations['es'];
    const data = langData[id];

    if (!data) return;

    const modal = document.getElementById('serviceModal');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalIntro = document.getElementById('modalIntro');

    if(modalBadge) modalBadge.removeAttribute('data-i18n');
    if(modalTitle) modalTitle.removeAttribute('data-i18n');
    if(modalIntro) modalIntro.removeAttribute('data-i18n');

    if(modalBadge) modalBadge.innerText = data.badge;
    if(modalTitle) modalTitle.innerText = data.title;
    if(modalIntro) modalIntro.innerText = data.intro;
    
    const modalHero = document.getElementById('modalHero');
    if (modalHero) {
        modalHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${data.image}')`;
        modalHero.style.backgroundSize = 'cover';
        modalHero.style.backgroundPosition = 'center';
    }

    const stepsContainer = document.getElementById('modalSteps');
    if (stepsContainer) {
        stepsContainer.innerHTML = '';
        if(data.steps && Array.isArray(data.steps)) {
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
    }
}