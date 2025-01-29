import { CatalogPage } from "../pages/catalog/Catalog";
import { DetailPage } from "../pages/catalog/detail/Detail";
import { GuestPage } from "../pages/guest/Guest";
import {AuthorizationPage} from '../pages/user/authorization/AuthorizationPage.tsx';
import {RegistrationPage} from '../pages/user/registration/AuthorizationPage.tsx';
import {UserBidListPage} from '../pages/user/bids/UserBidsPage.tsx';
import {UserProfilePage} from '../pages/user/profile/UserProfilePage.tsx';


type TRoute = {
    path: staticLinks;
    element: JSX.Element;
}

export enum staticLinks  {
    GUEST='/',
    CATALOG= '/catalog',
    CATALOG_DETAIL= '/catalog/:id',
    AUTHORIZATION = '/authorization',
    REGISTRATION = '/registration',
    USER_BIDS = '/user/bids',
    USER_PROFILE = '/user/profile',
}

export const dynamicLinks = {
    catalogDetail: (id: string | number) => `/catalog/${id}`
}


const guestRote: TRoute = {
    path: staticLinks.GUEST,
    element: <GuestPage />
}

const catalogRote: TRoute = {
    path: staticLinks.CATALOG,
    element: <CatalogPage />
}

const detailRoute: TRoute = {
    path: staticLinks.CATALOG_DETAIL,
    element: <DetailPage />
}

const authorizationRoute: TRoute = {
  path: staticLinks.AUTHORIZATION,
  element: <AuthorizationPage />
}

const registrationRoute: TRoute = {
  path: staticLinks.REGISTRATION,
  element: <RegistrationPage />
}

const userBidsRoute: TRoute = {
  path: staticLinks.USER_BIDS,
  element: <UserBidListPage />
}

const userProfileRoute: TRoute = {
  path: staticLinks.USER_PROFILE,
  element: <UserProfilePage />
}

export const routes: TRoute[] = [
     guestRote,
     catalogRote,
     detailRoute,
     authorizationRoute,
      registrationRoute,
      userBidsRoute,
  userProfileRoute
]