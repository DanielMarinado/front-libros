//import { useMemo, useLayoutEffect } from "react";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useCurrentItemHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { header } = useSelector((state) => ({ ...state }));
  const [key, setKey] = useState(null);

  const dispatchKey = useCallback(
    (payload) => dispatch({ type: "SET_KEY_ITEM", payload }),
    [dispatch]
  );

  const checkCurrentPage = useCallback(() => {
    const availablePages = {
      home: "home",
      shop: "shop",
      cart: "cart",
      register: "register",
      login: "login",
      user: "user-dash",
      admin: "user-admin",
    };

    const defaultPage = header || "home";
    const currentPage = history.location.pathname.split("/")[1];
    const payload = availablePages[currentPage] || defaultPage;
    dispatchKey(payload);
  }, [dispatchKey, header, history.location.pathname]);

  const checkIfKeyContainsValue = useCallback(
    () => !key && checkCurrentPage(),
    [checkCurrentPage, key]
  );

  // ciclo de vida: mount, update, willunmount
  useEffect(() => checkIfKeyContainsValue(), [checkIfKeyContainsValue]);

  return { setKey: (key) => setKey(dispatchKey(key)) };
};

export default useCurrentItemHeader;

// useCallback: memoriza un callback optimizado => checkCurrentPage
// useMemo: memoriza los valores retornados de un callback => "home", etc...
// useEffect: mejor performance vs useLayoutEffect
