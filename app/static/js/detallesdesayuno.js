/* =========================================================
   DETALLE DE RECETAS - TUTA WAYTA (VERSIÓN PROFESIONAL)
   ========================================================= */

const recetasTraducidas = {
  es: {
    1: {
      id: 1,
      nombre: "Smoothie Bowl de Pitahaya",
      etiqueta: "Desayuno",
      tiempo: "10 minutos",
      porciones: "1 porción",
      dificultad: "Fácil",
      tipo: "Desayuno",
      descripcion: "Bowl saludable de pitahaya con frutas frescas, granola artesanal y miel natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 taza de pitahaya",
        "1/2 plátano",
        "1/2 taza de yogurt griego",
        "3 cucharadas de granola",
        "1 cucharadita de miel"
      ]
    },
    2: {
      id: 2,
      nombre: "Mojito de Pitahaya",
      etiqueta: "Bebidas",
      tiempo: "5 minutos",
      porciones: "2 porciones",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Mojito tropical con menta fresca, limón y pitahaya rosada natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 taza de pitahaya",
        "6 hojas de menta",
        "1 limón",
        "1 taza de agua con gas",
        "Hielo"
      ]
    },
    3: {
      id: 3,
      nombre: "Cheesecake de Pitahaya",
      etiqueta: "Postres",
      tiempo: "45 minutos",
      porciones: "8 porciones",
      dificultad: "Media",
      tipo: "Postres",
      descripcion: "Cheesecake cremoso con marmoleado de pitahaya y base crocante.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200 g queso crema",
        "100 g galletas",
        "50 g mantequilla",
        "1/2 taza pitahaya",
        "1 sobre gelatina"
      ]
    },
    4: {
      id: 4,
      nombre: "Panqueques con Pitahaya",
      etiqueta: "Desayuno",
      tiempo: "20 minutos",
      porciones: "2 porciones",
      dificultad: "Fácil",
      tipo: "Desayuno",
      descripcion: "Panqueques esponjosos con jarabe natural de pitahaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 taza harina",
        "1 huevo",
        "1/2 taza leche",
        "2 cucharadas pitahaya",
        "1 cucharada miel"
      ]
    },
    5: {
      id: 5,
      nombre: "Jugo Natural de Pitahaya",
      etiqueta: "Bebidas",
      tiempo: "7 minutos",
      porciones: "1 porción",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Jugo natural refrescante de pitahaya roja.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 pitahaya",
        "1 taza agua",
        "2 cucharaditas azúcar",
        "Hielo"
      ]
    },
    6: {
      id: 6,
      nombre: "Helado Cremoso",
      etiqueta: "Postres",
      tiempo: "30 minutos",
      porciones: "4 porciones",
      dificultad: "Fácil",
      tipo: "Postres",
      descripcion: "Helado artesanal de pitahaya con leche de coco.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 taza pitahaya",
        "1 taza leche coco",
        "1/2 taza crema",
        "Azúcar"
      ]
    },
    7: {
      id: 7,
      nombre: "Yogurt Tropical",
      etiqueta: "Desayuno",
      tiempo: "8 minutos",
      porciones: "1 porción",
      dificultad: "Fácil",
      tipo: "Desayuno",
      descripcion: "Yogurt con mango y pitahaya en capas frescas.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIi1Elqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 taza yogurt",
        "1/2 mango",
        "1/2 taza pitahaya",
        "Granola"
      ]
    },
    8: {
      id: 8,
      nombre: "Batido Energético",
      etiqueta: "Bebidas",
      tiempo: "9 minutos",
      porciones: "2 porciones",
      dificultad: "Media",
      tipo: "Bebidas",
      descripcion: "Batido energético con pitahaya y jengibre.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 taza pitahaya",
        "1 banano",
        "1/2 taza leche",
        "Jengibre"
      ]
    },
    9: {
      id: 9,
      nombre: "Gelatina de Pitahaya",
      etiqueta: "Postres",
      tiempo: "18 minutos",
      porciones: "5 porciones",
      dificultad: "Fácil",
      tipo: "Postres",
      descripcion: "Gelatina rosada natural de pitahaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 taza pitahaya",
        "Gelatina sin sabor",
        "Azúcar",
        "Agua"
      ]
    },
    10: {
      id: 10,
      nombre: "Toast con Pitahaya",
      etiqueta: "Desayuno",
      tiempo: "12 minutos",
      porciones: "2 porciones",
      dificultad: "Fácil",
      tipo: "Desayuno",
      descripcion: "Pan con ricotta, pitahaya y miel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 rebanadas pan",
        "Ricotta",
        "Pitahaya",
        "Miel"
      ]
    },
    11: {
      id: 11,
      nombre: "Limonada Rosada",
      etiqueta: "Bebidas",
      tiempo: "6 minutos",
      porciones: "3 porciones",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Limonada fresca con pitahaya natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 limones",
        "1 taza pitahaya",
        "Azúcar",
        "Agua"
      ]
    },
    12: {
      id: 12,
      nombre: "Tarta Tropical",
      etiqueta: "Postres",
      tiempo: "35 minutos",
      porciones: "6 porciones",
      dificultad: "Media",
      tipo: "Postres",
      descripcion: "Tarta premium con crema de coco y pitahaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "Harina",
        "Coco",
        "Pitahaya",
        "Huevos"
      ]
    }
  },
  en: {
    1: {
      id: 1,
      nombre: "Dragon Fruit Smoothie Bowl",
      etiqueta: "Breakfast",
      tiempo: "10 minutes",
      porciones: "1 serving",
      dificultad: "Easy",
      tipo: "Breakfast",
      descripcion: "Healthy dragon fruit bowl with fresh fruits, artisanal granola, and natural honey.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 cup dragon fruit",
        "1/2 banana",
        "1/2 cup Greek yogurt",
        "3 tbsp granola",
        "1 tsp honey"
      ]
    },
    2: {
      id: 2,
      nombre: "Dragon Fruit Mojito",
      etiqueta: "Drinks",
      tiempo: "5 minutes",
      porciones: "2 servings",
      dificultad: "Easy",
      tipo: "Drinks",
      descripcion: "Tropical mojito with fresh mint, lime, and natural pink dragon fruit.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 cup dragon fruit",
        "6 mint leaves",
        "1 lime",
        "1 cup sparkling water",
        "Ice"
      ]
    },
    3: {
      id: 3,
      nombre: "Dragon Fruit Cheesecake",
      etiqueta: "Desserts",
      tiempo: "45 minutes",
      porciones: "8 servings",
      dificultad: "Medium",
      tipo: "Desserts",
      descripcion: "Creamy cheesecake with a dragon fruit marble effect and a crunchy crust.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200g cream cheese",
        "100g cookies",
        "50g butter",
        "1/2 cup dragon fruit",
        "1 packet gelatin"
      ]
    },
    4: {
      id: 4,
      nombre: "Pancakes with Dragon Fruit",
      etiqueta: "Breakfast",
      tiempo: "20 minutes",
      porciones: "2 servings",
      dificultad: "Easy",
      tipo: "Breakfast",
      descripcion: "Fluffy pancakes with a natural dragon fruit syrup.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 cup flour",
        "1 egg",
        "1/2 cup milk",
        "2 tbsp dragon fruit",
        "1 tbsp honey"
      ]
    },
    5: {
      id: 5,
      nombre: "Natural Dragon Fruit Juice",
      etiqueta: "Drinks",
      tiempo: "7 minutes",
      porciones: "1 serving",
      dificultad: "Easy",
      tipo: "Drinks",
      descripcion: "Refreshing natural red dragon fruit juice.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 dragon fruit",
        "1 cup water",
        "2 tsp sugar",
        "Ice"
      ]
    },
    6: {
      id: 6,
      nombre: "Creamy Ice Cream",
      etiqueta: "Desserts",
      tiempo: "30 minutes",
      porciones: "4 servings",
      dificultad: "Easy",
      tipo: "Desserts",
      descripcion: "Artisanal dragon fruit ice cream with coconut milk.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 cup dragon fruit",
        "1 cup coconut milk",
        "1/2 cup cream",
        "Sugar"
      ]
    },
    7: {
      id: 7,
      nombre: "Tropical Yogurt",
      etiqueta: "Breakfast",
      tiempo: "8 minutes",
      porciones: "1 serving",
      dificultad: "Easy",
      tipo: "Breakfast",
      descripcion: "Yogurt with fresh layers of mango and dragon fruit.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIi1Elqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 cup yogurt",
        "1/2 mango",
        "1/2 cup dragon fruit",
        "Granola"
      ]
    },
    8: {
      id: 8,
      nombre: "Energy Smoothie",
      etiqueta: "Drinks",
      tiempo: "9 minutes",
      porciones: "2 servings",
      dificultad: "Medium",
      tipo: "Drinks",
      descripcion: "Energy smoothie with dragon fruit and ginger.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 cup dragon fruit",
        "1 banana",
        "1/2 cup milk",
        "Ginger"
      ]
    },
    9: {
      id: 9,
      nombre: "Dragon Fruit Jelly",
      etiqueta: "Desserts",
      tiempo: "18 minutes",
      porciones: "5 servings",
      dificultad: "Easy",
      tipo: "Desserts",
      descripcion: "Natural pink dragon fruit jelly.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 cup dragon fruit",
        "Unflavored gelatin",
        "Sugar",
        "Water"
      ]
    },
    10: {
      id: 10,
      nombre: "Dragon Fruit Toast",
      etiqueta: "Breakfast",
      tiempo: "12 minutes",
      porciones: "2 servings",
      dificultad: "Easy",
      tipo: "Breakfast",
      descripcion: "Bread with ricotta, dragon fruit, and honey.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 slices of bread",
        "Ricotta",
        "Dragon fruit",
        "Honey"
      ]
    },
    11: {
      id: 11,
      nombre: "Pink Lemonade",
      etiqueta: "Drinks",
      tiempo: "6 minutes",
      porciones: "3 servings",
      dificultad: "Easy",
      tipo: "Drinks",
      descripcion: "Fresh lemonade with natural dragon fruit.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 lemons",
        "1 cup dragon fruit",
        "Sugar",
        "Water"
      ]
    },
    12: {
      id: 12,
      nombre: "Tropical Tart",
      etiqueta: "Desserts",
      tiempo: "35 minutes",
      porciones: "6 servings",
      dificultad: "Medium",
      tipo: "Desserts",
      descripcion: "Premium tarts with coconut cream and dragon fruit.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "Flour",
        "Coconut",
        "Dragon fruit",
        "Eggs"
      ]
    }
  },
  zh: {
    1: {
      id: 1,
      nombre: "火龙果高能奶昔碗",
      etiqueta: "早餐",
      tiempo: "10 分钟",
      porciones: "1 人份",
      dificultad: "简单",
      tipo: "早餐",
      descripcion: "健康火龙果奶昔碗，搭配新鲜水果、手工燕麦片和天然蜂蜜。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 杯火龙果",
        "1/2 根香蕉",
        "1/2 杯希腊酸奶",
        "3 汤匙燕麦片",
        "1 茶匙蜂蜜"
      ]
    },
    2: {
      id: 2,
      nombre: "火龙果莫吉托",
      etiqueta: "饮品",
      tiempo: "5 分钟",
      porciones: "2 人份",
      dificultad: "简单",
      tipo: "饮品",
      descripcion: "热带风味莫吉托，搭配新鲜薄荷、青柠和天然粉色火龙果。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 杯火龙果",
        "6 片薄荷叶",
        "1 个青柠",
        "1 杯苏打水",
        "冰块"
      ]
    },
    3: {
      id: 3,
      nombre: "火龙果芝士蛋糕",
      etiqueta: "甜品",
      tiempo: "45 分钟",
      porciones: "8 人份",
      dificultad: "中等",
      tipo: "甜品",
      descripcion: "浓郁细腻的芝士蛋糕，带有火龙果大理石纹理及酥脆饼底。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200 克奶油芝士",
        "100 克饼干",
        "50 克黄油",
        "1/2 杯火龙果",
        "1 包明胶"
      ]
    },
    4: {
      id: 4,
      nombre: "火龙果松饼",
      etiqueta: "早餐",
      tiempo: "20 分钟",
      porciones: "2 人份",
      dificultad: "简单",
      tipo: "早餐",
      descripcion: "蓬松的松饼，淋上天然火龙果果浆。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 杯面粉",
        "1 个鸡蛋",
        "1/2 杯牛奶",
        "2 汤匙火龙果",
        "1 汤匙蜂蜜"
      ]
    },
    5: {
      id: 5,
      nombre: "天然火龙果汁",
      etiqueta: "饮品",
      tiempo: "7 分钟",
      porciones: "1 人份",
      dificultad: "简单",
      tipo: "饮品",
      descripcion: "清爽怡人的天然红心火龙果汁。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 个火龙果",
        "1 杯水",
        "2 茶匙糖",
        "冰块"
      ]
    },
    6: {
      id: 6,
      nombre: "浓郁火龙果冰淇淋",
      etiqueta: "甜品",
      tiempo: "30 分钟",
      porciones: "4 人份",
      dificultad: "简单",
      tipo: "甜品",
      descripcion: "手工制作的火龙果冰淇淋，融入清香椰奶。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 杯火龙果",
        "1 杯椰奶",
        "1/2 杯鲜奶油",
        "糖"
      ]
    },
    7: {
      id: 7,
      nombre: "热带酸奶杯",
      etiqueta: "早餐",
      tiempo: "8 分钟",
      porciones: "1 人份",
      dificultad: "简单",
      tipo: "早餐",
      descripcion: "层次分明的新鲜芒果与火龙果风味酸奶。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIi1Elqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 杯酸奶",
        "1/2 个芒果",
        "1/2 杯火龙果",
        "燕麦 granola"
      ]
    },
    8: {
      id: 8,
      nombre: "高能生姜火龙果奶昔",
      etiqueta: "饮品",
      tiempo: "9 分钟",
      porciones: "2 人份",
      dificultad: "中等",
      tipo: "饮品",
      descripcion: "加入火龙果与微辣生姜的活力高能奶昔。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 杯火龙果",
        "1 根香蕉",
        "1/2 杯牛奶",
        "生姜"
      ]
    },
    9: {
      id: 9,
      nombre: "水晶火龙果果冻",
      etiqueta: "甜品",
      tiempo: "18 分钟",
      porciones: "5 人份",
      dificultad: "简单",
      tipo: "甜品",
      descripcion: "天然粉色纯正火龙果果冻。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 杯火龙果",
        "无味果冻粉",
        "糖",
        "水"
      ]
    },
    10: {
      id: 10,
      nombre: "火龙果里科塔里吐司",
      etiqueta: "早餐",
      tiempo: "12 分钟",
      porciones: "2 人份",
      dificultad: "简单",
      tipo: "早餐",
      descripcion: "酥脆面包片搭配里科塔奶酪、新鲜火龙果和优质蜂蜜。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 片面包",
        "里科塔奶酪",
        "火龙果",
        "蜂蜜"
      ]
    },
    11: {
      id: 11,
      nombre: "粉红火龙果柠檬水",
      etiqueta: "饮品",
      tiempo: "6 分钟",
      porciones: "3 人份",
      dificultad: "简单",
      tipo: "饮品",
      descripcion: "融合了天然火龙果的新鲜清爽柠檬水。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 个柠檬",
        "1 杯火龙果",
        "糖",
        "水"
      ]
    },
    12: {
      id: 12,
      nombre: "热带椰香火龙果派",
      etiqueta: "甜品",
      tiempo: "35 分钟",
      porciones: "6 人份",
      dificultad: "中等",
      tipo: "甜品",
      descripcion: "搭配浓郁椰子奶油和火龙果的高级精品甜派。",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "面粉",
        "椰蓉",
        "火龙果",
        "鸡蛋"
      ]
    }
  },
  fr: {
    1: {
      id: 1,
      nombre: "Smoothie Bowl au Pitaya",
      etiqueta: "Petit-déjeuner",
      tiempo: "10 minutes",
      porciones: "1 portion",
      dificultad: "Facile",
      tipo: "Petit-déjeuner",
      descripcion: "Un bol sain de pitaya avec des fruits frais, du granola artisanal et du miel naturel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 tasse de pitaya",
        "1/2 banane",
        "1/2 tasse de yaourt grec",
        "3 cuillères à soupe de granola",
        "1 cuillère à café de miel"
      ]
    },
    2: {
      id: 2,
      nombre: "Mojito au Pitaya",
      etiqueta: "Boissons",
      tiempo: "5 minutes",
      porciones: "2 portions",
      dificultad: "Facile",
      tipo: "Boissons",
      descripcion: "Un mojito tropical avec de la menthe fraîche, du citron et du pitaya rose naturel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 tasse de pitaya",
        "6 feuilles de menthe",
        "1 citron",
        "1 tasse d'eau gazeuse",
        "Glaçons"
      ]
    },
    3: {
      id: 3,
      nombre: "Cheesecake au Pitaya",
      etiqueta: "Desserts",
      tiempo: "45 minutes",
      porciones: "8 portions",
      dificultad: "Moyenne",
      tipo: "Desserts",
      descripcion: "Un cheesecake crémeux marbré au pitaya sur une base croquante.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200 g de fromage à la crème",
        "100 g de biscuits",
        "50 g de beurre",
        "1/2 tasse de pitaya",
        "1 sachet de gélatine"
      ]
    },
    4: {
      id: 4,
      nombre: "Pancakes au Pitaya",
      etiqueta: "Petit-déjeuner",
      tiempo: "20 minutes",
      porciones: "2 portions",
      dificultad: "Facile",
      tipo: "Petit-déjeuner",
      descripcion: "Des pancakes moelleux accompagnés d'un sirop naturel de pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 tasse de farine",
        "1 œuf",
        "1/2 tasse de lait",
        "2 cuillères à soupe de pitaya",
        "1 cuillère à soupe de miel"
      ]
    },
    5: {
      id: 5,
      nombre: "Jus Naturel de Pitaya",
      etiqueta: "Boissons",
      tiempo: "7 minutes",
      porciones: "1 portion",
      dificultad: "Facile",
      tipo: "Boissons",
      descripcion: "Un jus naturel et rafraîchissant de pitaya rouge.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 pitaya",
        "1 tasse d'eau",
        "2 cuillères à café de sucre",
        "Glaçons"
      ]
    },
    6: {
      id: 6,
      nombre: "Glace Crémeuse au Pitaya",
      etiqueta: "Desserts",
      tiempo: "30 minutes",
      porciones: "4 portions",
      dificultad: "Facile",
      tipo: "Desserts",
      descripcion: "Une glace artisanale au pitaya et au lait de coco.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 tasse de pitaya",
        "1 tasse de lait de coco",
        "1/2 tasse de crème",
        "Sucre"
      ]
    },
    7: {
      id: 7,
      nombre: "Yaourt Tropical",
      etiqueta: "Petit-déjeuner",
      tiempo: "8 minutes",
      porciones: "1 portion",
      dificultad: "Facile",
      tipo: "Petit-déjeuner",
      descripcion: "Un yaourt superposé de couches fraîches de mangue et de pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIi1Elqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 tasse de yaourt",
        "1/2 mangue",
        "1/2 tasse de pitaya",
        "Granola"
      ]
    },
    8: {
      id: 8,
      nombre: "Smoothie Énergétique",
      etiqueta: "Boissons",
      tiempo: "9 minutes",
      porciones: "2 portions",
      dificultad: "Moyenne",
      tipo: "Boissons",
      descripcion: "Un smoothie énergétique au pitaya et au gingembre.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 tasse de pitaya",
        "1 banane",
        "1/2 tasse de lait",
        "Gingembre"
      ]
    },
    9: {
      id: 9,
      nombre: "Gelée de Pitaya",
      etiqueta: "Desserts",
      tiempo: "18 minutes",
      porciones: "5 portions",
      dificultad: "Facile",
      tipo: "Desserts",
      descripcion: "Gelée rose naturelle de pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 tasse de pitaya",
        "Gélatine sans saveur",
        "Sucre",
        "Eau"
      ]
    },
    10: {
      id: 10,
      nombre: "Toast au Pitaya",
      etiqueta: "Petit-déjeuner",
      tiempo: "12 minutes",
      porciones: "2 portions",
      dificultad: "Facile",
      tipo: "Petit-déjeuner",
      descripcion: "Pain avec de la ricotta, du pitaya et du miel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 tranches de pain",
        "Ricotta",
        "Pitaya",
        "Miel"
      ]
    },
    11: {
      id: 11,
      nombre: "Citronnade Rose",
      etiqueta: "Boissons",
      tiempo: "6 minutes",
      porciones: "3 portions",
      dificultad: "Facile",
      tipo: "Boissons",
      descripcion: "Citronnade fraîche avec du pitaya naturel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 citrons",
        "1 tasse de pitaya",
        "Sucre",
        "Eau"
      ]
    },
    12: {
      id: 12,
      nombre: "Tarte Tropicale",
      etiqueta: "Desserts",
      tiempo: "35 minutes",
      porciones: "6 portions",
      dificultad: "Moyenne",
      tipo: "Desserts",
      descripcion: "Tarte de qualité supérieure avec crème de coco et pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "Farine",
        "Noix de coco",
        "Pitaya",
        "Œufs"
      ]
    }
  },
  it: {
    1: {
      id: 1,
      nombre: "Smoothie Bowl alla Pitaya",
      etiqueta: "Colazione",
      tiempo: "10 minuti",
      porciones: "1 porzione",
      dificultad: "Facile",
      tipo: "Colazione",
      descripcion: "Sana ciotola di pitaya con frutta fresca, granola artigianale e miele naturale.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 tazza di pitaya",
        "1/2 banana",
        "1/2 tazza di yogurt greco",
        "3 cucchiai di granola",
        "1 cucchiaino di miele"
      ]
    },
    2: {
      id: 2,
      nombre: "Mojito alla Pitaya",
      etiqueta: "Bevande",
      tiempo: "5 minuti",
      porciones: "2 porzioni",
      dificultad: "Facile",
      tipo: "Bevande",
      descripcion: "Mojito tropicale con menta fresca, lime e pitaya rosa naturale.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 tazza di pitaya",
        "6 foglie di menta",
        "1 lime",
        "1 tazza di acqua frizzante",
        "Ghiaccio"
      ]
    },
    3: {
      id: 3,
      nombre: "Cheesecake alla Pitaya",
      etiqueta: "Dolci",
      tiempo: "45 minuti",
      porciones: "8 porzioni",
      dificultad: "Media",
      tipo: "Dolci",
      descripcion: "Cheesecake cremosa con marmorizzazione alla pitaya e base croccante.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200 g di formaggio spalmabile",
        "100 g di biscotti",
        "50 g di burro",
        "1/2 tazza di pitaya",
        "1 bustina di gelatina"
      ]
    },
    4: {
      id: 4,
      nombre: "Pancake alla Pitaya",
      etiqueta: "Colazione",
      tiempo: "20 minuti",
      porciones: "2 porzioni",
      dificultad: "Facile",
      tipo: "Colazione",
      descripcion: "Soffici pancake serviti con sciroppo naturale di pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 tazza di farina",
        "1 uovo",
        "1/2 tazza di latte",
        "2 cucchiai di pitaya",
        "1 cucchiaio di miele"
      ]
    },
    5: {
      id: 5,
      nombre: "Succo Naturale di Pitaya",
      etiqueta: "Bevande",
      tiempo: "7 minuti",
      porciones: "1 porzione",
      dificultad: "Facile",
      tipo: "Bevande",
      descripcion: "Succo naturale e rinfrescante di pitaya rossa.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 pitaya",
        "1 tazza di acqua",
        "2 cucchiaini di zucchero",
        "Ghiaccio"
      ]
    },
    6: {
      id: 6,
      nombre: "Gelato Cremoso alla Pitaya",
      etiqueta: "Dolci",
      tiempo: "30 minuti",
      porciones: "4 porzioni",
      dificultad: "Facile",
      tipo: "Dolci",
      descripcion: "Gelato artigianale alla pitaya con latte di cocco.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 tazza di pitaya",
        "1 tazza di latte di cocco",
        "1/2 tazza di panna",
        "Zucchero"
      ]
    },
    7: {
      id: 7,
      nombre: "Yogurt Tropicale",
      etiqueta: "Colazione",
      tiempo: "8 minuti",
      porciones: "1 porzione",
      dificultad: "Facile",
      tipo: "Colazione",
      descripcion: "Yogurt a strati frescos con mango e pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIi1Elqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 tazza di yogurt",
        "1/2 mango",
        "1/2 tazza di pitaya",
        "Granola"
      ]
    },
    8: {
      id: 8,
      nombre: "Frullato Energetico",
      etiqueta: "Bevande",
      tiempo: "9 minuti",
      porciones: "2 porzioni",
      dificultad: "Media",
      tipo: "Bevande",
      descripcion: "Frullato energetico con pitaya e zenzero.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 tazza di pitaya",
        "1 banana",
        "1/2 tazza di latte",
        "Zenzero"
      ]
    },
    9: {
      id: 9,
      nombre: "Gelatina di Pitaya",
      etiqueta: "Dolci",
      tiempo: "18 minuti",
      porciones: "5 porzioni",
      dificultad: "Facile",
      tipo: "Dolci",
      descripcion: "Gelatina rosa naturale alla pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 tazza di pitaya",
        "Gelatina in polvere senza sapore",
        "Zucchero",
        "Acqua"
      ]
    },
    10: {
      id: 10,
      nombre: "Toast alla Pitaya",
      etiqueta: "Colazione",
      tiempo: "12 minuti",
      porciones: "2 porzioni",
      dificultad: "Facile",
      tipo: "Colazione",
      descripcion: "Pane tostato con ricotta, pitaya e miele.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 fette di pane",
        "Ricotta",
        "Pitaya",
        "Miele"
      ]
    },
    11: {
      id: 11,
      nombre: "Limonata Rosa",
      etiqueta: "Bevande",
      tiempo: "6 minuti",
      porciones: "3 porzioni",
      dificultad: "Facile",
      tipo: "Bevande",
      descripcion: "Limonata fresca con pitaya naturale.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 limoni",
        "1 tazza di pitaya",
        "Zucchero",
        "Acqua"
      ]
    },
    12: {
      id: 12,
      nombre: "Torta Tropicale",
      etiqueta: "Dolci",
      tiempo: "35 minuti",
      porciones: "6 porzioni",
      dificultad: "Media",
      tipo: "Dolci",
      descripcion: "Crostata premium con crema di cocco e pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "Farina",
        "Cocco",
        "Pitaya",
        "Uova"
      ]
    }
  },
  pt: {
    1: {
      id: 1,
      nombre: "Smoothie Bowl de Pitaya",
      etiqueta: "Café da manhã",
      tiempo: "10 minutos",
      porciones: "1 porção",
      dificultad: "Fácil",
      tipo: "Café da manhã",
      descripcion: "Tigela saudável de pitaya com frutas frescas, granola artesanal e mel natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6AXKan2QCUzSeqqtN53_T8q7nD72jKlnX0s54fgqKq3PZbX8BMnh_62NE7Uf9PRWWmerkeuSevsF_weiNkFpT47ny40gEU-LfX5ByoSaYp_JzNLd6n_eqeA4-aBP9tl1umqhI2erzL3xXvKoJZJFPovIM3QgtF88w6MyNjDCPbTH_Pw5HlrKpXpDbwYYzvXkUSdWQK9SXYAmGQ_8TevssXlAFtvSm37YH2VupNmaBfRfb-MjxLnUjOFUSVG2fE_zmFo5bSOcdgA",
      ingredientes: [
        "1 xícara de pitaya",
        "1/2 banana",
        "1/2 xícara de iogurte grego",
        "3 colheres de sopa de granola",
        "1 colher de chá de mel"
      ]
    },
    2: {
      id: 2,
      nombre: "Mojito de Pitaya",
      etiqueta: "Bebidas",
      tiempo: "5 minutos",
      porciones: "2 porções",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Mojito tropical com hortelã fresca, limão e pitaya rosa natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCreiax2dsS5jiZpD2YchNTqwoWooWF7XoRDW4n4FfNo1cg3gmANslCe4AthO1m41IiHDR9gnM53GwNsr3vD4vHhTLCN0uTp6CQbFaA1ZPQIKtrncfeh0P1_Nh9896rX9ttTp_osKrFR8PiyIpk6XS16xujNK_1lnkPQ81HXvbQcxIdfQiCAz7Dx686f3Rz9ENq-vY-E4tkgWAX-7LVw6ysU2rw4amwWX2zKfRfYwcNExL7jlRaQ0HW9O9zI9HhuSXFhOCMtDqXLKY",
      ingredientes: [
        "1/2 xícara de pitaya",
        "6 folhas de hortelã",
        "1 limão",
        "1 xícara de água com gás",
        "Gelo"
      ]
    },
    3: {
      id: 3,
      nombre: "Cheesecake de Pitaya",
      etiqueta: "Sobremesas",
      tiempo: "45 minutos",
      porciones: "8 porções",
      dificultad: "Média",
      tipo: "Sobremesas",
      descripcion: "Cheesecake cremoso com efeito marmorizado de pitaya e base crocante.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcQ20ws3SqQoxTOJ0wCSgZO5k9wSoPHnXHhZX_xYXp1fXwEIaVpjd14sqQyTG81ydySQmds1J5cFfpuULxRlPSbHGNQbrFBAH_UGcm3fBxO0fRqu_K476rH2_rPGHGmnbhof8HH1WTvLUs3ssBY1z3EMUHuyWRb4Z6UZr6WtTb6KmXpNp8EWG5R_tTCt_9bfgfGgwFVyDMu90ykIbtvTtQDt6KMRs2rh2Hf4HkL1KNfO0SYKpnwHBlpdTcjv1ChLeoh07bXpBQunU",
      ingredientes: [
        "200 g de cream cheese",
        "100 g de biscoito",
        "50 g de manteiga",
        "1/2 xícara de pitaya",
        "1 pacote de gelatina"
      ]
    },
    4: {
      id: 4,
      nombre: "Panquecas com Pitaya",
      etiqueta: "Café da manhã",
      tiempo: "20 minutos",
      porciones: "2 porções",
      dificultad: "Fácil",
      tipo: "Café da manhã",
      descripcion: "Panquecas fofinhas acompanhadas de xarope natural de pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMGV51EKPPX0o8ZOnFw_Lylj3-LTsC1Rk6_O38YeRn0yvLxTcs2kitMbE6uLjo7oSJpH3kAFn8QSdgVBqyQX6wf3LRBxImq273WVe5k1UbkPsVQ8uFlflXknt7O8vaB1Eu_i-hU9sLEmaLmgGpHu8wf_bkiFyfwTXk-oWzdEW0eiSJLzvouFCl5K_5F1DH28tSs7L3oijgqovHJDWUEnw4ItJx8BjJV1wL8iE9U_2-9fJzaeFXPBxdmSylldBsnv1XL9zUNKGrLtE",
      ingredientes: [
        "1 xícara de farinha",
        "1 ovo",
        "1/2 xícara de leite",
        "2 colheres de sopa de pitaya",
        "1 colher de sopa de mel"
      ]
    },
    5: {
      id: 5,
      nombre: "Suco Natural de Pitaya",
      etiqueta: "Bebidas",
      tiempo: "7 minutos",
      porciones: "1 porção",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Suco natural e refrescante de pitaya vermelha.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXgPSRblfBfNtxZdKsc5mSYGTp5NXzoEqHLmP84L_b5OG4h7pUKn1La8OnJtMI7zoyWn024lksDmTHXH8nvRDWgRfNC0VXAgdSPVd1l_ZEAANh_0oXZQCb_J7Hof-wZwP6c6uP9UJN7TgfzcwI57wljhEOgU4WAEvUp3umXQNvXioVoLZ6OeuNYtEmd9hfrv5e0UBo6xB36qUHwT9iXWNM2ppcroHMqjx-SvjJyR7FdI8qAYFQ60w1H_SNonhgaL1FmEMBcnvXw6c",
      ingredientes: [
        "1 pitaya",
        "1 xícara de água",
        "2 colheres de chá de açúcar",
        "Gelo"
      ]
    },
    6: {
      id: 6,
      nombre: "Sorvete Cremoso de Pitaya",
      etiqueta: "Sobremesas",
      tiempo: "30 minutos",
      porciones: "4 porções",
      dificultad: "Fácil",
      tipo: "Sobremesas",
      descripcion: "Sorvete artesanal de pitaya com leite de coco.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36zeitmmdtGASu4hxX6qSEx-s1LlSt_svwVFqxN-FEl0nmEfAtE3HRys-O9HAFkvIJQw3iyjTsiDcTc3RMAN3G8VrnbKF3ZII7xaDPq8C7Jac_KE6EpOjhglr_ijyLWJkE1gLHFdpchePlDXg9GWbyG1LWNXfYS-FrFsybtJQax06D6Hj2FXeW4CS6zYZWGdRdM2izhDEy2ZuZKaFM7pvbzydW--d8PQgoX0L78smjSDDAICOQg4MnsIKmsH7xfycvgJEkU91g_0",
      ingredientes: [
        "1 xícara de pitaya",
        "1 xícara de leite de coco",
        "1/2 xícara de creme de leite",
        "Açúcar"
      ]
    },
    7: {
      id: 7,
      nombre: "Iogurte Tropical",
      etiqueta: "Café da manhã",
      tiempo: "8 minutos",
      porciones: "1 porção",
      dificultad: "Fácil",
      tipo: "Café da manhã",
      descripcion: "Iogurte em camadas frescas de manga e pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKUeGgd2hGi42M71t8HuxT4DYoQxSR8_jsATDIzSvlfxKbZBGtNOQi7DeCnEj4vFPV5fMRnGCl02vmxE1cdlOLJ-f1JSlAUYHHPG0B0kC4f8POQ5_Rz1hxrR8pUkYLsErm8jHL6jsmJEC8iyzHbbkCoHOyiN2Z3Kp8WwmKvOJNLp02dfoKS24RPjzUZJvNMhd2aRPkkA_Sng6u9xXaa0PK8TaFmiWIiElqcfgc_-huWrG2XpdUNlH8FR1WGYioqjByNs83uETT4",
      ingredientes: [
        "1 xícara de iogurte",
        "1/2 manga",
        "1/2 xícara de pitaya",
        "Granola"
      ]
    },
    8: {
      id: 8,
      nombre: "Batido Energético",
      etiqueta: "Bebidas",
      tiempo: "9 minutos",
      porciones: "2 porções",
      dificultad: "Média",
      tipo: "Bebidas",
      descripcion: "Vitamina energética com pitaya e gengibre.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdcBHboqSFHR9ishm6MtyNy8AJt2HIz2-QlSjpeeV6RB8tNMzntBSiCMuqk4m7lCLjDFTZmy3i12JghVnhzOYl3lb1Tny7XXmWuVuX_pfb7RMmUdPA19K5eXDXoZdt9Mgd0tAzfzqp_OpynEfICWNQ3IV_fqSDjt6Ef2evxTtnm4vDuILjZs8Bh9l8lfjmctsHVh6Qs6YwWw0ToC7yhYMgtUQKOszFAGtztycoXyLfYc723o4BCRPwYN59cLOIGSRFaFKYoEe7ow",
      ingredientes: [
        "1 xícara de pitaya",
        "1 banana",
        "1/2 xícara de leite",
        "Gengibre"
      ]
    },
    9: {
      id: 9,
      nombre: "Gelatina de Pitaya",
      etiqueta: "Sobremesas",
      tiempo: "18 minutos",
      porciones: "5 porções",
      dificultad: "Fácil",
      tipo: "Sobremesas",
      descripcion: "Gelatina rosa natural de pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqUfHXB5ErH78hTGpCIOkjyx8Ol0rnOUHMZaT9vbjm5hXJyB142iY6g3bJG1hYAzfwtWmoodPtK9IzyZK4mHgGsZfvZX-LJHKiyqcWJSO31Sw8ZM_UZe1pLLpAr88NRvBJ90BOOYRU2giwl8dMs1ACS_ugkG-uo9rHKt7XiC0hgmXD8q-_kIdS2IKYUyc2kWjKY_uSPBAUAkk4XtQfUia9h-o3wGLfsGdyV9ZrLgqMzr4Yd6MlZk54IyKaBkuXEPMy2AvkzgifHU",
      ingredientes: [
        "1 xícara de pitaya",
        "Gelatina sem sabor",
        "Açúcar",
        "Água"
      ]
    },
    10: {
      id: 10,
      nombre: "Torrada com Pitaya",
      etiqueta: "Café da manhã",
      tiempo: "12 minutos",
      porciones: "2 porções",
      dificultad: "Fácil",
      tipo: "Café da manhã",
      descripcion: "Pão com ricota, pitaya e mel.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE9Vy9OY5g81pjfuodmIG6Bw1EpEQbiThQagd2eb3-AZ831J-yz-zwEUoTfNWMTxXNR2UukiTXupa67ZtK75HYr523G58Fj4wUPLb0w-pWNTmsRMIeXKbpsfRlt6-fwta0vZIusr-7-2UiEirkBKb4qEigHqcrywZFpgwrsn_EhWmYuehKsUV5ahcSe3OTlLd4ztyE2-_bcR9jYhg4VLCcMeba4WrZFVDJoUtGJTwHJosMisfyA5snVZeomTjSCpfLf9c55MEZoyU",
      ingredientes: [
        "2 fatias de pão",
        "Ricota",
        "Pitaya",
        "Mel"
      ]
    },
    11: {
      id: 11,
      nombre: "Limonada Rosa",
      etiqueta: "Bebidas",
      tiempo: "6 minutos",
      porciones: "3 porções",
      dificultad: "Fácil",
      tipo: "Bebidas",
      descripcion: "Limonada fresca com pitaya natural.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaUOdavMagJdDqVNntGkc6utptUKRD8rH96rjt6yuRUixy8Gt6n67q_3N17F7ohi2L4zrRtUyJ_8o5BGUiMekwN5g6N5CIZuusZDAANs-xvkC6NCaQv4RWU1h1tD2sDFXPW9gArJGhcCn-ihD9QXs_Ard-vhjfi2ueAVR5wc-mflbYmKSci8pSB59HIAOVgjKflpcjFn6drjpt1Ayuigj9MJmJ2FkUIdX-sUorT6bWMTsKNLxpKgHE0CA-Mm7pLREk13TwHL0u5tw",
      ingredientes: [
        "3 limões",
        "1 xícara de pitaya",
        "Açúcar",
        "Água"
      ]
    },
    12: {
      id: 12,
      nombre: "Torta Tropical",
      etiqueta: "Sobremesas",
      tiempo: "35 minutos",
      porciones: "6 porções",
      dificultad: "Média",
      tipo: "Sobremesas",
      descripcion: "Torta premium com creme de coco e pitaya.",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnLD3-eht8Osz7EJrxMQPLgD7XQYE3NIaa8vPQ4017mHBIJKs1VOgDGsa9UXhe3IDAy2hnkQgkmBQqteobeJpu2Jx9l-a5IG_RVRGUxQw9viZDB3KrtCsrWpjjdN4ZIjYznBiYlASuNeYKGOuPKwWSNLkjt6esWdzoQiBctZYzi-9f1u_1BDmbGZ5eLiK2315nwbm7ZVYEPmij8KRglrXy8ZMVkZN7Ce9qtMyzPqmXLahwbDgkAN6s7esKfdpzo0dvvsNjRWeUO4",
      ingredientes: [
        "Farinha",
        "Coco",
        "Pitaya",
        "Ovos"
      ]
    }
  }
};
/* ================= INTERFAZ TRADUCIDA ================= */
const interfazTraducida = {
  es: {
    tiempo: "TIEMPO",
    porciones: "PORCIONES",
    dificultad: "DIFICULTAD",
    tipo: "TIPO",
    ingredientes: "Ingredientes Naturales",
    volver: "Volver al Catálogo",
    es: "Español", en: "English", zh: "Chino", de: "Deutsch", fr: "Français", it: "Italiano", pt: "Português"
  },
  en: {
    tiempo: "TIME",
    porciones: "SERVINGS",
    dificultad: "DIFFICULTY",
    tipo: "TYPE",
    ingredientes: "Natural Ingredients",
    volver: "Back to Catalog",
    es: "Spanish", en: "English", zh: "Chinese", de: "German", fr: "French", it: "Italian", pt: "Portuguese"
  },
  zh: {
    tiempo: "制作时间",
    porciones: "分量份数",
    dificultad: "制作难度",
    tipo: "食谱类型",
    ingredientes: "纯天然原材料",
    volver: "返回产品目录",
    es: "西班牙语", en: "英语", zh: "中文", de: "德语", fr: "法语", it: "意大利语", pt: "葡萄牙语"
  },
  de: {
    tiempo: "ZEIT",
    porciones: "PORTIONEN",
    dificultad: "SCHWIERIGKEIT",
    tipo: "TYP",
    ingredientes: "Natürliche Zutaten",
    volver: "Zurück zum Katalog",
    es: "Spanisch", en: "Englisch", zh: "Chinesisch", de: "Deutsch", fr: "Französisch", it: "Italienisch", pt: "Portugiesisch"
  },
  fr: {
    tiempo: "TEMPS",
    porciones: "PORTIONS",
    dificultad: "DIFFICULTÉ",
    tipo: "TYPE",
    ingredientes: "Ingrédients Naturels",
    volver: "Retour au Catalogue",
    es: "Espagnol", en: "Anglais", zh: "Chinois", de: "Allemand", fr: "Français", it: "Italianen", pt: "Portugais"
  },
  it: {
    tiempo: "TEMPO",
    porciones: "PORZIONI",
    dificultad: "DIFFICOLTÀ",
    tipo: "TIPO",
    ingredientes: "Ingredienti Naturali",
    volver: "Torna al Catalogo",
    es: "Spagnolo", en: "Inglese", zh: "Cinese", de: "Tedesco", fr: "Francese", it: "Italiano", pt: "Portoghese"
  },
  pt: {
    tiempo: "TEMPO",
    porciones: "PORÇÕES",
    dificultad: "DIFICULDADE",
    tipo: "TIPO",
    ingredientes: "Ingredientes Naturais",
    volver: "Voltar ao Catálogo",
    es: "Espanhol", en: "Inglês", zh: "Chinês", de: "Alemão", fr: "Francês", it: "Italiano", pt: "Português"
  }
};

/* ================= HELPERS GENERALES ================= */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value);
}

/* ================= CORE DE RENDERIZADO ================= */

function renderizarReceta() {
  const lang = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';
  
  // Validación de seguridad para evitar caídas si recetasTraducidas no existe
  if (typeof recetasTraducidas === 'undefined') {
    console.error("Error: 'recetasTraducidas' no está definido globalmente.");
    return;
  }

  const recetas = recetasTraducidas[lang] || recetasTraducidas.es;
  const interfaz = interfazTraducida[lang] || interfazTraducida.es;

  // 1. Sincronizar select tradicional (móvil y escritorio si existen)
  const selector = document.getElementById("langSelector");
  if (selector) selector.value = lang;
  
  const selectorMobile = document.getElementById("langSelectorMobile");
  if (selectorMobile) selectorMobile.value = lang;

  // 2. Sincronizar texto del nuevo selector Desktop interactivo (muestra el idioma en el idioma actual de la interfaz)
  const currentLangText = document.querySelector('#lang-selector-desktop .current-lang-text');
  if (currentLangText) {
    currentLangText.textContent = interfaz[lang] || lang.toUpperCase();
  }

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("p")) || 1;
  const receta = recetas[id] || recetas[1];

  if (!receta) return;

  // Traducir estructura base estética de la página web
  setText("lbl-tiempo", interfaz.tiempo);
  setText("lbl-porciones", interfaz.porciones);
  setText("lbl-dificultad", interfaz.dificultad);
  setText("lbl-tipo", interfaz.tipo);
  
  const bondadesTitle = document.querySelector(".bondades-title");
  if (bondadesTitle) bondadesTitle.textContent = interfaz.ingredientes;

  const btnVolver = document.querySelector(".btn-secondary");
  if (btnVolver) btnVolver.textContent = interfaz.volver;

  // Cargar datos dinámicos de la receta (las claves se quedan fijas en español, los valores cambian de idioma)
  document.title = "Tuta Wayta - " + receta.nombre;

  const rutaImagen = receta.imagen_url || receta.imagen || '';
  const urlFinalImagen = (window.TUTA_BASE_PATH || '') + rutaImagen;

  setAttr("img-receta", "src", urlFinalImagen);
  setAttr("img-receta", "alt", receta.nombre);
  
  const altImg = document.getElementById("img");
  if (altImg) {
    altImg.setAttribute("src", urlFinalImagen);
    altImg.setAttribute("alt", receta.nombre);
  }

  setText("etiqueta", receta.etiqueta);
  setText("nombre", receta.nombre);
  setText("descripcion", receta.descripcion);
  setText("tiempo", receta.tiempo);
  setText("porciones", receta.porciones);
  setText("dificultad", receta.dificultad);
  setText("tipo", receta.tipo);

  // Renderizar lista de ingredientes dinámicamente
  const list = document.getElementById("ingredientes");
  if (list && receta.ingredientes) {
    list.innerHTML = receta.ingredientes
      .map(i => `<li>${i}</li>`)
      .join("");
  }
}

/* ================= FUNCIÓN GLOBAL DE CAMBIO DE IDIOMA ================= */

function cambiarIdiomaPro(nuevoIdioma) {
  localStorage.setItem("tuta_lang", nuevoIdioma);
  document.documentElement.lang = nuevoIdioma;
  
  // Lanzar evento global para sincronizaciones de otros scripts (i18n.js)
  const evento = new CustomEvent('languageChanged', { detail: nuevoIdioma });
  document.dispatchEvent(evento);
  
  // Forzar actualización inmediata de la vista
  renderizarReceta();
}

// Vinculación segura con tu arquitectura global
window.changeLanguage = cambiarIdiomaPro;

/* ================= MANEJO DE EVENTOS E INTERFACES ================= */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de la vista al cargar el DOM
  renderizarReceta();

  // MANERA 1: Evento del select tradicional desktop (<select id="langSelector">)
  const selector = document.getElementById("langSelector");
  if (selector) {
    selector.addEventListener("change", (e) => {
      cambiarIdiomaPro(e.target.value);
    });
  }

  // MANERA 1.2: Evento del select móvil (<select id="langSelectorMobile">)
  const selectorMobile = document.getElementById("langSelectorMobile");
  if (selectorMobile) {
    selectorMobile.addEventListener("change", (e) => {
      cambiarIdiomaPro(e.target.value);
    });
  }

  /* ==========================================================================
      FIX: LÓGICA PARA EL NUEVO SELECTOR DE IDIOMA CON HOVER (ESCRITORIO)
      ========================================================================== */
  const langSelectorDesktop = document.getElementById('lang-selector-desktop');
  if (langSelectorDesktop) {
    const langOptions = langSelectorDesktop.querySelector('.lang-options');

    if (langOptions) {
      langOptions.addEventListener('click', (e) => {
        // Prevenir la recarga predeterminada de las etiquetas de enlace
        e.preventDefault();
        
        const link = e.target.closest('a[data-lang]');
        if (link) {
          const newLang = link.getAttribute('data-lang');
          cambiarIdiomaPro(newLang);
        }
      });
    }
  }
});

// Listener global controlado para evitar recursión desmedida
let bloqueado = false;
document.addEventListener('languageChanged', () => {
  if (!bloqueado) {
    bloqueado = true;
    renderizarReceta();
    setTimeout(() => { bloqueado = false; }, 50);
  }
});