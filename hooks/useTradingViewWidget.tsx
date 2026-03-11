'use client'
import { useEffect, useRef } from "react"

const useTradingViewWidget = (
  scriptUrl: string, 
  config: Record<string, unknown>,
  height: number | string
) => {
  const containerRef = useRef<HTMLDivElement | null >(null);
  // this pointer is only allowed to point to a standard HTML div
  // starts as null because the div does not exist the very millisecond the code starts
      useEffect(() => {
        // error handling
        if(!containerRef.current) return;

        // avoid double-loads
        if(containerRef.current.dataset.loaded) return;
        containerRef.current.dataset.loaded = 'true';

        // inject new div
        containerRef.current.innerHTML = 
        `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

        // We give it the web address for TradingView, tell it to load asynchronously so it does not freeze your website, and convert your settings object into pure text to put inside the script.
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.innerHTML = JSON.stringify(config);

        // attach that newly built script tag to our div
        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        //clean up function
        return () => {
          if(containerRef.current) {
            containerRef.current.innerHTML = "";
            delete containerRef.current.dataset.loaded;
          }
        }

      }, [scriptUrl, config, height]
    );

  return containerRef;
}

export default useTradingViewWidget
