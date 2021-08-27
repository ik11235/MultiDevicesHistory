export namespace util {
  /**
   * 渡されたURL文字列からドメイン部分を抽出する
   * URLでない文字列を渡した場合、空文字列を返す
   *
   * @param {string} str ドメイン部分を抽出したいURL
   * @return {string} strのドメイン部分 or 空文字列
   */
  export function getDomain(str: string): string {
    try {
      const parser = new URL(str);
      return parser.hostname;
    } catch (e) {
      if (e.code === 'ERR_INVALID_URL') {
        return '';
      } else {
        throw e;
      }
    }
  }

  /**
   * HTMLの特殊文字をエスケープして返す
   * https://qiita.com/saekis/items/c2b41cd8940923863791
   *
   * @param {string} string htmlとしてエスケープしたい文字列
   * @return {string} エスケープした文字列
   */
  export function escapeHtml(string: string): string {
    // @ts-ignore
    return string.replace(/[&'`"<>]/g, function (match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match];
    });
  }

  /**
   * 渡されたsessionの全てのtabを新しいウィンドウで開く
   * @param {Session} session 対象のsession
   */
  export function openSessionAllPage(session: chrome.sessions.Session): void {
    const tabs = session.window?.tabs!;

    chrome.windows.create((window) => {
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]!;
        if (i == 0) {
          const nowTabs = window!.tabs!;
          console.log(nowTabs);
          console.log('now');
          if (nowTabs.length > 0) {
            // @ts-ignore
            const tabId = nowTabs[0].id!;
            const properties = { url: tab.url, active: false };
            chrome.tabs.update(tabId, properties);
          }
        } else {
          const properties = {
            windowId: window!.id,
            url: tab.url,
            active: false,
          };
          chrome.tabs.create(properties);
        }
      }
    });
  }
}
