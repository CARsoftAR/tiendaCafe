"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  origin: string;
  grind: string;
  quantity: number;
  image: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Refs para las animaciones de ScrollTrigger en las tarjetas
  const productsGridRef = useRef<HTMLDivElement>(null);
  const originsGridRef = useRef<HTMLDivElement>(null);
  const brewingGridRef = useRef<HTMLDivElement>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");

  const [selectedGrind, setSelectedGrind] = useState<{ [key: number]: string }>({
    1: "Grano Entero",
    2: "Grano Entero",
    3: "Grano Entero",
    4: "Grano Entero",
    5: "Grano Entero",
    6: "Grano Entero",
  });

  const products = [
    {
      id: 1,
      name: "Volcanic Reserve",
      category: "blends",
      origin: "ORIGEN: COLOMBIA",
      price: 18500,
      description: "Notas a chocolate amargo, frutos rojos y cuerpo sedoso.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
    },
    {
      id: 2,
      name: "Golden Sidamo",
      category: "origen",
      origin: "ORIGEN: ETIOPÍA",
      price: 21000,
      description: "Perfil floral intenso, notas cítricas a bergamota y jazmín.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    },
    {
      id: 3,
      name: "Midnight Espresso",
      category: "blends",
      origin: "ORIGEN: BRASIL / SUMATRA",
      price: 19200,
      description: "Tostado oscuro, crema densa, notas a especias y tabaco dulce.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80"
    },
    {
      id: 4,
      name: "Geisha Special Lot",
      category: "especial",
      origin: "ORIGEN: PANAMÁ - BOQUETE",
      price: 34500,
      description: "Edición de concurso. Notas ultra florales, papaya y miel silvestre.",
      image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&q=80"
    },
    {
      id: 5,
      name: "Guatemala Antigua",
      category: "origen",
      origin: "ORIGEN: GUATEMALA",
      price: 19800,
      description: "Cuerpo completo con notas marcadas a cacao y caramelo tostado.",
      image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&q=80"
    },
    {
      id: 6,
      name: "Velvet Decaf",
      category: "blends",
      origin: "ORIGEN: COLOMBIA (AGUA SUIZA)",
      price: 19500,
      description: "Descafeinado por proceso natural al agua. Sin perder complejidad.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"
    }
  ];

  const filteredProducts = activeFilter === "todos"
    ? products
    : products.filter(p => p.category === activeFilter);

  const originsData = [
    {
      id: "colombia",
      country: "Colombia",
      region: "Huila - Finca El Paraíso",
      altitude: "1.950 m.s.n.m.",
      soil: "Volcánico rico en cenizas",
      process: "Lavado con fermentación anaeróbica",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
      description: "Micro-lotes cultivados bajo la sombra de árboles nativos, con un perfil dulce y equilibrado."
    },
    {
      id: "etiopia",
      country: "Etiopía",
      region: "Yirgacheffe - Gedeo Zone",
      altitude: "2.100 m.s.n.m.",
      soil: "Arcilloso rico en minerales",
      process: "Natural (Secado en camas africanas)",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      description: "Cuna histórica del café arábica, caracterizada por sus notas silvestres y florales inconfundibles."
    },
    {
      id: "brasil",
      country: "Brasil",
      region: "Sul de Minas - Finca Santa Rita",
      altitude: "1.200 m.s.n.m.",
      soil: "Franco-arenoso profundo",
      process: "Pulpado Natural (Honey)",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      description: "Tostado con gran cuerpo, baja acidez y un dulzor residual prolongado a frutos secos."
    }
  ];

  const brewingMethods = [
    {
      title: "V60 Drip",
      time: "2 min 30 seg",
      grind: "Medio - Fino",
      description: "Resalta la claridad de notas florales y acidez brillante.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"
    },
    {
      title: "Prensa Francesa",
      time: "4 min 00 seg",
      grind: "Grueso",
      description: "Cuerpo denso, aceites esenciales intactos y gran textura.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
    },
    {
      title: "Espresso de Autor",
      time: "28 segundos",
      grind: "Fino",
      description: "Extracción concentrada, crema densa y balance perfecto.",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80"
    }
  ];

  const addToCart = (product: typeof products[0]) => {
    const grindType = selectedGrind[product.id] || "Grano Entero";
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.grind === grindType);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.grind === grindType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, grind: grindType, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, grind: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id && item.grind === grind) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    setCart([]);
  };

  // Efectos de animación GSAP con ScrollTrigger para las tarjetas
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      navbarRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
    )
      .fromTo(
        heroTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      );

    // Animación escalonada para las tarjetas de productos
    if (productsGridRef.current) {
      gsap.fromTo(
        productsGridRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsGridRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animación escalonada para las tarjetas de orígenes
    if (originsGridRef.current) {
      gsap.fromTo(
        originsGridRef.current.children,
        { opacity: 0, y: 60, rotation: 1 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: originsGridRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animación escalonada para los métodos de extracción
    if (brewingGridRef.current) {
      gsap.fromTo(
        brewingGridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: brewingGridRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [activeFilter]); // Se vuelve a activar al cambiar de filtro para animar la transición

  return (
    <div
      ref={containerRef}
      className="bg-[#0c0a09] text-white selection:bg-[#fbbf24] selection:text-black relative overflow-x-hidden font-sans scroll-smooth"
    >

      {/* MENÚ SUPERIOR FIJO */}
      <header ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a09]/95 backdrop-blur-md border-b border-white/10 px-6 md:px-16 py-4 opacity-0 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <a href="#" className="text-base md:text-lg font-black tracking-tighter flex items-center gap-2.5 text-white group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_10px_#fbbf24] group-hover:scale-125 transition"></span>
            VELVET & BEAN
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-gray-300">
            <a href="#blends" className="hover:text-[#fbbf24] transition duration-300">Catálogo</a>
            <a href="#origen" className="hover:text-[#fbbf24] transition duration-300">Orígenes</a>
            <a href="#experiencia" className="hover:text-[#fbbf24] transition duration-300">Experiencia</a>
            <a href="#historia" className="hover:text-[#fbbf24] transition duration-300">Nuestra Historia</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center gap-2 text-xs font-mono uppercase cursor-pointer"
            >
              <span>🛒 Carrito</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#fbbf24] text-black font-bold flex items-center justify-center text-[10px]">
                  {totalItems}
                </span>
              )}
            </button>
            <a href="#blends" className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fbbf24] to-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              Comprar
            </a>
          </div>

        </div>
      </header>

      {/* 1. SECCIÓN PORTADA (HERO) */}
      <section className="h-screen w-full flex items-center px-6 md:px-16 lg:px-24 pt-24 relative z-10 overflow-hidden">

        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75 scale-105 filter brightness-125 contrast-110 saturate-110"
          >
            <source src="/cafe.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/90 to-transparent w-full lg:w-[75%] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-black/40 pointer-events-none"></div>
        </div>

        <div ref={heroTextRef} className="flex flex-col justify-center opacity-0 z-10 max-w-2xl pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#fbbf24] backdrop-blur-md w-fit shadow-lg">
            Café de Especialidad 100% Arábica
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            El arte de <br />
            <span className="bg-gradient-to-r from-[#fbbf24] via-amber-200 to-[#92400e] bg-clip-text text-transparent">
              Tostar el Tiempo
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow">
            Granos seleccionados en origen, tostados artesanalmente para despertar notas únicas en cada taza. Una experiencia sensorial sin concesiones.
          </p>

          <div className="flex gap-4">
            <a href="#blends" className="px-8 py-4 rounded-2xl bg-[#fbbf24] text-black font-bold hover:bg-amber-400 transition shadow-[0_0_25px_rgba(251,191,36,0.4)] cursor-pointer text-center">
              Descubrir Blends
            </a>
            <a href="#historia" className="px-8 py-4 rounded-2xl bg-black/40 border border-white/20 font-bold hover:bg-white/10 transition backdrop-blur-md cursor-pointer text-center">
              Nuestra Historia
            </a>
          </div>
        </div>

      </section>

      {/* 2. SECCIÓN TIENDA: CATÁLOGO AMPLIADO CON FILTROS */}
      <section id="blends" className="w-full flex flex-col items-center justify-center relative z-20 px-6 md:px-16 py-32 bg-[#17120e] border-t border-white/10 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
        <div className="max-w-7xl w-full">

          <div className="text-center mb-12">
            <span className="text-[#fbbf24] font-mono text-sm tracking-widest uppercase block mb-3">COSECHA EXCLUSIVA</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Nuestro Catálogo</h2>

            {/* Botones de filtro de categorías */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                { id: "todos", label: "Todos los Cafés" },
                { id: "blends", label: "Blends de Autor" },
                { id: "origen", label: "Origen Único" },
                { id: "especial", label: "Ediciones Especiales" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer ${activeFilter === filter.id
                      ? "bg-[#fbbf24] text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de productos con animación GSAP */}
          <div ref={productsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (
              <div key={product.id} className="p-6 bg-[#211a14] border border-white/10 rounded-3xl group hover:border-[#fbbf24]/50 transition duration-500 flex flex-col justify-between">
                <div>
                  <div className="h-64 rounded-2xl overflow-hidden mb-6 relative bg-black/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-xs text-[#fbbf24] font-mono block mb-1">{product.origin}</span>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm font-light mb-4">{product.description}</p>

                  <div className="mb-6">
                    <label className="text-[10px] font-mono uppercase text-gray-400 block mb-2">Tipo de Molienda:</label>
                    <select
                      value={selectedGrind[product.id] || "Grano Entero"}
                      onChange={(e) => setSelectedGrind({ ...selectedGrind, [product.id]: e.target.value })}
                      className="w-full bg-[#17120e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#fbbf24] cursor-pointer"
                    >
                      <option value="Grano Entero">Grano Entero</option>
                      <option value="Filtro / Dripper">Filtro / Dripper</option>
                      <option value="Espresso">Espresso</option>
                      <option value="Prensa Francesa">Prensa Francesa</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="font-bold text-lg text-[#fbbf24]">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-5 py-2.5 bg-white/10 rounded-xl text-xs font-bold hover:bg-[#fbbf24] hover:text-black transition cursor-pointer"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 3. SECCIÓN ORÍGENES INTERACTIVOS */}
      <section id="origen" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0c0a09] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[#fbbf24] font-mono text-sm tracking-widest uppercase block mb-3">TRAZABILIDAD GLOBAL</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Orígenes y Fincas Exclusivas</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light mt-4">
              Pasa el cursor sobre cada origen para descubrir los secretos de su terroir, altitud y método de procesamiento.
            </p>
          </div>

          <div ref={originsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {originsData.map((item) => (
              <div
                key={item.id}
                className="group relative h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-[#17120e] transition-all duration-700 hover:border-[#fbbf24]/50 hover:shadow-[0_0_40px_rgba(251,191,36,0.15)] flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.country}
                    className="w-full h-full object-cover opacity-50 transform transition-transform duration-700 group-hover:scale-110 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="text-xs font-mono text-[#fbbf24] uppercase tracking-widest block mb-2">{item.region}</span>
                  <h3 className="text-3xl font-bold mb-3">{item.country}</h3>
                  <p className="text-gray-300 text-sm font-light mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-gray-400">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ALTITUD:</span>
                      <span className="text-white font-bold">{item.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">SUELO:</span>
                      <span className="text-white font-bold">{item.soil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">PROCESO:</span>
                      <span className="text-[#fbbf24] font-bold">{item.process}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECCIÓN EXPERIENCIA VELVET */}
      <section id="experiencia" className="py-32 px-6 md:px-16 lg:px-24 bg-[#120e0b] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[#fbbf24] font-mono text-sm tracking-widest uppercase block mb-3">RITUALES DE EXTRACCIÓN</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">La Experiencia Velvet</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light mt-4">
              Cada método de preparación revela matices diferentes. Te enseñamos a extraer el máximo potencial en casa.
            </p>
          </div>

          <div ref={brewingGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brewingMethods.map((method, idx) => (
              <div key={idx} className="bg-[#1b140f] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#fbbf24]/50 transition duration-500">
                <div className="h-56 overflow-hidden relative">
                  <img src={method.image} alt={method.title} className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b140f] via-transparent to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold">{method.title}</h3>
                    <span className="text-xs font-mono px-3 py-1 bg-[#fbbf24]/10 text-[#fbbf24] rounded-full border border-[#fbbf24]/30">{method.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-light mb-6">{method.description}</p>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-xs font-mono">
                    <span className="text-gray-500">Molienda Ideal:</span>
                    <span className="text-white font-bold">{method.grind}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SECCIÓN NUESTRA HISTORIA */}
      <section id="historia" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0c0a09] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6">
            <span className="text-[#fbbf24] font-mono text-sm tracking-widest uppercase block mb-3">PASIÓN ARTESANAL</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Nuestra <br />Historia
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
              Nacimos con una premisa simple: honrar el tiempo y el trabajo de los caficultores mediante un tueste maestro sin concesiones. Creemos que cada grano cuenta una historia geológica y humana única.
            </p>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
              Desde micro-lotes seleccionados a mano hasta tuestes en pequeños baches para asegurar el perfil exacto de dulzor y acidez. No vendemos café; cultivamos un ritual diario.
            </p>
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-[#17120e] border border-white/10">
              <span className="text-3xl font-black text-[#fbbf24]">100%</span>
              <span className="text-xs text-gray-300 font-mono uppercase tracking-wider">Arábica de Altura<br />Tostado Fresco Semanal</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24]/20 to-transparent rounded-3xl blur-3xl pointer-events-none"></div>
            <div className="relative rounded-3xl overflow-hidden border border-white/15 h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80"
                alt="Tostadero Velvet & Bean"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-1000"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CARRITO LATERAL (DRAWER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-[#17120e] h-full border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">

            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <h3 className="text-lg font-bold">Tu Carrito de Compras</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-12">Tu carrito está vacío.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-[#211a14] p-3 rounded-2xl border border-white/5">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <span className="text-[10px] text-[#fbbf24] font-mono block">Molienda: {item.grind}</span>
                        <span className="text-xs text-gray-300 font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                        <button onClick={() => updateQuantity(item.id, item.grind, -1)} className="text-xs text-gray-400 hover:text-white px-1 cursor-pointer">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.grind, 1)} className="text-xs text-gray-400 hover:text-white px-1 cursor-pointer">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">Subtotal:</span>
                <span className="text-xl font-black text-[#fbbf24]">${totalPrice.toLocaleString()}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-2xl bg-[#fbbf24] text-black font-bold text-sm hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer text-center"
              >
                Iniciar Compra
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE CHECKOUT / INICIAR COMPRA */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#17120e] border border-white/10 rounded-[32px] p-8 max-w-lg w-full shadow-2xl relative">

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>

            {orderCompleted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#fbbf24]/20 border border-[#fbbf24] rounded-full flex items-center justify-center mx-auto mb-6 text-[#fbbf24] text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-3">¡Compra Exitosamente Realizada!</h3>
                <p className="text-gray-400 text-sm font-light mb-8">
                  Gracias por elegir Velvet & Bean. Hemos enviado los detalles de tu pedido y seguimiento a tu correo electrónico.
                </p>
                <button
                  onClick={() => {
                    setOrderCompleted(false);
                    setIsCheckoutOpen(false);
                  }}
                  className="px-8 py-3 rounded-xl bg-[#fbbf24] text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
                >
                  Volver al Inicio
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit}>
                <h3 className="text-2xl font-bold mb-2">Finalizar Pedido</h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-6">Completa tus datos para el envío</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-gray-400 font-mono block mb-1">Nombre Completo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-[#0c0a09] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fbbf24]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-mono block np-1">Correo Electrónico</label>
                    <input
                      required
                      type="email"
                      placeholder="juan@example.com"
                      className="w-full bg-[#0c0a09] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fbbf24]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-mono block mb-1">Dirección de Envío</label>
                    <input
                      required
                      type="text"
                      placeholder="Calle Falsa 123, CABA"
                      className="w-full bg-0c0a09 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#fbbf24]"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6 flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-mono">Total a Pagar:</span>
                  <span className="text-xl font-black text-[#fbbf24]">${totalPrice.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#fbbf24] text-black font-bold text-sm hover:bg-amber-400 transition shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer text-center"
                >
                  Confirmar Pago y Enviar 카드
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}