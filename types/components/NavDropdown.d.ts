import * as React from 'react';

import Dropdown from './Dropdown';

import { ReplaceProps, PropsOf } from './helpers';

interface NavDropdownProps {
  id: string;
  title: string;
  disabled?: boolean;
  active?: boolean;
  menuRole?: string;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

declare class NavDropdown extends React.Component<
  ReplaceProps<typeof Dropdown, NavDropdownProps>
> {
  static Item: typeof Dropdown.Item;
  static Divider: typeof Dropdown.Divider;
  static Header: typeof Dropdown.Header;
}

export default NavDropdown;
