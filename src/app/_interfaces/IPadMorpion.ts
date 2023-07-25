import {MorpionKey} from "../_enums/MorpionKey";

export interface IPadMorpion {
  //Touches is a map of the 9 cells of the morpion. They have states boolean (true if marked, false if not marked)
  //we have midLeft, center, midRight, topMid, topLeft, topRight, bottomMid, bottomLeft, bottomRight
  touches: Map<MorpionKey, boolean>;
}
