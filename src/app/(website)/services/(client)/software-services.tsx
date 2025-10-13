import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServicesTypes } from ".";
import SoftwareServiceCard from "./software.card";

const SoftwareService = ({ data }: { data: ServicesTypes[] }) => (
  <div className=" bg-[#FFFFFF] dark:bg-black py-16 ">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {data.map((service) => (
          <SoftwareServiceCard
            key={service.id}
            id={service.id} // Pass the id to the ServiceCard
            icon={service.icon} // Pass the icon component
            title={service.title}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </div>
  </div>
);

export default SoftwareService;
