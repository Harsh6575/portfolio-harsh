"use client";
import React from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { urlForFile } from "../../sanity/lib/image";
import Loader from "./Loader";

const query = groq`*[_type == "resume"] { name, pdf { asset->{ _id, url } } } | order(_createdAt asc)`;

const Resume = () => {
  const [resume, setResume] = React.useState([]);

  React.useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await client.fetch(query);
        if (response.length === 0) {
          throw new Error("No data found");
        }

        setResume(response);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchResume, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const resumeUrl = resume.length > 0 ? resume[0]?.pdf?.asset?.url : null;

  return (
    <div className="h-[50%]">
      <div>
        <p className={styles.sectionSubText}>My</p>
        <h2 className={styles.sectionHeadText}>Resume.</h2>
      </div>
      <div className="flex items-center ml-8">
        {resumeUrl ? (
          <a href={resumeUrl} download className="buttonDownload">
            Download
          </a>
        ) : (
          <button className="buttonDownload" disabled>
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Resume, "resume");
