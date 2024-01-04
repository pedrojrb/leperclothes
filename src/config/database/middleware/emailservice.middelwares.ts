import { createToken } from "./generateToken";

type THtml = `<h1>Confirmation code - Eleper Clothes</h1> <br> <p>Insert code: ${number}</p>`;

export function getRandomCode(min: number = 11111, max: number = 99999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export function getHTMLformattedForEmail(): THtml{

  let randomCode: number = getRandomCode();
  let html: THtml = `<h1>Confirmation code - Eleper Clothes</h1> <br> <p>Insert code: ${randomCode}</p>`;
  return html;
  }

  