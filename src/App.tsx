import './App.scss';
import Header from './components/Header/header';
import NavBar from './components/NavBar/navBar';
import Content from './components/Content/content';
import { useEffect } from 'react';
import { initializedAsync } from './redux/reducers/app';
import loading from './assets/progress.gif';
import { UseTypedDispatch, UseTypedSelector } from './@types/types';

function App() {

  const initialized = UseTypedSelector(state => state.AppData.initialized);
  const dispatch = UseTypedDispatch();

  useEffect(() => {
    dispatch(initializedAsync())
  }, []);

  return (
      <>  
        <Header/>
        <div className="Project">
            <div className="App">
              <NavBar/>
              {
                 !initialized ? 
                 <div className='initializedLoader'>
                  <img src={loading} alt="loading"/>
                 </div>:
                <Content/>
                }
            </div>
        </div>
      </>
  );
}

export default App;
