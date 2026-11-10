(function () {
  'use strict';

  const script = document.currentScript;
  if (!script) return;
  const existingScript = document.getElementById('trusted-verifier-support-embed');
  if (existingScript && existingScript !== script) return;
  script.id = 'trusted-verifier-support-embed';

  const origin = new URL(script.src).origin;
  const install = () => {
    const styles = document.createElement('style');
    styles.textContent = `
      #trusted-verifier-support-embed-launcher {
        position: fixed; right: 20px; bottom: 20px; z-index: 2147483646;
        width: 64px; height: 64px; border: 0; border-radius: 50%;
        display: grid; place-items: center; background: #0b65ad; color: #fff;
        box-shadow: 0 8px 24px rgba(11, 101, 173, .35); cursor: pointer;
      }
      #trusted-verifier-support-embed-launcher:hover { background: #084f88; }
      #trusted-verifier-support-embed-launcher svg { width: 28px; height: 28px; }
      #trusted-verifier-support-embed-frame {
        position: fixed; right: 20px; bottom: 96px; z-index: 2147483645;
        width: min(420px, calc(100vw - 24px)); height: min(640px, calc(100dvh - 112px));
        border: 0; border-radius: 16px; background: transparent;
        box-shadow: 0 16px 48px rgba(15, 23, 42, .2); display: none;
      }
      @media (max-width: 480px) {
        #trusted-verifier-support-embed-frame {
          right: 12px; bottom: 88px; width: calc(100vw - 24px);
          height: min(640px, calc(100dvh - 104px));
        }
        #trusted-verifier-support-embed-launcher { right: 16px; bottom: 16px; }
      }
    `;

    const frame = document.createElement('iframe');
    frame.id = 'trusted-verifier-support-embed-frame';
    frame.title = 'Chat with Trusted Verifier Support';
    frame.src = `${origin}/support-widget`;
    frame.setAttribute('allow', 'clipboard-write');
    frame.setAttribute('aria-hidden', 'true');

    const button = document.createElement('button');
    button.id = 'trusted-verifier-support-embed-launcher';
    button.type = 'button';
    button.setAttribute('aria-label', 'Open support chat');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>';

    let open = false;
    const setOpen = (nextOpen) => {
      open = nextOpen;
      frame.style.display = open ? 'block' : 'none';
      frame.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close support chat' : 'Open support chat');
      if (frame.contentWindow) {
        frame.contentWindow.postMessage({
          type: open ? 'trusted-verifier-chat-resume' : 'trusted-verifier-chat-pause',
        }, origin);
      }
    };

    button.addEventListener('click', () => setOpen(!open));
    window.addEventListener('message', (event) => {
      if (event.source !== frame.contentWindow || !event.data || event.data.type !== 'trusted-verifier-chat-close') return;
      setOpen(false);
    });

    document.head.appendChild(styles);
    document.body.append(frame, button);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
