# Phase 5 Log

Muc tieu: nang cap tracking chinh xac, chi cong them thoi gian khi tab dang duoc focus, thay vi tinh theo thoi gian mo tab.

## 1) Theo doi tab dang focus

**Viec da lam**
- Them state `activeTabId` trong `src/core/timer.js` va cac ham `setActiveTab`, `clearActiveTab`.
- Them listener `tabs.onActivated` va `windows.onFocusChanged` trong `src/background/sw.js`.

**Ly do ky thuat**
- Focus-time phai chi duoc tinh khi tab dang la tab duoc nhin (active).
- Neu chi tinh theo open-time, ket qua se cao va khong dung voi muc do tap trung that.

**Giai thich cho nguoi moi**
- “Active tab” la tab dang duoc nguoi dung nhin. Focus-time la thoi gian user thuc su tap trung.

## 2) Tinh elapsed theo focus-time

**Viec da lam**
- `updateTimer()` chi cong thoi gian neu tab dang active.
- `getAllActive()` chi cong them `Date.now() - lastActive` khi tab dang active.

**Ly do ky thuat**
- Tranh tinh sai thoi gian cho tab dang nam nen.
- Bao dam timer luon chinh xac voi UX mong muon.

**Giai thich cho nguoi moi**
- Neu tab khong duoc nhin, elapsed khong duoc tang.

## 3) Luu active context de phuc hoi sau sleep

**Viec da lam**
- Luu `activeContext` vao `chrome.storage.local` khi tab duoc focus.
- Khi worker wake, restore active tab tu `activeContext`.

**Ly do ky thuat**
- MV3 worker co the sleep. Neu mat active context thi elapsed se sai.
- Luu active context giup tiep tuc do dung khi worker tro lai.

**Giai thich cho nguoi moi**
- Day la “phan nho” giup worker biet tab nao dang active truoc khi bi sleep.

## 4) Gan focusMode cho lich su task

**Viec da lam**
- Khi save task, gan `focusMode: 'active-time'` de phan biet voi du lieu cu.

**Ly do ky thuat**
- Du lieu cu co the la open-time, du lieu moi la active-time.
- Can metadata de sau nay phan tich dung.

**Giai thich cho nguoi moi**
- Data can co “nhan” de biet y nghia cua no.

## 5) Tong ket thay doi

- `src/core/timer.js`: them tracking focus tab.
- `src/background/sw.js`: focus listeners + restore active context.
- `phase5.md`: log ky thuat.

## Ket qua mong doi

- Thoi gian focus chinh xac hon, khong bi phong dai.
- San sang cho Phase 6 (options/analytics nang cao).

