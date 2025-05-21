 import axios from "axios";
 import { BACKEND_URL } from "../config";
 export default async function createblog({title,description,navigate,}:{title:string,description:string,navigate:(path:string)=>void}  ) {
  
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem ("token")}`,
                    },
                  }
                );
                console.log(res);
                navigate(`/blog/${res.data.blog.id}`);
              };