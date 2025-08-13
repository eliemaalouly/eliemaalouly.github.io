document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconSpan = document.getElementById('theme-icon');
  const themeLink = document.getElementById('theme-stylesheet');
  const logoImg = document.getElementById('site-logo');

  const themes = [
    {
      file: 'light.css',
      logo: '/assets/images/logo/logo-light.png',
      themeColor: '#f3f3f3',
      icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1111.21 3
                 7 7 0 0021 12.79z"
              fill="#262a35"/>
      </svg>`
    },
    {
      file: 'dark.css',
      logo: '/assets/images/logo/logo-dark.png',
      themeColor: '#262a35',
      icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#f3f3f3" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1V3" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M12 21V23" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M4.22 4.22L5.64 5.64" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M18.36 18.36L19.78 19.78" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M1 12H3" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M21 12H23" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M4.22 19.78L5.64 18.36" stroke="#f3f3f3" stroke-width="2"/>
        <path d="M18.36 5.64L19.78 4.22" stroke="#f3f3f3" stroke-width="2"/>
      </svg>`
    }
  ];

  if (!toggleBtn || !iconSpan || !themeLink) {
    console.warn('Theme toggle: Missing required DOM elements.');
    return;
  }

  function setMetaThemeColor(hex) {
    let tag = document.querySelector('meta[name="theme-color"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'theme-color');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', hex);
  }

  function getCurrentThemeIndex() {
    const currentHref = themeLink.getAttribute('href');
    return themes.findIndex(theme => currentHref.includes(theme.file));
  }

  function setTheme(index) {
    const theme = themes[index];
    if (!theme) return;

    themeLink.setAttribute('href', `/assets/css/${theme.file}`);
    iconSpan.innerHTML = theme.icon;

    if (logoImg) {
      logoImg.setAttribute('src', theme.logo);
    }

    const newMode = theme.file.includes('dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newMode);
    localStorage.setItem('preferred-theme-file', theme.file);

    setMetaThemeColor(theme.themeColor);

    if (typeof gtag === 'function') {
      gtag('event', 'theme_switch', {
        theme: theme.file.includes('dark') ? 'dark' : 'light'
      });
    }

    if (
      window.CUSDIS &&
      typeof window.CUSDIS.setTheme === 'function'
    ) {
      window.CUSDIS.setTheme(newMode);
    }

  }


  function getSavedIndexOrDefault() {
    const saved = localStorage.getItem('preferred-theme-file');
    const savedIndex = themes.findIndex(t => t.file === saved);
    return savedIndex >= 0 ? savedIndex : 0;
  }

  setTheme(getSavedIndexOrDefault());

  toggleBtn.addEventListener('click', () => {
    const current = getCurrentThemeIndex();
    const next = (current + 1) % themes.length;
    setTheme(next);
  });
});