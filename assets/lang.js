(function () {
  'use strict';

  var LANG_KEY = 'mm_lang';

  var T = {
    en: {
      back_mm: 'Back to MathMate',
      back_blog: 'Back to Blog',
      get_app: 'Get the App',
      nav_home: 'Home',
      nav_blog: 'Blog',
      page_article: 'Article',
      page_snap: 'Snap & Solve',
      page_steps: 'Step-by-Step Solutions',
      page_gallery: 'Save to Gallery',
      page_quiz: 'Quiz Mode',
      page_progress: 'Progress Tracking',
      page_streaks: 'Streak Rewards',
      page_how: 'How It Works',
      page_topics: 'Math Topics',
      page_practice: 'Practice Problems',
      page_blog: 'Blog',
      page_tutorials: 'Tutorials',
      page_faq: 'FAQ',
      page_about: 'About',
      page_careers: 'Careers',
      page_press: 'Press Kit',
      page_contact: 'Contact Us',
      page_privacy: 'Privacy Policy',
      page_terms: 'Terms of Service',
      ft_snap: 'Snap & Solve',
      ft_steps: 'Step-by-Step',
      ft_gallery: 'Gallery',
      ft_quiz: 'Quiz Mode',
      ft_progress: 'Progress',
      ft_streaks: 'Streaks',
      ft_about: 'About',
      ft_careers: 'Careers',
      ft_press: 'Press Kit',
      ft_contact: 'Contact Us',
      ft_privacy: 'Privacy',
      ft_terms: 'Terms',
      ft_how: 'How It Works',
      ft_faq: 'FAQ',
      ft_blog: 'Blog',
      ft_topics: 'Math Topics',
      ft_practice: 'Practice Problems',
      ft_tutorials: 'Tutorials',
      copyright: '© 2026 MathMate. All rights reserved.',
      back_top: 'Back to top',
    },
    fr: {
      back_mm: 'Retour à MathMate',
      back_blog: 'Retour au Blog',
      get_app: "Télécharger l'App",
      nav_home: 'Accueil',
      nav_blog: 'Blog',
      page_article: 'Article',
      page_snap: 'Photo & Solution',
      page_steps: 'Solutions Étape par Étape',
      page_gallery: 'Enregistrer dans la Galerie',
      page_quiz: 'Mode Quiz',
      page_progress: 'Suivi des Progrès',
      page_streaks: 'Récompenses de Série',
      page_how: 'Comment ça marche',
      page_topics: 'Sujets Mathématiques',
      page_practice: 'Problèmes de Pratique',
      page_blog: 'Blog',
      page_tutorials: 'Tutoriels',
      page_faq: 'FAQ',
      page_about: 'À Propos',
      page_careers: 'Emplois',
      page_press: 'Dossier de Presse',
      page_contact: 'Nous Contacter',
      page_privacy: 'Politique de Confidentialité',
      page_terms: "Conditions d'Utilisation",
      ft_snap: 'Photo & Solution',
      ft_steps: 'Étape par Étape',
      ft_gallery: 'Galerie',
      ft_quiz: 'Mode Quiz',
      ft_progress: 'Progrès',
      ft_streaks: 'Séries',
      ft_about: 'À Propos',
      ft_careers: 'Emplois',
      ft_press: 'Dossier de Presse',
      ft_contact: 'Nous Contacter',
      ft_privacy: 'Confidentialité',
      ft_terms: 'Conditions',
      ft_how: 'Comment ça marche',
      ft_faq: 'FAQ',
      ft_blog: 'Blog',
      ft_topics: 'Sujets Mathématiques',
      ft_practice: 'Problèmes de Pratique',
      ft_tutorials: 'Tutoriels',
      copyright: '© 2026 MathMate. Tous droits réservés.',
      back_top: 'Retour en haut',
    },
    ar: {
      back_mm: 'العودة إلى ماث ميت',
      back_blog: 'العودة إلى المدونة',
      get_app: 'حمّل التطبيق',
      nav_home: 'الرئيسية',
      nav_blog: 'المدونة',
      page_article: 'مقال',
      page_snap: 'التقط وحلّ',
      page_steps: 'حلول خطوة بخطوة',
      page_gallery: 'حفظ في المعرض',
      page_quiz: 'وضع الاختبار',
      page_progress: 'تتبع التقدم',
      page_streaks: 'مكافآت الإنجاز',
      page_how: 'كيف يعمل',
      page_topics: 'مواضيع الرياضيات',
      page_practice: 'تمارين تطبيقية',
      page_blog: 'المدونة',
      page_tutorials: 'دروس تعليمية',
      page_faq: 'الأسئلة الشائعة',
      page_about: 'عن ماث ميت',
      page_careers: 'وظائف',
      page_press: 'الحزمة الإعلامية',
      page_contact: 'تواصل معنا',
      page_privacy: 'سياسة الخصوصية',
      page_terms: 'شروط الخدمة',
      ft_snap: 'التقط وحلّ',
      ft_steps: 'خطوة بخطوة',
      ft_gallery: 'المعرض',
      ft_quiz: 'وضع الاختبار',
      ft_progress: 'التقدم',
      ft_streaks: 'الإنجازات',
      ft_about: 'عن ماث ميت',
      ft_careers: 'وظائف',
      ft_press: 'الحزمة الإعلامية',
      ft_contact: 'تواصل معنا',
      ft_privacy: 'الخصوصية',
      ft_terms: 'الشروط',
      ft_how: 'كيف يعمل',
      ft_faq: 'الأسئلة الشائعة',
      ft_blog: 'المدونة',
      ft_topics: 'مواضيع الرياضيات',
      ft_practice: 'تمارين تطبيقية',
      ft_tutorials: 'دروس تعليمية',
      copyright: '© 2026 ماث ميت. جميع الحقوق محفوظة.',
      back_top: 'العودة للأعلى',
    }
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'en';
  }

  function applyTranslations(lang) {
    var t = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
  }

  var dropOpen = false;

  function updateUI(lang) {
    var label = document.getElementById('mm-lang-label');
    if (label) label.textContent = lang.toUpperCase();
    var chevron = document.getElementById('mm-lang-chevron');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
    document.querySelectorAll('.mm-lang-opt').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.style.background = active ? 'rgba(245,166,35,.09)' : 'transparent';
      btn.style.color = active ? '#F5A623' : 'rgba(255,255,255,.82)';
      btn.style.fontWeight = active ? '600' : '400';
      var check = btn.querySelector('.mm-check');
      if (check) check.style.display = active ? 'block' : 'none';
    });
    var drop = document.getElementById('mm-lang-drop');
    if (drop) {
      drop.style.right = lang === 'ar' ? 'auto' : '0';
      drop.style.left = lang === 'ar' ? '0' : 'auto';
    }
  }

  function setLang(code) {
    localStorage.setItem(LANG_KEY, code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(code);
    updateUI(code);
    closeDropdown();
  }

  function closeDropdown() {
    dropOpen = false;
    var drop = document.getElementById('mm-lang-drop');
    if (drop) drop.style.display = 'none';
    var chevron = document.getElementById('mm-lang-chevron');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    dropOpen = !dropOpen;
    var drop = document.getElementById('mm-lang-drop');
    if (drop) drop.style.display = dropOpen ? 'block' : 'none';
    var chevron = document.getElementById('mm-lang-chevron');
    if (chevron) chevron.style.transform = dropOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  }

  var GLOBE_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var CHEVRON_SVG = '<svg id="mm-lang-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .2s;"><path d="M6 9l6 6 6-6"/></svg>';
  var CHECK_SVG = '<svg class="mm-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="20 6 9 17 4 12"/></svg>';

  var OPTS = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' }
  ];

  function buildSwitcher() {
    var wrap = document.getElementById('mm-lang-wrap');
    if (!wrap) return;

    var optsHtml = OPTS.map(function (o) {
      return '<button class="mm-lang-opt" data-lang="' + o.code + '" style="display:flex;align-items:center;gap:10px;width:100%;padding:12px 16px;background:transparent;border:none;cursor:pointer;color:rgba(255,255,255,.82);font-size:13.5px;font-weight:400;font-family:\'Inter\',sans-serif;text-align:left;transition:background .15s;">'
        + '<span style="font-size:10.5px;font-weight:700;letter-spacing:.09em;opacity:.48;min-width:22px;">' + o.code.toUpperCase() + '</span>'
        + '<span style="flex:1;">' + o.label + '</span>'
        + CHECK_SVG
        + '</button>';
    }).join('');

    wrap.innerHTML = '<div style="position:relative;">'
      + '<button id="mm-lang-btn" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:9999px;padding:9px 15px;font-size:13px;font-weight:600;color:rgba(255,255,255,.85);cursor:pointer;white-space:nowrap;letter-spacing:.01em;transition:background .15s,border-color .15s;font-family:\'Inter\',sans-serif;">'
      + GLOBE_SVG
      + '<span id="mm-lang-label">EN</span>'
      + CHEVRON_SVG
      + '</button>'
      + '<div id="mm-lang-drop" style="display:none;position:absolute;top:calc(100% + 8px);right:0;left:auto;min-width:158px;background:rgba(9,16,38,.97);border:1px solid rgba(255,255,255,.13);border-radius:14px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.6);z-index:500;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);">'
      + optsHtml
      + '</div>'
      + '</div>';

    document.getElementById('mm-lang-btn').addEventListener('click', toggleDropdown);

    document.querySelectorAll('.mm-lang-opt').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setLang(btn.getAttribute('data-lang'));
      });
      btn.addEventListener('mouseover', function () {
        btn.style.background = 'rgba(255,255,255,.06)';
      });
      btn.addEventListener('mouseout', function () {
        var lang = getLang();
        btn.style.background = btn.getAttribute('data-lang') === lang ? 'rgba(245,166,35,.09)' : 'transparent';
      });
    });

    document.addEventListener('click', closeDropdown);
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildSwitcher();
    var lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(lang);
    updateUI(lang);
  });

  window.mmLang = {
    set: setLang,
    get: getLang,
    extend: function (obj) {
      ['en', 'fr', 'ar'].forEach(function (lang) {
        if (obj[lang]) Object.assign(T[lang], obj[lang]);
      });
    }
  };
})();
