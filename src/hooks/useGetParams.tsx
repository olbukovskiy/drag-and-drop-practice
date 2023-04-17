import { useState } from "react";
import { RootStore } from "../redux/store";
import { useAppSelector } from "./redux-hooks";
import { selectCurrentIssues } from "../redux/selectors";
import { Issue } from "../types";

type DropData = {
  index?: number;
  state?: string;
};

const useGetParams = (name: string) => {
  const [dropData, setDropData] = useState<DropData>({});

  const currentStateIssues: Issue[] = useAppSelector((state: RootStore) => {
    return selectCurrentIssues(state, name);
  });

  const dragOverHandler = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();

    let dropElementIndex: number = currentStateIssues.length;
    let offset: number = Number.NEGATIVE_INFINITY;
    let draggableElement: Element | null = null;

    const nodeElementsArray = document
      .querySelector(`[data-name="${name}"]`)
      ?.querySelectorAll(".draggable");

    nodeElementsArray?.forEach((element) => {
      const { top, height } = element.getBoundingClientRect();
      const currentOffset = event.clientY - top - height;

      if (currentOffset < 0 && currentOffset > offset) {
        offset = currentOffset;
        draggableElement = element;
      }
    });

    if (draggableElement == null) {
      dropElementIndex = currentStateIssues.length;
    } else {
      const targetIndex = currentStateIssues.findIndex((item) => {
        return item.id === draggableElement?.id;
      });

      if (targetIndex !== -1) {
        dropElementIndex = targetIndex;
      }
    }

    const dropChangeData = {
      index: dropElementIndex,
      state: name,
    };

    setDropData(dropChangeData);
  };

  return { dragOverHandler, dropData, currentStateIssues };
};

export default useGetParams;
