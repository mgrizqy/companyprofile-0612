"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { Footer } from "../components/Footer";


interface TeamMember {
  id: { value: string };
  name: { first: string; last: string; };
  picture: { large: string; };
  email: string;
}

const roles = ["Master Personal Trainer", "Master Personal Trainer", "Gold Personal Trainer", "Master Personal Trainer", "Gold Personal Trainer", "Gold Personal Trainer"];

export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://randomuser.me/api/?results=6&?gender=male&?nat=ca"); 
        setTeam(response.data.results);
      } catch (error) {
        console.error("Error occured when fetching ",error);
       
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []); 

  return (
    <main>
      <PageHeader
        title="Meet Our Experts"
        subtitle="Tim pelatih kami yang bersertifikat dan berdedikasi siap membantu Anda."
        image={{src:"/images/personalTrainer-banner.jpg", alt:"A banner of Gold's gym personal trainer"}}
      />
      
      <div className="container mx-auto max-w-screen-xl py-16 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.id.value || index} className="text-center">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.picture.large}
                      alt={`Photo of ${member.name.first} ${member.name.last}`}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-oswald text-2xl font-bold uppercase text-black">
                      {member.name.first} {member.name.last}
                    </h3>
                    <p className="mt-1 text-yellow-500 font-semibold uppercase tracking-wider text-sm">
                      {roles[index % roles.length]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer></Footer>
    </main>
  );
}