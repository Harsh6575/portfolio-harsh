"use client";
import React, { useEffect } from "react";
import { SectionWrapper } from "../hoc";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { AiFillEye, AiOutlineGithub } from "react-icons/ai";
import { urlForImage } from "../../sanity/lib/image";

const query = groq`*[_type == "project"] | order(_createdAt asc)`;

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image: projectImage,
  source_code_link,
  live_demo_link,
}) => {
  const image = urlForImage(projectImage).url();

  useEffect(() => {
    const handleImageError = () => {
      // Handle error when the image fails to load
      console.error("Failed to load project image:", projectImage);
    };

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.addEventListener("error", handleImageError);

    return () => {
      imgElement.removeEventListener("error", handleImageError);
    };
  }, [image, projectImage]);

  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          {source_code_link && (
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <AiOutlineGithub className="w-1/2 h-1/2 object-contain" />
            </div>
          )}
          {live_demo_link && (
            <div
              onClick={() => window.open(live_demo_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <AiFillEye className="w-1/2 h-1/2 object-contain" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px] text-justify">{description}</p>
      </div>
      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(({ name, color }) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${color}`}
            >
              #{name}
            </p>
          ))}
        </div>
      )}
    </Tilt>
  );
};

const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.fetch(query);

        if (response.length === 0) {
          throw new Error("No data found");
        }

        setProjects(response);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    const intervalId = setInterval(fetchProjects, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Here are some of my</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>
      <div className="mt-20 flex flex-wrap gap-10 items-center">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");