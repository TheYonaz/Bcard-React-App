import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import ThemeProvider from "./providers/ThemeProvider";
import ThemeProviders1 from "./providers1/ThemeProviders1";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import UserProviders from "./users/providers/UserProviders";
import { MenuProvider } from "./layout/header/TopNavBar/menu/MenuProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProviders>
          <ThemeProviders1>
            <SnackbarProvider>
              <MenuProvider>
                <Layout>
                  <Router />
                </Layout>
              </MenuProvider>
            </SnackbarProvider>
          </ThemeProviders1>
        </UserProviders>
      </BrowserRouter>
    </div>
  );
}

export default App;
