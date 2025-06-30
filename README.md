# AdminSiteGPTTry

This project is a simple Node.js website with:
- A login page
- A form to enter a player's username, amount to add, and upload proof of purchase
- Backend support for authentication and Google Sheets integration

## How to use

1. **Install dependencies**
   - Frontend: `npm install` (in project root)
   - Backend: `cd server && npm install`

2. **Configure Google Sheets API**
   - In `server/index.js`, fill in `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` with your Google Sheets API credentials.
   - The Sheet ID and name are already set.

3. **Run the backend**
   - `cd server`
   - `npm start`

4. **Run the frontend**
   - In a new terminal, from the project root: `npm run dev`

5. **Access the site**
   - Open your browser to `http://localhost:5173` (frontend)
   - The backend runs on `http://localhost:3001`

## Notes
- Usernames are case sensitive.
- On successful submission, the form clears. On error, fields remain.
- Uploaded images are saved to the `server/uploads` folder.

## Where to put your Google Sheets API key
- In `server/index.js`, fill in the `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` variables with your service account credentials.
- Do **not** commit your credentials to public repositories.
