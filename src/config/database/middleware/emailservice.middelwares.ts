type THtml = string;

export function getRandomCode(min: number = 11111, max: number = 99999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  export function getHTMLformattedForEmail(){
    let html: THtml = `<h1>Confirmation code - Eleper Clothes</h1> <br> <p>Insert code: ${getRandomCode()}</p> <br> <button>Go to link</button>`;
    return html;
  }

  