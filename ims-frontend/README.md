---

### React Project Setup (Incident Dashboard)

#### 1. Install Required Dependencies

Make sure you have `Node.js` and `npm` installed. Then, install the required dependencies by running:

```bash
npm install
```

#### 2. Set Up API Calls

In your React project, create a utility file (e.g., `src/utils/api.js`) to handle API calls. If you're using Axios for API requests, here's an example:

```javascript
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';  // Your Django API endpoint

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
```

#### 3. Run the React Development Server

Start the React development server:

```bash
npm start
```

By default, the React app will run on `http://localhost:3000/`.


---
### Summary of Steps:
React:
   - Install dependencies: `npm install`
   - Start the server: `npm start`