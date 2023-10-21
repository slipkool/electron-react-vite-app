import { AxiosResponse } from "axios";
import { useEffect, useRef } from "react";

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: Function,
  returnFunction: Function,
  dependencies: any[] = [],
) => {
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      let isActive = true;
      asyncFn().then((result) => {
        if (isActive) successFunction(result.data);
      });
      return () => {
        returnFunction && returnFunction();
        isActive = false;
      };
    }
    return () => {
      effectRan.current = true;
    };
  }, dependencies);
};
