<ConfigCatProvider
  sdkKey="#YOUR_SDK_KEY"
  options={{
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
></ConfigCatProvider>;
