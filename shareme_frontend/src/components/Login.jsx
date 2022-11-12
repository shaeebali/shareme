
// import GoogleLogin from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from "jwt-decode";

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    //console.log(response);
    let decoded = jwt_decode(response.credential)
    //console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture } = decoded;
    const { client_id } = response;
    /* console.log(name);
    console.log(client_id);
    console.log(picture); */
    const doc = {
      _id: client_id,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            {/* <GoogleLogin
             
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onError={responseGoogle}
              cookiePolicy="single_host_origin"
            /> */}
            <GoogleLogin className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onSuccess={credentialResponse => {
                responseGoogle(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />;
          </div>
        </div>
      </div>
    </div>
  </GoogleOAuthProvider> 
  );
};

export default Login;
