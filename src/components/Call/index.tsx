import { useRef, useState } from "react";
import {
  Container,
  Wrapper,
  EnterPage,
  CallPage,
  LocalUser,
  Label,
} from "./style";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../server/firebase";

interface RefProps {
  srcObject: MediaStream;
}

function Call() {
  const [state, setState] = useState(false);
  const [inputid, setInputId] = useState("");
  const [roomId, setRoomId] = useState("");
  const localRef = useRef<RefProps>();
  const remoteRef = useRef<RefProps>();

  async function createRoom() {
    setState(true);
    const constants = { audio: true, video: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constants);
    const remoteStream = new MediaStream();
    const roomRef = await addDoc(collection(db, "rooms"), {});
    setRoomId(roomRef.id);

    if (localRef.current && mediaStream) {
      localRef.current.srcObject = mediaStream;
    }
    if (remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
    }
  }
  async function copyText() {
    await navigator.clipboard.writeText(roomId).then(() => {
      alert("copy!!");
    });
  }
  async function enterRoom(roomId: string) {
    setState(true);
    const constants = { audio: true, video: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constants);
    const remoteStream = new MediaStream();
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (localRef.current && mediaStream) {
      localRef.current.srcObject = mediaStream;
    }
    if (remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
    }
  }
  return (
    <Wrapper>
      <Container>
        {!state ? (
          <EnterPage>
            <h2>Enter Your Room Key</h2>
            <label>
              <input
                type="text"
                value={inputid}
                onChange={(e) => {
                  setInputId(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  enterRoom(roomId);
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
            <Label onClick={copyText}>{roomId}</Label>
          </CallPage>
        )}
      </Container>
    </Wrapper>
  );
}
export default Call;
