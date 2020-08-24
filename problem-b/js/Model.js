'use strict';

import allTweets from './uw_ischool_tweets';

const tweetData = allTweets.map((tweetObj) => {
    let mapObj = {
        text: tweetObj.text,
        timestamp: Date.parse(tweetObj.created_at) 
    }
    return mapObj;
})


export function getRecentTweets(){
    tweetData.sort( (tweet1, tweet2) => {
        tweet1.timestamp - tweet2.timestamp;
    })
    return tweetData.slice(0, 5);
}

export function searchTweets(searchQuery){
    let results = tweetData.filter((tweetObj) => {
        return (
            tweetObj.text
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) >= 0 
        )
    })

    return results;
}