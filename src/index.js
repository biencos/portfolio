import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './style.css';

const Home = lazy(() => import('./views/Home'));
const NotFound = lazy(() => import('./views/NotFound'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}>
          {/* Minimalistic CSS spinner */}
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #333',
            borderRadius: '50%',
            width: 40,
            height: 40,
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      }>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={NotFound} path="*" />
        </Switch>
      </Suspense>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
