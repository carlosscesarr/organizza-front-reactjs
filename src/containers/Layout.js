import React, { Suspense, useContext, useEffect, lazy } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import PrivateRoute from "./../routes/PrivateRoute";
import routes from "../routes";

import SideBar from "../components/Sidebar";
import ThemedSuspense from "../components/ThemedSuspense";
import Main from "../containers/Main";
import Header from "../components/Header";
import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../pages/404"));

export default function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                if (route.component) {
                  if (route.privateRoute) {
                    <PrivateRoute key={i} exact={true} path={`/app${route.path}`} component={<route.component />}/>;
                  }

                  return (
                    <Route
                      key={i}
                      exact={true}
                      path={`/app${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  );
                }

                return null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
        {/*<Footer />*/}
      </div>
    </div>
  );
}
