import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, dispatch]);

  return null;
}
