import Character from "./Character";

class CharacterFactory {
  static create(count: number = 1) {
    return new Array(count).fill(null).map(() => new Character());
  }
}

export default CharacterFactory;
