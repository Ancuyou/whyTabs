# Phase 3 Log

Muc tieu: tao tab visual indicator theo thoi gian focus de user cam nhan “live” ngay tren trang web.

## 1) Them tab indicator content script

**Viec da lam**
- Tao `src/content/tab-indicator.js` va `src/content/tab-indicator.css`.
- Dang ky trong `manifest.json` cung intent bubble.

**Ly do ky thuat**
- Tab indicator giup nhac nho nhe, khong can mo UI, nhung van cam nhan duoc do phan tan.
- Dung content script de ve indicator ngay tren trang, khong can permission Tab Styling API.

**Giai thich cho nguoi moi**
- Tab Styling API chua phai luc nao cung mo, nen cach an toan la ve indicator trong DOM.

## 2) Lay elapsed tu background theo tab

**Viec da lam**
- Them handler `GET_ELAPSED` trong `src/background/sw.js`.
- Content script goi `GET_ELAPSED` moi 5s de cap nhat mau va do dai.

**Ly do ky thuat**
- Background la noi giu timer chinh xac. Content script khong nen tu tinh thoi gian vi co the lech.
- Polling 5s la can bang giua do muot va tiet kiem tai nguyen.

**Giai thich cho nguoi moi**
- UI luon lay du lieu tu “nguon su that” la background, tranh hien thi sai.

## 3) Mapping mau theo muc do focus

**Viec da lam**
- Mau/width thay doi theo 4 tier thoi gian (nhanh, binh thuong, nang, marathon).
- Neu > 45 phut thi bat animation pulse nhe.

**Ly do ky thuat**
- Thay doi mau giup user “doc nhanh” trang thai ma khong can so.
- Pulse la tín hieu nhe, khong gay phiền nhu popup.

**Giai thich cho nguoi moi**
- Thiet ke UI nen uu tien nhan biet nhanh, giam thao tac.

## 4) Tong ket thay doi

- `manifest.json`: them tab indicator content script.
- `src/content/tab-indicator.*`: indicator UI.
- `src/background/sw.js`: GET_ELAPSED cho content script.

## Ket qua mong doi

- Thay thanh chi bao o duoi trang, mau thay doi theo thoi gian.
- Tang cam giac realtime khi dang focus.
- San sang cho Phase 4 (history + insights).

