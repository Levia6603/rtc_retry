import { useRef, useState } from "react";
import {
  Container,
  Wrapper,
  EnterPage,
  CallPage,
  LocalUser,
  Label,
  RemoteUser,
} from "./style";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, pc } from "../../server/firebase";

interface RefProps {
  srcObject: MediaStream;
}

function Call() {
  const [state, setState] = useState(false);
  const [inputid, setInputId] = useState("");
  const [roomId, setRoomId] = useState("");
  const localRef = useRef<RefProps>();
  const remoteRef = useRef<RefProps>();

  async function collectIceCandidate(
    roomRef: DocumentReference<DocumentData, DocumentData>,
    localName: string,
    remoteName: string
  ) {
    const candidatesRef = collection(roomRef, localName);
    try {
      pc.onicecandidate = async (event) => {
        event.candidate &&
          (await addDoc(candidatesRef, event.candidate.toJSON()));
        pc.onicecandidateerror = (err) => {
          console.log("error", err);
        };
        const remoteCandidateRef = collection(roomRef, remoteName);
        onSnapshot(remoteCandidateRef, (snap) => {
          snap.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const data = change.doc.data();
              await pc.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
      };
    } catch (err) {
      console.log(err);
    }
  }

  async function createRoom() {
    setState(true);
    const constants = { audio: true, video: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constants);
    const remoteStream = new MediaStream();
    const roomRef = await addDoc(collection(db, "rooms"), {});
    setRoomId(roomRef.id);

    collectIceCandidate(roomRef, "hostCandidate", "guestCandidate");

    mediaStream.getTracks().forEach((track) => {
      pc.addTrack(track, mediaStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (localRef.current && mediaStream) {
      localRef.current.srcObject = mediaStream;
    }
    if (remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
    }

    const offerDescription = await pc.createOffer();
    const offer = {
      type: offerDescription.type,
      sdp: offerDescription.sdp,
    };

    await pc.setLocalDescription(offerDescription);
    await setDoc(roomRef, { offer });

    onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !pc.currentRemoteDescription) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(rtcSessionDescription);
      }
    });
  }
  async function enterRoom(roomId: string) {
    setState(true);
    const constants = { audio: true, video: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constants);
    const remoteStream = new MediaStream();
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists()) {
      alert("無此房間!");
      return;
    }

    collectIceCandidate(roomRef, "guestCandidate", "hostCandidate");

    mediaStream.getTracks().forEach((track) => {
      pc.addTrack(track, mediaStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (localRef.current && mediaStream) {
      localRef.current.srcObject = mediaStream;
    }
    if (remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
    }

    const offer = roomSnapshot.data()?.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    await updateDoc(roomRef, { answer });
  }
  async function copyText() {
    await navigator.clipboard.writeText(roomId).then(() => {
      alert("copy!!");
    });
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
                  enterRoom(inputid);
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
            <RemoteUser
              ref={remoteRef as React.LegacyRef<HTMLVideoElement>}
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
