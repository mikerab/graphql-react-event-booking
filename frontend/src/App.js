import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings2';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

//orig
/*function App() {

  return (
*/
class App extends Component {

  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (

      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}>
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {!this.state.token && (<Route path="/" element={<Navigate replace to="/auth" />} />)}
                {this.state.token && <Route path="/" element={<Navigate replace to="/events" />} />}
                {this.state.token && <Route path="/auth" element={<Navigate replace to="/events" />} />}
                {!this.state.token && (
                  <Route path="/auth" Component={AuthPage} />
                )}
                <Route path="/events" Component={EventsPage} />
                {this.state.token && (<Route path="/bookings" Component={BookingsPage} />)}
                {!this.state.token && (<Route path="/bookings" element={<Navigate replace to="/auth" />} />)}
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  };
} 

export default App;
