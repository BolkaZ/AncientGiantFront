import { CatalogPage } from "../pages/catalog/Catalog";
import { DetailPage } from "../pages/catalog/detail/Detail";
import { GuestPage } from "../pages/guest/Guest";
import {AuthorizationPage} from '../pages/user/authorization/AuthorizationPage.tsx';
import {RegistrationPage} from '../pages/user/registration/AuthorizationPage.tsx';
import {UserBidListPage} from '../pages/user/bids/UserBidsPage.tsx';
import {UserProfilePage} from '../pages/user/profile/UserProfilePage.tsx';
import { BidDetailsPage } from "../pages/user/bid/BidPage.tsx";
import { PeriodListModerationPage } from "../pages/moderator/periods/PeriodsList.tsx";
import { PeriodFormPage } from "../pages/moderator/period-form/PeriodsForm.tsx";


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
    USER_PROFILE = '/user',
    USER_BID = '/user/bid/:bidId',
    MODERATION_PERIODS = '/moderation_periods',
    MODERATION_PERIOD_UPDATE = '/moderation_periods/:periodId',
    MODERATION_PERIOD_CREATE = '/moderation_periods/create'
}

export const dynamicLinks = {
    catalogDetail: (id: string | number) => `/catalog/${id}`,
    userBid: (id: string | number) => `/user/bid/${id}`,
    moderationPeriodUpdateCreate: (id: string | number) => `/moderation_periods/${id}`
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

const BidProfileRoute: TRoute = {
  path:staticLinks.USER_BID,
  element: <BidDetailsPage />
}

const ModerationPeriodsListRoute: TRoute = {
  path:staticLinks.MODERATION_PERIODS,
  element: <PeriodListModerationPage />
}

const ModerationPeriodsCreateRoute: TRoute = {
  path:staticLinks.MODERATION_PERIOD_CREATE,
  element: <PeriodFormPage />
}

const ModerationPeriodsUpdateRoute: TRoute = {
  path:staticLinks.MODERATION_PERIOD_UPDATE,
  element: <PeriodFormPage />
}

export const routes: TRoute[] = [
     guestRote,
     catalogRote,
     detailRoute,
     authorizationRoute,
      registrationRoute,
      userBidsRoute,
  userProfileRoute,
  BidProfileRoute,
  ModerationPeriodsListRoute,
  ModerationPeriodsCreateRoute,
  ModerationPeriodsUpdateRoute
]