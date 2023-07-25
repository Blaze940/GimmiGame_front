import { Injectable } from '@angular/core';
import {MorpionKey} from "../_enums/MorpionKey";
import {IMorpionCoordinates} from "../_interfaces/IMorpionCoordinates";

@Injectable({
  providedIn: 'root'
})
export class MorpionService {
  keyToCoordinatesMap : Map<MorpionKey,IMorpionCoordinates> = new Map([
    [MorpionKey.BottomLeft,{x:0,y:200}],
    [MorpionKey.BottomMid,{x:100,y:200}],
    [MorpionKey.BottomRight,{x:200,y:200}],
    [MorpionKey.Center,{x:100,y:100}],
    [MorpionKey.MidLeft,{x:0,y:100}],
    [MorpionKey.MidRight,{x:200,y:100}],
    [MorpionKey.TopLeft,{x:0,y:0}],
    [MorpionKey.TopMid,{x:100,y:0}],
    [MorpionKey.TopRight,{x:200,y:0}],
  ])

  constructor() { }

  getCoordinatesFromKey(key : MorpionKey) : IMorpionCoordinates | undefined{
    return this.keyToCoordinatesMap.get(key)
  }

  getKeyFromCoordinates(coordinates : IMorpionCoordinates) : MorpionKey | undefined{
    for(let [key, value] of this.keyToCoordinatesMap.entries()){
      if(value.x === coordinates.x && value.y === coordinates.y){
        return key
      }
    }
    return undefined
  }

}
