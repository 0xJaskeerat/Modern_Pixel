import { randomPrompts } from "../constants";

export const getRandomPrompt = (prompt) => {
    const randomIdx = Math.floor(Math.random() * randomPrompts.length);
    const randomPrompt = randomPrompts[randomIdx];

    // to avoid getting same random prompt
    if(randomPrompt === prompt) getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
  }