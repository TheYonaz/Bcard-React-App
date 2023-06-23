import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES, { SANDBOX_ROUTES } from "./routesModel";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignUpPage from "../users/pages/SignUpPage";
import LogInPage from "../users/pages/LogInPage";
import SandboxMenu from "../sandbox/SandboxMenu";
import Template from "../sandbox/components/Template";
import ComponentMenu from "../sandbox/components/ComponentMenu";
import Logic from "../sandbox/components/Logic";
import Styles from "../sandbox/components/styles/Styles";
import LifeCycleHooks from "../sandbox/life-cycle-hooks/LifeCycleHooksMenu";
import InitialCycle from "../sandbox/life-cycle-hooks/InitialCycle";
import UseEffectAsComponentDidMount from "../sandbox/life-cycle-hooks/UseEffectAsComponentDidMount";
import UseStateCycle from "../sandbox/life-cycle-hooks/UseStateCycle";
import UseEffectAsComponentDidUpdate from "../sandbox/life-cycle-hooks/UseEffectAsComponentDidUpdate";
import UseEffectAsComponentWillUnmount from "../sandbox/life-cycle-hooks/UseEffectAsComponentWillUnmount";
import UseEffectNoDependencies from "../sandbox/life-cycle-hooks/UseEffectNoDependencies";
// import LifeCycleExe from "../sandbox/life-cycle-hooks/LifeCycleExe";
import CustomHookMenu from "../sandbox/custom-hooks/CustomHookMenu";
import CustomCounterHook from "../sandbox/custom-hooks/CustomCounterHook";
import CustomName from "../sandbox/custom-hooks/CustomName1";
import Memoization from "../sandbox/memoization/Memoization";
import UseCallback from "../sandbox/memoization/use-callback/UseCallback";
import UseMemo from "../sandbox/memoization/use-memo/UseMemo";
import ContextMenu from "../sandbox/context/ContextMenu";
import A from "../sandbox/context/components/A";
import SnackExample from "../sandbox/context/SnackExample";
import LifecycleExe1 from "../sandbox/life-cycle-hooks/practice-07-05/LifecycleExe1";
import CardEditPage from "../cards/pages/CardEditPage";
import CardsPage from "../cards/pages/CardsPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import CreateCardPage from "../cards/pages/CreateCardPage";
import MyCardsPage from "../cards/pages/MyCardsPage";
import FavCardsPage from "../cards/pages/FavCardsPage";
import UserEditPage from "../users/pages/UserEditPage";




const {
  ROOT,
  ABOUT,
  CARDS,
  FAV_CARDS,
  MY_CARDS,
  SIGNUP,
  LOGIN,
  CARD_DETAIL,
  SANDBOX,
  EDIT_CARD,CREATE_CARD
} = ROUTES;
const Router = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<CardsPage />} />
      <Route path={ABOUT} element={<AboutPage />} />
      <Route path={CARDS} element={<CardsPage />} />
      <Route path={FAV_CARDS} element={<FavCardsPage />} />
      <Route path={MY_CARDS} element={<MyCardsPage />} />
      <Route path={CREATE_CARD} element={<CreateCardPage />} />
      <Route path={`${EDIT_CARD}/:cardId`} element={<CardEditPage />} />
      <Route path={SIGNUP} element={<SignUpPage />} />
      <Route path={LOGIN} element={<LogInPage />} />
      <Route path={ROUTES.EDIT_USER} element={<UserEditPage />} />
      <Route path={`${CARD_DETAIL}/:cardId`} element={<CardDetailsPage />} />

      <Route path={SANDBOX} element={<SandboxMenu />} />
      <Route path={ROUTES.SANDBOX} element={<SandboxMenu />}>
        <Route path={SANDBOX_ROUTES.COMPONENT} element={<ComponentMenu />}>
          <Route path={SANDBOX_ROUTES.TEMPLATE} element={<Template />} />
          <Route path={SANDBOX_ROUTES.LOGIC} element={<Logic />} />
          <Route path={SANDBOX_ROUTES.STYLES} element={<Styles />} />
        </Route>
        <Route path={SANDBOX_ROUTES.LIFECYCLE} element={<LifeCycleHooks />}>
          <Route path={SANDBOX_ROUTES.INITIAL} element={<InitialCycle />} />
          <Route path={SANDBOX_ROUTES.USE_STATE} element={<UseStateCycle />} />
          <Route
            path={SANDBOX_ROUTES.DID_MOUNT}
            element={<UseEffectAsComponentDidMount />}
          />
          <Route
            path={SANDBOX_ROUTES.DID_UPDATE}
            element={<UseEffectAsComponentDidUpdate />}
          />
          <Route
            path={SANDBOX_ROUTES.WILL_UNMOUNT}
            element={<UseEffectAsComponentWillUnmount />}
          />
          <Route
            path={SANDBOX_ROUTES.NO_DEPENDENCIES}
            element={<UseEffectNoDependencies />}
          />
          <Route
            path={SANDBOX_ROUTES.LIFECYCLE_EXE}
            element={<LifecycleExe1 />}
          />
        </Route>
        <Route path={SANDBOX_ROUTES.CUSTOM} element={<CustomHookMenu />}>
          <Route
            path={SANDBOX_ROUTES.CUSTOM_COUNTER}
            element={<CustomCounterHook />}
          />
          <Route path={SANDBOX_ROUTES.CUSTOM_NAME} element={<CustomName />} />
        </Route>
        <Route path={SANDBOX_ROUTES.MEMOIZATION} element={<Memoization />}>
          <Route path={SANDBOX_ROUTES.USECALLBACK} element={<UseCallback />} />
          <Route path={SANDBOX_ROUTES.USEMEMO} element={<UseMemo />} />
        </Route>
        <Route path={SANDBOX_ROUTES.CONTEXT} element={<ContextMenu />}>
          <Route path={SANDBOX_ROUTES.NAME} element={<A />} />
          <Route path={SANDBOX_ROUTES.SNACK} element={<SnackExample />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
