# Phase 9 Log

Muc tieu: lam sach markup cac index.html va them bieu do truc quan cho analytics.

## 1) Don dep index.html

**Viec da lam**
- Them `meta viewport` va chuan hoa tieu de cho popup, side panel, options, new tab.
- Sap xep lai thu tu section cho ro rang va nhat quan voi luong hien tai.

**Ly do ky thuat**
- Markup gon gon de maintenance de hon va phu hop Material 3.
- Viewport giup layout on dinh khi mo o cac kich thuoc khac nhau.

**Giai thich cho nguoi moi**
- HTML gon gon giup UI de quan sat va de thay doi ve sau.

## 2) Analytics chart (SVG)

**Viec da lam**
- Them `analytics-chart` vao options page.
- Render bieu do thanh bang SVG tu data 30 ngay.

**Ly do ky thuat**
- SVG nhe, khong can lib, de nhung vao options.
- Bieu do giup user nhin nhanh xu huong.

**Giai thich cho nguoi moi**
- SVG la cach ve do hoa bang HTML, de tuy chinh va khong can thu vien.

## 3) Tong ket thay doi

- `src/popup/index.html`, `src/sidepanel/index.html`, `src/newtab/index.html`, `src/options/index.html`: don dep markup.
- `src/options/*`: them bieu do analytics.
- `phase9.md`: log ky thuat.

## Ket qua mong doi

- UI sach se, dong bo va de doc hon.
- Analytics co bieu do truc quan de nhin nhanh.

