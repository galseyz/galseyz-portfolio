function initMedia() {
  console.log("initMedia called");

  const backgroundMusic = document.getElementById("background-music");
  const backgroundVideo = document.getElementById("background");

  if (backgroundMusic) {
    backgroundMusic.volume = 0.3;
    backgroundMusic.muted = true; // start ekranında açacağız
  }

  if (backgroundVideo) {
    backgroundVideo.muted = true;
    const p = backgroundVideo.play();
    if (p && typeof p.catch === "function") {
      p.catch((err) => console.warn("Background video autoplay blocked:", err));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const startText = document.getElementById("start-text");

  const profileName = document.getElementById("profile-name");
  const profileBio = document.getElementById("profile-bio");

  const backgroundMusic = document.getElementById("background-music");

  const volumeIcon = document.getElementById("volume-icon");
  const volumeSlider = document.getElementById("volume-slider");
  const transparencySlider = document.getElementById("transparency-slider");

  const glitchOverlay = document.querySelector(".glitch-overlay");
  const profileBlock = document.getElementById("profile-block");
  const skillsBlock = document.getElementById("skills-block");

  const pythonBar = document.getElementById("python-bar");
  const cppBar = document.getElementById("cpp-bar");
  const csharpBar = document.getElementById("csharp-bar");

  const resultsButtonContainer = document.getElementById("results-button-container");
  const resultsButton = document.getElementById("results-theme");
  const resultsHint = document.getElementById("results-hint");

  const profilePicture = document.querySelector(".profile-picture");
  const profileContainer = document.querySelector(".profile-container");
  const socialIcons = document.querySelectorAll(".social-icon");
  const badges = document.querySelectorAll(".badge");

  // Minimum gerekli elementler
  if (!startScreen || !startText || !profileName || !profileBio) {
    console.error("Required elements missing in HTML (start-screen / start-text / profile-name / profile-bio).");
    return;
  }

  // Cursor
  const cursor = document.querySelector(".custom-cursor");
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (cursor) {
    if (isTouchDevice) {
      document.body.classList.add("touch-device");

      document.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        cursor.style.left = t.clientX + "px";
        cursor.style.top = t.clientY + "px";
        cursor.style.display = "block";
      });

      document.addEventListener("touchmove", (e) => {
        const t = e.touches[0];
        cursor.style.left = t.clientX + "px";
        cursor.style.top = t.clientY + "px";
        cursor.style.display = "block";
      });

      document.addEventListener("touchend", () => {
        cursor.style.display = "none";
      });
    } else {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.style.display = "block";
      });

      document.addEventListener("mousedown", () => {
        cursor.style.transform = "scale(0.8) translate(-50%, -50%)";
      });

      document.addEventListener("mouseup", () => {
        cursor.style.transform = "scale(1) translate(-50%, -50%)";
      });
    }
  }

  // Start ekran yazısı
  const startMessage = "Ne duruyorsun tıkla ve giriş yap!";
  let startTextContent = "";
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? "|" : " ");
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? "|" : " ");
  }, 500);

  // İsim typewriter (boş kalmasın diye: silme bittiğinde geri yaz)
  const name = "GALSEYZ";
  let nameText = "";
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 6000); // bekleme süresi
      return;
    } else if (nameIndex === 0 && isNameDeleting) {
      // Silme bitti -> tekrar yazmaya dön
      isNameDeleting = false;
      setTimeout(typeWriterName, 600);
      return;
    }

    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ");

    if (Math.random() < 0.08) {
      profileName.classList.add("glitch");
      setTimeout(() => profileName.classList.remove("glitch"), 150);
    }

    setTimeout(typeWriterName, isNameDeleting ? 120 : 220);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ");
  }, 500);

  // Bio typewriter
  const bioMessages = [
    "Edeb bir tâc imiş nûr-ı Hüdâ’dan, giy ol tâcı emin ol her belâdan.",
    "Söz ile değil, hâl ile görünür kişi; edep ile yükselir işin işi."
  ];

  let bioText = "";
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    const current = bioMessages[bioMessageIndex];

    if (!isBioDeleting && bioIndex < current.length) {
      bioText = current.slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = current.slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === current.length && !isBioDeleting) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2500);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
      setTimeout(typeWriterBio, 400);
      return;
    }

    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ");

    if (Math.random() < 0.06) {
      profileBio.classList.add("glitch");
      setTimeout(() => profileBio.classList.remove("glitch"), 150);
    }

    setTimeout(typeWriterBio, isBioDeleting ? 55 : 110);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ");
  }, 500);

  // Start ekran tıklanınca müzik başlat + profile aç
  function enterSite() {
    startScreen.classList.add("hidden");

    if (backgroundMusic) {
      backgroundMusic.muted = false;
      const p = backgroundMusic.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => console.warn("Music play blocked:", err));
      }
    }

    if (profileBlock) {
      profileBlock.classList.remove("hidden");
      if (window.gsap) {
        gsap.fromTo(
          profileBlock,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              profileBlock.classList.add("profile-appear");
              if (profileContainer) profileContainer.classList.add("orbit");
            },
          }
        );
      } else {
        profileBlock.style.opacity = "1";
      }
    }

    if (!isTouchDevice) {
      try {
        if (typeof cursorTrailEffect === "function") {
          new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 });
        }
      } catch (err) {
        console.warn("Cursor trail init error:", err);
      }
    }

    // Typewriter başlat
    typeWriterName();
    typeWriterBio();

    // Results butonu HTML'de varsa göster
    if (resultsButtonContainer) resultsButtonContainer.classList.remove("hidden");
  }

  startScreen.addEventListener("click", enterSite);
  startScreen.addEventListener("touchstart", (e) => {
    e.preventDefault();
    enterSite();
  });

  // Ses kontrolü
  let isMuted = false;

  if (volumeIcon && backgroundMusic) {
    const iconUnmuted = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
    const iconMuted = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`;

    const toggleMute = () => {
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;
      volumeIcon.innerHTML = isMuted ? iconMuted : iconUnmuted;
    };

    volumeIcon.addEventListener("click", toggleMute);
    volumeIcon.addEventListener("touchstart", (e) => {
      e.preventDefault();
      toggleMute();
    });
  }

  if (volumeSlider && backgroundMusic) {
    volumeSlider.addEventListener("input", () => {
      backgroundMusic.volume = Number(volumeSlider.value);
      backgroundMusic.muted = false;
      isMuted = false;
    });
  }

  // Transparanlık (skills yoksa sadece profile'a uygula)
  if (transparencySlider && profileBlock) {
    transparencySlider.addEventListener("input", () => {
      const opacity = Number(transparencySlider.value);

      const apply = (el) => {
        if (!el) return;
        if (opacity === 0) {
          el.style.background = "rgba(0,0,0,0)";
          el.style.borderColor = "transparent";
          el.style.backdropFilter = "none";
        } else {
          el.style.background = `rgba(0,0,0,${opacity})`;
          el.style.borderColor = "";
          el.style.backdropFilter = `blur(${10 * opacity}px)`;
        }
        el.style.pointerEvents = "auto";
      };

      apply(profileBlock);
      apply(skillsBlock);

      socialIcons.forEach((icon) => (icon.style.pointerEvents = "auto"));
      badges.forEach((badge) => (badge.style.pointerEvents = "auto"));
      if (profilePicture) profilePicture.style.pointerEvents = "auto";
    });
  }

  // Tilt efekti
  function handleTilt(e, element) {
    if (!window.gsap) return;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 12;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }

  if (profileBlock) {
    profileBlock.addEventListener("mousemove", (e) => handleTilt(e, profileBlock));
    profileBlock.addEventListener("touchmove", (e) => {
      e.preventDefault();
      handleTilt(e, profileBlock);
    });

    profileBlock.addEventListener("mouseleave", () => {
      if (!window.gsap) return;
      gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
    });

    profileBlock.addEventListener("touchend", () => {
      if (!window.gsap) return;
      gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
    });
  }

  if (skillsBlock) {
    skillsBlock.addEventListener("mousemove", (e) => handleTilt(e, skillsBlock));
    skillsBlock.addEventListener("touchmove", (e) => {
      e.preventDefault();
      handleTilt(e, skillsBlock);
    });

    skillsBlock.addEventListener("mouseleave", () => {
      if (!window.gsap) return;
      gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
    });

    skillsBlock.addEventListener("touchend", () => {
      if (!window.gsap) return;
      gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
    });
  }

  // Glitch hover
  if (profilePicture && glitchOverlay) {
    profilePicture.addEventListener("mouseenter", () => {
      glitchOverlay.style.opacity = "1";
      setTimeout(() => (glitchOverlay.style.opacity = "0"), 500);
    });
  }

  // Profil foto hızlı orbit
  function fastOrbit() {
    if (!profileContainer) return;
    profileContainer.classList.remove("fast-orbit");
    profileContainer.classList.remove("orbit");
    void profileContainer.offsetWidth;
    profileContainer.classList.add("fast-orbit");

    setTimeout(() => {
      profileContainer.classList.remove("fast-orbit");
      void profileContainer.offsetWidth;
      profileContainer.classList.add("orbit");
    }, 500);
  }

  if (profilePicture) {
    profilePicture.addEventListener("click", fastOrbit);
    profilePicture.addEventListener("touchstart", (e) => {
      e.preventDefault();
      fastOrbit();
    });
  }

  // Skills / Profile geçişi (yalnızca HTML'de varsa)
  let isShowingSkills = false;

  function toggleResults() {
    if (!window.gsap) return;
    if (!profileBlock || !skillsBlock || !resultsHint) return;

    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          profileBlock.classList.add("hidden");
          skillsBlock.classList.remove("hidden");

          gsap.fromTo(
            skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );

          if (pythonBar) gsap.to(pythonBar, { width: "87%", duration: 1.8, ease: "power2.out" });
          if (cppBar) gsap.to(cppBar, { width: "75%", duration: 1.8, ease: "power2.out" });
          if (csharpBar) gsap.to(csharpBar, { width: "80%", duration: 1.8, ease: "power2.out" });
        },
      });

      resultsHint.classList.remove("hidden");
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          skillsBlock.classList.add("hidden");
          profileBlock.classList.remove("hidden");

          gsap.fromTo(
            profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });

      resultsHint.classList.add("hidden");
      isShowingSkills = false;
    }
  }

  if (resultsButton) {
    resultsButton.addEventListener("click", toggleResults);
    resultsButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      toggleResults();
    });
  }

  // Başlat
  typeWriterStart();
});
