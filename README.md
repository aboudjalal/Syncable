# Syncable

**Syncable** is a smart timetable app designed to simplify scheduling for students. With features like Google Calendar integration and advanced timetable parsing, Syncable helps students upload their schedules and automatically sync them with their preferred calendar apps, ensuring they never miss a class.

---

## Features

- **Google Calendar Integration**: Automatically sync your class schedule with Google Calendar.
- **Timetable Upload**: Upload or drag-and-drop an image of your timetable to extract schedule details.
- **User-Friendly Interface**: Preview, edit, and confirm schedule details before syncing.
- **Cross-Platform Support**: Future plans include integration with Apple Calendar and Notion.
- **Custom Event Management**: Add, edit, or delete events directly within the app.

---

## How It Works

1. **Sign In with Google**: Securely log in using your Google account.
2. **Upload Your Timetable**: Drag and drop an image or select a file from your device.
3. **Extract and Edit**: Syncable uses advanced algorithms to extract class schedules from your timetable image.
4. **Sync**: Confirm the details and sync them to your Google Calendar with a single click.

---

## Getting Started

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: Ensure you have a MongoDB database set up.
- **Google Developer Console**: Create credentials for Google Calendar API integration.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aboudjalal/Syncable.git
   cd Syncable
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```env
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   MONGODB_URI=<your-mongodb-uri>
   ```

4. Start the app:
   ```bash
   npm start
   ```

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Calendar Integration**: Google Calendar API
- **Authentication**: OAuth 2.0 (Google Sign-In)

---

## Roadmap

### Now
- Google Calendar API integration
- Timetable upload and parsing
- Google Sign-In authentication

### Next
- Integration with Apple Calendar and Notion
- User-defined themes and customization options
- Improved timetable parsing accuracy

### Later
- Advanced event conflict detection
- AI-based schedule optimization
- Mobile app development

---


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to reach out:

- **Author**: Aboud Jalal
- **Email**: aboudjalal1@gmail.com
