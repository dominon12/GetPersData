import { Story } from "../Types/Types";
import Background1 from "../Assets/Stories/Background1.jpeg";
import Background2 from "../Assets/Stories/Background2.jpeg";
import Background3 from "../Assets/Stories/Background3.jpeg";
import Background4 from "../Assets/Stories/Background4.jpeg";
import Background5 from "../Assets/Stories/Background5.jpeg";
import Background6 from "../Assets/Stories/Background6.jpeg";
import { TFunction } from "react-i18next";

const stories: Story[] = [
  {
    id: 1,
    backgroundSrc: Background1,
    text: "stories.intro",
  },
  {
    id: 2,
    backgroundSrc: Background2,
    text: "stories.emailField",
  },
  {
    id: 3,
    backgroundSrc: Background3,
    text: "stories.redirectUrlField",
  },
  {
    id: 4,
    backgroundSrc: Background4,
    text: "stories.hideUrlAddressOption",
  },
  {
    id: 5,
    backgroundSrc: Background5,
    text: "stories.riskyOptions",
  },
  {
    id: 6,
    backgroundSrc: Background6,
    text: "stories.final",
  },
];

export const getStories = (t: TFunction<"translation">) =>
  stories.map((story) => ({ ...story, text: t(story.text) }));
