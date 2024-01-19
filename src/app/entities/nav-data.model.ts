import {
  INavAttributes,
  INavBadge,
  INavLabel,
  INavLinkProps,
  INavWrapper
} from "@coreui/angular/lib/sidebar/sidebar-nav/sidebar-nav";

export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  iconComponent?: any;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
  authorities?: string[];
}
