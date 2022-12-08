import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";

const Home = () => {
  return (
    <div className="home">
      <IonList>
        <IonItem>
          <IonLabel position="floating">From</IonLabel>
          <IonInput placeholder="Enter source"></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">To</IonLabel>
          <IonInput placeholder="Enter destination"></IonInput>
        </IonItem>

        <br />
        <IonButton shape="round">Search</IonButton>
      </IonList>
    </div>
  );
};

export default Home;
