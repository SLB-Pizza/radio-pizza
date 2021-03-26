import firebase from "gatsby-plugin-firebase";
import { useObjectVal } from "react-firebase-hooks/database"

// export const DB = firebase.database && firebase.database();

// export const remoteMarquee = DB?.ref("/liveStreamMarquee");

export const updateRemoteMarquee = (key, data) => {
    return firebase.database().ref("/liveStreamMarquee").child(key).update(data);
};

export const getRemoteMarquee = async () => {
	const [value, loading, error] = await useObjectVal( firebase.database().ref("liveStreamMarquee") );

	console.log( 'value', value );

	return value;
}
