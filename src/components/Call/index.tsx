import { useState } from "react";
import { Container, Wrapper, EnterPage } from "./style";

function Call() {
  const [id, setId] = useState("");
  return (
    <Wrapper>
      <Container>
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
            <button type="button" onClick={() => {}}>
              Enter
            </button>
          </label>
          <p>or</p>
          <button type="button">create room</button>
        </EnterPage>
      </Container>
    </Wrapper>
  );
}
export default Call;
