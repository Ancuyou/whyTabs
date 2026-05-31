export function applyI18n(root = document) {
    if (!root || !chrome?.i18n?.getMessage) return;
    const nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
        const key = node.dataset.i18n;
        const text = chrome.i18n.getMessage(key);
        if (text) node.textContent = text;
    });

    const attrNodes = root.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach(node => {
        const [attr, key] = node.dataset.i18nAttr.split(':');
        if (!attr || !key) return;
        const text = chrome.i18n.getMessage(key);
        if (text) node.setAttribute(attr, text);
    });
}
