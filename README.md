# IT Helpdesk System

A comprehensive IT helpdesk system with chatbot support, complaint management, and performance analytics.

## Features

- Smart chatbot for initial troubleshooting
- Automated complaint registration
- Real-time complaint tracking
- Technician assignment and management
- Performance analytics dashboard
- Email notifications
- 6-hour resolution timeline
- Automatic escalation system

## Setup Instructions

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file with the following variables:
   ```
   SECRET_KEY=your-secret-key
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-email-password
   FLASK_ENV=development
   GEMINI_API_KEY=your-gemini-api-key
   ```
   
   To get a Gemini API key:
   1. Go to https://ai.google.dev/
   2. Create a Google Cloud account or sign in
   3. Navigate to the API key section
   4. Create a new API key for the Gemini service
   5. Copy the API key and add it to your .env file

   The chatbot uses Google's Gemini AI to provide troubleshooting steps for IT issues. Without a valid API key, the chatbot will fall back to creating support tickets directly.

5. Initialize the database:
   ```bash
   python app.py
   ```

## Login Credentials

### Admin
- Username: admin
- Password: admin123
- Email: admin@company.com

### Technician
- Username: tech1
- Password: tech123
- Email: tech1@company.com

### Employee
- Username: emp1
- Password: emp123
- Email: emp1@company.com

## System Requirements

- Python 3.8+
- SQLite3
- Modern web browser

## Usage

1. Start the application:
   ```bash
   python app.py
   ```
2. Open your browser and navigate to `http://localhost:5000`
3. Login with the appropriate credentials based on your role

## Features by Role

### Employee
- Report IT issues through chatbot
- Track complaint status
- View complaint history
- Add comments to complaints
- Mark issues as resolved

### Technician
- View assigned complaints
- Update complaint status
- Add troubleshooting updates
- Track resolution time
- Escalate issues if needed

### Administrator
- Monitor system performance
- View technician efficiency metrics
- Manage user accounts
- Track complaint analytics
- Handle escalated issues

## Support

For technical support or questions, please contact the system administrator. 