# Phase 2 Log

Muc tieu: dua intent capture vao trang web that (non-blocking), khong can override new tab. Tao mot bubble nhe xuat hien tren trang khi user bat dau session.

## 1) Them content script Intent Bubble

**Viec da lam**
- Tao `src/content/intent-bubble.js` va `src/content/intent-bubble.css`.
- Dang ky content script trong `manifest.json` cho cac trang http/https.

**Ly do ky thuat**
- Content script cho phep UI "de vao trang" ma khong can chiem toan bo New Tab.
- Chi bat bubble tren http/https de tranh can thiep vao trang he thong (chrome://).

**Giai thich cho nguoi moi**
- Content script la JS chay trong trang web, nhung van thuoc extension.
- Chrome khong cho phep can thiep vao trang he thong, nen chi chon http/https.

## 2) Capture intent an toan, khong can tabId tu trang

**Viec da lam**
- Trong `src/background/sw.js`, neu khong co `tabId` trong message thi lay `sender.tab.id`.

**Ly do ky thuat**
- Content script khong truy cap `chrome.tabs.getCurrent()` trong trang.
- `sender.tab.id` la nguon tabId dung nhat khi message tu content script.

**Giai thich cho nguoi moi**
- Khi trang gui message, Chrome tu biet tab nao dang gui. Ta dung thong tin nay de dinh danh task.

## 3) Tranh hien bubble lap lai tren cung tab

**Viec da lam**
- Dung `sessionStorage` de danh dau da hien bubble trong tab.
- Neu da hien 1 lan thi khong show lai.

**Ly do ky thuat**
- UX bi kho chiu neu bubble xuat hien moi lan user refresh.
- `sessionStorage` ton tai trong phien tab, khong can storage toan cuc.

**Giai thich cho nguoi moi**
- `sessionStorage` la bo nho nhe cho rieng tab, duoc xoa khi tab dong.

## 4) UX: them animation nhe va thao tac nhanh

**Viec da lam**
- Them hieu ung show/hide nhanh de khong gay kho chiu.
- Ho tro Enter/Escape cho thao tac nhanh.

**Ly do ky thuat**
- UX tot la phan biet san pham vs script don gian.
- Nguoi dung can thao tac it ma van hoan thanh intent.

**Giai thich cho nguoi moi**
- Chi can them anim 0.2s nhung cam giac "mau" va "native" hon.

## 5) Tong ket thay doi

- `manifest.json`: them content script intent bubble.
- `src/content/*`: them UI bubble + CSS.
- `src/background/sw.js`: ho tro capture intent tu content script.

## Ket qua mong doi

- Intent duoc capture ngay tren trang web, khong can override New Tab.
- Tang cam giac native, it gay phien.
- San sang cho Phase 3 (tab visual indicator + thong bao realtime).

