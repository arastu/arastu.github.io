/* zamin Hugo theme — client JS
   Handles: theme toggle, font size tweaks, reading progress, saved posts */

(function () {
    "use strict";

    const LS = {
        theme: "fn-theme",
        size: "fn-size",
        likes: "fn-likes",
    };

    /* ---------- theme ---------- */
    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");
    const sunSvg =
        '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
    const moonSvg = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';

    function applyTheme(t) {
        document.documentElement.setAttribute("data-theme", t);
        if (themeIcon) themeIcon.innerHTML = t === "dark" ? sunSvg : moonSvg;
    }
    let theme = localStorage.getItem(LS.theme) || "light";
    applyTheme(theme);
    if (themeBtn)
        themeBtn.addEventListener("click", () => {
            theme = theme === "light" ? "dark" : "light";
            localStorage.setItem(LS.theme, theme);
            applyTheme(theme);
        });

    /* ---------- font size ---------- */
    function applySize(s) {
        document.documentElement.style.setProperty("--size-base", s + "px");
        document.querySelectorAll(".size-btn").forEach((b) => {
            b.classList.toggle("active", +b.dataset.size === s);
        });
    }
    let size = +(localStorage.getItem(LS.size) || 19);
    applySize(size);
    document.querySelectorAll(".size-btn").forEach((b) => {
        b.addEventListener("click", () => {
            size = +b.dataset.size;
            localStorage.setItem(LS.size, size);
            applySize(size);
        });
    });

    /* ---------- reading progress (on post) ---------- */
    const progress = document.getElementById("progress");
    const isPost = !!document.getElementById("postBody");
    if (progress && isPost) {
        progress.classList.add("visible");
        function onScroll() {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
            progress.style.width = pct + "%";
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isPost) {
            const back = document.querySelector(".back");
            if (back) window.location.href = back.href;
        }
    });

    /* ---------- save for later ---------- */
    function getLikes() {
        try {
            return JSON.parse(localStorage.getItem(LS.likes) || "[]");
        } catch (_) {
            return [];
        }
    }
    function setLikes(a) {
        localStorage.setItem(LS.likes, JSON.stringify(a));
    }

    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        const id = saveBtn.dataset.id || window.location.pathname;
        const render = () => {
            const liked = getLikes().includes(id);
            saveBtn.classList.toggle("on", liked);
            saveBtn.querySelector("span").textContent = liked
                ? "saved"
                : "save for later";
            const svg = saveBtn.querySelector("svg");
            if (liked) {
                svg.setAttribute("fill", "currentColor");
                svg.setAttribute("stroke", "none");
            } else {
                svg.setAttribute("fill", "none");
                svg.setAttribute("stroke", "currentColor");
            }
        };
        saveBtn.addEventListener("click", () => {
            let likes = getLikes();
            const i = likes.indexOf(id);
            if (i >= 0) likes.splice(i, 1);
            else likes.push(id);
            setLikes(likes);
            render();
        });
        render();
    }
})();
