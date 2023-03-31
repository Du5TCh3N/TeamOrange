// Import CSS files
import 'antd/dist/reset.css';
import './App.css';

// Import required modules
import { BrowserRouter as Router} from 'react-router-dom';
import BasicLayout from "./components/BasicLayout/basicLayout";
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

// Import AWS Amplify configuration
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// Set API endpoint for AWS Amplify
const apiEndpoint = 'https://4h1l85ptte.execute-api.eu-west-2.amazonaws.com/default/python-modeller';

Amplify.API.configure({
  endpoints: [
    {
      name: 'python-modeller-API',
      endpoint: apiEndpoint,
      region: 'eu-west-2'
    }
  ],
});

// Define the main App component
function App(){
  return(
    // Set up the router for the app
    <Router>
      <div className = "App">
        <BasicLayout />
      </div>
    </Router>
  )
}

// Export the App component as the default export
export default App;
