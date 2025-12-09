const ACCENT_COLOR = '#EC1F26';
let videoBoxLenis = null;

document.addEventListener("DOMContentLoaded", () => {
    const contactPanel = document.getElementById("contact-panel");

    if (contactPanel) {
        const contactScroller = new Lenis({
            wrapper: contactPanel,
            content: contactPanel,
            smooth: true,
            smoothWheel: true,
            smoothTouch: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.2,
        });

        function rafContact(time) {
            contactScroller.raf(time);
            requestAnimationFrame(rafContact);
        }
        requestAnimationFrame(rafContact);
    }

    const scrollBoxes = document.querySelectorAll(".scroll-box");

    scrollBoxes.forEach(box => {
        const scroller = new Lenis({
            wrapper: box,
            content: box,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.2,
            smoothWheel: true,
            smoothTouch: true,
        });

        if (box.id === 'video-scroll-box') {
            videoBoxLenis = scroller;
        }

        function raf(time) {
            scroller.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    });
});




    document.addEventListener("DOMContentLoaded", () => {

        const lenis = new Lenis({
        smooth: true,
        smoothTouch: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
        lerp: 0.08    
        });

        function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    });



    const contactPanelMobile = document.getElementById("contact-panel-mobile");
        if (contactPanelMobile) {
            contactMobileLenis = new Lenis({
                wrapper: contactPanelMobile,
                content: contactPanelMobile,
                smooth: true,
                smoothWheel: true,
                smoothTouch: true,
                wheelMultiplier: 0.8,
                touchMultiplier: 1.2,
            });

            function rafContactMobile(time) {
                contactMobileLenis.raf(time);
                requestAnimationFrame(rafContactMobile);
            }
            requestAnimationFrame(rafContactMobile);
        }
        
window.onload = function () {

    let currentListItem = null;
    const items = document.querySelectorAll('.item');
    const videoBox = document.getElementById('video-scroll-box');
    
      
    function loadProjectVideos(folder) {
    videoBoxLenis.scrollTo(0);

    let newContent = `
        <div id="video-box-content" style="display: flex; flex-direction: column; transition: opacity 0.3s ease;">
            <video autoplay muted loop playsinline class="wide-video" style="margin-top: 0.8vw;">
                <source src="projects/${folder}/1.mp4" type="video/mp4">
            </video>

            <div style="display: flex; flex-direction: row; width: 100%; gap: 0.4vw;">
                <video autoplay muted loop playsinline class="half-video">
                    <source src="projects/${folder}/2.mp4" type="video/mp4">
                </video>

                <video autoplay muted loop playsinline class="half-video">
                    <source src="projects/${folder}/3.mp4" type="video/mp4">
                </video>
            </div>

            <video autoplay muted loop playsinline class="wide-video">
                <source src="projects/${folder}/4.mp4" type="video/mp4">
            </video>

            <video autoplay muted loop playsinline class="wide-video">
                <source src="projects/${folder}/5.mp4" type="video/mp4">
            </video>
        </div>

        <div id="info-text" class="info-text"></div>
    `;

    videoBox.innerHTML = newContent;

    const videos = videoBox.querySelectorAll("video");
    let loadedCount = 0;

    videos.forEach(video => {
        video.addEventListener("loadeddata", () => {
            loadedCount++;
            if (loadedCount === videos.length) {
                if (videoBoxLenis) {
                    videoBoxLenis.resize();
                    setTimeout(() => videoBoxLenis.resize(), 120);
                }
            }
        });
    });

    fetch(`projects/${folder}/info.txt`)
        .then(res => res.text())
        .then(txt => {
            const infoDiv = videoBox.querySelector("#info-text");
            infoDiv.textContent = txt;
        })
        .catch(err => console.error("Could not load info.txt:", err));
    }

    items.forEach(item => {

        const clickable = item.querySelector('.clickable');
        const left = item.querySelector('.left');
        const right = item.querySelector('.right');

        clickable.onclick = () => {

            const infoButton = document.querySelector(".info-butt");

            if (infoButton.textContent.trim().toLowerCase() === "close") {
             
                infoButton.textContent = "INFO";
            }

            if (currentListItem) {
                currentListItem.classList.remove('active');
                const prevLeft = currentListItem.querySelector('.left');
                const prevRight = currentListItem.querySelector('.right');
                prevLeft.style.transform = 'translateY(-50%) translateX(0vw)';
                prevLeft.style.color = '#fff';
                prevRight.style.color = '#fff';
            }

            currentListItem = item;
            item.classList.add('active');

            left.style.transform = 'translateY(-50%) translateX(1.5vw)';
            left.style.color = ACCENT_COLOR;
            right.style.color = ACCENT_COLOR;

            let folder = left.textContent.trim().toLowerCase();
            loadProjectVideos(folder);
        };
    });

        const firstItem = items[0];
        if (firstItem) {
            const firstLeft = firstItem.querySelector('.left');
            const firstRight = firstItem.querySelector('.right');
    
            currentListItem = firstItem;
            firstItem.classList.add('active');
    
            firstLeft.style.transform = 'translateY(-50%) translateX(1.5vw)';
            firstLeft.style.color = ACCENT_COLOR;
            firstRight.style.color = ACCENT_COLOR;
    
            let firstFolder = firstLeft.textContent.trim().toLowerCase();
            loadProjectVideos(firstFolder);
        }
    };

    function updateOverflow() {
      if (window.innerWidth < 800) {
       
          document.documentElement.style.overflowY = "auto";
          document.documentElement.style.overflowX = "hidden";
  
          document.body.style.overflowY = "auto";
          document.body.style.overflowX = "hidden";
      } else {

          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";
      }
  }
  
  updateOverflow();
  window.addEventListener("resize", updateOverflow);

  const openBtn = document.querySelector(".contact");
  const closeBtn = document.getElementById("close-contact");
  const panel = document.getElementById("contact-panel");
  const overlay = document.getElementById("overlay");
  const body = document.body;
  const noiseCanvas = document.getElementById("noiseCanvas");  
  const scrollBoxes = document.querySelectorAll(".scroll-box");

  openBtn.addEventListener("click", () => {

    panel.style.display = "flex"; 
  
    requestAnimationFrame(() => {
    panel.classList.add("active");
    });
   
    overlay.classList.add("active");
    body.classList.add("body-lock");
    noiseCanvas.classList.add("noise-lowered");
  });
  
  function closePanel() {
     
    panel.classList.remove("active");
    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.classList.remove("active");
        overlay.style.opacity = "";
        panel.style.display = "none"; 
    }, 300);

      body.classList.remove("body-lock");
      noiseCanvas.classList.remove("noise-lowered");
  }
  
  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);
  
  
        const openBtnMob = document.querySelector(".contact-mobile");
        const closeBtnMob = document.getElementById("close-contact-mobile");
        const panelMob = document.getElementById("contact-panel-mobile");

        openBtnMob.addEventListener("click", () => {
            
            panelMob.style.display = "flex"; 
            requestAnimationFrame(() => {
            panelMob.classList.add("active");
        });
            body.classList.add("body-lock");
        });
        
        function closePanelMob() {
            
            panelMob.classList.remove("active");
            setTimeout(() => {
                panelMob.style.display = "none"; 
            }, 300);
            body.classList.remove("body-lock");                
        }               
        closeBtnMob.addEventListener("click", closePanelMob);
        const formBoxes = document.querySelectorAll('.formbox');

        formBoxes.forEach(box => {
        box.addEventListener('click', () => {
        box.classList.toggle('active');
        });
    });

    const infoButton = document.querySelector(".info-butt");
    infoButton.addEventListener("click", () => {
    const videoContent = document.getElementById("video-box-content");
    videoBoxLenis.scrollTo(0);
    const infoText = document.getElementById("info-text");

    if (infoText.style.display === "none" || !infoText.style.display) {
      
        videoContent.style.opacity = "0";
        videoContent.style.display = "none";
        infoButton.textContent = "CLOSE"
        infoText.style.display = "block"; 
        requestAnimationFrame(() => {     
            infoText.style.opacity = "1"; 
        });
    }
    else{

        videoContent.style.display = "flex";
       
        requestAnimationFrame(() => {      
            videoContent.style.opacity = "1";  
        });
    
        infoButton.textContent = "INFO";
        infoText.style.opacity = "0";
        setTimeout(() => {
            infoText.style.display = "none";
        
      
        }, 300);
        
    }

    videoBoxLenis.resize();
    setTimeout(() => {     
    videoBoxLenis.resize();
        
        }, 300);
});


 (() => {
      const COLLAPSED_MAX = "14vw";
      
      function px(n){ return n + "px"; }
    
      function cleanupVideos(container) {
        if (!container) return;
        const vids = container.querySelectorAll('video');
        vids.forEach(v => {
          try {
            v.pause();
            v.removeAttribute('src');
            v.load && v.load();
          } catch (e) {}
        });
      }
    
      function closeItem(item) {
        return new Promise(resolve => {
          if (!item.classList.contains('open')) {
          
            const ec0 = item.querySelector('.expand-content');
            if (ec0) {
              cleanupVideos(ec0);
              ec0.innerHTML = "";
            }
            item.style.maxHeight = COLLAPSED_MAX;
            item.classList.remove('open');
            return resolve();
          }
    
          const ec = item.querySelector('.expand-content');
             
          const fontleft = item.querySelector('.left');
          fontleft.style.color = 'white';
          
          item.style.maxHeight = px(item.offsetHeight);
    
          void item.offsetHeight;
    
          item.style.transition = "max-height 0.35s ease";
          item.style.maxHeight = COLLAPSED_MAX;
    
          item.classList.remove('open');
    
          function onEnd(ev) {
            if (ev.propertyName !== "max-height") return;
            item.removeEventListener("transitionend", onEnd);
            if (ec) cleanupVideos(ec);
            if (ec) ec.innerHTML = "";
            item.style.maxHeight = COLLAPSED_MAX;
            item.style.transition = "";
            resolve();
          }
    
          item.addEventListener("transitionend", onEnd);
        });
      }
    
      async function openItem(item, folder) {
        const expandContent = item.querySelector('.expand-content');
        let infoText = "";
        try {
          const r = await fetch(`projects/${folder}/info.txt`);
          infoText = r.ok ? await r.text() : "Info not found.";
        } catch {
          infoText = "Error loading info.";
        }
    
        expandContent.innerHTML = `
          <div class="video-carousel" style="position: relative; width: 100%; border-radius: 10px; overflow: hidden; margin-top: calc(3.5vw + 5px); aspect-ratio: 16/9;">
              <div class="video-track" style="display: flex; gap: 10px; width: 600%; transition: transform 0.5s ease; height: 100%;">
                  ${[1,2,3,4,5].map(i => `
                      <video muted playsinline class="wide-video" 
                          style="width: 17%; flex-shrink: 0; height: 100%; object-fit: cover;">
                          <source src="projects/${folder}/${i}.mp4" type="video/mp4">
                      </video>
                  `).join('')}
                  <!-- duplicate first video for seamless loop -->
                  <video muted playsinline class="wide-video" 
                      style="width: 17%; flex-shrink: 0; height: 100%; object-fit: cover;">
                      <source src="projects/${folder}/1.mp4" type="video/mp4">
                  </video>
              </div>
          </div>
          <p style="font-family: 'Lol-Regular', monospace; font-weight: normal; white-space: pre-line; margin-top: calc(7vw + 10px); font-size: 4vw">${infoText}</p>
        `;
    
        const track = expandContent.querySelector('.video-track');
        const videos = Array.from(expandContent.querySelectorAll('.wide-video'));
        const totalVideos = 5; 
        let index = 0;    
        let autoScrollTimer = null;
        const autoScrollDelay = 5000; 
    
        function startAutoScroll() {
            if (autoScrollTimer) clearTimeout(autoScrollTimer);

            autoScrollTimer = setTimeout(() => {
                playNextVideo(); 
                startAutoScroll();
            }, autoScrollDelay);
        }

        const slideWidthPercent = 100 / (totalVideos + 1); 
        videos.forEach(v => v.style.width = slideWidthPercent + "%");
        track.style.width = (totalVideos + 1) * 100 + "%";

        videos.forEach((v, i) => {
          v.pause();
          v.currentTime = 0;
          v.removeEventListener('ended', v._playNextHandler);
        });
    
        let currentVideo = videos[index];
        currentVideo.play().catch(()=>{});
    
        function playNextVideo() {
          index++;
          track.style.transition = "transform 0.5s ease";
          track.style.transform = `translateX(-${index * slideWidthPx}px)`;    
          if (index === totalVideos) {
           
            setTimeout(() => {
             
              track.style.transition = "none";
              track.style.transform = "translateX(0)";
              index = 0;
             
              videos.forEach(v => {
                v.pause();
                v.currentTime = 0;
              });
              currentVideo = videos[index];
              currentVideo.play().catch(()=>{});
             
              currentVideo.addEventListener('ended', playNextVideo);
            }, 500);
            return;
          }
    
          if (currentVideo) currentVideo.removeEventListener('ended', playNextVideo);
          currentVideo = videos[index];
          currentVideo.currentTime = 0;
          currentVideo.play().catch(()=>{});
          currentVideo.addEventListener('ended', playNextVideo);
        }
        currentVideo.addEventListener('ended', playNextVideo);
        currentVideo._playNextHandler = playNextVideo;
        startAutoScroll();
    

        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let isHorizontal = false;
        let initialTranslate = 0;
        let currentTranslate = 0;

        const threshold = 5; 
        const gapPx = 10; 
        const slideWidthPx = videos[0].offsetWidth + gapPx; 

        track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontal = false;

            const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform);
            initialTranslate = matrix.m41;
            track.style.transition = "none";

            if (autoScrollTimer) clearTimeout(autoScrollTimer);
        }, { passive: true });

        track.addEventListener("touchmove", (e) => {
            if (!isDragging) return;

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const dx = x - startX;
            const dy = y - startY;

            if (!isHorizontal) {
                if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
                    isHorizontal = true;
                } else if (Math.abs(dy) > threshold) {
                    isDragging = false;
                    return;
                }
            }

            if (!isHorizontal) return;

            e.preventDefault();

            currentTranslate = initialTranslate + dx;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }, { passive: false });

       track.addEventListener("touchend", (e) => {
    if (!isHorizontal) {
        isDragging = false;
        return;
    }

    isDragging = false;

    const swipeDistance = e.changedTouches[0].clientX - startX;
    let newIndex = index;

    if (swipeDistance < -30 && index < totalVideos) newIndex++;
    else if (swipeDistance > 30 && index > 0) newIndex--;

    const nearestIndex = Math.round(-currentTranslate / slideWidthPx);
    if (Math.abs(swipeDistance) < 30) newIndex = nearestIndex;

    if (newIndex < 0) newIndex = 0;
    if (newIndex > totalVideos) newIndex = totalVideos;

    index = newIndex;

    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(${-index * slideWidthPx}px)`;



    videos.forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.removeEventListener('ended', playNextVideo);
    });

    currentVideo = videos[index];
    currentVideo.play().catch(()=>{});
    currentVideo.addEventListener('ended', playNextVideo);


    if (index === totalVideos) {
        setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            index = 0;

            videos.forEach(v => {
                v.pause();
                v.currentTime = 0;
                v.removeEventListener('ended', playNextVideo);
            });

            currentVideo = videos[0];
            currentVideo.play().catch(()=>{});
            currentVideo.addEventListener('ended', playNextVideo);
        }, 300);
    }
});


        item.style.maxHeight = px(item.offsetHeight);
        void item.offsetHeight; 
    
        item.classList.add('open');

        const fullHeight = item.scrollHeight;
        item.style.transition = "max-height 0.35s ease";
        item.style.maxHeight = px(fullHeight);
    
        function onOpenEnd(ev) {
          if (ev.propertyName !== "max-height") return;
          item.removeEventListener("transitionend", onOpenEnd);
        
          item.style.maxHeight = "none"; 
          item.style.transition = ""; 
        }
        item.addEventListener("transitionend", onOpenEnd);
      }
    
        document.querySelectorAll('.project-list-mobile').forEach(list => {
        list.addEventListener('click', async (e) => {
          const clickable = e.target.closest('.clickable-mobile');
          if (!clickable) return;
    
          const li = clickable.closest('.item-mobile');
          
          const fontleft = li.querySelector('.left');
          fontleft.style.color = ACCENT_COLOR;
          
          
            const leftText = li.querySelector('.left').textContent.trim();
          const folder = leftText.toLowerCase();
          const alreadyOpen = li.classList.contains('open');

          const openItems = Array.from(document.querySelectorAll('.item-mobile.open'));

          if (alreadyOpen && openItems.length === 1) {
            await closeItem(li);
            return;
          }

            const othersToClose = openItems.filter(it => it !== li);
            othersToClose.forEach(closeItem); 

            if (alreadyOpen) return;

            openItem(li, folder);

        });
      });
    })();

 const circle = document.querySelector('.cursor-circle');

  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Move the circle slightly toward the mouse
    circleX += (mouseX - circleX) * 0.25;
    circleY += (mouseY - circleY) * 0.25;

    circle.style.top = circleY + 'px';
    circle.style.left = circleX + 'px';

    requestAnimationFrame(animate);
  }

  animate();