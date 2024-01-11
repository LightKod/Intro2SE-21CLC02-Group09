import deckData from "./deckData";

const courseData = [
    {
        courseName: "Course A",
        courseDescription: "1 decks",
        userName: "Creator 1",
        createDate: "10/10/2022",
        decks: [
          deckData[0],
        // ... more decks for Course A
      ],
    },
    {
        courseName: "Course B",
        courseDescription: "4 decks",
        userName: "Creator 2",
        createDate: "11/10/2022",
        decks: [
          deckData[1],
          deckData[2],
          deckData[3],
          deckData[4],
        // ... more decks for Course B
      ],
    },
    // ... more courses
  ];
  
  export default courseData;
  
