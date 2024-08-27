const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const EXCEL_FILE = path.join(__dirname, 'UserInfo.xlsx');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

function initializeExcel() {
  if (!fs.existsSync(EXCEL_FILE)) {
    const wb = XLSX.utils.book_new();
    const headers = [
      'submissionDate', 'academicDocuments', 'name', 'email', 'phone',
      'bankName', 'accountNumber', 'ifscCode', 'bloodGroup', 'photo', 'issueDate'
    ];
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(wb, ws, "Employee Data");
    XLSX.writeFile(wb, EXCEL_FILE);
  }
}

function appendToExcel(data) {
  const wb = XLSX.readFile(EXCEL_FILE);
  const ws = wb.Sheets["Employee Data"];
  const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const newRow = [
    data.submissionDate,
    data.academicDocuments ? `=HYPERLINK("${data.academicDocuments}", "View PDF")` : '',
    data.name,
    data.email,
    data.phone,
    data.bankName,
    data.accountNumber,
    data.ifscCode,
    data.bloodGroup,
    data.photo ? `=HYPERLINK("${data.photo}", "View Image")` : '',
    data.issueDate
  ];

  jsonData.push(newRow);
  const newWs = XLSX.utils.aoa_to_sheet(jsonData);
  wb.Sheets["Employee Data"] = newWs;
  XLSX.writeFile(wb, EXCEL_FILE);
}

app.post('/submit', upload.fields([
  { name: 'academicDocuments', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), (req, res) => {
  try {
    const { step1, step2, step3, step4 } = req.body;
    const academicDocuments = req.files['academicDocuments'] ? req.files['academicDocuments'][0].path : '';
    const photo = req.files['photo'] ? req.files['photo'][0].path : '';

    const data = {
      submissionDate: new Date().toISOString(),
      academicDocuments,
      name: step2.name,
      email: step2.email,
      phone: step2.phone,
      bankName: step3.bankName,
      accountNumber: step3.accountNumber,
      ifscCode: step3.ifscCode,
      bloodGroup: step4.bloodGroup,
      photo,
      issueDate: step4.issueDate
    };

    appendToExcel(data);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initializeExcel();
});
