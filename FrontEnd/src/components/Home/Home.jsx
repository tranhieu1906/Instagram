import PostsContainer from './PostsContainer'
import SideBar from "./SideBar/SideBar";
import MetaData from "../Layouts/MetaData";
import { useEffect} from "react";
import axios from "../../api/axios";
import {useSelector} from "react-redux";

const Home = () => {
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        console.log(axios.defaults.headers)
    })

  return (
    <>
      <MetaData title="Instagram" />

      <div className="flex h-full md:w-4/5 lg:w-4/6 mt-14 mx-auto">
        <PostsContainer />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
