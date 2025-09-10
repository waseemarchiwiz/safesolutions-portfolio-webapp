import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";
import { projects } from "../../lib/Project";

const ProjectsComponent = ({ background }) => {
  // Helper function to determine the correct link behavior
  const getProjectLink = (project) => {
    if (project.type === "external") {
      return {
        to: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }
    if (project.type === "detailed") {
      return {
        to: `/project${project.route}`,
        target: undefined,
      };
    }
    return null;
  };

  return (
    <section className={`${background} p-16 bg-[#FFFFFF] dark:bg-black`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-white text-sm font-medium">
              Our Projects
            </span>
          </div>
          <p className="text-slate-600  p-7 dark:text-white text-[20px] md:text-[26px] leading-normal  text-center      w-auto">
            At Safe Solution, we pride ourselves on delivering impactful
            solutions tailored to our clients unique needs. With a focus on
            innovation, precision, and excellence, we have successfully
            completed a diverse range of projects.
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              delay: 3000,
              direction: "backward",
              stopOnFocusIn: true,
              stopOnMouseEnter: true,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full mx-auto mt-10"
        >
          <CarouselContent>
            {projects.map((project, index) => {
              const linkProps = getProjectLink(project);

              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/4 h-72"
                >
                  {linkProps ? (
                    <Link
                      {...linkProps}
                      className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 block h-full"
                    >
                      <img
                        src={project.img}
                        alt={project.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity group-hover:bg-opacity-75 flex flex-col items-center justify-center p-4">
                        <h3 className="text-white text-lg font-semibold text-center">
                          {project.name}
                        </h3>
                        <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
                        <h3 className="text-white text-lg font-semibold text-center">
                          {project.name}
                        </h3>
                        <p className="text-white text-sm mt-2 text-center">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsComponent;
