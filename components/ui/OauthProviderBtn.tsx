import { Github } from '@/icons/Github';
import { Google } from '@/icons/GoogleColor';
import React from 'react';
import styled from 'styled-components';

const OauthProvider = () => {
  return (
    <StyledWrapper>
      <div className="shubh-style gap-y-3">
        <button onClick={() => {alert("COMING SOON")}} className="oauthButton">
          <div className='mr-2'>
            <Google/>
          </div>
          Continue with Google
        </button>

        <button onClick={() => {alert("COMING SOON")}} className="oauthButton">
          <div className='mr-2'>
            <Github/>
          </div>
          Continue with Github
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  
  .shubh-style {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form {
    --background: #d3d3d3;
    --bg-color: #fff;
    --main-color: #323232;
    --font-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default OauthProvider;
