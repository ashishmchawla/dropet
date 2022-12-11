import React, { useState, useEffect } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import history from "../history";

const Home = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const redirect = () => {
    history.push({
      pathname: "/result",
      state: {
        source: source,
        destination: destination,
      },
    });
  };

  return (
    <div className="home">
      <IonList>
        <IonItem>
          <IonLabel position="floating">From</IonLabel>
          <IonInput
            placeholder="Enter source"
            onIonInput={(e: any) => setSource(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">To</IonLabel>
          <IonInput
            placeholder="Enter destination"
            onIonInput={(e: any) => setDestination(e.target.value)}
          ></IonInput>
        </IonItem>

        <br />
        <IonButton shape="round" onClick={redirect}>
          Search
        </IonButton>
      </IonList>
    </div>
  );
};

export default Home;
