import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ title, thumbnail, video, creator }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] flex justify-center items-center p-0.5">
            <Image
              source={{
                uri: creator?.avatar
                  ? creator.avatar
                  : "https://cloud.appwrite.io/v1/avatars/initials?name=Mary&project=661c1832e3bc273e3063",
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator?.username ? creator?.username : "Mary"}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{
              uri:
                thumbnail !== undefined
                  ? thumbnail
                  : "https://cloud.appwrite.io/v1/storage/buckets/660d0e59e293896f1eaf/files/660eff632e9b02fe90e3/preview?width=2000&height=2000&gravity=top&quality=100&project=660d0e00da0472f3ad52",
            }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
