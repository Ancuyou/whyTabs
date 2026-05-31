# Phase 0 Log

Muc tieu: on dinh nen tang truoc khi nang cap UX. Tap trung sua loi logic, dong bo du lieu, va giam rui ro bao mat.

## 1) On dinh timer va phuc hoi sau khi service worker sleep

**Viec da lam**
- Them `getAllTasks()` va `restoreTimers()` trong `src/core/timer.js`.
- Bo ghi ngau nhien vao storage trong `updateTimer()`.
- Trong `src/background/sw.js`:
  - Luu active tasks tu Map sang storage theo chu ky.
  - Restore timers tu storage khi service worker hoat dong lai.
  - Sau restore, goi `updateTimer()` de bu truu thoi gian.

**Ly do ky thuat**
- MV3 service worker co the bi "sleep" bat cu luc nao. Neu chi giu state trong RAM, du lieu se mat.
- Truoc day, `activeTasks` va `activeTimers` lech nhau: Map mat du lieu nhung storage van con, lam `GET_ACTIVE` sai.
- Danh sach task trong storage phai duoc coi la nguon phuc hoi, sau do Map moi la nguon su dung realtime.

**Giai thich cho nguoi moi**
- Service worker la nen, no khong chay lien tuc. Khi no tam dung, moi bien trong RAM bi mat.
- Vi vay, can luu state can thiet vao `chrome.storage`, va khi nen chay lai thi doc ra va khoi phuc.

## 2) Them API `GET_STATS`

**Viec da lam**
- Them handler `GET_STATS` trong `src/background/sw.js` de popup lay stats dung.

**Ly do ky thuat**
- Popup dang goi `GET_STATS` nhung nen chua xu ly, dan toi UI luon ve 0.
- Khi co message, background can tra lai du lieu bat dong bo (async) dung cach.

**Giai thich cho nguoi moi**
- UI va background giao tiep qua message. Neu background khong lang nghe dung "type", UI se khong co du lieu.

## 3) Dong bo task khi kill va khi tab bi dong

**Viec da lam**
- Khi `KILL_TASK` hoac tab bi dong, cap nhat storage ngay sau khi stop timer.
- Luu them `status`, `endedAt`, `duration` de co lich su va thong tin day du.

**Ly do ky thuat**
- Neu chi xoa timer trong RAM ma khong cap nhat storage, du lieu ton tai bi stale.
- `endedAt` va `duration` giup sau nay phan tich lich su va thong ke chinh xac hon.

**Giai thich cho nguoi moi**
- Chi xoa task o RAM se lam cho storage con thong tin cu, dan toi UI hien sai.
- Co "endedAt" thi biet luc nao task ket thuc, phuc vu thong ke sau nay.

## 4) Chiu XSS trong popup

**Viec da lam**
- Thay `innerHTML` bang tao DOM node va dung `textContent` trong `src/popup/app.js`.

**Ly do ky thuat**
- Intent la input tu nguoi dung. Neu chen HTML/JS vao `innerHTML`, se co nguy co XSS.
- `textContent` tu dong escape ky tu nguy hiem.

**Giai thich cho nguoi moi**
- Khi lay du lieu tu user, khong nen dung `innerHTML` vi co the chay code xau.
- Dung `textContent` de hien chu an toan.

## 5) Tong ket thay doi

- `src/core/timer.js`: them restore/persist helpers, bo ghi storage ngau nhien.
- `src/background/sw.js`: restore state, them `GET_STATS`, dong bo va luu lich su on dinh.
- `src/popup/app.js`: render an toan, tranh XSS.

## Ket qua mong doi

- Stats hien thi dung trong popup.
- Active tasks khong bi mat sau khi service worker sleep.
- Du lieu on dinh, san sang cho cac phase UX nang cao.

