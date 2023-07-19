"use client";
import React from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import urlBuilder from "@sanity/image-url";

const query = groq`*[_type == "technologies"] { name, icon, _createdAt } | order(_createdAt asc)`;

const TechnologyCard = ({ index, name, icon }) => {
  icon = urlBuilder(client).image(icon).url();

  return (
    <div className="sm:w-[250px] w-[150px]">
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div
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
        </div>
      </div>
    </div>
  );
};

const Tech = () => {
  const [technologies, setTechnologies] = React.useState([]);

  React.useEffect(() => {
    const fetchTech = async () => {
      try {
        const response = await client.fetch(query);

        if (response.length === 0) {
          throw new Error("No data found");
        }

        setTechnologies(response);
      } catch (error) {
        console.error(error);
      }
    };
    const intervalId = setInterval(fetchTech, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [technologies]);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>My Familiar</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </div>
      <div className="mt-20 flex flex-wrap gap-10 items-center justify-center">
        {technologies.map((technology, index) => (
          <TechnologyCard key={technology.name} index={index} {...technology} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
