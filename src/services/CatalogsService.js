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

export const findComicsByName = async (name, offset, limit) => {
  try {
    const { data } = await axios.get("/data/comics/by-name", {params: {name, offset, limit}});
    return data.data
  } catch (error) {
    console.error(error)
    return undefined;
  }
}

export const findCharactersByComics = async (id, offset, limit) => {
  try {
    const { data } = await axios.get(`/data/comics/${id}/characters`, {params: { offset, limit}});
    return data.data
  } catch (error) {
    console.error(error)
    return undefined;
  }
}

export const findseriesByName = async (name, offset, limit) => {
  try {
    const { data } = await axios.get("/data/series/by-name", {params: {name, offset, limit}});
    return data.data
  } catch (error) {
    console.error(error)
    return undefined;
  }
}

export const findCharactersBySeries = async (id, offset, limit) => {
  try {
    const { data } = await axios.get(`/data/series/${id}/characters`, {params: { offset, limit}});
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