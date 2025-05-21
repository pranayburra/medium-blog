import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Appbar from "../components/Appbar";
import AvatarCard from "../components/Avatar";
import PersonalBlogs from "./PersonalBlogs";

type Blog = {
  id: number;
  title: string;
  content: string;
  publisher: boolean;
};

type User = {
  name: string;
  email: string;
  blogs: Blog[];
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios(`${BACKEND_URL}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, []);
  if (!user) {
    return (
      <div>
        <Appbar isBlogs={true} />
        <div className="pt-20 flex justify-center">
          <div>loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      {/* Appbar at the top */}
      <Appbar isBlogs={true} />

      <div className="w-full font-sohe h-full   flex justify-center pt-20">
        <div className="flex w-full h-full max-h-11/12 max-w-6xl justify-center px-4">
          <div className="w-[70%] h-[100%]  p-2">
            <div className="flex justify-between mr-4 items-center ">
              <div className=" text-[42px] capitalize font-bold "> {user.name}</div> 
              
            </div>
            <div className="border-b">
              
            </div>
         
            <div >
             <PersonalBlogs/>
            </div>
          </div>
        
          <div className="w-[45%] font-sohe font-bold 0 p-2 flex flex-col items-center pt-20 gap-3
           ">
            <AvatarCard name={user.name}/>
            <div className="font-bold text-2xl">{user.name}</div>
            <div>{user.email}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
