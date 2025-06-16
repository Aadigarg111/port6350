import React from "react";
import Image from "next/image";
import { SKILLS } from "@/constants/skills";

const Skills = () => {
  // Split skills into two rows
  const midPoint = Math.ceil(SKILLS.length / 2);
  const firstRow = SKILLS.slice(0, midPoint);
  const secondRow = SKILLS.slice(midPoint);

  const SkillCard = ({ skill }) => (
    <div className="group flex-shrink-0 flex flex-col items-center transition-all duration-300 hover:scale-105 min-w-[120px] md:min-w-[140px] p-3 md:p-4">
      {/* Logo */}
      <div className="w-32 h-40 md:w-36 md:h-44 lg:w-40 lg:h-48 bg-[#1a1a1a] rounded-xl flex flex-col items-center justify-center mb-3 transition-all duration-300 group-hover:bg-gray-700 group-hover:shadow-lg border border-gray-800 group-hover:border-gray-600">
        <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mb-4 relative">
          <Image
            src={skill.logo}
            alt={skill.name}
            loading="lazy"
            width={80}
            height={80}
            sizes="(max-width: 768px) 64px, (max-width: 1024px) 72px, 80px"
            className="object-contain filter group-hover:brightness-110 transition-all duration-300"
          />
        </div>
        {/* Skill Name */}
        <h3 className="text-white font-medium text-center text-sm md:text-base lg:text-lg leading-tight px-2">
          {skill.name}
        </h3>
      </div>
    </div>
  );

  const SkillRow = ({ skills, direction = "left" }) => (
    <div className="relative mb-4 md:mb-6">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 w-12 md:w-16 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-12 md:w-16 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

      {/* Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className={`flex space-x-4 md:space-x-6 px-6 md:px-8 animate-scroll-${direction}`}
          style={{
            width: "max-content",
            animationDuration: "30s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {/* Duplicate skills for seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="w-full py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-7xl lg:text-9xl font-head font-bold text-white my-4 md:my-8 lg:my-10">
          Skills
        </h2>

        {/* Two Rows of Skills */}
        <div className="space-y-4 md:space-y-6">
          <SkillRow skills={firstRow} direction="left" />
          <SkillRow skills={secondRow} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
