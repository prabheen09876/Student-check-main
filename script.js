document.addEventListener('DOMContentLoaded', () => {
  const attendanceButtons = document.querySelectorAll('.attendance-button');

  function updateSummary() {
      const totalStudents = document.querySelectorAll('.student').length;
      const studentsPresent = document.querySelectorAll('.attendance-button.present').length;
      const studentsLeave = document.querySelectorAll('.attendance-button.leave').length;
      const studentsAbsent = document.querySelectorAll('.attendance-button.absent').length;

      document.getElementById('total-students').textContent = totalStudents;
      document.getElementById('students-present').textContent = studentsPresent;
      document.getElementById('students-leave').textContent = studentsLeave;
      document.getElementById('students-absent').textContent = studentsAbsent;
  }

  attendanceButtons.forEach(button => {
      button.addEventListener('click', () => {
          const studentName = button.getAttribute('data-student');
          const attendanceType = button.textContent.toLowerCase();
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString();

          // Change button color
          button.classList.remove('present', 'leave', 'absent');
          button.classList.add(attendanceType);

          // Add or update the attendance date in the button's data attribute
          button.setAttribute('data-date', formattedDate);

          // Update attendance history
          const historySection = document.getElementById('attendance-records');
          const existingRecord = historySection.querySelector(`[data-date="${formattedDate}"]`);
          if (existingRecord) {
              // Update existing record
              const studentRecord = existingRecord.querySelector(`[data-student="${studentName}"]`);
              if (studentRecord) {
                  studentRecord.textContent = `${studentName} - ${attendanceType}`;
              } else {
                  const newStudentRecord = document.createElement('p');
                  newStudentRecord.setAttribute('data-student', studentName);
                  newStudentRecord.textContent = `${studentName} - ${attendanceType}`;
                  existingRecord.appendChild(newStudentRecord);
              }
          } else {
              // Create a new record
              const attendanceRecord = document.createElement('div');
              attendanceRecord.setAttribute('data-date', formattedDate);
              attendanceRecord.innerHTML = `<h3>${formattedDate}</h3><p data-student="${studentName}">${studentName} - ${attendanceType}</p>`;
              historySection.appendChild(attendanceRecord);
          }

          // Update summary
          updateSummary();
      });
  });

  updateSummary();
});
document.addEventListener('DOMContentLoaded', () => {
    const attendanceButtons = document.querySelectorAll('.attendance-button');
    const generateExcelButton = document.getElementById('generate-excel');

    function updateSummary() {
        // ... Your existing summary update code
    }

    attendanceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // ... Your existing attendance tracking code
            updateSummary();
        });
    });

    generateExcelButton.addEventListener('click', () => {
        generateExcel();
    });

    function generateExcel() {
        const historySection = document.getElementById('attendance-records');
        const summarySection = document.getElementById('summary');

        // Create a worksheet for the attendance history
        const historyData = xlsx.utils.table_to_sheet(historySection);
        const summaryData = xlsx.utils.table_to_sheet(summarySection);

        // Create a new workbook
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, historyData, 'Attendance History');
        xlsx.utils.book_append_sheet(workbook, summaryData, 'Attendance Summary');

        // Save the workbook to a file
        xlsx.writeFile(workbook, 'attendance_report.xlsx');
    }
});

