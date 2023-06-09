"use client";
import React, { use, useEffect } from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";

const query = groq`*[_type == "hero"] {
  _createdAt,
    title,
    body[]{
      children[]{
    ...,
    text,
      marks[]
      }
    }
} | order(_createdAt asc)
`;

const screenHeightThreshold = 500; // Set the screen height threshold in pixels

const Hero = () => {
  const [paragraphs, setParagraphs] = React.useState([]);

  
  useEffect(() => {
    const applyVisibilityClass = () => {
      if (typeof window !== "undefined") {
        const screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        const element = document.getElementById("scroll-about");

        if (screenHeight > screenHeightThreshold) {
          element.classList.add("visible");
          element.classList.remove("hidden");
        } else {
          element.classList.add("hidden");
          element.classList.remove("visible");
        }
      }
    };

    applyVisibilityClass();

    window.addEventListener("resize", applyVisibilityClass);

    return () => {
      window.removeEventListener("resize", applyVisibilityClass);
    };
  }, []);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await client.fetch(query);

        if (response.length === 0) {
          throw new Error("No data found");
        }

        const paragraphs = response.map((hero) => {

          const markClassMap = {
            strong: "text-myPurple",
            underline: "text-myGreen",
            "strike-through": "text-myBlue",
            em: "text-myRed",
            code: "text-myEbony",
            highlight: "text-myViolet",
          };

          const descriptionElements = hero.body[0].children.map((child) => {
            let className = "";

            if (child._type === "span" && child.marks.length > 0) {
              className = child.marks
                .map((mark) => markClassMap[mark])
                .filter((className) => !!className)
                .join(" ");
            }

            return (
              <span key={child._key} className={className}>
                {child.text}
              </span>
            );
          });

          let currentParagraph = [];
          const generatedParagraphs = [];

          descriptionElements.forEach((element) => {
            if (element.text === "\n") {
              generatedParagraphs.push(
                <p key={generatedParagraphs.length}>{currentParagraph}</p>
              );
              currentParagraph = [];
            } else {
              currentParagraph.push(element);
            }
          });

          if (currentParagraph.length > 0) {
            generatedParagraphs.push(
              <p key={generatedParagraphs.length}>{currentParagraph}</p>
            );
          }

          return generatedParagraphs;
        });

        setParagraphs(paragraphs);
      } catch (error) {
        console.error("Error fetching navigation links:", error);
      }
    };

    setInterval(fetchHero, 1000);

    fetchHero();
  }, [paragraphs]);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-myPurple">Harsh</span>
          </h1>
          <div
            className={`${styles.heroSubText} mt-2 text-white-100 text-justify`}
          >
            {paragraphs}
          </div>
        </div>
      </div>
      <div
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
        id="scroll-about"
      >
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
