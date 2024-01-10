// courseData.js
const courseData = [
    {
        courseName: "Course A",
        courseDescription: "1 decks",
        userName: "Creator 1",
        createDate: "10/10/2022",
        decks: [
        {
          deckName: "Deck 1",
          deckDescription: "1 term",
          userName: "Creator 1",
          createDate: "12/10/2022",
          cards: [
            { cardFront: "Dolor sit amet", cardBack: "Consectetur adipiscing elit" },
            {
              cardFront: "Ut enim ad minim veniam",
              cardBack: "Sed do eiusmod tempor",
            },
            { cardFront: "Dolor sit amet", cardBack: "Lorem ipsum" },
            { cardFront: "Sed do eiusmod tempor", cardBack: "Dolor sit amet" },
            {
              cardFront: "Consectetur adipiscing elit",
              cardBack: "Ut enim ad minim veniam",
            },
          ],
        },
        // ... more decks for Course A
      ],
    },
    {
        courseName: "Course B",
        courseDescription: "3 decks",
        userName: "Creator 2",
        createDate: "11/10/2022",
        decks: [
          {
            deckName: "Deck 1",
            deckDescription: "1 terms",
            userName: "Creator 1",
            createDate: "10/10/2022",
            cards: [
              { cardFront: "Dolor sit amet", cardBack: "Consectetur adipiscing elit" },
              {
                cardFront: "Ut enim ad minim veniam",
                cardBack: "Sed do eiusmod tempor",
              },
              // ... more cards
            ],
          },  
          {
          deckName: "Deck 2",
          deckDescription: "3 terms",
          userName: "Creator 2",
          createDate: "10/10/2022",
          cards: [
            { cardFront: "Dolor sit amet", cardBack: "Consectetur adipiscing elit" },
            // ... more cards
          ],
        },
        {
          deckName: "Deck 3",
          deckDescription: "1 terms",
          userName: "Creator 2",
          createDate: "15/10/2022",
          cards: [
            { cardFront: "Dolor sit amet", cardBack: "Consectetur adipiscing elit" },
            {
              cardFront: "Ut enim ad minim veniam",
              cardBack: "Sed do eiusmod tempor",
            },
            // ... more cards
          ],
        },
        // ... more decks for Course B
      ],
    },
    // ... more courses
  ];
  
  export default courseData;
  
