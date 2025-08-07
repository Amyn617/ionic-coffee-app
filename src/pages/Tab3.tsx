import { IonContent, IonHeader, IonPage, IonIcon, IonImg } from "@ionic/react";
import { grid } from "ionicons/icons";
import "./Tab3.css";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>
        <IonHeader>
          <div className="header-row">
            <IonIcon aria-hidden="true" icon={grid} className="grid-button" />
            <h1>Favourite</h1>
            <div className="profile-wrapper">
              <IonImg src="profile.jpg" className="profile-img" />
            </div>
          </div>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
