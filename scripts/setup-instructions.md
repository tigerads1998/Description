# Hướng dẫn Setup Google Apps Script

## Bước 1: Tạo Google Apps Script

1. Truy cập: https://script.google.com/
2. Click "New project"
3. Đặt tên project (ví dụ: "Firestore to Sheets")
4. Copy code từ file `google-apps-script-complete.gs` vào editor

## Bước 2: Tạo Google Sheets

1. Truy cập: https://sheets.google.com/
2. Tạo 2 sheets mới:
   - **Jobs Sheet**: Lưu thông tin job postings
   - **Applications Sheet**: Lưu thông tin applications
3. Copy URL của mỗi sheet (từ thanh địa chỉ)

## Bước 3: Cấu hình Google Apps Script

1. Trong Google Apps Script, thay thế các URL:
   ```javascript
   const JOBS_SHEET_URL = 'YOUR_JOBS_SHEET_URL_HERE';
   const APPLICATIONS_SHEET_URL = 'YOUR_APPLICATIONS_SHEET_URL_HERE';
   ```

2. Lưu project (Ctrl+S)

## Bước 4: Deploy Web App

1. Click nút "Deploy" (▶️)
2. Chọn "New deployment"
3. Chọn "Web app"
4. Cấu hình:
   - **Execute as**: "Me" (tài khoản của bạn)
   - **Who has access**: "Anyone" (quan trọng!)
5. Click "Deploy"
6. Copy URL được tạo

## Bước 5: Cập nhật Scripts

1. Cập nhật URL trong các file:
   - `scripts/export-to-sheets.js`
   - `scripts/auto-sync-to-sheets.js`
   - `scripts/test-connection.js`

2. Thay thế:
   ```javascript
   const GOOGLE_SHEETS_WEBAPP_URL = 'YOUR_NEW_WEBAPP_URL_HERE';
   ```

## Bước 6: Test Kết nối

```bash
node scripts/test-connection.js
```

## Bước 7: Export Dữ liệu

### Export một lần:
```bash
node scripts/export-to-sheets.js
```

### Auto sync (real-time):
```bash
node scripts/auto-sync-to-sheets.js
```

## Troubleshooting

### Lỗi 401 (Unauthorized):
- Kiểm tra quyền truy cập đã set "Anyone"
- Deploy lại Web App

### Lỗi 403 (Forbidden):
- Kiểm tra Google Sheets URL đúng
- Kiểm tra quyền truy cập Google Sheets

### Lỗi 500 (Internal Server Error):
- Kiểm tra code Google Apps Script
- Xem logs trong Google Apps Script

## Cấu trúc Google Sheets

### Jobs Sheet:
- A: Job Title
- B: Company
- C: Location
- D: Salary
- E: Description
- F: Requirements
- G: Date Posted
- H: Status

### Applications Sheet:
- A: Name
- B: Email
- C: LinkedIn
- D: Job Title
- E: Company
- F: Date Applied
- G: CV File Name
- H: Status 