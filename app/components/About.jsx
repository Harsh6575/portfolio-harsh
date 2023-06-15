"use client";
import React, { useEffect, useState, useCallback } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";

const query = groq`*[_type == "about"] {
  _createdAt,
  title,
  body[]{
    children[]{
      ...,
      text,
      marks[]
    }
  }
} | order(_createdAt asc)`;

const About = () => {
  
  const [paragraphs, setParagraphs] = useState([]);

  const generateParagraphs = useCallback((response) => {
    const markClassMap = {
      strong: "text-myPurple",
      underline: "text-myGreen",
      "strike-through": "text-myBlue",
      em: "text-myRed",
      code: "text-myEbony",
      highlight: "text-myViolet",
    };

    return response.map((about) => {
      const descriptionElements = about.body[0].children.map((child) => {
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
  }, []);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await client.fetch(query);

        if (response.length === 0) {
          throw new Error("No data found");
        }

        const generatedParagraphs = generateParagraphs(response);
        setParagraphs(generatedParagraphs);
      } catch (error) {
        console.error("Error fetching navigation links:", error);
      }
    };

    const intervalId = setInterval(fetchAbout, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [generateParagraphs]);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="flex flex-col gap-4">
            {paragraph}
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
