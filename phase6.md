# Phase 6 Log

Muc tieu: them options page va lich su co the loc/export, dong thoi tam dung tracking khi user idle.

## 1) Options page

**Viec da lam**
- Them `options_page` vao `manifest.json` va entry build trong `vite.config.js`.
- Tao `src/options/index.html`, `style.css`, `app.js` voi settings va history.

**Ly do ky thuat**
- Options page la noi cau hinh chinh thuc cua extension, de user tim thay trong Chrome UI.
- Giao dien rong giup quan ly du lieu va cai dat tot hon side panel.

**Giai thich cho nguoi moi**
- Options page la mot trang HTML binh thuong, nhung duoc Chrome mo trong trang cai dat extension.

## 2) History + filter + export

**Viec da lam**
- Them message `GET_HISTORY` va `EXPORT_TASKS` trong `src/background/sw.js`.
- Options page goi API de lay data, loc theo ngay/keyword, va export JSON.

**Ly do ky thuat**
- Lich su giup user phan tich thoi quen, export giup backup.
- Xu ly o background giup du lieu nhat quan va de thay doi ve sau.

**Giai thich cho nguoi moi**
- UI khong nen doc storage truc tiep neu muon thong nhat logic. Nen uyen quyen cho background.

## 3) Idle detection

**Viec da lam**
- Them permission `idle`.
- Dung `chrome.idle.onStateChanged` de tam dung tracking khi user idle.

**Ly do ky thuat**
- Neu user roi may, focus-time se bi tinh sai neu van de tab active.
- Idle detection giup chi tinh thoi gian thuc su co tuong tac.

**Giai thich cho nguoi moi**
- Idle API cho biet user co dang hoat dong hay khong.

## 4) Tong ket thay doi

- `manifest.json`: them `options_page`, permission `idle`.
- `vite.config.js`: them entry `options`.
- `src/options/*`: options page + history.
- `src/background/sw.js`: API history/export + idle handling.

## Ket qua mong doi

- User co noi cau hinh ro rang va xem duoc lich su.
- Tracking dung hon khi user roi may.

