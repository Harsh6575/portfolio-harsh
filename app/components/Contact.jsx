"use client";

import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import { groq } from "next-sanity";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { styles } from "../styles";

const query = groq`*[_type == "socialMedia"] {
  _createdAt,
  url,
  name
} | order(_createdAt asc)`;

const SocialMediaCard = ({ name, url }) => {
  return (
    <div className="w-[250px]">
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <Link href={url} options={{ max: 45, scale: 1, speed: 450 }}>
          <div className="bg-newBlue rounded-[20px] py-5 px-12 min-h-80px] flex justify-evenly items-center flex-col">
            <h3 className="text-white text-[20px] font-bold text-center">
              {name}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

const Contact = () => {
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await client.fetch(query);
        if (response.length === 0) {
          throw new Error("No data found");
        }
        setSocialMedia(response);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchSocialMedia, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {socialMedia.map((socialMedia, index) => (
          <SocialMediaCard key={socialMedia.name} {...socialMedia} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
