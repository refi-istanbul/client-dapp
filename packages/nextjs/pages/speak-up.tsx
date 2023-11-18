import type { NextPage } from "next";
import {SpeakUpForm} from "~~/components/speak-up/speak.up.form";
import {useEffect, useState} from "react";
import {initWakuContext, WakuContext} from "~~/services/waku/context";
import {Root} from "~~/services/waku/proto/root";
import {createRoot} from "~~/services/waku/interactions";
import Image from "next/image";

const PLACEHOLDER_IMAGE= "https://www.shutterstock.com/image-vector/motivational-quote-speak-up-drawn-260nw-1927581692.jpg";

const SpeakUp: NextPage = () => {

  const [wakuGlobalContext, setWakuGlobalContext] = useState<WakuContext>();

  const[sideImageURL, setImageURL] = useState<string>(PLACEHOLDER_IMAGE);

  const submit = async (speakUpFormData: any) => {
      console.log("SpeakUpFormData", speakUpFormData);
      await createRoot(wakuGlobalContext!.node, wakuGlobalContext!.rootEncoderDecoder.encoder, speakUpFormData);
  }

  const updateImageURL = async(imageURLUpdated: string) => {
      imageURLUpdated.length > 0 ? setImageURL(imageURLUpdated) : setImageURL(PLACEHOLDER_IMAGE);
  };

    useEffect(() => {
        (async () => {
            const wakuGlobalContext: WakuContext = await initWakuContext({
                onRootReceived: () => {},
                onLikeReceived: () => {},
            });
            setWakuGlobalContext(wakuGlobalContext);
            console.info("Speak up page waku instance instantiated !");
        })();
    }, []);

  return (
    <>
      <div className="grid grid-cols-2 p-10 ml-5">
        <div className="flex py-8">
          <SpeakUpForm onSubmit={submit} onImageURLChange={updateImageURL} />
        </div>
        <div className="flex py-4">
            <div className="w-full flex flex-row items-center justify-center">
                <Image src={sideImageURL} width={400} height={250} alt="image"/>
            </div>
        </div>
      </div>
    </>
  );
};

export default SpeakUp;
