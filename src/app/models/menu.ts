
export class Menu {
  name: string;
  url: string;
  icon: string;
  type: MenuType;
}

export type MenuType = 'divider' | 'menu';
