import { useCallback, useState } from "react";
import { BACKEND_DOMAIN } from "../../../config";
import { FetchParamsModel } from "../../../models/common";
export const useHttp = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const fetchResource = useCallback(
    (fetchBody: FetchParamsModel) => {
      const method = fetchBody.method;
      const url = BACKEND_DOMAIN + fetchBody.url;
      const body = JSON.stringify(fetchBody.data);
      const headers: any = {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      fetch(url, {
        method: method ? method : "GET",
        body,
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          setError(false);
          setLoading(false);
        });
    },
    [error, data, loading]
  );
  return {
    error,
    data,
    loading,
    fetchResource,
  };
};
