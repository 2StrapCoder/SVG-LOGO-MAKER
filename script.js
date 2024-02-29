const inquirer = require('inquirer');
const fs = require('fs').promises; 

const askQuestion = async (question) => {
  return inquirer.prompt(question);
};

const generateSVG = async (userInput) => {
  const svgStart = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  const svgEnd = `</svg>`;
  let shapeElement = '';

  switch (userInput.shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="50" fill="${userInput.shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,50 100,150 200,150" fill="${userInput.shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${userInput.shapeColor}" />`;
      break;
  }

  const textElement = `<text x="150" y="115" font-family="Verdana" font-size="35" fill="${userInput.textColor}" text-anchor="middle">${userInput.text}</text>`;
  
  const svgContent = `${svgStart}${shapeElement}${textElement}${svgEnd}`;

  try {
    await fs.writeFile('logo.svg', svgContent);
    console.log('Generated logo.svg');
  } catch (err) {
    console.error('Error writing file:', err);
  }
};

const main = async () => {
  const userInput = {};

  const textResponse = await askQuestion([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3
    }
  ]);
  userInput.text = textResponse.text;

  const textColorResponse = await askQuestion([
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hex):'
    }
  ]);
  userInput.textColor = textColorResponse.textColor;

  const shapeResponse = await askQuestion([
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square']
    }
  ]);
  userInput.shape = shapeResponse.shape.toLowerCase();

  const shapeColorResponse = await askQuestion([
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):'
    }
  ]);
  userInput.shapeColor = shapeColorResponse.shapeColor;

  await generateSVG(userInput);
};

main();