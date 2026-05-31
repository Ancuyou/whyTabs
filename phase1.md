# Phase 1 Log

Muc tieu: dua UI chinh sang Side Panel de co trai nghiem native-like, giu popup va newtab lam fallback trong giai doan chuyen doi.

## 1) Them Side Panel entrypoint

**Viec da lam**
- Them `side_panel.default_path` vao `manifest.json`.
- Tao entry `sidepanel` trong `vite.config.js` de build ra HTML rieng.

**Ly do ky thuat**
- Side Panel (Chrome 114+) cho phep UI lon hon, doc, va tu nhien hon popup nho.
- Vite can biet entry HTML de dong goi dung assets trong dist.

**Giai thich cho nguoi moi**
- Manifest la noi dang ky UI cua extension. Neu khong khai bao, Chrome se khong biet mo side panel o dau.
- Build tool can biet danh sach file HTML de tu sinh JS/CSS bundle.

## 2) Tao UI Side Panel co ban

**Viec da lam**
- Tao `src/sidepanel/index.html` voi header, thong ke va danh sach task.
- Tao `src/sidepanel/style.css` voi layout toi gian, de doc, tan dung khong gian doc.
- Tao `src/sidepanel/app.js` de load stats, load task, va cap nhat timer live.

**Ly do ky thuat**
- Side panel la khung UI chinh, nen can co thong ke + danh sach task theo thoi gian thuc.
- Tach rieng CSS/JS giup de bao tri va thay the nhanh khi nang cap Phase 2/3.

**Giai thich cho nguoi moi**
- HTML la khung, CSS la giao dien, JS la logic. Tieng Anh don gian nhung quy uoc nay giup de doc va de mo rong.
- Side panel cho phep hien thi nhieu thong tin hon popup ma khong can mo mot tab moi.

## 3) Real-time timer cap nhat moi giay

**Viec da lam**
- Dung `setInterval` moi 1s de goi `GET_ACTIVE` va update thoi gian tren UI.
- Neu khong co task, UI hien thong diep rong de huong dan nguoi dung.

**Ly do ky thuat**
- Hien thi elapsed time theo thoi gian thuc tao cam giac "live" va gia tri cao hon so voi chi refresh khi mo panel.
- Tan dung du lieu tu background de dam bao tinh nhat quan cua thong tin.

**Giai thich cho nguoi moi**
- Timer o UI khong duoc tu tinh tu `Date.now()` vi neu background sleep thi se lech. Nguon dung la `GET_ACTIVE`.

## 4) Ket noi voi animation hien tai

**Viec da lam**
- Tai su dung WebGL kill animation tu `src/animation/*` khi nhan KILL.

**Ly do ky thuat**
- Giu lai trai nghiem doc dao da co, khong lam mat tinh "signature" cua san pham.

**Giai thich cho nguoi moi**
- Uu tien reuse de giam bug va tiet kiem thoi gian.

## 5) Tong ket thay doi

- `manifest.json`: them side panel.
- `vite.config.js`: them entry build cho side panel.
- `src/sidepanel/*`: UI va logic moi.

## Ket qua mong doi

- Co giao dien side panel hoat dong song song voi popup.
- Stats va timers cap nhat moi giay trong panel.
- San sang cho Phase 2 (Intent bubble + content script).

