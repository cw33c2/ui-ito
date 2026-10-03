export function initAnimations() {
  // 註冊 GSAP 與 ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // 初始化 Lenis 頂級平滑滾動
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // =====================================
  // ui-ux-pro-max-plan: 頂級鏤空字體穿透動態
  // =====================================
  
  // 1. 鏤空文字無限放大，直到穿透 (Scale to 150x)
  gsap.to(".zoom-text-layer", {
    scale: 200, // 放大 200 倍，確保視角穿過字體筆畫
    transformOrigin: "45% 50%", // 微調縮放中心點，對準「精準」的某個筆畫開口
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".sec-zoom",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  // 2. 副標題在滾動初期優雅淡出
  gsap.to(".zoom-sub-layer", {
    opacity: 0,
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".sec-zoom",
      start: "top top",
      end: "+=500px", // 滾動 500px 後完全消失
      scrub: true
    }
  });

  // =====================================
  // ui-ux-pro-max-plan: 名醫橫向畫廊滾動 (分三幕: 院長 + 雙人 + 雙人)
  // =====================================
  let docPanels = gsap.utils.toArray(".doc-panel");
  
  gsap.to(docPanels, {
    xPercent: -100 * (docPanels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".sec-doctors",
      pin: true,
      scrub: 1,
      end: () => "+=" + document.querySelector(".docs-container").offsetWidth
    }
  });
}
