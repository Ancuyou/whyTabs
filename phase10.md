# Phase 10 Log

Muc tieu: them onboarding first-run va giam chi phi cap nhat thong qua adaptive tick.

## 1) Onboarding first-run

**Viec da lam**
- Them the onboarding trong popup va side panel.
- Chi hien 1 lan, luu `onboardingDone` trong `chrome.storage.local`.

**Ly do ky thuat**
- Onboarding giam confusion va tang kha nang user hieu flow dung.
- Chi hien 1 lan de khong gay kho chiu.

**Giai thich cho nguoi moi**
- First-run UX la buoc quan trong de user tiep can san pham nhanh.

## 2) Adaptive tick

**Viec da lam**
- Background tu dong chay tick 1s khi popup/side panel mo, 5s khi dong.
- UI gui `VIEW_OPEN` / `VIEW_CLOSE` de background biet khi nao tang giam tan suat.

**Ly do ky thuat**
- Giam polling va giam chi phi xu ly khi UI dong.
- Tang do muot khi UI dang hien thi.

**Giai thich cho nguoi moi**
- Khi UI dong, khong can update qua nhanh vi user khong thay.

## 3) Tong ket thay doi

- `src/popup/*`: onboarding card + VIEW_OPEN/CLOSE.
- `src/sidepanel/*`: onboarding section + VIEW_OPEN/CLOSE.
- `src/background/sw.js`: adaptive tick scheduling.
- `phase10.md`: log ky thuat.

## Ket qua mong doi

- User duoc huong dan lan dau.
- He thong tiet kiem tai nguyen, UI van muot khi dang mo.

