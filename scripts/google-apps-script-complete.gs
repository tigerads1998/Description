// Google Apps Script hoàn chỉnh để nhận dữ liệu từ Firestore
// Copy toàn bộ code này vào Google Apps Script

function doPost(e) {
  try {
    // Parse JSON data từ request
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Xử lý applications
    if (data.type === 'applications') {
      const applicationsSheet = sheet.getSheetByName('Applications');
      let targetSheet;
      
      if (!applicationsSheet) {
        // Tạo sheet mới nếu chưa có
        targetSheet = sheet.insertSheet('Applications');
        // Tạo header
        targetSheet.getRange(1, 1, 1, 8).setValues([['Name', 'Email', 'LinkedIn', 'Job Title', 'Company', 'Date', 'CV', 'Status']]);
      } else {
        targetSheet = applicationsSheet;
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
      
      targetSheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Application added successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Xử lý jobs
    if (data.type === 'jobs') {
      const jobsSheet = sheet.getSheetByName('Jobs');
      let targetSheet;
      
      if (!jobsSheet) {
        // Tạo sheet mới nếu chưa có
        targetSheet = sheet.insertSheet('Jobs');
        // Tạo header
        targetSheet.getRange(1, 1, 1, 9).setValues([['Title', 'Company', 'Location', 'Type', 'Salary', 'Posted', 'Description', 'Verified', 'Status']]);
      } else {
        targetSheet = jobsSheet;
      }
      
      // Thêm dữ liệu mới
      const row = [
        data.title || '',
        data.company || '',
        data.location || '',
        data.jobType || '',
        data.salary || '',
        data.posted || '',
        data.description || '',
        data.verified || false,
        'Active'
      ];
      
      targetSheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Job added successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Nếu không phải applications hoặc jobs
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid data type'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Xử lý lỗi
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function để xử lý CORS preflight requests
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

// Function để test kết nối
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Google Apps Script is working!',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function để xóa tất cả dữ liệu (cẩn thận khi sử dụng)
function clearAllData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Xóa sheet Applications nếu có
  const applicationsSheet = sheet.getSheetByName('Applications');
  if (applicationsSheet) {
    sheet.deleteSheet(applicationsSheet);
  }
  
  // Xóa sheet Jobs nếu có
  const jobsSheet = sheet.getSheetByName('Jobs');
  if (jobsSheet) {
    sheet.deleteSheet(jobsSheet);
  }
  
  return 'All data cleared successfully';
}

// Function để tạo lại headers
function setupHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Tạo sheet Applications với headers
  let applicationsSheet = sheet.getSheetByName('Applications');
  if (!applicationsSheet) {
    applicationsSheet = sheet.insertSheet('Applications');
  }
  applicationsSheet.clear();
  applicationsSheet.getRange(1, 1, 1, 8).setValues([['Name', 'Email', 'LinkedIn', 'Job Title', 'Company', 'Date', 'CV', 'Status']]);
  
  // Tạo sheet Jobs với headers
  let jobsSheet = sheet.getSheetByName('Jobs');
  if (!jobsSheet) {
    jobsSheet = sheet.insertSheet('Jobs');
  }
  jobsSheet.clear();
  jobsSheet.getRange(1, 1, 1, 9).setValues([['Title', 'Company', 'Location', 'Type', 'Salary', 'Posted', 'Description', 'Verified', 'Status']]);
  
  return 'Headers setup completed';
} 