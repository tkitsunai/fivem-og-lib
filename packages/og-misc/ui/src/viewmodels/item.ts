export interface Item {
  name: string;
  tags: string[];
}

export interface ItemAction {
  selectItem: (itemName: string) => void;
}
