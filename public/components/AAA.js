/*#container {
  overflow: auto;
  will-change: transform; /* make overflow fast on non-retina */
  /*padding: var(--default-padding);
  background-color: #ECEFF1;
  scroll-behavior: smooth;
}*/


/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky_sentinel--top` become visible/invisible at the top of the container.
 */
function observeHeaders(container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const targetInfo = record.boundingClientRect;
      const stickyTarget = record.target.parentElement.querySelector('.sticky');
      const rootBoundsInfo = record.rootBounds;

      if (targetInfo.bottom < rootBoundsInfo.top) {
    //    fire(true, stickyTarget);
      }

      if (targetInfo.bottom >= rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom) {
  //     fire(false, stickyTarget);
      }
    }
  }, {
    // rootMargin: '-16px',
    threshold: [0],
    root: container
  });

  // Add the bottom sentinels to each section and attach an observer.
//  const sentinels = addSentinels(container, 'sticky_sentinel--top');
//  sentinels.forEach(el => observer.observe(el));
}

/**
 * Sets up an intersection observer to notify when elements with the class
 * `.sticky_sentinel--bottom` become visible/invisible at the botton of the
 * container.
 */
function observeFooters(container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const targetInfo = record.boundingClientRect;
      const stickyTarget = record.target.parentElement.querySelector('.sticky');
      const rootBoundsInfo = record.rootBounds;
      const ratio = record.intersectionRatio;

      if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
  //      fire(true, stickyTarget);
      }

      if (targetInfo.top < rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom) {
  //      fire(false, stickyTarget);
      }
    }
  }, {
    // rootMargin: '16px',
    // Get callback slightly before element is 100% visible/invisible.
    threshold: [1],
    root: container
  });

  // Add the bottom sentinels to each section and attach an observer.
//  const sentinels = addSentinels(container, 'sticky_sentinel--bottom');
//  sentinels.forEach(el => observer.observe(el));
}

/**
 * Notifies when elements that have the class `sticky` begin to stick or not.
 * Note: these should be children of the `container` element.
 */
function notifyWhenStickyHeadersChange(container) {
  observeHeaders(container);
  observeFooters(container);
}

const container = document.querySelector('#container');
notifyWhenStickyHeadersChange(container);

document.addEventListener('sticky-change', e => {
  // Update sticking header title.
  const [header, stuck] = [e.detail.target, e.detail.stuck];
  header.classList.toggle('isPinned', stuck);

});
