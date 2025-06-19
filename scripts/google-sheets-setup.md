# Hướng dẫn Setup Google Sheets để nhận dữ liệu từ Firestore

## Bước 1: Tạo Google Sheet mới
1. Truy cập https://sheets.google.com
2. Tạo sheet mới với tên "Job Applications"
3. Tạo các sheet con:
   - "Applications" - cho đơn ứng tuyển
   - "Jobs" - cho job postings

## Bước 2: Tạo Google Apps Script
1. Trong Google Sheet, chọn Extensions > Apps Script
2. Thay thế code mặc định bằng code sau:

```javascript
// Google Apps Script để nhận dữ liệu từ Firestore
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'applications') {
      const applicationsSheet = sheet.getSheetByName('Applications');
      if (!applicationsSheet) {
        // Tạo sheet nếu chưa có
        const newSheet = sheet.insertSheet('Applications');
        newSheet.getRange(1, 1, 1, 8).setValues([['Name', 'Email', 'LinkedIn', 'Job Title', 'Company', 'Date', 'CV', 'Status']]);
      }
      
      // Thêm dữ liệu mới
      const row = [
        data.name || '',
        data.email || '',
        data.linkedin || '',
        data.jobTitle || '',
        data.company || '',
        data.date || '',
        data.fileName || '',
        'New'
      ];
      
      applicationsSheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Application added successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'jobs') {
      const jobsSheet = sheet.getSheetByName('Jobs');
      if (!jobsSheet) {
        const newSheet = sheet.insertSheet('Jobs');
        newSheet.getRange(1, 1, 1, 9).setValues([['Title', 'Company', 'Location', 'Type', 'Salary', 'Posted', 'Description', 'Verified', 'Status']]);
      }
      
      const row = [
        data.title || '',
        data.company || '',
        data.location || '',
        data.type || '',
        data.salary || '',
        data.posted || '',
        data.description || '',
        data.verified || false,
        'Active'
      ];
      
      jobsSheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Job added successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function để test
function testConnection() {
  return "Google Apps Script is working!";
}
```

## Bước 3: Deploy Web App
1. Click "Deploy" > "New deployment"
2. Chọn "Web app"
3. Set:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy Web App URL (sẽ có dạng: https://script.google.com/macros/s/.../exec)

## Bước 4: Cấu hình CORS (nếu cần)
Nếu gặp lỗi CORS, thêm vào đầu file Apps Script:

```javascript
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
```

## Bước 5: Test
Sau khi có Web App URL, bạn có thể test bằng cách gửi POST request với dữ liệu JSON. 