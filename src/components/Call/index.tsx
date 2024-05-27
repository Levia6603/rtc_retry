import { useRef, useState } from "react";
import { Container, Wrapper, EnterPage, CallPage, LocalUser } from "./style";

function Call() {
  const [state, setState] = useState(false);
  const [id, setId] = useState("");
  const localRef = useRef(null);

  async function createRoom() {}
  return (
    <Wrapper>
      <Container>
        {!state ? (
          <EnterPage>
            <h2>Enter Your Room Key</h2>
            <label>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setState(true);
                }}
              >
                Enter
              </button>
            </label>
            <p>or</p>
            <button type="button" onClick={createRoom}>
              create room
            </button>
          </EnterPage>
        ) : (
          <CallPage>
            <LocalUser
              ref={localRef as React.LegacyRef<HTMLVideoElement>}
              muted
              autoPlay
              playsInline
            />
          </CallPage>
        )}
      </Container>
    </Wrapper>
  );
}
export default Call;
