import React, { useState, useEffect, useContext } from 'react'
import firebase from "gatsby-plugin-firebase";
import { useObjectVal } from "react-firebase-hooks/database"
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';

export const updateRemoteMarquee = (key, data) => {
    return firebase.database().ref("/liveStreamMarquee").child(key).update(data);
};

export const getRemoteMarquee = async () => {
	const globalState = useContext(GlobalStateContext);
	const dispatch = useContext(GlobalDispatchContext)

	const [value, loading, error] = useObjectVal( firebase.database().ref("liveStreamMarquee/marquee") );

	if ( error ) {
		console.error( error );
	}

	if( ( value ) 
		&& ( 
			( value.liveShowTitle !== globalState.liveMarquee.liveShowTitle ) 
			|| ( value.liveShowGuests !== globalState.liveMarquee.liveShowGuests )
		) 
	) {
		await dispatch({
			type: 'MARQUEE_UPDATE',
			payload: {
				marquee: value,
			}
		})
	}

	if ( ! loading ){
		return value;
	}
}
