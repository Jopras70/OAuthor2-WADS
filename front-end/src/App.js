import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          appId="1213680142676788"
          onResolve={(response) => {
            console.log(response);
            const accessToken = response.data.accessToken;
          
            // Sent access token to backend
            axios
              .post('http://localhost:3000/oauth2-app', { accessToken })
              .then((response) => {
                const profile = response.data;
                setProfile(profile);
              })
              .catch((error) => {
                console.error(error);
              });
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}

      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;