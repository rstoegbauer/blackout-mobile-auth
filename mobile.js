(function(window, document) {
  "use strict";

  function debounce(func, wait, options) {
    let lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;
    if (typeof func !== "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = Number(wait) || 0;
    if (typeof options === "object") {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing
        ? nativeMax(Number(options.maxWait) || 0, wait)
        : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      let args = lastArgs,
        thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      let timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
      console.log("remainingWait");
      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      let timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;
      // Either this is the first call, activity has stopped and we're at the trailing
      // edge, the system time has gone backwards and we're treating it as the
      // trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been debounced at
      // least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function debounced() {
      let time = Date.now(),
        isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  document.addEventListener("DOMContentLoaded", function() {
    let toggles = document.querySelectorAll(".toggle"),
      menu = document.querySelector("#bko-mobile-menu"),
      menuOpen = false,
      noScroll = false,
      timeout = null;

    function closeMobile(e) {
      menuOpen = false;
      menu.children[0].style.transform = null;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        /* we wait till the transition completes (250ms)
                 before we remove the scroll block and hide the mobile menu */
        menu.classList.remove("is-active");

        document.documentElement.style.overflow = null;
        noScroll = false;
        window.removeEventListener("resize", check);
      }, 260);
    }

    function getBrowserWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    }

    function toggleBurger() {
      var burger = document.querySelector(".navbar-burger");
      if (menuOpen) {
        burger.classList.remove("is-active");
      } else {
        burger.classList.add("is-active");
      }
    }

    function checkOnResize() {
      var width = getBrowserWidth();
      if (width > 1024) {
        toggleBurger();
        menuOpen = false;
        menu.classList.remove("is-active");
        menu.children[0].style.transform = null;
        document.documentElement.style.overflow = null;
        window.removeEventListener("resize", check);
      }
    }

    var check = debounce(checkOnResize, 150);

    function toggleMobile(e) {
      toggleBurger(e);
      if (menuOpen) return closeMobile(e);

      menuOpen = true;

      menu.classList.add("is-active");

      document.documentElement.style.overflow = "hidden";
      noScroll = true;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        /* we want to display the parent container before we start the transition */
        menu.children[0].style.transform = "translateX(0)";
      }, 100);
      /* check to see if the browser is outside the parameters of the mobile menu break point */
      window.addEventListener("resize", check);
    }

    toggles.forEach(function(el) {
      el.addEventListener("click", toggleMobile, false);
    });

    /* prevent closing the menu long as you're within the menu container */
    menu.children[0].addEventListener("click", function(e) {
      e.stopPropagation();
    });

    /* clicking outside the menu container will close the menu */
    menu.addEventListener("click", toggleMobile, false);
  });
})(window, document);
