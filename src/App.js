import "./App.css";
import { useFeatureFlag } from "configcat-react";
import mixpanel from "mixpanel-browser";

function App() {
  const { value: buttonFeature, loading } = useFeatureFlag(
    "buttonFeature",
    false
  );

  // Track and send feature interraction data to Mixpanel
  function handleClick() {
    mixpanel.track("Button feature", { button: "Buy Now" });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      {/* Show button feature only when its feature flag toggled on */}
      {buttonFeature ? (
        <button className="btn" onClick={handleClick}>
          Buy Now
        </button>
      ) : (
        <p>Feature is disabled</p>
      )}
    </div>
  );
}

export default App;
