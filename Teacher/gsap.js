document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    Draggable,
    Flip,
    TextPlugin
  );
  
  const body = document.body;
  

  //PRELOADER & GİRİŞ ANIMASYONU

  body.classList.add("yukleniyor");
  const sayacRakam = document.getElementById("sayac-rakam");
  const sayacObje = { deger: 0 };
  
  const preloaderTl = gsap.timeline({
    onComplete: () => {
      body.classList.remove("yukleniyor");
      gsap.set("#preloader", { display: "none" });
    }
  });
  
  preloaderTl
    .to(sayacObje, {
      deger: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (sayacRakam) sayacRakam.textContent = Math.floor(sayacObje.deger);
      }
    })
    .to(".preloader-icerik", { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" })
    .to(".preloader-perde", { y: "0%", duration: 0.6, ease: "power3.inOut" }, "-=0.2")
    .to("#preloader", { y: "-100%", duration: 0.8, ease: "power4.inOut" })
    .from(".ana-baslik", { y: -50, opacity: 0, duration: 0.8 }, "-=0.4")
    .from(".ilk", { x: -30, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".isim", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".unvan", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".banner-gorsel", { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.6");
  

  //ÖZEL İMLEÇ (CUSTOM CURSOR)

  if (window.innerWidth > 768) {
    const cursor = document.getElementById("custom-cursor");
    const follower = document.getElementById("cursor-follower");
    
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });
    
    window.addEventListener("mousemove", (e) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    });
    
    const tiklanabilirElemanlar = document.querySelectorAll("a, button, .proje-karti");
    tiklanabilirElemanlar.forEach((eleman) => {
      eleman.addEventListener("mouseenter", () => follower.classList.add("active"));
      eleman.addEventListener("mouseleave", () => follower.classList.remove("active"));
    });
  }
  

  //MOBİL MENÜ & SCROLL LOCK

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  let menuAcik = false;
  
  const menuTl = gsap.timeline({ paused: true, reversed: true });
  
  menuTl
    .to(mobileMenu, {
      visibility: "visible",
      clipPath: "circle(150% at 100% 0%)",
      duration: 0.8,
      ease: "power4.inOut"
    })
    .to(".cizgi-1", { y: 8, rotation: 45, backgroundColor: "#F7F4EF", duration: 0.3 }, 0)
    .to(".cizgi-2", { y: -8, rotation: -45, backgroundColor: "#F7F4EF", duration: 0.3 }, 0)
    .from(mobileLinks, { y: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
    .from(".mobile-footer", { opacity: 0, duration: 0.4 }, "-=0.3");
  
  menuToggle.addEventListener("click", () => {
    menuAcik = !menuAcik;
    if (menuAcik) {
      menuTl.play();
      body.classList.add("menu-acik");
    } else {
      menuTl.reverse();
      body.classList.remove("menu-acik");
    }
  });
  
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuAcik = false;
      menuTl.reverse();
      body.classList.remove("menu-acik");
    });
  });
  
  //YUMUŞAK KAYDIRMA (SCROLL TO PLUGIN)

  const tumIclinkler = document.querySelectorAll('a[href^="#"]');
  
  tumIclinkler.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hedefId = link.getAttribute("href");
      
      if (hedefId === "#") {
        gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "power3.inOut" });
        return;
      }
      
      const hedefEleman = document.querySelector(hedefId);
      if (hedefEleman) {
        const headerYuksekligi = document.querySelector(".ana-baslik").offsetHeight;
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: hedefEleman, offsetY: headerYuksekligi },
          ease: "power3.inOut"
        });
      }
    });
  });
  

  //MASAÜSTÜ MENÜ HOVER EFEKTİ

  const navLinks = gsap.utils.toArray(".nav-link");
  navLinks.forEach((link) => {
    const hoverIn = gsap.to(link, {
      "--underline-scale": 1,
      duration: 0.35,
      ease: "power2.out",
      paused: true
    });
    link.addEventListener("mouseenter", () => hoverIn.play());
    link.addEventListener("mouseleave", () => hoverIn.reverse());
  });
  
  //PROJE KARTLARI HOVER & MODAL

  const projeKartlari = document.querySelectorAll(".proje-karti");
  projeKartlari.forEach((kart) => {
    const gorsel = kart.querySelector(".kart-gorsel");
    const baslik = kart.querySelector(".proje-baslik");
    
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl
      .to(gorsel, { scale: 1.08, duration: 0.5, ease: "power2.out" })
      .to(baslik, { x: 5, color: "#C85A32", duration: 0.3 }, 0);
    
    kart.addEventListener("mouseenter", () => hoverTl.play());
    kart.addEventListener("mouseleave", () => hoverTl.reverse());
  });
  
  const modal = document.getElementById("proje-modal");
  const modalArkaplan = modal.querySelector(".modal-arkaplan");
  const modalIcerik = modal.querySelector(".modal-icerik");
  const modalKapat = modal.querySelector(".modal-kapat");
  
  const modalTl = gsap.timeline({ paused: true });
  modalTl
    .set(modal, { visibility: "visible" })
    .to(modalArkaplan, { opacity: 1, duration: 0.4 })
    .to(modalIcerik, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }, "-=0.2");
  
  projeKartlari.forEach((kart) => {
    kart.addEventListener("click", () => {
      document.getElementById("modal-baslik").textContent = kart.getAttribute("data-baslik");
      document.getElementById("modal-detay").textContent = kart.getAttribute("data-detay");
      document.getElementById("modal-kategori").textContent = kart.querySelector(".proje-kategori").textContent;
      
      body.classList.add("menu-acik");
      modalTl.play();
    });
  });
  
  const modalKapatFonksiyonu = () => {
    modalTl.reverse().then(() => {
      gsap.set(modal, { visibility: "hidden" });
      body.classList.remove("menu-acik");
    });
  };
  
  modalKapat.addEventListener("click", modalKapatFonksiyonu);
  modalArkaplan.addEventListener("click", modalKapatFonksiyonu);
  

  //SCROLL TRIGGER SAYFA İÇİ ANIMASYONLAR

  gsap.from(".hakkimda-metin", {
    scrollTrigger: { trigger: "#hakkimda", start: "top 75%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});