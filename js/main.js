
document.addEventListener('DOMContentLoaded', function () {
  // SLIDER / LAYOUT
  var track = document.getElementById('slider-track');

  if (!track) {
    console.warn('Slider track not found: #slider-track');
  } else {
    // Show/hide progress based on screen size
    var isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // Desktop: enable scroll progress + pointer drag
    if (isDesktop) {
      // Drag-to-scroll (pointer/touch friendly)
      var isDown = false;
      var startX = 0;
      var scrollAtStart = 0;

      // Prevent native image dragging inside the track
      track.querySelectorAll('img').forEach(function (img) { img.setAttribute('draggable', 'false'); });

      track.addEventListener('pointerdown', function (e) {
        isDown = true;
        try { track.setPointerCapture(e.pointerId); } catch (err) {}
        track.classList.add('dragging');
        startX = e.clientX;
        scrollAtStart = track.scrollLeft;
        document.body.style.userSelect = 'none';
      });

      track.addEventListener('pointerup', function (e) {
        isDown = false;
        try { track.releasePointerCapture(e.pointerId); } catch (err) {}
        track.classList.remove('dragging');
        document.body.style.userSelect = '';
      });

      track.addEventListener('pointercancel', function (e) {
        isDown = false;
        track.classList.remove('dragging');
        document.body.style.userSelect = '';
      });

      track.addEventListener('pointermove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.clientX;
        var walk = (x - startX) * 1.2;
        track.scrollLeft = scrollAtStart - walk;
      });

      track.addEventListener('mouseleave', function () {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('dragging');
        document.body.style.userSelect = '';
      });
    }
  }

  // MOBILE — SHOW MORE / SHOW LESS
  var showMoreBtn = document.getElementById('show-more-btn');
  var btnLabel    = document.getElementById('btn-label');
  var btnChevron  = document.getElementById('btn-chevron');
  var isOpen      = false;

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      // Only operate in mobile layout
      var isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (!isMobile) return;

      isOpen = !isOpen;
      if (track) track.classList.toggle('open', isOpen);

      if (btnLabel) btnLabel.textContent = isOpen ? 'Show less' : 'Show more';
      if (btnChevron) btnChevron.style.transform = isOpen ? 'rotate(180deg)' : '';
      showMoreBtn.setAttribute('aria-expanded', String(isOpen));

      if (isOpen && track) {
        setTimeout(function () {
          track.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
      }
    });
  }

});
