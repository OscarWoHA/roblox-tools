"use client";

import { useState } from "react";

export default function DeepLinkForm() {
  const [placeId, setPlaceId] = useState(0);
  const [launchData, setLaunchData] = useState("");

  const afdp = `roblox://placeId=${placeId}&launchData=${encodeURIComponent(launchData)}`
  const afwebdp = `https://www.roblox.com/games/start?placeId=${placeId}&launchData=${encodeURIComponent(
    launchData
  )}`;
  const url = `http://ro.blox.com/Ebh5?af_dp=${encodeURIComponent(
    afdp
  )}&af_web_dp=${encodeURIComponent(afwebdp)}`;

  return (
    <form className="max-w-lg flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="placeId">Place Id</label>
        <input
        className="border border-gray-300 rounded-md p-1"
          type="number"
          id="placeId"
          name="placeId"
          onChange={({ target: { valueAsNumber } }) =>
            setPlaceId(valueAsNumber)
          }
          value={placeId}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="launchData">Launch Data</label>
        <textarea        className="border border-gray-300 rounded-md p-1"

          id="launchData"
          name="launchData"
          rows={3}
          onChange={({ target: { value } }) => setLaunchData(value)}
          value={launchData}
        />
      </div>

      <a href={url} target="_blank" rel="noreferrer">{url}</a>
    </form>
  );
}
