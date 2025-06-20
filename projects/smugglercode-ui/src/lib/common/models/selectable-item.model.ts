export interface SelectableItem<T> {
  label: string | undefined | null;
  itemRef: T;
  isSelected: boolean;
}
