
import './App.css';
import { PostContextProvider } from './contexts/post';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';


function App() {
  return (
    
      <PostContextProvider>
        <UserContextProvider>
          <div className="App">
            <Home/>
          </div>
        </UserContextProvider>
      </PostContextProvider>
    
    
  );
}

export default App;
