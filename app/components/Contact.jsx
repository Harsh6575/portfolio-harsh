"use client";
import React from "react";
import { SectionWrapper } from "../hoc";
import { groq } from "next-sanity";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { styles } from "../styles";
import { urlForImage } from "../../sanity/lib/image";

const query = groq`*[_type == "socialMedia"] {
  _createdAt,
    url,icon,name
} | order(_createdAt asc)`;

const SocialMediaCard = ({ index, name, icon, url }) => {
  icon = urlForImage(icon).url();

  return (
    <div className="xs:w-[250px] w-full">
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <Link
          href={url}
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-newBlue rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={name} className="w-32 h-32 object-contain" />

          <h3 className="text-white text-[20px] font-bold text-center">
            {name}
          </h3>
        </Link>
      </div>
    </div>
  );
};

const Contact = () => {
  const [socialMedia, setSocialMedia] = React.useState([]);

  React.useEffect(() => {
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

    setInterval(fetchSocialMedia, 1000);

    fetchSocialMedia();
  }, [socialMedia]);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {socialMedia.map((socialMedia, index) => (
          <SocialMediaCard
            key={socialMedia.name}
            index={index}
            {...socialMedia}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
