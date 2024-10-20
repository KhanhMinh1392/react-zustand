import { ReactNode } from "react";

interface ListComponentProps<T> {
  data: T[];
  renderItems: (item: T, index: number) => ReactNode;
}

export default function ListComponent<T>({
  data,
  renderItems,
}: Readonly<ListComponentProps<T>>) {
  return <>{data.map((item, index) => renderItems(item, index))}</>;
}
