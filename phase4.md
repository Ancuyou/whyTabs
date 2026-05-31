# Phase 4 Log

Muc tieu: dat nen schema on dinh va co the mo rong ve sau, nhung khong lam hu logic hien tai. Day la buoc “schema truoc, tracking sau”.

## 1) Them schema version va meta

**Viec da lam**
- Them `SCHEMA_VERSION` va `meta` trong `src/core/storage.js`.
- Luu `meta.schemaVersion` trong `chrome.storage.local`.

**Ly do ky thuat**
- Khi du lieu tang phuc tap, can version de biet format dang su dung.
- Neu khong co version, viec nang cap sau nay se gay loi am thang, kho debug.

**Giai thich cho nguoi moi**
- Version la “so phien ban” cua du lieu, giong nhu version app nhung cho storage.

## 2) Normalize task khi doc/ghi

**Viec da lam**
- Them `normalizeTask()` de dam bao task nao cung co cac field moi: `schemaVersion`, `focusMode`, `endedAt`, `duration`.
- Moi task se duoc “bo sung” field thieu ma khong lam mat du lieu cu.

**Ly do ky thuat**
- Khi them field moi, data cu khong co. Normalize giup UI va logic khong bi crash.
- `focusMode` giup biet task duoc tinh theo open-time hay active-time ve sau.

**Giai thich cho nguoi moi**
- Normalization giong nhu “don dep” de du lieu luon giong nhau ve hinh dang.

## 3) Migration an toan

**Viec da lam**
- Them `ensureSchema()` trong `db` va goi o `src/background/sw.js` khi worker start.
- Migration chi chay khi schema version cu < version moi.

**Ly do ky thuat**
- Migration giup nang cap du lieu cu sang format moi ma khong mat data.
- Chay trong background dam bao luon duoc thuc hien truoc khi UI doc data.

**Giai thich cho nguoi moi**
- Migration la buoc “chuyen doi” du lieu cu sang kieu moi, giong upgrade database.

## 4) Tong ket thay doi

- `src/core/storage.js`: them schema versioning + normalize + migration.
- `src/background/sw.js`: goi `db.ensureSchema()` khi worker bat dau.

## Ket qua mong doi

- Du lieu cu van doc duoc, du lieu moi co version ro rang.
- San sang chuyen sang tracking chinh xac o phase tiep theo.

