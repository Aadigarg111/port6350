"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";
import { PROJECTS } from "@/constants/index";
import ProjectModal from "@/components/ProjectModal"; // Adjust the import path as needed

const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section id="works" className="py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="font-head text-4xl md:text-7xl lg:text-9xl font-bold text-black dark:text-white my-4 md:my-8 lg:my-10">
          Works
        </h2>
        <div className="space-y-0">
          {PROJECTS.map(({ name, image, href }, index) => (
            <a
              href={href}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-gray-300 dark:border-gray-700 border-dotted last:border-b py-6 md:py-8 lg:py-10 block hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all duration-300"
              onMouseEnter={() => setModal({ active: true, index })}
              onMouseLeave={() => setModal({ active: false, index })}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
                {/* Mobile Image */}
                <div className="aspect-video md:hidden relative overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`${name} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Project Info */}
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {name}
                    </h3>
                    <div className="mt-2 md:hidden">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        View Project
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block text-sm text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Project
                    </div>
                    <ImArrowUpRight2 className="text-black dark:text-white w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* Modal Component */}
      <ProjectModal modal={modal} projects={PROJECTS} />
    </section>
  );
};

export default Projects;
