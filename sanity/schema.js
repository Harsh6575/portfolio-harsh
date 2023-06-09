import about from "./schemas/about";
import blockContent from "./schemas/blockContent";
import hero from "./schemas/hero";
import navLinks from "./schemas/navLinks";
import project from "./schemas/project";
import resume from "./schemas/resume";
import services from "./schemas/services";
import socialMedia from "./schemas/socialMedia";
import tag from "./schemas/tag";
import technologies from "./schemas/technologies";
import style from "./tailwind/style";
import colors from "./tailwind/colors";

export const schema = {
  types: [
    blockContent,
    navLinks,
    hero,
    about,
    technologies,
    tag,
    project,
    resume,
    services,
    socialMedia,
    style,
    colors
  ],
}
