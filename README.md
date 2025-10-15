## How to Run the Project

To run this project, follow these steps:

1. **Install Dependencies**: Make sure you have all the necessary dependencies installed by running:
   ```bash
   npm install
   ```

2. **Start the Development Server**: Launch the app using the following command:
   ```bash
   npx expo start
   ```
   If you encounter issues starting the server due to firewall settings, try using the tunnel option by pressing `t` in the terminal after running the above command, or running the following command:
      ```bash
   npx expo start --tunnel
   ```

3. **Open the App**: After starting the server, you can open the app in your preferred environment (iOS, Android, or web). 

   - For mobile devices, you can use the **Expo Go** app available on the App Store or Google Play. Scan the QR code displayed in the terminal or browser to open your project directly on your device.

4. **Run Tests**: To run the tests, use the command:
   ```bash
   npm run test
   ```

5. **Build the App**: If you want to create a production build, run:
   ```bash
   npx expo build
   ```

Make sure to follow any additional instructions specific to your environment or setup.
