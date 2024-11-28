import axios from "axios";

export const findCharactersByName = async (name, offset, limit) => {
  try {
    const { data } = await axios.get("/data/characters/by-name", {params: {name, offset, limit}});
    return data.data
  } catch (error) {
    console.error(error)
    return undefined;
  }
}

export const findComicsByCharacter = async (id, offset, limit) => {
  try {
    const { data } = await axios.get(`/data/characters/${id}/comics`, {params: { offset, limit}});
    return data.data
  } catch (error) {
    console.error(error)
    return undefined;
  }
}