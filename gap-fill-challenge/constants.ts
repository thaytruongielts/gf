import { AnswerKey } from './types';

export const STORY_TEXT = `The 1. __________, a kind 2. __________ to a 3. __________, was wearing an 4. __________ outfit: a 5. __________ shirt, 6. __________, 7. __________, and a woolly 8. __________ to protect her from the cold air near the 9. __________. She was visiting the 10. __________ to interview a 11. __________ about his work at the local 12. __________. The Town Hall was usually 13. __________, but today it was strangely 14. __________ and the large hall felt 15. __________.
On the way, she had stopped at the 16. __________ and bought some stamps. She noticed a 17. __________ wearing a thick 18. __________ and 19. __________ despite the weak sun, 20. __________ into his phone. The journalist looked 21. __________ because of her thick coat, but she carried a 22. __________ backpack containing her notes and a camera with a broken lens, which she needed to start 23. __________.
She decided to take a break and walked past the 24. __________ and the 25. __________ towards the 26. __________. She saw a 27. __________ at a nearby café arguing with the 28. __________ about the food, which he said was not 29. __________. The 30. __________, who had a 31. __________ and 32. __________ hair, came out to apologize. The journalist, whose hobby was 33. __________ old postcards and 34. __________ sketches of old buildings, made a note in her 35. __________.
Her brother, a 36. __________, was currently 37. __________ near the 38. __________ after a long week of 39. __________ his guitar. She knew she needed to spend the evening 40. __________ her messy flat and 41. __________ the dishes after dinner, but first, she wanted to visit her friend who lived on a 42. __________ and was currently 43. __________. The journalist hoped the 44. __________ table in her friend's garden was not too 45. __________ to stand on. She made sure her camera was inside a 46. __________ box to protect it. She thought about a new story idea involving her 47. __________ friend and an 48. __________ piece of 49. __________ machinery. Suddenly, the scientist called; the interview was 50. __________ off.`;

export const ANSWERS: AnswerKey = {
  1: "Journalist",
  2: "neighbour",
  3: "pilot",
  4: "elegant",
  5: "striped",
  6: "trousers",
  7: "gloves",
  8: "scarf",
  9: "bridge",
  10: "Town Hall",
  11: "scientist",
  12: "factory",
  13: "crowded",
  14: "quiet",
  15: "empty",
  16: "Post Office",
  17: "tourist",
  18: "uniform",
  19: "sunglasses",
  20: "whispering",
  21: "heavy",
  22: "light",
  23: "repairing",
  24: "market",
  25: "swimming pool",
  26: "museum",
  27: "customer",
  28: "waiter",
  29: "delicious",
  30: "chef",
  31: "beard",
  32: "curly",
  33: "collecting",
  34: "drawing",
  35: "pocket",
  36: "dentist",
  37: "camping",
  38: "stadium",
  39: "practising",
  40: "tidying up",
  41: "washing up",
  42: "farm",
  43: "fishing",
  44: "wooden",
  45: "dangerous",
  46: "square",
  47: "farmer",
  48: "expensive",
  49: "cycling",
  50: "library" 
};

// Note on #50: The text says "interview was 50. _____ off". The answer provided is "library". 
// This seems to be a mismatch in the provided source material (likely "called" vs "library").
// However, per instructions, we implement strict adherence to the key provided. 
// A "smart" hint might be confusing here, so we will handle it gracefully.

export const SOUNDCLOUD_SRC = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2222564864&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
