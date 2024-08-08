"use client";

import { useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const RAKUTEN_API = "1081304271712371137";
    const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${RAKUTEN_API}&keyword=sample`;

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Rakuten API Data</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
