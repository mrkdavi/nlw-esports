export interface RouteParams {
  id: string;
  name: string;
  bannerUrl: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      ads: RouteParams;
    }
  }
}