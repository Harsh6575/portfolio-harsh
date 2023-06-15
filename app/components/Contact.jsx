"use client";

import React from "react";
import { SectionWrapper } from "../hoc";
import Link from "next/link";
import { styles } from "../styles";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineLinkedin,
  AiOutlineTwitter
} from "react-icons/ai";

const Contact = () => {

  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
      </div>
      <div className="flex flex-wrap gap-10">
        <Link href="https://www.linkedin.com/in/harsh-vansjaliya-904825226/" className="icons linkedIn">
          <AiOutlineLinkedin />
        </Link>
        <a href="https://github.com/harsh6575" className="icons github">
          <AiOutlineGithub />
        </a>
        <a href="https://www.instagram.com/mr.hppatel_777/" className="icons instagram">
          <AiOutlineInstagram />
        </a>
        <a href="https://twitter.com/HarshVansjaliya?s=08" className="icons facebook">
          <AiOutlineTwitter />
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
