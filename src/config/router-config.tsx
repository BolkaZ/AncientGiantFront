import { CatalogPage } from "../pages/catalog/Catalog";
import { DetailPage } from "../pages/catalog/detail/Detail";
import { GuestPage } from "../pages/guest/Guest";


type TRoute = {
    path: staticLinks;
    element: JSX.Element;
}

export enum staticLinks  {
    GUEST='/',
    CATALOG= '/catalog',
    CATALOG_DETAIL= '/catalog/:id'
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

export const routes: TRoute[] = [
     guestRote,
     catalogRote,
     detailRoute
]