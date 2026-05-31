# Phase 8 Log

Muc tieu: dong bo UI theo real-time bang push update, giam polling tu popup/side panel/content script, va dong nhat theme Material 3 tren toan extension.

## 1) Dong nhat giao dien Material 3

**Viec da lam**
- Cap nhat theme (mau, shadow, bo tron) cho popup, side panel, options, new tab, intent bubble, indicator.
- Dung cung token mau de UI nhat quan.

**Ly do ky thuat**
- Mot he thong UI nhat quan giup san pham nhin “pro” va giam cam giac “chat cho”.
- Material 3 la chuan thiet ke gan gan voi Chrome.

**Giai thich cho nguoi moi**
- Token mau/bo tron giong nhu “luat” cua giao dien, giup tat ca man hinh giong nhau.

## 2) Push updates thay vi polling

**Viec da lam**
- Background broadcast `TICK` moi giay cho popup/side panel.
- Content script nhan `TICK_ELAPSED` de cap nhat indicator.
- Popup/side panel cap nhat time tu `TICK` va refresh khi danh sach thay doi.

**Ly do ky thuat**
- Polling tu nhieu UI lam tang chi phi va mo lot.
- Push update giup tiet kiem, dong bo va phan phoi data tu mot nguon.

**Giai thich cho nguoi moi**
- Mot nguon phat (background) va nhieu nguon nghe (UI) se gon va de kiem soat hon.

## 3) Tong ket thay doi

- `src/popup/*`, `src/sidepanel/*`, `src/options/*`, `src/newtab/*`: dong nhat theme.
- `src/content/*`: update theme + push updates.
- `src/background/sw.js`: them broadcast tick.
- `phase8.md`: log ky thuat.

## Ket qua mong doi

- UI dong bo, nhin hien dai, it “vay muon”.
- Timer va indicator cap nhat muot, giam polling phia UI.

