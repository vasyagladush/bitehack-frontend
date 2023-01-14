import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Routes, Route, useSearchParams } from "react-router-dom";

import AboutPage from "./pages/About";
import AuthorizationPage from "./pages/Authorization";
import HomePage from "./pages/Home";

import { RootState } from "./redux/store";

const App: React.FunctionComponent = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("lang") !== i18n.resolvedLanguage) {
      searchParams.set("lang", i18n.resolvedLanguage);
      setSearchParams(searchParams);
    }
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const lang = searchParams.get("lang") || "";
    if (lang && lang !== i18n.resolvedLanguage) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams]);

  // const currentUserId = useSelector<RootState>(
  //   (store) => store.user.authUser._id
  // );

  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        {/* <Route
          path="/about"
          element={currentUserId ? <AboutPage /> : <AuthorizationPage />}
        />
        <Route
          path="/authorization"
          element={currentUserId ? <HomePage /> : <AuthorizationPage />}
        /> */}
      </Routes>
    </div>
  );
};

export default App;
