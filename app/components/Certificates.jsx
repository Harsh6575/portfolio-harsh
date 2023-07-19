"use client";
import React, { useCallback, useEffect, useState } from "react";

import { SectionWrapper } from "../hoc";
import { groq } from "next-sanity";
import { styles } from "../styles";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";

const query = groq`*[_type == "certificates"] {
    description,
      title,
      from,
      image,
      link,
      _createdAt,
  } | order(_createdAt asc)`;

const CertificateCard = ({
    index,
    title,
    description,
    from,
    image,
    link,
}) => {

    const imageurl = urlForImage(image).url();

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
          const descriptionElements = description[0].children.map((child) => {
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

  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={imageurl} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title} from {from}
        </h5>
        {/* <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            {generateParagraphs(description)}
        </div> */}
        <Link
          href={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify Certificate
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    const fetchCetificates = async () => {
      try {
        const response = await client.fetch(query);

        if (response.length === 0) {
          throw new Error("No data found");
        }

        setCertificates(response);

      } catch (error) {
        console.error("Error fetching navigation links:", error);
      }
    };

    const intervalId = setInterval(fetchCetificates, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [certificates]);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My</p>
        <h2 className={styles.sectionHeadText}>Certificates.</h2>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} index={index} {...certificate} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certificates, "");
