'use babel';

import {Enum} from 'enumify';

export default class SpotifyCommands extends Enum {};

// Straight cribbed from https://github.com/hnarayanan/shpotify/blob/master/spotify#L72-L99
SpotifyCommands.initEnum({
  GET_SONG: {
    value: 'tell application "Spotify" to name of current track as string'
  },
  GET_ALBUM: {
    value: 'tell application "Spotify" to album of current track as string'
  },
  GET_ARTIST: {
    value: 'tell application "Spotify" to artist of current track as string'
  },
  GET_PLAYER_STATE: {
    value: 'tell application "Spotify" to player state as string'
  },
  GET_SONG_POSITION: {
    value: `tell application "Spotify"
            set pos to player position
            set nM to (round (pos / 60) rounding down) as text
            if length of ((round (pos mod 60) rounding down) as text) is greater than 1 then
                set nS to (round (pos mod 60) rounding down) as text
            else
                set nS to ("0" & (round (pos mod 60) rounding down)) as text
            end if
            set nowAt to nM as text & ":" & nS as text
            end tell
            return nowAt`
  },
  GET_SONG_DURATION: {
    value: `tell application "Spotify"
            set durSec to (duration of current track / 1000) as text
            set tM to (round (durSec / 60) rounding down) as text
            if length of ((durSec mod 60 div 1) as text) is greater than 1 then
                set tS to (durSec mod 60 div 1) as text
            else
                set tS to ("0" & (durSec mod 60 div 1)) as text
            end if
            set myTime to tM as text & ":" & tS as text
            end tell
            return myTime`
  },
  TURN_OFF_REPEAT: {
    value: 'tell application "Spotify" to repeating'
  },
  TURN_ON_REPEAT: {
    value: 'tell application "Spotify" to set repeating to not repeating'
  },
  TURN_OFF_SHUFFLE: {
    value: 'tell application "Spotify" to set shuffling to not shuffling'
  },
  TURN_ON_SHUFFLE: {
    value: 'tell application "Spotify" to shuffling'
  },
  IS_SHUFFLING: {
    value: 'tell application "Spotify" to shuffling'
  },
  IS_REPEATING: {
    value: 'tell application "Spotify" to repeating'
  }
})
