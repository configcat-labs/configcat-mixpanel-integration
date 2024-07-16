import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Import Mixpanel and ConfigCat SDK
import mixpanel from "mixpanel-browser";
import { ConfigCatProvider, PollingMode } from "configcat-react";

// Near entry of your product, init Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  // persistence: "localStorage",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigCatProvider
      sdkKey={process.env.REACT_APP_CONFIGCAT_SDK_KEY}
      pollingMode={PollingMode.AutoPoll}
      options={{
        pollIntervalSeconds: 5,
        setupHooks: (hooks) =>
          hooks.on("flagEvaluated", (evaluationDetails) => {
            // Send an `$experiment_started` event.
            mixpanel.track("$experiment_started", {
              "Experiment name": evaluationDetails.key,
              "Variant name": evaluationDetails.value,
              "Variation ID": evaluationDetails.variationId,
            });

            // Use the identify API.
            mixpanel.people.set({
              ["configcat_" + evaluationDetails.key]: evaluationDetails.value,
            });
          }),
      }}
    >
      {/* //Your application or components */}
      <App />
    </ConfigCatProvider>
  </React.StrictMode>
);
