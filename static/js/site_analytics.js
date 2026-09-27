(function () {
  'use strict';

  const ignoredPaths = ['/admin/dashboard', '/dashboard'];
  const path = window.location.pathname;

  // Base path del servidor: vacio en local, "/tutawayta" en produccion.
  const analyticsBasePath = window.TUTA_BASE_PATH || (path.startsWith('/tutawayta') ? '/tutawayta' : '');

  if (ignoredPaths.includes(path)) return;

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getVisitorId() {
    let visitorId = localStorage.getItem('tw_visitor_id');
    if (!visitorId) {
      visitorId = `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem('tw_visitor_id', visitorId);
    }
    return visitorId;
  }

  function trackPageView() {
    const visitorId = getVisitorId();
    const today = new Date().toISOString().slice(0, 10);
    const visits = readJson('tw_site_visits', []);
    visits.push({
      date: today,
      path,
      visitorId,
      title: document.title || 'Tuta Wayta'
    });

    localStorage.setItem('tw_site_visits', JSON.stringify(visits));

    fetch(`${analyticsBasePath}/api/analytics/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path,
        visitorId,
        title: document.title || 'Tuta Wayta'
      })
    }).catch(() => {});
  }

  trackPageView();
})();