# TODO: Add Admin's Signature to Email Send PDF

## Steps to Complete
- [x] Import Admin model in emailRoutes.js
- [x] Modify the /send route to accept adminId in req.body
- [x] Fetch admin from database using adminId and retrieve signature path
- [x] Update the HTML template in emailRoutes.js to include the signature image in the footer
- [x] Update frontend to pass adminId in the email send request
- [x] Fix field mapping for division (use divisionOffice)
- [x] Convert signature image to base64 data URL for Puppeteer compatibility
- [x] Add console logging to debug signature path issues
- [x] Fix DataEnter form to populate fields correctly when certificateData is passed
- [x] Fix InstituteRequest.jsx to pass adminId in email send request
- [x] Remove popup message on input field hover in DataEnter form
- [ ] Test the PDF generation to ensure signature displays correctly
