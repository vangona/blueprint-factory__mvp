import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";
import GuideMain from "pages/guide/GuideMain";
import GuideValue from "pages/guide/GuideValue";
import ValueFinder from "pages/value/ValueFinder";
import BlueprintFactory from "pages/blueprint/BlueprintFactory";
import Survey from "pages/Survey";
import ValueResult from "pages/value/ValueResult";
import Blueprint from "pages/blueprint/Blueprint";
import Signout from "./common/Signout";
import QuestionSelector from "pages/value/QuestionSelector";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={ <Home /> } 
        />

        <Route 
          path="/guide/main" 
          element={ <GuideMain /> } 
        />
        <Route 
          path="/guide/value" 
          element={ <GuideValue />}  
        />

        <Route 
          path="/value/selector" 
          element={ <QuestionSelector /> } 
        />
        <Route 
          path="/value/question/:id" 
          element={ <ValueFinder /> } 
        />
        <Route 
          path="/value/result/:id" 
          element={ <ValueResult /> } 
        />

        <Route
          path="/factory/:type"
          element={ <BlueprintFactory /> }
        />
        <Route
          path="/factory/:type/:id"
          element={ <BlueprintFactory /> }
        />

        <Route 
          path="/blueprint" 
          element={ <Blueprint /> } 
        />
        <Route 
          path="/survey" 
          element={ <Survey /> } 
        />
        <Route 
          path="/signout" 
          element={ <Signout /> } 
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
