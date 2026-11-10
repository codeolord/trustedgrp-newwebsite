(function () {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const request = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'The support service is unavailable. Please try again.');
    return data;
  };
  const post = (url, value) => request(url, { method: 'POST', body: JSON.stringify(value) });
  const formatTime = (value) => new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  const panel = $('[data-help-panel]');
  if (panel) {
    const home = $('[data-chat-home]', panel);
    const view = $('[data-chat-view]', panel);
    const openButton = $('[data-chat-open]', panel);
    const backButton = $('[data-chat-back]', panel);
    const startForm = $('[data-chat-start-form]', panel);
    const composeForm = $('[data-chat-compose]', panel);
    const messageList = $('[data-chat-messages]', panel);
    const errorBox = $('[data-chat-error]', panel);
    const closedNote = $('[data-chat-closed]', panel);
    const storageKey = 'trusted-verifier-support-conversation';
    let conversationId = '';
    let lastMessageId = '';
    let pollTimer;
    let polling = false;

    const showError = (message) => {
      errorBox.textContent = message;
      errorBox.hidden = !message;
    };
    const savedConversation = () => {
      try {
        return localStorage.getItem(storageKey) || '';
      } catch {
        return '';
      }
    };
    const saveConversation = (id) => {
      try {
        localStorage.setItem(storageKey, id);
      } catch {
        showError('Your browser could not save this chat. Keep this page open while we talk.');
      }
    };
    const displayMessages = (messages, replace) => {
      if (replace) {
        messageList.innerHTML = '';
        lastMessageId = '';
      }
      const newMessages = messages.filter((message) => !lastMessageId || BigInt(message.id) > BigInt(lastMessageId));
      newMessages.forEach((message) => {
        const item = document.createElement('article');
        item.className = `chat-message chat-message--${message.sender === 'staff' ? 'staff' : 'visitor'}`;
        item.innerHTML = `<b>${escapeHtml(message.sender === 'staff' ? 'Support' : message.senderName)}</b><p>${escapeHtml(message.body).replace(/\n/g, '<br>')}</p><time>${escapeHtml(formatTime(message.createdAt))}</time>`;
        messageList.appendChild(item);
        lastMessageId = String(message.id);
      });
      if (newMessages.length || replace) messageList.scrollTop = messageList.scrollHeight;
    };
    const syncConversation = async (replace = false) => {
      if (!conversationId || polling) return;
      polling = true;
      try {
        const data = await request(`/api/chat?conversationId=${encodeURIComponent(conversationId)}`);
        displayMessages(data.messages, replace);
        showError('');
        const isClosed = data.status === 'closed';
        composeForm.hidden = isClosed;
        closedNote.hidden = !isClosed;
        if (replace) startForm.hidden = true;
      } catch (error) {
        if (/Chat not found|invalid/i.test(error.message)) {
          try { localStorage.removeItem(storageKey); } catch { /* Storage is optional. */ }
          conversationId = '';
          startForm.hidden = false;
          composeForm.hidden = true;
          messageList.innerHTML = '';
        }
        showError(error.message);
      } finally {
        polling = false;
      }
    };
    const startPolling = () => {
      clearInterval(pollTimer);
      pollTimer = setInterval(() => syncConversation(), 4000);
    };
    const openChat = async () => {
      home.hidden = true;
      view.hidden = false;
      showError('');
      conversationId = savedConversation();
      startForm.hidden = Boolean(conversationId);
      composeForm.hidden = true;
      closedNote.hidden = true;
      messageList.innerHTML = '';
      if (conversationId) await syncConversation(true);
      startPolling();
    };
    openButton.addEventListener('click', openChat);
    backButton.addEventListener('click', () => {
      view.hidden = true;
      home.hidden = false;
      clearInterval(pollTimer);
    });
    startForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submit = $('button[type="submit"]', startForm);
      submit.disabled = true;
      showError('');
      try {
        const values = new FormData(startForm);
        const data = await post('/api/chat', {
          action: 'start',
          name: values.get('name'),
          email: values.get('email'),
        });
        conversationId = data.conversationId;
        saveConversation(conversationId);
        startForm.hidden = true;
        composeForm.hidden = false;
        await syncConversation(true);
        startPolling();
        $('#chat-message', composeForm).focus();
      } catch (error) {
        showError(error.message);
      } finally {
        submit.disabled = false;
      }
    });
    composeForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const input = $('#chat-message', composeForm);
      const submit = $('button[type="submit"]', composeForm);
      const message = input.value.trim();
      if (!message) return;
      submit.disabled = true;
      showError('');
      try {
        await post('/api/chat', { action: 'message', conversationId, message });
        input.value = '';
        await syncConversation();
      } catch (error) {
        showError(error.message);
      } finally {
        submit.disabled = false;
      }
    });
    $('[data-chat-new]', panel).addEventListener('click', () => {
      try { localStorage.removeItem(storageKey); } catch { /* Storage is optional. */ }
      conversationId = '';
      lastMessageId = '';
      messageList.innerHTML = '';
      closedNote.hidden = true;
      startForm.hidden = false;
      composeForm.hidden = true;
      showError('');
    });
  }

  const admin = $('[data-support-admin]');
  if (!admin) return;

  const loginPanel = $('[data-support-login]', admin);
  const workspace = $('[data-support-workspace]', admin);
  const loginForm = $('[data-support-login-form]', admin);
  const loginError = $('[data-support-login-error]', admin);
  const list = $('[data-support-list]', admin);
  const listError = $('[data-support-list-error]', admin);
  const detail = $('[data-support-detail]', admin);
  const placeholder = $('[data-support-placeholder]', admin);
  const messages = $('[data-support-messages]', admin);
  const detailError = $('[data-support-detail-error]', admin);
  const filter = $('[data-support-filter]', admin);
  const replyForm = $('[data-support-reply]', admin);
  let selectedConversation = '';
  let inboxTimer;
  let messageTimer;
  let messageCursor = '';

  const showError = (element, message) => {
    element.textContent = message;
    element.hidden = !message;
  };
  const updateStatusButton = (status) => {
    const button = $('[data-support-status]', admin);
    button.textContent = status === 'open' ? 'Close conversation' : 'Reopen conversation';
    button.dataset.nextStatus = status === 'open' ? 'closed' : 'open';
    replyForm.hidden = status !== 'open';
  };
  const showWorkspace = (authenticated) => {
    loginPanel.hidden = authenticated;
    workspace.hidden = !authenticated;
    if (authenticated) {
      loadConversations();
      clearInterval(inboxTimer);
      inboxTimer = setInterval(loadConversations, 10000);
    } else {
      clearInterval(inboxTimer);
      clearInterval(messageTimer);
    }
  };
  const loadConversations = async () => {
    try {
      const data = await request(`/api/support?action=conversations&status=${filter.value}`);
      list.innerHTML = data.conversations.map((conversation) => `<button type="button" class="support-conversation${conversation.id === selectedConversation ? ' is-selected' : ''}" data-conversation-id="${escapeHtml(conversation.id)}" data-visitor-email="${escapeHtml(conversation.visitorEmail || '')}">
        <span class="support-conversation-top"><b>${escapeHtml(conversation.visitorName)}</b><time>${escapeHtml(formatTime(conversation.lastMessageAt))}</time></span>
        <span>${escapeHtml(conversation.lastMessage || 'New support conversation')}</span>
        <span class="tag ${conversation.status === 'open' ? 'tag--green' : 'tag--gray'}">${escapeHtml(conversation.status)}</span>
      </button>`).join('') || '<p class="support-empty">No conversations yet.</p>';
      showError(listError, '');
      list.querySelectorAll('[data-conversation-id]').forEach((button) => {
        button.addEventListener('click', () => selectConversation(button.dataset.conversationId));
      });
    } catch (error) {
      showError(listError, error.message);
      if (/Sign in/.test(error.message)) showWorkspace(false);
    }
  };
  const loadMessages = async () => {
    if (!selectedConversation) return;
    try {
      const data = await request(`/api/support?action=messages&conversationId=${encodeURIComponent(selectedConversation)}`);
      const cursor = data.messages.length ? String(data.messages[data.messages.length - 1].id) : '';
      if (cursor !== messageCursor) {
        messages.innerHTML = data.messages.map((message) => `<article class="chat-message chat-message--${message.sender === 'staff' ? 'staff' : 'visitor'}">
          <b>${escapeHtml(message.sender === 'staff' ? 'Support' : message.senderName)}</b><p>${escapeHtml(message.body).replace(/\n/g, '<br>')}</p><time>${escapeHtml(formatTime(message.createdAt))}</time>
        </article>`).join('');
        messages.scrollTop = messages.scrollHeight;
        messageCursor = cursor;
      }
      showError(detailError, '');
    } catch (error) {
      showError(detailError, error.message);
      if (/Sign in/.test(error.message)) showWorkspace(false);
    }
  };
  const selectConversation = async (id) => {
    selectedConversation = id;
    messageCursor = '';
    detail.hidden = false;
    placeholder.hidden = true;
    try {
      const conversationButton = list.querySelector(`[data-conversation-id="${CSS.escape(id)}"]`);
      const conversationName = conversationButton?.querySelector('.support-conversation-top b')?.textContent || 'Visitor';
      $('[data-support-visitor]', admin).textContent = conversationName;
      const email = $('[data-support-email]', admin);
      email.textContent = conversationButton?.dataset.visitorEmail || '';
      email.hidden = !email.textContent;
      const status = conversationButton?.querySelector('.tag')?.textContent || 'open';
      updateStatusButton(status);
      await loadMessages();
      clearInterval(messageTimer);
      messageTimer = setInterval(loadMessages, 4000);
      await loadConversations();
    } catch (error) {
      showError(detailError, error.message);
    }
  };

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = $('button[type="submit"]', loginForm);
    submit.disabled = true;
    showError(loginError, '');
    try {
      await post('/api/support?action=login', { password: new FormData(loginForm).get('password') });
      loginForm.reset();
      showWorkspace(true);
    } catch (error) {
      showError(loginError, error.message);
    } finally {
      submit.disabled = false;
    }
  });
  $('[data-support-logout]', admin).addEventListener('click', async () => {
    try {
      await post('/api/support?action=logout', {});
      showWorkspace(false);
      selectedConversation = '';
    } catch (error) {
      showError(listError, error.message);
    }
  });
  filter.addEventListener('change', loadConversations);
  $('[data-support-status]', admin).addEventListener('click', async (event) => {
    if (!selectedConversation) return;
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const data = await post('/api/support?action=status', {
        conversationId: selectedConversation,
        status: button.dataset.nextStatus,
      });
      updateStatusButton(data.status);
      await loadConversations();
    } catch (error) {
      showError(detailError, error.message);
    } finally {
      button.disabled = false;
    }
  });
  replyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = $('[name="message"]', replyForm);
    const submit = $('button[type="submit"]', replyForm);
    submit.disabled = true;
    showError(detailError, '');
    try {
      await post('/api/support?action=reply', { conversationId: selectedConversation, message: input.value });
      input.value = '';
      await loadMessages();
      await loadConversations();
    } catch (error) {
      showError(detailError, error.message);
    } finally {
      submit.disabled = false;
    }
  });
  filter.value = 'open';
  request('/api/support?action=session')
    .then(() => showWorkspace(true))
    .catch(() => showWorkspace(false));
})();
