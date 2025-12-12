function initMedia() {
  console.log("initMedia called");

  const backgroundMusic = document.getElementById("background-music");
  const backgroundVideo = document.getElementById("background");

  if (!backgroundMusic || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }

  backgroundMusic.volume = 0.3;
  backgroundMusic.muted = true; // start ekranında tıklayınca açacağız
  backgroundVideo.muted = true;

  backgroundVideo.play().catch((err) => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const startText = document.getElementById("start-text");

  const profileName = document.getElementById("profile-name");
  const profileBio = document.getElementById("profile-bio");
  const visitorCount = document.getElementById("visitor-count");

  const backgroundMusic = document.getElementById("background-music");

  const resultsButtonContainer = document.getElementById("results-button-container");
  const resultsButton = document.getElementById("results-theme");
  const resultsHint = document.getElementById("results-hint");

  const volumeIcon = document.getElementById("volume-icon");
  const volumeSlider = document.getElementById("volume-slider");
  const transparencySlider = document.getElementById("transparency-slider");

  const glitchOverlay = document.querySelector(".glitch-overlay");
  const profileBlock = document.getElementById("profile-block");
  const skillsBlock = document.getElementById("skills-block");

  const pythonBar = document.getElementById("python-bar");
  const cppBar = document.getElementById("cpp-bar");
  const csharpBar = document.getElementById("csharp-bar");

  const profilePicture = document.querySelector(".profile-picture");
  const profileContainer = document.querySelector(".profile-container");
  const socialIcons = document.querySelectorAll(".social-icon");
  const badges = document.querySelectorAll(".badge");

  // Güvenlik: element yoksa patlamasın
  if (!startScreen || !startText || !profileName || !profileBio || !visitorCount || !backgroundMusic) {
    console.error("Required elements missing in HTML.");
    return;
  }

  // Cursor
  const cursor = document.querySelector(".custom-cursor");
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (cursor) {
    if (isTouchDevice) {
      document.body.classList.add("touch-device");

      document.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        cursor.style.left = touch.clientX + "px";
        cursor.style.top = touch.clientY + "px";
        cursor.style.display = "block";
      });

      document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        cursor.style.left = touch.clientX + "px";
        cursor.style.top = touch.clientY + "px";
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
  const startMessage = "Ne duruyorsun tıkla ve giriş yap!;
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

  // Ziyaretçi sayacı
  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem("totalVisitorCount");
    if (!totalVisitors) {
      totalVisitors = galseyz tarafından sevgiyle hazırlandı 💖;
      localStorage.setItem("totalVisitorCount", totalVisitors);
    } else {
      totalVisitors = parseInt(totalVisitors, 10);
    }

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      totalVisitors++;
      localStorage.setItem("totalVisitorCount", totalVisitors);
      localStorage.setItem("hasVisited", "true");
    }

    visitorCount.textContent = totalVisitors.toLocaleString();
  }

  initializeVisitorCounter();

  // Start ekran tıklanınca müzik başlat + profile aç
  function enterSite() {
    startScreen.classList.add("hidden");

    backgroundMusic.muted = false;
    backgroundMusic.play().catch((err) => {
      console.error("Failed to play music after start:", err);
    });

    if (profileBlock) {
      profileBlock.classList.remove("hidden");
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
    }

    if (!isTouchDevice) {
      // cursorTrailEffect varsa çalıştır, yoksa hata basmasın
      try {
        if (typeof cursorTrailEffect === "function") {
          new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 });
        }
      } catch (err) {
        console.error("Cursor trail init error:", err);
      }
    }

    typeWriterName();
    typeWriterBio();

    // Results butonu artık her zaman görünsün (tema şartı yok)
    if (resultsButtonContainer) resultsButtonContainer.classList.remove("hidden");
  }

  startScreen.addEventListener("click", enterSite);
  startScreen.addEventListener("touchstart", (e) => {
    e.preventDefault();
    enterSite();
  });

  // İsim typewriter
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
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }

    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ");

    if (Math.random() < 0.1) {
      profileName.classList.add("glitch");
      setTimeout(() => profileName.classList.remove("glitch"), 200);
    }

    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ");
  }, 500);

  // Bio typewriter
  const bioMessages = [
    "Edeb bir tâc imiş nûr-ı Hüdâ’dan, giy ol tâcı emin ol her belâdan.",
    "\"Söz ile değil, hâl ile görünür kişi, Edep ile yükselir her işin işi.\"",
  ];
  let bioText = "";
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }

    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ");

    if (Math.random() < 0.1) {
      profileBio.classList.add("glitch");
      setTimeout(() => profileBio.classList.remove("glitch"), 200);
    }

    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ");
  }, 500);

  // Ses kontrolü (tek audio)
  let isMuted = false;

  if (volumeIcon) {
    volumeIcon.addEventListener("click", () => {
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;

      volumeIcon.innerHTML = isMuted
        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
    });

    volumeIcon.addEventListener("touchstart", (e) => {
      e.preventDefault();
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;

      volumeIcon.innerHTML = isMuted
        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      backgroundMusic.volume = volumeSlider.value;
      isMuted = false;
      backgroundMusic.muted = false;

      if (volumeIcon) {
        volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
      }
    });
  }

  // Transparanlık
  if (transparencySlider && profileBlock && skillsBlock) {
    transparencySlider.addEventListener("input", () => {
      const opacity = transparencySlider.value;

      if (opacity == 0) {
        profileBlock.style.background = "rgba(0, 0, 0, 0)";
        profileBlock.style.borderColor = "transparent";
        profileBlock.style.backdropFilter = "none";

        skillsBlock.style.background = "rgba(0, 0, 0, 0)";
        skillsBlock.style.borderColor = "transparent";
        skillsBlock.style.backdropFilter = "none";
      } else {
        profileBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
        profileBlock.style.borderColor = "";
        profileBlock.style.backdropFilter = `blur(${10 * opacity}px)`;

        skillsBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
        skillsBlock.style.borderColor = "";
        skillsBlock.style.backdropFilter = `blur(${10 * opacity}px)`;
      }

      // tıklanabilirliği koru
      profileBlock.style.pointerEvents = "auto";
      socialIcons.forEach((icon) => {
        icon.style.pointerEvents = "auto";
        icon.style.opacity = "1";
      });
      badges.forEach((badge) => {
        badge.style.pointerEvents = "auto";
        badge.style.opacity = "1";
      });

      if (profilePicture) {
        profilePicture.style.pointerEvents = "auto";
        profilePicture.style.opacity = "1";
      }
      profileName.style.opacity = "1";
      profileBio.style.opacity = "1";
      visitorCount.style.opacity = "1";
    });
  }

  // Tilt efekti
  function handleTilt(e, element) {
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

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
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
      gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
    });

    profileBlock.addEventListener("touchend", () => {
      gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
    });
  }

  if (skillsBlock) {
    skillsBlock.addEventListener("mousemove", (e) => handleTilt(e, skillsBlock));
    skillsBlock.addEventListener("touchmove", (e) => {
      e.preventDefault();
      handleTilt(e, skillsBlock);
    });

    skillsBlock.addEventListener("mouseleave", () => {
      gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
    });

    skillsBlock.addEventListener("touchend", () => {
      gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
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

  // Skills / Profile geçişi (View Results)
  let isShowingSkills = false;

  function toggleResults() {
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

          if (pythonBar) gsap.to(pythonBar, { width: "87%", duration: 2, ease: "power2.out" });
          if (cppBar) gsap.to(cppBar, { width: "75%", duration: 2, ease: "power2.out" });
          if (csharpBar) gsap.to(csharpBar, { width: "80%", duration: 2, ease: "power2.out" });
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
