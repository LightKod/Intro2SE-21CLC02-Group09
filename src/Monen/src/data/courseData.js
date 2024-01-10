// courseData.js
const courseData = [
    {
        courseName: "Course A",
        courseDescription: "1 decks",
        userName: "Creator 1",
        createDate: "10/10/2022",
        decks: [
        {
          deckName: "Deck 1A",
          deckDescription: "Description for Deck 1A",
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
          deckName: "Deck 1B",
          deckDescription: "Description for Deck 1B",
          cards: [
            { front: "Front 1B1", back: "Back 1B1" },
            { front: "Front 1B2", back: "Back 1B2" },
            // ... more cards
          ],
        },
        // ... more decks for Course B
      ],
    },
    // ... more courses
  ];
  
  export default courseData;
  
