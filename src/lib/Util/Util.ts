import { Piece, PieceOptions } from "klasa";
import { GideonClient } from "../../index";

type PieceConstructor = new (...args: any[]) => Piece;

export const applyOptions = 
  <O extends PieceOptions>(opts: O) =>
  <T extends PieceConstructor>(Klass: T) =>
	  // @ts-ignore
    class extends Klass {
      constructor(...args: [GideonClient, any, any, any]) {
        super(args[0], args[1], args[2], opts);
      }
    };